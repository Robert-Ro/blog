# Dependency Graph

Any time one file depends on another, webpack treats this as a dependency. This allows webpack to take non-code assets, such as images or web fonts, and also provide them as dependencies for your application.
每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 依赖关系。这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把它们作为 依赖 提供给应用程序。

When webpack processes your application, it starts from a list of modules defined on the command line or in its configuration file. Starting from these entry points, webpack recursively builds a _dependency graph_ that includes every module your application needs, then bundles all of those modules into a small number of bundles - often, only one - to be loaded by the browser.
当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。 从 **入口** 开始，webpack 会递归的构建一个 依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 bundle ——通常只有一个—— 可由浏览器加载

> Bundling your application is especially powerful for HTTP/1.1 clients, as it minimizes the number of times your app has to wait while the browser starts a new request. For HTTP/2, you can also use Code Splitting to achieve best results.
> 对于 _HTTP/1.1_ 的应用程序来说，由 webpack 构建的 bundle 非常强大。当浏览器发起请求时，它能最大程度的减少应用的等待时间。而对于 _HTTP/2_ 来说，你还可以使用代码分割进行进一步优化。

## Further Reading

- [HTTP2 Aggressive Splitting Example](https://github.com/webpack/webpack/tree/master/examples/http2-aggressive-splitting)
- [webpack & HTTP/2](https://medium.com/webpack/webpack-http-2-7083ec3f3ce6)
