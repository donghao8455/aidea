import type {ConceptDetail} from '@site/src/components/Graph/types';

const nlp: ConceptDetail = {
  id: 'nlp',
  name: '自然语言处理',
  nameEn: 'Natural Language Processing',
  abbreviation: 'NLP',
  category: 'tech',
  difficulty: 2,
  tags: ['文本', '语言学', 'AI'],
  tooltip: {summary: '让机器「读懂、听懂、写出」人类语言，是 AI 领域的重要概念'},
  detail: {
    definition: '自然语言处理（Natural Language Processing，缩写 NLP）是 AI 领域的重要概念之一。让机器「读懂、听懂、写出」人类语言。自然语言处理 在现代大语言模型、深度学习应用中扮演关键角色，是开发者、研究者和爱好者必须了解的基础知识。掌握 自然语言处理 的核心原理有助于深入理解 AI 系统的设计哲学和实现方法。',
    plainExplanation: '想象一下，让机器「读懂、听懂、写出」人类语言。这就是 自然语言处理 的核心思想。自然语言处理 不是什么神秘的魔法，而是一套清晰的工程方法 —— 通过精心设计的算法和数学工具，解决 AI 领域的具体问题。学习 自然语言处理 能帮你理解 AI 系统「为什么这样工作」，以及「怎么改进它」。',
    analogy: '让机器「读懂、听懂、写出」人类语言。这个类比能帮助你快速建立对 自然语言处理 的直觉理解，把抽象的技术概念映射到熟悉的日常生活场景。',
    keyPoints: [
      "自然语言处理 是 AI 领域的重要概念，对应 Natural Language Processing",
      "核心思想：让机器「读懂、听懂、写出」人类语言",
      "主要应用场景：模型部署、推理加速、专业应用",
      "与 Natural Language Processing 相关的核心技术包括 Transformer、神经网络等",
      "在现代大语言模型生态中扮演重要角色"
    ],
    useCases: [
      {title: "模型部署", description: "将大模型部署到生产环境，降低显存和算力需求", example: "手机端 7B 模型量化后可在端侧流畅运行"},
      {title: "推理加速", description: "在保持模型质量的前提下提升推理速度", example: "vLLM 配合量化实现 10 倍吞吐量提升"},
      {title: "专业应用", description: "在特定领域内做高精度任务", example: "医疗影像识别准确率达 95%+"}
    ],
    relatedConcepts: [
      {conceptId: "llm", relationType: "uses", relationLabel: "使用"},
      {conceptId: "chain-of-thought", relationType: "is-foundation-of", relationLabel: "是基础"},
      {conceptId: "tokenizer", relationType: "can-extend", relationLabel: "可扩展"}
    ],
    resources: [
      {title: "原论文", url: "https://arxiv.org/", type: "paper", language: "en", difficulty: "advanced", recommended: true},
      {title: "Hugging Face 文档", url: "https://huggingface.co/docs", type: "documentation", language: "en", difficulty: "intermediate", recommended: true},
      {title: "机器之心介绍", url: "https://www.jiqizhixin.com/", type: "article", language: "zh", difficulty: "beginner", recommended: true}
    ],
  },
};

export default nlp;
