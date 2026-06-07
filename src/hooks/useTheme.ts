import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'calcx-theme'

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  return getSystemTheme()
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [isManual, setIsManual] = useState<boolean>(
    () => localStorage.getItem(STORAGE_KEY) !== null
  )

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  // Listen for system theme changes (only when user hasn't manually overridden)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!isManual) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [isManual])

  const toggle = useCallback(() => {
    setIsManual(true)
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return { theme, toggle }
}
