import { useContent } from '../../i18n/LocaleContext'
import SectionHeading from '../ui/SectionHeading'

export default function TechnologySection() {
  const { architecture } = useContent()

  return (
    <section className="section technology" id="technology">
      <div className="shell">
        <SectionHeading eyebrow={architecture.eyebrow} title={architecture.title} description={architecture.description} align="center" />
        <div className="pipeline">
          {architecture.steps.map((step, index) => (
            <div className="pipeline__group" key={step.name}>
              <article className="pipeline__step">
                <span>0{index + 1}</span>
                <strong>{step.name}</strong>
                <small>{step.detail}</small>
              </article>
              {index < architecture.steps.length - 1 && <span className="pipeline__arrow" aria-hidden="true">→</span>}
            </div>
          ))}
        </div>
        <div className="technology__notes">
          {architecture.notes.map((note) => <span key={note}>{note}</span>)}
        </div>
      </div>
    </section>
  )
}
