"use strict";
// 配置模块
// 演示重新导出（re-export）
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultConfig = void 0;
exports.getConfig = getConfig;
exports.updateConfig = updateConfig;
/**
 * 默认配置
 */
exports.defaultConfig = {
    appName: 'TypeScript Modules Demo',
    version: '1.0.0',
    debug: true,
    apiUrl: 'https://api.example.com',
    timeout: 5000
};
/**
 * 获取配置
 */
function getConfig() {
    return { ...exports.defaultConfig };
}
/**
 * 更新配置
 */
function updateConfig(updates) {
    return { ...exports.defaultConfig, ...updates };
}
//# sourceMappingURL=config.js.map