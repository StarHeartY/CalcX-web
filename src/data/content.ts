// Re-export types and default locale content
// Components should prefer useContent() from src/i18n/LocaleContext

export type { Feature, TechLayer, SiteContent } from './content.types'
export { getContent } from '../i18n/LocaleContext'
export { default as zh } from './locales/zh'

// Default content (中文) — for backward compatibility during migration
export { default as en } from './locales/en'
export const site = {
  name: 'CalculatorX',
  tagline: '专业科学计算器',
  description:
    '基于 SymEngine 和 Giac 计算机代数系统的专业的科学计算器，支持符号计算、LaTeX 专业排版与超大数运算。',
  heroCta: '获 取',
  heroCtaUrl: '#download',
} as const

export const features = [
  { icon: '∫', title: '符号代数计算', description: '底层集成工业级 SymEngine CAS 引擎，支持多项式展开、根号化简、三角函数恒等变换等精确符号运算，输出完美精度的分数与根号结果，而非近似的浮点数值。' },
  { icon: '𝑥', title: 'LaTeX 专业排版', description: '采用 MathLive 渲染引擎，所有公式以教科书级 LaTeX 标准实时排版。支持组合数、积分、求和等复杂二维数学符号的专业显示，带来出版级的视觉体验。' },
  { icon: '∞', title: '超大数计算', description: '独立 FastMath 模块，利用对数降维与斯特林近似，在 O(1) 时间计算远超普通计算器极限的宇宙级大数，最大支持 10⁹⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰ 级别的天文数字。' },
  { icon: '☀', title: '深浅色模式', description: '适配系统深色/浅色模式，自动跟随系统状态无缝切换。精心调校的配色方案确保两种模式下公式均清晰可辨，夜间使用也舒适护眼。' },
  { icon: '⚡', title: '触感反馈', description: '自定义振动风格，还原真实物理按键手感。搭载 HarmonyOS 系统级触控光效，每一次点击都能得到明确而舒适的反馈。' },
  { icon: '◎', title: '精度自由掌控', description: '支持 0~15 位定点小数精度自由调节；自动模式则保留完美精度的符号输出（分数、根号等），满足从日常到学术的多样化计算需求。' },
]

export const techLayers = [
  { name: 'UI 控制层', subtitle: 'ArkTS / ArkUI', description: '声明式 UI 构建原生键盘与功能面板。实现 ⇧Shift 状态机拦截、动态字体路由、角度/弧度切换等完善交互逻辑，无缝接入系统级动效与触控反馈。', tags: ['ArkTS', 'ArkUI', 'HarmonyOS'] },
  { name: '渲染引擎层', subtitle: 'WebView + MathLive', description: 'Web 组件挂载本地沙箱 HTML，搭载全离线 MathLive 数学排版引擎。支持通过 runJavaScript 进行跨端 DOM 操作，将 LaTeX 公式渲染为教科书级排版。', tags: ['WebView', 'MathLive', 'LaTeX', 'MathJSON'] },
  { name: '计算引擎层', subtitle: 'C++ / SymEngine / Giac', description: 'CMake 构建的底层 C++ 代数引擎，静态链接 SymEngine/Giac 与 Boost 库。手写 parseAST 解析器将 MathJSON 转换为 SymEngine 表达式树，支持精确符号计算与超大数运算。', tags: ['C++', 'SymEngine', 'Giac', 'Boost', 'N-API'] },
]

export const download = {
  title: '获取 CalculatorX',
  steps: [] as string[],
  note: '也可通过开源分发渠道获取安装包。CalculatorX 基于 GPL 3.0 协议开源，源代码完全公开，欢迎审计与贡献。',
  buttonLabel: 'AppGallery',
  buttonUrl: 'https://appgallery.huawei.com/',
} as const

export const footer = {
  copyright: 'Yi Rui (易睿)',
  links: [
    { label: '使用帮助', href: '/docs/' },
    { label: '隐私政策', href: '/privacy/' },
    { label: '用户协议', href: '/agreement/index.html' },
  ],
  email: 'support@startyi.com',
} as const
