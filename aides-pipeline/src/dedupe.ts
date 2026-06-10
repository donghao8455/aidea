/**
 * 简单去重：标题相似度 ≥ 80% 视为重复
 * 用快速子串匹配 + 字符 n-gram
 */

import type {NewsItem} from './sources/hacker-news.js';

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9一-龥]/g, '');
}

function similarity(a: string, b: string): number {
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  if (na.length === 0 || nb.length === 0) return 0;
  // 短串视为子串
  if (na.length < nb.length ? nb.includes(na) : na.includes(nb)) return 0.9;
  // 字符 Jaccard 相似度
  const setA = new Set(na);
  const setB = new Set(nb);
  let intersection = 0;
  for (const ch of setA) if (setB.has(ch)) intersection++;
  return intersection / (setA.size + setB.size - intersection);
}

export function dedupeNews(items: NewsItem[], threshold = 0.8): NewsItem[] {
  const result: NewsItem[] = [];
  for (const item of items) {
    const isDuplicate = result.some(existing => similarity(existing.title, item.title) >= threshold);
    if (!isDuplicate) {
      result.push(item);
    }
  }
  return result;
}
