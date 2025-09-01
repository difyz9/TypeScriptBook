/**
 * 格式化日期
 */
export declare function formatDate(date: Date, format?: string): string;
/**
 * 获取两个日期之间的天数差
 */
export declare function getDaysDifference(date1: Date, date2: Date): number;
/**
 * 判断是否为闰年
 */
export declare function isLeapYear(year: number): boolean;
/**
 * 日期工具类（默认导出）
 */
declare class DateHelper {
    /**
     * 获取当前时间戳
     */
    static now(): number;
    /**
     * 添加天数
     */
    static addDays(date: Date, days: number): Date;
    /**
     * 获取月份的第一天
     */
    static getFirstDayOfMonth(date: Date): Date;
    /**
     * 获取月份的最后一天
     */
    static getLastDayOfMonth(date: Date): Date;
}
export default DateHelper;
export declare const DAYS_IN_WEEK = 7;
export declare const MONTHS_IN_YEAR = 12;
//# sourceMappingURL=dateUtils.d.ts.map