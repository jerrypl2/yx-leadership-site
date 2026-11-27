export const formSubmitUrl = 'https://formsubmit.co/ajax/info@amachina.com';
export const formPage = 'https://www.amachina-yuexin.com/contact/';

export function notificationBody({name, email, message}, subject) {
  return {name, email, message, _replyto:email, _subject:subject, _url:formPage};
}

export function retryDelay(header, now) {
  if (!header) return 60000;
  const delay = /^\d+$/.test(header) ? Number(header) * 1000 : Date.parse(header) - now;
  return Number.isFinite(delay) ? Math.max(60000, delay) : 60000;
}

export async function readRelayResult(response, now) {
  if (response.status === 429) {
    return {state:'pending', delay:retryDelay(response.headers.get('Retry-After'), now)};
  }
  if (!response.ok) return {state:'review'};
  const data = await response.json();
  if (data.success === true || data.success === 'true') return {state:'sent'};
  if (/needs activation|activate (?:the |your )?form/i.test(data.message || '')) return {state:'activation'};
  return {state:'review'};
}
