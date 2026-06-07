import { download } from '../../data/content'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './DownloadGuide.module.css'

export default function DownloadGuide() {
  return (
    <div className={styles.guide}>
      <ol className={styles.steps}>
        {download.steps.map((step, i) => (
          <FadeInOnScroll key={i} className={`fade-stagger-${i + 1}`}>
            <li className={styles.step}>
              <span className={styles.stepNumber}>{i + 1}</span>
              <span className={styles.stepText}>{step}</span>
            </li>
          </FadeInOnScroll>
        ))}
      </ol>
      <FadeInOnScroll className="fade-stagger-4">
        <p className={styles.note}>{download.note}</p>
      </FadeInOnScroll>
      <FadeInOnScroll className="fade-stagger-5">
        <div className={styles.buttons}>
          <a
            href={download.buttonUrl}
            className={styles.appGalleryBadge}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className={styles.huaweiIcon}
              src="/images/appgallery-icon.png"
              alt=""
              width="48"
              height="48"
            />
            <span className={styles.badgeText}>
              <span className={styles.badgeExplore}>EXPLORE IT ON</span>
              <span className={styles.badgeStore}>AppGallery</span>
            </span>
          </a>
          <a
            href="https://github.com/StarHeartY/CalculatorX"
            className={styles.buttonGithub}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className={styles.githubIcon} aria-hidden="true" />
            访问 GitHub
          </a>
        </div>
      </FadeInOnScroll>
    </div>
  )
}
