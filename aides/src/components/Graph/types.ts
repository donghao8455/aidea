/**
 * 图谱组件的类型定义
 *
 * 数据来源：从 @site/src/data/graphData 派生（详情见 @site/src/data/concepts/<id>.ts）
 * 不要在此文件中硬编码概念或关系数据，统一由 graphData.ts 与 concepts/<id>.ts 管理
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

/** 完整概念详情（含 9 区块内容），用于详情页 */
export interface ConceptDetail {
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
  detail: {
    definition: string;
    plainExplanation: string;
    analogy: string;
    keyPoints: string[];
    useCases: Array<{title: string; description: string; example?: string}>;
    relatedConcepts: Array<{conceptId: string; relationType: string; relationLabel: string}>;
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'paper' | 'documentation';
      language: 'zh' | 'en';
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      recommended: boolean;
    }>;
  };
}
