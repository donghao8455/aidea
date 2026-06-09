import {useState} from 'react';
import {aiNewsData, type AINewsItem, type NewsTab, tabLabels} from '@site/src/data/aiNews';
import styles from './styles.module.css';

const categoryColors: Record<string, string> = {
  tech: '#00D084',
  industry: '#0EA5E9',
  research: '#F59E0B',
  tool: '#EC4899',
};

const tagStyle: Record<string, {bg: string; color: string}> = {
  hot: {bg: '#FEF2F2', color: '#EF4444'},
  new: {bg: '#EFF6FF', color: '#3B82F6'},
  top: {bg: '#FEFCE8', color: '#EAB308'},
};

function getFilteredNews(tab: NewsTab): AINewsItem[] {
  if (tab === 'hot') return aiNewsData.filter(item => item.tag === 'hot' || item.tag === 'top');
  if (tab === 'latest') return [...aiNewsData].sort((a, b) => a.id - b.id);
  return aiNewsData;
}

function TagBadge({tag}: {tag: 'hot' | 'new' | 'top'}) {
  const s = tagStyle[tag];
  return (
    <span className={styles.tagBadge} style={{background: s.bg, color: s.color}}>
      {tag === 'hot' ? '热' : tag === 'new' ? '新' : '顶'}
    </span>
  );
}

function NewsRow({item, index}: {item: AINewsItem; index: number}) {
  const rankColor = index < 3 ? '#EF4444' : '#94A3B8';

  return (
    <a
      href="#"
      className={styles.newsRow}
      onClick={e => e.preventDefault()}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={styles.rankNum} style={{color: rankColor}}>
        {index + 1}
      </span>
      <span className={styles.newsTitle}>{item.title}</span>
      {item.tag && <TagBadge tag={item.tag} />}
    </a>
  );
}

export function AINewsSidebar() {
  const [activeTab, setActiveTab] = useState<NewsTab>('hot');
  const filtered = getFilteredNews(activeTab).slice(0, 8);

  return (
    <aside className={styles.sidebar}>
      {/* 头部 */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>
            </svg>
          </span>
          <h3 className={styles.headerTitle}>AI 新动态</h3>
        </div>
        <button className={styles.refreshBtn} title="刷新">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
        </button>
      </div>

      {/* Tab 切换 */}
      <div className={styles.tabs}>
        {(Object.keys(tabLabels) as NewsTab[]).map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      {/* 新闻列表 */}
      <div className={styles.newsList}>
        {filtered.map((item, idx) => (
          <NewsRow key={item.id} item={item} index={idx} />
        ))}
      </div>

      {/* 底部 */}
      <div className={styles.footer}>
        <a href="#" className={styles.viewAll} onClick={e => e.preventDefault()}>
          查看全部动态
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
      </div>
    </aside>
  );
}
