# Vite 完整学习指南

## 📚 学习大纲

### 第 1 章：Vite 基础入门
- [1.1 Vite 是什么](#11-vite-是什么)
- [1.2 为什么选择 Vite](#12-为什么选择-vite)
- [1.3 安装和快速开始](#13-安装和快速开始)
- [1.4 项目结构](#14-项目结构)
- [1.5 开发服务器](#15-开发服务器)

### 第 2 章：配置详解
- [2.1 配置文件](#21-配置文件)
- [2.2 开发配置](#22-开发配置)
- [2.3 构建配置](#23-构建配置)
- [2.4 环境变量](#24-环境变量)
- [2.5 路径别名](#25-路径别名)

### 第 3 章：插件系统
- [3.1 插件基础](#31-插件基础)
- [3.2 官方插件](#32-官方插件)
- [3.3 社区插件](#33-社区插件)
- [3.4 自定义插件](#34-自定义插件)
- [3.5 插件配置](#35-插件配置)

### 第 4 章：框架集成
- [4.1 Vue 项目](#41-vue-项目)
- [4.2 React 项目](#42-react-项目)
- [4.3 Svelte 项目](#43-svelte-项目)
- [4.4 Vanilla JS](#44-vanilla-js)
- [4.5 TypeScript 支持](#45-typescript-支持)

### 第 5 章：资源处理
- [5.1 静态资源](#51-静态资源)
- [5.2 CSS 处理](#52-css-处理)
- [5.3 预处理器](#53-预处理器)
- [5.4 PostCSS](#54-postcss)
- [5.5 图片和字体](#55-图片和字体)

### 第 6 章：构建优化
- [6.1 生产构建](#61-生产构建)
- [6.2 代码分割](#62-代码分割)
- [6.3 Tree Shaking](#63-tree-shaking)
- [6.4 Bundle 分析](#64-bundle-分析)
- [6.5 性能优化](#65-性能优化)

### 第 7 章：高级功能
- [7.1 HMR (热模块替换)](#71-hmr-热模块替换)
- [7.2 依赖预构建](#72-依赖预构建)
- [7.3 多页面应用](#73-多页面应用)
- [7.4 库模式](#74-库模式)
- [7.5 SSR 支持](#75-ssr-支持)

### 第 8 章：部署和 CI/CD
- [8.1 部署策略](#81-部署策略)
- [8.2 静态部署](#82-静态部署)
- [8.3 Docker 部署](#83-docker-部署)
- [8.4 CI/CD 集成](#84-cicd-集成)
- [8.5 缓存策略](#85-缓存策略)

### 第 9 章：开发工具
- [9.1 IDE 配置](#91-ide-配置)
- [9.2 调试技巧](#92-调试技巧)
- [9.3 测试集成](#93-测试集成)
- [9.4 代码质量](#94-代码质量)
- [9.5 开发工作流](#95-开发工作流)

### 第 10 章：最佳实践
- [10.1 项目组织](#101-项目组织)
- [10.2 性能最佳实践](#102-性能最佳实践)
- [10.3 安全考虑](#103-安全考虑)
- [10.4 团队协作](#104-团队协作)
- [10.5 升级和维护](#105-升级和维护)

---

## 🎯 学习目标

完成本指南后，您将能够：
- 深入理解 Vite 的工作原理和核心概念
- 熟练配置和定制 Vite 项目
- 掌握各种框架与 Vite 的集成
- 优化构建性能和开发体验
- 部署和维护 Vite 项目

---

## 第 1 章：Vite 基础入门

### 1.1 Vite 是什么？

Vite（法语意为"快速"，发音为 `/vit/`）是一个现代化的前端构建工具，由 Vue.js 作者尤雨溪创建。

#### 核心特点

```javascript
// 传统构建工具的工作流程
开发模式: 打包整个应用 → 启动开发服务器 → 修改代码 → 重新打包
构建模式: 打包整个应用 → 输出到 dist

// Vite 的工作流程
开发模式: 启动开发服务器 → 按需编译 → 即时热更新
构建模式: 使用 Rollup 打包 → 优化输出
```

#### 技术架构

```
Vite 架构
├── 开发服务器 (esbuild + ES modules)
│   ├── 依赖预构建 (esbuild)
│   ├── 源码转换 (按需编译)
│   └── HMR (热模块替换)
└── 生产构建 (Rollup)
    ├── 代码分割
    ├── 压缩优化
    └── 资源处理
```

### 1.2 为什么选择 Vite？

#### 性能对比

| 特性 | Webpack | Vite |
|------|---------|------|
| 冷启动时间 | 慢（需要打包） | 快（即时启动） |
| 热更新速度 | 慢（重新打包） | 极快（按需更新） |
| 构建速度 | 中等 | 快（esbuild + Rollup） |
| 配置复杂度 | 高 | 低 |

#### 开发体验

```javascript
// 启动时间对比（大型项目）
Webpack: 30-60 秒
Vite: 1-3 秒

// 热更新时间对比
Webpack: 1-5 秒
Vite: 50-200 毫秒
```

### 1.3 安装和快速开始

#### 使用脚手架创建项目

```bash
# npm 7+，需要额外的双横线
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

#### 可用模板

```bash
# JavaScript 模板
vanilla          # 原生 JavaScript
vanilla-ts       # TypeScript
vue              # Vue 3
vue-ts           # Vue 3 + TypeScript
react            # React
react-ts         # React + TypeScript
react-swc        # React + SWC
react-swc-ts     # React + SWC + TypeScript
preact           # Preact
preact-ts        # Preact + TypeScript
lit              # Lit
lit-ts           # Lit + TypeScript
svelte           # Svelte
svelte-ts        # Svelte + TypeScript
solid            # Solid
solid-ts         # Solid + TypeScript
qwik             # Qwik
qwik-ts          # Qwik + TypeScript
```

#### 项目初始化

```bash
# 进入项目目录
cd my-vue-app

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 1.4 项目结构

```
my-vite-project/
├── public/              # 静态资源目录
│   ├── favicon.ico
│   └── logo.png
├── src/                 # 源码目录
│   ├── assets/          # 资源文件
│   ├── components/      # 组件
│   ├── views/          # 页面
│   ├── utils/          # 工具函数
│   ├── main.js         # 入口文件
│   └── App.vue         # 根组件
├── index.html          # HTML 模板
├── package.json        # 项目配置
├── vite.config.js      # Vite 配置
└── README.md
```

#### 入口文件说明

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
</head>
<body>
    <div id="app"></div>
    <!-- 入口脚本 -->
    <script type="module" src="/src/main.js"></script>
</body>
</html>
```

```javascript
// src/main.js
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### 1.5 开发服务器

#### 基本命令

```bash
# 启动开发服务器
npm run dev

# 指定端口
npm run dev -- --port 3000

# 指定主机
npm run dev -- --host 0.0.0.0

# 打开浏览器
npm run dev -- --open
```

#### 开发服务器特性

```javascript
// 1. 即时服务器启动
// 无需等待打包，立即启动

// 2. 闪电般的 HMR
// 热模块替换，保持应用状态

// 3. 丰富的功能
// - TypeScript 支持
// - JSX 支持
// - CSS 预处理器支持
// - 导入别名
// - 环境变量
```

---

## 第 2 章：配置详解

### 2.1 配置文件

#### 基本配置文件

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  
  // 路径解析
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

#### 条件配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig(({ command, mode }) => {
  const config = {
    plugins: []
  }
  
  if (command === 'serve') {
    // 开发环境配置
    config.server = {
      port: 3000
    }
  } else {
    // 生产环境配置
    config.build = {
      minify: 'terser'
    }
  }
  
  return config
})
```

#### TypeScript 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import type { UserConfig } from 'vite'

export default defineConfig({
  // 配置选项...
} as UserConfig)
```

### 2.2 开发配置

#### 服务器选项

```javascript
// vite.config.js
export default defineConfig({
  server: {
    // 端口号
    port: 3000,
    
    // 自动打开浏览器
    open: true,
    
    // 主机地址
    host: '0.0.0.0',
    
    // HTTPS
    https: false,
    
    // 代理设置
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    
    // CORS
    cors: true,
    
    // 预热文件
    warmup: {
      clientFiles: ['./src/components/*.vue']
    }
  }
})
```

#### HMR 配置

```javascript
// vite.config.js
export default defineConfig({
  server: {
    hmr: {
      port: 24678,
      overlay: true // 错误覆盖层
    }
  }
})
```

### 2.3 构建配置

#### 基础构建选项

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // 输出目录
    outDir: 'dist',
    
    // 资源目录
    assetsDir: 'assets',
    
    // 生成 sourcemap
    sourcemap: true,
    
    // 压缩器
    minify: 'terser', // 'terser' | 'esbuild'
    
    // Terser 选项
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    
    // 构建目标
    target: 'es2015',
    
    // 代码分割
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html'
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    
    // 警告阈值（KB）
    chunkSizeWarningLimit: 1500
  }
})
```

#### 库模式构建

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib.js',
      name: 'MyLib',
      fileName: (format) => `my-lib.${format}.js`,
      formats: ['es', 'cjs', 'umd', 'iife']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
```

### 2.4 环境变量

#### 环境变量文件

```bash
# .env                # 所有环境加载
# .env.local          # 所有环境加载，git 忽略
# .env.development    # 开发环境加载
# .env.production     # 生产环境加载
```

#### 环境变量示例

```bash
# .env.development
VITE_API_URL=http://localhost:3001/api
VITE_APP_TITLE=开发环境
VITE_ENABLE_DEBUG=true

# .env.production
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=生产环境
VITE_ENABLE_DEBUG=false
```

#### 在代码中使用

```javascript
// 访问环境变量
console.log(import.meta.env.VITE_API_URL)
console.log(import.meta.env.VITE_APP_TITLE)

// 环境判断
const isDev = import.meta.env.DEV
const isProd = import.meta.env.PROD
const mode = import.meta.env.MODE

// 类型声明 (vite-env.d.ts)
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_ENABLE_DEBUG: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

### 2.5 路径别名

#### 配置别名

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@api': path.resolve(__dirname, 'src/api')
    }
  }
})
```

#### TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@assets/*": ["src/assets/*"],
      "@views/*": ["src/views/*"],
      "@store/*": ["src/store/*"],
      "@api/*": ["src/api/*"]
    }
  }
}
```

#### 使用示例

```javascript
// 使用别名导入
import Header from '@components/Header.vue'
import { api } from '@api/index.js'
import logo from '@assets/logo.png'
import { formatDate } from '@utils/date.js'

// 而不是相对路径
import Header from '../../components/Header.vue'
import { api } from '../../../api/index.js'
```

---

## 第 3 章：插件系统

### 3.1 插件基础

#### 插件是什么？

```javascript
// Vite 插件是一个函数或对象
function myPlugin() {
  return {
    name: 'my-plugin',
    buildStart() {
      // 构建开始时执行
    },
    transform(code, id) {
      // 转换代码
      return {
        code: transformedCode,
        map: sourceMap
      }
    }
  }
}

// 使用插件
export default defineConfig({
  plugins: [myPlugin()]
})
```

#### 插件钩子

```javascript
// 通用钩子（Rollup 钩子）
buildStart    // 构建开始
buildEnd      // 构建结束
generateBundle // 生成 bundle
writeBundle   // 写入 bundle

// Vite 独有钩子
config        // 配置解析前
configResolved // 配置解析后
configureServer // 配置开发服务器
transformIndexHtml // 转换 index.html
handleHotUpdate // 处理 HMR 更新
```

### 3.2 官方插件

#### Vue 支持

```bash
npm install @vitejs/plugin-vue
```

```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // Vue 插件选项
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    })
  ]
})
```

#### React 支持

```bash
npm install @vitejs/plugin-react
```

```javascript
// vite.config.js
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // React 插件选项
      include: "**/*.{jsx,tsx}",
      babel: {
        plugins: ['@babel/plugin-transform-react-jsx']
      }
    })
  ]
})
```

#### Legacy 浏览器支持

```bash
npm install @vitejs/plugin-legacy
```

```javascript
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
})
```

### 3.3 社区插件

#### 自动导入

```bash
npm install unplugin-auto-import
```

```javascript
// vite.config.js
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core'
      ],
      dts: true // 生成类型声明文件
    })
  ]
})
```

#### 组件自动导入

```bash
npm install unplugin-vue-components
```

```javascript
// vite.config.js
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ]
})
```

#### PWA 支持

```bash
npm install vite-plugin-pwa
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ]
})
```

### 3.4 自定义插件

#### 简单插件示例

```javascript
// plugins/console-plugin.js
export function consolePlugin() {
  return {
    name: 'console-plugin',
    transform(code, id) {
      if (id.endsWith('.vue') || id.endsWith('.js')) {
        // 在生产环境移除 console.log
        if (process.env.NODE_ENV === 'production') {
          code = code.replace(/console\.log\(.*?\);?/g, '')
        }
      }
      return {
        code,
        map: null
      }
    }
  }
}
```

#### 虚拟文件插件

```javascript
// plugins/virtual-file-plugin.js
export function virtualFilePlugin() {
  const virtualFiles = new Map()
  
  return {
    name: 'virtual-file',
    resolveId(id) {
      if (id.startsWith('virtual:')) {
        return id
      }
    },
    load(id) {
      if (id.startsWith('virtual:')) {
        return virtualFiles.get(id) || 'export default {}'
      }
    },
    configureServer(server) {
      // 添加虚拟文件
      virtualFiles.set('virtual:my-module', 'export const msg = "Hello from virtual file"')
    }
  }
}
```

#### 开发时插件

```javascript
// plugins/dev-plugin.js
export function devPlugin() {
  return {
    name: 'dev-plugin',
    apply: 'serve', // 只在开发时应用
    configureServer(server) {
      server.middlewares.use('/api/mock', (req, res, next) => {
        if (req.url === '/api/mock/users') {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify([
            { id: 1, name: 'John' },
            { id: 2, name: 'Jane' }
          ]))
        } else {
          next()
        }
      })
    }
  }
}
```

### 3.5 插件配置

#### 条件应用插件

```javascript
// vite.config.js
export default defineConfig(({ command, mode }) => {
  const plugins = [vue()]
  
  // 仅在构建时应用
  if (command === 'build') {
    plugins.push(legacy())
  }
  
  // 仅在开发时应用
  if (command === 'serve') {
    plugins.push(devPlugin())
  }
  
  // 根据环境应用
  if (mode === 'development') {
    plugins.push(mockPlugin())
  }
  
  return {
    plugins
  }
})
```

#### 插件顺序

```javascript
// vite.config.js
export default defineConfig({
  plugins: [
    // pre 插件（在 Vite 内部插件之前运行）
    {
      ...somePlugin(),
      enforce: 'pre'
    },
    
    // 正常插件
    vue(),
    
    // post 插件（在 Vite 内部插件之后运行）
    {
      ...anotherPlugin(),
      enforce: 'post'
    }
  ]
})
```

---

## 第 4 章：框架集成

### 4.1 Vue 项目

#### 创建 Vue 项目

```bash
# Vue 3
npm create vite@latest my-vue-app -- --template vue
npm create vite@latest my-vue-app -- --template vue-ts

# 进入项目
cd my-vue-app
npm install
npm run dev
```

#### Vue 配置选项

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      // 模板选项
      template: {
        compilerOptions: {
          // 自定义元素
          isCustomElement: tag => tag.startsWith('my-')
        }
      },
      
      // 脚本设置
      script: {
        defineModel: true,
        propsDestructure: true
      },
      
      // 样式选项
      style: {
        filename: 'style.css'
      },
      
      // 包含文件类型
      include: [/\.vue$/, /\.md$/]
    })
  ]
})
```

#### Vue Router 集成

```bash
npm install vue-router@4
```

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // 路由懒加载
    component: () => import('@/views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
```

#### Pinia 状态管理

```bash
npm install pinia
```

```javascript
// src/stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

### 4.2 React 项目

#### 创建 React 项目

```bash
# React
npm create vite@latest my-react-app -- --template react
npm create vite@latest my-react-app -- --template react-ts

# React + SWC (更快的编译)
npm create vite@latest my-react-app -- --template react-swc
npm create vite@latest my-react-app -- --template react-swc-ts
```

#### React 配置选项

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      // JSX 运行时
      jsxRuntime: 'automatic', // 'automatic' | 'classic'
      
      // Babel 配置
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ]
      },
      
      // 包含文件
      include: /\.(jsx|tsx)$/,
      
      // Fast Refresh
      fastRefresh: true
    })
  ]
})
```

#### React Router 集成

```bash
npm install react-router-dom
```

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

#### Redux Toolkit 集成

```bash
npm install @reduxjs/toolkit react-redux
```

```javascript
// src/store/index.js
import { configureStore, createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})

export const { increment, decrement } = counterSlice.actions

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer
  }
})
```

### 4.3 Svelte 项目

#### 创建 Svelte 项目

```bash
npm create vite@latest my-svelte-app -- --template svelte
npm create vite@latest my-svelte-app -- --template svelte-ts
```

#### Svelte 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [
    svelte({
      // 预处理器
      preprocess: {
        style: ({ content, attributes }) => {
          if (attributes.lang === 'scss') {
            return sassPreprocess(content)
          }
        }
      },
      
      // 编译选项
      compilerOptions: {
        dev: process.env.NODE_ENV === 'development'
      },
      
      // 热重载
      hot: {
        preserveLocalState: true
      }
    })
  ]
})
```

### 4.4 Vanilla JS

#### Vanilla JavaScript 项目

```bash
npm create vite@latest my-vanilla-app -- --template vanilla
npm create vite@latest my-vanilla-app -- --template vanilla-ts
```

#### 项目结构

```
vanilla-project/
├── index.html
├── main.js
├── style.css
├── counter.js
└── javascript.svg
```

#### 模块化开发

```javascript
// src/modules/utils.js
export function formatDate(date) {
  return new Intl.DateTimeFormat('zh-CN').format(date)
}

export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
```

```javascript
// main.js
import './style.css'
import { formatDate, debounce } from './modules/utils.js'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Vanilla JavaScript + Vite</h1>
    <p>当前时间: ${formatDate(new Date())}</p>
  </div>
`
```

### 4.5 TypeScript 支持

#### TypeScript 配置

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    
    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    
    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 环境类型声明

```typescript
// src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

#### TypeScript 工具配置

```typescript
// src/types/index.ts
export interface User {
  id: number
  name: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

// 工具类型
export type Partial<T> = {
  [P in keyof T]?: T[P]
}

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

---

继续为您创建完整的 Vite 学习笔记...
