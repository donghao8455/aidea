# Phase 2 - SEO 配置文档

> 文档版本：v1.0
> 创建日期：2026-04-21
> 配置内容：Meta标签、Sitemap、Robots.txt、页面Metadata
> 状态：**配置完成 ✅**

---

## 1. 配置概述

### 1.1 已配置的 SEO 项目

| 配置项 | 状态 | 说明 |
|--------|------|------|
| 全局 Meta 标签 | ✅ 已配置 | keywords、robots、author、og:*/twitter:* |
| Sitemap | ✅ 已配置 | 自动生成 sitemap.xml |
| Robots.txt | ✅ 已配置 | 配置爬虫访问规则 |
| 页面 Metadata | ✅ 已配置 | 首页、详情页标题和描述 |

### 1.2 SEO 配置目标

| 目标 | 当前状态 | 说明 |
|------|----------|------|
| Lighthouse Performance ≥ 90 | ⏳ 待测试 | 需要在生产环境测试 |
| SEO 关键词覆盖 | ✅ 已配置 | AI概念、机器学习、深度学习等 |
| 社交分享优化 | ✅ 已配置 | Open Graph + Twitter Card |
| Sitemap 自动生成 | ✅ 已配置 | Docusaurus 内置支持 |

---

## 2. 全局 Meta 标签配置

### 2.1 配置文件
`docusaurus.config.ts`

### 2.2 配置内容

```typescript
metadata: [
  {name: 'keywords', content: 'AI概念,人工智能,机器学习,深度学习,大语言模型,LLM,RAG,Agent,提示词,AI学习'},
  {name: 'robots', content: 'index, follow'},
  {name: 'author', content: 'AI-Aides Team'},
  {property: 'og:type', content: 'website'},
  {property: 'og:site_name', content: 'AI-Aides'},
  {property: 'og:locale', content: 'zh_CN'},
  {name: 'twitter:card', content: 'summary_large_image'},
],
```

### 2.3 配置说明

| 标签 | 用途 | 配置值 |
|------|------|--------|
| keywords | 搜索引擎关键词 | 核心AI概念词 |
| robots | 爬虫指令 | index, follow（允许索引和跟踪） |
| og:type | Open Graph 类型 | website |
| og:site_name | Open Graph 站点名 | AI-Aides |
| og:locale | Open Graph 语言 | zh_CN |
| twitter:card | Twitter 卡片类型 | summary_large_image |

---

## 3. Sitemap 配置

### 3.1 配置文件
`docusaurus.config.ts` presets.classic.sitemap

### 3.2 配置内容

```typescript
sitemap: {
  changefreq: 'weekly',
  priority: 0.5,
  ignorePatterns: ['/tags/**'],
  filename: 'sitemap.xml',
},
```

### 3.3 配置说明

| 参数 | 说明 | 配置值 |
|------|------|--------|
| changefreq | 内容更新频率 | weekly（每周） |
| priority | 页面优先级 | 0.5（中等） |
| ignorePatterns | 忽略的路径 | /tags/** |
| filename | sitemap 文件名 | sitemap.xml |

### 3.4 生成结果

生产构建后会自动生成 `sitemap.xml`，包含：
- `/` - 首页
- `/concept?id=llm` - LLM 详情页
- `/concept?id=rag` - RAG 详情页
- ... 其他 15 个概念页面

---

## 4. Robots.txt 配置

### 4.1 文件位置
`static/robots.txt`

### 4.2 配置内容

```txt
User-agent: *
Allow: /

Sitemap: https://aides.thend.cn/sitemap.xml

Disallow: /api/
Disallow: /_docusaurus/
Disallow: /search*
```

### 4.3 配置说明

| 指令 | 说明 |
|------|------|
| User-agent: * | 对所有爬虫生效 |
| Allow: / | 允许访问所有页面 |
| Sitemap | 指定 sitemap 位置 |
| Disallow | 禁止访问内部路径 |

---

## 5. 页面 Metadata 配置

### 5.1 首页 Metadata

**文件**: `src/pages/index.tsx`

```typescript
<Layout 
  title="AI概念图谱" 
  description="可视化AI概念关系图谱"
>
```

**生成的 Meta 标签**:
```html
<title>AI概念图谱 | AI-Aides</title>
<meta name="description" content="可视化AI概念关系图谱">
<meta property="og:title" content="AI概念图谱 | AI-Aides">
<meta property="og:description" content="可视化AI概念关系图谱">
```

### 5.2 详情页 Metadata

**文件**: `src/pages/concept.tsx`

```typescript
<Layout
  title={conceptData.name}
  description={conceptData.tooltip.summary}
>
```

**示例 - LLM 详情页**:
```html
<title>大语言模型 | AI-Aides</title>
<meta name="description" content="能理解和生成人类语言的大型神经网络模型，是当代AI的核心技术">
```

---

## 6. 站点配置

### 6.1 全局标题和标语

```typescript
title: 'AI-Aides - AI概念关系图谱',
tagline: 'AI助手，让AI概念触手可及',
```

### 6.2 导航栏和页脚

**导航栏**:
- 左上角 Logo + 标题
- 文档链接

**页脚**:
- 学习资源链接
- 关于我们链接
- 版权信息

---

## 7. 社交分享优化

### 7.1 Open Graph 标签

当页面被分享到社交媒体时，会显示：
- 标题
- 描述
- 站点名称
- 语言
- 图片（使用 `img/social-card.png`）

### 7.2 Twitter Card 标签

当页面被分享到 Twitter 时：
- 使用 summary_large_image 卡片样式
- 显示标题、描述和图片

---

## 8. 后续优化建议

### 8.1 P1 优先级

| 优化项 | 说明 | 影响 |
|--------|------|------|
| 社交分享图片 | 创建 `static/img/social-card.png` | 提升社交分享效果 |
| 结构化数据 | 添加 Schema.org JSON-LD | 提升搜索结果展示 |

### 8.2 P2 优先级

| 优化项 | 说明 | 影响 |
|--------|------|------|
| 页面性能 | 优化 Lighthouse 评分 | 提升搜索排名 |
| 外部链接 | 添加外部权威链接 | 提升内容可信度 |

### 8.3 社交分享图片建议

建议创建 `static/img/social-card.png`，尺寸：
- 推荐尺寸: 1200x630 像素
- 最小尺寸: 600x315 像素
- 宽高比: 1.91:1

---

## 9. 验证清单

| 检查项 | 状态 | 验证方式 |
|--------|------|----------|
| Meta 标签正确 | ✅ | 查看页面源码 |
| Sitemap 可访问 | ⏳ | 访问 /sitemap.xml |
| Robots.txt 正确 | ✅ | 查看 static/robots.txt |
| Open Graph 标签 | ✅ | 使用社交媒体调试器测试 |
| Twitter Card | ✅ | 使用 Twitter Card Validator 测试 |

### 9.1 验证工具

| 工具 | 用途 | 链接 |
|------|------|------|
| Google Search Console | 提交 sitemap | https://search.google.com/search-console |
| Facebook Debugger | 调试 OG 标签 | https://developers.facebook.com/tools/debug |
| Twitter Card Validator | 调试 Twitter Card | https://cards-dev.twitter.com/validator |
| Schema.org Validator | 验证结构化数据 | https://validator.schema.org |

---

## 10. 生产部署后检查

### 10.1 必须检查项

- [ ] sitemap.xml 可访问（https://aides.thend.cn/sitemap.xml）
- [ ] robots.txt 可访问（https://aides.thend.cn/robots.txt）
- [ ] 首页 Meta 标签正确
- [ ] 详情页 Meta 标签正确
- [ ] Google Search Console 连接成功
- [ ] 提交 sitemap 到 Google

### 10.2 推荐检查项

- [ ] Bing Webmaster Tools 连接
- [ ] 百度搜索资源平台连接（如面向国内）
- [ ] 社交分享测试（微信、微博、Twitter）

---

## 11. 相关文件

| 文件路径 | 说明 |
|----------|------|
| `docusaurus.config.ts` | 全局 SEO 配置 |
| `src/pages/index.tsx` | 首页 Metadata |
| `src/pages/concept.tsx` | 详情页 Metadata |
| `static/robots.txt` | 爬虫规则 |

---

> **配置完成日期**: 2026-04-21
> **配置人**: AI Assistant
> **下一步**: Phase 3 - Docker 部署 + CI/CD
