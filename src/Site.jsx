/**
 * 悦心领导力中心 — independent, editable React source.
 * Reconstructed from the public application bundle on 2026-11-25.
 * Original text, responsive classes, icon paths and page composition are retained.
 */
import { createElement, forwardRef, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useParams, siteHref } from "./navigation.jsx";
import { emptyContact, identifyAttempt, forgetAttempt, saveContact } from "./contact.js";
import { asset } from "./assets.js";
const logoSrc = asset(
  "https://botany-solid-84734790.figma.site/_components/v2/f51628a311779c982c4d8e2f61c4e7fbf4e590ff/image-1.428ac48c.png",
);
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoSrc} alt="悦心领导力中心" className="h-8" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href={siteHref("/#solutions")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"解决方案"}
          </a>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/capability-map"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"组织能力地图"}
          </Link>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/methods"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"方法与实现"}
          </Link>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/cases"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"案例"}
          </Link>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/opinions"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"观点"}
          </Link>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/classroom"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"悦心教室"}
          </Link>
          <span className="text-muted-foreground">{"｜"}</span>
          <Link
            to="/about"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {"关于我们"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  const { pathname } = useLocation();
  return (
    <footer className="py-12 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoSrc} alt="悦心领导力中心" className="h-8" />
            </div>
            <p className="text-sm text-muted-foreground">
              {"在关键时刻，让事情真正向前发生"}
            </p>
          </div>
          <div>
            <h4 className="mb-4">{"导航"}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={siteHref("/#solutions")}
                  className="hover:text-foreground transition-colors"
                >
                  {"解决方案"}
                </a>
              </li>
              <li>
                <Link
                  to="/capability-map"
                  className="hover:text-foreground transition-colors"
                >
                  {"组织能力地图"}
                </Link>
              </li>
              <li>
                <Link
                  to="/methods"
                  className="hover:text-foreground transition-colors"
                >
                  {"方法与实现"}
                </Link>
              </li>
              <li>
                <Link
                  to="/cases"
                  className="hover:text-foreground transition-colors"
                >
                  {"案例"}
                </Link>
              </li>
              <li>
                <Link
                  to="/opinions"
                  className="hover:text-foreground transition-colors"
                >
                  {"观点"}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-foreground transition-colors"
                >
                  {"关于我们"}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  {"联系我们"}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-border text-sm text-muted-foreground text-center">
          {"© 2026 上海美鼎企业管理咨询有限公司。保留所有权利。"}
          {pathname === "/" && (
            <p className="mt-2 text-xs">测试版本 · Version 0.1</p>
          )}
        </div>
      </div>
    </footer>
  );
}
const IMAGE_FALLBACK =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ImageWithFallback(e) {
  const [t, r] = useState(!1),
    a = () => {
      r(!0);
    },
    { src: n, alt: l, style: o, className: s, ...d } = e;
  return t ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${s ?? ""}`}
      style={o}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={IMAGE_FALLBACK}
          alt="Error loading image"
          {...d}
          data-original-url={n}
        />
      </div>
    </div>
  ) : (
    <img src={n} alt={l} className={s} style={o} {...d} onError={a} />
  );
}
function HomeHero() {
  return (
    <section className="pt-40 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl leading-tight mb-8">
              {"在关键时刻，"}
              <br />
              {"让关键的事发生"}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {"我们服务于技术驱动、业务复杂、对结果要求极高的企业，"}
              <br />
              {"帮助关键岗位人员在面对客户、推动重要事项以及做出关键决策时，"}
              <br />
              {"形成更清晰的判断，并推动事情真正向前发生并产生结果。"}
            </p>
          </div>
          <div className="relative h-[450px] rounded-2xl overflow-hidden">
            <ImageWithFallback
              src={asset(
                "https://images.unsplash.com/photo-1758691736433-4078b93abd72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxleGVjdXRpdmUlMjB0ZWFtJTIwc3RyYXRlZ2ljJTIwcGxhbm5pbmd8ZW58MXx8fHwxNzc3Nzg0OTUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
              )}
              alt="战略决策会议"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const toKebabCase = (e) =>
    e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(),
  toCamelCase = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (t, r, a) =>
      a ? a.toUpperCase() : r.toLowerCase(),
    ),
  toPascalCase = (e) => {
    const t = toCamelCase(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  mergeClasses = (...e) =>
    e
      .filter((t, r, a) => !!t && t.trim() !== "" && a.indexOf(t) === r)
      .join(" ")
      .trim();
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var defaultIconAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Icon = forwardRef(
  (
    {
      color: e = "currentColor",
      size: t = 24,
      strokeWidth: r = 2,
      absoluteStrokeWidth: a,
      className: n = "",
      children: l,
      iconNode: o,
      ...s
    },
    d,
  ) =>
    createElement(
      "svg",
      {
        ref: d,
        ...defaultIconAttributes,
        width: t,
        height: t,
        stroke: e,
        strokeWidth: a ? (Number(r) * 24) / Number(t) : r,
        className: mergeClasses("lucide", n),
        ...s,
      },
      [
        ...o.map(([u, g]) => createElement(u, g)),
        ...(Array.isArray(l) ? l : [l]),
      ],
    ),
);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const createLucideIcon = (e, t) => {
  const r = forwardRef(({ className: a, ...n }, l) =>
    createElement(Icon, {
      ref: l,
      iconNode: t,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(e))}`,
        `lucide-${e}`,
        a,
      ),
      ...n,
    }),
  );
  return ((r.displayName = toPascalCase(e)), r);
};
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const arrowLeftPaths = [
    [
      "path",
      {
        d: "m12 19-7-7 7-7",
        key: "1l729n",
      },
    ],
    [
      "path",
      {
        d: "M19 12H5",
        key: "x3x0zl",
      },
    ],
  ],
  ArrowLeft = createLucideIcon("arrow-left", arrowLeftPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const arrowRightPaths = [
    [
      "path",
      {
        d: "M5 12h14",
        key: "1ays0h",
      },
    ],
    [
      "path",
      {
        d: "m12 5 7 7-7 7",
        key: "xquz4c",
      },
    ],
  ],
  ArrowRight = createLucideIcon("arrow-right", arrowRightPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bookOpenPaths = [
    [
      "path",
      {
        d: "M12 7v14",
        key: "1akyts",
      },
    ],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y",
      },
    ],
  ],
  BookOpen = createLucideIcon("book-open", bookOpenPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const calendarPaths = [
    [
      "path",
      {
        d: "M8 2v4",
        key: "1cmpym",
      },
    ],
    [
      "path",
      {
        d: "M16 2v4",
        key: "4m81vk",
      },
    ],
    [
      "rect",
      {
        width: "18",
        height: "18",
        x: "3",
        y: "4",
        rx: "2",
        key: "1hopcy",
      },
    ],
    [
      "path",
      {
        d: "M3 10h18",
        key: "8toen8",
      },
    ],
  ],
  Calendar = createLucideIcon("calendar", calendarPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const clockPaths = [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay",
      },
    ],
    [
      "polyline",
      {
        points: "12 6 12 12 16 14",
        key: "68esgv",
      },
    ],
  ],
  Clock = createLucideIcon("clock", clockPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fileTextPaths = [
    [
      "path",
      {
        d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
        key: "1rqfz7",
      },
    ],
    [
      "path",
      {
        d: "M14 2v4a2 2 0 0 0 2 2h4",
        key: "tnqrlb",
      },
    ],
    [
      "path",
      {
        d: "M10 9H8",
        key: "b1mrlr",
      },
    ],
    [
      "path",
      {
        d: "M16 13H8",
        key: "t4e002",
      },
    ],
    [
      "path",
      {
        d: "M16 17H8",
        key: "z1uh3a",
      },
    ],
  ],
  FileText = createLucideIcon("file-text", fileTextPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gitBranchPaths = [
    [
      "line",
      {
        x1: "6",
        x2: "6",
        y1: "3",
        y2: "15",
        key: "17qcm7",
      },
    ],
    [
      "circle",
      {
        cx: "18",
        cy: "6",
        r: "3",
        key: "1h7g24",
      },
    ],
    [
      "circle",
      {
        cx: "6",
        cy: "18",
        r: "3",
        key: "fqmcym",
      },
    ],
    [
      "path",
      {
        d: "M18 9a9 9 0 0 1-9 9",
        key: "n2h4wq",
      },
    ],
  ],
  GitBranch = createLucideIcon("git-branch", gitBranchPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const graduationCapPaths = [
    [
      "path",
      {
        d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
        key: "j76jl0",
      },
    ],
    [
      "path",
      {
        d: "M22 10v6",
        key: "1lu8f3",
      },
    ],
    [
      "path",
      {
        d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5",
        key: "1r8lef",
      },
    ],
  ],
  GraduationCap = createLucideIcon("graduation-cap", graduationCapPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lightbulbPaths = [
    [
      "path",
      {
        d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
        key: "1gvzjb",
      },
    ],
    [
      "path",
      {
        d: "M9 18h6",
        key: "x1upvd",
      },
    ],
    [
      "path",
      {
        d: "M10 22h4",
        key: "ceow96",
      },
    ],
  ],
  Lightbulb = createLucideIcon("lightbulb", lightbulbPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mailPaths = [
    [
      "rect",
      {
        width: "20",
        height: "16",
        x: "2",
        y: "4",
        rx: "2",
        key: "18n3k1",
      },
    ],
    [
      "path",
      {
        d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
        key: "1ocrg3",
      },
    ],
  ],
  Mail = createLucideIcon("mail", mailPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mapPinPaths = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z",
      },
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "10",
        r: "3",
        key: "ilqhr7",
      },
    ],
  ],
  MapPin = createLucideIcon("map-pin", mapPinPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mapPaths = [
    [
      "path",
      {
        d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
        key: "169xi5",
      },
    ],
    [
      "path",
      {
        d: "M15 5.764v15",
        key: "1pn4in",
      },
    ],
    [
      "path",
      {
        d: "M9 3.236v15",
        key: "1uimfh",
      },
    ],
  ],
  MapIcon = createLucideIcon("map", mapPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const messageCirclePaths = [
    [
      "path",
      {
        d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z",
        key: "vv11sd",
      },
    ],
  ],
  MessageCircle = createLucideIcon("message-circle", messageCirclePaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const networkPaths = [
    [
      "rect",
      {
        x: "16",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "4q2zg0",
      },
    ],
    [
      "rect",
      {
        x: "2",
        y: "16",
        width: "6",
        height: "6",
        rx: "1",
        key: "8cvhb9",
      },
    ],
    [
      "rect",
      {
        x: "9",
        y: "2",
        width: "6",
        height: "6",
        rx: "1",
        key: "1egb70",
      },
    ],
    [
      "path",
      {
        d: "M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",
        key: "1jsf9p",
      },
    ],
    [
      "path",
      {
        d: "M12 12V8",
        key: "2874zd",
      },
    ],
  ],
  Network = createLucideIcon("network", networkPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const phonePaths = [
    [
      "path",
      {
        d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        key: "foiqr5",
      },
    ],
  ],
  Phone = createLucideIcon("phone", phonePaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const refreshCwPaths = [
    [
      "path",
      {
        d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
        key: "v9h5vc",
      },
    ],
    [
      "path",
      {
        d: "M21 3v5h-5",
        key: "1q7to0",
      },
    ],
    [
      "path",
      {
        d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
        key: "3uifl3",
      },
    ],
    [
      "path",
      {
        d: "M8 16H3v5",
        key: "1cv678",
      },
    ],
  ],
  RefreshCw = createLucideIcon("refresh-cw", refreshCwPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const scalePaths = [
    [
      "path",
      {
        d: "m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
        key: "7g6ntu",
      },
    ],
    [
      "path",
      {
        d: "m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",
        key: "ijws7r",
      },
    ],
    [
      "path",
      {
        d: "M7 21h10",
        key: "1b0cd5",
      },
    ],
    [
      "path",
      {
        d: "M12 3v18",
        key: "108xh3",
      },
    ],
    [
      "path",
      {
        d: "M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",
        key: "3gwbw2",
      },
    ],
  ],
  Scale = createLucideIcon("scale", scalePaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sendPaths = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3",
      },
    ],
    [
      "path",
      {
        d: "m21.854 2.147-10.94 10.939",
        key: "12cjpa",
      },
    ],
  ],
  Send = createLucideIcon("send", sendPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const targetPaths = [
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "10",
        key: "1mglay",
      },
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "6",
        key: "1vlfrh",
      },
    ],
    [
      "circle",
      {
        cx: "12",
        cy: "12",
        r: "2",
        key: "1c9p78",
      },
    ],
  ],
  Target = createLucideIcon("target", targetPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const trendingUpPaths = [
    [
      "polyline",
      {
        points: "22 7 13.5 15.5 8.5 10.5 2 17",
        key: "126l90",
      },
    ],
    [
      "polyline",
      {
        points: "16 7 22 7 22 13",
        key: "kwv8wd",
      },
    ],
  ],
  TrendingUp = createLucideIcon("trending-up", trendingUpPaths);
/**
 * @license lucide-react v0.487.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const usersPaths = [
    [
      "path",
      {
        d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",
        key: "1yyitq",
      },
    ],
    [
      "circle",
      {
        cx: "9",
        cy: "7",
        r: "4",
        key: "nufk8",
      },
    ],
    [
      "path",
      {
        d: "M22 21v-2a4 4 0 0 0-3-3.87",
        key: "kshegd",
      },
    ],
    [
      "path",
      {
        d: "M16 3.13a4 4 0 0 1 0 7.75",
        key: "1da9ce",
      },
    ],
  ],
  Users = createLucideIcon("users", usersPaths),
  solutionCards = [
    {
      slug: "client-interaction",
      icon: MessageCircle,
      title: "客户互动",
      subtitle: "客户沟通一直在发生，但结果没有被真正推动",
      description:
        "能讲清内容，也有持续互动，但在关键时刻难以引导客户形成明确判断，沟通在发生，却很少转化为对结果的实质推动。",
    },
    {
      slug: "complex-matters",
      icon: GitBranch,
      title: "复杂事项推进",
      subtitle: "大家都在忙，但事情始终没有真正往前走",
      description:
        "每个团队都在投入，也在行动，但对问题的理解停留在各自视角，难以真正对齐，工作不断展开，却始终难以形成合力与进展。",
    },
    {
      slug: "key-decisions",
      icon: Scale,
      title: "关键决策",
      subtitle: "反复讨论不断，但关键决策始终定不下来",
      description:
        "信息越来越多，讨论也在持续展开，但关键变量难以被看清，判断反复调整，决策始终难以稳定落地。",
    },
    {
      slug: "learning-transformation",
      icon: GraduationCap,
      title: "学习与转化",
      subtitle: "持续投入学习，但对实际工作影响有限",
      description:
        "课程与内容持续投入，但与真实工作场景之间缺乏连接，学习发生了，却难以转化为可持续的行为与结果。",
    },
  ];
function HomeSolutions() {
  return (
    <section id="solutions" className="py-20 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">
            {"为什么很多重要工作，在推进过程中反复卡住？"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {"在复杂业务环境中，问题往往不在于是否投入或经验是否足够，"}
            <br />
            {
              "而在于推进过程中，各方对问题的理解难以真正对齐，关键节点缺乏有效推动，"
            }
            <br />
            {"使得事情在不断沟通与调整中反复消耗，始终难以形成实质进展。"}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {solutionCards.map((e) => (
            <Link
              key={e.title}
              to={`/solutions/${e.slug}`}
              className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow block group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <e.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl mb-3 group-hover:text-primary transition-colors">
                {e.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {e.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {e.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
const industryCards = [
  {
    slug: "biomedical",
    name: "生物医药",
    image: asset(
      "https://images.unsplash.com/photo-1748261347768-a32434751a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxiaW90ZWNoJTIwcGhhcm1hY2V1dGljYWwlMjByZXNlYXJjaCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzc3Nzg3NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在高度专业、政策变化与多方协同并存的环境中，帮助关键团队形成一致判断，推动重要事项真正落地。",
  },
  {
    slug: "premium-services",
    name: "高端服务与高价值消费",
    image: asset(
      "https://images.unsplash.com/photo-1771340042917-20213a50b574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzZXJ2aWNlJTIwcHJlbWl1bSUyMGN1c3RvbWVyJTIwZXhwZXJpZW5jZXxlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在客户决策谨慎、体验要求极高的场景中，帮助一线团队在关键接触中把握节奏、影响判断，并推动转化发生。",
  },
  {
    slug: "semiconductor-manufacturing",
    name: "半导体与高端制造",
    image: asset(
      "https://images.unsplash.com/photo-1765256931287-e7f0e36b9ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc3Nzg3NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在技术复杂、客户深度参与、多方协同要求高的业务中，帮助技术与管理团队更有效地参与客户过程、推进关键事项。",
  },
  {
    slug: "global-capability",
    name: "全球化与体系化能力建设",
    image: asset(
      "https://images.unsplash.com/photo-1759310610775-b298f34f73aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMGNvbGxhYm9yYXRpb24lMjBtdWx0aW5hdGlvbmFsfGVufDF8fHx8MTc3Nzc4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在多地区、多业务单元的长期能力建设中，帮助企业让标准、内容与执行体系统一运转，并持续产生效果。",
  },
];
function HomeIndustries() {
  return (
    <section id="industries" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4">{"我们更常合作的企业类型"}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {
              "我们主要与那些业务复杂、专业门槛高、且结果高度依赖人如何行动与判断的企业合作。"
            }
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {industryCards.map((e) => (
            <Link
              key={e.name}
              to={`/industries/${e.slug}`}
              className="group cursor-pointer block"
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                <ImageWithFallback
                  src={e.image}
                  alt={e.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-6 left-6 text-white text-2xl">
                  {e.name}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {e.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function HomeContact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 bg-primary text-primary-foreground"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl mb-8 leading-relaxed font-normal">
          {"当事情反复卡住，"}
          <br className="hidden md:block" />
          {"往往意味着推进方式需要被重新审视"}
        </h2>
        <p className="text-base md:text-lg mb-10 opacity-90 leading-loose max-w-3xl mx-auto">
          {"我们帮助组织看清真正的卡点，"}
          <br className="hidden md:block" />
          {"并建立一种在关键时刻能够持续推动事情向前的方式。"}
        </p>
        <Link
          to="/contact"
          className="px-8 py-4 bg-background text-foreground rounded-md hover:opacity-90 transition-opacity inline-flex items-center gap-2 text-base"
        >
          {"和我们讨论一个具体问题"}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HomeHero />
      <HomeSolutions />
      <HomeIndustries />
      <HomeContact />
    </div>
  );
}
const CONTENT_IMAGE_FALLBACK =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";
function ContentImageWithFallback(e) {
  const [t, r] = useState(!1),
    a = () => {
      r(!0);
    },
    { src: n, alt: l, style: o, className: s, ...d } = e;
  return t ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${s ?? ""}`}
      style={o}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img
          src={CONTENT_IMAGE_FALLBACK}
          alt="Error loading image"
          {...d}
          data-original-url={n}
        />
      </div>
    </div>
  ) : (
    <img src={n} alt={l} className={s} style={o} {...d} onError={a} />
  );
}
const companyHistory = [
    {
      title: "我们的起点：从全球管理教育体系进入中国",
      content: [
        {
          type: "paragraph",
          text: "1996年，我们在上海成立，作为 American Management Association（美国管理协会，简称 AMA）在中国的合作机构，开始在中国系统性引入国际管理教育体系。",
        },
        {
          type: "paragraph",
          text: "AMA成立于1923年，总部位于纽约，是全球最具影响力的管理教育机构之一，长期服务于绝大多数《财富》500强企业。",
        },
        {
          type: "paragraph",
          text: "在这一阶段，我们的核心工作，是将全球成熟的管理课程、方法与实践经验带入中国，服务最早一批跨国企业与本土成长型企业的管理者。",
        },
      ],
      image: asset(
        "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc3Nzc4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      ),
    },
    {
      title: '我们的积累：把"国外方法"变成"中国能用"',
      content: [
        {
          type: "paragraph",
          text: "从2003年开始，我们逐步组建了专职的研发团队与顾问团队，不再只是引入课程，而是开始系统性地进行本土化与自主开发。",
        },
        {
          type: "paragraph-with-list",
          text: "我们围绕企业真实业务问题，持续打磨课程、工具与项目方法，逐渐形成：",
          list: [
            "面向不同管理层级的课程体系",
            "以业务问题为核心的人才发展项目方法",
            "融合行动学习、教练、引导与测评的综合解决方案",
          ],
        },
        {
          type: "paragraph",
          text: '在这一过程中，我们服务了大量跨国公司、国有企业与行业头部企业，逐渐从"课程提供者"，走向"项目与解决方案的共创者"。',
        },
      ],
      image: asset(
        "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzc3Nzg3NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      ),
    },
    {
      title: "我们的转折：在变化中完成品牌重建",
      content: [
        {
          type: "paragraph",
          text: "随着中国监管环境的变化，境外非营利组织在中国的业务模式发生调整。在这一背景下，我们在 2017 年完成股权与业务结构的调整，并逐步启动自有品牌建设。",
        },
        {
          type: "paragraph",
          text: '到2022年，正式以"悦心领导力中心"作为第一品牌对外。这并不是一支新团队的开始，而是同一批顾问与核心团队，在新的品牌下继续工作。',
        },
        {
          type: "paragraph",
          text: "同时，基于长期的历史合作关系，我们仍然持续与包括 AMA 在内的国际机构保持内容与方法层面的连接。",
        },
      ],
      image: asset(
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYW5zZm9ybWF0aW9ufGVufDF8fHx8MTc3Nzc4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      ),
    },
    {
      title: '我们今天是谁：一支"以业务为起点"的人才发展团队',
      content: [
        {
          type: "paragraph",
          text: '今天，悦心领导力中心是一支围绕"业务结果与人才能力"的咨询与学习设计团队。我们既保留了早期来自国际体系的方法基础，也在长期中国企业实践中，逐步形成了自己的工作方式与解决问题路径。我们也逐步从过去较大规模的课程与项目运营，转向以核心团队为主导的深度项目合作模式，在关键问题上与客户形成更紧密的协同。',
        },
        {
          type: "paragraph-with-list",
          text: "在具体工作中，我们通常从企业真实的业务场景出发，围绕四类关键能力展开：",
          list: [
            "让技术与专业人才，能够在客户与项目中创造结果",
            "让管理者具备判断、拆解与推动关键任务的能力",
            "让组织中的经验，可以被提炼、复制并沉淀为体系",
            "让学习与培养机制，真正服务于业务变化与持续发展",
          ],
        },
        {
          type: "paragraph",
          text: "这些工作，本质上是在解决同一件事：让能力在业务中发生，并持续产生结果。",
        },
      ],
      image: asset(
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwd29ya2luZyUyMHRvZ2V0aGVyfGVufDF8fHx8MTc3Nzc4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      ),
    },
  ],
  workingMethods = [
    {
      icon: Target,
      title: "从真实业务问题出发",
      description:
        "我们从客户当下最关键的业务问题出发，而不直接套用既有课程或理论框架。先在具体情境中对问题进行界定，再据此确定后续的学习安排与推进路径。",
      bgColor: "bg-blue-500/10",
      iconColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "让学习发生在工作过程中",
      description:
        "在实施过程中，学习与实际工作并行展开。一方面通过必要的结构化学习建立基础理解与共识，另一方面结合具体工作的推进，使相关能力在使用中逐步沉淀下来。",
      bgColor: "bg-green-500/10",
      iconColor: "text-green-600",
    },
    {
      icon: Users,
      title: "围绕关键角色与决策展开",
      description:
        "我们结合项目目标，与客户共同确定重点人群，通常围绕关键岗位或关键角色展开，使学习内容与其实际职责与决策情境保持一致。",
      bgColor: "bg-purple-500/10",
      iconColor: "text-purple-600",
    },
    {
      icon: Lightbulb,
      title: "以结果是否发生作为判断标准",
      description:
        "在结果判断上，我们不仅关注项目本身的完成情况，也会结合一段时间内的实际应用，观察这些能力是否在业务中得到使用，并对工作的推进产生实质影响。",
      bgColor: "bg-orange-500/10",
      iconColor: "text-orange-600",
    },
  ];
function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl leading-tight mb-12 text-center">
            {"关于我们"}
          </h1>
          <div className="space-y-20">
            {companyHistory.map((e, t) => (
              <div
                key={e.title}
                className={`grid md:grid-cols-2 gap-16 items-center ${t % 2 === 1 ? "md:grid-flow-dense" : ""}`}
              >
                <div className={t % 2 === 1 ? "md:col-start-2" : ""}>
                  <h2 className="text-3xl mb-6">{e.title}</h2>
                  <div className="space-y-6">
                    {e.content.map((r, a) =>
                      r.type === "paragraph" ? (
                        <p
                          key={a}
                          className="text-base text-muted-foreground leading-relaxed"
                        >
                          {r.text}
                        </p>
                      ) : r.type === "paragraph-with-list" ? (
                        <div key={a} className="space-y-3">
                          <p className="text-base text-muted-foreground leading-relaxed">
                            {r.text}
                          </p>
                          <ul className="space-y-2 pl-4">
                            {r.list.map((n, l) => (
                              <li
                                key={l}
                                className="text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                              >
                                <span className="text-primary mt-0.5">
                                  {"•"}
                                </span>
                                <span>{n}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null,
                    )}
                  </div>
                </div>
                <div
                  className={`relative h-[400px] rounded-2xl overflow-hidden ${t % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}`}
                >
                  <ContentImageWithFallback
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center">{"我们的工作方式"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {workingMethods.map((e) => (
              <div
                key={e.title}
                className="bg-card p-8 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-12 h-12 ${e.bgColor} rounded-lg flex items-center justify-center mb-6`}
                >
                  <e.icon className={`w-6 h-6 ${e.iconColor}`} />
                </div>
                <h3 className="text-2xl mb-3">{e.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {e.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl mb-12 text-center">{"我们的客户"}</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-base text-muted-foreground leading-relaxed mb-12">
              <p>
                {
                  "我们长期合作的客户，多为以技术、专业能力与业务结果为核心的组织，涵盖跨国企业、中央企业及处于发展阶段的领先民营企业。"
                }
              </p>
              <p>
                {
                  "在不同时期，这些客户分布于多个关键产业，从制造、医药、互联网、房地产、到高端制造、人工智能等领域。随着产业结构的演进，我们的工作持续发生在处于增长、转型或调整中的企业之中。"
                }
              </p>
              <p>
                {
                  "在这些组织中，人才和能力通常已经具备，更具挑战的，是如何在实际业务中发挥作用——包括一线人员在客户互动中推动结果，团队在复杂任务中协同推进，管理者在关键场景中做出判断，以及将经验沉淀为可复制、可持续运转的组织能力。"
                }
              </p>
              <p>{"我们的工作，通常围绕这些问题展开。"}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const capabilityAreas = [
  {
    id: 1,
    icon: Users,
    title: "关键业务推进能力",
    description: "在复杂客户环境中，推进业务、建立信任、赢得关键结果的能力。",
    elements: [
      "客户洞察与决策链识别",
      "关键场景推进与阻力突破",
      "跨团队协同作战",
      "客户关系长期经营",
      "一线管理者带队推进",
    ],
    methods: [
      "客户组织地图",
      "商机推进地图",
      "Account Planning",
      "大客户作战机制",
      "Pipeline Coaching",
      "Win / Loss Review",
    ],
    solutions: [
      "关键客户增长",
      "大客户协同作战机制",
      "销售与交付协同升级",
      "一线管理者赋能",
      "项目型业务推进",
    ],
  },
  {
    id: 2,
    icon: Target,
    title: "战略与组织推进能力",
    description:
      "在不确定经营环境中，澄清方向、推进战略行动、实现业务增长的能力。",
    elements: [
      "战略目标澄清与优先级判断",
      "商机探索与增长路径设计",
      "管理团队对齐与战略共识",
      "战略落地与执行闭环",
      "创新推进与经营复盘",
    ],
    methods: [
      "BLM",
      "OKR",
      "行动学习",
      "战略共识工作坊",
      "创新工作坊",
      "经营节奏复盘",
    ],
    solutions: [
      "战略共识工作坊",
      "年度经营推进机制",
      "战略执行体系建设",
      "新业务探索项目",
      "管理团队对齐项目",
    ],
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "管理者与组织领导力",
    description:
      "在复杂管理场景中，形成管理判断、带领团队协同、推动人才成长的能力。",
    elements: [
      "复杂场景判断与决策推进",
      "目标对齐与团队承诺建立",
      "识人用人与梯队培养",
      "管理角色转换与成熟度发展",
      "管理者自我成长与韧性建立",
    ],
    methods: [
      "行动学习",
      "管理者教练",
      "情境反馈",
      "领导力沙盘",
      "案例共创",
      "教练式辅导",
    ],
    solutions: [
      "新经理培养项目",
      "中层管理突破项目",
      "高管共识项目",
      "管理者教练计划",
      "后备干部与管理梯队建设",
    ],
  },
  {
    id: 4,
    icon: Network,
    title: "协作与组织运行能力",
    description:
      "在跨部门与复杂运营环境中，推进关键项目、建立执行闭环、保障组织高效运行的能力。",
    elements: [
      "横向协作与冲突协调",
      "关键项目推进与风险识别",
      "经营节奏与流程协同",
      "目标拆解与执行跟踪",
      "组织协同文化建立",
    ],
    methods: [
      "OKR",
      "项目复盘",
      "流程地图",
      "协同工作坊",
      "战略运营会议",
      "跨部门共创",
    ],
    solutions: [
      "跨部门协作升级",
      "项目型组织能力建设",
      "战略运营机制建设",
      "执行体系建设",
      "组织协同机制优化",
    ],
  },
  {
    id: 5,
    icon: BookOpen,
    title: "学习设计与知识沉淀能力",
    subtitle: "【能力支撑层】",
    description:
      "帮助组织将业务经验持续转化为可复用的组织能力，支撑上述四个方向的长期落地。",
    elements: [
      "最佳实践萃取与隐性经验显性化",
      "组织知识结构化与传承",
      "业务场景化学习设计",
      "内部赋能与内训师培养",
      "组织学习循环建立",
    ],
    methods: [
      "案例开发",
      "学习地图",
      "行动学习",
      "内训师培养",
      "经验访谈",
      "知识共创工作坊",
    ],
    solutions: [
      "企业知识体系建设",
      "内部讲师体系建设",
      "经验沉淀项目",
      "学习型组织建设",
      "AI时代知识转译机制",
    ],
  },
];
function CapabilityMapPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl leading-tight mb-8">
              {"组织能力地图"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl">
              {
                "不同的组织问题，往往并不来自单一能力缺失，而是多个能力系统之间的断裂。"
              }
              <br />
              {
                "我们围绕五个核心方向，帮助组织在复杂环境中持续形成判断、推进行动、实现结果。"
              }
            </p>
          </div>
          <div className="space-y-12">
            {capabilityAreas.map((e, t) => {
              const _SectionIcon = e.icon;
              return (
                <div
                  key={e.id}
                  className="relative bg-gradient-to-br from-background via-background to-primary/5 rounded-2xl p-8 border border-border"
                >
                  <div className="flex items-start gap-6 mb-8">
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <_SectionIcon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-3xl mb-2">
                        {t + 1}
                        {". "}
                        {e.title}
                        {e.subtitle && (
                          <span className="text-base text-muted-foreground ml-2">
                            {e.subtitle}
                          </span>
                        )}
                      </h2>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {e.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-lg mb-4">{"核心能力要素"}</h3>
                      <ul className="space-y-2">
                        {e.elements.map((a, n) => (
                          <li
                            key={n}
                            className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary mt-0.5">{"-"}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg mb-4">{"典型方法与工具"}</h3>
                      <ul className="space-y-2">
                        {e.methods.map((a, n) => (
                          <li
                            key={n}
                            className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary mt-0.5">{"-"}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg mb-4">{"典型解决方案"}</h3>
                      <ul className="space-y-2">
                        {e.solutions.map((a, n) => (
                          <li
                            key={n}
                            className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                          >
                            <span className="text-primary mt-0.5">{"-"}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
function ContactPage({ initialValues } = {}) {
  const [formData, setFormData] = useState(() => initialValues ?? emptyContact);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [mailDraft, setMailDraft] = useState("");
  const active = useRef(false);
  const attempt = useRef(null);
  useEffect(() => { setReady(true); }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (active.current || !ready) return;
    active.current = true;
    setBusy(true);
    setStatus("正在保存留言…");
    setMailDraft("");
    try {
      attempt.current = await identifyAttempt(formData, attempt.current);
      const receipt = await saveContact(attempt.current.id, formData);
      const accepted = receipt.notification === "accepted";
      setStatus(`留言已保存，编号 ${receipt.id}。` + (accepted ? "通知已交给邮件服务。" : "负责人邮箱尚未确认收到通知。需要立即联系时，可点击下方链接发送邮件。"));
      if (!accepted) {
        const subject = encodeURIComponent("悦心官网留言 " + receipt.id);
        const body = encodeURIComponent(`留言编号：${receipt.id}\n姓名：${formData.name}\n回复邮箱：${formData.email}\n\n${formData.message}`);
        setMailDraft(`mailto:info@amachina.com?subject=${subject}&body=${body}`);
      }
      setFormData({...emptyContact});
      attempt.current = null;
      forgetAttempt();
    } catch (error) {
      const reason = error.message?.startsWith("请") || error.message?.startsWith("提交较频繁") ? error.message : "暂时无法确认保存结果，请保留此页面并重试。";
      setStatus(reason);
    } finally {
      active.current = false;
      setBusy(false);
    }
  };
  const handleChange = (event) => {
    setStatus("");
    setMailDraft("");
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl leading-tight mb-6 text-center">
            {"联系我们"}
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-20">
            {"如果你正在面对一些关键问题，欢迎与我们交流。"}
          </p>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl mb-8">{"联系方式"}</h2>
              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{"电话"}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"400-101-8877"}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"周一至周五 9:00-18:00"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{"邮箱"}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"info@amachina.com"}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"我们会在24小时内回复"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">{"地址"}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"上海市徐汇区沪闵路9335号"}
                    </p>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {"徐汇万科中心G座306室"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <h3 className="text-xl">{"工作时间"}</h3>
                </div>
                <div className="space-y-3 text-base text-muted-foreground">
                  <div className="flex justify-between leading-relaxed">
                    <span>{"周一 - 周五"}</span>
                    <span>{"9:00 - 18:00"}</span>
                  </div>
                  <div className="flex justify-between leading-relaxed">
                    <span>{"周六"}</span>
                    <span>{"预约制"}</span>
                  </div>
                  <div className="flex justify-between leading-relaxed">
                    <span>{"周日"}</span>
                    <span>{"休息"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl mb-8">{"在线留言"}</h2>
              <form method="post" onSubmit={handleSubmit} className="space-y-6" aria-busy={busy}>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"姓名 *"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    maxLength={100}
                    readOnly={busy}
                    required={!0}
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"邮箱 *"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    maxLength={254}
                    readOnly={busy}
                    required={!0}
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="company"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"公司/所在组织"}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    maxLength={200}
                    readOnly={busy}
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="请输入您的公司名称"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"电话"}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength={48}
                    readOnly={busy}
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="请输入您的联系电话"
                  />
                </div>
                <div>
                  <label
                    htmlFor="wechat"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"微信"}
                  </label>
                  <input
                    type="text"
                    id="wechat"
                    name="wechat"
                    maxLength={100}
                    readOnly={busy}
                    value={formData.wechat}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-base"
                    placeholder="如果您希望微信联系，请留下您的微信号"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-2 text-base text-foreground"
                  >
                    {"留言 *"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    maxLength={4000}
                    readOnly={busy}
                    required={!0}
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none text-base"
                    placeholder="请简单描述您当前遇到的情况或问题"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!ready || busy}
                  className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-base"
                >
                  <Send className="w-5 h-5" />
                  {busy ? "正在提交…" : "发送留言"}
                </button>
                <p role="status" aria-live="polite" className="text-sm break-words">{status}</p>
                {mailDraft && <a className="underline" href={mailDraft}>用自己的邮箱发送这条留言</a>}
                <p className="text-sm">也可直接来信至 <a className="underline" href="mailto:info@amachina.com">info@amachina.com</a>。</p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl mb-8 text-center">{"如何找到我们"}</h2>
          <div className="bg-background rounded-2xl overflow-hidden border border-border">
            <div className="aspect-[16/9] bg-muted/50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-base">{"地图位置"}</p>
                <p className="text-sm mt-2">
                  {"上海市徐汇区沪闵路9335号 徐汇万科中心G座306室"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const caseSummaries = [
  {
    id: 1,
    title: "当每个部门都在努力，事情却推进不下去",
    industry: "生物医药",
    service: "复杂事项推进",
    year: "2023",
    summary:
      '在一家医药企业中，一项围绕数据化经营的工作推进受阻。各部门持续投入，数据也在不断增加，但在实际管理中并未被使用。深入参与业务推进后发现，问题并不在执行，而在于各部门对"要解决什么问题"并没有形成一致理解。通过对问题与使用场景的重新梳理，原本反复拉扯的工作，开始逐步形成合力。',
    image: asset(
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGJ1c2luZXNzJTIwbWVldGluZyUyMHRlYW13b3JrfGVufDF8fHx8MTc0NjQ1NjUxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    tags: ["数据化经营", "跨部门协同", "问题对齐"],
  },
  {
    id: 2,
    title: "人在现场，但局面不在他手里",
    industry: "半导体与高端制造",
    service: "客户互动",
    year: "2023",
    summary:
      '在一家半导体设备公司中，一批技术工程师被推到客户一线，开始承担现场负责人角色。他们具备扎实的技术能力，但在实际项目推进中，始终难以掌控现场局面。问题表面上表现为沟通不畅与响应滞后，但深入观察后发现，关键在于这些负责人并未真正进入"负责人"的位置。通过围绕真实场景的持续介入，他们逐步建立起在客户现场进行判断与承担的方式，现场关系与推进状态随之发生改变。',
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    tags: ["现场负责人", "客户现场", "判断与承担"],
  },
  {
    id: 3,
    title:
      '跨越"工具优越感"与"前线抵触"：一家半导体巨头全球大客户团队的机制重塑',
    industry: "半导体与高端制造",
    service: "复杂事项推进",
    year: "2023",
    summary:
      "当管理工具被赋予了某种文化标签，它就不再是提效的武器，而成了组织内部的隔阂。在某半导体设备商全球大客户团队的协同项目中，我们面对的不仅是OKR无法落地的问题，更是总部与亚洲一线团队之间的认知落差与心理博弈。通过精准的底层诊断与深度的业务对齐，我们协助全球负责人化解了团队的隐形冲突，让管理回归业务本源。",
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    tags: ["跨区域协作", "OKR", "全球团队"],
  },
  {
    id: 4,
    title: '从"战略迟疑"到"有选择的进攻"：一家全球芯片通路巨头的赛道转型实录',
    industry: "半导体与高端制造",
    service: "关键决策",
    year: "2023",
    summary:
      '在PC产业红利消退、新兴赛道门槛抬高的双重挤压下，企业最容易陷入"老经验失效、新领域不敢投"的决策瘫痪。在某全球排名前三的芯片通路商面对电动车市场时，内部讨论陷入长达数月的僵持。介入后，我们协助管理层跳出无休止的路线之争，通过组建跨部门突破小组与行动学习机制，将模糊的战略判断转化为可落地的打法，最终实现了新赛道的平稳切入。',
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    tags: ["战略转型", "行动学习", "决策机制"],
  },
  {
    id: 5,
    title: '跨越"基因鸿沟"：当国际管理标准遭遇本土执行逻辑',
    industry: "全球化与体系化能力建设",
    service: "复杂事项推进",
    year: "2021",
    summary:
      "当全球顶级物管机构与本土领军企业合资，双方往往陷入文化排斥与策略僵持。面对薪资差异、权力博弈及执行节奏的不匹配，我们介入后协助团队跳出虚幻的文化谈话，通过组建跨部门突破小组在实战中寻找增长点，最终实现关键干部留存率超70%及五年业绩翻番。",
    image: asset(
      "https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lcmdlciUyMGNvbGxhYm9yYXRpb24lMjBpbnRlcm5hdGlvbmFsJTIwdGVhbXxlbnwxfHx8fDE3Nzc5OTExNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    tags: ["合资企业", "文化融合", "组织协同"],
  },
];
function CasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl leading-tight mb-6 text-center">
            {"案例"}
          </h1>
          <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-20">
            {"我们与客户一起，在真实业务场景中推动关键问题的解决"}
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {caseSummaries.map((e) => (
              <Link
                key={e.id}
                to={`/cases/${e.id}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer block"
              >
                <div className="relative h-64 overflow-hidden">
                  <ContentImageWithFallback
                    src={e.image}
                    alt={e.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full">
                      {e.industry}
                    </span>
                    <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
                      {e.service}
                    </span>
                  </div>
                  <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">
                    {e.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {e.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{e.year}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                      <span className="text-sm">{"查看详情"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
const caseDetails = {
  1: {
    id: 1,
    title: "当每个部门都在努力，事情却推进不下去",
    industry: "生物医药",
    service: "复杂事项推进",
    summary:
      '在一家医药企业中，一项围绕数据化经营的工作推进受阻。各部门持续投入，数据也在不断增加，但在实际管理中并未被使用。深入参与业务推进后发现，问题并不在执行，而在于各部门对"要解决什么问题"并没有形成一致理解。通过对问题与使用场景的重新梳理，原本反复拉扯的工作，开始逐步形成合力。',
    image: asset(
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjZXV0aWNhbCUyMGJ1c2luZXNzJTIwbWVldGluZyUyMHRlYW13b3JrfGVufDF8fHx8MTc0NjQ1NjUxMXww&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    sections: [
      {
        heading: "每个部门都在做事，但事情没有推进",
        paragraphs: [
          "在这家企业中，管理层一直在推动数据化经营。各个部门持续投入，数据报表越来越多，分析维度也在不断增加。",
          "但CEO注意到一个现象：这些新增的数据，并没有真正进入决策过程。各部门在实际管理中，仍然沿用原来的方式。数据在增加，但决策方式没有改变。",
          "从表面上看，很难说哪里出了问题：各部门都在工作，数据也在持续产出，讨论也在不断发生。但整体上，事情并没有向前推进。",
        ],
      },
      {
        heading: "一种长期形成的工作方式，在这里开始显现边界",
        paragraphs: [
          '这类情况并非偶然。在企业过往的发展过程中，组织形成了一种以执行为导向的工作方式：任务自上而下分解，各部门按职责快速推进，对"把事情做出来"有较高共识。',
          '这种方式在过去支撑了业务的发展，也让组织具备较强的执行能力。但随着业务复杂度提升，以纵向推动为主的方式，在需要跨部门协同的场景中开始显现出边界：各部门可以把"自己的部分"做好，但很难自然形成"围绕同一个问题"的合力。',
        ],
      },
      {
        heading: "不只是一个项目，而是多件事情同时卡住",
        paragraphs: [
          "数据化经营只是其中一个表现较为集中的议题。在进入项目时，类似的情况在多个事项中同时存在：各部门持续投入，工作不断推进，但整体效果难以体现。",
          "从CEO的角度来看，这些工作并非没有进展，但始终没有达到预期状态。问题在于：事情在做，但做出来的结果，并没有形成合力。",
        ],
      },
      {
        heading: "一开始，没有人能说清问题在哪里",
        paragraphs: [
          '在CEO看来，这并不是"团队不努力"的问题。团队是投入的，也在持续行动。但他始终说不清问题具体卡在哪里。他也尝试提出方向，比如"要加强协同"，但进一步问"具体怎么做"，并没有明确答案。',
          "另一方面，各部门负责人也处在类似状态：觉得自己已经做了不少工作，隐约感觉哪里不太对，但无法清楚说明问题。在这样的情况下，讨论很容易停留在表层——要不要多收集一些数据，要不要优化报表形式，要不要加强沟通。问题在反复出现，但始终没有被真正触及。",
        ],
      },
      {
        heading: "转折：大家其实在解决不同的问题",
        paragraphs: [
          '在项目推进过程中，并没有一开始就调整动作，而是花了一段时间去理解一件事：每个部门，究竟是如何理解"这个问题"的？',
          '通过访谈与实际观察，一个差异逐渐显现：不同部门对"数据化经营"的理解并不一致。市场团队更关注概念与分析框架，一线团队更关注实际使用场景，不同职能对"哪些数据有价值"的判断也各不相同。',
          '在没有对齐的情况下，各部门都在做"合理的事"，但这些事并不指向同一个目标。原本被理解为"沟通不畅"的问题，实际上是：对问题本身的理解，并没有对齐。',
        ],
      },
      {
        heading: "当问题被重新定义，行动才开始发生变化",
        paragraphs: [
          '在后续过程中，讨论逐渐从"我们该怎么做"，转向更基础的问题：我们收集这些数据，是为了支持什么决策？谁在使用这些数据，在什么场景下使用？什么样的信息，才真正有价值？',
          "随着这些问题被逐步澄清，一些变化开始出现：原本不断增加的数据被重新筛选，一些长期投入但价值不明确的工作被主动放弃，不同部门开始围绕同一组关键问题进行协同。行动并没有变得更多，但开始变得一致。",
        ],
      },
      {
        heading: "从一个问题，看见一种协同方式的调整",
        paragraphs: [
          "随着这些变化逐步发生，最初集中在某一议题上的调整，开始扩展到更多工作中。团队逐渐意识到：问题并不在于某一个项目，而在于在复杂事项中，缺少一种能够对齐问题与价值的工作方式。",
          "当这种方式被逐步建立后，不同事项之间的推进逻辑开始趋于一致，跨部门协同不再依赖反复协调，一些原本长期卡住的工作，开始有了推进的路径。",
        ],
      },
      {
        heading: "这类问题，往往不在执行层",
        paragraphs: [
          '在复杂组织中，执行往往只是表象。更深层的挑战在于：团队是否在解决同一个问题，是否对"什么是有价值的事情"形成共识。在这一基础未建立之前，行动越多，偏差可能越大。',
          "让团队在复杂任务中协同推进——这正是我们持续围绕的核心问题之一。",
        ],
      },
    ],
  },
  2: {
    id: 2,
    title: "人在现场，但局面不在他手里",
    industry: "半导体与高端制造",
    service: "客户互动",
    summary:
      '在一家半导体设备公司中，一批技术工程师被推到客户一线，开始承担现场负责人角色。他们具备扎实的技术能力，但在实际项目推进中，始终难以掌控现场局面。问题表面上表现为沟通不畅与响应滞后，但深入观察后发现，关键在于这些负责人并未真正进入"负责人"的位置。通过围绕真实场景的持续介入，他们逐步建立起在客户现场进行判断与承担的方式，现场关系与推进状态随之发生改变。',
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    sections: [
      {
        heading: "技术在场，但局面不在场",
        paragraphs: [
          "在这家公司中，一批技术能力成熟的工程师，被提拔为现场负责人，进入客户工厂，负责设备安装、调试以及后续服务。",
          "这些项目通常发生在客户新厂建设阶段：多家设备供应商同时进场，安装路径与资源安排需要持续协调，客户节奏紧，对响应要求高。",
          '从技术角度看，这些工程师是"可以的"；但在现场推进中，却不断出现类似情况：当客户提出新的要求时，负责人往往无法当场回应，只能回到公司再做确认。有些问题，甚至需要逐级上报到总部。',
          "客户变得不耐烦，公司管理层不得不介入现场，替他们处理关键沟通。人已经在现场，但局面并不在他手里。",
        ],
      },
      {
        heading: '一开始，问题被理解为"人不够成熟"',
        paragraphs: [
          "在公司看来，这批负责人并不是能力差。他们技术过硬，也愿意投入。但在客户面前，总是显得被动：不敢直接回应，很快让问题升级，缺少与客户周旋的空间。",
          '因此，问题最初被理解为"这些人还不够成熟"，"人情世故和沟通能力需要提升"。但在实际推进中，很难用简单培训解决——因为这些场景并没有明确的流程或标准，也无法用一套固定做法去覆盖。',
        ],
      },
      {
        heading: '转折：问题不在"会不会做"，而在"敢不敢站住"',
        paragraphs: [
          "在持续观察现场之后，一个更底层的差异逐渐显现：这些负责人，并不是完全不知道该怎么处理。很多情况下，现场问题是可以预判的，也存在可讨论的空间，甚至可以提出替代方案。",
          '但在关键时刻，他们往往选择不判断、不回应、把问题往上交。原因并不在于"不会"，而在于没有真正进入"我在这里负责"的位置。',
          "当一个人对自己的角色边界不清晰时，即使具备能力，也很难在现场做出判断。而一旦在关键节点退让，客户关系会变得紧张，内部支持会不断介入，团队也难以形成稳定协作。",
        ],
      },
      {
        heading: "不是一个点的问题，而是一种方式的问题",
        paragraphs: [
          "随着项目推进，这种情况并不只出现在个别项目中。在多个客户现场，都可以看到类似模式：事情在做，但始终被动；沟通在发生，但关系难以建立；负责人在场，但无法真正承担。",
          "这使得问题逐渐被重新理解为：不是个体能力问题，而是如何在关键位置上形成判断与承担的一种工作方式。",
        ],
      },
      {
        heading: '当人开始"站在那个位置上"，事情才开始变化',
        paragraphs: [
          '在后续过程中，并没有直接提供"怎么沟通客户"的答案，而是围绕真实现场场景，反复帮助这些负责人去看清一件事：在这个位置上，什么是可以由我来判断的，什么需要带回公司，又该如何表达。',
          '一些变化开始逐步出现：在客户提出要求时，不再第一时间回避；开始在现场展开讨论，而不是简单转交；能够说明"为什么需要回去确认"，而不是直接拒绝。',
          '更重要的是，与客户的关系从对立与防御，逐渐转向协同。团队内部也随之发生变化：当负责人开始"站住"，工程师对他的信任与配合明显提升。',
        ],
      },
      {
        heading: "这类问题，往往不在技术层",
        paragraphs: [
          "在复杂客户现场中，真正的挑战往往不在技术本身，而在于一个人是否能够在关键位置上形成判断，是否能够在不确定中承担一部分责任。当这一点不清晰时，即使能力具备，现场也难以被真正掌控。",
          "让技术与专业人才能够在客户与项目中创造结果——这正是我们持续围绕的核心问题之一。",
        ],
      },
    ],
  },
  3: {
    id: 3,
    title:
      '跨越"工具优越感"与"前线抵触"：一家半导体巨头全球大客户团队的机制重塑',
    industry: "半导体与高端制造",
    service: "复杂事项推进",
    summary:
      "当管理工具被赋予了某种文化标签，它就不再是提效的武器，而成了组织内部的隔阂。在某半导体设备商全球大客户团队的协同项目中，我们面对的不仅是OKR无法落地的问题，更是总部与亚洲一线团队之间的认知落差与心理博弈。通过精准的底层诊断与深度的业务对齐，我们协助全球负责人化解了团队的隐形冲突，让管理回归业务本源。",
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    sections: [
      {
        heading: "一个具体的困境",
        paragraphs: [
          "在一场跨国视频会议上，气氛降到了冰点。",
          '全球大客户团队正试图统一管理节奏。来自总部的团队试图推行OKR管理法，意在加强全球一致性。然而，负责大客户现场的亚洲团队对此极度抵触："我们每天处理异常事件、应对产线良率攻坚都来不及，为什么还要花时间填这些表格？"',
          "作为该团队的全球负责人，处境十分尴尬。一边是推行受阻的管理工具，一边是正在前线救火且极度疲惫的一线骨干。如果强行推动，不仅会导致前线反弹，更会加深跨区域团队之间的裂痕。",
        ],
      },
      {
        heading: "为什么会这样",
        paragraphs: [
          '经过与全球负责人、人力资源负责人以及多位前线技术负责人的深度访谈，我们发现问题的本质并非"工具不好用"，而是管理层级的错位与沟通中的"降维打击"。',
          '总部团队在推动OKR时，不自觉地带有一种方法论优越感，认为自己掌握着更先进的管理文明，而一线则被贴上了"没知识、只懂救火"的标签。这种潜在的心态，让原本为了协同而生的OKR，变成了一种侵入性的行政负担。而一线团队则用"忙于业务"作为防御武器，双方在表面冲突之下，掩盖的是对全球协作机制的不信任和目标的不一致。',
        ],
      },
      {
        heading: "我们是怎么介入的",
        paragraphs: [
          "我们的介入没有从传授知识开始，而是先与全球负责人及人力资源负责人达成了底层逻辑的闭环：不谈战略理论，只谈业务落地。",
          "我们设计并主持了一场以全球客户策略为核心的实战工作坊，有意识地引导大家进入真实的业务战场。",
          '去标签化：止住关于"什么是OKR"的理论争辩，引导总部团队放下教导姿态，转而从资源支持的角度谈"能为前线做什么"。',
          '化解表面冲突：当亚洲技术团队提出"现场支持任务繁重"时，我们没有反驳，而是将其转化为具体的业务诉求。例如，当他们提到"总部新版本对接慢"时，我们将此确认为一个必须协同解决的目标。',
          '重塑工具属性：在讨论到具体分工与互助点时，大家的热情被点燃了。此时，我们才适时揭开OKR的真实面目：它不是考核工具，也不是高深莫测的理论，而是一套确保"你刚才承诺的支持能真正到位"的协作机制。',
        ],
      },
      {
        heading: "发生了什么变化",
        paragraphs: [
          "事情开始动起来了。",
          "这种变化首先体现在话语权的平等上。总部团队开始意识到，如果没有前线的反馈，他们的OKR只是空中楼阁；而亚洲团队也发现，理顺了这些目标，反而能有效向上争取资源，减少无效的重复沟通。",
          '全球负责人对这种转变非常满意。他看到的不再是互相指责，而是大家开始务实地讨论："为了配合这个季度的产线攻坚，OKR的格式能不能再简化？""我们需要总部在哪个时间节点给到技术参数？"',
          "原本僵持的强推变成了按需定制。这不再是一场管理运动，而是一场基于业务共识的全球一致行动。",
        ],
      },
      {
        heading: "这类问题，往往不在工具层",
        paragraphs: [
          "咨询的真正价值，往往不在于引入多么先进的模型，而在于精准诊断出那些隐藏在制度背后的人心博弈。真正的挑战在于：关键的人是否能在关键的场景中重新形成判断，并就此达成共识。",
          "让团队在复杂任务中协同推进——这正是我们持续围绕的核心问题之一。",
        ],
      },
    ],
  },
  4: {
    id: 4,
    title: '从"战略迟疑"到"有选择的进攻"：一家全球芯片通路巨头的赛道转型实录',
    industry: "半导体与高端制造",
    service: "关键决策",
    summary:
      '在PC产业红利消退、新兴赛道门槛抬高的双重挤压下，企业最容易陷入"老经验失效、新领域不敢投"的决策瘫痪。在某全球排名前三的芯片通路商面对电动车市场时，内部讨论陷入长达数月的僵持。介入后，我们协助管理层跳出无休止的路线之争，通过组建跨部门突破小组与行动学习机制，将模糊的战略判断转化为可落地的打法，最终实现了新赛道的平稳切入。',
    image: asset(
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZ3xlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    sections: [
      {
        heading: "一个具体的困境",
        paragraphs: [
          "在全球芯片分销领域，这家公司曾是绝对的赢家。凭借对亚洲PC制造链条的深度掌控，他们稳坐全球前三。但随着PC增长受限，电动车赛道成了无法回避的必选项。",
          "然而，内部讨论却陷入了长达数月的僵持。",
          '一派认为："电动车领域低价竞争激烈，我们的优势在高端芯片，拼不过那些本土通路商，投入产出比太低。"另一派反驳："如果不趁现在抢占份额，未来我们可能连入场的入场券都没有。不能因为怕亏损就止步不前。"',
          '双方在概念上针锋相对，负责人也陷入苦恼：他清楚老打法失灵了，但面对这门"回笼资金慢、技术要求高"的新生意，究竟该投多少、怎么投，始终拿不定主意。',
        ],
      },
      {
        heading: "为什么会这样",
        paragraphs: [
          "这表面上是战略路线的差异，本质上是企业面对跨代转型时的能力恐慌。",
          "在成熟的PC业务里，路径是清晰的，大家习惯了靠规模和速度赢。但电动车赛道是一个完全不同的物种，它要求对供应链有更深的技术介入和全新的决策逻辑。",
          '在这种情况下，两派人的僵持其实都在表达同一种担忧："我们现有的这套基因，真的能在新战场活下来吗？"',
          '由于缺乏一套针对新赛道的决策机制和实验场景，大家的讨论只能停留在"我觉得"和"我担心"的层面，白白错失了进场的好时机。',
        ],
      },
      {
        heading: "我们是怎么介入的",
        paragraphs: [
          '我们建议负责人暂停所有关于"进不进"的辩论，转而回答两个核心命题：增长路径有哪些？这个赛道真的能放弃吗？',
          '当管理层达成"不能放弃"的共识后，我们的介入点从"出主意"转向了"建机制"。',
          '我们协助公司成立了一个跨部门的电动车赛道突破小组，并引入行动学习机制进行深度辅导。首先是从"辩论"转向"取证"：小组不再空谈策略，而是下场收集竞争对手的具体手段、剖析上游厂家的真实期待、盘点公司自身的优劣势。其次是从"派系"转向"战友"：将坚持老打法的业务骨干与主张创新的转型先锋编入同一小组，在解决具体业务突破口时，原本的对立变成了能力的互补。最后是建立决策模式：我们没有代为做决定，而是辅导小组输出了一套针对新赛道的打法建议与决策准则，由小组直接向决策层提案。',
        ],
      },
      {
        heading: "发生了什么变化",
        paragraphs: [
          "事情开始动起来了。",
          '这种变化不是靠一纸公文，而是源于小组在实战推演中达成的"有选择的进攻"。他们最终放弃了在所有芯片品类上全线开火的念头，精准锁定了那些能发挥自身国际背景优势的高端芯片业务。',
          '原本抗拒的业务部门看到一份基于真实市场数据、有攻有守的方案后，疑虑消失了。一位资深业务主管感慨："以前是在雾里看花，现在终于知道第一步该迈在哪了，也知道亏损的底线在哪里。"',
          '随后的行动变得快速有效：资源开始向电动车专项组倾斜，原本模糊的"转型"变成了一系列具体的、可追踪的业务动作。',
        ],
      },
      {
        heading: "这类问题，往往不在信息层",
        paragraphs: [
          "在复杂的转型决策中，真正的挑战往往不在于信息不够多，而在于团队是否能在不确定中形成共同的判断，并就此承担责任。",
          "让管理者具备判断、拆解与推动关键任务的能力——这正是我们持续围绕的核心问题之一。",
        ],
      },
    ],
  },
  5: {
    id: 5,
    title: '跨越"基因鸿沟"：当国际管理标准遭遇本土执行逻辑',
    industry: "全球化与体系化能力建设",
    service: "复杂事项推进",
    summary:
      "当全球顶级物管机构与本土领军企业合资，双方往往陷入文化排斥与策略僵持。面对薪资差异、权力博弈及执行节奏的不匹配，我们介入后协助团队跳出虚幻的文化谈话，通过组建跨部门突破小组在实战中寻找增长点，最终实现关键干部留存率超70%及五年业绩翻番。",
    image: asset(
      "https://images.unsplash.com/photo-1754531976828-69e42ce4e0d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lcmdlciUyMGNvbGxhYm9yYXRpb24lMjBpbnRlcm5hdGlvbmFsJTIwdGVhbXxlbnwxfHx8fDE3Nzc5OTExNjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    sections: [
      {
        heading: "一个具体的困境",
        paragraphs: [
          "在一场关于新公司品牌的讨论会上，两派团队陷入了长久的沉默。",
          '外方坚持保留国际品牌的"洋味"以维护溢价，中方则认为如果不接地气，根本无法在包干制物管市场生存。这只是冰山一角。在更深的层面，双方总监层在薪资结构、报销标准，乃至"策略优先还是执行第一"的问题上，存在着严重的隐形冲突。',
          '"他们只会写PPT，不解决现场漏水问题。"这是中方私下的抱怨。"他们做事没章法，合规意识淡薄。"这是外方内心的疑虑。',
          "尽管董事会信心满满，但执行层的貌合神离，正让激进的业绩目标岌岌可危。",
        ],
      },
      {
        heading: "为什么会这样",
        paragraphs: [
          '这种冲突本质上是"基因排斥"下的利益博弈。',
          '由于缺乏共同的业务语境，双方都倾向于守住自己的传统领地：外方守着品牌和标准，中方守着关系和经验。当两套完全不同的价值评价体系相撞，且缺乏一个"共同赢的图像"时，合资公司往往反受其害，陷入无休止的内耗。',
          '管理团队如果不能在心理上形成"我们是一个整体"的判断，任何行政上的强行融合都只是空谈。',
        ],
      },
      {
        heading: "我们是怎么介入的",
        paragraphs: [
          '我们放弃了空洞的价值观宣讲，而是将焦点对准"在共同战斗中建立伙伴关系"。',
          "我们设计了涵盖总监层及执行层的行动学习矩阵，将两派人编入同一个突破小组，直接针对最难攻克的业务死角进行攻坚。",
          '最具代表性的动作，是引导一个小组去解决"超高层市场准入"的难题。小组在研讨中发现，只有将国际顶级专家的经验与本土的响应速度结合，才能形成真正的壁垒。当公司根据小组建议引进了顶尖专家并连中三标后，双方的信任基石才真正建立。我们协助管理层形成了新的共识：不分内外，只分是否为了赢。',
        ],
      },
      {
        heading: "发生了什么变化",
        paragraphs: [
          "事情开始动起来了。",
          '原本僵持的品牌问题通过"联合品牌过渡"得到化解，原本差异巨大的薪资与管理标准，在业务增长这个最大的公约数面前实现了对接。',
          "五年后，公司不仅实现了业绩翻番，关键干部留存率更超过了70%。更重要的是，他们形成了一种竞争对手难以模仿的协作能力：既懂外资的规矩，又懂本土的打法。这种独特的竞争机制，成了公司在高端物管市场难以撼动的护城河。",
        ],
      },
      {
        heading: "这类问题，往往不在制度层",
        paragraphs: [
          "复杂的组织融合，从不是靠制度的简单合并来完成的。真正的挑战在于：不同背景的团队是否能在心理上形成共同的战场，并在实战中建立彼此的信任。",
          "让组织中的经验能够被提炼、复制并沉淀为体系化能力——这正是我们持续围绕的核心问题之一。",
        ],
      },
    ],
  },
};
function CaseDetailPage() {
  const { id: e } = useParams(),
    t = Number(e),
    r = caseDetails[t];
  return r ? (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/cases"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{"返回案例列表"}</span>
          </Link>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full">
                {r.industry}
              </span>
              <span className="bg-green-500/10 text-green-600 px-3 py-1 rounded-full">
                {r.service}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">
              {r.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {r.summary}
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
            <ContentImageWithFallback
              src={r.image}
              alt="案例图片"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-12">
            {r.sections.map((a, n) => (
              <div key={n}>
                <h2 className="text-3xl mb-6">{a.heading}</h2>
                {a.paragraphs.map((l, o) => (
                  <p
                    key={o}
                    className={`text-base text-muted-foreground leading-relaxed ${o < a.paragraphs.length - 1 ? "mb-6" : ""}`}
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">{"案例未找到"}</h1>
        <Link to="/cases" className="text-primary hover:underline">
          {"返回案例列表"}
        </Link>
      </div>
    </div>
  );
}
const solutionDetails = {
  "client-interaction": {
    id: "client-interaction",
    icon: MessageCircle,
    title: "关键场景中的影响与转化",
    subtitle: "客户沟通一直在发生，但结果没有被真正推动",
    sections: [
      {
        heading: '我们解决的，不只是"沟通问题"',
        content:
          "在很多企业中，一线人员已经具备基本表达能力，但在真正关键的场景中——",
        items: [
          "面对客户或关键对象",
          "需要在有限时间内形成判断与影响",
          "需要推动对方做出选择",
        ],
      },
      {
        heading: "",
        content:
          '结果往往并不稳定。问题不在于"有没有表达"，而在于是否能够在关键时刻，真正产生影响。',
      },
      {
        heading: "这些问题在实际工作中，通常表现为",
        content: "",
        items: [
          "能讲清楚内容，但难以引导对方形成明确判断",
          "面对复杂情况，表达容易分散，缺乏重点与节奏",
          "在关键接触中缺乏主动判断，多数停留在信息传递层面",
          "对关系建立与互动时机缺乏把握，难以形成持续影响",
          "一旦出现关键问题，需要依赖更高层级介入",
        ],
      },
      {
        heading: "我们在这里做的，是一件更底层的事",
        content: '把"表达能力"，升级为"场景中的判断与影响能力"',
      },
      {
        heading: "我们帮助企业：",
        content: "",
        items: [
          "在关键场景中，识别什么信息需要被强调，什么需要被提前铺垫",
          "在互动过程中，判断节奏与时机，而不是被动回应",
          "在不同情境下，设计更有目的性的表达与互动方式",
          "逐步建立与关键对象之间的有效连接，而不是一次性沟通",
        ],
      },
      {
        heading: "最终形成的，不只是技巧，而是一种能力",
        content:
          "在关键接触中，不只是把话讲清楚，而是：能够在合适的时机，用合适的方式，持续影响对方的理解与选择。",
      },
    ],
  },
  "complex-matters": {
    id: "complex-matters",
    icon: GitBranch,
    title: "复杂事项的推进与团队执行",
    subtitle: "大家都在忙，但事情始终没有真正往前走",
    sections: [
      {
        heading: '我们解决的，不只是"推进问题"',
        content: "在很多企业中，复杂事项一旦展开——",
        items: ["各个团队都在行动", "每个人都在投入", "事情看起来在往前走"],
      },
      {
        heading: "",
        content:
          "但随着推进深入，问题开始显现：执行路径并不清晰，对问题的理解存在明显差异——有的人停留在表面，有的人局限于局部，有的人受既有经验限制。结果是：大家都在做事，但并不在做同一件事。",
      },
      {
        heading: "这些问题在实际工作中，通常表现为",
        content: "",
        items: [
          "不同团队各自推进，但对问题的理解存在偏差，难以对齐",
          "在各自判断下持续投入，但由于理解不完整，成果难以整合",
          "阶段性工作完成后，整体却看不到明显进展或突破",
          "上层感受到推进效果有限，而一线认为已经投入大量精力",
          "一旦需要统一方向，只能依赖高层反复介入与调整",
        ],
      },
      {
        heading: "我们在这里做的，是一件更底层的事",
        content: "让团队在推进之前，就对问题形成更完整、更一致的理解",
      },
      {
        heading: "我们帮助企业：",
        content: "",
        items: [
          "在复杂事项中，从不同视角审视问题，避免单一视角带来的偏差",
          "在行动之前，形成对问题层次、关键变量与推进路径的共同理解",
          "在多团队参与下，建立相对一致的判断基础，而不是各自展开执行",
          "在推进过程中持续校准理解，而不是在后期反复整合与修正",
        ],
      },
      {
        heading: "最终形成的，不只是执行力，而是一种能力",
        content:
          "在复杂事项中，不只是各自把事情做完，而是：能够在对问题形成深入且一致理解的基础上，围绕同一方向，把事情真正做成。",
      },
    ],
  },
  "key-decisions": {
    id: "key-decisions",
    icon: Scale,
    title: "复杂环境中的判断与决策",
    subtitle: "反复讨论不断，但关键决策始终定不下来",
    sections: [
      {
        heading: '我们解决的，不只是"决策问题"',
        content: "在当前的商业环境中，企业面临的不再只是复杂，而是高度不确定：",
        items: [
          "技术快速变化，新的可能性不断出现",
          "竞争格局不断调整，优势难以长期稳定",
          "成本压力与增长机会同时存在",
        ],
      },
      {
        heading: "",
        content:
          "在这样的环境下，很多关键问题并没有明确答案：是优化现有业务，还是投入新的方向？技术是提升效率，还是重构业务？是继续推进，还是及时调整？问题不在于缺乏信息，而在于：在不确定中，如何形成判断。",
      },
      {
        heading: "这些问题在实际工作中，通常表现为",
        content: "",
        items: [
          "在关键方向上反复讨论，但难以形成明确选择",
          "面对新出现的问题与变化，缺乏可依赖的经验与判断依据，难以形成一致判断",
          "面对机会与风险并存的局面，决策容易摇摆",
          "一些投入已经发生，但对结果缺乏清晰预期",
          "对下一层管理者的判断能力缺乏信心，难以放权",
        ],
      },
      {
        heading: "我们在这里做的，是一件更底层的事",
        content: "帮助组织在不确定环境中，形成更稳定的判断能力",
      },
      {
        heading: "我们帮助企业：",
        content: "",
        items: [
          "在复杂信息中，识别真正影响决策的关键变量",
          "在不同观点之间，建立更清晰的判断逻辑，而不是依赖直觉或经验",
          "在不确定条件下，形成可以被团队理解与承接的判断基础",
          "逐步提升管理层整体在关键问题上的判断能力，使判断不再依赖少数个体",
        ],
      },
      {
        heading: "最终形成的，不只是决策能力，而是一种能力",
        content:
          "在关键时刻，不只是做出选择，而是：能够在不确定中，基于清晰判断，做出可持续推进的决定。",
      },
    ],
  },
  "learning-transformation": {
    id: "learning-transformation",
    icon: GraduationCap,
    title: "学习内容设计与转化",
    subtitle: "持续投入学习，但对实际工作影响有限",
    sections: [
      {
        heading: '我们解决的，不只是"课程开发问题"',
        content: "在很多企业中，内部已经开始大量建设课程与学习内容：",
        items: ["各类课程不断增加", "内部专家参与开发", "经验被整理为内容"],
      },
      {
        heading: "",
        content:
          '但实际效果却并不理想：内容存在，但难以被真正使用；投入不小，但学习转化有限。在今天，学习方式已经发生明显变化：当答案可以被快速获取，如果课程本身缺乏吸引力与价值，学员很难进入学习过程。问题不在于"有没有课程"，而在于：这些内容，是否真的值得被学习。',
      },
      {
        heading: "这些问题在实际工作中，通常表现为",
        content: "",
        items: [
          "课程来源于经验，但难以抓住真正影响结果的关键点",
          "场景与内容之间缺乏有效转换，难以支撑实际工作应用",
          "内容可以讲清，但难以引发持续关注与参与",
          "学习更多依赖推动，而难以形成主动参与",
          "投入大量内容生产，但整体使用率与效果有限",
        ],
      },
      {
        heading: "我们在这里做的，是一件更底层的事",
        content: '让能力转化为"值得被学习，也能够被使用"的内容',
      },
      {
        heading: "我们帮助企业：",
        content: "",
        items: [
          "从真实场景出发，提炼真正影响结果的关键内容，而不是简单整理经验",
          "在内容设计中，让学习直接指向实际工作，而不是停留在理解层面",
          "设计更有节奏与参与感的学习方式，使学习能够持续发生",
          "在开发过程中保持必要的轻量化，使内容可以持续优化，而不是一次性投入",
        ],
      },
      {
        heading: "同时，我们参与的是一个持续运行的过程",
        content:
          "在这一类工作中，单次内容开发并不能解决问题：内容需要持续优化；学习需要被跟进与推动；不同形式（线上与线下）的结合，成为常态。因此，我们的工作不仅在于内容本身，也在于：让学习作为一个过程，在组织中持续运行起来。",
      },
      {
        heading: "最终形成的，不只是课程，而是一种能力",
        content:
          "在组织中，不只是不断产生内容，而是：能够让学习真正发生，并在实际工作中持续产生影响。",
      },
    ],
  },
};
function SolutionPage() {
  const { id: e } = useParams(),
    t = e ? solutionDetails[e] : null;
  if (!t)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">{"解决方案未找到"}</h1>
          <Link to="/" className="text-primary hover:underline">
            {"返回首页"}
          </Link>
        </div>
      </div>
    );
  const _SectionIcon2 = t.icon;
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{"返回首页"}</span>
          </Link>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted-foreground">
                {"解决方案"}
              </span>
              <span className="text-muted-foreground">{"｜"}</span>
              <span className="text-sm text-muted-foreground">{t.title}</span>
            </div>
            <div className="relative bg-gradient-to-br from-primary/5 via-background to-background rounded-2xl p-8 border border-primary/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10" />
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <_SectionIcon2 className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-12">
            {t.sections.map((a, n) => (
              <div key={n}>
                {a.heading && <h2 className="text-3xl mb-6">{a.heading}</h2>}
                {a.content && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {a.content}
                  </p>
                )}
                {a.items && a.items.length > 0 && (
                  <ul className="space-y-3">
                    {a.items.map((l, o) => (
                      <li
                        key={o}
                        className="text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">{"•"}</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
const industryDetails = {
  biomedical: {
    id: "biomedical",
    name: "生物医药",
    image: asset(
      "https://images.unsplash.com/photo-1748261347768-a32434751a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxiaW90ZWNoJTIwcGhhcm1hY2V1dGljYWwlMjByZXNlYXJjaCUyMGxhYm9yYXRvcnl8ZW58MXx8fHwxNzc3Nzg3NDY0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在高度专业、政策变化与多方协同并存的环境中，帮助关键团队形成一致判断，推动重要事项真正落地。",
    sections: [
      {
        heading: "我们服务的企业类型",
        content: "我们长期服务于多种类型的生物医药企业，包括：",
        items: ["跨国药企中国区", "本土医药与流通企业", "创新药研发与生产企业"],
      },
      {
        heading: "这个行业的一个现实：问题各不相同",
        content: "在生物医药行业，不同企业在不同阶段，关注的重点往往并不相同：",
        items: [
          "有的企业，需要面对政策与关键机构的对接与沟通",
          "有的企业，仍在提升一线团队的业务规划与执行能力",
          "有的企业，正处在快速扩张中，管理能力成为瓶颈",
          "也有企业，开始关注核心人才与管理层的持续接续",
        ],
      },
      {
        heading: "",
        content: "因此，这个行业很少存在一个统一的问题。",
      },
      {
        heading: '在这一类企业中，挑战往往集中在"推进机制"上',
        content:
          '虽然问题各不相同，但在实际工作中，挑战往往不在"做什么"，而在于关键事项在组织中的推进方式，并持续表现为：',
        items: [
          "信息在组织中反复传递，但难以转化为一致判断",
          "协同持续发生，但关键事项仍然推进缓慢",
          "个别团队能够做出结果，但整体能力难以稳定",
          "有效做法存在，但难以被复制与放大",
        ],
      },
      {
        heading: "但真正的难点，在更深一层",
        content:
          "在复杂环境下，难点不在于是否具备资源或信息，而在于能否让关键的事情被真正推动、被理解，并最终被落实。",
      },
      {
        heading: "我们在这个行业的工作",
        content:
          "在这个行业，我们解决的不是某一个具体问题，而是帮助企业建立一套更有效的工作方式——让关键的事情不仅能够被推动，也能够被持续做成，并逐步把团队的整体能力拉高、拉齐。",
      },
    ],
  },
  "semiconductor-manufacturing": {
    id: "semiconductor-manufacturing",
    name: "半导体与高端制造",
    image: asset(
      "https://images.unsplash.com/photo-1765256931287-e7f0e36b9ba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzZW1pY29uZHVjdG9yJTIwbWFudWZhY3R1cmluZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzc3Nzg3NDY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在技术复杂、客户深度参与、多方协同要求高的业务中，帮助技术与管理团队更有效地参与客户过程、推进关键事项。",
    sections: [
      {
        heading: "我们服务的典型企业",
        content: "我们服务于一类以技术驱动、项目导向为核心的企业，例如：",
        items: [
          "半导体与芯片制造企业",
          "高端制造与工业技术企业",
          "以复杂产品与系统解决方案为核心的企业",
        ],
      },
      {
        heading: "这一类企业的共同特点",
        content: "这些企业在业务上通常具备几个明显特征：",
        items: [
          "项目周期长，单体价值高",
          "客户深度参与，需求在过程中持续变化",
          "技术人员直接参与客户过程",
          "多项目并行，对协同与资源配置要求极高",
        ],
      },
      {
        heading: "",
        content:
          "业务推进本质上，是在复杂项目与客户关系之间持续协调与推动的过程。",
      },
      {
        heading: "在这一类企业中，挑战往往呈现在几个关键层面",
        content:
          "在这一类企业中，问题往往不是单一能力的缺失，而是出现在不同层面的结构性矛盾，并在实际工作中持续体现为：",
      },
      {
        heading: "一线层面：工程师参与客户，但难以形成有效影响",
        content:
          "企业越来越需要工程师深入参与客户过程，与客户建立持续联系与信任。但在实际场景中：",
        items: [
          "能提供技术方案，但难以在客户互动中形成有效推动",
          "在关系处理与现场应对中缺乏经验与分寸",
        ],
      },
      {
        heading: "管理层面：技术要求与管理职责之间的张力",
        content: "管理岗位通常由掌握核心技术的人员承担。在高强度技术要求下：",
        items: [
          "同时承担技术任务与团队管理，角色负荷较高",
          "在短期业绩压力与长期人才发展之间持续拉扯",
        ],
      },
      {
        heading: "项目层面：多项目并行下的协同与资源配置复杂度",
        content:
          "业务通常以项目为载体推进，在多项目并行、需求持续变化的情况下：",
        items: [
          "项目推进在多方协同中反复拉扯",
          "资源分配与优先级长期处于紧张状态",
          "现有组织结构难以快速调整，进一步增加管理复杂度",
        ],
      },
      {
        heading: "但真正的难点，在更深一层",
        content:
          "虽然问题呈现在不同层面，但更深层的挑战在于：在高度技术驱动的环境下，如何让技术、客户与项目推进形成有效联动，而不是各自运转。",
      },
      {
        heading: "我们在这个行业的工作",
        content:
          "在这一类企业中，我们解决的不是单一的技术、管理或项目问题，而是帮助企业在复杂业务场景中，建立一套更有效的工作方式——让技术人员能够参与客户过程，让管理者能够推动复杂项目，并让多项目环境下的协同更加顺畅，从而让关键项目可以被持续推进并稳定落地。",
      },
    ],
  },
  "premium-services": {
    id: "premium-services",
    name: "高端服务与高价值消费",
    image: asset(
      "https://images.unsplash.com/photo-1771340042917-20213a50b574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBzZXJ2aWNlJTIwcHJlbWl1bSUyMGN1c3RvbWVyJTIwZXhwZXJpZW5jZXxlbnwxfHx8fDE3Nzc3ODc0NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在客户决策谨慎、体验要求极高的场景中，帮助一线团队在关键接触中把握节奏、影响判断，并推动转化发生。",
    sections: [
      {
        heading: "我们服务的典型企业",
        content:
          "我们服务于一类面向高价值客户、以体验与结果为核心的企业，例如：",
        items: [
          "高端教育与留学服务",
          "奢侈品与高端零售",
          "高端商旅与服务场景",
          "其他面向高净值客户的专业服务机构",
        ],
      },
      {
        heading: "这一类企业的共同特点",
        content: "这些企业表面差异很大，但在业务本质上高度一致：",
        items: [
          "客单价高，客户决策更谨慎",
          "成交不是终点，服务过程持续影响客户判断与后续选择",
          "客户对体验高度敏感，几乎没有容错空间",
          "转化发生在少数关键接触点，贯穿成交前与成交后的关键时刻",
        ],
      },
      {
        heading: "",
        content:
          "他们不是在卖产品，而是在一系列关键接触中，持续影响客户判断，并推动选择发生。",
      },
      {
        heading: "在这一类企业中，挑战往往集中在关键场景能力上",
        content:
          "在这一类企业中，问题往往不是流程或经验的缺失，而是关键接触场景中的能力难以稳定体现，并在实际工作中持续表现为：",
        items: [
          "业务变化快，但关键场景中的有效做法难以沉淀为可复用的方式",
          "流程体系存在，但在具体接触中难以把握节奏与分寸",
          "个别人员能够形成良好互动，但整体表现难以稳定",
          "服务持续发生，但未必在关键时刻形成真正的影响与转化",
        ],
      },
      {
        heading: "但真正的难点，在更深一层",
        content:
          "虽然问题呈现在不同层面，但更深层的挑战在于：在关键接触场景中，如何让一线人员具备足够的判断力与分寸感，从而持续影响客户的决定与后续选择。",
      },
      {
        heading: "我们在这个行业的工作",
        content:
          "在这一类企业中，我们解决的不是单一的销售或服务问题，而是帮助企业在关键接触场景中，建立一套更有效的工作方式——让一线人员不仅能够完成服务，也能够在关键时刻影响客户判断，推动结果发生，并逐步将这种能力转化为团队可以持续复现的水平。",
      },
    ],
  },
  "global-capability": {
    id: "global-capability",
    name: "全球化与体系化能力建设",
    image: asset(
      "https://images.unsplash.com/photo-1759310610775-b298f34f73aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMGNvbGxhYm9yYXRpb24lMjBtdWx0aW5hdGlvbmFsfGVufDF8fHx8MTc3Nzc4NzQ2NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ),
    description:
      "在多地区、多业务单元的长期能力建设中，帮助企业让标准、内容与执行体系统一运转，并持续产生效果。",
    sections: [
      {
        heading: "我们服务的典型客户",
        content:
          "我们也服务于一类在全球范围内运营、对能力体系与执行标准要求极高的企业，例如：",
        items: [
          "全球化运营企业",
          "工业与技术领域的国际化公司",
          "在多个国家与地区进行统一能力建设的组织",
        ],
      },
      {
        heading: "这一类企业的共同特点",
        content: "这类企业在业务上通常具备以下特征：",
        items: [
          "在多个国家与地区同时运营，需要统一的能力与执行标准",
          "关键能力需要被体系化设计，并在大规模组织中推广",
          "项目周期长，往往跨越一年甚至更长时间",
          "更关注长期能力建设，而非单次问题解决",
        ],
      },
      {
        heading: "",
        content:
          "他们关注的不是某一次培训是否有效，而是能力能否在不同地区被持续建立、使用，并不断优化。",
      },
      {
        heading: '在这一类企业中，挑战往往集中在"体系的持续运作"上',
        content:
          "在这一类企业中，难点往往不在于是否有标准或内容，而在于如何让体系在全球范围内真正运行起来，并在长期中持续发挥作用：",
        items: [
          "本地设计的内容需要通过全球标准的审核与对齐，同时在不同地区实现有效落地",
          "项目以周期方式持续推进，而非一次性交付，对长期运营能力要求极高",
          "每一轮培训之间，需要通过应用、跟进与反馈形成连续的能力提升过程",
          "在多个业务单元之间，需基于数据进行协同、复盘与再推动，确保整体进展一致",
        ],
      },
      {
        heading: "但真正的难点，在更深一层",
        content:
          "在全球化运营环境下，难点不在于是否建立体系，而在于：能否在满足全球标准的前提下，让体系在不同地区被持续运作，并通过真实数据不断被推动与优化。",
      },
      {
        heading: "我们在这个行业的工作",
        content:
          "在这一类企业中，我们的工作不是提供单一课程或完成一次培训交付，而是参与到一个长期的能力建设过程中——在满足全球标准要求的前提下，持续跟进各地项目的执行与反馈，协同不同地区与业务单元的数据与进展，并通过周期性的推动与优化，让关键能力在实际工作中被反复应用与不断提升，从而让体系真正运行起来，而不是停留在设计层面。",
      },
    ],
  },
};
function IndustryPage() {
  const { id: e } = useParams(),
    t = e ? industryDetails[e] : null;
  return t ? (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{"返回首页"}</span>
          </Link>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted-foreground">
                {"我们服务的行业"}
              </span>
              <span className="text-muted-foreground">{"｜"}</span>
              <span className="text-sm text-muted-foreground">{t.name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">
              {t.name}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {t.description}
            </p>
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
              <ContentImageWithFallback
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-12">
            {t.sections.map((r, a) => (
              <div key={a}>
                {r.heading && <h2 className="text-3xl mb-6">{r.heading}</h2>}
                {r.content && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {r.content}
                  </p>
                )}
                {r.items && r.items.length > 0 && (
                  <ul className="space-y-3">
                    {r.items.map((n, l) => (
                      <li
                        key={l}
                        className="text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">{"•"}</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">{"行业信息未找到"}</h1>
        <Link to="/" className="text-primary hover:underline">
          {"返回首页"}
        </Link>
      </div>
    </div>
  );
}
function MethodsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{"返回首页"}</span>
          </Link>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">
              {"方法与实现"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {"从场景到结果，从诊断到落地"}
            </p>
          </div>
          <div className="space-y-16">
            <div>
              <h2 className="text-3xl mb-6">{"方法逻辑：从场景到结果"}</h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {
                  '我们的方法，不从课程或工具出发，而是从真实业务场景出发，围绕"关键的人在关键场景中如何推动结果发生"来展开。'
                }
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {"这意味着我们的工作遵循四个基本原则："}
              </p>
              <ul className="space-y-3">
                <li className="text-base text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-0.5">{"•"}</span>
                  <span>{"从真实业务场景出发，而非抽象模型；"}</span>
                </li>
                <li className="text-base text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-0.5">{"•"}</span>
                  <span>{"在行动之前，先形成对问题的共同理解；"}</span>
                </li>
                <li className="text-base text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-0.5">{"•"}</span>
                  <span>{"聚焦关键节点，而不是平均用力；"}</span>
                </li>
                <li className="text-base text-muted-foreground leading-relaxed flex items-start gap-2">
                  <span className="text-primary mt-0.5">{"•"}</span>
                  <span>{"让能力能够被使用，并持续产生结果。"}</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-3xl mb-8">{"实现路径：从诊断到落地"}</h2>
              <div className="space-y-10">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-2xl mb-4">{"场景识别与问题澄清"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {
                      '我们不从培训开始，而是先聚焦关键业务场景——客户转化、事项推进、团队决策等。明确"卡点"发生在哪里，对关键人群进行分层识别，再确定后续的介入方式。'
                    }
                  </p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <MapIcon className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-2xl mb-4">{"关键能力与路径设计"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {
                      "在场景清晰之后，明确真正影响结果的关键行为，设计可操作的推进路径与判断逻辑，并对齐团队认知，减少反复拉扯与无效协调。"
                    }
                  </p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-2xl mb-4">{"能力转化与实践嵌入"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-4">
                    {
                      "围绕以下四个方向，提供场景化的课程与训练支持：影响与转化（关键对话、客户影响）、复杂事项推进与跨团队协同、不确定环境下的判断与决策、学习内容重构与应用设计。"
                    }
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {
                      "所有课程与训练，均围绕真实业务场景设计，并嵌入实际工作推进过程。课程不是目的，而是能力转化的载体。"
                    }
                  </p>
                </div>
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-4 h-4 text-orange-600" />
                  </div>
                  <h3 className="text-2xl mb-4">{"持续跟进与结果形成"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {
                      "项目交付不是终点。我们在真实工作中持续复盘与校准，支持关键节点的推进，并帮助团队将过程中形成的判断方式与经验沉淀为可复用的工作方法。"
                    }
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl mb-8">{"能力与资源保障"}</h2>
              <div className="space-y-10">
                <div className="bg-gradient-to-br from-primary/5 via-background to-background rounded-2xl p-8 border border-primary/10">
                  <h3 className="text-2xl mb-4">{"国际方法与专业体系支持"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {
                      "我们的方法体系，持续与国际领先机构保持连接与校准，包括：American Management Association（美国管理协会）全球管理教育网络；World Institute for Action Learning（国际行动学习协会）行动学习体系；Strategic Management Systems 旗下 Positive Power and Influence Program 版权课程体系。"
                    }
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {"这些资源为我们提供了持续更新的方法论基础与国际实践参照。"}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/5 via-background to-background rounded-2xl p-8 border border-blue-500/10">
                  <h3 className="text-2xl mb-4">{"顾问团队"}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {
                      '我们拥有一支以"业务出身"为核心特征的顾问团队。他们来自企业一线业务与管理岗位，在承担过实际经营责任之后，进入咨询与顾问领域，平均从业年资15年以上。因此，他们不仅能讲"应该怎么做"，更理解在真实组织中为什么做不到，以及如何推动做到。'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
const opinionSummaries = [
  {
    id: "problem-reframing",
    title: "问题重构能力",
    summary:
      "高级的问题解决，不是寻找固定答案，而是在变化的阶段、目标与资源约束中，持续重构问题本身，并选择当前条件下的相对最优解。",
    excerpt:
      "多数人理解的问题解决，本质上仍停留在线性逻辑之中。但真正复杂的系统，从来不是这样运作的。",
  },
  {
    id: "resilience",
    title: "韧性，不是撑住，而是恢复",
    summary:
      "真正成熟的韧性，不是长期硬扛，而是在高复杂度与高不确定环境下，依然能够维持内部秩序，并持续完成自我恢复与结构重建。",
    excerpt:
      "真正稀缺的，从来不是抗压，而是一个人在高复杂度环境里，是否仍然具备持续恢复、自我校准与结构重建的能力。",
  },
  {
    id: "action-learning",
    title: "行动学习：让组织重新看见自己",
    summary:
      "行动学习真正处理的，并非表面问题，而是组织长期形成的防御结构。高级教练的价值，在于帮助系统重新恢复面对真实问题的能力。",
    excerpt:
      '外界常常误以为，行动学习的核心是"通过提问促进反思"。但真正做过复杂组织的人会知道，问题从来不在"不会反思"，而在于——组织是否还允许真实反思发生。',
  },
];
function OpinionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl leading-tight mb-8">
                {"观点"}
              </h1>
              <div className="space-y-6 text-base text-muted-foreground leading-relaxed">
                <p>
                  {
                    "观点，不是为了给出标准答案，而是帮助我们从不同角度，重新理解正在面对的问题。"
                  }
                </p>
                <p>
                  {"这里记录的，是一些来自真实场景中的观察、思考与实践经验。"}
                  <br />
                  {"有些关于问题解决，有些关于变化中的判断与决策；"}
                  <br />
                  {"有些关于协作、推动与行动，也有些关于人在复杂环境中的选择。"}
                </p>
                <p>
                  {"我们相信，很多关键问题，并不存在单一答案。"}
                  <br />
                  {"但新的视角，往往会带来新的理解；"}
                  <br />
                  {"而新的理解，也常常会打开新的可能。"}
                </p>
                <p>
                  {
                    "希望这些文字，能在你面对挑战、推动事情、带领团队，或经历变化与转型的时候，带来一点启发与帮助。"
                  }
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={asset(
                  "https://images.unsplash.com/photo-1646277584842-46ac43d2cf50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
                )}
                alt="观点思考"
                className="w-full h-[400px] object-cover rounded-2xl"
              />
            </div>
          </div>
          <div className="grid gap-8">
            {opinionSummaries.map((e, t) => (
              <Link
                key={e.id}
                to={`/opinions/${e.id}`}
                className="group relative bg-gradient-to-br from-background via-background to-primary/5 rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl mb-2 group-hover:text-primary transition-colors">
                          {e.title}
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {e.summary}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {e.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
const opinionDetails = {
  "problem-reframing": {
    id: "problem-reframing",
    title: "问题重构能力",
    subtitle: "高层次的问题解决，不在于找到答案，而在于重新定义问题",
    sections: [
      {
        content:
          "多数人理解的问题解决，本质上仍停留在线性逻辑之中：识别问题、寻找原因、匹配方案、推动结果。这种路径并没有问题，它适用于变量有限、目标明确、系统稳定的情境。当问题本身是确定性的，解决方式自然可以是确定性的。",
      },
      {
        content: "但真正复杂的系统，从来不是这样运作的。",
      },
      {
        content:
          '企业经营也好，组织管理也好，进入更高阶段后，问题往往不再以"标准题"的形式出现。很多时候，表面上的问题只是结构张力的外显，而非真正的核心矛盾。于是，一个成熟的解决问题过程，首先发生变化的，往往不是"方法"，而是对问题本身的重新界定。',
      },
      {
        heading: "问题定义，并非恒定",
        content:
          '同样一项业务，在不同周期下，问题可能完全不同。增长阶段关注的是扩张效率；收缩阶段关注的是现金安全；组织成熟后，又会转向协同成本与决策质量。表面看似都在讨论"经营问题"，但底层目标已经发生迁移。如果问题定义发生了变化，而解决路径仍停留在原来的逻辑中，组织就会出现典型的"努力正确，但方向失真"。',
      },
      {
        content:
          '因此，更高阶的问题解决，并不是寻找单一答案，而是在动态约束条件下持续校准。问题的边界是浮动的，目标函数是浮动的，资源配置与行动路径同样是浮动的。在这种情况下，真正成熟的判断，不在于是否找到"最佳方法"，而在于能否识别：在当前阶段、当前资源密度、当前时间窗口下，什么才是更值得被优先解决的问题。',
      },
      {
        content:
          '这也是为什么，低阶的问题解决更强调因果，高阶的问题解决则更强调结构。前者关注"是什么导致了结果"，后者关注"是什么结构持续生成了这个结果"。两者看似相近，实际属于不同认知维度。',
      },
      {
        content:
          "很多组织的问题，并不是因为缺少方案，而是因为过早把问题固定化。一旦问题被固定，目标就会被固定，最终连资源使用方式都会被锁死。于是团队会越来越努力，但系统弹性越来越低。这种状态有一个典型特征：行动在加速，但选项在收窄。",
      },
      {
        content:
          '真正成熟的解决问题能力，某种程度上更接近一种动态建模能力。它不执着于答案，而是持续修正对于系统的理解。因为在复杂环境里，所谓"最优解"通常并不存在，存在的只是某一阶段、某一约束条件下的相对最优选择。',
      },
      {
        content:
          "走到这一步，解决问题的过程会发生一个根本性的转变：它不再只是一个寻找答案的过程，而是一个持续重构问题的过程。当一个人能够在复杂系统中不断重新定义问题，他所拥有的，已经不只是解决问题的能力——而是驾驭不确定性的能力。",
      },
      {
        content:
          "所以，高级的问题解决，最终解决的往往不是问题本身，而是人对于问题的认知方式。",
      },
    ],
  },
  resilience: {
    id: "resilience",
    title: "韧性，不是撑住，而是恢复",
    subtitle: "真正稀缺的，不是抗压，而是恢复、校准与重建的能力",
    sections: [
      {
        content:
          "在很多组织里，韧性（Resilience）被理解为一种稳定输出能力。高管被要求持续承担、持续负责、持续顶住压力，仿佛真正成熟的人，不应该波动，不应该失衡，更不应该脆弱。",
      },
      {
        content:
          "但真正稀缺的，从来不是抗压，而是一个人在高复杂度环境里，是否仍然具备持续恢复、自我校准与结构重建的能力。",
      },
      {
        content:
          "职位越高，面对的越不是单点问题，而是长期处于多重张力之中。战略与现实之间有张力，组织目标与人性之间有张力，增长速度与系统承载之间有张力，短期结果与长期结构之间同样有张力。很多中层的问题可以通过执行解决，但高管层真正消耗人的地方，在于大量问题并不存在标准答案。必须在信息不完整、资源有限、时间窗口不断收窄的情况下持续做判断，而且很多决策，即使正确，也仍然会带来代价。",
      },
      {
        content:
          '这时候，韧性的核心已经不是情绪层面的"撑住"，而是一种更深层的认知稳定性。',
      },
      {
        content:
          "真正成熟的高管，通常具备一种能力：在高不确定性里，仍然能够维持内部秩序。这种秩序不是情绪永远稳定，而是即使阶段性混乱，也不会因此失去判断结构。他们允许波动，但不会让波动接管系统。",
      },
      {
        content:
          '多数人之所以始终培养不出真正的韧性，并不是因为经历不够，而是因为组织长期训练的是"责任承载"，而不是"系统恢复"。很多优秀管理者从年轻时开始就因为能扛事而不断被加码，久而久之形成一种深层惯性：价值感来自承担，安全感来自控制，存在感来自不可替代。于是，人会逐渐把"持续输出"误认为成熟，把"无法停下"误认为责任感。',
      },
      {
        content:
          "这类模式有一个隐性代价：系统会越来越依赖意志力运行。一旦环境变化、组织失速，个体内部就容易出现一种典型状态——功能仍在，但恢复能力消失。表面上还在决策、还在推进，但内部已经失去弹性。很多高管真正的危险，并不是崩溃，而是长期低耗竭运行。这种状态最难被察觉，因为它甚至还能维持绩效。",
      },
      {
        content:
          "所以，高阶韧性的培养，本质上不是训练一个人更能扛，而是帮助他建立一种更成熟的系统观。",
      },
      {
        content:
          "接受复杂系统里不存在长期恒定状态。组织会波动，阶段会切换，人本身也会进入不同周期。真正成熟的人，不会要求自己永远处于高峰输出。逐渐从自我消耗型驱动转向结构性驱动。低阶管理依赖个人能力，高阶管理依赖系统设计，否则组织越大，个体耗损越严重。建立恢复本身的能力，包括认知抽离、节奏调整、目标重构，以及允许系统阶段性降载。",
      },
      {
        content:
          "最高级的韧性，从来不是一个人永远不倒，而是他在失衡之后，重新组织自己的能力。",
      },
      {
        content:
          '这也是为什么，很多真正成熟的高管看起来并不"燃"。他们反而越来越克制、越来越稳定、越来越不急于证明什么。因为他们已经理解：长期复杂系统里，真正重要的，不是瞬间爆发力，而是持续存在的能力。',
      },
    ],
  },
  "action-learning": {
    id: "action-learning",
    title: "行动学习：让组织重新看见自己",
    subtitle: "真正改变的，不是组织的问题，而是组织与问题之间的关系",
    sections: [
      {
        content:
          '很多组织之所以长期停留在"问题反复出现"的状态，并不是因为能力不足，也不是因为缺少方法论，而是因为系统逐渐形成了一种高度稳定的防御结构。',
      },
      {
        content: "这，恰恰是行动学习最有价值、也最困难的部分。",
      },
      {
        content:
          '外界常常误以为，行动学习的核心是"通过提问促进反思"。但真正做过复杂组织的人会知道，问题从来不在"不会反思"，而在于——组织是否还允许真实反思发生。',
      },
      {
        content:
          "因为组织一旦进入规模化、层级化、高绩效化之后，会自然形成一种隐性的系统惯性：效率开始高于真实性，共识开始高于探索，角色开始高于感受，答案开始高于问题。",
      },
      {
        content: '久而久之，组织会越来越会"讨论"，但越来越难"触碰"。',
      },
      {
        content:
          "所以，一个成熟的行动学习教练，真正面对的从来不是一个问题本身，而是一个被层层结构包裹之后的问题系统。",
      },
      {
        heading: "第一层，是业务理性",
        content:
          "团队会非常熟练地讨论目标、流程、资源、策略、数字，看起来一切都高度专业。但经验丰富的人会很快察觉：系统其实始终停留在现象处理层面。",
      },
      {
        content: "组织不断行动，但系统不发生迁移。",
      },
      {
        content:
          '因为大家讨论的是"发生了什么"，而不是"为什么系统会持续生成同样的问题"。这是行动学习里最常见的状态——组织拥有行动，但缺少学习。',
      },
      {
        content:
          "成熟的教练在这一阶段很少急于推动方案。他更关注的是：系统有没有开始重新理解自己，既有的解释框架有没有开始松动。因为真正重要的，并不是答案，而是系统是否开始允许更真实的问题浮出来。",
      },
      {
        heading: "更深的一层，是结构性沉默",
        content:
          '很多高层团队真正无法处理的问题，从来不是"没人知道"，而是"没人能够安全地知道"。',
      },
      {
        content:
          '组织运行越久，角色惯性越强。每个人都逐渐学会：什么能说，什么不能说，什么可以被讨论，什么只能被绕开。于是，大量真正重要的问题，会逐渐从"公开议题"转向"系统沉默"。',
      },
      {
        content: "而最危险的是，组织对此往往并不自知。",
      },
      {
        content:
          "因为系统会发展出一套高度合理化的话语结构：战略问题被描述成执行问题，结构问题被描述成沟通问题，领导问题被描述成协同问题。整个组织依然在运转，绩效仍然存在，但系统已经开始失去面对真实复杂性的能力。",
      },
      {
        content:
          "所以高级行动学习的核心，从来不是提问技术，而是对系统防御机制的识别能力。",
      },
      {
        content:
          '真正成熟的教练，会高度关注一个问题：此刻组织里的语言，究竟是在"探索真实"，还是在"维持稳定"。',
      },
      {
        content:
          "两者虽然表面相似，但底层完全不同。维持稳定的语言通常非常确定、非常快速、非常合理。它强调经验、强调效率、强调过去成功。它会迅速收敛问题，并尽快回到行动。",
      },
      {
        content:
          "但真正进入学习状态的组织，语言会开始出现一种罕见的特征——系统允许不确定性出现。",
      },
      {
        content:
          '会有人第一次承认："也许我们一直解决错了问题。""也许这个目标本身需要重新定义。""也许真正的问题，在我们自己。"',
      },
      {
        content:
          "这是极其关键的时刻。因为只有当组织开始能够承受不确定，学习才真正开始发生。",
      },
      {
        content:
          "从某种意义上讲，行动学习真正改变的，并不是组织的问题，而是组织与问题之间的关系。它让系统逐渐从防御性运作，进入觉察性运作。",
      },
      {
        content:
          "而一个真正高级的行动学习教练，并不是带领团队寻找答案的人。他更像是在复杂系统里，帮助组织逐渐恢复一种能力：",
      },
      {
        content: "重新看见自己如何持续制造问题。",
      },
    ],
  },
};
function OpinionDetailPage() {
  const { id: e } = useParams(),
    t = e ? opinionDetails[e] : null;
  return t ? (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/opinions"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{"返回观点列表"}</span>
          </Link>
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-sm text-muted-foreground">{"观点"}</span>
              <span className="text-muted-foreground">{"｜"}</span>
              <span className="text-sm text-muted-foreground">{t.title}</span>
            </div>
            <div className="relative bg-gradient-to-br from-primary/5 via-background to-background rounded-2xl p-8 border border-primary/10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl -z-10" />
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl leading-tight mb-6">
                {t.title}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t.subtitle}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            {t.sections.map((r, a) => (
              <div key={a}>
                {r.heading && <h2 className="text-3xl mb-6">{r.heading}</h2>}
                {r.content && (
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {r.content}
                  </p>
                )}
                {r.items && r.items.length > 0 && (
                  <ul className="space-y-3 mt-4">
                    {r.items.map((n, l) => (
                      <li
                        key={l}
                        className="text-base text-muted-foreground leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-primary mt-0.5">{"•"}</span>
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  ) : (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl mb-4">{"文章未找到"}</h1>
        <Link to="/opinions" className="text-primary hover:underline">
          {"返回观点列表"}
        </Link>
      </div>
    </div>
  );
}
function ClassroomPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl leading-tight mb-6">
              {"悦心教室"}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {"持续学习，共同成长"}
            </p>
          </div>
          <div className="text-center text-muted-foreground">
            {"内容正在完善中..."}
          </div>
        </div>
      </section>
    </div>
  );
}
function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
export {
  Header,
  Footer,
  Layout,
  HomePage,
  AboutPage,
  CapabilityMapPage,
  MethodsPage,
  ContactPage,
  CasesPage,
  CaseDetailPage,
  SolutionPage,
  IndustryPage,
  OpinionsPage,
  OpinionDetailPage,
  ClassroomPage,
};
