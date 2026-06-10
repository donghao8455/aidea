import type {ConceptDetail} from '@site/src/components/Graph/types';

const reasoning: ConceptDetail = {    id: 'reasoning',
    name: '推理模型',
    nameEn: 'Reasoning Model',
    abbreviation: 'Reasoning',
    category: 'tech',
    difficulty: 4,
    tags: ['tech', 'reasoning', '2025', 'advanced'],
    tooltip: {summary: '具备"慢思考"能力的AI模型，通过内化的思维链进行复杂推理和验证'},
    detail: {
      definition: '推理模型(Reasoning Model)是2025年崛起的AI模型新类别，具备内化的"慢思考"(System 2 Thinking)能力。这类模型在输出最终答案前，会先在隐藏空间中进行长链条的逻辑推演、自我反思与路径规划。代表模型包括OpenAI o1/o3、DeepSeek R1、Google Gemini 3等。',
      plainExplanation: '普通AI像"直觉反应"，看到问题直接给答案。推理模型像"深思熟虑"，会先在脑子里推演几步、检查有没有漏洞，然后才给出最终答案。就像数学考试时，不会看到题就写答案，而是会先分析题目、列步骤、验算。',
      analogy: '就像人类中的"直觉型"vs"分析型"。直觉型反应快但容易出错，分析型反应慢但更可靠。推理模型就是AI中的"分析型"——它愿意花更多时间思考，以确保答案正确。',
      keyPoints: [
        '内化思维链：CoT能力成为模型内置能力，而非外部提示',
        '测试时算力扩展：可通过增加思考时间换取更好结果',
        'RLVR驱动：基于可验证奖励的强化学习训练',
        '自我验证：能检验答案正确性并自我修正',
        '复杂任务专精：数学、代码、逻辑推理能力显著提升',
      ],
      useCases: [
        {title: '数学问题求解', description: '处理复杂数学证明和计算', example: '奥数题、高等数学推导、公式证明'},
        {title: '代码生成与调试', description: '生成高质量代码并自我调试', example: 'SWE-bench测试中o3得分69%，能自动修复Bug'},
        {title: '复杂决策分析', description: '多步骤逻辑推理和方案评估', example: '商业策略分析、风险评估、多方案比较'},
        {title: '科学问题研究', description: '辅助科研假设验证和实验设计', example: '药物分子设计、物理问题求解'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'chain-of-thought', relationType: 'internalizes', relationLabel: '内化'},
        {conceptId: 'rlvr', relationType: 'powered-by', relationLabel: '驱动'},
        {conceptId: 'test-time-compute', relationType: 'uses', relationLabel: '使用'},
      ],
      resources: [
        {title: 'DeepSeek-R1论文', url: 'https://arxiv.org/abs/2501.12948', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
        {title: 'OpenAI o1技术解析', url: 'https://openai.com/index/openai-o1/', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
};

export default reasoning;
