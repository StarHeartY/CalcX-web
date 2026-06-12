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
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <Section
          id="features"
          title="功能特色"
          subtitle="集符号计算、专业排版、超大数运算于一身，重新定义移动端科学计算体验"
        >
          <FeaturesSection />
        </Section>
        <Section
          id="gallery"
          title="界面展示"
          subtitle="精心适配深浅色模式，专业排版一目了然"
          fullWidth
        >
          <ScreenshotGallery />
        </Section>
        <Section
          id="architecture"
          title="技术架构"
          subtitle="创新三层架构：ArkTS 原生 UI · WebView 渲染引擎 · C++ 计算引擎"
        >
          <TechStack />
        </Section>
        <Section
          id="download"
          title="获取 CalculatorX"
          subtitle="开源免费，无任何功能付费墙。现在就开启你的专业计算之旅"
        >
          <DownloadGuide />
        </Section>
      </main>
      <Footer />
    </div>
  )
}
