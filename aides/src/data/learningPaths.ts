/**
 * 学习路径数据
 *
 * 3 条预设路径，引导用户按推荐顺序学习 AI 概念
 */

export interface LearningPath {
  id: 'beginner' | 'developer' | 'frontier';
  name: string;
  description: string;
  audience: string;
  conceptIds: string[];
}

export const learningPaths: LearningPath[] = [
  {
    id: 'beginner',
    name: '零基础入门',
    description: '7 节点，约 30 分钟',
    audience: 'AI 小白',
    conceptIds: [
      'prompt', 'llm', 'tokenizer', 'temperature',
      'prompt-engineering', 'chain-of-thought', 'rag',
    ],
  },
  {
    id: 'developer',
    name: '应用开发',
    description: '6 节点，约 25 分钟',
    audience: '开发者',
    conceptIds: [
      'llm', 'embedding', 'vector-db', 'rag', 'agent', 'mcp',
    ],
  },
  {
    id: 'frontier',
    name: '前沿技术',
    description: '5 节点，约 25 分钟',
    audience: '研究者',
    conceptIds: [
      'fine-tuning', 'rlhf', 'reasoning', 'test-time-compute', 'agentic-ai',
    ],
  },
];

export function getLearningPath(id: string): LearningPath | undefined {
  return learningPaths.find(p => p.id === id);
}
