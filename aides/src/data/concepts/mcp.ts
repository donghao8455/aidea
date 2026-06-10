import type {ConceptDetail} from '@site/src/components/Graph/types';

const mcp: ConceptDetail = {    id: 'mcp',
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
};

export default mcp;
