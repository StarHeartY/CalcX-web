import { techLayers } from '../../data/content'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './TechStack.module.css'

const staggerClasses = ['fade-stagger-1', 'fade-stagger-2', 'fade-stagger-3']

export default function TechStack() {
  return (
    <div className={styles.stack}>
      {techLayers.map((layer, i) => (
        <FadeInOnScroll key={layer.name} className={staggerClasses[i]}>
          <div className={styles.layer}>
            <div className={styles.layerHeader}>
              <span className={styles.layerNumber}>{i + 1}</span>
              <div>
                <h3 className={styles.layerName}>{layer.name}</h3>
                <span className={styles.layerSubtitle}>{layer.subtitle}</span>
              </div>
            </div>
            <p className={styles.layerDesc}>{layer.description}</p>
            <div className={styles.tags}>
              {layer.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {i < techLayers.length - 1 && (
            <div className={styles.connector} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          )}
        </FadeInOnScroll>
      ))}
    </div>
  )
}
