import { useState } from 'react';
import { Link } from '../navigation.jsx';
import { courses } from './courses.js';
import directory from './customer-directory.json';
import { customerVoices, courseFeedback } from './customer-feedback.js';

function normalize(value) {
  return value.normalize('NFKC').trim().toLowerCase();
}

function CustomerDirectory() {
  const [search, setSearch] = useState('');
  const query = normalize(search);
  const matches = directory.map(({industry, names}) => ({
    industry,
    names: normalize(industry).includes(query) ? names : names.filter(name => normalize(name).includes(query)),
  })).filter(group => group.names.length);
  const count = matches.reduce((total, group) => total + group.names.length, 0);

  return <section id="directory" className="customer-section">
    <h2>客户名录</h2>
    <p className="customer-note">旧站曾公开列名的企业与机构，按当时的名称及行业收录。展开行业可查看完整名单。</p>
    <label className="course-search">查找企业或行业
      <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="输入中文名、英文名或行业" />
    </label>
    <div className="directory-status">
      <p role="status">{count ? matches.length+' 个行业 · '+count+' 条名录记录' : '未找到匹配的名录记录，请换一个名称或行业。'}</p>
      {search && <button type="button" onClick={() => setSearch('')}>清除搜索</button>}
    </div>
    <div className="customer-groups">{matches.map(({industry, names}) =>
      <details key={(query ? 'search-' : 'browse-') + industry} open={query ? true : undefined}>
        <summary>{industry}<span>（{names.length}）</span></summary>
        <ul>{names.map(name => <li key={name}>{name}</li>)}</ul>
      </details>)}
    </div>
  </section>;
}

export function CustomersPage() {
  return <main className="business-page customers-page">
    <Link to="/about/" className="business-back">关于我们</Link>
    <h1>客户与口碑</h1>
    <p className="business-intro">按行业查找旧站公开的客户名称，或从往届反馈了解学员在课堂上练过什么、带走了什么。</p>
    <nav className="course-paths" aria-label="客户与口碑栏目">
      <a href="#directory">客户名录</a><a href="#voices">客户之声</a><a href="#course-feedback">课程反馈</a>
    </nav>
    <CustomerDirectory />
    <section id="voices" className="customer-section">
      <h2>客户之声</h2>
      <p className="customer-note">选自旧站「客户之声」。每则摘要来自一位往届学员的公开留言，已作匿名整理。</p>
      <ul className="customer-voices">{customerVoices.map(({topic, text}) =>
        <li key={topic}><h3>{topic}</h3><p>{text}</p></li>)}</ul>
    </section>
    <section id="course-feedback" className="customer-section">
      <h2>课程反馈</h2>
      <p className="customer-note">选择一门课，查看旧站该课程页收录的匿名反馈摘要。</p>
      <ul className="customer-course-list">{courses.filter(course => courseFeedback[course.id]).map(course =>
        <li key={course.id}><Link to={'/courses/'+course.id+'/#feedback'}>{course.title}</Link></li>)}</ul>
    </section>
  </main>;
}
