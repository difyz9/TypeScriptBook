# TypeScript 练习题合集

## 第 1 章练习

### 练习 1：基础程序
创建一个 TypeScript 程序，定义一个学生接口，包含姓名、年龄、专业，然后创建学生对象并输出信息。

```typescript
// 在这里编写你的代码
interface Student {
    // 定义学生接口
}

function displayStudent(student: Student): void {
    // 实现显示学生信息的函数
}

// 创建学生对象并测试
```

### 练习 2：函数定义
编写一个计算圆面积的函数，要求使用类型注解。

```typescript
// 在这里编写你的代码
```

## 第 2 章练习

### 练习 1：基础类型使用
定义一个学生信息的接口，包含以下字段：
- id: 数字
- name: 字符串
- age: 数字
- isActive: 布尔值
- subjects: 字符串数组
- grade: 可选的数字

```typescript
// 在这里编写你的代码
```

### 练习 2：枚举应用
创建一个表示星期的枚举，实现一个函数判断是否为工作日。

```typescript
// 在这里编写你的代码
```

### 练习 3：类型安全
使用 unknown 类型重写以下不安全的代码：

```typescript
function processValue(value: any) {
    return value.toString().toUpperCase();
}

// 重写为类型安全的版本
function safeProcessValue(value: unknown): string {
    // 在这里编写你的代码
}
```

## 第 3 章练习

### 练习 1：解构赋值
给定以下数据结构，使用解构赋值提取所需信息：

```typescript
const user = {
    id: 1,
    profile: {
        name: "Alice",
        age: 30,
        address: {
            city: "Beijing",
            country: "China"
        }
    },
    preferences: {
        theme: "dark",
        language: "zh"
    }
};

// 提取 name, age, city 到单独的变量
// 提取 theme，并重命名为 userTheme
// 为 language 设置默认值 "en"

// 在这里编写你的解构代码
```

### 练习 2：展开语法应用
实现一个函数，合并多个配置对象：

```typescript
interface Config {
    debug?: boolean;
    apiUrl?: string;
    timeout?: number;
}

const defaultConfig: Config = {
    debug: false,
    apiUrl: "https://api.example.com",
    timeout: 5000
};

function mergeConfigs(...configs: Config[]): Config {
    // 在这里编写你的实现
}

// 测试
const userConfig = { debug: true };
const envConfig = { apiUrl: "https://dev-api.example.com" };
const finalConfig = mergeConfigs(defaultConfig, userConfig, envConfig);
```

## 第 4 章练习

### 练习 1：设计用户管理接口
设计一套用户管理的接口系统，要求包含：
1. 基础用户信息接口
2. 管理员用户接口（继承基础用户）
3. 用户操作接口（增删改查）
4. 用户认证接口

```typescript
// 在这里编写你的接口设计
```

### 练习 2：配置系统接口
设计一个应用配置系统，要求：
1. 支持嵌套配置
2. 某些配置项是只读的
3. 支持动态添加配置项
4. 提供配置验证函数类型

```typescript
// 在这里编写你的接口设计
```

## 第 5 章练习

### 练习 1：设计图形类层次
设计一个图形类层次结构：
1. 抽象基类 Shape
2. 具体图形类：Circle, Rectangle, Triangle
3. 实现计算面积、周长的方法
4. 添加绘制功能接口

```typescript
// 在这里编写你的类设计
```

### 练习 2：实现简单的银行账户系统
设计银行账户系统：
1. 基础账户类 Account
2. 储蓄账户 SavingsAccount（有利息）
3. 支票账户 CheckingAccount（可透支）
4. 实现存款、取款、查询余额等功能

```typescript
// 在这里编写你的类设计
```

## 第 6 章练习

### 练习 1：实现函数重载
实现一个 format 函数，支持多种重载：
- format(date: Date): string - 格式化日期
- format(number: number, decimals: number): string - 格式化数字
- format(template: string, ...args: any[]): string - 字符串模板

```typescript
// 在这里编写你的函数重载
```

### 练习 2：创建高阶函数
实现一个 debounce 函数：
- 延迟执行函数
- 在延迟期间再次调用会重置计时器
- 支持泛型和正确的类型推导

```typescript
// 在这里编写你的 debounce 实现
```

## 第 7 章练习

### 练习 1：创建工具类型
创建以下工具类型：
1. DeepPartial<T> - 深度可选
2. DeepReadonly<T> - 深度只读
3. RequiredByKeys<T, K> - 指定键变为必需
4. PickByType<T, U> - 按类型选择属性

```typescript
// 在这里编写你的工具类型
```

### 练习 2：类型安全的事件系统
实现一个类型安全的事件发射器：
1. 支持定义事件类型映射
2. 确保事件名和数据类型匹配
3. 支持一次性监听器

```typescript
// 在这里编写你的事件系统
```

## 答案提示

> 💡 **提示：** 完成练习后，可以参考各章节的示例代码来验证你的答案。记住，TypeScript 的强大之处在于类型安全，确保你的代码能够通过类型检查。

## 运行练习

要运行这些练习：

1. 安装依赖：
```bash
npm install
```

2. 编译 TypeScript：
```bash
npm run build
```

3. 运行代码：
```bash
npm start
```

4. 开发模式（自动重启）：
```bash
npm run dev
```
