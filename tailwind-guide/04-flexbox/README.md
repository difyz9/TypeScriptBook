# 第 4 章：Flexbox 布局

## 📋 本章内容

- Flexbox 基础概念和原理
- Flex 容器和 Flex 项目
- 主轴和交叉轴控制
- 对齐和分布
- 响应式 Flexbox 布局
- 常见布局模式和实战案例

## 🎯 学习目标

完成本章学习后，你将能够：
- 理解 Flexbox 的工作原理
- 熟练使用 Tailwind 的 Flex 工具类
- 创建各种灵活的布局结构
- 掌握元素对齐和空间分布
- 构建响应式的 Flexbox 布局

---

## 4.1 Flexbox 基础概念

### 4.1.1 什么是 Flexbox？

Flexbox（弹性盒子布局）是一种一维布局方法，用于在容器中排列元素。它特别适合：
- 垂直和水平居中
- 等高列布局
- 响应式设计
- 空间分配

### 4.1.2 Flex 容器和 Flex 项目

```html
<!-- Flex 容器 -->
<div class="flex">
  <!-- Flex 项目 -->
  <div class="flex-1">项目 1</div>
  <div class="flex-1">项目 2</div>
  <div class="flex-1">项目 3</div>
</div>
```

### 4.1.3 主轴和交叉轴

```html
<!-- 水平主轴（默认） -->
<div class="flex">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>

<!-- 垂直主轴 -->
<div class="flex flex-col">
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</div>
```

## 4.2 Flex 容器属性

### 4.2.1 Flex Direction（主轴方向）

```html
<!-- 水平方向（默认） -->
<div class="flex flex-row">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>

<!-- 水平反向 -->
<div class="flex flex-row-reverse">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>

<!-- 垂直方向 -->
<div class="flex flex-col h-48">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>

<!-- 垂直反向 -->
<div class="flex flex-col-reverse h-48">
  <div class="bg-blue-100 p-4">1</div>
  <div class="bg-green-100 p-4">2</div>
  <div class="bg-red-100 p-4">3</div>
</div>
```

### 4.2.2 Flex Wrap（换行）

```html
<!-- 不换行（默认） -->
<div class="flex flex-nowrap w-64 bg-gray-200">
  <div class="w-32 bg-blue-100 p-2">宽项目 1</div>
  <div class="w-32 bg-green-100 p-2">宽项目 2</div>
  <div class="w-32 bg-red-100 p-2">宽项目 3</div>
</div>

<!-- 允许换行 -->
<div class="flex flex-wrap w-64 bg-gray-200">
  <div class="w-32 bg-blue-100 p-2">宽项目 1</div>
  <div class="w-32 bg-green-100 p-2">宽项目 2</div>
  <div class="w-32 bg-red-100 p-2">宽项目 3</div>
</div>

<!-- 反向换行 -->
<div class="flex flex-wrap-reverse w-64 bg-gray-200">
  <div class="w-32 bg-blue-100 p-2">宽项目 1</div>
  <div class="w-32 bg-green-100 p-2">宽项目 2</div>
  <div class="w-32 bg-red-100 p-2">宽项目 3</div>
</div>
```

### 4.2.3 Justify Content（主轴对齐）

```html
<!-- 起始对齐（默认） -->
<div class="flex justify-start bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 居中对齐 -->
<div class="flex justify-center bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 末尾对齐 -->
<div class="flex justify-end bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 两端对齐 -->
<div class="flex justify-between bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 均匀分布 -->
<div class="flex justify-around bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 等间距分布 -->
<div class="flex justify-evenly bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>
```

### 4.2.4 Align Items（交叉轴对齐）

```html
<!-- 拉伸对齐（默认） -->
<div class="flex items-stretch h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 起始对齐 -->
<div class="flex items-start h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 居中对齐 -->
<div class="flex items-center h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 末尾对齐 -->
<div class="flex items-end h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>

<!-- 基线对齐 -->
<div class="flex items-baseline h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2 text-xs">小字</div>
  <div class="bg-green-100 p-2 text-base">正常</div>
  <div class="bg-red-100 p-2 text-xl">大字</div>
</div>
```

### 4.2.5 Align Content（多行对齐）

```html
<!-- 当内容换行时的对齐方式 -->
<div class="flex flex-wrap content-center h-48 w-64 bg-gray-200 p-4">
  <div class="w-32 bg-blue-100 p-2">1</div>
  <div class="w-32 bg-green-100 p-2">2</div>
  <div class="w-32 bg-red-100 p-2">3</div>
  <div class="w-32 bg-yellow-100 p-2">4</div>
</div>

<!-- 其他对齐选项 -->
<div class="flex flex-wrap content-start h-48 w-64 bg-gray-200 p-4">...</div>
<div class="flex flex-wrap content-end h-48 w-64 bg-gray-200 p-4">...</div>
<div class="flex flex-wrap content-between h-48 w-64 bg-gray-200 p-4">...</div>
<div class="flex flex-wrap content-around h-48 w-64 bg-gray-200 p-4">...</div>
<div class="flex flex-wrap content-evenly h-48 w-64 bg-gray-200 p-4">...</div>
```

## 4.3 Flex 项目属性

### 4.3.1 Flex Grow（扩展）

```html
<div class="flex bg-gray-200 p-4">
  <!-- 不扩展 -->
  <div class="flex-none bg-blue-100 p-2">固定</div>
  
  <!-- 扩展 1 倍 -->
  <div class="flex-1 bg-green-100 p-2">扩展 1</div>
  
  <!-- 扩展 2 倍 -->
  <div class="flex-auto bg-red-100 p-2">自适应</div>
</div>

<!-- 数字指定扩展比例 -->
<div class="flex bg-gray-200 p-4">
  <div class="flex-grow bg-blue-100 p-2">默认扩展</div>
  <div class="flex-grow-0 bg-green-100 p-2">不扩展</div>
</div>
```

### 4.3.2 Flex Shrink（收缩）

```html
<div class="flex w-64 bg-gray-200 p-4">
  <!-- 允许收缩 -->
  <div class="flex-shrink w-32 bg-blue-100 p-2">可收缩</div>
  
  <!-- 不允许收缩 -->
  <div class="flex-shrink-0 w-32 bg-green-100 p-2">不收缩</div>
  
  <div class="flex-shrink w-32 bg-red-100 p-2">可收缩</div>
</div>
```

### 4.3.3 Flex Basis（基础尺寸）

```html
<div class="flex bg-gray-200 p-4">
  <!-- 使用 width/height 作为基础尺寸 -->
  <div class="basis-auto bg-blue-100 p-2 w-32">自动基础</div>
  
  <!-- 指定基础尺寸 -->
  <div class="basis-1/4 bg-green-100 p-2">1/4 基础</div>
  <div class="basis-1/2 bg-red-100 p-2">1/2 基础</div>
  <div class="basis-1/4 bg-yellow-100 p-2">1/4 基础</div>
</div>
```

### 4.3.4 Align Self（单独对齐）

```html
<div class="flex items-center h-32 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">正常</div>
  
  <!-- 单独设置对齐方式 -->
  <div class="self-start bg-green-100 p-2">顶部对齐</div>
  <div class="self-end bg-red-100 p-2">底部对齐</div>
  <div class="self-stretch bg-yellow-100 p-2">拉伸</div>
  
  <div class="bg-purple-100 p-2">正常</div>
</div>
```

### 4.3.5 Order（排序）

```html
<div class="flex bg-gray-200 p-4">
  <div class="order-3 bg-blue-100 p-2">第一个元素（order-3）</div>
  <div class="order-1 bg-green-100 p-2">第二个元素（order-1）</div>
  <div class="order-2 bg-red-100 p-2">第三个元素（order-2）</div>
</div>
<!-- 显示顺序：绿色、红色、蓝色 -->
```

## 4.4 响应式 Flexbox

### 4.4.1 响应式 Flex 方向

```html
<div class="
  flex flex-col        <!-- 移动端：垂直布局 -->
  md:flex-row          <!-- 平板及以上：水平布局 -->
  gap-4
  bg-gray-200 p-4
">
  <div class="bg-blue-100 p-4">侧边栏</div>
  <div class="bg-green-100 p-4 flex-1">主内容</div>
</div>
```

### 4.4.2 响应式对齐

```html
<div class="
  flex
  justify-center       <!-- 移动端：居中 -->
  md:justify-between   <!-- 平板及以上：两端对齐 -->
  items-center
  bg-gray-200 p-4
">
  <div class="bg-blue-100 p-2">Logo</div>
  <div class="
    hidden             <!-- 移动端：隐藏 -->
    md:flex            <!-- 平板及以上：显示为 flex -->
    space-x-4
  ">
    <div class="bg-green-100 p-2">菜单1</div>
    <div class="bg-red-100 p-2">菜单2</div>
  </div>
</div>
```

### 4.4.3 响应式换行

```html
<div class="
  flex
  flex-wrap          <!-- 允许换行 -->
  md:flex-nowrap     <!-- 平板及以上：不换行 -->
  gap-4
  bg-gray-200 p-4
">
  <div class="
    w-full           <!-- 移动端：全宽 -->
    md:w-auto        <!-- 平板及以上：自适应 -->
    bg-blue-100 p-2
  ">项目 1</div>
  <div class="
    w-full
    md:w-auto
    bg-green-100 p-2
  ">项目 2</div>
  <div class="
    w-full
    md:w-auto
    bg-red-100 p-2
  ">项目 3</div>
</div>
```

## 4.5 常见布局模式

### 4.5.1 水平居中

```html
<!-- 单个元素水平居中 -->
<div class="flex justify-center bg-gray-200 p-4">
  <div class="bg-blue-100 p-4">居中内容</div>
</div>

<!-- 多个元素水平居中 -->
<div class="flex justify-center space-x-4 bg-gray-200 p-4">
  <div class="bg-blue-100 p-2">1</div>
  <div class="bg-green-100 p-2">2</div>
  <div class="bg-red-100 p-2">3</div>
</div>
```

### 4.5.2 垂直居中

```html
<!-- 垂直居中 -->
<div class="flex items-center justify-center h-64 bg-gray-200">
  <div class="bg-blue-100 p-4">
    完全居中的内容
  </div>
</div>

<!-- 垂直和水平都居中 -->
<div class="flex items-center justify-center min-h-screen bg-gray-200">
  <div class="bg-white p-8 rounded-lg shadow-lg">
    <h2 class="text-xl font-bold mb-4">登录</h2>
    <form class="space-y-4">
      <input 
        class="w-full p-2 border rounded" 
        type="email" 
        placeholder="邮箱"
      >
      <input 
        class="w-full p-2 border rounded" 
        type="password" 
        placeholder="密码"
      >
      <button class="w-full bg-blue-500 text-white p-2 rounded">
        登录
      </button>
    </form>
  </div>
</div>
```

### 4.5.3 等高列

```html
<div class="flex bg-gray-200 p-4 gap-4">
  <!-- 所有列都会自动等高 -->
  <div class="flex-1 bg-blue-100 p-4">
    <h3 class="font-bold mb-2">短内容列</h3>
    <p>这是比较短的内容。</p>
  </div>
  
  <div class="flex-1 bg-green-100 p-4">
    <h3 class="font-bold mb-2">长内容列</h3>
    <p>这是很长的内容。内容很多很多，包含了大量的文字描述，可能会占用多行。这样可以测试等高效果。</p>
    <p>还有更多内容...</p>
  </div>
  
  <div class="flex-1 bg-red-100 p-4">
    <h3 class="font-bold mb-2">中等内容列</h3>
    <p>这是中等长度的内容，比第一列长，比第二列短。</p>
  </div>
</div>
```

### 4.5.4 固定侧边栏

```html
<div class="flex h-screen">
  <!-- 固定宽度侧边栏 -->
  <aside class="
    w-64 
    bg-gray-800 
    text-white 
    p-4
    flex flex-col
  ">
    <div class="mb-8">
      <h1 class="text-xl font-bold">Logo</h1>
    </div>
    
    <nav class="flex-1">
      <ul class="space-y-2">
        <li><a href="#" class="block p-2 rounded hover:bg-gray-700">首页</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-700">产品</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-700">服务</a></li>
        <li><a href="#" class="block p-2 rounded hover:bg-gray-700">关于</a></li>
      </ul>
    </nav>
    
    <div class="mt-auto">
      <p class="text-sm text-gray-400">© 2024 公司名称</p>
    </div>
  </aside>
  
  <!-- 主内容区域 -->
  <main class="flex-1 bg-gray-100 p-8 overflow-y-auto">
    <h2 class="text-2xl font-bold mb-4">主内容区域</h2>
    <p>这里是主要内容...</p>
  </main>
</div>
```

### 4.5.5 粘性页脚

```html
<div class="min-h-screen flex flex-col">
  <!-- 头部 -->
  <header class="bg-blue-600 text-white p-4">
    <h1 class="text-xl font-bold">网站标题</h1>
  </header>
  
  <!-- 主内容（自动扩展） -->
  <main class="flex-1 p-8 bg-gray-100">
    <h2 class="text-2xl font-bold mb-4">页面内容</h2>
    <p>主要内容区域，无论内容多少，页脚都会在底部。</p>
  </main>
  
  <!-- 页脚（总是在底部） -->
  <footer class="bg-gray-800 text-white p-4 text-center">
    <p>&copy; 2024 公司名称. 保留所有权利。</p>
  </footer>
</div>
```

### 4.5.6 卡片布局

```html
<!-- 响应式卡片网格 -->
<div class="
  flex flex-wrap 
  -m-4 
  p-4
">
  <!-- 卡片项目 -->
  <div class="
    w-full           <!-- 移动端：全宽 -->
    sm:w-1/2         <!-- 小屏：一半宽度 -->
    lg:w-1/3         <!-- 大屏：三分之一宽度 -->
    p-4
  ">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <img 
        class="w-full h-48 object-cover" 
        src="https://via.placeholder.com/400x200" 
        alt="卡片图片"
      >
      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-semibold mb-2">卡片标题</h3>
        <p class="text-gray-600 mb-4 flex-1">
          卡片描述内容，这里可以放置产品介绍或者文章摘要。
        </p>
        <div class="flex justify-between items-center">
          <span class="text-lg font-bold text-blue-600">￥99</span>
          <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            购买
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- 重复更多卡片... -->
</div>
```

### 4.5.7 媒体对象

```html
<!-- 媒体对象模式 -->
<div class="flex bg-white p-4 rounded-lg shadow">
  <!-- 媒体（头像） -->
  <div class="flex-shrink-0 mr-4">
    <img 
      class="w-12 h-12 rounded-full" 
      src="https://via.placeholder.com/48" 
      alt="用户头像"
    >
  </div>
  
  <!-- 内容 -->
  <div class="flex-1">
    <div class="flex items-center mb-1">
      <h4 class="text-lg font-semibold mr-2">用户名称</h4>
      <span class="text-sm text-gray-500">2 小时前</span>
    </div>
    <p class="text-gray-700">
      这是用户发布的内容，可以是评论、动态或者其他类型的信息。
      媒体对象是一种很常见的布局模式。
    </p>
    <div class="flex items-center mt-2 space-x-4">
      <button class="text-blue-500 hover:text-blue-600">点赞</button>
      <button class="text-gray-500 hover:text-gray-600">回复</button>
      <button class="text-gray-500 hover:text-gray-600">分享</button>
    </div>
  </div>
</div>
```

## 4.6 实战案例

### 4.6.1 响应式导航栏

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex-shrink-0">
        <img class="h-8 w-auto" src="logo.svg" alt="Logo">
      </div>
      
      <!-- 桌面端菜单 -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2">首页</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2">产品</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2">服务</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 px-3 py-2">关于</a>
      </div>
      
      <!-- 用户操作 -->
      <div class="hidden md:flex items-center space-x-4">
        <button class="text-gray-700 hover:text-blue-600">登录</button>
        <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          注册
        </button>
      </div>
      
      <!-- 移动端菜单按钮 -->
      <div class="md:hidden">
        <button class="text-gray-700 hover:text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 移动端菜单（隐藏状态） -->
    <div class="md:hidden border-t border-gray-200">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="#" class="block px-3 py-2 text-gray-700 hover:text-blue-600">首页</a>
        <a href="#" class="block px-3 py-2 text-gray-700 hover:text-blue-600">产品</a>
        <a href="#" class="block px-3 py-2 text-gray-700 hover:text-blue-600">服务</a>
        <a href="#" class="block px-3 py-2 text-gray-700 hover:text-blue-600">关于</a>
        <div class="flex space-x-2 px-3 py-2">
          <button class="flex-1 text-gray-700 border border-gray-300 py-2 rounded">登录</button>
          <button class="flex-1 bg-blue-500 text-white py-2 rounded">注册</button>
        </div>
      </div>
    </div>
  </div>
</nav>
```

### 4.6.2 产品特性展示

```html
<section class="py-16 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">产品特性</h2>
      <p class="text-xl text-gray-600">了解我们产品的强大功能</p>
    </div>
    
    <div class="
      flex flex-wrap 
      -mx-4
    ">
      <!-- 特性项目 -->
      <div class="
        w-full 
        md:w-1/2 
        lg:w-1/3 
        px-4 mb-8
      ">
        <div class="flex">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <!-- 图标 SVG -->
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">
              快速部署
            </h3>
            <p class="text-gray-600">
              只需几分钟即可完成部署，快速上线您的应用程序。
            </p>
          </div>
        </div>
      </div>
      
      <!-- 更多特性项目... -->
    </div>
  </div>
</section>
```

## 🔧 练习项目

### 练习 1：博客布局
创建一个响应式博客布局：
- 使用 flexbox 创建头部、主内容、侧边栏和页脚
- 移动端垂直堆叠，桌面端水平布局
- 实现粘性页脚

### 练习 2：购物车界面
设计一个购物车页面：
- 商品列表（图片、信息、价格、数量）
- 响应式布局（移动端垂直，桌面端水平）
- 总价计算区域

### 练习 3：团队介绍页面
创建团队成员展示页面：
- 使用媒体对象模式
- 响应式网格布局
- 卡片样式设计

## 📚 扩展阅读

- [Flexbox - Tailwind CSS](https://tailwindcss.com/docs/flex)
- [CSS Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Froggy Game](https://flexboxfroggy.com/) - 学习 Flexbox 的游戏

## 📝 本章小结

- Flexbox 是一维布局系统，特别适合组件内部布局
- 主轴和交叉轴的概念是理解 Flexbox 的关键
- Tailwind 提供了完整的 Flexbox 工具类集合
- 响应式 Flexbox 可以创建适应不同屏幕的布局
- 掌握常见布局模式可以快速解决实际问题
- Flexbox 与 Grid 结合使用可以创建复杂的页面布局

---

**下一章：[第 5 章：Grid 网格布局](../05-grid/README.md)**
