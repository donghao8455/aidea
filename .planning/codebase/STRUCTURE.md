# 项目结构

**映射日期：** 2026-06-10
**项目：** AI-Aides

## 目录布局

```
aidea/                              # 仓库根目录
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD：构建 + Docker + SSH 部署
├── .trae/
│   └── documents/                  # Trae IDE 文档
├── aides/                          # 主应用（Docusaurus 站点）
│   ├── .docusaurus/                # 构建缓存（已 gitignore）
│   ├── blog/                       # 博客文章（Docusaurus 默认，未使用）
│   │   ├── *.mdx                   # 模板博客文章
│   │   ├── authors.yml
│   │   └── tags.yml
│   ├── data/                       # JSON 数据文件（遗留？）
│   ├── docs/                       # Docusaurus 文档页面
│   ├── node_modules/               # 依赖（已 gitignore）
│   ├── src/                        # 应用源代码
│   │   ├── components/
│   │   │   ├── AINewsSidebar/      # AI 新闻侧边栏（已构建但未使用）
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.module.css
│   │   │   ├── Graph/              # 核心图谱可视化
│   │   │   │   ├── GraphCanvas.tsx  # 主图谱组件（约300行）
│   │   │   │   ├── GraphCanvas.module.css
│   │   │   │   ├── index.ts        # 重新导出 GraphCanvas
│   │   │   │   └── types.ts        # ConceptData、RelationData 接口
│   │   │   └── HomepageFeatures/   # Docusaurus 默认模板（未使用）
│   │   │       ├── index.tsx
│   │   │       └── styles.module.css
│   │   ├── css/
│   │   │   └── custom.css          # 全局自定义样式
│   │   ├── data/
│   │   │   ├── allConcepts.ts      # 单一数据源：所有概念数据（约62KB）
│   │   │   └── aiNews.ts           # 模拟 AI 新闻数据（12条）
│   │   ├── pages/
│   │   │   ├── index.tsx           # 首页（图谱 + 搜索 + 筛选）
│   │   │   ├── index.module.css
│   │   │   ├── concept.tsx         # 概念详情页
│   │   │   ├── concepts/
│   │   │   │   └── concept.module.css
│   │   │   └── markdown-page.mdx   # 默认模板（未使用）
│   │   └── types/
│   │       └── x6.d.ts             # Window.X6 类型声明
│   ├── static/
│   │   ├── img/                    # 图片（Logo、favicon、社交卡片）
│   │   ├── x6.min.js               # AntV X6 库（572KB，全局加载）
│   │   └── robots.txt
│   ├── docusaurus.config.ts        # 站点配置
│   ├── package.json                # 依赖和脚本
│   ├── sidebars.ts                 # 文档侧边栏配置
│   └── tsconfig.json               # TypeScript 配置
├── docker/
│   ├── Dockerfile                  # 多阶段 Docker 构建
│   ├── docker-compose.yml          # 生产 + 开发容器编排
│   └── nginx.conf                  # Nginx 配置（SPA、gzip、安全头）
├── docs/                           # 项目文档（非 Docusaurus 文档）
│   ├── AI-Aides-PRD-v1.1.md       # 原始 PRD
│   ├── AI-Aides-Optimization-PRD-v1.0.md  # 优化方案 PRD
│   ├── AI-Aides-RD-Plan-v1.0.md   # 研发计划
│   └── Phase*.md                  # 各阶段文档
└── .planning/                      # GSD 规划产物
    └── codebase/                   # 代码库映射文档
```

## 关键文件位置

| 关注点 | 文件 |
|--------|------|
| 站点配置 | `aides/docusaurus.config.ts` |
| 首页 | `aides/src/pages/index.tsx` |
| 概念详情 | `aides/src/pages/concept.tsx` |
| 图谱可视化 | `aides/src/components/Graph/GraphCanvas.tsx` |
| 概念数据（单一数据源） | `aides/src/data/allConcepts.ts` |
| 图谱类型 | `aides/src/components/Graph/types.ts` |
| AI 新闻模拟数据 | `aides/src/data/aiNews.ts` |
| X6 类型声明 | `aides/src/types/x6.d.ts` |
| 全局样式 | `aides/src/css/custom.css` |
| Docker 配置 | `docker/Dockerfile`、`docker/docker-compose.yml` |
| Nginx 配置 | `docker/nginx.conf` |
| CI/CD 流水线 | `.github/workflows/deploy.yml` |
| 项目 PRD | `docs/AI-Aides-*.md` |

## 命名约定

| 模式 | 约定 |
|------|------|
| 页面组件 | `aides/src/pages/<name>.tsx`（小写） |
| 页面样式 | `aides/src/pages/<name>.module.css` 或子文件夹 |
| 组件 | PascalCase 目录：`aides/src/components/<Name>/` |
| 组件入口 | 组件目录内的 `index.tsx` |
| 组件样式 | 组件目录内的 `styles.module.css` |
| 数据文件 | `aides/src/data/<name>.ts`（camelCase） |
| 类型声明 | `aides/src/types/<name>.d.ts` |

## 死代码 / 未使用文件

| 文件 | 状态 |
|------|------|
| `aides/src/components/HomepageFeatures/` | Docusaurus 默认模板，从未使用 |
| `aides/src/components/AINewsSidebar/` | 已构建组件，未在任何页面中渲染 |
| `aides/blog/*.mdx` | Docusaurus 默认博客文章，博客已在配置中禁用 |
| `aides/src/pages/markdown-page.mdx` | Docusaurus 默认模板 |
| `aides/data/` | 遗留 JSON 数据目录（可能包含旧概念文件） |
