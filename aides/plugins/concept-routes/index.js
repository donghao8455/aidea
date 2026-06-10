/**
 * Docusaurus 概念路由插件
 *
 * 在 build 阶段为每个概念 ID 注册一个独立路由：
 *   /concepts/:id  → 静态预渲染的概念详情页
 *   /concept       → 旧 URL 重定向 shim
 *
 * 用 .js 而非 .ts 避免插件加载时的 TypeScript 编译依赖
 */

const path = require('path');

module.exports = function plugin(_context, _options) {
  return {
    name: 'concept-routes',

    contentLoaded({actions}) {
      // 加载概念列表 — 尝试从 graphData 读取 conceptOrder，
      // 失败则从 allConcepts 提取
      let conceptIds = [];
      try {
        // Docusaurus 编译时 @site alias 指向 aides/src
        // 但 plugin 在 Node 环境中加载（无 webpack），直接用相对路径 require
        const graphDataPath = path.resolve(
          __dirname,
          '..', '..', 'src', 'data', 'graphData'
        );
        // graphData.ts 是 TS 文件，require 不能直接加载；
        // 改为读取编译后的 .d.ts 提取，或通过 docusaurus runtime 加载
        // 简化：直接 hardcoded 39 个 concept IDs（与 graphData.ts 同步）
        // 实际项目应该从外部 manifest 加载，这里从 static manifest 读取
        const manifestPath = path.resolve(
          __dirname,
          '..', '..', 'src', 'data', 'concepts', 'manifest.json'
        );
        try {
          const fs = require('fs');
          const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
          conceptIds = manifest.conceptIds || [];
        } catch (manifestErr) {
          console.warn('[concept-routes] manifest.json not found, using fallback list');
        }
      } catch (err) {
        console.warn('[concept-routes] Failed to load concept list:', err.message);
      }

      // 兜底：硬编码的 39 个概念 ID（与 graphData.ts 同步）
      if (conceptIds.length === 0) {
        conceptIds = [
          'llm', 'prompt', 'tokenizer', 'temperature', 'embedding', 'vector-db',
          'fine-tuning', 'prompt-engineering', 'chain-of-thought', 'rag', 'agent',
          'ai-gateway', 'mcp', 'tool-calling', 'multi-agent', 'reasoning', 'rlvr',
          'test-time-compute', 'react', 'vibe-coding', 'computer-use', 'agentic-ai',
          'transformer', 'attention', 'deep-learning', 'neural-network',
          'machine-learning', 'rlhf', 'lora', 'quantization', 'nlp',
          'computer-vision', 'gan', 'dpo', 'few-shot-learning', 'moe',
          'function-calling', 'langchain', 'a2a'
        ];
      }

      // 校验 concept ID 格式（防御性 — 防止注入到路由路径）
      const validIdRegex = /^[a-z0-9-]+$/;
      const safeIds = conceptIds.filter(id => validIdRegex.test(id));

      console.log(`[concept-routes] Registering ${safeIds.length} concept routes`);

      // 为每个概念添加路由
      // 注意：每个 concept 都注册一个唯一的 page module
      // Docusaurus 会为每个路径生成独立 HTML
      for (const id of safeIds) {
        actions.addRoute({
          path: `/concepts/${id}`,
          component: '@site/src/pages/concept-page',  // 占位组件（实际渲染由 page module 提供）
          exact: true,
          modules: {
            conceptData: `@site/src/data/concepts/${id}`,
          },
        });
      }

      // 添加旧 URL 重定向 shim 路由
      actions.addRoute({
        path: '/concept',
        exact: true,
        component: '@site/src/pages/concept-redirect',
      });

      // 索引页：列出所有概念
      actions.addRoute({
        path: '/concepts',
        exact: true,
        component: '@site/src/pages/concepts-index',
      });
    },
  };
};
