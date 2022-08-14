# Features
## NPM依赖解析和预构建
原生 ES 导入不支持下面这样的裸模块导入：
```js
import { someMethod } from 'my-dep'
```
上面的代码会在浏览器中抛出一个错误。Vite 将会检测到所有被加载的源文件中的此类裸模块导入，并执行以下操作:

1. [预构建](https://cn.vitejs.dev/guide/dep-pre-bundling.html) **它们可以提高页面加载速度，并将 `CommonJS/UMD`转换为`ESM`格式**。预构建这一步由[esbuild](http://esbuild.github.io/)执行，这使得`Vite`的冷启动时间比任何基于`JavaScript`的打包器都要快得多。
2. 重写导入为合法的`URL`，例如 `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd`以便浏览器能够正确导入它们。
    > 合法的`URL`, -> http://xxx.xxx.com/xx.js; script标签携带`type="module"`

### 依赖是强缓存的

Vite 通过 HTTP 头来缓存请求得到的依赖，所以如果你想要编辑或调试一个依赖，请按照[这里](https://cn.vitejs.dev/guide/dep-pre-bundling.html#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%BC%93%E5%AD%98)的步骤操作。

## 模块热替换
> HMR原理？

Vite 提供了一套原生`ESM`的[HMR API](https://cn.vitejs.dev/guide/api-hmr.html)。 具有`HMR`功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite内置了`HMR`到[Vue 单文件组件（SFC）](https://github.com/vitejs/vite/tree/main/packages/plugin-vue)和[React Fast Refresh](https://github.com/vitejs/vite/tree/main/packages/plugin-react)中。也通过[@prefresh/vite](https://github.com/JoviDeCroock/prefresh/tree/main/packages/vite)对`Preact`实现了官方集成。

## TypeScript
`Vite`天然支持引入`.ts`文件。

`Vite`仅执行`.ts`文件的**转译工作**，并**不**执行任何类型检查。并**假设类型检查已经被你的 IDE 或构建过程接管了**（你可以在构建脚本中运行`tsc --noEmit`或者安装`vue-tsc`然后运行`vue-tsc --noEmit`来对你的`*.vue`文件做类型检查）。

`Vite`使用`esbuild`将`TypeScript`转译到`JavaScript`，约是`tsc`速度的 20~30 倍，同时`HMR`更新反映到浏览器的时间小于`50ms`。

### TypeScript 编译器选项
- `isolatedModules`: 默认为`true`
  > 这是因为`esbuild`只执行没有类型信息的转译，它并不支持某些特性，如 `const` `enum`和隐式类型导入。
- `useDefineForClassFields`

### 客户端类型
要将其补充到一个`Vite`应用的客户端代码环境中，请添加一个`d.ts` 声明文件：
```ts
/// <reference types="vite/client" />
```
同时，你也可以将`vite/client`添加到`tsconfig`中的`compilerOptions.types`下：
```json
{
  "compilerOptions": {
    "types": ["vite/client"]
  }
}
```
这将会提供以下类型定义补充：

- 资源导入 (例如：导入一个`.svg`文件)
- `import.meta.env`上`Vite`注入的环境变量的类型定义
- `import.meta.hot`上的`HMR API`类型定义

## vue
借助插件支持vue3 SFC， vue3 JSX, Vue2等

## JSX
通过`esbuild`进行转义

## css

## postcss

## 静态资源处理

## JSON
```js
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json'
```
## Glob 导入
`Vite`支持使用特殊的`import.meta.glob`函数从文件系统导入多个模块：
> 类似`Webpack`的`Context API`

## 动态导入
和`glob导入` 类似，Vite 也支持带变量的动态导入
## WebAssembly
预编译的`.wasm`文件可以通过`?init`来导入
## Web Worker

## 构建优化
### CSS 代码分割
- 提取css代码到单独的chunk
- 等chunk加载完毕后再执行，避免发生`FOUC`
### 预加载指令生成
自动生成`<link rel="modulepreload">`指令

### 异步`Chunk`加载优化
提前分析，预加载代码