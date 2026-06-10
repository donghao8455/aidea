import {useState, useEffect} from 'react';

/**
 * AI 新动态侧边栏
 *
 * Props 驱动：items 由父组件传入（从 /data/ai-news.json 拉取或 mock fallback）
 * 5 大分类筛选 + 手风琴展开 + 第 1 条默认展开 + 更新时间显示
 */

export interface AINewsItem {
  id: string | number;
  title: string;
  summary?: string;
  source: string;
  sourceIcon?: string;
  url?: string;
  time?: string; // 显示用相对时间（如 "2小时前"）
  timestamp?: number;
  tag?: 'hot' | 'new' | 'top';
  category: 'tech' | 'industry' | 'research' | 'tool';
  relatedConcepts?: string[];
  qualityScore?: number;
}

type CategoryFilter = 'all' | 'tech' | 'industry' | 'research' | 'tool';

const CATEGORY_TABS: {id: CategoryFilter; label: string; color: string}[] = [
  {id: 'all', label: '全部', color: '#64748B'},
  {id: 'tech', label: '技术突破', color: '#00D084'},
  {id: 'industry', label: '行业应用', color: '#0EA5E9'},
  {id: 'research', label: '学术研究', color: '#F59E0B'},
  {id: 'tool', label: '工具发布', color: '#EC4899'},
];

const CATEGORY_COLORS: Record<string, string> = {
  tech: '#00D084',
  industry: '#0EA5E9',
  research: '#F59E0B',
  tool: '#EC4899',
};

const TAG_STYLES: Record<string, {bg: string; color: string; label: string}> = {
  hot: {bg: '#FEF2F2', color: '#EF4444', label: '热'},
  new: {bg: '#EFF6FF', color: '#3B82F6', label: '新'},
  top: {bg: '#FEFCE8', color: '#EAB308', label: '顶'},
};

interface Props {
  items?: AINewsItem[];
  loading?: boolean;
  onNewsClick?: (relatedConcepts: string[]) => void;
}

export function AINewsSidebar({items = [], loading, onNewsClick}: Props): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string>('');

  // 初次展开：第 1 条（按当前分类过滤后的）
  useEffect(() => {
    const filtered = filterByCategory(items, activeCategory);
    if (filtered.length > 0 && expandedId === null) {
      setExpandedId(filtered[0].id);
    }
    // 设置"更新于"时间
    const now = new Date();
    setUpdatedAt(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
  }, [items.length, activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = filterByCategory(items, activeCategory).slice(0, 8);

  const handleRowClick = (item: AINewsItem, e: React.MouseEvent) => {
    if (e.type === 'contextmenu' || (e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    // 通知父组件（联动）
    if (onNewsClick && item.relatedConcepts?.length) {
      onNewsClick(item.relatedConcepts);
    }
    // 展开/收起摘要
    setExpandedId(prev => (prev === item.id ? null : item.id));
  };

  return (
    <aside style={{
      background: '#fff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {/* 头部 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        borderBottom: '1px solid #f1f5f9',
        background: '#f8fafc',
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px', height: '24px',
            background: '#5B5FC7',
            color: 'white',
            borderRadius: '6px',
            fontSize: '0.85rem',
          }}>📡</span>
          <h3 style={{margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#213547'}}>AI 新动态</h3>
        </div>
        <span style={{fontSize: '0.75rem', color: '#64748b'}}>
          {updatedAt ? `更新于 ${updatedAt}` : loading ? '加载中...' : ''}
        </span>
      </div>

      {/* 5 大分类 Tab */}
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        padding: '0.5rem 0.5rem 0',
        overflowX: 'auto',
      }}>
        {CATEGORY_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            style={{
              flex: '0 0 auto',
              padding: '0.3rem 0.6rem',
              fontSize: '0.75rem',
              fontWeight: 500,
              background: activeCategory === tab.id ? tab.color : 'transparent',
              color: activeCategory === tab.id ? 'white' : tab.color,
              border: `1px solid ${tab.color}`,
              borderRadius: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
            aria-pressed={activeCategory === tab.id}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 新闻列表 */}
      <div style={{padding: '0.5rem 0', maxHeight: '600px', overflowY: 'auto'}}>
        {loading && (
          <div style={{padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem'}}>
            加载中...
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{padding: '2rem 1rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem'}}>
            暂无数据
          </div>
        )}
        {!loading && filtered.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const hasUrl = !!item.url;
          const rankColor = idx < 3 ? '#EF4444' : '#94A3B8';
          return (
            <div key={item.id} style={{borderBottom: '1px solid #f1f5f9'}}>
              <a
                href={hasUrl ? item.url : '#'}
                target={hasUrl ? '_blank' : undefined}
                rel={hasUrl ? 'noopener noreferrer' : undefined}
                aria-disabled={!hasUrl}
                aria-label={hasUrl ? `阅读：${item.title}` : `${item.title}（链接不可用）`}
                onClick={e => handleRowClick(item, e)}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: isExpanded ? '#f8fafc' : 'transparent',
                }}>
                <span style={{
                  flex: '0 0 18px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: rankColor,
                  textAlign: 'center',
                }}>{idx + 1}</span>
                <div style={{flex: 1, minWidth: 0}}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: idx === 0 ? 600 : 500,
                    color: '#213547',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: isExpanded ? undefined : 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>{item.title}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontSize: '0.7rem',
                    color: '#94a3b8',
                    marginTop: '2px',
                  }}>
                    <span>{item.source}</span>
                    {item.time && <><span>·</span><span>{item.time}</span></>}
                    {item.tag && (
                      <span style={{
                        background: TAG_STYLES[item.tag].bg,
                        color: TAG_STYLES[item.tag].color,
                        padding: '0 4px',
                        borderRadius: '3px',
                        fontWeight: 600,
                      }}>{TAG_STYLES[item.tag].label}</span>
                    )}
                  </div>
                  {/* 摘要展开区域 */}
                  {isExpanded && item.summary && (
                    <div style={{
                      marginTop: '0.4rem',
                      padding: '0.5rem',
                      background: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: '#475569',
                      lineHeight: 1.5,
                    }}>
                      {item.summary}
                      {item.relatedConcepts && item.relatedConcepts.length > 0 && (
                        <div style={{marginTop: '0.4rem', fontSize: '0.7rem', color: '#5B5FC7'}}>
                          📍 相关概念：{item.relatedConcepts.join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </a>
            </div>
          );
        })}
      </div>

      {/* 底部 */}
      <div style={{
        padding: '0.5rem 1rem',
        borderTop: '1px solid #f1f5f9',
        textAlign: 'center',
        background: '#f8fafc',
      }}>
        <a
          href="https://www.jiqizhixin.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.8rem',
            color: '#5B5FC7',
            textDecoration: 'none',
            fontWeight: 500,
          }}>
          查看全部动态 →
        </a>
      </div>
    </aside>
  );
}

function filterByCategory(items: AINewsItem[], cat: CategoryFilter): AINewsItem[] {
  if (cat === 'all') return items;
  return items.filter(i => i.category === cat);
}

export default AINewsSidebar;
