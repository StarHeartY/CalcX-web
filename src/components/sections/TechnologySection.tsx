import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function TechnologySection() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { architecture } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth + 100)
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() * 1.5}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.pipeline__step', {
        y: 45,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.12,
        scrollTrigger: { trigger: '.pipeline', start: 'top 82%', once: true },
      })
    })

    return () => media.revert()
  }, { scope: root })

  return (
    <section ref={root} className="technology" id="technology">
      <div className="shell technology__intro">
        <p className="eyebrow"><span className="eyebrow-dot" />{architecture.eyebrow}</p>
        <div><h2>{architecture.title}</h2><p>{architecture.description}</p></div>
      </div>
      <div ref={track} className="pipeline">
        {architecture.steps.map((step, index) => (
          <div className="pipeline__group" key={step.name}>
            <article className="pipeline__step">
              <div className="pipeline__step-top"><span>0{index + 1}</span><small>COMPUTE PIPELINE</small></div>
              <div className="pipeline__symbol" aria-hidden="true">{['↗', '∫', '⇄', 'Σ', '='][index]}</div>
              <strong>{step.name}</strong>
              <p>{step.detail}</p>
              <div className="pipeline__step-bottom"><span>INPUT</span><i /><span>OUTPUT</span></div>
            </article>
            {index < architecture.steps.length - 1 && <span className="pipeline__arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <div className="shell technology__notes">
        {architecture.notes.map((note) => <span key={note}>{note}</span>)}
      </div>
    </section>
  )
}
