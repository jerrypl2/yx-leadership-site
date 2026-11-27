import assert from 'node:assert/strict';
import { chromium, devices } from 'playwright';
import { courses } from '../src/business/courses.js';
import { topics } from '../src/business/topics.js';
import { sessions } from '../src/classroom/catalog.js';
import { leadershipDimensions, leadershipModelPath } from '../src/business/leadership-model.js';

const base = process.argv.includes('--live') ? 'https://www.amachina-yuexin.com' : 'http://127.0.0.1:4183';
const browser = await chromium.launch();
try {
  const layout = await browser.newPage();
  await layout.goto(base+'/');
  for (const width of [320,390,767,768,820,1024,1440]) {
    await layout.setViewportSize({width,height:800});
    const header = layout.getByRole('banner');
    const nav = header.getByRole('navigation',{name:'主导航'});
    const expected = width < 768 ? ['领导力模型','悦心教室']
      : ['解决方案','组织能力地图','领导力模型','方法与实现','案例','观点','悦心教室','关于我们'];
    assert.deepEqual(await nav.getByRole('link').allTextContents(),expected);
    const visible = await header.getByRole('link').all();
    let previousRight=0;
    for (const link of visible) {
      const box=await link.boundingBox();
      assert.ok(box && box.x>=previousRight-1 && box.x+box.width<=width+1, 'Header links must fit at '+width);
      previousRight=box.x+box.width;
    }
  }
  await layout.setViewportSize({width:320,height:568});
  await layout.goto(base+'/classroom/');
  const choices = layout.getByRole('navigation',{name:'悦心教室选课方式'});
  const directoryBox=await choices.getByRole('link',{name:'查看课程咨询目录'}).boundingBox();
  const modelBox=await choices.getByRole('link',{name:'按领导力模型选课'}).boundingBox();
  assert.ok(directoryBox && modelBox && Math.abs(directoryBox.y-modelBox.y)<1 &&
    modelBox.x>=directoryBox.x+directoryBox.width-1 && modelBox.x+modelBox.width<=320 && modelBox.y+modelBox.height<568);
  await layout.close();
  for (const [device, options] of [['desktop',{viewport:{width:1440,height:900}}],['mobile',devices['iPhone 13']]]) {
    const context = await browser.newContext(options);
    const page = await context.newPage();
    await page.goto(base+'/');
    const mainNav=page.getByRole('navigation',{name:'主导航'});
    await mainNav.getByRole('link',{name:'领导力模型',exact:true}).click();
    await page.getByRole('heading',{name:'领导力模型',exact:true}).waitFor();
    assert.equal(new URL(page.url()).pathname,leadershipModelPath);
    await page.locator('footer').scrollIntoViewIfNeeded();
    await mainNav.getByRole('link',{name:'悦心教室',exact:true}).click();
    const classroomNav=page.getByRole('navigation',{name:'悦心教室选课方式'});
    await classroomNav.waitFor();
    await page.waitForFunction(()=>window.scrollY===0);
    await classroomNav.getByRole('link',{name:'按领导力模型选课',exact:true}).click();
    await page.getByRole('heading',{name:'领导力模型',exact:true}).waitFor();
    assert.equal(new URL(page.url()).pathname,leadershipModelPath);
    await mainNav.getByRole('link',{name:'悦心教室',exact:true}).click();
    const contactLink=page.locator('footer').getByRole('link',{name:'联系我们',exact:true});
    for (let n=0;n<2;n++) {
      await contactLink.scrollIntoViewIfNeeded();
      assert.ok(await page.evaluate(()=>scrollY>500));
      await contactLink.click();
      await page.getByRole('heading',{name:'联系我们',exact:true}).waitFor();
      await page.waitForFunction(()=>window.scrollY===0);
      assert.ok(await page.locator('h1').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight));
    }
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
    await page.locator('#area-3').getByRole('link',{name:'查看领导力模型',exact:true}).click();
    await page.getByRole('heading',{name:'领导力模型',exact:true}).waitFor();
    assert.equal(new URL(page.url()).pathname,leadershipModelPath);
    await page.waitForFunction(()=>window.scrollY===0);
    assert.equal(await page.locator('.model-aspects article').count(),12);
    for (const dimension of leadershipDimensions) {
      await page.getByRole('navigation',{name:'选择领导力维度'}).getByRole('link',{name:new RegExp(dimension.title)}).click();
      assert.equal(new URL(page.url()).hash,'#'+dimension.id);
      const region=page.getByRole('region',{name:dimension.title,exact:true});
      assert.equal(await region.getByRole('heading',{level:3}).count(),3);
    }
    await page.locator('#operations').getByRole('link',{name:'咨询「流程与质量」培养方案'}).click();
    await page.waitForFunction(()=>document.querySelector('#message')?.value.includes('流程管理的5大旋律'));
    await page.goto(base+'/courses/');
    await page.getByRole('link',{name:'按课名查找',exact:true}).click();
    await page.getByRole('searchbox',{name:'查找课程'}).fill('团队领导力');
    await page.waitForFunction(()=>document.querySelectorAll('.course-index a').length===1);
    await page.getByRole('link',{name:'按领导力模型选课',exact:true}).click();
    assert.equal(new URL(page.url()).pathname,leadershipModelPath);
    await page.locator('#development').getByRole('link',{name:'创造杰出绩效的教导',exact:true}).click();
    await page.getByRole('heading',{name:'创造杰出绩效的教导',exact:true}).waitFor();
    await page.getByRole('link',{name:'咨询此班次'}).click();
    const coachingSession=sessions.find(s=>s.courseId==='6');
    await page.getByRole('form',{name:coachingSession.title+'班次咨询'}).waitFor();
    assert.equal(new URL(page.url()).searchParams.get('session'),coachingSession.id);
    await page.goto(base+leadershipModelPath+'#operations');
    await page.waitForFunction(()=>Math.abs(document.querySelector('#operations').getBoundingClientRect().top-96)<8);
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    for(const topic of topics) {
      await page.goto(base+'/solutions/#'+topic.id);
      await page.getByRole('link',{name:'咨询'+topic.name,exact:true}).click();
      const textarea=page.locator('textarea[name=message]');
      await page.waitForFunction(name=>document.querySelector('textarea[name=message]')?.value.includes(name),topic.name);
      assert.equal(await textarea.inputValue(),'我想咨询'+topic.name+'。');
      await page.waitForFunction(()=>window.scrollY===0);
    }
    await page.goto(base+'/cases/2/');
    await page.getByRole('link',{name:'销售与渠道管理',exact:true}).click();
    assert.equal(new URL(page.url()).hash,'#sales');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth));
    await context.close();
    console.log(device+' passed: course and case navigation, both model entrances, all dimensions, model-to-class and model-to-contact');
  }
} finally { await browser.close(); }
