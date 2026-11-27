import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, siteHref } from './navigation.jsx';
import { asset } from './assets.js';
import { leadershipModelPath } from './business/leadership-model.js';
import { customersPath } from './business/customer-feedback.js';

const logoSrc = asset('https://botany-solid-84734790.figma.site/_components/v2/f51628a311779c982c4d8e2f61c4e7fbf4e590ff/image-1.428ac48c.png');

const menu = [
  { title: '企业服务', links: [
    { label: '解决方案', to: '/#solutions' },
    { label: '企业培训咨询', to: '/solutions/' },
    { label: '服务行业', to: '/#industries' },
    { label: '方法与实现', to: '/methods/' },
  ] },
  { title: '课程体系', links: [
    { label: '悦心教室', to: '/classroom/' },
    { label: '课程咨询目录', to: '/courses/' },
    { label: '组织能力地图', to: '/capability-map/' },
    { label: '领导力模型', to: leadershipModelPath },
  ] },
  { title: '案例与观点', links: [
    { label: '案例', to: '/cases/' },
    { label: '观点', to: '/opinions/' },
  ] },
  { title: '关于我们', links: [
    { label: '中心介绍', to: '/about/' },
    { label: '客户与口碑', to: customersPath },
    { label: '联系我们', to: '/contact/' },
  ] },
];

function MenuLink({ item }) {
  const { pathname, hash } = useLocation();
  const path = pathname.replace(/\/?$/, '/');
  if (item.to.includes('#')) {
    return <a href={siteHref(item.to)} aria-current={path + hash === item.to ? 'location' : undefined}>{item.label}</a>;
  }
  return <Link to={item.to} aria-current={path === item.to ? 'page' : undefined}>{item.label}</Link>;
}

function MenuLinks({ links }) {
  return <ul>{links.map(item => <li key={item.to}><MenuLink item={item} /></li>)}</ul>;
}

function MenuGroups({ layout }) {
  return <div className={'menu-groups '+layout+'-groups'}>
    {menu.map(group => <details className="menu-group" name={layout+'-section'} key={group.title}
      onBlur={event => {
        if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
      }}>
      <summary>{group.title}</summary>
      <MenuLinks links={group.links} />
    </details>)}
  </div>;
}

function closeMenus(root) {
  root.querySelectorAll('details[open]').forEach(details => { details.open = false; });
}

export function Header() {
  const nav = useRef(null);
  const { key } = useLocation();
  useEffect(() => { closeMenus(nav.current); }, [key]);
  useEffect(() => {
    const root = nav.current;
    const outside = event => { if (!root.contains(event.target)) closeMenus(root); };
    const breakpoint = window.matchMedia('(min-width: 48rem)');
    const reset = () => closeMenus(root);
    document.addEventListener('pointerdown', outside);
    breakpoint.addEventListener('change', reset);
    return () => {
      document.removeEventListener('pointerdown', outside);
      breakpoint.removeEventListener('change', reset);
    };
  }, []);
  function handleEscape(event) {
    if (event.key !== 'Escape') return;
    const open = event.target.closest('details[open]') || nav.current.querySelector('details[open]');
    if (!open) return;
    open.open = false;
    open.querySelector('summary').focus();
    event.stopPropagation();
  }

  return <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
    <div className="site-header-inner max-w-7xl mx-auto">
      <Link to="/" className="header-brand"><img src={logoSrc} alt="悦心领导力中心" /></Link>
      <nav ref={nav} aria-label="主导航" className="site-navigation" onKeyDown={handleEscape}
        onClick={event => { if (event.target.closest('a')) closeMenus(event.currentTarget); }}
        onBlur={event => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) closeMenus(event.currentTarget);
        }}>
        <MenuGroups layout="desktop" />
        <details className="mobile-menu">
          <summary>菜单</summary>
          <MenuGroups layout="mobile" />
        </details>
      </nav>
    </div>
  </header>;
}

export function Footer() {
  const { pathname } = useLocation();
  return <footer className="py-12 px-6 border-t border-border">
    <div className="max-w-7xl mx-auto">
      <div className="site-footer-inner mb-8">
        <div>
          <img src={logoSrc} alt="悦心领导力中心" className="h-8 mb-4" />
          <p className="text-sm text-muted-foreground">在关键时刻，让事情真正向前发生</p>
        </div>
        <nav aria-label="页脚导航" className="footer-navigation">
          {menu.map(group => <div key={group.title}>
            <h2>{group.title}</h2>
            <MenuLinks links={group.links} />
          </div>)}
        </nav>
      </div>
      <div className="pt-8 border-t border-border text-sm text-muted-foreground text-center">
        © 2026 上海美鼎企业管理咨询有限公司。保留所有权利。
        {pathname === '/' && <p className="mt-2 text-xs">测试版本 · Version {__SITE_VERSION__}</p>}
      </div>
    </div>
  </footer>;
}
