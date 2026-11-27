import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from '../navigation.jsx';
import { contactEndpoint, forgetAttempt, identifyAttempt, saveContact } from '../contact.js';
import { inquiryPath, sessions, sessionDates } from './catalog.js';

const endpoint = new URL(inquiryPath, contactEndpoint).href;
const cities = [...new Set(sessions.map(session => session.city))];
const monthDay = date => Number(date.slice(5,7)) + '月' + Number(date.slice(8)) + '日';
const shortDates = session => monthDay(session.start) + (session.start === session.end ? '' : '–' + Number(session.end.slice(8)) + '日');

function InquiryForm({session}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const active = useRef(false);
  const attempt = useRef(null);
  const key = 'yx-classroom-inquiry-' + session.id;
  async function submit(event) {
    event.preventDefault();
    if (active.current) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const fields = {sessionId:session.id, name:values.get('name').trim(), email:values.get('email').trim(), message:values.get('message').trim()};
    if (!fields.name) { setError('请填写姓名。'); return; }
    active.current = true;
    setBusy(true);
    setError('');
    try {
      attempt.current = await identifyAttempt(fields, attempt.current, key);
      const result = await saveContact(attempt.current.id, fields, endpoint);
      if (result.kind !== 'classroom_inquiry' || result.session?.id !== session.id) throw new Error();
      setReceipt(result);
      forgetAttempt(key);
    } catch (cause) {
      setError(cause.message?.startsWith('请') || cause.message?.startsWith('提交较频繁')
        ? cause.message : '暂时无法确认是否已保存。请保留此页并重试，原班次和编号将继续使用。');
    } finally {
      active.current = false;
      setBusy(false);
    }
  }
  if (receipt) {
    const summary = ['悦心教室 · 班次咨询回执', '咨询编号：' + receipt.id, receipt.session.title,
      '班次 ' + receipt.session.id + ' · ' + receipt.session.city + ' · ' + sessionDates(receipt.session),
      '状态：咨询已保存，席位与开课安排待教务确认。', '联系邮箱：info@amachina.com'].join('\n');
    return <section className="classroom-inquiry" aria-label="咨询回执">
      <div role="status"><h3>咨询已保存</h3><p>{receipt.session.title} · {receipt.session.city} · {sessionDates(receipt.session)}</p>
        <p>咨询编号 <strong>{receipt.id}</strong></p>
        <p>开课和席位待教务确认。{receipt.notification === 'accepted' ? '通知已交给邮件服务。' : '如需及时联系，请向中心提供咨询编号。'}</p>
      </div>
      <a download={'悦心教室咨询-'+receipt.id+'.txt'} href={'data:text/plain;charset=utf-8,'+encodeURIComponent('\uFEFF'+summary)}>下载咨询回执</a>
    </section>;
  }
  return <form method="post" onSubmit={submit} className="classroom-inquiry" aria-label={session.title+'班次咨询'}>
    <h3>咨询此班次</h3>
    <p>{session.city} · {sessionDates(session)} · 班次 {session.id}</p>
    <fieldset disabled={busy}>
      <div className="classroom-fields">
        <label>姓名（必填）<input name="name" required maxLength={100} autoComplete="name" /></label>
        <label>回复邮箱（必填）<input name="email" required type="email" maxLength={254} autoComplete="email" /></label>
      </div>
      <label>想了解什么？（选填）<textarea name="message" maxLength={4000} rows="3" placeholder="例如开课安排、适合对象或报名条件" /></label>
      <p>悦心会保存咨询，并通过 FormSubmit 将姓名、邮箱和咨询内容转发给负责人。转发记录保留 30 天。</p>
      <button type="submit" className="classroom-submit">{busy ? '正在提交…' : '提交班次咨询'}</button>
    </fieldset>
    {error && <p role="alert">{error}</p>}
  </form>;
}

export function ClassroomPage() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('session');
  const city = cities.includes(params.get('city')) ? params.get('city') : '';
  const visible = sessions.filter(item => !city || item.city === city);
  const activeRow = useRef(null);
  useEffect(() => { if (selected) activeRow.current?.scrollIntoView({block:'start'}); }, [selected]);
  function filter(value) { setParams(value ? {city:value} : {}); }
  return <main className="classroom-page">
    <header className="classroom-heading">
      <h1>悦心教室</h1>
      <p>查看近期公开课，向教务咨询适合你的班次。</p>
    </header>
    <section aria-labelledby="schedule-title">
      <div className="classroom-toolbar"><div><h2 id="schedule-title">2026 年 12 月公开课</h2>
        <p>以下为原课表参考安排。所有班次均待教务确认，目前仅接受咨询。</p></div>
        <div className="classroom-city"><label htmlFor="classroom-city">城市</label><select id="classroom-city" value={city} onChange={event => filter(event.target.value)}>
          <option value="">全部城市</option>{cities.map(item => <option key={item}>{item}</option>)}
        </select></div>
      </div>
      <ul className="classroom-list">
        {visible.map(session => {
          const expanded = selected === session.id;
          const query = new URLSearchParams(city ? {city} : {});
          if (!expanded) query.set('session',session.id);
          return <li key={session.id} ref={expanded ? activeRow : null}>
            <div className="classroom-row">
              <div className="classroom-date">{shortDates(session)}<small>{session.city}</small></div>
              <div><h3>{session.title}</h3><p>待教务确认</p></div>
              <Link to={'/classroom/?'+query.toString()} aria-expanded={expanded}
                aria-label={(expanded?'收起咨询：':'咨询班次：') + session.title}
                className="classroom-action">{expanded ? '收起咨询' : '咨询班次'}</Link>
            </div>
            {expanded && <InquiryForm session={session} />}
          </li>;
        })}
      </ul>
      <p className="classroom-help">也可联系 <a href="mailto:info@amachina.com">info@amachina.com</a>，并注明课程名称和城市。</p>
    </section>
  </main>;
}
