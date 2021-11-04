# Source Code

## directory structure

- compiler: 编译相关
  - 模板解析成 ast 语法树
  - ast 语法树优化
  - 代码生成
  - 编译时机
    - 项目构建时(性能考虑)
    - 运行时，使用包含构建功能的 Vue.js
- core: 核心代码
  - 内置组件
  - 全局 API 封装
  - Vue 实例化
  - 观察者
  - 虚拟 DOM
  - 工具函数
- plantforms: 不同平台支持
  - web
  - weex
- server: 服务端渲染
  - 2.0 开始支持服务端渲染
- sfc: 单文件解析
  - `.vue`文件解析为一个`JavaScript`对象
- shared: 共享文件
  - 包含一些工具方法，多平台共享
