import { site } from '../../data/content'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <img
          className={styles.icon}
          src="/images/app-icon.png"
          alt="CalculatorX 应用图标"
          width="96"
          height="96"
        />
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.tagline}>{site.tagline}</p>
        <p className={styles.description}>{site.description}</p>
        <a href={site.heroCtaUrl} className={styles.cta}>
          {site.heroCta}
        </a>
      </div>
      <div className={styles.ambient} aria-hidden="true" />
    </section>
  )
}
