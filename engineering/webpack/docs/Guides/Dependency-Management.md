# Dependency Management

## require with expression

A context is created if your request contains expressions, so the **exact** module is not known on compile time.
如果你的 request 含有表达式(expressions)，就会创建一个上下文(context)，因为在编译时(compile time)并不清楚 **具体** 导入哪个模块。

Example, given we have the following folder structure including `.ejs` files:

```log
example_directory
│
└───template
│   │   table.ejs
│   │   table-row.ejs
│   │
│   └───directory
│       │   another.ejs
```

When following `require()` call is evaluated:

```js
require('./template/' + name + '.ejs')
```

Webpack parses the `require()` call and extracts some information:

```js
Directory: ./template
Regular expression: /^.*\.ejs$/
```

context module

A context module is generated. It contains references to **all modules in that directory** that can be required with a request matching the regular expression. The context module contains a map which translates requests to module ids.

Example map:

```js
{
  "./table.ejs": 42,
  "./table-row.ejs": 43,
  "./directory/another.ejs": 44
}
```

The context module also contains some runtime logic to access the map.

**This means dynamic requires are supported but will cause all matching modules to be included in the bundle**.

## require.context

You can create your own context with the `require.context()` function.

It allows you to pass in a directory to search, a flag indicating whether subdirectories should be searched too, and a regular expression to match files against.

Webpack parses for `require.context()` in the code while building.

The syntax is as follows:

```js
require.context(directory, (useSubdirectories = true), (regExp = /^\.\/.*$/), (mode = 'sync'))
```

Examples:

```js
require.context('./test', false, /\.test\.js$/)
// a context with files from the test directory that can be required with a request ending with `.test.js`.

require.context('../', true, /\.stories\.js$/)
// a context with all files in the parent folder and descending folders ending with `.stories.js`.
```

> The arguments passed to `require.context` must be literals! 传递给 `require.context` 的参数必须是字面量(literal)！

### context module API

A context module exports a (require) function that takes one argument: the request.

The exported function has 3 properties: `resolve`, `keys`, `id`.

- `resolve` is a function and returns the module id of the parsed request.
- `keys` is a function that returns an array of all possible requests that the context module can handle.
  This can be useful if you want to **require all files** in a directory or matching a pattern, Example:

```js
function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('../components/', true, /\.js$/))
const cache = {}

function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)))
}

importAll(require.context('../components/', true, /\.js$/))
// At build-time cache will be populated with all required modules.
```

```ts
// install @types/webpack-env
const cache: { [key: string]: unknown } = {}

function importAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach((key: string) => (cache[key] = r(key)))
}
importAll(require.context('.', true, /\.svg$/))
```

- `id` is the module id of the context module. This may be useful for `module.hot.accept`.
