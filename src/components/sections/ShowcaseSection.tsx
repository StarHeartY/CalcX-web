import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'
import ProductVisual from '../ui/ProductVisual'

export default function ShowcaseSection() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const { showcase } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const scenes = gsap.utils.toArray<HTMLElement>('.showcase-scene')
      const markers = gsap.utils.toArray<HTMLElement>('.showcase-index__fill')
      gsap.set(scenes.slice(1), { autoAlpha: 0, y: 70 })
      gsap.set(markers, { scaleX: 0, transformOrigin: 'left center' })
      gsap.set(markers[0], { scaleX: 1 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          pin: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4.4}`,
          scrub: 0.9,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      timeline.to({}, { duration: 0.75 })
      scenes.forEach((scene, index) => {
        if (index === 0) return
        timeline
          .to(scenes[index - 1], { autoAlpha: 0, y: -70, duration: 0.35, ease: 'power2.in' })
          .fromTo(scene, { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '<0.1')
          .to(markers[index], { scaleX: 1, duration: 0.35, ease: 'none' }, '<')
          .to({}, { duration: 0.75 })
      })
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.showcase-scene').forEach((scene) => {
        gsap.from(scene, {
          y: 60,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: scene, start: 'top 82%', once: true },
        })
      })
    })

    return () => media.revert()
  }, { scope: root })

  return (
    <section ref={root} className="showcase" id="showcase">
      <div ref={pin} className="showcase-pin">
        <div className="shell showcase-heading">
          <p className="eyebrow"><span className="eyebrow-dot" />{showcase.eyebrow}</p>
          <div><h2>{showcase.title}</h2><p>{showcase.description}</p></div>
        </div>
        <div className="shell showcase-index" aria-hidden="true">
          {showcase.items.map((item, index) => (
            <div key={item.id}><span>0{index + 1}</span><small>{item.tab}</small><i><b className="showcase-index__fill" /></i></div>
          ))}
        </div>
        <div className="shell showcase-scenes">
          {showcase.items.map((item, index) => (
            <article className={`showcase-scene showcase-scene--${item.id}`} key={item.id}>
              <div className="showcase-scene__copy">
                <span className="showcase-scene__number">0{index + 1}</span>
                <p className="eyebrow">{item.eyebrow}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <ul>{item.points.map((point) => <li key={point}><span>↗</span>{point}</li>)}</ul>
              </div>
              <div className="showcase-scene__visual">
                <div className="showcase-scene__halo" aria-hidden="true" />
                <ProductVisual item={item} missingLabel={showcase.imageMissing} />
                <span className="showcase-scene__label">CALCULATORX / {item.id.toUpperCase()}</span>
              </div>
            </article>
          ))}
        </div>
        <div className="showcase-corner" aria-hidden="true">SCROLL<br />TO ADVANCE</div>
      </div>
    </section>
  )
}
