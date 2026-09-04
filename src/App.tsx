import { useRef } from 'react'
import { gsap, ScrollSmoother, useGSAP } from './animations/gsap'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import CapabilitiesSection from './components/sections/CapabilitiesSection'
import ShowcaseSection from './components/sections/ShowcaseSection'
import ExperienceSection from './components/sections/ExperienceSection'
import TechnologySection from './components/sections/TechnologySection'
import OpenSourceSection from './components/sections/OpenSourceSection'
import DownloadSection from './components/sections/DownloadSection'

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const media = gsap.matchMedia()

    media.add(
      '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
      () => {
        const smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 1.15,
          effects: true,
          smoothTouch: 0,
        })

        return () => smoother.kill()
      },
    )

    return () => media.revert()
  }, { scope: root })

  return (
    <div ref={root}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main id="main">
            <HeroSection />
            <CapabilitiesSection />
            <ShowcaseSection />
            <ExperienceSection />
            <TechnologySection />
            <OpenSourceSection />
            <DownloadSection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
