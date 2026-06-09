export interface AINewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  tag?: 'hot' | 'new' | 'top';
  category: 'tech' | 'industry' | 'research' | 'tool';
}

// 模拟数据 - 后续可替换为真实 API
export const aiNewsData: AINewsItem[] = [
  {
    id: 1,
    title: 'OpenAI 发布 GPT-5：多模态推理能力大幅提升',
    source: 'OpenAI Blog',
    time: '2小时前',
    tag: 'hot',
    category: 'tech',
  },
  {
    id: 2,
    title: 'Google DeepMind 医疗AI通过FDA临床审批',
    source: 'TechCrunch',
    time: '5小时前',
    tag: 'new',
    category: 'industry',
  },
  {
    id: 3,
    title: '斯坦福提出思维链蒸馏方法：小模型媲美大模型推理能力',
    source: 'arXiv',
    time: '昨天',
    category: 'research',
  },
  {
    id: 4,
    title: 'Anthropic 发布 Claude Code Agent 自主编程助手',
    source: 'Anthropic',
    time: '昨天',
    tag: 'hot',
    category: 'tool',
  },
  {
    id: 5,
    title: 'Meta 开源 LLaMA 4：405B参数对标闭源SOTA',
    source: 'Meta AI',
    time: '2天前',
    category: 'tech',
  },
  {
    id: 6,
    title: '特斯拉 FSD V13 端到端神经网络接管率降低90%',
    source: 'Tesla',
    time: '3天前',
    category: 'industry',
  },
  {
    id: 7,
    title: '苹果 Siri 全面接入大模型，WWDC26 重磅发布',
    source: 'Apple Newsroom',
    time: '3天前',
    tag: 'new',
    category: 'tech',
  },
  {
    id: 8,
    title: 'MIT 研究团队发现 LLM 存在系统性数学幻觉模式',
    source: 'MIT News',
    time: '4天前',
    category: 'research',
  },
  {
    id: 9,
    title: '字节跳动 Seedance 2.0 视频生成模型开源',
    source: '字节跳动',
    time: '4天前',
    tag: 'hot',
    category: 'tool',
  },
  {
    id: 10,
    title: '欧盟 AI 法案正式生效，全球首个全面AI监管法规落地',
    source: 'EU Commission',
    time: '5天前',
    tag: 'top',
    category: 'industry',
  },
  {
    id: 11,
    title: 'NVIDIA 发布 B200 Blackwell GPU：AI训练性能翻倍',
    source: 'NVIDIA Blog',
    time: '5天前',
    category: 'tech',
  },
  {
    id: 12,
    title: '清华系团队开源 Agent 编排框架 AutoGen v2.0',
    source: 'GitHub',
    time: '1周前',
    category: 'tool',
  },
];

export type NewsTab = 'hot' | 'latest' | 'all';

export const tabLabels: Record<NewsTab, string> = {
  hot: '热搜榜',
  latest: '实时榜',
  all: '全部动态',
};
