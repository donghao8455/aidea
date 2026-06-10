import type {ConceptDetail} from '@site/src/components/Graph/types';

const chain_of_thought: ConceptDetail = {    id: 'chain-of-thought',
    name: '思维链',
    nameEn: 'Chain of Thought',
    abbreviation: 'CoT',
    category: 'methodology',
    difficulty: 3,
    tags: ['推理', '逻辑'],
    tooltip: {summary: '通过分步骤推理提高复杂问题解答能力的技术'},
    detail: {
      definition: '思维链(Chain of Thought, CoT)是一种提示工程技术，通过在Prompt中引导AI展示推理过程来提升复杂问题的解答能力。CoT让AI不是直接给出答案，而是先展示思考步骤，从而得到更准确、更可靠的推理结果。',
      plainExplanation: 'CoT就是让AI"想清楚再回答"。不要它直接给答案，而是让它先把推理过程说出来。就像老师教学生时，不只给答案，还要讲解解题思路。',
      analogy: '就像做数学题时老师要求写解题步骤。虽然直接写答案快，但写步骤能帮助发现错误、理清思路。CoT就是让AI也这样做，从而得到更准确的答案。',
      keyPoints: [
        '引导AI展示推理过程而非直接给答案',
        '显著提升数学、逻辑、代码等任务的准确率',
        '可以结合Few-shot一起使用',
        'Self-Consistency等技术可进一步提升效果',
      ],
      useCases: [
        {title: '数学推理', description: '解决复杂数学问题', example: '分数计算、几何证明、概率问题'},
        {title: '逻辑推理', description: '处理需要逻辑推理的任务', example: '"谁是凶手"类推理题'},
        {title: '代码调试', description: '分析代码问题并提供修复建议', example: '解释Bug原因和修复思路'},
        {title: '决策分析', description: '展示决策的完整推理过程', example: '商业决策的利弊分析'},
      ],
      relatedConcepts: [
        {conceptId: 'prompt', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'agent', relationType: 'used-in', relationLabel: '用于'},
      ],
      resources: [
        {title: 'Chain-of-Thought论文', url: 'https://arxiv.org/abs/2201.11903', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default chain_of_thought;
