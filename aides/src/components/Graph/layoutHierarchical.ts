import type {ConceptData} from './types';

/**
 * 分层力导向布局算法
 *
 * 保持 5 个分类层的视觉骨架（固定 Y），层内用约束求解避免节点重叠。
 * 确定性算法：无 Math.random，无 Date.now，同输入同输出。
 */

const CANVAS_WIDTH = 1400;
const MIN_NODE_PADDING = 40; // 画布左右各留 40px 边距
const MIN_SPACING = 220; // 节点宽度 160 + 视觉间隔 60
const MAX_ITERATIONS = 30;
const RELAXATION = 0.5;
const NODE_WIDTH = 160;

const CATEGORY_Y: Record<string, number> = {
  basic: 100,
  tech: 280,
  methodology: 460,
  architecture: 640,
  tool: 820,
};

const CATEGORY_ORDER = ['basic', 'tech', 'methodology', 'architecture', 'tool'];

/**
 * 计算分层力导向布局
 * @param nodes 概念节点数组
 * @returns 节点ID到坐标的映射
 */
export function layoutConcepts(nodes: ConceptData[]): Record<string, {x: number; y: number}> {
  const positions: Record<string, {x: number; y: number}> = {};

  if (nodes.length === 0) {
    return positions;
  }

  // Pass 1: 按 category 分组
  const byCategory: Record<string, ConceptData[]> = {};
  for (const cat of CATEGORY_ORDER) {
    byCategory[cat] = [];
  }
  for (const node of nodes) {
    const cat = node.category;
    if (!byCategory[cat]) {
      byCategory[cat] = [];
      console.warn(`[layoutHierarchical] Unknown category "${cat}" for node "${node.id}"`);
    }
    byCategory[cat].push(node);
  }

  // 计算节点中心的合法 X 范围
  const leftCenterX = MIN_NODE_PADDING + NODE_WIDTH / 2; // 40 + 80 = 120
  const rightCenterX = CANVAS_WIDTH - MIN_NODE_PADDING - NODE_WIDTH / 2; // 1400 - 40 - 80 = 1280

  // Pass 2: 每个分类行内进行 X 约束求解
  for (const cat of CATEGORY_ORDER) {
    const catNodes = byCategory[cat];
    if (catNodes.length === 0) continue;

    const y = CATEGORY_Y[cat] ?? 920;

    // 排序确保确定性（按 id 升序）
    const sorted = [...catNodes].sort((a, b) => a.id.localeCompare(b.id));
    const n = sorted.length;

    // 初始均匀分布
    let xs: number[];
    if (n === 1) {
      xs = [(leftCenterX + rightCenterX) / 2]; // 居中于 700
    } else {
      const step = (rightCenterX - leftCenterX) / (n - 1);
      xs = sorted.map((_, i) => leftCenterX + i * step);
    }

    // 约束求解：迭代直到没有重叠或达到最大迭代次数
    for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
      let hasOverlap = false;
      // 检查所有无序对
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dist = Math.abs(xs[i] - xs[j]);
          if (dist < MIN_SPACING) {
            // 需要推开
            hasOverlap = true;
            // 同方向：保持序，均匀推开；反方向：直接对称推开
            const delta = (MIN_SPACING - dist) * RELAXATION;
            if (xs[i] <= xs[j]) {
              xs[i] -= delta / 2;
              xs[j] += delta / 2;
            } else {
              xs[i] += delta / 2;
              xs[j] -= delta / 2;
            }
          }
        }
      }

      // 裁剪到合法范围
      for (let k = 0; k < n; k++) {
        xs[k] = Math.max(leftCenterX, Math.min(rightCenterX, xs[k]));
      }

      if (!hasOverlap) break;
    }

    // 记录位置
    sorted.forEach((node, i) => {
      positions[node.id] = {x: xs[i], y};
    });
  }

  return positions;
}
