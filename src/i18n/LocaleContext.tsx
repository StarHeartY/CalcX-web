import { createContext, useContext, useEffect, type ReactNode } from 'react'
import type { SiteContent } from '../data/content.types'
import zh from '../data/locales/zh'
import en from '../data/locales/en'

export type Locale = 'zh' | 'en'

const LOCALES: Record<Locale, SiteContent> = { zh, en }

function localeFromPath(): Locale {
  return window.location.pathname === '/en' || window.location.pathname.startsWith('/en/')
    ? 'en'
    : 'zh'
}

interface LocaleContextValue {
  locale: Locale
  content: SiteContent
  switchLocale: () => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = localeFromPath()
  const content = LOCALES[locale]

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = content.meta.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = content.meta.description
  }, [content, locale])

  const switchLocale = () => {
    window.location.assign(locale === 'zh' ? '/en/' : '/')
  }

  return (
    <LocaleContext.Provider value={{ locale, content, switchLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useContent(): SiteContent {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useContent must be used within LocaleProvider')
  return context.content
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used within LocaleProvider')
  return { locale: context.locale, switchLocale: context.switchLocale }
}

export function getContent(locale: Locale): SiteContent {
  return LOCALES[locale]
}
