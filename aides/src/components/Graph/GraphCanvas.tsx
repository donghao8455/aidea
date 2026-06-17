import React, {useEffect, useRef, useState} from 'react';
import {concepts, relations} from '@site/src/data/graphData';
import type {ConceptData, RelationData} from './types';
import {layoutConcepts} from './layoutHierarchical';
import {classifyRelation, RELATION_STYLES, type RelationType} from './relationClassifier';
import {buildAdjacency, getNeighbors, getCategoryCenters} from './adjacency';
import {GraphLegend} from './GraphLegend';
import {FocusDetailButton} from './FocusDetailButton';
import styles from './GraphCanvas.module.css';

const categoryColors: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

const categoryOrder = ['basic', 'tech', 'methodology', 'architecture', 'tool']; // 保留用于潜在的向后兼容

// ============ 节点尺寸常量（F - Node Size by Degree） ============
const NODE_BASE_WIDTH = 160;
const NODE_BASE_HEIGHT = 70;
const NODE_FONT_SIZE = 12;
const NODE_MAX_WIDTH = 220; // 防止枢纽节点过大
const NODE_MAX_SCALE = 1.4; // 最大放大倍数（degree=maxDegree 时）
const NODE_MIN_FONT = 11; // 最小字号，防止文字过小不可读

// B - Progressive Disclosure: 非可见节点的弱化程度（body + label 同步）
const DIM_OPACITY = 0.06;

/**
 * 计算所有节点的度（连接数）
 */
function buildDegreeMap(rels: RelationData[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const r of rels) {
    m[r.source] = (m[r.source] ?? 0) + 1;
    m[r.target] = (m[r.target] ?? 0) + 1;
  }
  return m;
}

/**
 * 根据节点的度计算渲染尺寸
 * scale = 1 + sqrt(degree)/sqrt(maxDegree) * (MAX_SCALE - 1)
 * degree=0 → 1.0, degree=maxDegree → MAX_SCALE
 */
function sizeForDegree(
  degree: number,
  maxDegree: number,
): {w: number; h: number; font: number} {
  const scale =
    1 + (Math.sqrt(Math.max(degree, 0)) / Math.sqrt(Math.max(maxDegree, 1))) * (NODE_MAX_SCALE - 1);
  const w = Math.min(NODE_MAX_WIDTH, Math.round(NODE_BASE_WIDTH * scale));
  const h = Math.round(NODE_BASE_HEIGHT * scale);
  const font = Math.min(
    NODE_FONT_SIZE + 1,
    Math.max(NODE_MIN_FONT, Math.round(NODE_FONT_SIZE * scale)),
  );
  return {w, h, font};
}

// X6 Graph 实例类型（通过全局脚本加载，类型声明见 src/types/x6.d.ts）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type X6Graph = any;

interface GraphCanvasProps {
  onNodeClick?: (conceptId: string) => void;
  selectedCategory?: string | null;
  searchQuery?: string;
  learningPath?: string[]; // 路径概念 ID 有序数组
  highlightedConcepts?: string[]; // 新闻点击后高亮的概念 ID
  /** 当前聚焦节点 ID（B - Progressive Disclosure） */
  focusedNode?: string | null;
  /** 点击"查看详情"按钮回调 */
  onEnterDetail?: (conceptId: string) => void;
  /** 点击"返回总览"按钮回调 */
  onExitFocus?: () => void;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  onNodeClick,
  selectedCategory,
  searchQuery,
  learningPath,
  highlightedConcepts,
  focusedNode,
  onEnterDetail,
  onExitFocus,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<X6Graph>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const onNodeClickRef = useRef(onNodeClick);
  // B - Progressive Disclosure: 持久化邻接表与分类中心，避免重建
  const adjacencyRef = useRef<Map<string, Set<string>> | null>(null);
  const categoryCentersRef = useRef<Set<string> | null>(null);
  const onEnterDetailRef = useRef(onEnterDetail);
  const onExitFocusRef = useRef(onExitFocus);
  const [loading, setLoading] = useState(true);

  // 保持 callback ref 最新，避免触发 useEffect 重建
  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);
  useEffect(() => {
    onEnterDetailRef.current = onEnterDetail;
  }, [onEnterDetail]);
  useEffect(() => {
    onExitFocusRef.current = onExitFocus;
  }, [onExitFocus]);

  // ============================================================
  // Effect 1: 初始化 Graph 实例（只执行一次）
  // ============================================================
  useEffect(() => {
    if (!containerRef.current) return;

    const initGraph = () => {
      if (!window.X6) {
        console.error('AntV X6 not loaded');
        return;
      }

      const {Graph} = window.X6;

      const graph = new Graph({
        container: containerRef.current!,
        width: 1400,
        height: 1000,
        background: {
          color: '#f8fafc',
        },
        grid: {
          size: 20,
          visible: true,
          type: 'dot',
          args: {
            color: '#e2e8f0',
            thickness: 1,
          },
        },
        mousewheel: {
          enabled: true,
          modifiers: ['ctrl', 'meta'],
          factor: 1.2,
          maxScale: 3,
          minScale: 0.3,
        },
        panning: {
          enabled: true,
          modifiers: [],
        },
      });

      // 创建 Tooltip 容器
      const tooltipContainer = document.createElement('div');
      tooltipContainer.className = styles.tooltip;
      tooltipContainer.style.cssText = `
        position: absolute;
        background: rgba(33, 53, 71, 0.95);
        color: #fff;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        max-width: 280px;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      containerRef.current!.appendChild(tooltipContainer);
      tooltipRef.current = tooltipContainer;

      // 计算布局位置
      const positions = layoutConcepts(concepts);

      // 计算节点度（F: Node Size by Degree）
      const degreeMap = buildDegreeMap(relations);
      const maxDegree = Math.max(1, ...Object.values(degreeMap));

      // 添加所有节点
      concepts.forEach(concept => {
        const pos = positions[concept.id];
        const colors = categoryColors[concept.category] || categoryColors.basic;
        const {w, h, font} = sizeForDegree(degreeMap[concept.id] ?? 0, maxDegree);

        graph.addNode({
          id: concept.id,
          x: pos.x,
          y: pos.y,
          width: w,
          height: h,
          attrs: {
            body: {
              fill: colors.bg,
              stroke: colors.border,
              strokeWidth: 2,
              rx: 8,
              ry: 8,
            },
            label: {
              text: `${concept.name}\n(${concept.abbreviation})`,
              fontSize: font,
              fontWeight: 600,
              fill: '#213547',
              refX: 0.5,
              refY: 0.5,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
          },
          data: {concept, degree: degreeMap[concept.id] ?? 0},
        });
      });

      // 添加所有边 - 按关系类型分类着色（G: Relation Type Coloring）
      relations.forEach(relation => {
        const sourcePos = positions[relation.source];
        const targetPos = positions[relation.target];
        if (!sourcePos || !targetPos) return;

        const relType: RelationType = classifyRelation(relation.label);
        const style = RELATION_STYLES[relType];

        graph.addEdge({
          id: `edge-${relation.source}-${relation.target}`,
          source: relation.source,
          target: relation.target,
          // 设置边的连接桩，从节点边缘连接
          sourcePort: 'outer',
          targetPort: 'outer',
          labels: [
            {
              attrs: {
                labelText: {
                  text: relation.label,
                  fill: style.labelFill,
                  fontSize: 10,
                  fontWeight: 500,
                },
              },
              position: 0.5,
            },
          ],
          attrs: {
            line: {
              stroke: style.stroke,
              strokeWidth: 1.5,
              strokeDasharray: style.dasharray,
              targetMarker: {
                name: 'classic',
                size: 5,
              },
            },
          },
          // 持久化关系类型，Effect 2/3 通过 getData 读取避免重复分类
          data: {relationType: relType, rawLabel: relation.label},
          // 使用默认的贝塞尔曲线
          zIndex: -1, // 让边在节点之下
        });
      });

      // 绑定节点点击事件
      graph.on('node:click', ({node}: {node: X6Graph}) => {
        const conceptId = node.id;
        if (onNodeClickRef.current) {
          onNodeClickRef.current(conceptId);
        }
      });

      // 绑定 Tooltip 事件（带 200ms 防抖）
      const svgContainer = containerRef.current!.querySelector('svg');
      if (svgContainer) {
        let tooltipTimer: ReturnType<typeof setTimeout> | null = null;

        svgContainer.addEventListener('mouseover', (e: Event) => {
          const target = e.target as HTMLElement;
          const nodeGroup = target.closest('[data-cell-id]');
          if (!nodeGroup) return;

          const cellId = nodeGroup.getAttribute('data-cell-id');
          if (!cellId) return;

          const cell = graph.getCellById(cellId);
          if (!cell || !cell.isNode || !cell.isNode()) return;

          const concept: ConceptData = cell.getData()?.concept;
          if (!concept) return;

          if (tooltipTimer) clearTimeout(tooltipTimer);
          tooltipTimer = setTimeout(() => {
            const pos = cell.getPosition();
            const size = cell.getSize();

            tooltipContainer.innerHTML = `
              <div style="font-weight: 600; margin-bottom: 6px; font-size: 14px;">
                ${concept.name} (${concept.abbreviation})
              </div>
              <div style="color: #cbd5e1; margin-bottom: 8px; font-size: 11px;">
                ${concept.nameEn}
              </div>
              <div style="line-height: 1.5; margin-bottom: 8px;">
                ${concept.tooltip.summary}
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                ${concept.tags.map(tag => `<span style="background: rgba(255,255,255,0.15); padding: 2px 8px; border-radius: 4px; font-size: 11px;">${tag}</span>`).join('')}
              </div>
            `;

            const tooltipX = pos.x + size.width / 2;
            const tooltipY = pos.y - 10;
            tooltipContainer.style.left = `${tooltipX}px`;
            tooltipContainer.style.top = `${tooltipY}px`;
            tooltipContainer.style.transform = 'translate(-50%, -100%)';
            tooltipContainer.style.opacity = '1';
          }, 200);
        });

        svgContainer.addEventListener('mouseout', (e: Event) => {
          const target = e.target as HTMLElement;
          const nodeGroup = target.closest('[data-cell-id]');
          if (!nodeGroup) return;

          if (tooltipTimer) {
            clearTimeout(tooltipTimer);
            tooltipTimer = null;
          }
          tooltipContainer.style.opacity = '0';
        });
      }

      graph.centerContent();
      graphRef.current = graph;

      // B - Progressive Disclosure: 构建邻接表 + 选取分类中心
      adjacencyRef.current = buildAdjacency(relations);
      categoryCentersRef.current = getCategoryCenters(concepts, degreeMap);

      setLoading(false);
    };

    // 等待 X6 全局脚本加载完成
    // SPA 模式下 window.load 事件可能早已触发，需用轮询兜底
    if (window.X6) {
      initGraph();
    } else {
      // 先尝试监听 script 标签的 load 事件
      const script = document.querySelector('script[src="/x6.min.js"]');
      const onScriptLoad = () => {
        if (window.X6) initGraph();
      };

      if (script && !script.getAttribute('data-loaded')) {
        script.addEventListener('load', onScriptLoad);
      }

      // 轮询兜底：每 100ms 检查一次，最多等待 15 秒
      let pollCount = 0;
      const pollInterval = setInterval(() => {
        pollCount++;
        if (window.X6) {
          clearInterval(pollInterval);
          initGraph();
        } else if (pollCount > 150) {
          clearInterval(pollInterval);
          setLoading(false); // 超时，隐藏 loading
          console.error('AntV X6 加载超时');
        }
      }, 100);

      // cleanup 中清理
      return () => {
        clearInterval(pollInterval);
        script?.removeEventListener('load', onScriptLoad);
        if (graphRef.current) {
          graphRef.current.dispose();
          graphRef.current = null;
        }
        if (tooltipRef.current && tooltipRef.current.parentNode) {
          tooltipRef.current.parentNode.removeChild(tooltipRef.current);
          tooltipRef.current = null;
        }
      };
    }

    // 如果 X6 已就绪并执行了 initGraph，仍需返回 cleanup
    return () => {
      if (graphRef.current) {
        graphRef.current.dispose();
        graphRef.current = null;
      }
      if (tooltipRef.current && tooltipRef.current.parentNode) {
        tooltipRef.current.parentNode.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // Effect 2: 响应筛选/搜索 — 动态更新节点和边样式（不重建）
  // ============================================================
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    const lowerQuery = (searchQuery || '').toLowerCase();

    // 计算每个节点是否匹配
    const nodeMatchMap: Record<string, boolean> = {};
    concepts.forEach(concept => {
      const matchesSearch = !lowerQuery ||
        concept.name.toLowerCase().includes(lowerQuery) ||
        concept.abbreviation.toLowerCase().includes(lowerQuery) ||
        concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

      const matchesCategory = !selectedCategory || concept.category === selectedCategory;
      nodeMatchMap[concept.id] = matchesSearch && matchesCategory;
    });

    // 更新所有节点样式
    const nodes = graph.getNodes();
    nodes.forEach((node: X6Graph) => {
      const concept: ConceptData = node.getData()?.concept;
      if (!concept) return;

      const isActive = nodeMatchMap[concept.id] !== false;
      const colors = categoryColors[concept.category] || categoryColors.basic;

      node.setAttrs({
        body: {
          fill: isActive ? colors.bg : '#f1f5f9',
          stroke: isActive ? colors.border : '#cbd5e1',
          strokeWidth: isActive ? 2 : 1,
          opacity: isActive ? 1 : DIM_OPACITY,
        },
        label: {
          fontWeight: isActive ? 600 : 400,
          fill: isActive ? '#213547' : '#94a3b8',
          // 高亮节点文字显现，非匹配弱化（与首屏默认视图一致）
          opacity: isActive ? 1 : DIM_OPACITY,
        },
      });
    });

    // 更新所有边样式（G: 按关系类型保留颜色，淡化时用类型 dim 色）
    const edges = graph.getEdges();
    edges.forEach((edge: X6Graph) => {
      const sourceId = edge.getSourceCellId?.() || edge.getSource()?.cell;
      const targetId = edge.getTargetCellId?.() || edge.getTarget()?.cell;

      const sourceActive = sourceId ? nodeMatchMap[sourceId] !== false : true;
      const targetActive = targetId ? nodeMatchMap[targetId] !== false : true;
      const isActive = sourceActive && targetActive;

      // 读取持久化的关系类型（init 时已分类）
      const relType: RelationType = edge.getData?.()?.relationType ?? 'applied';
      const style = RELATION_STYLES[relType];

      edge.setAttrs({
        line: {
          stroke: isActive ? style.stroke : style.labelFillDim,
          strokeWidth: isActive ? 2 : 1,
          strokeDasharray: isActive ? style.dasharray : '',
        },
      });

      // 更新边标签颜色
      const labels = edge.getLabels?.();
      if (labels && labels.length > 0) {
        edge.setLabels([{
          attrs: {
            labelText: {
              text: labels[0]?.attrs?.labelText?.text || '',
              fill: isActive ? style.labelFill : style.labelFillDim,
              fontSize: 11,
            },
          },
        }]);
      }
    });
  }, [selectedCategory, searchQuery]);

  // ============================================================
  // Effect 3: 学习路径高亮（基于 learningPath prop）
  // ============================================================
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    if (!learningPath || learningPath.length === 0) {
      // 没有学习路径激活 — 重置所有样式为默认（不主动改其他状态）
      return;
    }

    const pathSet = new Set(learningPath);

    // 路径中的每个节点应用高亮
    const nodes = graph.getNodes();
    nodes.forEach((node: X6Graph) => {
      const concept: ConceptData = node.getData()?.concept;
      if (!concept) return;

      const isOnPath = pathSet.has(concept.id);
      const pathIndex = learningPath.indexOf(concept.id);

      if (isOnPath) {
        // 路径节点：高亮 + 序号徽章
        const colors = categoryColors[concept.category] || categoryColors.basic;
        node.setAttrs({
          body: {
            fill: colors.border,
            stroke: colors.border,
            strokeWidth: 3,
            opacity: 1,
          },
          label: {
            text: `${pathIndex + 1}. ${concept.name}\n(${concept.abbreviation})`,
            fontSize: 11,
            fontWeight: 700,
            fill: '#fff',
            opacity: 1,
          },
        });
      } else {
        // 非路径节点：弱化（body + label 同步）
        node.setAttrs({
          body: {opacity: DIM_OPACITY},
          label: {fill: '#94a3b8', opacity: DIM_OPACITY},
        });
      }
    });

    // 路径节点之间的边保留类型色，仅加粗强调
    const edges = graph.getEdges();
    edges.forEach((edge: X6Graph) => {
      const sourceId = edge.getSourceCellId?.() || edge.getSource()?.cell;
      const targetId = edge.getTargetCellId?.() || edge.getTarget()?.cell;

      const sourceIdx = learningPath.indexOf(sourceId);
      const targetIdx = learningPath.indexOf(targetId);
      const isOnPathEdge = sourceIdx !== -1 && targetIdx !== -1 && Math.abs(sourceIdx - targetIdx) === 1;

      // 读取持久化的关系类型
      const relType: RelationType = edge.getData?.()?.relationType ?? 'applied';
      const style = RELATION_STYLES[relType];

      if (isOnPathEdge) {
        // 路径边：保留类型色，加粗强调
        edge.setAttrs({
          line: {
            stroke: style.stroke,
            strokeWidth: 3,
            strokeDasharray: style.dasharray,
          },
        });
      } else {
        // 非路径边：淡化为灰色实线
        edge.setAttrs({
          line: {
            stroke: '#e2e8f0',
            strokeWidth: 1,
            strokeDasharray: '',
          },
        });
      }
    });
  }, [learningPath]);

  // ============================================================
  // Effect 4: 新闻→图谱联动（脉冲高亮，3 次后恢复）
  // ============================================================
  useEffect(() => {
    const graph = graphRef.current;
    if (!graph || !highlightedConcepts || highlightedConcepts.length === 0) return;

    const highlightSet = new Set(highlightedConcepts);
    let pulseCount = 0;
    const maxPulses = 3;

    const pulse = () => {
      const nodes = graph.getNodes();
      nodes.forEach((node: X6Graph) => {
        const concept: ConceptData = node.getData()?.concept;
        if (!concept) return;
        if (highlightSet.has(concept.id)) {
          const colors = categoryColors[concept.category] || categoryColors.basic;
          const isPulseOn = pulseCount % 2 === 0;
          // 脉冲：放大/缩小
          node.setAttrs({
            body: {
              fill: isPulseOn ? colors.border : colors.bg,
              stroke: colors.border,
              strokeWidth: isPulseOn ? 4 : 2,
              opacity: 1,
            },
            label: {
              opacity: 1,
            },
          });
        }
      });
      pulseCount++;
      if (pulseCount < maxPulses * 2) {
        setTimeout(pulse, 300);
      } else {
        // 恢复默认（让 useEffect 2/3 接管）
        // 触发一次 searchQuery 引用变化来重置
        // 简化做法：直接重置所有节点
        nodes.forEach((node: X6Graph) => {
          const concept: ConceptData = node.getData()?.concept;
          if (!concept) return;
          if (highlightSet.has(concept.id)) {
            const colors = categoryColors[concept.category] || categoryColors.basic;
            node.setAttrs({
              body: {
                fill: colors.bg,
                stroke: colors.border,
                strokeWidth: 2,
                opacity: 1,
              },
              label: {
                opacity: 1,
              },
            });
          }
        });
      }
    };
    pulse();
  }, [highlightedConcepts]);

  // ============================================================
  // Effect 5: 渐进式披露 (B - Progressive Disclosure)
  // 单一职责：只改 opacity + strokeWidth + stroke 颜色（含 label opacity）
  // 优先级：focused > learningPath > search/category > 默认
  //   - focusedNode=null: 5 个分类中心 opacity 1，其它 DIM_OPACITY
  //   - focusedNode=X:    X + 1 跳邻居 opacity 1，其它 DIM_OPACITY
  //   - label.opacity 同步弱化，避免文字残留干扰（切换焦点时一并还原）
  //   - fill 颜色由 Effect 2/3/4 负责，本 effect 不修改（避免与它们冲突）
  // ============================================================
  useEffect(() => {
    const graph = graphRef.current;
    const adj = adjacencyRef.current;
    const centers = categoryCentersRef.current;
    if (!graph || !adj || !centers) return;

    const visibleSet: Set<string> = focusedNode
      ? new Set([focusedNode, ...getNeighbors(focusedNode, adj)])
      : centers;

    // 节点：body opacity + label opacity + strokeWidth
    // 切换焦点时遍历全部节点重设 → 旧焦点的 label/边框自动还原
    for (const node of graph.getNodes()) {
      const concept: ConceptData | undefined = node.getData()?.concept;
      if (!concept) continue;
      const isVisible = visibleSet.has(concept.id);
      const isFocal = focusedNode != null && concept.id === focusedNode;
      const colors = categoryColors[concept.category] || categoryColors.basic;

      node.setAttrs({
        body: {
          opacity: isVisible ? 1 : DIM_OPACITY,
          strokeWidth: isFocal ? 4 : isVisible ? 2 : 1,
          // 边框：focal / visible 用分类色，dim 用灰
          stroke: isVisible ? colors.border : '#cbd5e1',
        },
        label: {
          // label 是独立 SVG text，必须单独弱化，否则框淡了名字还亮
          opacity: isVisible ? 1 : DIM_OPACITY,
        },
      });
    }

    // 边：opacity + 按 G 类型色保留
    for (const edge of graph.getEdges()) {
      const sId: string | undefined = edge.getSourceCellId?.() || edge.getSource()?.cell;
      const tId: string | undefined = edge.getTargetCellId?.() || edge.getTarget()?.cell;
      const bothVisible = !!sId && !!tId && visibleSet.has(sId) && visibleSet.has(tId);
      const relType: RelationType = edge.getData?.()?.relationType ?? 'applied';
      const style = RELATION_STYLES[relType];

      edge.setAttrs({
        line: {
          stroke: bothVisible ? style.stroke : '#e2e8f0',
          strokeWidth: bothVisible ? 2 : 1,
          strokeDasharray: bothVisible ? style.dasharray : '',
          opacity: bothVisible ? 1 : DIM_OPACITY,
        },
      });
    }
  }, [focusedNode]);

  // ============================================================
  // 布局算法已移至 ./layoutHierarchical.ts（分层力导向，约束求解避免重叠）
  // ============================================================

  // ============================================================
  // 渲染：始终保留 graph 容器（ref 不能被条件渲染移除）
  // ============================================================
  // 解析当前聚焦概念对象（用于 FocusDetailButton）
  const focusedConcept: ConceptData | null = focusedNode
    ? concepts.find(c => c.id === focusedNode) ?? null
    : null;

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>图谱加载中...</span>
        </div>
      )}
      <div ref={containerRef} className={styles.graph} />
      <div className={styles.legend} aria-label="关系类型图例">
        <GraphLegend />
      </div>
      {focusedConcept && (
        <div className={styles.focusDetailBtn}>
          <FocusDetailButton
            concept={focusedConcept}
            onEnterDetail={id => onEnterDetailRef.current?.(id)}
            onExitFocus={() => onExitFocusRef.current?.()}
          />
        </div>
      )}
    </div>
  );
};
