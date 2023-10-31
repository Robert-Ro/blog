# Code Splitting 代码分离

Code splitting is one of the **most compelling features** of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle、控制资源加载优先级，如果使用合理，会极大减小加载时间。

There are three general approaches to code splitting available:

- **Entry Points**: Manually split code using `entry` configuration.使用 entry 配置手动地分离代码。
- **Prevent Duplication**: Use [Entry dependencies 入口依赖](https://webpack.js.org/configuration/entry-context/#dependencies) or `SplitChunksPlugin` to dedupe and split chunks.使用 入口依赖 或者 SplitChunksPlugin 去重和分离 chunk。
- **Dynamic Imports**: Split code via inline function calls within modules. 通过模块的内联函数调用分离代码。

## Entry Points

This is by far the **easiest and most intuitive way** to split code. However, it is more manual and has some pitfalls we will go over.
这是迄今为止最简单直观的分离代码的方式。不过，这种方式手动配置较多，并有一些隐患。

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js', // -> index.bundle.js
    another: './src/another-module.js', // -> another-module.bundle.js
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

As mentioned there are some **pitfalls** to this approach:

- If there are any duplicated modules between entry chunks they will be included in both bundles.如果入口 chunk 之间包含一些重复的模块，那么这些重复模块都会被引入到各个 bundle 中。
- It isn't as flexible and can't be used to dynamically split code with the core application logic.这种方法不够灵活，并且不能动态地拆分应用程序逻辑中的核心代码。

除了 `./src/another-module.js`，我们也曾在 `./src/index.js` 中引入过 `lodash`，这就导致了重复引用。

## Prevent Duplication

### Entry dependencies

The `dependOn` option allows to share the modules between the chunks:

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    runtimeChunk: 'single',
  },
}
```

If we're going to use multiple entry points on a single HTML page, `optimization.runtimeChunk: 'single'` is needed too, otherwise we could get into trouble described [here](https://bundlers.tooling.report/code-splitting/multi-entry/).✨✨✨

如果想要在一个 HTML 页面上使用多个入口，还需设置 `optimization.runtimeChunk: 'single'`，否则会遇到 此处 所述的麻烦。

构建结果：

```log
[webpack-cli] Compilation finished
asset shared.bundle.js 549 KiB [compared for emit] (name: shared)
asset runtime.bundle.js 7.79 KiB [compared for emit] (name: runtime)
asset index.bundle.js 1.77 KiB [compared for emit] (name: index)
asset another.bundle.js 1.65 KiB [compared for emit] (name: another)
Entrypoint index 1.77 KiB = index.bundle.js
Entrypoint another 1.65 KiB = another.bundle.js
Entrypoint shared 557 KiB = runtime.bundle.js 7.79 KiB shared.bundle.js 549 KiB
runtime modules 3.76 KiB 7 modules
cacheable modules 530 KiB
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
  ./src/another-module.js 84 bytes [built] [code generated]
  ./src/index.js 257 bytes [built] [code generated]
webpack 5.4.0 compiled successfully in 249 ms
```

As you can see there's another `runtime.bundle.js` file generated besides `shared.bundle.js`, `index.bundle.js` and `another.bundle.js`.
可以看到，除了 `shared.bundle.js`，`index.bundle.js` 和 `another.bundle.js` 之外，还生成了一个 `runtime.bundle.js` 文件。

> // TODO webpack entry

Although using multiple entry points per page is allowed in webpack, it should be avoided when possible in favor of an entry point with multiple imports: `entry: { page: ['./analytics', './app'] }`. This results in a better optimization and consistent execution order when using `async` script tags.
尽管 webpack 允许每个页面使用多入口，但在可能的情况下，应该避免使用多入口，而使用具有多个导入的单入口：`entry: { page: ['./analytics', './app'] }`。这样可以获得更好的优化效果，并在使用`异步`脚本标签时保证执行顺序一致。

### SplitChunksPlugin

The `SplitChunksPlugin` allows us to **extract common dependencies** into an existing entry chunk or an entirely new chunk. Let's use this to de-duplicate the `lodash` dependency from the previous example:
SplitChunksPlugin 插件可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。让我们使用这个插件去除之前示例中重复的 lodash 模块：

```js
const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}
```

With the `optimization.splitChunks` configuration option in place, we should now see the duplicate dependency removed from our `index.bundle.js` and `another.bundle.js`. The plugin should notice that we've separated `lodash` out to a separate chunk and remove the dead weight from our main bundle. Let's do an `npm run build` to see if it worked:
使用 `optimization.splitChunks` 配置选项后构建，将会发现 `index.bundle.js` 和 `another.bundle.js` 中已经移除了重复的依赖模块。需要注意的是，插件将 `lodash` 分离到单独的 chunk，并且将其从 main bundle 中移除，减轻了 bundle 大小。执行 `npm run build` 查看效果：

```log
[webpack-cli] Compilation finished
asset vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB [compared for emit] (id hint: vendors)
asset index.bundle.js 8.92 KiB [compared for emit] (name: index)
asset another.bundle.js 8.8 KiB [compared for emit] (name: another)
Entrypoint index 558 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB index.bundle.js 8.92 KiB
Entrypoint another 558 KiB = vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB another.bundle.js 8.8 KiB
runtime modules 7.64 KiB 14 modules
cacheable modules 530 KiB
  ./src/index.js 257 bytes [built] [code generated]
  ./src/another-module.js 84 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 241 ms
```

Here are some other useful plugins and loaders provided by the community for splitting code:

- `mini-css-extract-plugin`: Useful for splitting CSS out from the main application.用于将 CSS 从主应用程序中分离

## Dynamic Imports 动态导入

Two similar techniques are supported by webpack when it comes to dynamic code splitting. The first and recommended approach is to use the `import()` syntax that conforms to the ECMAScript proposal for dynamic imports. The legacy, webpack-specific approach is to use `require.ensure`. Let's try using the first of these two approaches...

> `import()` calls use promises internally. If you use `import()` with older browsers (e.g., IE 11), remember to shim `Promise` using a polyfill such as `es6-promise` or `promise-polyfill`.

```log
[webpack-cli] Compilation finished
asset vendors-node_modules_lodash_lodash_js.bundle.js 549 KiB [compared for emit] (id hint: vendors) <- 分离的lodash
asset index.bundle.js 13.5 KiB [compared for emit] (name: index)
runtime modules 7.37 KiB 11 modules
cacheable modules 530 KiB
  ./src/index.js 434 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 268 ms
```

## Prefetching/Preloading modules 预获取/预加载模块

Using these inline directives while declaring your imports allows webpack to output “Resource Hint” which tells the browser that for:

- **prefetch**: resource is probably needed for some navigation in the future 将来某些导航下可能需要的资源
- **preload**: resource will also be needed during the current navigation 当前导航下可能需要资源

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js')
```

This will result in `<link rel="prefetch" href="login-modal-chunk.js">` being appended in the head of the page, which will instruct the browser to prefetch in idle time the `login-modal-chunk.js` file.

> webpack will add the prefetch hint once the parent chunk has been loaded. 只要父 chunk 完成加载，webpack 就会添加预获取提示。

`Preload` directive has a bunch of differences compared to `prefetch`:

- A `preloaded` chunk starts loading in parallel to the parent chunk. A `prefetched` chunk starts after the parent chunk finishes loading.预加载 chunk 会在父 chunk 加载时，以并行方式开始加载。预获取 chunk 会在父 chunk 加载结束后开始加载。
- A `preloaded` chunk has medium priority and is instantly downloaded. A `prefetched` chunk is downloaded while the browser is idle.预加载 chunk 具有中等优先级，并立即下载。预获取 chunk 在浏览器闲置时下载。
- A `preloaded` chunk should be instantly requested by the parent chunk. A `prefetched` chunk can be used anytime in the future.预加载 chunk 会在父 chunk 中立即请求，用于当下时刻。预获取 chunk 会用于未来的某个时刻。
- Browser support is different.浏览器支持程度不同

> 异步 chunk 加载可能存在若干错误，需要正确处理
>
> `chunkLoadTimeout`
> chunk loading error 404

## Bundle Analysis Bundle 分析

Once you start splitting your code, it can be useful to analyze the output to check where modules have ended up. The [official analyze tool](https://github.com/webpack/analyse) is a good place to start. There are some other community-supported options out there as well:

- webpack-chart: Interactive pie chart for webpack stats.webpack stats 可交互饼图
- webpack-visualizer: Visualize and analyze your bundles to see which modules are taking up space and which might be duplicates.分析并可视化 bundle，检查哪些模块占用空间，哪些可能是重复使用的
- webpack-bundle-analyzer: A plugin and CLI utility that represents bundle content as a convenient interactive zoomable treemap.一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- webpack bundle optimize helper: This tool will analyze your bundle and give you actionable suggestions on what to improve to reduce your bundle size. 这个工具会分析 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- bundle-stats: Generate a bundle report(bundle size, assets, modules) and compare the results between different builds. 生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。
- webpack-stats-viewer: A plugin with build for webpack stats. Show more information about webpack bundle detail.

## Further Reading

- [<link rel="prefetch/preload" /> in webpack](https://medium.com/webpack/link-rel-prefetch-preload-in-webpack-51a52358f84c)
- [Preload, Prefetch And Priorities in Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
- [Preloading content with <link rel="preload" />](https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content)
