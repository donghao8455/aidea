import type {ConceptDetail} from '@site/src/components/Graph/types';

const tokenizer: ConceptDetail = {    id: 'tokenizer',
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
};

export default tokenizer;
