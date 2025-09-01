// 字符串处理模块
// 演示默认导出（Default Export）

/**
 * 字符串工具类
 */
class StringUtils {
  /**
   * 首字母大写
   */
  static capitalize(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * 反转字符串
   */
  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  /**
   * 判断是否为回文
   */
  static isPalindrome(str: string): boolean {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  /**
   * 统计单词数量
   */
  static countWords(str: string): number {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * 截断字符串
   */
  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  }
}

// 默认导出
export default StringUtils;
