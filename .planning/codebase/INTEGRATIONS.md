# 外部集成

**映射日期：** 2026-06-10
**项目：** AI-Aides

## 外部服务

**当前无任何活跃的外部服务。** 应用完全是静态的 — 无后端、无数据库、无运行时外部 API 调用。

| 服务 | 状态 | 说明 |
|------|------|------|
| AI 新闻 API | ❌ 模拟数据 | `aides/src/data/aiNews.ts` 包含硬编码的模拟条目 |
| 数据分析 | ❌ 未配置 | 无 Google Analytics、Plausible 或其他追踪工具 |
| 搜索后端 | ❌ 无 | 搜索是客户端对概念名称/标签的字符串匹配 |
| CMS / 内容 API | ❌ 无 | 所有内容硬编码在 `allConcepts.ts` 中 |

## 静态内容来源

| 来源 | 格式 | 位置 |
|------|------|------|
| 概念数据 | TypeScript 数据文件 | `aides/src/data/allConcepts.ts`（约62KB） |
| AI 新闻流 | TypeScript 数据文件 | `aides/src/data/aiNews.ts`（12条模拟数据） |
| 文档页面 | MDX 文件 | `aides/docs/`（Docusaurus 文档插件） |
| 博客文章 | MDX 文件 | `aides/blog/`（默认模板，未自定义） |

## 第三方库（运行时）

| 库 | 集成方式 |
|----|----------|
| AntV X6 | 全局 `<script>` 标签从 `/x6.min.js` 加载 — 非 ES 模块导入 |
| React | 由 Docusaurus/Webpack 打包 |
| Docusaurus 主题 | 由 Docusaurus/Webpack 打包 |

## 构建与部署集成

| 集成项 | 详情 |
|--------|------|
| GitHub Actions | 推送到 `main` 分支时触发构建 + Docker + SSH 部署 |
| Docker（本地） | 镜像构建后通过 SSH 传输（`docker save` → base64 → `docker load`） |
| npm 仓库 | 通过 `npm ci` 安装依赖 |

## 计划中的集成（根据 PRD）

优化方案 PRD（`docs/AI-Aides-Optimization-PRD-v1.0.md`）提到：
- 真实 AI 新闻数据源（RSS/API）— 当前为模拟数据
- Google Analytics 或类似工具 — 当前未配置
- 可能的搜索后端用于增强搜索 — 当前仅客户端搜索
