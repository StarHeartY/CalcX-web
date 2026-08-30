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
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
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
    </>
  )
}
