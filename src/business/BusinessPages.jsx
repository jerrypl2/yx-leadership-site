import { useState } from 'react';
import { Link, useParams } from '../navigation.jsx';
import { sessions, sessionDates } from '../classroom/catalog.js';
import { courses } from './courses.js';
import { topics, areaNames } from './topics.js';
import { leadershipModelPath } from './leadership-model.js';

export function CourseLinks({items}) {
  return <ul className="business-links">{items.map(c =>
    <li key={c.id}><Link to={'/courses/'+c.id+'/'}>{c.title}</Link></li>)}</ul>;
}

export function CourseIndex() {
  const [search,setSearch] = useState('');
  const query = search.trim().toLocaleLowerCase();
  const matches = courses.filter(c => [c.title,c.alias,areaNames[c.area-1]].some(s => s?.toLocaleLowerCase().includes(query)));
  return <main className="business-page">
    <Link className="business-back" to="/classroom/">返回悦心教室</Link>
    <h1>课程咨询目录</h1>
    <p className="business-intro">按课程名称、曾用名或能力方向查找，查看内容后可直接咨询对应班次。</p>
    <nav className="course-paths" aria-label="选择查课方式">
      <a href="#course-search">按课名查找</a>
      <Link to={leadershipModelPath}>按领导力模型选课</Link>
    </nav>
    <label className="course-search">查找课程<input id="course-search" type="search" placeholder="输入课程名、曾用名或能力方向" value={search} onChange={e=>setSearch(e.target.value)} /></label>
    <p role="status" className="course-count">{matches.length ? '共 '+matches.length+' 门课程' : '未找到匹配的课程，请换一个关键词。'}</p>
    <ul className="course-index">{matches.map(c=><li key={c.id}>
      <Link to={'/courses/'+c.id+'/'}><small>{areaNames[c.area-1]}</small><h2>{c.title}</h2>
        <p>{c.audience}</p>{c.alias && <small>曾用名 · {c.alias}</small>}</Link>
    </li>)}</ul>
  </main>;
}

export function CourseDetail() {
  const {id}=useParams();
  const course=courses.find(c=>c.id===id);
  if (!course) return <main className="business-page"><h1>未找到该课程</h1><Link to="/courses/">返回课程目录</Link></main>;
  const upcoming=sessions.filter(s=>s.courseId===id);
  return <main className="business-page course-detail">
    <Link className="business-back" to="/courses/">返回课程目录</Link>
    <p className="business-meta"><Link to={'/capability-map/#area-'+course.area}>{areaNames[course.area-1]}</Link></p>
    <h1>{course.title}</h1>
    {course.alias && <p className="business-meta">曾用名 · {course.alias}</p>}
    <p className="business-intro">{course.scene}</p>
    <section><h2>适合谁了解</h2><p>{course.audience}</p></section>
    <section><h2>{course.outline ? '课程学习要点' : '可向教务了解'}</h2>
      <ul className="business-points">{(course.outline || course.questions).map(p=><li key={p}>{p}</li>)}</ul>
      {!course.outline && <p>本期大纲与练习安排待教务确认。</p>}
    </section>
    {course.format && <section><h2>学习方式参考</h2><p>{course.format}</p></section>}
    <section><h2>咨询班次</h2>
      {upcoming.map(s=><div className="course-session" key={s.id}>
        <div><strong>{s.city} · {sessionDates(s)}</strong><p>参考班次 {s.id} · 待教务确认</p></div>
        <Link className="business-button" to={'/classroom/?session='+s.id}>咨询此班次</Link>
      </div>)}
    </section>
  </main>;
}

export function BusinessIndex({cases}) {
  return <main className="business-page enterprise-index">
    <h1>企业培训咨询</h1>
    <p className="business-intro">从团队正在面对的问题出发，查看相应的工作方式、课程和案例。</p>
    <nav className="business-links" aria-label="企业培训方向">{topics.map(t=><a key={t.id} href={'#'+t.id}>{t.name}</a>)}</nav>
    {topics.map(t=><section key={t.id} id={t.id} className="enterprise-topic">
      <h2>{t.name}</h2><h3>{t.question}</h3><p>{t.approach}</p><p>{t.preparation}</p>
      <div className="enterprise-evidence"><Link to={t.relatedPath}>{t.relatedLabel}</Link>
        {t.cases.map(id=><Link key={id} to={'/cases/'+id+'/'}>案例 · {cases.find(c=>c.id===id).title}</Link>)}
      </div>
      <h3 className="business-subheading">相关课程</h3><CourseLinks items={t.courseIds.map(id=>courses.find(c=>c.id===id))}/>
      <Link className="business-button" to={'/contact/?topic='+t.id}>咨询{t.name}</Link>
    </section>)}
  </main>;
}
