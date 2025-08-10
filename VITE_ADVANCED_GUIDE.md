# Vite 学习笔记 - 第 5-10 章

## 第 5 章：资源处理

### 5.1 静态资源

#### 静态资源导入

```javascript
// 导入静态资源
import logoUrl from './assets/logo.png'
import dataUrl from './data.json?url'
import rawContent from './shader.glsl?raw'
import inlineString from './style.css?inline'

// 使用
console.log(logoUrl) // /assets/logo.2d8efhg.png
```

#### 公共目录资源

```
public/
├── favicon.ico
├── images/
│   └── hero.jpg
└── data/
    └── config.json
```

```javascript
// 访问 public 目录资源
const heroImage = '/images/hero.jpg'
const config = '/data/config.json'

// 在 HTML 中
<img src="/images/hero.jpg" alt="Hero">
```

#### 动态导入资源

```javascript
// 动态导入
async function loadImage(name) {
  const module = await import(`./assets/images/${name}.png`)
  return module.default
}

// 使用 import.meta.glob
const modules = import.meta.glob('./assets/images/*.png')

for (const path in modules) {
  modules[path]().then((mod) => {
    console.log(path, mod.default)
  })
}

// 立即导入
const modules = import.meta.glob('./assets/images/*.png', { eager: true })
```

#### 资源处理选项

```javascript
// vite.config.js
export default defineConfig({
  assetsInclude: ['**/*.gltf'], // 额外的资源文件类型
  
  build: {
    assetsInlineLimit: 4096, // 小于 4kb 的资源内联为 base64
    assetsDir: 'assets',     // 资源输出目录
  }
})
```

### 5.2 CSS 处理

#### CSS 模块

```css
/* styles.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.title {
  font-size: 2rem;
  color: var(--primary-color);
}
```

```javascript
// 导入 CSS 模块
import styles from './styles.module.css'

// 使用
function Component() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>标题</h1>
    </div>
  )
}
```

#### CSS-in-JS

```javascript
// styled-components
import styled from 'styled-components'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`

// emotion
import { css } from '@emotion/react'

const titleStyle = css`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
`
```

#### CSS 变量

```css
/* base.css */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 1rem;
  --border-radius: 0.375rem;
}

.button {
  background-color: var(--primary-color);
  border-radius: var(--border-radius);
  font-size: var(--font-size-base);
}
```

### 5.3 预处理器

#### Sass/SCSS

```bash
npm install -D sass
```

```scss
// variables.scss
$primary-color: #007bff;
$secondary-color: #6c757d;
$breakpoints: (
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px
);

@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media (min-width: map-get($breakpoints, $breakpoint)) {
      @content;
    }
  }
}

// main.scss
@import './variables';

.container {
  padding: 1rem;
  
  @include respond-to(md) {
    padding: 2rem;
  }
}
```

#### Less

```bash
npm install -D less
```

```less
// variables.less
@primary-color: #007bff;
@secondary-color: #6c757d;

.respond-to(@breakpoint) {
  @media (min-width: @breakpoint) {
    @content();
  }
}

// main.less
@import './variables';

.container {
  padding: 1rem;
  
  .respond-to(768px, {
    padding: 2rem;
  });
}
```

#### Stylus

```bash
npm install -D stylus
```

```stylus
// variables.styl
primary-color = #007bff
secondary-color = #6c757d

respond-to(breakpoint)
  @media (min-width: breakpoint)
    {block}

// main.styl
@import './variables'

.container
  padding 1rem
  
  +respond-to(768px)
    padding 2rem
```

### 5.4 PostCSS

#### PostCSS 配置

```javascript
// postcss.config.js
export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 2,
      features: {
        'nesting-rules': false
      }
    }
  }
}
```

#### 常用 PostCSS 插件

```bash
# 自动添加浏览器前缀
npm install -D autoprefixer

# 现代 CSS 特性
npm install -D postcss-preset-env

# CSS 导入
npm install -D postcss-import

# CSS 嵌套
npm install -D postcss-nesting

# 压缩 CSS
npm install -D cssnano
```

#### Tailwind CSS 集成

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

```css
/* style.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

### 5.5 图片和字体

#### 图片优化

```bash
npm install -D vite-plugin-imagemin
```

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      optipng: { optimizationLevel: 7 },
      pngquant: { quality: [0.8, 0.9] },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
})
```

#### 响应式图片

```javascript
// 导入不同尺寸的图片
import heroSmall from './hero.jpg?w=400'
import heroMedium from './hero.jpg?w=800'
import heroLarge from './hero.jpg?w=1200'

// 使用 picture 元素
function ResponsiveImage() {
  return (
    <picture>
      <source media="(min-width: 800px)" srcSet={heroLarge} />
      <source media="(min-width: 400px)" srcSet={heroMedium} />
      <img src={heroSmall} alt="Hero" />
    </picture>
  )
}
```

#### 字体处理

```css
/* fonts.css */
@font-face {
  font-family: 'Custom Font';
  src: url('./assets/fonts/custom-font.woff2') format('woff2'),
       url('./assets/fonts/custom-font.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.title {
  font-family: 'Custom Font', sans-serif;
}
```

#### 图标处理

```bash
npm install -D vite-plugin-svg-icons
```

```javascript
// vite.config.js
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default defineConfig({
  plugins: [
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
})
```

---

## 第 6 章：构建优化

### 6.1 生产构建

#### 构建分析

```bash
# 构建项目
npm run build

# 分析构建结果
npm install -D rollup-plugin-visualizer
```

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // 其他插件...
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true
    })
  ]
})
```

#### 构建优化配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    // 目标环境
    target: 'es2015',
    
    // 输出目录
    outDir: 'dist',
    
    // 资源目录
    assetsDir: 'assets',
    
    // 内联限制
    assetsInlineLimit: 4096,
    
    // CSS 代码分割
    cssCodeSplit: true,
    
    // 生成 manifest
    manifest: true,
    
    // 压缩配置
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log']
      }
    },
    
    // Rollup 选项
    rollupOptions: {
      output: {
        // 手动分块
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          ui: ['element-plus']
        }
      }
    }
  }
})
```

### 6.2 代码分割

#### 动态导入

```javascript
// 路由懒加载
const Home = () => import('./views/Home.vue')
const About = () => import('./views/About.vue')

// 组件懒加载
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/HeavyComponent.vue')
)

// 条件导入
async function loadChart() {
  if (process.env.NODE_ENV === 'development') {
    const { Chart } = await import('./dev/MockChart.js')
    return Chart
  } else {
    const { Chart } = await import('chart.js')
    return Chart
  }
}
```

#### 手动分块

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将 node_modules 中的包分到 vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
          
          // 将组件库单独分包
          if (id.includes('element-plus')) {
            return 'element-plus'
          }
          
          // 将工具库单独分包
          if (id.includes('lodash')) {
            return 'lodash'
          }
        }
      }
    }
  }
})
```

#### 预加载

```javascript
// 预加载关键资源
const modulePreload = import(
  /* webpackPreload: true */ './critical-module.js'
)

// 预获取非关键资源
const modulePrefetch = import(
  /* webpackPrefetch: true */ './optional-module.js'
)
```

### 6.3 Tree Shaking

#### ES 模块导入

```javascript
// ✅ 好的做法 - 只导入需要的部分
import { debounce, throttle } from 'lodash-es'

// ❌ 避免 - 导入整个库
import _ from 'lodash'

// ✅ 好的做法 - 具名导入
import { Button, Input } from 'element-plus'

// ❌ 避免 - 默认导入
import ElementPlus from 'element-plus'
```

#### 配置 Tree Shaking

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        preset: 'recommended',
        moduleSideEffects: false
      }
    }
  }
})
```

#### 标记副作用

```json
// package.json
{
  "sideEffects": false,
  // 或者指定有副作用的文件
  "sideEffects": [
    "*.css",
    "*.scss",
    "./src/polyfills.js"
  ]
}
```

### 6.4 Bundle 分析

#### Webpack Bundle Analyzer

```bash
npm install -D webpack-bundle-analyzer
```

```javascript
// 分析脚本
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// package.json
{
  "scripts": {
    "analyze": "npm run build && npx webpack-bundle-analyzer dist/stats.json"
  }
}
```

#### Rollup Plugin Visualizer

```javascript
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    visualizer({
      filename: 'bundle-analysis.html',
      open: true,
      template: 'treemap', // sunburst, treemap, network
      gzipSize: true,
      brotliSize: true
    })
  ]
})
```

### 6.5 性能优化

#### 依赖优化

```javascript
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    // 强制预构建
    include: ['lodash-es', 'date-fns'],
    
    // 排除预构建
    exclude: ['some-large-dep'],
    
    // esbuild 选项
    esbuildOptions: {
      target: 'es2020'
    }
  }
})
```

#### 缓存策略

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 文件名哈希
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
```

#### 压缩优化

```javascript
// vite.config.js
export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        // 移除 console
        drop_console: true,
        drop_debugger: true,
        
        // 移除未使用的代码
        dead_code: true,
        
        // 压缩条件表达式
        conditionals: true,
        
        // 优化常量
        evaluate: true,
        
        // 合并变量
        join_vars: true,
        
        // 优化循环
        loops: true
      },
      mangle: {
        // 混淆变量名
        toplevel: true
      }
    }
  }
})
```

---

## 第 7 章：高级功能

### 7.1 HMR (热模块替换)

#### HMR API

```javascript
// 接受自身的热更新
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 处理模块更新
    console.log('模块已更新:', newModule)
  })
}

// 接受依赖的热更新
if (import.meta.hot) {
  import.meta.hot.accept('./dependency.js', (newDep) => {
    // 重新初始化依赖
    setupDependency(newDep)
  })
}

// 处理热更新错误
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    try {
      updateModule(newModule)
    } catch (error) {
      // 拒绝更新，触发页面刷新
      import.meta.hot.invalidate()
    }
  })
}
```

#### 自定义 HMR

```javascript
// hmr-plugin.js
export function createHMRPlugin() {
  return {
    name: 'custom-hmr',
    handleHotUpdate(ctx) {
      // 自定义热更新逻辑
      if (ctx.file.endsWith('.special')) {
        // 处理特殊文件的热更新
        ctx.server.ws.send({
          type: 'full-reload'
        })
        return []
      }
    }
  }
}
```

#### Vue HMR

```vue
<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello HMR'
    }
  }
}

// HMR 会自动保持组件状态
if (import.meta.hot) {
  import.meta.hot.accept()
}
</script>
```

### 7.2 依赖预构建

#### 预构建配置

```javascript
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    // 强制预构建的依赖
    include: [
      'lodash-es',
      'date-fns',
      'axios'
    ],
    
    // 排除预构建
    exclude: [
      'some-es-module'
    ],
    
    // 自定义 esbuild 选项
    esbuildOptions: {
      target: 'es2020',
      supported: {
        bigint: true
      }
    },
    
    // 强制重新预构建
    force: true
  }
})
```

#### 预构建缓存

```bash
# 清除预构建缓存
rm -rf node_modules/.vite

# 或者使用 --force 标志
npm run dev -- --force
```

#### 条件预构建

```javascript
// vite.config.js
export default defineConfig(({ mode }) => ({
  optimizeDeps: {
    include: mode === 'development' 
      ? ['dev-only-package']
      : ['prod-only-package']
  }
}))
```

### 7.3 多页面应用

#### 多页面配置

```javascript
// vite.config.js
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html'),
        mobile: resolve(__dirname, 'mobile.html')
      }
    }
  }
})
```

#### 页面文件结构

```
project/
├── index.html          # 主页
├── admin.html          # 管理页面
├── mobile.html         # 移动端页面
├── src/
│   ├── main.js         # 主页入口
│   ├── admin.js        # 管理页面入口
│   └── mobile.js       # 移动端入口
```

#### 动态页面生成

```javascript
// vite.config.js
import { readdirSync } from 'fs'
import { resolve } from 'path'

const pages = readdirSync('src/pages').reduce((acc, dir) => {
  acc[dir] = resolve(__dirname, `src/pages/${dir}/index.html`)
  return acc
}, {})

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pages
      }
    }
  }
})
```

### 7.4 库模式

#### 库构建配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'MyLibrary',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format) => `my-library.${format}.js`
    },
    rollupOptions: {
      // 外部化依赖
      external: ['vue', 'react'],
      output: {
        globals: {
          vue: 'Vue',
          react: 'React'
        }
      }
    }
  }
})
```

#### 库入口文件

```javascript
// src/index.js
export { default as Button } from './components/Button.vue'
export { default as Input } from './components/Input.vue'
export { default as Modal } from './components/Modal.vue'

// 默认导出
export default {
  install(app) {
    // Vue 插件安装逻辑
    app.component('MyButton', Button)
    app.component('MyInput', Input)
    app.component('MyModal', Modal)
  }
}
```

#### package.json 配置

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-library.cjs.js",
  "module": "./dist/my-library.es.js",
  "exports": {
    ".": {
      "import": "./dist/my-library.es.js",
      "require": "./dist/my-library.cjs.js"
    }
  },
  "types": "./dist/index.d.ts"
}
```

### 7.5 SSR 支持

#### SSR 项目配置

```javascript
// vite.config.js
export default defineConfig({
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        server: 'src/entry-server.js'
      }
    }
  },
  ssr: {
    noExternal: ['some-package']
  }
})
```

#### 服务端入口

```javascript
// src/entry-server.js
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import App from './App.vue'

export async function render(url) {
  const app = createSSRApp(App)
  
  // 设置路由
  router.push(url)
  await router.isReady()
  
  const html = await renderToString(app)
  return { html }
}
```

#### 客户端入口

```javascript
// src/entry-client.js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// 激活服务端渲染的内容
app.mount('#app')
```

---

## 第 8 章：部署和 CI/CD

### 8.1 部署策略

#### 构建输出优化

```javascript
// vite.config.js
export default defineConfig({
  base: '/', // 部署路径
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    
    // 文件名哈希
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
```

#### 环境配置

```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_CDN_URL=https://cdn.production.com
VITE_SENTRY_DSN=your-sentry-dsn
```

### 8.2 静态部署

#### Netlify 部署

```toml
# netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Vercel 部署

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

#### GitHub Pages

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### 8.3 Docker 部署

#### Dockerfile

```dockerfile
# 多阶段构建
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx 配置

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 支持 SPA 路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 安全头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
}
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

### 8.4 CI/CD 集成

#### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Run linting
      run: npm run lint
    
    - name: Build
      run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to production
      run: |
        # 部署脚本
        echo "Deploying to production..."
```

#### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm test
    - npm run lint

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - echo "Deploying to production..."
    # 部署脚本
  only:
    - main
```

### 8.5 缓存策略

#### HTTP 缓存

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // 长期缓存
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
```

#### Service Worker

```javascript
// sw.js
const CACHE_NAME = 'v1'
const urlsToCache = [
  '/',
  '/js/app.js',
  '/css/style.css'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request)
      })
  )
})
```

---

## 第 9-10 章和最佳实践

### 第 9 章：开发工具

#### VS Code 配置

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "vite.devCommand": "npm run dev",
  "vite.buildCommand": "npm run build"
}
```

#### ESLint 配置

```javascript
// eslint.config.js
export default [
  {
    files: ['**/*.{js,jsx,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue: vuePlugin
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      '@typescript-eslint/no-unused-vars': 'error'
    }
  }
]
```

### 第 10 章：最佳实践

#### 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 通用组件
│   ├── base/       # 基础组件
│   └── business/   # 业务组件
├── composables/    # 组合式函数
├── stores/         # 状态管理
├── utils/          # 工具函数
├── views/          # 页面组件
├── router/         # 路由配置
├── api/            # API 接口
└── types/          # TypeScript 类型
```

#### 性能监控

```javascript
// 性能监控
function measurePerformance() {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(entry.name, entry.duration)
    }
  })
  
  observer.observe({ entryTypes: ['measure', 'navigation'] })
}

// 错误监控
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

// 未处理的 Promise 拒绝
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})
```

## 📚 总结

Vite 是一个强大的现代构建工具，具有以下核心优势：

1. **极快的开发体验** - 冷启动快，热更新即时
2. **简单的配置** - 开箱即用，配置简洁
3. **强大的插件生态** - 丰富的官方和社区插件
4. **现代化技术栈** - 基于 ES 模块，支持最新标准
5. **优秀的构建性能** - 基于 Rollup，构建输出优化

通过本指南的学习，您应该能够：
- 熟练使用 Vite 进行项目开发
- 配置和优化 Vite 项目
- 集成各种框架和工具
- 部署和维护生产应用

继续实践和探索 Vite 的更多可能性！
