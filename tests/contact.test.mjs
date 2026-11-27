import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { createContactHandler } from '../worker/contact.js';

const sql = readFileSync(new URL('../drizzle/0000_contact_messages.sql', import.meta.url), 'utf8');
const origin = 'https://www.amachina-yuexin.com';
const endpoint = 'https://backend.example/api/contact';
const fields = {id:crypto.randomUUID(),name:'测试',email:'visitor@example.invalid',message:'仅供测试'};
function scenario(send, mail = true) {
  const db = new DatabaseSync(':memory:');
  db.exec(sql);
  let now = 100000;
  const env = {DB:{prepare: query => ({bind(...args) {
    const statement = db.prepare(query);
    return {
      run: async () => ({meta: statement.run(...args)}),
      first: async () => statement.get(...args),
      all: async () => ({results:statement.all(...args)}),
    };
  }})}, CONTACT_RETRY_TOKEN:'test-token'};
  if (mail) Object.assign(env,{CONTACT_FROM:'website@example.invalid',RESEND_API_KEY:'test-only'});
  const handler=createContactHandler(send,()=>now);
  return {
    db, env, advance: ms => { now+=ms; },
    submit: (data=fields, headers={Origin:origin,'Content-Type':'application/json'}) =>
      handler(new Request(endpoint,{method:'POST',headers,body:JSON.stringify(data)}),env),
    retry: (key='test-token') => handler(new Request(endpoint+'/retry',{method:'POST',headers:{Authorization:'Bearer '+key}}),env),
  };
}

test('a committed submission survives a lost response, double click and concurrent replay', async () => {
  const calls=[];
  const s = scenario(async (url, options) => {
    calls.push({url, ...options});
    return Response.json({id:'provider-receipt'});
  });
  const receipts=await Promise.all([s.submit(),s.submit(),s.submit()]);
  for (const r of receipts) assert.equal((await r.json()).id,fields.id);
  assert.equal((await (await s.submit()).json()).notification,'accepted');
  assert.equal(s.db.prepare('SELECT count(*) AS n FROM contact_messages').get().n,1);
  assert.equal(calls.length,1);
  assert.equal(calls[0].headers['Idempotency-Key'],'contact/'+fields.id);
  const notification=JSON.parse(calls[0].body);
  assert.deepEqual(notification.to,['info@amachina.com']);
  assert.equal(notification.reply_to,fields.email);
  assert.ok(notification.text.includes(fields.message));
  assert.equal((await s.submit({...fields,message:'另一次编辑'})).status,409);
});

test('failed delivery stays durable and the protected retry recovers with the same provider key', async () => {
  const keys=[];
  const s=scenario(async (_url,options)=>{
    keys.push(options.headers['Idempotency-Key']);
    return keys.length===1 ? new Response(null,{status:503}) : Response.json({id:'retry-receipt'});
  });
  assert.equal((await (await s.submit()).json()).notification,'pending');
  assert.equal((await s.retry('incorrect')).status,403);
  assert.deepEqual(await (await s.retry()).json(),{checked:0,accepted:0});
  s.advance(61000);
  assert.deepEqual(await (await s.retry()).json(),{checked:1,accepted:1});
  assert.deepEqual(keys,[keys[0],keys[0]]);
  assert.equal(s.db.prepare('SELECT provider_id FROM contact_messages').get().provider_id,'retry-receipt');
});

test('an unconfigured sender records a pending message for delivery after configuration', async () => {
  let count=0;
  const s=scenario(async ()=>{count++; return Response.json({id:'later'});},false);
  const r=await s.submit();
  assert.deepEqual(await r.json(),{saved:true,notification:'pending',id:fields.id});
  assert.equal(count,0);
  assert.equal((await s.retry()).status,503);
  s.advance(48*3600000);
  Object.assign(s.env,{CONTACT_FROM:'site@example.invalid',RESEND_API_KEY:'fixture'});
  assert.deepEqual(await (await s.retry()).json(),{checked:1,accepted:1});
});

test('uncertain delivery beyond the provider dedupe window is held for review', async () => {
  let calls=0;
  const s=scenario(async ()=>{calls++; throw new Error('lost receipt');});
  await s.submit();
  s.advance(24*3600000);
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
