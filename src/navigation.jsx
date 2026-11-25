import { Link as RouterLink, useParams } from 'react-router-dom';

// Both Vite source modules (/src/) and published bundles (/assets/) are
// exactly one directory below the site root. No repository name is hardcoded.
const moduleUrl = import.meta.url;
export const siteBase = typeof document === 'undefined'
  ? '/'
  : new URL('../', moduleUrl).pathname;

export function siteHref(path = '/') {
  return siteBase + path.replace(/^\//, '');
}

export function Link(props) {
  return <RouterLink {...props} />;
}

export { useParams };
