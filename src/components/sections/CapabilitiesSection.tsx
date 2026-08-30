import { useContent } from '../../i18n/LocaleContext'
import SectionHeading from '../ui/SectionHeading'

export default function CapabilitiesSection() {
  const { capabilities } = useContent()

  return (
    <section className="section capabilities" id="capabilities">
      <div className="shell">
        <SectionHeading {...capabilities} align="center" />
        <div className="capability-grid">
          {capabilities.items.map((item, index) => (
            <article className={`capability-card accent-${item.accent}`} key={item.title}>
              <div className="capability-card__top">
                <span className="capability-icon" aria-hidden="true">{item.icon}</span>
                <span className="capability-index">0{index + 1}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
