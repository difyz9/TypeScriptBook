"use strict";
// 用户管理模块
// 演示接口和类的导出
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = exports.UserRole = void 0;
exports.createSampleUser = createSampleUser;
/**
 * 用户角色枚举
 */
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (exports.UserRole = UserRole = {}));
/**
 * 用户管理器类
 */
class UserManager {
    constructor() {
        this.users = [];
    }
    /**
     * 添加用户
     */
    addUser(user) {
        this.users.push(user);
        console.log(`用户 ${user.name} 已添加`);
    }
    /**
     * 根据ID获取用户
     */
    getUserById(id) {
        return this.users.find(user => user.id === id);
    }
    /**
     * 获取所有活跃用户
     */
    getActiveUsers() {
        return this.users.filter(user => user.isActive);
    }
    /**
     * 获取用户总数
     */
    getUserCount() {
        return this.users.length;
    }
    /**
     * 删除用户
     */
    removeUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            const removedUser = this.users.splice(index, 1)[0];
            console.log(`用户 ${removedUser.name} 已删除`);
            return true;
        }
        return false;
    }
}
exports.UserManager = UserManager;
/**
 * 创建示例用户的工厂函数
 */
function createSampleUser(id, name, email) {
    return {
        id,
        name,
        email,
        age: Math.floor(Math.random() * 50) + 18,
        isActive: Math.random() > 0.2
    };
}
//# sourceMappingURL=userManager.js.map