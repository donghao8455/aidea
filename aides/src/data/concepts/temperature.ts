import type {ConceptDetail} from '@site/src/components/Graph/types';

const temperature: ConceptDetail = {    id: 'temperature',
    name: '温度参数',
    nameEn: 'Temperature',
    abbreviation: 'Temp',
    category: 'basic',
    difficulty: 2,
    tags: ['采样', '随机性'],
    tooltip: {summary: '控制LLM输出随机性的参数，影响创造性和确定性'},
    detail: {
      definition: '温度参数(Temperature)是控制LLM输出随机性的超参数。较低的温度(0-0.3)使输出更确定、更保守；较高的温度(0.7-1.0)使输出更随机、更有创造性。温度为0时，模型总是选择概率最高的词，类似于贪婪采样。',
      plainExplanation: 'Temperature就像是调节AI"保守"还是"创意"的旋钮。调低时，AI更可能给出标准答案；调高时，AI更可能给出出人意料的回答。',
      analogy: 'Temperature就像咖啡的浓度。低温度像清淡的咖啡，味道稳定可预测；高温度像浓烈的咖啡，可能有意想不到的风味，但不一定每个人都喜欢。',
      keyPoints: [
        'Temperature=0时为贪婪采样，总选最高概率词',
        'Temperature=1时保持原始概率分布',
        'Temperature>1时降低高概率词的权重，增加多样性',
        '不同任务需要不同的温度设置',
      ],
      useCases: [
        {title: '代码生成', description: '使用低温度确保代码正确性', example: 'Temperature=0.2适合生成确定性代码'},
        {title: '创意写作', description: '使用高温度增加创意', example: 'Temperature=0.8-1.0适合诗歌、故事创作'},
        {title: '问答系统', description: '使用中等温度平衡准确和多样', example: 'Temperature=0.3-0.7适合一般问答'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'parameter', relationLabel: '参数'},
      ],
      resources: [
        {title: 'Temperature参数详解', url: 'https://platform.openai.com/docs/api-reference/chat/create#chat-create-temperature', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
};

export default temperature;
