// 索引文件 - 统一导出所有模块
// 演示重新导出模式

// 重新导出数学工具的所有命名导出
export * from './mathUtils';

// 重新导出字符串工具的默认导出，并重命名
export { default as StringUtils } from './stringUtils';

// 重新导出用户管理模块的所有导出
export * from './userManager';

// 重新导出日期工具的命名导出和默认导出
export * from './dateUtils';
export { default as DateHelper } from './dateUtils';

// 重新导出配置模块
export * from './config';

// 创建一个综合的工具对象
import * as MathUtils from './mathUtils';
import StringUtils from './stringUtils';
import { UserManager } from './userManager';
import DateHelper from './dateUtils';

export const Utils = {
  Math: MathUtils,
  String: StringUtils,
  Date: DateHelper,
  User: UserManager
};
