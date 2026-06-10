# 编码规范

**映射日期：** 2026-06-10
**项目：** AI-Aides

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
  ```typescript
  const onNodeClickRef = useRef(onNodeClick);
  useEffect(() => { onNodeClickRef.current = onNodeClick; }, [onNodeClick]);
  ```
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

标准组件目录：
```
ComponentName/
  ├── index.tsx         # 组件实现
  └── styles.module.css # 作用域样式
```

页面结构：
```
pages/
  ├── pageName.tsx            # 页面组件
  ├── pageName.module.css     # 页面样式
  └── pageName/               # 有时样式放在子文件夹
      └── pageName.module.css
```

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

```typescript
// React 和框架导入放最前面
import {useState, useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';

// 本地导入（使用 @site 别名）
import {GraphCanvas} from '@site/src/components/Graph';
import styles from './styles.module.css';

// 类型导入
import type {ConceptData} from './types';
```

## URL / 路由约定

- 首页：`/`
- 概念详情：`/concept?id=<conceptId>`（查询参数）
- 文档：`/docs/*`（Docusaurus 标准）
- SPA 导航通过 `useHistory().push()`（无整页刷新）

## 数据结构

### 分类系统
分类定义为字符串字面量联合类型：
```typescript
category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool'
```

### 难度等级
1-5 星评级（整数），渲染为已填充/未填充的星星。

### 资源类型
```typescript
type: 'article' | 'video' | 'paper' | 'documentation'
language: 'zh' | 'en'
difficulty: 'beginner' | 'intermediate' | 'advanced'
```
