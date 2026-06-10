import type {ConceptDetail} from '@site/src/components/Graph/types';

const dpo: ConceptDetail = {
  id: 'dpo',
  name: '直接偏好优化',
  nameEn: 'Direct Preference Optimization',
  abbreviation: 'DPO',
  category: 'methodology',
  difficulty: 3,
  tags: ['对齐', '偏好', '替代RLHF'],
  tooltip: {summary: '不再需要单独的「评分老师」，让模型直接对比两个答案的优劣，是 AI 领域的重要概念'},
  detail: {
    definition: '直接偏好优化（Direct Preference Optimization，缩写 DPO）是 AI 领域的重要概念之一。不再需要单独的「评分老师」，让模型直接对比两个答案的优劣。直接偏好优化 在现代大语言模型、深度学习应用中扮演关键角色，是开发者、研究者和爱好者必须了解的基础知识。掌握 直接偏好优化 的核心原理有助于深入理解 AI 系统的设计哲学和实现方法。',
    plainExplanation: '想象一下，不再需要单独的「评分老师」，让模型直接对比两个答案的优劣。这就是 直接偏好优化 的核心思想。直接偏好优化 不是什么神秘的魔法，而是一套清晰的工程方法 —— 通过精心设计的算法和数学工具，解决 AI 领域的具体问题。学习 直接偏好优化 能帮你理解 AI 系统「为什么这样工作」，以及「怎么改进它」。',
    analogy: '不再需要单独的「评分老师」，让模型直接对比两个答案的优劣。这个类比能帮助你快速建立对 直接偏好优化 的直觉理解，把抽象的技术概念映射到熟悉的日常生活场景。',
    keyPoints: [
      "直接偏好优化 是 AI 领域的重要概念，对应 Direct Preference Optimization",
      "核心思想：不再需要单独的「评分老师」，让模型直接对比两个答案的优劣",
      "主要应用场景：模型对齐、效率优化、数据利用",
      "与 Direct Preference Optimization 相关的核心技术包括 Transformer、神经网络等",
      "在现代大语言模型生态中扮演重要角色"
    ],
    useCases: [
      {title: "模型对齐", description: "让模型输出更符合人类偏好和价值观", example: "ChatGPT 通过对齐训练后明显更安全、更有用"},
      {title: "效率优化", description: "相比传统方法大幅降低训练成本", example: "DPO 训练比 RLHF 简单 2-3 倍，效果相当"},
      {title: "数据利用", description: "用少量样本完成专业任务", example: "Few-shot 让模型用 3-5 个例子学会新任务"}
    ],
    relatedConcepts: [
      {conceptId: "rlhf", relationType: "uses", relationLabel: "使用"},
      {conceptId: "fine-tuning", relationType: "is-foundation-of", relationLabel: "是基础"},
      {conceptId: "llm", relationType: "can-extend", relationLabel: "可扩展"}
    ],
    resources: [
      {title: "原论文", url: "https://arxiv.org/", type: "paper", language: "en", difficulty: "advanced", recommended: true},
      {title: "Hugging Face 文档", url: "https://huggingface.co/docs", type: "documentation", language: "en", difficulty: "intermediate", recommended: true},
      {title: "机器之心介绍", url: "https://www.jiqizhixin.com/", type: "article", language: "zh", difficulty: "beginner", recommended: true}
    ],
  },
};

export default dpo;
