"use strict";
// 日期和时间工具模块
// 演示混合导出方式
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTHS_IN_YEAR = exports.DAYS_IN_WEEK = void 0;
exports.formatDate = formatDate;
exports.getDaysDifference = getDaysDifference;
exports.isLeapYear = isLeapYear;
/**
 * 格式化日期
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month}-${day}`;
        case 'DD/MM/YYYY':
            return `${day}/${month}/${year}`;
        case 'MM-DD-YYYY':
            return `${month}-${day}-${year}`;
        default:
            return `${year}-${month}-${day}`;
    }
}
/**
 * 获取两个日期之间的天数差
 */
function getDaysDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
}
/**
 * 判断是否为闰年
 */
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
/**
 * 日期工具类（默认导出）
 */
class DateHelper {
    /**
     * 获取当前时间戳
     */
    static now() {
        return Date.now();
    }
    /**
     * 添加天数
     */
    static addDays(date, days) {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    /**
     * 获取月份的第一天
     */
    static getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    /**
     * 获取月份的最后一天
     */
    static getLastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
}
// 同时使用命名导出和默认导出
exports.default = DateHelper;
// 导出常量
exports.DAYS_IN_WEEK = 7;
exports.MONTHS_IN_YEAR = 12;
//# sourceMappingURL=dateUtils.js.map