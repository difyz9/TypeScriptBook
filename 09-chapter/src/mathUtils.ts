// 数学计算模块
// 演示命名导出（Named Exports）

/**
 * 加法函数
 */
export function add(a: number, b: number): number {
  return a + b;
}

/**
 * 减法函数
 */
export function subtract(a: number, b: number): number {
  return a - b;
}

/**
 * 乘法函数
 */
export function multiply(a: number, b: number): number {
  return a * b;
}

/**
 * 除法函数
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("除数不能为零");
  }
  return a / b;
}

/**
 * 数学常量
 */
export const PI = 3.14159;
export const E = 2.71828;

/**
 * 计算圆的面积
 */
export function calculateCircleArea(radius: number): number {
  return PI * radius * radius;
}
