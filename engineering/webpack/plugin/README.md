# Webpack Plugin

## Usage

使用工程化的思想处理一些问题

## Plugin development

> 重点是熟悉理解各个钩子的作用时机和作用

[Writing a Plugin](./Writing-a-Plugin.md)

## Projects

### copy-webpack-plugin

作用时机分析：

```js
compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
  const logger = compilation.getLogger('copy-webpack-plugin')

  compilation.hooks.processAssets.tapAsync(
    {
      name: 'copy-webpack-plugin',
      stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
    },
    async (unusedAssets, callback) => {
      // 执行实际的的拷贝逻辑
    }
  )
})
```

## Resources

- [compilation-hooks](https://webpack.js.org/api/compilation-hooks)
- [tapable](https://github.com/webpack/tapable), webpack 插件机制的底层实现

### 参考学习库

- [speed-measure-webpack-plugin](https://github.com/stephencookdev/speed-measure-webpack-plugin)
- [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin)
