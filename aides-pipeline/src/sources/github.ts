/**
 * GitHub 采集器
 * 使用 Search API（无官方 Trending API）按 topic 查询
 */

import type {NewsItem} from './hacker-news.js';

const GH_API = 'https://api.github.com/search/repositories';

export async function fetchGithub(limit = 10): Promise<NewsItem[]> {
  // 查询最近创建的、stars 高的 AI 相关仓库
  const date = new Date();
  date.setDate(date.getDate() - 14); // 最近 14 天
  const dateStr = date.toISOString().split('T')[0];
  const query = `topic:llm OR topic:ai-agent OR topic:rag created:>${dateStr}`;
  const url = `${GH_API}?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${limit}`;

  try {
    const resp = await fetch(url, {
      headers: {
        'User-Agent': 'aides-pipeline/0.1',
        'Accept': 'application/vnd.github+json',
      },
    });
    if (!resp.ok) throw new Error(`GitHub API ${resp.status}: ${await resp.text()}`);
    const data = await resp.json() as {items: Array<{id: number; full_name: string; description: string; html_url: string; stargazers_count: number; created_at: string}>};
    return data.items.map(r => ({
      id: `gh-${r.id}`,
      title: r.full_name,
      url: r.html_url,
      source: 'GitHub',
      sourceIcon: '⭐',
      timestamp: new Date(r.created_at).getTime(),
      category: 'tool' as const,
      qualityScore: Math.min(10, Math.floor(r.stargazers_count / 100) + 5),
      summary: r.description || '',
    }));
  } catch (err) {
    console.warn('[github] fetch failed:', (err as Error).message);
    return [];
  }
}
