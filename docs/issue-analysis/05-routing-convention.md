# Issue #05: 未使用 Docusaurus 路由约定 — 自行实现路由解析

> **严重级别**: 🟡 中等
> **影响范围**: 代码维护性、路由正确性
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 关键行 |
|------|------|--------|
| concept.tsx | `src/pages/concept.tsx` | 第 5, 46-52 行 |

---

## 1. 问题详细描述

### 1.1 当前实现

`concept.tsx` 自行解析 URL Query 参数来获取概念 ID：

```typescript
// concept.tsx:5
import {useLocation} from 'react-router-dom';

// concept.tsx:46-52
const location = useLocation();
const [conceptId, setConceptId] = useState<string>('');

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || '';
  setConceptId(id);
}, [location.search]);
```

### 1.2 Docusaurus 的约定

Docusaurus 作为一个 SSG（Static Site Generator），遵循基于文件系统的路由约定：

```
src/pages/index.tsx          → /
src/pages/concept.tsx        → /concept
src/pages/concepts/index.tsx → /concepts
```

Docusaurus **不原生支持**动态路由（如 Next.js 的 `[id].tsx`）。对于 `/concepts/rag` 这种动态路径，需要：

1. **使用 `createRoutes()` 导出**：在构建时生成静态路由
2. **使用 Docusaurus 插件**：自定义路由注册
3. **使用 MDX 文档**：通过 `docs` 功能生成页面（每个概念一个 `.mdx` 文件）

---

## 2. 具体问题

### 2.1 `useLocation` 来源问题

```typescript
import {useLocation} from 'react-router-dom';
```

Docusaurus 内部使用 React Router v5/v6（取决于版本），但推荐使用 Docusaurus 提供的路由 API：

```typescript
// Docusaurus 推荐方式
import {useLocation} from '@docusaurus/router';
```

当前从 `react-router-dom` 直接导入虽然能工作，但：
- 如果 Docusaurus 升级 React Router 版本（如 v5→v6），可能产生兼容性问题
- 不符合 Docusaurus 的推荐实践

### 2.2 状态更新冗余

```typescript
const [conceptId, setConceptId] = useState<string>('');

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || '';
  setConceptId(id);
}, [location.search]);
```

这段代码有一个额外的状态 + useEffect，实际上 `conceptId` 可以直接从 `location.search` 同步计算得到：

```typescript
const conceptId = new URLSearchParams(location.search).get('id') || '';
```

不需要 useState + useEffect 的异步更新模式。

### 2.3 静态生成受限

由于使用 `useLocation` + `useEffect` 在客户端动态解析 URL，Docusaurus 在构建时（SSG）无法为每个概念生成独立的 HTML 文件。

**影响**：
- 所有概念共享同一个 `/concept` 的 HTML
- 搜索引擎爬虫只能看到一个空壳页面（JS 执行前 conceptId 为空）
- 无法为每个概念生成独立的 SEO Meta 标签

---

## 3. 根因分析

1. **对 Docusaurus SSG 模式理解不足**：开发者可能习惯了 CSR（客户端渲染）的 SPA 开发模式，使用了 React Router 的客户端路由方案。
2. **Docusaurus 动态路由文档不直观**：Docusaurus 关于 `createRoutes` 的文档较少，需要查看源码或社区方案。

---

## 4. 推荐解决方案

### 短期修复（配合 Issue #04）

1. **简化状态管理**：
```typescript
// 直接计算，不需要 useState + useEffect
const conceptId = useMemo(
  () => new URLSearchParams(location.search).get('id') || '',
  [location.search]
);
```

2. **使用 Docusaurus 的路由导入**：
```typescript
import {useLocation} from '@docusaurus/router';
```

### 长期方案（配合 RESTful URL 重构）

参见 Issue #04 的方案 A，使用 `createRoutes()` 导出函数在构建时生成静态页面。

---

## 5. 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 修改 import 来源为 `@docusaurus/router` | 5min |
| 2 | 去掉 useState + useEffect，改用 useMemo 同步计算 | 15min |
| 3 | 测试详情页渲染和导航 | 15min |

**总预估工时**: ~0.5h
