import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import type {ConceptDetail} from '@site/src/components/Graph/types';
import {allConcepts, conceptOrder, concepts as graphConcepts, relations} from '@site/src/data/graphData';
import {MiniGraph} from '@site/src/components/MiniGraph';
import styles from './concepts/concept.module.css';

const categoryNames: Record<string, string> = {
  basic: '基础概念',
  tech: '技术方法',
  methodology: '方法论',
  architecture: '架构模式',
  tool: '工具协议',
};

const categoryColors: Record<string, string> = {
  basic: '#5B5FC7',
  tech: '#00D084',
  methodology: '#E91E63',
  architecture: '#733EE4',
  tool: '#FF9800',
};

const typeIcons: Record<string, string> = {
  paper: '📄',
  video: '🎬',
  article: '📝',
  documentation: '📚',
};

function renderStars(difficulty: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= difficulty ? styles.star : styles.starEmpty}>
        ★
      </span>
    );
  }
  return stars;
}

/**
 * 概念详情页（SSG 渲染）
 *
 * 数据通过 Docusaurus 插件的 modules.conceptData 注入（每个概念一个独立 chunk）
 * SSG 阶段直接读取模块默认导出，构建时把数据嵌入 HTML
 */
interface Props {
  conceptData?: {default: ConceptDetail};
}

export default function ConceptPage({conceptData}: Props): ReactNode {
  const detail = conceptData?.default;
  const conceptId = detail?.id || '';

  if (!detail) {
    return (
      <Layout title="概念未找到" description="AI概念详情">
        <main className={styles.container}>
          <div className={styles.notFound}>
            <h1>概念未找到</h1>
            <p>抱歉，找不到您要查看的概念。</p>
            <Link to="/" className={styles.backLink}>
              ← 返回概念图谱
            </Link>
          </div>
        </main>
      </Layout>
    );
  }

  const currentIndex = conceptOrder.indexOf(conceptId);
  const prevId = currentIndex > 0 ? conceptOrder[currentIndex - 1] : null;
  const nextId = currentIndex < conceptOrder.length - 1 ? conceptOrder[currentIndex + 1] : null;
  const prevData = prevId ? allConcepts[prevId] : null;
  const nextData = nextId ? allConcepts[nextId] : null;
  const categoryColor = categoryColors[detail.category] || '#5B5FC7';

  return (
    <Layout
      title={detail.name}
      description={detail.tooltip.summary}>
      <main className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link to="/">首页</Link>
          <span>›</span>
          <Link to="/concepts">概念图谱</Link>
          <span>›</span>
          <span>{detail.name}</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{detail.name}</h1>
            <span className={styles.abbreviation}>({detail.abbreviation})</span>
          </div>
          <div className={styles.metaRow}>
            <span
              className={styles.categoryBadge}
              style={{backgroundColor: categoryColor}}>
              {categoryNames[detail.category]}
            </span>
            <div className={styles.difficulty}>
              <span>难度:</span>
              {renderStars(detail.difficulty)}
            </div>
          </div>
          <div className={styles.tags}>
            {detail.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        <MiniGraph
          currentConceptId={conceptId}
          concepts={graphConcepts}
          relations={relations}
        />

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📖</span>
            定义
          </h2>
          <p className={styles.definition}>{detail.detail.definition}</p>
          {detail.detail.plainExplanation && (
            <p className={styles.definition} style={{marginTop: '1rem', color: 'var(--ifm-color-emphasis-700)'}}>
              💡 {detail.detail.plainExplanation}
            </p>
          )}
        </section>

        {detail.detail.analogy && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>💡</span>
              类比理解
            </h2>
            <div className={styles.analogy}>
              <div className={styles.analogyTitle}>🌰 生活化类比</div>
              {detail.detail.analogy}
            </div>
          </section>
        )}

        {detail.detail.keyPoints && detail.detail.keyPoints.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>⭐</span>
              核心要点
            </h2>
            <ul className={styles.keyPoints}>
              {detail.detail.keyPoints.map((point, index) => (
                <li key={index} className={styles.keyPoint}>
                  <span className={styles.keyPointIcon}>{index + 1}</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {detail.detail.useCases && detail.detail.useCases.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🎯</span>
              应用场景
            </h2>
            <div className={styles.useCases}>
              {detail.detail.useCases.map((useCase, index) => (
                <div key={index} className={styles.useCase}>
                  <h3 className={styles.useCaseTitle}>
                    <span className={styles.useCaseIcon}>→</span>
                    {useCase.title}
                  </h3>
                  <p className={styles.useCaseDesc}>{useCase.description}</p>
                  {useCase.example && (
                    <div className={styles.useCaseExample}>
                      案例: {useCase.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {detail.detail.relatedConcepts && detail.detail.relatedConcepts.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🔗</span>
              相关概念
            </h2>
            <div className={styles.relatedConcepts}>
              {detail.detail.relatedConcepts.map((related, index) => {
                const relatedDetail = allConcepts[related.conceptId];
                if (!relatedDetail) return null;
                return (
                  <Link
                    key={index}
                    to={`/concepts/${related.conceptId}`}
                    className={styles.relatedLink}>
                    <span>{relatedDetail.name}</span>
                    <span className={styles.relatedLabel}>{related.relationLabel}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {detail.detail.resources && detail.detail.resources.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📚</span>
              延伸阅读
            </h2>
            <div className={styles.resources}>
              {detail.detail.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.resource}>
                  <div className={`${styles.resourceIcon} ${styles[resource.type]}`}>
                    {typeIcons[resource.type] || '📄'}
                  </div>
                  <div className={styles.resourceInfo}>
                    <div className={styles.resourceTitle}>{resource.title}</div>
                    <div className={styles.resourceMeta}>
                      <span className={`${styles.resourceBadge} ${resource.language === 'en' ? styles.en : styles.zh}`}>
                        {resource.language === 'en' ? 'EN' : '中文'}
                      </span>
                      <span>{resource.difficulty}</span>
                      {resource.recommended && (
                        <span className={`${styles.resourceBadge} ${styles.recommended}`}>
                          推荐
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        <nav className={styles.navigation}>
          {prevData ? (
            <Link to={`/concepts/${prevData.id}`} className={`${styles.navLink} ${styles.prev}`}>
              <span className={styles.navLabel}>← 上一个</span>
              <span className={styles.navTitle}>{prevData.name}</span>
            </Link>
          ) : (
            <div />
          )}
          {nextData ? (
            <Link to={`/concepts/${nextData.id}`} className={`${styles.navLink} ${styles.next}`}>
              <span className={styles.navLabel}>下一个 →</span>
              <span className={styles.navTitle}>{nextData.name}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <Link to="/" className={styles.backLink}>
          ← 返回概念图谱
        </Link>
      </main>
    </Layout>
  );
}
