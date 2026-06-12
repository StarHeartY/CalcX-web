import { useState, useRef, useEffect } from 'react'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './ScreenshotGallery.module.css'

const screenshots = [
  {
    src: '/images/screenshot-basic-math.webp',
    alt: 'CalculatorX 基础数学计算',
    label: '基础计算',
  },
  {
    src: '/images/screenshot-advanced-math.webp',
    alt: 'CalculatorX 高等数学计算',
    label: '高等数学',
  },
  {
    src: '/images/screenshot-big-digit.webp',
    alt: 'CalculatorX 超大数字计算',
    label: '大数计算',
  },
  {
    src: '/images/screenshot-settings.webp',
    alt: 'CalculatorX 设置界面',
    label: '设置页面',
  },
]

function ScreenshotFrame({ src, alt, label }: { src: string; alt: string; label: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className={styles.placeholder}>
        <span>{label}</span>
        <span className={styles.hint}>截图准备中…</span>
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
        // Scrolling down → go right
        if (atEnd) return // let page scroll
        e.preventDefault()
        el.scrollBy({ left: step, behavior: 'smooth' })
      } else {
        // Scrolling up → go left
        if (atStart) return // let page scroll
        e.preventDefault()
        el.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <div className={styles.gallery} ref={galleryRef}>
      {screenshots.map((shot, i) => (
        <FadeInOnScroll
          key={shot.alt}
          className={i === 0 ? 'fade-stagger-1' : i === 1 ? 'fade-stagger-2' : i === 2 ? 'fade-stagger-3' : 'fade-stagger-4'}
        >
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <ScreenshotFrame src={shot.src} alt={shot.alt} label={shot.label} />
            </div>
            <figcaption className={styles.caption}>{shot.label}</figcaption>
          </figure>
        </FadeInOnScroll>
      ))}
    </div>
  )
}
