import { useTheme } from '../../hooks/useTheme'
import { useContent } from '../../i18n/LocaleContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const { ui } = useContent()

  return (
    <button
      className="icon-button theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme === 'light' ? ui.switchToDark : ui.switchToLight}
      title={theme === 'light' ? ui.switchToDark : ui.switchToLight}
    >
      {theme === 'light' ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
      )}
    </button>
  )
}
