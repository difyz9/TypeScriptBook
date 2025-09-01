// 配置模块
// 演示重新导出（re-export）

/**
 * 应用配置接口
 */
export interface AppConfig {
  appName: string;
  version: string;
  debug: boolean;
  apiUrl: string;
  timeout: number;
}

/**
 * 默认配置
 */
export const defaultConfig: AppConfig = {
  appName: 'TypeScript Modules Demo',
  version: '1.0.0',
  debug: true,
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

/**
 * 获取配置
 */
export function getConfig(): AppConfig {
  return { ...defaultConfig };
}

/**
 * 更新配置
 */
export function updateConfig(updates: Partial<AppConfig>): AppConfig {
  return { ...defaultConfig, ...updates };
}
