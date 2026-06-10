import type {ConceptDetail} from '@site/src/components/Graph/types';

const multi_agent: ConceptDetail = {    id: 'multi-agent',
    name: '多智能体',
    nameEn: 'Multi-Agent',
    abbreviation: 'Multi-Agent',
    category: 'architecture',
    difficulty: 5,
    tags: ['协作', '分布式', '复杂任务'],
    tooltip: {summary: '多个AI智能体协作解决问题的架构'},
    detail: {
      definition: '多智能体系统(Multi-Agent System)是由多个AI智能体协同工作来解决复杂问题的架构。每个Agent扮演特定角色，拥有专门的工具和知识，通过协作、讨论和任务分配来完成单个Agent难以完成的复杂任务。这种架构模拟了人类团队协作模式。',
      plainExplanation: '多智能体就像一支AI团队。不是让一个AI做所有事，而是有专门的AI负责不同环节：规划、写作、检查。它们相互讨论、分工合作，就像人类团队一样。',
      analogy: '就像电影制作团队。导演负责把控，编剧写剧本，摄影师拍摄，剪辑师后期。多智能体系统也是这样，不同AI负责不同环节，通过协作完成复杂项目。',
      keyPoints: [
        '角色分工: 每个Agent有专门的角色和职责',
        '协作机制: Agent之间可以通信、讨论、委托任务',
        '任务分解: 复杂任务自动分解为子任务',
        '工作流编排: 支持顺序、并行、条件分支等流程',
      ],
      useCases: [
        {title: '软件开发', description: '多个Agent协作开发软件', example: '产品经理、程序员、测试员Agent协作'},
        {title: '内容创作', description: '策划、写作、编辑、设计协作', example: '研究→写作→编辑→设计'},
        {title: '商业分析', description: '数据、行业、策略Agent协作', example: '分析市场趋势并制定方案'},
        {title: '客户服务', description: '前台、技术、售后Agent协作', example: '根据问题类型自动转接'},
      ],
      relatedConcepts: [
        {conceptId: 'agent', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'llm', relationType: 'powered-by', relationLabel: '驱动'},
      ],
      resources: [
        {title: 'MetaGPT论文', url: 'https://arxiv.org/abs/2308.00352', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
      ],
    },
};

export default multi_agent;
