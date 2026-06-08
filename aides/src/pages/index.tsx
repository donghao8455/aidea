import type {ReactNode} from 'react';
import {useState, useEffect, useCallback, useRef} from 'react';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';
import {GraphCanvas} from '@site/src/components/Graph';
import styles from './index.module.css';

const categories = [
  {id: 'basic', name: '基础概念', color: '#5B5FC7'},
  {id: 'tech', name: '技术方法', color: '#00D084'},
  {id: 'methodology', name: '方法论', color: '#E91E63'},
  {id: 'architecture', name: '架构模式', color: '#733EE4'},
  {id: 'tool', name: '工具协议', color: '#FF9800'},
];

export default function Home(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();

  // SPA 路由跳转（无白屏刷新）
  const handleNodeClick = useCallback((conceptId: string) => {
    history.push(`/concept?id=${conceptId}`);
  }, [history]);

  // 搜索防抖：200ms，避免每次按键都触发图谱样式更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Ctrl+K 快捷键聚焦搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
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
              />
              {searchQuery && (
                <button
                  className={styles.clearBtn}
                  onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>

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
        </div>

        <GraphCanvas
          onNodeClick={handleNodeClick}
          selectedCategory={selectedCategory}
          searchQuery={debouncedQuery}
        />
      </main>
    </Layout>
  );
}
