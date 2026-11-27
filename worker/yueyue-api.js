import { cards, answerQuestion } from '../src/yueyue/knowledge.js';
import { createContactHandler } from './contact.js';

const origins = new Set(['https://www.amachina-yuexin.com', 'https://amachina-yuexin.com', 'https://jerrypl2.github.io']);
const project = 'proj_nCSWeSyDtq4wdq1cIa28tt5m';
const guide = '你是悦心领导力中心官网的 AI 向导悦悦。用自然、简洁的中文回答。业务事实只依据官网资料。价格、档期、客户身份、成果不可猜测。一般管理建议要标明是建议。不要编造链接或代为预约。';
const facts = cards.map(card => card.title + '：' + card.answer).join('\n');
const limitWindow = 60_000;

// A short burst guard for each running instance. The OpenAI project spend limit
// separately applies across all instances and both models.
export function createHandler(upstream = fetch, clock = Date.now) {
  const contact = createContactHandler(upstream, clock);
  const windows = new Map();
  function admit(ip, voice) {
    const window = Math.floor(clock() / limitWindow);
    const key = (voice ? 'v:' : 't:') + ip;
    if (windows.size > 4096) {
      for (const [k, v] of windows) if (v.window !== window) windows.delete(k);
      if (windows.size > 4096 && !windows.has(key)) return false;
    }
    let entry = windows.get(key);
    if (!entry || entry.window !== window) {
      entry = {window, count: 0};
      windows.set(key, entry);
    }
    return ++entry.count <= (voice ? 2 : 12);
  }

  return async function handle(request, env) {
    const path = new URL(request.url).pathname;
    if (path === '/api/contact' || path === '/api/contact/retry') {
      return contact(request, env, () => admit('contact:' + (request.headers.get('CF-Connecting-IP') || 'unknown'), false));
    }
    const voice = path === '/api/yueyue/voice';
    const origin = request.headers.get('Origin');
    const headers = { 'Cache-Control': 'no-store', 'Vary': 'Origin' };
    const reply = (body, status = 200) => Response.json(body, {status, headers});
    if (!voice && path !== '/api/yueyue/text') return reply({error: 'not_found'}, 404);
    if (!origins.has(origin)) return reply({error: 'origin'}, 403);
    headers['Access-Control-Allow-Origin'] = origin;
    if (request.method === 'OPTIONS') {
      headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS';
      headers['Access-Control-Allow-Headers'] = 'Content-Type';
      return new Response(null, {status: 204, headers});
    }
    if (request.method !== 'POST') return reply({error: 'method'}, 405);
    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({error:'media_type'}, 415);
    const max = voice ? 70000 : 10000;
    if (Number(request.headers.get('content-length')) > max) return reply({error:'too_large'}, 413);
    let payload;
    const reader = request.body?.getReader();
    if (!reader) return reply({error:'empty'}, 400);
    try {
      let bytes = 0, text = '';
      const decoder = new TextDecoder();
      for (;;) {
        const {done, value} = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > max) { await reader.cancel(); return reply({error:'too_large'}, 413); }
        text += decoder.decode(value, {stream:true});
      }
      payload = JSON.parse(text + decoder.decode());
    } catch { return reply({error:'invalid_json'}, 400); }
    if (!payload || typeof payload !== 'object') return reply({error:'invalid'}, 400);
    let body, endpoint, sources;
    if (voice) {
      if (typeof payload.sdp !== 'string' || !/^v=0\r?\n/.test(payload.sdp) || !/^m=audio /m.test(payload.sdp)) return reply({error:'invalid_offer'}, 400);
      endpoint = 'live/sessions';
      body = {session:{model:'gpt-live-1.1', instructions:guide + ' 这是实时语音通话。每次用一到三句作答，给访客留出接话的机会。电话号码按数字逐位朗读，不合并或省略重复数字。官网电话 400-101-8877 必须完整读作“四零零，幺零幺，八八七七”，末尾有两个七。\n' + facts},transport:{type:'webrtc',sdp:payload.sdp}};
    } else {
      const question = typeof payload.question === 'string' ? payload.question.trim() : '';
      const history = payload.history ?? [];
      if (!question || question.length > 320 || !Array.isArray(history) || history.length > 4 ||
          history.some(m => !m || !['user','assistant'].includes(m.role) || typeof m.content !== 'string' || m.content.length > 500)) return reply({error:'invalid_question'}, 400);
      const page = typeof payload.page === 'string' ? payload.page.slice(0,90) : '';
      const topic = typeof payload.topic === 'string' ? payload.topic.slice(0,90) : '';
      const match = answerQuestion(question, topic, page);
      sources = match.sources.map(({path}) => path);
      endpoint = 'responses';
      body = {model:'gpt-6-luna', store:false, instructions:guide + '\n官网资料：\n' + facts,
        input:[...history.map(({role,content})=>({role,content})),{role:'user',content:question}], max_output_tokens:650};
    }
    if (!env.OPENAI_API_KEY) return reply({error:'unavailable'},503);
    if (!admit(request.headers.get('CF-Connecting-IP') || 'shared',voice)) return reply({error:'rate_limited'},429);
    try {
      const response = await upstream('https://api.openai.com/v1/' + endpoint, {
        method:'POST', headers:{Authorization:'Bearer ' + env.OPENAI_API_KEY,'OpenAI-Project':project,'Content-Type':'application/json'},
        body:JSON.stringify(body), signal:AbortSignal.timeout(35000),
      });
      if (!response.ok) return reply({error:response.status === 429 ? 'rate_limited' : 'provider_unavailable'},response.status === 429 ? 429 : 502);
      const data = await response.json();
      if (voice) {
        if (typeof data.transport?.sdp !== 'string' || !data.transport.sdp.startsWith('v=0')) return reply({error:'invalid_answer'},502);
        return reply({sdp:data.transport.sdp});
      }
      const text = (data.output ?? []).flatMap(item => item.type === 'message' ? item.content ?? [] : [])
        .filter(item => item.type === 'output_text').map(item => item.text).join('\n').trim();
      return text ? reply({text,sources}) : reply({error:'empty_answer'},502);
    } catch { return reply({error:'provider_unavailable'},502); }
  };
}
export default {fetch:createHandler()};
