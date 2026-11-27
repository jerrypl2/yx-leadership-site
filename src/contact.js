import {formSubmitUrl, readRelayResult} from './contact-relay.js';

export const contactEndpoint = 'https://yueyue-leadership-api.hejun-alvin.chatgpt.site/api/contact';
export const emptyContact = { name: '', email: '', company: '', phone: '', wechat: '', message: '' };
const storageKey = 'yx-contact-attempt-v1';

// A tab may lose the response after the server commits. Keep only a digest and
// an opaque request ID so a re-entered, identical draft can reuse its receipt.
export async function identifyAttempt(fields, previous, key = storageKey) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(fields)));
  const digest = Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
  let attempt = previous;
  if (!attempt) {
    try { attempt = JSON.parse(sessionStorage.getItem(key)); } catch { /* Private browsing. */ }
  }
  if (attempt?.digest !== digest || !attempt.id) attempt = {digest, id: crypto.randomUUID()};
  try { sessionStorage.setItem(key, JSON.stringify(attempt)); } catch { /* In-memory retry still works. */ }
  return attempt;
}

export function forgetAttempt(key = storageKey) {
  try { sessionStorage.removeItem(key); } catch { /* No persistent draft. */ }
}

async function postJson(endpoint, body, timeout = 20000) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: AbortSignal.timeout(timeout),
    body: JSON.stringify(body),
  });
}

export async function saveContact(id, fields, endpoint = contactEndpoint) {
  const response = await postJson(endpoint, {id, ...fields});
  if (response.status === 400 || response.status === 413) throw new Error('请检查姓名、邮箱和留言内容后重新提交。');
  if (response.status === 429) throw new Error('提交较频繁，请稍等一分钟再重试。');
  if (!response.ok) throw new Error();
  const receipt = await response.json();
  if (receipt.saved !== true || receipt.id !== id) throw new Error();
  return receipt;
}


export async function sendContact(id, fields, onSaved) {
  const receipt = await saveContact(id, {...fields, delivery:'browser'});
  if (receipt.notification !== 'awaiting_browser') return receipt;
  onSaved(receipt);

  let claim;
  try {
    const response = await postJson(contactEndpoint+'/dispatch', {id, ...fields});
    if (response.ok) claim = await response.json();
  } catch { /* Storage has already committed. */ }
  if (!claim?.granted) return {...receipt, notification:'unconfirmed'};

  let result = {state:'review'};
  try {
    const response = await fetch(formSubmitUrl, {
      method:'POST', credentials:'omit', redirect:'error', signal:AbortSignal.timeout(15000),
      headers:{'Content-Type':'application/json', Accept:'application/json'},
      body:JSON.stringify(claim.body),
    });
    result = await readRelayResult(response, Date.now());
  } catch { /* An uncertain provider response cannot safely be replayed. */ }

  // Retry only the database acknowledgement. The external email is sent once.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await postJson(contactEndpoint+'/receipt', {id, ticket:claim.ticket, ...result}, 4000);
      if (response.ok || response.status === 409) break;
    } catch { /* A lost acknowledgement may already have committed. */ }
  }
  return {...receipt, notification:result.state === 'sent' ? 'accepted' : result.state};
}
