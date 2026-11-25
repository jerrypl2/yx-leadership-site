import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { App } from './App.jsx';

// Render the same editable React components into portable, complete HTML pages.
export function renderRoute(pathname) {
  return renderToStaticMarkup(
    <StaticRouter location={pathname}><App /></StaticRouter>
  );
}
