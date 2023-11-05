# Loaders

Loaders are **transformations** that are applied to the source code of a module. They allow you to pre-process files as you import or “load” them. Thus, loaders are kind of like “tasks” in other build tools and provide a powerful way to handle front-end build steps. Loaders can transform files from a different language (like TypeScript) to JavaScript or load inline images as data URLs. Loaders even allow you to do things like import CSS files directly from your JavaScript modules!

## Example

```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
}
```

## Using Loaders

There are two ways to use loaders in your application:

- [Configuration](https://webpack.js.org/concepts/loaders/#configuration) (recommended): Specify them in your `webpack.config.js` file.
- [Inline](https://webpack.js.org/concepts/loaders/#inline): Specify them explicitly in each `import` statement.

Note that loaders can be used from CLI under webpack v4, but the feature was deprecated in webpack v5.

### Configuration

[module.rules](https://webpack.js.org/configuration/module/#modulerules) allows you to specify several loaders within your webpack configuration. This is a concise way to display loaders, and helps to maintain clean code. It also offers you a full overview of each respective loader.
`module.rules` 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。同时让你对各个 loader 有个全局概览：

Loaders are evaluated/executed from right to left (or from bottom to top). In the example below execution starts with sass-loader, continues with css-loader and finally ends with style-loader. See ["Loader Features"](https://webpack.js.org/concepts/loaders/#loader-features) for more information about loaders order.
loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。查看 loader 功能 章节，了解有关 loader 顺序的更多信息。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
}
```

### Inline 内联方式

It's possible to specify loaders in an `import` statement, or any [equivalent "importing" method](https://webpack.js.org/api/module-methods). Separate loaders from the resource with `!`. Each part is resolved relative to the current directory.
可以在 import 语句或任何 与 "import" 方法同等的引用方式 中指定 loader。使用 ! 将资源中的 loader 分开。每个部分都会相对于当前目录解析。

```js
import Styles from 'style-loader!css-loader?modules!./styles.css'
```

It's possible to override any loaders, preLoaders and postLoaders from the [configuration](https://webpack.js.org/configuration) by prefixing the inline import statement:

- Prefixing with `!` will disable all configured normal loaders

```js
import Styles from '!style-loader!css-loader?modules!./styles.css'
```

- Prefixing with `!!` will disable all configured loaders (preLoaders, loaders, postLoaders)

```js
import Styles from '!!style-loader!css-loader?modules!./styles.css'
```

- Prefixing with `-!` will disable all configured preLoaders and loaders but not postLoaders

```js
import Styles from '-!style-loader!css-loader?modules!./styles.css'
```

Options can be passed with a query parameter, e.g. `?key=value&foo=bar`, or a JSON object, e.g. `?{"key":"value","foo":"bar"}`.

> Use `module.rules` whenever possible, as this will reduce boilerplate in your source code and allow you to debug or locate a loader faster if something goes south.

## Loader Features loader 特性

- Loaders can be chained. Each loader in the chain applies transformations to the processed resource. A chain is executed in reverse order. The first loader passes its result (resource with applied transformations) to the next one, and so forth. Finally, webpack expects JavaScript to be returned by the last loader in the chain.loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
- Loaders can be **synchronous** or **asynchronous**. loader 可以是同步的，也可以是异步的。
- Loaders run in `Node.js` and can do everything that’s possible there. loader 运行在 Node.js 中，并且能够执行任何操作。
- Loaders can be configured with an `options` object (using `query` parameters to set options is still supported but has been deprecated). loader 可以通过 options 对象配置（仍然支持使用 query 参数来设置选项，但是这种方式已被废弃）。
- Normal modules can export a loader in addition to the normal `main` via `package.json` with the loader field. 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
- Plugins can give `loaders` more features. 插件(plugin)可以为 loader 带来更多特性。
- Loaders can emit additional arbitrary files. loader 能够产生额外的任意文件。

Loaders provide a way to customize the output through their preprocessing functions. Users now have more flexibility to include fine-grained logic such as compression, packaging, language translations and [more](https://webpack.js.org/loaders). 可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言转译（或编译）和 更多其他特性。

## Resolving Loaders 解析 loader

Loaders follow the standard [module resolution](https://webpack.js.org/concepts/module-resolution/). In most cases it will be loaded from the [module path](https://webpack.js.org/concepts/module-resolution/#module-paths) (think `npm install`, `node_modules`).
loader 遵循标准 **模块解析** 规则。多数情况下，loader 将从 模块路径 加载（通常是从 `npm install`, `node_modules` 进行加载）。

A loader module is expected to export a function and be written in Node.js compatible JavaScript. They are most commonly managed with npm, but you can also have custom loaders as files within your application. By convention, loaders are usually named `xxx-loader` (e.g. `json-loader`). See ["Writing a Loader"](https://webpack.js.org/contribute/writing-a-loader/) for more information.
我们预期 loader 模块导出为一个函数，并且编写为 Node.js 兼容的 JavaScript。通常使用 npm 进行管理 loader，但是也可以将应用程序中的文件作为自定义 loader。按照约定，loader 通常被命名为 `xxx-loader`（例如 `json-loader`）。更多详细信息，请查看 编写一个 loader。
