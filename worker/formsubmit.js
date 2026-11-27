import { sessionDates } from '../src/classroom/catalog.js';
import {formSubmitUrl, formPage, notificationBody, readRelayResult} from '../src/contact-relay.js';
const minute = 60000;

async function updateState(db, id, state, nextAttempt = 0, diagnostic = null) {
  await db.prepare('UPDATE contact_messages SET notification_state=?, next_attempt_at=?, provider_id=? WHERE id=? AND notification_state=\'dispatching\'')
    .bind(state, nextAttempt, diagnostic, id).run();
}

export async function notify(db, row, send, now) {
  if (row.notification_state === 'sent') return 'accepted';
  if (row.notification_state !== 'pending' || row.next_attempt_at > now) return row.notification_state;

  // One service-wide lease also limits activation reminders across visitors.
  const lease = now + minute;
  const gate = await db.prepare(`INSERT INTO contact_delivery_gate(id, available_at) VALUES(1, ?)
    ON CONFLICT(id) DO UPDATE SET available_at=excluded.available_at WHERE available_at<=?`).bind(lease, now).run();
  if (!gate.meta.changes) return 'pending';

  let readyAt = now;
  try {
    const claimed = await db.prepare(`UPDATE contact_messages SET notification_state='dispatching',
      first_attempt_at=COALESCE(first_attempt_at,?), next_attempt_at=?, attempts=attempts+1
      WHERE id=? AND notification_state='pending' AND next_attempt_at<=?`).bind(now, lease, row.id, now).run();
    if (!claimed.meta.changes) return 'pending';

    const {name, email, message, session, kind} = JSON.parse(row.payload);
    const classroom = kind === 'classroom_inquiry' && session;
    const subject = (classroom ? '悦心教室班次咨询 ' : '悦心官网留言 ') + row.id;
    const mailText = classroom
      ? [session.title, '班次 ' + session.id + ' · ' + session.city, '参考日期 ' + sessionDates(session), '', message].join('\n')
      : message;
    let state = 'review';
    let nextAttempt = 0;
    let upstreamStatus = 0;
    let failure = 'none';
    try {
      const response = await send(formSubmitUrl, {
        method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(8000),
        headers: {'Content-Type':'application/json', Accept:'application/json', Referer:formPage},
        body: JSON.stringify(notificationBody({name, email, message:mailText}, subject)),
      });
      upstreamStatus = response.status;
      failure = response.ok ? 'unexpected_response' : 'http';
      const result = await readRelayResult(response, now);
      state = result.state;
      if (state === 'pending') {
        nextAttempt = now + result.delay;
        readyAt = nextAttempt;
      } else if (state === 'activation') {
        readyAt = now + 6 * 60 * minute;
      }
    } catch (error) {
      if (!upstreamStatus) failure = ['TypeError','TimeoutError','AbortError'].includes(error?.name) ? error.name : 'network';
      // The provider has no idempotency key. A lost acknowledgement needs human
      // reconciliation, because an automatic replay could send a second email.
    }
    if (state === 'review') console.warn('contact relay requires review', {status:upstreamStatus, reason:failure});
    const diagnostic = state === 'review' ? 'formsubmit/' + upstreamStatus + '/' + failure : null;
    await updateState(db, row.id, state, nextAttempt, diagnostic);
    return state === 'sent' ? 'accepted' : state;
  } finally {
    await db.prepare('UPDATE contact_delivery_gate SET available_at=? WHERE id=1 AND available_at=?').bind(readyAt, lease).run();
  }
}

export async function retryNotifications(db, send, now) {
  await db.prepare("UPDATE contact_messages SET notification_state='pending' WHERE notification_state='awaiting_browser' AND next_attempt_at<=?").bind(now).run();
  await db.prepare("UPDATE contact_messages SET notification_state='review' WHERE notification_state IN ('dispatching','browser_dispatching') AND next_attempt_at<=?").bind(now).run();
  const {results} = await db.prepare("SELECT * FROM contact_messages WHERE notification_state='pending' AND next_attempt_at<=? ORDER BY next_attempt_at, created_at LIMIT 10").bind(now).all();
  let accepted = 0;
  for (const row of results) {
    if (await notify(db, row, send, now) === 'accepted') accepted++;
  }
  return {checked:results.length, accepted};
}
