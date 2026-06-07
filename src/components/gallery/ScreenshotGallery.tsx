import { useState } from 'react'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './ScreenshotGallery.module.css'

const screenshots = [
  {
    src: '/images/screenshot-light.webp',
    alt: 'CalculatorX 浅色模式主界面',
    label: '浅色模式',
  },
  {
    src: '/images/screenshot-dark.webp',
    alt: 'CalculatorX 深色模式主界面',
    label: '深色模式',
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
  return (
    <div className={styles.gallery}>
      {screenshots.map((shot, i) => (
        <FadeInOnScroll
          key={shot.alt}
          className={i === 0 ? 'fade-stagger-1' : i === 1 ? 'fade-stagger-2' : 'fade-stagger-3'}
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
