import type {ConceptDetail} from '@site/src/components/Graph/types';

const computer_use: ConceptDetail = {    id: 'computer-use',
    name: '计算机使用智能体',
    nameEn: 'Computer-Using Agent',
    abbreviation: 'CUA',
    category: 'architecture',
    difficulty: 5,
    tags: ['architecture', 'agent', '2025', 'advanced', 'frontier'],
    tooltip: {summary: '能像人类一样操作电脑界面完成复杂任务的AI智能体'},
    detail: {
      definition: '计算机使用智能体(Computer-Using Agent, CUA)是一种能像人类一样操作电脑界面的AI智能体。CUA能理解屏幕内容、操作鼠标键盘、填写表单、浏览网页，完成从简单点击到复杂多步骤的工作流。OpenAI的CUA和Anthropic的Claude Computer Use都代表了2025年Agent能力的重大突破。',
      plainExplanation: '普通AI只能"看"和"说"，CUA能"看"、"说"、"做"——它能像人一样操作电脑。打开浏览器、点击按钮、填写表格、拖拽文件，它都能做。',
      analogy: '就像给AI装上了一双"机械手"和"眼睛"。以前AI只能通过API跟系统交互，现在能直接操作任何有图形界面的软件。就像从"只能指挥别人干活"变成"自己也能干活"。',
      keyPoints: [
        '视觉理解：理解屏幕上的UI元素和布局',
        '操作执行：模拟鼠标点击、键盘输入等操作',
        '多软件协同：能操作多种不同类型的软件',
        '端到端任务：从自然语言指令到完整操作流程',
        '安全边界：需要防止误操作和恶意指令',
      ],
      useCases: [
        {title: '自动化测试', description: 'AI自动执行端到端测试', example: 'AI自动打开网页、填写表单、验证结果'},
        {title: '数据录入', description: '自动将数据录入各种系统', example: '从PDF提取信息填入Excel或数据库'},
        {title: '网页研究', description: '自动浏览网页收集和分析信息', example: 'AI自动搜索产品、比较价格、生成报告'},
        {title: '办公自动化', description: '自动化处理日常办公任务', example: '自动处理邮件、整理文件、生成报表'},
      ],
      relatedConcepts: [
        {conceptId: 'agent', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'vibe-coding', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'mcp', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'tool-calling', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'OpenAI Computer-Using Agent', url: 'https://platform.openai.com/docs/guides/computer-use', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
        {title: 'Claude Computer Use', url: 'https://docs.anthropic.com/en/docs/claude-agent-computer-use', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default computer_use;
