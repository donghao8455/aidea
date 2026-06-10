import type {ConceptData, RelationData} from '@site/src/components/Graph/types';

/**
 * 轻量图谱数据（仅供首页使用）
 * 包含 39 个概念的简化数据 + 关系网络
 * 详情内容已拆分到 concepts/<id>.ts 按需懒加载
 */

export const concepts: ConceptData[] = [
  {
    "id": "llm",
    "name": "大语言模型",
    "nameEn": "Large Language Model",
    "abbreviation": "LLM",
    "category": "basic",
    "difficulty": 2,
    "tags": [
      "AI",
      "NLP",
      "深度学习",
      "Transformer"
    ],
    "tooltip": {
      "summary": "能理解和生成人类语言的大型神经网络模型，是当代AI的核心技术"
    }
  },
  {
    "id": "prompt",
    "name": "提示词",
    "nameEn": "Prompt",
    "abbreviation": "Prompt",
    "category": "basic",
    "difficulty": 1,
    "tags": [
      "交互",
      "指令"
    ],
    "tooltip": {
      "summary": "与AI模型交互时输入的文本指令，是引导AI输出的关键"
    }
  },
  {
    "id": "tokenizer",
    "name": "分词器",
    "nameEn": "Tokenizer",
    "abbreviation": "Tokenizer",
    "category": "basic",
    "difficulty": 2,
    "tags": [
      "文本处理",
      "词元化"
    ],
    "tooltip": {
      "summary": "将文本分割成词元(Token)的工具，是LLM处理文本的基础"
    }
  },
  {
    "id": "temperature",
    "name": "温度参数",
    "nameEn": "Temperature",
    "abbreviation": "Temp",
    "category": "basic",
    "difficulty": 2,
    "tags": [
      "采样",
      "随机性"
    ],
    "tooltip": {
      "summary": "控制LLM输出随机性的参数，影响创造性和确定性"
    }
  },
  {
    "id": "embedding",
    "name": "向量嵌入",
    "nameEn": "Embedding",
    "abbreviation": "Embedding",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "向量化",
      "语义表示"
    ],
    "tooltip": {
      "summary": "将文本转换为高维向量表示的技术，让AI能计算语义相似度"
    }
  },
  {
    "id": "vector-db",
    "name": "向量数据库",
    "nameEn": "Vector Database",
    "abbreviation": "Vector DB",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "存储",
      "相似度检索"
    ],
    "tooltip": {
      "summary": "专门用于存储和检索向量数据的数据库系统"
    }
  },
  {
    "id": "fine-tuning",
    "name": "模型微调",
    "nameEn": "Fine-tuning",
    "abbreviation": "Fine-tuning",
    "category": "tech",
    "difficulty": 4,
    "tags": [
      "训练",
      "迁移学习"
    ],
    "tooltip": {
      "summary": "在预训练模型基础上使用特定数据继续训练以适应特定任务"
    }
  },
  {
    "id": "prompt-engineering",
    "name": "提示词工程",
    "nameEn": "Prompt Engineering",
    "abbreviation": "PE",
    "category": "methodology",
    "difficulty": 2,
    "tags": [
      "优化",
      "最佳实践"
    ],
    "tooltip": {
      "summary": "设计高效提示词以获得更好AI输出的学科"
    }
  },
  {
    "id": "chain-of-thought",
    "name": "思维链",
    "nameEn": "Chain of Thought",
    "abbreviation": "CoT",
    "category": "methodology",
    "difficulty": 3,
    "tags": [
      "推理",
      "逻辑"
    ],
    "tooltip": {
      "summary": "通过分步骤推理提高复杂问题解答能力的技术"
    }
  },
  {
    "id": "rag",
    "name": "检索增强生成",
    "nameEn": "Retrieval-Augmented Generation",
    "abbreviation": "RAG",
    "category": "architecture",
    "difficulty": 4,
    "tags": [
      "检索",
      "生成",
      "知识库"
    ],
    "tooltip": {
      "summary": "结合外部知识库检索和LLM生成的架构"
    }
  },
  {
    "id": "agent",
    "name": "智能体",
    "nameEn": "AI Agent",
    "abbreviation": "Agent",
    "category": "architecture",
    "difficulty": 4,
    "tags": [
      "自主",
      "决策",
      "执行"
    ],
    "tooltip": {
      "summary": "能够自主决策、规划并执行任务的AI系统"
    }
  },
  {
    "id": "ai-gateway",
    "name": "AI网关",
    "nameEn": "AI Gateway",
    "abbreviation": "AI Gateway",
    "category": "architecture",
    "difficulty": 3,
    "tags": [
      "路由",
      "负载均衡",
      "监控"
    ],
    "tooltip": {
      "summary": "管理、路由和监控AI模型调用的中间层服务"
    }
  },
  {
    "id": "mcp",
    "name": "模型上下文协议",
    "nameEn": "Model Context Protocol",
    "abbreviation": "MCP",
    "category": "tool",
    "difficulty": 4,
    "tags": [
      "协议",
      "标准化"
    ],
    "tooltip": {
      "summary": "标准化AI模型与外部工具交互的协议"
    }
  },
  {
    "id": "tool-calling",
    "name": "工具调用",
    "nameEn": "Tool Calling",
    "abbreviation": "Tool Calling",
    "category": "tool",
    "difficulty": 3,
    "tags": [
      "函数调用",
      "插件"
    ],
    "tooltip": {
      "summary": "让LLM能够调用外部函数或API的技术"
    }
  },
  {
    "id": "multi-agent",
    "name": "多智能体",
    "nameEn": "Multi-Agent",
    "abbreviation": "Multi-Agent",
    "category": "architecture",
    "difficulty": 5,
    "tags": [
      "协作",
      "分布式",
      "复杂任务"
    ],
    "tooltip": {
      "summary": "多个AI智能体协作解决问题的架构"
    }
  },
  {
    "id": "reasoning",
    "name": "推理模型",
    "nameEn": "Reasoning Model",
    "abbreviation": "Reasoning",
    "category": "tech",
    "difficulty": 4,
    "tags": [
      "tech",
      "reasoning",
      "2025",
      "advanced"
    ],
    "tooltip": {
      "summary": "具备\"慢思考\"能力的AI模型，通过内化的思维链进行复杂推理和验证"
    }
  },
  {
    "id": "rlvr",
    "name": "可验证奖励强化学习",
    "nameEn": "RLVR",
    "abbreviation": "RLVR",
    "category": "tech",
    "difficulty": 5,
    "tags": [
      "tech",
      "training",
      "2025",
      "advanced"
    ],
    "tooltip": {
      "summary": "基于客观可验证结果进行奖励的强化学习方法，驱动2025年推理模型突破"
    }
  },
  {
    "id": "test-time-compute",
    "name": "测试时算力扩展",
    "nameEn": "Test-time Compute",
    "abbreviation": "TTC",
    "category": "tech",
    "difficulty": 4,
    "tags": [
      "tech",
      "scaling",
      "2025",
      "advanced"
    ],
    "tooltip": {
      "summary": "通过在推理时消耗更多计算资源来提升模型输出质量的技术范式"
    }
  },
  {
    "id": "react",
    "name": "推理行动模式",
    "nameEn": "ReAct",
    "abbreviation": "ReAct",
    "category": "methodology",
    "difficulty": 3,
    "tags": [
      "methodology",
      "agent",
      "reasoning",
      "foundational"
    ],
    "tooltip": {
      "summary": "让AI交替进行推理和行动的智能体架构模式"
    }
  },
  {
    "id": "vibe-coding",
    "name": "氛围编程",
    "nameEn": "Vibe Coding",
    "abbreviation": "VC",
    "category": "methodology",
    "difficulty": 2,
    "tags": [
      "methodology",
      "coding",
      "2025",
      "trending"
    ],
    "tooltip": {
      "summary": "2025年新兴的AI辅助编程范式，开发者用自然语言描述意图，AI完成代码实现"
    }
  },
  {
    "id": "computer-use",
    "name": "计算机使用智能体",
    "nameEn": "Computer-Using Agent",
    "abbreviation": "CUA",
    "category": "architecture",
    "difficulty": 5,
    "tags": [
      "architecture",
      "agent",
      "2025",
      "advanced",
      "frontier"
    ],
    "tooltip": {
      "summary": "能像人类一样操作电脑界面完成复杂任务的AI智能体"
    }
  },
  {
    "id": "agentic-ai",
    "name": "代理式AI",
    "nameEn": "Agentic AI",
    "abbreviation": "Agentic AI",
    "category": "architecture",
    "difficulty": 3,
    "tags": [
      "architecture",
      "agent",
      "2025",
      "trend"
    ],
    "tooltip": {
      "summary": "具备自主规划、工具使用和多步执行能力的AI系统范式"
    }
  },
  {
    "id": "transformer",
    "name": "Transformer",
    "nameEn": "Transformer",
    "abbreviation": "Transformer",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "架构",
      "注意力",
      "深度学习",
      "Encoder-Decoder"
    ],
    "tooltip": {
      "summary": "基于自注意力机制的序列建模架构，2017年由 Google 提出，是现代大语言模型的基石"
    }
  },
  {
    "id": "attention",
    "name": "注意力机制",
    "nameEn": "Attention Mechanism",
    "abbreviation": "Attention",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "深度学习",
      "NLP",
      "Transformer"
    ],
    "tooltip": {
      "summary": "让模型在处理序列时动态关注最相关部分的机制，是 Transformer 的核心组件"
    }
  },
  {
    "id": "deep-learning",
    "name": "深度学习",
    "nameEn": "Deep Learning",
    "abbreviation": "DL",
    "category": "basic",
    "difficulty": 2,
    "tags": [
      "AI",
      "神经网络",
      "机器学习",
      "深度神经网络"
    ],
    "tooltip": {
      "summary": "基于多层神经网络的机器学习方法，是现代 AI 突破的核心驱动力"
    }
  },
  {
    "id": "neural-network",
    "name": "神经网络",
    "nameEn": "Neural Network",
    "abbreviation": "NN",
    "category": "basic",
    "difficulty": 2,
    "tags": [
      "AI",
      "深度学习",
      "感知机",
      "神经元"
    ],
    "tooltip": {
      "summary": "受人脑神经元结构启发设计的计算模型，是深度学习的核心架构"
    }
  },
  {
    "id": "machine-learning",
    "name": "机器学习",
    "nameEn": "Machine Learning",
    "abbreviation": "ML",
    "category": "basic",
    "difficulty": 1,
    "tags": [
      "AI",
      "算法",
      "数据",
      "监督学习"
    ],
    "tooltip": {
      "summary": "让计算机从数据中自动学习规律并做出预测或决策，无需显式编程"
    }
  },
  {
    "id": "rlhf",
    "name": "RLHF",
    "nameEn": "Reinforcement Learning from Human Feedback",
    "abbreviation": "RLHF",
    "category": "methodology",
    "difficulty": 3,
    "tags": [
      "训练方法",
      "对齐",
      "奖励模型",
      "强化学习"
    ],
    "tooltip": {
      "summary": "基于人类反馈的强化学习，让大模型输出更符合人类偏好的回答"
    }
  },
  {
    "id": "lora",
    "name": "LoRA",
    "nameEn": "Low-Rank Adaptation",
    "abbreviation": "LoRA",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "微调",
      "低秩",
      "高效训练"
    ],
    "tooltip": {
      "summary": "给大模型加装\"小型技能插件\"做轻量化微调，是 AI 领域的重要概念"
    }
  },
  {
    "id": "quantization",
    "name": "量化",
    "nameEn": "Quantization",
    "abbreviation": "Quant",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "压缩",
      "推理优化",
      "低精度"
    ],
    "tooltip": {
      "summary": "把高清照片压缩成缩略图，体积变小但核心可识别，是 AI 领域的重要概念"
    }
  },
  {
    "id": "nlp",
    "name": "自然语言处理",
    "nameEn": "Natural Language Processing",
    "abbreviation": "NLP",
    "category": "tech",
    "difficulty": 2,
    "tags": [
      "文本",
      "语言学",
      "AI"
    ],
    "tooltip": {
      "summary": "让机器\"读懂、听懂、写出\"人类语言，是 AI 领域的重要概念"
    }
  },
  {
    "id": "computer-vision",
    "name": "计算机视觉",
    "nameEn": "Computer Vision",
    "abbreviation": "CV",
    "category": "tech",
    "difficulty": 2,
    "tags": [
      "图像识别",
      "视觉",
      "CNN"
    ],
    "tooltip": {
      "summary": "教机器像人眼一样看懂图片和视频，是 AI 领域的重要概念"
    }
  },
  {
    "id": "gan",
    "name": "生成对抗网络",
    "nameEn": "Generative Adversarial Network",
    "abbreviation": "GAN",
    "category": "tech",
    "difficulty": 3,
    "tags": [
      "生成",
      "对抗",
      "深度学习"
    ],
    "tooltip": {
      "summary": "一个\"造假画师\"和一个\"鉴宝专家\"互相对抗共同进步，是 AI 领域的重要概念"
    }
  },
  {
    "id": "dpo",
    "name": "直接偏好优化",
    "nameEn": "Direct Preference Optimization",
    "abbreviation": "DPO",
    "category": "methodology",
    "difficulty": 3,
    "tags": [
      "对齐",
      "偏好",
      "替代RLHF"
    ],
    "tooltip": {
      "summary": "不再需要单独的\"评分老师\"，让模型直接对比两个答案的优劣，是 AI 领域的重要概念"
    }
  },
  {
    "id": "few-shot-learning",
    "name": "少样本学习",
    "nameEn": "Few-shot Learning",
    "abbreviation": "Few-shot",
    "category": "methodology",
    "difficulty": 2,
    "tags": [
      "In-Context",
      "示例",
      "学习"
    ],
    "tooltip": {
      "summary": "看几个例子就能举一反三，是 AI 领域的重要概念"
    }
  },
  {
    "id": "moe",
    "name": "混合专家模型",
    "nameEn": "Mixture of Experts",
    "abbreviation": "MoE",
    "category": "architecture",
    "difficulty": 3,
    "tags": [
      "稀疏激活",
      "架构",
      "高效"
    ],
    "tooltip": {
      "summary": "一家公司的\"专家调度中心\"按需派专家，是 AI 领域的重要概念"
    }
  },
  {
    "id": "function-calling",
    "name": "函数调用",
    "nameEn": "Function Calling",
    "abbreviation": "Func Call",
    "category": "tool",
    "difficulty": 2,
    "tags": [
      "工具",
      "API",
      "Agent"
    ],
    "tooltip": {
      "summary": "AI 像调用 API 一样调用外部工具，是 AI 领域的重要概念"
    }
  },
  {
    "id": "langchain",
    "name": "LangChain",
    "nameEn": "LangChain",
    "abbreviation": "LangChain",
    "category": "tool",
    "difficulty": 2,
    "tags": [
      "框架",
      "开发",
      "工具"
    ],
    "tooltip": {
      "summary": "给 LLM 提供\"工具箱\"和\"配方书\"的开发框架，是 AI 领域的重要概念"
    }
  },
  {
    "id": "a2a",
    "name": "A2A 协议",
    "nameEn": "Agent-to-Agent Protocol",
    "abbreviation": "A2A",
    "category": "architecture",
    "difficulty": 3,
    "tags": [
      "Agent",
      "通信",
      "协议"
    ],
    "tooltip": {
      "summary": "不同 AI Agent 之间的\"通用对话协议\"像邮件 SMTP，是 AI 领域的重要概念"
    }
  }
];

export const relations: RelationData[] = [
  {
    "source": "llm",
    "target": "prompt",
    "label": "使用"
  },
  {
    "source": "llm",
    "target": "tokenizer",
    "label": "依赖"
  },
  {
    "source": "llm",
    "target": "temperature",
    "label": "受控于"
  },
  {
    "source": "prompt-engineering",
    "target": "prompt",
    "label": "优化"
  },
  {
    "source": "llm",
    "target": "prompt-engineering",
    "label": "依赖"
  },
  {
    "source": "embedding",
    "target": "llm",
    "label": "输入处理"
  },
  {
    "source": "embedding",
    "target": "vector-db",
    "label": "存储到"
  },
  {
    "source": "llm",
    "target": "rag",
    "label": "使用"
  },
  {
    "source": "rag",
    "target": "embedding",
    "label": "依赖"
  },
  {
    "source": "rag",
    "target": "vector-db",
    "label": "依赖"
  },
  {
    "source": "llm",
    "target": "agent",
    "label": "驱动"
  },
  {
    "source": "agent",
    "target": "rag",
    "label": "增强"
  },
  {
    "source": "agent",
    "target": "tool-calling",
    "label": "使用"
  },
  {
    "source": "agent",
    "target": "ai-gateway",
    "label": "通过"
  },
  {
    "source": "llm",
    "target": "ai-gateway",
    "label": "通过"
  },
  {
    "source": "tool-calling",
    "target": "mcp",
    "label": "基于"
  },
  {
    "source": "agent",
    "target": "mcp",
    "label": "使用"
  },
  {
    "source": "multi-agent",
    "target": "agent",
    "label": "包含多个"
  },
  {
    "source": "multi-agent",
    "target": "ai-gateway",
    "label": "协调"
  },
  {
    "source": "fine-tuning",
    "target": "llm",
    "label": "优化"
  },
  {
    "source": "chain-of-thought",
    "target": "llm",
    "label": "增强"
  },
  {
    "source": "chain-of-thought",
    "target": "agent",
    "label": "用于"
  },
  {
    "source": "llm",
    "target": "reasoning",
    "label": "扩展"
  },
  {
    "source": "reasoning",
    "target": "chain-of-thought",
    "label": "内化"
  },
  {
    "source": "reasoning",
    "target": "rlvr",
    "label": "驱动"
  },
  {
    "source": "reasoning",
    "target": "test-time-compute",
    "label": "使用"
  },
  {
    "source": "rlvr",
    "target": "llm",
    "label": "训练"
  },
  {
    "source": "test-time-compute",
    "target": "llm",
    "label": "扩展"
  },
  {
    "source": "agent",
    "target": "react",
    "label": "实现"
  },
  {
    "source": "react",
    "target": "tool-calling",
    "label": "使用"
  },
  {
    "source": "react",
    "target": "chain-of-thought",
    "label": "扩展"
  },
  {
    "source": "agent",
    "target": "agentic-ai",
    "label": "是"
  },
  {
    "source": "agentic-ai",
    "target": "llm",
    "label": "驱动"
  },
  {
    "source": "agentic-ai",
    "target": "reasoning",
    "label": "使用"
  },
  {
    "source": "agentic-ai",
    "target": "mcp",
    "label": "通过MCP连接"
  },
  {
    "source": "agent",
    "target": "computer-use",
    "label": "扩展"
  },
  {
    "source": "computer-use",
    "target": "mcp",
    "label": "使用"
  },
  {
    "source": "computer-use",
    "target": "tool-calling",
    "label": "扩展"
  },
  {
    "source": "vibe-coding",
    "target": "agent",
    "label": "驱动"
  },
  {
    "source": "vibe-coding",
    "target": "llm",
    "label": "使用"
  },
  {
    "source": "vibe-coding",
    "target": "computer-use",
    "label": "扩展"
  },
  {
    "source": "multi-agent",
    "target": "react",
    "label": "使用"
  },
  {
    "source": "transformer",
    "target": "llm",
    "label": "是基础"
  },
  {
    "source": "transformer",
    "target": "attention",
    "label": "使用"
  },
  {
    "source": "attention",
    "target": "llm",
    "label": "驱动"
  },
  {
    "source": "attention",
    "target": "transformer",
    "label": "属于"
  },
  {
    "source": "deep-learning",
    "target": "neural-network",
    "label": "基于"
  },
  {
    "source": "deep-learning",
    "target": "machine-learning",
    "label": "属于"
  },
  {
    "source": "neural-network",
    "target": "machine-learning",
    "label": "属于"
  },
  {
    "source": "machine-learning",
    "target": "deep-learning",
    "label": "包含"
  },
  {
    "source": "llm",
    "target": "deep-learning",
    "label": "基于"
  },
  {
    "source": "rlhf",
    "target": "llm",
    "label": "训练"
  },
  {
    "source": "rlhf",
    "target": "fine-tuning",
    "label": "包含"
  },
  {
    "source": "fine-tuning",
    "target": "lora",
    "label": "使用"
  },
  {
    "source": "lora",
    "target": "fine-tuning",
    "label": "轻量化"
  },
  {
    "source": "quantization",
    "target": "llm",
    "label": "优化"
  },
  {
    "source": "nlp",
    "target": "llm",
    "label": "子领域"
  },
  {
    "source": "nlp",
    "target": "chain-of-thought",
    "label": "使用"
  },
  {
    "source": "computer-vision",
    "target": "embedding",
    "label": "应用"
  },
  {
    "source": "computer-vision",
    "target": "gan",
    "label": "应用"
  },
  {
    "source": "gan",
    "target": "deep-learning",
    "label": "属于"
  },
  {
    "source": "dpo",
    "target": "rlhf",
    "label": "改进"
  },
  {
    "source": "dpo",
    "target": "fine-tuning",
    "label": "属于"
  },
  {
    "source": "prompt-engineering",
    "target": "few-shot-learning",
    "label": "包含"
  },
  {
    "source": "few-shot-learning",
    "target": "prompt",
    "label": "用于"
  },
  {
    "source": "llm",
    "target": "moe",
    "label": "架构"
  },
  {
    "source": "transformer",
    "target": "moe",
    "label": "可扩展"
  },
  {
    "source": "function-calling",
    "target": "tool-calling",
    "label": "同义"
  },
  {
    "source": "function-calling",
    "target": "agent",
    "label": "使用"
  },
  {
    "source": "langchain",
    "target": "llm",
    "label": "框架"
  },
  {
    "source": "langchain",
    "target": "agent",
    "label": "构建"
  },
  {
    "source": "a2a",
    "target": "multi-agent",
    "label": "协议"
  },
  {
    "source": "a2a",
    "target": "agent",
    "label": "通信"
  }
];

export const conceptOrder: string[] = [
  "llm",
  "prompt",
  "tokenizer",
  "temperature",
  "embedding",
  "vector-db",
  "fine-tuning",
  "prompt-engineering",
  "chain-of-thought",
  "rag",
  "agent",
  "ai-gateway",
  "mcp",
  "tool-calling",
  "multi-agent",
  "reasoning",
  "rlvr",
  "test-time-compute",
  "react",
  "vibe-coding",
  "computer-use",
  "agentic-ai",
  "transformer",
  "attention",
  "deep-learning",
  "neural-network",
  "machine-learning",
  "rlhf",
  "lora",
  "quantization",
  "nlp",
  "computer-vision",
  "gan",
  "dpo",
  "few-shot-learning",
  "moe",
  "function-calling",
  "langchain",
  "a2a"
];

export const allConcepts: Record<string, ConceptData> = concepts.reduce((acc, c) => {
  acc[c.id] = c;
  return acc;
}, {} as Record<string, ConceptData>);
