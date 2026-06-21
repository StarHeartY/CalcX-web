import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LocaleProvider } from './i18n/LocaleContext'
import App from './App'
import './styles/tokens.css'
import './styles/global.css'
import './styles/animations.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
)
