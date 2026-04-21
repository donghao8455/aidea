import React, {useEffect, useRef} from 'react';
import {concepts, relations, ConceptData} from './types';
import styles from './GraphCanvas.module.css';

const categoryColors: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

const categoryOrder = ['basic', 'tech', 'methodology', 'architecture', 'tool'];

declare global {
  interface Window {
    X6: any;
  }
}

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
  const graphRef = useRef<any>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || graphRef.current) return;

    const initGraph = () => {
      if (!window.X6) {
        console.error('AntV X6 not loaded');
        return;
      }

      const {Graph} = window.X6;

      const graph = new Graph({
        container: containerRef.current!,
        width: 1400,
        height: 800,
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

      graphRef.current = graph;

      const layoutConcepts = (nodes: ConceptData[]) => {
        const categoryNodes: Record<string, ConceptData[]> = {};

        nodes.forEach(node => {
          if (!categoryNodes[node.category]) {
            categoryNodes[node.category] = [];
          }
          categoryNodes[node.category].push(node);
        });

        const positions: Record<string, {x: number; y: number}> = {};
        const categoryY: Record<string, number> = {
          basic: 80,
          tech: 220,
          methodology: 360,
          architecture: 500,
          tool: 640,
        };

        categoryOrder.forEach(cat => {
          const catNodes = categoryNodes[cat] || [];
          const startX = (1400 - (catNodes.length - 1) * 180) / 2;

          catNodes.forEach((node, idx) => {
            positions[node.id] = {
              x: startX + idx * 180,
              y: categoryY[cat],
            };
          });
        });

        return positions;
      };

      const positions = layoutConcepts(concepts);

      concepts.forEach(concept => {
        const pos = positions[concept.id];
        const colors = categoryColors[concept.category] || categoryColors.basic;

        const shouldHighlight =
          !searchQuery ||
          concept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          concept.abbreviation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          concept.tags.some(tag =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const isActive =
          !selectedCategory || selectedCategory === concept.category;

        graph.addNode({
          id: concept.id,
          x: pos.x,
          y: pos.y,
          width: 160,
          height: 70,
          attrs: {
            body: {
              fill: shouldHighlight && isActive ? colors.bg : '#f1f5f9',
              stroke: shouldHighlight && isActive ? colors.border : '#cbd5e1',
              strokeWidth: shouldHighlight && isActive ? 2 : 1,
              rx: 8,
              ry: 8,
              opacity: shouldHighlight && isActive ? 1 : 0.4,
            },
            label: {
              text: `${concept.name}\n(${concept.abbreviation})`,
              fontSize: 12,
              fontWeight: shouldHighlight && isActive ? 600 : 400,
              fill: shouldHighlight && isActive ? '#213547' : '#94a3b8',
              refX: 0.5,
              refY: 0.5,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
          },
          data: {concept},
        });
      });

      // 使用图谱级别的事件监听
      graph.on('node:click', ({node}) => {
        const conceptId = node.id;
        if (onNodeClick) {
          onNodeClick(conceptId);
        }
      });

      // 使用 SVG 原生事件监听 Tooltip
      const svgContainer = containerRef.current!.querySelector('svg');
      
      if (svgContainer) {
        svgContainer.addEventListener('mouseover', (e) => {
          const target = e.target as HTMLElement;
          // 查找最近的节点组元素
          const nodeGroup = target.closest('[data-cell-id]');
          if (!nodeGroup) return;
          
          const cellId = nodeGroup.getAttribute('data-cell-id');
          if (!cellId) return;
          
          const cell = graph.getCellById(cellId);
          if (!cell || !cell.isNode || !cell.isNode()) return;

          const concept: ConceptData = cell.getData()?.concept;
          if (!concept) return;

          const pos = cell.getPosition();
          const size = cell.getSize();

          // 构建 Tooltip 内容
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

          // 计算 Tooltip 位置（节点上方居中）
          const tooltipX = pos.x + size.width / 2;
          const tooltipY = pos.y - 10;

          tooltipContainer.style.left = `${tooltipX}px`;
          tooltipContainer.style.top = `${tooltipY}px`;
          tooltipContainer.style.transform = 'translate(-50%, -100%)';
          tooltipContainer.style.opacity = '1';
        });

        svgContainer.addEventListener('mouseout', (e) => {
          const target = e.target as HTMLElement;
          const nodeGroup = target.closest('[data-cell-id]');
          if (!nodeGroup) return;
          tooltipContainer.style.opacity = '0';
        });
      }

      relations.forEach(relation => {
        const sourcePos = positions[relation.source];
        const targetPos = positions[relation.target];

        if (!sourcePos || !targetPos) return;

        const sourceConcept = concepts.find(c => c.id === relation.source);
        const targetConcept = concepts.find(c => c.id === relation.target);

        const shouldHighlight =
          (!searchQuery ||
            (sourceConcept &&
              (sourceConcept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sourceConcept.tags.some(tag =>
                  tag.toLowerCase().includes(searchQuery.toLowerCase())
                ))) ||
            (targetConcept &&
              (targetConcept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                targetConcept.tags.some(tag =>
                  tag.toLowerCase().includes(searchQuery.toLowerCase())
                )))) &&
          (!selectedCategory ||
            (sourceConcept && sourceConcept.category === selectedCategory) ||
            (targetConcept && targetConcept.category === selectedCategory));

        graph.addEdge({
          source: relation.source,
          target: relation.target,
          labels: [
            {
              attrs: {
                labelText: {
                  text: relation.label,
                  fill: shouldHighlight ? '#64748b' : '#cbd5e1',
                  fontSize: 11,
                },
              },
            },
          ],
          attrs: {
            line: {
              stroke: shouldHighlight ? '#94a3b8' : '#e2e8f0',
              strokeWidth: shouldHighlight ? 2 : 1,
              targetMarker: {
                name: 'classic',
                size: 6,
              },
            },
          },
          router: {
            name: 'manhattan',
            args: {
              padding: 30,
            },
          },
        });
      });

      graph.centerContent();
    };

    if (window.X6) {
      initGraph();
    } else {
      window.addEventListener('load', initGraph);
    }

    return () => {
      if (graphRef.current) {
        graphRef.current.dispose();
        graphRef.current = null;
      }
      // 清理 Tooltip 容器
      if (tooltipRef.current && tooltipRef.current.parentNode) {
        tooltipRef.current.parentNode.removeChild(tooltipRef.current);
        tooltipRef.current = null;
      }
    };
  }, [selectedCategory, searchQuery, onNodeClick]);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.graph} />
    </div>
  );
};
