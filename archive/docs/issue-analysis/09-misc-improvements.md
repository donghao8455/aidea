# Issue #09 ~ #13: 小问题与改进建议

> **严重级别**: 🟢 低（但建议修复）
> **发现日期**: 2026-06-07
> **最近更新**: 2026-06-07

---

## Issue #09: Ctrl+K 快捷键未实现 ✅ 已修复

### 涉及文件
- `src/pages/index.tsx:39` — 搜索框 placeholder
- `src/pages/index.module.css:35-39` — 搜索框样式

### 问题描述

搜索输入框的 placeholder 提示用户可以使用 `Ctrl+K` 快捷键：

```typescript
// index.tsx:39
<input
  type="text"
  placeholder="搜索概念... (Ctrl+K)"   // ← 提示了快捷键
  ...
/>
```

但实际**没有绑定任何键盘事件监听器**。`Ctrl+K` 按下后不会触发搜索框聚焦。

### 影响
- 用户看到提示后会尝试 `Ctrl+K`，但没有反应 → **用户信任度降低**
- PRD 第 3.7 节要求：`触发入口: 页面顶部中央搜索图标/输入框 + 键盘快捷键 Ctrl/Cmd + K`

### 推荐方案

```typescript
// index.tsx — 添加全局键盘监听
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInputRef.current?.focus();
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

// 添加 ref
const searchInputRef = useRef<HTMLInputElement>(null);

// 绑定到 input
<input ref={searchInputRef} ... />
```

### 预估工时
~30min

---

## Issue #10: 移动端适配缺失 ⏳ 待修复

### 涉及文件
- `src/components/Graph/GraphCanvas.tsx` — 固定尺寸 1400×800
- `src/components/Graph/GraphCanvas.module.css` — 无响应式断点
- `src/pages/index.module.css` — 有基础的 768px 断点
- `src/pages/concepts/concept.module.css` — 有基础的 768px 断点

### 问题描述

#### 10.1 图谱尺寸硬编码

```typescript
// GraphCanvas.tsx:47-48
const graph = new Graph({
  container: containerRef.current!,
  width: 1400,    // ← 固定宽度
  height: 800,    // ← 固定高度
});
```

在移动端（375px 宽），1400px 的画布会导致严重的水平溢出。

#### 10.2 CSS 响应式不完整

`index.module.css` 有 `@media (max-width: 768px)` 断点，但只调整了标题大小和按钮间距，没有处理图谱区域。

PRD 第 3.4 节的移动端适配策略：
- 节点最小触控区域 44×44px
- Tooltip 改为长按触发
- 缩放改为捏合手势

### 推荐方案

**最小可行适配**（PRD 已明确移动端 P2 优先级）：

```typescript
// 1. 动态计算图谱尺寸
useEffect(() => {
  const updateSize = () => {
    if (containerRef.current && graphRef.current) {
      const width = containerRef.current.clientWidth;
      const height = Math.min(800, window.innerHeight - 200);
      graphRef.current.resize(width, height);
    }
  };
  updateSize();
  window.addEventListener('resize', updateSize);
  return () => window.removeEventListener('resize', updateSize);
}, []);
```

### 预估工时
- 基础适配（可读可滚动）: ~2h
- 完整适配（触控优化）: ~1-2 天（建议延后到 v1.1）

---

## Issue #11: Loading 动画 / 骨架屏未实现 ✅ 已修复

### 涉及文件
- `src/components/Graph/GraphCanvas.tsx` — 无 loading 状态

### 问题描述

图谱首次加载时（特别是 X6 脚本异步加载阶段），用户看到的是空白区域，没有任何视觉反馈。

PRD 第 9 节 Loading/Skeleton 状态要求：
> 首页/图谱: 居中 Spinner (Logo 动画) | 节点和连线灰色占位块 (脉冲) | 预期 1-2s

### 推荐方案

```typescript
export const GraphCanvas: React.FC<GraphCanvasProps> = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import('@antv/x6').then(({Graph}) => {
      // ... 创建图谱
      setLoading(false);   // ← 加载完成
    });
  }, []);

  if (loading) {
    return <GraphSkeleton />;  // ← 骨架屏组件
  }

  return <div ref={containerRef} />;
};
```

### 预估工时
~1h

---

## Issue #12: TypeScript 规范问题 — require() 使用 ✅ 已修复

### 涉及文件
- `src/data/conceptData.ts:114` — `require()` 动态导入

### 问题描述

```typescript
// conceptData.ts:114
const concepts = require('@site/src/components/Graph/types').concepts;
```

在 TypeScript + ES Module 项目中使用 `require()` 是不规范的：
- `require()` 是 CommonJS 语法，与项目的 ES Module 规范不一致
- TypeScript 默认配置可能不允许 `require()`（需 `esModuleInterop`）
- 无类型推导，`concepts` 的类型为 `any`

### 推荐方案

```typescript
// 使用 ES Module import
import {concepts, ConceptData} from '@site/src/components/Graph/types';
```

> **注意**：如果 Issue #01（数据源统一）被解决，这个文件可能被完全重写或删除，此问题将自动消失。

### 预估工时
~5min（或随 Issue #01 一并处理）

---

## Issue #13: Dockerfile 路径和构建优化 ✅ 已修复

### 涉及文件
- `docker/Dockerfile`
- `docker/docker-compose.yml`

### 13.1 多余的 COPY 指令

```dockerfile
# Dockerfile:28
COPY aides/static/x6.min.js /usr/share/nginx/html/x6.min.js
```

Docusaurus 构建时会自动将 `static/` 目录的文件复制到 `build/` 目录，所以：

```dockerfile
COPY --from=builder /app/build /usr/share/nginx/html
```

这行已经包含了 `x6.min.js`，第 28 行的 COPY 是**多余的**。

### 13.2 docker-compose.yml 的 Dockerfile 路径

```yaml
# docker-compose.yml:5-6
build:
  context: ..              # ← 项目根目录（aidea/）
  dockerfile: docker/Dockerfile  # ← 正确路径
```

Dockerfile 中的路径（相对于 context `..` 即项目根目录）：

```dockerfile
COPY aides/package*.json ./    # ✅ 正确
COPY aides/ ./                 # ✅ 正确
COPY docker/nginx.conf ...     # ✅ 正确
COPY aides/static/x6.min.js .. # ✅ 路径正确（但多余）
```

路径本身是正确的。

### 13.3 缺少 .dockerignore 中的 node_modules 排除

```dockerignore
# .dockerignore
node_modules   # ← 已有
```

但注意 `COPY aides/ ./` 会复制 `aides/node_modules`（如果存在），而 `aides/` 下确实有 `node_modules`。`.dockerignore` 中的 `node_modules` 只能排除项目根目录的，不会排除子目录的。

需要确认 Docker 构建时 `aides/node_modules` 是否被正确排除。如果 `.dockerignore` 不支持子目录排除，Builder 阶段的 `npm ci` 会覆盖它（但 `COPY aides/ ./` 仍会先复制大量文件）。

**建议**：在 `.dockerignore` 中显式添加：

```
aides/node_modules
```

### 预估工时
~15min

---

## 汇总

| Issue | 问题 | 优先级 | 状态 | 修复说明 |
|-------|------|--------|------|---------|
| #09 | Ctrl+K 快捷键 | 🟢 P2 | ✅ 已修复 | `index.tsx` 添加全局 keydown 监听 |
| #10 | 移动端适配 | 🟢 P2 | ⏳ 待修复 | 建议延后到 v1.1 |
| #11 | Loading 动画 | 🟢 P2 | ✅ 已修复 | `GraphCanvas.tsx` 添加 loading state + spinner overlay |
| #12 | require() 规范 | 🟢 P3 | ✅ 已修复 | `conceptData.ts` 文件已删除，问题自动消失 |
| #13 | Dockerfile 优化 | 🟢 P3 | ✅ 已修复 | 移除多余 COPY 行，`.dockerignore` 添加 `aides/node_modules` |
