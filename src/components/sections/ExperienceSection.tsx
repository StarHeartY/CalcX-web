import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

export default function ExperienceSection() {
  const root = useRef<HTMLElement>(null)
  const { experience } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: root.current,
          start: 'top 72%',
          once: true,
        },
      })

      timeline
        .from('.experience__title', { y: 60, autoAlpha: 0, duration: 0.6 })
        .from('.formula-demo', { rotateY: -14, rotateZ: 5, scale: 0.86, autoAlpha: 0, duration: 0.8 }, '-=0.28')
        .from('.formula-demo__equation img', { y: 30, autoAlpha: 0, duration: 0.45 }, '-=0.2')
        .from('.formula-demo__result', { y: 28, scale: 0.72, autoAlpha: 0, duration: 0.45 }, '-=0.12')
        .from('.formula-demo__keys span', { y: 30, autoAlpha: 0, stagger: 0.05, duration: 0.22 }, '-=0.22')
        .from('.experience-list article', { x: -35, autoAlpha: 0, duration: 0.42, stagger: 0.22 }, '-=0.38')
        .to('.formula-demo', { rotateZ: -2, y: -20, duration: 0.6, ease: 'power2.out' }, '-=0.18')
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
            <div className="formula-demo__equation">
              <img
                src="/images/svg/lim.svg"
                alt={experience.formulaInput}
              />
              <div className="formula-demo__result"><span>=</span>{experience.formulaOutput}</div>
            </div>
          </div>
          <div className="formula-demo__keys" aria-hidden="true">
            {['⇧Shift', 'R/D', '⇦', '⇨', 'S⇄D'].map((key, index) => (
              <span className={index === 0 ? 'key-orange' : ''} key={key}>{key}</span>
            ))}
          </div>
          <div className="formula-demo__functions" aria-hidden="true"><span>sin</span><span>cos</span><span>tan</span><span>∫</span><span>∑</span><span className="key-blue">=</span></div>
        </div>
      </div>
    </section>
  )
}
