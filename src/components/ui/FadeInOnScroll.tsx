import { type ReactNode, useRef, useState, useCallback, useEffect } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'

interface FadeInOnScrollProps {
  children: ReactNode
  className?: string
}

export default function FadeInOnScroll({ children, className }: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const { observe } = useScrollReveal()

  const onReveal = useCallback(() => {
    setVisible(true)
  }, [])

  useEffect(() => {
    observe(ref.current, onReveal)
  }, [observe, onReveal])

  return (
    <div
      ref={ref}
      className={`fade-in-on-scroll ${visible ? 'visible' : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
