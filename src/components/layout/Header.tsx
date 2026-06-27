import { useState, useEffect } from 'react'
import { useLocale } from '../../i18n/LocaleContext'
import type { Locale } from '../../i18n/LocaleContext'
import ThemeToggle from '../ui/ThemeToggle'
import styles from './Header.module.css'

const NEXT: Record<Locale, Locale> = { zh: 'en', en: 'zh' }
const LABEL: Record<Locale, string> = { zh: 'EN', en: '中' }

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale } = useLocale()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          Calculator<span style={{ color: 'rgb(10, 89, 247)' }}>X</span>
        </a>
        <div className={styles.actions}>
          <button
            className={styles.localeBtn}
            onClick={() => setLocale(NEXT[locale])}
            aria-label={`Switch to ${NEXT[locale] === 'zh' ? '中文' : 'English'}`}
          >
            {LABEL[locale]}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
