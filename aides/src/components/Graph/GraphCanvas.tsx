import React, {useEffect, useRef} from 'react';
import {testConcepts, testRelations} from './types';
import styles from './GraphCanvas.module.css';

const categoryColors: Record<string, {bg: string; border: string}> = {
  basic: {bg: '#E8F0FE', border: '#5B5FC7'},
  tech: {bg: '#E6F4EA', border: '#00D084'},
  methodology: {bg: '#FCE4EC', border: '#E91E63'},
  architecture: {bg: '#F3E5F5', border: '#733EE4'},
  tool: {bg: '#FFF3E0', border: '#FF9800'},
};

declare global {
  interface Window {
    X6: any;
  }
}

export const GraphCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

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
        width: 1200,
        height: 600,
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
          minScale: 0.5,
        },
        panning: {
          enabled: true,
          modifiers: [],
        },
      });

      graphRef.current = graph;

      testConcepts.forEach((concept, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const x = 100 + col * 350;
        const y = 80 + row * 200;
        const colors = categoryColors[concept.category] || categoryColors.basic;

        graph.addNode({
          id: concept.id,
          x,
          y,
          width: 150,
          height: 60,
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
              fill: '#213547',
              refX: 0.5,
              refY: 0.5,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
          },
          tooltip: concept.tooltip.summary,
        });
      });

      testRelations.forEach(relation => {
        graph.addEdge({
          source: relation.source,
          target: relation.target,
          labels: [
            {
              attrs: {
                labelText: {
                  text: relation.label,
                  fill: '#64748b',
                  fontSize: 12,
                },
              },
            },
          ],
          attrs: {
            line: {
              stroke: '#cbd5e1',
              strokeWidth: 2,
              targetMarker: {
                name: 'classic',
                size: 8,
              },
            },
          },
          router: {
            name: 'manhattan',
            args: {
              padding: 20,
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
      }
    };
  }, []);

  return (
    <div className={styles.container}>
      <div ref={containerRef} className={styles.graph} />
    </div>
  );
};
