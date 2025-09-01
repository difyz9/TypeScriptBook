/**
 * 用户接口
 */
export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
}
/**
 * 用户角色枚举
 */
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MODERATOR = "moderator"
}
/**
 * 用户管理器类
 */
export declare class UserManager {
    private users;
    /**
     * 添加用户
     */
    addUser(user: User): void;
    /**
     * 根据ID获取用户
     */
    getUserById(id: number): User | undefined;
    /**
     * 获取所有活跃用户
     */
    getActiveUsers(): User[];
    /**
     * 获取用户总数
     */
    getUserCount(): number;
    /**
     * 删除用户
     */
    removeUser(id: number): boolean;
}
/**
 * 创建示例用户的工厂函数
 */
export declare function createSampleUser(id: number, name: string, email: string): User;
//# sourceMappingURL=userManager.d.ts.map