/**
 * 主采集入口
 * 1. 并行采集 4 个数据源
 * 2. 去重
 * 3. （可选）LLM 处理
 * 4. 写入 static/data/ai-news.json
 */

import {writeFileSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {fetchHackerNews} from './sources/hacker-news.js';
import {fetchArxiv} from './sources/arxiv.js';
import {fetchJiqizhixin} from './sources/jiqizhixin.js';
import {fetchGithub} from './sources/github.js';
import {dedupeNews} from './dedupe.js';
import type {NewsItem} from './sources/hacker-news.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(__dirname, '../../aides/static/data/ai-news.json');

async function main() {
  const t0 = Date.now();
  console.log('[collect] starting parallel collection from 4 sources...');

  // 并行采集
  const [hn, arxiv, jqzx, gh] = await Promise.all([
    fetchHackerNews(10),
    fetchArxiv(8),
    fetchJiqizhixin(8),
    fetchGithub(10),
  ]);

  console.log(`[collect] HN: ${hn.length}, arXiv: ${arxiv.length}, 机器之心: ${jqzx.length}, GitHub: ${gh.length}`);

  const all: NewsItem[] = [...hn, ...arxiv, ...jqzx, ...gh];

  // 去重
  const deduped = dedupeNews(all, 0.8);
  console.log(`[collect] After dedup: ${deduped.length} (from ${all.length})`);

  // 按时间倒序
  deduped.sort((a, b) => b.timestamp - a.timestamp);

  // 限制总数
  const final = deduped.slice(0, 30);

  // 写文件
  mkdirSync(dirname(OUTPUT), {recursive: true});
  writeFileSync(OUTPUT, JSON.stringify({
    items: final,
    generatedAt: new Date().toISOString(),
    source: 'github-action',
    counts: {
      total: final.length,
      hn: hn.length,
      arxiv: arxiv.length,
      jiqizhixin: jqzx.length,
      github: gh.length,
    },
  }, null, 2), 'utf8');

  console.log(`[collect] Wrote ${final.length} items to ${OUTPUT} (${Date.now() - t0}ms)`);
}

main().catch(err => {
  console.error('[collect] FATAL:', err);
  process.exit(1);
});
