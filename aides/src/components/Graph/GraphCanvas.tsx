import React, {useEffect, useRef, useState} from 'react';
import {concepts, relations} from '@site/src/data/allConcepts';
import type {ConceptData} from './types';
import styles from './GraphCanvas.module.css';

const categoryColors: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

const categoryOrder = ['basic', 'tech', 'methodology', 'architecture', 'tool'];

// X6 Graph 实例类型（通过全局脚本加载，类型声明见 src/types/x6.d.ts）
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type X6Graph = any;

interface GraphCanvasProps {
  onNodeClick?: (conceptId: string) => void;
  selectedCategory?: string | null;
  searchQuery?: string;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({
  onNodeClick,
  selectedCategory,
  searchQuery,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<X6Graph>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const onNodeClickRef = useRef(onNodeClick);
  const [loading, setLoading] = useState(true);

  // 保持 callback ref 最新，避免触发 useEffect 重建
  useEffect(() => {
    onNodeClickRef.current = onNodeClick;
  }, [onNodeClick]);

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

      // 添加所有节点
      concepts.forEach(concept => {
        const pos = positions[concept.id];
        const colors = categoryColors[concept.category] || categoryColors.basic;

        graph.addNode({
          id: concept.id,
          x: pos.x,
          y: pos.y,
          width: 160,
          height: 70,
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
              fontSize: 12,
              fontWeight: 600,
              fill: '#213547',
              refX: 0.5,
              refY: 0.5,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
          },
          data: {concept},
        });
      });

      // 添加所有边 - 使用贝塞尔曲线边，避免重叠，降低层级
      relations.forEach(relation => {
        const sourcePos = positions[relation.source];
        const targetPos = positions[relation.target];
        if (!sourcePos || !targetPos) return;

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
                  fill: '#64748b',
                  fontSize: 10,
                  fontWeight: 500,
                },
              },
              position: 0.5,
            },
          ],
          attrs: {
            line: {
              stroke: 'rgba(148, 163, 184, 0.5)',
              strokeWidth: 1.5,
              targetMarker: {
                name: 'classic',
                size: 5,
              },
            },
          },
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
          opacity: isActive ? 1 : 0.4,
        },
        label: {
          fontWeight: isActive ? 600 : 400,
          fill: isActive ? '#213547' : '#94a3b8',
        },
      });
    });

    // 更新所有边样式
    const edges = graph.getEdges();
    edges.forEach((edge: X6Graph) => {
      const sourceId = edge.getSourceCellId?.() || edge.getSource()?.cell;
      const targetId = edge.getTargetCellId?.() || edge.getTarget()?.cell;

      const sourceActive = sourceId ? nodeMatchMap[sourceId] !== false : true;
      const targetActive = targetId ? nodeMatchMap[targetId] !== false : true;
      const isActive = sourceActive && targetActive;

      edge.setAttrs({
        line: {
          stroke: isActive ? '#94a3b8' : '#e2e8f0',
          strokeWidth: isActive ? 2 : 1,
        },
      });

      // 更新边标签颜色
      const labels = edge.getLabels?.();
      if (labels && labels.length > 0) {
        edge.setLabels([{
          attrs: {
            labelText: {
              text: labels[0]?.attrs?.labelText?.text || '',
              fill: isActive ? '#64748b' : '#cbd5e1',
              fontSize: 11,
            },
          },
        }]);
      }
    });
  }, [selectedCategory, searchQuery]);

  // ============================================================
  // 布局算法 - 增加间距，减少边重叠
  // ============================================================
  const layoutConcepts = (nodes: ConceptData[]) => {
    const categoryNodes: Record<string, ConceptData[]> = {};

    nodes.forEach(node => {
      if (!categoryNodes[node.category]) {
        categoryNodes[node.category] = [];
      }
      categoryNodes[node.category].push(node);
    });

    const positions: Record<string, {x: number; y: number}> = {};
    // 增加行间距，减少边重叠
    const categoryY: Record<string, number> = {
      basic: 100,
      tech: 280,
      methodology: 460,
      architecture: 640,
      tool: 820,
    };
    // 增加列间距
    const colSpacing = 220;

    categoryOrder.forEach(cat => {
      const catNodes = categoryNodes[cat] || [];
      const startX = (1400 - (catNodes.length - 1) * colSpacing) / 2;
      catNodes.forEach((node, idx) => {
        positions[node.id] = {
          x: startX + idx * colSpacing,
          y: categoryY[cat],
        };
      });
    });

    return positions;
  };

  // ============================================================
  // 渲染：始终保留 graph 容器（ref 不能被条件渲染移除）
  // ============================================================
  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span>图谱加载中...</span>
        </div>
      )}
      <div ref={containerRef} className={styles.graph} />
    </div>
  );
};
