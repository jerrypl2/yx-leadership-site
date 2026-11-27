import { buildVersion } from './site-version.mjs';
import { build } from 'esbuild';
import { readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist/client');
const renderer = join(root, '.build/renderer.mjs');
const routes = JSON.parse(await readFile(join(root, 'src/routes.json'), 'utf8'));
const viteIndex = await readFile(join(out, 'index.html'), 'utf8');
const appBundle = viteIndex.match(/<script\b[^>]*\bsrc="\.\/([^"\s]+)"/)[1];
await mkdir(dirname(renderer), { recursive: true });
await build({
  entryPoints: [join(root, 'src/entry-server.jsx')],
  outfile: renderer, bundle: true, platform: 'node', format: 'esm',
  define: {__SITE_VERSION__: buildVersion()},
  packages: 'external', jsx: 'automatic', logLevel: 'warning',
});
const { renderRoute } = await import(pathToFileURL(renderer));
await mkdir(join(out, 'assets'), { recursive: true });
await cp(join(root, 'public/media'), join(out, 'media'), { recursive: true });
await cp(join(root, 'src/styles.css'), join(out, 'assets/site.css'));
await cp(join(root, 'src/enhance.js'), join(out, 'assets/site.js'));

function documentFor(route) {
  const segments = route.split('/').filter(Boolean);
  const prefix = segments.length ? '../'.repeat(segments.length) : './';
  const body = renderRoute(route).replace(/\b(href|src)="\/([^"\s]*)"/g, (_, attribute, target) => {
    if (attribute === 'href') {
      const [path, hash] = target.split('#');
      if (!path || routes.includes('/' + path.replace(/\/$/, ''))) {
        target = (path ? path.replace(/\/$/, '') + '/' : '') + (hash ? '#' + hash : '');
      }
    }
    return `${attribute}="${prefix}${target}"`;
  });
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YX Leadership Center</title>
  <meta name="description" content="悦心领导力中心：在关键时刻，让关键的事发生。">
  <meta name="app-module" content="${prefix}${appBundle}">
  <link rel="stylesheet" href="${prefix}assets/site.css">
  <script src="${prefix}assets/site.js" defer></script>
</head>
<body><div id="root">${body}</div></body>
</html>
`;
}

for (const route of routes) {
  const directory = join(out, route.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), documentFor(route));
}
await writeFile(join(out, '.nojekyll'), '');
// Keep unknown URLs self-contained, including deeply nested GitHub Pages 404s.
const { name } = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const projectName = process.env.GITHUB_REPOSITORY?.split('/').pop() || name;
const caseListPaths = [`/${projectName}/cases/`, '/cases/'];
await writeFile(join(out, '404.html'), `<!doctype html>
<html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>页面未找到 · 悦心领导力中心</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;text-align:center;font:16px/1.5 system-ui,sans-serif;color:#171717}h1{font-size:36px;font-weight:500}p{color:#717182}nav{display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:center}a{color:inherit}button{font:inherit;padding:12px 24px;border:0;border-radius:8px;background:#030213;color:white;cursor:pointer}</style>
<main>
  <h1>页面未找到</h1><p>您访问的页面可能已移动或不存在。</p>
  <nav aria-label="页面导航">
    <a id="case-list" href="https://www.amachina-yuexin.com/cases/">返回案例列表</a>
    <button onclick="history.back()">返回上一页</button>
  </nav>
</main>
<script>
  const caseLink = document.getElementById('case-list');
  const listPath = ${JSON.stringify(caseListPaths)}.find(path => location.pathname.startsWith(path));
  if (listPath) {
    caseLink.href = new URL(listPath, location.href).href;
  } else {
    caseLink.hidden = true;
  }
</script>
<script type="module">
  const projectBase = ${JSON.stringify('/' + projectName + '/')};
  const base = location.pathname.startsWith(projectBase) ? projectBase : '/';
  import(base + ${JSON.stringify(appBundle)});
</script>
</html>`);
console.log(`Built ${routes.length} complete static pages in dist/client`);
