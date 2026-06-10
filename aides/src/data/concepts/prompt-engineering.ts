import type {ConceptDetail} from '@site/src/components/Graph/types';

const prompt_engineering: ConceptDetail = {    id: 'prompt-engineering',
    name: '提示词工程',
    nameEn: 'Prompt Engineering',
    abbreviation: 'PE',
    category: 'methodology',
    difficulty: 2,
    tags: ['优化', '最佳实践'],
    tooltip: {summary: '设计高效提示词以获得更好AI输出的学科'},
    detail: {
      definition: '提示词工程(Prompt Engineering)是研究和实践如何设计、优化提示词(Prompt)以更好地与AI模型交互的学科。它涉及理解模型行为、设计有效的输入格式、运用各种技巧提升输出质量。好的Prompt Engineering可以显著提升AI应用的效果。',
      plainExplanation: 'Prompt Engineering就是研究如何"提问"的一门学问。同样的问题，用不同的方式问，效果可能天差地别。这门学问教我们如何更好地与AI沟通。',
      analogy: '就像学习如何有效地沟通。知道怎么说话能让对方更准确地理解你的意思。好的Prompt就像清晰的指令，能让AI更有效地帮助你。',
      keyPoints: [
        '包含指令、上下文、输入数据、输出格式四个要素',
        '常用技巧: Few-shot、Chain-of-Thought、Role Play',
        '需要理解模型的能力和限制',
        '是AI应用开发的核心技能',
      ],
      useCases: [
        {title: '提升回答质量', description: '通过优化Prompt得到更准确的答案', example: '添加具体示例提高回答准确度'},
        {title: '控制输出格式', description: '让AI按指定格式输出', example: '生成JSON格式的结构化数据'},
        {title: '复杂任务分解', description: '将复杂问题分解为简单步骤', example: '用Chain-of-Thought引导推理'},
        {title: '角色扮演', description: '让AI扮演特定角色', example: '作为资深架构师提供建议'},
      ],
      relatedConcepts: [
        {conceptId: 'prompt', relationType: 'optimizes', relationLabel: '优化'},
        {conceptId: 'llm', relationType: 'works-with', relationLabel: '配合'},
      ],
      resources: [
        {title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/zh', type: 'documentation', language: 'zh', difficulty: 'beginner', recommended: true},
      ],
    },
};

export default prompt_engineering;
