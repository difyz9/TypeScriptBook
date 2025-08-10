# 第 1 章：Tailwind CSS 简介与安装

## 📋 本章内容

- Tailwind CSS 是什么
- 原子化 CSS 的概念
- Tailwind CSS 的优势
- 安装和配置
- 第一个 Tailwind 项目

## 🎯 学习目标

完成本章学习后，你将能够：
- 理解 Tailwind CSS 的核心理念
- 掌握 Tailwind CSS 的安装方法
- 配置基本的开发环境
- 创建第一个使用 Tailwind CSS 的页面

---

## 1.1 Tailwind CSS 是什么？

Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量的原子化 CSS 类，让你能够快速构建现代化的用户界面。

### 核心特点

```html
<!-- 传统 CSS 方式 -->
<style>
.btn {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
}
.btn:hover {
  background-color: #2563eb;
}
</style>
<button class="btn">点击我</button>

<!-- Tailwind CSS 方式 -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  点击我
</button>
```

## 1.2 原子化 CSS 的概念

### 什么是原子化 CSS？

原子化 CSS 是一种 CSS 架构方法，其中每个 CSS 类都有单一的用途，就像原子一样不可再分。

```html
<!-- 每个类都有单一职责 -->
<div class="w-64 h-32 bg-red-500 rounded-lg shadow-md">
  <!-- w-64: 宽度 -->
  <!-- h-32: 高度 -->
  <!-- bg-red-500: 红色背景 -->
  <!-- rounded-lg: 圆角 -->
  <!-- shadow-md: 阴影 -->
</div>
```

### 优势对比

| 传统 CSS | Tailwind CSS |
|----------|-------------|
| 自定义类名 | 预定义功能类 |
| 需要切换文件 | 直接在 HTML 中编写 |
| 容易产生冗余代码 | 高度可复用 |
| 命名困难 | 无需命名 |
| 样式分离 | 样式与结构紧密结合 |

## 1.3 Tailwind CSS 的优势

### 1. 开发效率高
```html
<!-- 快速构建卡片组件 -->
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" src="image.jpg" alt="">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        案例研究
      </div>
      <p class="mt-2 text-gray-500">
        使用 Tailwind CSS 快速构建美观的界面
      </p>
    </div>
  </div>
</div>
```

### 2. 高度可定制
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1fb6ff',
        'brand-purple': '#7e5bef',
      },
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      }
    }
  }
}
```

### 3. 响应式设计简单
```html
<!-- 不同屏幕尺寸的布局 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 移动端：1列，平板：2列，桌面：3列 -->
</div>
```

### 4. 性能优化
- **PurgeCSS 集成**：自动移除未使用的样式
- **JIT 模式**：按需生成 CSS
- **生产环境优化**：极小的 CSS 文件大小

## 1.4 安装 Tailwind CSS

### 方法一：通过 npm 安装（推荐）

```bash
# 创建新项目
mkdir my-tailwind-project
cd my-tailwind-project
npm init -y

# 安装 Tailwind CSS
npm install -D tailwindcss
npx tailwindcss init
```

### 方法二：使用 CDN（快速开始）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <h1 class="text-3xl font-bold underline text-blue-600">
        Hello Tailwind CSS!
    </h1>
</body>
</html>
```

### 方法三：使用 Vite（现代开发）

```bash
# 创建 Vite 项目
npm create vite@latest my-project
cd my-project
npm install

# 安装 Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 1.5 配置 Tailwind CSS

### 1. 配置 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {
      // 自定义配置
    },
  },
  plugins: [],
}
```

### 2. 创建 CSS 文件

```css
/* src/input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 自定义样式 */
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
}
```

### 3. 构建 CSS

```bash
# 构建 CSS 文件
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

### 4. 在 HTML 中引用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Tailwind Project</title>
    <link href="./dist/output.css" rel="stylesheet">
</head>
<body>
    <!-- 你的内容 -->
</body>
</html>
```

## 1.6 第一个 Tailwind 项目

让我们创建一个简单的个人卡片组件：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人卡片</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
    <!-- 个人卡片 -->
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <!-- 头像 -->
        <div class="flex justify-center mb-4">
            <img class="w-24 h-24 rounded-full border-4 border-blue-500" 
                 src="https://via.placeholder.com/150" 
                 alt="头像">
        </div>
        
        <!-- 姓名和职位 -->
        <div class="text-center mb-4">
            <h2 class="text-2xl font-bold text-gray-800 mb-1">张三</h2>
            <p class="text-gray-600">前端开发工程师</p>
        </div>
        
        <!-- 描述 -->
        <div class="text-center mb-6">
            <p class="text-gray-700 text-sm">
                热爱前端开发，专注于用户体验和现代化技术栈
            </p>
        </div>
        
        <!-- 技能标签 -->
        <div class="flex flex-wrap justify-center gap-2 mb-6">
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                React
            </span>
            <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Vue.js
            </span>
            <span class="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                TypeScript
            </span>
            <span class="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                Tailwind CSS
            </span>
        </div>
        
        <!-- 联系按钮 -->
        <div class="flex space-x-3">
            <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
                联系我
            </button>
            <button class="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium py-2 px-4 rounded transition duration-200">
                查看作品
            </button>
        </div>
    </div>
</body>
</html>
```

### 代码解析

1. **布局容器**：`bg-gray-100 min-h-screen flex items-center justify-center`
   - 灰色背景，最小高度为屏幕高度，居中对齐

2. **卡片样式**：`bg-white rounded-lg shadow-lg p-6 max-w-sm w-full`
   - 白色背景，圆角，阴影，内边距，最大宽度限制

3. **头像**：`w-24 h-24 rounded-full border-4 border-blue-500`
   - 固定尺寸，圆形，蓝色边框

4. **文本样式**：使用不同的字体大小、颜色和对齐方式

5. **按钮**：使用 hover 状态和过渡效果

## 1.7 开发工具配置

### VS Code 插件

1. **Tailwind CSS IntelliSense**
   - 自动补全 Tailwind 类名
   - 悬停显示 CSS 属性
   - 语法高亮

2. **Headwind**
   - 自动排序 Tailwind 类名
   - 保持代码整洁

### 配置 VS Code

```json
{
  "tailwindCSS.includeLanguages": {
    "html": "html",
    "javascript": "javascript",
    "typescript": "typescript"
  },
  "editor.quickSuggestions": {
    "strings": true
  },
  "tailwindCSS.experimental.classRegex": [
    "class(?:Name)?\\s*[:=]\\s*['\"]([^'\"]*)['\"]"
  ]
}
```

## 🔧 练习项目

### 练习 1：按钮组件库
创建不同样式的按钮：
- 主要按钮（蓝色）
- 次要按钮（灰色）
- 危险按钮（红色）
- 成功按钮（绿色）
- 不同尺寸（小、中、大）

### 练习 2：导航栏
创建一个响应式导航栏：
- Logo 区域
- 导航链接
- 移动端汉堡菜单
- 用户头像下拉菜单

### 练习 3：卡片网格
创建一个产品卡片网格：
- 响应式布局（1/2/3 列）
- 产品图片
- 标题和描述
- 价格和购买按钮

## 📚 扩展阅读

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs)
- [Tailwind UI 组件库](https://tailwindui.com/)
- [Headless UI](https://headlessui.dev/)
- [Tailwind CSS 最佳实践](https://tailwindcss.com/docs/reusing-styles)

## 📝 本章小结

- Tailwind CSS 是一个原子化的 CSS 框架
- 通过功能类快速构建界面，提高开发效率
- 支持高度自定义和响应式设计
- 提供多种安装方式，推荐使用 npm 方式
- 配置简单，开箱即用
- 拥有丰富的开发工具支持

---

**下一章：[第 2 章：核心概念与设计哲学](../02-core-concepts/README.md)**
