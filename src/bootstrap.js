// Static pages also work when a visitor opens their explicit HTML filename.
export function normalizeStaticPath(pathname) {
  return pathname.replace(/\/index\.html$/, '/');
}

// Preserve anything typed into the visible static form while the app loads.
export function readContactValues(root) {
  const form = root?.querySelector('form');
  if (!form) return undefined;
  return Object.fromEntries(
    ['name', 'email', 'company', 'phone', 'wechat', 'message'].map(name => [
      name,
      form.elements.namedItem(name)?.value ?? '',
    ]),
  );
}
