import type {ConceptDetail} from '@site/src/components/Graph/types';

const transformer: ConceptDetail = {
  id: 'transformer',
  name: 'Transformer',
  nameEn: 'Transformer',
  abbreviation: 'Transformer',
  category: 'tech',
  difficulty: 3,
  tags: ['架构', '注意力', '深度学习', 'Encoder-Decoder'],
  tooltip: {summary: '基于自注意力机制的序列建模架构，2017年由 Google 提出，是现代大语言模型的基石'},
  detail: {
    definition: 'Transformer 是一种基于自注意力（Self-Attention）机制的深度学习架构，由 Vaswani 等人在 2017 年的论文《Attention Is All You Need》中提出。它彻底抛弃了循环（RNN）和卷积（CNN）结构，完全依靠注意力机制来建模序列中的长距离依赖关系。Transformer 已经成为自然语言处理、计算机视觉、语音处理等领域的标准架构，几乎所有现代大语言模型（GPT、BERT、Claude 等）都基于 Transformer 构建。',
    plainExplanation: '想象你在读一本长篇小说，要理解当前这一段在讲什么，你需要不断回头看前面的情节。Transformer 的"自注意力"机制就像给模型装了一个"任意跳转"的超能力——它可以在处理任何一个词的时候，同时"看到"句子中所有其他词，并根据相关性自动决定应该重点关注哪些词。这种并行处理能力让 Transformer 比传统的循环神经网络快得多，也强得多。',
    analogy: 'Transformer 就像一个图书馆的智能检索系统：当你输入一个查询时，它会同时扫描图书馆里所有的书籍（而不是一本一本地翻），找出最相关的几本，并自动给出综合答案。每一本书就是序列中的一个"位置"，而"注意力"就是衡量这本书与查询相关性的机制。',
    keyPoints: [
      '完全基于注意力机制，抛弃了 RNN 的循环结构和 CNN 的局部卷积',
      '自注意力（Self-Attention）允许序列中任意两个位置直接交互，捕获长距离依赖',
      '多头注意力（Multi-Head Attention）让模型在不同的表示子空间并行学习',
      '位置编码（Positional Encoding）补回了序列顺序信息（注意力本身是位置无关的）',
      'Encoder-Decoder 双结构：BERT 用 Encoder（理解），GPT 用 Decoder（生成）',
      '并行计算能力强，比 RNN 训练快一个数量级，是大模型时代的基础',
    ],
    useCases: [
      {title: '大语言模型', description: 'GPT、BERT、Claude、文心一言等所有主流 LLM 都基于 Transformer 的 Decoder 或 Encoder 结构', example: 'GPT-4 是 100+ 层 Transformer Decoder 的堆叠，参数量达万亿级'},
      {title: '机器翻译', description: 'Transformer 最初就是为翻译任务设计，今天仍是高质量翻译的主流架构', example: 'Google Translate 全面切换到 Transformer 后，翻译质量大幅提升'},
      {title: '代码生成', description: '基于 Transformer 的代码模型（Codex、Code Llama）可以补全、生成、解释代码', example: 'GitHub Copilot 基于 Codex 模型，可以根据注释自动生成函数实现'},
      {title: '多模态任务', description: 'Transformer 扩展到图像（ViT）、音频（Whisper）、视频等多种模态', example: 'Vision Transformer (ViT) 把图像切成小块后用 Transformer 处理，在 ImageNet 上达到 SOTA'},
    ],
    relatedConcepts: [
      {conceptId: 'attention', relationType: 'uses', relationLabel: '使用'},
      {conceptId: 'llm', relationType: 'is-foundation-of', relationLabel: '是基础'},
      {conceptId: 'deep-learning', relationType: 'belongs-to', relationLabel: '属于'},
      {conceptId: 'moe', relationType: 'can-extend', relationLabel: '可扩展'},
    ],
    resources: [
      {title: 'Attention Is All You Need (原论文)', url: 'https://arxiv.org/abs/1706.03762', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
      {title: 'The Illustrated Transformer', url: 'https://jalammar.github.io/illustrated-transformer/', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      {title: '台大李宏毅 Transformer 讲解', url: 'https://www.youtube.com/watch?v=ugWDIIOHtPA', type: 'video', language: 'zh', difficulty: 'intermediate', recommended: true},
    ],
  },
};

export default transformer;
