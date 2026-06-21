import { useContent } from '../../i18n/LocaleContext'
import styles from './HeroSection.module.css'

function scrollToDownload(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  const { site } = useContent()

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <img
          className={styles.icon}
          src="/images/app-icon.png"
          alt={`${site.name} app icon`}
          width="96"
          height="96"
        />
        <h1 className={styles.title}>{site.name}</h1>
        <p className={styles.tagline}>{site.tagline}</p>
        <p className={styles.description}>{site.description}</p>
        <a href={site.heroCtaUrl} className={styles.cta} onClick={scrollToDownload}>
          {site.heroCta}
        </a>
      </div>
      <div className={styles.ambient} aria-hidden="true" />
    </section>
  )
}
