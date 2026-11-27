// This acceptance test writes two clearly labelled messages to the public site.
import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { contactEndpoint } from '../src/contact.js';
import { formSubmitUrl } from '../src/contact-relay.js';

if (process.env.CONTACT_ACCEPTANCE_LIVE !== '1') throw new Error('Set CONTACT_ACCEPTANCE_LIVE=1 to run against production.');
const browser = await chromium.launch();
const pageUrl = 'https://www.amachina-yuexin.com/contact/';
const unique = crypto.randomUUID();
const outcomes = [];
try {
  for (const mobile of [false, true]) {
    const profile = mobile ? '手机' : '桌面';
    const context = await browser.newContext(mobile ? {...devices['iPhone 13'], defaultBrowserType:'chromium'} : {viewport:{width:1440,height:900}});
    const page = await context.newPage();
    await page.goto(pageUrl);
    const button = page.getByRole('button',{name:'发送留言', exact:true});
    await page.waitForFunction(()=>!document.querySelector('form button[type="submit"]')?.disabled);
    await page.locator('#name').fill('官网一期验收（'+profile+'）');
    await page.locator('#email').fill('info@amachina.com');
    const message = '网站验收测试，无需回复。'+profile+' '+unique;
    await page.locator('#message').fill(message);
    const requests=[];
    const notifications=[];
    page.on('request',request=>{
      if (request.url()===contactEndpoint && request.method()==='POST') requests.push(request.postDataJSON());
      if (request.url()===formSubmitUrl && request.method()==='POST') notifications.push(request.postDataJSON());
    });
    const status=page.locator('form [role="status"]');
    if (mobile) {
      // Deliver the first POST to the deployed API, then drop its response.
      let committed;
      await page.route(contactEndpoint,async route=>{
        if (route.request().method()!=='POST') return route.continue();
        const forwarded=await route.fetch();
        committed=await forwarded.json();
        await route.abort('failed');
      });
      await button.tap();
      await status.filter({hasText:'暂时无法确认保存结果'}).waitFor();
      assert.equal(committed?.saved,true);
      assert.equal(await page.locator('#message').inputValue(),message);
      await page.unroute(contactEndpoint);
      await button.tap();
    } else {
      await button.click({clickCount:2});
    }
    await status.filter({hasText:'留言已保存，编号'}).waitFor();
    assert.equal(requests.length, mobile ? 2 : 1);
    assert.equal(new Set(requests.map(request=>request.id)).size,1);
    const id=requests[0].id;
    assert.ok((await status.textContent()).includes(id));
    assert.deepEqual(notifications.map(mail=>[mail._subject,mail._replyto]),[['悦心官网留言 '+id,'info@amachina.com']]);
    assert.equal(await page.locator('#message').inputValue(),'');
    const draftLink=page.getByRole('link',{name:'用自己的邮箱发送这条留言'});
    if (await draftLink.count()) {
      const draft=new URL(await draftLink.getAttribute('href'));
      assert.equal(draft.pathname,'info@amachina.com');
      assert.ok(draft.searchParams.get('body').includes(message));
    }
    // Replay the exact signed-off payload independently of the UI's click guard.
    const replay=await page.evaluate(async ({url,payload})=>{
      const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      return response.json();
    },{url:contactEndpoint,payload:requests[0]});
    assert.equal(replay.id,id);
    assert.equal(replay.saved,true);
    assert.equal(replay.notification,'accepted');
    outcomes.push({profile,viewport:page.viewportSize(),id,submissionsBeforeReplay:mobile?2:1,notification:replay.notification});
    await context.close();
  }
} finally { await browser.close(); }
console.log(JSON.stringify(outcomes,null,2));
