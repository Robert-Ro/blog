# lifecycle-webpack-plugin 分析

> Hook every compile steps by customize hooker.

## plugin 1

```js
// index.js
import defaults from './const'
//helpers:
function dasherize(inStr) {
  return inStr
    .replace(/::/g, '/')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .replace(/_/g, '-')
    .toLowerCase()
}

export default class LifecycleWebpackPlugin {
  constructor(inOptions) {
    this.options = Object.assign(
      defaults,
      {
        debug: false,
      },
      inOptions
    )
  }

  apply(compiler) {
    const keys = Object.keys(this.options)
    const debug = this.options.debug
    keys.forEach((item) => {
      if (debug) {
        console.log(dasherize(item), this.options[item])
      } else {
        const callback = this.options[item]
        if (typeof callback === 'function') {
          compiler.plugin(dasherize(item), callback)
        }
      }
    })
  }
}
// const.js
export default {
  compile:null,
  make:null,
  emit:null,
  buildModule:null,
  afterCompile:null,
  seal:null,
  afterEmit:null,
  optimize:null,
  optimizeChunkAssets:null,
  normalModuleLoader:null,
  optimizeModules:null,
  optimizeTree:null,
  done: null
};
```

## plugin 2

```sh
npm install --save-dev lifecycle-webpack-plugin
```

```js
import { LifeCycleWebpackPlugin } from 'lifecycle-webpack-plugin'

plugins: [
  new LifeCycleWebpackPlugin({
    done: (compiler) => {
      console.log('\n done \n', new Date())
    },
  }),
]
```

## support hooks:

| api                 | 对应 webpack 的事件   | 描述                                             |
| ------------------- | --------------------- | ------------------------------------------------ |
| compile             | compile               | 开始编译                                         |
| make                | make                  | 从入口点分析模块及其依赖的模块，创建这些模块对象 |
| emit                | emit                  | 把各个 chunk 输出到结果文件                      |
| buildModule         | build-module          | 构建模块                                         |
| afterCompile        | after-compile         | 完成构建                                         |
| seal                | seal                  | 封装构建结果                                     |
| afterEmit           | after-emit            | 完成输出                                         |
| optimize            | optimize              | 开始压缩阶段                                     |
| optimizeChunkAssets | optimize-chunk-assets | 为分块压缩                                       |
| normalModuleLoader  | normal-module-loader  | 一个一个的加载模块                               |
| optimizeModules     | optimize-modules      | 压缩模块                                         |
| optimizeTree        | optimize-tree         | 异步压缩模块树                                   |
| done                | done                  | 所有的步骤都完成                                 |

## resouces:

- [webpack 整体流程图]-(from: taobaofed)

![webpack整体流程图](../assets/TB1GVGFNXXXXXaTapXXXXXXXXXX-4436-4244.jpg)

- https://github.com/fanjunzhi/lifecycle-webpack-plugin
