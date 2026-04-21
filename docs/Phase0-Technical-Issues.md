# Phase 0 技术问题总结

> 文档版本：v1.0
> 创建日期：2026-04-21
> 状态：初稿

---

## 1. 问题列表

### 问题 1：pnpm 安装权限错误

**问题描述**：
```
npm error EPERM: operation not permitted, mkdir
'D:\A-donghao\MyNode\nvm\v24.14.1\node_modules\pnpm'
```

**根本原因**：
- Node 版本管理器（nvm）目录权限受限
- corepack enable 操作被沙盒安全策略阻止

**影响范围**：
- 无法使用 pnpm v8.x 作为包管理器

**解决方案**：
- **实际采用**：改用 npm 作为包管理器
- 备选方案：使用 Yarn（未测试）
- 备选方案：配置 pnpm 到用户目录（未测试）

**经验教训**：
- 包管理器的选择应考虑开发环境限制
- npm 作为 Node 内置工具，兼容性更好

---

### 问题 2：AntV X6 ESM 模块导入失败

**问题描述**：
```
Module not found: Can't resolve './graph' in 'node_modules/@antv/x6/es'
The extension in the request is mandatory for it to be resolved as fully specified
```

**根本原因**：
- AntV X6 v2.x 的 ESM 模块导出方式与 Docusaurus (Rspack) 的模块解析不兼容
- ESM 模块要求文件扩展名，而构建工具未正确处理

**尝试的解决方案**：

| 方案 | 结果 | 说明 |
|------|------|------|
| `import {Graph} from '@antv/x6'` | ❌ 失败 | ESM 解析错误 |
| `import {Graph} from '@antv/x6/lib/graph'` | ❌ 失败 | 同样 ESM 问题 |
| 动态导入 `await import('@antv/x6')` | ❌ 失败 | 同样问题 |
| CDN 远程加载 `<script src="https://unpkg.com/...">` | ❌ 失败 | ORB 安全策略阻止 |

**最终解决方案**：
- 将 AntV X6 UMD 版本下载到本地 `static/` 目录
- 在 `docusaurus.config.ts` 中配置本地脚本加载
- 通过 `window.X6` 全局对象访问 API

**关键代码**：

```typescript
// docusaurus.config.ts
scripts: [
  {
    src: '/x6.min.js',
    position: 'head',
  },
],
```

```typescript
// GraphCanvas.tsx
declare global {
  interface Window {
    X6: any;
  }
}

// 使用时
if (window.X6) {
  const {Graph} = window.X6;
  // ...
}
```

**经验教训**：
- 第三方库集成前应先验证 ESM 兼容性
- UMD 版本通常更易于集成到各种构建环境
- CDN + 沙盒浏览器安全策略可能阻止脚本执行

---

### 问题 3：ORB (Opaque Response Blocking) 阻止 CDN 脚本

**问题描述**：
```
net::ERR_BLOCKED_BY_ORB https://unpkg.com/@antv/x6@2.18.0/dist/x6.js
```

**根本原因**：
- 浏览器的安全机制 ORB 会阻止某些跨域脚本加载
- 特别是从 CDN 动态加载的脚本

**解决方案**：
- 使用本地文件代替 CDN（见问题2）

**经验教训**：
- 生产环境应将所有依赖打包到项目中
- 避免依赖外部 CDN（可用性、安全性、性能）

---

### 问题 4：Docusaurus 配置脚本语法错误

**问题描述**：
```
ParseError: Unexpected token
```

**根本原因**：
- 配置文件语法错误导致解析失败

**解决方案**：
- 使用标准的 Docusaurus 配置格式
- 注意 TypeScript 类型注解的正确性

**经验教训**：
- 修改配置文件后应立即验证服务器启动

---

## 2. 技术决策记录

### 决策 1：包管理器选择

| 选项 | 状态 | 说明 |
|------|------|------|
| pnpm | ❌ 放弃 | 权限问题无法安装 |
| npm | ✅ 采用 | Node 内置，兼容性最好 |
| Yarn | 未测试 | - |

### 决策 2：AntV X6 集成方式

| 选项 | 状态 | 说明 |
|------|------|------|
| npm 包 ESM 导入 | ❌ 失败 | ESM 兼容性问题 |
| CDN 动态加载 | ❌ 失败 | ORB 安全策略 |
| 本地 UMD 文件 | ✅ 成功 | 最终采用方案 |

---

## 3. 后续优化建议

### 3.1 短期（Phase 1）

- 尝试修复 AntV X6 的 ESM 导入问题（可能需要配置 Rspack）
- 考虑使用 Vis.js 或 D3.js 作为备选图谱库

### 3.2 长期

- 将 AntV X6 打包到项目依赖中（避免 CDN）
- 考虑 SSR 方案优化首屏加载
- 添加图谱性能监控

---

## 4. 相关文件

| 文件路径 | 说明 |
|---------|------|
| `aides/docusaurus.config.ts` | Docusaurus 配置（含 X6 脚本加载） |
| `aides/src/components/Graph/` | 图谱组件目录 |
| `aides/src/components/Graph/GraphCanvas.tsx` | 图谱画布组件 |
| `aides/src/components/Graph/types.ts` | 测试数据定义 |
| `aides/static/x6.min.js` | AntV X6 UMD 文件 |

---

## 5. 验证清单

### 5.1 Phase 0 PoC 验证

- [x] Docusaurus 项目初始化成功
- [x] 开发服务器正常启动
- [x] AntV X6 本地加载成功
- [x] 图谱渲染 5 个测试节点
- [x] 节点缩放功能正常 (0.5x - 3x)
- [x] 画布拖拽功能正常
- [x] 节点颜色按类别区分

---

> **更新记录**：
> - 2026-04-21：初始版本
