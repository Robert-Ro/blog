```js
;(self['webpackChunkcodepen'] = self['webpackChunkcodepen'] || []).push([
  ['src_modules_my-module_js'],
  {
    /***/ './src/modules/my-module.js':
      /*!**********************************!*\
  !*** ./src/modules/my-module.js ***!
  \**********************************/
      /***/ () => {
        console.log('my-module.js')

        /***/
      },
  },
])
//# sourceMappingURL=src_modules_my-module_js.1b1f482b555511b25159.chunk.js.map
```

第一个元素是一个数组，用于标识模块的标识符。在这个例子中，它是 `["src_modules_my-module_js"]`。
这个标识符是由 `Webpack` 自动生成的，用于唯一标识一个模块。
第二个元素是一个对象，包含了模块的实际代码。在这个例子中，它是一个对象字面量，表示 `my-module.js` 模块的代码。

```js
{
    /***/ "./src/modules/my-module2.js":
/*!***********************************!*\
  !*** ./src/modules/my-module2.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
// 导出的模块存储到__webpack_exports__，供对外访问
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ a)
/* harmony export */ });
console.log('my-module.js')
let b = 2
const a = 1


/***/ })
}
```

## Think

- 模块化历史发展
- 前端模块化实现
