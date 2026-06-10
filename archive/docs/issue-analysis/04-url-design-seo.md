# Issue #04: 详情页 URL 设计不规范 — Query 参数 vs RESTful 路径

> **严重级别**: 🟡 中等
> **影响范围**: SEO、用户分享、PRD 合规性
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 关键行 |
|------|------|--------|
| concept.tsx | `src/pages/concept.tsx` | 第 46-52 行（URL 参数读取） |
| index.tsx | `src/pages/index.tsx` | 第 20 行（跳转链接） |
| GraphCanvas.tsx | `src/components/Graph/GraphCanvas.tsx` | 第 183 行（节点点击） |
| docusaurus.config.ts | `docusaurus.config.ts` | 无 generateRoutes 配置 |

---

## 1. 问题详细描述

### 1.1 当前 URL 格式

```
当前: /concept?id=rag
PRD:  /concepts/rag        ← PRD 第 3.5 节明确定义
```

**实际代码**：

```typescript
// concept.tsx:49-51
const params = new URLSearchParams(location.search);
const id = params.get('id') || '';

// index.tsx:20
window.location.href = `/concept?id=${conceptId}`;

// GraphCanvas.tsx:183（节点点击）
if (onNodeClick) {
  onNodeClick(conceptId);   // → 调用 index.tsx 的 handleNodeClick → window.location.href
}
```

### 1.2 路由文件结构

当前文件结构：
```
src/pages/
├── concept.tsx              ← 单一文件处理所有概念
├── concepts/
│   └── concept.module.css   ← 只有样式文件
```

Docusaurus 的约定路由结构（未使用）：
```
src/pages/
├── concepts/
│   ├── [id].tsx             ← 动态路由（Docusaurus 不原生支持 [id]）
│   └── concept.module.css
```

> **注意**：Docusaurus **不原生支持** 基于文件系统的动态路由（如 Next.js 的 `[id].tsx`）。但可以通过插件或 `createRoutes` 实现静态生成。

---

## 2. 具体问题

### 2.1 SEO 影响

| 维度 | Query 参数 (`/concept?id=rag`) | RESTful (`/concepts/rag`) |
|------|-------------------------------|--------------------------|
| **搜索引擎收录** | 搜索引擎可能将 `?id=` 视为动态页面，降低收录优先级 | 清晰的 URL 路径，更容易被收录 |
| **URL 可读性** | `?id=rag` 对用户和搜索引擎无语义 | `/concepts/rag` 语义清晰 |
| **分享链接** | 链接丑陋，降低分享意愿 | 简洁美观，适合分享 |
| **关键词权重** | `?id=` 后的内容权重低 | URL 路径中的关键词权重高 |
| **Sitemap 生成** | Docusaurus 无法为 Query 参数生成 Sitemap | 可以为每个概念生成独立的 Sitemap 条目 |

### 2.2 PRD 合规性

PRD 第 3.5 节明确定义：
```
URL格式: /concepts/{concept-id}  例如: /concepts/rag
```

PRD 第 10.1 节 SEO Checklist：
```
- RESTful URL (/concepts/{slug})
```

当前实现 **不符合 PRD 规范**。

### 2.3 window.location.href 导致整页刷新

```typescript
// index.tsx:20
window.location.href = `/concept?id=${conceptId}`;
```

这会导致：
- 整个页面完全重新加载（非 SPA 路由）
- 丢失所有客户端状态
- 用户在图谱上的缩放/拖动位置丢失
- 加载时间增加（需要重新下载和解析所有 JS）

PRD 要求：
> 跳转应为 SPA 路由 (无白屏刷新)（AC-003）

### 2.4 详情页间导航也是整页刷新

```typescript
// concept.tsx:276
<Link to={`/concept?id=${prevData.id}`} ...>
```

虽然使用了 Docusaurus 的 `<Link>` 组件（理论上走 SPA 路由），但因为 `concept.tsx` 使用 `useLocation + URLSearchParams` 读取参数，需要验证 Link 组件是否正确触发了路由更新。

---

## 3. 根因分析

1. **Docusaurus 动态路由限制**：Docusaurus 是静态站点生成器（SSG），不原生支持 Next.js 式的动态路由 `[id].tsx`。开发者可能因为不熟悉 Docusaurus 的静态生成方案而选择了 Query 参数方式。
2. **快速实现优先**：Phase 1 的目标是快速交付，Query 参数方式实现最简单。
3. **window.location.href 的使用**：可能因为 Docusaurus 的 `<Link>` 组件在 Query 参数变更时不触发重新渲染，而选择了强制刷新。

---

## 4. 推荐解决方案

### 方案 A：使用 Docusaurus `createRoutes` 生成静态路由（推荐 ✅）

Docusaurus 支持 `createRoutes` 导出函数，可以在构建时为每个概念生成独立的静态页面。

```typescript
// src/pages/concepts/[id].tsx → 重命名为 concepts.tsx 或使用插件

// 方案：在构建时生成 15 个静态页面
export function createRoutes() {
  return conceptOrder.map(id => ({
    path: `/concepts/${id}`,
    component: ConceptPage,
    exact: true,
  }));
}
```

或使用 Docusaurus 插件 `plugin-content-pages` 的 `route` 配置。

### 方案 B：使用 Docusaurus 插件

安装 `docusaurus-plugin-react-router` 或编写自定义插件来注册动态路由。

### 方案 C（最小改动）：保留当前结构，修复 SPA 路由

如果不想重构路由，至少应该：

1. 将 `window.location.href` 改为 Docusaurus 的 `useNavigate`：
```typescript
import { useNavigate } from '@docusaurus/router';

const navigate = useNavigate();
const handleNodeClick = useCallback((conceptId: string) => {
  navigate(`/concept?id=${conceptId}`);
}, [navigate]);
```

2. 为每个概念在 `docusaurus.config.ts` 中配置 `head` metadata

---

## 5. 实施步骤（方案 A）

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 研究 Docusaurus `createRoutes` API | 1h |
| 2 | 重构 `concept.tsx` 为支持 RESTful 路径的版本 | 2h |
| 3 | 更新 `index.tsx` 和 `GraphCanvas.tsx` 的跳转链接 | 0.5h |
| 4 | 将 `window.location.href` 改为 SPA 路由 | 0.5h |
| 5 | 配置 Sitemap 自动包含每个概念页面 | 0.5h |
| 6 | 配置每个概念页面的独立 Meta 标签 | 1h |
| 7 | 测试所有跳转和导航功能 | 1h |

**总预估工时**: ~6.5h

---

## 6. 实施步骤（方案 C — 最小改动）

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 替换 `window.location.href` 为 `useNavigate` | 0.5h |
| 2 | 为 `concept.tsx` 添加各概念的 Meta 标签 | 1h |
| 3 | 测试 SPA 路由跳转 | 0.5h |

**总预估工时**: ~2h
