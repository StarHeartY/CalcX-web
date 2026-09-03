import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function CapabilitiesSection() {
  const root = useRef<HTMLElement>(null)
  const { capabilities } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1041px) and (prefers-reduced-motion: no-preference)', () => {
      const track = root.current?.querySelector<HTMLElement>('[data-capability-track]')
      if (!track) return

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 96),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth, 900)}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    })

    mm.add('(max-width: 1040px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-capability-card]', {
        y: 48,
        opacity: 0,
        stagger: .08,
        duration: .75,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      })
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="capabilities" id="capabilities" ref={root} aria-labelledby="capabilities-title">
      <div className="capabilities__intro shell">
        <p className="eyebrow"><span className="eyebrow-dot" />{capabilities.eyebrow}</p>
        <h2 id="capabilities-title">{capabilities.title}</h2>
        <p>{capabilities.description}</p>
        <span className="capabilities__counter">01—06</span>
      </div>

      <div className="capability-track" data-capability-track>
        {capabilities.items.map((item, index) => (
          <article className={`capability-card accent-${item.accent}`} key={item.title} data-capability-card>
            <div className="capability-card__top">
              <span className="capability-card__number">0{index + 1}</span>
              <span className="capability-card__icon" aria-hidden="true">{item.icon}</span>
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <span className="capability-card__line" aria-hidden="true" />
          </article>
        ))}
        <article className="capability-card capability-card--outro" data-capability-card>
          <span>∑</span>
          <strong>{capabilities.eyebrow}</strong>
          <p>{capabilities.description}</p>
        </article>
      </div>
    </section>
  )
}
