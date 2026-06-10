import type {ConceptDetail} from '@site/src/components/Graph/types';

const test_time_compute: ConceptDetail = {    id: 'test-time-compute',
    name: '测试时算力扩展',
    nameEn: 'Test-time Compute',
    abbreviation: 'TTC',
    category: 'tech',
    difficulty: 4,
    tags: ['tech', 'scaling', '2025', 'advanced'],
    tooltip: {summary: '通过在推理时消耗更多计算资源来提升模型输出质量的技术范式'},
    detail: {
      definition: '测试时算力扩展(Test-time Compute Scaling)是一种通过在模型推理时增加计算量来提升输出质量的技术范式。与传统的预训练扩展不同，TTC允许模型在"思考"时消耗更多token和计算资源。在复杂任务上可通过延长思考时间获得显著更好的结果。',
      plainExplanation: '传统模型"想都不想就答"，推理模型会"多想一会儿再答"。TTC就是让AI有更多时间思考——就像考试时给你更多时间，你能答得更好一样。',
      analogy: '就像解题时，你可以选择快速心算，也可以选择草稿纸一步步演算。选择演算法消耗更多时间，但准确率更高。TTC就是让AI选择"演算"而不是"心算"。',
      keyPoints: [
        '推理时扩展：不同于预训练扩展，在推理阶段增加计算',
        '自适应思考时间：简单问题快速答，复杂问题深思熟虑',
        '质量换时间：用更多思考时间换取更高准确率',
        'Token消耗增加：推理成本高于传统模型',
        'SWE-bench收益：在编程任务上TTC效果显著',
      ],
      useCases: [
        {title: '复杂代码生成', description: '需要多步骤推理的编程任务', example: '完整项目代码生成、自动Bug修复'},
        {title: '数学证明', description: '需要多步推导的数学问题', example: '奥数题、高等数学、公式推导'},
        {title: '战略决策', description: '需要权衡多种因素的复杂决策', example: '商业策略、投资分析、风险评估'},
        {title: '多轮规划', description: '需要分解和规划的多步骤任务', example: '旅行规划、项目管理、复杂任务执行'},
      ],
      relatedConcepts: [
        {conceptId: 'reasoning', relationType: 'enables', relationLabel: '实现'},
        {conceptId: 'llm', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'chain-of-thought', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'Nvidia: LLM Reasoning and Test-time Scaling', url: 'https://developer.nvidia.com/blog/an-easy-introduction-to-llm-reasoning-ai-agents-and-test-time-scaling/', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default test_time_compute;
