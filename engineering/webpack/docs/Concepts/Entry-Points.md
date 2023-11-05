# Entry Points

## Single Entry (Shorthand) Syntax 单个入口（简写）语法

Usage: `entry: string | [string]`

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
}
```

The single entry syntax for the `entry` property is a shorthand for:

```js
module.exports = {
  entry: {
    main: './path/to/my/entry/file.js',
  },
}
```

We can also pass an array of file paths to the `entry` property which creates what is known as a **"multi-main entry"**. This is useful when you would like to inject multiple dependent files together and graph their dependencies into one "chunk".
我们也可以将一个文件路径数组传递给 entry 属性，这将创建一个所谓的 "multi-main entry"。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个 "chunk" 中时，这种方式就很有用。

Single Entry Syntax is a great choice when you are looking to quickly set up a webpack configuration for an application or tool with **one entry point** (i.e. a library). However, there is not much flexibility in extending or scaling your configuration with this syntax.
当你希望通过一个入口（例如一个库）为应用程序或工具快速设置 webpack 配置时，单一入口的语法方式是不错的选择。然而，使用这种语法方式来扩展或调整配置的灵活性不大。

## Object Syntax

Usage: `entry: { <entryChunkName> string | [string] } | {}`

```js
module.exports = {
  entry: {
    app: './src/app.js',
    adminApp: './src/adminApp.js',
  },
}
```

The object syntax is more verbose. However, this is the most scalable way of defining `entry`/`entries` in your application.

> **"Scalable webpack configurations"** are ones that can be reused and combined with other partial configurations. This is a popular technique used to separate concerns by environment, build target, and runtime. They are then merged using specialized tools like [webpack-merge](https://github.com/survivejs/webpack-merge).

### EntryDescription object

An object of entry point description. You can specify the following properties.

- `dependOn`: The entry points that the current entry point depends on. They must be loaded before this entry point is loaded. 当前入口所依赖的入口。它们必须在该入口被加载前被加载。
- `filename`: Specifies the name of each output file on disk. 指定要输出的文件名称。
- `import`: Module(s) that are loaded upon startup. 启动时需加载的模块。
- `library`: Specify [library options](https://webpack.js.org/configuration/output/#outputlibrary) to bundle a library from current entry.指定 library 选项，为当前 entry 构建一个 library。
- `runtime`: The name of the runtime chunk. When set, a new runtime chunk will be created. It can be set to `false` to avoid a new runtime chunk since webpack 5.43.0. 运行时 `chunk` 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 `false` 以避免一个新的运行时 chunk。
- `publicPath`: Specify a public URL address for the output files of this entry when they are referenced in a browser. Also, see [output.publicPath](https://webpack.js.org/configuration/output/#outputpublicpath). 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。请查看 output.publicPath。

#### tips

- `runtime` and `dependOn` **should not be used together** on a single entry, so the following config is invalid and would throw an error:

```js
module.exports = {
  entry: {
    a2: './a',
    b2: {
      runtime: 'x2',
      dependOn: 'a2',
      import: './b',
    },
  },
}
```

- Make sure `runtime` must not point to an existing entry point name, for example the below config would throw an error:

```js
module.exports = {
  entry: {
    a1: './a',
    b1: {
      runtime: 'a1',
      import: './b',
    },
  },
}
```

- Also `dependOn` **must not be circular**, the following example again would throw an error:

```js
module.exports = {
  entry: {
    a3: {
      import: './a',
      dependOn: 'b3',
    },
    b3: {
      import: './b',
      dependOn: 'a3',
    },
  },
}
```

## Scenarios

Below is a list of entry configurations and their real-world use cases:

### Separate App and Vendor Entries 分离 app(应用程序) 和 vendor(第三方库) 入口

```js
module.exports = {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js',
  },
}
```

```js
// webpack.prod.js
module.exports = {
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
}
// webpack.dev.js

module.exports = {
  output: {
    filename: '[name].bundle.js',
  },
}
```

**What does this do**? We are telling webpack that we would like 2 separate entry points (like the above example).
这是什么？ 这是告诉 webpack 我们想要配置 2 个单独的入口点（例如上面的示例）。

**Why?** With this, you can import required libraries or files that aren't modified (e.g. Bootstrap, jQuery, images, etc) inside `vendor.js` and they will be bundled together into their own chunk. Content hash remains the same, **which allows the browser to cache them separately thereby reducing load time**.
为什么？ 这样你就可以在 vendor.js 中存入未做修改的必要 library 或文件（例如 Bootstrap, jQuery, 图片等），然后将它们打包在一起成为单独的 chunk。内容哈希保持不变，这使浏览器可以独立地缓存它们，从而减少了加载时间。

### Multi-Page Application

> // TODO taste it

```js
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
}
```

**What does this do?** We are telling webpack that we would like **3 separate dependency graphs** (like the above example).
这是什么？ 我们告诉 webpack 需要三个独立分离的依赖图（如上面的示例）。

**Why?** In a multi-page application, the server is going to fetch a new HTML document for you. The page reloads this new document and assets are redownloaded. However, this gives us the unique opportunity to do things like using [optimization.splitChunks](https://webpack.js.org/configuration/optimization/#optimizationsplitchunks) to create bundles of shared application code between each page. Multi-page applications that reuse a lot of code/modules between entry points can greatly benefit from these techniques, as the number of entry points increases.
为什么？ 在**多页面应用程序**中，server 会拉取一个新的 HTML 文档给你的客户端。页面重新加载此新文档，并且资源被重新下载。然而，这给了我们特殊的机会去做很多事，例如使用 `optimization.splitChunks` 为页面间共享的应用程序代码创建 bundle。由于入口起点数量的增多，多页应用能够复用多个入口起点之间的大量代码/模块，从而可以极大地从这些技术中受益。

> As a rule of thumb: **Use exactly one entry point for each HTML document**. See the [issue](https://bundlers.tooling.report/code-splitting/multi-entry/#webpack) described here for more details.
> 根据经验：每个 HTML 文档只使用一个入口起点。具体原因请参阅此 issue。
