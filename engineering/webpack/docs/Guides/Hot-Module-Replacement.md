# Hot Module Replacement

**Hot Module Replacement (or HMR) is one of the most useful features offered by webpack**. It allows all kinds of modules to be updated at runtime without the need for a full refresh. This page focuses on **implementation** while the [concepts page](https://webpack.js.org/concepts/hot-module-replacement) gives more details on how it works and why it's useful.

> **HMR** is not intended for use in production, **meaning it should only be used in development**. See the building for production guide for more information.

## Enabling HMR

This feature is great for productivity. All we need to do is update our `webpack-dev-server` configuration, and **use webpack's built-in HMR plugin**. We'll also remove the entry point for `print.js` as it will now be consumed by the `index.js` module.

Since `webpack-dev-server` v4.0.0, Hot Module Replacement is enabled by default.

> If you took the route of using `webpack-dev-middleware` instead of `webpack-dev-server`, please use the [`webpack-hot-middleware`](https://github.com/webpack-contrib/webpack-hot-middleware) package to enable HMR on your custom server or application.

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true, // <-
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

you can also provide manual entry points for HMR:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: './src/index.js',
    // Runtime code for hot module replacement
    hot: 'webpack/hot/dev-server.js',
    // Dev server client for web socket transport, hot and live reload logic
    client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    // Dev server client for web socket transport, hot and live reload logic
    hot: false,
    client: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

Now let's update the `index.js` file so that when a change inside `print.js` is detected we tell webpack to accept the updated module.

```js
import _ from 'lodash'
import printMe from './print.js'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe

  element.appendChild(btn)

  return element
}

document.body.appendChild(component())
// below can be inject with loader
if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
    printMe()
  })
}
```

## Via the Node.js API

When using Webpack Dev Server with the Node.js API, **don't put the dev server options on the webpack configuration object**. Instead, pass them as a second parameter upon creation. For example:

```js
new WebpackDevServer(options, compiler)
```

To enable HMR, you also need to modify your webpack configuration object to include the HMR entry points. Here's a small example of how that might look:

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')

const config = {
  mode: 'development',
  entry: [
    // Runtime code for hot module replacement
    'webpack/hot/dev-server.js',
    // Dev server client for web socket transport, hot and live reload logic
    'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    // Your entry
    './src/index.js',
  ],
  devtool: 'inline-source-map',
  plugins: [
    // Plugin for hot module replacement
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
const compiler = webpack(config)

// `hot` and `client` options are disabled because we added them manually
const server = new webpackDevServer({ hot: false, client: false }, compiler)

;(async () => {
  await server.start()
  console.log('dev server is running')
})()
```

See the [full documentation of `webpack-dev-server` Node.js API](https://webpack.js.org/api/webpack-dev-server/).

## Gotchas 问题

Hot Module Replacement can be **tricky**. To show this, let's go back to our working example. If you go ahead and click the button on the example page, you will realize the console is printing the old `printMe` function.

This is happening because the button's `onclick` event handler is still bound to the original `printMe` function.

To make this work with HMR we need to update that binding to the new `printMe` function using `module.hot.accept`:

```js
import _ from 'lodash'
import printMe from './print.js'

function component() {
  const element = document.createElement('div')
  const btn = document.createElement('button')

  element.innerHTML = _.join(['Hello', 'webpack'], ' ')

  btn.innerHTML = 'Click me and check the console!'
  btn.onclick = printMe // onclick event is bind to the original printMe function

  element.appendChild(btn)

  return element
}

let element = component() // Store the element to re-render on print.js changes
document.body.appendChild(element)

if (module.hot) {
  module.hot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!')
    document.body.removeChild(element)
    element = component() // Re-render the "component" to update the click handler
    document.body.appendChild(element)
  })
}
```

This is only one example, but there are many others that can easily trip people up. Luckily, **there are a lot of loaders out there (some of which are mentioned below) that will make hot module replacement much easier**.

## HMR with Stylesheets

Hot Module Replacement with CSS is actually fairly straightforward with the help of the `style-loader`. This loader uses `module.hot.accept` behind the scenes to patch `<style>` tags when CSS dependencies are updated.

First let's install both loaders with the following command:

```shell
npm install --save-dev style-loader css-loader
```

> `style-loader` `css-loader` 内置了 HMR 热更新相关的代码

Now let's update the configuration file to make use of the loader.

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

## Other Code and Frameworks

There are many other loaders and examples out in the community to make HMR interact smoothly with a variety of frameworks and libraries...

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): Tweak react components in real time.
- [Vue Loader](https://github.com/vuejs/vue-loader): This loader supports HMR for vue components out of the box.
- [Elm Hot webpack Loader](https://github.com/klazuka/elm-hot-webpack-loader): Supports HMR for the Elm programming language.
- [Angular HMR](https://angular.io/cli/serve): No loader necessary! HMR support is built in the Angular CLI, simply add the `--hmr` flag to you `ng serve` command.
- [Svelte Loader](https://github.com/sveltejs/svelte-loader): This loader supports HMR for Svelte components out of the box.

##

Further Reading

- [Concepts - Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement)
- [API - Hot Module Replacement](https://webpack.js.org/api/hot-module-replacement)
