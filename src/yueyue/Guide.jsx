import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { siteBase, siteHref } from '../navigation.jsx';
import { answerQuestion } from './knowledge.js';
import { startVoice } from './voice.js';
import style from './guide.css?inline';
import mascot from './yueyue.webp';

const apiOrigin = 'https://yueyue-leadership-api.hejun-alvin.chatgpt.site';
const suggestions = ['悦心能做什么？', '推荐一个半导体案例', '怎么联系顾问？'];
const initialNote = '需要我帮您找什么吗？可以说说团队最近遇到的难题，我陪您找找合适的方法和案例。';

function Guide() {
  const [open, setOpen] = useState(false);
  const [hint, setHint] = useState(false);
  const [hintLeft, setHintLeft] = useState(16);
  const [still, setStill] = useState(() => {
    try { return localStorage.getItem('yueyue-still') === '1'; } catch { return false; }
  });
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState('cloud');
  const [voiceActive, setVoiceActive] = useState(false);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const launcher = useRef(null);
  const input = useRef(null);
  const log = useRef(null);
  const worker = useRef(null);
  const timer = useRef(null);
  const pending = useRef(null);
  const topic = useRef('');
  const textRequest = useRef(null);
  const call = useRef(null);
  const audio = useRef(null);
  const available = typeof Worker !== 'undefined' && !!navigator.gpu;

  function add(role, text, sources = []) {
    setMessages(items => [...items.slice(-39), { role, text, sources }]);
  }
  function stopModel(note = '') {
    clearTimeout(timer.current);
    worker.current?.terminate();
    worker.current = null;
    if (pending.current) {
      const answer = pending.current;
      pending.current = null;
      add('assistant', answer.text, answer.sources);
    }
    setBusy(false);
    setMode('off');
    setStatus(note);
  }
  function armTimer(ms) {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => stopModel('设备响应超时，已切回官网问答。'), ms);
  }
  function enableModel() {
    if (worker.current || !available) return;
    setMode('loading');
    setStatus('正在准备模型…');
    try {
      const w = new Worker(new URL('./model-worker.js', import.meta.url), { type: 'module' });
      worker.current = w;
      w.onerror = () => { if (worker.current === w) stopModel('模型暂时无法运行，您仍可使用官网问答。'); };
      w.onmessage = ({ data }) => {
        if (worker.current !== w) return;
        if (data.type === 'progress') {
          armTimer(120000);
          const percent = Math.min(100, Math.round((data.progress || 0) * 100));
          setStatus(percent ? '正在准备模型 ' + percent + '%' : '正在准备模型…');
        } else if (data.type === 'ready') {
          clearTimeout(timer.current);
          setMode('ready');
          setStatus('本机 AI 已就绪');
        } else if (data.type === 'answer' && pending.current) {
          clearTimeout(timer.current);
          add('assistant', data.text, pending.current.sources);
          pending.current = null;
          setBusy(false);
        } else if (data.type === 'error') stopModel('模型暂时无法运行，已切回官网问答。');
      };
      armTimer(120000);
      w.postMessage({ type: 'load' });
    } catch { stopModel('当前设备无法启动模型，您仍可使用官网问答。'); }
  }

  function endCloud() {
    textRequest.current?.abort();
    textRequest.current = null;
    call.current?.dispose();
    call.current = null;
  }
  function speak() {
    if (call.current) { call.current.stop(); return; }
    if (!navigator.mediaDevices?.getUserMedia || typeof RTCPeerConnection === 'undefined') {
      setStatus('当前浏览器无法使用麦克风，请用文字提问。');
      return;
    }
    setVoiceActive(true);
    setStatus('正在连接语音…');
    try {
      call.current = startVoice(apiOrigin + '/api/yueyue/voice', audio.current, setStatus, note => {
        call.current = null; setVoiceActive(false); setStatus(note);
      });
    } catch { setVoiceActive(false); setStatus('语音未能启动，请用文字提问。'); }
  }
  async function askCloud(q, previousTopic, page, fallback) {
    const task = new AbortController();
    textRequest.current = task;
    setBusy(true); setStatus('GPT-6 Luna 正在回答…');
    const timeout = setTimeout(() => task.abort(), 40000);
    try {
      const response = await fetch(apiOrigin + '/api/yueyue/text', {
        method:'POST', credentials:'omit', signal:task.signal, headers:{'Content-Type':'application/json'},
        body:JSON.stringify({question:q, topic:previousTopic, page,
          history:messages.slice(-4).map(m=>({role:m.role,content:m.text.slice(0,500)}))}),
      });
      if (!response.ok) throw Error('service');
      const data = await response.json();
      if (typeof data.text !== 'string' || !data.text.trim()) throw Error('empty');
      if (textRequest.current !== task) return;
      add('assistant',data.text,fallback.sources);
      setStatus('GPT-6 Luna');
    } catch {
      if (textRequest.current !== task) return;
      add('assistant','官网资料：' + fallback.text,fallback.sources);
      setStatus('云端暂时不可用，本条来自官网资料。');
    } finally {
      clearTimeout(timeout);
      if (textRequest.current === task) { textRequest.current = null; setBusy(false); }
    }
  }

  useEffect(() => {
    function leave() { endCloud(); setBusy(false); setVoiceActive(false); }
    window.addEventListener('pagehide', leave);
    return () => {
      window.removeEventListener('pagehide', leave);
      endCloud(); clearTimeout(timer.current); worker.current?.terminate();
    };
  }, []);
  useEffect(() => { if (open) input.current?.focus({ preventScroll: true }); }, [open]);
  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight; }, [messages, open, busy]);
  useEffect(() => {
    if (!open && !hint) return;
    function escape(event) {
      if (event.key !== 'Escape') return;
      if (open) close();
      setHint(false);
    }
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [open, hint]);

  function greet() {
    if (open || !launcher.current) return;
    const { left, width } = launcher.current.getBoundingClientRect();
    setHintLeft(Math.max(10, Math.min(window.innerWidth - 202, left + width / 2 - 94)));
    setHint(true);
  }
  function close() {
    if (textRequest.current || call.current || mode === 'cloud') { endCloud(); setBusy(false); setVoiceActive(false); setStatus(''); }
    launcher.current?.focus({ preventScroll: true });
    setOpen(false);
    setHint(false);
  }
  function toggleWalk() {
    const next = !still;
    setStill(next);
    try { localStorage.setItem('yueyue-still', next ? '1' : '0'); } catch { /* Optional preference. */ }
  }
  function ask(value) {
    const q = value.trim().slice(0, 320);
    if (!q || busy || textRequest.current || pending.current) return;
    const page = location.pathname.slice(siteBase.length).replace(/\/index\.html$/, '');
    const previousTopic = topic.current;
    const answer = answerQuestion(q, previousTopic, page);
    topic.current = answer.topic;
    add('user', q);
    setDraft('');
    if (mode === 'cloud') { void askCloud(q,previousTopic,page,answer); return; }
    if (mode !== 'ready' || !worker.current) {
      add('assistant', answer.text, answer.sources);
      return;
    }
    const facts = answer.sources.map(c => c.title + '：' + c.answer).join('\n');
    const system = '你叫悦悦，是悦心领导力中心的中文向导。用简明、自然的中文回答。涉及悦心的事实只依据下列官网资料。未公开的价格、排期、客户身份或业绩不可猜测。通用管理建议请说明是建议。不要编造网址或替访客预约。\n官网资料：\n' + facts;
    pending.current = answer;
    setBusy(true);
    armTimer(90000);
    try {
      worker.current.postMessage({ type: 'answer', messages: [
        { role: 'system', content: system },
        ...messages.slice(-2).map(m => ({ role: m.role, content: m.text.slice(0, 220) })),
        { role: 'user', content: q },
      ] });
    } catch { stopModel('已切回官网问答。'); }
  }

  return <aside className="yy" lang="zh-CN" aria-label="悦悦网站助手" data-frozen={open || hint || still}>
    <style>{style}</style>
    <div className="yy-track"><div className="yy-walker">
      <button ref={launcher} className="yy-mascot" aria-label={open ? '收起悦悦对话' : '和悦悦聊聊'}
        aria-expanded={open} aria-controls="yy-dialog" aria-describedby={hint && !open ? 'yy-hint' : undefined}
        onPointerEnter={e => { if (e.pointerType === 'mouse' || e.pointerType === 'pen') greet(); }}
        onPointerLeave={() => setHint(false)} onFocus={e => { if (e.target.matches(':focus-visible')) greet(); }}
        onBlur={() => setHint(false)} onClick={() => { if (open) close(); else { setHint(false); setOpen(true); } }}>
        <img src={mascot} alt="" draggable="false" /><span>悦悦</span>
      </button>
    </div></div>
    {hint && !open && <div id="yy-hint" className="yy-hint" role="tooltip" style={{ left: hintLeft }}>
      有什么需要我帮忙的吗？<small>点我聊聊</small>
    </div>}
    {open && <section id="yy-dialog" className="yy-panel" role="dialog" aria-labelledby="yy-title">
      <header className="yy-head"><div className="yy-avatar"><img src={mascot} alt="" /></div>
        <div><h2 id="yy-title">悦悦</h2><p>悦心领导力中心 · 网站向导</p></div>
        <button className="yy-close" aria-label="关闭对话" onClick={close}>×</button>
      </header>
      <div className="yy-log" role="log" aria-label="对话记录" aria-live="polite" ref={log}>
        <div className="yy-msg"><b>悦悦</b><p>{initialNote}</p></div>
        {!messages.length && <div className="yy-ideas">{suggestions.map(q =>
          <button key={q} onClick={() => ask(q)}>{q}</button>)}</div>}
        {messages.map((m, i) => <div className={'yy-msg ' + (m.role === 'user' ? 'yy-user' : '')} key={i}>
          <b>{m.role === 'user' ? '您' : '悦悦'}</b><p>{m.text}</p>
          {m.sources.length > 0 && <div className="yy-links">{m.sources.map(s =>
            <a key={s.path} href={siteHref(s.path.startsWith('#') ? '/' + s.path : '/' + s.path + '/')}>{s.title} ↗</a>)}</div>}
        </div>)}
        {busy && <p className="yy-note">悦悦正在思考…</p>}
      </div>
      <form className="yy-form" onSubmit={e => { e.preventDefault(); ask(draft); }}>
        <input ref={input} aria-label="给悦悦的问题" placeholder="问悦悦一个问题…" value={draft} maxLength={320}
          onChange={e => setDraft(e.target.value)} />
        <button type="submit" disabled={!draft.trim() || busy}>发送</button>
      </form>
      {mode === 'cloud' && <div className="yy-voice">
        <button type="button" onClick={speak} aria-pressed={voiceActive}>{voiceActive ? '结束语音' : '与悦悦语音通话'}</button>
        <span>文字和语音由 OpenAI 处理</span>
        <audio ref={audio} autoPlay controls hidden={!voiceActive} />
      </div>}
      <details className="yy-settings"><summary>对话与动画设置</summary>
        <div><button aria-pressed={still} onClick={toggleWalk}>{still ? '继续散步' : '暂停散步'}</button>
        {mode === 'cloud' ? <button onClick={() => { endCloud(); setBusy(false); setVoiceActive(false); setStatus(''); setMode('off'); }}>仅使用本地问答</button>
          : <button onClick={() => { stopModel(); setMode('cloud'); }}>使用云端对话</button>}
        {mode === 'off' && available && <button onClick={enableModel}>启用本机 AI</button>}
        {(mode === 'loading' || mode === 'ready') && <button onClick={() => stopModel()}>{mode === 'loading' ? '取消下载' : '切回官网问答'}</button>}</div>
        {mode !== 'cloud' && <p>官网资料可直接使用。支持的设备可另行下载约 300 MB 本机模型。</p>}
      </details>
      <div className="yy-mode" role="status">{status || (mode === 'cloud' ? 'GPT-6 Luna 文字 · GPT-Live 语音' : mode === 'ready' ? '本机 AI 已就绪' : '官网问答')}</div>
    </section>}
  </aside>;
}
export function mountGuide() {
  const node = document.createElement('div');
  node.id = 'yueyue-root';
  document.body.append(node);
  createRoot(node).render(<Guide />);
}
