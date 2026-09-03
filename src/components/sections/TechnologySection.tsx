import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function TechnologySection() {
  const root = useRef<HTMLElement>(null)
  const { architecture } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-pipeline-step]', {
        y: 54,
        opacity: 0,
        rotateX: -14,
        transformOrigin: 'center top',
        stagger: .11,
        duration: .8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-pipeline]', start: 'top 72%' },
      })
      gsap.fromTo('[data-pipeline-beam]', { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: { trigger: '[data-pipeline]', start: 'top 72%', end: 'bottom 45%', scrub: .8 },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="technology" id="technology" ref={root} aria-labelledby="technology-title">
      <div className="technology__glow" aria-hidden="true" />
      <div className="shell technology__header">
        <p className="eyebrow"><span className="eyebrow-dot" />{architecture.eyebrow}</p>
        <h2 id="technology-title">{architecture.title}</h2>
        <p>{architecture.description}</p>
      </div>

      <div className="pipeline shell" data-pipeline>
        <span className="pipeline__beam" data-pipeline-beam aria-hidden="true" />
        {architecture.steps.map((step, index) => (
          <article className="pipeline__step" key={step.name} data-pipeline-step>
            <span className="pipeline__index">0{index + 1}</span>
            <span className="pipeline__pulse" aria-hidden="true" />
            <strong>{step.name}</strong>
            <small>{step.detail}</small>
          </article>
        ))}
      </div>

      <div className="technology-ticker" aria-hidden="true">
        <div>
          {[...architecture.notes, ...architecture.notes].map((note, index) => (
            <span key={`${note}-${index}`}>{note}<i>✦</i></span>
          ))}
        </div>
      </div>
    </section>
  )
}
