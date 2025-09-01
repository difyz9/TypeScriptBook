// 用户管理模块
// 演示接口和类的导出

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
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

/**
 * 用户管理器类
 */
export class UserManager {
  private users: User[] = [];

  /**
   * 添加用户
   */
  addUser(user: User): void {
    this.users.push(user);
    console.log(`用户 ${user.name} 已添加`);
  }

  /**
   * 根据ID获取用户
   */
  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  /**
   * 获取所有活跃用户
   */
  getActiveUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }

  /**
   * 获取用户总数
   */
  getUserCount(): number {
    return this.users.length;
  }

  /**
   * 删除用户
   */
  removeUser(id: number): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      const removedUser = this.users.splice(index, 1)[0];
      console.log(`用户 ${removedUser.name} 已删除`);
      return true;
    }
    return false;
  }
}

/**
 * 创建示例用户的工厂函数
 */
export function createSampleUser(id: number, name: string, email: string): User {
  return {
    id,
    name,
    email,
    age: Math.floor(Math.random() * 50) + 18,
    isActive: Math.random() > 0.2
  };
}
