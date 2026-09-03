import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent, useLocale } from '../../i18n/LocaleContext'

const APP_GALLERY_URL = 'https://appgallery.huawei.com/app/detail?id=com.startyi.calcx'
const GITHUB_URL = 'https://github.com/StarHeartY/CalculatorX'

export default function HeroSection() {
  const root = useRef<HTMLElement>(null)
  const { hero, proof } = useContent()
  const { locale } = useLocale()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-hero-kicker]', { y: 22, opacity: 0, duration: .65 })
        .from('[data-hero-line]', { yPercent: 115, rotate: 2, duration: 1.05, stagger: .1 }, '-=.38')
        .from('[data-hero-copy]', { y: 26, opacity: 0, duration: .7 }, '-=.55')
        .from('[data-hero-machine]', { y: 54, rotate: 7, opacity: 0, duration: 1.1 }, '-=.78')
        .from('[data-hero-float]', { scale: .84, opacity: 0, duration: .7, stagger: .1 }, '-=.55')
    })

    mm.add('(min-width: 1041px) and (prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=125%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      timeline
        .to('[data-hero-title]', { yPercent: -28, opacity: .12, scale: .9, transformOrigin: 'left center' }, 0)
        .to('[data-hero-copy]', { y: -90, opacity: 0 }, 0)
        .to('[data-hero-machine]', { xPercent: -56, rotate: 0, scale: 1.08 }, 0)
        .to('[data-orbit="outer"]', { rotate: 145, scale: 1.15 }, 0)
        .to('[data-orbit="inner"]', { rotate: -110, scale: .86 }, 0)
        .to('[data-hero-proof]', { y: -52, opacity: 1 }, .22)
        .to('[data-scroll-cue]', { opacity: 0 }, 0)
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__field" aria-hidden="true">
        <span className="hero__coordinate hero__coordinate--x">x</span>
        <span className="hero__coordinate hero__coordinate--y">y</span>
      </div>

      <div className="shell hero__frame">
        <div className="hero__utility" data-hero-kicker>
          <p className="eyebrow"><span className="eyebrow-dot" />{hero.eyebrow}</p>
          <span>CALCULATORX® / {locale === 'zh' ? '数学工作区' : 'MATH WORKSPACE'}</span>
        </div>

        <h1 className="hero__title" id="hero-title" data-hero-title>
          <span className="hero__title-mask"><span data-hero-line>{hero.titleBefore}</span></span>
          <span className="hero__title-mask hero__title-mask--accent"><span data-hero-line>{hero.titleAccent}</span></span>
        </h1>

        <div className="hero__copy" data-hero-copy>
          <p>{hero.description}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={APP_GALLERY_URL} target="_blank" rel="noreferrer">
              {hero.primaryAction}<span aria-hidden="true">↗</span>
            </a>
            <a className="button button--ghost" href={GITHUB_URL} target="_blank" rel="noreferrer">
              {hero.secondaryAction}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="hero-machine" data-hero-machine>
          <span className="hero-machine__orbit hero-machine__orbit--outer" data-orbit="outer" aria-hidden="true" />
          <span className="hero-machine__orbit hero-machine__orbit--inner" data-orbit="inner" aria-hidden="true" />
          <div className="hero-machine__phone">
            <img className="theme-image theme-image--light" src="/images/product/scientific.png" alt={hero.visualAlt} fetchPriority="high" />
            <img className="theme-image theme-image--dark" src="/images/product/scientific-dark.png" alt={hero.visualAlt} fetchPriority="high" />
          </div>
          <div className="hero-chip hero-chip--exact" data-hero-float>
            <span>SYMBOLIC</span><strong>√8 = 2√2</strong>
          </div>
          <div className="hero-chip hero-chip--graph" data-hero-float aria-hidden="true">
            <span>{hero.floatingFormula}</span>
            <svg viewBox="0 0 200 62"><path d="M0 36c21 0 31-25 50-25 24 0 25 42 52 42 28 0 31-40 57-40 19 0 25 22 41 22" /></svg>
          </div>
          <div className="hero-chip hero-chip--native" data-hero-float>
            <span>HARMONYOS NEXT</span><strong>{hero.visualBadge}</strong>
          </div>
        </div>

        <div className="hero__proof" data-hero-proof>
          {proof.map((item, index) => (
            <div key={item.label}><span>0{index + 1}</span><strong>{item.value}</strong><small>{item.label}</small></div>
          ))}
        </div>

        <div className="hero__scroll" data-scroll-cue aria-hidden="true"><span />SCROLL TO SOLVE</div>
      </div>
    </section>
  )
}
