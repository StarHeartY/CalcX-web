import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function ExperienceSection() {
  const root = useRef<HTMLElement>(null)
  const { experience } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-experience-line]', {
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: .12,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          end: 'center 45%',
          scrub: .8,
        },
      })
      gsap.from('[data-formula-result]', {
        y: 80,
        opacity: 0,
        scale: .72,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-formula-card]', start: 'top 65%' },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="experience" ref={root} aria-labelledby="experience-title">
      <div className="shell experience__header">
        <p className="eyebrow"><span className="eyebrow-dot" />{experience.eyebrow}</p>
        <h2 id="experience-title">{experience.title}</h2>
        <p>{experience.description}</p>
      </div>

      <div className="shell experience__grid">
        <div className="experience-list">
          {experience.items.map((item) => (
            <article key={item.number}>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <i data-experience-line />
            </article>
          ))}
        </div>

        <div className="formula-card" data-formula-card aria-label={experience.formulaLabel}>
          <div className="formula-card__chrome">
            <span>{experience.formulaLabel}</span>
            <span>•••</span>
          </div>
          <div className="formula-card__canvas">
            <span className="formula-card__input">{experience.formulaInput}</span>
            <span className="formula-card__equals">=</span>
            <strong data-formula-result>{experience.formulaOutput}</strong>
          </div>
          <div className="formula-card__keys" aria-hidden="true">
            {['SHIFT', 'ƒ(x)', 'd/dx', '∫', 'S⇄D', '='].map((key, index) => (
              <span className={index === 0 ? 'is-orange' : index === 5 ? 'is-blue' : ''} key={key}>{key}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
