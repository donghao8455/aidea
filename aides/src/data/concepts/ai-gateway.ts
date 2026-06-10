import type {ConceptDetail} from '@site/src/components/Graph/types';

const ai_gateway: ConceptDetail = {    id: 'ai-gateway',
    name: 'AI网关',
    nameEn: 'AI Gateway',
    abbreviation: 'AI Gateway',
    category: 'architecture',
    difficulty: 3,
    tags: ['路由', '负载均衡', '监控'],
    tooltip: {summary: '管理、路由和监控AI模型调用的中间层服务'},
    detail: {
      definition: 'AI网关(AI Gateway)是管理、路由和监控AI模型调用的中间层服务。它提供统一的API接口，支持多模型切换、负载均衡、流量控制、访问控制、成本分析等功能。AI网关是企业使用大模型的标准基础设施。',
      plainExplanation: 'AI网关就像公司的"前台接待"。所有对AI的请求都先经过它，它决定谁来处理、怎么路由、是否限流、记录日志等。',
      analogy: '就像医院的分诊台。病人(请求)先到分诊台，根据病情分配到不同科室(不同模型)，记录就诊信息，控制就诊人数。',
      keyPoints: [
        '统一API接口，屏蔽后端模型差异',
        '支持多模型负载均衡和自动failover',
        '提供访问控制、限流、成本分析',
        '支持请求缓存、重试、超时处理',
      ],
      useCases: [
        {title: '多模型管理', description: '统一管理多个AI服务提供商', example: '同时使用OpenAI、Anthropic、国产模型'},
        {title: '成本控制', description: '监控和限制AI调用成本', example: '设置部门月度配额'},
        {title: '流量管理', description: '限流、熔断、负载均衡', example: '促销期间保护后端服务'},
        {title: '安全审计', description: '记录和审计所有AI调用', example: '满足合规要求'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'manages', relationLabel: '管理'},
        {conceptId: 'agent', relationType: 'used-by', relationLabel: '被使用'},
      ],
      resources: [
        {title: 'PortKey AI', url: 'https://portkey.ai/', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default ai_gateway;
