export const areaNames = [
  '关键业务推进能力', '战略与组织推进能力', '管理者与组织领导力', '协作与组织运行能力', '学习设计与知识沉淀能力',
];

export const topics = [
  {
    id:'leadership', name:'领导力发展', question:'新任主管和资深经理需要解决的带队问题有什么不同？',
    approach:'先选一个真实的带队任务。一线主管可从目标分工、授权和反馈入手；中层经理可围绕跨部门协作与团队辅导展开；高层团队可讨论方向判断与经营取舍。',
    preparation:'带来一个岗位的职责、一次困难对话，或一个希望团队独立完成的任务。',
    relatedPath:'/capability-map/#area-3', relatedLabel:'管理者与组织领导力', cases:[2,5], courseIds:['130','19','4','159'],
  },
  {
    id:'business-growth', name:'业务发展', question:'经营会上定下了方向，为什么各部门的下一步仍然不同？',
    approach:'以一项正在推进的业务为材料，梳理客户、目标和约束，确定待决事项。再围绕一项真实决策讨论负责人、判断依据和复盘节点。',
    preparation:'可以从一份正在讨论的经营计划，或一次迟迟无法作出的业务决策开始。',
    relatedPath:'/solutions/key-decisions/', relatedLabel:'关键决策的工作方式', cases:[1,4], courseIds:['117','120','31'],
  },
  {
    id:'learning-design', name:'学习设计', question:'课程已经讲完，怎样看出学员能在岗位上用起来？',
    approach:'从岗位任务倒推学习目标，选取业务中反复出现的场景，把员工经验变成练习，再讨论由谁观察应用、什么时候回看。',
    preparation:'可带一份现有课件、一个典型工作任务，以及你希望学员独立完成的动作。',
    relatedPath:'/solutions/learning-transformation/', relatedLabel:'学习与转化的工作方式', cases:[], courseIds:['38','125'],
  },
  {
    id:'sales', name:'销售与渠道管理', question:'客户现场的信息怎样传回团队，并推动下一次会谈或渠道决策？',
    approach:'用一项实际商机或一段经销商合作经历，识别关键人物、分歧与下一步承诺。可围绕渠道政策、谈判准备或大客户团队协作讨论。',
    preparation:'可准备一幅简要的客户决策关系图，或一个影响渠道合作的具体分歧。',
    relatedPath:'/solutions/client-interaction/', relatedLabel:'客户互动的工作方式', cases:[2,3], courseIds:['103','115','160'],
  },
  {
    id:'people', name:'人力资源与人才发展', question:'岗位要求变了，管理者该观察哪些行为、如何辅导员工？',
    approach:'从一个关键岗位出发，明确工作情境、期待行为与当前差距。就管理者培养和绩效辅导，可进一步讨论练习任务以及回到岗位后的跟进方式。',
    preparation:'可准备岗位职责、一个绩效面谈场景，或希望培养的关键角色。',
    relatedPath:'/capability-map/#area-3', relatedLabel:'人才培养与管理角色', cases:[5], courseIds:['6','19','22'],
  },
];
