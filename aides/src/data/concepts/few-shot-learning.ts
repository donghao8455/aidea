import type {ConceptDetail} from '@site/src/components/Graph/types';

const few_shot_learning: ConceptDetail = {
  id: 'few-shot-learning',
  name: '少样本学习',
  nameEn: 'Few-shot Learning',
  abbreviation: 'Few-shot',
  category: 'methodology',
  difficulty: 2,
  tags: ['In-Context', '示例', '学习'],
  tooltip: {summary: '看几个例子就能举一反三，是 AI 领域的重要概念'},
  detail: {
    definition: '少样本学习（Few-shot Learning，缩写 Few-shot）是 AI 领域的重要概念之一。看几个例子就能举一反三。少样本学习 在现代大语言模型、深度学习应用中扮演关键角色，是开发者、研究者和爱好者必须了解的基础知识。掌握 少样本学习 的核心原理有助于深入理解 AI 系统的设计哲学和实现方法。',
    plainExplanation: '想象一下，看几个例子就能举一反三。这就是 少样本学习 的核心思想。少样本学习 不是什么神秘的魔法，而是一套清晰的工程方法 —— 通过精心设计的算法和数学工具，解决 AI 领域的具体问题。学习 少样本学习 能帮你理解 AI 系统「为什么这样工作」，以及「怎么改进它」。',
    analogy: '看几个例子就能举一反三。这个类比能帮助你快速建立对 少样本学习 的直觉理解，把抽象的技术概念映射到熟悉的日常生活场景。',
    keyPoints: [
      "少样本学习 是 AI 领域的重要概念，对应 Few-shot Learning",
      "核心思想：看几个例子就能举一反三",
      "主要应用场景：模型对齐、效率优化、数据利用",
      "与 Few-shot Learning 相关的核心技术包括 Transformer、神经网络等",
      "在现代大语言模型生态中扮演重要角色"
    ],
    useCases: [
      {title: "模型对齐", description: "让模型输出更符合人类偏好和价值观", example: "ChatGPT 通过对齐训练后明显更安全、更有用"},
      {title: "效率优化", description: "相比传统方法大幅降低训练成本", example: "DPO 训练比 RLHF 简单 2-3 倍，效果相当"},
      {title: "数据利用", description: "用少量样本完成专业任务", example: "Few-shot 让模型用 3-5 个例子学会新任务"}
    ],
    relatedConcepts: [
      {conceptId: "prompt", relationType: "uses", relationLabel: "使用"},
      {conceptId: "prompt-engineering", relationType: "is-foundation-of", relationLabel: "是基础"},
      {conceptId: "llm", relationType: "can-extend", relationLabel: "可扩展"}
    ],
    resources: [
      {title: "原论文", url: "https://arxiv.org/", type: "paper", language: "en", difficulty: "advanced", recommended: true},
      {title: "Hugging Face 文档", url: "https://huggingface.co/docs", type: "documentation", language: "en", difficulty: "intermediate", recommended: true},
      {title: "机器之心介绍", url: "https://www.jiqizhixin.com/", type: "article", language: "zh", difficulty: "beginner", recommended: true}
    ],
  },
};

export default few_shot_learning;
