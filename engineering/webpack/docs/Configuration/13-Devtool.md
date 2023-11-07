# Devtool

This option controls if and how source maps are generated.

Use the [`SourceMapDevToolPlugin`](/plugins/source-map-dev-tool-plugin) for a more fine grained configuration. See the [`source-map-loader`](/loaders/source-map-loader) to deal with existing source maps.
使用 SourceMapDevToolPlugin 进行更细粒度的配置。查看 `source-map-loader` 来处理已有的 source map。

## devtool

`string = 'eval'` `false`

Choose a style of [source mapping](http://blog.teamtreehouse.com/introduction-source-maps) to enhance the debugging process. These values can affect build and rebuild speed dramatically.
选择一种 source map 风格来增强调试过程。不同的值会明显影响到构建(build)和重新构建(rebuild)的速度。

> The webpack repository contains an [example showing the effect of all `devtool` variants](https://github.com/webpack/webpack/tree/master/examples/source-map). Those examples will likely help you to understand the differences.

> Instead of using the `devtool` option you can also use `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` directly as it has more options. Never use both the `devtool` option and plugin together. The `devtool` option adds the plugin internally so you would end up with the plugin applied twice.
> 你可以直接使用 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 来替代使用 `devtool` 选项，因为它有更多的选项。切勿同时使用 `devtool` 选项和 `SourceMapDevToolPlugin`/`EvalSourceMapDevToolPlugin` 插件。`devtool` 选项在内部添加过这些插件，所以你最终将应用两次插件。

| devtool                                    | performance                                        | production | quality        | comment                                                                               |
| ------------------------------------------ | -------------------------------------------------- | ---------- | -------------- | ------------------------------------------------------------------------------------- |
| (none)                                     | **build**: fastest<br /><br />**rebuild**: fastest | yes        | bundle         | Recommended choice for production builds with maximum performance.                    |
| **`eval`**                                 | **build**: fast<br /><br />**rebuild**: fastest    | no         | generated      | Recommended choice for development builds with maximum performance.                   |
| `eval-cheap-source-map`                    | **build**: ok<br /><br />**rebuild**: fast         | no         | transformed    | Tradeoff choice for development builds.                                               |
| `eval-cheap-module-source-map`✨✨✨       | **build**: slow<br /><br />**rebuild**: fast       | no         | original lines | Tradeoff choice for development builds.                                               |
| **`eval-source-map`**                      | **build**: slowest<br /><br />**rebuild**: ok      | no         | original       | Recommended choice for development builds with high quality SourceMaps.               |
| `cheap-source-map`                         | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    |
| `cheap-module-source-map`                  | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines |
| **`source-map`**                           | **build**: slowest<br /><br />**rebuild**: slowest | yes        | original       | Recommended choice for production builds with high quality SourceMaps.                |
| `inline-cheap-source-map`                  | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    |
| `inline-cheap-module-source-map`           | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines |
| `inline-source-map`                        | **build**: slowest<br /><br />**rebuild**: slowest | no         | original       | Possible choice when publishing a single file                                         |
| `eval-nosources-cheap-source-map`          | **build**: ok<br /><br />**rebuild**: fast         | no         | transformed    | source code not included                                                              |
| `eval-nosources-cheap-module-source-map`   | **build**: slow<br /><br />**rebuild**: fast       | no         | original lines | source code not included                                                              |
| `eval-nosources-source-map`                | **build**: slowest<br /><br />**rebuild**: ok      | no         | original       | source code not included                                                              |
| `inline-nosources-cheap-source-map`        | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    | source code not included                                                              |
| `inline-nosources-cheap-module-source-map` | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines | source code not included                                                              |
| `inline-nosources-source-map`              | **build**: slowest<br /><br />**rebuild**: slowest | no         | original       | source code not included                                                              |
| `nosources-cheap-source-map`               | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    | source code not included                                                              |
| `nosources-cheap-module-source-map`        | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines | source code not included                                                              |
| `nosources-source-map`                     | **build**: slowest<br /><br />**rebuild**: slowest | yes        | original       | source code not included                                                              |
| `hidden-nosources-cheap-source-map`        | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    | no reference, source code not included                                                |
| `hidden-nosources-cheap-module-source-map` | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines | no reference, source code not included                                                |
| `hidden-nosources-source-map`              | **build**: slowest<br /><br />**rebuild**: slowest | yes        | original       | no reference, source code not included                                                |
| `hidden-cheap-source-map`                  | **build**: ok<br /><br />**rebuild**: slow         | no         | transformed    | no reference                                                                          |
| `hidden-cheap-module-source-map`           | **build**: slow<br /><br />**rebuild**: slow       | no         | original lines | no reference                                                                          |
| `hidden-source-map` ✨✨✨                 | **build**: slowest<br /><br />**rebuild**: slowest | yes        | original       | no reference. Possible choice when using SourceMap only for error reporting purposes. |

| shortcut                | explanation                                                                                                                                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| performance: build      | How is the performance of the initial build affected by the devtool setting?                                                                                                                                                                                                                                      |
| performance: rebuild    | How is the performance of the incremental build affected by the devtool setting? Slow devtools might reduce development feedback loop in watch mode. The scale is different compared to the build performance, as one would expect rebuilds to be faster than builds.                                             |
| production              | Does it make sense to use this devtool for production builds? It's usually `no` when the devtool has a negative effect on user experience.                                                                                                                                                                        |
| quality: bundled        | You will see all generated code of a chunk in a single blob of code. This is the raw output file without any devtooling support                                                                                                                                                                                   |
| quality: generated      | You will see the generated code, but each module is shown as separate code file in browser devtools.                                                                                                                                                                                                              |
| quality: transformed    | You will see generated code after the preprocessing by loaders but before additional webpack transformations. Only source lines will be mapped and column information will be discarded resp. not generated. This prevents setting breakpoints in the middle of lines which doesn't work together with minimizer. |
| quality: original lines | You will see the original code that you wrote, assuming all loaders support SourceMapping. Only source lines will be mapped and column information will be discarded resp. not generated. This prevents setting breakpoints in the middle of lines which doesn't work together with minimizer.                    |
| quality: original       | You will see the original code that you wrote, assuming all loaders support SourceMapping.                                                                                                                                                                                                                        |
| `eval-*` addition       | generate SourceMap per module and attach it via eval. Recommended for development, because of improved rebuild performance. Note that there is a windows defender issue, which causes huge slowdown due to virus scanning.                                                                                        |
| `inline-*` addition     | inline the SourceMap to the original file instead of creating a separate file.                                                                                                                                                                                                                                    |
| `hidden-*` addition     | no reference to the SourceMap added. When SourceMap is not deployed, but should still be generated, e. g. for error reporting purposes.                                                                                                                                                                           |
| `nosources-*` addition  | source code is not included in SourceMap. This can be useful when the original files should be referenced (further config options needed).                                                                                                                                                                        |

> We expect a certain pattern when validate devtool name, pay attention and dont mix up the sequence of devtool string. The pattern is: `[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`.

Some of these values are suited for development and some for production. For development you typically want fast Source Maps at the cost of bundle size, but for production you want separate Source Maps that are accurate and support minimizing.

> See [`output.sourceMapFilename`](/configuration/output/#outputsourcemapfilename) to customize the filenames of generated Source Maps.

### Qualities

品质说明(quality)
`bundled code` - You see all generated code as a big blob of code. You don't see modules separated from each other.
打包后的代码 - 将所有生成的代码视为一大块代码。你看不到相互分离的模块。

`generated code` - You see each module separated from each other, annotated with module names. You see the code generated by webpack. Example: Instead of `import {test} from "module"; test();` you see something like `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a();`.
生成后的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 生成的代码。示例：你会看到类似 `var module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(42); module__WEBPACK_IMPORTED_MODULE_1__.a()`;，而不是 `import {test} from "module"; test();`。

`transformed code` - You see each module separated from each other, annotated with module names. You see the code before webpack transforms it, but after Loaders transpile it. Example: Instead of `import {test} from "module"; class A extends test {}` you see something like `import {test} from "module"; var A = function(_test) { ... }(test);`
转换过的代码 - 每个模块相互分离，并用模块名称进行注释。可以看到 webpack 转换前、loader 转译后的代码。示例：你会看到类似 `import {test} from "module"; var A = function(\_test) { ... }(test);`，而不是 `import {test} from "module"; class A extends test {}`。

`original source` - You see each module separated from each other, annotated with module names. You see the code before transpilation, as you authored it. This depends on Loader support.
原始源代码 - 每个模块相互分离，并用模块名称进行注释。你会看到转译之前的代码，正如编写它时。这取决于 loader 支持。

`without source content` - Contents for the sources are not included in the Source Maps. Browsers usually try to load the source from the webserver or filesystem. You have to make sure to set [`output.devtoolModuleFilenameTemplate`](/configuration/output/#outputdevtoolmodulefilenametemplate) correctly to match source urls.
无源代码内容 - source map 中不包含源代码内容。浏览器通常会尝试从 web 服务器或文件系统加载源代码。你必须确保正确设置 output.devtoolModuleFilenameTemplate，以匹配源代码的 url。

`(lines only)` - Source Maps are simplified to a single mapping per line. This usually means a single mapping per statement (assuming you author it this way). This prevents you from debugging execution on statement level and from settings breakpoints on columns of a line. Combining with minimizing is not possible as minimizers usually only emit a single line.
（仅限行） - source map 被简化为每行一个映射。这通常意味着每个语句只有一个映射（假设你使用这种方式）。这会妨碍你在语句级别上调试执行，也会妨碍你在每行的一些列上设置断点。与压缩后的代码组合后，映射关系是不可能实现的，因为压缩工具通常只会输出一行。

### Development

The following options are ideal for development:
以下选项非常适合开发环境：

- `eval` - Each module is executed with `eval()` and `//# sourceURL`. This is pretty fast. The main disadvantage is that it doesn't display line numbers correctly since it gets mapped to transpiled code instead of the original code (No Source Maps from Loaders).
  eval - 每个模块都使用 eval() 执行，并且都有 //# sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。

- `eval-source-map` - Each module is executed with `eval()` and a SourceMap is added as a DataUrl to the `eval()`. Initially it is slow, but it provides fast rebuild speed and yields real files. Line numbers are correctly mapped since it gets mapped to the original code. It yields the best quality SourceMaps for development.
  eval-source-map - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。

- `eval-cheap-source-map` - Similar to `eval-source-map`, each module is executed with `eval()`. It is "cheap" because it doesn't have column mappings, it only maps line numbers. It ignores SourceMaps from Loaders and only display transpiled code similar to the `eval` devtool.
  eval-cheap-source-map - 类似 eval-source-map，每个模块使用 eval() 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 eval devtool。

- `eval-cheap-module-source-map` - Similar to `eval-cheap-source-map`, however, in this case Source Maps from Loaders are processed for better results. However Loader Source Maps are simplified to a single mapping per line.
  `eval-cheap-module-source-map` - 类似 `eval-cheap-source-map`，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。

### Special cases

特定场景
The following options are not ideal for development nor production. They are needed for some special cases, i. e. for some 3rd party tools.

`inline-source-map` - A SourceMap is added as a DataUrl to the bundle. source map 转换为 DataUrl 后添加到 bundle 中。

`cheap-source-map` - A SourceMap without column-mappings ignoring loader Source Maps. 没有列映射(column mapping)的 source map，忽略 loader source map

`inline-cheap-source-map` - Similar to `cheap-source-map` but SourceMap is added as a DataUrl to the bundle. 类似 cheap-source-map，但是 source map 转换为 DataUrl 后添加到 bundle 中。

`cheap-module-source-map` - A SourceMap without column-mappings that simplifies loader Source Maps to a single mapping per line. 没有列映射(column mapping)的 source map，将 loader source map 简化为每行一个映射(mapping)。

`inline-cheap-module-source-map` - Similar to `cheap-module-source-map` but SourceMap is added as a DataUrl to the bundle. 类似 cheap-module-source-map，但是 source mapp 转换为 DataUrl 添加到 bundle 中。

### Production

These options are typically used in production:

`(none)` (Omit the `devtool` option) - No SourceMap is emitted. This is a good option to start with. （省略 devtool 选项） - 不生成 source map。这是一个不错的选择。

`source-map` - A full SourceMap is emitted as a separate file. It adds a reference comment to the bundle so development tools know where to find it. 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。

> You should configure your server to disallow access to the Source Map file for normal users!

`hidden-source-map` - Same as `source-map`, but doesn't add a reference comment to the bundle. Useful if you only want SourceMaps to map error stack traces from error reports, but don't want to expose your SourceMap for the browser development tools. hidden-source-map - 与 source-map 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用。

> You should not deploy the Source Map file to the webserver. Instead only use it for error report tooling.

`nosources-source-map` - A SourceMap is created without the `sourcesContent` in it. It can be used to map stack traces on the client without exposing all of the source code. You can deploy the Source Map file to the webserver. nosources-source-map - 创建的 source map 不包含 sourcesContent(源代码内容)。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。

> It still exposes filenames and structure for decompiling, but it doesn't expose the original code.
> 这仍然会暴露反编译后的文件名和结构，但它不会暴露原始代码。

> If the default webpack `minimizer` has been overridden (such as to customise the `terser-webpack-plugin` options), make sure to configure its replacement with `sourceMap: true` to enable SourceMap support. 如果默认的 webpack minimizer 被覆盖 (例如自定义 terser-webpack-plugin 选项)， 请确保将其替换配置为 sourceMap: true 以启用 SourceMap 支持。

## Further Reading

- [启用 Source Maps](https://survivejs.com/webpack/developing-with-webpack/enabling-sourcemaps/)
- [webpack 的 Devtool Source Map](http://cheng.logdown.com/posts/2016/03/25/679045)
