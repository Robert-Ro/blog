## debug

![调试的全貌示意图](https://static001.geekbang.org/resource/image/83/c0/8326a0d730d4ac2fd526ec02dc7125c0.png?wh=1504x1504)

![分析工具](https://static001.geekbang.org/resource/image/ca/5c/ca825d7cdyy4d0513f8244bac454c45c.png?wh=1724x810)

### 思路

- 根据红屏报错问题去思考、分析和推理
- **二分法**定位存在`bug`的代码
  - "二分法"的思路从整体到局部
  - 变种思路："多分法"
    - 举例：首屏性能问题，用户从点击、到请求、再到渲染的过程是一个整体，你可以把这个整体中各个阶段中的关键节点都埋上**性能统计埋点**，找到那些优化收益率高的、做起来容易的地方去优化。
- 三问人
  > 借鉴别人的经验来解决自己的问题，别人可以是同事、朋友、微信群，也可以是搜索引擎。

### 基于 React 生态的 debug 思路

- `errorBoundary`
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render)

### 补充材料

- [`Perf Monitor`](https://reactnative.dev/docs/debugging#performance-monitor)：调试情况下摇一摇手机，就会有一个弹窗，其中 Perf Monitor 功能可以帮你查看本地的 JavaScript FPS 和 Native FPS。
- [`Inspect`](https://reactnative.dev/docs/debugging#inspecting-component-instances)：摇一摇中的 Inspect 功能，可以帮我们查看组件树的结构。
- [Flipper](https://fbflipper.com/)，Facebook 推出的移动应用调试工具，功能很强大，打日志、打断点、查看元素树、抓包请求、查看存储它都支持，而且**支持扩展插件**。
