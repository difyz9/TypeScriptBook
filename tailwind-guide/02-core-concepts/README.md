# 第 2 章：核心概念与设计哲学

## 📋 本章内容

- 功能类优先的设计理念
- 约束设计系统
- 移动优先的响应式设计
- 状态变体系统
- 组件抽象层级
- 与传统 CSS 的对比

## 🎯 学习目标

完成本章学习后，你将能够：
- 深入理解 Tailwind CSS 的设计哲学
- 掌握功能类的命名规则和使用方法
- 理解约束系统如何提升设计一致性
- 学会移动优先的开发思维

---

## 2.1 功能类优先的设计理念

### 2.1.1 什么是功能类？

功能类是只做一件事的 CSS 类，每个类都有明确的单一职责。

```html
<!-- 功能类示例 -->
<div class="
  w-64          <!-- 宽度：256px -->
  h-32          <!-- 高度：128px -->
  bg-blue-500   <!-- 背景色：蓝色 -->
  text-white    <!-- 文字颜色：白色 -->
  p-4           <!-- 内边距：16px -->
  rounded-lg    <!-- 圆角：8px -->
  shadow-md     <!-- 阴影：中等 -->
">
  功能类组合
</div>
```

### 2.1.2 功能类的优势

```html
<!-- 传统方式：需要定义 CSS 类 -->
<style>
.card {
  width: 16rem;
  height: 8rem;
  background-color: #3b82f6;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.card-variant {
  background-color: #ef4444;
}
</style>

<div class="card">标准卡片</div>
<div class="card card-variant">变体卡片</div>

<!-- Tailwind 方式：直接组合功能类 -->
<div class="w-64 h-32 bg-blue-500 text-white p-4 rounded-lg shadow-md">
  标准卡片
</div>
<div class="w-64 h-32 bg-red-500 text-white p-4 rounded-lg shadow-md">
  变体卡片
</div>
```

### 2.1.3 功能类的命名规则

Tailwind CSS 的类名遵循一致的命名模式：

```html
<!-- 格式：[property]-[value] -->
<div class="
  text-lg       <!-- font-size: 1.125rem -->
  text-blue-600 <!-- color: #2563eb -->
  bg-gray-100   <!-- background-color: #f3f4f6 -->
  p-4           <!-- padding: 1rem -->
  m-2           <!-- margin: 0.5rem -->
  w-1/2         <!-- width: 50% -->
  h-screen      <!-- height: 100vh -->
">
</div>

<!-- 方向性属性 -->
<div class="
  pt-4          <!-- padding-top -->
  pr-2          <!-- padding-right -->
  pb-4          <!-- padding-bottom -->
  pl-2          <!-- padding-left -->
  mt-8          <!-- margin-top -->
  mx-auto       <!-- margin-left + margin-right: auto -->
  px-6          <!-- padding-left + padding-right -->
">
</div>
```

## 2.2 约束设计系统

### 2.2.1 设计 Token

Tailwind CSS 提供了一套精心设计的 token 系统：

```html
<!-- 间距系统 (0.25rem = 4px 为基准) -->
<div class="p-1">   <!-- 4px -->
<div class="p-2">   <!-- 8px -->
<div class="p-4">   <!-- 16px -->
<div class="p-8">   <!-- 32px -->
<div class="p-16">  <!-- 64px -->

<!-- 颜色系统 -->
<div class="bg-gray-50">    <!-- 最浅 -->
<div class="bg-gray-100">
<div class="bg-gray-200">
<div class="bg-gray-300">
<div class="bg-gray-400">
<div class="bg-gray-500">   <!-- 中等 -->
<div class="bg-gray-600">
<div class="bg-gray-700">
<div class="bg-gray-800">
<div class="bg-gray-900">   <!-- 最深 -->

<!-- 字体大小系统 -->
<p class="text-xs">    <!-- 12px -->
<p class="text-sm">    <!-- 14px -->
<p class="text-base">  <!-- 16px -->
<p class="text-lg">    <!-- 18px -->
<p class="text-xl">    <!-- 20px -->
<p class="text-2xl">   <!-- 24px -->
<p class="text-3xl">   <!-- 30px -->
```

### 2.2.2 约束的好处

```html
<!-- 没有约束的自由度过高 -->
<style>
.button-1 { padding: 12px 20px; }
.button-2 { padding: 10px 18px; }
.button-3 { padding: 14px 22px; }
/* 三个按钮的间距都不一致 */
</style>

<!-- Tailwind 的约束确保一致性 -->
<button class="px-4 py-2">按钮 1</button>
<button class="px-4 py-2">按钮 2</button>
<button class="px-4 py-2">按钮 3</button>
<!-- 所有按钮都使用相同的间距 token -->
```

### 2.2.3 设计系统的一致性

```html
<!-- 颜色一致性 -->
<div class="bg-blue-500 text-white">
  主要操作
</div>
<div class="bg-blue-100 text-blue-800">
  次要信息
</div>
<div class="border border-blue-500 text-blue-500">
  边框按钮
</div>

<!-- 间距一致性 -->
<div class="space-y-4">        <!-- 垂直间距 -->
  <div class="p-4">内容 1</div>
  <div class="p-4">内容 2</div>
  <div class="p-4">内容 3</div>
</div>

<!-- 圆角一致性 -->
<div class="rounded-md">      <!-- 6px -->
<div class="rounded-lg">      <!-- 8px -->
<div class="rounded-xl">      <!-- 12px -->
```

## 2.3 移动优先的响应式设计

### 2.3.1 断点系统

```html
<!-- Tailwind 的断点 -->
<!--
sm: 640px   (小屏幕，大手机)
md: 768px   (平板)
lg: 1024px  (小桌面)
xl: 1280px  (大桌面)
2xl: 1536px (超大桌面)
-->

<!-- 移动优先的布局 -->
<div class="
  w-full        <!-- 移动端：全宽 -->
  md:w-1/2      <!-- 平板：一半宽度 -->
  lg:w-1/3      <!-- 桌面：三分之一宽度 -->
  xl:w-1/4      <!-- 大桌面：四分之一宽度 -->
">
  响应式容器
</div>
```

### 2.3.2 响应式网格

```html
<!-- 响应式网格布局 -->
<div class="grid 
  grid-cols-1       <!-- 移动端：1列 -->
  sm:grid-cols-2    <!-- 小屏：2列 -->
  md:grid-cols-3    <!-- 平板：3列 -->
  lg:grid-cols-4    <!-- 桌面：4列 -->
  gap-4
">
  <div class="bg-gray-200 p-4">项目 1</div>
  <div class="bg-gray-200 p-4">项目 2</div>
  <div class="bg-gray-200 p-4">项目 3</div>
  <div class="bg-gray-200 p-4">项目 4</div>
</div>
```

### 2.3.3 响应式文字和间距

```html
<!-- 响应式字体大小 -->
<h1 class="
  text-2xl          <!-- 移动端：24px -->
  md:text-3xl       <!-- 平板：30px -->
  lg:text-4xl       <!-- 桌面：36px -->
  xl:text-5xl       <!-- 大桌面：48px -->
">
  响应式标题
</h1>

<!-- 响应式间距 -->
<div class="
  p-4               <!-- 移动端：16px -->
  md:p-6            <!-- 平板：24px -->
  lg:p-8            <!-- 桌面：32px -->
">
  响应式容器
</div>

<!-- 响应式显示/隐藏 -->
<div class="
  block             <!-- 移动端：显示 -->
  md:hidden         <!-- 平板及以上：隐藏 -->
">
  移动端专用内容
</div>

<div class="
  hidden            <!-- 移动端：隐藏 -->
  md:block          <!-- 平板及以上：显示 -->
">
  桌面端专用内容
</div>
```

## 2.4 状态变体系统

### 2.4.1 伪类状态

```html
<!-- 鼠标悬停状态 -->
<button class="
  bg-blue-500 
  hover:bg-blue-700     <!-- 悬停时变深蓝 -->
  text-white
  hover:text-gray-100   <!-- 悬停时文字变浅 -->
  px-4 py-2 rounded
  transition duration-200
">
  悬停效果
</button>

<!-- 焦点状态 -->
<input class="
  border-2 border-gray-300
  focus:border-blue-500     <!-- 焦点时蓝色边框 -->
  focus:ring-2              <!-- 焦点时外圈 -->
  focus:ring-blue-200       <!-- 焦点圈颜色 -->
  focus:outline-none        <!-- 移除默认外框 -->
  px-3 py-2 rounded
" type="text" placeholder="输入内容">

<!-- 激活状态 -->
<button class="
  bg-blue-500
  active:bg-blue-800        <!-- 点击时更深的颜色 -->
  transform
  active:scale-95           <!-- 点击时缩小效果 -->
  px-4 py-2 rounded text-white
  transition duration-150
">
  点击效果
</button>
```

### 2.4.2 表单状态

```html
<!-- 禁用状态 -->
<button class="
  bg-blue-500 text-white px-4 py-2 rounded
  disabled:bg-gray-300      <!-- 禁用时灰色背景 -->
  disabled:text-gray-500    <!-- 禁用时灰色文字 -->
  disabled:cursor-not-allowed
" disabled>
  禁用按钮
</button>

<!-- 选中状态 -->
<input type="checkbox" class="
  rounded border-gray-300
  text-blue-600
  checked:bg-blue-600       <!-- 选中时背景色 -->
  checked:border-transparent
  focus:ring-blue-500
">

<!-- 验证状态 -->
<input class="
  border-2
  invalid:border-red-500    <!-- 无效时红色边框 -->
  valid:border-green-500    <!-- 有效时绿色边框 -->
  px-3 py-2 rounded
" type="email" required>
```

### 2.4.3 组合状态

```html
<!-- 复杂的状态组合 -->
<div class="
  group                     <!-- 定义组 -->
  relative
  overflow-hidden
  rounded-lg
  bg-white
  shadow-md
  hover:shadow-lg           <!-- 悬停时阴影变大 -->
  transition-all duration-300
">
  <img src="image.jpg" class="
    w-full h-48 object-cover
    group-hover:scale-110   <!-- 组悬停时图片放大 -->
    transition-transform duration-300
  ">
  <div class="p-4">
    <h3 class="
      text-lg font-semibold
      group-hover:text-blue-600  <!-- 组悬停时标题变色 -->
      transition-colors duration-200
    ">
      卡片标题
    </h3>
  </div>
</div>
```

## 2.5 组件抽象层级

### 2.5.1 基础功能类

```html
<!-- 最基础的功能类 -->
<div class="w-4 h-4 bg-red-500"></div>
```

### 2.5.2 组件类（推荐的抽象方式）

```css
/* 使用 @apply 创建组件类 */
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-medium transition duration-200;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md overflow-hidden;
  }
  
  .card-header {
    @apply px-6 py-4 border-b border-gray-200;
  }
  
  .card-body {
    @apply px-6 py-4;
  }
}
```

```html
<!-- 使用组件类 -->
<div class="card">
  <div class="card-header">
    <h2 class="text-xl font-semibold">卡片标题</h2>
  </div>
  <div class="card-body">
    <p class="text-gray-600">卡片内容</p>
    <button class="btn btn-primary mt-4">操作按钮</button>
  </div>
</div>
```

### 2.5.3 JavaScript 组件

```javascript
// React 组件示例
const Button = ({ variant = 'primary', size = 'md', children, ...props }) => {
  const baseClasses = 'font-medium rounded transition duration-200';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// 使用组件
<Button variant="primary" size="lg">主要按钮</Button>
<Button variant="secondary">次要按钮</Button>
<Button variant="danger" size="sm">危险按钮</Button>
```

## 2.6 与传统 CSS 的对比

### 2.6.1 开发流程对比

```html
<!-- 传统 CSS 流程 -->
<!-- 1. 写 HTML 结构 -->
<div class="hero-section">
  <h1 class="hero-title">标题</h1>
  <p class="hero-description">描述</p>
  <button class="hero-button">按钮</button>
</div>

<!-- 2. 切换到 CSS 文件写样式 -->
<style>
.hero-section {
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(to right, #3b82f6, #1d4ed8);
}

.hero-title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.25rem;
  color: #e0e7ff;
  margin-bottom: 2rem;
}

.hero-button {
  background-color: white;
  color: #3b82f6;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
</style>

<!-- Tailwind CSS 流程 -->
<!-- 直接在 HTML 中完成样式 -->
<div class="py-16 px-8 text-center bg-gradient-to-r from-blue-500 to-blue-700">
  <h1 class="text-5xl font-bold text-white mb-4">标题</h1>
  <p class="text-xl text-blue-100 mb-8">描述</p>
  <button class="bg-white text-blue-500 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-200">
    按钮
  </button>
</div>
```

### 2.6.2 维护性对比

```html
<!-- 传统 CSS：修改样式需要找到对应的 CSS 类 -->
<div class="product-card">
  <!-- 要修改样式需要去 CSS 文件中找 .product-card -->
</div>

<!-- Tailwind CSS：直接修改类名 -->
<div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <!-- 样式一目了然，修改直接在 HTML 中完成 -->
</div>
```

### 2.6.3 复用性对比

```html
<!-- 传统 CSS：容易出现重复代码 -->
<style>
.btn-primary { /* 样式 */ }
.btn-primary-large { /* 样式 + 大尺寸 */ }
.btn-primary-small { /* 样式 + 小尺寸 */ }
.btn-secondary { /* 类似样式 */ }
.btn-secondary-large { /* 类似样式 + 大尺寸 */ }
</style>

<!-- Tailwind CSS：组合复用 -->
<button class="px-4 py-2 bg-blue-500 text-white rounded">标准</button>
<button class="px-6 py-3 bg-blue-500 text-white rounded text-lg">大尺寸</button>
<button class="px-2 py-1 bg-blue-500 text-white rounded text-sm">小尺寸</button>
<button class="px-4 py-2 bg-gray-500 text-white rounded">次要</button>
```

## 🔧 练习项目

### 练习 1：重构传统 CSS
选择一个现有的 CSS 组件，使用 Tailwind CSS 重新实现：
- 导航栏
- 卡片组件
- 表单组件
- 模态框

### 练习 2：移动优先设计
创建一个响应式页面：
- 手机端单列布局
- 平板端双列布局
- 桌面端三列布局
- 确保所有断点都有良好的体验

### 练习 3：状态系统实践
创建一个交互丰富的组件：
- 按钮的各种状态
- 表单验证状态
- 卡片悬停效果
- 组合状态应用

## 📚 扩展阅读

- [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Reusing Styles](https://tailwindcss.com/docs/reusing-styles)

## 📝 本章小结

- 功能类优先的设计理念提供了高度的灵活性和一致性
- 约束设计系统确保了视觉一致性和设计质量
- 移动优先的响应式设计是现代 Web 开发的标准
- 状态变体系统让交互设计变得简单直观
- 合理的组件抽象层级平衡了复用性和灵活性
- Tailwind CSS 相比传统 CSS 在开发效率和维护性上有显著优势

---

**下一章：[第 3 章：响应式设计基础](../03-responsive/README.md)**
