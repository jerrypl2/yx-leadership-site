# Published frontend interaction audit

Source: `original-component.js`, downloaded from the public component preload link exposed by the published source site's DOM. Audited as text; the downloaded script was not executed during this audit.

## Contact form: demonstrator behavior, no message delivery

The form component is `ms()` at lines 5826–6023. The complete submit handler (lines 5834–5843) calls `preventDefault()`, logs the six-field state, shows a native alert, and resets all fields:

```js
n.preventDefault(), console.log("Form submitted:", e),
alert("感谢您的留言！我们会尽快与您联系。"), t({
  name: "", email: "", company: "", phone: "", wechat: "", message: ""
});
```

There is no `fetch`, XHR, email, server action, storage write, or backend URL in this app-specific handler. Generic network/submission code earlier in the bundle belongs to the bundled React Router library and is not used by this ordinary `<form onSubmit={r}>`.

Name, email, and message are required. Email is `type="email"`; phone is `type="tel"`. Browser-native validation runs before the submit event. Optional fields: company, phone, WeChat. All change handlers simply update the state by the input's `name`.

Faithful migration should preserve this demo interaction and clearly tell the owner in migration documentation that the original does not actually deliver messages. Do not characterize its success alert as evidence of email delivery. Activating genuine delivery would be an additional service integration.

## Mobile header: no mobile menu exists

Header component `yo()` at lines 4898–4918 has only the linked logo and desktop nav. The nav class is:

```text
hidden md:flex items-center gap-6
```

There is no hamburger button, dropdown, disclosure, menu state, or alternative mobile nav. At the CSS `md` breakpoint and above, it displays the desktop nav; below the breakpoint, only the linked logo remains. Footer nav remains available on mobile. The footer does not include a Classroom link, whereas the desktop nav does. These are original source limitations, not missing migration work. A new mobile menu would alter 1:1 behavior.

## Navigation and states

- Header/footer "解决方案" is an ordinary `<a href="/#solutions">`; home `solutions` section is its target (line 5366).
- Other internal links are React Router `Link` components. The app-specific source has no scroll restoration/reset hook, scrolling effect, or `scrollTo` calls. Existing scroll may be retained during client-side transitions; an ordinary full navigation would reset it.
- There are no filters, tabs, accordions, sliders, search, login, payment, file upload, newsletter, modal, or other dynamic application controls.
- Solution cards have hover shadow/background/text effects; industry cards have image scale 1.05 over 300 ms. Case cards have hover shadow and transition styles. Preserve original CSS classes.
- Image wrapper components (`Ja()` at 4942–4954 and `Zt()` at 5470–5482) show an inline fallback SVG inside a gray wrapper after a loading error. The embedded fallback data URI is defined twice with identical contents.
- Contact "地图位置" is a styled placeholder, not an embedded/interactive map (6013–6021).
- Classroom is only a heading, subtitle, and "内容正在完善中..." placeholder (7285–7292).

## Complete valid page inventory: 24

The router has 12 route patterns (7301–7350). Their finite app data yields these 24 valid pages:

```text
/
/about
/capability-map
/methods
/contact
/cases
/cases/1
/cases/2
/cases/3
/cases/4
/cases/5
/solutions/client-interaction
/solutions/complex-matters
/solutions/key-decisions
/solutions/learning-transformation
/industries/biomedical
/industries/semiconductor-manufacturing
/industries/premium-services
/industries/global-capability
/opinions
/opinions/problem-reframing
/opinions/resilience
/opinions/action-learning
/classroom
```

Data evidence: cases details `xs` at 6121–6398; solutions `bs` at 6439–6644; industries `ws` at 6682–6899; article details `js` at 7093–7250.

Unknown IDs have simple fallback content: "案例未找到", "解决方案未找到", "行业信息未找到", "文章未找到", with a return link. There is no app-level wildcard route. The router's default error handling handles other unknown paths.

## Asset completeness

The app-specific source contains **13 unique Unsplash image URLs**, the Figma-hosted logo, inline Lucide SVG icons, and an embedded error-image SVG. At audit time all **13 Unsplash image URLs** were already present in `assets.json` and downloaded. No further remote image URLs, video, font, map, or external API service appear in the application source.

The manifest then had 15 entries, including logo entries; check/deduplicate logo aliases during assembly. CSS assets were captured separately by the parent. Lucide source comments identify v0.487.0 / ISC; the bundle also includes React Router v7.13.0 / MIT. Retain appropriate third-party notices for any redistributed library/icon code.

## Scope

This audit covers app-specific published frontend source, not Figma's hosting/runtime platform. It does not establish ownership or availability of unpublished drafts, an original authoring project, or any external service not connected by this frontend.
