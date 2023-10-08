# React Hooks FAQs

## 自定义 hooks，可以理解为一个不返回 UI 的 react 组件

## 理解自定义 hooks 的使用，从其生命周期开始理解：**挂载阶段**，**更新阶段**，**卸载**

- `onMounted`: 在自定义 Hooks 中，这相当于一个 Effect。当组件（或使用了自定义 Hook 的组件）首次挂载时，这个 Effect 会被执行。在这个 Effect 中，你可以进行一些副作用操作，例如订阅事件、请求数据等。

- `onUpdate`: 这不是一个直接对应于自定义 Hooks 的概念。在 Hooks 中，当组件重新渲染时，每个 Effect 都会重新执行（如果其依赖项发生变化）。这可以理解为一个“更新”阶段，但它不像类组件的 componentDidUpdate 那样有一个单独的生命周期函数。

- `onUnmounted`: 在自定义 Hooks 中，这同样对应于一个 Effect。当组件（或使用了自定义 Hook 的组件）卸载时，这个 Effect 会被执行。在这个 Effect 中，你可以进行一些清理工作，例如取消订阅、清除计时器等。

需要注意的是，自定义 Hooks 的设计是为了更好地组织和重用逻辑，而不是严格模仿类组件的生命周期。每个 Effect 都可以用来在不同的阶段执行逻辑，而不需要将所有的逻辑都塞在一个生命周期函数中。这样使得组件更易于阅读、维护，并提供了更灵活的代码结构。

## 组件的每一次`render`

都会依次执行 hooks，其中`useState`, `useRef`会返回其最新的值，不一定是初始化时的值

## react 16.4+ 生命周期

### Mounting

### Updating

- New Props
- setState()
- forceUpdate()

### Unmounting

## Two Phases

### Render Phase

Pure and has no side effects. May be **paused**, **aborted** or **restarted** by React.

### Commit Phase

Can work with DOM, run side effects, schedule updates

## 运行机制，与 js 执行机制(主进程、eventloop)交互

## React18 Concurrent Mode(并发模式)

## react hooks 与 `setInterval`/`setTimeout` 交互问题

`setInterval` 和 `setTimeout` 等定时器函数是游离于 `React` 系统之外的 `JavaScript` 特性。它们是浏览器提供的功能，用于执行一些延迟或重复性的任务。
