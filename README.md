# [CalculatorX](https://github.com/StarHeartY/CalculatorX) · 官方网站

🌐 链接：[CalcX.startyi.com](https://calcx.startyi.com)

CalculatorX 产品落地页，基于 **[React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)** 构建，部署于 **[GitHub Pages](https://pages.github.com/)**。

## ✨ 页面内容

- **Hero** — 产品主视觉与 CTA
- **功能特色** — 6 大核心功能卡片
- **界面展示** — 横向滚动截图画廊
- **技术架构** — 三层架构卡片展示
- **获取下载** — AppGallery 按钮与 GitHub 入口

## 🛠 技术栈

| 类别 | 方案 |
|------|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 6 |
| 样式 | CSS Modules + 自定义 Design Tokens |
| 国际化 | Context 方案（零依赖） |
| SEO | Puppeteer 预渲染 |
| 部署 | GitHub Actions → GitHub Pages |

## 🚀 本地开发

```bash
npm install
npm run dev      # 启动开发服务器，自动打开浏览器
npm run build    # 生产构建（tsc + vite + 预渲染）
npm run preview  # 预览生产构建
```

## 🌐 多语言

目前支持 **中文** 和 **English**。添加新语言只需在 `src/data/locales/` 下新建翻译文件并注册。

详见 [LocaleContext.tsx](src/i18n/LocaleContext.tsx)。

## 📂 目录结构

```
CalcX-web/
├── src/
│   ├── components/
│   │   ├── hero/         # Hero 首屏
│   │   ├── features/     # 功能特色卡片
│   │   ├── gallery/      # 截图横向滚动画廊
│   │   ├── architecture/ # 技术架构
│   │   ├── download/     # 下载引导
│   │   ├── layout/       # Header / Footer
│   │   └── ui/           # 通用 UI 组件
│   ├── data/
│   │   ├── content.types.ts   # 内容类型定义
│   │   ├── content.ts         # 向后兼容导出
│   │   └── locales/           # 各语言翻译文件
│   ├── i18n/
│   │   └── LocaleContext.tsx   # 多语言 Context + Provider
│   ├── hooks/
│   │   ├── useTheme.ts        # 深浅色模式
│   │   └── useScrollReveal.ts # 滚动显示动画
│   └── styles/                # 全局样式与 Design Tokens
├── public/                    # 静态资源（帮助/隐私/协议子页面）
├── scripts/
│   └── prerender.mjs          # Puppeteer 预渲染脚本
├── index.html
└── vite.config.ts
```

