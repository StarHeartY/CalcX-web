import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function CapabilitiesSection() {
  const root = useRef<HTMLElement>(null)
  const { capabilities } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.capabilities__intro > *', {
        y: 64,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.capabilities__intro', start: 'top 78%', once: true },
      })

      gsap.from('.capability-card', {
        y: 100,
        rotate: 2,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.capability-grid', start: 'top 78%', once: true },
      })

      gsap.to('.capabilities-marquee__track', { xPercent: -50, duration: 24, repeat: -1, ease: 'none' })
    })

    return () => media.revert()
  }, { scope: root })

  return (
    <section ref={root} className="capabilities" id="capabilities">
      <div className="shell">
        <div className="capabilities__intro">
          <p className="eyebrow"><span className="eyebrow-dot" />{capabilities.eyebrow}</p>
          <h2>{capabilities.title}</h2>
          <p>{capabilities.description}</p>
          <span className="capabilities__count">06 / CORE SYSTEMS</span>
        </div>
      </div>
      <div className="capabilities-marquee" aria-hidden="true">
        <div className="capabilities-marquee__track">
          <span>CALCULATE · SOLVE · GRAPH · TRANSFORM · REMEMBER · </span>
          <span>CALCULATE · SOLVE · GRAPH · TRANSFORM · REMEMBER · </span>
        </div>
      </div>
      <div className="shell">
        <div className="capability-grid">
          {capabilities.items.map((item, index) => (
            <article className={`capability-card accent-${item.accent}`} key={item.title}>
              <span className="capability-index">0{index + 1}</span>
              <span className="capability-icon" aria-hidden="true">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="capability-card__line" aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
