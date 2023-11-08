# Optimization

Since version 4 webpack runs optimizations for you depending on the chosen [`mode`](/configuration/mode/), still all optimizations are available for manual configuration and overrides.
从 webpack 4 开始，会根据你选择的 `mode` 来执行不同的优化， 不过所有的优化还是可以手动配置和重写。

## optimization.chunkIds

`boolean = false` `string: 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'`

Tells webpack which algorithm to use when choosing chunk ids. Setting `optimization.chunkIds` to `false` tells webpack that none of built-in algorithms should be used, as custom one can be provided via plugin. There are a couple of defaults for `optimization.chunkIds`:
告知 webpack 当选择模块 id 时需要使用哪种算法。将 `optimization.chunkIds` 设置为 `false` 会告知 webpack 没有任何内置的算法会被使用，但自定义的算法会由插件提供。`optimization.chunkIds` 的默认值是 `false`：

- Also if the environment is development then `optimization.chunkIds` is set to `'named'`, while in production it is set to `'deterministic'`开发环境：`'named'`, 生产环境: `'deterministic'`
- if none of the above, `optimization.chunkIds` will be defaulted to `'natural'`

The following string values are supported:

| Option                   | Description                                                                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `'natural'`              | Numeric ids in order of usage. 按使用顺序的数字 id。                                                                                                                                                          |
| `'named'` ✨✨✨         | Readable ids for better debugging. 对调试更友好的可读的 id。                                                                                                                                                  |
| `'deterministic'` ✨✨✨ | Short numeric ids which will not be changing between compilation. Good for long term caching. Enabled by default for production mode. 在不同的编译中不变的短数字 id。有益于长期缓存。在生产模式中会默认开启。 |
| `'size'`                 | Numeric ids focused on minimal initial download size. 专注于让初始下载包大小更小的数字 id                                                                                                                     |
| `'total-size'`           | numeric ids focused on minimal total download size. 专注于让总下载包大小更小的数字 id。                                                                                                                       |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    chunkIds: 'named',
  },
}
```

By default, a minimum length of 3 digits is used when `optimization.chunkIds` is set to `'deterministic'`. To override the default behaviour, set `optimization.chunkIds` to `false` and use the `webpack.ids.DeterministicChunkIdsPlugin`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    chunkIds: false,
  },
  plugins: [
    new webpack.ids.DeterministicChunkIdsPlugin({
      maxLength: 5,
    }),
  ],
}
```

## optimization.concatenateModules

`boolean`

Tells webpack to find segments of the module graph which can be safely concatenated into a single module. Depends on [`optimization.providedExports`](#optimizationprovidedexports) and [`optimization.usedExports`](#optimizationusedexports).
By default `optimization.concatenateModules` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    concatenateModules: true,
  },
}
```

## optimization.emitOnErrors

`boolean = false`

Use the `optimization.emitOnErrors` to emit assets whenever there are errors while compiling. This ensures that erroring assets are emitted. Critical errors are emitted into the generated code and will cause errors at runtime.
使用 `optimization.emitOnErrors` 在编译时每当有错误时，就会发送静态资源。这样可以确保出错的静态资源被发送出来。关键错误会被发送到生成的代码中，并会在运行时报错。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    emitOnErrors: true,
  },
}
```

W> If you are using webpack [CLI](/api/cli/), the webpack process will not exit with an error code while this plugin is enabled. If you want webpack to "fail" when using the CLI, please check out the [`bail` option](/api/cli/#advanced-options).

## optimization.flagIncludedChunks

`boolean`

Tells webpack to determine and flag chunks which are subsets of other chunks in a way that subsets don’t have to be loaded when the bigger chunk has been already loaded. By default `optimization.flagIncludedChunks` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    flagIncludedChunks: true,
  },
}
```

## optimization.innerGraph

`boolean = true`

`optimization.innerGraph` tells webpack whether to conduct inner graph analysis for unused exports.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    innerGraph: false,
  },
}
```

## optimization.mangleExports

`boolean` `string: 'deterministic' | 'size'`

`optimization.mangleExports` allows to control export mangling.
允许控制导出处理(export mangling)

By default `optimization.mangleExports: 'deterministic'` is enabled in `production` [mode](/configuration/mode/) and disabled elsewise.

The following values are supported:

| Option            | Description                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `'size'`          | Short names - usually a single char - focused on minimal download size.                                              |
| `'deterministic'` | Short names - usually two chars - which will not change when adding or removing exports. Good for long term caching. |
| `true`            | Same as `'deterministic'`                                                                                            |
| `false`           | Keep original name. Good for readability and debugging.                                                              |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mangleExports: true,
  },
}
```

## optimization.mangleWasmImports

`boolean = false`

When set to `true` tells webpack to reduce the size of WASM by changing imports to shorter strings. It mangles module and export names.
在设置为 `true` 时，告知 webpack 通过将导入修改为更短的字符串，来减少 WASM 大小。这会破坏模块和导出名称。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mangleWasmImports: true,
  },
}
```

## optimization.mergeDuplicateChunks

`boolean = true`

Tells webpack to merge chunks which contain the same modules. Setting `optimization.mergeDuplicateChunks` to `false` will disable this optimization.
告知 webpack 合并含有相同模块的 chunk。将 `optimization.mergeDuplicateChunks` 设置为 `false` 以禁用这项优化。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    mergeDuplicateChunks: false,
  },
}
```

## optimization.minimize

`boolean = true`

Tell webpack to minimize the bundle using the [TerserPlugin](/plugins/terser-webpack-plugin/) or the plugin(s) specified in [`optimization.minimizer`](#optimizationminimizer).
告知 webpack 使用 `TerserPlugin` 或其它在 `optimization.minimizer`定义的插件压缩 bundle。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    minimize: false,
  },
}
```

T> Learn how [mode](/configuration/mode/) works.

## optimization.minimizer✨

> 压缩 js、css

`[TerserPlugin]` and or `[function (compiler)]` or `undefined | null | 0 | false | ""`

Allows you to override the default minimizer by providing a different one or more customized [TerserPlugin](/plugins/terser-webpack-plugin/) instances. Starting with webpack 5.87.0 falsy values can be used to conditionally disable specific minimizers.

**webpack.config.js**

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
}
```

Or, as function:

```js
module.exports = {
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin')
        new TerserPlugin({
          /* your config */
        }).apply(compiler)
      },
    ],
  },
}
```

By default, webpack would set `optimization.minimizer` to [the following value](https://github.com/webpack/webpack/blob/4b4ca3bb53f36a5b8fc6bc1bd976ed7af161bd80/lib/config/defaults.js#L1160-L1174):

```js
;[
  {
    apply: (compiler) => {
      // Lazy load the Terser plugin
      const TerserPlugin = require('terser-webpack-plugin')
      new TerserPlugin({
        terserOptions: {
          compress: {
            passes: 2,
          },
        },
      }).apply(compiler)
    },
  },
] // eslint-disable-line
```

Which can be accessed with `'...'` in case you want to keep it when customizing `optimization.minimizer`:

```js
module.exports = {
  optimization: {
    minimizer: [new CssMinimizer(), '...'],
  },
}
```

Basically, `'...'` is [a shortcut to access the default configuration value](https://github.com/webpack/webpack/blob/4b4ca3bb53f36a5b8fc6bc1bd976ed7af161bd80/lib/config/defaults.js#L98-L108) webpack would otherwise set for us.

## optimization.moduleIds

`boolean: false` `string: 'natural' | 'named' | 'deterministic' | 'size'`

Tells webpack which algorithm to use when choosing module ids. Setting `optimization.moduleIds` to `false` tells webpack that none of built-in algorithms should be used, as custom one can be provided via plugin.

The following string values are supported:

| Option          | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| `natural`       | Numeric ids in order of usage.按使用顺序的数字 id。                                       |
| `named`         | Readable ids for better debugging. 对调试更友好的可读的 id。                              |
| `deterministic` | Module names are hashed into small numeric values. 被哈希转化成的小位数值模块名           |
| `size`          | Numeric ids focused on minimal initial download size. 专注于让初始下载包大小更小的数字 id |

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    moduleIds: 'deterministic',
  },
}
```

`deterministic` option is useful for long term caching, but still results in smaller bundles compared to `hashed`. Length of the numeric value is chosen to fill a maximum of 80% of the id space. By default a minimum length of 3 digits is used when `optimization.moduleIds` is set to `deterministic`. To override the default behaviour set `optimization.moduleIds` to `false` and use the `webpack.ids.DeterministicModuleIdsPlugin`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    moduleIds: false,
  },
  plugins: [
    new webpack.ids.DeterministicModuleIdsPlugin({
      maxLength: 5,
    }),
  ],
}
```

W> `moduleIds: 'deterministic'` was added in webpack 5 and `moduleIds: 'hashed'` is deprecated in favor of it.

W> `moduleIds: total-size` has been removed in webpack 5.

## optimization.nodeEnv

`boolean = false` `string`

Tells webpack to set `process.env.NODE_ENV` to a given string value. `optimization.nodeEnv` uses [DefinePlugin](/plugins/define-plugin/) unless set to `false`. `optimization.nodeEnv` **defaults** to [mode](/configuration/mode/) if set, else falls back to `'production'`.

Possible values:

- any string: the value to set `process.env.NODE_ENV` to.
- false: do not modify/set the value of `process.env.NODE_ENV`.

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    nodeEnv: 'production',
  },
}
```

T> When [mode](/configuration/mode/) is set to `'none'`, `optimization.nodeEnv` defaults to `false`.

## optimization.portableRecords

`boolean`

`optimization.portableRecords` tells webpack to generate records with relative paths to be able to move the context folder.

By default `optimization.portableRecords` is disabled. Automatically enabled if at least one of the records options provided to webpack config: [`recordsPath`](/configuration/other-options/#recordspath), [`recordsInputPath`](/configuration/other-options/#recordsinputpath), [`recordsOutputPath`](/configuration/other-options/#recordsoutputpath).

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    portableRecords: true,
  },
}
```

## optimization.providedExports

`boolean`

Tells webpack to figure out which exports are provided by modules to generate more efficient code for `export * from ...`. By default `optimization.providedExports` is enabled.
告知 webpack 去确定那些由模块提供的导出内容，为 `export * from ...` 生成更多高效的代码。默认 `optimization.providedExports` 会被启用。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    providedExports: false,
  },
}
```

## optimization.realContentHash

`boolean = true`

Adds an additional hash compilation pass after the assets have been processed to get the correct asset content hashes. If `realContentHash` is set to `false`, internal data is used to calculate the hash and it can change when assets are identical.
在处理静态资源后添加额外的哈希编译，以获得正确的静态资源内容哈希。如果 `realContentHash` 设置为 `false`，内部数据用于计算哈希值，当静态资源相同时，它可以改变。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    realContentHash: false,
  },
}
```

## optimization.removeAvailableModules✨

`boolean = false`

Tells webpack to detect and remove modules from chunks when these modules are already included in all parents. Setting `optimization.removeAvailableModules` to `true` will enable this optimization. Enabled by default in [`production` mode](/configuration/mode/).
如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。将 `optimization.removeAvailableModules` 设置为 `true` 以启用这项优化。在 `production` 模式 中默认会被开启。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    removeAvailableModules: true,
  },
}
```

W> `optimization.removeAvailableModules` reduces the performance of webpack, and will be disabled in `production` mode by default in next major release. Disable it in `production` mode if you want extra build performance.

## optimization.removeEmptyChunks

`boolean = true`

Tells webpack to detect and remove chunks which are empty. Setting `optimization.removeEmptyChunks` to `false` will disable this optimization.
如果 chunk 为空，告知 webpack 检测或移除这些 chunk。将 `optimization.removeEmptyChunks` 设置为 false 以禁用这项优化。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    removeEmptyChunks: false,
  },
}
```

## optimization.runtimeChunk✨

`object` `string` `boolean`

Setting `optimization.runtimeChunk` to `true` or `'multiple'` adds an additional chunk containing only the runtime to each entrypoint. This setting is an alias for:
将 `optimization.runtimeChunk` 设置为 `true` 或 `'multiple'`，会为每个入口添加一个只含有 runtime 的额外 chunk。此配置的别名如下：

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
  },
}
```

The value `'single'` instead creates a runtime file to be shared for all generated chunks. This setting is an alias for:
值 `"single"` 会创建一个在所有生成 chunk 之间共享的运行时文件。此设置是如下设置的别名：
**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
  },
}
```

By setting `optimization.runtimeChunk` to `object` it is only possible to provide the `name` property which stands for the name or name factory for the runtime chunks.

Default is `false`: each entry chunk embeds runtime.
默认值是 false：每个入口 chunk 中直接嵌入 runtime。

> Imported modules are initialized for each runtime chunk separately, so if you include multiple entry points on a page, beware of this behavior. You will probably want to set it to `single` or use another configuration that allows you to only have one runtime instance.
> 对于每个 runtime chunk，导入的模块会被分别初始化，因此如果你在同一个页面中引用多个入口起点，请注意此行为。你或许应该将其设置为`single`，或者使用其他只有一个 runtime 实例的配置。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },
}
```

## optimization.sideEffects✨

`boolean = true` `string: 'flag'`

Tells webpack to recognise the [`sideEffects`](https://github.com/webpack/webpack/blob/main/examples/side-effects/README.md) flag in `package.json` or rules to skip over modules which are flagged to contain no side effects when exports are not used.
告知 webpack 去辨识 `package.json` 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。

**package.json**

```json
{
  "name": "awesome npm module",
  "version": "1.0.0",
  "sideEffects": false
}
```

> Please note that `sideEffects` should be in the npm module's `package.json` file and doesn't mean that you need to set `sideEffects` to `false` in your own project's `package.json` which requires that big module.
> 请注意的是 （副作用）sideEffects 需要在 npm 模块的 package.json 文件中，但并不意味着你需要在你自己的引用那个大模块的项目中的 `package.json` 中将 sideEffects 设置成 false。

`optimization.sideEffects` depends on [`optimization.providedExports`](#optimizationprovidedexports) to be enabled. This dependency has a build time cost, but eliminating modules has positive impact on performance because of less code generation. Effect of this optimization depends on your codebase, try it for possible performance wins.
`optimization.sideEffects` 取决于 `optimization.providedExports` 被设置成启用。这个依赖会有构建时间的损耗，但去掉模块会对性能有正面的影响，因为更少的代码被生成。该优化的效果取决于你的代码库， 可以尝试这个特性以获取一些可能的性能优化。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    sideEffects: true,
  },
}
```

To only use the manual flag and do not analyse source code:

```js
module.exports = {
  //...
  optimization: {
    sideEffects: 'flag',
  },
}
```

The `'flag'` value is used by default in non-production builds.

T> `optimization.sideEffects` will also flag modules as side effect free when they contain only side effect free statements.

## optimization.splitChunks✨

`object`

By default webpack v4+ provides new common chunks strategies out of the box for dynamically imported modules. See available options for configuring this behavior in the [SplitChunksPlugin](/plugins/split-chunks-plugin/) page.

## optimization.usedExports✨

`boolean = true` `string: 'global'`

Tells webpack to determine used exports for each module. This depends on [`optimization.providedExports`](#optimizationprovidedexports). Information collected by `optimization.usedExports` is used by other optimizations or code generation i.e. exports are not generated for unused exports, export names are mangled to single char identifiers when all usages are compatible.
告知 webpack 去决定每个模块使用的导出内容。这取决于 `optimization.providedExports` 选项。由 `optimization.usedExports` 收集的信息会被其它优化手段或者代码生成使用，比如未使用的导出内容不会被生成，当所有的使用都适配，导出名称会被处理做单个标记字符。

Dead code elimination in minimizers will benefit from this and can remove unused exports.
在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容。

**webpack.config.js**

```js
module.exports = {
  //...
  optimization: {
    usedExports: false,
  },
}
```

To opt-out from used exports analysis per runtime:

```js
module.exports = {
  //...
  optimization: {
    usedExports: 'global',
  },
}
```

## Further Reading

- [webpack 4: Code Splitting, chunk graph and the splitChunks optimization](https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366)
