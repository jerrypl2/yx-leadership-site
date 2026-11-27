import { notify, retryNotifications } from './formsubmit.js';
import { notificationBody } from '../src/contact-relay.js';
import { sessions, inquiryPath } from '../src/classroom/catalog.js';
const maxLength = {name: 100, email: 254, company: 200, phone: 48, wechat: 100, message: 4000};
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const allowed = new Set(['https://www.amachina-yuexin.com', 'https://amachina-yuexin.com']);

async function readInput(request) {
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
  input.id = input.id.toLowerCase();
  return input;
}

function readMessage(input, inquiry) {
  const fields = {};
  for (const [key, limit] of Object.entries(maxLength)) {
    const value = input[key] ?? '';
    if (typeof value !== 'string' || value.length > limit) throw new Error('invalid');
    fields[key] = value.trim();
  }
  if (inquiry && (typeof input.sessionId !== 'string' || !/^\d{1,12}$/.test(input.sessionId))) throw new Error('invalid');
  if (inquiry && !fields.message) fields.message = '希望了解本班的开课安排和报名条件。';
  if (!fields.name || !fields.message || !/^[^\s@<>;,]+@[^\s@<>;,]+\.[^\s@<>;,]+$/.test(fields.email) ||
      /[\u0000-\u001f\u007f]/.test(fields.email)) throw new Error('invalid');
  return {id:input.id, fields, sessionId:input.sessionId};
}

// The browser can report the outcome of its own one-time dispatch only.
// Retain the ticket on the row so repeating a lost acknowledgement is harmless.
async function recordBrowserResult(db, input, now, reply) {
  const {id, ticket, state, delay} = input;
  if (typeof ticket !== 'string' || !uuid.test(ticket) || !['sent','activation','pending','review'].includes(state)) return reply({error:'invalid_result'},400);
  if (state === 'pending' && (!Number.isSafeInteger(delay) || delay < 60000 || !Number.isSafeInteger(now + delay))) return reply({error:'invalid_delay'},400);
  const providerId = 'formsubmit/browser/' + ticket;
  await db.prepare(`UPDATE contact_messages SET notification_state=?, next_attempt_at=?
    WHERE id=? AND provider_id=? AND notification_state='browser_dispatching'`)
    .bind(state,state === 'pending' ? now + delay : 0,id,providerId).run();
  const row = await db.prepare('SELECT notification_state FROM contact_messages WHERE id=? AND provider_id=?').bind(id,providerId).first();
  if (row?.notification_state !== state) return reply({error:'receipt_conflict'},409);
  return reply({recorded:true},200);
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
    const inquiry = path === inquiryPath;
    const dispatch = path === '/api/contact/dispatch';
    const receipt = path === '/api/contact/receipt';
    if (!inquiry && !dispatch && !receipt && path !== '/api/contact') return reply({error:'missing'},404);
    if (!allowed.has(origin)) return reply({error:'origin'},403);
    headers['Access-Control-Allow-Origin']=origin;
    if (request.method === 'OPTIONS') {
      return new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'}});
    }
    if (request.method !== 'POST') return reply({error:'method'},405);
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return reply({error:'content_type'},415);
    if (!admit()) return reply({error:'rate_limit'},429);
    let input, message;
    try {
      input=await readInput(request);
      if (!receipt) message=readMessage(input, inquiry);
    }
    catch (e) { return reply({error:'invalid_message'},e.message==='too_large'?413:400); }
    const now=clock();
    try {
      const db=env.DB;
      if (receipt) return await recordBrowserResult(db, input, now, reply);
      const {id,fields,sessionId}=message;
      if (dispatch) {
        const ticket = crypto.randomUUID();
        const claim = await db.prepare(`UPDATE contact_messages SET notification_state='browser_dispatching',
          provider_id=?, attempts=attempts+1, first_attempt_at=?, next_attempt_at=?
          WHERE id=? AND payload=? AND notification_state='awaiting_browser'`)
          .bind('formsubmit/browser/'+ticket, now, now+120000, id, JSON.stringify(fields)).run();
        if (!claim.meta.changes) return reply({granted:false},200);
        return reply({granted:true,ticket,body:notificationBody(fields,'悦心官网留言 '+id)},200);
      }
      if (inquiry) {
        // Keep the original course snapshot on retries, including after a catalogue edit.
        const previous = await db.prepare('SELECT payload FROM contact_messages WHERE id=?').bind(id).first();
        const savedSession = previous && JSON.parse(previous.payload).session;
        const session = savedSession?.id === sessionId ? savedSession : sessions.find(item => item.id === sessionId);
        if (!session) return reply({error:'unknown_session'},400);
        fields.kind = 'classroom_inquiry';
        fields.session = session;
      }
      const payload = JSON.stringify(fields);
      const browser = !inquiry && input.delivery === 'browser';
      await db.prepare(`INSERT INTO contact_messages (id,payload,created_at,notification_state,next_attempt_at)
        VALUES(?,?,?,?,?) ON CONFLICT(id) DO NOTHING`).bind(id,payload,now,browser?'awaiting_browser':'pending',browser?now+120000:0).run();
      const row=await db.prepare('SELECT * FROM contact_messages WHERE id=?').bind(id).first();
      if (!row) throw new Error('storage');
      if (row.payload !== payload) return reply({error:'id_conflict'},409);
      let notification = 'pending';
      try { notification = await notify(db, row, send, now); } catch { /* The submission is already durable. */ }
      return reply({id, saved:true, notification, ...(inquiry ? {kind:fields.kind, session:fields.session} : {})},200);
    } catch { return reply({error:'storage_unavailable'},503); }
  };
}
