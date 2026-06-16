import type {ReactNode} from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';
import {GraphCanvas} from '@site/src/components/Graph';
import {LearningPathSelector} from '@site/src/components/LearningPathSelector';
import {SearchSuggest} from '@site/src/components/SearchSuggest';
import {MobileConceptList} from '@site/src/components/MobileConceptList';
import {AINewsSidebar, type AINewsItem} from '@site/src/components/AINewsSidebar';
import {aiNewsData} from '@site/src/data/aiNews';
import {getLearningPath} from '@site/src/data/learningPaths';
import {concepts, relations} from '@site/src/data/graphData';
import styles from './index.module.css';

// Docusaurus 3.10 未提供 useMediaQuery 钩子
// SSR 安全版本：默认 false（桌面），客户端 hydrate 后检测
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

const categories = [
  {id: 'basic', name: '基础概念', color: '#5B5FC7'},
  {id: 'tech', name: '技术方法', color: '#00D084'},
  {id: 'methodology', name: '方法论', color: '#E91E63'},
  {id: 'architecture', name: '架构模式', color: '#733EE4'},
  {id: 'tool', name: '工具协议', color: '#FF9800'},
];

export default function Home(): ReactNode {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activePathId, setActivePathId] = useState<string | null>(null);
  const [highlightedConcepts, setHighlightedConcepts] = useState<string[]>([]);
  // B - Progressive Disclosure: 当前聚焦节点 ID
  const [focusedNode, setFocusedNode] = useState<string | null>(null);
  const [newsItems, setNewsItems] = useState<AINewsItem[]>(aiNewsData);
  const [newsLoading, setNewsLoading] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  const activePath = activePathId ? getLearningPath(activePathId) : null;
  const learningPathIds = activePath?.conceptIds || [];

  // 加载真实新闻（失败 fallback 到 mock）
  useEffect(() => {
    let cancelled = false;
    fetch('/data/ai-news.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (cancelled) return;
        if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
          setNewsItems(data.items);
        }
        // 失败或为空时保留 mock 数据
      })
      .catch(() => {/* 网络错误也保留 mock */})
      .finally(() => { if (!cancelled) setNewsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const handleNewsClick = useCallback((relatedConcepts: string[]) => {
    setHighlightedConcepts(relatedConcepts);
    // 3 秒后清除高亮
    setTimeout(() => setHighlightedConcepts([]), 3000);
  }, []);

  // B - Progressive Disclosure: 单击节点 → 进入聚焦模式（不直接跳转）
  const handleNodeClick = useCallback((conceptId: string) => {
    setFocusedNode(prev => {
      // 单击同一节点：不操作（用户需点浮动"查看详情"按钮跳转）
      if (prev === conceptId) return prev;
      // 单击另一节点：切换焦点
      return conceptId;
    });
  }, []);

  // B - 进入详情（点击浮动"查看详情"按钮）
  const handleEnterDetail = useCallback(
    (conceptId: string) => {
      history.push(`/concepts/${conceptId}`);
    },
    [history],
  );

  // B - 退出聚焦（点击"返回总览"或按 Esc）
  const handleExitFocus = useCallback(() => {
    setFocusedNode(null);
  }, []);

  // 搜索防抖：200ms，避免每次按键都触发图谱样式更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Ctrl+K 快捷键聚焦搜索框 + Esc 退出聚焦
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        return;
      }
      if (e.key === 'Escape') {
        // 仅在 focusedNode 存在时拦截 Esc，避免与浏览器后退冲突
        setFocusedNode(prev => (prev ? null : prev));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Layout title="AI概念图谱" description="可视化AI概念关系图谱">
      <main className={styles.main}>
        <div className={styles.controls}>
          <div className={styles.header}>
            <h1 className={styles.title}>🤖 AI概念关系图谱</h1>
            <p className={styles.subtitle}>
              探索AI核心概念及其关系 | 鼠标滚轮缩放，拖拽移动视图
            </p>
          </div>

          <div className={styles.filterGroup}>
            <div className={styles.searchBox}>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="搜索概念... (Ctrl+K)"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                role="combobox"
                aria-expanded={searchQuery.length >= 2}
                aria-autocomplete="list"
                aria-controls="search-suggestions"
              />
              {searchQuery && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>
            <SearchSuggest query={searchQuery} />

            <div className={styles.categoryFilters}>
              <button
                className={`${styles.categoryBtn} ${!selectedCategory ? styles.active : ''}`}
                onClick={() => setSelectedCategory(null)}
                style={{'--cat-color': '#64748b'} as React.CSSProperties}>
                全部
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === cat.id ? null : cat.id
                    )
                  }
                  style={{'--cat-color': cat.color} as React.CSSProperties}>
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <LearningPathSelector
            activePathId={activePathId}
            onPathChange={setActivePathId}
          />
        </div>

        {isMobile ? (
          <MobileConceptList
            concepts={concepts}
            selectedCategory={selectedCategory}
            onCategoryClick={catId => setSelectedCategory(prev => (prev === catId ? null : catId))}
          />
        ) : (
          <GraphCanvas
            onNodeClick={handleNodeClick}
            selectedCategory={selectedCategory}
            searchQuery={debouncedQuery}
            learningPath={learningPathIds}
            highlightedConcepts={highlightedConcepts}
            focusedNode={focusedNode}
            onEnterDetail={handleEnterDetail}
            onExitFocus={handleExitFocus}
          />
        )}

        {/* AI 资讯侧边栏（桌面/移动端都显示） */}
        <div style={{marginTop: '1.5rem'}}>
          <AINewsSidebar
            items={newsItems}
            loading={newsLoading}
            onNewsClick={handleNewsClick}
          />
        </div>
      </main>
    </Layout>
  );
}
