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

export async function saveContact(id, fields, endpoint = contactEndpoint) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'omit',
    referrerPolicy: 'no-referrer',
    signal: AbortSignal.timeout(20000),
    body: JSON.stringify({id, ...fields}),
  });
  if (response.status === 400 || response.status === 413) throw new Error('请检查姓名、邮箱和留言内容后重新提交。');
  if (response.status === 429) throw new Error('提交较频繁，请稍等一分钟再重试。');
  if (!response.ok) throw new Error();
  const receipt = await response.json();
  if (receipt.saved !== true || receipt.id !== id) throw new Error();
  return receipt;
}
