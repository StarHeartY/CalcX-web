import { useEffect, useRef, useCallback } from 'react'

export function useScrollReveal() {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const elementsRef = useRef<Map<Element, () => void>>(new Map())

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = elementsRef.current.get(entry.target)
            if (cb) {
              cb()
              elementsRef.current.delete(entry.target)
              observerRef.current?.unobserve(entry.target)
            }
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -48px 0px',
      }
    )

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  const observe = useCallback((element: Element | null, onReveal: () => void) => {
    if (!element || !observerRef.current) return
    elementsRef.current.set(element, onReveal)
    observerRef.current.observe(element)
  }, [])

  return { observe }
}
