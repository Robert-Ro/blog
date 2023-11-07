# Plugins

The `plugins` option is used to customize the webpack build process in a variety of ways. Webpack comes with a variety built-in plugins available under `webpack.[plugin-name]`. See [Plugins page](https://webpack.js.org/plugins) for a list of plugins and documentation but note that there are a lot more out in the community.

## Plugins

`[Plugin]`

An array of webpack plugins. For example, [DefinePlugin](https://webpack.js.org/plugins/define-plugin/) allows you to create global constants which can be configured at compile time. This can be useful for allowing different behavior between development builds and release builds. Starting with webpack 5.87.0 falsy values can be used to disable specific plugins conditionally.

```js
// webpack.config.js
module.exports = {
  //...
  plugins: [
    new webpack.DefinePlugin({
      // Definitions...
    }),
    false && new webpack.IgnorePlugin(), // disabled conditionally
  ],
}
```

A more complex example, using multiple plugins, might look something like this:

```js
// webpack.config.js
var webpack = require('webpack')
// importing plugins that do not come by default in webpack
var DashboardPlugin = require('webpack-dashboard/plugin')

// adding plugins to your configuration
module.exports = {
  //...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // compile time plugins
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    // webpack-dev-server enhancement plugins
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
```

## Further Reading

- [writing-a-plugin](https://webpack.js.org/contribute/writing-a-plugin/)
- [plugins list](https://webpack.js.org/plugins)
- [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard), A CLI dashboard for webpack dev server
