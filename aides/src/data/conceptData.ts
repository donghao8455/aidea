import type {ConceptData} from '@site/src/components/Graph/types';

export interface ConceptDetail {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  difficulty: number;
  tags: string[];
  level: number;
  tooltip: {
    summary: string;
  };
  detail: {
    definition: string;
    plainExplanation: string;
    analogy: string;
    keyPoints: string[];
    useCases: Array<{
      title: string;
      description: string;
      example?: string;
    }>;
    relatedConcepts: Array<{
      conceptId: string;
      relationType: string;
      relationLabel: string;
    }>;
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'paper' | 'documentation';
      language: 'zh' | 'en';
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      recommended: boolean;
    }>;
  };
  metadata: {
    version: number;
    createdAt: string;
    updatedAt: string;
    author: string;
    status: string;
  };
}

import llmData from '@site/data/concepts/llm.json';
import promptData from '@site/data/concepts/prompt.json';
import tokenizerData from '@site/data/concepts/tokenizer.json';
import temperatureData from '@site/data/concepts/temperature.json';
import embeddingData from '@site/data/concepts/embedding.json';
import vectorDbData from '@site/data/concepts/vector-db.json';
import fineTuningData from '@site/data/concepts/fine-tuning.json';
import promptEngineeringData from '@site/data/concepts/prompt-engineering.json';
import chainOfThoughtData from '@site/data/concepts/chain-of-thought.json';
import ragData from '@site/data/concepts/rag.json';
import agentData from '@site/data/concepts/agent.json';
import aiGatewayData from '@site/data/concepts/ai-gateway.json';
import mcpData from '@site/data/concepts/mcp.json';
import toolCallingData from '@site/data/concepts/tool-calling.json';
import multiAgentData from '@site/data/concepts/multi-agent.json';

export const conceptDetailsMap: Record<string, ConceptDetail> = {
  llm: llmData as ConceptDetail,
  prompt: promptData as ConceptDetail,
  tokenizer: tokenizerData as ConceptDetail,
  temperature: temperatureData as ConceptDetail,
  embedding: embeddingData as ConceptDetail,
  'vector-db': vectorDbData as ConceptDetail,
  'fine-tuning': fineTuningData as ConceptDetail,
  'prompt-engineering': promptEngineeringData as ConceptDetail,
  'chain-of-thought': chainOfThoughtData as ConceptDetail,
  rag: ragData as ConceptDetail,
  agent: agentData as ConceptDetail,
  'ai-gateway': aiGatewayData as ConceptDetail,
  mcp: mcpData as ConceptDetail,
  'tool-calling': toolCallingData as ConceptDetail,
  'multi-agent': multiAgentData as ConceptDetail,
};

export function getConceptDetail(id: string): ConceptDetail | null {
  return conceptDetailsMap[id] || null;
}

export function getAllConceptIds(): string[] {
  return Object.keys(conceptDetailsMap);
}

export const allConcepts: ConceptDetail[] = [
  llmData as ConceptDetail,
  promptData as ConceptDetail,
  tokenizerData as ConceptDetail,
  temperatureData as ConceptDetail,
  embeddingData as ConceptDetail,
  vectorDbData as ConceptDetail,
  fineTuningData as ConceptDetail,
  promptEngineeringData as ConceptDetail,
  chainOfThoughtData as ConceptDetail,
  ragData as ConceptDetail,
  agentData as ConceptDetail,
  aiGatewayData as ConceptDetail,
  mcpData as ConceptDetail,
  toolCallingData as ConceptDetail,
  multiAgentData as ConceptDetail,
];

export function getAdjacentConcepts(currentId: string): {prev: ConceptData | null; next: ConceptData | null} {
  const ids = Object.keys(conceptDetailsMap);
  const currentIndex = ids.indexOf(currentId);
  const prevId = currentIndex > 0 ? ids[currentIndex - 1] : null;
  const nextId = currentIndex < ids.length - 1 ? ids[currentIndex + 1] : null;

  const concepts = require('@site/src/components/Graph/types').concepts;

  return {
    prev: prevId ? concepts.find((c: ConceptData) => c.id === prevId) || null : null,
    next: nextId ? concepts.find((c: ConceptData) => c.id === nextId) || null : null,
  };
}