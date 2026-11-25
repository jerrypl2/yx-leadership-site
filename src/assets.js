import manifest from './asset-manifest.json';
import { siteBase } from './navigation.jsx';

// Original image identifiers map exclusively to bundled, local files.
export function asset(source) {
  if (source.startsWith('data:')) return source;
  const filename = manifest[source];
  if (!filename) throw new Error(`Missing local image: ${source}`);
  return `${siteBase}media/${filename}`;
}
