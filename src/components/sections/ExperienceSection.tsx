import { useContent } from '../../i18n/LocaleContext'
import SectionHeading from '../ui/SectionHeading'

export default function ExperienceSection() {
  const { experience } = useContent()

  return (
    <section className="section experience">
      <div className="shell experience__grid">
        <div>
          <SectionHeading eyebrow={experience.eyebrow} title={experience.title} description={experience.description} />
          <div className="experience-list">
            {experience.items.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </article>
            ))}
          </div>
        </div>
        <div className="formula-demo" aria-label={experience.formulaLabel}>
          <div className="formula-demo__top">
            <span className="formula-demo__dot formula-demo__dot--orange" />
            <span className="formula-demo__dot formula-demo__dot--blue" />
            <span>{experience.formulaLabel}</span>
          </div>
          <div className="formula-demo__canvas">
            <div className="formula-demo__input">{experience.formulaInput}</div>
            <div className="formula-demo__line" />
            <div className="formula-demo__output">{experience.formulaOutput}</div>
          </div>
          <div className="formula-demo__keys" aria-hidden="true">
            {['⇧', 'R/D', '←', '→', 'S⇄D', '='].map((key, index) => (
              <span className={index === 0 ? 'key-orange' : index === 5 ? 'key-blue' : ''} key={key}>{key}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
