import { useRef } from 'react'
import { gsap, useGSAP } from '../../animations/gsap'
import { useContent } from '../../i18n/LocaleContext'

const APP_GALLERY_URL = 'https://appgallery.huawei.com/app/detail?id=com.startyi.calcx'
const RELEASES_URL = 'https://github.com/StarHeartY/CalculatorX/releases'

export default function DownloadSection() {
  const root = useRef<HTMLElement>(null)
  const { download } = useContent()

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-download-orb]', {
        scale: .45,
        rotate: -18,
        opacity: 0,
        duration: 1.1,
        ease: 'elastic.out(1, .65)',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      })
      gsap.from('[data-download-copy] > *', {
        y: 38,
        opacity: 0,
        stagger: .1,
        duration: .75,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="download" id="download" ref={root} aria-labelledby="download-title">
      <div className="download__grid shell">
        <div className="download__orb" data-download-orb>
          <span aria-hidden="true">∫</span>
          <img src="/images/app-icon.png" alt="CalculatorX" width="148" height="148" />
          <i aria-hidden="true">x² + y² = 1</i>
        </div>
        <div className="download__copy" data-download-copy>
          <p className="eyebrow"><span className="eyebrow-dot" />{download.eyebrow}</p>
          <h2 id="download-title">{download.title}</h2>
          <p>{download.description}</p>
          <div className="download__actions">
            <a className="store-button" href={APP_GALLERY_URL} target="_blank" rel="noreferrer">
              <img src="/images/appgallery-icon.png" alt="" width="46" height="46" />
              <span><small>EXPLORE IT ON</small><strong>{download.appGallery}</strong></span>
            </a>
            <a className="button button--dark button--large" href={RELEASES_URL} target="_blank" rel="noreferrer">
              {download.github}<span>↗</span>
            </a>
          </div>
          <p className="download__footnote">{download.footnote}</p>
        </div>
      </div>
    </section>
  )
}
