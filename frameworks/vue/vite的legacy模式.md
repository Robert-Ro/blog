核心思想：渐进增强，优雅降级

通过`script`标签上的`type="module"`属性来区分当前浏览器对 ES 模块化的支持程度。

- 如果支持的话，直接使用 ES6 模块化的代码形式运行代码
  - 是否支持动态导入`import('_')`
    - 是
    - 否，(e.g. Legacy Edge)
- 否则就使用`legacy`模式，执行`<script nomodule></script>`中的代码

  - 加载打包时产生的`polyfill`：`vite-legacy-polyfill`
  - 使得当前环境具有`System.import`的能力

  ## 拓展

  - [@vitejs/plugin-legacy](https://www.npmjs.com/package/@vitejs/plugin-legacy)
