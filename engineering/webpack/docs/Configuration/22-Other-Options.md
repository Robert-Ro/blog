# Other Options

These are the remaining configuration options supported by webpack.

> Help Wanted: This page is still a work in progress. If you are familiar with any of the options for which the description or examples are incomplete, please create an issue and submit a PR at the [docs repo](https://github.com/webpack/webpack.js.org)!

## amd

`object` `boolean: false`

Set the value of `require.amd` or `define.amd`. Setting `amd` to `false` will disable webpack's AMD support.

**webpack.config.js**

```javascript
module.exports = {
  //...
  amd: {
    jQuery: true,
  },
}
```

Certain popular modules written for AMD, most notably jQuery versions 1.7.0 to 1.9.1, will only register as an AMD module if the loader indicates it has taken [special allowances](https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD) for multiple versions being included on a page.

The allowances were the ability to restrict registrations to a specific version or to support different sandboxes with different defined modules.

This option allows you to set the key your module looks for to a truthy value.
As it happens, the AMD support in webpack ignores the defined name anyways.

## bail ✨✨

`boolean = false`

Fail out on the first error instead of tolerating it. By default webpack will log these errors in red in the terminal, as well as the browser console when using HMR, but continue bundling. To enable it:
在第一个错误出现时抛出失败结果，而不是容忍它。默认情况下，当使用 HMR 时，webpack 会将在终端以及浏览器控制台中，以红色文字记录这些错误，但仍然继续进行打包。要启用它：

**webpack.config.js**

```javascript
module.exports = {
  //...
  bail: true,
}
```

This will force webpack to exit its bundling process.
这将迫使 webpack 退出其打包过程。

> Avoid using `bail` option in [`watch`](/configuration/watch) mode, as it will force webpack to exit as soon as possible when an error is found.

## dependencies

`[string]`

A list of [`name`](#name) defining all sibling configurations it depends on. Dependent configurations need to be compiled first.
一个 name 列表，定义它所依赖的所有兄弟（sibling）配置。需要首先编译依赖的配置。

In watch mode dependencies will invalidate the compiler when:
在 watch 模式下，当出现以下情况时，依赖项将使编译器失效：

1.  the dependency has changed 依赖项发生变化
2.  a dependency is currently compiling or invalid 依赖项当前正在编译或者处于无效状态

Remember that current configuration will not compile until its dependencies are done.
请记住，在完成依赖项编译之前，不会编译此配置。

**webpack.config.js**

```js
module.exports = [
  {
    name: 'client',
    target: 'web',
    // …
  },
  {
    name: 'server',
    target: 'node',
    dependencies: ['client'],
  },
]
```

## ignoreWarnings

`[RegExp, function (WebpackError, Compilation) => boolean, {module?: RegExp, file?: RegExp, message?: RegExp}]`

Tells webpack to ignore specific warnings. This can be done with a `RegExp`, a custom `function` to select warnings based on the raw warning instance which is getting `WebpackError` and `Compilation` as arguments and returns a `boolean`, an `object` with the following properties:
告诉 webpack 忽略掉特定的警告

- `file` : A RegExp to select the origin file for the warning.
- `message` : A RegExp to select the warning message.
- `module` : A RegExp to select the origin module for the warning.

`ignoreWarnings` must be an `array` of any or all of the above.

```javascript
module.exports = {
  //...
  ignoreWarnings: [
    {
      module: /module2\.js\?[34]/, // A RegExp
    },
    {
      module: /[13]/,
      message: /homepage/,
    },
    /warning from compiler/,
    (warning) => true,
  ],
}
```

## infrastructureLogging✨✨✨

Options for infrastructure level logging.
用于基础设施水平的日志选项。

`object = {}`

### appendOnly✨

<Badge text="5.31.0+" />

`boolean`

Append lines to the output instead of updating existing output, useful for status messages. This option is used only when no custom [`console`](#console) is provided.
将内容追加到现有输出中，而非更新现有输出，这对于展示状态信息来说非常有用。此选项仅在未提供自定义 console 的情况下使用。

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    appendOnly: true,
    level: 'verbose',
  },
  plugins: [
    (compiler) => {
      const logger = compiler.getInfrastructureLogger('MyPlugin')
      logger.status('first output') // this line won't be overridden with `appendOnly` enabled
      logger.status('second output')
    },
  ],
}
```

### colors✨

<Badge text="5.31.0+" />

`boolean`

Enable colorful output for infrastructure level logging. This option is used only when no custom [`console`](#console) is provided.

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    colors: true,
    level: 'verbose',
  },
  plugins: [
    (compiler) => {
      const logger = compiler.getInfrastructureLogger('MyPlugin')
      logger.log('this output will be colorful')
    },
  ],
}
```

### console

<Badge text="5.31.0+" />

`Console`

Customize the console used for infrastructure level logging.
为基础设施日志提供自定义方案。

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    console: yourCustomConsole(),
  },
}
```

### debug✨✨

`string` `boolean = false` `RegExp` `function(name) => boolean` `[string, RegExp, function(name) => boolean]`

Enable debug information of specified loggers such as plugins or loaders. Similar to [`stats.loggingDebug`](/configuration/stats/#statsloggingdebug) option but for infrastructure. Defaults to `false`.
开启特定日志比如插件(plugins)和加载器(loaders)的调试信息。 与 `stats.loggingDebug` 选项类似但仅仅对于基础设施而言。默认为 `false`。

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    level: 'info',
    debug: ['MyPlugin', /MyPlugin/, (name) => name.contains('MyPlugin')],
  },
}
```

### level✨

`string = 'info' : 'none' | 'error' | 'warn' | 'info' | 'log' | 'verbose'`

Enable infrastructure logging output. Similar to [`stats.logging`](/configuration/stats/#statslogging) option but for infrastructure. Defaults to `'info'`.
开启基础设施日志输出。与 stats.logging 选项类似但仅仅是对于基础设施而言。默认值为 'info'。
Possible values:

- `'none'` - disable logging 禁用日志
- `'error'` - errors only 仅仅显示错误
- `'warn'` - errors and warnings only 仅仅显示错误与告警
- `'info'` - errors, warnings, and info messages 显示错误、告警与信息
- `'log'` - errors, warnings, info messages, log messages, groups, clears. Collapsed groups are displayed in a collapsed state. 显示错误、告警，信息，日志信息，组别，清楚。 收缩的组别会在收缩的状态中被显示。
- `'verbose'` - log everything except debug and trace. Collapsed groups are displayed in expanded state. 输出所有日志除了调试与追踪。收缩的组别会在扩展的状态中被显示。

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    level: 'info',
  },
}
```

### stream

<Badge text="5.31.0+" />

`NodeJS.WritableStream = process.stderr`

Stream used for logging output. Defaults to `process.stderr`. This option is used only when no custom [`console`](#console) is provided.
用于日志输出的流。默认为 `process.stderr`。此选项仅在未提供自定义 `console` 的情况下使用。

**webpack.config.js**

```javascript
module.exports = {
  //...
  infrastructureLogging: {
    stream: process.stderr,
  },
}
```

> In the case of a TTY stream, `colors` is enabled and `appendOnly` is disabled, and vice versa.
> 在 TTY 流的情况下，会启用 colors 并禁用 appendOnly，反之亦然。
> TTY（Teletypewriter）流是指在计算机中用于处理终端输入和输出的特殊类型的数据流。TTY 流通常与终端设备（如控制台、终端窗口或串口终端）相关联。

## loader ✨

`object`

Expose custom values into the [loader context](/api/loaders/#the-loader-context).

For example, you can define a new variable in the loader context:

**webpack.config.js**

```javascript
module.exports = {
  // ...
  loader: {
    answer: 42,
  },
}
```

Then use `this.answer` to get its value in the loader:

**custom-loader.js**

```javascript
module.exports = function (source) {
  // ...
  console.log(this.answer) // will log `42` here
  return source
}
```

> You can override properties in the loader context as webpack copies all properties that are defined in the `loader` to the loader context.

## name ✨

`string`

Name of the configuration. Used when loading multiple configurations.

**webpack.config.js**

```javascript
module.exports = {
  //...
  name: 'admin-app',
}
```

## parallelism ✨

`number = 100`

Limit the number of parallel processed modules. Can be used to fine tune performance or to get more reliable profiling results.

## profile

`boolean`

Capture a "profile" of the application, including statistics and hints, which can then be dissected using the [Analyze](https://webpack.github.io/analyse/) tool. It will also log out a summary of module timings.

> Use the [StatsPlugin](https://www.npmjs.com/package/stats-webpack-plugin)✨ for more control over the generated profile.

> Combine `profile: true` with `parallelism: 1` to get correct timings. Note that this will slow down the build as well.

## recordsInputPath

`string`

Specify the file from which to read the last set of records. This can be used to rename a records file. See the example below.

## recordsOutputPath

`string`

Specify where the records should be written. The following example shows how you might use this option in combination with `recordsInputPath` to rename a records file:

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  recordsInputPath: path.join(__dirname, 'records.json'),
  recordsOutputPath: path.join(__dirname, 'newRecords.json'),
}
```

## recordsPath✨

`string`

Use this option to generate a JSON file containing webpack "records" – pieces of data used to store module identifiers across multiple builds. **You can use this file to track how modules change between builds**. To generate one, specify a location:

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  recordsPath: path.join(__dirname, 'records.json'),
}
```

Records are particularly useful if you have a complex setup that leverages [Code Splitting](/guides/code-splitting). The data can be used to ensure the split bundles are achieving the [caching](/guides/caching) behavior you need.

> Note that although this file is generated by the compiler, you may still want to track it in source control to keep a history of how it has changed over time.

> Setting `recordsPath` will essentially set `recordsInputPath` and `recordsOutputPath` to the same location. This is usually all that's necessary unless you decide to change the name of the file containing the records. See below for an example.

## snapshot

`object`

`snapshot` options decide how the file system snapshots are created and invalidated.

**webpack.config.js**

```javascript
const path = require('path')
module.exports = {
  // ...
  snapshot: {
    managedPaths: [path.resolve(__dirname, '../node_modules')],
    immutablePaths: [],
    buildDependencies: {
      hash: true,
      timestamp: true,
    },
    module: {
      timestamp: true,
    },
    resolve: {
      timestamp: true,
    },
    resolveBuildDependencies: {
      hash: true,
      timestamp: true,
    },
  },
}
```

### buildDependencies

`object = { hash boolean = true, timestamp boolean = true }`

Snapshots for build dependencies when using the persistent cache.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

Both `hash` and `timestamp` are optional.

- `{ hash: true }`: Good for CI caching with a fresh checkout which doesn't keep timestamps and uses hashes.
- `{ timestamp: true }`: Good for local development caching.
- `{ timestamp: true, hash: true }`: Good for both cases mentioned above. Timestamps are compared first, which is cheap because webpack doesn't need to read files to compute their hashes. Content hashes will be compared only when timestamps are the same, which leads to a small performance hit for the initial build.

### immutablePaths

`(RegExp | string)[]`

An array of paths that are managed by a package manager and contain a version or a hash in their paths so that all files are immutable.

Make sure to wrap the path in a capture group if you use regular expressions.

### managedPaths

`(RegExp | string)[]`

An array of paths that are managed by a package manager and can be trusted to not be modified otherwise.

Make sure you wrap the path in a capture group if you are using regular expressions so webpack can extract the path, for example, here's a RegExp webpack internally uses to match the `node_modules` directory:

```text
/^(.+?[\\/]node_modules)[\\/]/
```

A common use case for `managedPaths` would be to exclude some folders from `node_modules`, e.g. you want webpack to know that files in the `node_modules/@azure/msal-browser` folder are expected to change, which can be done with a regular expression like the one below:

```js
module.exports = {
  snapshot: {
    managedPaths: [/^(.+?[\\/]node_modules[\\/](?!(@azure[\\/]msal-browser))(@.+?[\\/])?.+?)[\\/]/],
  },
}
```

### module

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for building modules.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

### resolve

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for resolving of requests.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

### resolveBuildDependencies

`object = {hash boolean = true, timestamp boolean = true}`

Snapshots for resolving of build dependencies when using the persistent cache.

- `hash`: Compare content hashes to determine invalidation (more expensive than `timestamp`, but changes less often).
- `timestamp`: Compare timestamps to determine invalidation.

## Further Reading

- [Using Records](https://survivejs.com/webpack/optimizing/separating-manifest/#using-records)
