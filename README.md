# AutoFlow Frontend

AutoFlow - 人人可用的可视化 Agent 构建平台

## 技术栈

- **React 18** - 现代化的前端框架
- **TypeScript** - 类型安全的 JavaScript 超集
- **Vite** - 快速的构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **ESLint** - 代码质量检查工具

## 项目特性

- 🌟 现代化的暗黑主题设计
- 📱 完全响应式布局
- ⚡ 基于 Vite 的快速开发体验
- 🎨 使用 Tailwind CSS 的原子化 CSS
- 🔧 TypeScript 支持，类型安全
- ♿ 无障碍设计 (ARIA)
- 🎭 流畅的动画和交互效果

## 开发环境

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

项目将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx      # 顶部导航栏
│   ├── Hero.tsx        # 英雄区域
│   ├── WhyNow.tsx      # 核心优势
│   ├── HowItWorks.tsx  # 工作流程
│   ├── UseCases.tsx    # 应用场景
│   ├── Outputs.tsx     # 产出价值
│   ├── CTA.tsx         # 行动号召
│   └── Footer.tsx      # 页脚
├── styles/             # 样式文件
│   └── globals.css     # 全局样式
├── App.tsx            # 主应用组件
└── main.tsx           # 应用入口点
```

## 组件设计原则

- **组件化** - 每个 UI 部分都是独立的 React 组件
- **可重用性** - 通用组件支持通过 props 自定义
- **响应式** - 所有组件都支持移动端和桌面端
- **可访问性** - 遵循 WCAG 标准，支持键盘导航和屏幕阅读器
- **类型安全** - 所有组件都有完整的 TypeScript 类型定义

## 样式系统

项目使用 Tailwind CSS 构建，包含以下自定义样式：

- **gradient-text** - 渐变文字效果
- **dot-grid-background** - 点阵背景
- **card-glow** - 卡片悬浮光晕效果

## 性能优化

- 使用 React.memo 优化组件重渲染
- 图片懒加载
- 代码分割（可根据需要添加）
- 生产构建时的资源压缩

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## License

MIT