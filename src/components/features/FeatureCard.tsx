import type { Feature } from '../../data/content'
import styles from './FeatureCard.module.css'

export default function FeatureCard({ icon, title, description }: Feature) {
  return (
    <article className={styles.card}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  )
}
