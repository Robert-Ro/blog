# Tree Shaking

_Tree shaking_ is a term commonly used in the JavaScript context for dead-code elimination. It relies on the [static structure](http://exploringjs.com/es6/ch_modules.html#static-module-structure) of ES2015 module syntax, i.e. [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export). The name and concept have been popularized by the ES2015 module bundler [rollup](https://github.com/rollup/rollup).

_tree shaking_ 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code)。它依赖于 ES2015 模块语法的 `静态结构` 特性，例如 `import` 和 `export`。这个术语和概念实际上是由 ES2015 模块打包工具 `rollup` 普及起来的。

The webpack 2 release came with built-in support for ES2015 modules (alias _harmony modules_) as well as unused module export detection. The new webpack 4 release expands on this capability with a way to provide hints to the compiler via the `"sideEffects"` `package.json` property to denote which files in your project are "pure" and therefore safe to prune if unused.

T> The remainder of this guide will stem from [Getting Started](/guides/getting-started). If you haven't read through that guide already, please do so now.

## Add a Utility

Let's add a new utility file to our project, `src/math.js`, that exports two functions:

**project**

```diff
webpack-demo
|- package.json
|- package-lock.json
|- webpack.config.js
|- /dist
  |- bundle.js
  |- index.html
|- /src
  |- index.js
+ |- math.js
|- /node_modules
```

**src/math.js**

```javascript
export function square(x) {
  return x * x
}

export function cube(x) {
  return x * x * x
}
```

Set the `mode` configuration option to [development](/configuration/mode/#mode-development) to make sure that the bundle is not minified:

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
+ mode: 'development',
+ optimization: {
+   usedExports: true,
+ },
};
```

With that in place, let's update our entry script to utilize one of these new methods and remove `lodash` for simplicity:

**src/index.js**

```diff
- import _ from 'lodash';
+ import { cube } from './math.js';

  function component() {
-   const element = document.createElement('div');
+   const element = document.createElement('pre');

-   // Lodash, now imported by this script
-   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
+   element.innerHTML = [
+     'Hello webpack!',
+     '5 cubed is equal to ' + cube(5)
+   ].join('\n\n');

    return element;
  }

  document.body.appendChild(component());
```

Note that we **did not `import` the `square` method** from the `src/math.js` module. That function is what's known as "dead code", meaning an unused `export` that should be dropped. Now let's run our npm script, `npm run build`, and inspect the output bundle:

**dist/bundle.js (around lines 90 - 100)**

```js
/* 1 */
/***/ ;(function (module, __webpack_exports__, __webpack_require__) {
  'use strict'
  /* unused harmony export square */
  /* harmony export (immutable) */ __webpack_exports__['a'] = cube
  function square(x) {
    return x * x
  }

  function cube(x) {
    return x * x * x
  }
})
```

Note the **`unused harmony export square`** comment above. If you look at the code below it, you'll notice that `square` is not being imported, however, it is still included in the bundle. We'll fix that in the next section.

## Mark the file as side-effect-free

In a 100% ESM module world, identifying side effects is straightforward. However, we aren't there quite yet, so in the mean time it's necessary to provide hints to webpack's compiler on the "pureness" of your code.
在一个纯粹的 ESM 模块世界中，很容易识别出哪些文件有副作用。然而，我们的项目无法达到这种纯度，所以，此时有必要提示 webpack compiler 哪些代码是“纯粹部分”。

The way this is accomplished is the `"sideEffects"` package.json property.
通过 package.json 的 `"sideEffects"` 属性，来实现这种方式。

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

All the code noted above does not contain side effects, so we can mark the property as `false` to inform webpack that it can safely prune unused exports.

> A "side effect" is defined as code that performs a special behavior when imported, other than exposing one or more exports. An example of this are polyfills, which affect the global scope and usually do not provide an export.
> "side effect(副作用)" 的定义是，在导入时会执行特殊行为的代码，而不是仅仅暴露一个 export 或多个 export。举例说明，例如 polyfill，它影响全局作用域，并且通常不提供 export。

If your code did have some side effects though, an array can be provided instead 如果你的代码确实有一些副作用，可以改为提供一个数组：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js"]
}
```

The array accepts simple glob patterns to the relevant files. It uses [glob-to-regexp](https://github.com/fitzgen/glob-to-regexp) under the hood (Supports: `*`, `**`, `{a,b}`, `[a-z]`). Patterns like `*.css`, which do not include a `/`, will be treated like `**/*.css`.

> Note that any imported file is subject to tree shaking. This means if you use something like `css-loader` in your project and import a CSS file, it needs to be added to the side effect list so it will not be unintentionally dropped in production mode:
> 注意，所有导入文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 `css-loader` 并 import 一个 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：

```json
{
  "name": "your-project",
  "sideEffects": ["./src/some-side-effectful-file.js", "*.css"]
}
```

Finally, `"sideEffects"` can also be set from the [`module.rules` configuration option](/configuration/module/#modulerules).

## Clarifying tree shaking and `sideEffects`

The [`sideEffects`](/configuration/optimization/#optimizationsideeffects) and [`usedExports`](/configuration/optimization/#optimizationusedexports) (more known as tree shaking) optimizations are two different things.
`sideEffects` 和 `usedExports`[使用分析报告]（更多被认为是 tree shaking）是两种不同的优化方式。

**`sideEffects` is much more effective** since it allows to skip whole modules/files and the complete subtree.
sideEffects **更为有效**是因为它允许跳过整个模块/文件和整个文件子树。

`usedExports` relies on [terser](https://github.com/terser-js/terser) to detect side effects in statements. It is a difficult task in JavaScript and not as effective as straightforward `sideEffects` flag. It also can't skip subtree/dependencies since the spec says that side effects need to be evaluated. While exporting function works fine, React's Higher Order Components (HOC) are problematic in this regard.
`usedExports` 依赖于 `terser` 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 `sideEffects` 一样简单直接。而且它不能跳转子树/依赖由于细则中说副作用需要被评估。尽管导出函数能运作如常，但 React 框架的高阶函数（HOC）在这种情况下是会出问题的。

Let's make an example:

```javascript
import { Button } from '@shopify/polaris'
```

The pre-bundled version looks like this:

```javascript
import hoistStatics from 'hoist-non-react-statics'

function Button(_ref) {
  // ...
}

function merge() {
  var _final = {}

  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key]
  }

  for (var _i = 0, _objs = objs; _i < _objs.length; _i++) {
    var obj = _objs[_i]
    mergeRecursively(_final, obj)
  }

  return _final
}

function withAppProvider() {
  return function addProvider(WrappedComponent) {
    var WithProvider =
      /*#__PURE__*/
      (function (_React$Component) {
        // ...
        return WithProvider
      })(Component)

    WithProvider.contextTypes = WrappedComponent.contextTypes
      ? merge(WrappedComponent.contextTypes, polarisAppProviderContextTypes)
      : polarisAppProviderContextTypes
    var FinalComponent = hoistStatics(WithProvider, WrappedComponent)
    return FinalComponent
  }
}

var Button$1 = withAppProvider()(Button)

export {
  // ...,
  Button$1,
}
```

When `Button` is unused you can effectively remove the `export { Button$1 };` which leaves all the remaining code. So the question is "Does this code have any side effects or can it be safely removed?". Difficult to say, especially because of this line `withAppProvider()(Button)`. `withAppProvider` is called and the return value is also called. Are there any side effects when calling `merge` or `hoistStatics`? Are there side effects when assigning `WithProvider.contextTypes` (Setter?) or when reading `WrappedComponent.contextTypes` (Getter?).
当 `Button` 没有被使用，你可以有效地清除掉 `export { Button$1 };` 且保留所有剩下的代码。那问题来了，“这段代码会有任何副作用或它能被安全都清理掉吗？”。很难说，尤其是这 `withAppProvider()(Button)` 这段代码。`withAppProvider` 被调用，而且返回的值也被调用。当调用 `merge` 或 `hoistStatics` 会有任何副作用吗？当给 `WithProvider.contextTypes` (Setter?) 赋值或当读取 `WrappedComponent.contextTypes` (Getter) 的时候，会有任何副作用吗？

Terser actually tries to figure it out, but it doesn't know for sure in many cases. This doesn't mean that terser is not doing its job well because it can't figure it out. It's too difficult to determine it reliably in a dynamic language like JavaScript.
实际上，Terser 尝试去解决以上的问题，但在很多情况下，它不太确定。但这不会意味着 terser 由于无法解决这些问题而运作得不好，而是由于在 JavaScript 这种动态语言中实在太难去确定。

But we can help terser by using the `/*#__PURE__*/` annotation. It flags a statement as side effect free. So a small change would make it possible to tree-shake the code:
但我们可以通过 `/*#__PURE__*/` 注释来帮忙 terser。它给一个语句标记为没有副作用。就这样一个简单的改变就能够使下面的代码被 tree-shake:

```javascript
var Button$1 = /*#__PURE__*/ withAppProvider()(Button)
```

This would allow to remove this piece of code. But there are still questions with the imports which need to be included/evaluated because they could contain side effects.
这会使得这段代码被过滤，但仍然会有一些引入的问题，需要对其进行评估，因为它们产生了副作用。

To tackle this, we use the [`"sideEffects"`](/guides/tree-shaking/#mark-the-file-as-side-effect-free) property in `package.json`.
为了解决这个问题，我们需要在 `package.json` 中添加 `"sideEffects"` 属性。

It's similar to `/*#__PURE__*/` but on a module level instead of a statement level. It says (`"sideEffects"` property): "If no direct export from a module flagged with no-sideEffects is used, the bundler can skip evaluating the module for side effects.".
它类似于 `/*#__PURE__*/` 但是作用于模块的层面，而不是代码语句的层面。它表示的意思是(指"sideEffects" 属性)：**“如果被标记为无副作用的模块没有被直接导出使用，打包工具会跳过进行模块的副作用分析评估。”**。

In the Shopify's Polaris example, original modules look like this:

**index.js**

```javascript
import './configure'
export * from './types'
export * from './components'
```

**components/index.js**

```javascript
// ...
export { default as Breadcrumbs } from './Breadcrumbs'
export { default as Button, buttonFrom, buttonsFrom } from './Button'
export { default as ButtonGroup } from './ButtonGroup'
// ...
```

**package.json**

```json
// ...
"sideEffects": [
  "**/*.css",
  "**/*.scss",
  "./esnext/index.js",
  "./esnext/configure.js"
],
// ...
```

For `import { Button } from "@shopify/polaris";` this has the following implications 对于代码 `import { Button } from "@shopify/polaris";` 它有以下的暗示：

- **include it**: include the module, evaluate it and continue analysing dependencies 导入它：导入并包含该模块，分析评估它并继续进行依赖分析
- **skip over**: don't include it, don't evaluate it but _continue analysing dependencies_ 跳过它：不导入它，不分析评估它但会继续进行依赖分析
- **exclude it**: don't include it, don't evaluate it and don't analyse dependencies 排除它：不导入它，不评估且不做依赖分析

Specifically per matching resource(s):

- `index.js`: No direct export is used, but flagged with sideEffects -> include it 没有直接的导出被使用，但被标记为有副作用 -> 导入它
- `configure.js`: No export is used, but flagged with sideEffects -> include it 没有导出被使用，但被标记为有副作用 -> 导入它
- `types/index.js`: No export is used, not flagged with sideEffects -> exclude it 没有导出被使用，没有被标记为有副作用 -> 排除它
- `components/index.js`: No direct export is used, not flagged with sideEffects, but reexported exports are used -> skip over 没有导出被使用，没有被标记为有副作用，但重新导出的导出内容被使用了 -> 跳过它
- `components/Breadcrumbs.js`: No export is used, not flagged with sideEffects -> exclude it. This also excluded all dependencies like `components/Breadcrumbs.css` even if they are flagged with sideEffects.没有导出被使用，没有被标记为有副作用 -> 排除它。这也会排除所有如同 components/Breadcrumbs.css 的依赖，尽管它们都被标记为有副作用。
- `components/Button.js`: Direct export is used, not flagged with sideEffects -> include it 直接的导出被使用，没有被标记为有副作用 -> 导入它
- `components/Button.css`: No export is used, but flagged with sideEffects -> include it 没有导出被使用，但被标记为有副作用 -> 导入它

In this case only 4 modules are included into the bundle 在这种情况下，只有 4 个模块被导入到 bundle 中：

- `index.js`: pretty much empty 基本为空的
- `configure.js`
- `components/Button.js`
- `components/Button.css`

After this optimization, other optimizations can still apply. For example: `buttonFrom` and `buttonsFrom` exports from `Button.js` are unused too. `usedExports` optimization will pick it up and terser may be able to drop some statements from the module.
在这次的优化后，其它的优化项目都可以应用。例如：从 `Button.js` 导出的`buttonFrom` 和 `buttonsFrom` 也没有被使用。`usedExports` 优化会捡起这些代码而且 `terser` 会能够从 `bundle` 中把这些语句摘除出来。

Module Concatenation also applies. So that these 4 modules plus the entry module (and probably more dependencies) can be concatenated. **`index.js` has no code generated in the end**.
模块合并也会应用。所以这 4 个模块，加上入口的模块（也可能有更多的依赖）会被合并。`index.js` 最终没有生成代码.

## Mark a function call as side-effect-free 将函数调用标记为无副作用

It is possible to tell webpack that a function call is side-effect-free (pure) by using the `/*#__PURE__*/` annotation. It can be put in front of function calls to mark them as side-effect-free. Arguments passed to the function are not being marked by the annotation and may need to be marked individually. When the initial value in a variable declaration of an unused variable is considered as side-effect-free (pure), it is getting marked as dead code, not executed and dropped by the minimizer.
是可以告诉 webpack 一个函数调用是无副作用的，只要通过 `/*#__PURE__*/` 注释。它可以被放到函数调用之前，用来标记它们是无副作用的(pure)。传到函数中的入参是无法被刚才的注释所标记，需要单独每一个标记才可以。如果一个没被使用的变量定义的初始值被认为是无副作用的（pure），它会被标记为死代码，不会被执行且会被压缩工具清除掉。

This behavior is enabled when [`optimization.innerGraph`](/configuration/optimization/#optimizationinnergraph) is set to `true`.
当 `optimization.innerGraph` 被设置成 `true` 时这个行为会被启用。

**file.js**

```javascript
/*#__PURE__*/ double(55)
```

## Minify the Output 压缩输出结果

So we've cued up our "dead code" to be dropped by using the `import` and `export` syntax, but we still need to drop it from the bundle. To do that, set the `mode` configuration option to [`production`](/configuration/mode/#mode-production).
通过 `import` 和 `export` 语法，我们已经找出需要删除的“未引用代码(dead code)”，然而，不仅仅是要找出，还要在 bundle 中删除它们。为此，我们需要将 `mode` 配置选项设置为 `production`。

**webpack.config.js**

```diff
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
- mode: 'development',
- optimization: {
-   usedExports: true,
- }
+ mode: 'production',
};
```

> Note that the `--optimize-minimize` flag can be used to enable `TerserPlugin` as well.
> 注意，也可以在命令行接口中使用 `--optimize-minimize` 标记，来启用 `TerserPlugin`。

With that squared away, we can run another `npm run build` and see if anything has changed.

Notice anything different about `dist/bundle.js`? The whole bundle is now minified and mangled, but, if you look carefully, you won't see the `square` function included but will see a mangled version of the `cube` function (`function r(e){return e*e*e}n.a=r`). With minification and tree shaking, our bundle is now a few bytes smaller! While that may not seem like much in this contrived example, tree shaking can yield a significant decrease in bundle size when working on larger applications with complex dependency trees.
你发现 `dist/bundle.js` 中的差异了吗？现在整个 bundle 都已经被 minify(压缩) 和 mangle(混淆破坏)，但是如果仔细观察，则不会看到引入 `square` 函数，但能看到 `cube` 函数的混淆破坏版本（`function r(e){return e*e*e}n.a=r`）。现在，随着 minification(代码压缩) 和 tree shaking，我们的 bundle 减小几个字节！虽然，在这个特定示例中，可能看起来没有减少很多，但是，在有着复杂依赖树的大型应用程序上运行 tree shaking 时，会对 bundle 产生显著的体积优化。

> [`ModuleConcatenationPlugin`](/plugins/module-concatenation-plugin/) is needed for the tree shaking to work. It is added by `mode: 'production'`. If you are not using it, remember to add the [`ModuleConcatenationPlugin`](/plugins/module-concatenation-plugin/) manually.
> 在使用 tree shaking 时必须有 [`ModuleConcatenationPlugin`](https://webpack.docschina.org/plugins/module-concatenation-plugin)的支持，您可以通过设置配置项 `mode: "production"` 以启用它。如果您没有如此做，请记得手动引入 ModuleConcatenationPlugin。

## Conclusion

What we've learned is that in order to take advantage of _tree shaking_, you must...

- Use ES2015 module syntax (i.e. `import` and `export`).使用 ES2015 模块语法（即 `import` 和 `export`）
- Ensure no compilers transform your ES2015 module syntax into CommonJS modules (this is the default behavior of the popular Babel preset @babel/preset-env - see the [documentation](https://babeljs.io/docs/en/babel-preset-env#modules) for more details).确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅[文档](https://babeljs.io/docs/en/babel-preset-env#modules)）
- Add a `"sideEffects"` property to your project's `package.json` file 在项目的 package.json 文件中，添加 "sideEffects" 属性.
- Use the [`production`](/configuration/mode/#mode-production) `mode` configuration option to enable [various optimizations](/configuration/mode/#usage) including minification and tree shaking.
- Make sure you set a correct value for [`devtool`](/configuration/devtool/#devtool) as some of them can't be used in `production` mode 使用 mode 为 `"production"` 的配置项以启用更多优化项，包括压缩代码与 tree shaking.

You can imagine your application as a tree. The source code and libraries you actually use represent the green, living leaves of the tree. Dead code represents the brown, dead leaves of the tree that are consumed by autumn. In order to get rid of the dead leaves, you have to shake the tree, causing them to fall.
你可以将应用程序想象成一棵树。绿色表示实际用到的 source code(源码) 和 library(库)，是树上活的树叶。灰色表示未引用代码，是秋天树上枯萎的树叶。为了除去死去的树叶，你必须摇动这棵树，使它们落下。

If you are interested in more ways to optimize your output, please jump to the next guide for details on building for [production](/guides/production).
