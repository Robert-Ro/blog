# Resolve 解析

These options change how modules are resolved. Webpack provides reasonable defaults, but it is possible to change the resolving in detail. Have a look at [Module Resolution](/concepts/module-resolution) for more explanation of how the resolver works.
这些选项能设置模块如何被解析。webpack 提供合理的默认值，但是还是可能会修改一些解析的细节。关于 resolver 具体如何工作的更多解释说明，请查看模块解析。

## resolve

`object`

Configure how modules are resolved. For example, when calling `import 'lodash'` in ES2015, the `resolve` options can change where webpack goes to look for `'lodash'` (see [`modules`](#resolvemodules)).

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    // configuration options
  },
}
```

### resolve.alias✨✨✨

> 地址别名

`object`

Create aliases to `import` or `require` certain modules more easily. For example, to alias a bunch of commonly used `src/` folders:

**webpack.config.js**

```js
const path = require('path')

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
}
```

Now, instead of using relative paths when importing like so:

```js
import Utility from '../../utilities/utility'
```

you can use the alias:

```js
import Utility from 'Utilities/utility'
```

A trailing `$` can also be added to the given object's keys to signify an exact match:

**webpack.config.js**

```js
const path = require('path')

module.exports = {
  //...
  resolve: {
    alias: {
      xyz$: path.resolve(__dirname, 'path/to/file.js'),
    },
  },
}
```

which would yield these results:

```js
import Test1 from 'xyz' // Exact match, so path/to/file.js is resolved and imported
import Test2 from 'xyz/file.js' // Not an exact match, normal resolution takes place
```

The following table explains other cases:

| `alias:`                           | `import 'xyz'`                        | `import 'xyz/file.js'`               |
| ---------------------------------- | ------------------------------------- | ------------------------------------ |
| `{}`                               | `/abc/node_modules/xyz/index.js`      | `/abc/node_modules/xyz/file.js`      |
| `{ xyz: '/abc/path/to/file.js' }`  | `/abc/path/to/file.js`                | error                                |
| `{ xyz$: '/abc/path/to/file.js' }` | `/abc/path/to/file.js`                | `/abc/node_modules/xyz/file.js`      |
| `{ xyz: './dir/file.js' }`         | `/abc/dir/file.js`                    | error                                |
| `{ xyz$: './dir/file.js' }`        | `/abc/dir/file.js`                    | `/abc/node_modules/xyz/file.js`      |
| `{ xyz: '/some/dir' }`             | `/some/dir/index.js`                  | `/some/dir/file.js`                  |
| `{ xyz$: '/some/dir' }`            | `/some/dir/index.js`                  | `/abc/node_modules/xyz/file.js`      |
| `{ xyz: './dir' }`                 | `/abc/dir/index.js`                   | `/abc/dir/file.js`                   |
| `{ xyz: 'modu' }`                  | `/abc/node_modules/modu/index.js`     | `/abc/node_modules/modu/file.js`     |
| `{ xyz$: 'modu' }`                 | `/abc/node_modules/modu/index.js`     | `/abc/node_modules/xyz/file.js`      |
| `{ xyz: 'modu/some/file.js' }`     | `/abc/node_modules/modu/some/file.js` | error                                |
| `{ xyz: 'modu/dir' }`              | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/modu/dir/file.js` |
| `{ xyz$: 'modu/dir' }`             | `/abc/node_modules/modu/dir/index.js` | `/abc/node_modules/xyz/file.js`      |

`index.js` may resolve to another file if defined in the `package.json`.

`/abc/node_modules` may resolve in `/node_modules` too.

W> `resolve.alias` takes precedence over other module resolutions.

W> [`null-loader`](https://github.com/webpack-contrib/null-loader) is deprecated in webpack 5. use `alias: { xyz$: false }` or absolute path `alias: {[path.resolve(__dirname, './path/to/module')]: false }`

W> `[string]` values are supported since webpack 5.

```js
module.exports = {
  //...
  resolve: {
    alias: {
      _: [path.resolve(__dirname, 'src/utilities/'), path.resolve(__dirname, 'src/templates/')],
    },
  },
}
```

Setting `resolve.alias` to `false` will tell webpack to ignore a module.

```js
module.exports = {
  //...
  resolve: {
    alias: {
      'ignored-module': false,
      './ignored-module': false,
    },
  },
}
```

### resolve.aliasFields

`[string]: ['browser']`

Specify a field, such as `browser`, to be parsed according to [this specification](https://github.com/defunctzombie/package-browser-field-spec).

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    aliasFields: ['browser'],
  },
}
```

### resolve.cacheWithContext

`boolean`

If unsafe cache is enabled, includes `request.context` in the cache key. This option is taken into account by the [`enhanced-resolve`](https://github.com/webpack/enhanced-resolve/) module. `context` in resolve caching is ignored when resolve or resolveLoader plugins are provided. This addresses a performance regression.
如果启用了不安全缓存，请在缓存键(cache key)中引入 request.context。这个选项被 enhanced-resolve 模块考虑在内。从 webpack 3.1.0 开始，在配置了 resolve 或 resolveLoader 插件时，解析缓存(resolve caching)中的上下文(context)会被忽略。**这解决了性能衰退的问题**。

### resolve.conditionNames

`string[]`

Condition names for [`exports` field](https://nodejs.org/api/packages.html#packages_exports) which defines entry points of a package.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    conditionNames: ['require', 'node'],
  },
}
```

Webpack will match [export conditions](https://nodejs.org/api/packages.html#conditional-exports) that are listed within the `resolve.conditionNames` array.

The key order in the `exports` field is significant. During condition matching, earlier entries have higher priority and take precedence over later entries.

For example,

**package.json**

```json
{
  "name": "foo",
  "exports": {
    ".": {
      "import": "./index-import.js",
      "require": "./index-require.js",
      "node": "./index-node.js"
    },
    "./bar": {
      "node": "./bar-node.js",
      "require": "./bar-require.js"
    },
    "./baz": {
      "import": "./baz-import.js",
      "node": "./baz-node.js"
    }
  }
}
```

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    conditionNames: ['require', 'node'],
  },
}
```

importing

- `'foo'` will resolve to `'foo/index-require.js'`
- `'foo/bar'` will resolve to `'foo/bar-node.js'` as the `"node"` key comes before `"require"` key in the conditional exports object.
- `'foo/baz'` will resolve to `'foo/baz-node.js'`

### resolve.descriptionFiles

用于描述的 JSON 文件。
`[string] = ['package.json']`

The JSON files to use for descriptions.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    descriptionFiles: ['package.json'],
  },
}
```

### resolve.enforceExtension

`boolean = false`

If `true`, it will not allow extension-less files. So by default `require('./foo')` works if `./foo` has a `.js` extension, but with this enabled only `require('./foo.js')` will work.

**如果是 `true`，将不允许无扩展名文件**。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    enforceExtension: false,
  },
}
```

### resolve.extensionAlias

`object`

An object which maps extension to extension aliases.
一个将拓展名与拓展名别名映射的对象。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    extensionAlias: {
      '.js': ['.ts', '.js'],
      '.mjs': ['.mts', '.mjs'],
    },
  },
}
```

### resolve.extensions ✨✨✨

`[string] = ['.js', '.json', '.wasm']`

Attempt to resolve these extensions in order. If multiple files share the same name but have different extensions, webpack will resolve the one with the extension listed first in the array and skip the rest.
尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    extensions: ['.js', '.json', '.wasm'],
  },
}
```

which is what enables users to leave off the extension when importing:
**能够使用户在引入模块时不带扩展**：

```js
import File from '../path/to/file'
```

Note that using `resolve.extensions` like above will **override the default array**, meaning that webpack will no longer try to resolve modules using the default extensions. **However you can use `'...'` to access the default extensions**:

```js
module.exports = {
  //...
  resolve: {
    extensions: ['.ts', '...'], // <-
  },
}
```

### resolve.fallback

`object`

Redirect module requests when normal resolving fails.
当正常解析失败时，重定向模块请求。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    fallback: {
      abc: false, // do not include a polyfill for abc
      xyz: path.resolve(__dirname, 'path/to/file.js'), // include a polyfill for xyz
    },
  },
}
```

Webpack 5 no longer polyfills Node.js core modules automatically which means if you use them in your code running in browsers or alike, you will have to install compatible modules from npm and include them yourself. Here is a list of polyfills webpack has used before webpack 5:
webpack 5 不再自动 polyfill Node.js 的核心模块，这意味着如果你在浏览器或类似的环境中运行的代码中使用它们，你必须从 NPM 中安装兼容的模块，并自己包含它们。以下是 webpack 在 webpack 5 之前使用过的 polyfill 包列表：

```js
module.exports = {
  //...
  resolve: {
    fallback: {
      assert: require.resolve('assert'),
      buffer: require.resolve('buffer'),
      console: require.resolve('console-browserify'),
      constants: require.resolve('constants-browserify'),
      crypto: require.resolve('crypto-browserify'),
      domain: require.resolve('domain-browser'),
      events: require.resolve('events'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      punycode: require.resolve('punycode'),
      process: require.resolve('process/browser'),
      querystring: require.resolve('querystring-es3'),
      stream: require.resolve('stream-browserify'),
      string_decoder: require.resolve('string_decoder'),
      sys: require.resolve('util'),
      timers: require.resolve('timers-browserify'),
      tty: require.resolve('tty-browserify'),
      url: require.resolve('url'),
      util: require.resolve('util'),
      vm: require.resolve('vm-browserify'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
}
```

### resolve.mainFields

`[string]`

When importing from an npm package, e.g. `import * as D3 from 'd3'`, this option will determine which fields in its `package.json` are checked. The default values will vary based upon the [`target`](/concepts/targets) specified in your webpack configuration.
当从 npm 包中导入模块时（例如，`import * as D3 from 'd3'`），此选项将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同。

When the `target` property is set to `webworker`, `web`, or left unspecified:

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    mainFields: ['browser', 'module', 'main'],
  },
}
```

For any other target (including `node`):

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    mainFields: ['module', 'main'],
  },
}
```

For example, consider an arbitrary library called `upstream` with a `package.json` that contains the following fields:

```json
{
  "browser": "build/upstream.js",
  "module": "index"
}
```

When we `import * as Upstream from 'upstream'` this will actually resolve to the file in the `browser` property. The `browser` property takes precedence because it's the first item in `mainFields`. Meanwhile, a Node.js application bundled by webpack will first try to resolve using the file in the `module` field.

### resolve.mainFiles ✨

`[string] = ['index']`

The filename to be used while resolving directories.
解析目录时要使用的文件名。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    mainFiles: ['index'],
  },
}
```

### resolve.exportsFields

`[string] = ['exports']`

Fields in package.json that are used for resolving module requests. See [package-exports guideline](/guides/package-exports/) for more information.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    exportsFields: ['exports', 'myCompanyExports'],
  },
}
```

### resolve.modules✨

`[string] = ['node_modules']`

Tell webpack what directories should be searched when resolving modules.
告诉 webpack 解析模块时应该搜索的目录。

Absolute and relative paths can both be used, but be aware that they will behave a bit differently.
绝对路径和相对路径都能使用，但是要知道它们之间有一点差异。

A relative path will be scanned similarly to how Node scans for `node_modules`, by looking through the current directory as well as its ancestors (i.e. `./node_modules`, `../node_modules`, and on).

With an absolute path, it will only search in the given directory.
使用绝对路径，将只在给定目录中搜索。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    modules: ['node_modules'],
  },
}
```

If you want to add a directory to search in that takes precedence over `node_modules/`:
如果你想要添加一个目录到模块搜索目录，此目录优先于 `node_modules/` 搜索：

**webpack.config.js**

```js
const path = require('path')

module.exports = {
  //...
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}
```

### resolve.unsafeCache✨

`RegExp` `[RegExp]` `boolean: true`

Enable aggressive, but **unsafe**, caching of modules. Passing `true` will cache everything.
启用，会主动缓存模块，但并 **不安全**。传递 `true`` 将缓存一切。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    unsafeCache: true,
  },
}
```

A regular expression, or an array of regular expressions, can be used to test file paths and only cache certain modules. For example, to only cache utilities:

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    unsafeCache: /src\/utilities/,
  },
}
```

> Changes to cached paths may cause failure in rare cases.

### resolve.useSyncFileSystemCalls

`boolean`

Use synchronous filesystem calls for the resolver.
对 `resolver` 使用同步文件系统调用。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    useSyncFileSystemCalls: true,
  },
}
```

### resolve.plugins

[`[Plugin]`](/plugins/)

A list of additional resolve plugins which should be applied. It allows plugins such as [`DirectoryNamedWebpackPlugin`](https://www.npmjs.com/package/directory-named-webpack-plugin).
应该使用的额外的解析插件列表。 它允许插件，如 DirectoryNamedWebpackPlugin。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    plugins: [new DirectoryNamedWebpackPlugin()],
  },
}
```

### resolve.preferRelative

`boolean`

When enabled, webpack would prefer to resolve module requests as relative requests instead of using modules from `node_modules` directories.
当启用此选项时，webpack 更倾向于将模块请求解析为相对请求，而不使用来自 node_modules 目录下的模块。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    preferRelative: true,
  },
}
```

**src/index.js**

```js
// let's say `src/logo.svg` exists
import logo1 from 'logo.svg' // this is viable when `preferRelative` enabled
import logo2 from './logo.svg' // otherwise you can only use relative path to resolve logo.svg

// `preferRelative` is enabled by default for `new URL()` case
const b = new URL('module/path', import.meta.url)
const a = new URL('./module/path', import.meta.url)
```

### resolve.preferAbsolute

`boolean`

<Badge text="5.13.0+" />

Prefer absolute paths to [`resolve.roots`](#resolveroots) when resolving.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    preferAbsolute: true,
  },
}
```

### resolve.symlinks

`boolean = true`

Whether to resolve symlinks to their symlinked location.
是否将符号链接(symlink)解析到它们的符号链接位置(symlink location)。

When enabled, symlinked resources are resolved to their _real_ path, not their symlinked location. Note that this may cause module resolution to fail when using tools that symlink packages (like `npm link`).
启用时，符号链接(symlink)的资源，将解析为其 真实 路径，而不是其符号链接(symlink)的位置。注意，当使用创建符号链接包的工具（如 `npm link`）时，这种方式可能会导致模块解析失败。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    symlinks: true,
  },
}
```

### resolve.cachePredicate

`function(module) => boolean`

A function which decides whether a request should be cached or not. An object is passed to the function with `path` and `request` properties. It must return a boolean.
决定请求是否应该被缓存的函数。函数传入一个带有 `path` 和 `request` 属性的对象。 必须返回一个 boolean 值。

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    cachePredicate: (module) => {
      // additional logic
      return true
    },
  },
}
```

### resolve.restrictions

`[string, RegExp]`

A list of resolve restrictions to restrict the paths that a request can be resolved on.

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    restrictions: [/\.(sass|scss|css)$/],
  },
}
```

### resolve.roots

`[string]`

A list of directories where requests of server-relative URLs (starting with '/') are resolved, defaults to [`context` configuration option](/configuration/entry-context/#context). On non-Windows systems these requests are resolved as an absolute path first.

**webpack.config.js**

```js
const fixtures = path.resolve(__dirname, 'fixtures')
module.exports = {
  //...
  resolve: {
    roots: [__dirname, fixtures],
  },
}
```

### resolve.importsFields

`[string]`

Fields from `package.json` which are used to provide the internal requests of a package (requests starting with `#` are considered internal).

**webpack.config.js**

```js
module.exports = {
  //...
  resolve: {
    importsFields: ['browser', 'module', 'main'],
  },
}
```

### resolve.byDependency

Configure resolve options by the type of module request.

- Type: `[type: string]: ResolveOptions`
- Example:

  ```js
  module.exports = {
    // ...
    resolve: {
      byDependency: {
        // ...
        esm: {
          mainFields: ['browser', 'module'],
        },
        commonjs: {
          aliasFields: ['browser'],
        },
        url: {
          preferRelative: true,
        },
      },
    },
  }
  ```

## resolveLoader

`object { modules [string] = ['node_modules'], extensions [string] = ['.js', '.json'], mainFields [string] = ['loader', 'main']}`

This set of options is identical to the `resolve` property set above, but is used only to resolve webpack's [loader](/concepts/loaders) packages.
这组选项与上面的 `resolve` 对象的属性集合相同， 但仅用于解析 webpack 的 `loader` 包。

**webpack.config.js**

```js
module.exports = {
  //...
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
}
```

> Note that you can use alias here and other features familiar from resolve. For example `{ txt: 'raw-loader' }` would shim `txt!templates/demo.txt` to use `raw-loader`.
