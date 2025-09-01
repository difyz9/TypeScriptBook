"use strict";
// 索引文件 - 统一导出所有模块
// 演示重新导出模式
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = exports.DateHelper = exports.StringUtils = void 0;
// 重新导出数学工具的所有命名导出
__exportStar(require("./mathUtils"), exports);
// 重新导出字符串工具的默认导出，并重命名
var stringUtils_1 = require("./stringUtils");
Object.defineProperty(exports, "StringUtils", { enumerable: true, get: function () { return __importDefault(stringUtils_1).default; } });
// 重新导出用户管理模块的所有导出
__exportStar(require("./userManager"), exports);
// 重新导出日期工具的命名导出和默认导出
__exportStar(require("./dateUtils"), exports);
var dateUtils_1 = require("./dateUtils");
Object.defineProperty(exports, "DateHelper", { enumerable: true, get: function () { return __importDefault(dateUtils_1).default; } });
// 重新导出配置模块
__exportStar(require("./config"), exports);
// 创建一个综合的工具对象
const MathUtils = __importStar(require("./mathUtils"));
const stringUtils_2 = __importDefault(require("./stringUtils"));
const userManager_1 = require("./userManager");
const dateUtils_2 = __importDefault(require("./dateUtils"));
exports.Utils = {
    Math: MathUtils,
    String: stringUtils_2.default,
    Date: dateUtils_2.default,
    User: userManager_1.UserManager
};
//# sourceMappingURL=index.js.map