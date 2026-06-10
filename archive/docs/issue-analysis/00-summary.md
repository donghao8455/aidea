# AI-Aides 项目问题分析总览

> **分析日期**: 2026-06-07
> **分析范围**: `develop` 分支全量代码审查
> **文档版本**: v1.1
> **分析者**: Claude Code 自动化审查
> **最近更新**: 2026-06-07 — 第一批严重问题已修复

---

## 📋 问题清单

| 编号 | 问题 | 级别 | 状态 | 文档 |
|------|------|------|------|------|
| #01 | 数据源冗余 — 三套数据并存 | 🔴 严重 | ✅ **已修复** | [01-data-source-redundancy.md](01-data-source-redundancy.md) |
| #02 | X6 加载方式脆弱 — 全局脚本 vs npm 包 | 🔴 严重 | ✅ **已修复** | [02-x6-loading-fragility.md](02-x6-loading-fragility.md) |
| #03 | GraphCanvas 筛选/搜索时销毁重建 | 🔴 严重 | ✅ **已修复** | [03-graph-rebuild-performance.md](03-graph-rebuild-performance.md) |
| #04 | 详情页 URL 设计不规范 | 🟡 中等 | ⏳ 待修复 | [04-url-design-seo.md](04-url-design-seo.md) |
| #05 | 未使用 Docusaurus 路由约定 | 🟡 中等 | ⏳ 待修复 | [05-routing-convention.md](05-routing-convention.md) |
| #06 | Antd 依赖已安装但未使用 | 🟡 中等 | ✅ **已修复** | [06-unused-dependencies.md](06-unused-dependencies.md) |
| #07 | GitHub Actions CI/CD 部署流程缺陷 | 🟡 中等 | ⏳ 待修复 | [07-ci-cd-deployment.md](07-ci-cd-deployment.md) |
| #08 | ConceptNode.tsx 组件未使用 | 🟡 中等 | ✅ **已修复** | [08-unused-concept-node.md](08-unused-concept-node.md) |
| #09 | Ctrl+K 快捷键未实现 | 🟢 低 | ✅ **已修复** | [09-misc-improvements.md](09-misc-improvements.md#issue-09-ctrlk-快捷键未实现) |
| #10 | 移动端适配缺失 | 🟢 低 | ⏳ 待修复 | [09-misc-improvements.md](09-misc-improvements.md#issue-10-移动端适配缺失) |
| #11 | Loading 动画未实现 | 🟢 低 | ✅ **已修复** | [09-misc-improvements.md](09-misc-improvements.md#issue-11-loading-动画骨架屏未实现) |
| #12 | require() TypeScript 规范问题 | 🟢 低 | ✅ **已修复** | [09-misc-improvements.md](09-misc-improvements.md#issue-12-typescript-规范问题--require-使用) |
| #13 | Dockerfile 路径和构建优化 | 🟢 低 | ✅ **已修复** | [09-misc-improvements.md](09-misc-improvements.md#issue-13-dockerfile-路径和构建优化) |

---

## ✅ 已修复问题详情 (2026-06-07)

### 🔴 Issue #01: 数据源统一

**修复方案**：以 `allConcepts.ts` 为单一数据源 (Single Source of Truth)

| 变更文件 | 说明 |
|---------|------|
| `src/data/allConcepts.ts` | 重构：同时导出 `allConcepts`(详情)、`concepts`(图谱)、`relations`(关系)、`conceptOrder`(顺序) |
| `src/components/Graph/types.ts` | 精简为纯类型定义，删除 240 行硬编码数据 |
| `src/data/conceptData.ts` | 删除（未使用的 JSON 加载器） |

**修复效果**：difficulty/tags 数据不一致问题消除，未来扩展到 30 个概念只需修改一处。

### 🔴 Issue #02: X6 加载方式改进

**修复方案**：保留全局脚本（npm import 因 @antv/x6 v3 ESM 与 webpack 5 不兼容），增加类型声明和健壮性改进

| 变更文件 | 说明 |
|---------|------|
| `src/types/x6.d.ts` | 新增：通过 `typeof import('@antv/x6').Graph` 提供类型安全 |
| `package.json` | 卸载 antd (-63 包)、@antv/x6-react-shape |
| `src/components/Graph/ConceptNode.tsx/.css` | 删除（依赖 antd 的废弃组件） |
| X6 加载检测 | `window.load` 改为 script load 监听 + 100ms 轮询兜底 |

**遗留**：若 @antv/x6 未来修复 ESM 兼容性，可重新尝试 npm import。

### 🔴 Issue #03: GraphCanvas 性能优化

**修复方案**：拆分 useEffect，动态更新样式而非销毁重建

| 改进项 | 修复前 | 修复后 |
|--------|--------|--------|
| 图谱初始化 | 每次筛选/搜索销毁重建 | 只创建一次 (`useEffect([],[])`) |
| 样式更新 | `graph.dispose()` + `new Graph()` | `node.setAttrs()` 动态更新 |
| 搜索输入 | 每个字符触发重建 (输入"multi-agent" → 11次) | 200ms 防抖 → ~3次样式更新 |
| 节点点击 | `window.location.href` (整页刷新) | `history.push()` (SPA 路由) |
| Loading 状态 | 无 | spinner overlay（X6 加载期间显示） |

### 🟡 Issue #06: 卸载未使用依赖

已卸载 `antd` 和 `@antv/x6-react-shape`，移除 63 个无用包。

### 🟡 Issue #08: 删除废弃组件

已删除 `ConceptNode.tsx`、`ConceptNode.module.css`，更新 `index.ts` 导出。

### 🟢 Issue #09: Ctrl+K 快捷键

已在 `index.tsx` 中添加全局 `keydown` 监听，`Ctrl+K` 聚焦搜索框。

### 🟢 Issue #11: Loading 动画

已在 `GraphCanvas.tsx` 中添加 loading 状态 + spinner overlay + CSS 动画。

### 🟢 Issue #12: require() 规范

`conceptData.ts` 已删除，require() 问题自动消失。

### 🟢 Issue #13: Dockerfile 优化

已移除多余的 `COPY x6.min.js` 行，`.dockerignore` 添加 `aides/node_modules`。

---

## 🔗 问题依赖关系

```
#01 数据源冗余          ✅ 已修复
  └─ #05 路由约定       ⏳ (数据层已重构，路由待调整)
  └─ #12 require() 规范 ✅ 已修复（文件已删除）

#02 X6 加载方式         ✅ 已修复
  └─ #03 GraphCanvas 重建 ✅ 已修复
  └─ #08 废弃组件       ✅ 已修复
  └─ #06 未使用依赖     ✅ 已修复
  └─ #11 Loading 动画   ✅ 已修复

#04 URL 设计            ⏳ 待修复
  └─ #05 路由约定       ⏳ 待修复

#07 CI/CD 部署          ⏳ 待修复
  └─ #13 Dockerfile 优化 ✅ 已修复
```

---

## ⏳ 剩余待修复问题

| 编号 | 问题 | 级别 | 预估工时 |
|------|------|------|---------|
| #04 | 详情页 URL 不规范 (`/concept?id=rag` → `/concepts/rag`) | 🟡 中等 | 2~6.5h |
| #05 | 未使用 Docusaurus 路由约定 | 🟡 中等 | 0.5h |
| #07 | CI/CD 部署流程缺陷 | 🟡 中等 | 2.5h |
| #10 | 移动端适配缺失 | 🟢 低 | 2h+ |
| **合计** | **4 个** | | **~7~11.5h** |

---

## 📊 修复进度统计

| 级别 | 总数 | 已修复 | 待修复 | 完成率 |
|------|------|--------|--------|--------|
| 🔴 严重 | 3 | 3 | 0 | **100%** |
| 🟡 中等 | 5 | 2 | 3 | 40% |
| 🟢 低 | 5 | 4 | 1 | 80% |
| **合计** | **13** | **9** | **4** | **69%** |

### 代码变更统计

| 指标 | 数值 |
|------|------|
| 修改文件 | 14 个 |
| 新增文件 | 11 个 (含 10 个分析文档 + 1 个类型声明) |
| 新增代码 | +416 行 |
| 删除代码 | -1,548 行 |
| 净减少 | **1,132 行** |
| 移除依赖包 | 63 个 |

---

## 🎯 做得好的地方（值得保留）

1. **PRD 质量**：1160 行的 PRD 文档极其专业，包含用户画像、Gherkin 验收标准、非功能需求、错误处理等
2. **内容质量**：15 个概念的"类比"模块差异化价值高
3. **CSS 设计**：CSS Modules 组织良好，配色方案统一，响应式断点有考虑
4. **详情页组件**：`concept.tsx` 结构清晰，区块划分合理
5. **文档齐全**：每个 Phase 都有问题记录和测试报告
6. **Nginx 配置**：Gzip、安全头、SPA fallback、健康检查一应俱全

---

## ⚠️ 剩余关键风险

1. **Issue #07（CI/CD）会导致部署必然失败**：Docker 镜像无法传送到服务器，必须在正式部署前修复
2. **Issue #04（URL 设计）影响 SEO**：当前 `/concept?id=rag` 不利于搜索引擎收录
3. **Issue #10（移动端）**：图谱在移动设备上固定 1400px 宽度会导致溢出

---

> **文档位置**: `docs/issue-analysis/`
> **构建状态**: ✅ `npm run build` 通过
> **运行验证**: ✅ `npm start` 图谱渲染正常
> **下一步**: 修复剩余 4 个问题（#04 URL 设计、#05 路由、#07 CI/CD、#10 移动端）
