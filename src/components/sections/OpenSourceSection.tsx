import { useContent } from '../../i18n/LocaleContext'

const GITHUB_URL = 'https://github.com/StarHeartY/CalculatorX'
const ARCHITECTURE_URL = 'https://github.com/StarHeartY/CalculatorX/blob/main/docs/ARCHITECTURE.md'

export default function OpenSourceSection() {
  const { openSource } = useContent()

  return (
    <section className="section open-source">
      <div className="shell open-source__card">
        <div className="open-source__mark" aria-hidden="true">
          <span>&lt;/&gt;</span>
          <svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="70" /><path d="m42 96 27 27 68-68" /></svg>
        </div>
        <div className="open-source__copy">
          <p className="eyebrow">{openSource.eyebrow}</p>
          <h2>{openSource.title}</h2>
          <p>{openSource.description}</p>
          <div className="badge-row">
            {openSource.badges.map((badge) => <span key={badge}>{badge}</span>)}
          </div>
          <div className="open-source__actions">
            <a className="button button--light" href={GITHUB_URL} target="_blank" rel="noreferrer">{openSource.primaryAction}<span>↗</span></a>
            <a className="text-link text-link--light" href={ARCHITECTURE_URL} target="_blank" rel="noreferrer">{openSource.secondaryAction}<span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
