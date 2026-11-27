import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import {
  Layout, HomePage, AboutPage, CapabilityMapPage, MethodsPage, ContactPage,
  CasesPage, CaseDetailPage, SolutionPage, IndustryPage, OpinionsPage,
  OpinionDetailPage, ClassroomPage, caseSummaries,
} from './Site.jsx';
import { businessPageTitle } from './business/courses.js';
import { CourseIndex, CourseDetail, BusinessIndex } from './business/BusinessPages.jsx';
import { Link } from './navigation.jsx';

export function App({ initialContactValues } = {}) {
  const {pathname, hash} = useLocation();
  useEffect(() => {
    const title = businessPageTitle(pathname);
    document.title = title ? title+' · 悦心领导力中心' : 'YX Leadership Center';
  }, [pathname]);
  useEffect(() => { if (hash) document.getElementById(hash.slice(1))?.scrollIntoView(); }, [pathname,hash]);
  const [initialDraft, setInitialDraft] = useState(initialContactValues);
  // ContactPage keeps its own controlled state after the first render. Clear
  // the one-time bootstrap draft so revisiting the page starts a fresh form.
  useEffect(() => {
    if (initialDraft) setInitialDraft(undefined);
  }, [initialDraft]);
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/capability-map" element={<Layout><CapabilityMapPage /></Layout>} />
      <Route path="/methods" element={<Layout><MethodsPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage initialValues={initialDraft} /></Layout>} />
      <Route path="/cases" element={<Layout><CasesPage /></Layout>} />
      <Route path="/cases/:id" element={<Layout><CaseDetailPage /></Layout>} />
      <Route path="/courses" element={<Layout><CourseIndex /></Layout>} />
      <Route path="/courses/:id" element={<Layout><CourseDetail /></Layout>} />
      <Route path="/solutions" element={<Layout><BusinessIndex cases={caseSummaries} /></Layout>} />
      <Route path="/solutions/:id" element={<Layout><SolutionPage /></Layout>} />
      <Route path="/industries/:id" element={<Layout><IndustryPage /></Layout>} />
      <Route path="/opinions" element={<Layout><OpinionsPage /></Layout>} />
      <Route path="/opinions/:id" element={<Layout><OpinionDetailPage /></Layout>} />
      <Route path="/classroom" element={<Layout><ClassroomPage /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

function NotFound() {
  return <main className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl mb-4">页面未找到</h1>
      <Link to="/" className="text-primary hover:underline">返回首页</Link>
    </div>
  </main>;
}
