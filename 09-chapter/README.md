# TypeScript 多模块函数调用演示

本项目演示了在TypeScript中如何实现多模块之间的函数调用，包括各种导入导出模式和最佳实践。

## 项目结构

```
src/
├── main.ts          # 主程序文件，演示各种模块调用
├── mathUtils.ts     # 数学工具模块（命名导出）
├── stringUtils.ts   # 字符串工具模块（默认导出）
├── userManager.ts   # 用户管理模块（类、接口、枚举）
├── dateUtils.ts     # 日期工具模块（混合导出）
├── config.ts        # 配置模块
└── index.ts         # 索引文件（重新导出）
```

## 模块导出方式演示

### 1. 命名导出 (Named Exports) - `mathUtils.ts`
```typescript
export function add(a: number, b: number): number { ... }
export const PI = 3.14159;
```

### 2. 默认导出 (Default Export) - `stringUtils.ts`
```typescript
class StringUtils { ... }
export default StringUtils;
```

### 3. 混合导出 - `dateUtils.ts`
```typescript
export function formatDate(...) { ... }    // 命名导出
export default class DateHelper { ... }    // 默认导出
```

### 4. 类、接口、枚举导出 - `userManager.ts`
```typescript
export interface User { ... }
export enum UserRole { ... }
export class UserManager { ... }
```

## 模块导入方式演示

### 1. 命名导入
```typescript
import { add, subtract, PI } from './mathUtils';
```

### 2. 默认导入
```typescript
import StringUtils from './stringUtils';
```

### 3. 混合导入
```typescript
import DateHelper, { formatDate, getDaysDifference } from './dateUtils';
```

### 4. 命名空间导入
```typescript
import * as UserModule from './userManager';
```

### 5. 重命名导入
```typescript
import { getConfig as getAppConfig } from './config';
```

### 6. 重新导出访问
```typescript
import { Utils } from './index';
```

## 安装和运行

1. 安装依赖：
```bash
npm install
```

2. 编译TypeScript：
```bash
npm run build
```

3. 运行编译后的JavaScript：
```bash
npm start
```

4. 直接运行TypeScript（开发模式）：
```bash
npm run dev
```

## 功能演示

程序运行时会依次演示：

1. **数学运算功能** - 基本算术运算和圆面积计算
2. **字符串处理功能** - 字符串操作、回文检测、截断等
3. **用户管理功能** - 用户CRUD操作、角色管理
4. **日期时间功能** - 日期格式化、日期计算
5. **配置管理功能** - 应用配置的获取和管理
6. **统一工具访问** - 通过索引文件统一访问所有工具
7. **错误处理** - 异常捕获和处理

## 学习要点

1. **模块化设计** - 如何将功能拆分到不同模块
2. **导出模式** - 命名导出、默认导出、混合导出的使用场景
3. **导入方式** - 各种导入语法的使用方法
4. **类型安全** - TypeScript的类型检查和接口定义
5. **重新导出** - 如何创建统一的API入口
6. **错误处理** - 模块间调用的异常处理

## 最佳实践

1. 使用命名导出提供多个相关功能
2. 使用默认导出提供主要的类或功能
3. 创建索引文件统一导出模块API
4. 合理使用TypeScript类型系统
5. 提供清晰的错误处理机制
