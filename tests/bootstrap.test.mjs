import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { normalizeStaticPath, readContactValues } from '../src/bootstrap.js';

test('explicit HTML URLs resolve to the same routes at any deployment depth', () => {
  for (const base of ['/', '/yx-leadership-site/', '/nested/project/']) {
    for (const route of ['', 'about/', 'cases/1/']) {
      const url = new URL(base + route + 'index.html?preview=1#section', 'https://example.test');
      url.pathname = normalizeStaticPath(url.pathname);
      assert.equal(url.pathname, base + route);
      assert.equal(url.search, '?preview=1');
      assert.equal(url.hash, '#section');
    }
  }
  assert.equal(normalizeStaticPath('/opinions/'), '/opinions/');
  assert.equal(normalizeStaticPath('/index.html.backup'), '/index.html.backup');
});

test('typed contact values are captured before the static DOM is replaced', () => {
  const entered = { name: '测试访客', email: 'test@example.test', company: '企业', phone: '123', wechat: 'demo', message: '尚未提交的留言' };
  const form = { elements: { namedItem: name => ({ value: entered[name] }) } };
  const root = { querySelector: () => form };
  const snapshot = readContactValues(root);
  assert.deepEqual(snapshot, entered);
  entered.message = '';
  assert.equal(snapshot.message, '尚未提交的留言');
  assert.equal(readContactValues({ querySelector: () => null }), undefined);
});

test('the static form prevents GET submission even when the HTTP client module never loads', async () => {
  const script = await readFile(new URL('../src/enhance.js', import.meta.url), 'utf8');
  for (const protocol of ['https:', 'file:']) {
    let submit;
    let resets = 0;
    let prevented = false;
    const messages = [];
    const appended = [];
    const form = { addEventListener: (name, callback) => { assert.equal(name, 'submit'); submit = callback; }, reset: () => { resets++; } };
    vm.runInNewContext(script, {
      location: { protocol, href: protocol === 'file:' ? 'file:///site/contact/index.html' : 'https://example.test/site/contact/' },
      URL,
      alert: message => messages.push(message),
      document: {
        querySelector: selector => selector === 'form' ? form : { content: '../assets/app.js' },
        querySelectorAll: () => [],
        createElement: () => ({}),
        head: { append: element => appended.push(element) },
      },
    });
    assert.equal(typeof submit, 'function');
    submit({ preventDefault: () => { prevented = true; }, currentTarget: form });
    assert.equal(prevented, true);
    assert.equal(resets, 1);
    assert.deepEqual(messages, ['感谢您的留言！我们会尽快与您联系。']);
    assert.equal(appended.length, protocol === 'file:' ? 0 : 1);
  }
});
