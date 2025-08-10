# 第 7 章：泛型 (Generics)

## 📋 本章内容

- 泛型基础概念
- 泛型函数和类
- 泛型约束
- 泛型工具类型
- 条件类型
- 映射类型
- 泛型的实际应用

## 🎯 学习目标

完成本章学习后，你将能够：
- 深入理解泛型的概念和用途
- 熟练使用泛型约束和条件类型
- 掌握 TypeScript 内置工具类型
- 创建自己的泛型工具类型

---

## 7.1 泛型基础

### 7.1.1 为什么需要泛型
```typescript
// 没有泛型的问题
function identityString(arg: string): string {
    return arg;
}

function identityNumber(arg: number): number {
    return arg;
}

function identityAny(arg: any): any {
    return arg; // 失去了类型信息
}

// 使用泛型解决
function identity<T>(arg: T): T {
    return arg;
}

// 类型推断
let output1 = identity("hello");        // string
let output2 = identity(42);             // number
let output3 = identity(true);           // boolean

// 显式指定类型
let output4 = identity<string>("hello"); // string
```

### 7.1.2 泛型语法
```typescript
// 单个泛型参数
function first<T>(arr: T[]): T | undefined {
    return arr[0];
}

// 多个泛型参数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// 泛型参数默认值
function createArray<T = string>(length: number, value: T): T[] {
    return Array(length).fill(value);
}

let stringArray = createArray(3, "hello");    // string[]
let numberArray = createArray<number>(3, 0);  // number[]
```

## 7.2 泛型约束

### 7.2.1 基本约束
```typescript
// 约束泛型必须有 length 属性
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length); // 现在知道有 length 属性
    return arg;
}

loggingIdentity("hello");       // OK: string 有 length
loggingIdentity([1, 2, 3]);     // OK: array 有 length
loggingIdentity({ length: 10, value: 3 }); // OK: 对象有 length
// loggingIdentity(3);          // Error: number 没有 length
```

### 7.2.2 keyof 约束
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let person = { name: "Alice", age: 30, email: "alice@example.com" };

let name = getProperty(person, "name");     // string
let age = getProperty(person, "age");       // number
// let invalid = getProperty(person, "salary"); // Error: 属性不存在

// 更复杂的约束
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}

let picked = pick(person, ["name", "age"]); // { name: string; age: number; }
```

### 7.2.3 条件约束
```typescript
// 约束 T 必须可以分配给 U
function extend<T, U>(first: T, second: U): T & U {
    return { ...first, ...second };
}

// 约束 T 必须是某种类型的数组
type ArrayElement<T> = T extends (infer U)[] ? U : never;

type StringArray = ArrayElement<string[]>;    // string
type NumberArray = ArrayElement<number[]>;    // number
type NotArray = ArrayElement<string>;         // never

// 实际应用：约束参数类型
function processItems<T extends Record<string, any>>(
    items: T[],
    processor: (item: T) => void
): void {
    items.forEach(processor);
}

processItems(
    [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }],
    item => console.log(item.name)
);
```

## 7.3 泛型类

### 7.3.1 基本泛型类
```typescript
class GenericRepository<T> {
    private items: T[] = [];
    
    add(item: T): void {
        this.items.push(item);
    }
    
    findById<K extends keyof T>(key: K, value: T[K]): T | undefined {
        return this.items.find(item => item[key] === value);
    }
    
    getAll(): T[] {
        return [...this.items];
    }
    
    filter(predicate: (item: T) => boolean): T[] {
        return this.items.filter(predicate);
    }
    
    map<U>(mapper: (item: T) => U): U[] {
        return this.items.map(mapper);
    }
}

interface User {
    id: number;
    name: string;
    email: string;
}

const userRepo = new GenericRepository<User>();
userRepo.add({ id: 1, name: "Alice", email: "alice@example.com" });
userRepo.add({ id: 2, name: "Bob", email: "bob@example.com" });

const alice = userRepo.findById("name", "Alice");
const allUsers = userRepo.getAll();
const userNames = userRepo.map(user => user.name);
```

### 7.3.2 泛型类的继承
```typescript
// 泛型基类
abstract class Collection<T> {
    protected items: T[] = [];
    
    abstract add(item: T): void;
    
    get count(): number {
        return this.items.length;
    }
    
    getAll(): T[] {
        return [...this.items];
    }
}

// 继承泛型类
class Set<T> extends Collection<T> {
    add(item: T): void {
        if (!this.items.includes(item)) {
            this.items.push(item);
        }
    }
    
    has(item: T): boolean {
        return this.items.includes(item);
    }
}

class List<T> extends Collection<T> {
    add(item: T): void {
        this.items.push(item);
    }
    
    get(index: number): T | undefined {
        return this.items[index];
    }
}

const numberSet = new Set<number>();
numberSet.add(1);
numberSet.add(2);
numberSet.add(1); // 不会重复添加

const stringList = new List<string>();
stringList.add("hello");
stringList.add("world");
stringList.add("hello"); // 会重复添加
```

## 7.4 内置工具类型

### 7.4.1 基础工具类型
```typescript
interface User {
    id: number;
    name: string;
    email: string;
    age?: number;
}

// Partial<T> - 所有属性变为可选
type PartialUser = Partial<User>;
// { id?: number; name?: string; email?: string; age?: number; }

function updateUser(id: number, updates: Partial<User>): void {
    // 更新逻辑
}

updateUser(1, { name: "New Name" }); // 只更新部分字段

// Required<T> - 所有属性变为必需
type RequiredUser = Required<User>;
// { id: number; name: string; email: string; age: number; }

// Readonly<T> - 所有属性变为只读
type ReadonlyUser = Readonly<User>;
// { readonly id: number; readonly name: string; ... }

// Pick<T, K> - 选择特定属性
type UserSummary = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit<T, K> - 排除特定属性
type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; age?: number; }
```

### 7.4.2 高级工具类型
```typescript
// Record<K, T> - 创建记录类型
type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};

// Exclude<T, U> - 从 T 中排除 U
type NonNullable<T> = Exclude<T, null | undefined>;
type StringOrNumber = string | number | null;
type NonNullStringOrNumber = NonNullable<StringOrNumber>; // string | number

// Extract<T, U> - 从 T 中提取 U
type Primitive = string | number | boolean | null | undefined;
type StringOrNumber2 = Extract<Primitive, string | number>; // string | number

// ReturnType<T> - 获取函数返回类型
function getUser(): { id: number; name: string } {
    return { id: 1, name: "Alice" };
}

type GetUserReturn = ReturnType<typeof getUser>; // { id: number; name: string }

// Parameters<T> - 获取函数参数类型
function createUser(name: string, age: number, email?: string): User {
    return { id: Date.now(), name, email: email || "", age };
}

type CreateUserParams = Parameters<typeof createUser>; // [string, number, string?]
```

### 7.4.3 字符串工具类型
```typescript
// Uppercase<T> - 转换为大写
type UppercaseHello = Uppercase<"hello">; // "HELLO"

// Lowercase<T> - 转换为小写
type LowercaseHELLO = Lowercase<"HELLO">; // "hello"

// Capitalize<T> - 首字母大写
type CapitalizeHello = Capitalize<"hello">; // "Hello"

// Uncapitalize<T> - 首字母小写
type UncapitalizeHello = Uncapitalize<"Hello">; // "hello"

// 实际应用：创建 API 路径类型
type HttpMethod = "get" | "post" | "put" | "delete";
type ApiPath = "/users" | "/posts" | "/comments";

type ApiEndpoint<M extends HttpMethod, P extends ApiPath> = 
    `${Uppercase<M>} ${P}`;

type GetUsers = ApiEndpoint<"get", "/users">; // "GET /users"
type PostUsers = ApiEndpoint<"post", "/users">; // "POST /users"
```

## 7.5 条件类型

### 7.5.1 基本条件类型
```typescript
// 条件类型语法：T extends U ? X : Y
type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

// 实际应用：API 响应类型
type ApiResponse<T> = T extends string 
    ? { message: T; status: "success" }
    : T extends Error 
    ? { error: T; status: "error" }
    : { data: T; status: "success" };

function handleResponse<T>(response: T): ApiResponse<T> {
    if (typeof response === "string") {
        return { message: response, status: "success" } as ApiResponse<T>;
    } else if (response instanceof Error) {
        return { error: response, status: "error" } as ApiResponse<T>;
    } else {
        return { data: response, status: "success" } as ApiResponse<T>;
    }
}
```

### 7.5.2 分布式条件类型
```typescript
// 当条件类型作用于联合类型时，会分布到每个成员
type ToArray<T> = T extends any ? T[] : never;

type StringOrNumberArray = ToArray<string | number>; // string[] | number[]

// 实际应用：过滤联合类型
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

interface Example {
    name: string;
    age: number;
    getName(): string;
    setAge(age: number): void;
}

type ExampleData = NonFunctionProperties<Example>; // { name: string; age: number; }
```

### 7.5.3 infer 关键字
```typescript
// infer 用于在条件类型中推断类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

function getString(): string { return ""; }
function getNumber(): number { return 0; }

type StringReturn = ReturnType<typeof getString>; // string
type NumberReturn = ReturnType<typeof getNumber>; // number

// 数组元素类型推断
type ArrayElementType<T> = T extends (infer U)[] ? U : never;

type StringArrayElement = ArrayElementType<string[]>; // string
type NumberArrayElement = ArrayElementType<number[]>; // number

// Promise 值类型推断
type PromiseValue<T> = T extends Promise<infer U> ? U : T;

type StringPromiseValue = PromiseValue<Promise<string>>; // string
type NumberValue = PromiseValue<number>; // number

// 深度推断：获取嵌套对象的值类型
type DeepValue<T, K extends string> = K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
        ? DeepValue<T[Key], Rest>
        : never
    : K extends keyof T
    ? T[K]
    : never;

interface NestedObject {
    user: {
        profile: {
            name: string;
            age: number;
        }
    }
}

type UserName = DeepValue<NestedObject, "user.profile.name">; // string
```

## 7.6 映射类型

### 7.6.1 基本映射类型
```typescript
// 基本映射类型语法
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};

// 自定义映射类型
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

interface User {
    id: number;
    name: string;
    email: string;
}

type NullableUser = Nullable<User>;
// { id: number | null; name: string | null; email: string | null; }
```

### 7.6.2 条件映射类型
```typescript
// 根据属性类型进行不同的映射
type StringifyValues<T> = {
    [K in keyof T]: T[K] extends string ? T[K] : string;
};

interface MixedData {
    name: string;
    age: number;
    isActive: boolean;
}

type StringifiedData = StringifyValues<MixedData>;
// { name: string; age: string; isActive: string; }

// 过滤特定类型的属性
type FilterByType<T, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};

type StringProperties = FilterByType<MixedData, string>; // { name: string; }
type NumberProperties = FilterByType<MixedData, number>; // { age: number; }
```

### 7.6.3 键重映射
```typescript
// 使用 as 子句重新映射键
type Getters<T> = {
    [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetters = Getters<User>;
// { getId(): number; getName(): string; getEmail(): string; }

// 前缀和后缀
type Prefixed<T, P extends string> = {
    [K in keyof T as `${P}${string & K}`]: T[K];
};

type ApiUser = Prefixed<User, "api_">;
// { api_id: number; api_name: string; api_email: string; }

// 条件键重映射
type MethodNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type DataProperties<T> = {
    [K in keyof T as T[K] extends Function ? never : K]: T[K];
};
```

## 7.7 实际应用

### 7.7.1 表单验证系统
```typescript
// 通用表单验证器
type Validator<T> = (value: T) => string | undefined;

type FormValidators<T> = {
    [K in keyof T]?: Validator<T[K]>;
};

type FormErrors<T> = {
    [K in keyof T]?: string;
};

class FormValidator<T> {
    private validators: FormValidators<T> = {};
    
    addValidator<K extends keyof T>(field: K, validator: Validator<T[K]>): void {
        this.validators[field] = validator;
    }
    
    validate(data: T): FormErrors<T> {
        const errors: FormErrors<T> = {};
        
        for (const field in this.validators) {
            const validator = this.validators[field];
            if (validator) {
                const error = validator(data[field]);
                if (error) {
                    errors[field] = error;
                }
            }
        }
        
        return errors;
    }
}

// 使用示例
interface UserForm {
    email: string;
    password: string;
    age: number;
}

const userValidator = new FormValidator<UserForm>();

userValidator.addValidator("email", (email) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? undefined : "Invalid email"
);

userValidator.addValidator("password", (password) => 
    password.length >= 8 ? undefined : "Password must be at least 8 characters"
);

userValidator.addValidator("age", (age) => 
    age >= 18 ? undefined : "Must be at least 18 years old"
);

const errors = userValidator.validate({
    email: "invalid-email",
    password: "123",
    age: 16
});
```

### 7.7.2 类型安全的状态管理
```typescript
// 状态管理器类型
type StateUpdater<T> = (prevState: T) => T;
type StateListener<T> = (state: T) => void;

class TypedStore<T> {
    private state: T;
    private listeners: StateListener<T>[] = [];
    
    constructor(initialState: T) {
        this.state = initialState;
    }
    
    getState(): T {
        return this.state;
    }
    
    setState(updater: Partial<T> | StateUpdater<T>): void {
        if (typeof updater === "function") {
            this.state = updater(this.state);
        } else {
            this.state = { ...this.state, ...updater };
        }
        
        this.listeners.forEach(listener => listener(this.state));
    }
    
    subscribe(listener: StateListener<T>): () => void {
        this.listeners.push(listener);
        
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    
    // 选择特定的状态片段
    select<K extends keyof T>(key: K): T[K] {
        return this.state[key];
    }
    
    // 批量更新
    updateFields<K extends keyof T>(updates: Pick<T, K>): void {
        this.setState(updates);
    }
}

// 使用示例
interface AppState {
    user: { id: number; name: string } | null;
    theme: "light" | "dark";
    notifications: string[];
}

const store = new TypedStore<AppState>({
    user: null,
    theme: "light",
    notifications: []
});

// 类型安全的状态更新
store.setState({ theme: "dark" });
store.updateFields({ 
    user: { id: 1, name: "Alice" },
    notifications: ["Welcome!"]
});

// 监听状态变化
const unsubscribe = store.subscribe((state) => {
    console.log("State changed:", state);
});
```

## 🔧 练习题

### 练习 1：创建工具类型
```typescript
// 创建以下工具类型：
// 1. DeepPartial<T> - 深度可选
// 2. DeepReadonly<T> - 深度只读
// 3. RequiredByKeys<T, K> - 指定键变为必需
// 4. PickByType<T, U> - 按类型选择属性

// 你的实现：
```

### 练习 2：类型安全的事件系统
```typescript
// 实现一个类型安全的事件发射器：
// 1. 支持定义事件类型映射
// 2. 确保事件名和数据类型匹配
// 3. 支持一次性监听器

// 你的实现：
```

### 练习 3：API 客户端类型
```typescript
// 设计一个类型安全的 API 客户端：
// 1. 根据路径推断请求和响应类型
// 2. 支持不同的 HTTP 方法
// 3. 自动处理查询参数和请求体

// 你的实现：
```

## 📚 扩展阅读

- [Generics - TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/generics.html)
- [Advanced Types - TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Utility Types - TypeScript](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## 📝 本章小结

- 泛型是 TypeScript 类型系统的核心特性，提供了类型安全的通用性
- 泛型约束允许我们限制泛型参数的类型
- 条件类型和映射类型提供了强大的类型变换能力
- 内置工具类型覆盖了大多数常见的类型操作需求
- 泛型在实际项目中能够显著提升代码的类型安全性和可维护性

---

**下一章：[第 8 章：高级类型](../08-advanced-types/README.md)**
