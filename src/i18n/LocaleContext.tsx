import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { SiteContent } from '../data/content.types'
import zh from '../data/locales/zh'
import en from '../data/locales/en'

export type Locale = 'zh' | 'en'

const LOCALE_STORAGE_KEY = 'calcx-locale'
const LOCALES: Record<Locale, SiteContent> = { zh, en }

function detectLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored === 'zh' || stored === 'en') return stored

  const nav = navigator.language.toLowerCase()
  if (nav.startsWith('zh')) return 'zh'

  return 'zh'
}

function LocaleContextValue(locale: Locale, setLocale: (l: Locale) => void) {
  return { locale, setLocale, content: LOCALES[locale] }
}

const LocaleContext = createContext<ReturnType<typeof LocaleContextValue> | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_STORAGE_KEY, next)
    document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  return (
    <LocaleContext.Provider value={LocaleContextValue(locale, setLocale)}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useContent(): SiteContent {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useContent must be used within LocaleProvider')
  return ctx.content
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return { locale: ctx.locale, setLocale: ctx.setLocale }
}

export function getContent(locale: Locale): SiteContent {
  return LOCALES[locale]
}
