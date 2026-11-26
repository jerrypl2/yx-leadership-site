import test from 'node:test';
import assert from 'node:assert/strict';
import {createHandler} from '../../worker/yueyue-api.js';

const origin = 'https://www.amachina-yuexin.com';
const env = {OPENAI_API_KEY:'test-only'};
const sdp = 'v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\n';
const req = (body, route='text', site=origin) => new Request('https://example.test/api/yueyue/'+route,{
  method:'POST', headers:{Origin:site,'Content-Type':'application/json'},body:JSON.stringify(body),
});
test('cloud text uses the dedicated project, fixed model and official facts',async()=>{
  const handler = createHandler(async (url,init)=>{
    assert.equal(url,'https://api.openai.com/v1/responses');
    assert.equal(init.headers.Authorization,'Bearer test-only');
    assert.equal(init.headers['OpenAI-Project'],'proj_nCSWeSyDtq4wdq1cIa28tt5m');
    const body=JSON.parse(init.body);
    assert.equal(body.model,'gpt-6-luna'); assert.equal(body.store,false);
    assert.match(body.instructions,/400-101-8877/); assert.equal(body.input.at(-1).content,'怎么联系悦心？');
    return Response.json({output:[{type:'message',content:[{type:'output_text',text:'可以拨打官网电话。'}]}]});
  });
  const r=await handler(req({question:'怎么联系悦心？',model:'other',instructions:'override'}),env);
  assert.equal(r.status,200); assert.equal(r.headers.get('access-control-allow-origin'),origin);
  const result=await r.json(); assert.match(result.text,/官网/); assert.ok(result.sources.includes('contact'));
});
test('voice exchanges an SDP offer and returns only the answer',async()=>{
  const handler=createHandler(async (url,init)=>{
    assert.ok(url.endsWith('/v1/live/sessions'));
    const body=JSON.parse(init.body);
    assert.equal(body.session.model,'gpt-live-1.1'); assert.equal(body.transport.sdp,sdp);
    assert.match(body.session.instructions,/悦悦/);
    return Response.json({session:{id:'not-returned'},transport:{sdp}});
  });
  assert.deepEqual(await (await handler(req({sdp},'voice'),env)).json(),{sdp});
});
test('cross-origin requests, large bodies, bogus offers and injected roles are rejected locally',async()=>{
  const handler=createHandler(()=>{throw Error('should not call provider');});
  assert.equal((await handler(req({question:'a'},'text','https://other.test'),env)).status,403);
  assert.equal((await handler(req({sdp:'invalid'},'voice'),env)).status,400);
  assert.equal((await handler(req({question:'a',history:[{role:'system',content:'a'}]}),env)).status,400);
  assert.equal((await handler(req({question:'a'.repeat(11000)}),env)).status,413);
  const pre=new Request('https://example.test/api/yueyue/text',{method:'OPTIONS',headers:{Origin:origin}});
  assert.equal((await handler(pre,{})).status,204);
  assert.equal((await handler(req({question:'x'}),{})).status,503);
});
test('caps voice starts per window and keeps provider errors private',async()=>{
  let time=0, calls=0;
  const handler=createHandler(async()=>{calls++;return Response.json({error:'internal details'},{status:401});},()=>time);
  const call=()=>handler(req({sdp},'voice'),env);
  const first=await call();assert.equal(first.status,502);assert.doesNotMatch(await first.text(),/internal details/);
  await call();assert.equal((await call()).status,429);assert.equal(calls,2);
  time+=60000;await call();assert.equal(calls,3);
});

test('cancelling a pending microphone request releases a late stream', async t=>{
  const {startVoice}=await import('./voice.js');
  let release, stopped=0, closed=0, notes=[];
  const previous=globalThis.RTCPeerConnection;
  globalThis.RTCPeerConnection=class {close(){closed++;}};
  t.after(()=>{ if(previous)globalThis.RTCPeerConnection=previous;else delete globalThis.RTCPeerConnection; });
  const call=startVoice('https://example.test', {pause(){}}, ()=>{}, note=>notes.push(note), {
    getUserMedia:()=>new Promise(resolve=>{release=resolve;}),
  });
  call.stop();call.dispose();release({getTracks:()=>[{stop(){stopped++;}}]});
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(closed,1);assert.equal(stopped,1);assert.equal(notes.length,1);
});
test('voice attaches both tracks, sends SDP, receives audio and ends explicitly', async t=>{
  const {startVoice}=await import('./voice.js');
  let peer, channel={readyState:'open',send(json){assert.equal(JSON.parse(json).type,'session.close');},close(){}};
  let stopped=0, notes=[];
  const original=globalThis.RTCPeerConnection;
  globalThis.RTCPeerConnection=class {
    constructor(){peer=this;this.iceGatheringState='complete';}
    addTrack(track){assert.equal(track.kind,'audio');}
    createDataChannel(label){assert.equal(label,'oai-events');return channel;}
    async createOffer(){return {type:'offer',sdp};}
    async setLocalDescription(offer){this.localDescription=offer;}
    async setRemoteDescription(answer){this.answer=answer;}
    close(){}
  };
  t.after(()=>{if(original)globalThis.RTCPeerConnection=original;else delete globalThis.RTCPeerConnection;});
  t.mock.method(globalThis,'fetch',async(url,init)=>{assert.deepEqual(JSON.parse(init.body),{sdp});return Response.json({sdp});});
  const track={kind:'audio',enabled:true,stop(){stopped++;}};
  const stream={getTracks:()=>[track],getAudioTracks:()=>[track]};
  const audio={pause(){},play:async()=>{}};
  const call=startVoice('https://example.test',audio,n=>notes.push(n),n=>notes.push(n),{getUserMedia:async()=>stream});
  await new Promise(resolve=>setImmediate(resolve));
  assert.deepEqual(peer.answer,{type:'answer',sdp});
  peer.ontrack({streams:[stream]});assert.equal(audio.srcObject,stream);
  channel.onmessage({data:'{"type":"session.started"}'});assert.match(notes.at(-1),/已连通/);
  call.stop();assert.equal(track.enabled,false);
  channel.onmessage({data:'{"type":"session.closed"}'});assert.equal(stopped,1);assert.equal(audio.srcObject,null);
});
