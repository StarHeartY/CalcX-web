import { useState, useRef, useEffect } from 'react'
import { useContent } from '../../i18n/LocaleContext'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './ScreenshotGallery.module.css'

function ScreenshotFrame({ src, alt, label, preparing }: { src: string; alt: string; label: string; preparing: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={styles.placeholder}>
        <span>{label}</span>
        <span className={styles.hint}>{preparing}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
    />
  )
}

export default function ScreenshotGallery() {
  const { screenshots, ui } = useContent()
  const galleryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      const figure = el.querySelector(`.${styles.figure}`) as HTMLElement | null
      if (!figure) return

      const gap = parseFloat(getComputedStyle(el).gap) || 0
      const step = figure.offsetWidth + gap
      const atStart = el.scrollLeft <= 1
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1

      if (e.deltaY > 0) {
        if (atEnd) return
        e.preventDefault()
        el.scrollBy({ left: step, behavior: 'smooth' })
      } else {
        if (atStart) return
        e.preventDefault()
        el.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const staggerMap = ['fade-stagger-1', 'fade-stagger-2', 'fade-stagger-3', 'fade-stagger-4']

  return (
    <div className={styles.gallery} ref={galleryRef}>
      {screenshots.map((shot, i) => (
        <FadeInOnScroll
          key={shot.alt}
          className={staggerMap[i]}
        >
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <ScreenshotFrame src={shot.src} alt={shot.alt} label={shot.label} preparing={ui.screenshotPreparing} />
            </div>
            <figcaption className={styles.caption}>{shot.label}</figcaption>
          </figure>
        </FadeInOnScroll>
      ))}
    </div>
  )
}
