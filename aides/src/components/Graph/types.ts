/**
 * 图谱组件的类型定义
 *
 * 数据来源：从 @site/src/data/allConcepts 派生
 * 不要在此文件中硬编码概念或关系数据，统一由 allConcepts.ts 管理
 */

/** 图谱节点使用的简化概念数据 */
export interface ConceptData {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  difficulty: number;
  tags: string[];
  tooltip: {
    summary: string;
  };
}

/** 关系数据 */
export interface RelationData {
  source: string;
  target: string;
  label: string;
}
