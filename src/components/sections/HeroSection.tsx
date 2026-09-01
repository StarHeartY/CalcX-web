import { useContent } from '../../i18n/LocaleContext'

const APP_GALLERY_URL = 'https://appgallery.huawei.com/app/detail?id=com.startyi.calcx'
const GITHUB_URL = 'https://github.com/StarHeartY/CalculatorX'

export default function HeroSection() {
  const { hero, proof } = useContent()

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__mesh" aria-hidden="true" />
      <div className="shell hero__grid">
        <div className="hero__copy">
          <p className="eyebrow"><span className="eyebrow-dot" />{hero.eyebrow}</p>
          <h1 id="hero-title">
            {hero.titleBefore}<span>{hero.titleAccent}</span>{hero.titleAfter}
          </h1>
          <p className="hero__description">{hero.description}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={APP_GALLERY_URL} target="_blank" rel="noreferrer">
              {hero.primaryAction}<span aria-hidden="true">↗</span>
            </a>
            <a className="button button--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.87c-2.78.6-3.37-1.18-3.37-1.18-.45-1.17-1.11-1.48-1.11-1.48-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.82a9.4 9.4 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
              {hero.secondaryAction}
            </a>
          </div>
          <div className="hero__proof" aria-label="Product facts">
            {proof.map((item) => (
              <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual__orbit hero-visual__orbit--one" aria-hidden="true" />
          <div className="hero-visual__orbit hero-visual__orbit--two" aria-hidden="true" />
          <div className="hero-phone">
            <img className="theme-image theme-image--light" src="/images/product/scientific.png" alt={hero.visualAlt} fetchPriority="high" />
            <img className="theme-image theme-image--dark" src="/images/product/scientific-dark.png" alt={hero.visualAlt} fetchPriority="high" />
          </div>
          <div className="floating-card floating-card--result">
            <span>{hero.visualBadge}</span>
            <strong>√8 = 2√2</strong>
          </div>
          <div className="floating-card floating-card--graph" aria-hidden="true">
            <span>{hero.floatingFormula}</span>
            <svg viewBox="0 0 220 72"><path d="M0 37c26 0 31-24 54-24 26 0 29 46 57 46 28 0 31-45 58-45 21 0 27 23 51 23" /></svg>
          </div>
        </div>
      </div>
    </section>
  )
}
