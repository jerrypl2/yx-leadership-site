import { pathToFileURL } from 'node:url';

export function nextVersion(html) {
  const current = html.match(/\bVersion\s+(\d+)\.(\d+)\s*<\/p>/);
  if (!current || !Number.isSafeInteger(Number(current[2]) + 1)) {
    throw new Error('Cannot determine the published homepage version.');
  }
  return current[1] + '.' + (Number(current[2]) + 1);
}

export function buildVersion() {
  const value = process.env.SITE_VERSION || '0.3';
  if (!/^\d+\.\d+$/.test(value)) throw new Error('Invalid SITE_VERSION');
  return JSON.stringify(value);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const url = new URL('https://www.amachina-yuexin.com/');
  url.searchParams.set('release-check', crypto.randomUUID());
  const response = await fetch(url, {cache:'no-store', signal:AbortSignal.timeout(20000)});
  if (!response.ok) throw new Error('Cannot read the current website version: HTTP ' + response.status);
  console.log('SITE_VERSION=' + nextVersion(await response.text()));
}
