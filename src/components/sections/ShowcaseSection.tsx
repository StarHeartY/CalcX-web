import { useState } from 'react'
import type { ShowcaseId } from '../../data/content.types'
import { useContent } from '../../i18n/LocaleContext'
import ProductVisual from '../ui/ProductVisual'
import SectionHeading from '../ui/SectionHeading'

export default function ShowcaseSection() {
  const { showcase } = useContent()
  const [activeId, setActiveId] = useState<ShowcaseId>('exact')
  const active = showcase.items.find((item) => item.id === activeId) ?? showcase.items[0]

  return (
    <section className="section showcase" id="showcase">
      <div className="shell">
        <SectionHeading eyebrow={showcase.eyebrow} title={showcase.title} description={showcase.description} />
        <div className="showcase-tabs" role="tablist" aria-label={showcase.title}>
          {showcase.items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active.id === item.id}
              className={active.id === item.id ? 'is-active' : ''}
              onClick={() => setActiveId(item.id)}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <div className="showcase-panel" role="tabpanel" key={active.id}>
          <div className="showcase-panel__visual">
            <ProductVisual item={active} missingLabel={showcase.imageMissing} />
          </div>
          <div className="showcase-panel__copy">
            <p className="eyebrow">{active.eyebrow}</p>
            <h3>{active.title}</h3>
            <p>{active.description}</p>
            <ul>
              {active.points.map((point) => <li key={point}><span>✓</span>{point}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
