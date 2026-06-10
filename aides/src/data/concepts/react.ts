import type {ConceptDetail} from '@site/src/components/Graph/types';

const react: ConceptDetail = {    id: 'react',
    name: '推理行动模式',
    nameEn: 'ReAct',
    abbreviation: 'ReAct',
    category: 'methodology',
    difficulty: 3,
    tags: ['methodology', 'agent', 'reasoning', 'foundational'],
    tooltip: {summary: '让AI交替进行推理和行动的智能体架构模式'},
    detail: {
      definition: 'ReAct(Reasoning and Acting)是一种让AI模型交替进行推理和行动的智能体架构模式。在ReAct循环中，模型先"思考"决定下一步行动，然后"执行"该行动，再根据执行结果进行下一轮推理。这种"边想边做、做了再想"的模式使智能体能更好地处理复杂任务。',
      plainExplanation: 'ReAct就是让AI"想一步做一步"。不是一次性想完所有步骤再做，而是想一步、做一步、看看结果、再想下一步。就像你到了一个陌生城市，边走边问边看地图，而不是一次性看完地图再出发。',
      analogy: '就像做实验：先提出假设(推理)，然后做实验(行动)，根据实验结果修正假设(推理)，再做更多实验(行动)。科学发现就是这样一步步推进的，ReAct让AI也具备这种迭代能力。',
      keyPoints: [
        '交替循环：推理→行动→观察→推理→...',
        '外部反馈：行动结果作为下一步推理的输入',
        '动态规划：根据执行情况调整后续计划',
        '错误恢复：发现错误时可回退和修正',
        '透明可解释：能展示思考过程和行动理由',
      ],
      useCases: [
        {title: '智能客服', description: '多轮对话中逐步理解和解决用户问题', example: '电商客服：查询订单→确认信息→处理退款→发送确认'},
        {title: '自动化办公', description: '按步骤执行复杂业务流程', example: '报销流程：收集发票→验证发票→提交审批→通知结果'},
        {title: '数据分析Agent', description: '交互式数据探索和分析', example: '查询数据→发现问题→深入分析→生成报告'},
        {title: '研究助手', description: '分步骤进行文献检索和总结', example: '搜索论文→筛选相关→阅读摘要→深入阅读→整理笔记'},
      ],
      relatedConcepts: [
        {conceptId: 'agent', relationType: 'implements', relationLabel: '实现'},
        {conceptId: 'chain-of-thought', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'tool-calling', relationType: 'uses', relationLabel: '使用'},
      ],
      resources: [
        {title: 'ReAct论文', url: 'https://arxiv.org/abs/2210.03629', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default react;
