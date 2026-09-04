import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'
import ProductVisual from '../ui/ProductVisual'

export default function ShowcaseSection() {
  const root = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const selectPanel = useRef<(index: number) => void>(() => undefined)
  const [activeIndex, setActiveIndex] = useState(0)
  const { showcase } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const visuals = gsap.utils.toArray<HTMLElement>('.showcase-panel__visual')
      const copies = gsap.utils.toArray<HTMLElement>('.showcase-panel__copy')
      const transitionPoints = [0]
      let currentIndex = 0

      gsap.set(visuals.slice(1), { autoAlpha: 0, xPercent: 8, scale: 0.96 })
      gsap.set(copies.slice(1), { autoAlpha: 0, x: 44 })

      gsap.from('.showcase-heading > *, .showcase-tabs, .showcase-panel', {
        y: 34,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 78%',
          once: true,
        },
      })

      let timeline!: gsap.core.Timeline
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          pin: pin.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 4.2}`,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            const time = timeline.time()
            let nextIndex = 0

            transitionPoints.forEach((point, index) => {
              if (time >= point) nextIndex = index
            })

            if (nextIndex !== currentIndex) {
              currentIndex = nextIndex
              setActiveIndex(nextIndex)
            }
          },
        },
      })

      timeline.to({}, { duration: 0.72 })

      visuals.forEach((visual, index) => {
        if (index === 0) return

        const previousVisual = visuals[index - 1]
        const previousCopy = copies[index - 1]
        const copy = copies[index]
        const transitionStart = timeline.duration()

        transitionPoints.push(transitionStart + 0.22)
        timeline
          .to(previousVisual, {
            autoAlpha: 0,
            xPercent: -8,
            scale: 0.96,
            duration: 0.38,
            ease: 'power2.inOut',
          }, transitionStart)
          .to(previousCopy, {
            autoAlpha: 0,
            x: 42,
            duration: 0.3,
            ease: 'power2.in',
          }, transitionStart)
          .fromTo(visual, {
            autoAlpha: 0,
            xPercent: 8,
            scale: 0.96,
          }, {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            duration: 0.52,
            ease: 'power3.out',
          }, transitionStart + 0.16)
          .fromTo(copy, {
            autoAlpha: 0,
            x: 44,
          }, {
            autoAlpha: 1,
            x: 0,
            duration: 0.46,
            ease: 'power3.out',
          }, transitionStart + 0.2)
          .to({}, { duration: 0.68 })
      })

      selectPanel.current = (index) => {
        const scrollTrigger = timeline.scrollTrigger
        if (!scrollTrigger) return

        const targetTime = transitionPoints[index] ?? 0
        const progress = timeline.duration() ? targetTime / timeline.duration() : 0
        const top = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress
        window.scrollTo({ top, behavior: 'smooth' })
      }

      return () => {
        selectPanel.current = (index) => setActiveIndex(index)
      }
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.from('.showcase-heading > *, .showcase-tabs, .showcase-panel', {
        y: 42,
        autoAlpha: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.current,
          start: 'top 82%',
          once: true,
        },
      })
    })

    return () => media.revert()
  }, { scope: root })

  const activatePanel = (index: number) => {
    setActiveIndex(index)
    selectPanel.current(index)
  }

  return (
    <section ref={root} className="showcase" id="showcase">
      <div ref={pin} className="showcase-pin">
        <div className="shell showcase-shell">
          <div className="showcase-heading">
            <p className="eyebrow"><span className="eyebrow-dot" />{showcase.eyebrow}</p>
            <h2>{showcase.title}</h2>
            <p>{showcase.description}</p>
          </div>

          <div className="showcase-tabs" role="tablist" aria-label={showcase.title}>
            {showcase.items.map((item, index) => (
              <button
                id={`showcase-tab-${item.id}`}
                key={item.id}
                type="button"
                role="tab"
                aria-controls={`showcase-panel-${item.id}`}
                aria-selected={activeIndex === index}
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => activatePanel(index)}
              >
                {item.tab}
              </button>
            ))}
          </div>

          <div className="showcase-panel">
            <div className="showcase-panel__visuals">
              {showcase.items.map((item, index) => (
                <div
                  className={`showcase-panel__visual showcase-panel__visual--${item.id} ${activeIndex === index ? 'is-active' : ''}`}
                  key={item.id}
                  aria-hidden={activeIndex !== index}
                >
                  <ProductVisual item={item} missingLabel={showcase.imageMissing} />
                </div>
              ))}
            </div>

            <div className="showcase-panel__copies">
              {showcase.items.map((item, index) => (
                <article
                  id={`showcase-panel-${item.id}`}
                  className={`showcase-panel__copy ${activeIndex === index ? 'is-active' : ''}`}
                  key={item.id}
                  role="tabpanel"
                  aria-labelledby={`showcase-tab-${item.id}`}
                  aria-hidden={activeIndex !== index}
                >
                  <p className="eyebrow">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
