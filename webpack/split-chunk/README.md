# Webpack Split Chunk

- `chunkid` 设置为 `named`，方便 `debug`, 查看到文件被打包到哪几个`chunks`中去了
- webpack 打包后会有相关的输出信息，
  - 表明各个文件被打包到哪个输出文件中
  - 入口文件下的包组成

## Defaults

- out of the box
- it only effects on-demand chunks
- automatically split chunks based on these conditions:
  - new chunk can be shared OR modules are from the `node_modules` folder
  - new chunk would be bigger than 30kb (before min+gz)
  - maximum number of parallel requests when loading chunks on demand would be lower or equal 5 分割后，按需加载的代码块最多允许的并行请求数
  - Maximum number of parallel requests at initial page load would be lower or equal to 3 分割后，入口代码块最多允许的并行请求数

### 关键属性

- minSize(默认 30000bytes)：使得比这个值大的模块才会被提取
- minChunks（默认 1）：用于界定至少重复多少次的模块才会被提取
- **maxInitialRequests**（默认 3）：一个代码块最终就会对应一个请求数，所以该属性决定入口最多分成的代码块数量，太小的值会使你无论怎么分割，都无法让入口的代码块变小。
- **maxAsyncRequests**（默认 5）：同上，决定每次按需加载时，代码块的最大数量
- test：通过正则表达式精准匹配要提取的模块，**可以根据项目结构制定各种规则，是手动优化的关键**。

## 配置项

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      //在cacheGroups外层的属性设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
      chunks: "async", //将什么类型的代码块用于分割，三选一： "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块. Providing `all` can be particularly powerful, because it means that chunks can be shared even between async and non-async chunks.
      minSize: 30000, //大小超过30kb的模块才会被提取
      maxSize: 0, //只是提示，可以被违反，会尽量将chunk分的比maxSize小，当设为0代表能分则分，分不了不会强制
      minChunks: 1, //某个模块至少被多少代码块引用，才会被提取成新的chunk
      maxAsyncRequests: 5, //分割后，按需加载的代码块最多允许的并行请求数，在webpack5里默认值变为6
      maxInitialRequests: 3, //分割后，入口代码块最多允许的并行请求数，在webpack5里默认值变为4
      automaticNameDelimiter: "~", //代码块命名分割符
      automaticNameMaxLength: 109, // chunk name最大字符数
      name: true, //每个缓存组打包得到的代码块的名称
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, //匹配node_modules中的模块
          priority: -10, //优先级，当模块同时命中多个缓存组的规则时，分配到优先级高的缓存组
        },
        default: {
          minChunks: 2, //覆盖外层的全局属性
          priority: -20,
          reuseExistingChunk: true, //是否复用已经从原代码块中分割出来的模块
        },
      },
    },
  },
};
```

### `chunks`

```ts
type chunks = 'all' | 'initial' | 'async' | (chunk:string):boolean
```

### `maxSize`

使用 maxSize（每个缓存组 optimization.splitChunks.cacheGroups[x].maxSize 全局使用 optimization.splitChunks.maxSize 或对后备缓存组 optimization.splitChunks.fallbackCacheGroup.maxSize 使用）告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分。 这些较小的部分在体积上至少为 minSize（仅次于 maxSize）。 该算法是确定性的，对模块的更改只会产生局部影响。这样，在使用长期缓存时就可以使用它并且不需要记录。maxSize 只是一个提示，当模块大于 maxSize 或者拆分不符合 minSize 时可能会被违反。

当 chunk 已经有一个名称时，每个部分将获得一个从该名称派生的新名称。 根据 optimization.splitChunks.hidePathInfo 的值，它将添加一个从第一个模块名称或其哈希值派生的密钥。

maxSize 选项旨在与 HTTP/2 和长期缓存一起使用。它增加了请求数量以实现更好的缓存。它还可以用于减小文件大小，以加快二次构建速度。

> `maxSize` takes higher priority than `maxInitialRequest/maxAsyncRequests`. Actual priority is `maxInitialRequest/maxAsyncRequests` < `maxSize` < `minSize`

### `name`

```ts
type name = boolean | (module, chunks: {name:string, hash:string}[], cacheGroupKey:string) => string | string
```

Also available for each cacheGroup: `splitChunks.cacheGroups.{cacheGroup}.name`.

**The name of the split chunk**. Providing true will automatically generate a name based on chunks and cache group key.

**Providing a string or a function allows you to use a custom name**. Specifying either a string or a function that always **returns the same string will merge all** common modules and vendors into a single chunk**合并所有的公用`module`和`vendor`到一个单独的 chunk**. This might lead to bigger initial downloads and slow down page loads.

If you choose to specify a function, you may find the `chunk.name` and `chunk.hash` properties (where `chunk` is an element of the `chunks` array) particularly useful in choosing a name for your chunk.

If the `splitChunks.name` matches an `entry point` name, the entry point will be removed.

### `cacheGroups` 缓存组

Cache groups can inherit 继承 and/or override 覆盖 any options from `splitChunks.*`; but `test`, `priority` and `reuseExistingChunk` can only be configured on cache group level. To disable any of the default cache groups, set them to `false`.

#### `splitChunks.cacheGroups.{cacheGroup}.priority`

> default: -20

A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher `priority`

#### `reuseExistingChunk`

> deafult: true

如果当前 `chunk` 包含已从主 `bundle` 中拆分出的模块，则它将被重用，而不是生成新的模块。

#### `test`

```ts
type test = (module, chunk) => boolean | RegExp | string;
```

Controls which modules are selected by this cache group. Omitting it selects all modules. It can match the absolute module resource path or chunk names. When a chunk name is matched, all modules in the chunk are selected.精确控制哪些模块被当前缓存组使用；省略将会选择所有的模块；

#### `filename`

Allows to override the filename when and only when it's an initial chunk. All placeholders available in `output.filename` are also available here.只为当前缓存组设置文件名

#### `enforce`

Tells webpack to ignore `splitChunks.minSize`, `splitChunks.minChunks`, `splitChunks.maxAsyncRequests` and `splitChunks.maxInitialRequests` options and always create chunks for this cache group.

#### full definition
[v4](./v4.webpack.d.ts)
[v5](./v5.webpack.d.ts)

### 总结

**优化**本身是一件拆东补西的事，**比如提取出一个公共 `chunk`，打包产出的文件就会多一个，也必然会增加一个网络请求**。当项目很庞大，每个公共模块单独提取成一个 `chunk` 会导致打包速度出奇的慢，影响开发体验，所以通常会取折衷方案，**将重复的较大模块单独提取，而将一些重复的小模块打包到一个 `chunk`，以减少包数量，同时不能让这个包太大，否则会影响页面加载时间**。

### 优化心得

优化就是在**有限的时间空间和算力**下，去除低效的重复（**提出公共大模块**），进行合理的冗余（**小文件允许重复**），并利用一些用户无感知的区间（预加载），达到时间和空间综合考量上的最优。

## Resources

- [splitChunk 源码分享](https://juejin.cn/post/6844904196790026253#heading-6)
- [split-chunks-plugin v4](https://v4.webpack.js.org/plugins/split-chunks-plugin/#root)
- [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/#root)
- [webpack v4类型定义文件](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/webpack/v4/index.d.ts)
