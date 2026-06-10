import {useMemo} from 'react';
import Link from '@docusaurus/Link';
import type {ConceptData, RelationData} from '@site/src/components/Graph/types';
import styles from './styles.module.css';

/**
 * 详情页迷你关系图
 *
 * 纯 SVG + React，不依赖 X6（X6 全局脚本 572KB 不适合详情页加载）
 * 圆形布局展示当前概念 + 1 跳邻居
 * 邻居节点可点击跳转，悬停显示关系标签
 */

const CENTER_X = 150;
const CENTER_Y = 110;
const CENTER_RADIUS = 28;
const NEIGHBOR_RADIUS = 70;
const MAX_NEIGHBORS = 7;

const CATEGORY_COLORS: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

interface MiniGraphProps {
  currentConceptId: string;
  concepts: ConceptData[];
  relations: RelationData[];
}

export function MiniGraph({currentConceptId, concepts, relations}: MiniGraphProps): JSX.Element {
  const current = concepts.find(c => c.id === currentConceptId);

  // 找出 1 跳邻居：current 是 source 或 target 的所有关系
  const neighborRelations = useMemo(() => {
    return relations.filter(r => r.source === currentConceptId || r.target === currentConceptId);
  }, [relations, currentConceptId]);

  const neighbors = useMemo(() => {
    const seen = new Set<string>();
    const result: Array<{concept: ConceptData; label: string}> = [];
    for (const r of neighborRelations) {
      const neighborId = r.source === currentConceptId ? r.target : r.source;
      if (neighborId !== currentConceptId && !seen.has(neighborId)) {
        seen.add(neighborId);
        const concept = concepts.find(c => c.id === neighborId);
        if (concept) {
          result.push({concept, label: r.label});
        }
      }
    }
    return result.slice(0, MAX_NEIGHBORS);
  }, [neighborRelations, concepts, currentConceptId]);

  if (!current) {
    return <div className={styles.empty}>概念数据缺失</div>;
  }

  const centerColor = CATEGORY_COLORS[current.category] || CATEGORY_COLORS.basic;
  const n = neighbors.length;

  // 圆形布局计算邻居节点位置
  const positionedNeighbors = neighbors.map((neighbor, i) => {
    let angle: number;
    if (n === 1) {
      angle = -Math.PI / 2; // 顶部
    } else {
      // 从顶部开始顺时针均匀分布
      angle = -Math.PI / 2 + (2 * Math.PI * i) / n;
    }
    const x = CENTER_X + NEIGHBOR_RADIUS * Math.cos(angle);
    const y = CENTER_Y + NEIGHBOR_RADIUS * Math.sin(angle);
    return {neighbor, x, y, angle};
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.icon}>🔗</span> 相关概念
      </h3>
      <svg viewBox="0 0 300 220" className={styles.svg} role="img" aria-label={`${current.name} 的相关概念`}>
        {/* 边线 */}
        {positionedNeighbors.map(({neighbor, x, y}) => {
          const stroke = CATEGORY_COLORS[neighbor.concept.category]?.border || '#94A3B8';
          return (
            <line
              key={`edge-${neighbor.concept.id}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={x}
              y2={y}
              stroke={stroke}
              strokeWidth={1.5}
              opacity={0.5}
            />
          );
        })}

        {/* 中心节点 */}
        <g>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={CENTER_RADIUS}
            fill={centerColor.border}
            stroke={centerColor.border}
            strokeWidth={2}
          />
          <text
            x={CENTER_X}
            y={CENTER_Y - 4}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#fff">
            {current.name.length > 6 ? current.name.substring(0, 6) : current.name}
          </text>
          <text
            x={CENTER_X}
            y={CENTER_Y + 10}
            textAnchor="middle"
            fontSize="9"
            fill="rgba(255,255,255,0.9)">
            {current.abbreviation}
          </text>
        </g>

        {/* 邻居节点 */}
        {positionedNeighbors.map(({neighbor, x, y}) => {
          const colors = CATEGORY_COLORS[neighbor.concept.category] || CATEGORY_COLORS.basic;
          return (
            <g key={neighbor.concept.id} className={styles.neighborGroup}>
              <Link to={`/concepts/${neighbor.concept.id}`} aria-label={`查看 ${neighbor.concept.name}`}>
                <rect
                  x={x - 32}
                  y={y - 14}
                  width={64}
                  height={28}
                  rx={4}
                  fill="#fff"
                  stroke={colors.border}
                  strokeWidth={1.5}
                  className={styles.neighborRect}
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill="#213547">
                  {neighbor.concept.name.length > 6
                    ? neighbor.concept.name.substring(0, 6)
                    : neighbor.concept.name}
                </text>
              </Link>
              {/* Tooltip on hover via <title> */}
              <title>
                {neighbor.concept.name}（{neighbor.label}）
              </title>
            </g>
          );
        })}
      </svg>
      {neighbors.length === 0 && (
        <p className={styles.empty}>暂无相关概念</p>
      )}
      {neighborRelations.length > MAX_NEIGHBORS && (
        <p className={styles.more}>
          还有 {neighborRelations.length - MAX_NEIGHBORS} 个相关概念未显示
        </p>
      )}
    </div>
  );
}

export default MiniGraph;
