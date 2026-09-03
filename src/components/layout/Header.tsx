import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { gsap, ScrollSmoother, useGSAP } from '../../animations/gsap'
import { useContent, useLocale } from '../../i18n/LocaleContext'
import ThemeToggle from '../ui/ThemeToggle'

export default function Header() {
  const header = useRef<HTMLElement>(null)
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
    gsap.to('.site-header__progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.2,
      },
    })
  }, { scope: header })

  const handleSectionLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    setMenuOpen(false)
    if (!href.startsWith('#')) return

    const target = document.querySelector(href)
    if (!target) return

    event.preventDefault()
    const smoother = ScrollSmoother.get()
    if (smoother) {
      smoother.scrollTo(target, true, 'top top')
    } else {
      target.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      })
    }
    window.history.replaceState(null, '', href)
  }

  return (
    <header ref={header} className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header__inner shell">
        <a className="brand" href={locale === 'en' ? '/en/' : '/'} aria-label="CalculatorX home">
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
          <span />
          <span />
        </button>

        <div className={`site-header__panel ${menuOpen ? 'is-open' : ''}`}>
          <nav className="primary-nav" aria-label="Primary navigation">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                onClick={(event) => handleSectionLink(event, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="language-button" type="button" onClick={switchLocale} aria-label={ui.switchLanguage}>
              {locale === 'zh' ? 'EN' : '中'}
            </button>
            <ThemeToggle />
            <a className="button button--small button--primary" href="#download" onClick={(event) => handleSectionLink(event, '#download')}>
              {nav.download}
            </a>
          </div>
        </div>
      </div>
      <span className="site-header__progress" aria-hidden="true" />
    </header>
  )
}
