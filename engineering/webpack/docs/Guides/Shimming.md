# Shimming 预置依赖

The `webpack` compiler can understand modules written as ES2015 modules, CommonJS or AMD. However, some third party libraries may expect global dependencies (e.g. `$` for `jQuery`). The libraries might also create globals which need to be exported. These "broken modules" are one instance where `shimming` comes into play.

> **We don't recommend using globals**! The whole concept behind webpack is to allow more modular front-end development. This means writing isolated modules that are well contained and do not rely on hidden dependencies (e.g. globals). Please use these features only when necessary.

Another instance where _shimming_ can be useful is when you want to **polyfill** browser functionality to support more users. In this case, you may only want to deliver those polyfills to the browsers that need patching (i.e. load them on demand).

## Shimming Globals

Remember that lodash package we were using? For demonstration purposes, let's say we wanted to instead provide this as a global throughout our application. To do this, we can use **ProvidePlugin**.

The **ProvidePlugin** makes a package available as a variable in every module compiled through webpack. If webpack sees that variable used, it will include the given package in the final bundle. Let's go ahead by removing the `import` statement for `lodash` and instead provide it via the plugin:

## Granular Shimming 细粒度 Shimming

Some legacy modules rely on `this` being the window object. Let's update our `index.js` so this is the case:

This becomes a problem when the module is executed in a `CommonJS` context where `this` is equal to `module.exports`. In this case you can override `this` using the `imports-loader`:
当模块运行在 `CommonJS` 上下文中，这将会变成一个问题，也就是说此时的 `this` 指向的是 `module.exports`。在这种情况下，你可以通过使用 `imports-loader` 覆盖 `this` 指向：

```js
module.exports = {
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
    ],
  },
}
```

## 全局 Exports

让我们假设，某个 library 创建出一个全局变量，它期望 consumer(使用者) 使用这个变量。为此，我们可以在项目配置中，添加一个小模块来演示说明：

我们可以使用 `exports-loader`，将一个全局变量作为一个普通的模块来导出

```js
 module.exports =     {
        test: require.resolve('./src/globals.js'),
        use:
          'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse',
      },
```

## 加载 Polyfills

```shell
npm install --save babel-polyfill
```

```js
import 'babel-polyfill'
```

注意，这种方式优先考虑正确性，而不考虑 bundle 体积大小。为了安全和可靠，`polyfill/shim` **必须运行于所有其他代码之前，而且需要同步加载**，或者说，需要在所有 `polyfill/shim` 加载之后，再去加载所有应用程序代码。 社区中存在许多误解，即现代浏览器“不需要”polyfill，或者 `polyfill/shim` 仅用于添加缺失功能 - 实际上，它们通常用于**修复损坏实现(repair broken implementation)**，即使是在最现代的浏览器中，也会出现这种情况。 因此，最佳实践仍然是，不加选择地和同步地加载所有 `polyfill/shim`，尽管这会导致额外的 bundle 体积成本。

```js
import 'babel-polyfill'
import 'whatwg-fetch'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  entry: {
    polyfills: './src/polyfills', // <-
    index: './src/index.js',
  },
  output: {
    filename: 'main.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
      {
        test: require.resolve('./src/globals.js'),
        use: 'exports-loader?type=commonjs&exports[]=file&exports[]=multiple|helpers.parse|parse',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      join: ['lodash', 'join'],
    }),
  ],
}
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Getting Started</title>
    <script>
      const modernBrowser = 'fetch' in window && 'assign' in Object // <-

      if (!modernBrowser) {
        const scriptElement = document.createElement('script')

        scriptElement.async = false
        scriptElement.src = '/polyfills.bundle.js'
        document.head.appendChild(scriptElement)
      }
    </script>
  </head>
  <body>
    <script src="main.js"></script>
    <script src="index.bundle.js"></script>
  </body>
</html>
```

## 进一步优化

✨✨✨
`babel-preset-env` package 通过 `browserslist` 来转译那些你浏览器中不支持的特性。这个 preset 使用 `useBuiltIns` 选项，默认值是 false，这种方式可以将全局 babel-polyfill 导入，改进为更细粒度的 import 格式：

```js
import 'core-js/modules/es7.string.pad-start'
import 'core-js/modules/es7.string.pad-end'
import 'core-js/modules/web.timers'
import 'core-js/modules/web.immediate'
import 'core-js/modules/web.dom.iterable'
```
