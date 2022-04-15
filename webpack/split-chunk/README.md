# Webpack Split Chunk

- chunkid 设置为 named，方便 debug
- webpack 打包后会有相关的输出信息，
  - 表明各个文件被打包到哪个输出文件中
  - 入口文件下的包组成

## 配置项
```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      //在cacheGroups外层的属性设定适用于所有缓存组，不过每个缓存组内部可以重设这些属性
      chunks: "async", //将什么类型的代码块用于分割，三选一： "initial"：入口代码块 | "all"：全部 | "async"：按需加载的代码块
      minSize: 30000, //大小超过30kb的模块才会被提取
      maxSize: 0, //只是提示，可以被违反，会尽量将chunk分的比maxSize小，当设为0代表能分则分，分不了不会强制
      minChunks: 1, //某个模块至少被多少代码块引用，才会被提取成新的chunk
      maxAsyncRequests: 5, //分割后，按需加载的代码块最多允许的并行请求数，在webpack5里默认值变为6
      maxInitialRequests: 3, //分割后，入口代码块最多允许的并行请求数，在webpack5里默认值变为4
      automaticNameDelimiter: "~", //代码块命名分割符
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
### 关键属性
- minSize(默认 30000bytes)：使得比这个值大的模块才会被提取
- minChunks（默认 1）：用于界定至少重复多少次的模块才会被提取
- **maxInitialRequests**（默认 3）：一个代码块最终就会对应一个请求数，所以该属性决定入口最多分成的代码块数量，太小的值会使你无论怎么分割，都无法让入口的代码块变小。
- **maxAsyncRequests**（默认 5）：同上，决定每次按需加载时，代码块的最大数量
- test：通过正则表达式精准匹配要提取的模块，**可以根据项目结构制定各种规则，是手动优化的关键**。
## cache groups 缓存组
### 总结
优化本身是一件拆东补西的事，**比如提取出一个公共 chunk，打包产出的文件就会多一个，也必然会增加一个网络请求**。当项目很庞大，每个公共模块单独提取成一个 chunk 会导致打包速度出奇的慢，影响开发体验，所以通常会取折衷方案，**将重复的较大模块单独提取，而将一些重复的小模块打包到一个 chunk，以减少包数量，同时不能让这个包太大，否则会影响页面加载时间**。

### 优化心得
优化就是在**有限的时间空间和算力**下，去除低效的重复（**提出公共大模块**），进行合理的冗余（**小文件允许重复**），并利用一些用户无感知的区间（预加载），达到时间和空间综合考量上的最优。

## Resources
- [splitChunk源码分享](https://juejin.cn/post/6844904196790026253#heading-6)