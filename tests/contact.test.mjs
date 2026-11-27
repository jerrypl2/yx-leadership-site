import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { createContactHandler } from '../worker/contact.js';
import { contactEndpoint, sendContact } from '../src/contact.js';
import { formSubmitUrl } from '../src/contact-relay.js';

const sql = readFileSync(new URL('../drizzle/0000_contact_messages.sql', import.meta.url), 'utf8');
const origin = 'https://www.amachina-yuexin.com';
const endpoint = 'https://backend.example/api/contact';
const fields = {id:crypto.randomUUID(),name:'测试',email:'visitor@example.invalid',message:'仅供测试'};
function scenario(send) {
  const db = new DatabaseSync(':memory:');
  db.exec(sql);
  db.exec(readFileSync(new URL('../drizzle/0001_formsubmit_gate.sql', import.meta.url), 'utf8'));
  let now = 100000;
  const env = {DB:{prepare: query => ({bind(...args) {
    const statement = db.prepare(query);
    return {
      run: async () => ({meta: statement.run(...args)}),
      first: async () => statement.get(...args),
      all: async () => ({results:statement.all(...args)}),
    };
  }})}, CONTACT_RETRY_TOKEN:'test-token'};
  const handler=createContactHandler(send,()=>now);
  return {
    db, env, advance: ms => { now+=ms; },
    browser: (step, data) => handler(new Request(endpoint+'/'+step, {
      method:'POST', headers:{Origin:origin,'Content-Type':'application/json'}, body:JSON.stringify(data),
    }),env),
    submit: (data=fields, headers={Origin:origin,'Content-Type':'application/json'}) =>
      handler(new Request(endpoint,{method:'POST',headers,body:JSON.stringify(data)}),env),
    inquire: data => handler(new Request('https://backend.example/api/classroom/inquiries',{
      method:'POST', headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(data)
    }),env),
    retry: (key='test-token') => handler(new Request(endpoint+'/retry',{method:'POST',headers:{Authorization:'Bearer '+key}}),env),
  };
}

test('a committed submission survives a lost response, double click and concurrent replay', async () => {
  const calls=[];
  const s = scenario(async (url, options) => {
    calls.push({url, ...options});
    return Response.json({success:'true'});
  });
  const receipts=await Promise.all([s.submit(),s.submit(),s.submit()]);
  for (const r of receipts) assert.equal((await r.json()).id,fields.id);
  assert.equal((await (await s.submit()).json()).notification,'accepted');
  assert.equal(s.db.prepare('SELECT count(*) AS n FROM contact_messages').get().n,1);
  assert.equal(calls.length,1);
  assert.equal(calls[0].redirect,'manual');
  assert.equal(calls[0].url,'https://formsubmit.co/ajax/info@amachina.com');
  const notification=JSON.parse(calls[0].body);
  assert.equal(notification._replyto,fields.email);
  assert.equal(notification.message,fields.message);
  assert.ok(notification._subject.includes(fields.id));
  assert.deepEqual(Object.keys(notification).sort(), ['name','email','message','_replyto','_subject','_url'].sort());
  assert.equal((await s.submit({...fields,message:'另一次编辑'})).status,409);
});

test('a definite rate-limit rejection is retried from the durable outbox', async () => {
  let calls=0;
  const s=scenario(async ()=>{
    calls++;
    return calls===1 ? new Response(null,{status:429}) : Response.json({success:true});
  });
  assert.equal((await (await s.submit()).json()).notification,'pending');
  assert.equal((await s.retry('incorrect')).status,403);
  assert.deepEqual(await (await s.retry()).json(),{checked:0,accepted:0});
  s.advance(61000);
  assert.deepEqual(await (await s.retry()).json(),{checked:1,accepted:1});
  assert.equal(calls,2);
});

test('activation holds subsequent entries locally and releases the queue on the next active probe', async () => {
  let calls=0;
  const s=scenario(async ()=>{
    calls++;
    return calls===1 ? Response.json({success:'false',message:'This form needs Activation.'}) : Response.json({success:'true'});
  });
  assert.equal((await (await s.submit()).json()).notification,'activation');
  const later={...fields,id:crypto.randomUUID()};
  assert.equal((await (await s.submit(later)).json()).notification,'pending');
  await s.retry();
  assert.equal(calls,1);
  s.advance(6*3600000+1);
  assert.deepEqual(await (await s.retry()).json(),{checked:1,accepted:1});
  assert.equal((await (await s.submit(later)).json()).notification,'accepted');
  assert.equal(calls,2);
});

test('a lost provider acknowledgement or a crashed in-flight attempt is held for reconciliation', async () => {
  let calls=0;
  const s=scenario(async ()=>{calls++; throw new Error('lost receipt');});
  assert.equal((await (await s.submit()).json()).notification,'review');
  await s.retry();
  assert.equal(calls,1);
  s.db.prepare("UPDATE contact_messages SET notification_state='dispatching', next_attempt_at=0").run();
  await s.retry();
  assert.equal(calls,1);
  assert.equal(s.db.prepare('SELECT notification_state FROM contact_messages').get().notification_state,'review');
});

test('invalid input, untrusted origins and failed storage cannot produce a success receipt', async () => {
  const s=scenario(()=>assert.fail('unexpected email'));
  assert.equal((await s.submit({...fields,email:'bad@example.invalid\r\nBcc: x@example.invalid'})).status,400);
  assert.equal((await s.submit({...fields,name:' '})).status,400);
  assert.equal((await s.submit({...fields,message:'字'.repeat(12000)})).status,413);
  assert.equal((await s.submit(fields,{Origin:'https://example.invalid','Content-Type':'application/json'})).status,403);
  assert.equal(s.db.prepare('SELECT count(*) AS n FROM contact_messages').get().n,0);
  delete s.env.DB;
  assert.equal((await s.submit()).status,503);
});

test('a saved browser submission can be claimed only once, even after a lost save response', async () => {
  const s=scenario(()=>assert.fail('unexpected second delivery'));
  const data={...fields, company:'仅存于本站',delivery:'browser'};
  for (let n=0;n<2;n++) assert.equal((await (await s.submit(data)).json()).notification,'awaiting_browser');
  assert.equal((await (await s.browser('dispatch',{...data,email:'other@example.invalid'})).json()).granted,false);
  const claims=await Promise.all([s.browser('dispatch',data),s.browser('dispatch',data)]);
  const replies=await Promise.all(claims.map(r=>r.json()));
  assert.equal(replies.filter(r=>r.granted).length,1);
  const {ticket,body}=replies.find(r=>r.granted);
  assert.deepEqual(body,{name:data.name,email:data.email,message:data.message,_replyto:data.email,
    _url:'https://www.amachina-yuexin.com/contact/',_subject:'悦心官网留言 '+data.id});
  const result={id:data.id,ticket,state:'sent'};
  assert.equal((await s.browser('receipt',{...result,ticket:crypto.randomUUID()})).status,409);
  for (let n=0;n<2;n++) assert.equal((await s.browser('receipt',result)).status,200);
  assert.equal((await (await s.submit(data)).json()).notification,'accepted');
  s.advance(180000);
  assert.deepEqual(await (await s.retry()).json(),{checked:0,accepted:0});
  assert.equal(s.db.prepare('SELECT attempts FROM contact_messages').get().attempts,1);
});

test('unclaimed messages fall back to the queue while an uncertain browser delivery is held for review', async () => {
  let calls=0;
  const s=scenario(()=>{calls++;return Response.json({success:true});});
  const data={...fields,delivery:'browser'};
  await s.submit(data);
  const abandoned={...data,id:crypto.randomUUID()};
  await s.submit(abandoned);
  await s.browser('dispatch',data);
  s.advance(180000);
  assert.deepEqual(await (await s.retry()).json(),{checked:1,accepted:1});
  assert.equal((await (await s.submit(data)).json()).notification,'review');
  assert.equal((await (await s.browser('dispatch',abandoned)).json()).granted,false);
  assert.equal(calls,1);
});

test('a browser rate-limit receipt defers the server retry until the specified time', async () => {
  const s=scenario(()=>Response.json({success:true}));
  const data={...fields,delivery:'browser'};
  await s.submit(data);
  const {ticket}=await (await s.browser('dispatch',data)).json();
  const result={id:data.id,ticket,state:'pending',delay:300000};
  assert.equal((await s.browser('receipt',result)).status,200);
  assert.equal((await (await s.submit(data)).json()).notification,'pending');
  s.advance(299999);
  assert.equal((await (await s.retry()).json()).checked,0);
  s.advance(1);
  assert.equal((await (await s.retry()).json()).accepted,1);
});

test('a lost database acknowledgement is retried without issuing another browser email', async t => {
  const s=scenario(()=>assert.fail('unexpected server delivery'));
  const {id,...visitor}=fields;
  let emails=0, receipts=0;
  t.mock.method(globalThis,'fetch',async (url, options)=>{
    const data=JSON.parse(options.body);
    if (url===contactEndpoint) return s.submit(data);
    if (url===contactEndpoint+'/dispatch') return s.browser('dispatch',data);
    if (url===formSubmitUrl) {
      emails++;
      return Response.json({success:'true'});
    }
    assert.equal(url,contactEndpoint+'/receipt');
    const response=await s.browser('receipt',data);
    if (++receipts===1) throw new TypeError('response lost');
    return response;
  });
  assert.equal((await sendContact(id,visitor,()=>{})).notification,'accepted');
  assert.equal(emails,1);
  assert.equal(receipts,2);
  assert.equal(s.db.prepare('SELECT notification_state FROM contact_messages').get().notification_state,'sent');
});

test('class inquiries use the canonical session, emit a matching receipt and retain one durable row', async () => {
  const messages=[];
  const s=scenario(async (_url, options) => {
    messages.push(JSON.parse(options.body));
    return Response.json({success:true});
  });
  const data={...fields, sessionId:'8161', city:'篡改', kind:'registration', message:''};
  assert.equal((await s.inquire({...data,sessionId:'999999'})).status,400);
  const responses=await Promise.all([s.inquire(data),s.inquire(data)]);
  for (const r of responses) {
    const receipt=await r.json();
    assert.equal(receipt.kind,'classroom_inquiry');
    assert.equal(receipt.session.city,'深圳');
    assert.equal(receipt.session.start,'2026-12-03');
    assert.equal(receipt.id,data.id);
  }
  assert.equal(s.db.prepare('SELECT count(*) AS n FROM contact_messages').get().n,1);
  assert.equal(messages.length,1);
  assert.match(messages[0].message,/8161 · 深圳/);
  assert.equal(messages[0]._subject,'悦心教室班次咨询 '+data.id);
  assert.equal((await s.inquire({...data,sessionId:'8226'})).status,409);
});
