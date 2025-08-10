# 第 6 章：函数

## 📋 本章内容

- 函数声明与表达式
- 函数类型
- 可选参数与默认参数
- 剩余参数
- 函数重载
- this 参数
- 箭头函数
- 高阶函数与泛型函数

## 🎯 学习目标

完成本章学习后，你将能够：
- 熟练使用 TypeScript 的函数特性
- 理解函数类型系统
- 掌握函数重载和泛型函数
- 正确处理 this 上下文

---

## 6.1 函数基础

### 6.1.1 函数声明
```typescript
// 具名函数
function add(x: number, y: number): number {
    return x + y;
}

// 匿名函数
let myAdd = function(x: number, y: number): number {
    return x + y;
};

// 箭头函数
let myAdd2 = (x: number, y: number): number => x + y;
```

### 6.1.2 函数类型
```typescript
// 完整的函数类型
let myAdd: (x: number, y: number) => number = 
    function(x: number, y: number): number { return x + y; };

// 类型推断
let myAdd2 = function(x: number, y: number): number { return x + y; };

// 使用类型别名
type AddFunction = (x: number, y: number) => number;
let myAdd3: AddFunction = (x, y) => x + y;

// 接口定义函数类型
interface MathOperation {
    (x: number, y: number): number;
}

let add: MathOperation = (x, y) => x + y;
let multiply: MathOperation = (x, y) => x * y;
```

## 6.2 可选参数与默认参数

### 6.2.1 可选参数
```typescript
function buildName(firstName: string, lastName?: string): string {
    if (lastName) {
        return firstName + " " + lastName;
    } else {
        return firstName;
    }
}

let result1 = buildName("Bob");
let result2 = buildName("Bob", "Adams");
// let result3 = buildName("Bob", "Adams", "Sr."); // Error: 参数过多
```

### 6.2.2 默认参数
```typescript
function buildName2(firstName: string, lastName: string = "Smith"): string {
    return firstName + " " + lastName;
}

let result1 = buildName2("Bob");                  // "Bob Smith"
let result2 = buildName2("Bob", undefined);       // "Bob Smith"
let result3 = buildName2("Bob", "Johnson");       // "Bob Johnson"

// 默认参数可以在前面
function greet(greeting: string = "Hello", name: string): string {
    return `${greeting}, ${name}!`;
}

let greeting1 = greet(undefined, "Alice");  // "Hello, Alice!"
let greeting2 = greet("Hi", "Bob");         // "Hi, Bob!"
```

### 6.2.3 复杂的默认参数
```typescript
interface RequestOptions {
    timeout?: number;
    retries?: number;
    headers?: Record<string, string>;
}

function makeRequest(
    url: string, 
    options: RequestOptions = {}
): Promise<Response> {
    const {
        timeout = 5000,
        retries = 3,
        headers = {}
    } = options;
    
    console.log(`Making request to ${url} with timeout ${timeout}ms`);
    
    // 模拟请求
    return Promise.resolve(new Response());
}

// 使用示例
makeRequest("https://api.example.com/users");
makeRequest("https://api.example.com/users", { timeout: 10000 });
```

## 6.3 剩余参数

### 6.3.1 基本剩余参数
```typescript
function buildName(firstName: string, ...restOfName: string[]): string {
    return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
console.log(employeeName); // "Joseph Samuel Lucas MacKinzie"

// 数字求和函数
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum()); // 0
console.log(sum(42)); // 42
```

### 6.3.2 剩余参数的类型约束
```typescript
// 混合参数类型
function logMessage(level: string, ...messages: (string | number)[]): void {
    console.log(`[${level}]`, ...messages);
}

logMessage("INFO", "User logged in", 123, "from IP", "192.168.1.1");

// 元组形式的剩余参数
function processData(
    action: string,
    ...data: [string, number, boolean]
): void {
    const [name, age, isActive] = data;
    console.log(`${action}: ${name}, ${age}, ${isActive}`);
}

processData("CREATE", "Alice", 30, true);
```

## 6.4 函数重载

### 6.4.1 基本函数重载
```typescript
// 重载签名
function reverse(x: string): string;
function reverse(x: number): number;
function reverse(x: boolean): boolean;

// 实现签名
function reverse(x: string | number | boolean): string | number | boolean {
    if (typeof x === "string") {
        return x.split("").reverse().join("");
    } else if (typeof x === "number") {
        return Number(x.toString().split("").reverse().join(""));
    } else {
        return !x;
    }
}

console.log(reverse("hello"));  // "olleh"
console.log(reverse(12345));    // 54321
console.log(reverse(true));     // false
```

### 6.4.2 复杂函数重载
```typescript
interface User {
    id: number;
    name: string;
    email: string;
}

// 重载：根据不同参数类型返回不同结果
function getUser(id: number): User | undefined;
function getUser(email: string): User | undefined;
function getUser(criteria: { name: string }): User[];
function getUser(param: number | string | { name: string }): User | User[] | undefined {
    if (typeof param === "number") {
        // 根据 ID 查找
        return users.find(user => user.id === param);
    } else if (typeof param === "string") {
        // 根据邮箱查找
        return users.find(user => user.email === param);
    } else {
        // 根据姓名查找（可能有多个结果）
        return users.filter(user => user.name === param.name);
    }
}

const users: User[] = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Alice", email: "alice2@example.com" }
];

const user1 = getUser(1);                           // User | undefined
const user2 = getUser("alice@example.com");         // User | undefined
const users3 = getUser({ name: "Alice" });          // User[]
```

### 6.4.3 构造函数重载
```typescript
class Point {
    x: number;
    y: number;
    
    constructor(x: number, y: number);
    constructor(xy: { x: number; y: number });
    constructor(xOrXY: number | { x: number; y: number }, y?: number) {
        if (typeof xOrXY === "number") {
            this.x = xOrXY;
            this.y = y!;
        } else {
            this.x = xOrXY.x;
            this.y = xOrXY.y;
        }
    }
}

const point1 = new Point(1, 2);
const point2 = new Point({ x: 3, y: 4 });
```

## 6.5 this 参数

### 6.5.1 指定 this 类型
```typescript
interface Card {
    suit: string;
    card: number;
}

interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    
    // 确保 this 指向 Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            
            return {
                suit: this.suits[pickedSuit],
                card: pickedCard % 13
            };
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();
console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
```

### 6.5.2 this 参数在回调函数中的应用
```typescript
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
    info: string = "Handler info";
    
    // 错误：this 会指向调用时的上下文
    onClickBad(e: Event) {
        // this.info; // Error: 'this' context of type 'void' is not assignable
    }
    
    // 正确：使用箭头函数绑定 this
    onClickGood = (e: Event) => {
        this.info; // OK: this 指向 Handler 实例
    }
}

let h = new Handler();
let uiElement: UIElement = {
    addClickListener: function(onclick) {
        // 模拟点击事件
        onclick(new Event("click"));
    }
};

// uiElement.addClickListener(h.onClickBad); // Error
uiElement.addClickListener(h.onClickGood); // OK
```

## 6.6 泛型函数

### 6.6.1 基本泛型函数
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用泛型函数
let output = identity<string>("myString");
let output2 = identity("myString"); // 类型推断

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // OK: 现在知道 arg 有 length 属性
    return arg;
}

loggingIdentity("hello");     // OK: string 有 length
loggingIdentity([1, 2, 3]);   // OK: array 有 length
// loggingIdentity(3);        // Error: number 没有 length
```

### 6.6.2 多个泛型参数
```typescript
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

let swapped = swap([1, "hello"]); // [string, number]

// 键值对映射
function mapObject<K extends string | number, V, R>(
    obj: Record<K, V>,
    mapper: (value: V, key: K) => R
): Record<K, R> {
    const result = {} as Record<K, R>;
    for (const key in obj) {
        result[key] = mapper(obj[key], key);
    }
    return result;
}

const numbers = { a: 1, b: 2, c: 3 };
const doubled = mapObject(numbers, (value, key) => value * 2);
console.log(doubled); // { a: 2, b: 4, c: 6 }
```

### 6.6.3 条件类型与泛型函数
```typescript
// 条件类型
type ApiResponse<T> = T extends string 
    ? { message: T } 
    : T extends number 
    ? { count: T } 
    : { data: T };

function processApiResponse<T>(input: T): ApiResponse<T> {
    if (typeof input === "string") {
        return { message: input } as ApiResponse<T>;
    } else if (typeof input === "number") {
        return { count: input } as ApiResponse<T>;
    } else {
        return { data: input } as ApiResponse<T>;
    }
}

const stringResponse = processApiResponse("Hello"); // { message: string }
const numberResponse = processApiResponse(42);      // { count: number }
const objectResponse = processApiResponse({ id: 1 }); // { data: { id: number } }
```

## 6.7 高阶函数

### 6.7.1 函数作为参数
```typescript
// 高阶函数：接受函数作为参数
function withRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
): Promise<T> {
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i <= maxRetries; i++) {
            try {
                const result = await operation();
                resolve(result);
                return;
            } catch (error) {
                if (i === maxRetries) {
                    reject(error);
                    return;
                }
                await new Promise(res => setTimeout(res, delay));
            }
        }
    });
}

// 使用示例
async function fetchData(): Promise<string> {
    // 模拟可能失败的网络请求
    if (Math.random() > 0.7) {
        return "Success!";
    } else {
        throw new Error("Network error");
    }
}

withRetry(fetchData, 5, 500)
    .then(result => console.log(result))
    .catch(error => console.error(error));
```

### 6.7.2 函数作为返回值
```typescript
// 柯里化函数
function curry<A, B, C>(fn: (a: A, b: B) => C): (a: A) => (b: B) => C {
    return (a: A) => (b: B) => fn(a, b);
}

// 原始函数
function add(x: number, y: number): number {
    return x + y;
}

// 柯里化后的函数
const curriedAdd = curry(add);
const add5 = curriedAdd(5);

console.log(add5(3)); // 8
console.log(add5(7)); // 12

// 创建特定功能的函数
function createValidator<T>(
    validate: (value: T) => boolean,
    errorMessage: string
): (value: T) => { isValid: boolean; error?: string } {
    return (value: T) => {
        const isValid = validate(value);
        return isValid ? { isValid: true } : { isValid: false, error: errorMessage };
    };
}

const validateEmail = createValidator(
    (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    "Invalid email format"
);

const validateAge = createValidator(
    (age: number) => age >= 0 && age <= 150,
    "Age must be between 0 and 150"
);

console.log(validateEmail("test@example.com")); // { isValid: true }
console.log(validateAge(200)); // { isValid: false, error: "Age must be between 0 and 150" }
```

## 6.8 异步函数

### 6.8.1 Promise 类型
```typescript
// 异步函数返回 Promise
async function fetchUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch user ${id}`);
    }
    return response.json();
}

// Promise 工具函数
function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), ms)
        )
    ]);
}

// 使用示例
timeout(fetchUser(1), 5000)
    .then(user => console.log(user))
    .catch(error => console.error(error));
```

### 6.8.2 泛型异步函数
```typescript
interface CacheEntry<T> {
    value: T;
    expiry: number;
}

class AsyncCache<T> {
    private cache = new Map<string, CacheEntry<T>>();
    
    async get<K extends string>(
        key: K, 
        fetcher: () => Promise<T>, 
        ttl: number = 60000
    ): Promise<T> {
        const now = Date.now();
        const entry = this.cache.get(key);
        
        if (entry && entry.expiry > now) {
            return entry.value;
        }
        
        const value = await fetcher();
        this.cache.set(key, {
            value,
            expiry: now + ttl
        });
        
        return value;
    }
    
    clear(): void {
        this.cache.clear();
    }
    
    delete(key: string): boolean {
        return this.cache.delete(key);
    }
}

// 使用示例
const userCache = new AsyncCache<User>();

async function getCachedUser(id: number): Promise<User> {
    return userCache.get(
        `user:${id}`,
        () => fetchUser(id),
        30000 // 30秒缓存
    );
}
```

## 🔧 练习题

### 练习 1：实现函数重载
```typescript
// 实现一个 format 函数，支持多种重载：
// - format(date: Date): string - 格式化日期
// - format(number: number, decimals: number): string - 格式化数字
// - format(template: string, ...args: any[]): string - 字符串模板

// 你的实现：
```

### 练习 2：创建高阶函数
```typescript
// 实现一个 debounce 函数：
// - 延迟执行函数
// - 在延迟期间再次调用会重置计时器
// - 支持泛型和正确的类型推导

// 你的实现：
```

### 练习 3：异步函数组合
```typescript
// 实现一个 pipeline 函数：
// - 按顺序执行多个异步函数
// - 前一个函数的输出作为下一个函数的输入
// - 支持错误处理

// 你的实现：
```

## 📚 扩展阅读

- [Functions - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/functions.html)
- [Generics - TypeScript](https://www.typescriptlang.org/docs/handbook/generics.html)
- [Advanced Types - TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

## 📝 本章小结

- TypeScript 提供了强大的函数类型系统
- 可选参数、默认参数和剩余参数提供了灵活性
- 函数重载允许一个函数有多种调用方式
- 泛型函数提供了类型安全的通用功能
- 高阶函数是函数式编程的核心概念
- 正确处理 this 上下文对于面向对象编程很重要

---

**下一章：[第 7 章：泛型 (Generics)](../07-generics/README.md)**
