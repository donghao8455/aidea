# Issue #01: 数据源冗余 — 三套数据并存

> **严重级别**: 🔴 严重
> **状态**: ✅ **已修复** (2026-06-07)
> **影响范围**: 全局数据架构
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 用途 |
|------|------|------|
| types.ts | `src/components/Graph/types.ts` | 图谱节点展示 |
| allConcepts.ts | `src/data/allConcepts.ts` | 详情页完整数据 |
| conceptData.ts | `src/data/conceptData.ts` | JSON 数据加载器（未使用） |
| 15 个 JSON | `data/concepts/*.json` | 独立概念数据文件 |
| relations.json | `data/relations.json` | 关系数据 |

---

## 1. 问题详细描述

当前项目存在 **三套独立维护的概念数据**，各自为不同组件服务，但彼此之间没有同步机制：

### 数据源 A — `types.ts`（图谱用简化数据）

```typescript
// src/components/Graph/types.ts:14-195
export const concepts: ConceptData[] = [
  {
    id: 'llm',
    name: '大语言模型',
    nameEn: 'Large Language Model',
    abbreviation: 'LLM',
    category: 'basic',
    difficulty: 1,          // ← 注意：这里是 1
    tags: ['NLP', '深度学习', 'Transformer'],
    tooltip: { summary: '能理解和生成人类语言的大型神经网络模型' },
  },
  // ... 15 个概念
];

export const relations = [
  { source: 'llm', target: 'prompt', label: '使用' },
  // ... 24 条关系
];
```

**特点**：
- `ConceptData` 接口仅包含 `id/name/nameEn/abbreviation/category/difficulty/tags/tooltip`
- **没有** `detail` 字段（无定义、类比、要点等内容）
- `difficulty` 字段：部分值与数据源 B 不一致
- 关系数据 24 条，硬编码在此文件中

### 数据源 B — `allConcepts.ts`（详情页完整数据）

```typescript
// src/data/allConcepts.ts:28-544
export const allConcepts: Record<string, ConceptDetail> = {
  llm: {
    id: 'llm',
    name: '大语言模型',
    // ... 完整字段
    difficulty: 2,          // ← 注意：这里是 2，与数据源 A 不一致！
    detail: {
      definition: '...',
      plainExplanation: '...',
      analogy: '...',
      keyPoints: [...],
      useCases: [...],
      relatedConcepts: [...],
      resources: [...],
    },
  },
  // ... 15 个概念
};
```

**特点**：
- `ConceptDetail` 接口包含完整的 `detail` 对象
- 数据直接硬编码在 TypeScript 文件中
- `difficulty` 值与数据源 A 存在差异

### 数据源 C — `data/concepts/*.json` + `relations.json`

```json
// data/concepts/llm.json — 完整的概念数据
{
  "id": "llm",
  "name": "大语言模型",
  "detail": { ... }
}

// data/relations.json — 22 条关系
{
  "relations": [
    { "id": "rel-001", "source": "llm", "target": "prompt", "type": "uses", "label": "使用" }
  ]
}
```

**特点**：
- 由 `conceptData.ts` 导入并转换为 TypeScript 对象
- 但 `conceptData.ts` **未被任何页面组件实际引用**
- 关系数据只有 22 条，而 `types.ts` 中有 24 条

---

## 2. 具体不一致项

### 2.1 difficulty 值不一致

| 概念 ID | types.ts (数据源 A) | allConcepts.ts (数据源 B) | 差异 |
|---------|-------------------|------------------------|------|
| llm | 1 | 2 | ⚠️ 不一致 |
| prompt | 1 | 1 | ✅ |
| tokenizer | 2 | 2 | ✅ |
| temperature | 2 | 2 | ✅ |
| embedding | 3 | 3 | ✅ |
| vector-db | 3 | 3 | ✅ |
| fine-tuning | 4 | 4 | ✅ |
| prompt-engineering | 2 | 2 | ✅ |
| chain-of-thought | 3 | 3 | ✅ |
| rag | 3 | 4 | ⚠️ 不一致 |
| agent | 4 | 4 | ✅ |
| ai-gateway | 3 | 3 | ✅ |
| mcp | 4 | 4 | ✅ |
| tool-calling | 3 | 3 | ✅ |
| multi-agent | 5 | 5 | ✅ |

**至少 2 处不一致**：LLM（1 vs 2）、RAG（3 vs 4）

### 2.2 关系数据不一致

| 数据源 | 关系数量 | 说明 |
|--------|---------|------|
| types.ts `relations` | 24 条 | 图谱实际使用 |
| relations.json | 22 条 | JSON 文件（未使用） |
| allConcepts.ts 各概念的 relatedConcepts | 分散在各概念中 | 详情页使用 |

**关系结构和标签也有差异**：
- `types.ts`: `{ source, target, label }` — 简单三元组
- `relations.json`: `{ id, source, target, type, label }` — 带类型和 ID
- `allConcepts.ts`: `{ conceptId, relationType, relationLabel }` — 嵌入在每个概念中

### 2.3 tags 不一致

| 概念 | types.ts tags | allConcepts.ts tags |
|------|--------------|-------------------|
| llm | ['NLP', '深度学习', 'Transformer'] | ['AI', 'NLP', '深度学习', 'Transformer'] |
| embedding | ['向量化', '语义表示'] | ['向量化', '语义表示'] |

LLM 的 tags 在 allConcepts.ts 多了一个 `'AI'`。

---

## 3. 根因分析

1. **迭代式开发导致**：Phase 0 先在 `types.ts` 中创建测试数据，Phase 1/2 又在 `allConcepts.ts` 中独立编写完整内容，没有回头统一
2. **数据源 C 被遗忘**：JSON 文件是按 PRD 设计的"正式数据源"，但开发过程中为了方便直接在 TS 中硬编码，JSON 文件沦为"无人使用"的死数据
3. **缺乏数据一致性校验**：没有 lint 规则或测试来验证三套数据的一致性

---

## 4. 影响评估

| 影响维度 | 评估 |
|---------|------|
| **功能正确性** | 🟡 中等 — difficulty 和 tags 不一致会导致用户看到矛盾的信息（如图谱显示难度1星，详情页显示2星） |
| **维护成本** | 🔴 高 — 修改任何概念需要同时修改 2-3 个文件，极易遗漏 |
| **扩展性** | 🔴 高 — 未来扩展到 30 个概念时，手动同步三套数据几乎不可能 |
| **Bundle 体积** | 🟡 中等 — 详情页的 `allConcepts.ts`（552行）包含所有 15 个概念的完整数据，但用户一次只看一个概念 |
| **SEO** | 🟡 中等 — JSON 数据的 schema.org 结构化数据无法动态生成 |

---

## 5. 推荐解决方案

### 方案 A：JSON 文件为唯一数据源（推荐 ✅）

**思路**：保留 `data/concepts/*.json` 为 Single Source of Truth，所有组件从 JSON 加载。

```
data/concepts/*.json (唯一数据源)
     ↓ 导入
src/data/conceptStore.ts (统一数据层)
     ↓ 导出
  ├── GraphCanvas (图谱组件) — 读取 id/name/category/tooltip
  ├── concept.tsx (详情页) — 读取完整 detail
  └── index.tsx (首页搜索/筛选) — 读取 id/name/tags/abbreviation
```

**具体步骤**：
1. 将 `allConcepts.ts` 中的完整数据回写到 `data/concepts/*.json`（确保 JSON 包含 detail）
2. 统一 `relations.json`，确保 24 条关系完整
3. 重写 `conceptStore.ts`，从 JSON 导入并导出统一的接口
4. 修改 `types.ts`，删除硬编码数据，改为从 store 获取
5. 修改 `GraphCanvas.tsx` 和 `concept.tsx`，从 store 获取数据

**优点**：
- 单一数据源，无需同步
- JSON 文件可被工具校验（JSON Schema）
- 符合 PRD 中的数据架构设计

**缺点**：
- 需要确保 Docusaurus 能正确加载 JSON（已验证可行，`conceptData.ts` 已有先例）
- 所有 15 个 JSON 会被打包进 bundle（可考虑动态导入优化）

### 方案 B：TypeScript 文件为唯一数据源

**思路**：删除 JSON 文件，以 `allConcepts.ts` 为唯一数据源，图谱组件从中提取简化数据。

**优点**：改动最小，TypeScript 类型安全
**缺点**：不支持 JSON Schema 校验，非技术协作者难以编辑

### 不推荐：维持现状

随着概念数量增长，数据不一致问题只会越来越严重。

---

## 6. 修复优先级

| 步骤 | 任务 | 优先级 | 预估工时 |
|------|------|--------|---------|
| 1 | 统一 difficulty/tags 数据值 | P0 | 0.5h |
| 2 | 合并 relations.json（确保 24 条完整） | P0 | 0.5h |
| 3 | 创建统一数据层 conceptStore.ts | P0 | 2h |
| 4 | 重构 GraphCanvas 从 store 获取数据 | P1 | 1h |
| 5 | 重构 concept.tsx 从 store 获取数据 | P1 | 1h |
| 6 | 删除 types.ts 中的硬编码数据 | P1 | 0.5h |
| 7 | 添加数据一致性测试 | P2 | 1h |

**总预估工时**: ~6.5h

---

## 7. 实际修复记录 (2026-06-07)

### 采用方案：方案 B 变体 — `allConcepts.ts` 为单一数据源

考虑到改动最小且保持 TypeScript 类型安全，最终采用以 `allConcepts.ts` 为唯一数据源的方案：

| 变更文件 | 操作 | 说明 |
|---------|------|------|
| `src/data/allConcepts.ts` | **重写** | 同时导出 `allConcepts`(详情 Record)、`concepts`(图谱简化数组)、`relations`(关系数组)、`conceptOrder`(顺序数组) |
| `src/components/Graph/types.ts` | **精简** | 仅保留 `ConceptData` 和 `RelationData` 接口，删除 240 行硬编码数据 |
| `src/data/conceptData.ts` | **删除** | 未使用的 JSON 加载器 |

### 数据一致性修复

- LLM difficulty: `1` → `2`（与详情页统一）
- RAG difficulty: `3` → `4`（与详情页统一）
- LLM tags: 新增 `'AI'`（与详情页统一）
- relations: 统一为 24 条（在 `allConcepts.ts` 中集中管理）

### 修复效果

- ✅ 三套数据 → 一套数据源
- ✅ difficulty/tags 不一致问题消除
- ✅ `conceptData.ts`(require() 规范问题) 随文件删除自动解决
- ✅ 未来扩展到 30 个概念只需修改 `allConcepts.ts` 一处
