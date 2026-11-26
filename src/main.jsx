import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { siteBase } from "./navigation.jsx";
import { normalizeStaticPath, readContactValues } from "./bootstrap.js";
import "./styles.css";

const pathname = normalizeStaticPath(location.pathname);
if (pathname !== location.pathname) {
  history.replaceState(history.state, '', pathname + location.search + location.hash);
}
const root = document.getElementById("root");
if (root) {
  const initialContactValues = readContactValues(root);

  createRoot(root).render(
    <React.StrictMode>
      <BrowserRouter basename={siteBase}><App initialContactValues={initialContactValues} /></BrowserRouter>
    </React.StrictMode>,
  );
}

import("./yueyue/Guide.jsx").then(({ mountGuide }) => mountGuide());
