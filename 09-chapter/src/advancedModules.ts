// 高级模块使用示例
// 演示动态导入、模块聚合等高级特性

/**
 * 演示动态导入
 */
async function demonstrateDynamicImport(): Promise<void> {
  console.log('\n========== 动态导入演示 ==========');
  
  try {
    // 动态导入数学工具模块
    const mathModule = await import('./mathUtils');
    console.log(`动态导入结果: 2 + 3 = ${mathModule.add(2, 3)}`);
    
    // 动态导入默认导出
    const StringUtilsModule = await import('./stringUtils');
    const StringUtils = StringUtilsModule.default;
    console.log(`动态导入默认导出: ${StringUtils.capitalize('dynamic import')}`);
    
  } catch (error) {
    console.error('动态导入失败:', error);
  }
}

/**
 * 演示条件导入
 */
async function demonstrateConditionalImport(useAdvanced: boolean): Promise<void> {
  console.log('\n========== 条件导入演示 ==========');
  
  if (useAdvanced) {
    // 只在需要时导入复杂模块
    const { UserManager, createSampleUser } = await import('./userManager');
    const manager = new UserManager();
    const user = createSampleUser(1, "条件用户", "conditional@example.com");
    manager.addUser(user);
    console.log(`条件导入: 创建了用户 ${user.name}`);
  } else {
    console.log('使用基础功能，未导入高级模块');
  }
}

/**
 * 模块工厂模式
 */
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

async function createCalculator(): Promise<Calculator> {
  const mathModule = await import('./mathUtils');
  
  return {
    add: mathModule.add,
    subtract: mathModule.subtract
  };
}

/**
 * 模块缓存演示
 */
class ModuleCache {
  private cache = new Map<string, any>();

  async getModule(moduleName: string): Promise<any> {
    if (this.cache.has(moduleName)) {
      console.log(`从缓存获取模块: ${moduleName}`);
      return this.cache.get(moduleName);
    }

    console.log(`首次加载模块: ${moduleName}`);
    let module: any;
    
    switch (moduleName) {
      case 'math':
        module = await import('./mathUtils');
        break;
      case 'string':
        module = await import('./stringUtils');
        break;
      case 'date':
        module = await import('./dateUtils');
        break;
      default:
        throw new Error(`未知模块: ${moduleName}`);
    }
    
    this.cache.set(moduleName, module);
    return module;
  }

  clearCache(): void {
    this.cache.clear();
    console.log('模块缓存已清空');
  }
}

/**
 * 主演示函数
 */
async function demonstrateAdvancedModules(): Promise<void> {
  console.log('='.repeat(50));
  console.log('高级模块使用模式演示');
  console.log('='.repeat(50));

  // 动态导入演示
  await demonstrateDynamicImport();

  // 条件导入演示
  await demonstrateConditionalImport(true);
  await demonstrateConditionalImport(false);

  // 模块工厂演示
  console.log('\n========== 模块工厂演示 ==========');
  const calculator = await createCalculator();
  console.log(`工厂创建的计算器: 5 + 3 = ${calculator.add(5, 3)}`);

  // 模块缓存演示
  console.log('\n========== 模块缓存演示 ==========');
  const cache = new ModuleCache();
  
  // 首次加载
  const mathModule1 = await cache.getModule('math');
  console.log(`首次使用: 10 + 5 = ${mathModule1.add(10, 5)}`);
  
  // 从缓存加载
  const mathModule2 = await cache.getModule('math');
  console.log(`缓存使用: 7 + 8 = ${mathModule2.add(7, 8)}`);
  
  cache.clearCache();

  console.log('\n='.repeat(50));
  console.log('高级演示完成！');
  console.log('='.repeat(50));
}

// 导出函数供其他模块使用
export { demonstrateAdvancedModules };

// 如果直接运行此文件
if (require.main === module) {
  demonstrateAdvancedModules().catch(console.error);
}
