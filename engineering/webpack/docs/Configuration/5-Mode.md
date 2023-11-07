# Mode 模式

Providing the `mode` configuration option tells webpack to use its built-in optimizations accordingly.
提供 `mode` 配置选项，告知 webpack **使用相应模式的内置优化**。

`string = 'production': 'none' | 'development' | 'production'`

## Usage

Provide the `mode` option in the config:

```javascript
module.exports = {
  mode: 'development',
}
```

or pass it as a [CLI](/api/cli/) argument:

```bash
webpack --mode=development
```

The following string values are supported:

| Option        | Description                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `development` | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `development`. Enables useful names for modules and chunks.                                                                                                                                                |
| `production`  | Sets `process.env.NODE_ENV` on `DefinePlugin` to value `production`. Enables deterministic mangled names for modules and chunks, `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin` and `TerserPlugin`. |
| `none`        | Opts out of any default optimization options 不使用任何默认优化选项                                                                                                                                                                                               |

If not set, webpack sets `production` as the default value for `mode`.
如果没有设置，webpack 会给 `mode` 的默认值设置为 `production`。

> If `mode` is not provided via configuration or CLI, CLI will use any valid `NODE_ENV` value for `mode`.

### Mode: development

```js
// webpack.development.config.js
module.exports = {
  mode: 'development',
}
```

### Mode: production

```js
// webpack.production.config.js
module.exports = {
  mode: 'production',
}
```

### Mode: none

```js
// webpack.custom.config.js
module.exports = {
  mode: 'none',
}
```

If you want to change the behavior according to the **mode** variable inside the _webpack.config.js_, you have to export a function instead of an object:
如果要根据 `webpack.config.js` 中的 `mode` 变量更改打包行为，则必须将配置导出为函数，而不是导出对象：

```javascript
var config = {
  entry: './app.js',
  //...
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'
  }

  if (argv.mode === 'production') {
    //...
  }

  return config
}
```

## Further Reading

- [webpack default options (source code)](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js)
