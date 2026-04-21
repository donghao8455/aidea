export interface ConceptData {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  tooltip: {
    summary: string;
  };
}

export const concepts: ConceptData[] = [
  {
    id: 'llm',
    name: '大语言模型',
    nameEn: 'Large Language Model',
    abbreviation: 'LLM',
    category: 'basic',
    difficulty: 1,
    tags: ['NLP', '深度学习', 'Transformer'],
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
    difficulty: 1,
    tags: ['交互', '指令'],
    tooltip: {
      summary: '与AI模型交互时输入的文本指令',
    },
  },
  {
    id: 'tokenizer',
    name: '分词器',
    nameEn: 'Tokenizer',
    abbreviation: 'Tokenizer',
    category: 'basic',
    difficulty: 2,
    tags: ['文本处理', '词元化'],
    tooltip: {
      summary: '将文本分割成词元(Token)的工具，是LLM处理文本的基础',
    },
  },
  {
    id: 'temperature',
    name: '温度参数',
    nameEn: 'Temperature',
    abbreviation: 'Temp',
    category: 'basic',
    difficulty: 2,
    tags: ['采样', '随机性'],
    tooltip: {
      summary: '控制LLM输出随机性的参数，影响创造性和确定性',
    },
  },
  {
    id: 'embedding',
    name: '文本嵌入',
    nameEn: 'Text Embedding',
    abbreviation: 'Embedding',
    category: 'tech',
    difficulty: 3,
    tags: ['向量化', '语义表示'],
    tooltip: {
      summary: '将文本转换为稠密向量的技术，捕捉语义信息',
    },
  },
  {
    id: 'vector-db',
    name: '向量数据库',
    nameEn: 'Vector Database',
    abbreviation: 'Vector DB',
    category: 'tech',
    difficulty: 3,
    tags: ['存储', '相似度检索'],
    tooltip: {
      summary: '专门用于存储和检索向量数据的数据库系统',
    },
  },
  {
    id: 'fine-tuning',
    name: '模型微调',
    nameEn: 'Fine-tuning',
    abbreviation: 'Fine-tuning',
    category: 'tech',
    difficulty: 4,
    tags: ['训练', '迁移学习'],
    tooltip: {
      summary: '在预训练模型基础上使用特定数据继续训练以适应特定任务',
    },
  },
  {
    id: 'prompt-engineering',
    name: '提示词工程',
    nameEn: 'Prompt Engineering',
    abbreviation: 'PE',
    category: 'methodology',
    difficulty: 2,
    tags: ['优化', '最佳实践'],
    tooltip: {
      summary: '设计高效提示词以获得更好AI输出的学科',
    },
  },
  {
    id: 'chain-of-thought',
    name: '思维链',
    nameEn: 'Chain of Thought',
    abbreviation: 'CoT',
    category: 'methodology',
    difficulty: 3,
    tags: ['推理', '逻辑'],
    tooltip: {
      summary: '通过分步骤推理提高复杂问题解答能力的技术',
    },
  },
  {
    id: 'rag',
    name: '检索增强生成',
    nameEn: 'Retrieval-Augmented Generation',
    abbreviation: 'RAG',
    category: 'architecture',
    difficulty: 3,
    tags: ['检索', '生成', '知识库'],
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
    difficulty: 4,
    tags: ['自主', '决策', '执行'],
    tooltip: {
      summary: '能够自主决策和执行任务的AI系统',
    },
  },
  {
    id: 'ai-gateway',
    name: 'AI网关',
    nameEn: 'AI Gateway',
    abbreviation: 'AI Gateway',
    category: 'architecture',
    difficulty: 3,
    tags: ['路由', '负载均衡', '监控'],
    tooltip: {
      summary: '管理、路由和监控AI模型调用的中间层服务',
    },
  },
  {
    id: 'mcp',
    name: '模型上下文协议',
    nameEn: 'Model Context Protocol',
    abbreviation: 'MCP',
    category: 'tool',
    difficulty: 4,
    tags: ['协议', '标准化'],
    tooltip: {
      summary: '标准化AI模型与外部工具交互的协议',
    },
  },
  {
    id: 'tool-calling',
    name: '工具调用',
    nameEn: 'Tool Calling',
    abbreviation: 'Tool Calling',
    category: 'tool',
    difficulty: 3,
    tags: ['函数调用', '插件'],
    tooltip: {
      summary: '让LLM能够调用外部函数或API的技术',
    },
  },
  {
    id: 'multi-agent',
    name: '多智能体',
    nameEn: 'Multi-Agent',
    abbreviation: 'Multi-Agent',
    category: 'architecture',
    difficulty: 5,
    tags: ['协作', '分布式', '复杂任务'],
    tooltip: {
      summary: '多个AI智能体协作完成复杂任务的系统',
    },
  },
];

export const relations = [
  // LLM 基础关系
  {source: 'llm', target: 'prompt', label: '使用'},
  {source: 'llm', target: 'tokenizer', label: '依赖'},
  {source: 'llm', target: 'temperature', label: '受控于'},

  // Prompt 相关
  {source: 'prompt-engineering', target: 'prompt', label: '优化'},
  {source: 'llm', target: 'prompt-engineering', label: '依赖'},

  // Embedding 相关
  {source: 'embedding', target: 'llm', label: '输入处理'},
  {source: 'embedding', target: 'vector-db', label: '存储到'},

  // RAG 架构
  {source: 'llm', target: 'rag', label: '使用'},
  {source: 'rag', target: 'embedding', label: '依赖'},
  {source: 'rag', target: 'vector-db', label: '依赖'},

  // Agent 架构
  {source: 'llm', target: 'agent', label: '驱动'},
  {source: 'agent', target: 'rag', label: '增强'},
  {source: 'agent', target: 'tool-calling', label: '使用'},

  // AI Gateway
  {source: 'agent', target: 'ai-gateway', label: '通过'},
  {source: 'llm', target: 'ai-gateway', label: '通过'},

  // Tool Calling & MCP
  {source: 'tool-calling', target: 'mcp', label: '基于'},
  {source: 'agent', target: 'mcp', label: '使用'},

  // Multi-Agent
  {source: 'multi-agent', target: 'agent', label: '包含多个'},
  {source: 'multi-agent', target: 'ai-gateway', label: '协调'},

  // Fine-tuning
  {source: 'fine-tuning', target: 'llm', label: '优化'},

  // Chain of Thought
  {source: 'chain-of-thought', target: 'llm', label: '增强'},
  {source: 'chain-of-thought', target: 'agent', label: '用于'},
];
