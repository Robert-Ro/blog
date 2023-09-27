# Webpack doc

## webpack-merge

`webpack-merge` 是一个用于合并 `webpack` 配置对象的工具，它的合并策略是基于 `lodash` 的 `mergeWith` 函数实现的

### 合并策略

1. 对象合并：`webpack-merge` 会递归合并对象。如果两个配置对象中的属性都是对象，那么它们会被递归合并。这允许你将一个 webpack 配置对象分成多个部分，并将它们合并到一个完整的配置中。

2. 数组合并：对于数组属性，`webpack-merge` 会将它们简单合并，不会去重或排序。

3. 函数合并：如果两个配置对象中的属性是函数，那么它们会被调用并且返回值将被合并。这对于某些属性需要自定义逻辑的情况非常有用。

4. 默认覆盖：如果在多个配置对象中有相同的属性，后面的配置对象会覆盖前面的配置对象。这意味着后面的配置会覆盖前面的配置，除非你提供了自定义的合并函数来处理这些属性。

5. `undefined` 值的忽略：如果某个配置对象中的属性值是 `undefined`，它不会影响合并的结果。只有实际有值的属性才会影响合并。

6. 自定义合并策略：你可以提供自定义的合并函数，以控制特定属性的合并方式。这对于某些特殊情况下需要精确控制合并的情况非常有用。

下面是一个示例，展示了如何使用 webpack-merge 合并两个 webpack 配置对象：

```javascript
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const devConfig = require('./webpack.dev.js')

const mergedConfig = merge(commonConfig, devConfig)
```

在上述示例中，`commonConfig` 和 `devConfig` 是两个不同的 `webpack` 配置对象，它们通过 `webpack-merge` 合并为一个新的配置对象 `mergedConfig`。根据合并策略，`devConfig` 中的属性会覆盖 `commonConfig` 中的同名属性，从而得到最终的配置对象。

## Resources

- [webpack-merge](https://github.com/survivejs/webpack-merge)
