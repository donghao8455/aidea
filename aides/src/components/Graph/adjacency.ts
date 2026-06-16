/**
 * 图邻接表工具
 *
 * 用于 B（渐进式披露）：构建反向邻接表 + 选取每类度最高的中心节点。
 *
 * - buildAdjacency: 无向邻接表（source↔target 互为邻居），便于"邻居"直觉对称
 * - getNeighbors: 取出指定 id 的所有 1 跳邻居
 * - getCategoryCenters: 每类取 degree 最高的 1 个概念，作为默认视图的 5 个中心节点
 *
 * 模块零依赖，可在 init 时一次性构建，存为 useRef 供后续 useEffect 读取。
 */

import type {ConceptData, RelationData} from './types';

/**
 * 构建无向邻接表
 * 时间复杂度 O(|relations|)，空间复杂度 O(|concepts|)
 */
export function buildAdjacency(rels: RelationData[]): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  for (const r of rels) {
    if (!adj.has(r.source)) adj.set(r.source, new Set());
    if (!adj.has(r.target)) adj.set(r.target, new Set());
    adj.get(r.source)!.add(r.target);
    adj.get(r.target)!.add(r.source);
  }
  return adj;
}

/**
 * 获取指定节点的 1 跳邻居 id 列表（确定性排序：按 id 字典序）
 */
export function getNeighbors(id: string, adj: Map<string, Set<string>>): string[] {
  return Array.from(adj.get(id) ?? new Set<string>()).sort();
}

/**
 * 选取每类 degree 最高的概念 id，作为默认视图的"分类中心节点"。
 * 不依赖 categoryOrder，按实际数据动态选取；节点扩展时自动适应。
 */
export function getCategoryCenters(
  concepts: ConceptData[],
  degreeMap: Record<string, number>,
): Set<string> {
  const bestPerCategory: Record<string, {id: string; deg: number}> = {};
  for (const c of concepts) {
    const deg = degreeMap[c.id] ?? 0;
    const cur = bestPerCategory[c.category];
    if (!cur || deg > cur.deg) {
      bestPerCategory[c.category] = {id: c.id, deg};
    }
  }
  return new Set(Object.values(bestPerCategory).map(e => e.id));
}
