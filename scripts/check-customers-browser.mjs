import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { courses } from '../src/business/courses.js';
import { courseFeedback, customersPath } from '../src/business/customer-feedback.js';

const base = process.argv.includes('--live') ? 'https://www.amachina-yuexin.com' : 'http://127.0.0.1:4183';
const browser = await chromium.launch();
try {
  for (const [device, options] of [['desktop', {viewport:{width:1440,height:900}}], ['mobile', devices['iPhone 13']]]) {
    const page = await browser.newPage(options);
    await page.goto(base+'/about/');
    await page.getByRole('link', {name:'查看客户名录与反馈'}).click();
    await page.getByRole('heading', {name:'客户与口碑', exact:true}).waitFor();
    assert.equal(new URL(page.url()).pathname, customersPath);
    await page.waitForFunction(() => scrollY === 0);
    const directory = page.locator('#directory');
    const groups = directory.locator('details');
    const names = directory.locator('li');
    assert.equal(await groups.count(), 14);
    assert.equal(await names.count(), 507);
    assert.equal(await directory.locator('details[open]').count(), 0);
    await groups.first().locator('summary').click();
    await directory.getByText('微软 Microsoft', {exact:true}).waitFor();

    const search = directory.getByRole('searchbox');
    for (const keyword of ['微软','ｍＩＣＲＯＳＯＦＴ']) {
      await search.fill(keyword);
      await page.waitForFunction(() => document.querySelectorAll('#directory li').length === 1);
      assert.equal(await names.innerText(), '微软 Microsoft');
      assert.ok(await names.isVisible());
    }
    await search.fill('医药、医疗');
    await page.waitForFunction(() => document.querySelectorAll('#directory li').length === 50);
    assert.equal(await groups.count(), 1);
    await search.fill('漕河泾开发区');
    await page.waitForFunction(() => document.querySelectorAll('#directory li').length === 1);
    await search.fill('示例不存在的名称 XYZ');
    await directory.getByText(/未找到匹配/).waitFor();
    await directory.getByRole('button', {name:'清除搜索'}).click();
    await page.waitForFunction(() => document.querySelectorAll('#directory li').length === 507);
    assert.equal(await directory.locator('details[open]').count(), 0);

    const nav = page.getByRole('navigation', {name:'客户与口碑栏目'});
    await nav.getByRole('link', {name:'客户之声'}).click();
    assert.equal(await page.locator('#voices li').count(), 10);
    await nav.getByRole('link', {name:'课程反馈'}).click();
    const list = page.locator('#course-feedback');
    assert.equal(await list.getByRole('link').count(), Object.keys(courseFeedback).length);
    for (const course of courses.filter(course => courseFeedback[course.id])) {
      await list.getByRole('link', {name:course.title, exact:true}).click();
      assert.equal(new URL(page.url()).hash, '#feedback');
      const section = page.locator('#feedback');
      await section.getByText(courseFeedback[course.id], {exact:true}).waitFor();
      await page.waitForFunction(() => {
        const top = document.querySelector('#feedback h2').getBoundingClientRect().top;
        return top >= document.querySelector('header').getBoundingClientRect().bottom && top < innerHeight;
      });
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      await section.getByRole('link', {name:'查看其他课程的反馈'}).click();
      await page.waitForURL(url => url.pathname === customersPath && url.hash === '#course-feedback');
    }
    await page.goto(base+'/courses/130/');
    assert.equal(await page.locator('#feedback').count(), 0);
    await page.goto(base+'/cases/');
    await page.getByRole('link', {name:'查看客户名录与反馈'}).click();
    await nav.waitFor();
    await page.goto(base+'/industries/biomedical/');
    await page.getByRole('link', {name:'按行业查看客户名录'}).click();
    await page.waitForURL(url => url.pathname === customersPath && url.hash === '#directory');
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.goto(base+'/');
    await page.locator('footer').getByRole('link', {name:'客户与口碑'}).click();
    await nav.waitFor();
    await page.close();
    console.log(device+' passed: industry browsing, Chinese/English search, recovery, voices, 9 course round trips and public entrances');
  }
} finally {
  await browser.close();
}
