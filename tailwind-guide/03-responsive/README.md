# 第 3 章：响应式设计基础

## 📋 本章内容

- 移动优先设计原则
- 断点系统详解
- 响应式布局模式
- 容器和间距的响应式处理
- 响应式文字和图片
- 实用的响应式组件

## 🎯 学习目标

完成本章学习后，你将能够：
- 掌握移动优先的设计思维
- 熟练使用 Tailwind 的断点系统
- 创建各种响应式布局
- 处理响应式文字、图片和间距

---

## 3.1 移动优先设计原则

### 3.1.1 为什么移动优先？

```html
<!-- 传统桌面优先方式（不推荐） -->
<div class="w-1/3 md:w-full">
  <!-- 默认桌面样式，然后向下适配 -->
</div>

<!-- 移动优先方式（推荐） -->
<div class="w-full md:w-1/3">
  <!-- 默认移动样式，然后向上增强 -->
</div>
```

### 3.1.2 移动优先的优势

1. **性能更好**：移动端加载更少的 CSS
2. **渐进增强**：从简单到复杂逐步添加功能
3. **更好的用户体验**：确保移动端优先得到关注

```html
<!-- 移动优先的导航示例 -->
<nav class="
  p-4                    <!-- 移动端：基础内边距 -->
  md:px-6                <!-- 平板：增加水平内边距 -->
  lg:px-8                <!-- 桌面：更大的水平内边距 -->
">
  <div class="
    flex flex-col          <!-- 移动端：垂直布局 -->
    md:flex-row            <!-- 平板及以上：水平布局 -->
    md:items-center        <!-- 平板及以上：垂直居中 -->
    md:justify-between     <!-- 平板及以上：两端对齐 -->
  ">
    <div class="mb-4 md:mb-0">Logo</div>
    <div class="
      flex flex-col        <!-- 移动端：垂直菜单 -->
      md:flex-row          <!-- 平板及以上：水平菜单 -->
      space-y-2            <!-- 移动端：垂直间距 -->
      md:space-y-0         <!-- 平板及以上：移除垂直间距 -->
      md:space-x-6         <!-- 平板及以上：水平间距 -->
    ">
      <a href="#" class="text-gray-700 hover:text-blue-600">首页</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">产品</a>
      <a href="#" class="text-gray-700 hover:text-blue-600">关于</a>
    </div>
  </div>
</nav>
```

## 3.2 断点系统详解

### 3.2.1 Tailwind 的断点

```css
/* Tailwind 的默认断点 */
sm   640px   @media (min-width: 640px)  { ... }
md   768px   @media (min-width: 768px)  { ... }
lg   1024px  @media (min-width: 1024px) { ... }
xl   1280px  @media (min-width: 1280px) { ... }
2xl  1536px  @media (min-width: 1536px) { ... }
```

### 3.2.2 断点的使用

```html
<!-- 响应式宽度 -->
<div class="
  w-full           <!-- 默认：全宽 (< 640px) -->
  sm:w-11/12       <!-- 小屏：11/12 宽度 (≥ 640px) -->
  md:w-4/5         <!-- 中屏：4/5 宽度 (≥ 768px) -->
  lg:w-3/4         <!-- 大屏：3/4 宽度 (≥ 1024px) -->
  xl:w-2/3         <!-- 超大屏：2/3 宽度 (≥ 1280px) -->
  2xl:w-1/2        <!-- 超超大屏：1/2 宽度 (≥ 1536px) -->
  mx-auto          <!-- 水平居中 -->
">
  响应式容器
</div>

<!-- 响应式显示/隐藏 -->
<div class="
  block            <!-- 默认：显示 -->
  md:hidden        <!-- 中屏及以上：隐藏 -->
">
  移动端专用内容
</div>

<div class="
  hidden           <!-- 默认：隐藏 -->
  md:block         <!-- 中屏及以上：显示 -->
">
  桌面端专用内容
</div>
```

### 3.2.3 自定义断点

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',      // 自定义小屏
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',    // 自定义超大屏
    }
  }
}
```

## 3.3 响应式布局模式

### 3.3.1 堆叠到水平布局

```html
<!-- 移动端垂直堆叠，桌面端水平排列 -->
<div class="
  flex flex-col      <!-- 移动端：垂直 flexbox -->
  md:flex-row        <!-- 桌面端：水平 flexbox -->
  gap-4              <!-- 统一间距 -->
">
  <div class="
    flex-1           <!-- 桌面端：等宽分配 -->
    bg-blue-100 
    p-4 
    rounded
  ">
    内容区域 1
  </div>
  <div class="
    flex-1
    bg-green-100 
    p-4 
    rounded
  ">
    内容区域 2
  </div>
  <div class="
    flex-1
    bg-purple-100 
    p-4 
    rounded
  ">
    内容区域 3
  </div>
</div>
```

### 3.3.2 响应式网格

```html
<!-- 1列 -> 2列 -> 3列 -> 4列 网格 -->
<div class="
  grid
  grid-cols-1        <!-- 移动端：1列 -->
  sm:grid-cols-2     <!-- 小屏：2列 -->
  lg:grid-cols-3     <!-- 大屏：3列 -->
  xl:grid-cols-4     <!-- 超大屏：4列 -->
  gap-4              <!-- 统一间距 -->
">
  <!-- 网格项目 -->
  <div class="bg-gray-100 p-4 rounded">项目 1</div>
  <div class="bg-gray-100 p-4 rounded">项目 2</div>
  <div class="bg-gray-100 p-4 rounded">项目 3</div>
  <div class="bg-gray-100 p-4 rounded">项目 4</div>
  <div class="bg-gray-100 p-4 rounded">项目 5</div>
  <div class="bg-gray-100 p-4 rounded">项目 6</div>
</div>
```

### 3.3.3 侧边栏布局

```html
<!-- 移动端堆叠，桌面端侧边栏 -->
<div class="
  flex flex-col      <!-- 移动端：垂直布局 -->
  lg:flex-row        <!-- 桌面端：水平布局 -->
  min-h-screen
">
  <!-- 侧边栏 -->
  <aside class="
    w-full           <!-- 移动端：全宽 -->
    lg:w-64          <!-- 桌面端：固定宽度 -->
    bg-gray-800 
    text-white 
    p-4
  ">
    <h2 class="text-xl font-bold mb-4">侧边栏</h2>
    <nav class="space-y-2">
      <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">菜单 1</a>
      <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">菜单 2</a>
      <a href="#" class="block py-2 px-3 rounded hover:bg-gray-700">菜单 3</a>
    </nav>
  </aside>
  
  <!-- 主内容 -->
  <main class="
    flex-1           <!-- 占据剩余空间 -->
    p-4
    lg:p-8           <!-- 桌面端：更大的内边距 -->
  ">
    <h1 class="text-3xl font-bold mb-6">主内容区域</h1>
    <p class="text-gray-600">这里是主要内容...</p>
  </main>
</div>
```

### 3.3.4 卡片网格

```html
<!-- 响应式卡片网格 -->
<div class="
  max-w-7xl mx-auto px-4 py-8
">
  <div class="
    grid
    grid-cols-1        <!-- 移动端：1列 -->
    md:grid-cols-2     <!-- 平板：2列 -->
    lg:grid-cols-3     <!-- 桌面：3列 -->
    gap-6              <!-- 卡片间距 -->
  ">
    <!-- 卡片项目 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        class="w-full h-48 object-cover" 
        src="https://via.placeholder.com/400x200" 
        alt="图片"
      >
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">卡片标题</h3>
        <p class="text-gray-600 mb-4">
          这里是卡片的描述内容，可以包含产品介绍或文章摘要。
        </p>
        <button class="
          w-full           <!-- 移动端：全宽按钮 -->
          md:w-auto        <!-- 平板及以上：自适应宽度 -->
          bg-blue-500 
          hover:bg-blue-600 
          text-white 
          px-4 py-2 
          rounded 
          transition duration-200
        ">
          了解更多
        </button>
      </div>
    </div>
    
    <!-- 重复更多卡片... -->
  </div>
</div>
```

## 3.4 容器和间距的响应式处理

### 3.4.1 响应式容器

```html
<!-- 响应式最大宽度容器 -->
<div class="
  max-w-sm          <!-- 小容器 -->
  md:max-w-2xl      <!-- 中等容器 -->
  lg:max-w-4xl      <!-- 大容器 -->
  xl:max-w-6xl      <!-- 超大容器 -->
  mx-auto           <!-- 水平居中 -->
  px-4              <!-- 基础水平内边距 -->
  sm:px-6           <!-- 小屏：增加内边距 -->
  lg:px-8           <!-- 大屏：更大内边距 -->
">
  内容区域
</div>

<!-- 使用 Tailwind 的 container 类 -->
<div class="container mx-auto px-4">
  <!-- 自动响应式容器 -->
</div>
```

### 3.4.2 响应式间距

```html
<!-- 响应式内边距 -->
<div class="
  p-4               <!-- 移动端：16px -->
  md:p-6            <!-- 平板：24px -->
  lg:p-8            <!-- 桌面：32px -->
  xl:p-12           <!-- 大桌面：48px -->
">
  内容
</div>

<!-- 响应式外边距 -->
<div class="
  mt-4              <!-- 移动端：上边距 16px -->
  md:mt-8           <!-- 平板：上边距 32px -->
  lg:mt-12          <!-- 桌面：上边距 48px -->
">
  内容
</div>

<!-- 响应式元素间距 -->
<div class="
  space-y-4         <!-- 移动端：垂直间距 16px -->
  md:space-y-6      <!-- 平板：垂直间距 24px -->
  lg:space-y-8      <!-- 桌面：垂直间距 32px -->
">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

## 3.5 响应式文字和图片

### 3.5.1 响应式文字

```html
<!-- 响应式字体大小 -->
<h1 class="
  text-2xl          <!-- 移动端：24px -->
  md:text-3xl       <!-- 平板：30px -->
  lg:text-4xl       <!-- 桌面：36px -->
  xl:text-5xl       <!-- 大桌面：48px -->
  font-bold
  text-center
  mb-4
">
  响应式标题
</h1>

<!-- 响应式段落 -->
<p class="
  text-sm           <!-- 移动端：14px -->
  md:text-base      <!-- 平板：16px -->
  lg:text-lg        <!-- 桌面：18px -->
  leading-relaxed   <!-- 行高 -->
  text-gray-600
">
  这是一段响应式的文本内容，在不同设备上会有不同的字体大小。
</p>

<!-- 响应式文本对齐 -->
<div class="
  text-center       <!-- 移动端：居中 -->
  md:text-left      <!-- 平板及以上：左对齐 -->
">
  文本对齐方式
</div>
```

### 3.5.2 响应式图片

```html
<!-- 响应式图片容器 -->
<div class="
  w-full            <!-- 移动端：全宽 -->
  md:w-1/2          <!-- 平板：一半宽度 -->
  lg:w-1/3          <!-- 桌面：三分之一宽度 -->
  mx-auto           <!-- 居中 -->
">
  <img 
    class="
      w-full 
      h-auto        <!-- 保持宽高比 -->
      rounded-lg
    " 
    src="image.jpg" 
    alt="响应式图片"
  >
</div>

<!-- 不同屏幕显示不同图片 -->
<div>
  <!-- 移动端图片 -->
  <img 
    class="block md:hidden w-full h-auto" 
    src="mobile-image.jpg" 
    alt="移动端图片"
  >
  <!-- 桌面端图片 -->
  <img 
    class="hidden md:block w-full h-auto" 
    src="desktop-image.jpg" 
    alt="桌面端图片"
  >
</div>

<!-- 响应式图片高度 -->
<img 
  class="
    w-full
    h-48              <!-- 移动端：192px 高度 -->
    md:h-64           <!-- 平板：256px 高度 -->
    lg:h-80           <!-- 桌面：320px 高度 -->
    object-cover      <!-- 保持宽高比并裁剪 -->
    rounded-lg
  " 
  src="hero-image.jpg" 
  alt="响应式高度图片"
>
```

## 3.6 实用的响应式组件

### 3.6.1 响应式英雄区

```html
<section class="
  bg-gradient-to-r from-blue-600 to-purple-600
  text-white
  py-12              <!-- 移动端：上下内边距 -->
  md:py-20           <!-- 平板：更大的上下内边距 -->
  lg:py-32           <!-- 桌面：最大的上下内边距 -->
">
  <div class="
    max-w-7xl mx-auto px-4 
    text-center
  ">
    <h1 class="
      text-3xl         <!-- 移动端 -->
      md:text-4xl      <!-- 平板 -->
      lg:text-6xl      <!-- 桌面 -->
      font-bold
      mb-4
      md:mb-6
    ">
      欢迎来到我们的网站
    </h1>
    <p class="
      text-lg          <!-- 移动端 -->
      md:text-xl       <!-- 平板 -->
      lg:text-2xl      <!-- 桌面 -->
      mb-8
      max-w-3xl mx-auto
    ">
      这里是副标题描述，介绍产品或服务的核心价值。
    </p>
    <div class="
      flex flex-col    <!-- 移动端：垂直排列 -->
      sm:flex-row      <!-- 小屏及以上：水平排列 -->
      gap-4
      justify-center
    ">
      <button class="
        bg-white 
        text-blue-600 
        px-6 py-3
        md:px-8 md:py-4  <!-- 平板：更大的按钮 -->
        rounded-lg 
        font-semibold
        hover:bg-gray-100
        transition duration-200
      ">
        开始使用
      </button>
      <button class="
        border-2 border-white 
        text-white 
        px-6 py-3
        md:px-8 md:py-4
        rounded-lg 
        font-semibold
        hover:bg-white hover:text-blue-600
        transition duration-200
      ">
        了解更多
      </button>
    </div>
  </div>
</section>
```

### 3.6.2 响应式特性展示

```html
<section class="py-12 md:py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="
        text-2xl md:text-3xl lg:text-4xl 
        font-bold 
        text-gray-900 
        mb-4
      ">
        产品特性
      </h2>
      <p class="
        text-lg 
        text-gray-600 
        max-w-2xl mx-auto
      ">
        了解我们产品的核心优势和特性
      </p>
    </div>
    
    <div class="
      grid
      grid-cols-1        <!-- 移动端：1列 -->
      md:grid-cols-2     <!-- 平板：2列 -->
      lg:grid-cols-3     <!-- 桌面：3列 -->
      gap-8
    ">
      <!-- 特性卡片 -->
      <div class="text-center">
        <div class="
          w-16 h-16        <!-- 移动端图标大小 -->
          md:w-20 md:h-20  <!-- 桌面端更大的图标 -->
          bg-blue-100 
          rounded-full 
          flex items-center justify-center 
          mx-auto mb-4
        ">
          <svg class="w-8 h-8 md:w-10 md:h-10 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <!-- SVG 图标 -->
          </svg>
        </div>
        <h3 class="
          text-lg md:text-xl 
          font-semibold 
          text-gray-900 
          mb-2
        ">
          特性标题
        </h3>
        <p class="text-gray-600">
          特性描述内容，说明这个功能的具体作用和优势。
        </p>
      </div>
      
      <!-- 重复更多特性卡片... -->
    </div>
  </div>
</section>
```

### 3.6.3 响应式表单

```html
<form class="
  max-w-md        <!-- 移动端：较小的最大宽度 -->
  md:max-w-lg     <!-- 平板：中等最大宽度 -->
  lg:max-w-xl     <!-- 桌面：较大的最大宽度 -->
  mx-auto
  p-6
  bg-white
  rounded-lg
  shadow-lg
">
  <h2 class="
    text-xl md:text-2xl 
    font-bold 
    text-center 
    mb-6
  ">
    联系我们
  </h2>
  
  <div class="
    grid
    grid-cols-1      <!-- 移动端：单列 -->
    md:grid-cols-2   <!-- 平板：双列 -->
    gap-4
    mb-4
  ">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        姓名
      </label>
      <input 
        type="text"
        class="
          w-full
          px-3 py-2
          md:px-4 md:py-3  <!-- 平板：更大的输入框 -->
          border border-gray-300
          rounded-md
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
        "
        placeholder="请输入姓名"
      >
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">
        邮箱
      </label>
      <input 
        type="email"
        class="
          w-full
          px-3 py-2
          md:px-4 md:py-3
          border border-gray-300
          rounded-md
          focus:ring-2 focus:ring-blue-500 focus:border-transparent
        "
        placeholder="请输入邮箱"
      >
    </div>
  </div>
  
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      消息
    </label>
    <textarea 
      rows="4"
      class="
        w-full
        px-3 py-2
        md:px-4 md:py-3
        border border-gray-300
        rounded-md
        focus:ring-2 focus:ring-blue-500 focus:border-transparent
      "
      placeholder="请输入您的消息"
    ></textarea>
  </div>
  
  <button 
    type="submit"
    class="
      w-full
      bg-blue-500 
      hover:bg-blue-600 
      text-white 
      py-2 px-4
      md:py-3 md:px-6
      rounded-md 
      font-medium
      transition duration-200
    "
  >
    发送消息
  </button>
</form>
```

## 🔧 练习项目

### 练习 1：响应式着陆页
创建一个完整的响应式着陆页：
- 响应式导航栏
- 英雄区域
- 特性展示
- 客户证言
- 联系表单
- 页脚

### 练习 2：响应式博客布局
设计一个响应式博客：
- 文章列表网格
- 侧边栏（桌面端）
- 文章详情页
- 标签和分类

### 练习 3：响应式电商产品页
创建电商产品展示页面：
- 产品图片轮播
- 产品信息区域
- 相关产品推荐
- 购物车功能

## 📚 扩展阅读

- [Responsive Design - Tailwind CSS](https://tailwindcss.com/docs/responsive-design)
- [Container - Tailwind CSS](https://tailwindcss.com/docs/container)
- [Mobile First CSS](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first)

## 📝 本章小结

- 移动优先是现代 Web 开发的标准方法
- Tailwind 的断点系统提供了灵活的响应式控制
- 合理使用容器和间距确保在所有设备上的良好体验
- 响应式设计不仅仅是布局，还包括文字、图片和交互
- 通过组合不同的响应式类可以创建复杂的布局模式

---

**下一章：[第 4 章：Flexbox 布局](../04-flexbox/README.md)**
