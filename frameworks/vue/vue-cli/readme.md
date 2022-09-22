# Vue-cli

```
vue inspect > output.js
```

## 默认配置

### splitChunks

```js
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    },
```

## vue.config.js 中使用

```js
const chainWebpack = (config) => {
  config.optimization.splitChunks({
    // 配置项
  })
}
```

## Resources
