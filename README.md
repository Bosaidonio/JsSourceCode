
# JavaScript 源码实现

这个项目包含了一些常用 JavaScript 功能的手动实现，主要用于学习和理解 JavaScript 的底层原理。

## 项目结构

├── apply/ # apply 方法实现 \
├── call/ # call 方法实现 \
├── instanceof/ # instanceof 运算符实现 \
├── new/ # new 运算符实现 \
└── promise/ # Promise 类实现 \


## 功能实现

### Promise
- 完整实现符合 Promises/A+ 规范的 Promise
- 包含 `then`、`catch`、`finally` 等基础方法
- 实现了 `Promise.resolve`、`Promise.reject` 静态方法
- 实现了 `Promise.all`、`Promise.race`、`Promise.allSettled` 等静态方法

### instanceof
- 实现 instanceof 运算符的功能
- 正确处理原型链查找
- 支持处理继承关系判断

### new
- 实现 new 运算符的功能
- 支持构造函数参数传递
- 正确处理构造函数返回值

### call/apply
- 实现 Function.prototype.call 方法
- 实现 Function.prototype.apply 方法
- 支持 this 绑定和参数传递

## 测试

项目使用 Jest 进行单元测试。每个实现都有对应的测试文件，确保功能的正确性。

运行测试：

```bash
npm install
npm test
```

