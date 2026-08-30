# CalculatorX Website

CalculatorX 官方产品网站：<https://calcx.startyi.com>

它面向普通用户介绍 CalculatorX 这款 HarmonyOS NEXT 原生数学工作区，覆盖精确计算、微积分、方程、矩阵、函数图像、汇率与历史记录，并提供 AppGallery、GitHub Releases、帮助文档和法律页面入口。

## 技术方案

- React 18 + TypeScript + Vite 6
- CSS 设计变量与响应式布局
- 中文 `/` 与英文 `/en/` 双静态入口
- Puppeteer 构建后预渲染
- GitHub Actions 同时部署 GitHub Pages 与阿里云 ECS

## 本地开发

```bash
npm install
npm run dev
npm run build
npm run preview
```

`npm run build` 会依次执行 TypeScript 检查、Vite 多页面构建和中英文主页预渲染。

## 目录

```text
src/
├── components/
│   ├── layout/       # 顶部导航与页脚
│   ├── sections/     # 主页产品区块
│   └── ui/           # 通用展示组件
├── data/locales/     # 中英文结构化内容
├── hooks/            # 主题状态
├── i18n/             # 基于 URL 的语言入口
└── styles/           # 设计变量、全局布局和动效
public/
├── images/product/   # 产品截图
├── privacy/          # 隐私政策
└── agreement/        # 用户协议
en/index.html         # 英文 SEO 入口
scripts/prerender.mjs # 构建后预渲染
```

## 产品截图

主页允许截图暂时缺失：对应位置会显示带公式的视觉占位，不影响构建。正式发布前应补齐 `public/images/product/` 中的明暗主题截图，并补充 `public/images/og-cover.webp` 社交分享图。

## 内容边界

- CalculatorX 当前实现与版本以主应用仓库为准。
- `/docs` 由独立的 CalcX-docs 项目维护，本仓库不重复维护帮助正文。
- 统计分析、单位转换和进制转换尚未作为已发布能力写入主页。
