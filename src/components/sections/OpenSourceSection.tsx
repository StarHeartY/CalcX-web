import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

const GITHUB_URL = 'https://github.com/StarHeartY/CalculatorX'
const ARCHITECTURE_URL = 'https://github.com/StarHeartY/CalculatorX/blob/main/docs/ARCHITECTURE.md'

export default function OpenSourceSection() {
  const root = useRef<HTMLElement>(null)
  const { openSource } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-source-card]', {
        clipPath: 'inset(10% 10% 10% 10% round 48px)',
        scale: .92,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 86%', end: 'top 28%', scrub: .8 },
      })
      gsap.to('[data-source-ring]', {
        rotate: 180,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="open-source" ref={root}>
      <div className="shell open-source__card" data-source-card>
        <div className="open-source__visual" aria-hidden="true">
          <span className="open-source__ring" data-source-ring>GPLV3 · OPEN CODE · GPLV3 · OPEN CODE ·</span>
          <strong>&lt;/&gt;</strong>
          <svg viewBox="0 0 240 240"><circle cx="120" cy="120" r="96" /><path d="m67 126 35 35 76-82" /></svg>
        </div>
        <div className="open-source__copy">
          <p className="eyebrow">{openSource.eyebrow}</p>
          <h2>{openSource.title}</h2>
          <p>{openSource.description}</p>
          <div className="badge-row">
            {openSource.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
          <div className="open-source__actions">
            <a className="button button--light" href={GITHUB_URL} target="_blank" rel="noreferrer">{openSource.primaryAction}<span>↗</span></a>
            <a className="text-link text-link--light" href={ARCHITECTURE_URL} target="_blank" rel="noreferrer">{openSource.secondaryAction}<span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
