# Entry and Context 入口和上下文

The entry object is where webpack looks to start building the bundle. The context is an absolute string to the directory that contains the entry files.
入口对象是用于 webpack 查找开始构建 bundle 的地方。上下文是入口文件所处的目录的绝对路径的字符串。

## context

`string`

The base directory, an **absolute path**, for resolving **entry points** and **loaders** from the configuration. 基础目录，**绝对路径**，用于从配置中解析入口点(entry point)和 加载器(loader)。

```js
const path = require('path')

module.exports = {
  //...
  context: path.resolve(__dirname, 'app'),
}
```

By default, the current working directory of Node.js is used, but it's recommended to pass a value in your configuration. This makes your configuration independent from CWD (current working directory).
默认使用 Node.js 进程的当前工作目录，但是推荐在配置中传入一个值。这使得你的配置独立于 CWD(current working directory, 当前工作目录)。

---

## entry

`string` `[string]` `object = { <key> string | [string] | object = { import string | [string], dependOn string | [string], filename string, layer string }}` `(function() => string | [string] | object = { <key> string | [string] } | object = { import string | [string], dependOn string | [string], filename string })`

The point or points where to start the application bundling process. If an array is passed then all items will be processed.
开始应用程序打包过程的一个或多个起点。如果传入数组，则会处理所有条目。

A dynamically loaded module is **not** an entry point.
动态加载的模块 不是 入口起点。

A rule to consider: one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.
一个需要考虑的规则：每个 HTML 页面都有一个入口起点。单页应用(SPA)：一个入口起点，多页应用(MPA)：多个入口起点。

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js',
  },
}
```

### Naming

If a string or array of strings is passed, the chunk is named `main`. If an object is passed, each key is the name of a chunk, and the value describes the entry point for the chunk.
如果传入一个字符串或字符串数组，chunk 会被命名为 main。如果传入一个对象，则每个属性的键(key)会是 chunk 的名称，该属性的值描述了 chunk 的入口点。

### Entry descriptor

If an object is passed the value might be a string, array of strings, or a descriptor(描述符):

```js
module.exports = {
  //...
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    catalog: {
      import: './catalog.js',
      filename: 'pages/catalog.js',
      dependOn: 'shared',
      chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    },
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      asyncChunks: true, // Create async chunks that are loaded on demand.
      layer: 'name of layer', // set the layer for an entry point
    },
  },
}
```

Descriptor syntax might be used to pass additional options to an entry point.

### Output filename

By default, the output filename for the entry chunk is extracted from [`output.filename`](/configuration/output/#outputfilename) but you can specify a custom output filename for a specific entry 可以为特定的入口指定一个自定义的输出文件名:

```js
module.exports = {
  //...
  entry: {
    app: './app.js',
    home: { import: './contact.js', filename: 'pages/[name].js' },
    about: { import: './about.js', filename: 'pages/[name].js' },
  },
}
```

Descriptor syntax was used here to pass `filename`-option to the specific entry points.

### Dependencies

By default, every entry chunk stores all the modules that it uses. With `dependOn` option you can share the modules from one entry chunk to another:
默认情况下，每个入口 chunk 保存了全部其用的模块(modules)。使用 `dependOn` 选项你可以与另一个入口 chunk **共享模块**:

```js
module.exports = {
  //...
  entry: {
    app: { import: './app.js', dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
}
```

The `app` chunk will not contain the modules that `react-vendors` have.

`dependOn` option can also accept an array of strings:
`dependOn` 选项的也可以为字符串数组：

```js
module.exports = {
  //...
  entry: {
    moment: { import: 'moment-mini', runtime: 'runtime' },
    reactvendors: { import: ['react', 'react-dom'], runtime: 'runtime' },
    testapp: {
      import: './wwwroot/component/TestApp.tsx',
      dependOn: ['reactvendors', 'moment'],
    },
  },
}
```

Also, you can specify multiple files per entry using an array:
此外，你还可以使用数组为每个入口指定多个文件：

```js
module.exports = {
  //...
  entry: {
    app: { import: ['./app.js', './app2.js'], dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types'],
  },
}
```

### Dynamic entry

If a function is passed then it will be invoked on every [make](/api/compiler-hooks/#make) event.
如果传入一个函数，那么它将会在每次 `make` 事件中被调用。

> Note that the `make` event triggers when webpack starts and for every invalidation when [watching for file changes](/configuration/watch/).
> 要注意的是，`make` 事件在 webpack 启动和每当 监听文件变化 时都会触发。

```js
module.exports = {
  //...
  entry: () => './demo',
}
```

or

```js
module.exports = {
  //...
  entry: () => new Promise((resolve) => resolve(['./demo', './demo2'])),
}
```

For example: you can use dynamic entries to get the actual entries from an external source (remote server, file system content or database):
例如，你可以使用动态入口来从外部来源（远程服务器，文件系统内容或者数据库）获取真正的入口：

**webpack.config.js**

```js
module.exports = {
  entry() {
    return fetchPathsFromSomeExternalSource() // returns a promise that will be resolved with something like ['src/main-layout.js', 'src/admin-layout.js']
  },
}
```

When combining with the [`output.library`](/configuration/output/#outputlibrary) option: If an array is passed only the last item is exported.
当和 `output.library` 选项结合：如果传入的是一个数组，只有数组的最后一个条目会被导出。