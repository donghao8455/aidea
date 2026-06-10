import type {ConceptDetail} from '@site/src/components/Graph/types';

const a2a: ConceptDetail = {
  id: 'a2a',
  name: 'A2A 协议',
  nameEn: 'Agent-to-Agent Protocol',
  abbreviation: 'A2A',
  category: 'architecture',
  difficulty: 3,
  tags: ['Agent', '通信', '协议'],
  tooltip: {summary: '不同 AI Agent 之间的「通用对话协议」像邮件 SMTP，是 AI 领域的重要概念'},
  detail: {
    definition: 'A2A 协议（Agent-to-Agent Protocol，缩写 A2A）是 AI 领域的重要概念之一。不同 AI Agent 之间的「通用对话协议」像邮件 SMTP。A2A 协议 在现代大语言模型、深度学习应用中扮演关键角色，是开发者、研究者和爱好者必须了解的基础知识。掌握 A2A 协议 的核心原理有助于深入理解 AI 系统的设计哲学和实现方法。',
    plainExplanation: '想象一下，不同 AI Agent 之间的「通用对话协议」像邮件 SMTP。这就是 A2A 协议 的核心思想。A2A 协议 不是什么神秘的魔法，而是一套清晰的工程方法 —— 通过精心设计的算法和数学工具，解决 AI 领域的具体问题。学习 A2A 协议 能帮你理解 AI 系统「为什么这样工作」，以及「怎么改进它」。',
    analogy: '不同 AI Agent 之间的「通用对话协议」像邮件 SMTP。这个类比能帮助你快速建立对 A2A 协议 的直觉理解，把抽象的技术概念映射到熟悉的日常生活场景。',
    keyPoints: [
      "A2A 协议 是 AI 领域的重要概念，对应 Agent-to-Agent Protocol",
      "核心思想：不同 AI Agent 之间的「通用对话协议」像邮件 SMTP",
      "主要应用场景：大规模训练、多任务处理、效率提升",
      "与 Agent-to-Agent Protocol 相关的核心技术包括 Transformer、神经网络等",
      "在现代大语言模型生态中扮演重要角色"
    ],
    useCases: [
      {title: "大规模训练", description: "支持万亿参数模型的训练和推理", example: "GPT-4 据传采用 MoE 架构，训练成本大幅降低"},
      {title: "多任务处理", description: "一个模型处理多种不同类型的任务", example: "MoE 路由机制让模型按需激活不同专家"},
      {title: "效率提升", description: "相比稠密模型，相同算力下效果更好", example: "Mixtral 8x7B 在多项基准上超越 Llama 2 70B"}
    ],
    relatedConcepts: [
      {conceptId: "multi-agent", relationType: "uses", relationLabel: "使用"},
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

export default a2a;
