# Tailwind CSS 核心知识点速记

## 🚀 必须记住的核心概念

### 1. 基础语法规则
```
格式：[前缀]-[属性]-[值]
- text-lg          (字体大小)
- bg-blue-500      (背景颜色)
- p-4              (内边距)
- m-2              (外边距)
- w-1/2            (宽度50%)
```

### 2. 响应式断点 (必记)
```
sm:  640px   (小屏幕)
md:  768px   (平板)
lg:  1024px  (小桌面)
xl:  1280px  (大桌面)
2xl: 1536px  (超大桌面)

使用：<div class="w-full md:w-1/2 lg:w-1/3">
```

### 3. 间距系统 (0.25rem=4px为基准)
```
0: 0px       4: 16px      12: 48px
1: 4px       5: 20px      16: 64px
2: 8px       6: 24px      20: 80px
3: 12px      8: 32px      24: 96px

p-4 = padding: 16px
mx-auto = margin-left: auto; margin-right: auto
```

### 4. 颜色系统 (50-950)
```
gray-50   (最浅)
gray-100
gray-200
...
gray-500  (中等)
...
gray-900  (最深)
gray-950  (最深)

支持：red, blue, green, yellow, purple, pink, indigo 等
```

### 5. Flexbox 核心类
```
flex              (display: flex)
flex-col          (flex-direction: column)
justify-center    (justify-content: center)
items-center      (align-items: center)
flex-wrap         (flex-wrap: wrap)
flex-1            (flex: 1 1 0%)
```

### 6. Grid 核心类
```
grid              (display: grid)
grid-cols-3       (grid-template-columns: repeat(3, minmax(0, 1fr)))
col-span-2        (grid-column: span 2 / span 2)
gap-4             (gap: 16px)
```

### 7. 定位类
```
relative          (position: relative)
absolute          (position: absolute)
fixed             (position: fixed)
top-0             (top: 0)
z-10              (z-index: 10)
```

### 8. 文本类
```
text-sm/base/lg/xl/2xl/3xl    (字体大小)
font-bold/semibold/medium     (字体粗细)
text-center/left/right        (文本对齐)
leading-tight/normal/loose    (行高)
tracking-wide                 (字母间距)
```

## 🎨 常用组合模式

### 1. 居中布局
```html
<!-- 水平垂直居中 -->
<div class="flex items-center justify-center min-h-screen">
  <div>内容</div>
</div>

<!-- 容器居中 -->
<div class="max-w-4xl mx-auto px-4">
  <div>内容</div>
</div>
```

### 2. 卡片组件
```html
<div class="bg-white rounded-lg shadow-md p-6 max-w-sm">
  <h3 class="text-lg font-semibold mb-2">标题</h3>
  <p class="text-gray-600 mb-4">描述文本</p>
  <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200">
    按钮
  </button>
</div>
```

### 3. 响应式网格
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>项目1</div>
  <div>项目2</div>
  <div>项目3</div>
</div>
```

### 4. 导航栏
```html
<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <div class="text-xl font-bold">Logo</div>
      <div class="hidden md:flex space-x-6">
        <a href="#" class="text-gray-700 hover:text-blue-600">链接1</a>
        <a href="#" class="text-gray-700 hover:text-blue-600">链接2</a>
      </div>
    </div>
  </div>
</nav>
```

### 5. 按钮变体
```html
<!-- 主要按钮 -->
<button class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition duration-200">
  主要
</button>

<!-- 次要按钮 -->
<button class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded transition duration-200">
  次要
</button>

<!-- 边框按钮 -->
<button class="border border-blue-500 text-blue-500 hover:bg-blue-50 font-medium px-4 py-2 rounded transition duration-200">
  边框
</button>
```

## 🔧 状态变体 (必须掌握)

### 1. 交互状态
```
hover:           (悬停)
focus:           (焦点)
active:          (激活)
disabled:        (禁用)
visited:         (已访问)
```

### 2. 表单状态
```
checked:         (选中)
invalid:         (无效)
valid:           (有效)
required:        (必填)
placeholder:     (占位符)
```

### 3. 组状态
```
group:           (定义组)
group-hover:     (组悬停)
group-focus:     (组焦点)
```

示例：
```html
<div class="group">
  <img class="group-hover:scale-110 transition-transform">
  <h3 class="group-hover:text-blue-600">标题</h3>
</div>
```

## 📱 响应式设计模式

### 1. 移动优先
```html
<!-- 默认移动端样式，然后逐步增强 -->
<div class="text-sm md:text-base lg:text-lg">
  响应式文本
</div>
```

### 2. 隐藏/显示
```html
<!-- 移动端隐藏，桌面端显示 -->
<div class="hidden lg:block">桌面端内容</div>

<!-- 移动端显示，桌面端隐藏 -->
<div class="block lg:hidden">移动端内容</div>
```

### 3. 布局切换
```html
<!-- 移动端垂直，桌面端水平 -->
<div class="flex flex-col md:flex-row">
  <div class="md:w-1/2">左侧</div>
  <div class="md:w-1/2">右侧</div>
</div>
```

## 🎯 性能优化要点

### 1. PurgeCSS 配置
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

### 2. JIT 模式
```javascript
// tailwind.config.js
module.exports = {
  mode: 'jit',
  // ...
}
```

### 3. 生产环境构建
```bash
# 构建优化的 CSS
npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify
```

## 🚨 常见错误和解决方案

### 1. 类名不生效
```
问题：类名写错或 content 配置有误
解决：检查拼写，确认文件在 content 路径中
```

### 2. 样式被覆盖
```
问题：CSS 优先级问题
解决：使用 !important 或调整类名顺序
```

### 3. 自定义样式
```css
/* 使用 @layer 添加自定义样式 */
@layer components {
  .btn-custom {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
  }
}
```

## 🛠️ 开发工具

### 1. VS Code 插件
- Tailwind CSS IntelliSense
- Headwind (类名排序)
- Prettier (代码格式化)

### 2. 浏览器工具
- Tailwind CSS Devtools
- 浏览器开发者工具

### 3. 在线工具
- Tailwind CSS Playground
- Tailwind UI 组件库
- Headless UI

## 📋 检查清单

开始新项目时的必检项目：

- [ ] 安装 Tailwind CSS
- [ ] 配置 content 路径
- [ ] 设置构建流程
- [ ] 安装 VS Code 插件
- [ ] 配置 PurgeCSS
- [ ] 测试响应式断点
- [ ] 准备基础组件库

## 🎨 设计原则

1. **移动优先**：从小屏幕开始设计
2. **渐进增强**：逐步添加复杂性
3. **一致性**：使用设计 token
4. **可访问性**：注意对比度和焦点状态
5. **性能**：减少不必要的类

---

*这份速记包含了 Tailwind CSS 最核心的知识点，建议打印或收藏备用！*
