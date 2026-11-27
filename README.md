# 网站迁移源码与部署说明

本项目根据原站 <https://botany-solid-84734790.figma.site/> 已发布、可采集的页面恢复与重建，最初恢复 24 个页面。第三阶段新增课程目录、15 门课程详情及企业培训咨询页，当前共 41 页。

- 使用 React 源码和 Vite 客户端构建。
- 构建时为路由清单中的每个页面预渲染完整 HTML，输出至 `dist/client/`。
- 发布文件包含所需 CSS、JavaScript 和 **14 张本地图片**，页面运行不依赖原 Figma 站点。
- 资源和站内链接适配 GitHub Pages 的仓库子路径。
- 通过 HTTP/HTTPS 访问时，由 React 接管原有导航和表单交互；直接双击 `index.html` 时，也可浏览静态内容并查看联系邮箱。

本包提供可修改、可构建、可独立发布的重建源码。原 Figma 编辑工程、画布结构、编辑历史及未公开后台不能从已发布网页恢复，也不包含在本包中。

第三阶段的逐项去向和来源见[业务内容发布台账](docs/migration/2026-11-27/第三阶段业务内容发布台账.md)。

## 1. 选择哪个压缩包？

| 压缩包 | 包含内容 | 适合的使用方式 |
|---|---|---|
| **`yx-leadership-source.zip`** | 完整源码、构建与检查配置、GitHub Actions 工作流、原站参考截图，以及构建结果 `dist/client/` | 继续修改网站，并在提交源码后自动构建发布 |
| **`yx-leadership-static.zip`** | 可直接发布的静态文件；解压后直接看到 `index.html` | 快速查看网站，或上传到静态托管平台 |

建议将新站放在独立仓库 **`yx-leadership-site`**，避免覆盖现有个人主页仓库。

## 2. GitHub Pages 的适用范围

**技术上，这份静态构建结果可以在 GitHub Pages 上运行。正式商业发布还需要核实 GitHub Pages 的使用条件。**

GitHub 官方说明，Pages 不适合或不允许被用作免费托管来运营在线业务、电商网站，或主要用于促进商业交易、提供商业 SaaS 的网站。原站是企业咨询官网，因此本指南不能无条件承诺它的正式商业部署适用性；也不据此断言所有企业介绍站都必然违反规则。请结合网站的实际用途核实官方条件。

如果实际用途不适合 Pages，可以继续用 **GitHub 保存和管理源码**，再将同一份 `dist/client/` 部署到其他允许该用途的静态托管服务。源码与发布文件不要求必须使用 GitHub Pages。

官方说明：[GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)。

以下两种 GitHub 流程均已按你的托管偏好准备；它们说明技术设置方法，不代表仓库已替你创建或站点已发布。

## 3. 方式一：上传静态版，直接从分支发布

适合先上线当前版本、不需要自动编译源码的情况。

1. 解压 **`yx-leadership-static.zip`**。确认打开解压目录后，直接能看到 `index.html`、页面目录和资源文件。
2. 登录 GitHub，新建 **`yx-leadership-site`** 仓库。使用 GitHub Free 时，Public 仓库可使用 Pages；私有仓库是否支持，取决于账户套餐。
3. 在仓库中选择 **Add file → Upload files**，上传解压目录里面的内容。不要再套一层父目录：上传后仓库首页应直接看到 `index.html`。
4. 将文件提交到 **`main`** 分支。保留包内的全部页面、资源和配置文件。
5. 打开 **Settings → Pages**。
6. 在 **Build and deployment → Source** 中选择 **Deploy from a branch**。
7. 分支选择 **`main`**，目录选择 **`/(root)`**，点击 **Save**。
8. 等待发布完成，打开 GitHub 显示的站点链接。

未配置其他自定义域名时，项目站点的默认地址为：

`https://<你的用户名>.github.io/yx-leadership-site/`

以后用这种方式更新时，应上传重新构建的完整发布文件，并检查原有过时文件是否需要删除；只上传一两个生成文件可能造成新旧版本混用。

## 4. 方式二：上传源码版，用 GitHub Actions 自动发布

适合长期维护和修改网站。

1. 解压 **`yx-leadership-source.zip`**，进入能看到 `package.json`、`src/` 和 `.github/` 的项目根目录。
2. 新建独立的 **`yx-leadership-site`** 仓库，默认分支使用 **`main`**。
3. 将完整项目根目录的内容提交到仓库，可使用 GitHub Desktop 或 Git；避免多套一层目录，不需要上传 `node_modules/`。
4. **必须包含 `.github` 隐藏目录**。Mac 的 Finder 可按 **Command + Shift + .** 显示隐藏文件。上传后确认仓库中存在：

   `.github/workflows/deploy-pages.yml`

   同时保留包内 `.openai/`、`worker/` 和 `scripts/`，这些是随源码提供的构建配置；GitHub Pages 实际发布的内容仍只有 `dist/client/`。

5. 打开 **Settings → Pages → Build and deployment → Source**，选择 **GitHub Actions**。
6. 在 **Actions** 中查看发布工作流。若首次上传时触发的运行因尚未启用 Pages 而失败，完成上一步后选择 **Re-run jobs**；也可通过工作流的 **Run workflow** 手动运行。
7. 等待构建和部署任务全部成功。实际访问地址以 **Settings → Pages** 或部署任务返回的链接为准。

工作流会构建源码并发布 **`dist/client/`**。以后修改源码并提交到 `main`，即可触发新的构建与发布。

不要把这种方式与上一节混用：**静态版选择从分支发布；源码版选择 GitHub Actions。**

## 5. 文件映射与修改方式

| 文件或目录 | 作用 | 修改建议 |
|---|---|---|
| `src/Site.jsx` | React 页面与交互的主要源码 | 修改页面内容、结构和原有交互时，从这里开始 |
| `src/styles.css` | 原站的完整样式与响应式规则 | 修改后重新构建并核对桌面、手机布局 |
| `src/` 中的其余文件 | 页面路由、图片映射及客户端启动逻辑 | 保持现有引用关系，修改后重新构建 |
| `public/media/` | 原站所用图片的本地副本 | 更换图片时同步核对尺寸、比例与 `src/asset-manifest.json` 中的映射 |
| `package.json` 与锁文件 | 依赖、构建和检查命令 | 安装依赖使用 `npm ci`，保持锁文件与依赖声明一致 |
| `.github/workflows/deploy-pages.yml` | GitHub Pages 自动构建发布 | 输出目录配置为 `dist/client/` |
| `dist/client/index.html` | 构建后的首页 | 属于生成结果，长期修改应回到源码进行 |
| `dist/client/` 下的页面目录 | 各路由预渲染的完整 HTML | 保留目录结构，使子页面可直接打开和刷新 |
| `dist/client/` 下的 CSS、JavaScript 和图片 | 发布时使用的本地资源 | 发布时一起上传，不单独遗漏 |
| `docs/reference-screenshots/` | 24 个原站页面的桌面参考截图 | 用于上线后的人工对照；不是迁移版的验收截图 |
| `docs/` 与 `design-qa.md` | 内容一致性报告、图片校验记录、交互说明与未完成的视觉检查 | 查看已核实范围及仍需验收的项目 |

### 在本地构建和检查

建议使用与工作流一致的 Node.js 22（22.12 或更高版本）。进入包含 `package.json` 的项目目录，运行：

```bash
npm ci
npm run build
npm run check
```

构建结果位于 **`dist/client/`**。修改源代码后，应重新构建并检查，再更新发布文件或提交源码。

### 查看静态文件

可以直接打开静态包中的 `index.html`，或源码包中的 `dist/client/index.html`，查看静态内容和联系邮箱。`file://` 浏览用于本地查看；正式发布后还应通过 HTTP/HTTPS 检查 React 导航、路由直达、刷新及资源加载。

## 6. 保留的原站行为

| 项目 | 本次保留的行为 |
|---|---|
| 留言表单 | 保存到私有数据库后显示编号。通知状态及邮件备用入口见页面回执 |
| 全站导航 | 页头与页脚共用「企业服务」「课程体系」「案例与观点」「关于我们」四组栏目。桌面点击栏目展开二级入口，手机点击「菜单」浏览同一目录。页头提供「领导力模型」「悦心教室」快捷入口，页脚的「课程体系」列出「课程咨询目录」和「组织能力地图」。 |
| 教室页面 | 保留原站“正在完善中”的空状态 |
| 地图区域 | 保留原站占位内容，不是可交互地图 |

留言后台、邮件通知配置和验收记录见 [第一阶段实施记录](docs/migration/2026-11-27/第一阶段留言验收.md)。GitHub Pages 托管静态前端。

## 7. 已验证内容与未完成的验证

本次已完成：

- `npm run build`：通过。
- `npm run check`：7 项检查全部通过，包括静态路径、资源完整性、表单属性以及客户端接管前的表单保护。
- 对采集的 **24 个页面**进行 DOM 逐节点一致性审计：报告 **0 差异**。
- 已生成可独立发布的 HTML、CSS、JavaScript 和本地图片资源。

**尚未完成桌面和手机浏览器中的视觉对比验收。** 本地浏览器预览受到执行环境安全策略阻止，提升权限的重试也被自动审批拒绝。因此，DOM 一致性结果不能解释为已经完成逐像素视觉验收，也不能据此承诺所有屏幕和浏览器上的外观绝对一致。

发布后请重点检查：

1. 首页及各子页面的文字、图片、字体、间距和布局。
2. 从菜单进入子页面，再把子页面地址复制到新标签页直接打开并刷新。
3. 手机宽度下的页面、导航和按钮。
4. 留言入库回执、失败重试和重复提交。
5. 若大陆访问是重要要求，使用大陆实际网络检查完整页面与资源加载。GitHub Pages 发布成功不代表大陆各地区、各运营商都能持续稳定访问。

## 8. 常见发布问题

| 现象 | 优先检查 |
|---|---|
| 仓库首页没有 `index.html`，分支发布显示 404 | 静态包是否被多套了一层目录；Pages 是否选择正确分支和 `/(root)` |
| Actions 中没有发布工作流 | `.github/workflows/deploy-pages.yml` 是否上传到了正确位置 |
| 工作流找不到 `package.json` | 源码是否被多套了一层父目录 |
| 构建成功但没有上线 | Pages Source 是否为 GitHub Actions；部署任务是否也成功 |
| 页面缺少样式或图片 | 是否上传完整发布目录；是否混用了不同构建版本的文件 |
| 子页面直接访问或刷新出现 404 | 是否保留对应页面目录及 `index.html`；链接是否使用正确仓库前缀 |

未取得 GitHub 账户授权时，需要由你完成仓库创建和发布操作。本包不会自动登录账户或替你发布；最终上线状态以 GitHub 的部署结果和实际网页为准。

## 官方参考

- [GitHub Pages 的托管范围与站点类型](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [配置分支或 Actions 发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [通过 GitHub Actions 发布](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages 使用限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)
