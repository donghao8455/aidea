import type {ConceptDetail} from '@site/src/components/Graph/types';

const deepLearning: ConceptDetail = {
  id: 'deep-learning',
  name: '深度学习',
  nameEn: 'Deep Learning',
  abbreviation: 'DL',
  category: 'basic',
  difficulty: 2,
  tags: ['AI', '神经网络', '机器学习', '深度神经网络'],
  tooltip: {summary: '基于多层神经网络的机器学习方法，是现代 AI 突破的核心驱动力'},
  detail: {
    definition: '深度学习（Deep Learning）是机器学习的一个分支，通过构建具有多个隐藏层的深层神经网络（Deep Neural Network），从数据中自动学习多层次的抽象特征表示。深度学习的"深度"指的就是网络层数（从几层到上千层不等）。2012 年 AlexNet 在 ImageNet 图像识别竞赛中大幅超越传统方法，标志着深度学习时代的开端。此后，深度学习在计算机视觉、自然语言处理、语音识别、强化学习等领域全面突破，催生了 GPT、AlphaGo、Stable Diffusion 等里程碑成果。',
    plainExplanation: '传统机器学习需要人类专家手动设计"特征"（比如识别猫要提取耳朵形状、眼睛颜色等）。深度学习让机器自己学习这些特征，而且通过多层网络能从简单特征逐步组合出复杂特征：第一层识别线条和色块，中间层识别眼睛和耳朵，最后几层识别"这是一只完整的猫"。层数越多，能学到的特征越抽象、越强大。',
    analogy: '深度学习就像教小孩认识世界：3 岁时只能识别"这是圆的"、"这是方的"（底层特征）；6 岁时能识别"这是苹果"、"这是球"（中层概念）；15 岁时能理解"这是牛顿第二定律"（高层抽象）。每一层都在前一层的基础上建立更复杂的理解。深层网络正是模拟了这种从具体到抽象的认知过程。',
    keyPoints: [
      '深层神经网络：通常指隐藏层数 > 3 的网络，从几层到上千层（如 GPT-4）',
      '端到端学习：不需要人工设计特征，输入数据 → 输出结果，中间一切由网络自己学',
      '数据驱动：模型性能随数据量增长而提升，是典型的"大力出奇迹"',
      'GPU 并行计算：深度学习训练依赖 GPU/TPU 的并行算力',
      '激活函数（ReLU、Sigmoid）引入非线性，让网络能学习复杂模式',
      '反向传播 + 梯度下降是训练核心算法，2010 年代后优化器不断进化（Adam、AdamW）',
    ],
    useCases: [
      {title: '图像识别', description: '深度卷积神经网络（CNN）在图像分类、目标检测、人脸识别上达到超人水平', example: '手机人脸解锁、医院的医学影像诊断都依赖深度学习'},
      {title: '自然语言处理', description: '基于 Transformer 的语言模型彻底改变了 NLP 领域', example: 'ChatGPT、翻译系统、智能客服都基于深度学习'},
      {title: '语音识别与合成', description: '深度学习让语音转文字、文字转语音的准确率大幅提升', example: 'Siri、小爱同学、TTS 配音都基于深度神经网络'},
      {title: '游戏与决策', description: '深度强化学习在围棋、Atari 游戏、机器人控制上超越人类', example: 'AlphaGo、AlphaZero 通过深度学习 + 强化学习战胜人类世界冠军'},
    ],
    relatedConcepts: [
      {conceptId: 'neural-network', relationType: 'is-built-on', relationLabel: '基于'},
      {conceptId: 'machine-learning', relationType: 'is-subfield-of', relationLabel: '是子领域'},
      {conceptId: 'llm', relationType: 'powers', relationLabel: '驱动'},
      {conceptId: 'transformer', relationType: 'uses', relationLabel: '使用'},
      {conceptId: 'gan', relationType: 'includes', relationLabel: '包含'},
    ],
    resources: [
      {title: 'Deep Learning (经典教材)', url: 'https://www.deeplearningbook.org/', type: 'documentation', language: 'en', difficulty: 'advanced', recommended: true},
      {title: '吴恩达深度学习课程', url: 'https://www.coursera.org/specializations/deep-learning', type: 'video', language: 'zh', difficulty: 'beginner', recommended: true},
      {title: '3Blue1Brown 神经网络可视化', url: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', type: 'video', language: 'en', difficulty: 'beginner', recommended: true},
    ],
  },
};

export default deepLearning;
