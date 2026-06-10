import type {ConceptDetail} from '@site/src/components/Graph/types';

const agent: ConceptDetail = {    id: 'agent',
    name: '智能体',
    nameEn: 'AI Agent',
    abbreviation: 'Agent',
    category: 'architecture',
    difficulty: 4,
    tags: ['自主', '决策', '执行'],
    tooltip: {summary: '能够自主决策、规划并执行任务的AI系统'},
    detail: {
      definition: 'AI智能体(AI Agent)是一种能够自主感知环境、做出决策并执行行动以实现特定目标的AI系统。与传统单次问答不同，Agent具备规划能力、记忆能力、工具使用能力以及反思能力。Agent代表了从"被动回答"到"主动执行"的范式转变。',
      plainExplanation: '如果说普通AI是"问答机器人"，那Agent就是"AI员工"。你给它一个目标，它会自己规划步骤，遇到问题自己解决，而不是每次都问你。',
      analogy: 'Agent就像一位私人助理。你告诉助理"安排下周的上海出差"，助理会自己查航班、订酒店、安排日程、发确认邮件。你不需要一步步指导。',
      keyPoints: [
        '自主性: 能独立规划和执行任务',
        '规划能力: 将复杂目标分解为可执行的子任务',
        '工具使用: 能调用API、查询数据库、执行代码等',
        '反思能力: 能评估行动结果，从错误中学习调整',
      ],
      useCases: [
        {title: '自动化办公', description: '自动处理邮件、安排会议、生成报告', example: 'Agent自动整理邮件、安排日程'},
        {title: '智能客服', description: '不仅能回答，还能执行操作', example: '用户说"我要退鞋"，Agent自动处理退款'},
        {title: '代码开发', description: '端到端完成编程任务', example: 'Devin等AI程序员'},
        {title: '数据分析', description: '自动获取数据、分析、生成报告', example: '分析销售数据并生成洞察'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'powered-by', relationLabel: '驱动'},
        {conceptId: 'tool-calling', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'rag', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'multi-agent', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'ReAct论文', url: 'https://arxiv.org/abs/2210.03629', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default agent;
