// Shared content interface — every locale must satisfy this shape

export interface SiteMeta {
  name: string
  tagline: string
  description: string
  heroCta: string
  heroCtaUrl: string
}

export interface Feature {
  icon: string
  title: string
  description: string
}

export interface TechLayer {
  name: string
  subtitle: string
  description: string
  tags: string[]
}

export interface FooterLink {
  label: string
  href: string
}

export interface Download {
  title: string
  steps: string[]
  note: string
  buttonLabel: string
  buttonUrl: string
  githubButton: string
}

export interface Footer {
  copyright: string
  links: FooterLink[]
  email: string
}

export interface Sections {
  featuresTitle: string
  featuresSubtitle: string
  galleryTitle: string
  gallerySubtitle: string
  architectureTitle: string
  architectureSubtitle: string
  downloadTitle: string
  downloadSubtitle: string
}

export interface ScreenshotItem {
  src: string
  alt: string
  label: string
}

export interface NavLink {
  label: string
  href: string
}

export interface UIText {
  themeToggleDark: string
  themeToggleLight: string
  switchToDark: string
  switchToLight: string
  screenshotPreparing: string
}

export interface SiteContent {
  site: SiteMeta
  nav: NavLink[]
  features: Feature[]
  techLayers: TechLayer[]
  download: Download
  footer: Footer
  sections: Sections
  screenshots: ScreenshotItem[]
  ui: UIText
}
