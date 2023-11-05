# Module Resolution 模块解析

A resolver is a library which helps in **locating a module** by **its absolute path**. A module can be required as a dependency from another module as:

```js
import foo from 'path/to/module'
// or
require('path/to/module')
```

The dependency module can be from the application code or a third-party library. The resolver helps webpack find the module code that needs to be included in the bundle for every such `require`/`import` statement. webpack uses [enhanced-resolve](https://github.com/webpack/enhanced-resolve) to resolve file paths while bundling modules.

## Resolving rules in webpack webpack 中的解析规则

Using `enhanced-resolve`, webpack can resolve three kinds of file paths:

### Absolute paths 绝对路径

```js
import '/home/me/file'

import 'C:\\Users\\me\\file'
```

Since we already have the absolute path to the file, _no further resolution is required_.

### Relative paths 相对路径

```js
import '../src/file1'
import './file2'
```

In this case, the directory of the source file where the import or require occurs is taken to be the context directory. The relative path specified in the `import`/`require` is joined to this context path to **produce the absolute path to the module**.

### Module paths 模块路径

```js
import 'module'
import 'module/lib/file'
```

Modules are searched for inside all directories specified in `resolve.modules`. You can replace the original module path by an alternate path by creating an alias for it using the `resolve.alias` configuration option.

- If the package contains a `package.json` file, then fields specified in `resolve.exportsFields` configuration options are looked up in order, and the first such field in `package.json` determines the available exports from the package according to the [package exports guideline](https://webpack.js.org/guides/package-exports/).

Once the path is resolved based on the above rule, the resolver checks to see if the path points to **a file** or **a directory**. If the path points to a file:

- **If the path has a file extension, then the file is bundled straightaway**.
- Otherwise, the file extension is resolved using the `resolve.extensions` option, which tells the resolver which extensions are acceptable for resolution e.g. `.js`, `.jsx`.

**If the path points to a folder**, then the following steps are taken to find the right file with the right extension:

- If the folder contains a `package.json` file, then fields specified in `resolve.mainFields` configuration option are looked up in order, and the first such field in `package.json` determines the file path.
- If there is no `package.json` or if the `resolve.mainFields` do not return a valid path, file names specified in the `resolve.mainFiles` configuration option are looked for in order, to see if a matching filename exists in the imported/required directory.
- The file extension is then resolved in a similar way using the `resolve.extensions` option.

Webpack provides reasonable [defaults](https://webpack.js.org/configuration/resolve) for these options depending on your build target.

## Resolving Loaders 解析 loader

This follows the same rules as those specified for file resolution. But the [`resolveLoader`](https://webpack.js.org/configuration/resolve/#resolveloader) configuration option can be used to have separate resolution rules for loaders.

## Caching

**Every filesystem access is cached** so that **multiple parallel** or **serial requests** to the same file occur faster. In [watch mode](https://webpack.js.org/configuration/watch/#watch), only modified files are evicted from the cache. If watch mode is off, then the cache gets purged before every compilation.
每次文件系统访问文件都会被缓存，以便于更快触发对同一文件的多个并行或串行请求。在 `watch 模式` 下，只有修改过的文件会被从缓存中移出。如果关闭 watch 模式，则会在每次编译前清理缓存。

> 使用了 webpack-dev-server，则默认开启`watch`

See [Resolve API](https://webpack.js.org/configuration/resolve) to learn more about the configuration options mentioned above.
