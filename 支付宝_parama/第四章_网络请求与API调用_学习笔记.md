# 第四章：网络请求与API调用 - 学习笔记

## 4.1 网络请求基础

### my.request API详解

#### 1. 基础用法
```javascript
// 最简单的GET请求
my.request({
  url: 'https://api.example.com/users',
  method: 'GET',
  success: (res) => {
    console.log('请求成功:', res.data);
  },
  fail: (err) => {
    console.error('请求失败:', err);
  },
  complete: () => {
    console.log('请求完成');
  }
});

// Promise封装的请求
function apiRequest(options) {
  return new Promise((resolve, reject) => {
    my.request({
      ...options,
      success: resolve,
      fail: reject
    });
  });
}

// 使用async/await
async function fetchUserData(userId) {
  try {
    const res = await apiRequest({
      url: `https://api.example.com/users/${userId}`,
      method: 'GET'
    });
    return res.data;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}
```

#### 2. 完整参数配置
```javascript
my.request({
  url: 'https://api.example.com/api/data',
  method: 'POST',                    // HTTP方法: GET | POST | PUT | DELETE
  data: {                           // 请求数据
    name: 'John',
    age: 25
  },
  headers: {                        // 请求头
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123',
    'X-Request-ID': 'unique-id'
  },
  timeout: 10000,                   // 超时时间(毫秒)
  dataType: 'json',                 // 响应数据类型: json | text | base64
  responseType: 'text',             // 响应类型
  success: (res) => {
    console.log('状态码:', res.status);
    console.log('响应头:', res.headers);
    console.log('响应数据:', res.data);
  },
  fail: (err) => {
    console.error('错误码:', err.error);
    console.error('错误信息:', err.errorMessage);
  },
  complete: () => {
    console.log('请求完成');
  }
});
```

### 请求参数配置

#### 1. HTTP方法使用
```javascript
// GET请求 - 获取数据
async function getUsers(page = 1, size = 20) {
  const res = await apiRequest({
    url: 'https://api.example.com/users',
    method: 'GET',
    data: { page, size }  // GET参数会自动拼接到URL
  });
  return res.data;
}

// POST请求 - 创建数据
async function createUser(userData) {
  const res = await apiRequest({
    url: 'https://api.example.com/users',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  });
  return res.data;
}

// PUT请求 - 更新数据
async function updateUser(userId, userData) {
  const res = await apiRequest({
    url: `https://api.example.com/users/${userId}`,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    data: userData
  });
  return res.data;
}

// DELETE请求 - 删除数据
async function deleteUser(userId) {
  const res = await apiRequest({
    url: `https://api.example.com/users/${userId}`,
    method: 'DELETE'
  });
  return res.data;
}
```

#### 2. 请求头管理
```javascript
// 全局请求头配置
const globalHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
};

// Token管理
class TokenManager {
  static getToken() {
    return my.getStorageSync({ key: 'access_token' }).data || '';
  }
  
  static setToken(token) {
    my.setStorageSync({
      key: 'access_token',
      data: token
    });
  }
  
  static removeToken() {
    my.removeStorageSync({ key: 'access_token' });
  }
}

// 带认证的请求
function authenticatedRequest(options) {
  const token = TokenManager.getToken();
  
  return apiRequest({
    ...options,
    headers: {
      ...globalHeaders,
      ...options.headers,
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  });
}
```

#### 3. 数据格式处理
```javascript
// JSON数据发送
function sendJsonData(data) {
  return my.request({
    url: 'https://api.example.com/json',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  });
}

// 表单数据发送
function sendFormData(data) {
  const formData = Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
    
  return my.request({
    url: 'https://api.example.com/form',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: formData
  });
}

// 文件数据发送
function sendFileData(filePath, additionalData = {}) {
  return my.uploadFile({
    url: 'https://api.example.com/upload',
    filePath: filePath,
    name: 'file',
    formData: additionalData,
    success: (res) => {
      console.log('上传成功:', res);
    }
  });
}
```

### 响应数据处理

#### 1. 响应数据解析
```javascript
// 统一响应处理
function handleResponse(response) {
  const { status, data, headers } = response;
  
  // 检查HTTP状态码
  if (status >= 200 && status < 300) {
    // 检查业务状态码
    if (data.code === 0) {
      return data.result;
    } else {
      throw new Error(data.message || '业务处理失败');
    }
  } else {
    throw new Error(`HTTP错误: ${status}`);
  }
}

// 使用示例
async function fetchUserProfile(userId) {
  try {
    const response = await apiRequest({
      url: `https://api.example.com/users/${userId}`,
      method: 'GET'
    });
    
    const userData = handleResponse(response);
    return userData;
  } catch (error) {
    console.error('获取用户资料失败:', error.message);
    throw error;
  }
}
```

#### 2. 不同数据类型处理
```javascript
// 处理JSON响应
async function fetchJsonData() {
  const res = await apiRequest({
    url: 'https://api.example.com/data.json',
    dataType: 'json'
  });
  return res.data; // 自动解析为对象
}

// 处理文本响应
async function fetchTextData() {
  const res = await apiRequest({
    url: 'https://api.example.com/data.txt',
    dataType: 'text'
  });
  return res.data; // 原始文本
}

// 处理二进制数据
async function fetchBinaryData() {
  const res = await apiRequest({
    url: 'https://api.example.com/file.bin',
    responseType: 'arraybuffer'
  });
  return res.data; // ArrayBuffer
}

// 处理Base64数据
async function fetchBase64Data() {
  const res = await apiRequest({
    url: 'https://api.example.com/image',
    dataType: 'base64'
  });
  return `data:image/jpeg;base64,${res.data}`;
}
```

### 错误处理机制

#### 1. 分层错误处理
```javascript
// 网络错误类型
const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  HTTP_ERROR: 'HTTP_ERROR',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  PARSE_ERROR: 'PARSE_ERROR'
};

// 自定义错误类
class ApiError extends Error {
  constructor(type, message, code = null, details = null) {
    super(message);
    this.type = type;
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
  }
}

// 错误处理函数
function handleApiError(error, url) {
  console.error(`API请求失败 [${url}]:`, error);
  
  // 网络连接错误
  if (error.error === 14) {
    return new ApiError(
      ErrorTypes.NETWORK_ERROR,
      '网络连接失败，请检查网络设置',
      error.error
    );
  }
  
  // 超时错误
  if (error.error === 13) {
    return new ApiError(
      ErrorTypes.TIMEOUT_ERROR,
      '请求超时，请稍后重试',
      error.error
    );
  }
  
  // HTTP状态错误
  if (error.status >= 400) {
    const messages = {
      400: '请求参数错误',
      401: '未授权访问',
      403: '访问被拒绝',
      404: '资源不存在',
      500: '服务器内部错误',
      502: '网关错误',
      503: '服务不可用'
    };
    
    return new ApiError(
      ErrorTypes.HTTP_ERROR,
      messages[error.status] || `HTTP错误: ${error.status}`,
      error.status
    );
  }
  
  return new ApiError(
    ErrorTypes.NETWORK_ERROR,
    error.errorMessage || '未知网络错误',
    error.error
  );
}
```

#### 2. 重试机制
```javascript
// 自动重试函数
async function requestWithRetry(options, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await apiRequest(options);
    } catch (error) {
      lastError = error;
      
      // 不需要重试的错误类型
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        throw error;
      }
      
      // 最后一次重试失败
      if (i === maxRetries) {
        throw lastError;
      }
      
      // 等待后重试
      console.log(`请求失败，${delay}ms后进行第${i + 1}次重试...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // 指数退避
      delay *= 2;
    }
  }
}

// 使用示例
async function fetchImportantData() {
  try {
    const data = await requestWithRetry({
      url: 'https://api.example.com/important-data',
      method: 'GET'
    }, 3, 1000);
    
    return data;
  } catch (error) {
    console.error('获取重要数据失败:', error);
    // 显示用户友好的错误信息
    my.showToast({
      type: 'fail',
      content: '数据加载失败，请稍后重试'
    });
    throw error;
  }
}
```

### 请求拦截器

#### 1. 请求拦截器实现
```javascript
class RequestInterceptor {
  constructor() {
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
  
  // 添加请求拦截器
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }
  
  // 添加响应拦截器
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }
  
  // 执行请求
  async request(options) {
    // 执行请求拦截器
    let config = { ...options };
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config);
    }
    
    try {
      // 发送请求
      let response = await apiRequest(config);
      
      // 执行响应拦截器
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response, config);
      }
      
      return response;
    } catch (error) {
      // 执行响应错误拦截器
      for (const interceptor of this.responseInterceptors) {
        if (interceptor.onError) {
          error = await interceptor.onError(error, config);
        }
      }
      throw error;
    }
  }
}

// 创建拦截器实例
const requestClient = new RequestInterceptor();

// 添加通用请求拦截器
requestClient.addRequestInterceptor(async (config) => {
  // 添加时间戳
  config.timestamp = Date.now();
  
  // 添加通用请求头
  config.headers = {
    ...config.headers,
    'X-Request-Time': new Date().toISOString(),
    'X-App-Version': '1.0.0'
  };
  
  // 添加认证token
  const token = TokenManager.getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  console.log('发送请求:', config.url);
  return config;
});

// 添加响应拦截器
requestClient.addResponseInterceptor({
  // 成功响应处理
  success: async (response, config) => {
    console.log(`请求完成 [${config.url}]:`, response.status);
    
    // 统一处理业务错误码
    if (response.data && response.data.code !== 0) {
      throw new ApiError(
        ErrorTypes.BUSINESS_ERROR,
        response.data.message || '业务处理失败',
        response.data.code
      );
    }
    
    return response;
  },
  
  // 错误响应处理
  onError: async (error, config) => {
    console.error(`请求失败 [${config.url}]:`, error);
    
    // Token过期处理
    if (error.status === 401) {
      TokenManager.removeToken();
      // 跳转到登录页
      my.navigateTo({
        url: '/pages/login/login'
      });
    }
    
    return handleApiError(error, config.url);
  }
});
```

#### 2. 使用拦截器
```javascript
// 业务API封装
class UserApi {
  static async getProfile(userId) {
    const response = await requestClient.request({
      url: `/api/users/${userId}/profile`,
      method: 'GET'
    });
    return response.data.result;
  }
  
  static async updateProfile(userId, profileData) {
    const response = await requestClient.request({
      url: `/api/users/${userId}/profile`,
      method: 'PUT',
      data: profileData
    });
    return response.data.result;
  }
  
  static async getOrderList(userId, page = 1) {
    const response = await requestClient.request({
      url: `/api/users/${userId}/orders`,
      method: 'GET',
      data: { page, size: 20 }
    });
    return response.data.result;
  }
}

// 在页面中使用
Page({
  data: {
    userProfile: null,
    loading: false,
    error: null
  },
  
  async onLoad() {
    await this.loadUserProfile();
  },
  
  async loadUserProfile() {
    this.setData({ loading: true, error: null });
    
    try {
      const profile = await UserApi.getProfile('current');
      this.setData({ 
        userProfile: profile,
        loading: false 
      });
    } catch (error) {
      this.setData({ 
        loading: false,
        error: error.message 
      });
      
      // 显示错误提示
      my.showToast({
        type: 'fail',
        content: error.message
      });
    }
  }
});
```

---

## 4.2 API接口设计

### RESTful API设计

#### 1. 资源命名规范
```javascript
// ✅ 良好的API设计
const apiEndpoints = {
  // 用户相关
  users: {
    list: 'GET /api/users',              // 获取用户列表
    detail: 'GET /api/users/:id',        // 获取用户详情
    create: 'POST /api/users',           // 创建用户
    update: 'PUT /api/users/:id',        // 更新用户
    delete: 'DELETE /api/users/:id',     // 删除用户
    profile: 'GET /api/users/:id/profile' // 获取用户资料
  },
  
  // 订单相关
  orders: {
    list: 'GET /api/orders',             // 获取订单列表
    detail: 'GET /api/orders/:id',       // 获取订单详情
    create: 'POST /api/orders',          // 创建订单
    update: 'PUT /api/orders/:id',       // 更新订单
    cancel: 'DELETE /api/orders/:id',    // 取消订单
    pay: 'POST /api/orders/:id/payment'  // 支付订单
  },
  
  // 商品相关
  products: {
    list: 'GET /api/products',           // 获取商品列表
    detail: 'GET /api/products/:id',     // 获取商品详情
    search: 'GET /api/products/search',  // 搜索商品
    categories: 'GET /api/products/categories' // 获取商品分类
  }
};

// ❌ 不好的API设计
const badApiEndpoints = {
  'GET /api/getUserList',        // 动词+名词，不符合REST风格
  'POST /api/createNewUser',     // 冗余的create和new
  'GET /api/user_info/:id',      // 下划线命名不一致
  'DELETE /api/deleteUser/:id'   // 动词重复
};
```

#### 2. HTTP状态码使用
```javascript
// 状态码定义和处理
const HttpStatus = {
  // 成功状态
  OK: 200,                    // 请求成功
  CREATED: 201,              // 资源创建成功
  ACCEPTED: 202,             // 请求已接受，处理中
  NO_CONTENT: 204,           // 成功但无返回内容
  
  // 客户端错误
  BAD_REQUEST: 400,          // 请求参数错误
  UNAUTHORIZED: 401,         // 未授权
  FORBIDDEN: 403,            // 禁止访问
  NOT_FOUND: 404,           // 资源不存在
  METHOD_NOT_ALLOWED: 405,   // 方法不允许
  CONFLICT: 409,            // 资源冲突
  UNPROCESSABLE_ENTITY: 422, // 实体不可处理
  
  // 服务器错误
  INTERNAL_SERVER_ERROR: 500, // 服务器内部错误
  BAD_GATEWAY: 502,          // 网关错误
  SERVICE_UNAVAILABLE: 503,  // 服务不可用
  GATEWAY_TIMEOUT: 504       // 网关超时
};

// 统一响应处理
function handleHttpStatus(response) {
  const { status, data } = response;
  
  switch (status) {
    case HttpStatus.OK:
    case HttpStatus.CREATED:
      return data;
      
    case HttpStatus.NO_CONTENT:
      return null;
      
    case HttpStatus.BAD_REQUEST:
      throw new ApiError(ErrorTypes.HTTP_ERROR, '请求参数错误', status);
      
    case HttpStatus.UNAUTHORIZED:
      // 清除本地token，跳转登录
      TokenManager.removeToken();
      my.navigateTo({ url: '/pages/login/login' });
      throw new ApiError(ErrorTypes.HTTP_ERROR, '请先登录', status);
      
    case HttpStatus.FORBIDDEN:
      throw new ApiError(ErrorTypes.HTTP_ERROR, '访问被拒绝', status);
      
    case HttpStatus.NOT_FOUND:
      throw new ApiError(ErrorTypes.HTTP_ERROR, '请求的资源不存在', status);
      
    case HttpStatus.CONFLICT:
      throw new ApiError(ErrorTypes.HTTP_ERROR, '资源冲突', status);
      
    case HttpStatus.INTERNAL_SERVER_ERROR:
      throw new ApiError(ErrorTypes.HTTP_ERROR, '服务器内部错误', status);
      
    default:
      throw new ApiError(ErrorTypes.HTTP_ERROR, `HTTP错误: ${status}`, status);
  }
}
```

#### 3. 响应数据格式
```javascript
// 统一响应格式
const ResponseFormat = {
  // 成功响应
  success: (data, message = 'success', code = 0) => ({
    code,
    message,
    data,
    timestamp: Date.now()
  }),
  
  // 错误响应
  error: (message, code = -1, details = null) => ({
    code,
    message,
    data: null,
    error: details,
    timestamp: Date.now()
  }),
  
  // 分页响应
  paginated: (items, total, page, size) => ({
    code: 0,
    message: 'success',
    data: {
      items,
      pagination: {
        total,
        page,
        size,
        pages: Math.ceil(total / size)
      }
    },
    timestamp: Date.now()
  })
};

// 使用示例
class ApiResponse {
  static success(data, message) {
    return ResponseFormat.success(data, message);
  }
  
  static error(message, code, details) {
    return ResponseFormat.error(message, code, details);
  }
  
  static paginated(items, total, page, size) {
    return ResponseFormat.paginated(items, total, page, size);
  }
}
```

### 接口文档规范

#### 1. API文档结构
```javascript
// API文档模板
const ApiDocTemplate = {
  // 接口基本信息
  info: {
    title: '用户管理API',
    version: '1.0.0',
    description: '用户相关的CRUD操作接口',
    baseUrl: 'https://api.example.com'
  },
  
  // 接口详情
  endpoints: {
    getUserList: {
      summary: '获取用户列表',
      method: 'GET',
      path: '/api/users',
      description: '分页获取用户列表，支持搜索和筛选',
      
      // 请求参数
      parameters: {
        query: {
          page: {
            type: 'integer',
            default: 1,
            description: '页码，从1开始'
          },
          size: {
            type: 'integer',
            default: 20,
            description: '每页数量，最大100'
          },
          keyword: {
            type: 'string',
            required: false,
            description: '搜索关键词，匹配用户名或邮箱'
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive', 'banned'],
            required: false,
            description: '用户状态筛选'
          }
        },
        headers: {
          'Authorization': {
            type: 'string',
            required: true,
            description: 'Bearer token'
          }
        }
      },
      
      // 响应格式
      responses: {
        200: {
          description: '成功获取用户列表',
          example: {
            code: 0,
            message: 'success',
            data: {
              items: [
                {
                  id: 1,
                  username: 'john_doe',
                  email: 'john@example.com',
                  status: 'active',
                  createdAt: '2024-01-01T00:00:00Z'
                }
              ],
              pagination: {
                total: 100,
                page: 1,
                size: 20,
                pages: 5
              }
            }
          }
        },
        400: {
          description: '请求参数错误',
          example: {
            code: 400,
            message: '参数验证失败',
            error: {
              field: 'page',
              message: '页码必须大于0'
            }
          }
        }
      }
    }
  }
};
```

#### 2. 接口版本控制
```javascript
// 版本控制策略
const ApiVersioning = {
  // URL路径版本控制
  pathVersioning: {
    v1: 'https://api.example.com/v1/users',
    v2: 'https://api.example.com/v2/users'
  },
  
  // 请求头版本控制
  headerVersioning: {
    url: 'https://api.example.com/users',
    headers: {
      'API-Version': 'v2',
      'Accept': 'application/vnd.api+json;version=2'
    }
  },
  
  // 查询参数版本控制
  paramVersioning: {
    url: 'https://api.example.com/users?version=v2'
  }
};

// 版本兼容性处理
class ApiVersionManager {
  constructor() {
    this.currentVersion = 'v2';
    this.supportedVersions = ['v1', 'v2'];
  }
  
  getVersionedUrl(endpoint, version = this.currentVersion) {
    if (!this.supportedVersions.includes(version)) {
      console.warn(`不支持的API版本: ${version}，使用默认版本: ${this.currentVersion}`);
      version = this.currentVersion;
    }
    
    return `https://api.example.com/${version}${endpoint}`;
  }
  
  getVersionHeaders(version = this.currentVersion) {
    return {
      'API-Version': version,
      'Accept': `application/vnd.api+json;version=${version.replace('v', '')}`
    };
  }
}
```

### 数据格式约定

#### 1. 请求数据格式
```javascript
// 请求数据格式规范
const RequestFormats = {
  // 创建用户请求
  createUser: {
    username: 'string',      // 必填，3-20字符
    email: 'string',         // 必填，有效邮箱格式
    password: 'string',      // 必填，8-20字符，包含数字和字母
    profile: {               // 可选，用户资料
      firstName: 'string',
      lastName: 'string',
      avatar: 'string',      // 头像URL
      bio: 'string'          // 个人简介
    },
    preferences: {           // 可选，用户偏好
      theme: 'light|dark',
      language: 'string',
      notifications: {
        email: 'boolean',
        push: 'boolean'
      }
    }
  },
  
  // 分页查询请求
  pagination: {
    page: 'integer',         // 页码，从1开始
    size: 'integer',         // 每页数量，1-100
    sort: 'string',          // 排序字段
    order: 'asc|desc'        // 排序方向
  },
  
  // 搜索请求
  search: {
    keyword: 'string',       // 搜索关键词
    filters: {               // 筛选条件
      category: 'string',
      status: 'string',
      dateRange: {
        start: 'string',     // ISO 8601日期格式
        end: 'string'
      }
    }
  }
};

// 数据验证函数
class RequestValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static validatePassword(password) {
    // 8-20字符，至少包含一个数字和一个字母
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,20}$/;
    return passwordRegex.test(password);
  }
  
  static validatePagination(pagination) {
    const { page, size } = pagination;
    return (
      Number.isInteger(page) && page >= 1 &&
      Number.isInteger(size) && size >= 1 && size <= 100
    );
  }
  
  static validateCreateUserRequest(data) {
    const errors = [];
    
    if (!data.username || data.username.length < 3 || data.username.length > 20) {
      errors.push('用户名长度必须在3-20字符之间');
    }
    
    if (!data.email || !this.validateEmail(data.email)) {
      errors.push('请提供有效的邮箱地址');
    }
    
    if (!data.password || !this.validatePassword(data.password)) {
      errors.push('密码必须8-20字符，包含至少一个数字和字母');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
```

#### 2. 响应数据格式
```javascript
// 响应数据格式规范
const ResponseFormats = {
  // 用户信息响应
  user: {
    id: 'integer',
    username: 'string',
    email: 'string',
    status: 'active|inactive|banned',
    profile: {
      firstName: 'string',
      lastName: 'string',
      avatar: 'string',
      bio: 'string'
    },
    createdAt: 'string',     // ISO 8601格式
    updatedAt: 'string'
  },
  
  // 分页响应
  paginatedResponse: {
    code: 'integer',
    message: 'string',
    data: {
      items: 'array',        // 数据项数组
      pagination: {
        total: 'integer',    // 总数量
        page: 'integer',     // 当前页码
        size: 'integer',     // 每页数量
        pages: 'integer'     // 总页数
      }
    },
    timestamp: 'integer'
  },
  
  // 错误响应
  errorResponse: {
    code: 'integer',         // 错误码
    message: 'string',       // 错误信息
    data: null,
    error: {                 // 详细错误信息
      field: 'string',       // 错误字段
      code: 'string',        // 错误代码
      details: 'any'         // 额外详情
    },
    timestamp: 'integer'
  }
};

// 响应数据处理器
class ResponseProcessor {
  static processUserData(rawData) {
    return {
      id: rawData.id,
      username: rawData.username,
      email: rawData.email,
      status: rawData.status,
      profile: {
        firstName: rawData.first_name || '',
        lastName: rawData.last_name || '',
        avatar: rawData.avatar_url || '',
        bio: rawData.bio || ''
      },
      createdAt: rawData.created_at,
      updatedAt: rawData.updated_at
    };
  }
  
  static processPaginatedData(rawData) {
    return {
      items: rawData.items.map(item => this.processUserData(item)),
      pagination: {
        total: rawData.total,
        page: rawData.page,
        size: rawData.size,
        pages: Math.ceil(rawData.total / rawData.size)
      }
    };
  }
  
  static processErrorData(error) {
    return {
      code: error.code || -1,
      message: error.message || '未知错误',
      field: error.field || null,
      details: error.details || null
    };
  }
}
```

---

## 学习要点总结

### 核心概念
- my.request API的完整用法和参数配置
- RESTful API设计原则和最佳实践
- 统一的错误处理和响应格式
- 请求拦截器的实现和应用

### 实践技能
- 能够封装通用的网络请求工具
- 掌握不同HTTP方法的使用场景
- 实现完善的错误处理和重试机制
- 设计规范的API接口文档

### 最佳实践
1. **统一封装**: 使用拦截器统一处理认证、错误等
2. **错误处理**: 分层处理不同类型的错误
3. **数据格式**: 制定统一的请求和响应格式规范
4. **版本控制**: 合理的API版本管理策略

### 常见问题
1. **跨域问题**: 配置服务器域名白名单
2. **请求超时**: 合理设置超时时间和重试策略
3. **数据安全**: 避免在请求中暴露敏感信息
4. **性能优化**: 合理使用缓存，避免重复请求
