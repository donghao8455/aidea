import type {ConceptDetail} from '@site/src/components/Graph/types';

const fine_tuning: ConceptDetail = {    id: 'fine-tuning',
    name: '模型微调',
    nameEn: 'Fine-tuning',
    abbreviation: 'Fine-tuning',
    category: 'tech',
    difficulty: 4,
    tags: ['训练', '迁移学习'],
    tooltip: {summary: '在预训练模型基础上使用特定数据继续训练以适应特定任务'},
    detail: {
      definition: '模型微调(Fine-tuning)是在预训练的大模型基础上，使用特定领域或任务的数据进行额外训练的过程。通过微调，模型可以学习特定领域的知识、适应特定的输出风格，或提升在特定任务上的性能。微调相比从头训练需要的数据更少、成本更低。',
      plainExplanation: '微调就像是在一个已经学会说话的人身上，教他学会说专业术语。比如先有一个会说话的基础模型，再教它医学术语，它就成了医学AI助手。',
      analogy: '就像新员工入职培训。预训练模型是具备基本能力的"通用型员工"，微调就是针对特定岗位的"定向培训"，让员工快速适应专业工作。',
      keyPoints: [
        '在预训练模型基础上继续训练',
        '需要的训练数据比从头训练少得多',
        '可以定制模型的行为、风格、格式',
        '常见的微调方法: LoRA、QLoRA、Full Fine-tuning',
      ],
      useCases: [
        {title: '垂直领域定制', description: '训练医疗、法律、金融等专业模型', example: '法律AI助手、医学诊断辅助'},
        {title: '风格迁移', description: '让模型按特定风格输出', example: '模仿某位作家的写作风格'},
        {title: '任务优化', description: '提升特定任务的准确率', example: '提高客服对话的情感识别准确率'},
        {title: '成本优化', description: '使用小模型微调替代大模型', example: '用LoRA微调7B模型媲美70B模型'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'improves', relationLabel: '改进'},
      ],
      resources: [
        {title: 'Fine-tuning指南', url: 'https://platform.openai.com/docs/guides/fine-tuning', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default fine_tuning;
