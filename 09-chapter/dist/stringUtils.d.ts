/**
 * 字符串工具类
 */
declare class StringUtils {
    /**
     * 首字母大写
     */
    static capitalize(str: string): string;
    /**
     * 反转字符串
     */
    static reverse(str: string): string;
    /**
     * 判断是否为回文
     */
    static isPalindrome(str: string): boolean;
    /**
     * 统计单词数量
     */
    static countWords(str: string): number;
    /**
     * 截断字符串
     */
    static truncate(str: string, maxLength: number): string;
}
export default StringUtils;
//# sourceMappingURL=stringUtils.d.ts.map