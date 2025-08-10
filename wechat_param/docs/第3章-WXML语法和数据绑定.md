# 第3章：WXML语法和数据绑定

## 3.1 WXML模板语法

### WXML简介

WXML（WeiXin Markup Language）是微信小程序的模板语言，结合基础组件、事件系统，可以构建出页面的结构。

### 基本语法特点

1. **标签闭合**：所有标签必须闭合
2. **属性值**：属性值必须用双引号包裹
3. **大小写敏感**：标签名和属性名区分大小写
4. **数据绑定**：使用双大括号{{}}进行数据绑定

### 基础示例

```xml
<!--基础WXML结构-->
<view class="container">
  <text>{{message}}</text>
  <button bindtap="handleClick">点击我</button>
</view>
```

对应的JavaScript：
```javascript
Page({
  data: {
    message: 'Hello WXML!'
  },
  
  handleClick() {
    console.log('按钮被点击了');
  }
});
```

## 3.2 数据绑定机制

### 基本数据绑定

#### 1. 文本内容绑定
```xml
<!--文本绑定-->
<view>
  <text>用户名：{{username}}</text>
  <text>年龄：{{age}}</text>
  <text>邮箱：{{email}}</text>
</view>
```

```javascript
Page({
  data: {
    username: '张三',
    age: 25,
    email: 'zhangsan@example.com'
  }
});
```

#### 2. 属性绑定
```xml
<!--属性绑定-->
<view>
  <image src="{{imageUrl}}" mode="aspectFit"></image>
  <input placeholder="{{placeholderText}}" value="{{inputValue}}"></input>
  <button disabled="{{isDisabled}}">{{buttonText}}</button>
</view>
```

```javascript
Page({
  data: {
    imageUrl: '/images/avatar.jpg',
    placeholderText: '请输入用户名',
    inputValue: '',
    isDisabled: false,
    buttonText: '提交'
  }
});
```

#### 3. 控制属性绑定
```xml
<!--控制属性绑定-->
<view>
  <checkbox checked="{{isChecked}}"></checkbox>
  <switch checked="{{isEnabled}}"></switch>
  <slider value="{{sliderValue}}" max="100"></slider>
</view>
```

```javascript
Page({
  data: {
    isChecked: true,
    isEnabled: false,
    sliderValue: 50
  }
});
```

### 运算表达式

#### 1. 三元运算
```xml
<!--三元运算-->
<view>
  <text class="{{score >= 60 ? 'pass' : 'fail'}}">
    成绩：{{score}}分 {{score >= 60 ? '及格' : '不及格'}}
  </text>
  
  <button disabled="{{username.length === 0}}">
    {{username.length === 0 ? '请输入用户名' : '登录'}}
  </button>
</view>
```

#### 2. 算数运算
```xml
<!--算数运算-->
<view>
  <text>总价：{{price * quantity}}元</text>
  <text>折扣价：{{price * discount / 100}}元</text>
  <text>剩余数量：{{total - sold}}</text>
</view>
```

#### 3. 逻辑运算
```xml
<!--逻辑运算-->
<view>
  <text wx:if="{{isLogin && isVip}}">VIP用户</text>
  <text wx:if="{{!isLogin || !hasPermission}}">权限不足</text>
  <button disabled="{{!isLogin || isLoading}}">
    {{isLoading ? '加载中...' : '购买'}}
  </button>
</view>
```

#### 4. 字符串运算
```xml
<!--字符串拼接-->
<view>
  <text>欢迎 {{firstname + lastname}}</text>
  <text>完整地址：{{province + city + district + address}}</text>
  <image src="{{'/images/' + imageName + '.jpg'}}"></image>
</view>
```

### 对象和数组操作

#### 1. 对象属性访问
```xml
<!--对象属性-->
<view>
  <text>姓名：{{user.name}}</text>
  <text>年龄：{{user.age}}</text>
  <text>城市：{{user.address.city}}</text>
  <image src="{{user.profile.avatar}}"></image>
</view>
```

```javascript
Page({
  data: {
    user: {
      name: '李四',
      age: 28,
      address: {
        city: '北京',
        district: '朝阳区'
      },
      profile: {
        avatar: '/images/avatar.jpg'
      }
    }
  }
});
```

#### 2. 数组访问
```xml
<!--数组元素访问-->
<view>
  <text>第一个商品：{{products[0].name}}</text>
  <text>第二个商品价格：{{products[1].price}}元</text>
  <text>商品总数：{{products.length}}</text>
</view>
```

```javascript
Page({
  data: {
    products: [
      { id: 1, name: 'iPhone', price: 5999 },
      { id: 2, name: 'iPad', price: 3999 },
      { id: 3, name: 'MacBook', price: 12999 }
    ]
  }
});
```

### 数据更新机制

#### 1. setData方法
```javascript
Page({
  data: {
    count: 0,
    user: {
      name: '张三',
      age: 25
    },
    list: [1, 2, 3]
  },

  // 更新简单数据
  updateCount() {
    this.setData({
      count: this.data.count + 1
    });
  },

  // 更新对象属性
  updateUserName() {
    this.setData({
      'user.name': '李四',
      'user.age': 26
    });
  },

  // 更新数组元素
  updateList() {
    this.setData({
      'list[0]': 10,
      'list[3]': 4  // 新增元素
    });
  },

  // 批量更新
  batchUpdate() {
    this.setData({
      count: 100,
      'user.name': '王五',
      list: [10, 20, 30]
    });
  }
});
```

#### 2. setData性能优化
```javascript
Page({
  data: {
    largeList: [],
    user: {}
  },

  // 避免频繁setData
  badExample() {
    for (let i = 0; i < 100; i++) {
      this.setData({
        [`largeList[${i}]`]: { id: i, name: `item${i}` }
      });
    }
  },

  // 推荐做法：批量更新
  goodExample() {
    const newList = [];
    for (let i = 0; i < 100; i++) {
      newList.push({ id: i, name: `item${i}` });
    }
    this.setData({
      largeList: newList
    });
  },

  // 只更新变化的数据
  updateUserPartial(newAge) {
    if (this.data.user.age !== newAge) {
      this.setData({
        'user.age': newAge
      });
    }
  }
});
```

## 3.3 条件渲染wx:if

### 基本用法

#### 1. 单条件判断
```xml
<!--基础条件渲染-->
<view>
  <text wx:if="{{isLogin}}">欢迎回来！</text>
  <text wx:if="{{!isLogin}}">请先登录</text>
  
  <view wx:if="{{score >= 90}}">优秀</view>
  <view wx:elif="{{score >= 80}}">良好</view>
  <view wx:elif="{{score >= 60}}">及格</view>
  <view wx:else>不及格</view>
</view>
```

#### 2. 复杂条件
```xml
<!--复杂条件判断-->
<view>
  <view wx:if="{{userType === 'admin' && hasPermission}}">
    <text>管理员面板</text>
    <button>用户管理</button>
    <button>系统设置</button>
  </view>
  
  <view wx:elif="{{userType === 'vip' || totalAmount >= 1000}}">
    <text>VIP专享</text>
    <button>专属客服</button>
  </view>
  
  <view wx:else>
    <text>普通用户</text>
    <button>升级VIP</button>
  </view>
</view>
```

### block组件条件渲染

```xml
<!--使用block进行条件渲染-->
<view>
  <block wx:if="{{showContent}}">
    <view class="header">标题区域</view>
    <view class="content">内容区域</view>
    <view class="footer">底部区域</view>
  </block>
  
  <block wx:else>
    <view class="loading">加载中...</view>
  </block>
</view>
```

### 条件渲染最佳实践

#### 1. 性能考虑
```xml
<!--频繁切换使用hidden-->
<view hidden="{{!showPanel}}">经常显示隐藏的内容</view>

<!--条件复杂使用wx:if-->
<view wx:if="{{user.level >= 5 && user.vip && !user.blocked}}">
  VIP高级用户内容
</view>
```

#### 2. 模板复用
```xml
<!--定义模板-->
<template name="userCard">
  <view class="user-card">
    <image src="{{avatar}}"></image>
    <text>{{name}}</text>
    <text>{{level}}</text>
  </view>
</template>

<!--条件使用模板-->
<view>
  <template wx:if="{{showUserCard}}" is="userCard" data="{{...userInfo}}"></template>
</view>
```

## 3.4 列表渲染wx:for

### 基本列表渲染

#### 1. 简单数组渲染
```xml
<!--基础列表渲染-->
<view>
  <view wx:for="{{numbers}}" wx:key="*this">
    {{index}}: {{item}}
  </view>
</view>
```

```javascript
Page({
  data: {
    numbers: [1, 2, 3, 4, 5]
  }
});
```

#### 2. 对象数组渲染
```xml
<!--对象数组渲染-->
<view>
  <view wx:for="{{products}}" wx:key="id" class="product-item">
    <image src="{{item.image}}"></image>
    <view class="info">
      <text class="name">{{item.name}}</text>
      <text class="price">¥{{item.price}}</text>
      <text class="index">第{{index + 1}}个商品</text>
    </view>
  </view>
</view>
```

```javascript
Page({
  data: {
    products: [
      { id: 1, name: 'iPhone 13', price: 5999, image: '/images/iphone.jpg' },
      { id: 2, name: 'iPad Air', price: 4299, image: '/images/ipad.jpg' },
      { id: 3, name: 'MacBook Pro', price: 14999, image: '/images/macbook.jpg' }
    ]
  }
});
```

### 自定义变量名

```xml
<!--自定义index和item名称-->
<view>
  <view wx:for="{{userList}}" 
        wx:for-index="idx" 
        wx:for-item="user" 
        wx:key="id">
    <text>用户{{idx + 1}}：{{user.name}}</text>
  </view>
</view>
```

### 嵌套列表渲染

```xml
<!--嵌套列表-->
<view>
  <view wx:for="{{categories}}" wx:key="id" class="category">
    <text class="category-title">{{item.name}}</text>
    
    <view wx:for="{{item.products}}" 
          wx:for-item="product" 
          wx:for-index="productIndex"
          wx:key="id" 
          class="product">
      <text>{{product.name}} - ¥{{product.price}}</text>
    </view>
  </view>
</view>
```

```javascript
Page({
  data: {
    categories: [
      {
        id: 1,
        name: '手机',
        products: [
          { id: 101, name: 'iPhone 13', price: 5999 },
          { id: 102, name: 'Samsung S21', price: 4999 }
        ]
      },
      {
        id: 2,
        name: '电脑',
        products: [
          { id: 201, name: 'MacBook Pro', price: 14999 },
          { id: 202, name: 'ThinkPad X1', price: 12999 }
        ]
      }
    ]
  }
});
```

### wx:key的重要性

#### 1. 提高渲染性能
```xml
<!--正确使用wx:key-->
<view wx:for="{{todoList}}" wx:key="id">
  <checkbox checked="{{item.completed}}"></checkbox>
  <text>{{item.text}}</text>
  <button bindtap="deleteTodo" data-id="{{item.id}}">删除</button>
</view>
```

#### 2. 维护组件状态
```xml
<!--保持输入框状态-->
<view wx:for="{{formItems}}" wx:key="id">
  <input placeholder="{{item.placeholder}}" 
         value="{{item.value}}"
         bindinput="handleInput"
         data-index="{{index}}">
</input>
</view>
```

### 条件与列表结合

```xml
<!--条件与列表结合使用-->
<view>
  <!-- 有数据时显示列表 -->
  <view wx:if="{{productList.length > 0}}">
    <view wx:for="{{productList}}" wx:key="id">
      <view wx:if="{{item.status === 'active'}}" class="product-active">
        <text>{{item.name}} - 在售</text>
      </view>
      <view wx:elif="{{item.status === 'soldout'}}" class="product-soldout">
        <text>{{item.name}} - 售罄</text>
      </view>
    </view>
  </view>
  
  <!-- 无数据时显示提示 -->
  <view wx:else class="empty-state">
    <text>暂无商品</text>
  </view>
</view>
```

### 列表操作示例

```javascript
Page({
  data: {
    todoList: [
      { id: 1, text: '学习小程序', completed: false },
      { id: 2, text: '写项目文档', completed: true },
      { id: 3, text: '代码review', completed: false }
    ]
  },

  // 添加新任务
  addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    this.setData({
      todoList: [...this.data.todoList, newTodo]
    });
  },

  // 删除任务
  deleteTodo(e) {
    const id = e.currentTarget.dataset.id;
    const todoList = this.data.todoList.filter(item => item.id !== id);
    
    this.setData({
      todoList: todoList
    });
  },

  // 切换完成状态
  toggleTodo(e) {
    const index = e.currentTarget.dataset.index;
    const todoList = [...this.data.todoList];
    todoList[index].completed = !todoList[index].completed;
    
    this.setData({
      todoList: todoList
    });
  },

  // 更新任务文本
  updateTodo(index, newText) {
    this.setData({
      [`todoList[${index}].text`]: newText
    });
  }
});
```

## 3.5 模板引用和include

### template模板定义和使用

#### 1. 定义模板
```xml
<!--templates/user-card.wxml-->
<template name="userCard">
  <view class="user-card">
    <image class="avatar" src="{{avatar}}"></image>
    <view class="info">
      <text class="name">{{name}}</text>
      <text class="title">{{title}}</text>
      <text class="department">{{department}}</text>
    </view>
    <view class="actions">
      <button size="mini">关注</button>
      <button size="mini">私信</button>
    </view>
  </view>
</template>
```

#### 2. 使用模板
```xml
<!--pages/user/user.wxml-->
<import src="../../templates/user-card.wxml"/>

<view>
  <!-- 单个用户 -->
  <template is="userCard" data="{{...currentUser}}"></template>
  
  <!-- 用户列表 -->
  <view wx:for="{{userList}}" wx:key="id">
    <template is="userCard" data="{{...item}}"></template>
  </view>
</view>
```

#### 3. 传递数据
```javascript
Page({
  data: {
    currentUser: {
      name: '张三',
      title: '高级工程师',
      department: '技术部',
      avatar: '/images/avatar1.jpg'
    },
    userList: [
      {
        id: 1,
        name: '李四',
        title: '产品经理',
        department: '产品部',
        avatar: '/images/avatar2.jpg'
      },
      {
        id: 2,
        name: '王五',
        title: '设计师',
        department: '设计部',
        avatar: '/images/avatar3.jpg'
      }
    ]
  }
});
```

### include文件引用

#### 1. 公共头部
```xml
<!--common/header.wxml-->
<view class="header">
  <view class="title">{{pageTitle}}</view>
  <view class="actions">
    <button class="back-btn" bindtap="goBack">返回</button>
    <button class="home-btn" bindtap="goHome">首页</button>
  </view>
</view>
```

#### 2. 公共底部
```xml
<!--common/footer.wxml-->
<view class="footer">
  <text class="copyright">© 2025 我的小程序</text>
  <view class="links">
    <text bindtap="showAbout">关于我们</text>
    <text bindtap="showPrivacy">隐私政策</text>
    <text bindtap="showContact">联系我们</text>
  </view>
</view>
```

#### 3. 在页面中引用
```xml
<!--pages/detail/detail.wxml-->
<include src="../../common/header.wxml"/>

<view class="page-content">
  <view class="article">
    <text class="title">{{article.title}}</text>
    <text class="content">{{article.content}}</text>
  </view>
</view>

<include src="../../common/footer.wxml"/>
```

### 模板样式

#### 1. 模板专用样式
```css
/* templates/user-card.wxss */
.user-card {
  display: flex;
  align-items: center;
  padding: 20rpx;
  background: #fff;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.user-card .avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-card .info {
  flex: 1;
}

.user-card .name {
  display: block;
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.user-card .title {
  display: block;
  font-size: 28rpx;
  color: #666;
  margin-bottom: 5rpx;
}

.user-card .department {
  display: block;
  font-size: 24rpx;
  color: #999;
}

.user-card .actions {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}
```

#### 2. 在页面中引入样式
```css
/* pages/user/user.wxss */
@import "../../templates/user-card.wxss";

.page-container {
  padding: 20rpx;
  background: #f5f5f5;
  min-height: 100vh;
}
```

### 高级模板技巧

#### 1. 动态模板选择
```xml
<!--动态选择模板-->
<template name="listItem">
  <view class="list-item">{{text}}</view>
</template>

<template name="cardItem">
  <view class="card-item">
    <image src="{{image}}"></image>
    <text>{{text}}</text>
  </view>
</template>

<view>
  <view wx:for="{{items}}" wx:key="id">
    <template is="{{item.type === 'card' ? 'cardItem' : 'listItem'}}" 
              data="{{...item}}"></template>
  </view>
</view>
```

#### 2. 模板嵌套
```xml
<!--基础模板-->
<template name="button">
  <button class="{{type}}" bindtap="{{action}}">{{text}}</button>
</template>

<!--复合模板-->
<template name="actionPanel">
  <view class="action-panel">
    <template is="button" data="{{type: 'primary', text: '确认', action: 'confirm'}}"></template>
    <template is="button" data="{{type: 'default', text: '取消', action: 'cancel'}}"></template>
  </view>
</template>
```

## 本章小结

通过本章学习，您应该掌握：

1. ✅ WXML的基本语法和特点
2. ✅ 数据绑定的各种方式和表达式
3. ✅ 条件渲染wx:if的使用方法
4. ✅ 列表渲染wx:for的完整用法
5. ✅ 模板和文件引用的最佳实践

## 实践练习

### 练习1：数据绑定综合应用
创建一个用户信息展示页面，包含：
1. 基本信息显示（姓名、年龄、邮箱）
2. 头像显示
3. 状态切换（在线/离线）
4. 动态样式绑定

### 练习2：条件渲染应用
实现一个登录状态判断页面：
1. 未登录时显示登录表单
2. 已登录显示用户信息
3. 不同用户类型显示不同内容
4. 加载状态的处理

### 练习3：列表渲染实战
创建一个商品列表页面：
1. 商品信息展示
2. 分类筛选功能
3. 商品状态标识
4. 操作按钮（收藏、购买）

### 练习4：模板应用
设计可复用的组件模板：
1. 用户卡片模板
2. 商品卡片模板
3. 评论组件模板
4. 在不同页面中复用

## 常见问题

### Q1: 数据绑定中的表达式不生效？
A: 检查语法是否正确，确保使用双大括号{{}}，表达式中不要有语法错误。

### Q2: wx:key应该如何选择？
A: 优先使用唯一标识符（如id），如果没有可以使用`*this`（适用于简单数据类型）。

### Q3: 列表更新后界面没有刷新？
A: 确保使用setData方法更新数据，不要直接修改data中的值。

### Q4: 模板传递数据时扩展运算符不生效？
A: 确保使用三个点语法`{{...data}}`，并且data是一个对象。

---

**下一章预告**：第4章将深入学习WXSS样式系统，包括rpx单位、Flex布局等重要概念。
