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
export declare const defaultConfig: AppConfig;
/**
 * 获取配置
 */
export declare function getConfig(): AppConfig;
/**
 * 更新配置
 */
export declare function updateConfig(updates: Partial<AppConfig>): AppConfig;
//# sourceMappingURL=config.d.ts.map