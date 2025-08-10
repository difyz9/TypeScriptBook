// TypeScript 学习笔记示例代码
// 第1章：TypeScript 简介与环境搭建

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

// 第2章：基础类型系统示例

// 基础类型
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";

// 数组
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// 元组
let x: [string, number] = ["hello", 10];

// 枚举
enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

let favoriteColor: Color = Color.Blue;

// 联合类型
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}

// 第3章：变量声明与作用域示例

// 解构赋值
let obj = { a: "foo", b: 12, c: "bar" };
let { a, b } = obj;

// 数组解构
let input: [number, number] = [1, 2];
let [first, second] = input;

// 展开语法
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };

// 第4章：接口示例

interface User {
    id: number;
    name: string;
    email?: string;
    readonly createdAt: Date;
}

interface UserRepository {
    findById(id: number): User | undefined;
    create(user: Omit<User, 'id' | 'createdAt'>): User;
    update(id: number, updates: Partial<User>): User | undefined;
}

// 第5章：类示例

abstract class Animal {
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    abstract makeSound(): void;
    
    move(): void {
        console.log(`${this.name} is moving`);
    }
}

class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, breed: string) {
        super(name);
        this.breed = breed;
    }
    
    makeSound(): void {
        console.log(`${this.name} barks: Woof!`);
    }
    
    getBreed(): string {
        return this.breed;
    }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.makeSound();
dog.move();

export { Person, User, Animal, Dog };
