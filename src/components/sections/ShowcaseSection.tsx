import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'
import ProductVisual from '../ui/ProductVisual'

export default function ShowcaseSection() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const selectCard = useRef<(index: number) => void>(() => undefined)
  const [activeIndex, setActiveIndex] = useState(0)
  const { showcase } = useContent()

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.showcase-card')
      const distance = () => Math.max(0, (track.current?.scrollWidth ?? 0) - window.innerWidth)
      let currentIndex = 0

      gsap.from('.showcase-heading > *, .showcase-tabs', {
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

      let trackTween!: gsap.core.Tween
      trackTween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${distance() * 0.7}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const nextIndex = Math.round(self.progress * (cards.length - 1))

            if (nextIndex !== currentIndex) {
              currentIndex = nextIndex
              setActiveIndex(nextIndex)
            }
          },
        },
      })

      cards.slice(1).forEach((card) => {
        gsap.fromTo(card, {
          autoAlpha: 0.55,
          rotationY: 4,
          scale: 0.965,
          transformOrigin: 'left center',
        }, {
          autoAlpha: 1,
          rotationY: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            containerAnimation: trackTween,
            start: 'left 100%',
            end: 'left 72%',
            scrub: true,
          },
        })
      })

      selectCard.current = (index) => {
        const scrollTrigger = trackTween.scrollTrigger
        if (!scrollTrigger) return

        const progress = index / Math.max(1, cards.length - 1)
        const top = scrollTrigger.start + (scrollTrigger.end - scrollTrigger.start) * progress
        window.scrollTo({ top, behavior: 'smooth' })
      }
    })

    media.add('(max-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.showcase-card')

      gsap.from('.showcase-heading > *, .showcase-tabs', {
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

      cards.forEach((card) => {
        gsap.from(card, {
          y: 52,
          autoAlpha: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 84%',
            once: true,
          },
        })
      })

      selectCard.current = (index) => {
        cards[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })

    media.add('(prefers-reduced-motion: reduce)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.showcase-card')
      selectCard.current = (index) => {
        cards[index]?.scrollIntoView({ block: 'center' })
      }
    })

    return () => media.revert()
  }, { scope: root })

  const activateCard = (index: number) => {
    setActiveIndex(index)
    selectCard.current(index)
  }

  return (
    <section ref={root} className="showcase" id="showcase">
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
              aria-controls={`showcase-card-${item.id}`}
              aria-selected={activeIndex === index}
              className={activeIndex === index ? 'is-active' : ''}
              onClick={() => activateCard(index)}
            >
              {item.tab}
            </button>
          ))}
        </div>
      </div>

      <div ref={track} className="showcase-track">
        {showcase.items.map((item, index) => (
          <article
            id={`showcase-card-${item.id}`}
            className={`showcase-card showcase-card--${item.id} ${activeIndex === index ? 'is-active' : ''}`}
            key={item.id}
            role="tabpanel"
            aria-labelledby={`showcase-tab-${item.id}`}
          >
            <div className="showcase-card__visual">
              <ProductVisual item={item} missingLabel={showcase.imageMissing} />
            </div>
            <div className="showcase-card__copy">
              <p className="eyebrow">{item.eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <ul>
                {item.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
