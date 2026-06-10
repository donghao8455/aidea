# 技术栈

**映射日期：** 2026-06-10
**项目：** AI-Aides

## 语言与运行时

| 语言 | 版本 | 用途 |
|------|------|------|
| TypeScript | ~6.0.2 | 主要开发语言（启用 strict 模式） |
| CSS Modules | — | 组件级样式隔离 |
| MDX | v3 | 博客文章（Docusaurus 默认模板，未自定义） |

**运行时：** Node.js ≥20（Docker 使用 Alpine 镜像）

## 框架

| 框架 | 版本 | 用途 |
|------|------|------|
| Docusaurus | 3.10.0（`@docusaurus/faster` 预设） | 静态站点生成器，提供基于 React 的页面框架 |
| React | ^19.0.0 | UI 渲染 |
| React DOM | ^19.0.0 | DOM 挂载 |

**活跃的 Docusaurus 插件：**
- `@docusaurus/preset-classic` — 文档、博客（已禁用）、站点地图、主题
- `@docusaurus/faster` — 构建性能优化（SWC/Rspack）

## 核心依赖

| 包名 | 版本 | 用途 |
|------|------|------|
| `@antv/x6` | ^3.1.7 | 图谱可视化（声明了依赖但通过全局脚本加载，非 ESM 导入） |
| `clsx` | ^2.0.0 | 条件 CSS 类名拼接 |
| `prism-react-renderer` | ^2.3.0 | 代码语法高亮 |
| `@mdx-js/react` | ^3.0.0 | MDX 组件支持 |

## 构建工具链

| 工具 | 用途 |
|------|------|
| Docusaurus CLI (`docusaurus`) | 开发服务器、构建、部署 |
| Webpack 5（Docusaurus 内置） | 模块打包器 |
| TypeScript (`tsc`) | 类型检查（`typecheck` 脚本） |
| `npm` | 包管理（锁文件：`package-lock.json`） |

## AntV X6 加载策略

**关键架构决策：** `@antv/x6` v3 的 ESM 包与 Docusaurus 的 Webpack 5 配置不兼容。采用的解决方案：

1. `x6.min.js`（572KB）放置在 `aides/static/` 目录下 — 作为静态资源分发
2. 通过 `docusaurus.config.ts` 中的 `<script>` 标签加载（`scripts: ['/x6.min.js']`）
3. 类型声明由 `src/types/x6.d.ts` 提供 — 声明 `window.X6`
4. 组件通过 `window.X6.Graph` 在运行时访问 X6
5. 加载使用轮询兜底（100ms 间隔，15s 超时）处理 SPA 页面切换

**影响：** 绕过了 webpack 的优化、tree-shaking 和代码分割。每个页面都会加载完整的 572KB 库，无论是否显示图谱。

## 部署技术栈

| 组件 | 技术 |
|------|------|
| 容器化 | Docker（多阶段构建：node:20-alpine → nginx:alpine） |
| Web 服务器 | Nginx（SPA 回退、gzip、安全头） |
| CI/CD | GitHub Actions（`.github/workflows/deploy.yml`） |
| 托管方式 | 自建服务器，通过 SSH 部署 |
| 线上地址 | `https://aides.thend.cn` |

## 配置文件

| 文件 | 用途 |
|------|------|
| `aides/docusaurus.config.ts` | Docusaurus 站点配置（主题、导航栏、页脚、国际化） |
| `aides/tsconfig.json` | TypeScript 配置（严格模式，继承 `@docusaurus/tsconfig`） |
| `aides/sidebars.ts` | 文档侧边栏结构 |
| `aides/package.json` | 依赖和脚本 |
| `docker/Dockerfile` | 多阶段 Docker 构建 |
| `docker/docker-compose.yml` | 生产 + 开发容器编排 |
| `docker/nginx.conf` | Nginx 反向代理配置 |

## 国际化

- 默认语言环境：`zh-Hans`（简体中文）
- 仅支持单一语言环境（无多语言支持）
