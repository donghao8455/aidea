import {learningPaths, type LearningPath} from '@site/src/data/learningPaths';
import styles from './styles.module.css';

interface Props {
  activePathId: string | null;
  onPathChange: (pathId: string | null) => void;
}

export function LearningPathSelector({activePathId, onPathChange}: Props): JSX.Element {
  return (
    <div className={styles.container}>
      <span className={styles.label}>📌 学习路径：</span>
      <div className={styles.buttons}>
        {learningPaths.map(path => {
          const isActive = activePathId === path.id;
          return (
            <button
              key={path.id}
              className={`${styles.button} ${isActive ? styles.active : ''}`}
              onClick={() => onPathChange(isActive ? null : path.id)}
              title={path.description}
              aria-pressed={isActive}>
              <span className={styles.pathName}>{path.name}</span>
              <span className={styles.pathDesc}>{path.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LearningPathSelector;
