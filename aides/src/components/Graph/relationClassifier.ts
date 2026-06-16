/**
 * 关系类型分类器
 *
 * 将 graphData.ts 中 33 种关系 label 归类为 4 种语义类型：
 * - hierarchical: 组成/继承（属于、包含、子领域…）
 * - dependency:   依赖/驱动（依赖、驱动、训练…）
 * - similar:      相似/类比（同义、优化、轻量化…）
 * - applied:      应用/扩展（使用、扩展、基于…）
 *
 * 未匹配的 label 默认归为 applied。
 *
 * 该模块零依赖、可纯函数调用，便于后续单测。
 */

export type RelationType = 'hierarchical' | 'dependency' | 'similar' | 'applied';

export interface RelationStyle {
  /** 边线颜色（激活态） */
  stroke: string;
  /** SVG dasharray（空字符串 = 实线） */
  dasharray: string;
  /** 中部边标签文字颜色（激活态） */
  labelFill: string;
  /** 中部边标签文字颜色（淡化态，用于搜索/筛选时） */
  labelFillDim: string;
}

/**
 * 4 种关系类型的视觉编码
 * 颜色选择参考项目已有的分类色系（基础/技术/方法/架构/工具），
 * 避免与分类色重叠：使用与分类色相近但更深的色调。
 */
export const RELATION_STYLES: Record<RelationType, RelationStyle> = {
  hierarchical: {stroke: '#5B5FC7', dasharray: '',        labelFill: '#5B5FC7', labelFillDim: '#C7CAE8'},
  dependency:   {stroke: '#00A86B', dasharray: '5,3',     labelFill: '#00A86B', labelFillDim: '#A8E8C9'},
  similar:      {stroke: '#E68A00', dasharray: '2,2',     labelFill: '#E68A00', labelFillDim: '#FFD9A8'},
  applied:      {stroke: '#D81B60', dasharray: '8,3,2,3', labelFill: '#D81B60', labelFillDim: '#F5B6CB'},
};

/**
 * label → 关系类型映射表
 * 涵盖 graphData.ts 中所有 33 种不同 label（grep 统计）。
 * 添加新关系类型时，仅需在此追加映射即可。
 */
const LABEL_MAP: Record<string, RelationType> = {
  // 组成/继承（hierarchical）
  属于: 'hierarchical',
  包含: 'hierarchical',
  包含多个: 'hierarchical',
  子领域: 'hierarchical',
  是: 'hierarchical',
  是基础: 'hierarchical',
  架构: 'hierarchical',
  构建: 'hierarchical',
  框架: 'hierarchical',

  // 依赖/驱动（dependency）
  依赖: 'dependency',
  驱动: 'dependency',
  受控于: 'dependency',
  通过: 'dependency',
  训练: 'dependency',
  输入处理: 'dependency',
  通过MCP连接: 'dependency',
  存储到: 'dependency',

  // 相似/类比（similar）
  同义: 'similar',
  类比: 'similar',
  轻量化: 'similar',
  可扩展: 'similar',
  改进: 'similar',
  优化: 'similar',
  内化: 'similar',

  // 应用/扩展（applied）
  使用: 'applied',
  扩展: 'applied',
  用于: 'applied',
  应用: 'applied',
  基于: 'applied',
  协议: 'applied',
  增强: 'applied',
  协调: 'applied',
  通信: 'applied',
  实现: 'applied',
};

/**
 * 将关系 label 分类为 4 种语义类型之一。
 * 未匹配的 label 返回 'applied'（应用/扩展），作为合理兜底。
 */
export function classifyRelation(label: string): RelationType {
  return LABEL_MAP[label] ?? 'applied';
}
