import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function ExperienceSection() {
  const root = useRef<HTMLElement>(null)
  const { experience } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      })

      timeline
        .from('.experience__title', { y: 70, autoAlpha: 0, duration: 0.5 })
        .from('.formula-demo', { rotateY: -16, rotateZ: 5, scale: 0.84, autoAlpha: 0, duration: 0.7 }, '<')
        .from('.formula-demo__input', { y: 30, autoAlpha: 0, duration: 0.4 })
        .from('.formula-demo__line', { scaleX: 0, transformOrigin: 'left', duration: 0.35 })
        .from('.formula-demo__output', { y: 35, scale: 0.7, autoAlpha: 0, duration: 0.45 })
        .from('.formula-demo__keys span', { y: 30, autoAlpha: 0, stagger: 0.06, duration: 0.25 }, '<')
        .from('.experience-list article', { x: -35, autoAlpha: 0, duration: 0.4, stagger: 0.35 })
        .to('.formula-demo', { rotateZ: -2, y: -20, duration: 0.6 }, '<')
        .to({}, { duration: 0.35 })
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.formula-demo', {
        y: 60,
        rotateZ: 5,
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: { trigger: '.formula-demo', start: 'top 80%', once: true },
      })
    })

    return () => media.revert()
  }, { scope: root })

  return (
    <section ref={root} className="experience">
      <span className="experience__watermark" aria-hidden="true">INPUT<br />FEEL<br />SOLVE</span>
      <div className="shell experience__grid">
        <div className="experience__copy">
          <div className="experience__title">
            <p className="eyebrow"><span className="eyebrow-dot" />{experience.eyebrow}</p>
            <h2>{experience.title}</h2>
            <p>{experience.description}</p>
          </div>
          <div className="experience-list">
            {experience.items.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className="formula-demo" aria-label={experience.formulaLabel}>
          <div className="formula-demo__top">
            <span className="formula-demo__status"><i />{experience.formulaLabel}</span>
            <span>01:01</span>
          </div>
          <div className="formula-demo__canvas">
            <span className="formula-demo__caption">MATH, IN ITS NATURAL FORM.</span>
            <div className="formula-demo__input">{experience.formulaInput}</div>
            <div className="formula-demo__line" />
            <div className="formula-demo__output"><span>=</span>{experience.formulaOutput}</div>
          </div>
          <div className="formula-demo__functions" aria-hidden="true"><span>sin</span><span>cos</span><span>tan</span><span>∫</span><span>∑</span></div>
          <div className="formula-demo__keys" aria-hidden="true">
            {['⇧', 'R/D', '←', '→', 'S⇄D', '='].map((key, index) => (
              <span className={index === 0 ? 'key-orange' : index === 5 ? 'key-blue' : ''} key={key}>{key}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
