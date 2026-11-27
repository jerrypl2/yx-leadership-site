// Each answer has a published page that visitors can use to check it.
export const cards = [
  ['about', '认识悦心', '介绍悦心 你们是谁 做什么的 关于我们 公司简介 成立 历史 上海 AMA 美国管理协会', '悦心领导力中心从 1996 年在上海引入国际管理教育体系起步。今天，我们与企业团队一起处理真实工作中的难题，例如让客户达成下一步共识、让多个部门推动同一件事。您最想改善哪个场景？'],
  ['#solutions', '四类解决方案', '服务内容 解决方案 业务范围 能做什么 提供哪些服务 业务方向', '悦心围绕四类工作场景提供帮助：客户互动、复杂事项推进、关键决策，以及学习与转化。可以从团队最近一次卡住的事情入手。'],
  ['solutions/client-interaction', '客户互动', '销售 客户沟通 客户关系 成交 客户互动 客户犹豫 拜访 销售转化 客户面前 下一步共识 推动客户', '如果团队讲得很清楚，客户却迟迟没有下一步，可以先回看最近一次会谈：客户还需要判断什么？谁会参与决定？悦心在这类场景中帮助一线人员把专业表达转化为有用的客户互动。'],
  ['solutions/complex-matters', '复杂事项推进', '跨部门 配合不好 各自为政 部门都在忙 几个部门 目标对不齐 目标不一致 扯皮 协同 团队协作 项目卡住 推不动 推进困难', '几个部门各自很忙时，可以先请每一方用一句话写下“我们一起要解决什么问题”，再比较答案。悦心会从这些分歧出发，协助团队找出关键节点、明确下一步行动。'],
  ['solutions/key-decisions', '关键决策', '关键决策 拍板 意见分歧 难以决定 战略选择 不确定 决策缓慢 反复开会', '如果会议开了很多轮仍定不下来，可以先区分已知事实、关键假设和需要验证的变量。悦心帮助管理团队在信息不完整时形成判断，并把判断接到实际行动上。'],
  ['solutions/learning-transformation', '学习与转化', '课后用不上 培训没效果 课程开发 学习转化 学习与转化 内训 培训落地', '如果课上学会了、回到岗位却用不上，值得先选一个真实任务，明确学员需要做出的具体行为。悦心帮助企业围绕这些任务设计学习内容，并把练习接回日常工作。'],
  ['capability-map', '组织能力地图', '能力地图 核心能力 五个方向 管理者培养 组织能力', '能力地图分为五个方向：关键业务推进、战略与组织推进、管理者与组织领导力、协作与组织运行，以及学习设计与知识沉淀。您可以从最常受阻的工作反查所需能力。'],
  ['methods', '方法与实现', '合作流程 咨询怎么做 如何开展 方法论 诊断 方法与实现 实施步骤 怎么合作', '合作从一个真实业务场景开始。悦心先和团队一起诊断卡点，找到关键角色与关键节点，再设计行动路径，把练习和复盘嵌入实际工作。'],
  ['industries/biomedical', '生物医药', '医药行业 制药 药企 医疗 医药企业 生物医药', '在生物医药行业，专业要求、政策变化和多方协同常常同时出现。悦心帮助关键团队先形成共同判断，再推动重要事项落地。'],
  ['industries/premium-services', '高端服务与高价值消费', '高端服务 高价值消费 零售 奢侈品 高净值 客户体验 门店', '在客户决策谨慎、体验要求高的场景，悦心帮助一线团队把握关键接触的节奏，更好地理解客户如何判断和选择。'],
  ['industries/semiconductor-manufacturing', '半导体与高端制造', '半导体行业 半导体制造 高端制造 技术型企业 工程师 芯片 设备商', '半导体与高端制造项目往往有多家供应商和客户团队参与。悦心帮助技术与管理团队在现场识别关键角色、协调资源并推动事项。'],
  ['industries/global-capability', '全球化能力建设', '全球化 海外业务 跨地区 国际化 全球能力 多业务单元', '对于跨地区、多业务单元的企业，悦心关注怎样让统一标准、学习内容和各地的实际执行协调起来，并能长期运行。'],
  ['cases', '客户案例', '案例 有哪些案例 成功故事 客户实例 案例推荐 真实案例', '官网有五个项目故事，分别涉及药企数据化经营、半导体客户现场、全球大客户协同、芯片通路转型和合资企业整合。哪个最接近您的团队？'],
  ['cases/1', '药企的跨部门协作案例', '医药案例 药企案例 数据报表 数据化经营 跨部门案例 医药数据 协作案例', '一家药企的报表越来越多，管理层却很少用来做决定。悦心与各部门重新梳理“数据要帮助谁做什么判断”，让讨论重新聚焦在使用场景上。'],
  ['cases/2', '工程师转任现场负责人', '半导体案例 制造案例 工程师转型 客户现场 设备安装 技术负责人 现场负责人', '一家半导体设备公司的工程师技术扎实，担任客户现场负责人后却常常需要层层请示。这个案例讲述如何识别角色变化，以及现场负责人需要承担哪些判断和协调。'],
  ['cases/3', '全球大客户团队与 OKR', 'OKR 全球大客户 总部一线 亚洲团队 工具抵触 OKR案例', '一家半导体设备商希望全球大客户团队采用 OKR，亚洲一线却忙于处理现场异常。案例从总部与一线的分歧切入，讨论如何让管理工具真正服务业务。'],
  ['cases/4', '芯片通路商的战略转型', '电动车案例 芯片分销 转型案例 芯片通路 战略案例 电动车赛道', '一家芯片通路商面对电动车市场，在“现在投入”还是“再等一等”之间僵持。案例记录了管理层如何组织跨部门探索，逐步形成有依据的选择。'],
  ['cases/5', '合资企业的管理整合', '物业 物管 合资企业案例 文化融合 本土执行 国际标准 整合案例', '一家合资物管企业面临薪资、品牌和执行节奏上的分歧。双方通过跨部门小组共同处理实际业务，在具体合作中逐步磨合。'],
  ['opinions', '悦心观点', '观点 文章 阅读 推荐文章 想读什么文章', '观点栏目有三篇文章，分别讨论怎样重新定义问题、怎样在压力下恢复判断，以及怎样通过行动学习看见组织自身的运作方式。'],
  ['opinions/problem-reframing', '问题重构能力', '问题重构 定义问题 重新定义 找到真问题', '面对反复出现的问题，可以先问：我们把什么当成了问题，又以谁的视角定义它？悦心的这篇文章讨论问题定义改变后，解决路径会怎样变化。'],
  ['opinions/resilience', '韧性与恢复', '抗压 韧性 恢复力 压力 倦怠', '悦心关于韧性的文章讨论的是高压之后如何恢复、校准和重建判断。它适合正在带团队经历变化、想重新找回节奏的管理者。'],
  ['opinions/action-learning', '行动学习', '行动学习 反思 复盘 组织防御', '行动学习把真实问题带入共同探索。悦心的文章关注团队是否还有空间说出真实观察，以及这会如何改变组织处理问题的方式。'],
  ['classroom', '悦心教室', '教室 有什么课程 近期课程 课程安排 公开课 课表 报名 开课时间 课程表', '悦心教室可按城市查看公开课参考课表。12 月班次目前均待教务确认，可选择具体班次提交咨询并取得编号。日期、价格与席位以教务确认为准。'],
  ['contact', '联系悦心', '联系 电话 邮箱 邮件 地址 咨询热线 上海位置 怎么找你们 预约 人工顾问', '您可以拨打 400-101-8877，或写信到 info@amachina.com。中心地址是上海市徐汇区沪闵路9335号，徐汇万科中心G座306室。联系时可以带上一个最近推进不顺的具体场景。'],
].map(([path, title, tags, answer]) => ({ path, title, tags, answer }));

const byPath = new Map(cards.map(card => [card.path, card]));
const words = value => value.toLowerCase().normalize('NFKC').match(/[a-z0-9]+|[\u3400-\u9fff]+/g) || [];
function grams(text) {
  const result = new Set();
  for (const word of words(text)) {
    if (/^[a-z0-9]+$/.test(word) || word.length < 2) result.add(word);
    else for (let i = 1; i < word.length; i++) result.add(word.slice(i - 1, i + 1));
  }
  return result;
}
const entries = cards.map(card => ({ card, terms: grams(card.title + ' ' + card.tags) }));
const weights = new Map();
for (const { terms } of entries) for (const t of terms) weights.set(t, (weights.get(t) || 0) + 1);
const weight = t => Math.log(1 + cards.length / (weights.get(t) || 1));

function ranked(query) {
  const q = query.toLowerCase();
  const terms = grams(q);
  return entries.map(({ card, terms: indexed }) => {
    let score = 0;
    for (const t of terms) if (indexed.has(t)) score += weight(t);
    for (const tag of [card.title, ...card.tags.split(' ')]) {
      if (q.includes(tag.toLowerCase())) score += Math.min(8, tag.length * 1.4);
    }
    return { card, score };
  }).sort((a, b) => b.score - a.score);
}

const examples = {
  'solutions/client-interaction': 'cases/2', 'solutions/complex-matters': 'cases/1',
  'solutions/key-decisions': 'cases/4', 'solutions/learning-transformation': 'methods',
  'industries/biomedical': 'cases/1', 'industries/semiconductor-manufacturing': 'cases/2',
  'industries/global-capability': 'cases/3', 'industries/premium-services': 'solutions/client-interaction',
};
function result(text, paths, topic = paths[0]) {
  return { text, sources: paths.map(path => byPath.get(path)), topic };
}
export function answerQuestion(question, priorTopic, page = '') {
  const q = question.trim();
  const context = byPath.has(priorTopic) ? priorTopic : page.replace(/^\/|\/$/g, '');
  if (/费用|预算|报价|价格|多少钱|收费|周期多长|需要多久|保证效果/.test(q))
    return result('具体报价、周期和可承诺的结果需要结合项目范围确认。您可以告诉顾问团队规模、希望改善的场景和目标时间，再讨论合适的安排。', ['contact']);
  if (/^(你好|您好|hello|hi|在吗|嗨|悦悦)[！!。？?\s]*$/i.test(q))
    return result('您好，我是悦悦。您可以告诉我团队最近遇到的一个难题，也可以问我悦心做什么、看哪个案例，或者怎样联系顾问。', ['about', 'cases']);
  if (/^(谢谢|多谢|感谢)[！!。\s]*$/.test(q))
    return result('不客气！如果还有想了解的业务场景，我可以陪您继续找。', [], context);
  if (/介绍一下|介绍下|做什么|你是谁|你们是做什么的/.test(q) && !/行业|案例|方案|医药|半导体|课程|方法|决策|学习|协作|OKR/i.test(q))
    return result(byPath.get('about').answer, ['about', '#solutions']);
  if (/有哪些行业|哪些行业|哪些企业|行业方向|服务哪些客户/.test(q))
    return result('官网列出了四个常见合作方向：生物医药、高端服务与高价值消费、半导体与高端制造，以及全球化与体系化能力建设。', cards.filter(c => c.path.startsWith('industries/')).map(c => c.path));
  if (/^(这个|这篇|本页|当前页|这里|刚才那个|展开|说详细|具体说|再讲|详细|然后呢|还有呢)/.test(q) && byPath.has(context) && !/例子|案例/.test(q))
    return result(byPath.get(context).answer, [context, ...(examples[context] ? [examples[context]] : [])]);
  if (/^(那|有|举|给|来|相关|具体|看|能|可以|有没有|想看)*.{0,3}(案例|例子|实例).{0,4}$/.test(q) && examples[context]) {
    const next = byPath.get(examples[context]);
    return result(next.answer, [next.path]);
  }
  const matches = ranked(q);
  let best = matches[0];
  if (/案例|例子|实例/.test(q) && best.card.path.startsWith('industries/') && examples[best.card.path]?.startsWith('cases/')) {
    best = { card: byPath.get(examples[best.card.path]), score: best.score };
  }
  if (best.score < 3) return result('我暂时没有找到能直接回答这个问题的官网资料。您可以补充行业、团队遇到的困难或想了解的服务，也可以直接咨询悦心。', ['#solutions', 'contact'], context);
  const c = best.card;
  const related = examples[c.path];
  return result(c.answer, [c.path, ...(related ? [related] : c.path === 'classroom' ? ['contact'] : [])]);
}
