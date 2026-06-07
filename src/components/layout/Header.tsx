import { useState, useEffect } from 'react'
import ThemeToggle from '../ui/ThemeToggle'
import styles from './Header.module.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo}>
          CalculatorX
        </a>
        <ThemeToggle />
      </div>
    </header>
  )
}
