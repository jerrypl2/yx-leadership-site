const formUrl = 'https://www.amachina-yuexin.com/contact/';
const recipient = 'info@amachina.com';
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

    const {name, email, message} = JSON.parse(row.payload);
    let state = 'review';
    let nextAttempt = 0;
    let upstreamStatus = 0;
    let failure = 'none';
    try {
      const response = await send('https://formsubmit.co/ajax/' + recipient, {
        method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(8000),
        headers: {'Content-Type':'application/json', Accept:'application/json', Referer:formUrl},
        body: JSON.stringify({name, email, message, _replyto:email, _subject:'悦心官网留言 '+row.id, _url:formUrl}),
      });
      upstreamStatus = response.status;
      failure = 'http';
      if (response.status === 429) {
        const seconds = Number(response.headers.get('Retry-After')) || 60;
        nextAttempt = now + Math.max(minute, Math.min(86400000, seconds * 1000));
        state = 'pending';
        readyAt = nextAttempt;
      } else if (response.ok) {
        failure = 'unexpected_content';
        const result = await response.json();
        failure = 'declined';
        if (/email address/i.test(result.message || '')) failure = 'invalid_address';
        if (/spam|captcha/i.test(result.message || '')) failure = 'spam_filter';
        if (/web server|URL/i.test(result.message || '')) failure = 'invalid_form_url';
        if (result.success === true || result.success === 'true') {
          state = 'sent';
        } else if (/needs activation|activate (?:the |your )?form/i.test(result.message || '')) {
          // FormSubmit retains the submitted message and releases it on activation.
          // Leave further messages in D1 until the next probe to avoid reminder storms.
          state = 'activation';
          readyAt = now + 6 * 60 * minute;
        }
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
  await db.prepare("UPDATE contact_messages SET notification_state='review' WHERE notification_state='dispatching' AND next_attempt_at<=?").bind(now).run();
  const {results} = await db.prepare("SELECT * FROM contact_messages WHERE notification_state='pending' AND next_attempt_at<=? ORDER BY created_at LIMIT 10").bind(now).all();
  let accepted = 0;
  for (const row of results) {
    if (await notify(db, row, send, now) === 'accepted') accepted++;
  }
  return {checked:results.length, accepted};
}
