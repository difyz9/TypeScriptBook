# 第 3 章：变量声明与作用域

## 📋 本章内容

- var、let、const 的区别
- 作用域和块级作用域
- 变量提升
- 解构赋值
- 展开语法
- 类型推断

## 🎯 学习目标

完成本章学习后，你将能够：
- 理解不同变量声明方式的差异
- 掌握 TypeScript 的作用域规则
- 熟练使用解构赋值和展开语法
- 理解 TypeScript 的类型推断机制

---

## 3.1 变量声明方式

### 3.1.1 var 声明
```typescript
var a: number = 10;

function f() {
    var message = "Hello, world!";
    return message;
}

// var 的问题：函数作用域
function sumMatrix(matrix: number[][]) {
    var sum = 0;
    for (var i = 0; i < matrix.length; i++) {
        var currentRow = matrix[i];
        for (var i = 0; i < currentRow.length; i++) {
            sum += currentRow[i];
        }
    }
    return sum;
}
// 这里内层循环的 i 会覆盖外层的 i，导致错误
```

### 3.1.2 let 声明
```typescript
let hello = "Hello!";

// 块级作用域
function city() {
    let getCity;
    
    if (true) {
        let city = "Seattle";
        getCity = function() {
            return city;
        }
    }
    
    return getCity();
}

// 修复上面的矩阵求和问题
function sumMatrix(matrix: number[][]) {
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
        let currentRow = matrix[i];
        for (let j = 0; j < currentRow.length; j++) {
            sum += currentRow[j];
        }
    }
    return sum;
}
```

### 3.1.3 const 声明
```typescript
const kitty = {
    name: "Aurora",
    numLives: 9,
};

// const 变量不能重新赋值
// kitty = {}; // Error

// 但是可以修改对象的属性
kitty.name = "Rory";
kitty.numLives--;

// 对于基本类型，const 是完全不可变的
const pi: number = 3.14159;
// pi = 3.14; // Error

// 数组也可以修改内容
const numbers: number[] = [1, 2, 3];
numbers.push(4); // 允许
// numbers = []; // Error
```

## 3.2 作用域详解

### 3.2.1 块级作用域
```typescript
function theCityThatAlwaysSleeps() {
    let getCity;

    if (true) {
        let city = "Seattle";
        getCity = () => city;
    }

    return getCity();
}

// 暂时性死区
function temporalDeadZone() {
    // console.log(x); // Error: Cannot access 'x' before initialization
    let x = 10;
    console.log(x); // 10
}
```

### 3.2.2 函数作用域 vs 块级作用域
```typescript
// var：函数作用域
function varScope() {
    if (true) {
        var x = 10;
    }
    console.log(x); // 10，可以访问
}

// let/const：块级作用域
function letScope() {
    if (true) {
        let y = 10;
    }
    // console.log(y); // Error: 'y' is not defined
}
```

### 3.2.3 循环中的作用域
```typescript
// var 在循环中的问题
for (var i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 100 * i);
}
// 输出 10 个 10

// let 解决方案
for (let i = 0; i < 10; i++) {
    setTimeout(() => console.log(i), 100 * i);
}
// 输出 0, 1, 2, ..., 9
```

## 3.3 解构赋值

### 3.3.1 数组解构
```typescript
let input: [number, number] = [1, 2];
let [first, second] = input;
console.log(first); // 1
console.log(second); // 2

// 等价于
first = input[0];
second = input[1];

// 交换变量
[first, second] = [second, first];

// 函数参数解构
function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1, 2]);

// 剩余元素
let [head, ...rest] = [1, 2, 3, 4];
console.log(head); // 1
console.log(rest); // [2, 3, 4]

// 忽略某些元素
let [, , third] = [1, 2, 3];
console.log(third); // 3
```

### 3.3.2 对象解构
```typescript
let obj = {
    a: "foo",
    b: 12,
    c: "bar"
};

let { a, b } = obj;
// 等价于
// let a = obj.a;
// let b = obj.b;

// 重命名
let { a: newName1, b: newName2 } = obj;

// 带类型注解的解构
let { a, b }: { a: string, b: number } = obj;

// 默认值
function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

// 嵌套解构
let nested = {
    person: {
        name: "Alice",
        age: 30
    },
    city: "New York"
};

let { person: { name, age }, city } = nested;
console.log(name, age, city); // Alice 30 New York
```

### 3.3.3 函数参数解构
```typescript
interface User {
    id: number;
    name: string;
    email?: string;
}

// 参数解构
function greetUser({ name, email = "未提供" }: User) {
    console.log(`Hello, ${name}! Email: ${email}`);
}

greetUser({ id: 1, name: "Alice" });
// 输出: Hello, Alice! Email: 未提供

// 复杂的参数解构
type C = { a: string, b?: number }

function complexDestructuring({ a, b }: C): void;
function complexDestructuring({ a, b = 0 } = { a: "" }): void {
    console.log(a, b);
}

complexDestructuring({ a: "yes" }); // yes 0
complexDestructuring(); // "" 0
```

## 3.4 展开语法

### 3.4.1 数组展开
```typescript
let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
// [0, 1, 2, 3, 4, 5]

// 浅拷贝
let copy = [...first];

// 函数调用
function sum(x: number, y: number, z: number): number {
    return x + y + z;
}

let args: [number, number, number] = [1, 2, 3];
let result = sum(...args);
```

### 3.4.2 对象展开
```typescript
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
// { food: "rich", price: "$$", ambiance: "noisy" }

// 对象展开的顺序很重要
let overrides = { food: "rich", ...defaults };
// { food: "spicy", price: "$$", ambiance: "noisy" }

// 实际应用：更新对象
interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
}

function toggleTodo(todo: TodoItem): TodoItem {
    return {
        ...todo,
        completed: !todo.completed
    };
}

// 嵌套对象展开
let nestedObject = {
    user: {
        name: "Alice",
        preferences: {
            theme: "dark",
            language: "zh"
        }
    },
    settings: {
        notifications: true
    }
};

// 浅拷贝
let shallowCopy = { ...nestedObject };

// 深层更新需要嵌套展开
let updatedNested = {
    ...nestedObject,
    user: {
        ...nestedObject.user,
        preferences: {
            ...nestedObject.user.preferences,
            theme: "light"
        }
    }
};
```

## 3.5 类型推断

### 3.5.1 基本类型推断
```typescript
// TypeScript 可以推断变量类型
let x = 3; // x: number
let y = "hello"; // y: string
let z = true; // z: boolean

// 数组类型推断
let numbers = [1, 2, 3]; // number[]
let strings = ["a", "b", "c"]; // string[]
let mixed = [1, "a", true]; // (string | number | boolean)[]

// 函数返回类型推断
function add(a: number, b: number) {
    return a + b; // 推断返回类型为 number
}

// 上下文类型推断
window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.button); // TypeScript 知道 mouseEvent 是 MouseEvent
    // console.log(mouseEvent.kangaroo); // Error
};
```

### 3.5.2 最佳通用类型
```typescript
// TypeScript 会选择最佳通用类型
let zoo = [new Rhino(), new Elephant(), new Snake()];
// 类型为 (Rhino | Elephant | Snake)[]

// 如果没有找到最佳通用类型，推断为联合类型
let array = [1, "hello", true]; // (string | number | boolean)[]

// 指定更具体的类型
class Animal {
    name: string;
}

class Dog extends Animal {
    breed: string;
}

class Cat extends Animal {
    color: string;
}

// 显式指定类型
let animals: Animal[] = [new Dog(), new Cat()];
```

### 3.5.3 上下文推断
```typescript
// 函数表达式的上下文推断
const handler: (event: Event) => void = (e) => {
    // e 的类型从上下文推断为 Event
    console.log(e.target);
};

// 对象字面量的上下文推断
interface Options {
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
}

const options: Options = {
    onSuccess: (data) => { // data 类型为 any
        console.log(data);
    },
    onError: (error) => { // error 类型为 Error
        console.error(error.message);
    }
};
```

## 3.6 const 断言

### 3.6.1 基本用法
```typescript
// 普通推断
let arr1 = [1, 2, 3]; // number[]

// const 断言
let arr2 = [1, 2, 3] as const; // readonly [1, 2, 3]

// 对象的 const 断言
let obj1 = { x: 1, y: 2 }; // { x: number; y: number; }
let obj2 = { x: 1, y: 2 } as const; // { readonly x: 1; readonly y: 2; }

// 字符串字面量
let str1 = "hello"; // string
let str2 = "hello" as const; // "hello"
```

### 3.6.2 实际应用
```typescript
// 配置对象
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retryAttempts: 3
} as const;
// 类型：{ readonly apiUrl: "https://api.example.com"; readonly timeout: 5000; readonly retryAttempts: 3; }

// 枚举值数组
const COLORS = ["red", "green", "blue"] as const;
type Color = typeof COLORS[number]; // "red" | "green" | "blue"

// 函数参数限制
function setTheme(color: Color) {
    // 只能传入 "red" | "green" | "blue"
}

setTheme("red"); // OK
// setTheme("yellow"); // Error
```

## 🔧 练习题

### 练习 1：解构赋值
```typescript
// 给定以下数据结构，使用解构赋值提取所需信息
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
```

### 练习 2：展开语法应用
```typescript
// 实现一个函数，合并多个配置对象
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

// 实现 mergeConfigs 函数
function mergeConfigs(...configs: Config[]): Config {
    // 你的实现
}

// 测试
const userConfig = { debug: true };
const envConfig = { apiUrl: "https://dev-api.example.com" };
const finalConfig = mergeConfigs(defaultConfig, userConfig, envConfig);
```

### 练习 3：类型推断
```typescript
// 分析以下代码的类型推断结果
const data = {
    users: [
        { id: 1, name: "Alice", active: true },
        { id: 2, name: "Bob", active: false }
    ],
    meta: {
        total: 2,
        page: 1
    }
};

// 写出每个属性的推断类型
```

## 📚 扩展阅读

- [Variable Declarations - TypeScript](https://www.typescriptlang.org/docs/handbook/variable-declarations.html)
- [Type Inference - TypeScript](https://www.typescriptlang.org/docs/handbook/type-inference.html)
- [const assertions - TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

## 📝 本章小结

- 使用 `let` 和 `const` 而不是 `var` 来获得块级作用域
- 解构赋值提供了简洁的语法来提取数组和对象中的值
- 展开语法是复制和合并数据结构的强大工具
- TypeScript 的类型推断能够在大多数情况下自动推断正确的类型
- `const` 断言可以获得更精确的字面量类型

---

**下一章：[第 4 章：接口 (Interfaces)](../04-interfaces/README.md)**
