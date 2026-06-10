/**
 * 概念 ID 列表
 * 必须与 aides/src/data/graphData.ts 中的 conceptOrder 保持一致
 * 用于 LLM Prompt 动态注入（避免硬编码 50+ ID 列表）
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
