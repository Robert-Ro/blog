# chrome profile dev

## 开始

- 使用无痕模式，排除其他插件等影响
- 加载需要分析的页面
- 开启 chrome 开发者工具

### 模拟移动端 CPU

- 开发者工具 -> performance 面板
- 开启截屏
- 点开 capture 设置
- 选择 CPU，减缓 2 倍

### 体验 demo

配置好优化前后性能明显差异的数据量

### 录制运行时性能

点击 Record -> 开启 Profiling -> 等待几秒 -> 点击停止 -> 即可看到 profile 的结果

> 数据结果很大，但有方法分析

## 结果分析

### 逐帧分析

性能首要指标是`frames per second(FPS)`, 用户最开心看到的是动画每秒达到 60FPS(高刷屏能够达到更高)

1. 关注 FPS 图表。当看到红色的条带，表明当前的渲染帧率比较低，用户的体验大概率受到影响。一般情况下，绿色的越高，FPS 越高。
2. FPS 图表下面你可以看到 CPU 图表。图表颜色越多，表明 CPU 占用越高。底部的 Summary 表明的的是这一段时间内各项任务的耗时。
3. 悬浮图表上，可以看到每个时刻的 FPS，CPU，NET 信息，以及当前时刻的页面快照
4. 在 Frames 块中，也可以看大相应时刻的 FPS

在 demo 中，能够比较清晰的看出页面的性能比较差。但是在实际的场景中，可能就不是那么明显，但幸运地是，我们有相应的工具

- 打开 FPS 实时面板：Control+Shift+P -> `show fps rendering`: 即可看到实时的 FPS、GPU 信息数据

### 发现瓶颈

- Summary tab: 性能就是做更少工作的艺术，优化的目标就是减少做渲染工作的时长
- Main section: 展示的是火焰图，X 轴表示时间，每一个 bar 表示一个事件。bar 的长度越长表示事件的执行时长越长。Y 轴表示调用栈深度。
- Recording 的数据很大，可以通过滚轮查看更详细的数据(或者快捷键: W, A, S, D), 红色的三角形表示当前这个事件可能存在性能问题。
- 点击`Animation Frame Fired`事件。Summary tab 显示当前事件的信息，以及相关当前代码的位置，点击代码进去则可以看到每一行代码的执行时长。
- 耗时越长的地方，则表明性能瓶颈所在。demo 中引起性能瓶颈的原因在于`re-layout`, 参考[如何避免同步重排](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/#avoid-forced-synchronous-layouts)

### 分析优化版本

> 对比非优化版本来查看差别所在
> 即使优化版本性能有提升，但最好的方式还是只改变`重新合成`这一步骤, 参考[在动画中使用 transform 和 opacity](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/#use-transform-and-opacity-changes-for-animations)

## 下一步

参考 [Measure Performance With The RAIL Model](https://web.dev/rail/)

To become an expert in runtime performance, you've got to learn how the browser translates HTML, CSS, and JS into pixels on a screen. The best place to start is the [Rendering Performance Overview](https://web.dev/rendering-performance/). [The Anatomy Of A Frame](https://aerotwist.com/blog/the-anatomy-of-a-frame/) dives into even more detail.
为了更好的理解运行时性能，你需要学习理解浏览器原理

Last, there are many ways to improve runtime performance. This tutorial focused on one particular animation bottleneck to give you a focused tour through the Performance panel, but it's only one of many bottlenecks you may encounter. The rest of the Rendering Performance series has a lot of good tips for improving various aspects of runtime performance, such as:
还有很多方法去优化运行时性能。本篇 tutorial 旨在关注动画过程的性能瓶颈，这只是众多瓶颈中的一个。以下链接是其他的一些优化性能的方法：

- [Optimizing JS Execution](https://web.dev/optimize-javascript-execution/)
- [Reduce The Scope And Complexity Of Style Calculations](https://web.dev/reduce-the-scope-and-complexity-of-style-calculations/)
- [Avoid Large, Complex Layouts And Layout Thrashing](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)
- [Simplify Paint Complexity And Reduce Paint Areas](https://web.dev/simplify-paint-complexity-and-reduce-paint-areas/)
- [Stick To Compositor-Only Properties And Manage Layer Count](https://web.dev/stick-to-compositor-only-properties-and-manage-layer-count/)
- [Debounce Your Input Handlers](https://web.dev/debounce-your-input-handlers/)
