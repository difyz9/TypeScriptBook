"use strict";
// 数学计算模块
// 演示命名导出（Named Exports）
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = exports.PI = void 0;
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;
exports.calculateCircleArea = calculateCircleArea;
/**
 * 加法函数
 */
function add(a, b) {
    return a + b;
}
/**
 * 减法函数
 */
function subtract(a, b) {
    return a - b;
}
/**
 * 乘法函数
 */
function multiply(a, b) {
    return a * b;
}
/**
 * 除法函数
 */
function divide(a, b) {
    if (b === 0) {
        throw new Error("除数不能为零");
    }
    return a / b;
}
/**
 * 数学常量
 */
exports.PI = 3.14159;
exports.E = 2.71828;
/**
 * 计算圆的面积
 */
function calculateCircleArea(radius) {
    return exports.PI * radius * radius;
}
//# sourceMappingURL=mathUtils.js.map