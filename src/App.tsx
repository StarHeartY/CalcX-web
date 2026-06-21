import { useContent } from './i18n/LocaleContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './components/hero/HeroSection'
import FeaturesSection from './components/features/FeaturesSection'
import ScreenshotGallery from './components/gallery/ScreenshotGallery'
import TechStack from './components/architecture/TechStack'
import DownloadGuide from './components/download/DownloadGuide'
import Section from './components/ui/Section'
import styles from './App.module.css'

export default function App() {
  const content = useContent()
  const { sections } = content

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <Section
          id="features"
          title={sections.featuresTitle}
          subtitle={sections.featuresSubtitle}
        >
          <FeaturesSection />
        </Section>
        <Section
          id="gallery"
          title={sections.galleryTitle}
          subtitle={sections.gallerySubtitle}
          fullWidth
        >
          <ScreenshotGallery />
        </Section>
        <Section
          id="architecture"
          title={sections.architectureTitle}
          subtitle={sections.architectureSubtitle}
        >
          <TechStack />
        </Section>
        <Section
          id="download"
          title={sections.downloadTitle}
          subtitle={sections.downloadSubtitle}
        >
          <DownloadGuide />
        </Section>
      </main>
      <Footer />
    </div>
  )
}
