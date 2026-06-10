/**
 * LLM 处理（方案 B）
 * 使用国产大模型（OpenAI 兼容端点）对新闻进行分类、摘要、关联概念标注、质量评分
 *
 * 必需环境变量：
 *   LLM_API_KEY  - API 密钥
 *   LLM_BASE_URL - 端点 URL（如 https://api.deepseek.com/v1）
 *   LLM_MODEL    - 模型名（如 deepseek-chat）
 *
 * 如果环境变量缺失，整个步骤安全跳过
 */

import {readFileSync, writeFileSync, existsSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import OpenAI from 'openai';
import {conceptIds} from './concept-ids.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const NEWS_JSON = resolve(__dirname, '../../aides/static/data/ai-news.json');

const SYSTEM_PROMPT = `你是一个 AI 领域新闻编辑。对新闻数组进行批处理，每条返回 JSON 字段。

字段要求：
- skip: bool - 与 AI 无关则 true
- category: 'tech' | 'industry' | 'research' | 'tool' 之一
- summary: 中文摘要，50 字以内
- relatedConcepts: string[] - 关联的概念 ID（从给定列表选 0-3 个）
- qualityScore: 1-10 整数（是否重大新闻）`;

const USER_PROMPT = `概念 ID 列表: ${JSON.stringify(conceptIds)}

请处理以下新闻（JSON 数组），每条返回对象 {skip, category, summary, relatedConcepts, qualityScore}：

%s`;

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceIcon: string;
  timestamp: number;
  category: string;
  summary?: string;
  relatedConcepts?: string[];
  qualityScore?: number;
}

async function main() {
  if (!process.env.LLM_API_KEY || !process.env.LLM_BASE_URL) {
    console.log('[processor] LLM_API_KEY or LLM_BASE_URL not set, skipping LLM processing');
    return;
  }

  if (!existsSync(NEWS_JSON)) {
    console.error(`[processor] ${NEWS_JSON} not found, run collect first`);
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(NEWS_JSON, 'utf8')) as {items: NewsItem[]};
  console.log(`[processor] Processing ${data.items.length} items with LLM...`);

  const client = new OpenAI({
    apiKey: process.env.LLM_API_KEY,
    baseURL: process.env.LLM_BASE_URL,
  });
  const model = process.env.LLM_MODEL || 'deepseek-chat';

  // 批量处理（每次 10 条）
  const batchSize = 10;
  for (let i = 0; i < data.items.length; i += batchSize) {
    const batch = data.items.slice(i, i + batchSize);
    const newsJson = JSON.stringify(batch.map(b => ({id: b.id, title: b.title})), null, 2);
    try {
      const resp = await client.chat.completions.create({
        model,
        messages: [
          {role: 'system', content: SYSTEM_PROMPT},
          {role: 'user', content: USER_PROMPT.replace('%s', newsJson)},
        ],
        response_format: {type: 'json_object'},
        temperature: 0.3,
      });
      const content = resp.choices[0]?.message?.content || '{}';
      // 解析 LLM 返回（可能是 {results: [...]} 或 [...]）
      let results: Array<{id?: string; skip?: boolean; category?: string; summary?: string; relatedConcepts?: string[]; qualityScore?: number}>;
      try {
        const parsed = JSON.parse(content);
        results = Array.isArray(parsed) ? parsed : (parsed.results || []);
      } catch {
        console.warn(`[processor] Failed to parse LLM response for batch ${i}`);
        continue;
      }

      // 应用 LLM 结果
      for (const r of results) {
        if (!r.id) continue;
        const item = data.items.find(d => d.id === r.id);
        if (!item) continue;
        if (r.skip) continue; // skip 的不处理（保留原文）
        if (r.category) item.category = r.category;
        if (r.summary) item.summary = r.summary;
        if (Array.isArray(r.relatedConcepts)) item.relatedConcepts = r.relatedConcepts;
        if (typeof r.qualityScore === 'number') item.qualityScore = r.qualityScore;
      }
    } catch (err) {
      console.warn(`[processor] LLM call failed for batch ${i}:`, (err as Error).message);
    }
  }

  // 写回
  writeFileSync(NEWS_JSON, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[processor] Updated ${NEWS_JSON} with LLM annotations`);
}

main().catch(err => {
  console.error('[processor] FATAL:', err);
  process.exit(1);
});
