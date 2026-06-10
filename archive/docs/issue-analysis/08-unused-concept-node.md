# Issue #08: ConceptNode.tsx 组件未被使用 — 废弃代码

> **严重级别**: 🟡 中等
> **状态**: ✅ **已修复** (2026-06-07)
> **影响范围**: 代码整洁度、开发者困惑
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 行数 |
|------|------|------|
| ConceptNode.tsx | `src/components/Graph/ConceptNode.tsx` | 43 行 |
| ConceptNode.module.css | `src/components/Graph/ConceptNode.module.css` | 31 行 |
| index.ts | `src/components/Graph/index.ts` | 3 行 |

---

## 1. 问题详细描述

### 1.1 ConceptNode.tsx 的设计意图

`ConceptNode.tsx` 是一个 React 组件，设计用于作为 AntV X6 的自定义节点：

```typescript
// ConceptNode.tsx — 使用 antd Tooltip
import {Tooltip} from 'antd';

export const ConceptNode: React.FC<ConceptNodeProps> = ({
  name, abbreviation, category, summary,
}) => {
  return (
    <Tooltip title={summary} placement="right">
      <div className={styles.node} style={...}>
        <div className={styles.name}>{name}</div>
        <div className={styles.abbreviation}>{abbreviation}</div>
      </div>
    </Tooltip>
  );
};
```

这需要配合 `@antv/x6-react-shape` 包使用，将 React 组件注册为 X6 的自定义节点形状。

### 1.2 实际使用情况

**搜索所有引用**：

| 文件 | 是否 import ConceptNode | 说明 |
|------|------------------------|------|
| `GraphCanvas.tsx` | ❌ 否 | 使用 `graph.addNode()` 的 `attrs` API 直接绘制节点 |
| `index.tsx` | ❌ 否 | 只 import 了 `GraphCanvas` |
| `index.ts` | ✅ 是 | `export {ConceptNode}` — 但无外部消费者 |

**GraphCanvas.tsx 的节点创建方式**：

```typescript
// GraphCanvas.tsx:149-177 — 直接使用 X6 原生节点
graph.addNode({
  id: concept.id,
  x: pos.x, y: pos.y,
  width: 160, height: 70,
  attrs: {
    body: { fill: colors.bg, stroke: colors.border, ... },
    label: { text: `${concept.name}\n(${concept.abbreviation})`, ... },
  },
});
```

**结论**：`ConceptNode.tsx` 是 Phase 0 探索阶段的产物，后续方案改为直接使用 X6 原生 API，该组件被遗弃。

### 1.3 连带影响

1. **`index.ts` 仍然导出**：
```typescript
export {ConceptNode} from './ConceptNode';
```
这会导致 `ConceptNode` 被打包进 bundle（虽然 Tree Shaking 可能移除它）。

2. **依赖 antd**：`ConceptNode.tsx` 是项目中**唯一引用 antd** 的文件。如果删除这个组件，就可以安全移除 antd 依赖。

---

## 2. 推荐解决方案

### 方案 A：删除废弃组件（推荐 ✅）

如果确认不打算使用 React 自定义节点（当前 X6 原生节点方案足够），直接删除：

1. 删除 `ConceptNode.tsx`
2. 删除 `ConceptNode.module.css`
3. 从 `index.ts` 移除 `export {ConceptNode}`
4. 卸载 `antd` 和 `@antv/x6-react-shape`

### 方案 B：保留但重构

如果未来计划使用 React 自定义节点（比如要在节点中显示更丰富的内容），可以保留并重构：
- 移除 antd 依赖，用 CSS Modules 自行实现 Tooltip
- 等待 Issue #02（X6 npm import）解决后再注册自定义节点

---

## 3. 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | 删除 `ConceptNode.tsx` 和 `ConceptNode.module.css` | 1min |
| 2 | 修改 `index.ts`，移除 ConceptNode 导出 | 1min |
| 3 | `npm uninstall antd @antv/x6-react-shape` | 1min |
| 4 | 确认构建无报错 | 5min |

**总预估工时**: ~10min
