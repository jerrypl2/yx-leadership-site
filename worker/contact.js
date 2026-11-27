import { notify, retryNotifications } from './formsubmit.js';
const maxLength = {name: 100, email: 254, company: 200, phone: 48, wechat: 100, message: 4000};
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const allowed = new Set(['https://www.amachina-yuexin.com', 'https://amachina-yuexin.com']);

async function readMessage(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error('invalid');
  const decoder = new TextDecoder();
  let size = 0, text = '';
  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    size += chunk.value.byteLength;
    if (size > 32768) { await reader.cancel(); throw new Error('too_large'); }
    text += decoder.decode(chunk.value, {stream:true});
  }
  const input = JSON.parse(text + decoder.decode());
  if (typeof input?.id !== 'string' || !uuid.test(input.id)) throw new Error('invalid');
  const fields = {};
  for (const [key, limit] of Object.entries(maxLength)) {
    const value = input[key] ?? '';
    if (typeof value !== 'string' || value.length > limit) throw new Error('invalid');
    fields[key] = value.trim();
  }
  if (!fields.name || !fields.message || !/^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(fields.email) ||
      /[\u0000-\u001f\u007f]/.test(fields.email)) throw new Error('invalid');
  return {id:input.id.toLowerCase(), fields};
}

export function createContactHandler(send = fetch, clock = Date.now) {
  return async function handle(request, env, admit=()=>true) {
    const path = new URL(request.url).pathname;
    const origin = request.headers.get('origin');
    const headers = {'Cache-Control':'no-store',Vary:'Origin'};
    const reply = (data,status) => Response.json(data,{status,headers});
    if (path === '/api/contact/retry') {
      if (request.method !== 'POST' || !env.CONTACT_RETRY_TOKEN || request.headers.get('authorization') !== 'Bearer '+env.CONTACT_RETRY_TOKEN) return reply({error:'forbidden'},403);
      if (!env.DB) return reply({error:'storage_unavailable'},503);
      try { return reply(await retryNotifications(env.DB,send,clock()),200); }
      catch { return reply({error:'storage_unavailable'},503); }
    }
    if (path !== '/api/contact') return reply({error:'missing'},404);
    if (!allowed.has(origin)) return reply({error:'origin'},403);
    headers['Access-Control-Allow-Origin']=origin;
    if (request.method === 'OPTIONS') {
      return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
    }
    if (request.method !== 'POST') return reply({error:'method'},405);
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply({error:'content_type'},415);
    if (!admit()) return reply({error:'rate_limit'},429);
    let input;
    try { input=await readMessage(request); }
    catch (e) { return reply({error:'invalid_message'},e.message==='too_large'?413:400); }
    const {id,fields}=input, payload=JSON.stringify(fields), now=clock();
    try {
      const db=env.DB;
      await db.prepare('INSERT INTO contact_messages (id,payload,created_at) VALUES(?,?,?) ON CONFLICT(id) DO NOTHING').bind(id,payload,now).run();
      const row=await db.prepare('SELECT * FROM contact_messages WHERE id=?').bind(id).first();
      if (!row) throw new Error('storage');
      if (row.payload !== payload) return reply({error:'id_conflict'},409);
      let notification = 'pending';
      try { notification = await notify(db, row, send, now); } catch { /* The submission is already durable. */ }
      return reply({id, saved:true, notification},200);
    } catch { return reply({error:'storage_unavailable'},503); }
  };
}
