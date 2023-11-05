# Plugins

**Plugins** are the [backbone](https://github.com/webpack/tapable) of webpack. Webpack itself is built on the **same plugin system** that you use in your webpack configuration!
插件 是 webpack 的 支柱 功能。Webpack 自身也是构建于你在 webpack 配置中用到的 相同的插件系统 之上！

They also serve the purpose of doing **anything else** that a [loader](https://webpack.js.org/concepts/loaders) cannot do. Webpack provides [many such plugins](https://webpack.js.org/plugins/) out of the box.
插件目的在于解决 loader 无法实现的其他事。Webpack 提供很多开箱即用的 插件。

> When consuming [webpack-sources](https://github.com/webpack/webpack-sources) package in plugins, use `require('webpack').sources` instead of `require('webpack-sources')` to avoid version conflicts for persistent caching.
> 如果在插件中使用了 `webpack-sources` 的 package，请使用 `require('webpack').sources` 替代 `require('webpack-sources')`，以避免持久缓存的版本冲突。

## Anatomy 剖析

A webpack **plugin** is a JavaScript object that has an `apply` method. This `apply` method is called by the webpack compiler, giving access to the **entire** compilation lifecycle.

```js
// ConsoleLogOnBuildWebpackPlugin.js

const pluginName = 'ConsoleLogOnBuildWebpackPlugin'

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!')
    })
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin
```

The first parameter of the tap method of the compiler hook **should be a camelized version of the plugin name**. **It is advisable to use a constant for this so it can be reused in all hooks**.

## Usage

Since **plugins** can take arguments/options, you must pass a `new` instance to the pl`ugins property in your webpack configuration.

Depending on how you are using webpack, there are multiple ways to use plugins.

### Configuration

```js
webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack') //to access built-in plugins
const path = require('path')

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.ProgressPlugin(), new HtmlWebpackPlugin({ template: './src/index.html' })],
}
```

The `ProgressPlugin` is used to customize how progress should be reported during compilation, and `HtmlWebpackPlugin` will generate a HTML file including the `my-first-webpack.bundle.js` file using a `script` tag.

### Node API

When using the Node API, you can also pass plugins via the plugins property in the configuration.

```js
// some-node-script.js
const webpack = require('webpack') //to access webpack runtime
const configuration = require('./webpack.config.js')

let compiler = webpack(configuration)

new webpack.ProgressPlugin().apply(compiler)

compiler.run(function (err, stats) {
  // ...
})
```

> Did you know: The example seen above is extremely similar to the [webpack runtime itself](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292)! There are lots of great usage examples hiding in the webpack source code that you can apply to your own configurations and scripts!
> 你知道吗：以上看到的示例和 [webpack 运行时(runtime)本身](https://github.com/webpack/webpack/blob/e7087ffeda7fa37dfe2ca70b5593c6e899629a2c/bin/webpack.js#L290-L292) 极其类似。[webpack 源码](https://github.com/webpack/webpack) 中隐藏有大量使用示例，你可以将其应用在自己的配置和脚本中。
