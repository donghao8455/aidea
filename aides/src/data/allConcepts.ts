/**
 * AI-Aides 单一数据源 (Single Source of Truth)
 *
 * 所有概念详情、图谱简化数据、关系数据均由此文件统一管理。
 * 其他组件应从此文件导入，不要在别处硬编码概念数据。
 */

import type {ConceptData, RelationData} from '@site/src/components/Graph/types';

/* ============================================================
 * 完整概念数据类型（详情页使用）
 * ============================================================ */

export interface ConceptDetail {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool';
  difficulty: number;
  tags: string[];
  tooltip: {summary: string};
  detail: {
    definition: string;
    plainExplanation: string;
    analogy: string;
    keyPoints: string[];
    useCases: Array<{title: string; description: string; example?: string}>;
    relatedConcepts: Array<{conceptId: string; relationType: string; relationLabel: string}>;
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'paper' | 'documentation';
      language: 'zh' | 'en';
      difficulty: 'beginner' | 'intermediate' | 'advanced';
      recommended: boolean;
    }>;
  };
}

/* ============================================================
 * 概念详情数据（15 个概念的完整内容）
 * ============================================================ */

const conceptMap: Record<string, ConceptDetail> = {
  llm: {
    id: 'llm',
    name: '大语言模型',
    nameEn: 'Large Language Model',
    abbreviation: 'LLM',
    category: 'basic',
    difficulty: 2,
    tags: ['AI', 'NLP', '深度学习', 'Transformer'],
    tooltip: {summary: '能理解和生成人类语言的大型神经网络模型，是当代AI的核心技术'},
    detail: {
      definition: '大语言模型(Large Language Model, LLM)是指通过海量文本数据训练而成的大型神经网络模型，具有理解和生成自然语言的能力。这类模型通常包含数十亿到数千亿个参数，能够执行文本生成、翻译、摘要、问答等多种任务。代表模型包括GPT-4、Claude、文心一言、通义千问等。',
      plainExplanation: '想象LLM是一个读过互联网上几乎所有书籍、文章和对话的超级读者。它通过学习这些文本中的模式和规律，学会了如何像人类一样理解和使用语言。当你问它问题时，它会根据学到的知识来生成回答。',
      analogy: '就像一位博览群书的智者，LLM读过无数书籍和文章，积累了丰富的知识。当你向它请教时，它能基于所学给出有见地的回答，就像一位随时待命的私人导师。',
      keyPoints: [
        '基于Transformer架构，通过自注意力机制理解上下文关系',
        '参数量巨大(数十亿到数千亿)，需要大量计算资源训练',
        '通过预测下一个词的方式学习语言规律',
        '具备涌现能力，能完成训练时未明确教授的任务',
        '可通过提示词(Prompt)引导完成特定任务',
      ],
      useCases: [
        {title: '智能客服', description: '自动回答用户咨询，处理常见问题，提升服务效率', example: '某电商平台使用LLM处理80%的售前咨询'},
        {title: '内容创作', description: '辅助写作、生成营销文案、撰写邮件和报告', example: '自媒体创作者使用LLM生成文章大纲'},
        {title: '代码辅助', description: '代码补全、Bug修复、代码解释和技术文档生成', example: 'GitHub Copilot帮助开发者自动完成30%的代码'},
        {title: '教育辅导', description: '个性化答疑、作业批改、知识点讲解', example: '在线教育平台使用LLM提供24小时答疑'},
      ],
      relatedConcepts: [
        {conceptId: 'prompt', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'prompt-engineering', relationType: 'related', relationLabel: '相关'},
        {conceptId: 'rag', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'agent', relationType: 'powers', relationLabel: '驱动'},
        {conceptId: 'fine-tuning', relationType: 'improved-by', relationLabel: '可被改进'},
      ],
      resources: [
        {title: 'Attention Is All You Need', url: 'https://arxiv.org/abs/1706.03762', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
        {title: 'GPT-4技术报告', url: 'https://arxiv.org/abs/2303.08774', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  prompt: {
    id: 'prompt',
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
  },
  tokenizer: {
    id: 'tokenizer',
    name: '分词器',
    nameEn: 'Tokenizer',
    abbreviation: 'Tokenizer',
    category: 'basic',
    difficulty: 2,
    tags: ['文本处理', '词元化'],
    tooltip: {summary: '将文本分割成词元(Token)的工具，是LLM处理文本的基础'},
    detail: {
      definition: '分词器(Tokenizer)是LLM处理文本的第一步，它将输入的文本分割成一个个词元(Token)。Token可以是单词、字符或子词，取决于具体的分词算法。不同模型使用不同的Tokenizer，理解Token对于估算成本、控制输出长度很重要。',
      plainExplanation: 'Tokenizer就像是把一整句话拆成小块的过程。英文通常按单词或子词拆分，中文可以按字、词或子字拆分。每个小块就是一个Token，LLM实际上是在处理这些Token。',
      analogy: '就像拆积木。Tokenizer把完整的文本"拆"成一块块小积木(Token)，LLM再对这些小积木进行堆叠、组合、理解。知道每块积木的大小，才能准确估计能搭多高(生成多长)。',
      keyPoints: [
        '不同模型使用不同的Tokenizer，中文Tokenizer差异尤其大',
        '1个Token约等于0.75个英文单词，或1-2个中文字',
        'Token数量直接影响API调用成本',
        '常见的Tokenizer算法包括BPE、WordPiece、SentencePiece',
      ],
      useCases: [
        {title: '文本预处理', description: 'LLM处理任何文本前的必要步骤', example: '输入文本先经过分词才能被模型理解'},
        {title: '成本估算', description: '估算API调用的token消耗', example: '计算输入+输出的总token数来估算费用'},
        {title: '输出控制', description: '通过限制token数控制输出长度', example: '设置max_tokens限制最大生成长度'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'used-by', relationLabel: '被使用'},
      ],
      resources: [
        {title: 'OpenAI Tokenizer工具', url: 'https://platform.openai.com/tokenizer', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
  },
  temperature: {
    id: 'temperature',
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
  },
  embedding: {
    id: 'embedding',
    name: '向量嵌入',
    nameEn: 'Embedding',
    abbreviation: 'Embedding',
    category: 'tech',
    difficulty: 3,
    tags: ['向量化', '语义表示'],
    tooltip: {summary: '将文本转换为高维向量表示的技术，让AI能计算语义相似度'},
    detail: {
      definition: '向量嵌入(Embedding)是将离散的文本、图像或其他数据转换为连续的高维向量(通常是数百到数千维)的技术。这些向量捕捉了数据的语义特征，使得语义相似的内容在向量空间中距离相近。Embedding是现代NLP和推荐系统的核心技术，广泛应用于语义搜索、文本分类、聚类分析等任务。',
      plainExplanation: 'Embedding就像给每个词或句子一个"地址"。意思相近的词，它们的"地址"也很近。比如"国王"和"女王"的地址很近。这样AI就能通过计算"距离"来理解语义关系。',
      analogy: '想象每个词都是图书馆里的一本书。Embedding就是给每本书分配一个书架位置，内容相似的书放在一起。当你想找"机器学习"相关的书时，AI就能在附近找到"深度学习"等相关书籍。',
      keyPoints: [
        '将高维稀疏数据转换为低维稠密向量',
        '语义相似的内容在向量空间中距离相近',
        '经典模型: Word2Vec、GloVe、BERT、OpenAI Embedding',
        '支持向量运算: 国王 - 男人 + 女人约等于女王',
      ],
      useCases: [
        {title: '语义搜索', description: '基于含义而非关键词匹配进行搜索', example: '搜索"苹果"时，能同时找到iPhone和水果相关内容'},
        {title: '推荐系统', description: '根据用户和物品的向量相似度推荐', example: 'Netflix根据观看历史推荐相似影片'},
        {title: '文本分类', description: '将文本转换为向量后输入分类器', example: '自动将客户评论分类为正面或负面'},
        {title: 'RAG检索', description: '将文档和查询都转为向量找相关文档', example: '客服系统找到与用户问题最相关的知识库文档'},
      ],
      relatedConcepts: [
        {conceptId: 'vector-db', relationType: 'stored-in', relationLabel: '存储于'},
        {conceptId: 'rag', relationType: 'component-of', relationLabel: '组成部分'},
        {conceptId: 'llm', relationType: 'used-by', relationLabel: '被使用'},
      ],
      resources: [
        {title: 'OpenAI Embedding API文档', url: 'https://platform.openai.com/docs/guides/embeddings', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
  },
  'vector-db': {
    id: 'vector-db',
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
  },
  'fine-tuning': {
    id: 'fine-tuning',
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
  },
  'prompt-engineering': {
    id: 'prompt-engineering',
    name: '提示词工程',
    nameEn: 'Prompt Engineering',
    abbreviation: 'PE',
    category: 'methodology',
    difficulty: 2,
    tags: ['优化', '最佳实践'],
    tooltip: {summary: '设计高效提示词以获得更好AI输出的学科'},
    detail: {
      definition: '提示词工程(Prompt Engineering)是研究和实践如何设计、优化提示词(Prompt)以更好地与AI模型交互的学科。它涉及理解模型行为、设计有效的输入格式、运用各种技巧提升输出质量。好的Prompt Engineering可以显著提升AI应用的效果。',
      plainExplanation: 'Prompt Engineering就是研究如何"提问"的一门学问。同样的问题，用不同的方式问，效果可能天差地别。这门学问教我们如何更好地与AI沟通。',
      analogy: '就像学习如何有效地沟通。知道怎么说话能让对方更准确地理解你的意思。好的Prompt就像清晰的指令，能让AI更有效地帮助你。',
      keyPoints: [
        '包含指令、上下文、输入数据、输出格式四个要素',
        '常用技巧: Few-shot、Chain-of-Thought、Role Play',
        '需要理解模型的能力和限制',
        '是AI应用开发的核心技能',
      ],
      useCases: [
        {title: '提升回答质量', description: '通过优化Prompt得到更准确的答案', example: '添加具体示例提高回答准确度'},
        {title: '控制输出格式', description: '让AI按指定格式输出', example: '生成JSON格式的结构化数据'},
        {title: '复杂任务分解', description: '将复杂问题分解为简单步骤', example: '用Chain-of-Thought引导推理'},
        {title: '角色扮演', description: '让AI扮演特定角色', example: '作为资深架构师提供建议'},
      ],
      relatedConcepts: [
        {conceptId: 'prompt', relationType: 'optimizes', relationLabel: '优化'},
        {conceptId: 'llm', relationType: 'works-with', relationLabel: '配合'},
      ],
      resources: [
        {title: 'Prompt Engineering Guide', url: 'https://www.promptingguide.ai/zh', type: 'documentation', language: 'zh', difficulty: 'beginner', recommended: true},
      ],
    },
  },
  'chain-of-thought': {
    id: 'chain-of-thought',
    name: '思维链',
    nameEn: 'Chain of Thought',
    abbreviation: 'CoT',
    category: 'methodology',
    difficulty: 3,
    tags: ['推理', '逻辑'],
    tooltip: {summary: '通过分步骤推理提高复杂问题解答能力的技术'},
    detail: {
      definition: '思维链(Chain of Thought, CoT)是一种提示工程技术，通过在Prompt中引导AI展示推理过程来提升复杂问题的解答能力。CoT让AI不是直接给出答案，而是先展示思考步骤，从而得到更准确、更可靠的推理结果。',
      plainExplanation: 'CoT就是让AI"想清楚再回答"。不要它直接给答案，而是让它先把推理过程说出来。就像老师教学生时，不只给答案，还要讲解解题思路。',
      analogy: '就像做数学题时老师要求写解题步骤。虽然直接写答案快，但写步骤能帮助发现错误、理清思路。CoT就是让AI也这样做，从而得到更准确的答案。',
      keyPoints: [
        '引导AI展示推理过程而非直接给答案',
        '显著提升数学、逻辑、代码等任务的准确率',
        '可以结合Few-shot一起使用',
        'Self-Consistency等技术可进一步提升效果',
      ],
      useCases: [
        {title: '数学推理', description: '解决复杂数学问题', example: '分数计算、几何证明、概率问题'},
        {title: '逻辑推理', description: '处理需要逻辑推理的任务', example: '"谁是凶手"类推理题'},
        {title: '代码调试', description: '分析代码问题并提供修复建议', example: '解释Bug原因和修复思路'},
        {title: '决策分析', description: '展示决策的完整推理过程', example: '商业决策的利弊分析'},
      ],
      relatedConcepts: [
        {conceptId: 'prompt', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'agent', relationType: 'used-in', relationLabel: '用于'},
      ],
      resources: [
        {title: 'Chain-of-Thought论文', url: 'https://arxiv.org/abs/2201.11903', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  rag: {
    id: 'rag',
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
  },
  agent: {
    id: 'agent',
    name: '智能体',
    nameEn: 'AI Agent',
    abbreviation: 'Agent',
    category: 'architecture',
    difficulty: 4,
    tags: ['自主', '决策', '执行'],
    tooltip: {summary: '能够自主决策、规划并执行任务的AI系统'},
    detail: {
      definition: 'AI智能体(AI Agent)是一种能够自主感知环境、做出决策并执行行动以实现特定目标的AI系统。与传统单次问答不同，Agent具备规划能力、记忆能力、工具使用能力以及反思能力。Agent代表了从"被动回答"到"主动执行"的范式转变。',
      plainExplanation: '如果说普通AI是"问答机器人"，那Agent就是"AI员工"。你给它一个目标，它会自己规划步骤，遇到问题自己解决，而不是每次都问你。',
      analogy: 'Agent就像一位私人助理。你告诉助理"安排下周的上海出差"，助理会自己查航班、订酒店、安排日程、发确认邮件。你不需要一步步指导。',
      keyPoints: [
        '自主性: 能独立规划和执行任务',
        '规划能力: 将复杂目标分解为可执行的子任务',
        '工具使用: 能调用API、查询数据库、执行代码等',
        '反思能力: 能评估行动结果，从错误中学习调整',
      ],
      useCases: [
        {title: '自动化办公', description: '自动处理邮件、安排会议、生成报告', example: 'Agent自动整理邮件、安排日程'},
        {title: '智能客服', description: '不仅能回答，还能执行操作', example: '用户说"我要退鞋"，Agent自动处理退款'},
        {title: '代码开发', description: '端到端完成编程任务', example: 'Devin等AI程序员'},
        {title: '数据分析', description: '自动获取数据、分析、生成报告', example: '分析销售数据并生成洞察'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'powered-by', relationLabel: '驱动'},
        {conceptId: 'tool-calling', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'rag', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'multi-agent', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'ReAct论文', url: 'https://arxiv.org/abs/2210.03629', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  'ai-gateway': {
    id: 'ai-gateway',
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
  },
  mcp: {
    id: 'mcp',
    name: '模型上下文协议',
    nameEn: 'Model Context Protocol',
    abbreviation: 'MCP',
    category: 'tool',
    difficulty: 4,
    tags: ['协议', '标准化'],
    tooltip: {summary: '标准化AI模型与外部工具交互的协议'},
    detail: {
      definition: '模型上下文协议(Model Context Protocol, MCP)是由Anthropic提出的开放标准协议，旨在标准化AI模型与外部工具、数据源之间的通信。MCP定义了工具描述、调用格式、数据交互等规范，让开发者可以一次开发、处处运行。',
      plainExplanation: 'MCP就像USB接口一样。之前每个AI工具都要单独适配，有了MCP，就像有了统一的数据线接口，任何支持MCP的工具都能即插即用。',
      analogy: '就像手机充电口的标准化。之前的手机有各种充电口，现在USB-C统一了。MCP就是AI工具的"USB-C"，让AI能方便地连接各种外部工具和数据。',
      keyPoints: [
        '开放标准，任何人都可以实现',
        '一次开发，多个AI系统复用',
        '支持工具调用、资源访问、提示模板',
        '由Anthropic发起，得到广泛支持',
      ],
      useCases: [
        {title: '工具集成', description: '让AI能调用各种外部工具', example: 'AI连接数据库、文件系统、API'},
        {title: '数据源连接', description: 'AI访问各种数据源', example: '连接Notion、Slack、Github等'},
        {title: '跨平台复用', description: '开发的工具被多个AI使用', example: '写一次工具，Claude和GPT都能用'},
      ],
      relatedConcepts: [
        {conceptId: 'tool-calling', relationType: 'standardizes', relationLabel: '标准化'},
        {conceptId: 'agent', relationType: 'used-by', relationLabel: '被使用'},
      ],
      resources: [
        {title: 'MCP官方文档', url: 'https://modelcontextprotocol.io/', type: 'documentation', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  'tool-calling': {
    id: 'tool-calling',
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
  },
  'multi-agent': {
    id: 'multi-agent',
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
  },
  reasoning: {
    id: 'reasoning',
    name: '推理模型',
    nameEn: 'Reasoning Model',
    abbreviation: 'Reasoning',
    category: 'tech',
    difficulty: 4,
    tags: ['tech', 'reasoning', '2025', 'advanced'],
    tooltip: {summary: '具备"慢思考"能力的AI模型，通过内化的思维链进行复杂推理和验证'},
    detail: {
      definition: '推理模型(Reasoning Model)是2025年崛起的AI模型新类别，具备内化的"慢思考"(System 2 Thinking)能力。这类模型在输出最终答案前，会先在隐藏空间中进行长链条的逻辑推演、自我反思与路径规划。代表模型包括OpenAI o1/o3、DeepSeek R1、Google Gemini 3等。',
      plainExplanation: '普通AI像"直觉反应"，看到问题直接给答案。推理模型像"深思熟虑"，会先在脑子里推演几步、检查有没有漏洞，然后才给出最终答案。就像数学考试时，不会看到题就写答案，而是会先分析题目、列步骤、验算。',
      analogy: '就像人类中的"直觉型"vs"分析型"。直觉型反应快但容易出错，分析型反应慢但更可靠。推理模型就是AI中的"分析型"——它愿意花更多时间思考，以确保答案正确。',
      keyPoints: [
        '内化思维链：CoT能力成为模型内置能力，而非外部提示',
        '测试时算力扩展：可通过增加思考时间换取更好结果',
        'RLVR驱动：基于可验证奖励的强化学习训练',
        '自我验证：能检验答案正确性并自我修正',
        '复杂任务专精：数学、代码、逻辑推理能力显著提升',
      ],
      useCases: [
        {title: '数学问题求解', description: '处理复杂数学证明和计算', example: '奥数题、高等数学推导、公式证明'},
        {title: '代码生成与调试', description: '生成高质量代码并自我调试', example: 'SWE-bench测试中o3得分69%，能自动修复Bug'},
        {title: '复杂决策分析', description: '多步骤逻辑推理和方案评估', example: '商业策略分析、风险评估、多方案比较'},
        {title: '科学问题研究', description: '辅助科研假设验证和实验设计', example: '药物分子设计、物理问题求解'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'chain-of-thought', relationType: 'internalizes', relationLabel: '内化'},
        {conceptId: 'rlvr', relationType: 'powered-by', relationLabel: '驱动'},
        {conceptId: 'test-time-compute', relationType: 'uses', relationLabel: '使用'},
      ],
      resources: [
        {title: 'DeepSeek-R1论文', url: 'https://arxiv.org/abs/2501.12948', type: 'paper', language: 'en', difficulty: 'intermediate', recommended: true},
        {title: 'OpenAI o1技术解析', url: 'https://openai.com/index/openai-o1/', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
  },
  rlvr: {
    id: 'rlvr',
    name: '可验证奖励强化学习',
    nameEn: 'RLVR',
    abbreviation: 'RLVR',
    category: 'tech',
    difficulty: 5,
    tags: ['tech', 'training', '2025', 'advanced'],
    tooltip: {summary: '基于客观可验证结果进行奖励的强化学习方法，驱动2025年推理模型突破'},
    detail: {
      definition: 'RLVR(Reinforcement Learning from Verifiable Rewards)是基于可验证奖励的强化学习方法。与RLHF依赖人类主观打分不同，RLVR利用客观、可自动验证的结果(如代码能否运行、数学答案是否正确)作为奖励信号。这使得模型能在没有人类干预的情况下，通过数百万次试错自我进化出复杂推理能力。',
      plainExplanation: '传统RLHF像老师打分，但老师可能判断不准确。RLVR像考试阅卷，答案对错一目了然。模型做对了就奖励，做错了就惩罚，完全客观。',
      analogy: '就像学习下棋：传统方法是看教练的脸色调整策略，RLVR方法是直接看棋局输赢。赢了就强化这步棋，输了就避免这种走法。完全靠结果说话，不需要人解释为什么。',
      keyPoints: [
        '客观奖励：答案正确性可自动验证，无需人工标注',
        '自我博弈：模型通过与环境交互自主探索策略',
        '无需人类干预：训练过程高度自动化',
        '涌现推理能力：RLVR训练中自发产生类似"思考"的策略',
        '高效率：每美元算力产出更高的能力提升',
      ],
      useCases: [
        {title: '推理模型训练', description: '训练具备深度推理能力的AI模型', example: 'DeepSeek R1、OpenAI o1/o3的训练基础'},
        {title: '代码生成优化', description: '让模型学会生成可运行的代码', example: '通过代码编译和测试结果作为奖励信号'},
        {title: '数学问题求解', description: '提升模型解决数学问题的能力', example: '用答案正确性作为奖励，训练数学推理模型'},
        {title: '游戏AI训练', description: '训练能在复杂游戏中获胜的AI', example: '围棋、星际争霸等策略游戏AI'},
      ],
      relatedConcepts: [
        {conceptId: 'llm', relationType: 'trains', relationLabel: '训练'},
        {conceptId: 'reasoning', relationType: 'enables', relationLabel: '赋能'},
      ],
      resources: [
        {title: 'DeepSeek-R1论文', url: 'https://arxiv.org/abs/2501.12948', type: 'paper', language: 'en', difficulty: 'advanced', recommended: true},
        {title: 'Karpathy 2025 LLM Year in Review', url: 'https://karpathy.bearblog.dev/year-in-review-2025/', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  'test-time-compute': {
    id: 'test-time-compute',
    name: '测试时算力扩展',
    nameEn: 'Test-time Compute',
    abbreviation: 'TTC',
    category: 'tech',
    difficulty: 4,
    tags: ['tech', 'scaling', '2025', 'advanced'],
    tooltip: {summary: '通过在推理时消耗更多计算资源来提升模型输出质量的技术范式'},
    detail: {
      definition: '测试时算力扩展(Test-time Compute Scaling)是一种通过在模型推理时增加计算量来提升输出质量的技术范式。与传统的预训练扩展不同，TTC允许模型在"思考"时消耗更多token和计算资源。在复杂任务上可通过延长思考时间获得显著更好的结果。',
      plainExplanation: '传统模型"想都不想就答"，推理模型会"多想一会儿再答"。TTC就是让AI有更多时间思考——就像考试时给你更多时间，你能答得更好一样。',
      analogy: '就像解题时，你可以选择快速心算，也可以选择草稿纸一步步演算。选择演算法消耗更多时间，但准确率更高。TTC就是让AI选择"演算"而不是"心算"。',
      keyPoints: [
        '推理时扩展：不同于预训练扩展，在推理阶段增加计算',
        '自适应思考时间：简单问题快速答，复杂问题深思熟虑',
        '质量换时间：用更多思考时间换取更高准确率',
        'Token消耗增加：推理成本高于传统模型',
        'SWE-bench收益：在编程任务上TTC效果显著',
      ],
      useCases: [
        {title: '复杂代码生成', description: '需要多步骤推理的编程任务', example: '完整项目代码生成、自动Bug修复'},
        {title: '数学证明', description: '需要多步推导的数学问题', example: '奥数题、高等数学、公式推导'},
        {title: '战略决策', description: '需要权衡多种因素的复杂决策', example: '商业策略、投资分析、风险评估'},
        {title: '多轮规划', description: '需要分解和规划的多步骤任务', example: '旅行规划、项目管理、复杂任务执行'},
      ],
      relatedConcepts: [
        {conceptId: 'reasoning', relationType: 'enables', relationLabel: '实现'},
        {conceptId: 'llm', relationType: 'extends', relationLabel: '扩展'},
        {conceptId: 'chain-of-thought', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'Nvidia: LLM Reasoning and Test-time Scaling', url: 'https://developer.nvidia.com/blog/an-easy-introduction-to-llm-reasoning-ai-agents-and-test-time-scaling/', type: 'article', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
  react: {
    id: 'react',
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
  },
  'vibe-coding': {
    id: 'vibe-coding',
    name: '氛围编程',
    nameEn: 'Vibe Coding',
    abbreviation: 'VC',
    category: 'methodology',
    difficulty: 2,
    tags: ['methodology', 'coding', '2025', 'trending'],
    tooltip: {summary: '2025年新兴的AI辅助编程范式，开发者用自然语言描述意图，AI完成代码实现'},
    detail: {
      definition: 'Vibe Coding是2025年随Claude Code、Google Jules等AI编程工具兴起的新编程范式。开发者不再直接编写代码，而是用自然语言描述想要的功能和"感觉"，由AI理解意图后生成代码。开发者扮演"产品经理+架构师"的角色，把控方向而非细节。',
      plainExplanation: '以前写代码是"我要一行行敲代码"，Vibe Coding是"我说话，AI帮我写代码"。就像跟一个懂编程的助手说"帮我做一个登录页面，要简洁好看"，助手就帮你做好了。',
      analogy: '就像导演和编剧的关系：导演不用自己写剧本，只需要跟编剧描述"我要什么感觉、什么氛围"，编剧来完成具体台词。Vibe Coding中，开发者是导演，AI是编剧。',
      keyPoints: [
        '意图驱动：用自然语言描述而非代码指令',
        'AI代笔：代码由AI生成，开发者审核修改',
        '快速原型：能快速验证想法和方向',
        '角色转变：从"码农"变成"AI管理者"',
        '仍需验收：开发者负责确保代码质量',
      ],
      useCases: [
        {title: '快速原型开发', description: '快速将想法转化为可运行的代码', example: '创业公司用Vibe Coding快速验证MVP'},
        {title: '前端开发', description: '用描述性语言构建UI界面', example: '"要一个现代感的仪表盘，包含图表和表格"'},
        {title: '代码重构', description: '用自然语言描述重构目标', example: '"把这个函数改成更易读的版本"'},
        {title: '学习辅助', description: '通过描述想要的功能学习编程', example: '初学者通过AI生成的代码学习编程'},
      ],
      relatedConcepts: [
        {conceptId: 'agent', relationType: 'powers', relationLabel: '驱动'},
        {conceptId: 'llm', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'computer-use', relationType: 'extends', relationLabel: '扩展'},
      ],
      resources: [
        {title: 'Claude Code官方文档', url: 'https://docs.anthropic.com/en/docs/claude-code', type: 'documentation', language: 'en', difficulty: 'beginner', recommended: true},
      ],
    },
  },
  'computer-use': {
    id: 'computer-use',
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
  },
  'agentic-ai': {
    id: 'agentic-ai',
    name: '代理式AI',
    nameEn: 'Agentic AI',
    abbreviation: 'Agentic AI',
    category: 'architecture',
    difficulty: 3,
    tags: ['architecture', 'agent', '2025', 'trend'],
    tooltip: {summary: '具备自主规划、工具使用和多步执行能力的AI系统范式'},
    detail: {
      definition: '代理式AI(Agentic AI)是2025年AI发展的核心范式，指具备自主规划、工具使用和多步执行能力的AI系统。与传统的问答式AI不同，Agentic AI能理解长期目标、分解任务、调用工具、适应环境变化，完成从"给指令"到"给目标"的转变。',
      plainExplanation: '普通AI是"工具"——你问什么它答什么。Agentic AI是"员工"——你给它目标，它自己想办法完成。就像工具和员工的区别：工具需要你操作，员工只需要你告诉它目标。',
      analogy: '就像从"用计算器"到"雇会计"的区别。计算器需要你一步步操作，会计只需要你告诉它"帮我算一下今年的财务报表"，它自己会完成所有步骤。',
      keyPoints: [
        '目标导向：理解高层目标而非执行单次指令',
        '自主规划：将复杂目标分解为可执行步骤',
        '工具使用：调用API、搜索信息、执行操作',
        '适应能力：能处理意外情况和环境变化',
        '长期记忆：维护跨会话的上下文和知识',
      ],
      useCases: [
        {title: '智能研究助手', description: '自主完成复杂研究任务', example: 'AI自动搜索文献、分析数据、生成报告'},
        {title: '自动化业务流程', description: '端到端自动化复杂业务流程', example: '从订单处理到客户服务的全流程自动化'},
        {title: '代码开发团队', description: 'AI程序员组成的开发团队', example: 'Devin、Claude Code等AI开发者协作完成项目'},
        {title: '个人AI助手', description: '能代替用户执行多步骤任务', example: '"帮我安排下周去上海的出差"→AI自动完成所有预订'},
      ],
      relatedConcepts: [
        {conceptId: 'agent', relationType: 'is', relationLabel: '是'},
        {conceptId: 'llm', relationType: 'powered-by', relationLabel: '驱动'},
        {conceptId: 'reasoning', relationType: 'uses', relationLabel: '使用'},
        {conceptId: 'mcp', relationType: 'connects-via', relationLabel: '通过MCP连接'},
      ],
      resources: [
        {title: 'Nvidia: What is Agentic AI', url: 'https://blogs.nvidia.com/blog/what-is-agentic-ai/', type: 'article', language: 'en', difficulty: 'beginner', recommended: true},
        {title: 'McKinsey 2025 AI State Report', url: 'https://www.mckinsey.com/industries/technology/our-insights/the-state-of-ai', type: 'report', language: 'en', difficulty: 'intermediate', recommended: true},
      ],
    },
  },
};

/* ============================================================
 * 概念排列顺序（用于详情页的上一个/下一个导航）
 * ============================================================ */

export const conceptOrder = [
  'llm', 'prompt', 'tokenizer', 'temperature',
  'embedding', 'vector-db', 'fine-tuning',
  'prompt-engineering', 'chain-of-thought',
  'rag', 'agent', 'ai-gateway',
  'mcp', 'tool-calling', 'multi-agent',
  'reasoning', 'rlvr', 'test-time-compute',
  'react', 'vibe-coding', 'computer-use', 'agentic-ai',
];

/* ============================================================
 * 关系数据（图谱连线使用）
 * ============================================================ */

export const relations: RelationData[] = [
  // LLM 基础关系
  {source: 'llm', target: 'prompt', label: '使用'},
  {source: 'llm', target: 'tokenizer', label: '依赖'},
  {source: 'llm', target: 'temperature', label: '受控于'},

  // Prompt 相关
  {source: 'prompt-engineering', target: 'prompt', label: '优化'},
  {source: 'llm', target: 'prompt-engineering', label: '依赖'},

  // Embedding 相关
  {source: 'embedding', target: 'llm', label: '输入处理'},
  {source: 'embedding', target: 'vector-db', label: '存储到'},

  // RAG 架构
  {source: 'llm', target: 'rag', label: '使用'},
  {source: 'rag', target: 'embedding', label: '依赖'},
  {source: 'rag', target: 'vector-db', label: '依赖'},

  // Agent 架构
  {source: 'llm', target: 'agent', label: '驱动'},
  {source: 'agent', target: 'rag', label: '增强'},
  {source: 'agent', target: 'tool-calling', label: '使用'},

  // AI Gateway
  {source: 'agent', target: 'ai-gateway', label: '通过'},
  {source: 'llm', target: 'ai-gateway', label: '通过'},

  // Tool Calling & MCP
  {source: 'tool-calling', target: 'mcp', label: '基于'},
  {source: 'agent', target: 'mcp', label: '使用'},

  // Multi-Agent
  {source: 'multi-agent', target: 'agent', label: '包含多个'},
  {source: 'multi-agent', target: 'ai-gateway', label: '协调'},

  // Fine-tuning
  {source: 'fine-tuning', target: 'llm', label: '优化'},

  // Chain of Thought
  {source: 'chain-of-thought', target: 'llm', label: '增强'},
  {source: 'chain-of-thought', target: 'agent', label: '用于'},

  // 2025 New Concepts - Reasoning
  {source: 'llm', target: 'reasoning', label: '扩展'},
  {source: 'reasoning', target: 'chain-of-thought', label: '内化'},
  {source: 'reasoning', target: 'rlvr', label: '驱动'},
  {source: 'reasoning', target: 'test-time-compute', label: '使用'},

  // RLVR
  {source: 'rlvr', target: 'llm', label: '训练'},

  // Test-time Compute
  {source: 'test-time-compute', target: 'llm', label: '扩展'},

  // ReAct
  {source: 'agent', target: 'react', label: '实现'},
  {source: 'react', target: 'tool-calling', label: '使用'},
  {source: 'react', target: 'chain-of-thought', label: '扩展'},

  // Agentic AI
  {source: 'agent', target: 'agentic-ai', label: '是'},
  {source: 'agentic-ai', target: 'llm', label: '驱动'},
  {source: 'agentic-ai', target: 'reasoning', label: '使用'},
  {source: 'agentic-ai', target: 'mcp', label: '通过MCP连接'},

  // Computer Use
  {source: 'agent', target: 'computer-use', label: '扩展'},
  {source: 'computer-use', target: 'mcp', label: '使用'},
  {source: 'computer-use', target: 'tool-calling', label: '扩展'},

  // Vibe Coding
  {source: 'vibe-coding', target: 'agent', label: '驱动'},
  {source: 'vibe-coding', target: 'llm', label: '使用'},
  {source: 'vibe-coding', target: 'computer-use', label: '扩展'},

  // Multi-Agent uses ReAct
  {source: 'multi-agent', target: 'react', label: '使用'},
];

/* ============================================================
 * 派生数据：图谱节点简化数据
 * ============================================================ */

/** 从完整数据派生图谱所需的简化数据 */
export const concepts: ConceptData[] = conceptOrder.map(id => {
  const c = conceptMap[id];
  return {
    id: c.id,
    name: c.name,
    nameEn: c.nameEn,
    abbreviation: c.abbreviation,
    category: c.category,
    difficulty: c.difficulty,
    tags: c.tags,
    tooltip: c.tooltip,
  };
});

/* ============================================================
 * 导出：详情页数据访问
 * ============================================================ */

/** 按概念 ID 获取完整详情 */
export function getConceptDetail(id: string): ConceptDetail | null {
  return conceptMap[id] || null;
}

/** 获取所有概念详情（按 conceptOrder 排序） */
export function getAllConceptDetails(): ConceptDetail[] {
  return conceptOrder.map(id => conceptMap[id]);
}

/** 所有概念详情的 Record（兼容旧代码） */
export const allConcepts: Record<string, ConceptDetail> = conceptMap;
