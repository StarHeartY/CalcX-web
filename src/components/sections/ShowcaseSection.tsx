import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'
import ProductVisual from '../ui/ProductVisual'

export default function ShowcaseSection() {
  const root = useRef<HTMLElement>(null)
  const { showcase } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1041px) and (prefers-reduced-motion: no-preference)', () => {
      const layers = gsap.utils.toArray<HTMLElement>('[data-showcase-layer]')
      const steps = gsap.utils.toArray<HTMLElement>('[data-showcase-step]')
      gsap.set(layers, { autoAlpha: (index) => index === 0 ? 1 : 0, scale: (index) => index === 0 ? 1 : .94 })

      const activate = (index: number) => {
        gsap.to(layers, {
          autoAlpha: (layerIndex) => layerIndex === index ? 1 : 0,
          scale: (layerIndex) => layerIndex === index ? 1 : .94,
          duration: .62,
          ease: 'power3.out',
          overwrite: true,
        })
        steps.forEach((step, stepIndex) => step.classList.toggle('is-active', stepIndex === index))
      }

      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => activate(index),
          onEnterBack: () => activate(index),
        })
      })
    })

    mm.add('(max-width: 1040px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-showcase-step]', {
        y: 48,
        opacity: 0,
        duration: .8,
        stagger: .08,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    })

    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="showcase" id="showcase" ref={root} aria-labelledby="showcase-title">
      <header className="showcase__header shell">
        <div>
          <p className="eyebrow"><span className="eyebrow-dot" />{showcase.eyebrow}</p>
          <h2 id="showcase-title">{showcase.title}</h2>
        </div>
        <p>{showcase.description}</p>
      </header>

      <div className="showcase__body shell">
        <div className="showcase__stories">
          {showcase.items.map((item, index) => (
            <article className={`showcase-story ${index === 0 ? 'is-active' : ''}`} key={item.id} data-showcase-step>
              <span className="showcase-story__index">0{index + 1} / 04</span>
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p className="showcase-story__description">{item.description}</p>
              <ul>
                {item.points.map((point) => <li key={point}><span>+</span>{point}</li>)}
              </ul>
              <div className="showcase-story__mobile-visual">
                <ProductVisual item={item} missingLabel={showcase.imageMissing} />
              </div>
            </article>
          ))}
        </div>

        <div className="showcase-stage" aria-hidden="true">
          <div className="showcase-stage__rail"><span>CALCULATORX / LIVE WORKSPACE</span><span>01—04</span></div>
          <div className="showcase-stage__screen">
            {showcase.items.map((item, index) => (
              <div className={`showcase-stage__layer ${index === 0 ? 'is-active' : ''}`} key={item.id} data-showcase-layer>
                <ProductVisual item={item} missingLabel={showcase.imageMissing} />
              </div>
            ))}
          </div>
          <div className="showcase-stage__footer"><span>ARKUI</span><span>MATHJSON</span><span>C++</span></div>
        </div>
      </div>
    </section>
  )
}
