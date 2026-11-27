const recipient = 'info@amachina.com';
const maxLength = {name: 100, email: 254, company: 200, phone: 48, wechat: 100, message: 4000};
const uuid = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
const allowed = new Set(['https://www.amachina-yuexin.com', 'https://amachina-yuexin.com']);
const hour = 3_600_000;

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

// The row is the durable outbox entry. A leased attempt can be reclaimed after
// a Worker interruption; the provider receives the same key on every retry.
async function notify(db, row, env, send, now) {
  if (row.notification_state === 'sent') return true;
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM) return false;
  if (row.first_attempt_at != null && now - row.first_attempt_at >= 23 * hour) {
    // Beyond the provider's deduplication window an uncertain send needs reconciliation.
    await db.prepare("UPDATE contact_messages SET notification_state='review' WHERE id=? AND notification_state='pending' AND next_attempt_at<=?").bind(row.id,now).run();
    return false;
  }
  const lease = now + 60000;
  const claimed = await db.prepare("UPDATE contact_messages SET first_attempt_at=COALESCE(first_attempt_at,?), next_attempt_at=?, attempts=attempts+1 WHERE id=? AND notification_state='pending' AND next_attempt_at<=?").bind(now,lease,row.id,now).run();
  if (!claimed.meta.changes) return false;
  const f = JSON.parse(row.payload);
  const body = {
    from:env.CONTACT_FROM, to:[recipient], reply_to:f.email,
    subject:'悦心官网留言 '+row.id,
    text:[`编号：${row.id}`,`姓名：${f.name}`,`邮箱：${f.email}`,`公司：${f.company}`,`电话：${f.phone}`,`微信：${f.wechat}`,'',f.message].join('\n'),
  };
  try {
    const response = await send('https://api.resend.com/emails', {
      method:'POST', signal:AbortSignal.timeout(8000),
      headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'contact/'+row.id},
      body:JSON.stringify(body),
    });
    const receipt = response.ok ? await response.json() : null;
    if (!receipt?.id) throw new Error('delivery');
    await db.prepare("UPDATE contact_messages SET notification_state='sent', provider_id=? WHERE id=?").bind(receipt.id,row.id).run();
    return true;
  } catch {
    const delay = Math.min(hour, 60000 * 2 ** Math.min(row.attempts,6));
    await db.prepare("UPDATE contact_messages SET next_attempt_at=? WHERE id=? AND notification_state='pending' AND next_attempt_at=?").bind(now+delay,row.id,lease).run();
    return false;
  }
}

export function createContactHandler(send = fetch, clock = Date.now) {
  return async function handle(request, env, admit=()=>true) {
    const path = new URL(request.url).pathname;
    const origin = request.headers.get('origin');
    const headers = {'Cache-Control':'no-store',Vary:'Origin'};
    const reply = (data,status) => Response.json(data,{status,headers});
    if (path === '/api/contact/retry') {
      if (request.method !== 'POST' || !env.CONTACT_RETRY_TOKEN || request.headers.get('authorization') !== 'Bearer '+env.CONTACT_RETRY_TOKEN) return reply({error:'forbidden'},403);
      if (!env.DB || !env.RESEND_API_KEY || !env.CONTACT_FROM) return reply({error:'not_configured'},503);
      const now = clock();
      const {results} = await env.DB.prepare("SELECT * FROM contact_messages WHERE notification_state='pending' AND next_attempt_at<=? ORDER BY created_at LIMIT 10").bind(now).all();
      const completed=await Promise.all(results.map(row=>notify(env.DB,row,env,send,now)));
      return reply({checked:results.length,accepted:completed.filter(Boolean).length},200);
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
      let accepted=false;
      try { accepted=await notify(db,row,env,send,now); } catch { /* Saved; the scheduled retry will resume. */ }
      return reply({id,saved:true,notification:accepted?'accepted':'pending'},200);
    } catch { return reply({error:'storage_unavailable'},503); }
  };
}
