# The Manifest 清单

In a typical application or site built with webpack, there are three main types of code:
在使用 webpack 构建的典型应用程序或站点中，有三种主要的代码类型：

1. The source code you, and maybe your team, have written.你或你的团队编写的源码。
2. Any third-party library or "vendor" code your source is dependent on. 你的源码会依赖的任何第三方的 library 或 "vendor" 代码。
3. A webpack runtime and **manifest** that conducts the interaction of all modules. webpack 的 runtime 和 manifest，管理所有模块的交互。

This article will focus on the last of these three parts: the runtime and, in particular, the manifest.
本文将重点介绍这三个部分中的最后部分：runtime 和 manifest，特别是 manifest。

## Runtime

The runtime, along with the manifest data, is all the code webpack needs to connect your modularized application while it's running in the browser. It contains the loading and resolving logic needed to connect your modules as they interact. This includes connecting modules that have already been loaded into the browser as well as logic to lazy-load the ones that haven't.
runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来连接模块化应用程序所需的所有代码。它包含：在模块交互时，连接模块所需的加载和解析逻辑。包括：已经加载到浏览器中的连接模块逻辑，以及尚未加载模块的延迟加载逻辑。

## Manifest

Once your application hits the browser in the form of `index.html` file, some bundles and a variety of other assets required by your application must be loaded and linked somehow. That `/src` directory you meticulously laid out is now bundled, minified and maybe even split into smaller chunks for lazy-loading by webpack's optimization. So how does webpack manage the interaction between all of your required modules? This is where the manifest data comes in...
一旦你的应用在浏览器中以 `index.html` 文件的形式被打开，一些 bundle 和应用需要的各种资源都需要用某种方式被加载与链接起来。在经过打包、压缩、为延迟加载而拆分为细小的 chunk 这些 webpack 优化 之后，你精心安排的 `/src` 目录的文件结构都已经不再存在。所以 webpack 如何管理所有所需模块之间的交互呢？这就是 manifest 数据用途的由来……

As the `compiler` enters, resolves, and maps out your application, it keeps detailed notes on all your modules. This collection of data is called the "Manifest," and it's what the runtime will use to resolve and load modules once they've been bundled and shipped to the browser. No matter which module syntax you have chosen, those import or require statements have now become `__webpack_require__` methods that point to module identifiers. Using the data in the manifest, the runtime will be able to find out where to retrieve the modules behind the identifiers.
当 `compiler` 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "manifest"，当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。无论你选择哪种 [模块语法](https://webpack.docschina.org/api/module-methods)，那些 `import` 或 `require` 语句现在都已经转换为 `__webpack_require__` 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够检索这些标识符，找出每个标识符背后对应的模块。

## The Problem 问题

So now you have a little bit of insight about how webpack works behind the scenes. "But, how does this affect me?", you might ask. Most of the time, it doesn't. The runtime will do its thing, utilizing the manifest, and everything will appear to magically work once your application hits the browser. However, if you decide to improve the performance of your projects by utilizing browser caching, this process will all of a sudden become an important thing to understand.
所以，现在你应该对 webpack 在幕后工作有一点了解。“但是，这对我有什么影响呢？”，你可能会问。答案是大多数情况下没有。runtime 做完成这些工作：一旦你的应用程序加载到浏览器中，使用 manifest，然后所有内容将展现出魔幻般运行结果。然而，如果你决定通过使用浏览器缓存来改善项目的性能，理解这一过程将突然变得极为重要。

By using content hashes within your bundle file names, you can indicate to the browser when the content of a file has changed, thus invalidating the cache. Once you start doing this though, you'll immediately notice some funny behavior. Certain hashes change even when their content apparently does not. This is caused by the injection of the runtime and manifest, which changes every build.
通过使用内容散列(content hash)作为 bundle 文件的名称，这样在文件内容修改时，会计算出新的 hash，浏览器会使用新的名称加载文件，从而使缓存无效。一旦你开始这样做，你会立即注意到一些有趣的行为。即使某些内容明显没有修改，某些 hash 还是会改变。这是因为，注入的 runtime 和 manifest 在每次构建后都会发生变化。

See the manifest section of our Output management guide to learn how to extract the manifest, and read the guides below to learn more about the intricacies of long term caching.
查看 管理输出 指南的 manifest 部分，了解如何提取 manifest，并阅读下面的指南，以了解更多长效缓存错综复杂之处。

## Further Reading

- [Separating a Manifest](https://survivejs.com/webpack/optimizing/separating-manifest/)
- [Predictable Long Term Caching with webpack](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31)
- [Caching](https://webpack.js.org/guides/caching/)
