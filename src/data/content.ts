// 所有中文文案集中管理，便于修改与维护

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

export const site = {
  name: 'CalculatorX',
  tagline: 'HarmonyOS 专业科学计算器',
  description:
    '基于 SymEngine 计算机代数系统的专业的科学计算器，支持符号计算、LaTeX 专业排版与超大数运算。',
  heroCta: '访问 GitHub',
  heroCtaUrl: 'https://github.com/StarHeartY/CalculatorX',
} as const

export const features: Feature[] = [
  {
    icon: '∫',
    title: '符号代数计算',
    description:
      '底层集成工业级 SymEngine CAS 引擎，支持多项式展开、根号化简、三角函数恒等变换等精确符号运算，输出完美精度的分数与根号结果，而非近似的浮点数值。',
  },
  {
    icon: '𝑥',
    title: 'LaTeX 专业排版',
    description:
      '采用 MathLive 渲染引擎，所有公式以教科书级 LaTeX 标准实时排版。支持组合数、积分、求和等复杂二维数学符号的专业显示，带来出版级的视觉体验。',
  },
  {
    icon: '∞',
    title: '超大数计算',
    description:
      '独立 FastMath 模块，利用对数降维与斯特林近似，在 O(1) 时间计算远超普通计算器极限的宇宙级大数，最大支持 10⁹⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰⁰ 级别的天文数字。',
  },
  {
    icon: '☀',
    title: '深浅色模式',
    description:
      '完美适配 HarmonyOS 系统深色/浅色模式，自动跟随系统状态无缝切换。精心调校的配色方案确保两种模式下公式均清晰可辨，夜间使用也舒适护眼。',
  },
  {
    icon: '⚡',
    title: '触感反馈',
    description:
      '自定义振动风格，还原真实物理按键手感。搭载 HarmonyOS 系统级触控光效，每一次点击都能得到明确而舒适的反馈。',
  },
  {
    icon: '◎',
    title: '精度自由掌控',
    description:
      '支持 0–15 位定点小数精度自由调节；自动模式则保留完美精度的符号输出（分数、根号），或自动抹除多余尾随零，满足从日常到学术的多样化计算需求。',
  },
]

export const techLayers: TechLayer[] = [
  {
    name: 'UI 控制层',
    subtitle: 'ArkTS / ArkUI',
    description:
      '声明式 UI 构建原生键盘与功能面板。实现 ⇧Shift 状态机拦截、动态字体路由、角度/弧度切换等完善交互逻辑，无缝接入系统级动效与触控反馈。',
    tags: ['ArkTS', 'ArkUI', 'HarmonyOS'],
  },
  {
    name: '渲染引擎层',
    subtitle: 'WebView + MathLive',
    description:
      'Web 组件挂载本地沙箱 HTML，搭载全离线 MathLive 数学排版引擎。支持通过 runJavaScript 进行跨端 DOM 操作，将 LaTeX 公式渲染为教科书级排版。',
    tags: ['WebView', 'MathLive', 'LaTeX', 'MathJSON'],
  },
  {
    name: '计算引擎层',
    subtitle: 'C++ / SymEngine',
    description:
      'CMake 构建的底层 C++ 代数引擎，静态链接 SymEngine CAS 与 Boost 库。手写 parseAST 解析器将 MathJSON 转换为 SymEngine 表达式树，支持精确符号计算与超大数运算。',
    tags: ['C++', 'SymEngine', 'Boost', 'N-API'],
  },
]

export const download = {
  title: '获取 CalculatorX',
  steps: [
    // '打开手机上的「华为应用市场」App',
    // '搜索「CalculatorX」或「科学计算器」',
    // '点击安装，即可免费使用全部功能',
  ],
  note: '也可通过开源分发渠道获取安装包。CalculatorX 基于 GPL 3.0 协议开源，源代码完全公开，欢迎审计与贡献。',
    buttonLabel: 'AppGallery',
  buttonUrl: 'https://appgallery.huawei.com/',
} as const

export const footer = {
  copyright: 'Yi Rui (易睿)',
  links: [
      { label: '使用帮助', href: 'https://calcx.startyi.com/help/' },
      { label: '隐私政策', href: 'https://calcx.startyi.com/privacy/' },
      { label: '用户协议', href: 'https://calcx.startyi.com/agreement/' },
  ],
  email: 'support@startyi.com',
} as const

// npm run dev