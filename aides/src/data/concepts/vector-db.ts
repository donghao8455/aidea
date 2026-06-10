import type {ConceptDetail} from '@site/src/components/Graph/types';

const vector_db: ConceptDetail = {    id: 'vector-db',
    name: '向量数据库',
    nameEn: 'Vector Database',
    abbreviation: 'Vector DB',
    category: 'tech',
    difficulty: 3,
    tags: ['存储', '相似度检索'],
    tooltip: {summary: '专门用于存储和检索向量数据的数据库系统'},
    detail: {
      definition: '向量数据库(Vector Database)是专门设计用于存储和高效检索高维向量数据的数据库系统。它支持向量相似度搜索，能在数十亿量级的向量中快速找到与查询向量最相似的Top-K结果。常用的相似度度量包括余弦相似度、欧氏距离和点积。',
      plainExplanation: '向量数据库就像一个"智能仓库"，专门存储Embedding生成的向量。当你想找与某个词最相似的内容时，它能快速在仓库中找到距离最近的"邻居"。',
      analogy: '就像一个超大图书馆的索引系统。当你想找"和《活着》相似的书"时，系统不用一本本翻，而是在索引中找到位置相近的书架，直接给你推荐附近的书。',
      keyPoints: [
        '专门优化向量存储和相似度检索',
        '支持十亿级向量规模的高效检索',
        '常用索引算法: HNSW、IVF、PQ',
        '常见向量数据库: Milvus、Pinecone、Weaviate、Chroma',
      ],
      useCases: [
        {title: 'RAG系统', description: '存储文档向量用于检索增强生成', example: '企业知识库问答系统'},
        {title: '以图搜图', description: '根据图片向量找相似图片', example: '电商平台商品图片搜索'},
        {title: '推荐系统', description: '存储用户和物品向量做推荐', example: '短视频推荐、电商商品推荐'},
        {title: '去重检测', description: '找出重复或高度相似的内容', example: '论文查重、代码相似度检测'},
      ],
      relatedConcepts: [
        {conceptId: 'embedding', relationType: 'stores', relationLabel: '存储'},
        {conceptId: 'rag', relationType: 'used-in', relationLabel: '用于'},
      ],
      resources: [
        {title: '向量数据库对比', url: 'https://milvus.io/docs/overview.md', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
};

export default vector_db;
