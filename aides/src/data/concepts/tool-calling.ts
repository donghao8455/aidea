import type {ConceptDetail} from '@site/src/components/Graph/types';

const tool_calling: ConceptDetail = {    id: 'tool-calling',
    name: '工具调用',
    nameEn: 'Tool Calling',
    abbreviation: 'Tool Calling',
    category: 'tool',
    difficulty: 3,
    tags: ['函数调用', '插件'],
    tooltip: {summary: '让LLM能够调用外部函数或API的技术'},
    detail: {
      definition: '工具调用(Tool Calling)是让大语言模型能够调用外部函数、API或服务的能力。通过Tool Calling，AI不再局限于训练数据，而是可以实时获取信息、执行操作、与外部系统交互。这是实现AI Agent的核心能力之一。',
      plainExplanation: 'Tool Calling就是给AI装上"手"。之前AI只能"看"和"说"，现在AI可以真正"动手"做事了——查天气、搜信息、下订单，都能自动完成。',
      analogy: '就像给一个人配备了工具箱。原本只能用嘴说，现在有了工具，可以查资料、做计算、实际操作。就像一个能从理论走向实践的助手。',
      keyPoints: [
        '让AI能调用外部API和函数',
        '支持实时数据查询和操作',
        '是实现AI Agent的基础能力',
        '需要明确定义工具的输入输出格式',
      ],
      useCases: [
        {title: '实时查询', description: 'AI实时获取最新信息', example: '查天气、查股价、查新闻'},
        {title: '外部操作', description: 'AI执行实际操作', example: '发邮件、下订单、创建日程'},
        {title: '数据处理', description: 'AI处理数据库或文件', example: '查询数据库、读写文件'},
        {title: '计算执行', description: 'AI执行精确计算', example: '执行Python代码、数学计算'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'enables', relationLabel: '使能'},
        {conceptId: 'mcp', relationType: 'standardized-by', relationLabel: '标准化'},
        {conceptId: 'agent', relationType: 'used-by', relationLabel: '被使用'},
      ],
      resources: [
        {title: 'OpenAI Function Calling', url: 'https://platform.openai.com/docs/guides/function-calling', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
};

export default tool_calling;
