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

export const allConcepts: Record<string, ConceptDetail> = {
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
};

export const conceptOrder = [
  'llm', 'prompt', 'tokenizer', 'temperature', 
  'embedding', 'vector-db', 'fine-tuning', 
  'prompt-engineering', 'chain-of-thought', 
  'rag', 'agent', 'ai-gateway', 
  'mcp', 'tool-calling', 'multi-agent'
];
