import type {ConceptDetail} from '@site/src/components/Graph/types';

const attention: ConceptDetail = {
  id: 'attention',
  name: '注意力机制',
  nameEn: 'Attention Mechanism',
  abbreviation: 'Attention',
  category: 'tech',
  difficulty: 3,
  tags: ['深度学习', 'NLP', 'Transformer'],
  tooltip: {summary: '让模型在处理序列时动态关注最相关部分的机制，是 Transformer 的核心组件'},
  detail: {
    definition: '注意力机制（Attention Mechanism）是深度学习中的一种重要技术，它允许模型在处理一个序列元素时，动态地"关注"序列中其他与之相关的元素，并给每个元素分配一个权重（重要性分数）。注意力机制的提出解决了传统 RNN 难以处理长距离依赖的问题，并成为 Transformer 架构的核心。在大语言模型中，自注意力（Self-Attention）让每个词都能与序列中所有其他词直接交互。',
    plainExplanation: '当你阅读一句话时，你的大脑并不是平等地看待每个词。比如读到"猫坐在垫子上"时，你会自然地把注意力集中在"猫"和"垫子"上，因为它们是核心信息，而对"在"和"上"关注较少。注意力机制就是把这个人类的阅读习惯教给 AI——让它学会在处理信息时，自动判断哪些部分更重要。',
    analogy: '注意力机制就像一个聪明的学生做阅读理解：面对一段长长的文章，他不会逐字平均地看，而是会用荧光笔（注意力）高亮关键句子，跳过无关紧要的连接词，然后把高亮的内容串联起来形成理解。这个"高亮"过程就是注意力权重的计算。',
    keyPoints: [
      'Query-Key-Value 三元组：Query 是查询，Key 是被查询对象的索引，Value 是实际内容',
      '注意力分数 = softmax(QK^T / sqrt(d_k))，表示 Query 对每个 Key 的关注程度',
      '自注意力（Self-Attention）让序列内部元素互相关注，捕获内部结构',
      '多头注意力并行计算多组注意力，模型可在不同子空间学习不同模式',
      '相比 RNN，注意力可以并行计算且天然处理长距离依赖',
      '交叉注意力（Cross-Attention）连接不同序列（如翻译中的源语言和目标语言）',
    ],
    useCases: [
      {title: '大语言模型', description: '自注意力是 GPT、BERT 等所有 Transformer 架构模型的基础', example: 'GPT-4 的每个注意力层有 96+ 个注意力头，分别学习不同类型的语言关系'},
      {title: '机器翻译', description: '注意力机制最初在 Seq2Seq 模型上突破，现在所有翻译系统都基于注意力', example: '英中翻译时，模型在生成中文"猫"时会强烈关注英文"cat"'},
      {title: '图像描述生成', description: '图像中的不同区域被赋予不同注意力，生成对应描述', example: '模型看到"一只狗在跑"时，会重点关注图片中狗的位置'},
      {title: '语音识别', description: '音频序列的不同时间片段获得不同注意力，提升识别准确率', example: 'Whisper 在识别时会动态关注音频中的语音段，忽略静音和噪音'},
    ],
    relatedConcepts: [
      {conceptId: 'transformer', relationType: 'is-core-of', relationLabel: '是核心'},
      {conceptId: 'llm', relationType: 'used-by', relationLabel: '被使用'},
      {conceptId: 'deep-learning', relationType: 'belongs-to', relationLabel: '属于'},
    ],
    resources: [
      {title: 'Attention Is All You Need (原论文)', url: 'https://arxiv.org/abs/1706.03762', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
      {title: 'Visualizing Attention', url: 'https://jalammar.github.io/visualizing-attention/', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      {title: '注意力机制的可视化讲解', url: 'https://zhuanlan.zhihu.com/p/376011501', type: 'article', language: 'zh', difficulty: 'beginner', recommended: true},
    ],
  },
};

export default attention;
