# Under The Hood

> This section describes webpack internals and can be useful for plugin developers

The bundling is a function that takes some files and emits others.
打包，是指处理某些文件并将其输出为其他文件的能力。

But between input and output, it also has [modules](/concepts/modules/), [entry points](/concepts/entry-points/), chunks, chunk groups, and many other intermediate parts.
但是，在输入和输出之间，还包括有 **模块**, **入口起点**, **chunk**, **chunk 组**和许多其他中间部分。

## The main parts 主要部分

Every file used in your project is a [Module](/concepts/modules/)

**./index.js**

```js
import app from './app.js'
```

**./app.js**

```js
export default 'the app'
```

By using each other, the modules form a graph (`ModuleGraph`).
通过互相引用，这些模块会形成一个图(`ModuleGraph`)数据结构。

During the bundling process, modules are combined into chunks.
Chunks combine into chunk groups and form a graph (`ChunkGraph`) interconnected through modules.
When you describe an entry point - under the hood, you create a chunk group with one chunk.
在打包过程中，模块会被合并成 chunk。 chunk 合并成 chunk 组，并形成一个通过模块互相连接的图(`ModuleGraph`)。 那么如何通过以上来描述一个入口起点：在其内部，会创建一个只有一个 chunk 的 chunk 组。

**./webpack.config.js**

```js
module.exports = {
  entry: './index.js',
}
```

One chunk group with the `main` name created (`main` is the default name for an entry point).
This chunk group contains `./index.js` module. As the parser handles imports inside `./index.js` new modules are added into this chunk.

Another example:

**./webpack.config.js**

```js
module.exports = {
  entry: {
    home: './home.js',
    about: './about.js',
  },
}
```

Two chunk groups with names `home` and `about` are created.
Each of them has a chunk with a module - `./home.js` for `home` and `./about.js` for `about`
这会创建出两个名为 home 和 about 的 chunk 组。 每个 chunk 组都有一个包含一个模块的 chunk：./home.js 对应 home，./about.js 对应 about

> There might be more than one chunk in a chunk group. For example [SplitChunksPlugin](/plugins/split-chunks-plugin/) splits a chunk into one or more chunks.

## Chunks

Chunks come in two forms:

- `initial` is the main chunk for the entry point. This chunk contains all the modules and their dependencies that you specify for an entry point. initial(初始化) 是入口起点的 main chunk。此 chunk 包含为入口起点指定的所有模块及其依赖项。
- `non-initial` is a chunk that may be lazy-loaded. It may appear when [dynamic import](/guides/code-splitting/#dynamic-imports) or [SplitChunksPlugin](/plugins/split-chunks-plugin/) is being used. `non-initial` 是可以延迟加载的块。可能会出现在使用 动态导入(`dynamic imports`) 或者 `SplitChunksPlugin` 时。

Each chunk has a corresponding **asset**. The assets are the output files - the result of bundling.
每个 chunk 都有对应的 asset(资源)。资源，是指输出文件（即打包结果）。

**webpack.config.js**

```js
module.exports = {
  entry: './src/index.jsx',
}
```

**./src/index.jsx**

```js
import React from 'react'
import ReactDOM from 'react-dom'

import('./app.jsx').then((App) => {
  ReactDOM.render(<App />, root)
})
```

Initial chunk with name `main` is created. It contains:

- `./src/index.jsx`
- `react`
- `react-dom`

and all their dependencies, except `./app.jsx`

Non-initial chunk for `./app.jsx` is created as this module is imported dynamically.

**Output:**

- `/dist/main.js` - an `initial` chunk
- `/dist/394.js` - `non-initial` chunk

By default, there is no name for `non-initial` chunks so that a unique ID is used instead of a name.
When using dynamic import we may specify a chunk name explicitly by using a ["magic" comment](/api/module-methods/#magic-comments):

```js
import(
  /* webpackChunkName: "app" */
  './app.jsx'
).then((App) => {
  ReactDOM.render(<App />, root)
})
```

**Output:**

- `/dist/main.js` - an `initial` chunk
- `/dist/app.js` - `non-initial` chunk

## Output

The names of the output files are affected by the two fields in the config:

- [`output.filename`](/configuration/output/#outputfilename) - for `initial` chunk files
- [`output.chunkFilename`](/configuration/output/#outputchunkfilename) - for `non-initial` chunk files
- In some cases chunks are used `initial` and `non-initial`. In those cases `output.filename` is used.

A [few placeholders 占位符](/configuration/output/#template-strings) are available in these fields. Most often:

- `[id]` - chunk id (e.g. `[id].js` -> `485.js`)
- `[name]` - chunk name (e.g. `[name].js` -> `app.js`). If a chunk has no name, then its id will be used
- `[contenthash]` - md4-hash of the output file content (e.g. `[contenthash].js` -> `4ea6ff1de66c537eb9b2.js`)
