# Authoring Libraries 创建库

Aside from applications, webpack can also be used to bundle JavaScript libraries. The following guide is meant for library authors looking to streamline their bundling strategy.
除了打包应用程序，webpack 还可以打包 JavaScript 库。以下指南适用于希望简化打包策略的库作者。

## Expose the Library 暴露库 ✨✨✨

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: 'webpackNumbers', // <- 关键配置点✨✨
  },
}
```

However it only works when it's referenced through script tag, it can't be used in other environments like `CommonJS`, `AMD`, `Node.js`, etc.

Let's update theo `utput.library` option with its `type` set to `'umd'`:

```js
{
  module.exports = {
    globalObject: 'this',
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
  }
}
```

> Note that the `library` setup is tied to the `entry` configuration. For most libraries, specifying a single entry point is sufficient. While [multi-part libraries](https://github.com/webpack/webpack/tree/master/examples/multi-part-library) are possible, it is more straightforward to expose partial exports through an index script that serves as a single entry point. **Using an `array` as an `entry` point for a library is not recommended**.
> 请注意，`library` 选项与 `entry` 配置项绑定。对于绝大多数的库，指定一个入口就已经足够了。尽管 multi-part library 是有可能的，但通过作为单个入口点的 索引脚本 暴露部分导出会更简单。不推荐 使用数组作为 entry。

## Externalize Lodash 外部化 lodash

Now, if you run `npx webpack`, you will find that a largish bundle is created. If you inspect the file, you'll see that lodash has been bundled along with your code. In this case, we'd prefer to treat `lodash` as a _peer dependency_. Meaning that the consumer should already have `lodash` installed. Hence you would want to give up control of this external library to the consumer of your library.
现在，如果执行 `webpack`，你会发现创建了一个体积相当大的文件。如果你查看这个文件，会看到 lodash 也被打包到代码中。在这种场景中，我们更倾向于把 `lodash` 当作 `peerDependency`。也就是说，使用者应该已经自行安装过 `lodash`。因此，我们便可以放弃控制此外部库，而是将控制权让给使用此库的开发者。

This can be done using the `externals` configuration:

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-numbers.js',
    library: {
      name: 'webpackNumbers',
      type: 'umd',
    },
  },
  externals: {
    lodash: {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
}
```

### External Limitations 外部化的限制

```js
import A from 'library/one'
import B from 'library/two'

module.exports = {
  //...
  externals: [
    'library/one',
    'library/two',
    // Everything that starts with "library/"
    /^library\/.+$/,
  ],
}
```

## Final Steps

Optimize your output for `production` by following the steps mentioned in the `production` guide. Let's also add the path to your generated bundle as the package's main field in with the package.json

```json
{
  "main": "dist/webpack-numbers.js",
  "module": "src/index.js"
}
```

> The `module` property should point to a script that utilizes ES2015 module syntax but no other syntax features that aren't yet supported by browsers or node. This enables webpack to parse the module syntax itself, allowing for lighter bundles via `tree shaking` if users are only consuming certain parts of the library.
> `module` 属性应指向一个使用 ES2015 模块语法的脚本，但不包括浏览器或 Node.js 尚不支持的其他语法特性。这使得 webpack 本身就可以解析模块语法，如果用户只用到库的某些部分，则允许通过 `tree shaking` 打包更轻量的包。

> To expose stylesheets associated with your library, the MiniCssExtractPlugin should be used. Users can then consume and load these as they would any other stylesheet.
> 为了暴露和库关联的样式表，你应该使用 `MiniCssExtractPlugin`。然后，用户可以像使用其他样式表一样使用和加载这些样式表。
