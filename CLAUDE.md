<!-- GSD:project-start source:PROJECT.md -->
## Project

**AI-Aides**

AI-Aides 是一个面向大众的零门槛 AI 概念科普平台，以可视化知识图谱为核心，基于 Docusaurus + AntV X6 构建的可视化 AI 概念关系图谱网站。已在 `aides.thend.cn` 上线运行，目前包含 22 个核心 AI 概念、5 大分类的可视化图谱、9 区块的概念详情页、分类筛选与搜索功能。

本项目当前阶段：执行优化方案 PRD（v1.0），围绕"内容扩展 + 学习路径引导 + 详情页增强 + 移动端适配 + 搜索增强 + AI 资讯体系"展开，目标是从 MVP 阶段进入体验优化阶段。

**Core Value:** **让任何人在 5 分钟内通过可视化关系图理解任意 AI 概念及其与其他概念的关联。** 一切功能（学习路径、迷你图谱、AI 资讯、用户参与）都服务于这个核心：降低 AI 概念学习门槛，强化"关系"认知。

### Constraints

- **技术栈**: Docusaurus + React + TypeScript 不可变（已上线，重写成本过高）
- **静态站点**: 无后端、无数据库，所有数据构建时嵌入
- **X6 依赖**: 短期内无法移除 X6（ESM 不兼容上游未修复），迷你图谱改用纯 SVG
- **GitHub Actions**: CI/CD 受限于 5GB 存储、2000 分钟/月免费额度
- **单语言**: 当前只支持简体中文，无国际化计划
- **i18n**: 默认 zh-Hans，多语言不在 v1 范围
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## 语言与运行时
| 语言 | 版本 | 用途 |
|------|------|------|
| TypeScript | ~6.0.2 | 主要开发语言（启用 strict 模式） |
| CSS Modules | — | 组件级样式隔离 |
| MDX | v3 | 博客文章（Docusaurus 默认模板，未自定义） |
## 框架
| 框架 | 版本 | 用途 |
|------|------|------|
| Docusaurus | 3.10.0（`@docusaurus/faster` 预设） | 静态站点生成器，提供基于 React 的页面框架 |
| React | ^19.0.0 | UI 渲染 |
| React DOM | ^19.0.0 | DOM 挂载 |
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
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## 代码风格
### TypeScript
- **严格模式**已启用（`tsconfig.json` 中 `"strict": true`）
- 所有函数参数和返回值都有类型注解
- 对象形状优先使用 interface 而非 type alias
- 页面组件返回类型使用 `ReactNode`
- 每个页面文件一个 `export default`（Docusaurus 约定）
- 可复用组件使用命名导出
### React 模式
- **仅使用函数组件** — 无类组件
- **Hooks：** `useState`、`useEffect`、`useCallback`、`useRef`
- **回调 Ref 模式：** 使用 `onNodeClickRef` 避免重新触发副作用
- **防抖状态：** 搜索使用 200ms 防抖，通过 `setTimeout`/`clearTimeout` 实现
- **无状态管理库** — 所有状态都是本地的（`useState`）
### 样式
- **CSS Modules**（`.module.css`）— 每个组件一个
- 无 CSS-in-JS、无 Tailwind、无预处理器
- 模块内使用类 BEM 命名（如 `styles.relatedLink`、`styles.newsRow`）
- 行内样式仅用于动态值（分类颜色、CSS 自定义属性）
- CSS 自定义属性（`--cat-color`）用于筛选按钮的动态主题
### 数据管理
- **单一数据源模式：** `allConcepts.ts` 是权威数据来源
- 数据文件导出带类型的常量（非类或工厂函数）
- 运行时无数据获取 — 所有数据在构建时嵌入
- 概念 ID 为小写字符串（如 `'llm'`、`'prompt-engineering'`）
## 组件结构
## 错误处理
- **优雅降级：** X6 加载有 15 秒超时回退
- **无错误边界** — React 错误会导致页面崩溃
- **无全局错误处理** — X6 加载失败使用 `console.error`
- **空值检查** — 数据查找时处理缺失概念（概念详情页）
## 注释风格
- 复杂逻辑解释使用中文注释
- 标准代码文档使用英文注释
- 长文件使用 `// ============` 模式做章节分隔
- 类型定义使用 JSDoc 风格注释
## 导入约定
## URL / 路由约定
- 首页：`/`
- 概念详情：`/concept?id=<conceptId>`（查询参数）
- 文档：`/docs/*`（Docusaurus 标准）
- SPA 导航通过 `useHistory().push()`（无整页刷新）
## 数据结构
### 分类系统
### 难度等级
### 资源类型
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## 架构模式
## 系统总览
```
```
## 页面
| 页面 | 路由 | 文件 | 用途 |
|------|------|------|------|
| 首页（图谱） | `/` | `aides/src/pages/index.tsx` | 带搜索/筛选的交互式概念图谱 |
| 概念详情 | `/concept?id=<id>` | `aides/src/pages/concept.tsx` | 包含9个区块的完整概念详情 |
| 文档 | `/docs/*` | Docusaurus 文档插件 | 标准文档（默认模板） |
## 组件架构
### 图谱系统（核心功能）
```
```
### 数据流
```
```
- `ConceptData` — 图谱节点的简化概念数据
- `RelationData` — 源/目标关系数据
- `ConceptDetail` — 包含9个详情区块的完整概念
### 概念详情页
```
```
### 未使用的组件
| 组件 | 状态 |
|------|------|
| `HomepageFeatures` | 未使用 — 仍包含 Docusaurus 默认模板内容 |
| `AINewsSidebar` | 已构建但未接入 — 未在任何页面中渲染 |
## 分类系统
| 分类 ID | 显示名称 | 颜色 | 行位置 |
|---------|---------|------|--------|
| `basic` | 基础概念 | `#5B5FC7`（靛蓝） | 第1行 (y=100) |
| `tech` | 技术方法 | `#00D084`（绿色） | 第2行 (y=280) |
| `methodology` | 方法论 | `#E91E63`（粉色） | 第3行 (y=460) |
| `architecture` | 架构模式 | `#733EE4`（紫色） | 第4行 (y=640) |
| `tool` | 工具协议 | `#FF9800`（橙色） | 第5行 (y=820) |
## 布局算法
- 概念按分类分组
- 每个分类占据固定 Y 坐标的水平行
- 行内概念间距 220px，在 1400px 画布上居中
- 画布尺寸：1400×1000px，带点阵网格背景
- 交互：鼠标滚轮缩放（0.3x–3x）、拖拽平移、节点点击
## 路由
| 模式 | 实现方式 |
|------|---------|
| `/` | Docusaurus 页面组件（`index.tsx`） |
| `/concept?id=<id>` | 查询参数路由（`useLocation` + `URLSearchParams`） |
| `/docs/*` | Docusaurus 文档插件 |
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
