# 第 5 章：Grid 网格布局

## 📋 本章内容

- CSS Grid 基础概念和术语
- Grid 容器和 Grid 项目
- 网格线、轨道和区域
- 显式和隐式网格
- 响应式网格布局
- 复杂布局模式和实战案例

## 🎯 学习目标

完成本章学习后，你将能够：
- 理解 CSS Grid 的工作原理和核心概念
- 熟练使用 Tailwind 的 Grid 工具类
- 创建复杂的二维布局结构
- 掌握网格的对齐和分布
- 构建响应式的网格布局系统

---

## 5.1 Grid 基础概念

### 5.1.1 什么是 CSS Grid？

CSS Grid 是一个二维布局系统，能够同时处理行和列。它特别适合：
- 页面整体布局
- 复杂的二维排列
- 不规则的网格结构
- 响应式设计

### 5.1.2 Grid vs Flexbox

```html
<!-- Flexbox：一维布局（主要用于组件内部） -->
<div class="flex justify-between items-center">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>

<!-- Grid：二维布局（主要用于页面布局） -->
<div class="grid grid-cols-3 gap-4">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
  <div>项目 4</div>
  <div>项目 5</div>
  <div>项目 6</div>
</div>
```

### 5.1.3 Grid 术语

```html
<!-- Grid 容器 -->
<div class="grid grid-cols-3 grid-rows-2 gap-4">
  <!-- Grid 项目 -->
  <div class="bg-blue-100">1</div>
  <div class="bg-green-100">2</div>
  <div class="bg-red-100">3</div>
  <div class="bg-yellow-100">4</div>
  <div class="bg-purple-100">5</div>
  <div class="bg-pink-100">6</div>
</div>
```

## 5.2 Grid 容器属性

### 5.2.1 Grid Template Columns（列定义）

```html
<!-- 等宽列 -->
<div class="grid grid-cols-3 gap-4 mb-8">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>

<!-- 不同数量的列 -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
</div>

<!-- 自定义列宽 -->
<div class="grid grid-cols-[200px_1fr_100px] gap-4 mb-8">
  <div class="bg-blue-100 p-4">固定 200px</div>
  <div class="bg-green-100 p-4">弹性宽度</div>
  <div class="bg-red-100 p-4">固定 100px</div>
</div>

<!-- 分数单位 -->
<div class="grid grid-cols-[1fr_2fr_1fr] gap-4 mb-8">
  <div class="bg-blue-100 p-4">1份</div>
  <div class="bg-green-100 p-4">2份</div>
  <div class="bg-red-100 p-4">1份</div>
</div>

<!-- 重复模式 -->
<div class="grid grid-cols-[repeat(3,1fr)] gap-4 mb-8">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>
```

### 5.2.2 Grid Template Rows（行定义）

```html
<!-- 等高行 -->
<div class="grid grid-cols-2 grid-rows-3 gap-4 h-96">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
  <div class="bg-pink-100 p-4">6</div>
</div>

<!-- 自定义行高 -->
<div class="grid grid-cols-3 grid-rows-[100px_1fr_50px] gap-4 h-96">
  <div class="bg-blue-100 p-4">固定 100px</div>
  <div class="bg-green-100 p-4">弹性高度</div>
  <div class="bg-red-100 p-4">固定 50px</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
  <div class="bg-pink-100 p-4">6</div>
  <div class="bg-gray-100 p-4">7</div>
  <div class="bg-indigo-100 p-4">8</div>
  <div class="bg-orange-100 p-4">9</div>
</div>
```

### 5.2.3 Grid Gap（间距）

```html
<!-- 统一间距 -->
<div class="grid grid-cols-3 gap-4">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>

<!-- 不同的行列间距 -->
<div class="grid grid-cols-3 gap-x-4 gap-y-8">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
  <div class="bg-pink-100 p-4">6</div>
</div>

<!-- 响应式间距 -->
<div class="grid grid-cols-2 gap-2 md:gap-4 lg:gap-8">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
</div>
```

### 5.2.4 Grid Auto Columns/Rows（自动尺寸）

```html
<!-- 自动列宽 -->
<div class="grid grid-flow-col auto-cols-max gap-4">
  <div class="bg-blue-100 p-4">短内容</div>
  <div class="bg-green-100 p-4">这是比较长的内容</div>
  <div class="bg-red-100 p-4">中等长度内容</div>
</div>

<!-- 自动行高 -->
<div class="grid grid-cols-2 auto-rows-min gap-4">
  <div class="bg-blue-100 p-4">短内容</div>
  <div class="bg-green-100 p-4">
    这是很长的内容，会自动调整行高。
    内容可能包含多行文字。
  </div>
  <div class="bg-red-100 p-4">中等内容</div>
  <div class="bg-yellow-100 p-4">另一个短内容</div>
</div>
```

### 5.2.5 Grid Flow（排列方向）

```html
<!-- 按行排列（默认） -->
<div class="grid grid-cols-3 grid-flow-row gap-4">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
</div>

<!-- 按列排列 -->
<div class="grid grid-rows-3 grid-flow-col gap-4 h-64">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
</div>

<!-- 密集排列 -->
<div class="grid grid-cols-3 grid-flow-row-dense gap-4">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4 col-span-2">2 (跨2列)</div>
  <div class="bg-red-100 p-4">3</div>
  <div class="bg-yellow-100 p-4">4</div>
  <div class="bg-purple-100 p-4">5</div>
</div>
```

## 5.3 Grid 项目属性

### 5.3.1 Grid Column（列跨越）

```html
<div class="grid grid-cols-4 gap-4">
  <!-- 跨越多列 -->
  <div class="bg-blue-100 p-4 col-span-2">跨 2 列</div>
  <div class="bg-green-100 p-4">正常</div>
  <div class="bg-red-100 p-4">正常</div>
  
  <!-- 指定起始和结束位置 -->
  <div class="bg-yellow-100 p-4 col-start-2 col-end-4">列 2-4</div>
  <div class="bg-purple-100 p-4">正常</div>
  
  <!-- 跨越到最后 -->
  <div class="bg-pink-100 p-4 col-span-full">跨越所有列</div>
</div>
```

### 5.3.2 Grid Row（行跨越）

```html
<div class="grid grid-cols-3 grid-rows-4 gap-4 h-96">
  <div class="bg-blue-100 p-4 row-span-2">跨 2 行</div>
  <div class="bg-green-100 p-4">正常</div>
  <div class="bg-red-100 p-4">正常</div>
  
  <div class="bg-yellow-100 p-4">正常</div>
  <div class="bg-purple-100 p-4 row-start-2 row-end-4">行 2-4</div>
  
  <div class="bg-pink-100 p-4">正常</div>
  <div class="bg-indigo-100 p-4">正常</div>
  
  <div class="bg-orange-100 p-4 col-span-2">跨 2 列</div>
  <div class="bg-gray-100 p-4">正常</div>
</div>
```

### 5.3.3 Grid Area（区域定位）

```html
<!-- 使用线编号定位 -->
<div class="grid grid-cols-4 grid-rows-3 gap-4 h-64">
  <div class="bg-blue-100 p-4 col-start-1 col-end-3 row-start-1 row-end-3">
    大区域 (1,1) 到 (3,3)
  </div>
  <div class="bg-green-100 p-4 col-start-3 col-end-5 row-start-1 row-end-2">
    顶部右侧
  </div>
  <div class="bg-red-100 p-4 col-start-3 col-end-4 row-start-2 row-end-4">
    右侧中下
  </div>
  <div class="bg-yellow-100 p-4 col-start-4 col-end-5 row-start-2 row-end-4">
    右下角
  </div>
  <div class="bg-purple-100 p-4 col-start-1 col-end-3 row-start-3 row-end-4">
    底部左侧
  </div>
</div>
```

## 5.4 Grid 对齐

### 5.4.1 容器内容对齐

```html
<!-- 整个网格在容器中的对齐 -->
<div class="grid grid-cols-2 gap-4 h-64 bg-gray-200 justify-center items-center">
  <div class="bg-blue-100 p-4 w-20 h-20">1</div>
  <div class="bg-green-100 p-4 w-20 h-20">2</div>
  <div class="bg-red-100 p-4 w-20 h-20">3</div>
  <div class="bg-yellow-100 p-4 w-20 h-20">4</div>
</div>

<!-- 不同的对齐方式 -->
<div class="grid grid-cols-3 gap-4 h-64 bg-gray-200 justify-start items-start">
  <div class="bg-blue-100 p-4 w-16 h-16">1</div>
  <div class="bg-green-100 p-4 w-16 h-16">2</div>
  <div class="bg-red-100 p-4 w-16 h-16">3</div>
</div>
```

### 5.4.2 项目内容对齐

```html
<!-- 所有项目的对齐方式 -->
<div class="grid grid-cols-3 gap-4 h-64 place-items-center">
  <div class="bg-blue-100 p-2">居中项目 1</div>
  <div class="bg-green-100 p-2">居中项目 2</div>
  <div class="bg-red-100 p-2">居中项目 3</div>
</div>

<!-- 单独设置项目对齐 -->
<div class="grid grid-cols-3 gap-4 h-64">
  <div class="bg-blue-100 p-4 place-self-start">起始</div>
  <div class="bg-green-100 p-4 place-self-center">居中</div>
  <div class="bg-red-100 p-4 place-self-end">结束</div>
  <div class="bg-yellow-100 p-4 justify-self-stretch">拉伸</div>
  <div class="bg-purple-100 p-4 align-self-center">垂直居中</div>
  <div class="bg-pink-100 p-4 place-self-stretch">完全拉伸</div>
</div>
```

## 5.5 响应式网格

### 5.5.1 响应式列数

```html
<!-- 1列 -> 2列 -> 3列 -> 4列 -->
<div class="
  grid
  grid-cols-1        <!-- 移动端：1列 -->
  sm:grid-cols-2     <!-- 小屏：2列 -->
  md:grid-cols-3     <!-- 中屏：3列 -->
  lg:grid-cols-4     <!-- 大屏：4列 -->
  gap-4
">
  <div class="bg-blue-100 p-4">项目 1</div>
  <div class="bg-green-100 p-4">项目 2</div>
  <div class="bg-red-100 p-4">项目 3</div>
  <div class="bg-yellow-100 p-4">项目 4</div>
  <div class="bg-purple-100 p-4">项目 5</div>
  <div class="bg-pink-100 p-4">项目 6</div>
  <div class="bg-indigo-100 p-4">项目 7</div>
  <div class="bg-orange-100 p-4">项目 8</div>
</div>
```

### 5.5.2 响应式跨越

```html
<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
  <!-- 在移动端占满，桌面端跨2列 -->
  <div class="
    bg-blue-100 p-4
    col-span-1         <!-- 移动端：占1列（实际是全部） -->
    md:col-span-2      <!-- 桌面端：跨2列 -->
  ">
    响应式跨越项目
  </div>
  <div class="bg-green-100 p-4">项目 2</div>
  <div class="bg-red-100 p-4">项目 3</div>
  <div class="bg-yellow-100 p-4">项目 4</div>
  <div class="bg-purple-100 p-4">项目 5</div>
</div>
```

### 5.5.3 响应式网格模板

```html
<!-- 移动端简单布局，桌面端复杂布局 -->
<div class="
  grid gap-4
  grid-cols-1 grid-rows-[auto_1fr_auto]     <!-- 移动端：头部-内容-页脚 -->
  md:grid-cols-[200px_1fr_200px] md:grid-rows-[auto_1fr_auto]  <!-- 桌面端：侧边栏布局 -->
  min-h-screen
">
  <!-- 头部 -->
  <header class="
    bg-blue-600 text-white p-4
    md:col-span-3          <!-- 桌面端跨越所有列 -->
  ">
    <h1 class="text-xl font-bold">网站标题</h1>
  </header>
  
  <!-- 左侧边栏（桌面端显示） -->
  <aside class="
    hidden md:block      <!-- 移动端隐藏 -->
    bg-gray-200 p-4
  ">
    <nav>
      <ul class="space-y-2">
        <li><a href="#" class="block p-2 hover:bg-gray-300 rounded">菜单 1</a></li>
        <li><a href="#" class="block p-2 hover:bg-gray-300 rounded">菜单 2</a></li>
        <li><a href="#" class="block p-2 hover:bg-gray-300 rounded">菜单 3</a></li>
      </ul>
    </nav>
  </aside>
  
  <!-- 主内容 -->
  <main class="bg-white p-4">
    <h2 class="text-2xl font-bold mb-4">主要内容</h2>
    <p>这里是主要内容区域...</p>
  </main>
  
  <!-- 右侧边栏（桌面端显示） -->
  <aside class="
    hidden md:block      <!-- 移动端隐藏 -->
    bg-gray-100 p-4
  ">
    <h3 class="font-bold mb-2">相关信息</h3>
    <p class="text-sm text-gray-600">这里是相关信息...</p>
  </aside>
  
  <!-- 页脚 -->
  <footer class="
    bg-gray-800 text-white p-4
    md:col-span-3          <!-- 桌面端跨越所有列 -->
  ">
    <p class="text-center">&copy; 2024 公司名称</p>
  </footer>
</div>
```

## 5.6 Auto-fit 和 Auto-fill

### 5.6.1 自适应列数

```html
<!-- 自动适应列数（最小200px） -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
  <div class="bg-blue-100 p-4">自适应项目 1</div>
  <div class="bg-green-100 p-4">自适应项目 2</div>
  <div class="bg-red-100 p-4">自适应项目 3</div>
  <div class="bg-yellow-100 p-4">自适应项目 4</div>
  <div class="bg-purple-100 p-4">自适应项目 5</div>
</div>

<!-- 使用 Tailwind 的预设网格 -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
  <!-- 卡片会自动调整数量以适应容器宽度 -->
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-semibold mb-2">卡片标题 1</h3>
    <p class="text-gray-600">卡片内容描述...</p>
  </div>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-semibold mb-2">卡片标题 2</h3>
    <p class="text-gray-600">卡片内容描述...</p>
  </div>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h3 class="text-lg font-semibold mb-2">卡片标题 3</h3>
    <p class="text-gray-600">卡片内容描述...</p>
  </div>
</div>
```

## 5.7 实战案例

### 5.7.1 网站布局

```html
<!-- 经典网站布局 -->
<div class="
  min-h-screen 
  grid 
  grid-rows-[auto_1fr_auto]
  lg:grid-cols-[250px_1fr]
  lg:grid-rows-[auto_1fr_auto]
">
  <!-- 头部 -->
  <header class="
    bg-blue-600 text-white p-4
    lg:col-span-2
  ">
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-bold">我的网站</h1>
      <nav class="hidden lg:flex space-x-4">
        <a href="#" class="hover:text-blue-200">首页</a>
        <a href="#" class="hover:text-blue-200">关于</a>
        <a href="#" class="hover:text-blue-200">联系</a>
      </nav>
    </div>
  </header>
  
  <!-- 侧边栏（桌面端） -->
  <aside class="
    hidden lg:block
    bg-gray-100 p-4
  ">
    <nav>
      <h2 class="font-bold mb-4">导航菜单</h2>
      <ul class="space-y-2">
        <li><a href="#" class="block p-2 rounded hover:bg-gray-200">菜单项 1</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-200">菜单项 2</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-200">菜单项 3</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-200">菜单项 4</a></li>
      </ul>
    </nav>
  </aside>
  
  <!-- 主内容 -->
  <main class="p-4 lg:p-8">
    <h2 class="text-2xl font-bold mb-6">主要内容</h2>
    
    <!-- 内容网格 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <article class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">文章标题 1</h3>
        <p class="text-gray-600 mb-4">文章摘要内容...</p>
        <a href="#" class="text-blue-600 hover:underline">阅读更多</a>
      </article>
      
      <article class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-2">文章标题 2</h3>
        <p class="text-gray-600 mb-4">文章摘要内容...</p>
        <a href="#" class="text-blue-600 hover:underline">阅读更多</a>
      </article>
      
      <article class="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-1">
        <h3 class="text-lg font-semibold mb-2">特色文章</h3>
        <p class="text-gray-600 mb-4">这是一篇特色文章的摘要...</p>
        <a href="#" class="text-blue-600 hover:underline">阅读更多</a>
      </article>
    </div>
  </main>
  
  <!-- 页脚 -->
  <footer class="
    bg-gray-800 text-white p-4
    lg:col-span-2
  ">
    <div class="text-center">
      <p>&copy; 2024 我的网站. 保留所有权利.</p>
    </div>
  </footer>
</div>
```

### 5.7.2 照片画廊

```html
<!-- 不规则照片网格 -->
<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4">
  <!-- 大图片 -->
  <div class="col-span-2 row-span-2">
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/400x400" 
      alt="大图片"
    >
  </div>
  
  <!-- 小图片 -->
  <div>
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/200x200" 
      alt="小图片"
    >
  </div>
  
  <div>
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/200x200" 
      alt="小图片"
    >
  </div>
  
  <!-- 宽图片 -->
  <div class="col-span-2">
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/400x200" 
      alt="宽图片"
    >
  </div>
  
  <!-- 更多图片... -->
  <div>
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/200x200" 
      alt="图片"
    >
  </div>
  
  <div class="row-span-2">
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/200x400" 
      alt="高图片"
    >
  </div>
  
  <div>
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/200x200" 
      alt="图片"
    >
  </div>
  
  <div class="col-span-2">
    <img 
      class="w-full h-full object-cover rounded-lg" 
      src="https://via.placeholder.com/400x200" 
      alt="宽图片"
    >
  </div>
</div>
```

### 5.7.3 仪表板布局

```html
<!-- 响应式仪表板 -->
<div class="min-h-screen bg-gray-100 p-4">
  <div class="
    grid gap-4
    grid-cols-1                    <!-- 移动端：单列 -->
    lg:grid-cols-[300px_1fr]      <!-- 大屏：侧边栏 + 主内容 -->
    lg:grid-rows-[auto_1fr]       <!-- 大屏：头部 + 内容 -->
  ">
    <!-- 头部 -->
    <header class="
      bg-white rounded-lg shadow p-4
      lg:col-span-2
    ">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">仪表板</h1>
        <div class="flex items-center space-x-4">
          <span class="text-gray-600">欢迎回来，用户名</span>
          <img 
            class="w-8 h-8 rounded-full" 
            src="https://via.placeholder.com/32" 
            alt="头像"
          >
        </div>
      </div>
    </header>
    
    <!-- 侧边栏 -->
    <nav class="
      bg-white rounded-lg shadow p-4
      lg:row-start-2
    ">
      <ul class="space-y-2">
        <li><a href="#" class="block p-2 text-blue-600 bg-blue-50 rounded">概览</a></li>
        <li><a href="#" class="block p-2 text-gray-700 hover:bg-gray-50 rounded">分析</a></li>
        <li><a href="#" class="block p-2 text-gray-700 hover:bg-gray-50 rounded">报告</a></li>
        <li><a href="#" class="block p-2 text-gray-700 hover:bg-gray-50 rounded">设置</a></li>
      </ul>
    </nav>
    
    <!-- 主内容区域 -->
    <main class="
      lg:row-start-2
    ">
      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">总销售额</h3>
          <p class="text-2xl font-bold text-gray-900">¥45,231</p>
          <p class="text-sm text-green-600">+20.1% 比上月</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">订单数量</h3>
          <p class="text-2xl font-bold text-gray-900">2,350</p>
          <p class="text-sm text-green-600">+180.1% 比上月</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">活跃用户</h3>
          <p class="text-2xl font-bold text-gray-900">1,259</p>
          <p class="text-sm text-red-600">-19% 比上月</p>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-sm font-medium text-gray-500">转化率</h3>
          <p class="text-2xl font-bold text-gray-900">3.65%</p>
          <p class="text-sm text-green-600">+9% 比上月</p>
        </div>
      </div>
      
      <!-- 图表区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">销售趋势</h3>
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span class="text-gray-500">[图表占位符]</span>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold mb-4">地区分布</h3>
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center">
            <span class="text-gray-500">[图表占位符]</span>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h3 class="text-lg font-semibold mb-4">最近订单</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left p-2">订单号</th>
                  <th class="text-left p-2">客户</th>
                  <th class="text-left p-2">金额</th>
                  <th class="text-left p-2">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b">
                  <td class="p-2">#12345</td>
                  <td class="p-2">张三</td>
                  <td class="p-2">¥99.00</td>
                  <td class="p-2"><span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">已完成</span></td>
                </tr>
                <tr class="border-b">
                  <td class="p-2">#12346</td>
                  <td class="p-2">李四</td>
                  <td class="p-2">¥156.00</td>
                  <td class="p-2"><span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">处理中</span></td>
                </tr>
                <tr>
                  <td class="p-2">#12347</td>
                  <td class="p-2">王五</td>
                  <td class="p-2">¥299.00</td>
                  <td class="p-2"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">已发货</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

## 🔧 练习项目

### 练习 1：博客首页
创建一个博客首页布局：
- 头部导航
- 特色文章（大卡片）
- 普通文章网格
- 侧边栏（分类、标签）
- 页脚

### 练习 2：产品展示页
设计一个产品展示页面：
- 产品图片网格（不同尺寸）
- 产品信息卡片
- 响应式布局
- 筛选侧边栏

### 练习 3：管理后台
创建一个管理后台界面：
- 顶部导航栏
- 左侧菜单
- 主内容区域
- 统计卡片网格
- 数据表格

## 📚 扩展阅读

- [CSS Grid Layout - Tailwind CSS](https://tailwindcss.com/docs/grid-template-columns)
- [Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Grid Garden Game](https://cssgridgarden.com/) - 学习 CSS Grid 的游戏

## 📝 本章小结

- CSS Grid 是强大的二维布局系统，适合页面级别的布局
- Tailwind 提供了完整的 Grid 工具类，覆盖所有 CSS Grid 功能
- 响应式网格布局是现代 Web 设计的核心技能
- 掌握网格的跨越、对齐和区域定位可以创建复杂布局
- Grid 与 Flexbox 结合使用可以处理几乎所有布局需求
- 实际项目中要根据内容特点选择合适的布局方法

---

**下一章：[第 6 章：间距和尺寸](../06-spacing-sizing/README.md)**
