# 第 2 章：基础类型系统

## 📋 本章内容

- 基本数据类型
- 数组和元组
- 枚举类型
- any 和 unknown 类型
- void 和 never 类型
- 类型断言

## 🎯 学习目标

完成本章学习后，你将能够：
- 熟练使用 TypeScript 的基础类型
- 理解各种类型的使用场景
- 掌握类型断言的正确用法
- 避免常见的类型错误

---

## 2.1 基本数据类型

### 2.1.1 布尔值 (boolean)
```typescript
let isDone: boolean = false;
let isActive: boolean = true;

// 函数返回布尔值
function isEven(num: number): boolean {
    return num % 2 === 0;
}
```

### 2.1.2 数字 (number)
```typescript
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;

// 浮点数
let pi: number = 3.14;
let e: number = 2.718;
```

### 2.1.3 字符串 (string)
```typescript
let color: string = "blue";
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;

// 多行字符串
let multiline: string = `
    这是一个
    多行字符串
    示例
`;
```

### 2.1.4 Symbol 和 BigInt
```typescript
// Symbol
let sym1: symbol = Symbol("key");
let sym2: symbol = Symbol("key");
console.log(sym1 === sym2); // false

// BigInt
let big1: bigint = 100n;
let big2: bigint = BigInt(100);
```

## 2.2 数组类型

### 2.2.1 基本数组声明
```typescript
// 方式一：类型[]
let list: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob", "Charlie"];

// 方式二：Array<类型>
let scores: Array<number> = [95, 87, 92];
let colors: Array<string> = ["red", "green", "blue"];
```

### 2.2.2 多维数组
```typescript
// 二维数组
let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// 混合类型数组
let mixedArray: (string | number)[] = ["hello", 42, "world", 100];
```

### 2.2.3 只读数组
```typescript
let readonlyArray: ReadonlyArray<number> = [1, 2, 3];
// readonlyArray.push(4); // Error: Property 'push' does not exist

let readonlyNumbers: readonly number[] = [1, 2, 3];
// readonlyNumbers[0] = 4; // Error: Index signature in type 'readonly number[]' only permits reading
```

## 2.3 元组 (Tuple)

### 2.3.1 基本元组
```typescript
// 声明一个元组类型
let x: [string, number];

// 正确的初始化
x = ["hello", 10];

// 错误的初始化
// x = [10, "hello"]; // Error: Type 'number' is not assignable to type 'string'

console.log(x[0]); // "hello"
console.log(x[1]); // 10
```

### 2.3.2 可选元组元素
```typescript
let tuple: [string, number?] = ["hello"];
tuple = ["hello", 42];

// 具名元组
type StringNumberPair = [first: string, second: number];
let pair: StringNumberPair = ["hello", 42];
```

### 2.3.3 剩余元素
```typescript
type RestTuple = [string, ...number[]];
let restTuple: RestTuple = ["hello", 1, 2, 3, 4];
```

## 2.4 枚举 (Enum)

### 2.4.1 数字枚举
```typescript
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}

// 使用枚举
let dir: Direction = Direction.Up;
console.log(dir); // 0

// 手动设置起始值
enum Status {
    Pending = 1,
    Approved, // 2
    Rejected  // 3
}
```

### 2.4.2 字符串枚举
```typescript
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;
console.log(favoriteColor); // "BLUE"

// 实际应用示例
enum HttpStatus {
    OK = "200",
    NotFound = "404",
    InternalServerError = "500"
}

function handleResponse(status: HttpStatus) {
    switch (status) {
        case HttpStatus.OK:
            console.log("请求成功");
            break;
        case HttpStatus.NotFound:
            console.log("资源未找到");
            break;
        case HttpStatus.InternalServerError:
            console.log("服务器错误");
            break;
    }
}
```

### 2.4.3 常量枚举
```typescript
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

// 编译后会被内联
let directions = [Directions.Up, Directions.Down];
// 编译结果：let directions = [0, 1];
```

## 2.5 Any 和 Unknown 类型

### 2.5.1 any 类型
```typescript
// any 类型可以绕过类型检查
let value: any = 42;
value = "hello";
value = true;
value = { name: "Alice" };
value.foo.bar; // 不会报错，但运行时可能出错

// 从第三方库迁移时的临时方案
function legacyFunction(): any {
    return JSON.parse('{"name": "Alice"}');
}
```

### 2.5.2 unknown 类型
```typescript
// unknown 是类型安全的 any
let value: unknown = 42;
value = "hello";
value = true;

// 必须进行类型检查才能使用
if (typeof value === "string") {
    console.log(value.toUpperCase()); // 安全
}

// 类型守卫函数
function isString(value: unknown): value is string {
    return typeof value === "string";
}

if (isString(value)) {
    console.log(value.length); // TypeScript 知道这里 value 是 string
}
```

## 2.6 Void 和 Never 类型

### 2.6.1 void 类型
```typescript
// 没有返回值的函数
function warnUser(): void {
    console.log("This is my warning message");
}

// void 类型的变量只能赋值 undefined 或 null
let unusable: void = undefined;
```

### 2.6.2 never 类型
```typescript
// 永远不会返回的函数
function error(message: string): never {
    throw new Error(message);
}

// 无限循环
function infiniteLoop(): never {
    while (true) {
        console.log("无限循环");
    }
}

// 在联合类型中的应用
type Shape = "circle" | "square";

function getArea(shape: Shape): number {
    switch (shape) {
        case "circle":
            return Math.PI;
        case "square":
            return 4;
        default:
            // 这里的 shape 是 never 类型
            const exhaustiveCheck: never = shape;
            throw new Error(`未处理的形状: ${exhaustiveCheck}`);
    }
}
```

## 2.7 类型断言

### 2.7.1 角括号语法
```typescript
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### 2.7.2 as 语法（推荐）
```typescript
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// DOM 元素类型断言
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
```

### 2.7.3 非空断言操作符
```typescript
function liveDangerously(x?: number | null) {
    // 我们确信 x 不是 null 或 undefined
    console.log(x!.toFixed());
}

// 实际应用
interface User {
    id: number;
    name: string;
}

let user: User | null = getUser();
// 如果我们确信 user 不为 null
console.log(user!.name);
```

## 2.8 类型联合与交叉

### 2.8.1 联合类型
```typescript
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

printId("abc"); // "ABC"
printId(123.456); // "123.46"
```

### 2.8.2 交叉类型
```typescript
interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    email: string;
}

type Customer = BusinessPartner & Identity;

const customer: Customer = {
    name: "Alice",
    credit: 1000,
    id: 1,
    email: "alice@example.com"
};
```

## 🔧 练习题

### 练习 1：基础类型使用
```typescript
// 定义一个学生信息的接口，包含以下字段：
// - id: 数字
// - name: 字符串
// - age: 数字
// - isActive: 布尔值
// - subjects: 字符串数组
// - grade: 可选的数字

// 创建几个学生对象并实现相关函数
```

### 练习 2：枚举应用
```typescript
// 创建一个表示星期的枚举
// 实现一个函数判断是否为工作日
```

### 练习 3：类型安全
```typescript
// 使用 unknown 类型重写以下不安全的代码：
function processValue(value: any) {
    return value.toString().toUpperCase();
}
```

## 📚 扩展阅读

- [TypeScript 基础类型文档](https://www.typescriptlang.org/docs/handbook/basic-types.html)
- [类型断言最佳实践](https://basarat.gitbook.io/typescript/type-system/type-assertion)
- [枚举的最佳实践](https://www.typescriptlang.org/docs/handbook/enums.html)

## 📝 本章小结

- TypeScript 提供了丰富的基础类型系统
- 合理使用 `unknown` 而不是 `any` 可以保证类型安全
- 枚举类型可以让代码更易读和维护
- 类型断言要谨慎使用，确保运行时的类型安全
- 联合类型和交叉类型提供了强大的类型组合能力

---

**下一章：[第 3 章：变量声明与作用域](../03-variables/README.md)**
