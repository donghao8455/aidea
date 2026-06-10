/**
 * 机器之心 RSS 采集器
 * 优先尝试官方 RSS，失败则返回空数组
 */

import Parser from 'rss-parser';
import type {NewsItem} from './hacker-news.js';

const JIQIZHIXIN_RSS = 'https://www.jiqizhixin.com/rss';

export async function fetchJiqizhixin(limit = 8): Promise<NewsItem[]> {
  const parser = new Parser({timeout: 10000});
  try {
    const feed = await parser.parseURL(JIQIZHIXIN_RSS);
    return feed.items.slice(0, limit).map((item, idx) => ({
      id: `jqzx-${item.guid || idx}`,
      title: item.title || '无标题',
      url: item.link || '',
      source: '机器之心',
      sourceIcon: '🤖',
      timestamp: item.pubDate ? new Date(item.pubDate).getTime() : Date.now(),
      category: 'industry' as const,
      qualityScore: 7,
      summary: (item.contentSnippet || item.content || '').substring(0, 150),
    })).filter(i => i.url);
  } catch (err) {
    console.warn('[jiqizhixin] RSS fetch failed (URL may be invalid):', (err as Error).message);
    return [];
  }
}
