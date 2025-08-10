# 第 5 章：类 (Classes)

## 📋 本章内容

- 类的基本语法
- 继承与多态
- 访问修饰符
- 抽象类
- 类的静态成员
- getter 和 setter
- 类与接口的关系

## 🎯 学习目标

完成本章学习后，你将能够：
- 熟练使用 TypeScript 的类语法
- 理解面向对象编程的核心概念
- 掌握类的高级特性
- 设计良好的类层次结构

---

## 5.1 类的基础

### 5.1.1 定义类
```typescript
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
console.log(greeter.greet()); // "Hello, world"
```

### 5.1.2 类的成员
```typescript
class Person {
    // 属性
    name: string;
    age: number;
    
    // 构造函数
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    // 方法
    introduce(): string {
        return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
    }
    
    // 方法重载
    celebrate(): void;
    celebrate(occasion: string): void;
    celebrate(occasion?: string): void {
        if (occasion) {
            console.log(`${this.name} is celebrating ${occasion}!`);
        } else {
            console.log(`${this.name} is celebrating!`);
        }
    }
}

const person = new Person("Alice", 30);
console.log(person.introduce());
person.celebrate();
person.celebrate("birthday");
```

## 5.2 继承

### 5.2.1 基本继承
```typescript
class Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    move(distance: number = 0) {
        console.log(`${this.name} moved ${distance}m.`);
    }
}

class Dog extends Animal {
    breed: string;
    
    constructor(name: string, breed: string) {
        super(name); // 调用父类构造函数
        this.breed = breed;
    }
    
    bark() {
        console.log("Woof! Woof!");
    }
    
    // 重写父类方法
    move(distance: number = 5) {
        console.log("Running...");
        super.move(distance);
    }
}

class Snake extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    move(distance: number = 1) {
        console.log("Slithering...");
        super.move(distance);
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
const snake = new Snake("Cobra");

dog.bark();
dog.move(10);
snake.move(5);
```

### 5.2.2 多层继承
```typescript
class Vehicle {
    protected speed: number = 0;
    
    constructor(protected brand: string) {}
    
    start(): void {
        console.log(`${this.brand} vehicle started`);
    }
    
    accelerate(increment: number): void {
        this.speed += increment;
        console.log(`Speed: ${this.speed} km/h`);
    }
}

class Car extends Vehicle {
    private doors: number;
    
    constructor(brand: string, doors: number) {
        super(brand);
        this.doors = doors;
    }
    
    honk(): void {
        console.log("Beep beep!");
    }
}

class SportsCar extends Car {
    private turbo: boolean;
    
    constructor(brand: string, turbo: boolean = false) {
        super(brand, 2); // 跑车通常是2门
        this.turbo = turbo;
    }
    
    activateTurbo(): void {
        if (this.turbo) {
            console.log("Turbo activated!");
            this.accelerate(50);
        } else {
            console.log("No turbo available");
        }
    }
}

const ferrari = new SportsCar("Ferrari", true);
ferrari.start();
ferrari.accelerate(20);
ferrari.activateTurbo();
```

## 5.3 访问修饰符

### 5.3.1 public（默认）
```typescript
class PublicExample {
    public name: string; // 显式声明为 public
    age: number; // 默认为 public
    
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    public getName(): string {
        return this.name;
    }
}

const example = new PublicExample("Alice", 30);
console.log(example.name); // OK：可以访问
console.log(example.getName()); // OK：可以访问
```

### 5.3.2 private
```typescript
class PrivateExample {
    private id: string;
    private secret: string;
    
    constructor(id: string) {
        this.id = id;
        this.secret = this.generateSecret();
    }
    
    private generateSecret(): string {
        return Math.random().toString(36);
    }
    
    public getId(): string {
        return this.id;
    }
    
    public validateSecret(inputSecret: string): boolean {
        return this.secret === inputSecret;
    }
}

const example = new PrivateExample("USER001");
console.log(example.getId()); // OK
// console.log(example.id); // Error：private 成员不能在类外访问
// console.log(example.secret); // Error：private 成员不能在类外访问
```

### 5.3.3 protected
```typescript
class ProtectedExample {
    protected name: string;
    protected age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    protected getInfo(): string {
        return `${this.name} (${this.age})`;
    }
}

class Employee extends ProtectedExample {
    private department: string;
    
    constructor(name: string, age: number, department: string) {
        super(name, age);
        this.department = department;
    }
    
    public introduce(): string {
        // 可以访问父类的 protected 成员
        return `${this.getInfo()} - ${this.department}`;
    }
}

const employee = new Employee("Bob", 35, "Engineering");
console.log(employee.introduce()); // OK
// console.log(employee.name); // Error：protected 成员不能在类外访问
```

### 5.3.4 readonly 修饰符
```typescript
class ReadonlyExample {
    readonly id: number;
    readonly createdAt: Date;
    
    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date();
    }
    
    // 错误：不能修改 readonly 属性
    // updateId(newId: number) {
    //     this.id = newId; // Error
    // }
}

// 参数属性简写
class ParameterProperties {
    constructor(
        public readonly id: number,
        private name: string,
        protected age: number
    ) {
        // TypeScript 会自动创建并初始化这些属性
    }
}
```

## 5.4 静态成员

### 5.4.1 静态属性和方法
```typescript
class MathUtils {
    static PI: number = 3.14159;
    static E: number = 2.71828;
    
    static add(x: number, y: number): number {
        return x + y;
    }
    
    static multiply(x: number, y: number): number {
        return x * y;
    }
    
    static circle(radius: number): { area: number; circumference: number } {
        return {
            area: this.PI * radius * radius,
            circumference: 2 * this.PI * radius
        };
    }
}

// 使用静态成员
console.log(MathUtils.PI);
console.log(MathUtils.add(5, 3));
console.log(MathUtils.circle(10));

// 不需要实例化
// const math = new MathUtils(); // 通常不这样做
```

### 5.4.2 静态成员的实际应用
```typescript
class Database {
    private static instance: Database;
    private isConnected: boolean = false;
    
    private constructor() {
        // 私有构造函数，防止外部直接实例化
    }
    
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
    
    public connect(): void {
        if (!this.isConnected) {
            console.log("Connecting to database...");
            this.isConnected = true;
        }
    }
    
    public disconnect(): void {
        if (this.isConnected) {
            console.log("Disconnecting from database...");
            this.isConnected = false;
        }
    }
}

// 单例模式应用
const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true，同一个实例

db1.connect();
```

## 5.5 抽象类

### 5.5.1 抽象类基础
```typescript
abstract class Shape {
    abstract name: string;
    
    constructor(protected color: string) {}
    
    // 抽象方法：子类必须实现
    abstract getArea(): number;
    abstract getPerimeter(): number;
    
    // 具体方法：子类可以直接使用
    describe(): string {
        return `This is a ${this.color} ${this.name} with area ${this.getArea()}`;
    }
}

class Circle extends Shape {
    name: string = "circle";
    
    constructor(color: string, private radius: number) {
        super(color);
    }
    
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    name: string = "rectangle";
    
    constructor(color: string, private width: number, private height: number) {
        super(color);
    }
    
    getArea(): number {
        return this.width * this.height;
    }
    
    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const circle = new Circle("red", 5);
const rectangle = new Rectangle("blue", 4, 6);

console.log(circle.describe());
console.log(rectangle.describe());

// const shape = new Shape("green"); // Error：不能实例化抽象类
```

### 5.5.2 抽象类的高级应用
```typescript
abstract class EventEmitter {
    protected listeners: Map<string, Function[]> = new Map();
    
    // 抽象方法：子类必须实现特定的验证逻辑
    abstract validateEvent(event: string): boolean;
    
    on(event: string, listener: Function): void {
        if (!this.validateEvent(event)) {
            throw new Error(`Invalid event: ${event}`);
        }
        
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(listener);
    }
    
    emit(event: string, ...args: any[]): void {
        if (this.listeners.has(event)) {
            this.listeners.get(event)!.forEach(listener => listener(...args));
        }
    }
    
    off(event: string, listener: Function): void {
        if (this.listeners.has(event)) {
            const listeners = this.listeners.get(event)!;
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
}

class UserEventEmitter extends EventEmitter {
    private validEvents = ['login', 'logout', 'register', 'update'];
    
    validateEvent(event: string): boolean {
        return this.validEvents.includes(event);
    }
}

const userEvents = new UserEventEmitter();
userEvents.on('login', (user: string) => console.log(`${user} logged in`));
userEvents.on('logout', (user: string) => console.log(`${user} logged out`));

userEvents.emit('login', 'Alice');
userEvents.emit('logout', 'Alice');
```

## 5.6 getter 和 setter

### 5.6.1 基本访问器
```typescript
class Temperature {
    private _celsius: number = 0;
    
    get celsius(): number {
        return this._celsius;
    }
    
    set celsius(value: number) {
        if (value < -273.15) {
            throw new Error("Temperature cannot be below absolute zero");
        }
        this._celsius = value;
    }
    
    get fahrenheit(): number {
        return (this._celsius * 9) / 5 + 32;
    }
    
    set fahrenheit(value: number) {
        this.celsius = ((value - 32) * 5) / 9;
    }
    
    get kelvin(): number {
        return this._celsius + 273.15;
    }
    
    set kelvin(value: number) {
        this.celsius = value - 273.15;
    }
}

const temp = new Temperature();
temp.celsius = 25;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);

temp.fahrenheit = 100;
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);
```

### 5.6.2 只读和只写属性
```typescript
class User {
    private _password: string = "";
    private _lastLogin: Date = new Date();
    
    constructor(private _username: string) {}
    
    // 只读属性
    get username(): string {
        return this._username;
    }
    
    get lastLogin(): Date {
        return this._lastLogin;
    }
    
    // 只写属性
    set password(value: string) {
        if (value.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }
        this._password = this.hashPassword(value);
    }
    
    private hashPassword(password: string): string {
        // 简化的哈希函数
        return `hashed_${password}`;
    }
    
    public login(password: string): boolean {
        if (this._password === this.hashPassword(password)) {
            this._lastLogin = new Date();
            return true;
        }
        return false;
    }
}

const user = new User("alice");
user.password = "mySecretPassword";
console.log(user.username); // OK
// console.log(user.password); // Error：没有 getter
console.log(user.login("mySecretPassword")); // true
console.log(user.lastLogin);
```

## 5.7 类与接口

### 5.7.1 实现接口
```typescript
interface Flyable {
    fly(): void;
    altitude: number;
}

interface Swimmable {
    swim(): void;
    depth: number;
}

// 类可以实现多个接口
class Duck implements Flyable, Swimmable {
    altitude: number = 0;
    depth: number = 0;
    
    fly(): void {
        this.altitude = 100;
        console.log(`Duck is flying at ${this.altitude}m`);
    }
    
    swim(): void {
        this.depth = 2;
        console.log(`Duck is swimming at ${this.depth}m depth`);
    }
    
    quack(): void {
        console.log("Quack!");
    }
}

const duck = new Duck();
duck.fly();
duck.swim();
duck.quack();
```

### 5.7.2 接口继承类
```typescript
class Control {
    private state: any;
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
}

// 接口继承类
interface SelectableControl extends Control {
    select(): void;
}

// 只有 Control 的子类才能实现这个接口
class Button extends Control implements SelectableControl {
    select() {
        console.log(`Button ${this.name} selected`);
    }
}

class TextBox extends Control implements SelectableControl {
    select() {
        console.log(`TextBox ${this.name} selected`);
    }
}

// 这个类不能实现 SelectableControl，因为它没有 private state 属性
// class ImageControl implements SelectableControl {
//     select() {} // Error
// }
```

## 5.8 高级类特性

### 5.8.1 泛型类
```typescript
class GenericRepository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
    
    findAll(): T[] {
        return [...this.items];
    }
    
    findBy(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
    
    remove(index: number): T | undefined {
        return this.items.splice(index, 1)[0];
    }
    
    get count(): number {
        return this.items.length;
    }
}

interface Product {
    id: number;
    name: string;
    price: number;
}

const productRepo = new GenericRepository<Product>();
productRepo.add({ id: 1, name: "Laptop", price: 999 });
productRepo.add({ id: 2, name: "Mouse", price: 25 });

console.log(productRepo.findAll());
console.log(productRepo.findBy(p => p.price > 50));
```

### 5.8.2 装饰器模式（类）
```typescript
// 装饰器函数
function logged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} returned: ${JSON.stringify(result)}`);
        return result;
    };
    
    return descriptor;
}

class Calculator {
    @logged
    add(a: number, b: number): number {
        return a + b;
    }
    
    @logged
    multiply(a: number, b: number): number {
        return a * b;
    }
}

const calc = new Calculator();
calc.add(2, 3);
calc.multiply(4, 5);
```

## 🔧 练习题

### 练习 1：设计图形类层次
```typescript
// 设计一个图形类层次结构：
// 1. 抽象基类 Shape
// 2. 具体图形类：Circle, Rectangle, Triangle
// 3. 实现计算面积、周长的方法
// 4. 添加绘制功能接口

// 你的实现：
```

### 练习 2：实现简单的银行账户系统
```typescript
// 设计银行账户系统：
// 1. 基础账户类 Account
// 2. 储蓄账户 SavingsAccount（有利息）
// 3. 支票账户 CheckingAccount（可透支）
// 4. 实现存款、取款、查询余额等功能

// 你的实现：
```

### 练习 3：创建通用的缓存类
```typescript
// 实现一个泛型缓存类：
// 1. 支持设置和获取值
// 2. 支持过期时间
// 3. 支持缓存大小限制
// 4. 实现 LRU 淘汰策略

// 你的实现：
```

## 📚 扩展阅读

- [Classes - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/classes.html)
- [Decorators - TypeScript](https://www.typescriptlang.org/docs/handbook/decorators.html)
- [Mixins - TypeScript](https://www.typescriptlang.org/docs/handbook/mixins.html)

## 📝 本章小结

- TypeScript 类提供了强大的面向对象编程能力
- 访问修饰符控制成员的可见性和访问权限
- 抽象类定义了子类必须实现的契约
- 静态成员属于类本身而不是实例
- getter 和 setter 提供了属性访问的控制
- 类可以实现接口，确保符合特定的规范
- 泛型类提供了类型安全的通用功能

---

**下一章：[第 6 章：函数](../06-functions/README.md)**
