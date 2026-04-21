import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import {GraphCanvas} from '@site/src/components/Graph';

export default function Home(): ReactNode {
  return (
    <Layout title="AI概念图谱" description="可视化AI概念关系图谱">
      <main style={{padding: '2rem 0'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '2rem'}}>
            <h1 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>🤖 AI概念关系图谱</h1>
            <p style={{fontSize: '1.2rem', color: '#64748b'}}>
              探索AI核心概念及其关系，鼠标滚轮缩放，拖拽移动视图
            </p>
          </div>
          <GraphCanvas />
        </div>
      </main>
    </Layout>
  );
}
