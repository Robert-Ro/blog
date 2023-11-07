# Output

The top-level `output` key contains a set of options instructing webpack on how and where it should output your bundles, assets, and anything else you bundle or load with webpack.
`output` 位于对象最顶级键(key)，包括了一组选项，**指示 webpack 如何去输出、以及在哪里输出你的「bundle、asset 和其他你所打包或使用 webpack 载入的任何内容」**。

## output.assetModuleFilename✨

> 应用打包后的资源文件命名

`string = '[hash][ext][query]'`

The same as [`output.filename`](#outputfilename) but for [Asset Modules](/guides/asset-modules/).

`[name]`, `[file]`, `[query]`, `[fragment]`, `[base]`, and `[path]` are set to an empty string for the assets built from data URI replacements.

## output.asyncChunks✨

`boolean = true`

Create async chunks that are loaded on demand.
创建按需加载的异步`chunk`

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    asyncChunks: true,
  },
}
```

## output.auxiliaryComment

> 一个英文术语，它在计算机编程中常用于描述代码中的辅助注释

> 最好使用 Prefer to use [`output.library.auxiliaryComment`](#outputlibraryauxiliarycomment) instead.

`string` `object`

When used in tandem with [`output.library`](#outputlibrary) and [`output.libraryTarget`](#outputlibrarytarget), this option allows users to insert comments within the export wrapper. To insert the same comment for each `libraryTarget` type, set `auxiliaryComment` to a string:
在和 `output.library` 和 `output.libraryTarget` 一起使用时，此选项允许用户向导出容器(export wrapper)中插入注释。要为 `libraryTarget` 每种类型都插入相同的注释，将 `auxiliaryComment` 设置为一个字符串：

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    library: 'someLibName',
    libraryTarget: 'umd',
    filename: 'someLibName.js',
    auxiliaryComment: 'Test Comment',
  },
}
```

which will yield the following:

**someLibName.js**

```javascript
;(function webpackUniversalModuleDefinition(root, factory) {
  // Test Comment <-
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory(require('lodash'))
  // Test Comment <-
  else if (typeof define === 'function' && define.amd) define(['lodash'], factory)
  // Test Comment <-
  else if (typeof exports === 'object') exports['someLibName'] = factory(require('lodash'))
  // Test Comment <-
  else root['someLibName'] = factory(root['_'])
})(this, function (__WEBPACK_EXTERNAL_MODULE_1__) {
  // ...
})
```

For fine-grained control over each `libraryTarget` comment, pass an object:
对于 `libraryTarget` 每种类型的注释进行更细粒度地控制，请传入一个对象：

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    auxiliaryComment: {
      root: 'Root Comment',
      commonjs: 'CommonJS Comment',
      commonjs2: 'CommonJS2 Comment',
      amd: 'AMD Comment',
    },
  },
}
```

## output.charset

`boolean = true`

Tells webpack to add `charset="utf-8"` to the HTML `<script>` tag.

> Although the `charset` attribute for `<script>` tag was [deprecated](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#Deprecated_attributes), webpack still adds it by default for compatibility with non-modern browsers.

## output.chunkFilename✨✨✨

`string = '[id].js'` `function (pathData, assetInfo) => string`

This option determines the name of non-initial chunk files. See [`output.filename`](#outputfilename) option for details on the possible values.
此选项决定了**非初始（non-initial）chunk** 文件的名称。有关可取的值的详细信息，请查看 `output.filename` 选项。

Note that these filenames need to be generated at runtime to send the requests for chunks. Because of this, placeholders like `[name]` and `[chunkhash]` need to add a mapping from chunk id to placeholder value to the output bundle with the webpack runtime. This increases the size and may invalidate the bundle when placeholder value for any chunk changes.
注意，**这些文件名需要在运行时根据 chunk 发送的请求去生成**。因此，需要在 webpack runtime 输出 bundle 值时，将 chunk id 的值对应映射到占位符(如 `[name]` 和 `[chunkhash]`)。这会增加文件大小，并且在任何 chunk 的占位符值修改后，都会使 bundle 失效。

By default `[id].js` is used or a value inferred from [`output.filename`](#outputfilename) (`[name]` is replaced with `[id]` or `[id].` is prepended).
默认使用 `[id].js` 或从 `output.filename` 中推断出的值（[name] 会被预先替换为 [id] 或 [id].）。

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkFilename: '[id].js',
  },
}
```

Usage as a function:

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    chunkFilename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
    },
  },
}
```

## output.chunkFormat

> 默认不需要配置

`false` `string: 'array-push' | 'commonjs' | 'module' | <any string>`

The format of chunks (formats included by default are `'array-push'` (web/WebWorker), `'commonjs'` (node.js), `'module'` (ESM), but others might be added by plugins).
chunk 的格式（formats 默认包含 `'array-push'` (web/WebWorker)、`'commonjs'` (node.js)、`'module'` (ESM)，还有其他情况可由插件添加）。

> The default value of this option depends on the [`target`](/configuration/target/) and [`output.module`](#outputmodule) setting. For more details, search for `"chunkFormat"` [in the webpack defaults](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js). 默认值基于`target`而定

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkFormat: 'commonjs',
  },
}
```

## output.chunkLoadTimeout

`number = 120000`

The Number of milliseconds before chunk request expires. This option is supported since webpack 2.6.0.
chunk 请求到期之前的毫秒数，默认为 120000(2 分钟)

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkLoadTimeout: 30000,
  },
}
```

## output.chunkLoadingGlobal

`string = 'webpackChunkwebpack'`

The global variable is used by webpack for loading chunks.
webpack 用于加载 `chunk` 的全局变量

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkLoadingGlobal: 'myCustomFunc',
  },
}
```

## output.chunkLoading

`false` `string: 'jsonp' | 'import-scripts' | 'require' | 'async-node' | 'import' | <any string>`

The method to load chunks (methods included by default are `'jsonp'` (web), `'import'` (ESM), `'importScripts'` (WebWorker), `'require'` (sync node.js), `'async-node'` (async node.js), but others might be added by plugins).
加载 chunk 的方法(默认值有 'jsonp' (web)、'import' (ESM)、'importScripts' (WebWorker)、'require' (sync node.js)、'async-node' (async node.js)，还有其他值可由插件添加)。

> The default value of this option depends on the [`target`](/configuration/target/) and [`chunkFormat `](#outputchunkformat) setting. For more details, search for `"chunkLoading"` [in the webpack defaults](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js). 默认值基于`target`和`chunkFormat`

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    chunkLoading: 'async-node',
  },
}
```

## output.clean✨

> 在生成文件之前清空 output 目录 V5.20.0+

`boolean` `{ dry?: boolean, keep?: RegExp | string | ((filename: string) => boolean) }`

```javascript
module.exports = {
  //...
  output: {
    clean: true, // Clean the output directory before emit. 在生成文件之前清空 output 目录
  },
}
```

```javascript
module.exports = {
  //...
  output: {
    clean: {
      dry: true, // Log the assets that should be removed instead of deleting them. 打印而不是删除应该移除的静态资源
    },
  },
}
```

```javascript
module.exports = {
  //...
  output: {
    clean: {
      keep: /ignored\/dir\//, // Keep these assets under 'ignored/dir'. 保留 'ignored/dir' 下的静态资源
    },
  },
}

// or

module.exports = {
  //...
  output: {
    clean: {
      keep(asset) {
        return asset.includes('ignored/dir')
      },
    },
  },
}
```

You can also use it with hook(你也可以使用钩子函数):

```javascript
webpack.CleanPlugin.getCompilationHooks(compilation).keep.tap('Test', (asset) => {
  if (/ignored\/dir\//.test(asset)) return true
})
```

## output.compareBeforeEmit

`boolean = true`

Tells webpack to check if to be emitted file already exists and has the same content before writing to the output file system.
告知 webpack 在写入到输出文件系统时检查输出的文件是否已经存在并且拥有相同内容。

> webpack will not write output file when file already exists on disk with the same content.
> 当在磁盘中已经存在有相同内容的文件时，webpack 将不会写入输出文件。

```javascript
module.exports = {
  //...
  output: {
    compareBeforeEmit: false,
  },
}
```

## output.crossOriginLoading

`boolean = false` `string: 'anonymous' | 'use-credentials'`

Tells webpack to enable [cross-origin](https://developer.mozilla.org/en/docs/Web/HTML/Element/script#attr-crossorigin) loading of chunks. Only takes effect when the [`target`](/configuration/target/) is set to `'web'`, which uses JSONP for loading on-demand chunks, by adding script tags.
告诉 webpack 启用 `cross-origin` 属性 加载 chunk。仅在 `target` 设置为 `'web'` 时生效，通过使用 JSONP 来添加脚本标签，实现按需加载模块。

- `'anonymous'` - Enable cross-origin loading **without credentials** 不带凭据(credential) 启用跨域加载
- `'use-credentials'` - Enable cross-origin loading **with credentials** 携带凭据(credential) 启用跨域加载

## output.devtoolFallbackModuleFilenameTemplate

`string` `function (info)`

A fallback is used when the template string or function above yields duplicates.
当上面的模板字符串或函数产生重复时使用的备用内容。

See [`output.devtoolModuleFilenameTemplate`](#outputdevtoolmodulefilenametemplate).

## output.devtoolModuleFilenameTemplate

`string = 'webpack://[namespace]/[resource-path]?[loaders]'` `function (info) => string`

This option is only used when [`devtool`](/configuration/devtool) uses an option that requires module names.
此选项仅在 「`devtool` 使用了需要模块名称的选项」时使用。

Customize the names used in each source map's `sources` array. This can be done by passing a template string or function. For example, when using `devtool: 'eval'`.
自定义每个 source map 的 `sources` 数组中使用的名称。可以通过传递模板字符串(template string)或者函数来完成。例如，当使用 `devtool: 'eval'`，默认值是：

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]',
  },
}
```

The following substitutions are available in template strings (via webpack's internal [`ModuleFilenameHelpers`](https://github.com/webpack/webpack/blob/main/lib/ModuleFilenameHelpers.js)):
模板字符串(template string)中做以下替换（通过 webpack 内部的 `ModuleFilenameHelpers`）：

| Template                 | Description                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [absolute-resource-path] | The absolute filename 绝对路径文件名                                                                                                                                           |
| [all-loaders]            | Automatic and explicit loaders and params up to the name of the first loader 自动和显式的 loader，并且参数取决于第一个 loader 名称                                             |
| [hash]                   | The hash of the module identifier 模块标识符的 hash                                                                                                                            |
| [id]                     | The module identifier 模块标识符                                                                                                                                               |
| [loaders]                | Explicit loaders and params up to the name of the first loader 显式的 loader，并且参数取决于第一个 loader 名称                                                                 |
| [resource]               | The path used to resolve the file and any query params used on the first loader 用于解析文件的路径和用于第一个 loader 的任意查询参数                                           |
| [resource-path]          | The path used to resolve the file without any query params 不带任何查询参数，用于解析文件的路径                                                                                |
| [namespace]              | The modules namespace. This is usually the library name when building as a library, empty otherwise 模块命名空间。在构建成为一个 library 之后，通常也是 library 名称，否则为空 |

When using a function, the same options are available camel-cased via the `info` parameter:
当使用一个函数，同样的选项要通过 info 参数并使用驼峰式(camel-cased)：

```javascript
module.exports = {
  //...
  output: {
    devtoolModuleFilenameTemplate: (info) => {
      return `webpack:///${info.resourcePath}?${info.loaders}`
    },
  },
}
```

If multiple modules would result in the same name, [`output.devtoolFallbackModuleFilenameTemplate`](#outputdevtoolfallbackmodulefilenametemplate) is used instead for these modules.
如果多个模块产生相同的名称，使用 `output.devtoolFallbackModuleFilenameTemplate` 来代替这些模块。

## output.devtoolNamespace

`string`

This option determines the module's namespace used with the [`output.devtoolModuleFilenameTemplate`](#outputdevtoolmodulefilenametemplate). When not specified, it will default to the value of: [`output.uniqueName`](#outputuniquename). It's used to prevent source file path collisions in sourcemaps when loading multiple libraries built with webpack.
此选项确定 `output.devtoolModuleFilenameTemplate` 使用的模块名称空间。未指定时的默认值为：`output.uniqueName`。在加载多个通过 webpack 构建的 library 时，用于防止 source map 中源文件路径冲突。

For example, if you have 2 libraries, with namespaces `library1` and `library2`, which both have a file `./src/index.js` (with potentially different contents), they will expose these files as `webpack://library1/./src/index.js` and `webpack://library2/./src/index.js`.

## output.enabledChunkLoadingTypes

`[string: 'jsonp' | 'import-scripts' | 'require' | 'async-node' | <any string>]`

List of chunk loading types enabled for use by entry points. Will be automatically filled by webpack. Only needed when using a function as entry option and returning chunkLoading option from there.
允许入口点使用的 chunk 加载类型列表。将被 webpack 自动填充。只有当使用一个函数作为入口配置项并从那里返回 chunkLoading 配置项时才需要。

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    enabledChunkLoadingTypes: ['jsonp', 'require'],
  },
}
```

## output.enabledLibraryTypes

`[string]`

List of library types enabled for use by entry points.

```javascript
module.exports = {
  //...
  output: {
    enabledLibraryTypes: ['module'],
  },
}
```

## output.enabledWasmLoadingTypes

`[string]`

List of wasm loading types enabled for use by entry points.
用于设置入口支持的 wasm 加载类型的列表。

```javascript
module.exports = {
  //...
  output: {
    enabledWasmLoadingTypes: ['fetch'],
  },
}
```

## output.environment

Tell webpack what kind of ES-features may be used in the generated runtime-code.
告诉 webpack 在生成的运行时代码中可以使用哪个版本的 ES 特性。

```javascript
module.exports = {
  output: {
    environment: {
      // The environment supports arrow functions ('() => { ... }').
      arrowFunction: true,
      // The environment supports BigInt as literal (123n).
      bigIntLiteral: false,
      // The environment supports const and let for variable declarations.
      const: true,
      // The environment supports destructuring ('{ a, b } = obj').
      destructuring: true,
      // The environment supports an async import() function to import EcmaScript modules.
      dynamicImport: false,
      // The environment supports an async import() when creating a worker, only for web targets at the moment.
      dynamicImportInWorker: false,
      // The environment supports 'for of' iteration ('for (const x of array) { ... }').
      forOf: true,
      // The environment supports 'globalThis'.
      globalThis: true,
      // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
      module: false,
      // The environment supports optional chaining ('obj?.a' or 'obj?.()').
      optionalChaining: true,
      // The environment supports template literals.
      templateLiteral: true,
    },
  },
}
```

## output.filename✨✨✨

`string` `function (pathData, assetInfo) => string`

This option determines the name of each output bundle. The bundle is written to the directory specified by the [`output.path`](#outputpath) option.
此选项决定了每个输出 bundle 的名称。这些 bundle 将写入到 `output.path` 选项指定的目录下。

For a single [`entry`](/configuration/entry-context/#entry) point, this can be a static name.
对于单个`入口`起点，filename 会是一个静态名称。

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: 'bundle.js',
  },
}
```

However, when creating multiple bundles via more than one entry point, code splitting, or various plugins, you should use one of the following substitutions to give each bundle a unique name...
然而，当通过多个入口起点(entry point)、代码拆分(code splitting)或各种插件(plugin)创建多个 bundle，应该使用以下一种替换方式，来赋予每个 bundle 一个唯一的名称……

Using entry name:

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].bundle.js',
  },
}
```

Using internal chunk id:
使用内部 chunk id
**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: '[id].bundle.js',
  },
}
```

Using hashes generated from the generated content:
使用由生成的内容产生的 hash：
**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: '[contenthash].bundle.js',
  },
}
```

Combining multiple substitutions:
结合多个替换组合使用
**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: '[name].[contenthash].bundle.js',
  },
}
```

Using the function to return the filename:

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    filename: (pathData) => {
      return pathData.chunk.name === 'main' ? '[name].js' : '[name]/[name].js'
    },
  },
}
```

Make sure to read the [Caching guide](/guides/caching) for details. There are more steps involved than only setting this option.
请确保已阅读过 指南 - 缓存 的详细信息。这里涉及更多步骤，不仅仅是设置此选项。

Note this option is called filename but you are still allowed to use something like `'js/[name]/bundle.js'` to create a folder structure.
注意此选项被称为文件名，但是你还是可以使用像 `'js/[name]/bundle.js'` 这样的文件夹结构。

Note this option does not affect output files for on-demand-loaded chunks. It only affects output files that are initially loaded. For on-demand-loaded chunk files, the [`output.chunkFilename`](#outputchunkfilename) option is used. Files created by loaders also aren't affected. In this case, you would have to try the specific loader's available options.
注意，此选项不会影响那些「按需加载 chunk」的输出文件。它**只影响最初加载的输出文件**。对于按需加载的 chunk 文件，请使用 output.chunkFilename 选项来控制输出。通过 loader 创建的文件也不受影响。在这种情况下，你必须尝试 loader 特定的可用选项。

### Template strings

The following substitutions are available in template strings (via webpack's internal [`TemplatedPathPlugin`](https://github.com/webpack/webpack/blob/main/lib/TemplatedPathPlugin.js)):

Substitutions available on Compilation-level:

| Template   | Description                                             |
| ---------- | ------------------------------------------------------- |
| [fullhash] | The full hash of compilation compilation 完整的 hash 值 |
| [hash]     | Same, but deprecated 同上，但已弃用                     |

Substitutions available on Chunk-level:

| Template      | Description                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [id]          | The ID of the chunk 此 chunk 的 ID                                                                                                                                                                     |
| [name]        | The name of the chunk, if set, otherwise the ID of the chunk 如果设置，则为此 chunk 的名称，否则使用 chunk 的 ID                                                                                       |
| [chunkhash]   | The hash of the chunk, including all elements of the chunk 此 chunk 的 hash 值，包含该 chunk 的所有元素                                                                                                |
| [contenthash] | The hash of the chunk, including only elements of this content type (affected by `optimization.realContentHash`) 此 chunk 的 hash 值，只包括该内容类型的元素（受 `optimization.realContentHash` 影响） |

Substitutions available on Module-level:

| Template      | Description                                              |
| ------------- | -------------------------------------------------------- |
| [id]          | The ID of the module 模块的 ID                           |
| [moduleid]    | Same, but deprecated 同上，但已弃用                      |
| [hash]        | The hash of the module 模块的 Hash 值                    |
| [modulehash]  | Same, but deprecated 同上，但已弃用                      |
| [contenthash] | The hash of the content of the module 模块内容的 Hash 值 |

Substitutions available on File-level:

| Template   | Description                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| [file]     | Filename and path, without query or fragment filename 和路径，不含 query 或 fragment                                             |
| [query]    | Query with leading `?` 带前缀 `?` 的 query                                                                                       |
| [fragment] | Fragment with leading `#` 带前缀 `#` 的 fragment                                                                                 |
| [base]     | Only filename (including extensions), without path 只有 filename（包含扩展名），不含 path                                        |
| [filebase] | Same, but deprecated 同上，但已弃用                                                                                              |
| [path]     | Only path, without filename 只有 path，不含 filename                                                                             |
| [name]     | Only filename without extension or path 只有 filename，不含扩展名或 path                                                         |
| [ext]      | Extension with leading `.` (not available for [output.filename](#outputfilename)) 带前缀 . 的扩展名（对 output.filename 不可用） |

Substitutions available on URL-level:

| Template | Description |
| -------- | ----------- |
| [url]    | URL         |

> `[file]` equals `[path][base]`. `[base]` equals `[name][ext]`. The full path is `[path][name][ext][query][fragment]` or `[path][base][query][fragment]` or `[file][query][fragment]`.

The length of hashes (`[hash]`, `[contenthash]` or `[chunkhash]`) can be specified using `[hash:16]` (defaults to 20). Alternatively, specify [`output.hashDigestLength`](#outputhashdigestlength) to configure the length globally.
[hash]，[contenthash] 或者 [chunkhash] 的长度可以使用 [hash:16]（默认为 20）来指定。或者，通过指定`output.hashDigestLength` 在全局配置长度。

It is possible to filter out placeholder replacement when you want to use one of the placeholders in the actual file name. For example, to output a file `[name].js`, you have to escape the `[name]` placeholder by adding backslashes between the brackets. So that `[\name\]` generates `[name]` instead of getting replaced with the `name` of the asset.
当你要在实际文件名中使用占位符时，webpack 会过滤出需要替换的占位符。例如，输出一个文件 `[name].js`， 你必须通过在括号之间添加反斜杠来转义`[name]`占位符。 因此，`[\name\]` 生成 `[name]` 而不是 `name`。

Example: `[\id\]` generates `[id]` instead of getting replaced with the `id`.
例如：[\id\] 生成 [id] 而不是 id。

If using a function for this option, the function will be passed an object containing data for the substitutions in the table above.
Substitutions will be applied to the returned string too.
The passed object will have this type: (properties available depending on context)
如果将这个选项设为一个函数，函数将返回一个包含上面表格中含有替换信息数据的对象。 替换也会被应用到返回的字符串中。 传递的对象将具有如下类型（取决于上下文的属性）：

```typescript
type PathData = {
  hash: string
  hashWithLength: (number) => string
  chunk: Chunk | ChunkPathData
  module: Module | ModulePathData
  contentHashType: string
  contentHash: string
  contentHashWithLength: (number) => string
  filename: string
  url: string
  runtime: string | SortableSet<string>
  chunkGraph: ChunkGraph
}
type ChunkPathData = {
  id: string | number
  name: string
  hash: string
  hashWithLength: (number) => string
  contentHash: Record<string, string>
  contentHashWithLength: Record<string, (number) => string>
}
type ModulePathData = {
  id: string | number
  hash: string
  hashWithLength: (number) => string
}
```

> In some contexts properties will use JavaScript code expressions instead of raw values. In these cases, the `WithLength` variant is available and should be used instead of slicing the original value.
> 在某些上下文中，属性将使用 JavaScript 代码表达式代替原始值。在此情况下，WithLength 变量是可用的，应该使用它来代替对原始值的分片操作。

## output.globalObject

`string = 'self'`

When targeting a library, especially when `libraryTarget` is `'umd'`, this option indicates what global object will be used to mount the library. To make UMD build available on both browsers and Node.js, set `output.globalObject` option to `'this'`. Defaults to `self` for Web-like targets.
当输出为 library 时，尤其是当 `libraryTarget` 为 `'umd'`时，此选项将决定使用哪个全局对象来挂载 library。为了使 UMD 构建在浏览器和 Node.js 上均可用，应将 `output.globalObject` 选项设置为 `'this'`。对于类似 web 的目标，默认为 `self`。

The return value of your entry point will be assigned to the global object using the value of `output.library.name`. Depending on the value of the `target` option, the global object could change respectively, e.g., `self`, `global`, or `globalThis`.
入口点的返回值将会使用 `output.library.name` 赋值给全局对象。依赖于 `target` 配置项，全局对象将会发生对应的改变，例如：`self`, `global` 或者 `globalThis`。

For example:

**webpack.config.js**

```javascript
module.exports = {
  // ...
  output: {
    library: 'myLib',
    libraryTarget: 'umd',
    filename: 'myLib.js',
    globalObject: 'this',
  },
}
```

## output.hashDigest

`string = 'hex'`

The encoding to use when generating the hash. All encodings from Node.JS' [`hash.digest`](https://nodejs.org/api/buffer.html#buffers-and-character-encodings) are supported. Using `'base64'` for filenames might be problematic since it has the character `/` in its alphabet. Likewise `'latin1'` could contain any character.
在生成 hash 时使用的编码方式。支持 Node.js hash.digest 的所有编码。对文件名使用 'base64'，可能会出现问题，因为 base64 字母表中具有 `/` 这个字符(character)。同样的，`'latin1'` 规定可以含有任何字符(character)。

## output.hashDigestLength

`number = 20`

The prefix length of the hash digest to use.
散列摘要的前缀长度。

> For `webpack v5.65.0+`, `16` will be used as the default value for the `hashDigestLength` option when [`experiments.futureDefaults`](/configuration/experiments/#experimentsfuturedefaults) is enabled.

## output.hashFunction

`string = 'md4'` `function`

The hashing algorithm to use. All functions from Node.JS' [`crypto.createHash`](https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm_options) are supported. Since `4.0.0-alpha2`, the `hashFunction` can now be a constructor to a custom hash function. You can provide a non-crypto hash function for performance reasons.
散列算法。支持 Node.JS `crypto.createHash` 的所有功能。从 4.0.0-alpha2 开始，hashFunction 现在可以是一个返回自定义 hash 的构造函数。出于性能原因，你可以提供一个不加密的哈希函数(non-crypto hash function)。

```javascript
module.exports = {
  //...
  output: {
    hashFunction: require('metrohash').MetroHash64,
  },
}
```

Make sure that the hashing function will have an `update` and `digest` methods available.
确保 hash 函数有可访问的 `update` 和 `digest` 方法。

> Since `webpack v5.54.0+`, `hashFunction` supports `xxhash64` as a faster algorithm, which will be used as default when [`experiments.futureDefaults`](/configuration/experiments/#experimentsfuturedefaults) is enabled.

## output.hashSalt

An optional salt to update the hash via Node.JS' [`hash.update`](https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding).
一个可选的加盐值，通过 Node.JS `hash.update` 来更新哈希。

## output.hotUpdateChunkFilename

`string = '[id].[fullhash].hot-update.js'`

Customize the filenames of hot update chunks. See [`output.filename`](#outputfilename) option for details on the possible values.
自定义热更新 chunk 的文件名。可选的值的详细信息，请查看 `output.filename` 选项。

The only placeholders allowed here are `[id]` and `[fullhash]`, the default being:
其中值唯一的占位符是 [id] 和 [fullhash]，其默认为

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    hotUpdateChunkFilename: '[id].[fullhash].hot-update.js',
  },
}
```

> Typically you don't need to change `output.hotUpdateChunkFilename`.

## output.hotUpdateGlobal

`string`

Only used when [`target`](/configuration/target/) is set to `'web'`, which uses JSONP for loading hot updates.
只在 target 设置为 'web' 时使用，用于加载热更新(hot update)的 JSONP 函数。

A JSONP function is used to asynchronously load hot-update chunks.
JSONP 函数用于异步加载(async load)热更新(hot-update) chunk。

For details see [`output.chunkLoadingGlobal`](#outputchunkloadingglobal).

## output.hotUpdateMainFilename

`string = '[runtime].[fullhash].hot-update.json'` `function`

Customize the main hot update filename. `[fullhash]` and `[runtime]` are available as placeholder.
自定义热更新的主文件名(main filename)。[fullhash] 和 [runtime] 均可作为占位符。

> Typically you don't need to change `output.hotUpdateMainFilename`.

## output.iife

`boolean = true`

Tells webpack to add [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) wrapper around emitted code.
告诉 webpack 添加 IIFE 外层包裹生成的代码.

```javascript
module.exports = {
  //...
  output: {
    iife: true,
  },
}
```

## output.ignoreBrowserWarnings

`boolean = false`

Hide warnings from the browser console in production. This option does not affect the terminal/console output.
生产模式下忽略浏览器控制台警告 V5.81.0+

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    ignoreBrowserWarnings: true,
  },
}
```

## output.importFunctionName

`string = 'import'`

The name of the native `import()` function. Can be used for polyfilling, e.g. with [`dynamic-import-polyfill`](https://github.com/GoogleChromeLabs/dynamic-import-polyfill).
内部 import() 函数的名称. 可用于 polyfilling, 例如 通过 dynamic-import-polyfill.

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    importFunctionName: '__import__',
  },
}
```

## output.library✨✨✨

Output a library exposing the exports of your entry point.
输出一个库，为你的入口做导出。

- Type: `string | string[] | object`

Let's take a look at an example.

**webpack.config.js**

```js
module.exports = {
  // …
  entry: './src/index.js',
  output: {
    library: 'MyLibrary',
  },
}
```

Say you have exported a function in your `src/index.js` entry:

```js
export function hello(name) {
  console.log(`hello ${name}`)
}
```

Now the variable `MyLibrary` will be bound with the exports of your entry file, and here's how to consume the webpack bundled library:

```html
<script src="https://example.org/path/to/my-library.js"></script>
<script>
  MyLibrary.hello('webpack')
</script>
```

In the above example, we're passing a single entry file to `entry`, however, webpack can accept [many kinds of entry point](/configuration/entry-context/#entry), e.g., an `array`, or an `object`.
在上面的例子中，我们为 `entry` 设置了一个入口文件，然而 webpack 可以接受 多个入口，例如一个 `array` 或者一个 `object`。

1. If you provide an `array` as the `entry` point, only the last one in the array will be exposed.
   如果你将 entry 设置为一个 array，那么只有数组中的最后一个会被暴露。

   ```js
   module.exports = {
     // …
     entry: ['./src/a.js', './src/b.js'], // only exports in b.js will be exposed
     output: {
       library: 'MyLibrary',
     },
   }
   ```

2. If an `object` is provided as the `entry` point, all entries can be exposed using the `array` syntax of `library`:
   如果你将 `entry` 设置为一个 `object`，所以入口都可以通过 `library` 的 `array` 语法暴露：

   ```js
   module.exports = {
     // …
     entry: {
       a: './src/a.js',
       b: './src/b.js',
     },
     output: {
       filename: '[name].js',
       library: ['MyLibrary', '[name]'], // name is a placeholder here
     },
   }
   ```

   Assuming that both `a.js` and `b.js` export a function `hello`, here's how to consume the libraries:

   ```html
   <script src="https://example.org/path/to/a.js"></script>
   <script src="https://example.org/path/to/b.js"></script>
   <script>
     MyLibrary.a.hello('webpack')
     MyLibrary.b.hello('webpack')
   </script>
   ```

   See [this example](https://github.com/webpack/webpack/tree/main/examples/multi-part-library) for more.

   Note that the above configuration won't work as expected if you're going to configure library options per entry point. Here is how to do it [under each of your entries](/concepts/entry-points/#entrydescription-object):
   请注意，如果你打算在每个入口点配置 library 配置项的话，以上配置将不能按照预期执行。这里是如何 在每个入口点下 做的方法：

   ```js
   module.exports = {
     // …
     entry: {
       main: {
         import: './src/index.js',
         library: {
           // all options under `output.library` can be used here
           name: 'MyLibrary',
           type: 'umd',
           umdNamedDefine: true,
         },
       },
       another: {
         import: './src/another.js',
         library: {
           name: 'AnotherLibrary',
           type: 'commonjs2',
         },
       },
     },
   }
   ```

### output.library.amdContainer

> V5.78.0+

Use a container(defined in global space) for calling `define`/`require` functions in an AMD module.

> Note that the value of `amdContainer` **must be** set as a global variable.

```js
module.exports = {
  // …
  output: {
    library: {
      amdContainer: 'window["clientContainer"]',
      type: 'amd', // or 'amd-require'
    },
  },
}
```

Which will result in the following bundle:

```js
window['clientContainer'].define(/*define args*/) // or 'amd-require' window['clientContainer'].require(/*require args*/);
```

### output.library.name

指定库的名称。

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
    },
  },
}
```

Specify a name for the library.

- Type:

  ```ts
  string | string[] | {amd?: string, commonjs?: string, root?: string | string[]}
  ```

### output.library.type

Configure how the library will be exposed.
配置将库暴露的方式。

- Type: `string`

  Types included by default are `'var'`, `'module'`, `'assign'`, `'assign-properties'`, `'this'`, `'window'`, `'self'`, `'global'`, `'commonjs'`, `'commonjs2'`, `'commonjs-module'`, `'commonjs-static'`, `'amd'`, `'amd-require'`, `'umd'`, `'umd2'`, `'jsonp'` and `'system'`, but others might be added by plugins.

For the following examples, we'll use `_entry_return_` to indicate the values returned by the entry point.

#### Expose a Variable

暴露一个变量
These options assign the return value of the entry point (e.g. whatever the entry point exported) to the name provided by [`output.library.name`](#outputlibraryname) at whatever scope the bundle was included at.

##### type: 'var'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'var',
    },
  },
}
```

When your library is loaded, the **return value of your entry point** will be assigned to a variable:

```javascript
var MyLibrary = _entry_return_

// In a separate script with `MyLibrary` loaded…
MyLibrary.doSomething()
```

##### type: 'assign'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'assign',
    },
  },
}
```

This will generate an implied global which has the potential to reassign an existing value (use with caution):
这将生成一个隐含的全局变量，它有可能重新分配一个现有的值（请谨慎使用）：

```javascript
MyLibrary = _entry_return_
```

Be aware that if `MyLibrary` isn't defined earlier your library will be set in global scope.

##### type: 'assign-properties'

> V5.16.0+

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'assign-properties',
    },
  },
}
```

Similar to [`type: 'assign'`](#type-assign) but a safer option as it will reuse `MyLibrary` if it already exists:

```js
// only create MyLibrary if it doesn't exist
MyLibrary = typeof MyLibrary === 'undefined' ? {} : MyLibrary
// then copy the return value to MyLibrary
// similarly to what Object.assign does

// for instance, you export a `hello` function in your entry as follow
export function hello(name) {
  console.log(`Hello ${name}`)
}

// In another script with MyLibrary loaded
// you can run `hello` function like so
MyLibrary.hello('World')
```

#### Expose Via Object Assignment

These options assign the return value of the entry point (e.g. whatever the entry point exported) to a specific object under the name defined by [`output.library.name`](#outputlibraryname).
这些配置项分配入口点的返回值（例如：无论入口点导出的什么内容）到一个名为 `output.library.name` 的对象中。

##### type: 'this'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'this',
    },
  },
}
```

The **return value of your entry point** will be assigned to `this` under the property named by `output.library.name`. The meaning of `this` is up to you:

```javascript
this['MyLibrary'] = _entry_return_

// In a separate script...
this.MyLibrary.doSomething()
MyLibrary.doSomething() // if `this` is window
```

##### type: 'window'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'window',
    },
  },
}
```

The **return value of your entry point** will be assigned to the `window` object using the `output.library.name` value.

```javascript
window['MyLibrary'] = _entry_return_

window.MyLibrary.doSomething()
```

##### type: 'global'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'global',
    },
  },
}
```

The **return value of your entry point** will be assigned to the global object using the `output.library.name` value. Depending on the [`target`](/configuration/target/) value, the global object could change respectively, e.g., `self`, `global` or `globalThis`.
入口起点的返回值 将会被复制给全局对象下的 output.library.name。取决于 target 值，全局对象可以分别改变,例如，self、global 或者 globalThis。

```javascript
global['MyLibrary'] = _entry_return_

global.MyLibrary.doSomething()
```

##### type: 'commonjs'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'commonjs',
    },
  },
}
```

The **return value of your entry point** will be assigned to the `exports` object using the `output.library.name` value. As the name implies, this is used in CommonJS environments.

```javascript
exports['MyLibrary'] = _entry_return_

require('MyLibrary').doSomething()
```

W> Note that not setting a `output.library.name` will cause all properties returned by the entry point to be assigned to the given object; there are no checks against existing property names.

#### Module Definition Systems

These options will result in a bundle that comes with a complete header to ensure compatibility with various module systems. The `output.library.name` option will take on a different meaning under the following `output.library.type` options.

##### type: 'module'

```js
module.exports = {
  // …
  experiments: {
    outputModule: true,
  },
  output: {
    library: {
      // do not specify a `name` here
      type: 'module',
    },
  },
}
```

Output ES Module.

However this feature is still experimental and not fully supported yet, so make sure to enable [experiments.outputModule](/configuration/experiments/) beforehand. In addition, you can track the development progress in [this thread](https://github.com/webpack/webpack/issues/2933#issuecomment-774253975).

##### type: 'commonjs2'

```js
module.exports = {
  // …
  output: {
    library: {
      // note there's no `name` here
      type: 'commonjs2',
    },
  },
}
```

The **return value of your entry point** will be assigned to the `module.exports`. As the name implies, this is used in Node.js (CommonJS) environments:

```javascript
module.exports = _entry_return_

require('MyLibrary').doSomething()
```

If we specify `output.library.name` with `type: commmonjs2`, the return value of your entry point will be assigned to the `module.exports.[output.library.name]`.

T> Wondering the difference between CommonJS and CommonJS2 is? While they are similar, there are some subtle differences between them that are not usually relevant in the context of webpack. (For further details, please [read this issue](https://github.com/webpack/webpack/issues/1114).)

##### type: 'commonjs-static'

<Badge text="5.66.0+" />

```js
module.exports = {
  // …
  output: {
    library: {
      // note there's no `name` here
      type: 'commonjs-static',
    },
  },
}
```

Individual exports will be set as properties on `module.exports`. The "static" in the name refers to the output being statically analysable, and thus named exports are importable into ESM via Node.js:

Input:

```javascript
export function doSomething() {}
```

Output:

```javascript
function doSomething() {}

// …

exports.doSomething = __webpack_exports__.doSomething
```

Consumption (CommonJS):

```javascript
const { doSomething } = require('./output.cjs') // doSomething => [Function: doSomething]
```

Consumption (ESM):

```javascript
import { doSomething } from './output.cjs' // doSomething => [Function: doSomething]
```

T> This is useful when source code is written in ESM and the output should be compatible with both CJS and ESM. For further details, please [read this issue](https://github.com/webpack/webpack/issues/14998) or [this article](https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed) (specifically, [this section](https://dev.to/jakobjingleheimer/configuring-commonjs-es-modules-for-nodejs-12ed#publish-only-a-cjs-distribution-with-property-exports)).

##### type: 'amd'

This will expose your library as an AMD module.

AMD modules require that the entry chunk (e.g. the first script loaded by the `<script>` tag) be defined with specific properties, such as to `define` and `require` which is typically provided by RequireJS or any compatible loaders (such as almond). Otherwise, loading the resulting AMD bundle directly will result in an error like `define is not defined`.

With the following configuration...

```javascript
module.exports = {
  //...
  output: {
    library: {
      name: 'MyLibrary',
      type: 'amd',
    },
  },
}
```

The generated output will be defined with the name `"MyLibrary"`, i.e.:

```javascript
define('MyLibrary', [], function () {
  return _entry_return_
})
```

The bundle can be included as part of a script tag, and the bundle can be invoked like so:

```javascript
require(['MyLibrary'], function (MyLibrary) {
  // Do something with the library...
})
```

If `output.library.name` is undefined, the following is generated instead.

```javascript
define(function () {
  return _entry_return_
})
```

This bundle will not work as expected, or not work at all (in the case of the almond loader) if loaded directly with a `<script>` tag. It will only work through a RequireJS compatible asynchronous module loader through the actual path to that file, so in this case, the `output.path` and `output.filename` may become important for this particular setup if these are exposed directly on the server.

##### type: 'amd-require'

```javascript
module.exports = {
  //...
  output: {
    library: {
      name: 'MyLibrary',
      type: 'amd-require',
    },
  },
}
```

This packages your output with an immediately executed AMD `require(dependencies, factory)` wrapper.

The `'amd-require'` type allows for the use of AMD dependencies without needing a separate later invocation. As with the `'amd'` type, this depends on the appropriate [`require` function](https://github.com/amdjs/amdjs-api/blob/master/require.md) being available in the environment in which the webpack output is loaded.

With this type, the library name can't be used.

##### type: 'umd'

This exposes your library under all the module definitions, allowing it to work with CommonJS, AMD, and as global variable. Take a look at the [UMD Repository](https://github.com/umdjs/umd) to learn more.

In this case, you need the `library.name` property to name your module:

```javascript
module.exports = {
  //...
  output: {
    library: {
      name: 'MyLibrary',
      type: 'umd',
    },
  },
}
```

And finally the output is:

```javascript
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else if (typeof exports === 'object') exports['MyLibrary'] = factory()
  else root['MyLibrary'] = factory()
})(global, function () {
  return _entry_return_
})
```

Note that omitting `library.name` will result in the assignment of all properties returned by the entry point be assigned directly to the root object, as documented under the [object assignment section](#expose-via-object-assignment). Example:

```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'umd',
  },
}
```

The output will be:

```javascript
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else {
    var a = factory()
    for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i]
  }
})(global, function () {
  return _entry_return_
})
```

You may specify an object for `library.name` for differing names per targets:

```javascript
module.exports = {
  //...
  output: {
    library: {
      name: {
        root: 'MyLibrary',
        amd: 'my-library',
        commonjs: 'my-common-library',
      },
      type: 'umd',
    },
  },
}
```

##### type: 'system'

This will expose your library as a [`System.register`](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md) module. This feature was first released in [webpack 4.30.0](https://github.com/webpack/webpack/releases/tag/v4.30.0).

System modules require that a global variable `System` is present in the browser when the webpack bundle is executed. Compiling to `System.register` format allows you to `System.import('/bundle.js')` without additional configuration and has your webpack bundle loaded into the System module registry.

```javascript
module.exports = {
  //...
  output: {
    library: {
      type: 'system',
    },
  },
}
```

Output:

```javascript
System.register([], function (__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
  return {
    execute: function () {
      // ...
    },
  }
})
```

By adding `output.library.name` to configuration in addition to having `output.library.type` set to `system`, the output bundle will have the library name as an argument to `System.register`:

```javascript
System.register('MyLibrary', [], function (__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
  return {
    execute: function () {
      // ...
    },
  }
})
```

#### Other Types

##### type: 'jsonp'

```js
module.exports = {
  // …
  output: {
    library: {
      name: 'MyLibrary',
      type: 'jsonp',
    },
  },
}
```

This will wrap the return value of your entry point into a jsonp wrapper.

```javascript
MyLibrary(_entry_return_)
```

The dependencies for your library will be defined by the [`externals`](/configuration/externals/) config.

T> Read the [authoring libraries guide](/guides/author-libraries/) guide for more information on `output.library.name` as well as `output.library.type`.

### output.library.export

Specify which export should be exposed as a library.

- Type: `string | string[]`

It is `undefined` by default, which will export the whole (namespace) object. The examples below demonstrate the effect of this configuration when using [`output.library.type: 'var'`](#type-var).

```js
module.exports = {
  output: {
    library: {
      name: 'MyLibrary',
      type: 'var',
      export: 'default',
    },
  },
}
```

The default export of your entry point will be assigned to the library name:

```js
// if your entry has a default export
var MyLibrary = _entry_return_.default
```

You can pass an array to `output.library.export` as well, it will be interpreted as a path to a module to be assigned to the library name:

```js
module.exports = {
  output: {
    library: {
      name: 'MyLibrary',
      type: 'var',
      export: ['default', 'subModule'],
    },
  },
}
```

And here's the library code:

```js
var MyLibrary = _entry_return_.default.subModule
```

### output.library.auxiliaryComment

Add a comment in the UMD wrapper.

- Type: `string | { amd?: string, commonjs?: string, commonjs2?: string, root?: string }`

To insert the same comment for each `umd` type, set `auxiliaryComment` to a string:

```js
module.exports = {
  // …
  mode: 'development',
  output: {
    library: {
      name: 'MyLibrary',
      type: 'umd',
      auxiliaryComment: 'Test Comment',
    },
  },
}
```

which will yield the following:

```js
;(function webpackUniversalModuleDefinition(root, factory) {
  //Test Comment
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory()
  //Test Comment
  else if (typeof define === 'function' && define.amd) define([], factory)
  //Test Comment
  else if (typeof exports === 'object') exports['MyLibrary'] = factory()
  //Test Comment
  else root['MyLibrary'] = factory()
})(self, function () {
  return _entry_return_
})
```

For fine-grained control, pass an object:

```js
module.exports = {
  // …
  mode: 'development',
  output: {
    library: {
      name: 'MyLibrary',
      type: 'umd',
      auxiliaryComment: {
        root: 'Root Comment',
        commonjs: 'CommonJS Comment',
        commonjs2: 'CommonJS2 Comment',
        amd: 'AMD Comment',
      },
    },
  },
}
```

### output.library.umdNamedDefine

`boolean`

When using `output.library.type: "umd"`, setting `output.library.umdNamedDefine` to `true` will name the AMD module of the UMD build. Otherwise, an anonymous `define` is used.

```javascript
module.exports = {
  //...
  output: {
    library: {
      name: 'MyLibrary',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
}
```

The AMD module will be:

```js
define('MyLibrary', [], factory)
```

## output.libraryExport✨

W> We might drop support for this, so prefer to use [output.library.export](#outputlibraryexport) which works the same as `libraryExport`.

`string` `[string]`

Configure which module or modules will be exposed via the `libraryTarget`. It is `undefined` by default, same behaviour will be applied if you set `libraryTarget` to an empty string e.g. `''` it will export the whole (namespace) object. The examples below demonstrate the effect of this configuration when using `libraryTarget: 'var'`.

The following configurations are supported:

`libraryExport: 'default'` - The **default export of your entry point** will be assigned to the library target:

```javascript
// if your entry has a default export of `MyDefaultModule`
var MyDefaultModule = _entry_return_.default
```

`libraryExport: 'MyModule'` - The **specified module** will be assigned to the library target:

```javascript
var MyModule = _entry_return_.MyModule
```

`libraryExport: ['MyModule', 'MySubModule']` - The array is interpreted as a **path to a module** to be assigned to the library target:

```javascript
var MySubModule = _entry_return_.MyModule.MySubModule
```

With the `libraryExport` configurations specified above, the resulting libraries could be utilized as such:

```javascript
MyDefaultModule.doSomething()
MyModule.doSomething()
MySubModule.doSomething()
```

## output.libraryTarget

`string = 'var'`

> Please use [`output.library.type`](#outputlibrarytype) instead as we might drop support for `output.libraryTarget` in the future.
> 请使用 `output.library.type` 代理，因为我们可能在未来放弃对 `output.libraryTarget` 的支持。

Configure how the library will be exposed. Any one of the following options can be used. Please note that this option works in conjunction with the value assigned to [`output.library`](#outputlibrary). For the following examples, it is assumed that the value of [`output.library`](#outputlibrary) is configured as `MyLibrary`.

T> Note that `_entry_return_` in the example code below is the value returned by the entry point. In the bundle itself, it is the output of the function that is generated by webpack from the entry point.

### Expose a Variable

These options assign the return value of the entry point (e.g. whatever the entry point exported) to the name provided by [`output.library`](#outputlibrary) at whatever scope the bundle was included at.

#### libraryTarget: 'var'

W> Prefer to use [`output.library.type: 'var'`](#type-var).

When your library is loaded, the **return value of your entry point** will be assigned to a variable:

```javascript
var MyLibrary = _entry_return_

// In a separate script...
MyLibrary.doSomething()
```

#### libraryTarget: 'assign'

W> Prefer to use [`output.library.type: 'assign'`](#type-assign).

This will generate an implied global which has the potential to reassign an existing value (use with caution):

```javascript
MyLibrary = _entry_return_
```

Be aware that if `MyLibrary` isn't defined earlier your library will be set in the global scope.

#### libraryTarget: 'assign-properties'

<Badge text="5.16.0+" />

W> Prefer to use [output.library.type: 'assign-properties'`](#type-assign-properties).

Copy the return value to a target object if it exists, otherwise create the target object first:

```js
// create the target object if it doesn't exist
MyLibrary = typeof MyLibrary === 'undefined' ? {} : MyLibrary
// then copy the return value to MyLibrary
// similarly to what Object.assign does

// for instance, you export a `hello` function in your entry as follow
export function hello(name) {
  console.log(`Hello ${name}`)
}

// In another script running MyLibrary
// you can run `hello` function like so
MyLibrary.hello('World')
```

W> An empty string for the [`output.library`](#outputlibrary) is invalid, make sure you specify a valid identifier that could be assigned.

### Expose Via Object Assignment

These options assign the return value of the entry point (e.g. whatever the entry point exported) to a specific object under the name defined by `output.library`.

If `output.library` is not assigned a non-empty string, the default behavior is that all properties returned by the entry point will be assigned to the object as defined for the particular `output.libraryTarget`, via the following code fragment:

```javascript
;(function (e, a) {
  for (var i in a) {
    e[i] = a[i]
  }
})(output.libraryTarget, _entry_return_)
```

W> Note that not setting a `output.library` will cause all properties returned by the entry point to be assigned to the given object; there are no checks against existing property names.

#### libraryTarget: 'this'

W> Prefer to use [`output.library.type: 'this'`](#type-this).

The **return value of your entry point** will be assigned to this under the property named by `output.library`. The meaning of `this` is up to you:

```javascript
this['MyLibrary'] = _entry_return_

// In a separate script...
this.MyLibrary.doSomething()
MyLibrary.doSomething() // if this is window
```

#### libraryTarget: 'window'

W> Prefer to use [`output.library.type: 'window'`](#type-window).

The **return value of your entry point** will be assigned to the `window` object using the `output.library` value.

```javascript
window['MyLibrary'] = _entry_return_

window.MyLibrary.doSomething()
```

#### libraryTarget: 'global'

W> Prefer to use [`output.library.type: 'global'`](#type-global).

The **return value of your entry point** will be assigned to the `global` object using the `output.library` value.

```javascript
global['MyLibrary'] = _entry_return_

global.MyLibrary.doSomething()
```

#### libraryTarget: 'commonjs'

W> Prefer to use [`output.library.type: 'commonjs'`](#type-commonjs).

The **return value of your entry point** will be assigned to the `exports` object using the `output.library` value. As the name implies, this is used in CommonJS environments.

```javascript
exports['MyLibrary'] = _entry_return_

require('MyLibrary').doSomething()
```

### Module Definition Systems

These options will result in a bundle that comes with a complete header to ensure compatibility with various module systems. The `output.library` option will take on a different meaning under the following `output.libraryTarget` options.

#### libraryTarget: 'module'

W> Prefer to use [`output.library.type: 'module'`](#type-module).

Output ES Module. Make sure to enable [experiments.outputModule](/configuration/experiments/) beforehand.

Note that this feature is not fully supported yet, please track the progress in [this thread](https://github.com/webpack/webpack/issues/2933#issuecomment-774253975).

#### libraryTarget: 'commonjs2'

W> Prefer to use [`output.library.type: 'commonjs2'`](#type-commonjs2).

The **return value of your entry point** will be assigned to the `module.exports`. As the name implies, this is used in CommonJS environments:

```javascript
module.exports = _entry_return_

require('MyLibrary').doSomething()
```

Note that `output.library` can't be used with this particular `output.libraryTarget`, for further details, please [read this issue](https://github.com/webpack/webpack/issues/11800).

T> Wondering the difference between CommonJS and CommonJS2 is? While they are similar, there are some subtle differences between them that are not usually relevant in the context of webpack. (For further details, please [read this issue](https://github.com/webpack/webpack/issues/1114).)

#### libraryTarget: 'amd'

W> Prefer to use [`output.library.type: 'amd'`](#type-amd).

This will expose your library as an AMD module.

AMD modules require that the entry chunk (e.g. the first script loaded by the `<script>` tag) be defined with specific properties, such as to `define` and `require` which is typically provided by RequireJS or any compatible loaders (such as almond). Otherwise, loading the resulting AMD bundle directly will result in an error like `define is not defined`.

With the following configuration...

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'amd',
  },
}
```

The generated output will be defined with the name "MyLibrary", i.e.

```javascript
define('MyLibrary', [], function () {
  return _entry_return_
})
```

The bundle can be included as part of a script tag, and the bundle can be invoked like so:

```javascript
require(['MyLibrary'], function (MyLibrary) {
  // Do something with the library...
})
```

If `output.library` is undefined, the following is generated instead.

```javascript
define([], function () {
  return _entry_return_
})
```

This bundle will not work as expected, or not work at all (in the case of the almond loader) if loaded directly with a `<script>` tag. It will only work through a RequireJS compatible asynchronous module loader through the actual path to that file, so in this case, the `output.path` and `output.filename` may become important for this particular setup if these are exposed directly on the server.

#### libraryTarget: 'amd-require'

W> Prefer to use [`output.library.type: 'amd-require'`](#type-amd-require).

This packages your output with an immediately executed AMD `require(dependencies, factory)` wrapper.

The `'amd-require'` target allows for the use of AMD dependencies without needing a separate later invocation. As with the `'amd'` target, this depends on the appropriate [`require` function](https://github.com/amdjs/amdjs-api/blob/master/require.md) being available in the environment in which the webpack output is loaded.

With this target, the library name is ignored.

#### libraryTarget: 'umd'

W> Prefer to use [`output.library.type: 'umd'`](#type-umd).

This exposes your library under all the module definitions, allowing it to work with CommonJS, AMD and as a global variable. Take a look at the [UMD Repository](https://github.com/umdjs/umd) to learn more.

In this case, you need the `library` property to name your module:

```javascript
module.exports = {
  //...
  output: {
    library: 'MyLibrary',
    libraryTarget: 'umd',
  },
}
```

And finally the output is:

```javascript
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else if (typeof exports === 'object') exports['MyLibrary'] = factory()
  else root['MyLibrary'] = factory()
})(typeof self !== 'undefined' ? self : this, function () {
  return _entry_return_
})
```

Note that omitting the `library` will result in the assignment of all properties returned by the entry point be assigned directly to the root object, as documented under the [object assignment section](#expose-via-object-assignment). Example:

```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'umd',
  },
}
```

The output will be:

```javascript
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory()
  else if (typeof define === 'function' && define.amd) define([], factory)
  else {
    var a = factory()
    for (var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i]
  }
})(typeof self !== 'undefined' ? self : this, function () {
  return _entry_return_
})
```

Since webpack 3.1.0, you may specify an object for `library` for differing names per targets:

```javascript
module.exports = {
  //...
  output: {
    library: {
      root: 'MyLibrary',
      amd: 'my-library',
      commonjs: 'my-common-library',
    },
    libraryTarget: 'umd',
  },
}
```

#### libraryTarget: 'system'

W> Prefer to use [`output.library.type: 'system'`](#type-system).

This will expose your library as a [`System.register`](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md) module. This feature was first released in [webpack 4.30.0](https://github.com/webpack/webpack/releases/tag/v4.30.0).

System modules require that a global variable `System` is present in the browser when the webpack bundle is executed. Compiling to `System.register` format allows you to `System.import('/bundle.js')` without additional configuration and has your webpack bundle loaded into the System module registry.

```javascript
module.exports = {
  //...
  output: {
    libraryTarget: 'system',
  },
}
```

Output:

```javascript
System.register([], function (_export) {
  return {
    setters: [],
    execute: function () {
      // ...
    },
  }
})
```

By adding `output.library` to configuration in addition to having `output.libraryTarget` set to `system`, the output bundle will have the library name as an argument to `System.register`:

```javascript
System.register('my-library', [], function (_export) {
  return {
    setters: [],
    execute: function () {
      // ...
    },
  }
})
```

You can access [SystemJS context](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md#format-definition) via `__system_context__`:

```javascript
// Log the URL of the current SystemJS module
console.log(__system_context__.meta.url)

// Import a SystemJS module, with the current SystemJS module's url as the parentUrl
__system_context__.import('./other-file.js').then((m) => {
  console.log(m)
})
```

### Other Targets

#### libraryTarget: 'jsonp'

W> Prefer to use [`output.library.type: 'jsonp'`](#type-jsonp).

This will wrap the return value of your entry point into a jsonp wrapper.

```javascript
MyLibrary(_entry_return_)
```

The dependencies for your library will be defined by the [`externals`](/configuration/externals/) config.

## output.module✨

`boolean = false`

Output JavaScript files as module type. Disabled by default as it's an experimental feature.
以模块类型输出 JavaScript 文件。由于此功能还处于实验阶段，默认**禁用**。

When enabled, webpack will set [`output.iife`](#outputiife) to `false`, [`output.scriptType`](#outputscripttype) to `'module'` and `terserOptions.module` to `true` internally.

If you're using webpack to compile a library to be consumed by others, make sure to set [`output.libraryTarget`](#librarytarget-module) to `'module'` when `output.module` is `true`.

```javascript
module.exports = {
  //...
  experiments: {
    outputModule: true,
  },
  output: {
    module: true,
  },
}
```

W> `output.module` is an experimental feature and can only be enabled by setting [`experiments.outputModule`](/configuration/experiments/#experiments) to `true`. [One of the known problems](https://github.com/webpack/webpack/issues/11277#issuecomment-992565287) is that such a library can't be consumed by webpack4-based (and possibly other too) applications.

## output.path✨

`string = path.join(process.cwd(), 'dist')`

The output directory as an **absolute** path.
output 目录对应一个绝对路径。

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
  },
}
```

Note that `[fullhash]` in this parameter will be replaced with a hash of the compilation. See the [Caching guide](/guides/caching/) for details.
注意，[fullhash] 在参数中被替换为编译过程(compilation)的 hash。详细信息请查看指南 - 缓存。

## output.pathinfo

`boolean=true` `string: 'verbose'`

Tells webpack to include comments in bundles with information about the contained modules. This option defaults to `true` in `development` and `false` in `production` [mode](/configuration/mode/) respectively. `'verbose'` shows more information like exports, runtime requirements and bailouts.
告知 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项在 development 模式时的默认值为 true，而在 production 模式时的默认值为 false。当值为 'verbose' 时，会显示更多信息，如 export，运行时依赖以及 bailouts。

> While the data these comments can provide is useful during development when reading the generated code, it **should not** be used in production.
> 对于在开发环境(development)下阅读生成代码时，虽然通过这些注释可以提供有用的数据信息，但在生产环境(production)下，不应该使用。推荐开发环境下关闭，提高构建速度

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    pathinfo: true,
  },
}
```

T> It also adds some info about tree shaking to the generated bundle.

## output.publicPath✨✨✨

- Type:

  - `function`
  - `string`

    `output.publicPath` defaults to `'auto'` with `web` and `web-worker` targets, see [this guide](/guides/public-path/#automatic-publicpath) for its use cases.targets 设置为 web 与 web-worker 时 output.publicPath 默认为 'auto'，查看该指南获取其用例

This is an important option when using on-demand-loading or loading external resources like images, files, etc. If an incorrect value is specified you'll receive 404 errors while loading these resources.
对于按需加载(on-demand-load)或加载外部资源(external resources)（如图片、文件等）来说，output.publicPath 是很重要的选项。如果指定了一个错误的值，则在加载这些资源时会收到 404 错误。

This option specifies the **public URL** of the output directory when referenced in a browser. A relative URL is resolved relative to the HTML page (or `<base>` tag). Server-relative URLs, protocol-relative URLs or absolute URLs are also possible and sometimes required, i. e. when hosting assets on a CDN.

The value of the option is prefixed to every URL created by the runtime or loaders. Because of this **the value of this option ends with `/`** in most cases.
该选项的值是以 runtime(运行时) 或 loader(载入时) 所创建的每个 URL 的前缀。因此，在多数情况下，此选项的值都会以 / 结束。

A rule to consider: The URL of your [`output.path`](#outputpath) from the view of the HTML page.
规则如下：output.path 中的 URL 以 HTML 页面为基准。

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: 'https://cdn.example.com/assets/',
  },
}
```

For this configuration:

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    publicPath: '/assets/',
    chunkFilename: '[id].chunk.js',
  },
}
```

A request to a chunk will look like `/assets/4.chunk.js`.

A loader outputting HTML might emit something like this:

```html
<link href="/assets/spinner.gif" />
```

or when loading an image in CSS:

```css
background-image: url(/assets/spinner.gif);
```

The webpack-dev-server also takes a hint from `publicPath`, using it to determine where to serve the output files from.

Note that `[fullhash]` in this parameter will be replaced with a hash of the compilation. See the [Caching guide](/guides/caching) for details.

Examples:

```javascript
module.exports = {
  //...
  output: {
    // One of the below
    publicPath: 'auto', // It automatically determines the public path from either `import.meta.url`, `document.currentScript`, `<script />` or `self.location`.
    publicPath: 'https://cdn.example.com/assets/', // CDN (always HTTPS)
    publicPath: '//cdn.example.com/assets/', // CDN (same protocol)
    publicPath: '/assets/', // server-relative
    publicPath: 'assets/', // relative to HTML page
    publicPath: '../assets/', // relative to HTML page
    publicPath: '', // relative to HTML page (same directory)
  },
}
```

In cases where the `publicPath` of output files can't be known at compile time, it can be left blank and set dynamically at runtime in the entry file using the [free variable](https://stackoverflow.com/questions/12934929/what-are-free-variables) `__webpack_public_path__`.

```javascript
__webpack_public_path__ = myRuntimePublicPath

// rest of your application entry
```

See [this discussion](https://github.com/webpack/webpack/issues/2776#issuecomment-233208623) for more information on `__webpack_public_path__`.

## output.scriptType

`string: 'module' | 'text/javascript'` `boolean = false`

This option allows loading asynchronous chunks with a custom script type, such as `<script type="module" ...>`.

> If [`output.module`](#outputmodule) is set to `true`, `output.scriptType` will default to `'module'` instead of `false`.

```javascript
module.exports = {
  //...
  output: {
    scriptType: 'module',
  },
}
```

## output.sourceMapFilename

`string = '[file].map[query]'`

Configure how source maps are named. Only takes effect when [`devtool`](/configuration/devtool/) is set to `'source-map'`, which writes an output file.

The `[name]`, `[id]`, `[fullhash]` and `[chunkhash]` substitutions from [`output.filename`](#outputfilename) can be used. In addition to those, you can use substitutions listed under Filename-level in [Template strings](/configuration/output/#template-strings).

## output.sourcePrefix

`string = ''`

Change the prefix for each line in the output bundles.

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    sourcePrefix: '\t',
  },
}
```

T> Using some kind of indentation makes bundles look prettier, but will cause issues with multi-line strings.

T> Typically you don't need to change `output.sourcePrefix`.

## output.strictModuleErrorHandling

Handle error in module loading as per EcmaScript Modules spec at a performance cost.

- Type: `boolean`
- Available: 5.25.0+

```javascript
module.exports = {
  //...
  output: {
    strictModuleErrorHandling: true,
  },
}
```

## output.strictModuleExceptionHandling

W> Deprecated, use
[`output.strictModuleErrorHandling`](#outputstrictmoduleerrorhandling) instead.

`boolean = false`

Tell webpack to remove a module from the module instance cache (`require.cache`) if it throws an exception when it is `require`d.

It defaults to `false` for performance reasons.

When set to `false`, the module is not removed from cache, which results in the exception getting thrown only on the first `require` call (making it incompatible with node.js).

For instance, consider `module.js`:

```javascript
throw new Error('error')
```

With `strictModuleExceptionHandling` set to `false`, only the first `require` throws an exception:

```javascript
// with strictModuleExceptionHandling = false
require('module') // <- throws
require('module') // <- doesn't throw
```

Instead, with `strictModuleExceptionHandling` set to `true`, all `require`s of this module throw an exception:

```javascript
// with strictModuleExceptionHandling = true
require('module') // <- throws
require('module') // <- also throws
```

## output.trustedTypes

`boolean = false` `string` `object`

<Badge text="5.37.0+" />

Controls [Trusted Types](https://web.dev/trusted-types) compatibility. When enabled, webpack will detect Trusted Types support and, if they are supported, use Trusted Types policies to create script URLs it loads dynamically. Use when the application runs under a [`require-trusted-types-for`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for) Content Security Policy directive.

It defaults to `false` (no compatibility, script URLs are strings).

- When set to `true`, webpack will use [`output.uniqueName`](#outputuniquename) as the Trusted Types policy name.
- When set to a non-empty string, its value will be used as a policy name.
- When set to an object, the policy name is taken from the object's `policyName` property.

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    //...
    trustedTypes: {
      policyName: 'my-application#webpack',
    },
  },
}
```

### output.trustedTypes.onPolicyCreationFailure

`string = 'stop': 'continue' | 'stop'`

<Badge text="5.82.0+" />

Determine whether to proceed with loading in anticipation that [`require-trusted-types-for 'script'`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for) has not been enforced or to immediately fail when the call to `trustedTypes.createPolicy(...)` fails due to the policy name being absent from the CSP `trusted-types` list or being a duplicate.

```javascript
module.exports = {
  //...
  output: {
    //...
    trustedTypes: {
      policyName: 'my-application#webpack',
      onPolicyCreationFailure: 'continue',
    },
  },
}
```

## output.umdNamedDefine

W> Prefer to use [`output.library.umdNamedDefine`](#outputlibraryumdnameddefine) instead.

`boolean`

When using `libraryTarget: "umd"`, setting `output.umdNamedDefine` to `true` will name the AMD module of the UMD build. Otherwise an anonymous `define` is used.

```javascript
module.exports = {
  //...
  output: {
    umdNamedDefine: true,
  },
}
```

## output.uniqueName

`string`

A unique name of the webpack build to avoid multiple webpack runtimes to conflict when using globals. It defaults to [`output.library`](/configuration/output/#outputlibrary) name or the package name from `package.json` in the context, if both aren't found, it is set to an `''`.
在全局环境下为防止多个 webpack 运行时 冲突所使用的唯一名称。默认使用 `output.library` 名称或者上下文中的 `package.json` 的 包名称(package name)， 如果两者都不存在，值为 `''`。

`output.uniqueName` will be used to generate unique globals for:
`output.uniqueName` 将用于生成唯一全局变量:

- [`output.chunkLoadingGlobal`](/configuration/output/#outputchunkloadingglobal)

**webpack.config.js**

```javascript
module.exports = {
  // ...
  output: {
    uniqueName: 'my-package-xyz',
  },
}
```

## output.wasmLoading

`boolean = false` `string`

Option to set the method of loading WebAssembly Modules. Methods included by default are `'fetch'` (web/WebWorker), `'async-node'` (Node.js), but others might be added by plugins.
此选项用于设置加载 WebAssembly 模块的方式。默认可使用的方式有 `'fetch'`（web/WebWorker），`'async-node'`（Node.js），其他额外方式可由插件提供。

The default value can be affected by different [`target`](/configuration/target/):

- Defaults to `'fetch'` if [`target`](/configuration/target/) is set to `'web'`, `'webworker'`, `'electron-renderer'` or `'node-webkit'`.
- Defaults to `'async-node'` if [`target`](/configuration/target/) is set to `'node'`, `'async-node'`, `'electron-main'` or `'electron-preload'`.

```javascript
module.exports = {
  //...
  output: {
    wasmLoading: 'fetch',
  },
}
```

## output.workerChunkLoading

`string: 'require' | 'import-scripts' | 'async-node' | 'import' | 'universal'` `boolean: false`

The new option `workerChunkLoading` controls the chunk loading of workers.
新选项 `workerChunkLoading` 用于控制 workder 的 chunk 加载。

> The default value of this option depends on the [`target`](/configuration/target/) setting. For more details, search for `"workerChunkLoading"` [in the webpack defaults](https://github.com/webpack/webpack/blob/main/lib/config/defaults.js).

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    workerChunkLoading: false,
  },
}
```

## output.workerPublicPath ✨

`string`

Set a public path for Worker, defaults to value of [output.publicPath](#outputpublicpath). Only use this option if your worker scripts are located in a different path from your other scripts.

**webpack.config.js**

```javascript
module.exports = {
  //...
  output: {
    workerPublicPath: '/workerPublicPath2/',
  },
}
```
