# Vite 速查表和实战案例

## 🚀 快速命令参考

### 项目创建
```bash
# 基础模板
npm create vite@latest my-app -- --template vanilla
npm create vite@latest my-app -- --template vue
npm create vite@latest my-app -- --template react
npm create vite@latest my-app -- --template svelte

# TypeScript 模板
npm create vite@latest my-app -- --template vanilla-ts
npm create vite@latest my-app -- --template vue-ts
npm create vite@latest my-app -- --template react-ts
npm create vite@latest my-app -- --template svelte-ts

# 特殊模板
npm create vite@latest my-app -- --template react-swc
npm create vite@latest my-app -- --template solid
npm create vite@latest my-app -- --template qwik
```

### 开发命令
```bash
# 启动开发服务器
npm run dev
npm run dev -- --port 3000 --host 0.0.0.0 --open

# 构建项目
npm run build

# 预览构建结果
npm run preview

# 强制重新预构建依赖
npm run dev -- --force

# 清理缓存
rm -rf node_modules/.vite
```

## 📊 配置速查

### 基础配置模板
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  // 开发服务器
  server: {
    port: 3000,
    open: true,
    host: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },
  
  // 路径解析
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components')
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    chunkSizeWarningLimit: 1500
  },
  
  // 环境变量
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  }
})
```

### 常用插件配置
```javascript
// React 项目
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})

// Vue 项目
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: true
    }),
    Components({
      dts: true
    })
  ]
})
```

## 🛠️ 实战案例

### 案例 1：企业级 Vue 3 项目

#### 项目结构
```
enterprise-vue-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── base/
│   │   └── business/
│   ├── composables/
│   ├── stores/
│   ├── utils/
│   ├── views/
│   ├── router/
│   ├── api/
│   └── types/
├── tests/
├── vite.config.ts
├── tsconfig.json
├── .env.development
├── .env.production
└── package.json
```

#### Vite 配置
```typescript
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        resolvers: [ElementPlusResolver()],
        dts: 'src/types/auto-imports.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()],
        dts: 'src/types/components.d.ts'
      }),
      mode === 'analyze' && visualizer({
        filename: 'dist/stats.html',
        open: true
      })
    ].filter(Boolean),
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@stores': resolve(__dirname, 'src/stores'),
        '@types': resolve(__dirname, 'src/types')
      }
    },
    
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router', 'pinia'],
            'element-plus': ['element-plus'],
            'utils': ['lodash-es', 'dayjs', 'axios']
          }
        }
      }
    },
    
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'element-plus', 'lodash-es']
    }
  }
})
```

#### 环境配置
```bash
# .env.development
VITE_PORT=3000
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=开发环境
VITE_ENABLE_MOCK=true

# .env.production
VITE_API_BASE_URL=https://api.yourcompany.com
VITE_APP_TITLE=生产环境
VITE_ENABLE_MOCK=false
```

#### API 封装
```typescript
// src/utils/request.ts
import axios from 'axios'
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default request
```

#### 状态管理
```typescript
// src/stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')
  
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => user.value?.name || '')
  
  function setUser(userData: User) {
    user.value = userData
  }
  
  function setToken(tokenValue: string) {
    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
  }
  
  function logout() {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }
  
  return {
    user,
    token,
    isLoggedIn,
    userName,
    setUser,
    setToken,
    logout
  }
})
```

### 案例 2：React + TypeScript 项目

#### Vite 配置
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths() // 自动读取 tsconfig 的路径映射
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@types': resolve(__dirname, 'src/types')
    }
  },
  
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'ui': ['antd'],
          'utils': ['lodash', 'dayjs', 'axios']
        }
      }
    }
  }
})
```

#### 自定义 Hook
```typescript
// src/hooks/useApi.ts
import { useState, useEffect } from 'react'
import type { AxiosRequestConfig } from 'axios'
import request from '@/utils/request'

interface UseApiResult<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export function useApi<T>(
  url: string,
  config?: AxiosRequestConfig
): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await request(url, config)
      setData(response)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [url])
  
  return { data, loading, error, refetch: fetchData }
}
```

### 案例 3：多页面应用

#### 项目结构
```
multi-page-app/
├── src/
│   ├── pages/
│   │   ├── home/
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   └── App.vue
│   │   ├── admin/
│   │   │   ├── index.html
│   │   │   ├── main.js
│   │   │   └── App.vue
│   │   └── mobile/
│   │       ├── index.html
│   │       ├── main.js
│   │       └── App.vue
│   ├── shared/
│   │   ├── components/
│   │   ├── utils/
│   │   └── styles/
├── vite.config.js
└── package.json
```

#### Vite 配置
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readdirSync } from 'fs'

// 自动扫描页面
function getPages() {
  const pagesDir = resolve(__dirname, 'src/pages')
  const pages = {}
  
  readdirSync(pagesDir).forEach(dir => {
    const htmlPath = resolve(pagesDir, dir, 'index.html')
    if (existsSync(htmlPath)) {
      pages[dir] = htmlPath
    }
  })
  
  return pages
}

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@shared': resolve(__dirname, 'src/shared')
    }
  },
  
  build: {
    rollupOptions: {
      input: getPages()
    }
  }
})
```

### 案例 4：库开发

#### 组件库配置
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true
    })
  ],
  
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyComponentLibrary',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`
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

#### 组件导出
```typescript
// src/index.ts
import type { App } from 'vue'
import Button from './components/Button.vue'
import Input from './components/Input.vue'
import Modal from './components/Modal.vue'

const components = [Button, Input, Modal]

export default {
  install(app: App) {
    components.forEach(component => {
      app.component(component.name, component)
    })
  }
}

export { Button, Input, Modal }
```

## 🔧 故障排除

### 常见问题和解决方案

#### 1. 依赖预构建问题
```bash
# 症状：某些包无法正确预构建
# 解决：
rm -rf node_modules/.vite
npm run dev -- --force

# 或在配置中强制包含
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    include: ['problematic-package']
  }
})
```

#### 2. 热更新不工作
```javascript
// 检查 HMR 配置
export default defineConfig({
  server: {
    hmr: {
      overlay: true
    }
  }
})

// 或禁用并重新启用
// vite.config.js
export default defineConfig({
  server: {
    hmr: false // 临时禁用测试
  }
})
```

#### 3. 路径解析问题
```javascript
// 确保路径别名配置正确
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // 避免以 / 结尾
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
})
```

#### 4. 环境变量不生效
```bash
# 检查环境变量命名（必须以 VITE_ 开头）
VITE_API_URL=http://localhost:3000  # ✅ 正确
API_URL=http://localhost:3000       # ❌ 错误

# 检查文件名
.env                    # 所有环境
.env.development        # 开发环境
.env.production         # 生产环境
```

#### 5. 构建后页面空白
```javascript
// 检查 base 配置
export default defineConfig({
  base: './', // 相对路径部署
  // 或
  base: '/my-app/' // 子路径部署
})
```

## 📈 性能优化检查清单

### 开发环境优化
- [ ] 配置依赖预构建
- [ ] 使用路径别名
- [ ] 启用 HMR
- [ ] 合理配置代理

### 构建优化
- [ ] 配置代码分割
- [ ] 启用 Tree Shaking
- [ ] 压缩代码和资源
- [ ] 生成 Source Map

### 部署优化
- [ ] 配置缓存策略
- [ ] 启用 Gzip/Brotli
- [ ] 使用 CDN
- [ ] 监控性能指标

## 🎯 学习建议

### 学习路径
1. **基础阶段**：理解 Vite 基本概念和配置
2. **实践阶段**：创建不同类型的项目
3. **进阶阶段**：学习插件开发和性能优化
4. **专家阶段**：深入源码，贡献社区

### 推荐资源
- [Vite 官方文档](https://vitejs.dev/)
- [Rollup 文档](https://rollupjs.org/)
- [esbuild 文档](https://esbuild.github.io/)
- [Vue 3 + Vite 最佳实践](https://vuejs.org/guide/best-practices/)

### 社区参与
- GitHub Issues 和讨论
- Discord 社区
- 博客文章分享
- 开源项目贡献

通过这些实战案例和指导，您应该能够熟练掌握 Vite 的使用，并在实际项目中应用最佳实践！
