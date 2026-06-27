import type { SiteContent } from '../content.types'

const en: SiteContent = {
  site: {
    name: 'CalculatorX',
    tagline: 'Professional Scientific Calculator',
    description:
      'A professional scientific calculator powered by SymEngine and Giac computer algebra systems, supporting symbolic computation, LaTeX typesetting, and massive-number arithmetic.',
    heroCta: 'Get',
    heroCtaUrl: '#download',
  },

  features: [
    {
      icon: '∫',
      title: 'Symbolic Algebra',
      description:
        'Powered by the industrial-grade SymEngine CAS engine. Supports polynomial expansion, radical simplification, trigonometric identities, and other exact symbolic operations — delivering perfectly precise fractional and radical results, not approximate floating-point values.',
    },
    {
      icon: '𝑥',
      title: 'LaTeX Typesetting',
      description:
        'Uses the MathLive rendering engine to typeset all formulas in textbook-quality LaTeX. Supports binomial coefficients, integrals, summations, and complex two-dimensional notation for a publication-grade visual experience.',
    },
    {
      icon: '∞',
      title: 'Massive Numbers',
      description:
        'A standalone FastMath module uses logarithmic reduction and Stirling approximations to compute astronomically large numbers in O(1) time — far beyond the limits of ordinary calculators, supporting values up to 10⁹⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰.',
    },
    {
      icon: '☀',
      title: 'Light & Dark Mode',
      description:
        'Adapts to the system light/dark appearance and switches seamlessly. Carefully tuned color schemes keep formulas crisp and legible in both modes, with a comfortable eye-friendly experience for nighttime use.',
    },
    {
      icon: '⚡',
      title: 'Haptic Feedback',
      description:
        'Custom vibration patterns recreate the feel of physical keys. Built on HarmonyOS system-level haptic effects, every tap delivers clear, satisfying feedback.',
    },
    {
      icon: '◎',
      title: 'Precision Control',
      description:
        'Choose fixed-point decimal precision from 0 to 15 digits. Auto mode preserves exact symbolic output (fractions, radicals, etc.), satisfying everything from everyday arithmetic to academic research.',
    },
  ],

  techLayers: [
    {
      name: 'UI Control Layer',
      subtitle: 'ArkTS / ArkUI',
      description:
        'Declarative UI builds the native keypad and feature panels. Implements ⇧Shift state-machine interception, dynamic font routing, degree/radian toggling, and integrates with system-level animations and haptic feedback.',
      tags: ['ArkTS', 'ArkUI', 'HarmonyOS'],
    },
    {
      name: 'Rendering Engine Layer',
      subtitle: 'WebView + MathLive',
      description:
        'A Web component hosts a local sandboxed HTML page bundled with the fully offline MathLive typesetting engine. Cross-environment DOM manipulation via runJavaScript renders LaTeX formulas with textbook fidelity.',
      tags: ['WebView', 'MathLive', 'LaTeX', 'MathJSON'],
    },
    {
      name: 'Computation Engine Layer',
      subtitle: 'C++ / SymEngine / Giac',
      description:
        'A CMake-built native C++ algebra engine statically linked against SymEngine, Giac, and Boost. A hand-written parseAST converts MathJSON into SymEngine expression trees for exact symbolic computation and massive-number arithmetic.',
      tags: ['C++', 'SymEngine', 'Giac', 'Boost', 'N-API'],
    },
  ],

  download: {
    title: 'Get CalculatorX',
    steps: [],
    note: 'Install packages are also available through open-source distribution channels. CalculatorX is open-sourced under the GPL 3.0 license — source code is fully public. Audits and contributions are welcome.',
    buttonLabel: 'AppGallery',
    buttonUrl: 'https://appgallery.huawei.com/',
    githubButton: 'View on GitHub',
  },

  footer: {
    copyright: 'Yi Rui (易睿)',
    links: [
      { label: 'Help', href: '/docs' },
      { label: 'Privacy', href: '/privacy/' },
      { label: 'Agreement', href: '/agreement/' },
    ],
    email: 'support@startyi.com',
  },

  sections: {
    featuresTitle: 'Features',
    featuresSubtitle: 'Symbolic computation, professional typesetting, and massive-number arithmetic — redefining the mobile scientific calculator experience.',
    galleryTitle: 'Interface',
    gallerySubtitle: 'Carefully adapted for light and dark modes, with professional typesetting at a glance.',
    architectureTitle: 'Architecture',
    architectureSubtitle: 'Innovative three-layer architecture: ArkTS Native UI · WebView Rendering · C++ Computation Engine',
    downloadTitle: 'Get CalculatorX',
    downloadSubtitle: 'Open source and free. No feature paywalls. Start your professional calculation journey now.',
  },

  screenshots: [
    { src: '/images/screenshot-basic-math.webp', alt: 'CalculatorX basic math computation', label: 'Basic Math' },
    { src: '/images/screenshot-advanced-math.webp', alt: 'CalculatorX advanced math computation', label: 'Advanced Math' },
    { src: '/images/screenshot-big-digit.webp', alt: 'CalculatorX massive-number computation', label: 'Large Numbers' },
    { src: '/images/screenshot-settings.webp', alt: 'CalculatorX settings interface', label: 'Settings' },
  ],

  ui: {
    themeToggleDark: 'Dark Mode',
    themeToggleLight: 'Light Mode',
    switchToDark: 'Switch to dark mode',
    switchToLight: 'Switch to light mode',
    screenshotPreparing: 'Preparing screenshot…',
  },
}

export default en
