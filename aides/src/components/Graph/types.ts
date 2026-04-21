export interface ConceptData {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  tooltip: {
    summary: string;
  };
}

export const testConcepts: ConceptData[] = [
  {
    id: 'llm',
    name: '大语言模型',
    nameEn: 'Large Language Model',
    abbreviation: 'LLM',
    category: 'basic',
    tooltip: {
      summary: '能理解和生成人类语言的大型神经网络模型',
    },
  },
  {
    id: 'prompt',
    name: '提示词',
    nameEn: 'Prompt',
    abbreviation: 'Prompt',
    category: 'basic',
    tooltip: {
      summary: '与AI模型交互时输入的文本指令',
    },
  },
  {
    id: 'prompt-engineering',
    name: '提示词工程',
    nameEn: 'Prompt Engineering',
    abbreviation: 'PE',
    category: 'methodology',
    tooltip: {
      summary: '设计高效提示词以获得更好AI输出的学科',
    },
  },
  {
    id: 'rag',
    name: '检索增强生成',
    nameEn: 'Retrieval-Augmented Generation',
    abbreviation: 'RAG',
    category: 'architecture',
    tooltip: {
      summary: '结合外部知识库检索和LLM生成的架构',
    },
  },
  {
    id: 'agent',
    name: '智能体',
    nameEn: 'AI Agent',
    abbreviation: 'Agent',
    category: 'architecture',
    tooltip: {
      summary: '能够自主决策和执行任务的AI系统',
    },
  },
];

export const testRelations = [
  {
    source: 'llm',
    target: 'prompt',
    label: '使用',
  },
  {
    source: 'llm',
    target: 'prompt-engineering',
    label: '依赖',
  },
  {
    source: 'prompt-engineering',
    target: 'prompt',
    label: '优化',
  },
  {
    source: 'llm',
    target: 'rag',
    label: '使用',
  },
  {
    source: 'llm',
    target: 'agent',
    label: '驱动',
  },
  {
    source: 'rag',
    target: 'agent',
    label: '增强',
  },
];
