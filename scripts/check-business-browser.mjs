import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { courses } from '../src/business/courses.js';
import { topics } from '../src/business/topics.js';
import { sessions } from '../src/classroom/catalog.js';

const base = process.argv.includes('--live') ? 'https://www.amachina-yuexin.com' : 'http://127.0.0.1:4183';
const browser = await chromium.launch();
try {
  for (const [device, options] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',devices['iPhone 13']]]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(base+'/classroom/');
    await page.getByRole('link',{name:'查看课程咨询目录',exact:true}).click();
    const search=page.getByRole('searchbox',{name:'查找课程'});
    for(const course of courses.filter(course=>course.alias)) {
      await search.fill(course.alias);
      const result=page.locator('.course-index a');
      await result.filter({hasText:course.title}).waitFor();
      assert.equal(await result.count(),1);
    }
    await page.locator('.course-index a').click();
    await page.getByRole('link',{name:'咨询此班次'}).click();
    const selected = sessions.find(s=>s.courseId==='31');
    assert.equal(new URL(page.url()).searchParams.get('session'),selected.id);
    await page.getByRole('form',{name:selected.title+'班次咨询'}).waitFor();
    await page.goto(base+'/courses/130/');
    await page.getByRole('link',{name:'管理者与组织领导力'}).click();
    assert.equal(new URL(page.url()).hash,'#area-3');
    await page.locator('#area-3').getByRole('link',{name:courses[0].title,exact:true}).waitFor();
    for(const topic of topics) {
      await page.goto(base+'/solutions/#'+topic.id);
      await page.getByRole('link',{name:'咨询'+topic.name,exact:true}).click();
      const textarea=page.locator('textarea[name=message]');
      await page.waitForFunction(name=>document.querySelector('textarea[name=message]')?.value.includes(name),topic.name);
      assert.equal(await textarea.inputValue(),'我想咨询'+topic.name+'。');
    }
    await page.goto(base+'/cases/2/');
    await page.getByRole('link',{name:'销售与渠道管理',exact:true}).click();
    assert.equal(new URL(page.url()).hash,'#sales');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth));
    await context.close();
    console.log(device+' passed: four aliases, class inquiry, capability map, five contact topics, case navigation');
  }
} finally { await browser.close(); }
