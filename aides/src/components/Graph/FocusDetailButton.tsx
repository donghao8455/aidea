import React from 'react';
import type {ConceptData} from './types';

/**
 * 聚焦模式浮动按钮（B - Progressive Disclosure）
 *
 * 渲染两个按钮：
 * - 主按钮：查看当前聚焦概念的详情（onEnterDetail）
 * - 次按钮：返回总览，退出聚焦模式（onExitFocus）
 *
 * Props 为 null 时不渲染整个组件。
 *
 * 父容器 .focusDetailBtn 需设置：
 * - position: absolute（覆盖在 .container 内）
 * - z-index: 6（高于 .legend 的 5）
 * - pointer-events: auto（与 .legend 不同，需可点击）
 */

interface FocusDetailButtonProps {
  concept: ConceptData | null;
  onEnterDetail: (conceptId: string) => void;
  onExitFocus: () => void;
}

const buttonBaseStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '8px 14px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  textAlign: 'left',
};

export const FocusDetailButton: React.FC<FocusDetailButtonProps> = ({
  concept,
  onEnterDetail,
  onExitFocus,
}) => {
  if (!concept) return null;

  // 主按钮边框色 = 该概念的分类色
  const primaryColor = concept.category === 'basic'
    ? '#5B5FC7'
    : concept.category === 'tech'
      ? '#00D084'
      : concept.category === 'methodology'
        ? '#E91E63'
        : concept.category === 'architecture'
          ? '#733EE4'
          : '#FF9800';

  return (
    <>
      <button
        type="button"
        className="btn"
        style={{
          ...buttonBaseStyle,
          background: primaryColor,
          color: '#fff',
          border: `2px solid ${primaryColor}`,
          marginBottom: 4,
        }}
        onClick={() => onEnterDetail(concept.id)}
        aria-label={`查看 ${concept.name} 的详情`}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '0.88';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.opacity = '1';
        }}
      >
        查看「{concept.name}」详情 →
      </button>
      <button
        type="button"
        className="exit"
        style={{
          ...buttonBaseStyle,
          background: 'transparent',
          color: '#475569',
          border: '1px solid #cbd5e1',
          textAlign: 'center',
          fontWeight: 500,
          fontSize: 12,
        }}
        onClick={onExitFocus}
        aria-label="返回总览，退出聚焦模式"
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.background = '#f1f5f9';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }}
      >
        ← 返回总览
      </button>
    </>
  );
};
