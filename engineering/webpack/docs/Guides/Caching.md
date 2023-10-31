# Caching

So we're using webpack to bundle our modular application which yields a deployable /dist directory. Once the contents of /dist have been deployed to a server, clients (typically browsers) will hit that server to grab the site and its assets. The **last step can be time consuming**, which is why browsers use a technique called **caching**. This allows sites to load faster with less unnecessary network traffic. However, it can also **cause headaches** _when you need new code to be picked up_.

接下来继续使用 webpack 打包模块化应用程序。在打包后，webpack 会生成一个可部署的 `/dist` 目录，然后就打包后的内容放置在此目录中。一旦 `/dist` 目录中的内容部署到服务器上，客户端（通常是浏览器）就能够访问此服务器以获取站点及其资源。而最后一步获取资源是比较耗费时间的，这就是为什么浏览器使用一种名为 `缓存` 的技术。命中缓存可以降低网络流量，使网站加载速度更快。然而，如果在部署新版本时不更改资源的文件名，浏览器可能会认为它没有被更新，就会使用它的缓存版本。由于缓存的存在，当你需要获取新的代码时，就会显得很**棘手**

## Output Filenames

We can use the `output.filename` [substitutions](https://webpack.js.org/configuration/output/#outputfilename) setting to define the names of our output files. Webpack provides a method of templating the filenames using bracketed strings called **substitutions**. The `[contenthash]` substitution will add a unique hash based on the content of an asset. When the asset's content changes, `[contenthash]` will change as well.
更改 output.filename 中的 substitutions 以定义输出文件的名称。webpack 提供了一种称为 substitution（可替换模板字符串） 的方式，通过带括号字符串来模板化文件名。其中，[contenthash] substitution 将根据资源内容创建唯一哈希值。当资源内容发生变化时，[contenthash] 也会发生变化。

## Extracting Boilerplate 提取引导模板

As we learned in `code splitting`, the `SplitChunksPlugin` can be used to split modules out into separate bundles. Webpack provides an optimization feature to split runtime code into a separate chunk using the `optimization.runtimeChunk` option. Set it to `single` to create a single runtime bundle for all chunks:
正如我们在 `代码分离` 中所学到的，`SplitChunksPlugin` 可以用于将模块分离到单独的 `bundle` 中。webpack 还提供了一个优化功能，可以使用 `optimization.runtimeChunk` 选项将 `runtime` 代码拆分为一个单独的 `chunk`。将其设置为 `single` 以为所有 `chunk` 创建一个 runtime bundle：

```log
Hash: 82c9c385607b2150fab2
Version: webpack 4.12.0
Time: 3027ms
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
   main.e81de2cf758ada72f306.js   69.5 KiB       1  [emitted]  main
                     index.html  275 bytes          [emitted]
[1] (webpack)/buildin/module.js 497 bytes {1} [built]
[2] (webpack)/buildin/global.js 489 bytes {1} [built]
[3] ./src/index.js 309 bytes {1} [built]
    + 1 hidden module
```

It's also good practice to extract third-party libraries, such as `lodash` or `react`, to a separate `vendor` chunk as they are less likely to change than our local source code. This step will allow clients to request even less from the server to stay up to date. This can be done by using the `cacheGroups` option of the `SplitChunksPlugin` demonstrated in Example 2 of SplitChunksPlugin. Lets add `optimization.splitChunks` with `cacheGroups` with next params and build:
由于像 `lodash` 或 `react` 这样的第三方库很少像本地源代码一样频繁修改，因此通常推荐将第三方库提取到单独的 `vendor` chunk 中。这一步将减少客户端对服务器的请求，同时保证自身代码与服务器一致。

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
```

Let's run another build to see our new `vendor` bundle:

```log
...
                          Asset       Size  Chunks             Chunk Names
runtime.cc17ae2a94ec771e9221.js   1.42 KiB       0  [emitted]  runtime
vendors.a42c3ca0d742766d7a28.js   69.4 KiB       1  [emitted]  vendors
   main.abf44fedb7d11d4312d7.js  240 bytes       2  [emitted]  main
                     index.html  353 bytes          [emitted]
...
```

We can now see that our `main` bundle does not contain `vendor` code from `node_modules` directory and is down in size to `240 bytes`!

## Module Identifiers

可以发现，三个文件的哈希值都发生了变化。这是因为每个 module.id 会默认基于解析顺序（resolve order）增量。换言之，当解析顺序发生变化，ID 也会随之改变。简要概括便是：

- The `main` bundle changed because of its new content. `main` bundle 会随着自身的新增内容的修改，而发生变化。
- The `vendor` bundle changed because its module.id was changed. `vendor` bundle 会随着自身的 `module.id` 的变化，而发生变化。
- And, the `runtime` bundle changed because it now contains a reference to a new module. `manifest` runtime 会因为现在包含一个新模块的引用，而发生变化。

上面的第一点与最后一点都是符合预期的行为，而 `vendor` 的哈希值发生变化是我们要修复的。试试将 `optimization.moduleIds` 设置为 `'deterministic'`：

```js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Caching',
    }),
  ],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}
```

现在，不论是否添加任何新的本地依赖，对于前后两次构建，vendor 的哈希值都应保持一致

## 总结

缓存可能很复杂，但是从应用程序或站点用户可以获得的收益来看，这值得付出努力。想要了解更多信息，请查看下面 进一步阅读 部分。

## Further Reading

[Issue 652](https://github.com/webpack/webpack.js.org/issues/652)
