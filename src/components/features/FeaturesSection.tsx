import { useContent } from '../../i18n/LocaleContext'
import FeatureCard from './FeatureCard'
import FadeInOnScroll from '../ui/FadeInOnScroll'
import styles from './FeaturesSection.module.css'

const staggerClasses = [
  'fade-stagger-1',
  'fade-stagger-2',
  'fade-stagger-3',
  'fade-stagger-4',
  'fade-stagger-5',
  'fade-stagger-6',
]

export default function FeaturesSection() {
  const { features } = useContent()

  return (
    <div className={styles.grid}>
      {features.map((feature, i) => (
        <FadeInOnScroll key={feature.title} className={staggerClasses[i]}>
          <FeatureCard {...feature} />
        </FadeInOnScroll>
      ))}
    </div>
  )
}
