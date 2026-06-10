import type {ConceptDetail} from '@site/src/components/Graph/types';

const rlhf: ConceptDetail = {
  id: 'rlhf',
  name: 'RLHF',
  nameEn: 'Reinforcement Learning from Human Feedback',
  abbreviation: 'RLHF',
  category: 'methodology',
  difficulty: 3,
  tags: ['训练方法', '对齐', '奖励模型', '强化学习'],
  tooltip: {summary: '基于人类反馈的强化学习，让大模型输出更符合人类偏好的回答'},
  detail: {
    definition: 'RLHF（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）是一种训练大语言模型的关键技术，由 OpenAI 在训练 InstructGPT 和 ChatGPT 时推广。RLHF 的核心思想是：先训练一个奖励模型（Reward Model）来模拟人类偏好，然后用强化学习（PPO 算法）通过奖励模型的反馈微调语言模型。流程分三步：(1) 监督微调（SFT）让模型学会听话；(2) 训练奖励模型（RM）——让人类标注员对模型输出排序，训练 RM 学会"什么是好回答"；(3) 强化学习（RL）——用 RM 作为奖励信号，让语言模型通过 PPO 优化，输出更符合人类偏好的内容。',
    plainExplanation: '直接训练大模型回答问题，只能让模型学会"接下来说什么词最像训练数据"，但不一定是有用、无害、诚实的回答。RLHF 就像给模型请了一个"老师"：老师不是直接告诉模型"标准答案是什么"，而是给模型的多个回答打分（"这个回答更好"），让模型学会什么样的回答人类更喜欢。就像学生通过老师的反馈改进作文，而不是背范文。',
    analogy: 'RLHF 就像训练一只导盲犬：传统训练是给狗看 1000 张"好狗"和"坏狗"的照片（监督学习），但好行为很难穷举。RLHF 是让训犬师实时给狗打分：它做对了给零食，做错了轻轻纠正。狗通过反复试错 + 即时反馈，学会主人想要的行为，而不是死记硬背。RM 就是那个"训犬师标准"，PPO 算法就是狗调整行为的过程。',
    keyPoints: [
      '三步流程：SFT（监督微调）→ RM（奖励模型）→ RL（强化学习 PPO）',
      '奖励模型（RM）学习人类偏好排序，是 RLHF 的核心',
      'PPO（Proximal Policy Optimization）算法是 OpenAI 主力使用的 RL 算法',
      '对齐（Alignment）目标：让 AI 系统的目标和人类价值观一致（有用、诚实、无害）',
      'Reward Hacking 风险：模型可能学会"骗过" RM 而非真正改进（Goodhart\'s Law）',
      '替代方案：DPO（直接偏好优化）跳过 RM，更简单但效果接近',
    ],
    useCases: [
      {title: 'ChatGPT 对齐训练', description: 'OpenAI 用 RLHF 训练 GPT-3.5/GPT-4，让其输出符合人类偏好的回答', example: 'ChatGPT 会主动拒绝有害请求、承认错误、给出有根据的回答'},
      {title: 'Claude 宪法 AI', description: 'Anthropic 用 RLHF + 宪法原则训练 Claude，专注于有用、诚实、无害', example: 'Claude 在保持礼貌的同时，能拒绝不当请求'},
      {title: '代码助手', description: 'RLHF 让代码模型生成更符合开发者偏好的代码风格', example: 'GitHub Copilot 通过 RLHF 学习用户的代码风格和注释习惯'},
      {title: '创意写作', description: 'RLHF 让写作模型产生更符合人类审美和价值观的文本', example: 'AI 写作助手能写出更流畅、更有情感、更少套话的文章'},
    ],
    relatedConcepts: [
      {conceptId: 'llm', relationType: 'trains', relationLabel: '训练'},
      {conceptId: 'dpo', relationType: 'is-replaced-by', relationLabel: '被替代'},
      {conceptId: 'fine-tuning', relationType: 'includes', relationLabel: '包含'},
    ],
    resources: [
      {title: 'Training language models to follow instructions (InstructGPT 论文)', url: 'https://arxiv.org/abs/2203.02155', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
      {title: 'Illustrating RLHF', url: 'https://huggingface.co/blog/rlhf', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      {title: '李宏毅 RLHF 讲解', url: 'https://www.youtube.com/watch?v=Xf1HNIp3UBk', type: 'video', language: 'zh', difficulty: 'intermediate', recommended: true},
    ],
  },
};

export default rlhf;
