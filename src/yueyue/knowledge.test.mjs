import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { answerQuestion } from './knowledge.js';

test('visitor questions lead to an appropriate official page', () => {
  for (const [question, path] of [
    ['悦心能做什么？', 'about'], ['有哪些解决方案？', '#solutions'],
    ['好几个部门都在忙，目标总是对不齐', 'solutions/complex-matters'],
    ['碰到关键决策没人敢拍板', 'solutions/key-decisions'],
    ['工程师在客户现场应该怎么做？', 'cases/2'],
    ['医药行业有没有案例', 'cases/1'], ['推荐一个半导体案例', 'cases/2'],
    ['你们有什么课程？', 'classroom'], ['怎么联系顾问？', 'contact'],
    ['项目如何报价？', 'contact'], ['OKR 如何落地？', 'cases/3'],
    ['团队培训回去还是用不上', 'solutions/learning-transformation'],
  ]) assert.equal(answerQuestion(question).sources[0].path, path, question);
});

test('follow-ups use the last topic or the currently viewed page', () => {
  for (const [topic, page] of [['solutions/complex-matters', 'about'], ['', '/industries/biomedical/']]) {
    assert.equal(answerQuestion('有类似案例吗？', topic, page).sources[0].path, 'cases/1');
  }
  assert.match(answerQuestion('这篇讲了什么？', '', 'opinions/resilience/').text, /韧性/);
});

test('contact facts, unknown facts and discovery links', async () => {
  const site = await readFile(new URL('../Site.jsx', import.meta.url), 'utf8');
  const routes = JSON.parse(await readFile(new URL('../routes.json', import.meta.url), 'utf8'));
  const reply = answerQuestion('联系邮箱');
  for (const fact of ['400-101-8877', 'info@amachina.com', '沪闵路9335号']) {
    assert.ok(site.includes(fact));
    assert.ok(reply.text.includes(fact));
  }
  assert.match(answerQuestion('明天天气好吗？').text, /暂时没有找到/);
  assert.match(answerQuestion('报价多少钱？').text, /需要结合项目范围确认/);
  const industry = answerQuestion('你们服务哪些行业？');
  assert.equal(industry.sources.length, 4);
  for (const source of industry.sources) assert.ok(routes.includes('/' + source.path));
});
