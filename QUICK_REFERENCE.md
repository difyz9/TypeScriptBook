# TypeScript 快速参考指南

## 🚀 快速开始

### 安装 TypeScript
```bash
# 全局安装
npm install -g typescript

# 项目级安装
npm install -D typescript @types/node
```

### 基本命令
```bash
# 编译 TS 文件
tsc filename.ts

# 初始化 tsconfig.json
tsc --init

# 编译整个项目
tsc

# 监听模式
tsc --watch
```

## 📚 核心语法速览

### 基础类型
```typescript
// 基本类型
let name: string = "Alice";
let age: number = 30;
let isActive: boolean = true;

// 数组
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// 元组
let tuple: [string, number] = ["hello", 42];

// 枚举
enum Color { Red, Green, Blue }
let color: Color = Color.Red;

// 联合类型
let value: string | number = "hello";

// 字面量类型
let direction: "up" | "down" | "left" | "right" = "up";
```

### 接口
```typescript
interface User {
    readonly id: number;
    name: string;
    email?: string; // 可选属性
    [key: string]: any; // 索引签名
}

// 函数接口
interface Calculator {
    (x: number, y: number): number;
}

// 继承
interface Admin extends User {
    permissions: string[];
}
```

### 类
```typescript
class Animal {
    private name: string;
    protected age: number;
    public species: string;
    
    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    
    // 抽象方法需要在抽象类中
    makeSound(): void {
        console.log("Some sound");
    }
}

class Dog extends Animal {
    constructor(name: string, age: number) {
        super(name, age, "Dog");
    }
    
    makeSound(): void {
        console.log("Woof!");
    }
}
```

### 函数
```typescript
// 基本函数
function add(x: number, y: number): number {
    return x + y;
}

// 可选参数
function greet(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

// 默认参数
function createUser(name: string, age: number = 18): User {
    return { id: Date.now(), name, age };
}

// 剩余参数
function sum(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
}

// 函数重载
function format(value: string): string;
function format(value: number, decimals: number): string;
function format(value: any, decimals?: number): string {
    if (typeof value === "string") return value;
    return value.toFixed(decimals);
}
```

### 泛型
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 泛型接口
interface Repository<T> {
    findById(id: number): T | undefined;
    save(entity: T): T;
}

// 泛型类
class GenericRepository<T> implements Repository<T> {
    private items: T[] = [];
    
    findById(id: number): T | undefined {
        return this.items[id];
    }
    
    save(entity: T): T {
        this.items.push(entity);
        return entity;
    }
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

## 🛠️ 工具类型

### 内置工具类型
```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// Partial - 所有属性可选
type PartialUser = Partial<User>;

// Required - 所有属性必需
type RequiredUser = Required<User>;

// Pick - 选择属性
type UserSummary = Pick<User, "id" | "name">;

// Omit - 排除属性
type UserWithoutId = Omit<User, "id">;

// Record - 创建记录类型
type UserRoles = Record<"admin" | "user" | "guest", string[]>;

// ReturnType - 获取函数返回类型
function getUser(): User { /* ... */ }
type GetUserReturn = ReturnType<typeof getUser>; // User
```

### 高级类型
```typescript
// 条件类型
type IsString<T> = T extends string ? true : false;

// 映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 模板字面量类型
type EventName = `on${Capitalize<string>}`;
type ApiEndpoint = `/api/v${number}/${string}`;
```

## 🔧 配置文件

### tsconfig.json 常用配置
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020", "DOM"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "sourceMap": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## 📖 最佳实践

### 1. 类型定义
```typescript
// ✅ 推荐：明确的类型定义
interface UserConfig {
    theme: "light" | "dark";
    language: "en" | "zh" | "es";
    notifications: {
        email: boolean;
        push: boolean;
    };
}

// ❌ 避免：过度使用 any
function processData(data: any): any {
    return data;
}

// ✅ 推荐：使用泛型
function processData<T>(data: T): T {
    return data;
}
```

### 2. 错误处理
```typescript
// ✅ 推荐：使用联合类型处理错误
type Result<T, E = Error> = 
    | { success: true; data: T }
    | { success: false; error: E };

async function fetchUser(id: number): Promise<Result<User>> {
    try {
        const user = await api.getUser(id);
        return { success: true, data: user };
    } catch (error) {
        return { success: false, error: error as Error };
    }
}
```

### 3. 类型保护
```typescript
// 类型谓词
function isString(value: unknown): value is string {
    return typeof value === "string";
}

// 使用类型保护
function processValue(value: unknown) {
    if (isString(value)) {
        // value 现在是 string 类型
        console.log(value.toUpperCase());
    }
}
```

## 🚨 常见陷阱

### 1. 类型断言滥用
```typescript
// ❌ 危险：强制类型断言
const user = data as User;

// ✅ 安全：类型保护
function isUser(obj: unknown): obj is User {
    return typeof obj === "object" && obj !== null &&
           typeof (obj as User).id === "number";
}

if (isUser(data)) {
    // data 现在安全地是 User 类型
}
```

### 2. 忽略 null/undefined
```typescript
// ❌ 可能出错
function getName(user: User | null): string {
    return user.name; // 可能报错
}

// ✅ 安全处理
function getName(user: User | null): string {
    return user?.name ?? "Unknown";
}
```

## 📊 调试技巧

### 类型检查
```typescript
// 检查类型是否匹配
type AssertEqual<T, U> = T extends U ? (U extends T ? true : false) : false;
type Test = AssertEqual<string, string>; // true

// 查看推断的类型
const example = { name: "Alice", age: 30 };
type ExampleType = typeof example; // { name: string; age: number; }
```

### 编译器指令
```typescript
// @ts-expect-error - 期望下一行有错误
// @ts-ignore - 忽略下一行的错误（不推荐）
// @ts-nocheck - 跳过整个文件的检查
```

## 🔗 常用命令

```bash
# 类型检查（不生成文件）
tsc --noEmit

# 生成声明文件
tsc --declaration

# 严格模式编译
tsc --strict

# 查看编译选项
tsc --help

# 查看版本
tsc --version
```

---

*这份快速参考指南涵盖了 TypeScript 的核心概念和常用模式，建议收藏备用！📌*
