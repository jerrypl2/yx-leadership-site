import { Link } from '../navigation.jsx';
import { courses } from './courses.js';
import { CourseLinks } from './BusinessPages.jsx';
import { leadershipDimensions } from './leadership-model.js';

export function LeadershipModelPage() {
  return <main className="business-page leadership-model">
    <Link className="business-back" to="/capability-map/#area-3">返回管理者与组织领导力</Link>
    <h1>领导力模型</h1>
    <p className="business-intro">选择与你当前工作有关的维度，查看具体的管理行为、工作示例和相关课程。</p>
    <nav className="model-overview" aria-label="选择领导力维度">
      {leadershipDimensions.map(dimension =>
        <a key={dimension.id} href={'#'+dimension.id}>
          <strong>{dimension.title}</strong>
          <span className="model-terms">{dimension.aspects.map(aspect=><span key={aspect.title}>{aspect.title}</span>)}</span>
        </a>)}
    </nav>
    {leadershipDimensions.map(dimension =>
      <section className="model-dimension" id={dimension.id} key={dimension.id} aria-labelledby={dimension.id+'-title'}>
        <h2 id={dimension.id+'-title'}>{dimension.title}</h2>
        <p className="model-question">{dimension.question}</p>
        <div className="model-aspects">
          {dimension.aspects.map(aspect =>
            <article key={aspect.title}>
              <h3>{aspect.title}</h3>
              <p>{aspect.behavior}</p>
              <div className="model-example"><h4>工作示例</h4><p>{aspect.example}</p></div>
              {aspect.courses ? <div className="model-course"><h4>相关课程</h4>
                <CourseLinks items={aspect.courses.map(id=>courses.find(course=>course.id===id))}/>
              </div> : <div className="model-course"><h4>课程咨询</h4>
                <p>原模型对应课程包括《{aspect.historicalCourse}》，开设情况待确认。</p>
                <Link to={'/contact/?'+new URLSearchParams({topic:aspect.topic,aspect:aspect.title})}>咨询「{aspect.title}」培养方案</Link>
              </div>}
            </article>)}
        </div>
      </section>)}
    <Link className="business-back" to="/courses/">查看全部课程咨询资料</Link>
  </main>;
}
