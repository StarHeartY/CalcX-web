import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'calcx-theme'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function initialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'light' || stored === 'dark' ? stored : systemTheme()
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const syncWithSystem = (event: MediaQueryListEvent) => setTheme(event.matches ? 'dark' : 'light')
    media.addEventListener('change', syncWithSystem)
    return () => media.removeEventListener('change', syncWithSystem)
  }, [])

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'light' ? 'dark' : 'light'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }, [])

  return { theme, toggle }
}
