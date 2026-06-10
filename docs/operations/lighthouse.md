# Lighthouse 性能验证

**目标**：桌面端和移动端 Lighthouse 评分均 > 90

## 验证流程

### 1. 启动本地构建

```bash
cd aides
npm run build
npm run serve &
SERVE_PID=$!
sleep 5
```

### 2. 安装并运行 Lighthouse

```bash
npm install -g lighthouse

# 桌面端验证
lighthouse http://localhost:3000 \
  --preset=desktop \
  --output=json \
  --output-path=./lighthouse-desktop.json \
  --chrome-flags="--headless --no-sandbox"

# 移动端验证
lighthouse http://localhost:3000 \
  --output=json \
  --output-path=./lighthouse-mobile.json \
  --chrome-flags="--headless --no-sandbox"
```

### 3. 提取分数

```bash
node -e "
const d = require('./lighthouse-desktop.json');
const m = require('./lighthouse-mobile.json');
console.log('Desktop Performance:', d.categories.performance.score * 100);
console.log('Mobile Performance:', m.categories.performance.score * 100);
"
```

### 4. 验收

| 指标 | 桌面端 | 移动端 |
|------|--------|--------|
| Performance | ≥ 90 | ≥ 90 |
| Accessibility | ≥ 90 | ≥ 90 |
| Best Practices | ≥ 90 | ≥ 90 |
| SEO | ≥ 90 | ≥ 90 |

## 已知约束

- X6 全局脚本（572KB）影响首屏 JS 体积
- 39 个概念详情页面，每个 ~8KB 静态 HTML

## 不达标的处理

本计划不包含性能优化。如果 Lighthouse 评分 < 90：
1. 识别瓶颈（X6 包大小、字体加载、图像优化等）
2. 记录到 Phase 5+ 或 v2 路线图
3. 暂以当前性能上线

## 验证命令快捷方式

`package.json` 已包含：
```json
"scripts": {
  "lighthouse": "lighthouse http://localhost:3000 --view"
}
```

可执行 `npm run lighthouse` 在浏览器中查看详细报告。
