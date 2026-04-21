import React from 'react';
import {Tooltip} from 'antd';
import styles from './ConceptNode.module.css';

interface ConceptNodeProps {
  id: string;
  name: string;
  nameEn: string;
  abbreviation: string;
  category: string;
  summary: string;
}

const categoryColors: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

export const ConceptNode: React.FC<ConceptNodeProps> = ({
  name,
  abbreviation,
  category,
  summary,
}) => {
  const colors = categoryColors[category] || categoryColors.basic;

  return (
    <Tooltip title={summary} placement="right">
      <div
        className={styles.node}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
        }}>
        <div className={styles.name}>{name}</div>
        <div className={styles.abbreviation}>{abbreviation}</div>
      </div>
    </Tooltip>
  );
};
