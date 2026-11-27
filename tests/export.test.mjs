import { nextVersion, buildVersion } from '../scripts/site-version.mjs';
import { leadershipDimensions, leadershipModelPath } from '../src/business/leadership-model.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist/client');
const routes = JSON.parse(await readFile(join(root, 'src/routes.json'), 'utf8'));
const unescape = value => value.replaceAll('&amp;', '&');

for (const mount of ['/', '/yx-leadership-site/']) {
  test(`${routes.length} pages and all local links/assets resolve under ${mount}`, async () => {
    assert.equal(new Set(routes).size, routes.length);
    for (const route of routes) {
      const html = await readFile(join(output, route.slice(1), 'index.html'), 'utf8');
      assert.match(html, /<div id="root">/);
      assert.match(html, /<h1\b/);
      const pageUrl = new URL(mount + route.slice(1) + (route === '/' ? '' : '/'), 'https://example.test');
      const references = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map(match => unescape(match[1]));
      const modulePath = html.match(/name="app-module" content="([^"]+)"/)?.[1];
      assert.ok(modulePath, `Missing client module on ${route}`);
      references.push(modulePath);
      for (const reference of references) {
        if (reference.startsWith('data:') || reference === 'mailto:info@amachina.com') continue;
        const url = new URL(reference, pageUrl);
        assert.equal(url.origin, pageUrl.origin, `External runtime dependency: ${reference}`);
        assert.ok(url.pathname.startsWith(mount), `Escaped project path: ${route} → ${reference}`);
        let file = join(output, decodeURIComponent(url.pathname.slice(mount.length)));
        const info = await stat(file).catch(() => null);
        assert.ok(info, `Missing file: ${route} → ${reference}`);
        if (info.isDirectory()) file = join(file, 'index.html');
        assert.ok((await stat(file)).isFile());
        if (url.hash) {
          const target = await readFile(file, 'utf8');
          assert.ok(target.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${reference}`);
        }
      }
    }
  });
}

test('static 404 offers a history-independent link for missing cases', async () => {
  const html = await readFile(join(output, '404.html'), 'utf8');
  const fallback = html.match(/<a id="case-list" href="([^"]+)">返回案例列表<\/a>/)?.[1];
  assert.equal(fallback, 'https://www.amachina-yuexin.com/cases/');
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script);

  const projectName = process.env.GITHUB_REPOSITORY?.split('/').pop() || 'yx-leadership-site';
  for (const mount of ['/', `/${projectName}/`]) {
    const base = new URL(mount, 'https://example.test');
    for (const path of [
      'cases/999', 'cases/999/', 'cases/999/index.html?from=share#top',
      'other/999', 'archive/cases/999', 'missing?next=/cases/999',
    ]) {
      const link = { href: fallback, hidden: false };
      const document = { getElementById: id => id === 'case-list' ? link : null };
      runInNewContext(script, { URL, location: new URL(path, base), document });
      assert.equal(link.hidden, !path.startsWith('cases/'));
      if (!link.hidden) assert.equal(link.href, new URL('cases/', base).href);
    }
  }
});

test('contact form preserves the original required fields', async () => {
  const html = await readFile(join(output, 'contact/index.html'), 'utf8');
  for (const name of ['name', 'email', 'message']) {
    const tag = html.match(new RegExp(`<(?:input|textarea)\\b[^>]*\\bname="${name}"[^>]*>`))?.[0];
    assert.ok(tag && /\brequired(?:=|\s|>)/.test(tag), `Missing required ${name}`);
  }
  assert.match(html, /<input[^>]*type="email"/);
  assert.match(html, /<button[^>]*type="submit"/);
});

test('the published leadership model preserves its hierarchy, examples, and course or inquiry destinations', async () => {
  const model = await readFile(join(output, leadershipModelPath.slice(1), 'index.html'), 'utf8');
  assert.ok(model.includes('<title>领导力模型 · 悦心领导力中心</title>'));
  assert.equal(leadershipDimensions.length,4);
  assert.equal((model.match(/<h4>工作示例<\/h4>/g) || []).length,12);
  for (const dimension of leadershipDimensions) {
    assert.equal(dimension.aspects.length,3);
    assert.ok(model.includes('id="'+dimension.id+'"'));
    for (const aspect of dimension.aspects) {
      assert.ok(model.includes('<h3>'+aspect.title+'</h3>') && model.includes(aspect.behavior) && model.includes(aspect.example));
      if (aspect.courses) {
        for (const id of aspect.courses) assert.ok(model.includes('courses/'+id+'/'));
      } else {
        assert.ok(model.includes(aspect.historicalCourse));
        assert.ok(unescape(model).includes('contact/?'+new URLSearchParams({topic:aspect.topic,aspect:aspect.title})));
      }
    }
  }
});

test('all 14 original image files are bundled', async () => {
  const manifest = JSON.parse(await readFile(join(root, 'src/asset-manifest.json'), 'utf8'));
  const files = [...new Set(Object.values(manifest))];
  assert.equal(files.length, 14);
  for (const file of files) assert.ok((await stat(join(output, 'media', file))).size > 100);
});

test('homepage version survives static export and increments as an integer on the next release', async () => {
  const homepage = await readFile(join(output, 'index.html'),'utf8');
  const current=JSON.parse(buildVersion());
  const [major, minor]=current.split('.');
  assert.ok(homepage.includes('Version '+current+'</p>'));
  assert.equal(nextVersion(homepage),major+'.'+(Number(minor)+1));
  assert.equal(nextVersion('<p>测试版本 · Version 0.9</p>'),'0.10');
  assert.throws(()=>nextVersion('<h1>Unavailable</h1>'));
});

test('every published course has one canonical detail page, its aliases and the matching inquiry', async () => {
  const {courses} = await import('../src/business/courses.js');
  const {sessions} = await import('../src/classroom/catalog.js');
  const {topics} = await import('../src/business/topics.js');
  assert.equal(courses.length,15);
  assert.equal(new Set(courses.map(course=>course.id)).size,15);
  assert.equal(topics.length,5);
  const index = await readFile(join(output,'courses/index.html'),'utf8');
  const catalogPaths = routes.filter(path=>/^\/courses\/\d+$/.test(path));
  assert.equal(catalogPaths.length,courses.length);
  for (const course of courses) {
    assert.ok(catalogPaths.includes('/courses/'+course.id));
    const html = await readFile(join(output,'courses',course.id,'index.html'),'utf8');
    assert.ok(html.includes('<title>'+course.title+' · 悦心领导力中心</title>'));
    const scheduled=sessions.filter(item=>item.courseId===course.id);
    assert.ok(scheduled.length);
    assert.ok(index.includes(course.title));
    if (course.alias) assert.ok(index.includes(course.alias) && html.includes(course.alias));
    for (const session of scheduled) {
      assert.equal(session.title,course.title);
      assert.ok(html.includes('classroom/?session='+session.id));
    }
  }
  const enterprise = await readFile(join(output,'solutions/index.html'),'utf8');
  for (const topic of topics) {
    assert.ok(enterprise.includes('contact/?topic='+topic.id));
    assert.ok(topic.courseIds.every(id=>courses.some(course=>course.id===id)));
  }
});
