# 第 1 章：TypeScript 简介与环境搭建

## 📋 本章内容

- TypeScript 是什么
- TypeScript 的优势
- 环境搭建
- 第一个 TypeScript 程序
- 编译配置

## 🎯 学习目标

完成本章学习后，你将能够：
- 理解 TypeScript 的核心概念和优势
- 搭建 TypeScript 开发环境
- 编写并编译第一个 TypeScript 程序
- 配置基本的编译选项

---

## 1.1 TypeScript 是什么？

TypeScript 是由微软开发的开源编程语言，它是 JavaScript 的超集，添加了**静态类型系统**。

### 核心特点

```typescript
// JavaScript
function greet(name) {
    return "Hello, " + name;
}

// TypeScript
function greet(name: string): string {
    return "Hello, " + name;
}
```

- **静态类型检查**：在编译时发现错误
- **现代 JavaScript 特性**：支持最新的 ECMAScript 特性
- **向下兼容**：可以逐步迁移现有 JavaScript 代码
- **强大的工具支持**：更好的 IDE 支持和代码提示

## 1.2 TypeScript 的优势

### 1. 类型安全
```typescript
// 编译时错误检查
function add(a: number, b: number): number {
    return a + b;
}

add(1, "2"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### 2. 更好的开发体验
- 智能代码补全
- 重构支持
- 导航到定义
- 实时错误提示

### 3. 渐进式采用
```typescript
// 可以混合使用 JavaScript 和 TypeScript
import { someJSFunction } from './legacy.js';

function newTSFunction(param: string): void {
    someJSFunction(param);
}
```

## 1.3 环境搭建

### 安装 Node.js
首先确保你的系统安装了 Node.js (建议 v14 以上版本)。

### 全局安装 TypeScript
```bash
npm install -g typescript
```

### 验证安装
```bash
tsc --version
```

### 项目级安装（推荐）
```bash
# 初始化项目
npm init -y

# 安装 TypeScript 和相关工具
npm install -D typescript @types/node ts-node nodemon
```

## 1.4 第一个 TypeScript 程序

### 创建文件
创建 `hello.ts` 文件：

```typescript
// hello.ts
interface Person {
    name: string;
    age: number;
}

function greetPerson(person: Person): string {
    return `Hello, ${person.name}! You are ${person.age} years old.`;
}

const user: Person = {
    name: "张三",
    age: 25
};

console.log(greetPerson(user));
```

### 编译运行
```bash
# 编译 TypeScript 文件
tsc hello.ts

# 运行生成的 JavaScript 文件
node hello.js
```

### 使用 ts-node 直接运行
```bash
# 直接运行 TypeScript 文件
npx ts-node hello.ts
```

## 1.5 TypeScript 配置文件

### 生成配置文件
```bash
tsc --init
```

### 基本 tsconfig.json 配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 重要配置选项说明

| 选项 | 作用 |
|------|------|
| `target` | 编译目标版本 |
| `module` | 模块系统 |
| `outDir` | 输出目录 |
| `rootDir` | 源码目录 |
| `strict` | 启用严格模式 |
| `sourceMap` | 生成 source map |

## 1.6 开发工具配置

### VS Code 配置
创建 `.vscode/settings.json`：

```json
{
  "typescript.preferences.quoteStyle": "single",
  "typescript.format.semicolons": "insert",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true
  }
}
```

### 任务配置
创建 `.vscode/tasks.json`：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "tsc: build",
      "type": "typescript",
      "tsconfig": "tsconfig.json",
      "group": {
        "kind": "build",
        "isDefault": true
      }
    }
  ]
}
```

## 🔧 练习题

### 练习 1：基础程序
创建一个 TypeScript 程序，定义一个学生接口，包含姓名、年龄、专业，然后创建学生对象并输出信息。

### 练习 2：函数定义
编写一个计算圆面积的函数，要求使用类型注解。

### 练习 3：配置优化
修改 tsconfig.json，添加以下配置：
- 启用严格模式
- 设置输出目录为 build
- 包含 src 目录下的所有文件

## 📚 扩展阅读

- [TypeScript 官方文档](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [VSCode TypeScript 支持](https://code.visualstudio.com/docs/languages/typescript)

## 📝 本章小结

- TypeScript 是 JavaScript 的超集，提供静态类型检查
- 可以渐进式地在现有项目中引入 TypeScript
- 合理的配置是高效开发的基础
- 良好的工具支持能大大提升开发体验

---

**下一章：[第 2 章：基础类型系统](../02-basic-types/README.md)**
