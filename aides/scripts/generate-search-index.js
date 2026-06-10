/**
 * 生成搜索索引脚本
 *
 * 从所有概念详情文件生成轻量 search-index.json
 * 用于首页 Fuse.js 搜索，避免在 bundle 中包含完整概念内容
 *
 * 用法：node scripts/generate-search-index.js
 */

const fs = require('fs');
const path = require('path');

const CONCEPTS_DIR = path.resolve(__dirname, '..', 'src', 'data', 'concepts');
const OUTPUT = path.resolve(__dirname, '..', 'static', 'data', 'search-index.json');

const CATEGORY_NAMES = {
  basic: '基础概念',
  tech: '技术方法',
  methodology: '方法论',
  architecture: '架构模式',
  tool: '工具协议',
};

function parseConceptFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const extract = pattern => {
    const m = content.match(pattern);
    return m ? m[1] : '';
  };
  const extractArray = pattern => {
    const m = content.match(pattern);
    if (!m) return [];
    return [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]);
  };

  return {
    id: extract(/id:\s*'([^']+)'/),
    name: extract(/name:\s*'([^']+)'/),
    nameEn: extract(/nameEn:\s*'([^']+)'/),
    abbreviation: extract(/abbreviation:\s*'([^']+)'/),
    category: extract(/category:\s*'([^']+)'/),
    difficulty: parseInt(extract(/difficulty:\s*(\d+)/), 10) || 0,
    tags: extractArray(/tags:\s*\[([^\]]*)\]/),
    definition: extract(/definition:\s*'((?:[^'\\]|\\.)*)'/),
    analogy: extract(/analogy:\s*'((?:[^'\\]|\\.)*)'/),
    keyPoints: extractArray(/keyPoints:\s*\[([^\]]*)\]/),
  };
}

function main() {
  const files = fs.readdirSync(CONCEPTS_DIR).filter(f => f.endsWith('.ts') && f !== 'index.ts');
  console.log(`[search-index] Found ${files.length} concept files`);

  const index = files.map(f => parseConceptFile(path.join(CONCEPTS_DIR, f)))
    .filter(c => c.id); // 排除解析失败的

  fs.mkdirSync(path.dirname(OUTPUT), {recursive: true});
  fs.writeFileSync(OUTPUT, JSON.stringify({
    concepts: index,
    categoryNames: CATEGORY_NAMES,
    generatedAt: new Date().toISOString(),
  }, null, 2), 'utf8');

  console.log(`[search-index] Wrote ${index.length} entries to ${path.relative(process.cwd(), OUTPUT)}`);
}

main();
