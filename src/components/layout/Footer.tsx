import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.links}>
          <a href="/help/index.html">使用帮助</a>
          <a href="/privacy/index.html">隐私政策</a>
          <a href="/agreement/index.html">用户协议</a>
        </nav>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Yi Rui (易睿). All rights reserved.
        </p>
        <p className={styles.contact}>
          <a href="mailto:support@startyi.com">support@startyi.com</a>
        </p>
      </div>
    </footer>
  )
}
