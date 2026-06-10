# Issue #06: Antd 依赖已安装但未使用 — 增加 Bundle 体积

> **严重级别**: 🟡 中等
> **状态**: ✅ **已修复** (2026-06-07)
> **影响范围**: 构建体积、依赖安全、项目整洁度
> **发现日期**: 2026-06-07
> **涉及文件**:

| 文件 | 路径 | 关键行 |
|------|------|--------|
| package.json | `package.json:24` | `"antd": "^6.3.6"` |

---

## 1. 问题详细描述

### 1.1 package.json 中的 Antd 依赖

```json
// package.json:24
"antd": "^6.3.6",
```

### 1.2 全项目搜索 Antd 使用情况

| 文件 | 导入语句 | 说明 |
|------|---------|------|
| `ConceptNode.tsx:3` | `import {Tooltip} from 'antd';` | 唯一的 antd import |

但 `ConceptNode.tsx` 本身也是**未被使用**的废弃组件（参见 Issue #08），所以实际上 Antd 在整个项目中被使用的组件数量为 **0**。

### 1.3 Antd v6 的体积影响

Antd v6 是一个大型 UI 组件库，虽然 webpack 会进行 Tree Shaking，但：

| 项目 | 估算 |
|------|------|
| antd 包大小（未压缩） | ~30-50 MB（含所有组件和样式） |
| antd 实际进入 bundle | 取决于 Tree Shaking 效果 |
| 安装到 node_modules | 增加磁盘占用和 `npm install` 时间 |

**更关键的是**：即使 Tree Shaking 移除了未使用的代码，antd 的**样式文件**（CSS-in-JS）可能仍然被部分加载。

---

## 2. 次要影响

### 2.1 安全漏洞风险

大型第三方库是安全漏洞的常见来源。`npm audit` 可能因为 antd 的子依赖而报告漏洞，增加维护负担。

### 2.2 与 Docusaurus 的样式冲突

Antd 使用了自己的设计令牌（Design Token）和全局样式，可能与 Docusaurus 的 Infima 框架产生样式冲突：
- 全局 reset 样式
- 字体大小、行高覆盖
- 颜色变量冲突

虽然目前 antd 未被使用所以没有实际冲突，但保留它增加了未来误用时的风险。

### 2.3 概念混淆

其他开发者看到 package.json 中有 antd，可能会在开发新功能时优先选择使用 antd 组件，而非遵循项目约定的 Docusaurus + CSS Modules 方案。这会导致代码风格不统一。

---

## 3. 推荐解决方案

### 直接移除（推荐 ✅）

```bash
npm uninstall antd
```

**如果未来确实需要某些 UI 组件**，优先考虑：
1. Docusaurus 内置的 Infima 组件
2. 自行用 CSS Modules 实现
3. 仅在必要时安装更轻量的替代品（如 `@radix-ui/react-tooltip`）

---

## 4. 实施步骤

| 步骤 | 任务 | 预估工时 |
|------|------|---------|
| 1 | `npm uninstall antd` | 1min |
| 2 | 确认构建无报错 | 5min |
| 3 | 确认 bundle 体积减少 | 5min |

**总预估工时**: ~15min
