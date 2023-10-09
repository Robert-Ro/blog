# webpack 打包后的产物\_\_webpack

- `__webpack_module_cache__`: module cache 对象
- `__webpack_require__`: 这是一个模块加载函数，用于加载和执行模块。它接受一个模块 ID 作为参数，检查是否已经加载过该模块，如果已加载则返回缓存的模块，否则创建一个新的模块对象并执行对应模块的函数。
  - `m`: `moduleCache`方法，将模块对象 `__webpack_modules__` 暴露为 `__webpack_require__.m`，使其在模块加载过程中可用。
  - `t`: 定义了一个函数，用于支持不同的模块导入方式，包括 CommonJS、ES6 模块等。
  - `r`: `defineModuleExport`方法，定义模块的导出对象
  - `d`: `defineProperty`方法，define getter functions for harmony exports
  - `o`: `hasOwnProperty`方法的简写
  - `f`: 一个对象，存储异步加载的 chunk
  - `e`: `loadChunk`方法，异步加载一个代码块
  - `u`: 根据 `moduleId` 返回异步模块的 `url` 或文件名
  - `p`: 返回 `publicPath`
  - `h`: `getFullHash`，表示获取模块的 `hash` 值
  - `g`: getGlobalObj，表示返回全局对象
  - `l`: `loadModule`方法，用于加载外部脚本文件
- `__webpack_modules__`: modules object, 使用 `moduleId` 索引模块
- `module`
- `exports`

## detail DOC

### `__webpack_require__.t`

```js
/* webpack/runtime/create fake namespace object */
;(() => {
  /**
   * 获取对象的原型
   */
  var getProto = Object.getPrototypeOf ? (obj) => Object.getPrototypeOf(obj) : (obj) => obj.__proto__
  var leafPrototypes
  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 16: return value when it's Promise-like
  // mode & 8|1: behave like require
  /**
   * 创建一个虚拟的命名空间对象的函数
   * @param {*} value 要处理的值
   * @param {*} mode 处理模式
   * @returns
   */
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = this(value)
    if (mode & 8) return value
    if (typeof value === 'object' && value) {
      if (mode & 4 && value.__esModule) return value
      if (mode & 16 && typeof value.then === 'function') return value
    }
    var ns = Object.create(null)
    __webpack_require__.r(ns) // 为空的命名空间对象添加esmodule属性
    var def = {}
    leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)]
    for (
      var current = mode & 2 && value;
      typeof current == 'object' && !~leafPrototypes.indexOf(current);
      current = getProto(current)
    ) {
      Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => value[key]))
    }
    def['default'] = () => value
    __webpack_require__.d(ns, def)
    return ns
  }
})()
```

### ### `__webpack_require__.r`

```js
/* webpack/runtime/make namespace object */
;(() => {
  // define __esModule on exports，为exports对象添加属性
  __webpack_require__.r = (exports) => {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    }
    Object.defineProperty(exports, '__esModule', { value: true })
  }
})()
```

## source-map 类型

## Think/Bg 知识

- es 模块化
