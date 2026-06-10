import {useMemo} from 'react';
import Link from '@docusaurus/Link';
import type {ConceptData} from '@site/src/components/Graph/types';
import styles from './styles.module.css';

/**
 * 移动端概念卡片列表
 * 768px 以下渲染（桌面端仍用 GraphCanvas）
 * 避免移动端加载 572KB X6 全局脚本
 */

const CATEGORY_ORDER = [
  {id: 'basic', name: '基础概念', color: '#5B5FC7'},
  {id: 'tech', name: '技术方法', color: '#00D084'},
  {id: 'methodology', name: '方法论', color: '#E91E63'},
  {id: 'architecture', name: '架构模式', color: '#733EE4'},
  {id: 'tool', name: '工具协议', color: '#FF9800'},
];

interface Props {
  concepts: ConceptData[];
  selectedCategory?: string | null;
  onCategoryClick?: (categoryId: string) => void;
}

export function MobileConceptList({concepts, selectedCategory, onCategoryClick}: Props): JSX.Element {
  const grouped = useMemo(() => {
    const map: Record<string, ConceptData[]> = {};
    for (const c of concepts) {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    }
    // 按 category 内 id 字母序排，确保稳定
    for (const cat of Object.keys(map)) {
      map[cat].sort((a, b) => a.id.localeCompare(b.id));
    }
    return map;
  }, [concepts]);

  const filtered = selectedCategory
    ? Object.fromEntries(Object.entries(grouped).filter(([cat]) => cat === selectedCategory))
    : grouped;

  return (
    <div className={styles.container}>
      {CATEGORY_ORDER.map(({id, name, color}) => {
        const list = filtered[id];
        if (!list || list.length === 0) return null;
        return (
          <section key={id} className={styles.section}>
            <button
              className={styles.sectionHeader}
              onClick={() => onCategoryClick?.(id)}
              style={{borderLeftColor: color}}
              type="button"
              aria-label={`切换 ${name} 分类筛选`}>
              <span className={styles.sectionName}>{name}</span>
              <span className={styles.sectionCount}>{list.length}</span>
            </button>
            <div className={styles.cardGrid}>
              {list.map(c => (
                <Link
                  key={c.id}
                  to={`/concepts/${c.id}`}
                  className={styles.card}
                  aria-label={`查看 ${c.name} 详情`}>
                  <span
                    className={styles.colorStrip}
                    style={{backgroundColor: color}}
                    aria-hidden="true"
                  />
                  <div className={styles.cardBody}>
                    <div className={styles.cardName}>{c.name}</div>
                    <div className={styles.cardAbbr}>({c.abbreviation})</div>
                    <div className={styles.cardSummary}>{c.tooltip.summary}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default MobileConceptList;
