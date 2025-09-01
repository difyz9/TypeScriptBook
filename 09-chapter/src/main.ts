// 主程序文件
// 演示各种模块导入和函数调用方式

// ========== 导入方式演示 ==========

// 1. 命名导入 - 从数学工具模块导入特定函数
import { add, subtract, multiply, PI, calculateCircleArea } from './mathUtils';

// 2. 默认导入 - 导入字符串工具类
import StringUtils from './stringUtils';

// 3. 混合导入 - 同时导入命名导出和默认导出
import DateHelper, { formatDate, getDaysDifference, DAYS_IN_WEEK } from './dateUtils';

// 4. 命名空间导入 - 导入整个模块
import * as UserModule from './userManager';

// 5. 重命名导入 - 导入时重命名
import { getConfig as getAppConfig, defaultConfig } from './config';

// 6. 从索引文件导入
import { Utils } from './index';

/**
 * 演示数学运算功能
 */
function demonstrateMathOperations(): void {
  console.log('\n========== 数学运算演示 ==========');
  
  const num1 = 10;
  const num2 = 3;
  
  console.log(`${num1} + ${num2} = ${add(num1, num2)}`);
  console.log(`${num1} - ${num2} = ${subtract(num1, num2)}`);
  console.log(`${num1} × ${num2} = ${multiply(num1, num2)}`);
  
  const radius = 5;
  console.log(`半径为 ${radius} 的圆的面积: ${calculateCircleArea(radius)}`);
  console.log(`圆周率 PI = ${PI}`);
}

/**
 * 演示字符串处理功能
 */
function demonstrateStringOperations(): void {
  console.log('\n========== 字符串处理演示 ==========');
  
  const text = "hello world";
  const palindrome = "A man a plan a canal Panama";
  const longText = "这是一个很长的字符串，需要被截断处理";
  
  console.log(`原文: "${text}"`);
  console.log(`首字母大写: "${StringUtils.capitalize(text)}"`);
  console.log(`反转: "${StringUtils.reverse(text)}"`);
  
  console.log(`\n"${palindrome}" 是回文吗? ${StringUtils.isPalindrome(palindrome)}`);
  console.log(`单词数量: ${StringUtils.countWords(palindrome)}`);
  
  console.log(`\n原文: "${longText}"`);
  console.log(`截断(20字符): "${StringUtils.truncate(longText, 20)}"`);
}

/**
 * 演示用户管理功能
 */
function demonstrateUserManagement(): void {
  console.log('\n========== 用户管理演示 ==========');
  
  // 创建用户管理器实例
  const userManager = new UserModule.UserManager();
  
  // 创建示例用户
  const user1 = UserModule.createSampleUser(1, "张三", "zhangsan@example.com");
  const user2 = UserModule.createSampleUser(2, "李四", "lisi@example.com");
  const user3: UserModule.User = {
    id: 3,
    name: "王五",
    email: "wangwu@example.com",
    age: 25,
    isActive: true
  };
  
  // 添加用户
  userManager.addUser(user1);
  userManager.addUser(user2);
  userManager.addUser(user3);
  
  console.log(`\n总用户数: ${userManager.getUserCount()}`);
  console.log(`活跃用户数: ${userManager.getActiveUsers().length}`);
  
  // 查找用户
  const foundUser = userManager.getUserById(2);
  if (foundUser) {
    console.log(`找到用户: ${foundUser.name} (${foundUser.email})`);
  }
  
  // 演示枚举使用
  console.log(`\n用户角色类型:`);
  Object.values(UserModule.UserRole).forEach(role => {
    console.log(`- ${role}`);
  });
}

/**
 * 演示日期时间功能
 */
function demonstrateDateOperations(): void {
  console.log('\n========== 日期时间演示 ==========');
  
  const today = new Date();
  const tomorrow = DateHelper.addDays(today, 1);
  const firstDay = DateHelper.getFirstDayOfMonth(today);
  
  console.log(`今天: ${formatDate(today)}`);
  console.log(`明天: ${formatDate(tomorrow, 'DD/MM/YYYY')}`);
  console.log(`本月第一天: ${formatDate(firstDay, 'MM-DD-YYYY')}`);
  
  const daysDiff = getDaysDifference(today, tomorrow);
  console.log(`今天和明天相差 ${daysDiff} 天`);
  
  console.log(`一周有 ${DAYS_IN_WEEK} 天`);
  console.log(`当前时间戳: ${DateHelper.now()}`);
}

/**
 * 演示配置管理功能
 */
function demonstrateConfigManagement(): void {
  console.log('\n========== 配置管理演示 ==========');
  
  console.log('默认配置:');
  console.log(JSON.stringify(defaultConfig, null, 2));
  
  const currentConfig = getAppConfig();
  console.log('\n当前配置:');
  console.log(JSON.stringify(currentConfig, null, 2));
}

/**
 * 演示通过索引文件的统一访问
 */
function demonstrateUtilsAccess(): void {
  console.log('\n========== 统一工具访问演示 ==========');
  
  // 通过Utils对象访问各种工具
  console.log(`使用Utils.Math: 5 + 3 = ${Utils.Math.add(5, 3)}`);
  console.log(`使用Utils.String: "${Utils.String.capitalize('typescript')}" `);
  console.log(`使用Utils.Date: 当前时间戳 ${Utils.Date.now()}`);
  
  // 创建用户管理器实例
  const userManager = new Utils.User();
  console.log(`使用Utils.User: 初始用户数 ${userManager.getUserCount()}`);
}

/**
 * 演示错误处理
 */
function demonstrateErrorHandling(): void {
  console.log('\n========== 错误处理演示 ==========');
  
  try {
    // 尝试除以零
    const result = Utils.Math.divide(10, 0);
    console.log(`10 ÷ 0 = ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`捕获到错误: ${error.message}`);
    }
  }
}

/**
 * 主函数 - 程序入口点
 */
function main(): void {
  console.log('='.repeat(50));
  console.log('TypeScript 多模块函数调用演示');
  console.log('='.repeat(50));
  
  // 依次演示各个功能模块
  demonstrateMathOperations();
  demonstrateStringOperations();
  demonstrateUserManagement();
  demonstrateDateOperations();
  demonstrateConfigManagement();
  demonstrateUtilsAccess();
  demonstrateErrorHandling();
  
  console.log('\n='.repeat(50));
  console.log('演示完成！');
  console.log('='.repeat(50));
}

// 运行主函数
if (require.main === module) {
  main();
}

// 也可以导出main函数供其他模块使用
export { main };
