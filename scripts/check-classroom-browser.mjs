// Local mode simulates the API on the preview. Live mode creates two labelled inquiries.
import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { sessions, inquiryPath } from '../src/classroom/catalog.js';
import { contactEndpoint } from '../src/contact.js';
const live = process.env.CLASSROOM_ACCEPTANCE_LIVE === '1';
const base = live ? 'https://www.amachina-yuexin.com' : 'http://127.0.0.1:4179';
const endpoint = new URL(inquiryPath,contactEndpoint).href;
const browser = await chromium.launch();
const results = [];
try {
  for (const mobile of [false,true]) {
    const context = await browser.newContext(mobile ? {...devices['iPhone 13'], defaultBrowserType:'chromium'} : {viewport:{width:1440,height:900}});
    const page = await context.newPage();
    const posts = [];
    let received;
    await page.route(endpoint,async route => {
      if (route.request().method() !== 'POST') return route.continue();
      const payload=route.request().postDataJSON();
      posts.push(payload);
      const upstream=live ? await route.fetch() : null;
      received=upstream ? await upstream.json() : {id:payload.id, saved:true, kind:'classroom_inquiry',
        session:sessions.find(item=>item.id===payload.sessionId), notification:'pending'};
      assert.equal(received.saved,true);
      if (mobile && posts.length===1) return route.abort('failed');
      if (upstream) return route.fulfill({response:upstream});
      return route.fulfill({json:received});
    });
    await page.goto(base+'/?qa='+crypto.randomUUID());
    const footer=page.locator('footer');
    await footer.getByText(/Version 0\.\d+/).waitFor();
    assert.equal(await page.getByRole('banner').getByRole('link',{name:'悦心教室',exact:true}).count(),0);
    await footer.getByRole('link',{name:'悦心教室',exact:true}).click();
    const actions=page.getByRole('link',{name:/^咨询班次：/});
    await actions.first().waitFor();
    assert.equal(await actions.count(),15);
    assert.equal(await page.getByText('待教务确认',{exact:true}).count(),15);
    const session=sessions.find(item=>item.id===(mobile?'8226':'8161'));
    await page.getByLabel('城市',{exact:true}).selectOption(session.city);
    assert.equal(await actions.count(),sessions.filter(item=>item.city===session.city).length);
    await page.getByRole('link',{name:'咨询班次：'+session.title}).click();
    assert.equal(new URL(page.url()).searchParams.get('session'),session.id);
    const form=page.getByRole('form',{name:session.title+'班次咨询'});
    await form.getByLabel('姓名（必填）').fill('课程咨询验收'+(mobile?'手机':'桌面'));
    await form.getByLabel('回复邮箱（必填）').fill('classroom-qa@example.invalid');
    const message='官网班次咨询流程验收，无需回复。';
    await form.getByLabel('想了解什么？（选填）').fill(message);
    const submit=form.getByRole('button',{name:'提交班次咨询'});
    if (mobile) {
      await submit.tap();
      await form.getByRole('alert').waitFor();
      assert.equal(await form.locator('textarea').inputValue(),message);
      await submit.tap();
    } else {
      await submit.click({clickCount:2});
    }
    const receipt=page.getByRole('region',{name:'咨询回执'});
    await receipt.waitFor();
    assert.ok((await receipt.innerText()).includes(received.id));
    assert.equal(received.session.id,session.id);
    assert.equal(received.session.city,session.city);
    const file=decodeURIComponent(await receipt.getByRole('link',{name:'下载咨询回执'}).getAttribute('href'));
    assert.ok(file.includes(received.id) && file.includes(session.title));
    assert.equal(posts.length,mobile?2:1);
    assert.equal(new Set(posts.map(p=>p.id)).size,1);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= window.innerWidth));
    results.push({viewport:page.viewportSize(),sessionId:session.id,id:received.id,notification:received.notification,requests:posts.length});
    await context.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify(results,null,2));
