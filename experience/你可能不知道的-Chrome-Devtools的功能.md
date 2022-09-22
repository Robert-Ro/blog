# 你可能不知道的 `Chrome Devtools` 的功能

## 调试页面

- `flex` 调试面板：高效直观的调试 `flex` 样式
- `font` 调试面板：高效直观的调试 `font` 样式
- `ruler`：方便测量元素定位和尺寸
- `initiator` panel 请求定位源码：可以快速找到发请求的代码
- 🧪`Stack Trace`元素定位到创建的源码：可以快速理清元素是怎么创建出来的，这对于理清前端框架的运行流程很有帮助。
- `console` 的动态表达式(`live expression`)：监听某个变化的值不用一直 `console.log` 了，可以实时看到最新的值，相当于 `watch`
- `node` 截图：可以方便的直接拿到某个区域的截图: `capture node screenshot`
- 请求导出到 charles 查看：charles 显示请求信息时，url 按照层级结构展示的，请求和相应的信息也更丰富直观，可以更好的分析，也能持久化。

## debugger 代码

- 普通断点：运行到该处就断住
- 条件断点：运行到该处且表达式为真就断住，比普通断点更灵活
- **`DOM`断点**：**DOM Breakpoints**, DOM 的子树变动、属性变动、节点删除时断住，可以用来调试引起 DOM 变化的代码
- **`URL`断点**：**XHR/fetch Breakpoints**, `URL`匹配某个模式的时候断住，可以用来调试请求相关代码
- `Event Listener` 断点： **Event Listener BreakPointers**, 触发某个事件监听器的时候断住，可以用来调试事件相关代码
- 异常断点：**Uncaught Exceptions**和**Caught Exceptions**， 抛出异常被捕获或者未被捕获的时候断住，可以用来调试发生异常的代码
- 额外： `Global listeners`全局注册过的监听回调函数
