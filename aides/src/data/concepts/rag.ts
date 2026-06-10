import type {ConceptDetail} from '@site/src/components/Graph/types';

const rag: ConceptDetail = {    id: 'rag',
    name: '检索增强生成',
    nameEn: 'Retrieval-Augmented Generation',
    abbreviation: 'RAG',
    category: 'architecture',
    difficulty: 4,
    tags: ['检索', '生成', '知识库'],
    tooltip: {summary: '结合外部知识库检索和LLM生成的架构'},
    detail: {
      definition: '检索增强生成(Retrieval-Augmented Generation, RAG)是一种将信息检索技术与大语言模型生成能力相结合的架构。RAG首先从外部知识库中检索与查询相关的文档，然后将这些文档作为上下文输入给LLM，让模型基于检索到的信息生成回答。这种架构有效解决了LLM的知识截止、幻觉和无法访问私有数据等问题。',
      plainExplanation: 'RAG就像给AI配了一个"资料员"。当你问问题时，资料员先去图书馆找到相关资料，然后AI基于这些资料回答你。这样AI不会胡说八道，也能回答训练数据之外的问题。',
      analogy: '就像写论文时的"文献综述"。你不会凭空写，而是先查资料，再基于资料写作。RAG就是让这个流程自动化。',
      keyPoints: [
        '解决LLM知识截止问题：可访问最新和私有数据',
        '减少幻觉：回答基于检索到的真实文档',
        '可溯源：能指出信息来源，增加可信度',
        '典型流程: 查询→Embedding→向量检索→Top-K文档→Prompt增强→生成',
      ],
      useCases: [
        {title: '企业知识库问答', description: '基于公司内部文档回答员工问题', example: '员工询问报销政策'},
        {title: '客服机器人', description: '基于产品文档回答客户咨询', example: '电商客服基于商品详情回答'},
        {title: '法律文档分析', description: '基于法律条文和案例回答问题', example: '律师查询判例'},
        {title: '医疗咨询', description: '基于医学文献和指南提供信息', example: '医生查询最新治疗方案'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'embedding', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'vector-db', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'agent', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'Retrieval-Augmented Generation论文', url: 'https://arxiv.org/abs/2005.11401', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default rag;
