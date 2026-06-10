/**
 * Hacker News 采集器
 * 使用 Algolia HN Search API 筛选 AI 相关热门
 */

const HN_API = 'https://hn.algolia.com/api/v1/search_by_date';

const AI_KEYWORDS = [
  'AI', 'LLM', 'GPT', 'Claude', 'Gemini', 'Llama', 'Mistral',
  'RAG', 'Agent', 'MCP', 'embedding', 'transformer', 'attention',
  'machine learning', 'deep learning', 'neural network',
  'reinforcement learning', 'RLHF', 'fine-tuning', 'prompt',
  'diffusion', 'generative', 'openai', 'anthropic', 'google',
  'meta', 'mistral', 'huggingface', 'langchain', 'vector db',
];

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceIcon: string;
  timestamp: number;
  category: 'tech' | 'industry' | 'research' | 'tool';
  relatedConcepts?: string[];
  qualityScore?: number;
  summary?: string;
}

export async function fetchHackerNews(limit = 10): Promise<NewsItem[]> {
  const query = AI_KEYWORDS.slice(0, 4).join(' OR ');
  const url = `${HN_API}?query=${encodeURIComponent(query)}&tags=story&numericFilters=points>10&hitsPerPage=${limit}`;

  try {
    const resp = await fetch(url, {
      headers: {'User-Agent': 'aides-pipeline/0.1'},
    });
    if (!resp.ok) throw new Error(`HN API ${resp.status}`);
    const data = await resp.json() as {hits: Array<{objectID: string; title: string; url?: string; story_text?: string; points: number; created_at_i: number; _tags: string[]}>};
    return data.hits
      .filter(h => h.title && (h.url || h.story_text))
      .map(h => ({
        id: `hn-${h.objectID}`,
        title: h.title,
        url: h.url || `https://news.ycombinator.com/item?id=${h.objectID}`,
        source: 'Hacker News',
        sourceIcon: '🔶',
        timestamp: h.created_at_i * 1000,
        category: 'tech' as const,
        qualityScore: Math.min(10, Math.floor(h.points / 5) + 5),
      }));
  } catch (err) {
    console.warn('[hacker-news] fetch failed:', (err as Error).message);
    return [];
  }
}
