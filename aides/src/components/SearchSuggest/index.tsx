import {useEffect, useMemo, useRef, useState} from 'react';
import {useHistory} from '@docusaurus/router';
import Link from '@docusaurus/Link';
import Fuse from 'fuse.js';
import styles from './styles.module.css';

interface SearchIndexEntry {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: string;
  difficulty: number;
  tags: string[];
  definition: string;
  analogy: string;
  keyPoints: string[];
}

interface SearchIndex {
  concepts: SearchIndexEntry[];
  categoryNames: Record<string, string>;
  generatedAt: string;
}

interface Suggestion {
  entry: SearchIndexEntry;
  matchSource: string;
  matchedField: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  basic: '#5B5FC7',
  tech: '#00D084',
  methodology: '#E91E63',
  architecture: '#733EE4',
  tool: '#FF9800',
};

const FIELD_LABELS: Record<string, string> = {
  name: '名称',
  nameEn: '英文名',
  abbreviation: '缩写',
  tags: '标签',
  definition: '定义',
  analogy: '类比',
  keyPoints: '要点',
};

interface Props {
  query: string;
  onSelect?: (conceptId: string) => void;
}

export function SearchSuggest({query, onSelect}: Props): JSX.Element {
  const history = useHistory();
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  // 加载索引（首次）
  useEffect(() => {
    let cancelled = false;
    fetch('/data/search-index.json')
      .then(r => r.json())
      .then(data => { if (!cancelled) setIndex(data); })
      .catch(err => console.error('Failed to load search index:', err));
    return () => { cancelled = true; };
  }, []);

  // Fuse.js 实例
  const fuse = useMemo(() => {
    if (!index) return null;
    return new Fuse(index.concepts, {
      keys: [
        {name: 'name', weight: 0.3},
        {name: 'nameEn', weight: 0.25},
        {name: 'abbreviation', weight: 0.15},
        {name: 'tags', weight: 0.1},
        {name: 'definition', weight: 0.1},
        {name: 'analogy', weight: 0.05},
        {name: 'keyPoints', weight: 0.05},
      ],
      threshold: 0.4,
      includeMatches: true,
      minMatchCharLength: 2,
      ignoreLocation: true,
    });
  }, [index]);

  // 计算建议
  const suggestions = useMemo<Suggestion[]>(() => {
    if (!fuse || !query.trim() || query.trim().length < 2) return [];
    const results = fuse.search(query.trim(), {limit: 5});
    return results.map(r => {
      const matchedField = r.matches?.[0]?.key || 'name';
      return {
        entry: r.item,
        matchSource: FIELD_LABELS[matchedField] || matchedField,
        matchedField,
      };
    });
  }, [fuse, query]);

  // 键盘导航
  useEffect(() => {
    if (suggestions.length === 0) return;
    setHighlightedIdx(0);
  }, [suggestions.length, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIdx(i => (i + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIdx(i => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = suggestions[highlightedIdx];
      if (target) {
        if (onSelect) onSelect(target.entry.id);
        else history.push(`/concepts/${target.entry.id}`);
      }
    }
  };

  return (
    <div className={styles.container} onKeyDown={handleKeyDown}>
      <ul
        ref={listRef}
        className={styles.list}
        role="listbox"
        aria-live="polite"
        aria-expanded={suggestions.length > 0}>
        {suggestions.map((s, idx) => (
          <li
            key={s.entry.id}
            className={`${styles.item} ${idx === highlightedIdx ? styles.highlighted : ''}`}
            role="option"
            aria-selected={idx === highlightedIdx}>
            <Link
              to={`/concepts/${s.entry.id}`}
              onClick={() => onSelect?.(s.entry.id)}
              onMouseEnter={() => setHighlightedIdx(idx)}>
              <span
                className={styles.icon}
                style={{backgroundColor: CATEGORY_COLORS[s.entry.category] || '#64748B'}}
                aria-hidden="true"
              />
              <div className={styles.content}>
                <div className={styles.title}>{s.entry.name}</div>
                <div className={styles.meta}>
                  <span className={styles.matchFrom}>来自 {s.matchSource}</span>
                  <span className={styles.dot}>·</span>
                  <span>{index?.categoryNames[s.entry.category] || s.entry.category}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.difficulty}>
                    {'★'.repeat(s.entry.difficulty)}{'☆'.repeat(5 - s.entry.difficulty)}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchSuggest;
