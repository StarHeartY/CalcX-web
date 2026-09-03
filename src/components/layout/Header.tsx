import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../../animations/gsap'
import { useContent, useLocale } from '../../i18n/LocaleContext'
import ThemeToggle from '../ui/ThemeToggle'

export default function Header() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef<HTMLSpanElement>(null)
  const { nav, ui } = useContent()
  const { locale, switchLocale } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  useGSAP(() => {
    if (!progress.current) return
    gsap.set(progress.current, { scaleX: 0, transformOrigin: 'left center' })
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
    })
    return () => trigger.kill()
  }, { scope: root })

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`} ref={root}>
      <div className="site-header__inner shell">
        <a className="brand" href={locale === 'en' ? '/en/' : '/'} aria-label="CalculatorX">
          <img src="/images/app-icon.png" alt="" width="34" height="34" />
          <span>Calculator<span>X</span></span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span /><span />
        </button>

        <div className={`site-header__panel ${menuOpen ? 'is-open' : ''}`}>
          <nav className="primary-nav" aria-label="Primary navigation">
            {nav.links.map((link, index) => (
              <a key={link.href} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-button" type="button" onClick={switchLocale} aria-label={ui.switchLanguage}>{locale === 'zh' ? 'EN' : '中'}</button>
            <ThemeToggle />
            <a className="button button--small button--primary" href="#download" onClick={() => setMenuOpen(false)}>{nav.download}</a>
          </div>
        </div>
      </div>
      <span className="site-header__progress" ref={progress} />
    </header>
  )
}
