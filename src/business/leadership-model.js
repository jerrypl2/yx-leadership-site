export const leadershipModelPath = '/capability-map/leadership-model/';

// Aspect names and course associations follow the legacy leadership model.
// IDs refer to published course records. Historical titles have no booking link.
export const leadershipDimensions = [
  {
    id: 'alignment', title: '凝聚人心', question: '怎样让不同立场的人愿意一起行动？',
    aspects: [
      {
        title: '领导', behavior: '说清团队要去哪里、为什么值得投入。遇到取舍时，自己的决定也遵守向团队承诺的原则。',
        example: '交期提前，你向团队说明必须守住的质量要求，一起决定哪些工作可以延后，并向客户解释这次取舍。',
        courses: ['19'],
      },
      {
        title: '影响', behavior: '先听清对方在意什么，再用对方能检验的事实说明主张。遇到分歧，找出双方都愿意接受的下一步。',
        example: '销售想提前上线，运营担心退货。你请双方核对试点数据，约定先在哪一类客户中试行，以及何时复盘。',
        courses: ['22', '115'],
      },
      {
        title: '促发', behavior: '在方案形成时就邀请成员参与，给不同意见留出空间，并让具体贡献得到认可。',
        example: '排班改革前，你请一线同事提出交接中最费时的环节，由他们试排一周，再分享哪些调整真的有效。',
        courses: ['4'],
      },
    ],
  },
  {
    id: 'development', title: '发展能力', question: '怎样选对人、带好人，也让自己继续成长？',
    aspects: [
      {
        title: '选才', behavior: '从未来的业务任务判断岗位需要哪种能力，用工作证据评估人选，同时为关键岗位培养后备人员。',
        example: '为新门店选负责人时，你让候选人处理一次缺员排班，再观察其判断依据、沟通方式和资源安排。',
        historicalCourse: 'Tango：企业无形资产经营模拟', topic: 'people',
      },
      {
        title: '育人', behavior: '结合员工现在能做什么、希望学什么，安排适度的挑战，约定何时观察、何时反馈，再逐步放手。',
        example: '新人第一次主持客户会议后，你和他回看一个遗漏的追问，练习另一种问法，约好下次会议后检验效果。',
        courses: ['6', '120'],
      },
      {
        title: '自我领导', behavior: '主动寻找反馈，辨认自己在压力下惯用的做法，把想改进的地方变成下一次工作中的练习。',
        example: '你发现自己开会时总是抢先回答。这周请同事记录你打断他人的时刻，下周先让每位成员讲完再回应。',
        historicalCourse: '领导者的内在觉察力', topic: 'leadership',
      },
    ],
  },
  {
    id: 'business', title: '经营企业', question: '怎样从经营全局判断机会、风险和取舍？',
    aspects: [
      {
        title: '经营意识', behavior: '把部门的选择放到整门生意中考量，既看客户得到的价值，也看成本、利润和资源占用。',
        example: '面对一笔大额折扣订单，你把售后工时、回款周期和产能占用一并算入，再决定能接受的条件。',
        historicalCourse: '财务1-2-3', topic: 'business-growth',
      },
      {
        title: '战略目光', behavior: '观察客户需求与竞争格局的变化，权衡眼前回报和长期能力，再决定资源应优先投向哪里。',
        example: '客户开始要求更短的交期，你比较扩仓和改造供应链两条路径，列出各自依赖的假设，先验证最关键的一条。',
        courses: ['117'],
      },
      {
        title: '思维与创新', behavior: '把复杂问题拆开，检查大家习以为常的假设。邀请不同观点参与，设计小规模试验来比较方案。',
        example: '退货率连续上升，你让销售、仓储分别提出原因，用一周订单检验两种解释，再决定先改哪一步。',
        courses: ['10', '125'],
      },
    ],
  },
  {
    id: 'operations', title: '管理运营', question: '怎样把目标落实到进度、质量和日常选择？',
    aspects: [
      {
        title: '执行与绩效', behavior: '把目标拆成有负责人、资源和验收条件的任务。定期查看偏差，及时调配资源并跟进结果。',
        example: '项目离上线还有两周，你和各负责人逐项确认验收条件，为尚未完成的接口测试安排人员和补测日期。',
        courses: ['31'],
      },
      {
        title: '流程与质量', behavior: '沿着客户经历追查流程中的重复和等待，协调交接环节，用实际结果判断一次改动是否有效。',
        example: '客户反复来电查进度，你和客服沿一张工单找出信息断点，试行一次交接确认，再比较重复来电数。',
        historicalCourse: '流程管理的5大旋律', topic: 'business-growth',
      },
      {
        title: '文化与价值', behavior: '把团队重视的原则说成可以观察的做法，尤其在指标压力与原则冲突时，用自己的决定说明底线。',
        example: '月底有人建议提前确认尚未交付的业绩，你按约定的交付标准处理，并向团队说明这会怎样影响本月数字。',
        historicalCourse: '领导方阵实验室', topic: 'leadership',
      },
    ],
  },
];
