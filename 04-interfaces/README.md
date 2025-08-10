# 第 4 章：接口 (Interfaces)

## 📋 本章内容

- 接口基础概念
- 可选属性和只读属性
- 额外属性检查
- 函数类型接口
- 可索引类型
- 类类型接口
- 接口继承
- 混合类型

## 🎯 学习目标

完成本章学习后，你将能够：
- 熟练定义和使用接口
- 理解接口的各种高级特性
- 掌握接口继承和组合
- 设计灵活且类型安全的 API

---

## 4.1 接口基础

### 4.1.1 第一个接口
```typescript
// 不使用接口的代码
function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// 使用接口重写
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

### 4.1.2 接口的结构化类型检查
```typescript
interface Point {
    x: number;
    y: number;
}

function printPoint(point: Point) {
    console.log(`Point: (${point.x}, ${point.y})`);
}

// 只要对象包含接口要求的属性，就可以传递
let point1 = { x: 10, y: 20 };
let point2 = { x: 5, y: 15, color: "red" }; // 额外属性不影响

printPoint(point1); // OK
printPoint(point2); // OK
```

## 4.2 可选属性

### 4.2.1 基本可选属性
```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    
    if (config.color) {
        newSquare.color = config.color;
    }
    
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    
    return newSquare;
}

let mySquare = createSquare({ color: "black" });
let anotherSquare = createSquare({ width: 10 });
let emptySquare = createSquare({});
```

### 4.2.2 可选属性的优势
```typescript
interface User {
    id: number;
    name: string;
    email?: string;
    phone?: string;
    avatar?: string;
}

// 创建用户时，可以只提供必需的信息
function createUser(userData: User): User {
    return {
        ...userData,
        email: userData.email || "",
        phone: userData.phone || "",
        avatar: userData.avatar || "/default-avatar.png"
    };
}

let user1 = createUser({ 
    id: 1, 
    name: "Alice" 
});

let user2 = createUser({ 
    id: 2, 
    name: "Bob", 
    email: "bob@example.com" 
});
```

## 4.3 只读属性

### 4.3.1 readonly 修饰符
```typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// p1.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// 只读数组
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// ro[0] = 12; // Error
// ro.push(5); // Error
// ro.length = 100; // Error

// 重新赋值给普通数组也不行
// a = ro; // Error

// 可以用类型断言重写
a = ro as number[];
```

### 4.3.2 readonly vs const
```typescript
// const 用于变量
const name = "Alice";

// readonly 用于属性
interface Config {
    readonly apiUrl: string;
    readonly timeout: number;
    debug?: boolean;
}

// 实际应用：配置对象
const appConfig: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    debug: false
};

// appConfig.apiUrl = "https://new-api.com"; // Error
```

## 4.4 额外属性检查

### 4.4.1 对象字面量的额外属性检查
```typescript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return { color: config.color || "red", area: 100 };
}

// 直接传递对象字面量会进行额外属性检查
// let mySquare = createSquare({ colour: "red", width: 100 }); // Error: 'colour' does not exist

// 绕过额外属性检查的方法

// 方法1：类型断言
let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);

// 方法2：添加索引签名
interface SquareConfig2 {
    color?: string;
    width?: number;
    [propName: string]: any;
}

// 方法3：将对象赋值给另一个变量
let squareOptions = { colour: "red", width: 100 };
let mySquare2 = createSquare(squareOptions);
```

### 4.4.2 索引签名
```typescript
interface Dictionary {
    [key: string]: string;
}

let dict: Dictionary = {
    name: "Alice",
    city: "Beijing",
    country: "China"
};

// 混合确定属性和索引签名
interface UserInfo {
    name: string;
    age: number;
    [propName: string]: string | number; // 索引签名的类型必须包含确定属性的类型
}

let userInfo: UserInfo = {
    name: "Alice",
    age: 30,
    email: "alice@example.com",
    phone: "123456789"
};
```

## 4.5 函数类型接口

### 4.5.1 定义函数类型
```typescript
// 函数类型接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function(source: string, subString: string): boolean {
    let result = source.search(subString);
    return result > -1;
}

// 参数名不需要匹配
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

### 4.5.2 复杂函数类型
```typescript
// 事件处理器接口
interface EventHandler<T = any> {
    (event: T): void;
}

interface ClickEvent {
    x: number;
    y: number;
    button: 'left' | 'right' | 'middle';
}

let clickHandler: EventHandler<ClickEvent> = (event) => {
    console.log(`Clicked at (${event.x}, ${event.y}) with ${event.button} button`);
};

// 异步函数接口
interface AsyncProcessor<T, R> {
    (input: T): Promise<R>;
}

let stringProcessor: AsyncProcessor<string, number> = async (input) => {
    return input.length;
};

// 带重载的函数接口
interface Converter {
    (value: string): number;
    (value: number): string;
    (value: boolean): string;
}

let convert: Converter = (value: any) => {
    if (typeof value === 'string') return parseInt(value);
    if (typeof value === 'number') return value.toString();
    if (typeof value === 'boolean') return value.toString();
    throw new Error('Unsupported type');
};
```

## 4.6 可索引类型

### 4.6.1 字符串索引
```typescript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

// 字符串索引签名
interface Dictionary {
    [key: string]: string;
}

let dict: Dictionary = {};
dict["name"] = "Alice";
dict["city"] = "Beijing";
```

### 4.6.2 数字索引
```typescript
// 数字索引和字符串索引的关系
interface NumberDictionary {
    [index: string]: number;
    length: number; // OK，length 是 number 类型
    // name: string; // Error，string 类型不能赋给数字索引类型
}

// 同时使用数字和字符串索引
interface MixedArray {
    [index: number]: string;
    [key: string]: string | number;
}

let mixedArray: MixedArray = ["a", "b", "c"];
mixedArray.length = 3; // OK
mixedArray["custom"] = "value"; // OK
```

### 4.6.3 只读索引
```typescript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // Error，索引签名是只读的
```

## 4.7 类类型接口

### 4.7.1 实现接口
```typescript
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    
    setTime(d: Date) {
        this.currentTime = d;
    }
    
    constructor(h: number, m: number) {}
}
```

### 4.7.2 构造器签名
```typescript
// 接口描述类的静态部分
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}

// 接口描述类的实例部分
interface ClockInterface {
    tick(): void;
}

function createClock(
    ctor: ClockConstructor, 
    hour: number, 
    minute: number
): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("beep beep");
    }
}

class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

## 4.8 接口继承

### 4.8.1 单继承
```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square: Square = {
    color: "blue",
    sideLength: 10
};
```

### 4.8.2 多继承
```typescript
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square: Square = {
    color: "blue",
    sideLength: 10,
    penWidth: 5.0
};
```

### 4.8.3 复杂继承示例
```typescript
// 基础接口
interface Timestamped {
    timestamp: Date;
}

interface Named {
    name: string;
}

interface Identifiable {
    id: string | number;
}

// 组合接口
interface User extends Named, Identifiable, Timestamped {
    email: string;
    role: 'admin' | 'user' | 'guest';
}

interface Product extends Named, Identifiable, Timestamped {
    price: number;
    category: string;
    inStock: boolean;
}

// 使用
const user: User = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    role: "admin",
    timestamp: new Date()
};

const product: Product = {
    id: "PRD001",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    inStock: true,
    timestamp: new Date()
};
```

## 4.9 混合类型

### 4.9.1 函数对象
```typescript
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = function(start: number) {
        return `Started with ${start}`;
    } as Counter;
    
    counter.interval = 123;
    counter.reset = function() {
        console.log("Reset counter");
    };
    
    return counter;
}

let c = getCounter();
c(10); // 调用函数
c.reset(); // 调用方法
c.interval = 5.0; // 设置属性
```

### 4.9.2 实际应用示例
```typescript
// jQuery 风格的 API
interface JQueryLike {
    // 作为函数调用
    (selector: string): JQueryObject;
    (element: HTMLElement): JQueryObject;
    
    // 静态方法
    ajax(url: string, settings?: any): Promise<any>;
    get(url: string): Promise<any>;
    post(url: string, data?: any): Promise<any>;
    
    // 版本信息
    version: string;
}

interface JQueryObject {
    addClass(className: string): JQueryObject;
    removeClass(className: string): JQueryObject;
    hide(): JQueryObject;
    show(): JQueryObject;
    text(): string;
    text(value: string): JQueryObject;
}

// 模拟实现
function createJQuery(): JQueryLike {
    function jquery(selector: any): JQueryObject {
        // 实现细节
        return {} as JQueryObject;
    }
    
    jquery.ajax = async (url: string, settings?: any) => {
        // Ajax 实现
        return {};
    };
    
    jquery.get = async (url: string) => {
        return jquery.ajax(url, { method: 'GET' });
    };
    
    jquery.post = async (url: string, data?: any) => {
        return jquery.ajax(url, { method: 'POST', data });
    };
    
    jquery.version = "3.6.0";
    
    return jquery as JQueryLike;
}

const $ = createJQuery();
$('.my-class').addClass('active'); // 使用选择器
$.get('/api/data'); // 使用静态方法
console.log($.version); // 访问属性
```

## 🔧 练习题

### 练习 1：设计用户管理接口
```typescript
// 设计一套用户管理的接口系统
// 要求包含：
// 1. 基础用户信息接口
// 2. 管理员用户接口（继承基础用户）
// 3. 用户操作接口（增删改查）
// 4. 用户认证接口

// 你的实现：
```

### 练习 2：配置系统接口
```typescript
// 设计一个应用配置系统
// 要求：
// 1. 支持嵌套配置
// 2. 某些配置项是只读的
// 3. 支持动态添加配置项
// 4. 提供配置验证函数类型

// 你的实现：
```

### 练习 3：事件系统接口
```typescript
// 设计一个类型安全的事件系统
// 要求：
// 1. 支持多种事件类型
// 2. 事件监听器接口
// 3. 事件发射器接口
// 4. 支持一次性监听器

// 你的实现：
```

## 📚 扩展阅读

- [Interfaces - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/interfaces.html)
- [Advanced Types - TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Declaration Merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)

## 📝 本章小结

- 接口是 TypeScript 中定义契约的主要方式
- 可选属性和只读属性提供了灵活性和安全性
- 函数类型接口能够描述复杂的函数签名
- 接口继承支持代码复用和层次化设计
- 混合类型接口可以描述既是函数又是对象的复杂类型
- 索引签名提供了动态属性的类型安全

---

**下一章：[第 5 章：类 (Classes)](../05-classes/README.md)**
