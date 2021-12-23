# Multipage 最佳实践

使用[html-wbpack-plugin](https://github.com/jantimon/html-webpack-plugin#readme)产生多个 html

> 注意一些公共资源的共用

## html-webpack-plugin

### html-webpack-plugin options

|            Name            |               Type                |                        Default                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------------: | :-------------------------------: | :---------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|      ⭐⭐**`title`**       |            `{String}`             |                     `Webpack App`                     | The title to use for the generated HTML document 生成页面的标题                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ⭐⭐⭐**`filename`**文件名 |       `{String\|Function}`        |                    `'index.html'`                     | The file to write the HTML to 生成的文件名. Defaults to `index.html`. You can specify a subdirectory here too (eg: `assets/admin.html`). The `[name]` placeholder 占位符 will be replaced with the entry name. Can also be a function e.g. `(entryName) => entryName + '.html'`.                                                                                                                                                                                                                                                                   |
|  ⭐⭐⭐**`template`**模板  |            `{String}`             |                          ``                           | `webpack` relative or absolute path to the template. By default it will use 默认文件：`src/index.ejs` if it exists. Please see the [docs](https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md) for details                                                                                                                                                                                                                                                                                                         |
|   **`templateContent`**    |    `{string\|Function\|false}`    |                         false                         | Can be used instead of `template` to provide an inline template - please read the [Writing Your Own Templates](https://github.com/jantimon/html-webpack-plugin#writing-your-own-templates) section                                                                                                                                                                                                                                                                                                                                                 |
|  **`templateParameters`**  |   `{Boolean\|Object\|Function}`   |                        `false`                        | Allows to overwrite the parameters used in the template - see [example](https://github.com/jantimon/html-webpack-plugin/tree/master/examples/template-parameters)                                                                                                                                                                                                                                                                                                                                                                                  |
|  ⭐⭐**`inject`**是否注入  |        `{Boolean\|String}`        |                        `true`                         | 可选项：`true \|\| 'head' \|\| 'body' \|\| false` Inject all assets into the given `template` or `templateContent`. When passing `'body'` all javascript resources will be placed at the bottom of the body element. `'head'` will place the scripts in the head element. Passing `true` will add it to the head/body depending on the `scriptLoading` option. Passing `false` will disable automatic injections. - see the [inject:false example](https://github.com/jantimon/html-webpack-plugin/tree/master/examples/custom-insertion-position) |
|     ⭐**`publicPath`**     |        `{String\|'auto'}`         |                       `'auto'`                        | The publicPath used for script and link tags                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|    **`scriptLoading`**     | `{'blocking'\|'defer'\|'module'}` |                       `'defer'`                       | Modern browsers support non blocking javascript loading (`'defer'`) to improve the page startup performance. Setting to `'module'` adds attribute [`type="module"`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#applying_the_module_to_your_html). This also implies "defer", since modules are automatically deferred.                                                                                                                                                                                                  |
|      ⭐**`favicon`**       |            `{String}`             |                          ``                           | Adds the given favicon path to the output HTML                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|      ⭐⭐ **`meta`**       |            `{Object}`             |                         `{}`                          | Allows to inject `meta`-tags. E.g. `meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'}`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
|       ⭐ **`base`**        |     `{Object\|String\|false}`     |                        `false`                        | Inject a [`base`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) tag. E.g. `base: "https://example.com/path/page.html`. The <base> HTML element specifies the base URL to use for **all relative URLs** in a document. There can be only one <base> element in a document.                                                                                                                                                                                                                                                        |
|       ⭐**`minify`**       |        `{Boolean\|Object}`        | `true` if `mode` is `'production'`, otherwise `false` | Controls if and in what ways the output should be minified. See [minification](#minification) below for more details.                                                                                                                                                                                                                                                                                                                                                                                                                              |
|       ⭐⭐**`hash`**       |            `{Boolean}`            |                        `false`                        | If `true` then append a unique `webpack` compilation hash to all included scripts and CSS files. This is useful for cache busting                                                                                                                                                                                                                                                                                                                                                                                                                  |
|       ⭐ **`cache`**       |            `{Boolean}`            |                        `true`                         | Emit the file only if it was changed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|      **`showErrors`**      |            `{Boolean}`            |                        `true`                         | Errors details will be written into the HTML page                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|        **`chunks`**        |               `{?}`               |                          `?`                          | Allows you to add only some chunks (e.g only the unit-test chunk)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|    **`chunksSortMode`**    |       `{String\|Function}`        |                        `auto`                         | Allows to control how chunks should be sorted before they are included to the HTML. Allowed values are `'none' \| 'auto' \| 'manual' \| {Function}`                                                                                                                                                                                                                                                                                                                                                                                                |
|   ⭐**`excludeChunks`**    |        `{Array.<string>}`         |                          ``                           | Allows you to skip some chunks (e.g don't add the unit-test chunk)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|        **`xhtml`**         |            `{Boolean}`            |                        `false`                        | If `true` render the `link` tags as self-closing (XHTML compliant)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

### Writing Your Own Templates

## Reference

- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
- [react-multi-page-app](https://github.com/zhedh/react-multi-page-app.git), 参考项目