import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {allConcepts, conceptOrder} from '@site/src/data/graphData';
import styles from './concepts/concept.module.css';

/**
 * 概念索引页（/concepts）
 * 列出所有概念
 */
export default function ConceptsIndex(): ReactNode {
  return (
    <Layout title="AI概念列表" description="浏览所有AI概念">
      <main className={styles.container}>
        <h1>AI概念列表</h1>
        <p style={{color: 'var(--ifm-color-emphasis-700)', marginBottom: '2rem'}}>
          共 {conceptOrder.length} 个 AI 核心概念，覆盖大语言模型、深度学习、智能体等核心领域。
        </p>
        <div className={styles.relatedConcepts}>
          {conceptOrder.map(id => {
            const concept = allConcepts[id];
            if (!concept) return null;
            return (
              <Link
                key={id}
                to={`/concepts/${id}`}
                className={styles.relatedLink}>
                <span>{concept.name}</span>
                <span className={styles.relatedLabel}>{concept.abbreviation}</span>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
