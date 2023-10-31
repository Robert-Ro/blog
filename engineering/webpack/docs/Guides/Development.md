# Development

```js
{
  mode: 'development'
}
```

## Using source maps

When webpack bundles your source code, it can become difficult to track down errors and warnings to their original location.

In order to make it easier to track down errors and warnings, JavaScript offers source maps, which map your compiled code back to your original source code. If an error originates from b.js, the source map will tell you exactly that.

There are a lot of [different options](https://webpack.js.org/configuration/devtool) available when it comes to source maps. Be sure to check them out so you can configure them to your needs.

## Choosing a Development Tool

There are a couple of different options available in webpack that help you automatically compile your code whenever it changes 跟随代码改变自动编译:

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

In most cases, you probably would want to use `webpack-dev-server`, but let's explore all of the above options.

### Using Watch Mode

```sh
webpack --watch
```

### Using webpack-dev-server

```js
module.exports = {
  devServer: {
    static: './dist',
  },
}
```

### Using webpack-dev-middleware

`webpack-dev-middleware` is a wrapper that will emit files processed by webpack to a server. This is used in `webpack-dev-server` **internally**.

custom webpack dev server:

```js
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
)

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n')
})
```

## Adjusting Your Text Editor

When using automatic compilation of your code, you could run into issues when saving your files
使用自动编译代码时，可能会在保存文件时遇到一些问题。某些编辑器具有“safe write（安全写入）”功能，会影响重新编译。
