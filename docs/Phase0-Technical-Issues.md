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

### 问题 5：Html Webpack Plugin 错误

**问题描述**：
```
Html Webpack Plugin:
Error: The loader "D:\...\dev.html.template.ejs" didn't return html.
```

**根本原因**：
- `docusaurus.config.ts` 中 `scripts` 配置使用了不支持的 `position` 属性
- Docusaurus v3.x 的 scripts 配置格式与之前版本不同

**问题配置**：
```typescript
// ❌ 错误的配置
scripts: [
  {
    src: '/x6.min.js',
    position: 'head',  // 不支持此属性
  },
],
```

**解决方案**：
```typescript
// ✅ 正确的配置
scripts: [
  '/x6.min.js',
],
```

**经验教训**：
- 严格遵循 Docusaurus 配置文档的格式要求
- 升级框架版本时注意配置项的变更
- 错误信息不明确时，应检查最近修改的配置文件

---

### 问题 6：AntV X6 节点点击事件不触发

**问题描述**：
- 点击图谱节点没有触发跳转
- 浏览器控制台无错误信息

**根本原因**：
- 使用节点级别的 `node.on('click', ...)` 事件绑定方式在 AntV X6 中不可靠
- 事件绑定时机或事件冒泡机制问题

**问题代码**：
```typescript
// ❌ 不工作的方式
const node = graph.addNode({...});
node.on('click', () => {
  if (onNodeClick) {
    onNodeClick(concept.id);
  }
});
```

**解决方案**：
```typescript
// ✅ 使用图谱级别的事件监听
graph.on('node:click', ({node}) => {
  const conceptId = node.id;
  console.log('Node clicked:', conceptId);
  if (onNodeClick) {
    onNodeClick(conceptId);
  }
});
```

**经验教训**：
- 优先使用图谱级别的事件监听 (`graph.on('node:click')`) 而非节点级别
- 添加调试日志便于快速定位问题
- 第三方库的示例代码可能需要根据实际场景调整

---

### 问题 7：开发服务器端口冲突

**问题描述**：
```
Error: listen EADDRINUSE: address already in use :::3000
```

**根本原因**：
- 之前的开发服务器进程未正常终止
- 端口 3000 被占用

**解决方案**：
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# 或强制终止所有 node 进程
taskkill /F /IM node.exe
```

**预防措施**：
- 正常关闭开发服务器 (Ctrl+C)
- 配置 package.json 使用不同端口

---

### 问题 8：AntV X6 鼠标悬停事件不触发（Tooltip 实现）

**问题描述**：
- 鼠标悬停在节点上，Tooltip 不显示
- 使用 `graph.on('node:mouseenter', ...)` 无响应
- 使用 `graph.on('cell:mouseenter', ...)` 也无响应
- 浏览器控制台无错误信息

**尝试的解决方案**：

| 方案 | 结果 | 说明 |
|------|------|------|
| `graph.on('node:mouseenter', ...)` | ❌ 失败 | 事件未触发 |
| `graph.on('cell:mouseenter', ...)` | ❌ 失败 | 事件未触发 |
| SVG 原生事件 `mouseover` | ✅ 成功 | 最终采用方案 |

**根本原因**：
- AntV X6 UMD 版本的事件系统可能与 Docusaurus/React 的渲染机制存在冲突
- X6 的 `interacting` 配置或事件委托机制未正确初始化
- 可能是 X6 版本与事件 API 的兼容性问题

**最终解决方案**：
使用 SVG 原生事件监听，通过 `data-cell-id` 属性关联节点：

```typescript
const svgContainer = containerRef.current!.querySelector('svg');

if (svgContainer) {
  svgContainer.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const nodeGroup = target.closest('[data-cell-id]');
    if (!nodeGroup) return;
    
    const cellId = nodeGroup.getAttribute('data-cell-id');
    if (!cellId) return;
    
    const cell = graph.getCellById(cellId);
    if (!cell || !cell.isNode || !cell.isNode()) return;

    const concept = cell.getData()?.concept;
    if (!concept) return;

    // 显示 Tooltip...
  });

  svgContainer.addEventListener('mouseout', (e) => {
    // 隐藏 Tooltip...
  });
}
```

**经验教训**：
- 第三方库的事件系统可能因集成环境而异，需要准备备选方案
- SVG/DOM 原生事件通常更可靠，可作为兜底方案
- 注意 X6 会在 SVG 元素上添加 `data-cell-id` 属性用于标识

---

### 问题 9：Tooltip 容器引用丢失

**问题描述**：
- Tooltip 容器在组件卸载时无法正确清理
- `tooltipContainer` 变量在 cleanup 函数中不可访问

**问题代码**：
```typescript
// ❌ 错误：变量作用域问题
const initGraph = () => {
  const tooltipContainer = document.createElement('div');
  // ...
};

return () => {
  // tooltipContainer 在这里不可访问
  if (tooltipContainer && tooltipContainer.parentNode) {
    tooltipContainer.parentNode.removeChild(tooltipContainer);
  }
};
```

**解决方案**：
```typescript
// ✅ 使用 useRef 保持引用
const tooltipRef = useRef<HTMLDivElement | null>(null);

const initGraph = () => {
  const tooltipContainer = document.createElement('div');
  // ...
  tooltipRef.current = tooltipContainer;
};

return () => {
  if (tooltipRef.current && tooltipRef.current.parentNode) {
    tooltipRef.current.parentNode.removeChild(tooltipRef.current);
    tooltipRef.current = null;
  }
};
```

**经验教训**：
- 在 useEffect 内部创建的变量，cleanup 函数无法直接访问
- 使用 useRef 来保持跨渲染周期的引用
- 组件卸载时及时清理 DOM 元素，避免内存泄漏

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

## 3. 问题分类统计

| 类别 | 数量 | 问题编号 |
|------|------|----------|
| 包管理/环境 | 2 | #1, #7 |
| 第三方库集成 | 5 | #2, #3, #6, #8 |
| 配置错误 | 2 | #4, #5 |
| React/Hook | 1 | #9 |

### 问题根因分析

1. **技术栈兼容性** (44%): ESM/UMD、事件机制、第三方库集成
2. **配置失误** (22%): 文档阅读不仔细、版本变更未注意
3. **环境限制** (22%): 沙盒权限、端口冲突
4. **React 开发经验** (11%): Hook 使用、作用域管理

---

## 4. 后续优化建议

### 4.1 短期（Phase 1）

- [ ] 尝试修复 AntV X6 的 ESM 导入问题（可能需要配置 Rspack）
- [ ] 考虑使用 Vis.js 或 D3.js 作为备选图谱库
- [ ] 添加更多交互事件测试（hover、drag 等）

### 4.2 长期

- [ ] 将 AntV X6 打包到项目依赖中（避免 CDN）
- [ ] 考虑 SSR 方案优化首屏加载
- [ ] 添加图谱性能监控
- [ ] 建立自动化测试覆盖核心交互功能

### 4.3 流程改进

- [ ] 集成第三方库前先进行 PoC 验证
- [ ] 建立代码审查清单（配置变更需验证）
- [ ] 记录常见错误及解决方案到团队 Wiki

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
- [x] 图谱渲染 15 个概念节点
- [x] 节点缩放功能正常 (0.3x - 3x)
- [x] 画布拖拽功能正常
- [x] 节点颜色按类别区分
- [x] 20+ 关系连线渲染
- [x] 分类筛选功能正常
- [x] 搜索高亮功能正常
- [x] 点击节点跳转详情页

### 5.2 待验证项

- [x] 节点悬停 Tooltip
- [ ] 概念详情页内容
- [ ] 移动端适配
- [ ] 性能优化（大数据量）

---

## 6. 核心代码片段

### 6.1 AntV X6 初始化

```typescript
const graph = new Graph({
  container: containerRef.current!,
  width: 1400,
  height: 800,
  background: { color: '#f8fafc' },
  grid: { size: 20, visible: true, type: 'dot' },
  mousewheel: { enabled: true, modifiers: ['ctrl', 'meta'] },
  panning: { enabled: true },
});
```

### 6.2 事件处理最佳实践

```typescript
// ✅ 点击事件 - 使用图谱级别监听
graph.on('node:click', ({node}) => {
  const conceptId = node.id;
  onNodeClick?.(conceptId);
});

// ✅ 悬停事件 - 使用 SVG 原生事件（更可靠）
const svgContainer = containerRef.current!.querySelector('svg');
if (svgContainer) {
  svgContainer.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement;
    const nodeGroup = target.closest('[data-cell-id]');
    if (!nodeGroup) return;
    
    const cellId = nodeGroup.getAttribute('data-cell-id');
    const cell = graph.getCellById(cellId);
    if (cell?.isNode?.()) {
      // 处理节点悬停...
    }
  });
}

// ❌ 不工作的方式
graph.on('node:mouseenter', ({node}) => { ... });  // UMD 版本可能不触发
node.on('click', () => { ... });  // 节点级别事件不可靠
```

---

> **更新记录**：
> - 2026-04-21：初始版本
> - 2026-04-21：补充问题 #5、#6、#7，更新验证清单
> - 2026-04-21：补充问题 #8、#9（Tooltip 实现相关问题），完善事件处理最佳实践
