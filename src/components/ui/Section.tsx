import type { ReactNode } from 'react'
import styles from './Section.module.css'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export default function Section({ id, title, subtitle, children, className, fullWidth }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className ?? ''}`}>
      <div className={fullWidth ? styles.containerWide : styles.container}>
        {(title || subtitle) && (
          <header className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
