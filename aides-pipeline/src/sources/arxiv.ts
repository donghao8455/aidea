/**
 * arXiv 采集器
 * 限量 5-10 篇/天，仅 cs.AI + cs.CL
 */

const ARXIV_API = 'http://export.arxiv.org/api/query';

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

export async function fetchArxiv(limit = 8): Promise<NewsItem[]> {
  // 仅取最新 8 篇 cs.AI + cs.CL
  const query = encodeURIComponent('cat:cs.AI OR cat:cs.CL');
  const url = `${ARXIV_API}?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=${limit}`;

  try {
    const resp = await fetch(url, {
      headers: {'User-Agent': 'aides-pipeline/0.1'},
    });
    if (!resp.ok) throw new Error(`arXiv API ${resp.status}`);
    const xml = await resp.text();
    return parseArxivXml(xml);
  } catch (err) {
    console.warn('[arxiv] fetch failed:', (err as Error).message);
    return [];
  }
}

function parseArxivXml(xml: string): NewsItem[] {
  const items: NewsItem[] = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  const titleRegex = /<title>([\s\S]*?)<\/title>/;
  const idRegex = /<id>([\s\S]*?)<\/id>/;
  const publishedRegex = /<published>([\s\S]*?)<\/published>/;
  const summaryRegex = /<summary>([\s\S]*?)<\/summary>/;

  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const titleMatch = titleRegex.exec(entry);
    const idMatch = idRegex.exec(entry);
    const publishedMatch = publishedRegex.exec(entry);
    const summaryMatch = summaryRegex.exec(entry);

    if (!titleMatch || !idMatch || !publishedMatch) continue;

    const title = titleMatch[1].trim().replace(/\s+/g, ' ');
    const arxivId = idMatch[1].trim();
    const published = new Date(publishedMatch[1].trim()).getTime();
    const summary = summaryMatch ? summaryMatch[1].trim().replace(/\s+/g, ' ').substring(0, 200) : '';

    items.push({
      id: `arxiv-${arxivId.split('/').pop()}`,
      title,
      url: arxivId,
      source: 'arXiv',
      sourceIcon: '📚',
      timestamp: published,
      category: 'research' as const,
      qualityScore: 7,
      summary: summary + '...',
    });
  }
  return items;
}
