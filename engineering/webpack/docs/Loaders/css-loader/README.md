# css-loader

The `css-loader` interprets `@import` and `url()` like `import/require()` and will resolve them.

## Getting Started

> **Warning**
>
> To use the latest version of css-loader, webpack@5 is required

To begin, you'll need to install `css-loader`:

```console
npm install --save-dev css-loader
```

or

```console
yarn add -D css-loader
```

or

```console
pnpm add -D css-loader
```

Then add the plugin to your `webpack` config. For example:

**file.js**

```js
import css from 'file.css'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
```

And run `webpack` via your preferred method.

## Options

- **[`url`](#url)**
- **[`import`](#import)**
- **[`modules`](#modules)**
- **[`sourceMap`](#sourcemap)**
- **[`importLoaders`](#importloaders)**
- **[`esModule`](#esmodule)**
- **[`exportType`](#exporttype)**

### `url`✨

> 一般不进行自定义配置

Type:

```ts
type url =
  | boolean
  | {
      filter: (url: string, resourcePath: string) => boolean
    }
```

Default: `true` 默认开启

Allow to enable/disables handling the CSS functions `url` and `image-set`. 启用 css 函数：`url`和`image-set`
If set to `false`, `css-loader` will not parse any paths specified in `url` or `image-set`.
A function can also be passed to control this behavior dynamically based on the path to the asset.
Starting with version [4.0.0](https://github.com/webpack-contrib/css-loader/blob/master/CHANGELOG.md#400-2020-07-25), absolute paths are parsed based on the server root.

Examples resolutions:

```js
url(image.png) => require('./image.png')
url('image.png') => require('./image.png')
url(./image.png) => require('./image.png')
url('./image.png') => require('./image.png')
url('http://dontwritehorriblecode.com/2112.png') => require('http://dontwritehorriblecode.com/2112.png')
image-set(url('image2x.png') 1x, url('image1x.png') 2x) => require('./image1x.png') and require('./image2x.png')
```

To import assets from a `node_modules` path (include `resolve.modules`) and for `alias`, prefix it with a `~`:

```js
url(~module/image.png) => require('module/image.png')
url('~module/image.png') => require('module/image.png')
url(~aliasDirectory/image.png) => require('otherDirectory/image.png')
```

#### `boolean`

Enable/disable `url()` resolving.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          url: true,
        },
      },
    ],
  },
}
```

#### `object`

Allow to filter `url()`. All filtered `url()` will not be resolved (left in the code as they were written).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          url: {
            filter: (url, resourcePath) => {
              // resourcePath - path to css file

              // Don't handle `img.png` urls
              if (url.includes('img.png')) {
                return false
              }

              // Don't handle images under root-relative /external_images/
              if (/^\/external_images\//.test(path)) {
                return false
              }

              return true
            },
          },
        },
      },
    ],
  },
}
```

### `import`✨

> 一般不进行自定义配置

Type:

<!-- use other name to prettify since import is reserved keyword -->

```ts
type importFn =
  | boolean
  | {
      filter: (url: string, media: string, resourcePath: string, supports?: string, layer?: string) => boolean
    }
```

Default: `true` 默认启用

**Allows to enables/disables `@import` at-rules handling**.
Control `@import` resolving. Absolute urls in `@import` will be moved in runtime code.

Examples resolutions:

```css
@import 'style.css' => require('./style.css');
@import url(style.css) => require('./style.css');
@import url('style.css') => require('./style.css');
@import './style.css' => require('./style.css');
@import url(./style.css) => require('./style.css');
@import url('./style.css') => require('./style.css');
@import url('http://dontwritehorriblecode.com/style.css') => @import url('http://dontwritehorriblecode.com/style.css')
  in runtime;
```

To import styles from a `node_modules` path (include `resolve.modules`) and for `alias`, prefix it with a `~`:

```css
@import url(~module/style.css) => require('module/style.css');
@import url('~module/style.css') => require('module/style.css');
@import url(~aliasDirectory/style.css) => require('otherDirectory/style.css');
```

#### `boolean`

Enable/disable `@import` resolving.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: true,
        },
      },
    ],
  },
}
```

#### `object`

##### `filter`

Type:

```ts
type filter = (url: string, media: string, resourcePath: string) => boolean
```

Default: `undefined`

Allow to filter `@import`. All filtered `@import` will not be resolved (left in the code as they were written).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          import: {
            filter: (url, media, resourcePath) => {
              // resourcePath - path to css file

              // Don't handle `style.css` import
              if (url.includes('style.css')) {
                return false
              }

              return true
            },
          },
        },
      },
    ],
  },
}
```

### `modules` CSS 模块化 ✨✨✨

Type:

```ts
type modules =
  | boolean
  | 'local'
  | 'global'
  | 'pure'
  | 'icss'
  | {
      auto: boolean | regExp | ((resourcePath: string) => boolean)
      mode: 'local' | 'global' | 'pure' | 'icss' | ((resourcePath) => 'local' | 'global' | 'pure' | 'icss')
      localIdentName: string
      localIdentContext: string
      localIdentHashSalt: string
      localIdentHashFunction: string
      localIdentHashDigest: string
      localIdentRegExp: string | regExp
      getLocalIdent: (context: LoaderContext, localIdentName: string, localName: string) => string
      namedExport: boolean
      exportGlobals: boolean
      exportLocalsConvention:
        | 'asIs'
        | 'camelCase'
        | 'camelCaseOnly'
        | 'dashes'
        | 'dashesOnly'
        | ((name: string) => string)
      exportOnlyLocals: boolean
    }
```

Default: `undefined`

**Allows to enable/disable CSS Modules or ICSS and setup configuration**:

- `undefined`✨✨✨ - enable CSS modules for all files matching `/\.module\.\w+$/i.test(filename)` and `/\.icss\.\w+$/i.test(filename)` regexp.
- `true`✨✨✨ - enable CSS modules for all files.
- `false`✨✨✨ - disables CSS Modules for all files.
- `string` - disables CSS Modules for all files and set the `mode` option, more information you can read [here](https://github.com/webpack-contrib/css-loader#mode)
- `object` - enable CSS modules for all files, if `modules.auto` option is not specified, otherwise the `modules.auto` option will determine whether if it is CSS modules or not, more information you can read [here](https://github.com/webpack-contrib/css-loader#auto)

The `modules` option enables/disables the **[CSS Modules](https://github.com/css-modules/css-modules)** specification and setup basic behaviour.

Using `false` value increase performance because we avoid parsing **CSS Modules** features, it will be useful for developers who use vanilla css or use other technologies.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  },
}
```

#### `Features`

##### `Scope`

Using `local` value requires you to specify `:global` classes.
Using `global` value requires you to specify `:local` classes.
Using `pure` value requires selectors must contain at least one local class or id.

You can find more information [here](https://github.com/css-modules/css-modules).

Styles can be locally scoped to avoid globally scoping styles.

The syntax `:local(.className)` can be used to declare `className` in the local scope. The local identifiers are exported by the module.

With `:local` (without brackets) local mode can be switched on for this selector.
The `:global(.className)` notation can be used to declare an explicit global selector.
With `:global` (without brackets) global mode can be switched on for this selector.

The loader replaces local selectors with unique identifiers. The chosen unique identifiers are exported by the module.

```css
:local(.className) {
  background: red;
}
:local .className {
  color: green;
}
:local(.className .subClass) {
  color: green;
}
:local .className .subClass :global(.global-class-name) {
  color: blue;
}
```

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
}
._23_aKvs-b8bW2Vg3fwHozO {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 {
  color: green;
}
._23_aKvs-b8bW2Vg3fwHozO ._13LGdX8RMStbBE9w-t0gZ1 .global-class-name {
  color: blue;
}
```

> **Note**
>
> Identifiers are exported

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1',
}
```

CamelCase is recommended for local selectors. They are easier to use within the imported JS module.

You can use `:local(#someId)`, but this is not recommended. Use classes instead of ids.

##### `Composing`

When declaring a local classname you can compose a local class from another local classname.

```css
:local(.className) {
  background: red;
  color: yellow;
}

:local(.subClass) {
  composes: className;
  background: blue;
}
```

This doesn't result in any change to the CSS itself but exports multiple classnames.

```js
exports.locals = {
  className: '_23_aKvs-b8bW2Vg3fwHozO',
  subClass: '_13LGdX8RMStbBE9w-t0gZ1 _23_aKvs-b8bW2Vg3fwHozO',
}
```

```css
._23_aKvs-b8bW2Vg3fwHozO {
  background: red;
  color: yellow;
}

._13LGdX8RMStbBE9w-t0gZ1 {
  background: blue;
}
```

##### `Importing`

To import a local classname from another module.

> **Note**
>
> We strongly recommend that you specify the extension when importing a file, since it is possible to import a file with any extension and it is not known in advance which file to use.

```css
:local(.continueButton) {
  composes: button from 'library/button.css';
  background: red;
}
```

```css
:local(.nameEdit) {
  composes: edit highlight from './edit.css';
  background: red;
}
```

To import from multiple modules use multiple `composes:` rules.

```css
:local(.className) {
  composes: edit highlight from './edit.css';
  composes: button from 'module/button.css';
  composes: classFromThisModule;
  background: red;
}
```

##### `Values`

You can use `@value` to specific values to be reused throughout a document.

We recommend use prefix `v-` for values, `s-` for selectors and `m-` for media at-rules.

```css
@value v-primary: #BF4040;
@value s-black: black-selector;
@value m-large: (min-width: 960px);

.header {
  color: v-primary;
  padding: 0 10px;
}

.s-black {
  color: black;
}

@media m-large {
  .header {
    padding: 0 20px;
  }
}
```

#### `boolean`

Enable **CSS Modules** features.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: true,
        },
      },
    ],
  },
}
```

#### `string`

Enable **CSS Modules** features and setup `mode`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          // Using `local` value has same effect like using `modules: true`
          modules: 'global',
        },
      },
    ],
  },
}
```

#### `object`

Enable **CSS Modules** features and setup options for them.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'local',
            auto: true,
            exportGlobals: true,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            localIdentContext: path.resolve(__dirname, 'src'),
            localIdentHashSalt: 'my-custom-hash',
            namedExport: true,
            exportLocalsConvention: 'camelCase',
            exportOnlyLocals: false,
          },
        },
      },
    ],
  },
}
```

##### `auto`✨✨

Type:

```ts
type auto = boolean | regExp | ((resourcePath: string) => boolean)
```

Default: `undefined`

Allows auto enable CSS modules/ICSS based on filename when `modules` option is object.

Possible values:

- `undefined` - enable CSS modules for all files.
- `true` - enable CSS modules for all files matching `/\.module\.\w+$/i.test(filename)` and `/\.icss\.\w+$/i.test(filename)` regexp.
- `false` - disables CSS Modules.
- `RegExp` - enable CSS modules for all files matching `/RegExp/i.test(filename)` regexp.
- `function` - enable CSS Modules for files based on the filename satisfying your filter function check.

###### `boolean`

Possible values:

- `true` - enables CSS modules or interoperable CSS format, sets the [`modules.mode`](#mode) option to `local` value for all files which satisfy `/\.module(s)?\.\w+$/i.test(filename)` condition or sets the [`modules.mode`](#mode) option to `icss` value for all files which satisfy `/\.icss\.\w+$/i.test(filename)` condition
- `false` - disables CSS modules or interoperable CSS format based on filename

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            auto: true,
          },
        },
      },
    ],
  },
}
```

###### `RegExp`

Enable CSS modules for files based on the filename satisfying your regex check.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.custom-module\.\w+$/i,
          },
        },
      },
    ],
  },
}
```

###### `function`

Enable CSS modules for files based on the filename satisfying your filter function check.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resourcePath) => resourcePath.endsWith('.custom-module.css'),
          },
        },
      },
    ],
  },
}
```

##### `mode`✨

> local：每个 CSS 类名都会被局部作用域化，只在当前模块中有效。这意味着你可以在不同的模块中使用相同的类名，而不会发生冲突。

Type:

```ts
type mode = 'local' | 'global' | 'pure' | 'icss' | ((resourcePath: string) => 'local' | 'global' | 'pure' | 'icss')
```

Default: `'local'`

Setup `mode` option. You can omit the value when you want `local` mode.

Controls the level of compilation applied to the input styles. 控制应用于输入样式的编译级别。

The `local`, `global`, and `pure` handles `class` and `id` scoping and `@value` values.
The `icss` will only compile the low level `Interoperable CSS` format for declaring `:import` and `:export` dependencies between CSS and other languages.

ICSS underpins CSS Module support, and provides a low level syntax for other tools to implement CSS-module variations of their own.

###### `string`

Possible values - `local`, `global`, `pure`, and `icss`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            mode: 'global',
          },
        },
      },
    ],
  },
}
```

###### `function`

Allows set different values for the `mode` option based on a filename

Possible return values - `local`, `global`, `pure` and `icss`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            // Callback must return "local", "global", or "pure" values
            mode: (resourcePath) => {
              if (/pure.css$/i.test(resourcePath)) {
                return 'pure'
              }

              if (/global.css$/i.test(resourcePath)) {
                return 'global'
              }

              return 'local'
            },
          },
        },
      },
    ],
  },
}
```

##### `localIdentName`✨✨✨

Type:

```ts
type localIdentName = string
```

Default: `'[hash:base64]'`

Allows to configure the generated local ident name.允许配置生成的本地标识符(ident)。

For more information on options see:

- [webpack template strings](https://webpack.js.org/configuration/output/#template-strings),
- [output.hashDigest](https://webpack.js.org/configuration/output/#outputhashdigest),
- [output.hashDigestLength](https://webpack.js.org/configuration/output/#outputhashdigestlength),
- [output.hashFunction](https://webpack.js.org/configuration/output/#outputhashfunction),
- [output.hashSalt](https://webpack.js.org/configuration/output/#outputhashsalt).

Supported template strings 支持的字符串变量:

- `[name]`✨✨ the basename of the resource 源文件名称
- `[folder]` the folder the resource relative to the `compiler.context` option or `modules.localIdentContext` option. 文件夹相对于 `compiler.context` 或者 `modules.localIdentContext` 配置项的相对路径。
- `[path]` the path of the resource relative to the `compiler.context` option or `modules.localIdentContext` option. 源文件相对于 `compiler.context` 或者 `modules.localIdentContext` 配置项的相对路径。
- `[file]`✨✨ - filename and path.文件名和路径。
- `[ext]` - extension with leading `.`. 文件拓展名。
- `[hash]`✨✨✨ - the hash of the string, generated based on `localIdentHashSalt`, `localIdentHashFunction`, `localIdentHashDigest`, `localIdentHashDigestLength`, `localIdentContext`, `resourcePath` and `exportName` 字符串的哈希值
- `[<hashFunction>:hash:<hashDigest>:<hashDigestLength>]`✨✨✨ - hash with hash settings. 带有哈希设置的哈希
- `[local]`✨✨✨ - original class. 原始类名

Recommendations:

- use `'[path][name]__[local]'` for development ✨✨
- use `'[hash:base64]'` for production ✨✨✨

The `[local]` placeholder contains original class.

**Note:** all reserved (`<>:"/\|?*`) and control filesystem characters (excluding characters in the `[local]` placeholder) will be converted to `-`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
      },
    ],
  },
}
```

##### `localIdentContext`

Type:

```ts
type localIdentContex = string
```

Default: `compiler.context`

Allows to redefine basic loader context for local ident name.允许为本地标识符名称重新定义基本的 loader 上下文。

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentContext: path.resolve(__dirname, 'src'),
          },
        },
      },
    ],
  },
}
```

##### `localIdentHashSalt` 盐值 ✨

Type:

```ts
type localIdentHashSalt = string
```

Default: `undefined`

Allows to add custom hash to generate more unique classes.允许添加自定义哈希值以生成更多唯一类
For more information see [output.hashSalt](https://webpack.js.org/configuration/output/#outputhashsalt).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentHashSalt: 'hash',
          },
        },
      },
    ],
  },
}
```

##### `localIdentHashFunction` hash function✨✨

Type:

```ts
type localIdentHashFunction = string
```

Default: `md4`

Allows to specify hash function to generate classes .
For more information see [output.hashFunction](https://webpack.js.org/configuration/output/#outputhashfunction).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentHashFunction: 'md4',
          },
        },
      },
    ],
  },
}
```

##### `localIdentHashDigest`

Type:

```ts
type localIdentHashDigest = string
```

Default: `hex`

Allows to specify hash digest to generate classes.
For more information see [output.hashDigest](https://webpack.js.org/configuration/output/#outputhashdigest).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentHashDigest: 'base64',
          },
        },
      },
    ],
  },
}
```

##### `localIdentHashDigestLength`✨

Type:

```ts
type localIdentHashDigestLength = number
```

Default: `20`

Allows to specify hash digest length to generate classes.
For more information see [output.hashDigestLength](https://webpack.js.org/configuration/output/#outputhashdigestlength).

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentHashDigestLength: 5,
          },
        },
      },
    ],
  },
}
```

##### `hashStrategy`

Type: `'resource-path-and-local-name' | 'minimal-subset'`
Default: `'resource-path-and-local-name'`

Should local name be used when computing the hash.

- `'resource-path-and-local-name'` Both resource path and local name are used when hashing. Each identifier in a module gets its own hash digest, always.
- `'minimal-subset'` Auto detect if identifier names can be omitted from hashing. Use this value to optimize the output for better GZIP or Brotli compression.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            hashStrategy: 'minimal-subset',
          },
        },
      },
    ],
  },
}
```

##### `localIdentRegExp`

Type:

```ts
type localIdentRegExp = string | RegExp
```

Default: `undefined`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentRegExp: /page-(.*)\.css/i,
          },
        },
      },
    ],
  },
}
```

##### `getLocalIdent`

Type:

```ts
type getLocalIdent = (context: LoaderContext, localIdentName: string, localName: string) => string
```

Default: `undefined`

Allows to specify a function to generate the classname.
By default we use built-in function to generate a classname.
If the custom function returns `null` or `undefined`, we fallback to the
built-in function to generate the classname.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            getLocalIdent: (context, localIdentName, localName, options) => {
              return 'whatever_random_class_name'
            },
          },
        },
      },
    ],
  },
}
```

##### `namedExport`✨✨

Type:

```ts
type namedExport = boolean
```

Default: `false`

Enables/disables ES modules named export for locals.

> **Warning**
>
> Names of locals are converted to camelcase, i.e. the `exportLocalsConvention` option has `camelCaseOnly` value by default.

> **Warning**
>
> It is not allowed to use JavaScript reserved words in css class names.

**styles.css**

```css
.foo-baz {
  color: red;
}
.bar {
  color: blue;
}
```

**index.js**

```js
import { fooBaz, bar } from './styles.css'

console.log(fooBaz, bar)
```

You can enable a ES module named export using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          esModule: true,
          modules: {
            namedExport: true,
          },
        },
      },
    ],
  },
}
```

To set a custom name for namedExport, can use [`exportLocalsConvention`](#exportLocalsConvention) option as a function.
Example below in the [`examples`](#examples) section.

##### `exportGlobals`

// FIXME 作用?

Type:

```ts
type exportsGLobals = boolean
```

Default: `false`

Allow `css-loader` to export names from global class or id, so you can use that as local name.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            exportGlobals: true,
          },
        },
      },
    ],
  },
}
```

##### `exportLocalsConvention`

Type:

```ts
type exportLocalsConvention =
  | 'asIs'
  | 'camelCase'
  | 'camelCaseOnly'
  | 'dashes'
  | 'dashesOnly'
  | ((name: string) => string)
```

Default: based on the `modules.namedExport` option value, if `true` - `camelCaseOnly`, otherwise `asIs`

Style of exported class names.

###### `string`

By default, the exported JSON keys mirror the class names (i.e `asIs` value).

> **Warning**
>
> Only `camelCaseOnly` value allowed if you set the `namedExport` value to `true`.

|         Name          |   Type   | Description                                                                                      |
| :-------------------: | :------: | :----------------------------------------------------------------------------------------------- |
|     **`'asIs'`**      | `string` | Class names will be exported as is.                                                              |
|   **`'camelCase'`**   | `string` | Class names will be camelized, the original class name will not to be removed from the locals    |
| **`'camelCaseOnly'`** | `string` | Class names will be camelized, the original class name will be removed from the locals           |
|    **`'dashes'`**     | `string` | Only dashes in class names will be camelized                                                     |
|  **`'dashesOnly'`**   | `string` | Dashes in class names will be camelized, the original class name will be removed from the locals |

**file.css**

```css
.class-name {
}
```

**file.js**

```js
import { className } from 'file.css'
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            exportLocalsConvention: 'camelCase',
          },
        },
      },
    ],
  },
}
```

###### `function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            exportLocalsConvention: function (name) {
              return name.replace(/-/g, '_')
            },
          },
        },
      },
    ],
  },
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            exportLocalsConvention: function (name) {
              return [
                name.replace(/-/g, '_'),
                // dashesCamelCase
                name.replace(/-+(\w)/g, (match, firstLetter) => firstLetter.toUpperCase()),
              ]
            },
          },
        },
      },
    ],
  },
}
```

##### `exportOnlyLocals`

Type:

```ts
type exportOnlyLocals = boolean
```

Default: `false`

Export only locals.

**Useful** when you use **css modules** for pre-rendering (for example SSR).
For pre-rendering with `mini-css-extract-plugin` you should use this option instead of `style-loader!css-loader` **in the pre-rendering bundle**.
It doesn't embed CSS but only exports the identifier mappings.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          modules: {
            exportOnlyLocals: true,
          },
        },
      },
    ],
  },
}
```

### `importLoaders` ✨✨

> 当 importLoaders 的值为 0 时，`css-loader`只会应用于当前的 CSS 文件，不会应用于通过`@import`引入的其他 CSS 文件。这在许多情况下是足够的，特别是当你的 CSS 文件中没有使用@import 语句或者你已经通过其他方式处理了@import 语句。
> Type:

```ts
type importLoaders = number
```

Default: `0`

Allows to enables/disables or setups number of loaders applied before CSS loader for `@import` at-rules, CSS modules and ICSS imports, i.e. `@import`/`composes`/`@value value from './values.css'`/etc.

允许为 **`@import` 样式规则**、CSS 模块或者 ICSS 启用/禁用或设置在 CSS loader 之前应用的 loader 的数量，例如：`@import/composes/@value value from './values.css'` 等。

The option `importLoaders` allows you to configure how many loaders before `css-loader` should be applied to `@import`ed resources and CSS modules/ICSS imports.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
}
```

This may change in the future when the module system (i. e. webpack) supports loader matching by origin.

### `sourceMap`✨

Type:

```ts
type sourceMap = boolean
```

Default: depends on the `compiler.devtool` value

By default generation of source maps depends on the [`devtool`](https://webpack.js.org/configuration/devtool/) option. All values enable source map generation except `eval` and `false` value.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
}
```

### `esModule`✨✨

Type:

```ts
type esModule = boolean
```

Default: `true`

By default, `css-loader` generates JS modules that use the ES modules syntax.
There are some cases in which using ES modules is beneficial, like in the case of [module concatenation](https://webpack.js.org/plugins/module-concatenation-plugin/) and [tree shaking](https://webpack.js.org/guides/tree-shaking/).

You can enable a CommonJS modules syntax using:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'css-loader',
        options: {
          esModule: false,
        },
      },
    ],
  },
}
```

### `exportType` ✨

Type:

```ts
type exportType = 'array' | 'string' | 'css-style-sheet'
```

Default: `'array'`

Allows exporting styles as array with modules, string or [constructable stylesheet](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) (i.e. [`CSSStyleSheet`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)).
Default value is `'array'`, i.e. loader exports array of modules with specific API which is used in `style-loader` or other.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        assert: { type: 'css' },
        loader: 'css-loader',
        options: {
          exportType: 'css-style-sheet',
        },
      },
    ],
  },
}
```

**src/index.js**

```js
import sheet from './styles.css' assert { type: 'css' }

document.adoptedStyleSheets = [sheet]
shadowRoot.adoptedStyleSheets = [sheet]
```

#### `'array'`

The default export is array of modules with specific API which is used in `style-loader` or other.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
}
```

**src/index.js**

```js
// `style-loader` applies styles to DOM
import './styles.css'
```

#### `'string'`

> **Warning**
>
> You don't need [`style-loader`](https://github.com/webpack-contrib/style-loader) anymore, please remove it.

> **Warning**
>
> The `esModules` option should be enabled if you want to use it with [`CSS modules`](https://github.com/webpack-contrib/css-loader#modules), by default for locals will be used [named export](https://github.com/webpack-contrib/css-loader#namedexport).

The default export is `string`.

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ['css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
}
```

**src/index.js**

```js
import sheet from './styles.css'

console.log(sheet)
```

#### `'css-style-sheet'`

> **Warning**
>
> `@import` rules not yet allowed, more [information](https://web.dev/css-module-scripts/#@import-rules-not-yet-allowed)

> **Warning**
>
> You don't need [`style-loader`](https://github.com/webpack-contrib/style-loader) anymore, please remove it.

> **Warning**
>
> The `esModules` option should be enabled if you want to use it with [`CSS modules`](https://github.com/webpack-contrib/css-loader#modules), by default for locals will be used [named export](https://github.com/webpack-contrib/css-loader#namedexport).

> **Warning**
>
> Source maps are not currently supported in `Chrome` due [bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1174094&q=CSSStyleSheet%20source%20maps&can=2)

The default export is a [constructable stylesheet](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) (i.e. [`CSSStyleSheet`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet)).

Useful for [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) and shadow DOM.

More information:

- [Using CSS Module Scripts to import stylesheets](https://web.dev/css-module-scripts/)
- [Constructable Stylesheets: seamless reusable styles](https://developers.google.com/web/updates/2019/02/constructable-stylesheets)

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        assert: { type: 'css' },
        loader: 'css-loader',
        options: {
          exportType: 'css-style-sheet',
        },
      },

      // For Sass/SCSS:
      //
      // {
      //   assert: { type: "css" },
      //   rules: [
      //     {
      //       loader: "css-loader",
      //       options: {
      //         exportType: "css-style-sheet",
      //         // Other options
      //       },
      //     },
      //     {
      //       loader: "sass-loader",
      //       options: {
      //         // Other options
      //       },
      //     },
      //   ],
      // },
    ],
  },
}
```

**src/index.js**

```js
// Example for Sass/SCSS:
// import sheet from "./styles.scss" assert { type: "css" };

// Example for CSS modules:
// import sheet, { myClass } from "./styles.scss" assert { type: "css" };

// Example for CSS:
import sheet from './styles.css' assert { type: 'css' }

document.adoptedStyleSheets = [sheet]
shadowRoot.adoptedStyleSheets = [sheet]
```

For migration purposes, you can use the following configuration:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        oneOf: [
          {
            assert: { type: 'css' },
            loader: 'css-loader',
            options: {
              exportType: 'css-style-sheet',
              // Other options
            },
          },
          {
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  // Other options
                },
              },
            ],
          },
        ],
      },
    ],
  },
}
```

## Examples

- https://github.com/webpack-contrib/css-loader#examples
- https://webpack.docschina.org/loaders/css-loader/#examples

## Resources

- [CSS modules](https://github.com/css-modules/css-modules)
- [What are CSS Modules and why do we need them?](https://css-tricks.com/css-modules-part-1-need/)
