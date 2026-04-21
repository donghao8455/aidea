# Phase 1 - 路由问题排查记录

> 文档版本：v1.0
> 创建日期：2026-04-21
> 最后更新：2026-04-21
> 状态：**已解决 ✅**

---

## 1. 问题背景

### 1.1 需求
点击图谱中的概念节点，需要跳转到对应概念的详情页。详情页应支持路径格式如 `/concepts/llm`，URL 语义化且符合 REST 风格。

### 1.2 初始方案
在 `src/pages/concepts/[id].tsx` 创建动态路由文件，这是 Next.js 等框架常用的动态路由命名方式。

---

## 2. 问题表现

### 2.1 错误信息
```
找不到页面
```

### 2.2 尝试的 URL
- `/concepts/llm` → 404
- `/concepts/rag` → 404

---

## 3. 排查过程

### 3.1 方案一：`[id].tsx` 命名方式 ❌

**操作**：
1. 创建 `src/pages/concepts/[id].tsx`
2. 实现 `useParams` 来获取参数
3. 重启开发服务器

**结果**：Docusaurus 不支持 `[id].tsx` 这种命名方式的动态路由。

**原因**：Docusaurus 的路由系统是基于文件系统的静态路由，不支持 Next.js 风格的方括号命名。

---

### 3.2 方案二：通配符路由 `[...slug].tsx` ❌

**操作**：
1. 创建 `src/pages/concepts/[...slug].tsx`
2. 使用 `useLocation` 解析路径段
3. 配置 `trailingSlash: false`

**结果**：仍然无法匹配 `/concepts/llm`。

**原因**：Docusaurus 的 `[...slug].tsx` 主要用于文档路由，需要配合 docs 配置，不能任意使用在 `src/pages/` 目录下。

---

### 3.3 方案三：`concepts/index.tsx` + URL 解析 ❌

**操作**：
1. 创建 `src/pages/concepts/index.tsx`
2. 在页面中使用 `useLocation` 解析 URL 路径
3. 使用正则表达式 `/concepts/([^/]+)/` 提取概念 ID

**结果**：当访问 `/concepts/llm` 时，Docusaurus 仍然会返回 404。

**原因**：Docusaurus 会先检查文件系统是否存在匹配的路由，如果 `/concepts/llm` 没有对应的文件，直接返回 404，不会回退到 `/concepts/index.tsx`。

---

### 3.4 方案四：查询参数格式 ✅

**操作**：
1. 创建 `src/pages/concept.tsx`（单个静态页面）
2. 使用查询参数格式：`/concept?id=llm`
3. 用 `URLSearchParams` 解析查询参数
4. 更新首页的 `handleNodeClick` 为 `/concept?id=${conceptId}`

**文件内容**：
```typescript
// src/pages/concept.tsx
export default function ConceptPage() {
  const location = useLocation();
  const [conceptId, setConceptId] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || '';
    setConceptId(id);
  }, [location.search]);
  
  // ... 渲染逻辑
}

// src/pages/index.tsx
const handleNodeClick = (conceptId: string) => {
  window.location.href = `/concept?id=${conceptId}`;
};
```

**结果**：成功！页面正常跳转，所有功能正常工作。

---

## 4. 最终解决方案

### 4.1 技术方案
**查询参数路由**：`/concept?id={概念ID}`

### 4.2 实现细节

#### 4.2.1 路由结构
```
src/pages/
├── index.tsx          # 首页（图谱）
└── concept.tsx        # 概念详情页
```

#### 4.2.2 数据加载
```typescript
// src/data/allConcepts.ts - 统一数据管理
export interface ConceptDetail { /* ... */ }
export const allConcepts: Record<string, ConceptDetail> = { /* ... */ };
export const conceptOrder: string[] = ['llm', 'prompt', /* ... */];
```

#### 4.2.3 详情页功能
- ✅ 面包屑导航
- ✅ 概念标题 + 缩写
- ✅ 分类标签 + 颜色
- ✅ 难度星级
- ✅ 标签云
- ✅ 定义区块
- ✅ 通俗解释
- ✅ 生活化类比
- ✅ 核心要点
- ✅ 应用场景
- ✅ 相关概念链接
- ✅ 延伸阅读资源
- ✅ 上一个/下一个导航
- ✅ 返回图谱链接

### 4.3 URL 格式
```
http://localhost:3000/concept?id=llm
http://localhost:3000/concept?id=rag
http://localhost:3000/concept?id=agent
```

---

## 5. 方案对比

| 方案 | 优点 | 缺点 | 是否采用 |
|------|------|------|----------|
| 路径参数 `/concepts/llm` | URL 美观、符合 REST 标准 | Docusaurus 不支持动态路由 | ❌ |
| 查询参数 `/concept?id=llm` | 简单可靠、兼容性好 | URL 不够美观 | ✅ **采用** |
| hash 路由 `/concept#llm` | 不需要服务器支持 | 不利于 SEO | ❌ |

---

## 6. 学到的经验

### 6.1 Docusaurus 路由特性
- Docusaurus 是静态站点生成器（SSG）
- 路由完全基于文件系统
- `src/pages/` 下的 `.tsx` 文件直接映射到 URL
- 不支持动态路由（除非使用 Docusaurus 的 docs/blog 插件）
- 要实现动态内容，需要在客户端根据参数渲染不同内容

### 6.2 正确的查询参数解析方式
```typescript
import { useLocation } from 'react-router-dom';

function ConceptPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  // ...
}
```

### 6.3 版本兼容性问题
- `useSearchParams` 在旧版 react-router-dom 中不可用
- 应优先使用 `useLocation` + `URLSearchParams` 来保证兼容性

---

## 7. 测试验证

### 7.1 测试用例
| 测试项 | 状态 |
|--------|------|
| 点击 LLM 节点跳转详情页 | ✅ 通过 |
| 点击 RAG 节点跳转详情页 | ✅ 通过 |
| 点击 Agent 节点跳转详情页 | ✅ 通过 |
| 详情页面包屑导航 | ✅ 通过 |
| 详情页上一个/下一个导航 | ✅ 通过 |
| 详情页相关概念跳转 | ✅ 通过 |
| 详情页返回图谱 | ✅ 通过 |
| 15 个概念全部可访问 | ✅ 通过 |

---

## 8. 相关文件变更

| 文件 | 说明 |
|------|------|
| `src/pages/concept.tsx` | 新增 - 概念详情页 |
| `src/data/allConcepts.ts` | 新增 - 统一数据管理 |
| `src/pages/index.tsx` | 修改 - 更新跳转链接 |
| `src/pages/concepts/[id].tsx` | 删除 |
| `src/pages/concepts/[...slug].tsx` | 删除 |
| `src/pages/concepts.tsx` | 删除 |

---

## 9. 后续优化建议（可选）

### 9.1 SEO 优化
虽然查询参数方案可以正常工作，但对于 SEO，路径参数更好。如果后续有 SEO 需求，可以考虑：

```tsx
// 方案：使用 rewrites 配置（需要 docusaurus.config.ts 配置）
// 但 Docusaurus 可能仍不支持
```

### 9.2 更友好的 URL
可以考虑使用 `react-router-dom` 的 `Link` 组件配合自定义的路径处理，但这需要更深入的路由定制。

---

## 10. 总结

### 10.1 解决的问题
- ✅ Docusaurus 动态路由实现困难问题
- ✅ 点击节点跳转详情页功能
- ✅ 15 个概念完整数据加载

### 10.2 关键技术点
- 使用查询参数替代路径参数
- `useLocation` + `URLSearchParams` 解析
- 统一的数据管理模块

### 10.3 时间线
- 2026-04-21 1:00 AM: 开始实现详情页
- 2026-04-21 1:30 AM: 遇到路由问题
- 2026-04-21 2:00 AM: 尝试多种路由方案
- 2026-04-21 2:30 AM: 采用查询参数方案成功
- 2026-04-21 2:45 AM: 完成功能测试

---

> **下一步**：继续完善详情页样式、实现相关概念迷你图谱、进行响应式适配
