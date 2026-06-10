# Issue #02: AntV X6 加载方式脆弱 — 全局脚本 vs npm 包冲突

> **严重级别**: 🔴 严重
> **影响范围**: 图谱渲染核心、类型安全、构建流程
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 角色 |
|------|------|------|
| x6.min.js | `static/x6.min.js` | 全局脚本（1行压缩文件） |
| docusaurus.config.ts | `docusaurus.config.ts:10-12` | 通过 scripts 配置加载 |
| GraphCanvas.tsx | `src/components/Graph/GraphCanvas.tsx:15-19` | declare global + window.X6 |
| package.json | `package.json:18-19` | 已安装 @antv/x6 和 @antv/x6-react-shape |

---

## 1. 问题详细描述

### 1.1 当前实现方式

**Step 1** — `docusaurus.config.ts` 在 HTML `<head>` 中注入全局脚本：

```typescript
// docusaurus.config.ts:10-12
scripts: [
  '/x6.min.js',     // ← 从 static/ 目录加载，注入为 <script src="/x6.min.js">
],
```

**Step 2** — `GraphCanvas.tsx` 通过 `window.X6` 全局变量使用：

```typescript
// GraphCanvas.tsx:15-19
declare global {
  interface Window {
    X6: any;     // ← 类型为 any，完全丧失类型安全
  }
}

// GraphCanvas.tsx:43-45
const { Graph } = window.X6;   // ← 运行时从全局取值
```

**Step 3** — 等待全局脚本加载：

```typescript
// GraphCanvas.tsx:304-308
if (window.X6) {
  initGraph();
} else {
  window.addEventListener('load', initGraph);   // ← 监听 window.onload
}
```

### 1.2 npm 包已安装但未使用

```json
// package.json:18-19
"@antv/x6": "^3.1.7",
"@antv/x6-react-shape": "^3.0.1",
```

这两个包已安装到 `node_modules`，有完整的 TypeScript 类型定义，但代码中**没有任何 import 语句使用它们**。

---

## 2. 具体问题清单

### 2.1 类型安全完全丧失

```typescript
const { Graph } = window.X6;   // X6: any → Graph: any
```

- 所有 X6 API 调用（`graph.addNode()`、`graph.addEdge()` 等）都没有类型检查
- IDE 无法提供代码补全和参数提示
- 编译器无法捕获拼写错误或 API 变更
- 与项目 "TypeScript 6.0.2" 的类型安全目标相悖

### 2.2 加载时序不可靠

```typescript
if (window.X6) {
  initGraph();
} else {
  window.addEventListener('load', initGraph);
}
```

**问题**：
- `window.onload` 事件可能在 React 组件挂载之前就已经触发（特别是 Docusaurus SPA 路由切换时）
- Docusaurus 的 `<script>` 标签加载是异步的，不保证在 React 组件渲染前完成
- 如果 `x6.min.js` 加载失败（CDN 故障、文件损坏），页面不会报错，只是图谱空白

### 2.3 Bundle 体积冗余

| 项 | 体积 | 说明 |
|----|------|------|
| `static/x6.min.js` | ~X KB（压缩文件） | 通过 `<script>` 标签额外加载，不走 webpack |
| `node_modules/@antv/x6` | ~Y KB | npm 安装但未使用，不进 bundle 但占用磁盘 |

两份 X6 代码同时存在于项目中。

### 2.4 全局命名空间污染

`x6.min.js` 在 `window` 上挂载 `X6` 对象，这是一个全局副作用：
- 可能与页面中其他库冲突
- 不符合 ES Module 规范
- 难以进行 Tree Shaking 优化

### 2.5 `@antv/x6-react-shape` 完全未使用

安装了 React Shape 包（用于在 X6 节点中渲染 React 组件），但 `ConceptNode.tsx` 这个 React 组件根本没被 X6 注册为自定义节点，而是用 `graph.addNode()` 的 `attrs` 配置绘制。

---

## 3. 根因分析

1. **Phase 0 PoC 遗留**：初始集成时为了快速验证可行性，选择了最简单的方式 — 本地 script 加载。这在 PoC 阶段合理，但后续未升级为正式方案。
2. **Docusaurus SSR 兼容性顾虑**：可能因为 `window is not defined` 的 SSR 报错而选择全局加载。实际上可以通过 `typeof window !== 'undefined'` 动态 import 解决。
3. **X6 v3 的模块化差异**：`@antv/x6` v3 是纯 ESM 包，Docusaurus 使用 Webpack 5 构建，理论上完全支持 ESM import。

---

## 4. 影响评估

| 影响维度 | 评估 |
|---------|------|
| **类型安全** | 🔴 严重 — 所有 X6 API 调用都是 `any` 类型，无法在编译期发现错误 |
| **加载可靠性** | 🟡 中等 — SPA 路由切换时可能偶发图谱不渲染 |
| **开发效率** | 🟡 中等 — 无代码补全，需要频繁查阅 API 文档 |
| **构建优化** | 🟡 中等 — x6.min.js 不经 webpack 处理，无法 Tree Shake |
| **维护性** | 🔴 高 — X6 版本升级时需要手动替换 static 文件 |

---

## 5. 推荐解决方案

### 方案 A：npm 包动态 import（推荐 ✅）

```typescript
// GraphCanvas.tsx
import type {Graph} from '@antv/x6';

export const GraphCanvas: React.FC<GraphCanvasProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  useEffect(() => {
    let disposed = false;

    // 动态 import，避免 SSR 报错
    import('@antv/x6').then(({Graph}) => {
      if (disposed || !containerRef.current) return;

      const graph = new Graph({
        container: containerRef.current,
        // ... 配置
      });

      graphRef.current = graph;
      // ... 添加节点和边
    });

    return () => {
      disposed = true;
      graphRef.current?.dispose();
    };
  }, []);

  return <div ref={containerRef} />;
};
```

**优点**：
- 完整的 TypeScript 类型支持
- webpack 自动处理打包和 Tree Shaking
- 无全局命名空间污染
- 移除 `static/x6.min.js` 和 `scripts` 配置

**注意事项**：
- 需要在 useEffect 中动态 import，因为 `@antv/x6` 依赖 `window` 对象
- 首次渲染会有微小延迟（异步加载），但可通过 webpack prefetch 优化

### 方案 B：条件导入 + 静态 import

```typescript
// 在文件顶部
const isBrowser = typeof window !== 'undefined';
const X6 = isBrowser ? require('@antv/x6') : null;
```

不推荐：使用 `require()` 不符合 ES Module 规范。

### 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 修改 `GraphCanvas.tsx`：使用 `import('@antv/x6')` | 2h |
| 2 | 删除 `docusaurus.config.ts` 中的 `scripts` 配置 | 5min |
| 3 | 删除 `static/x6.min.js` | 1min |
| 4 | 从 `package.json` 移除 `@antv/x6-react-shape` | 1min |
| 5 | 修复 `docker/Dockerfile` 中 `COPY aides/static/x6.min.js` 行 | 2min |
| 6 | 测试图谱渲染、缩放、拖拽、Tooltip 功能 | 1h |
| 7 | 测试 Docker 构建流程 | 30min |

**总预估工时**: ~4h

---

## 6. 实际修复记录 (2026-06-07)

### 尝试过程

1. **方案 A（npm import）失败**：`@antv/x6` v3.1.7 的 `package.json` 声明了 `type: "module"`，其 `es/index.js` 中的无扩展名导入（如 `import * from './shape'`）与 Docusaurus webpack 5 的 `fullySpecified` ESM 解析规则不兼容，导致构建报 10 个 `Module not found` 错误。

2. **尝试 webpack `fullySpecified: false` 规则失败**：通过 Docusaurus 插件注入 webpack module rule 未能解决问题。

### 最终采用方案：保留全局脚本 + 改进

由于 `@antv/x6` v3 的 ESM 兼容性是上游问题，最终选择保留全局脚本加载方式，但做了以下改进：

| 改进项 | 说明 |
|--------|------|
| **添加 TypeScript 类型声明** | 新增 `src/types/x6.d.ts`，通过 `typeof import('@antv/x6').Graph` 为 `window.X6` 提供类型 |
| **添加 Loading 状态** | Graph 初始化完成前显示 spinner，替代空白 |
| **清理未使用依赖** | 卸载了 `@antv/x6-react-shape` 和 `antd` |
| **删除废弃组件** | 移除了依赖 antd 的 `ConceptNode.tsx` |
| **清理 Dockerfile** | 移除多余的 `COPY x6.min.js` 行（Docusaurus 构建时自动从 static/ 复制） |

### 修改文件清单

| 文件 | 变更 |
|------|------|
| `src/types/x6.d.ts` | 新增：X6 类型声明 |
| `src/components/Graph/GraphCanvas.tsx` | 保留 window.X6 方式，增加 loading 状态 |
| `src/components/Graph/GraphCanvas.module.css` | 新增 loading/spinner 样式 |
| `src/components/Graph/ConceptNode.tsx` | 删除（废弃组件） |
| `src/components/Graph/ConceptNode.module.css` | 删除 |
| `src/components/Graph/index.ts` | 移除 ConceptNode 导出 |
| `package.json` | 移除 antd、@antv/x6-react-shape |
| `docker/Dockerfile` | 移除多余 COPY x6.min.js |
| `.dockerignore` | 添加 aides/node_modules |

### 遗留问题

- 如果未来 `@antv/x6` 修复 ESM 兼容性或降级到 v2，可以重新尝试 npm import 方案
- `window.X6` 的类型声明依赖于 `@antv/x6` 的 npm 包类型定义（仅开发时使用，运行时走全局脚本）
