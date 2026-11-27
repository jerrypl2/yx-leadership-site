// Course IDs match the legacy catalogue. Sessions keep their own separate IDs.
export const courses = [
  {
    id:'130', title:'转身管理者：新经理人的管理快车道', area:3,
    audience:'刚从业务骨干转为主管、首次带团队的管理者。',
    scene:'下属接到任务后仍事事等你拍板，自己越做越忙，团队的目标却没有更清楚。',
    outline:['把部门目标拆成员工可以跟进的任务，约定如何检查进展。','根据员工的经验决定授权范围，留出反馈和纠偏的机会。','识别团队分歧，练习在冲突中开展对话。'],
    format:'按经理人常见任务分单元学习，依次讨论目标、授权和团队管理。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=130',
  },
  {
    id:'117', title:'战略思维力', area:2,
    audience:'需要理解企业战略、把方向转成部门行动的中高层管理者。',
    scene:'市场变了，原有打法仍在沿用。经营会上需要先判断服务谁、靠什么竞争，再讨论资源怎么投。',
    outline:['识别行业变化以及企业已有和欠缺的能力。','选择目标客户，说明企业希望为他们提供的价值。','比较战略选择，找出运营流程中需要随之调整的环节。'],
    format:'原课程结合经营案例、小组讨论和模拟练习，可带团队正在研究的战略问题。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=117',
  },
  {
    id:'125', title:'演讲的构思与设计', area:4,
    audience:'需要作业务汇报、介绍方案或向团队解释新想法的人。',
    scene:'演示材料已经做了几十页，听众听完却说不出你希望他们决定什么。',
    outline:['从听众要作的判断出发，写出这次演讲的主旨。','把材料组织成一条能跟得上的论证，再选择故事和例子。','决定哪些内容需要图表或演示文稿，删去分散注意力的细节。'],
    format:'按演讲准备的过程梳理主旨、逻辑、故事与媒介。可向教务询问是否适合带自己的汇报材料。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=125',
  },
  {
    id:'19', title:'晋升领导者：资深经理人的领导力加速器', alias:'高价值经理人的管理加速器', area:3,
    audience:'已带过团队、准备承担更大领导责任的经理人。',
    scene:'任务能够交付，但关键决定仍集中在经理手里，团队成员遇到新问题时很少主动尝试。',
    outline:['识别不同员工的动力，调整激励和反馈方式。','按员工的准备程度决定授权深度，并约定跟进办法。','在员工遇到瓶颈或团队意见分歧时开展辅导。'],
    format:'原课程以管理单元组织内容，可围绕员工激励、授权或辅导的实际案例讨论。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=19',
  },
  {
    id:'103', title:'渠道管理', area:1, audience:'负责渠道规划、经销商关系或渠道销售的人。',
    scene:'公司希望扩大覆盖，经销商却担心利润和区域冲突。调整政策前，双方需要看清渠道各环节的作用。',
    outline:['梳理分销层级和覆盖范围，找出效率损失的环节。','分析区域冲突、窜货与经销商合作政策的关系。','结合伙伴能力和市场需求讨论促销投入与渠道配合。'],
    format:'原课程结合渠道业务模型与个人销售习惯测评。可向教务询问本期测评安排。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=103',
  },
  {
    id:'38', title:'高阶培训师培训', area:5, audience:'已有授课经历、希望改进一门现有课程的培训师或企业内训师。',
    scene:'讲师熟悉课件，学员也听懂了，但业务部门仍看不出培训与岗位表现有什么关系。',
    outline:['从业务挑战和具体工作场景倒推学习目标。','选取一份自己的课件，调整内容结构和学员练习。','检查授课环节，安排能看见学员实际运用的任务。'],
    format:'原课程要求学员携带一份自己的课件，结合目标学员的情境，在学习过程中调整设计。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=38',
  },
  {
    id:'159', title:'韧性领导力', area:3, audience:'在压力、变化或挫折中需要稳定团队的管理者。',
    scene:'突发变化打乱团队节奏。经理需要觉察自己的反应，帮助成员重新明确方向和下一步行动。',
    outline:['回顾压力情境，辨认自己的应激反应和思考习惯。','用同伴对话梳理动力，厘清团队希望守住的目标。','把一次挫折转化为团队可以复盘和试行的行动。'],
    format:'原课程用管理案例和同伴教练对话，分别讨论管理者的复原与团队的稳定。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=159',
  },
  {
    id:'115', title:'正向谈判：高手的修炼', area:1, audience:'参与客户、供应商或跨部门协商的业务人员与经理。',
    scene:'各方在条款或资源上互不相让，谈话停留在立场上，看不清可以交换的条件。',
    outline:['区分双方的要求与背后的利益，盘点可用筹码。','根据谈判阶段和对方风格准备提问、提案与回应。','比较交换方案，兼顾协议内容和后续合作关系。'],
    format:'原资料按谈判准备、双方沟通及协议推进梳理方法。本期练习方式可向教务确认。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=115',
  },
  {
    id:'6', title:'创造杰出绩效的教导', area:3, audience:'需要与员工讨论绩效差距并跟进改进的主管或经理。',
    scene:'一次绩效面谈结束，员工知道哪里没做好，却不知道下周具体要改变什么。',
    outline:['根据工作事实描述差距，判断是否适合开展教导。','在面谈中通过倾听和提问了解员工的困难。','与员工约定可观察的行动以及下一次跟进时间。'],
    format:'原课程用绩效面谈情境练习，配合观察反馈，调整提问、倾听和后续跟进。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=6',
  },
  {
    id:'4', title:'团队领导力', area:3, audience:'带领新团队或希望改善既有团队协作的管理者。',
    scene:'新团队分工含糊，成熟团队又可能安于现状。两种情况需要不同的带队方式。',
    outline:['判断团队处于哪一发展阶段，观察任务和关系上的障碍。','讨论成员特点、角色分工和共同目标。','针对当前阶段选择干预方法，回看团队协作的变化。'],
    format:'原课程从实际团队测评入手，讨论成员关系和任务分工随团队阶段的变化。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=4',
  },
  {
    id:'22', title:'6个信任沟通的好习惯', area:4, audience:'经常与同事合作、需要在压力下表达意见的员工。',
    scene:'双方都以为已经说清楚，实际行动却出现偏差；一旦指出问题，对话又容易变得紧张。',
    outline:['明确沟通目的，通过提问和复述核对理解。','给出具体的肯定或改进反馈，清楚表达自己的立场。','识别对方的沟通偏好，调整日常表达习惯。'],
    format:'原课程用学员日常沟通情境练习倾听、表达和反馈。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=22',
  },
  {
    id:'120', title:'打破思维定势的提问力', alias:'解决问题的提问力', area:2, audience:'需要带领讨论、理解复杂问题或启发下属思考的人。',
    scene:'团队反复争论几个熟悉的选项。换一个问题，可能比继续比较原方案更能推动讨论。',
    outline:['检查问题里隐含的前提，发现大家共同忽略的视角。','通过变换提问角度，重新界定要解决的事。','以工作难题练习追问，整理可以继续验证的方向。'],
    format:'通过案例和小组讨论，从不同角度向同一个工作问题提问。',
    source:'https://www.amachina.com/course/course_detail-120.html',
  },
  {
    id:'10', title:'解决问题技术：6把金钥匙', alias:'解决问题的6把金钥匙', area:2, audience:'需要分析工作问题并组织团队制定对策的人员。',
    scene:'同一种故障反复出现，几轮补救后仍不知道根源，也难以判断哪个办法值得先试。',
    outline:['对照目标和现状描述问题，与团队排出优先级。','利用事实分析成因，提出多个可能的对策。','确定选择标准，并为执行风险和应急处置作准备。'],
    format:'原课程可用工作中的问题练习，依次检视问题描述、原因、对策和执行风险。',
    source:'https://www.amachina.com/schedule/detail.aspx?id=10',
  },
  {
    id:'160', title:'从技术到伙伴：工程师的客户关系力', area:1, audience:'需要在客户现场沟通与协作的工程师。',
    scene:'技术问题处理完了，客户的预期和后续安排仍需有人说明。咨询时可以带上一段真实的现场对话。',
    questions:['这门课是否适合我负责的设备、服务或项目现场？','是否涉及客户预期沟通和现场负责人的角色？','本期课程大纲、练习方式与师资何时可以确认？'],
    source:'https://www.amachina.com/course/course_index.aspx',
  },
  {
    id:'31', title:'项目管理实战课', alias:'项目管理：原理与技巧', area:4, audience:'负责项目交付或参与跨部门项目协作的人员。',
    scene:'启动会上大家都同意目标，执行后却对范围、工期和资源理解不同，偏差越积越多。',
    outline:['在启动时核实相关方期望、范围和验收标准。','拆解工作并梳理任务依赖，用进度图安排资源。','在执行中报告偏差，讨论调整办法与交付要求。'],
    format:'原课程可结合真实项目情境，练习编制项目计划和处理执行偏差。',
    source:'https://www.amachina.com/course/course_detail.aspx?id=31',
  },
];

export function businessPageTitle(pathname) {
  const path = pathname.replace(/\/$/, '');
  if (path === '/courses') return '课程咨询目录';
  if (path === '/solutions') return '企业培训咨询';
  const match = /^\/courses\/(\d+)$/.exec(path);
  return match && courses.find(course=>course.id===match[1])?.title;
}
