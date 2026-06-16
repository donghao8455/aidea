import React from 'react';
import {RELATION_STYLES, type RelationType} from './relationClassifier';

/**
 * 图谱关系类型图例
 *
 * 渲染 4 行关系类型说明，每行包含：
 * - 一个 SVG 线条样本（颜色 + 线型）
 * - 中文标签（组成/继承、依赖/驱动、相似/类比、应用/扩展）
 *
 * 该组件是纯展示组件，由 GraphCanvas 在容器内 absolute 定位渲染。
 * 父容器需设置 pointer-events: none 以避免拦截图谱交互。
 */

interface Row {
  type: RelationType;
  name: string;
}

const ROWS: Row[] = [
  {type: 'hierarchical', name: '组成/继承'},
  {type: 'dependency', name: '依赖/驱动'},
  {type: 'similar', name: '相似/类比'},
  {type: 'applied', name: '应用/扩展'},
];

const rowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  fontSize: 12,
  color: '#334155',
  lineHeight: 1.2,
};

const labelStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
};

export const GraphLegend: React.FC = () => (
  <>
    {ROWS.map(({type, name}) => {
      const s = RELATION_STYLES[type];
      return (
        <div key={type} style={rowStyle}>
          <svg width="28" height="6" aria-hidden="true">
            <line
              x1="0"
              y1="3"
              x2="28"
              y2="3"
              stroke={s.stroke}
              strokeWidth="2"
              strokeDasharray={s.dasharray}
            />
          </svg>
          <span style={labelStyle}>{name}</span>
        </div>
      );
    })}
  </>
);
