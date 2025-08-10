# 第 8 章：高级类型

## 📋 本章内容

- 交叉类型与联合类型
- 字面量类型
- 类型保护与类型谓词
- 可辨识联合
- 索引类型
- 映射类型高级应用
- 条件类型深入
- 模板字面量类型

## 🎯 学习目标

完成本章学习后，你将能够：
- 掌握高级类型系统的各种特性
- 使用类型保护进行运行时类型检查
- 创建复杂的类型变换
- 理解模板字面量类型的应用

---

## 8.1 交叉类型与联合类型深入

### 8.1.1 交叉类型的高级应用
```typescript
// 混入模式
interface Timestamped {
    timestamp: Date;
}

interface Tagged {
    tag: string;
}

// 创建混入函数
function withTimestamp<T>(obj: T): T & Timestamped {
    return { ...obj, timestamp: new Date() };
}

function withTag<T>(obj: T, tag: string): T & Tagged {
    return { ...obj, tag };
}

// 链式调用
const user = { name: "Alice", age: 30 };
const userWithMeta = withTag(withTimestamp(user), "admin");
// 类型：{ name: string; age: number; } & Timestamped & Tagged

// 函数重载与交叉类型
interface Validator {
    validate(value: string): boolean;
}

interface AsyncValidator {
    validateAsync(value: string): Promise<boolean>;
}

class EmailValidator implements Validator & AsyncValidator {
    validate(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    
    async validateAsync(value: string): Promise<boolean> {
        // 模拟异步验证（如检查邮箱是否已存在）
        await new Promise(resolve => setTimeout(resolve, 100));
        return this.validate(value);
    }
}
```

### 8.1.2 联合类型的类型收窄
```typescript
// 复杂联合类型
type NetworkState = 
    | { state: "loading" }
    | { state: "failed"; code: number }
    | { state: "success"; response: { title: string; duration: number; summary: string } };

function handleNetworkState(state: NetworkState) {
    // TypeScript 会根据判断条件自动收窄类型
    switch (state.state) {
        case "loading":
            // state: { state: "loading" }
            return "Downloading...";
        
        case "failed":
            // state: { state: "failed"; code: number }
            return `Error ${state.code} downloading`;
        
        case "success":
            // state: { state: "success"; response: {...} }
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
    }
}

// 使用 in 操作符进行类型保护
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
    if ("swim" in animal) {
        // animal 类型收窄为 Fish
        return animal.swim();
    }
    // animal 类型收窄为 Bird
    return animal.fly();
}
```

## 8.2 字面量类型

### 8.2.1 字符串字面量类型
```typescript
// 字符串字面量类型
type EventName = "click" | "scroll" | "mousemove";
type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
    size: ButtonSize;
    onClick: (event: EventName) => void;
}

function createButton(props: ButtonProps) {
    // 实现细节
}

// 模板字面量类型
type CSSProperty = "margin" | "padding";
type CSSDirection = "top" | "right" | "bottom" | "left";
type LonghandProperties = `${CSSProperty}-${CSSDirection}`;
// "margin-top" | "margin-right" | "margin-bottom" | "margin-left" | 
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"

// 实际应用：API 路径类型
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
type Resource = "users" | "posts" | "comments";
type ApiRoute = `/${Resource}` | `/${Resource}/${string}`;

function makeRequest(method: HttpMethod, route: ApiRoute) {
    console.log(`${method} ${route}`);
}

makeRequest("GET", "/users");
makeRequest("POST", "/users/123");
```

### 8.2.2 数字字面量类型
```typescript
// 数字字面量类型
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
type HttpStatusCode = 200 | 301 | 404 | 500;

function rollDice(): DiceRoll {
    return (Math.floor(Math.random() * 6) + 1) as DiceRoll;
}

function handleHttpResponse(status: HttpStatusCode) {
    switch (status) {
        case 200:
            return "Success";
        case 301:
            return "Moved Permanently";
        case 404:
            return "Not Found";
        case 500:
            return "Internal Server Error";
    }
}

// 模板字面量与数字
type Version = `${number}.${number}.${number}`;
type Port = `${number}`;

function parseVersion(version: Version): [number, number, number] {
    const [major, minor, patch] = version.split('.').map(Number);
    return [major, minor, patch];
}
```

## 8.3 类型保护与类型谓词

### 8.3.1 用户定义的类型保护
```typescript
// 类型谓词函数
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number";
}

function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

// 复杂对象的类型保护
interface User {
    id: number;
    name: string;
    email: string;
}

function isUser(obj: unknown): obj is User {
    return (
        typeof obj === "object" &&
        obj !== null &&
        typeof (obj as User).id === "number" &&
        typeof (obj as User).name === "string" &&
        typeof (obj as User).email === "string"
    );
}

// 使用类型保护
function processData(data: unknown) {
    if (isUser(data)) {
        // data 类型收窄为 User
        console.log(`User: ${data.name} (${data.email})`);
    } else if (isString(data)) {
        // data 类型收窄为 string
        console.log(`String: ${data.toUpperCase()}`);
    } else if (isArray<number>(data)) {
        // data 类型收窄为 number[]
        console.log(`Sum: ${data.reduce((a, b) => a + b, 0)}`);
    }
}
```

### 8.3.2 类型保护的实际应用
```typescript
// API 响应验证
interface ApiSuccess<T> {
    success: true;
    data: T;
}

interface ApiError {
    success: false;
    error: string;
    code: number;
}

type ApiResponse<T> = ApiSuccess<T> | ApiError;

function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
    return response.success === true;
}

function isApiError<T>(response: ApiResponse<T>): response is ApiError {
    return response.success === false;
}

async function fetchUserData(id: number): Promise<User | null> {
    const response: ApiResponse<User> = await fetch(`/api/users/${id}`)
        .then(res => res.json());
    
    if (isApiSuccess(response)) {
        return response.data; // 类型安全地访问 data
    } else if (isApiError(response)) {
        console.error(`API Error ${response.code}: ${response.error}`);
        return null;
    } else {
        // 这个分支实际上不会执行，但 TypeScript 要求处理
        throw new Error("Invalid API response");
    }
}

// 断言函数
function assertIsUser(obj: unknown): asserts obj is User {
    if (!isUser(obj)) {
        throw new Error("Object is not a valid User");
    }
}

function processUserData(data: unknown) {
    assertIsUser(data);
    // 从这里开始，data 的类型被断言为 User
    console.log(`Processing user: ${data.name}`);
}
```

## 8.4 可辨识联合

### 8.4.1 基本可辨识联合
```typescript
// 可辨识联合（Tagged Union）
interface Circle {
    kind: "circle";
    radius: number;
}

interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}

interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
}

type Shape = Circle | Rectangle | Triangle;

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            // shape 类型收窄为 Circle
            return Math.PI * shape.radius ** 2;
        
        case "rectangle":
            // shape 类型收窄为 Rectangle
            return shape.width * shape.height;
        
        case "triangle":
            // shape 类型收窄为 Triangle
            return (shape.base * shape.height) / 2;
        
        default:
            // 穷尽性检查
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}
```

### 8.4.2 复杂可辨识联合
```typescript
// 状态机模式
interface IdleState {
    status: "idle";
}

interface LoadingState {
    status: "loading";
    progress: number;
}

interface SuccessState {
    status: "success";
    data: any;
    timestamp: Date;
}

interface ErrorState {
    status: "error";
    error: string;
    retryCount: number;
}

type AsyncState = IdleState | LoadingState | SuccessState | ErrorState;

class AsyncStateMachine {
    private state: AsyncState = { status: "idle" };
    
    getState(): AsyncState {
        return this.state;
    }
    
    startLoading(): void {
        this.state = { status: "loading", progress: 0 };
    }
    
    updateProgress(progress: number): void {
        if (this.state.status === "loading") {
            this.state.progress = progress;
        }
    }
    
    setSuccess(data: any): void {
        this.state = {
            status: "success",
            data,
            timestamp: new Date()
        };
    }
    
    setError(error: string): void {
        const retryCount = this.state.status === "error" 
            ? this.state.retryCount + 1 
            : 0;
        
        this.state = {
            status: "error",
            error,
            retryCount
        };
    }
    
    canRetry(): boolean {
        return this.state.status === "error" && this.state.retryCount < 3;
    }
}
```

## 8.5 索引类型

### 8.5.1 keyof 操作符
```typescript
interface Person {
    name: string;
    age: number;
    location: string;
}

type PersonKeys = keyof Person; // "name" | "age" | "location"

// 动态属性访问
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const person: Person = {
    name: "Alice",
    age: 30,
    location: "New York"
};

const name = getProperty(person, "name");     // string
const age = getProperty(person, "age");       // number
// const invalid = getProperty(person, "salary"); // Error

// 批量属性提取
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        result[key] = obj[key];
    });
    return result;
}

const subset = pick(person, ["name", "age"]);
// 类型：{ name: string; age: number; }
```

### 8.5.2 映射类型的高级应用
```typescript
// 可选化特定属性
type PartialByKeys<T, K extends keyof T> = {
    [P in K]?: T[P];
} & {
    [P in Exclude<keyof T, K>]: T[P];
};

type PersonWithOptionalAge = PartialByKeys<Person, "age">;
// { name: string; location: string; age?: number; }

// 属性类型变换
type Stringify<T> = {
    [K in keyof T]: string;
};

type StringifiedPerson = Stringify<Person>;
// { name: string; age: string; location: string; }

// 嵌套属性路径
type NestedKeyOf<T extends Record<string, any>> = {
    [K in keyof T & (string | number)]: T[K] extends Record<string, any>
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
}[keyof T & (string | number)];

interface NestedObject {
    user: {
        profile: {
            name: string;
            email: string;
        };
        settings: {
            theme: string;
        };
    };
    app: {
        version: string;
    };
}

type NestedPaths = NestedKeyOf<NestedObject>;
// "user" | "app" | "user.profile" | "user.settings" | "user.profile.name" | 
// "user.profile.email" | "user.settings.theme" | "app.version"

// 深度获取属性值
type DeepGet<T, K extends string> = K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
        ? DeepGet<T[First], Rest>
        : never
    : K extends keyof T
    ? T[K]
    : never;

function deepGet<T, K extends NestedKeyOf<T>>(
    obj: T,
    path: K
): DeepGet<T, K> {
    const keys = path.split('.');
    let result: any = obj;
    
    for (const key of keys) {
        result = result?.[key];
    }
    
    return result;
}

const nested: NestedObject = {
    user: {
        profile: { name: "Alice", email: "alice@example.com" },
        settings: { theme: "dark" }
    },
    app: { version: "1.0.0" }
};

const userName = deepGet(nested, "user.profile.name"); // string
const appVersion = deepGet(nested, "app.version");     // string
```

## 8.6 模板字面量类型

### 8.6.1 基本模板字面量类型
```typescript
// 模板字面量类型
type Greeting = `Hello, ${string}!`;

let greeting1: Greeting = "Hello, World!";
let greeting2: Greeting = "Hello, TypeScript!";
// let invalid: Greeting = "Hi there!"; // Error

// 与联合类型结合
type Color = "red" | "green" | "blue";
type Size = "small" | "medium" | "large";
type ClassName = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" | "green-small" | ...

// 事件名称生成
type EventType = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventType>}`;
// "onClick" | "onFocus" | "onBlur"

interface ButtonProps {
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}
```

### 8.6.2 高级模板字面量应用
```typescript
// CSS 属性生成
type CSSProperty = 
    | "margin" 
    | "padding" 
    | "border";

type CSSDirection = 
    | "top" 
    | "right" 
    | "bottom" 
    | "left";

type CSSShorthand = CSSProperty;
type CSSLonghand = `${CSSProperty}-${CSSDirection}`;
type CSSPropertyName = CSSShorthand | CSSLonghand;

// SQL 查询构建器
type TableName = "users" | "posts" | "comments";
type SqlOperation = "SELECT" | "INSERT" | "UPDATE" | "DELETE";
type SqlQuery = `${SqlOperation} * FROM ${TableName}`;

type UserQueries = SqlQuery & `${SqlOperation} * FROM users`;
// "SELECT * FROM users" | "INSERT * FROM users" | "UPDATE * FROM users" | "DELETE * FROM users"

// URL 路径类型
type ApiVersion = "v1" | "v2";
type Resource = "users" | "posts";
type ResourceId = string;
type ApiPath = 
    | `/api/${ApiVersion}/${Resource}`
    | `/api/${ApiVersion}/${Resource}/${ResourceId}`;

function makeApiCall(path: ApiPath) {
    // API 调用实现
    console.log(`Calling ${path}`);
}

makeApiCall("/api/v1/users");
makeApiCall("/api/v2/posts/123");
// makeApiCall("/api/v3/users"); // Error: 不是有效的 API 路径
```

### 8.6.3 字符串操作工具类型
```typescript
// 自定义字符串操作类型
type Split<S extends string, D extends string> = 
    S extends `${infer T}${D}${infer U}` 
        ? [T, ...Split<U, D>] 
        : [S];

type SplitResult = Split<"a,b,c", ",">; // ["a", "b", "c"]

// 路径参数提取
type ExtractParams<T extends string> = 
    T extends `${string}:${infer Param}/${infer Rest}`
        ? Param | ExtractParams<Rest>
        : T extends `${string}:${infer Param}`
        ? Param
        : never;

type RouteParams = ExtractParams<"/users/:id/posts/:postId">;
// "id" | "postId"

// 路由类型安全
type Route = "/users/:id" | "/posts/:postId" | "/users/:userId/posts/:postId";

type RouteParamsMap = {
    "/users/:id": { id: string };
    "/posts/:postId": { postId: string };
    "/users/:userId/posts/:postId": { userId: string; postId: string };
};

function navigate<T extends Route>(
    route: T,
    params: RouteParamsMap[T]
): void {
    // 路由导航实现
    console.log(`Navigating to ${route} with params:`, params);
}

navigate("/users/:id", { id: "123" });
navigate("/users/:userId/posts/:postId", { userId: "456", postId: "789" });
// navigate("/users/:id", { userId: "123" }); // Error: 参数类型不匹配
```

## 8.7 条件类型深入

### 8.7.1 递归条件类型
```typescript
// 深度展平数组类型
type Flatten<T> = T extends readonly (infer U)[]
    ? Flatten<U>
    : T;

type NestedArray = readonly (readonly (readonly string[])[])[];
type FlatArray = Flatten<NestedArray>; // string

// 深度可选类型
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? DeepPartial<T[P]>
        : T[P];
};

interface ComplexObject {
    user: {
        profile: {
            name: string;
            email: string;
        };
        settings: {
            theme: string;
            notifications: boolean;
        };
    };
    data: string[];
}

type PartialComplex = DeepPartial<ComplexObject>;
// 所有嵌套属性都变为可选

// 递归对象键路径
type Paths<T, D extends number = 10> = [D] extends [never] 
    ? never 
    : T extends object 
    ? {
        [K in keyof T]-?: K extends string | number
            ? `${K}` | Join<K, Paths<T[K], Prev[D]>>
            : never;
    }[keyof T]
    : "";

type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}${"" extends P ? "" : "."}${P}`
        : never
    : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ...0[]];

type ObjectPaths = Paths<ComplexObject>;
// "user" | "data" | "user.profile" | "user.settings" | "user.profile.name" | ...
```

### 8.7.2 类型级编程
```typescript
// 类型级数学运算
type Length<T extends readonly any[]> = T['length'];

type Tuple1 = [1, 2, 3];
type Tuple1Length = Length<Tuple1>; // 3

// 类型级列表操作
type Head<T extends readonly any[]> = T extends readonly [infer H, ...any[]] ? H : never;
type Tail<T extends readonly any[]> = T extends readonly [any, ...infer Rest] ? Rest : [];

type FirstElement = Head<[1, 2, 3]>; // 1
type RestElements = Tail<[1, 2, 3]>; // [2, 3]

// 类型级函数组合
type Pipe<T, F extends readonly any[]> = 
    F extends readonly [infer First, ...infer Rest]
        ? First extends (arg: T) => infer R
            ? Pipe<R, Rest>
            : never
        : T;

// 模拟函数类型
type ToString = (x: number) => string;
type ToUpperCase = (x: string) => string;
type AddExclamation = (x: string) => string;

type Pipeline = [ToString, ToUpperCase, AddExclamation];
type Result = Pipe<number, Pipeline>; // string

// 实际实现
function pipe<T, F extends readonly any[]>(
    value: T,
    ...functions: F & PipeConstraint<T, F>
): Pipe<T, F> {
    return functions.reduce((acc, fn) => fn(acc), value as any);
}

type PipeConstraint<T, F extends readonly any[]> = 
    F extends readonly [infer First, ...infer Rest]
        ? First extends (arg: T) => infer R
            ? Rest extends readonly any[]
                ? [First, ...PipeConstraint<R, Rest>]
                : never
            : never
        : [];

// 使用示例
const result = pipe(
    42,
    (x: number) => x.toString(),
    (x: string) => x.toUpperCase(),
    (x: string) => x + "!"
); // 类型为 string，值为 "42!"
```

## 🔧 练习题

### 练习 1：实现深度更新类型
```typescript
// 实现一个类型，允许深度更新嵌套对象的任意属性
// 类似于 lodash 的 set 函数

type DeepUpdate<T, Path extends string, Value> = // 你的实现

// 使用示例
interface State {
    user: {
        profile: {
            name: string;
            age: number;
        }
    }
}

type UpdatedState = DeepUpdate<State, "user.profile.name", "New Name">;
// 应该保持其他属性不变，只更新指定路径的值
```

### 练习 2：类型安全的状态机
```typescript
// 实现一个类型安全的状态机，确保状态转换的合法性

interface StateMachineConfig {
    // 定义状态和转换规则
}

// 你的实现
```

### 练习 3：类型级 JSON 解析器
```typescript
// 实现一个类型级的 JSON 字符串解析器
// 能够从 JSON 字符串推断出对应的 TypeScript 类型

type ParseJSON<T extends string> = // 你的实现

type JSONString = '{"name": "Alice", "age": 30, "active": true}';
type ParsedType = ParseJSON<JSONString>;
// 应该推断为 { name: string; age: number; active: boolean; }
```

## 📚 扩展阅读

- [Advanced Types - TypeScript](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
- [Conditional Types - TypeScript](https://www.typescriptlang.org/docs/handbook/conditional-types.html)
- [Template Literal Types - TypeScript](https://www.typescriptlang.org/docs/handbook/template-literal-types.html)

## 📝 本章小结

- 高级类型系统为 TypeScript 提供了强大的类型操作能力
- 类型保护和可辨识联合确保运行时的类型安全
- 模板字面量类型提供了字符串类型的精确控制
- 条件类型和映射类型支持复杂的类型变换
- 这些特性结合使用可以创建高度类型安全的 API

---

**下一章：[第 9 章：模块与命名空间](../09-modules/README.md)**
