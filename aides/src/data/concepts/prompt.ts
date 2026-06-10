import type {ConceptDetail} from '@site/src/components/Graph/types';

const prompt: ConceptDetail = {    id: 'prompt',
    name: '提示词',
    nameEn: 'Prompt',
    abbreviation: 'Prompt',
    category: 'basic',
    difficulty: 1,
    tags: ['交互', '指令'],
    tooltip: {summary: '与AI模型交互时输入的文本指令，是引导AI输出的关键'},
    detail: {
      definition: '提示词(Prompt)是用户向大语言模型发送的文本输入，用于引导模型生成特定类型的响应。Prompt可以是一个问题、一段描述、一个任务指令，甚至是角色扮演设定。设计良好的Prompt能够显著提升AI输出的质量、准确性和实用性。',
      plainExplanation: 'Prompt就像和AI对话时的"说话方式"。同样一个问题，用不同的方式问，AI的回答可能完全不同。好的Prompt能让AI更准确地理解你的需求，给出你想要的答案。',
      analogy: 'Prompt就像给AI的"任务卡"。你写得越清楚、具体，AI完成得就越好。就像给员工下达指令：模糊的指令会导致错误的工作，而清晰的指令能确保正确的结果。',
      keyPoints: [
        'Prompt是用户与LLM交互的唯一方式',
        '包含指令(告诉AI做什么)、上下文(提供背景信息)、输入数据(具体问题)三个要素',
        '零样本提示直接提问，少样本提示提供示例',
        '通过设计Prompt可以引导AI完成各种复杂任务',
      ],
      useCases: [
        {title: '问答系统', description: '通过提问获取信息', example: '问天气、问知识、问建议'},
        {title: '内容生成', description: '生成文章、代码、邮件等', example: '写营销文案、生成代码框架'},
        {title: '角色扮演', description: '让AI扮演特定角色', example: '作为面试官、作为律师提供建议'},
        {title: '数据处理', description: '分析、总结、翻译文本', example: '总结长文章、翻译外语文档'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'used-by', relationLabel: '被使用'},
        {conceptId: 'prompt-engineering', relationType: 'optimized-by', relationLabel: '优化'},
      ],
      resources: [
        {title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/zh', type: 'documentation', language: 'zh', difficulty: 'beginner', recommended: true},
      ],
    },
};

export default prompt;
