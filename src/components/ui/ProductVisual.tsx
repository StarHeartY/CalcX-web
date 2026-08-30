import { useEffect, useState } from 'react'
import type { ShowcaseItem } from '../../data/content.types'

interface ProductVisualProps {
  item: ShowcaseItem
  missingLabel: string
}

export default function ProductVisual({ item, missingLabel }: ProductVisualProps) {
  const [missingLight, setMissingLight] = useState(false)
  const [missingDark, setMissingDark] = useState(false)

  useEffect(() => {
    setMissingLight(false)
    setMissingDark(false)
  }, [item.darkSrc, item.lightSrc])

  if (missingLight && missingDark) {
    return (
      <div className={`product-visual__fallback product-visual__fallback--${item.id}`} role="img" aria-label={item.alt}>
        <div className="fallback-grid" aria-hidden="true" />
        <svg className="fallback-curve" viewBox="0 0 520 360" aria-hidden="true">
          <path d="M0 216C48 216 68 72 128 72s74 220 142 220 83-186 142-186c54 0 65 88 108 88" />
        </svg>
        <div className="fallback-formula">{item.fallbackFormula}</div>
        <div className="fallback-caption">
          <strong>{item.fallbackLabel}</strong>
          <span>{missingLabel}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="product-visual__picture">
      {!missingLight && (
        <img
          className={`theme-image theme-image--light ${missingDark ? 'theme-image--always' : ''}`}
          src={item.lightSrc}
          alt={item.alt}
          loading="lazy"
          onError={() => setMissingLight(true)}
        />
      )}
      {!missingDark && (
        <img
          className={`theme-image theme-image--dark ${missingLight ? 'theme-image--always' : ''}`}
          src={item.darkSrc}
          alt={item.alt}
          loading="lazy"
          onError={() => setMissingDark(true)}
        />
      )}
    </div>
  )
}
