import { useContent } from '../../i18n/LocaleContext'
import styles from './Footer.module.css'

export default function Footer() {
  const { footer } = useContent()
  const startYear = 2026
  const thisYear = new Date().getFullYear()
  const year = thisYear === startYear ? `${startYear}` : `${startYear}–${thisYear}`

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.links}>
          {footer.links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
        <p className={styles.copy}>
          &copy; {year} {footer.copyright}. All rights reserved.
        </p>
        <p className={styles.contact}>
          <a href={`mailto:${footer.email}`}>{footer.email}</a>
        </p>
      </div>
    </footer>
  )
}
