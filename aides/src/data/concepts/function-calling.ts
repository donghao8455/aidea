import type {ConceptDetail} from '@site/src/components/Graph/types';

const function_calling: ConceptDetail = {
  id: 'function-calling',
  name: '函数调用',
  nameEn: 'Function Calling',
  abbreviation: 'Func Call',
  category: 'tool',
  difficulty: 2,
  tags: ['工具', 'API', 'Agent'],
  tooltip: {summary: 'AI 像调用 API 一样调用外部工具，是 AI 领域的重要概念'},
  detail: {
    definition: '函数调用（Function Calling，缩写 Func Call）是 AI 领域的重要概念之一。AI 像调用 API 一样调用外部工具。函数调用 在现代大语言模型、深度学习应用中扮演关键角色，是开发者、研究者和爱好者必须了解的基础知识。掌握 函数调用 的核心原理有助于深入理解 AI 系统的设计哲学和实现方法。',
    plainExplanation: '想象一下，AI 像调用 API 一样调用外部工具。这就是 函数调用 的核心思想。函数调用 不是什么神秘的魔法，而是一套清晰的工程方法 —— 通过精心设计的算法和数学工具，解决 AI 领域的具体问题。学习 函数调用 能帮你理解 AI 系统「为什么这样工作」，以及「怎么改进它」。',
    analogy: 'AI 像调用 API 一样调用外部工具。这个类比能帮助你快速建立对 函数调用 的直觉理解，把抽象的技术概念映射到熟悉的日常生活场景。',
    keyPoints: [
      "函数调用 是 AI 领域的重要概念，对应 Function Calling",
      "核心思想：AI 像调用 API 一样调用外部工具",
      "主要应用场景：AI 应用开发、Agent 编排、生态集成",
      "与 Function Calling 相关的核心技术包括 Transformer、神经网络等",
      "在现代大语言模型生态中扮演重要角色"
    ],
    useCases: [
      {title: "AI 应用开发", description: "快速构建基于 LLM 的应用", example: "LangChain 让开发者 10 行代码接入 RAG"},
      {title: "Agent 编排", description: "协调多个 AI 组件完成复杂任务", example: "Function Calling 让 AI 自主决定调用哪个 API"},
      {title: "生态集成", description: "连接现有软件系统和数据源", example: "A2A 协议让不同 Agent 互联互通"}
    ],
    relatedConcepts: [
      {conceptId: "tool-calling", relationType: "uses", relationLabel: "使用"},
      {conceptId: "agent", relationType: "is-foundation-of", relationLabel: "是基础"},
      {conceptId: "mcp", relationType: "can-extend", relationLabel: "可扩展"}
    ],
    resources: [
      {title: "原论文", url: "https://arxiv.org/", type: "paper", language: "en", difficulty: "advanced", recommended: true},
      {title: "Hugging Face 文档", url: "https://huggingface.co/docs", type: "documentation", language: "en", difficulty: "intermediate", recommended: true},
      {title: "机器之心介绍", url: "https://www.jiqizhixin.com/", type: "article", language: "zh", difficulty: "beginner", recommended: true}
    ],
  },
};

export default function_calling;
