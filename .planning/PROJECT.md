# AI-Aides

## What This Is

AI-Aides 是一个面向大众的零门槛 AI 概念科普平台，以可视化知识图谱为核心，基于 Docusaurus + AntV X6 构建的可视化 AI 概念关系图谱网站。已在 `aides.thend.cn` 上线运行，目前包含 22 个核心 AI 概念、5 大分类的可视化图谱、9 区块的概念详情页、分类筛选与搜索功能。

本项目当前阶段：执行优化方案 PRD（v1.0），围绕"内容扩展 + 学习路径引导 + 详情页增强 + 移动端适配 + 搜索增强 + AI 资讯体系"展开，目标是从 MVP 阶段进入体验优化阶段。

## Core Value

**让任何人在 5 分钟内通过可视化关系图理解任意 AI 概念及其与其他概念的关联。** 一切功能（学习路径、迷你图谱、AI 资讯、用户参与）都服务于这个核心：降低 AI 概念学习门槛，强化"关系"认知。

## Requirements

### Validated

（基于代码库映射推断的已实现能力）

- ✓ 22 个 AI 概念的完整 9 区块内容（定义、类比、要点、应用场景、相关概念、延伸阅读等）— existing
- ✓ 5 大分类体系（基础概念、技术方法、方法论、架构模式、工具协议）— existing
- ✓ 首页可视化关系图谱（基于 AntV X6，含搜索/筛选/缩放/拖拽）— existing
- ✓ 概念详情页（标题、定义、类比、要点、应用场景、相关概念、延伸阅读）— existing
- ✓ 概念间关系连线与导航（概念详情页有 prev/next 导航）— existing
- ✓ Docusaurus 静态站点 + Docker + Nginx 部署 — existing
- ✓ 中文单语言支持（zh-Hans）— existing

### Active

#### 内容扩展

- [ ] **CONT-01**: 概念库从 22 个扩展至 40 个，新增 18 个概念：RLHF、Transformer、Attention、Deep Learning、Neural Network、Machine Learning、LoRA、Quantization、NLP、Computer Vision、GAN、DPO、Few-shot Learning、MoE、Function Calling、LangChain、A2A
- [ ] **CONT-02**: 每个新概念必须包含完整 9 区块内容，类比必填
- [ ] **CONT-03**: 概念间关系连线随新概念同步补充，确保新概念在知识网络中有正确位置
- [ ] **CONT-04**: 概念内容采用统一 Prompt 批量生成，第一梯队 6 个核心概念定制化润色
- [ ] **CONT-05**: 内容审核标准：准确性 + 类比质量 + 关系完整性

#### 数据架构

- [ ] **DATA-01**: allConcepts.ts 拆分为图谱数据 + 按概念懒加载结构（首页加载 ~10KB 图谱数据，详情页按需加载）
- [ ] **DATA-02**: 目录结构：`src/data/graphData.ts`（轻量）+ `src/data/concepts/*.ts`（每概念独立）
- [ ] **DATA-03**: 详情页通过动态 import 按需加载概念详情内容

#### 图谱可视化

- [ ] **GRAPH-01**: 首页图谱采用分层力导向布局（保持分类分层骨架，层内力导向避免重叠）
- [ ] **GRAPH-02**: 学习路径引导功能，3 条预设路径：零基础入门（7 节点）、应用开发路线（6 节点）、前沿技术路线（6 节点）
- [ ] **GRAPH-03**: 学习路径激活时，路径节点高亮 + 序号徽章 + 虚线连接，非路径节点透明度降至 0.3
- [ ] **GRAPH-04**: 详情页迷你关系图（MiniGraph 组件），用纯 SVG + React 实现，不依赖 X6
- [ ] **GRAPH-05**: 迷你图谱展示当前概念 + 1 跳邻居，圆形布局，中心高亮
- [ ] **GRAPH-06**: 迷你图谱节点可点击跳转到对应概念详情页，悬停显示关系标签

#### 搜索

- [ ] **SEARCH-01**: 全文搜索，范围扩展到 nameEn、definition、analogy、keyPoints
- [ ] **SEARCH-02**: 搜索自动补全，输入 200ms 防抖后显示最多 5 条建议
- [ ] **SEARCH-03**: 建议项显示图标 + 概念名 + 匹配来源 + 类别 + 难度
- [ ] **SEARCH-04**: 键盘上下选择 + Enter 跳转

#### 移动端

- [ ] **MOBILE-01**: 响应式断点 768px
- [ ] **MOBILE-02**: 移动端首页用 MobileConceptList 卡片列表替代 GraphCanvas
- [ ] **MOBILE-03**: 移动端卡片显示概念名+缩写+分类色条+一句话摘要，点击跳转
- [ ] **MOBILE-04**: 移动端分类筛选用横向滚动标签栏
- [ ] **MOBILE-05**: 移动端搜索栏固定在顶部
- [ ] **MOBILE-06**: 移动端 AI 新动态在卡片列表下方折叠显示，默认显示 3 条
- [ ] **MOBILE-07**: 移动端详情页隐藏迷你图谱
- [ ] **MOBILE-08**: 移动端不显示学习路径
- [ ] **MOBILE-09**: 移动端详情页内容区块同桌面端，间距缩小

#### AI 资讯

- [ ] **NEWS-01**: 接入 4 个必接数据源（Hacker News、arXiv、机器之心、GitHub Trending）
- [ ] **NEWS-02**: arXiv 限量每天 5-10 篇 + 严格过滤
- [ ] **NEWS-03**: GitHub Trending 用 GitHub Search API 替代（无官方 Trending API）
- [ ] **NEWS-04**: 方案 A：GitHub Action 每 6 小时采集 + 关键词过滤 + 去重 + 生成 ai-news.json
- [ ] **NEWS-05**: 方案 B：调用国产大模型进行分类、摘要、关联概念标注、质量评分
- [ ] **NEWS-06**: 切换策略：A-mini（2 源）优先上线，B 同步开发，试用 1 周后切换
- [ ] **NEWS-07**: 侧边栏接入首页（桌面右侧 320px 栏，移动端卡片列表下方折叠）
- [ ] **NEWS-08**: 侧边栏 UI 优化（5 项独立）：标题 2 行+来源时间、Tab 改分类筛选、点击展开摘要、第 1 条显示摘要、更新时间显示
- [ ] **NEWS-09**: 新闻↔图谱联动（只做正向，新闻→图谱）：关联概念节点脉冲闪烁 3 次
- [ ] **NEWS-10**: 状态提升到首页组件（index.tsx）管理 highlightedConcepts

#### 技术债务清理

- [ ] **DEBT-01**: 删除 `aides/data/concepts/*.json` 和 `aides/data/relations.json` 遗留数据
- [ ] **DEBT-02**: 删除 `aides/src/components/HomepageFeatures/` 默认模板死代码
- [ ] **DEBT-03**: 删除 `aides/src/pages/markdown-page.mdx` 默认模板
- [ ] **DEBT-04**: 修复 `concept.tsx` 路由导入（`useLocation` 改从 `@docusaurus/router`）
- [ ] **DEBT-05**: 修复 docker-compose 健康检查（curl 改 wget 或安装 curl）
- [ ] **DEBT-06**: URL 规范化：`/concept?id=` → `/concepts/:id` + 301 重定向
- [ ] **DEBT-07**: Schema.org 结构化数据注入到每个概念详情页
- [ ] **DEBT-08**: 修复 CI/CD 部署流水线（GitHub Actions）

### Out of Scope

- 用户参与机制（类比投票、概念收藏、分享卡片）— 延期至后续迭代，P2 优先级
- 实时聊天 — 业务不匹配
- 视频内容 — 复杂度高，超出"概念科普"定位
- 移动 App — Web 优先，移动端响应式已覆盖
- 官方博客（OpenAI/DeepMind/Anthropic）数据源接入 — 一期只接 4 个必接源
- 反向联动（图谱→新闻）— 只做正向
- 视频教程内容 — 超出"5 分钟理解一个概念"定位

## Context

### 技术架构

- **框架**: Docusaurus 3.10.0 + React 19 + TypeScript ~6.0.2（strict mode）
- **图谱**: AntV X6 v3（因 ESM 与 Webpack 5 不兼容，通过全局 `<script>` 加载 572KB 的 `x6.min.js`）
- **数据存储**: 静态 TypeScript 数据文件，构建时嵌入，无后端
- **部署**: Docker（multi-stage: node:20-alpine → nginx:alpine）+ GitHub Actions
- **托管**: `https://aides.thend.cn`（自建服务器，SSH 部署）

### 项目文档

- `docs/AI-Aides-PRD-v1.1.md` — 原始 PRD（产品概述、用户角色、功能需求等）
- `docs/AI-Aides-Optimization-PRD-v1.0.md` — 优化方案 PRD（本项目执行的依据）
- `docs/AI-Aides-RD-Plan-v1.0.md` — 研发计划
- `docs/Phase0-Technical-Issues.md` ~ `Phase3-Deployment.md` — 各阶段技术问题记录

### 已知技术问题

- CI/CD 部署流水线完全不可用（GitHub Actions 部署步骤读取的 `secrets.DOCKER_IMAGE` 从未被填充）
- 详情页使用查询参数 `/concept?id=rag` 而非 RESTful 路径 `/concepts/rag`，损害 SEO
- Docusaurus 教程文件未自定义，导航栏链接到默认模板
- `HomepageFeatures` 组件是默认样板，从未使用
- `AINewsSidebar` 组件已开发但未接入首页
- `allConcepts.ts` 953 行内联数据，扩展到 50+ 概念时包体积问题严重
- X6 库通过全局脚本加载，绕过 webpack 优化
- Docker 健康检查使用 `curl` 但 `nginx:alpine` 不含 `curl`

### 用户规模

- 当前日活：未测
- 核心用户：AI 好奇的大众（40%）、学生群体（30%）、转行人士（20%）、初级程序员（10%）

## Constraints

- **技术栈**: Docusaurus + React + TypeScript 不可变（已上线，重写成本过高）
- **静态站点**: 无后端、无数据库，所有数据构建时嵌入
- **X6 依赖**: 短期内无法移除 X6（ESM 不兼容上游未修复），迷你图谱改用纯 SVG
- **GitHub Actions**: CI/CD 受限于 5GB 存储、2000 分钟/月免费额度
- **单语言**: 当前只支持简体中文，无国际化计划
- **i18n**: 默认 zh-Hans，多语言不在 v1 范围

## Key Decisions

| 决策 | 理由 | 状态 |
|------|------|------|
| 概念扩展策略：从学习路径倒推 | 学习路径是用户理解知识体系的入口，路径完整性优先 | ✓ Confirmed |
| 第一轮概念扩展到 40 个（新增 18 个） | 路径缺口 + 第一梯队（6）+ 第二梯队（8）+ 第三梯队（3）+ RLHF | ✓ Confirmed |
| 布局算法：分层力导向 | 保持分类分层骨架，层内力导向避免 50+ 节点重叠 | ✓ Confirmed |
| 数据拆分：图谱数据 + 按概念懒加载 | 解决 150KB+ 包体积问题，首页只加载 ~10KB 图谱数据 | ✓ Confirmed |
| 概念内容生成：批量 + 第一梯队重点润色 | 风格统一 + 核心概念质量 | ✓ Confirmed |
| 详情页迷你图谱：纯 SVG + React | 5-6 节点静态布局不值得用 300 行重量级组件 | ✓ Confirmed |
| 移动端首页：卡片列表（无图谱） | X6 移动端性能差，列表更友好 | ✓ Confirmed |
| 移动端断点：768px | Bootstrap/Tailwind 标准断点 | ✓ Confirmed |
| 移动端不显示学习路径 | 保持纯净卡片浏览体验 | ✓ Confirmed |
| 移动端不显示迷你图谱 | 节省空间，减少滚动 | ✓ Confirmed |
| 新闻↔图谱联动：只做正向 | 简化依赖，避免与分类筛选状态冲突 | ✓ Confirmed |
| 联动时机：等方案 B 数据落地 | 依赖 `relatedConcepts` 字段 | ✓ Confirmed |
| 联动通信：状态提升到首页 | 简单清晰，5 组件用 Context 过度设计 | ✓ Confirmed |
| AI 新闻数据源：第一期 4 个必接 | 专注质量，跑通后再扩展 | ✓ Confirmed |
| arXiv：限量 5-10 篇/天 + 严格过滤 | 学术论文对大众偏深 | ✓ Confirmed |
| 方案 A→B 节奏：最小 A 优先 + B 同步开发 | 最快验证管线 | ✓ Confirmed |
| 国产大模型 | 中文理解可能更好，成本低 | ✓ Confirmed |
| Tab 改分类筛选 | 与图谱分类色一致，认知成本低 | ✓ Confirmed |
| 侧边栏布局：桌面右侧 320px | PRD 原始定义，匹配 8 条新闻显示 | ✓ Confirmed |
| 侧边栏接入：UI 先行（Mock 数据） | 提前验证布局和 UI 优化 | ✓ Confirmed |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state (users, feedback, metrics)

---
*Last updated: 2026-06-10 after initialization*
