import type {ConceptDetail} from '@site/src/components/Graph/types';

/**
 * 概念详情动态加载器
 * 39 个概念详情按需 import，避免首页 bundle 过大
 */

export const conceptIds: string[] = [
  'llm', 'prompt', 'tokenizer', 'temperature', 'embedding', 'vector-db',
  'fine-tuning', 'prompt-engineering', 'chain-of-thought', 'rag', 'agent',
  'ai-gateway', 'mcp', 'tool-calling', 'multi-agent', 'reasoning', 'rlvr',
  'test-time-compute', 'react', 'vibe-coding', 'computer-use', 'agentic-ai',
  'transformer', 'attention', 'deep-learning', 'neural-network',
  'machine-learning', 'rlhf', 'lora', 'quantization', 'nlp',
  'computer-vision', 'gan', 'dpo', 'few-shot-learning', 'moe',
  'function-calling', 'langchain', 'a2a',
];

/**
 * 通过 ID 异步加载概念详情
 * webpack 自动 code-split 每个概念为独立 chunk
 */
export async function getConceptDetail(id: string): Promise<ConceptDetail | null> {
  if (!conceptIds.includes(id)) return null;
  try {
    const module = await import(
      /* webpackChunkName: "concept-detail" */ './' + id
    );
    return module.default || null;
  } catch (err) {
    console.error('Failed to load concept: ' + id, err);
    return null;
  }
}
