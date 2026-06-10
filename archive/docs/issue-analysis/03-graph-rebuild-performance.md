# Issue #03: GraphCanvas 筛选/搜索时销毁重建 — 性能与体验问题

> **严重级别**: 🔴 严重
> **状态**: ✅ **已修复** (2026-06-07)
> **影响范围**: 图谱交互体验、性能
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 关键行 |
|------|------|--------|
| GraphCanvas.tsx | `src/components/Graph/GraphCanvas.tsx` | 第 36-321 行（整个 useEffect） |
| index.tsx | `src/pages/index.tsx` | 第 15-18 行（状态定义） |

---

## 1. 问题详细描述

### 1.1 当前实现

`GraphCanvas` 组件的 `useEffect` 依赖数组为：

```typescript
// GraphCanvas.tsx:321
useEffect(() => {
  // ... 创建 Graph 实例
  // ... 添加所有节点
  // ... 添加所有边
  // ... 绑定事件监听

  return () => {
    // 清理：销毁 Graph、移除 Tooltip
    graphRef.current.dispose();
    graphRef.current = null;
  };
}, [selectedCategory, searchQuery, onNodeClick]);  // ← 三个依赖
```

**这意味着**：每当 `selectedCategory`（分类筛选）或 `searchQuery`（搜索关键词）或 `onNodeClick` 发生变化时：
1. **先执行 cleanup**：调用 `graph.dispose()` 销毁整个 Graph 实例
2. **再重新执行 effect**：重新创建 Graph → 重新添加 15 个节点 → 重新添加 24 条边 → 重新绑定事件

### 1.2 触发频率分析

| 操作 | 触发次数 | 场景 |
|------|---------|------|
| 搜索输入 | 每按一个键触发一次 | 用户搜索 "embedding" 至少触发 8 次 |
| 分类筛选 | 每次点击触发一次 | 切换 5 个分类各 1 次 |
| onNodeClick | 每次点击节点触发 | 每次点击节点后都会重建 |

**关键问题 — 搜索**：
```typescript
// index.tsx:39
onChange={e => setSearchQuery(e.target.value)}
```
这是 uncontrolled input，每次键入一个字符都会触发 `searchQuery` 状态变更 → GraphCanvas useEffect 重建。

例如输入 "multi-agent"：
1. `m` → 重建
2. `mu` → 重建
3. `mul` → 重建
4. `mult` → 重建
5. `multi` → 重建
6. `multi-` → 重建
7. `multi-a` → 重建
8. `multi-ag` → 重建
9. `multi-age` → 重建
10. `multi-agen` → 重建
11. `multi-agent` → 重建

**11 次完整销毁+重建**，每次重建包含 15 个节点 + 24 条边的创建。

### 1.3 onNodeClick 依赖问题

```typescript
// index.tsx:19-21
const handleNodeClick = (conceptId: string) => {
  window.location.href = `/concept?id=${conceptId}`;
};
```

这个函数在每次 `Home` 组件渲染时都会创建新引用，导致 GraphCanvas 的 `onNodeClick` prop 引用变化 → useEffect 触发重建。

**但实际上**，点击节点后 `window.location.href` 会触发页面完全刷新（不是 SPA 路由），Graph 重建毫无意义。

---

## 2. 性能分析

### 2.1 单次重建的时间成本

一次 useEffect 重建涉及：

| 操作 | 估算耗时 | 说明 |
|------|---------|------|
| `graph.dispose()` | ~5-10ms | 销毁 DOM 和内部数据结构 |
| `new Graph()` | ~5-10ms | 创建实例、初始化 SVG 容器 |
| `graph.addNode()` × 15 | ~15-30ms | 每个 ~1-2ms |
| `graph.addEdge()` × 24 | ~12-24ms | 每个 ~0.5-1ms（含路由计算） |
| 事件监听绑定 | ~2-5ms | SVG mouseover/mouseout |
| `graph.centerContent()` | ~2-5ms | 重算视图 |
| DOM 重绘/重排 | ~10-20ms | 浏览器渲染 |
| **总计** | **~50-100ms** | 每次重建 |

### 2.2 搜索场景累计成本

输入 "multi-agent"（11 个字符）：
- 11 次 × 50-100ms = **550-1100ms 累计耗时**
- 用户在搜索时可能感觉到 **明显的卡顿和闪烁**
- 每次重建都会产生一个"空白→重新渲染"的视觉闪烁

### 2.3 内存影响

每次重建时，虽然旧 Graph 被 `dispose()`，但：
- 频繁创建/销毁 DOM 节点会增加 GC 压力
- SVG 元素的频繁添加/移除可能触发浏览器的内存碎片化
- Tooltip DOM 元素的反复创建和移除（第 77-94 行）

---

## 3. 用户体验问题

### 3.1 视觉闪烁

每次重建时，用户会看到：
1. 图谱区域短暂空白（Graph 被销毁）
2. 节点突然全部重新出现（Graph 被重建）
3. 视图位置被重置到默认（`centerContent` 重新居中）

**这破坏了用户当前的浏览上下文** — 如果用户已经缩放/拖动到某个区域，重建会将其重置。

### 3.2 交互中断

如果在搜索过程中，用户正在：
- 悬停查看某个 Tooltip → 被中断
- 缩放/拖动画布 → 被重置
- 准备点击某个节点 → 位置变动

### 3.3 搜索体验差

搜索输入框没有防抖（debounce），每个按键都立即触发重建。而 PRD 要求：
> 搜索响应时间 ≤ 300ms（AC-005）

当前实现下，单次重建就要 50-100ms，再加上渲染时间，可能勉强达标，但连续输入时体验很差。

---

## 4. 根因分析

1. **对 X6 API 不熟悉**：X6 v3 提供了 `node.setAttrs()` / `node.attr()` API 来动态更新节点样式，但开发者选择了最简单的"销毁重建"方式。
2. **useEffect 依赖设计不当**：将筛选和搜索状态作为 useEffect 依赖，导致状态变化触发完整的副作用重执行。
3. **缺少性能优化意识**：没有使用 debounce、useMemo、useCallback 等性能优化手段。

---

## 5. 推荐解决方案

### 方案 A：保留 Graph 实例 + 动态更新节点样式（推荐 ✅）

**核心思路**：Graph 实例只在组件挂载时创建一次，筛选/搜索时通过 X6 API 动态更新节点和边的样式。

```typescript
export const GraphCanvas: React.FC<GraphCanvasProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<Graph | null>(null);

  // 1. 初始化 Graph — 只执行一次
  useEffect(() => {
    const graph = new Graph({ /* 配置 */ });
    // 添加所有节点和边
    graphRef.current = graph;
    return () => graph.dispose();
  }, []);  // ← 空依赖，只创建一次

  // 2. 响应筛选/搜索 — 只更新样式
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    const nodes = graph.getNodes();
    nodes.forEach(node => {
      const concept = node.getData()?.concept;
      const shouldHighlight = /* 匹配逻辑 */ ;
      const isActive = /* 筛选逻辑 */ ;

      node.setAttrs({
        body: {
          fill: shouldHighlight && isActive ? colors.bg : '#f1f5f9',
          stroke: shouldHighlight && isActive ? colors.border : '#cbd5e1',
          opacity: shouldHighlight && isActive ? 1 : 0.4,
        },
        label: {
          fontWeight: shouldHighlight && isActive ? 600 : 400,
          fill: shouldHighlight && isActive ? '#213547' : '#94a3b8',
        },
      });
    });

    // 同理更新边的样式
    const edges = graph.getEdges();
    edges.forEach(edge => { /* 更新边样式 */ });
  }, [selectedCategory, searchQuery]);  // ← 只依赖筛选和搜索

  return <div ref={containerRef} />;
};
```

**优点**：
- 无视觉闪烁
- 保留用户当前的缩放/拖动状态
- 性能优秀：只更新 CSS 属性，不重建 DOM
- 搜索输入更流畅

### 方案 B：在方案 A 基础上增加搜索防抖

```typescript
// index.tsx
const [searchQuery, setSearchQuery] = useState('');
const [debouncedQuery, setDebouncedQuery] = useState('');

useEffect(() => {
  const timer = setTimeout(() => setDebouncedQuery(searchQuery), 200);
  return () => clearTimeout(timer);
}, [searchQuery]);

// GraphCanvas 接收 debouncedQuery 而非 searchQuery
<GraphCanvas searchQuery={debouncedQuery} />
```

这样输入 "multi-agent" 只会触发 ~3 次样式更新（而非 11 次）。

### 方案 C：onNodeClick 不应作为 useEffect 依赖

```typescript
// index.tsx — 用 useCallback 包裹
const handleNodeClick = useCallback((conceptId: string) => {
  window.location.href = `/concept?id=${conceptId}`;
}, []);
```

或者更好：在 GraphCanvas 中用 `useRef` 保存 callback，避免引用变化触发重建。

---

## 6. 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 拆分 useEffect：初始化 + 样式更新 两个 effect | 2h |
| 2 | 实现基于 `setAttrs()` 的节点样式动态更新 | 1.5h |
| 3 | 实现基于边 API 的连线样式动态更新 | 1h |
| 4 | 添加搜索防抖（debounce 200ms） | 0.5h |
| 5 | 用 `useCallback` 包裹 `handleNodeClick` | 5min |
| 6 | 测试筛选、搜索、缩放、拖拽、Tooltip | 1h |

**总预估工时**: ~6h

---

## 7. 实际修复记录 (2026-06-07)

### 采用方案：方案 A + B + C 全部实施

| 改进项 | 修复前 | 修复后 |
|--------|--------|--------|
| Effect 1 (初始化) | `useEffect([selectedCategory, searchQuery, onNodeClick])` 每次重建 | `useEffect([], [])` 只创建一次 |
| Effect 2 (样式更新) | 无（随 Effect 1 重建） | `useEffect([selectedCategory, searchQuery])` → `node.setAttrs()` 动态更新 |
| 搜索防抖 | 无（每个字符触发重建） | 200ms debounce → 输入"multi-agent"仅 ~3 次更新 |
| onNodeClick | `window.location.href` (整页刷新) | `history.push()` (SPA 路由) |
| onNodeClick 引用 | 每次渲染新引用 → 触发 useEffect | `useRef` 保持稳定，不触发 Effect |
| Loading 状态 | 无 | spinner overlay（X6 加载期间显示） |
| Ctrl+K 快捷键 | 未实现 | 全局 keydown 监听聚焦搜索框 |
| Tooltip 防抖 | 无 | 200ms setTimeout 防抖 |
| X6 加载检测 | `window.load`（SPA 下不可靠） | script load 监听 + 100ms 轮询兜底 |
| containerRef | 无问题 | 修复条件渲染导致 ref 为 null 的 bug（始终渲染 graph 容器） |

### 性能对比

| 场景 | 修复前 | 修复后 |
|------|--------|--------|
| 搜索输入"multi-agent" | 11 次销毁+重建 (~550-1100ms) | ~3 次样式更新 (~15-30ms) |
| 切换分类筛选 | 1 次销毁+重建 (~50-100ms) | 1 次样式更新 (~5-10ms) |
| 缩放/拖拽状态 | 筛选后重置 | 完全保留 |
