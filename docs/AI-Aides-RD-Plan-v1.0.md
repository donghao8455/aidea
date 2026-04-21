# AI-Aides 研发计划 (R&D Plan)

> 文档版本：v1.0
> 基于版本：AI-Aides-PRD-v1.1
> 创建日期：2026-04-20
> 最后更新：2026-04-21
> 状态：**Phase 0 已完成 ✅**

---

## 1. 项目概述

### 1.1 项目目标

基于 AI-Aides PRD v1.1，完成 MVP 版本开发，实现：
- 可视化概念关系图谱（15个核心概念）
- 概念详情页
- 分类筛选 + 全局搜索
- Docker 容器化部署到 aides.thend.cn

### 1.2 技术栈确认

| 层级 | 技术选型 | 版本 | 备注 |
|------|---------|------|------|
| 前端框架 | Docusaurus | v3.x | React 18 |
| 图谱引擎 | AntV X6 | v2.x | |
| 语言 | TypeScript | v5.x | 类型安全 |
| 样式 | CSS Modules | - | 避免样式冲突 |
| 包管理 | pnpm | v8.x | 比 npm 更快 |
| CI/CD | GitHub Actions | - | |
| 容器 | Docker + Nginx | - | |
| 部署 | Linux 服务器 (4核4G) | - | |

---

## 2. 项目结构

```
ai-aides/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── docker/
│   ├── Dockerfile              # 多阶段构建
│   └── nginx.conf              # Nginx 配置
├── data/
│   ├── concepts/               # 概念 JSON 文件
│   │   ├── llm.json
│   │   ├── rag.json
│   │   └── ...
│   └── relations.json          # 关系数据
├── src/
│   ├── components/
│   │   ├── Graph/              # 图谱组件
│   │   │   ├── GraphCanvas.tsx
│   │   │   ├── ConceptNode.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── index.ts
│   │   ├── Search/            # 搜索组件
│   │   └── Layout/            # 布局组件
│   ├── pages/
│   │   ├── index.tsx           # 首页（图谱）
│   │   └── concepts/
│   │       └── [id].tsx        # 概念详情页
│   ├── hooks/
│   │   ├── useGraph.ts         # 图谱交互逻辑
│   │   └── useSearch.ts        # 搜索逻辑
│   ├── data/
│   │   └── loader.ts           # 数据加载
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── constants.ts
├── static/
│   └── img/
├── docusaurus.config.ts
├── sidebars.ts
├── package.json
└── tsconfig.json
```

---

## 3. 数据模型

### 3.1 概念数据 (data/concepts/{id}.json)

```typescript
interface Concept {
  id: string;                    // 如 "rag"
  name: string;                 // 如 "检索增强生成"
  nameEn: string;               // 如 "Retrieval-Augmented Generation"
  abbreviation: string;         // 如 "RAG"
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  tooltip: {
    summary: string;             // ≤50字
  };
  detail: {
    definition: string;         // 200-500字
    plainExplanation: string;   // 通俗解释
    analogy: string;            // 类比（核心差异化）
    keyPoints: string[];         // 3-6条
    useCases: Array<{
      title: string;
      description: string;
    }>;
    relatedConcepts: Array<{
      conceptId: string;
      relationType: string;
    }>;
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'paper';
    }>;
  };
}
```

### 3.2 关系数据 (data/relations.json)

```typescript
interface Relation {
  id: string;
  source: string;               // 源节点 ID
  target: string;               // 目标节点 ID
  type: 'depends-on' | 'uses' | 'extends' | 'component';
  label: string;                // 如 "使用"、"依赖于"
}
```

---

## 4. 开发阶段

### Phase 0: 项目初始化 (Week 1)

| 任务 | 子任务 | 预计工时 | 产出物 |
|------|--------|---------|--------|
| **P0.1 仓库初始化** | 创建 GitHub 仓库 | 0.5h | ai-aides repo | ✅ 已完成 |
| | 初始化 Docusaurus 项目 | 1h | | ✅ 已完成 |
| | 配置 TypeScript | 0.5h | | ✅ 已完成（内置） |
| | 配置 pnpm | 0.5h | | ⚠️ 改用 npm（权限问题） |
| **P0.2 Docker 环境** | 编写 Dockerfile (多阶段构建) | 1h | | ⏳ 延后手工配置 |
| | 编写 nginx.conf | 1h | | ⏳ 延后手工配置 |
| | 本地 Docker 构建测试 | 1h | | ⏳ 延后 |
| **P0.3 CI/CD 流程** | 配置 GitHub Actions | 2h | deploy.yml | ⏳ 延后 |
| | 配置服务器 Docker 环境 | 1h | | ⏳ 用户手工配置 |
| | 验证自动化部署 | 1h | | ⏳ 延后 |
| **P0.4 AntV X6 集成** | 安装 @antv/x6 | 0.5h | | ✅ 已完成 |
| | 创建基础 GraphCanvas 组件 | 3h | | ✅ 已完成 |
| | 验证图谱渲染 | 1h | | ✅ 已完成 |
| | 验证节点缩放/拖拽 | 1h | | ✅ 已完成 |
| **P0.5 数据层搭建** | 设计 JSON Schema | 1h | | ✅ 已完成（参考 PRD） |
| | 创建示例数据 | 1h | | ✅ 已完成（5个测试节点） |
| | 数据加载工具函数 | 1h | | ⏳ Phase 1 实现 |

**Phase 0 完成标准**：
- [x] AntV X6 图谱能渲染 3-5 个测试节点 ✅
- [x] 节点支持缩放/拖拽 ✅
- [ ] GitHub → Docker Hub → 服务器 自动化部署跑通（延后至 Phase 3）

**Decision Point**：
- ✅ X6 集成顺利 → 继续 Phase 1
- ⚠️ X6 遇到无法解决的问题 → Plan B: D3.js

---

### Phase 1: 核心功能开发 (Week 2-4)

| 任务 | 子任务 | 预计工时 | 产出物 |
|------|--------|---------|--------|
| **P1.1 图谱完整实现** | 15个概念节点渲染 | 2h | |
| | ~20条关系连线绘制 | 2h | |
| | 节点颜色按类别区分 | 1h | |
| | 层级树形布局 | 2h | |
| | 节点悬停 Tooltip | 3h | AC-002 |
| | 点击节点跳转详情页 | 2h | AC-003 |
| | 初始加载动画 | 2h | |
| **P1.2 分类筛选** | 筛选 UI 组件 | 2h | |
| | 筛选逻辑实现 | 3h | AC-004 |
| | 灰显效果实现 | 1h | |
| **P1.3 全局搜索** | 搜索 UI 组件 | 2h | |
| | 搜索算法（模糊匹配） | 3h | AC-005 |
| | Ctrl+K 快捷键 | 1h | |
| **P1.4 概念详情页** | 页面模板开发 | 3h | |
| | 面包屑导航 | 1h | |
| | 定义区块 | 1h | |
| | 类比区块 | 1h | |
| | 核心要点区块 | 1h | |
| | 应用场景区块 | 2h | |
| | 相关概念迷你图谱 | 3h | |
| | 延伸阅读区块 | 1h | |
| | 底部导航 | 1h | |
| **P1.5 响应式适配** | 桌面端 (1200px+) | 2h | P0 |
| | 平板端 (768px-1199px) | 2h | P1 |
| | 移动端 (375px-767px) | **基础适配：1h**<br>仅保证可读、可滚动<br>手势交互降级为点击操作 | P2 |

**Phase 1 完成标准**：
- [ ] 图谱展示 15 个节点 + ~20 条连线
- [ ] AC-001, AC-002, AC-003, AC-004, AC-005 全部通过（桌面端）
- [ ] Lighthouse Performance ≥ 90
- [ ] **移动端：仅保证基础可读性，P2级交互可延后至 v1.1**

**Decision Point**：
- ✅ 桌面端全部 AC 通过 → 进入 Phase 2
- ⚠️ 移动端体验差 → 接受降级（移动端仅基础适配），优化到可用即可

---

### Phase 2: 内容填充 + 测试 (Week 5-6)

| 任务 | 子任务 | 预计工时 | 产出物 |
|------|--------|---------|--------|
| **P2.1 15个概念内容** | LLM + Prompt + Tokenizer + Temperature | 4h | |
| | Embedding + Vector DB + Fine-tuning | 4h | |
| | Prompt Engineering + Chain of Thought | 3h | |
| | RAG + Agent + AI Gateway | 4h | |
| | MCP + Tool Calling + Multi-Agent | 4h | |
| **P2.2 关系数据** | 定义20+条关系 | 2h | |
| | 验证图谱布局合理性 | 1h | |
| **P2.3 功能测试** | 全浏览器兼容性测试 | 3h | 测试报告 |
| | 全功能回归测试（桌面端） | 2h | |
| | 移动端真机测试 | **1h（基础检查）** | P2 |
| **P2.4 性能优化** | Lighthouse 优化 | 3h | |
| | 首屏加载优化 | 2h | |
| | 图谱渲染性能优化 | 2h | |
| **P2.5 SEO 基础** | Meta 标签配置 | 1h | |
| | Sitemap + Robots | 1h | |
| | Schema.org 结构化数据 | 2h | |

**Phase 2 完成标准**：
- [ ] 15个概念内容全部完成并审核
- [ ] 所有 P0 AC 100% 通过
- [ ] Lighthouse ≥ 90
- [ ] 测试报告产出

---

### Phase 3: 部署上线 (Week 7-8)

| 任务 | 子任务 | 预计工时 | 产出物 |
|------|--------|---------|--------|
| **P3.1 生产部署** | 域名解析配置 | 0.5h | |
| | SSL 证书配置 | 1h | |
| | Docker 生产环境部署 | 2h | |
| | 自动化部署验证 | 1h | |
| **P3.2 监控配置** | UptimeRobot 监控 | 1h | |
| | 错误监控 (Sentry 可选) | 1h | |
| **P3.3 GA4 配置** | Google Analytics 4 接入 | 2h | |
| | 基础埋点验证 | 1h | |
| **P3.4 UAT** | 产品验收测试 | 2h | UAT 签字 |
| **P3.5 上线发布** | 切换生产流量 | 0.5h | 🎉 |
| | 公告/分享 | 1h | |

**Phase 3 完成标准**：
- [ ] aides.thend.cn 正式可访问
- [ ] HTTPS 正常
- [ ] GA4 数据正常采集
- [ ] UAT 签字完成

---

## 5. 里程碑总览

| 阶段 | 时间 | 关键交付物 | Done Criteria | 状态 |
|------|------|-----------|---------------|------|
| Phase 0 | Week 1 | PoC Demo | 技术可行性验证 | ✅ **已完成** |
| Phase 1 | Week 2-4 | 完整功能 | 5个AC全部通过 | ⏳ 待开始 |
| Phase 2 | Week 5-6 | 内容+测试 | Lighthouse ≥ 90 | ⏳ 待开始 |
| Phase 3 | Week 7-8 | 生产上线 | aides.thend.cn 上线 | ⏳ 待开始 |

---

## 6. 日常开发规范

### 6.1 Git 工作流

```
main (保护分支)
    ↑
    └── develop (开发分支)
            ↑
            └── feature/{task-id}-{描述}
```

**提交规范**：
```
feat: 新功能
fix: 修复bug
docs: 文档更新
refactor: 重构
test: 测试
chore: 杂项
```

### 6.2 Code Review

- 每次 PR 需要至少 1 人 review
- AC 相关代码需要详细说明
- 合并前 CI 必须通过

### 6.3 测试要求

| 类型 | 覆盖率 | 执行时机 |
|------|--------|---------|
| 单元测试 | 核心工具函数 | PR 前 |
| 集成测试 | 组件交互 | PR 前 |
| E2E 测试 | 核心流程 | 每日构建 |

---

## 7. 风险应对

| 风险 | 可能性 | 应对方案 |
|------|--------|---------|
| AntV X6 集成复杂度 | 中 | Phase 0 先做 PoC，失败切换 D3.js |
| 内容编写耗时超预期 | 中 | 并行任务，利用 AI 辅助生成初稿 |
| ~~移动端体验不达预期~~ | ~~高~~ | ~~接受降级，优先保证桌面端~~ → **已明确：移动端 P2 优先级，接受降级** |
| 服务器 Docker 环境问题 | 低 | 提前在本地模拟生产环境 |

---

## 8. 所需资源

### 8.1 开发环境

| 工具 | 用途 |
|------|------|
| VS Code / WebStorm | 代码开发 |
| Chrome DevTools | 调试 |
| Docker Desktop | 本地容器 |
| Git | 版本控制 |

### 8.2 外部服务

| 服务 | 用途 | 费用 |
|------|------|------|
| GitHub | 代码托管 + Actions | 免费 |
| Docker Hub (公共仓库) | 镜像存储 | 免费 |
| Cloudflare (可选) | CDN 加速 | 免费 |
| UptimeRobot | 监控 | 免费 |
| Google Analytics | 数据分析 | 免费 |

---

## 9. 后续迭代规划 (v1.1+)

| 版本 | 功能 | 优先级 |
|------|------|--------|
| v1.1 | 移动端手势优化 | P0 |
| v1.2 | 扩展到 30 个概念 | P1 |
| v1.3 | 学习路径推荐 | P1 |
| v1.5 | 用户系统 (收藏/进度) | P2 |
| v2.0 | AI 自动抓取更新 | P3 |

---

## 10. 审核清单

在开始 Phase 0 之前，请确认：

- [ ] 技术选型是否认可？
- [ ] 项目结构是否合理？
- [ ] 开发阶段划分是否清晰？
- [ ] 时间安排是否可行？
- [ ] 风险是否有遗漏？
- [ ] 是否有其他疑问？

---

## 11. Phase 0 执行总结 (2026-04-21)

### 11.1 完成情况

| 任务 | 状态 | 说明 |
|------|------|------|
| 项目初始化 | ✅ 完成 | Docusaurus v3.10.0 + TypeScript |
| AntV X6 集成 | ✅ 完成 | 本地文件加载方式 |
| 图谱渲染 | ✅ 完成 | 5个测试节点 + 6条关系 |
| 节点交互 | ✅ 完成 | 缩放(0.5x-3x) + 拖拽 |

### 11.2 关键技术问题

详见：`docs/Phase0-Technical-Issues.md`

### 11.3 调整说明

- **pnpm 改用 npm**：因 Node 版本管理目录权限问题，改用 npm 作为包管理器
- **Docker/CI/CD 延后**：用户手工配置服务器 Docker，环境验证延后至 Phase 3 前

---

> **下一步**：Phase 1 - 核心功能开发
