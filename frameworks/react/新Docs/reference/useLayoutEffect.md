# useLayoutEffect

> `useLayoutEffect` can hurt performance. Prefer [`useEffect`](/reference/react/useEffect) when possible.`useLayoutEffect`会影响页面性能，优先使用`useEffect`代替。

`useLayoutEffect` is a version of [`useEffect`](/reference/react/useEffect) that fires before the browser repaints the screen.`useLayoutEffect`在重绘之前被触发

```js
useLayoutEffect(setup, dependencies?)
```

## Reference

### `useLayoutEffect(setup, dependencies?)`

Call `useLayoutEffect` perform the layout measurements before the browser repaints the screen:
调用`useLayoutEffect`会在浏览器重绘页面之前执行布局测量

```js
import { useState, useRef, useLayoutEffect } from 'react'

function Tooltip() {
  const ref = useRef(null)
  const [tooltipHeight, setTooltipHeight] = useState(0)

  useLayoutEffect(() => {
    // like vue nexttick
    const { height } = ref.current.getBoundingClientRect()
    setTooltipHeight(height)
  }, [])
  // ...
}
```

[See more examples below.](#usage)

#### Parameters 参数

- `setup`: The function with your Effect's logic. Your setup function may also optionally return a _cleanup_ function. Before your component is first added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function one last time.
- 该函数包含您的 `Effect` 逻辑。您的设置函数还可以选择性地返回一个 _cleanup_ 函数。在将组件首次添加到 DOM 之前，`React` 将运行您的设置函数。在每次更改依赖项后的重新渲染之前，`React` 将首先使用旧值运行清除函数（如果提供了该函数），然后使用新值运行您的设置函数。在从 DOM 中删除组件之前，`React` 将最后一次运行您的清除函数。

- **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](/learn/editor-setup#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm. If you don't specify the dependencies at all, your Effect will re-run after every re-render of the component.`dependencies`: 在 `setup` 代码内部引用的所有响应式值的列表。响应式值包括 `props`、`state`，以及在组件体内直接声明的所有变量和函数。如果您的代码检查工具已配置为 React，它将验证每个响应式值是否已正确指定为依赖项。依赖项列表必须具有恒定数量的项，并且像 [dep1，dep2，dep3] 这样内联写入。React 将使用 `Object.is` 比较算法将每个依赖项与其上一个值进行比较。_如果您根本不指定依赖关系，则每次重新渲染组件后都会重新运行 `Effect`_。

#### Returns 返回值

`useLayoutEffect` returns `undefined`.

#### Caveats 说明

- `useLayoutEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.`useLayoutEffect` 是一个 `Hook`，因此您只能在组件的顶层或自己的 `Hooks` 中调用它。您不能在循环或条件语句内部调用它。如果您需要这样做，请提取一个新的组件并将状态移动到其中。

- When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic "mirrors" your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, [you need to implement the cleanup function.](/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)。当启用 `Strict Mode` 时，`React` 会在第一次真正的设置之前运行一个额外的开发环境的设置和清理循环。这是一个压力测试，确保您的清理逻辑“镜像”您的设置逻辑，并停止或撤销设置正在执行的任何操作。如果这会导致问题，则需要实现清理函数。

- If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary [object](/reference/react/useEffect#removing-unnecessary-object-dependencies) and [function](/reference/react/useEffect#removing-unnecessary-function-dependencies) dependencies. You can also [extract state updates](/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect) and [non-reactive logic](/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect) outside of your Effect.如果您的一些依赖项是在组件内定义的对象或函数，则有可能会导致 `Effect` 比需要更频繁地重新运行。为了解决这个问题，可以删除不必要的对象和函数依赖项。您还可以将状态更新和非反应性逻辑提取到 `Effect` 之外。

- Effects **only run on the client.** They don't run during server rendering.`Effect` 只在客户端上运行。在服务器渲染期间不会运行 `Effect`。

- The code inside `useLayoutEffect` and all state updates scheduled from it **block the browser from repainting the screen.** When used excessively, this can make your app very slow. When possible, prefer [`useEffect`.](/reference/reac/useEffect)。`useLayoutEffect` 中的代码和所有从中调度的状态更新都会阻止浏览器重新绘制屏幕。当过度使用时，这可能会使您的应用程序非常缓慢。如果可能，请使用 `useEffect`。

## Usage

### Measuring layout before the browser repaints the screen 在浏览器重新绘制屏幕之前测量布局。

Most components don't need to know their position and size on the screen to decide what to render. They only return some JSX with CSS. Then the browser calculates their _layout_ (position and size) and repaints the screen.
大多数组件不需要知道它们在屏幕上的位置和大小来决定渲染什么。它们只返回一些带有 CSS 的 JSX。然后浏览器计算它们的布局（位置和大小）并重新绘制屏幕。

Sometimes, that's not enough. Imagine a tooltip that appears next to some element on hover. If there's enough space, the tooltip should appear above the element, but if it doesn't fit, it should appear below. This means that in order to render the tooltip at the right final position, you need to know its height (i.e. whether it fits at the top).
但有时候这样还不够。想象一下，在悬停某个元素时出现的`tooltip`提示。**如果有足够的空间**，`tooltip`提示应该出现在元素上方，**但如果不适合，它应该出现在下方**。这意味着为了在正确的最终位置渲染`tooltip`提示，您需要知道它的高度（即是否适合在顶部）。

To do this, you need to render in two passes:

1. Render the tooltip anywhere (even with a wrong position).渲染`tooltip`提示在任何地方（即使位置不正确）。
2. Measure its height and decide where to place the tooltip.测量它的高度并决定放置`tooltip`提示的位置。
3. Render the tooltip _again_ in the correct place.在正确的位置再次渲染`tooltip`提示。

**All of this needs to happen before the browser repaints the screen.** You don't want the user to see the tooltip moving. Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen:所有这些都需要在浏览器重新绘制屏幕之前完成。您不希望用户看到工具提示在移动。调用 `useLayoutEffect` 在浏览器重新绘制屏幕之前执行布局测量：

```js
function Tooltip() {
  const ref = useRef(null)
  const [tooltipHeight, setTooltipHeight] = useState(0) // You don't know real height yet

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect()
    setTooltipHeight(height) // Re-render now that you know the real height
  }, [])

  // ...use tooltipHeight in the rendering logic below...
}
```

Here's how this works step by step:

1. `Tooltip` renders with the initial `tooltipHeight = 0` (so the tooltip may be wrongly positioned).
2. React places it in the DOM and runs the code in `useLayoutEffect`.
3. Your `useLayoutEffect` [measures the height](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the tooltip content and triggers an immediate re-render(状态改变会立即触发重新渲染).
4. `Tooltip` renders again with the real `tooltipHeight` (so the tooltip is correctly positioned).
5. React updates it in the DOM, and the browser finally displays the tooltip.

Hover over the buttons below and see how the tooltip adjusts its position depending on whether it fits:

Notice that even though the `Tooltip` component has to render in two passes (first, with `tooltipHeight` initialized to `0` and then with the real measured height), you only see the final result. This is why you need `useLayoutEffect` instead of [`useEffect`](/reference/react/useEffect) for this example. Let's look at the difference in detail below.
// TODO

### [examples] useLayoutEffect vs useEffect

#### 例 1 `useLayoutEffect` blocks the browser from repainting

React guarantees that the code inside `useLayoutEffect` and any state updates scheduled inside it will be processed **before the browser repaints the screen.** This lets you render the tooltip, measure it, and re-render the tooltip again without the user noticing the first extra render. In other words, `useLayoutEffect` blocks the browser from painting.
// TODO

#### 例 2 `useEffect` does not block the browser

Here is the same example, but with [`useEffect`](/reference/react/useEffect) instead of `useLayoutEffect`. If you're on a slower device, you might notice that sometimes the tooltip "flickers" and you briefly see its initial position before the corrected position.

To make the bug easier to reproduce, this version adds an artificial delay during rendering. React will let the browser paint the screen before it processes the state update inside `useEffect`. As a result, the tooltip flickers:

Edit this example to `useLayoutEffect` and observe that it blocks the paint even if rendering is slowed down.
// TODO

> Rendering in two passes and blocking the browser hurts performance. Try to avoid this when you can.

## Troubleshooting

### I'm getting an error: "`useLayoutEffect` does nothing on the server" 在服务端使用`useLayoutEffect`出现错误

The purpose of `useLayoutEffect` is to let your component [use layout information for rendering:](#measuring-layout-before-the-browser-repaints-the-screen)

1. Render the initial content.渲染起始内容
2. Measure the layout _before the browser repaints the screen._ 在屏幕重新绘制前测量布局信息
3. Render the final content using the layout information you've read.使用布局信息渲染最终的内容

When you or your framework uses [server rendering](/reference/react-dom/server), your React app renders to HTML on the server for the initial render. This lets you show the initial HTML before the JavaScript code loads.

The problem is that on the server, there is no layout information. 服务端渲染的情况下没有布局信息

In the [earlier example](#measuring-layout-before-the-browser-repaints-the-screen), the `useLayoutEffect` call in the `Tooltip` component lets it position itself correctly (either above or below content) depending on the content height. If you tried to render `Tooltip` as a part of the initial server HTML, this would be impossible to determine. On the server, there is no browser and no layout! So, even if you rendered it on the server, its position would "jump" on the client after the JavaScript loads and runs.

Usually, components that rely on layout information don't need to render on the server anyway. For example, it probably doesn't make sense to show a `Tooltip` during the initial render. It is triggered by a client interaction.

However, if you're running into this problem, you have a few options:

1. You can replace `useLayoutEffect` with [`useEffect`.](使用`useEffect`代替`useLayoutEffect`) This tells React that it's okay to display the initial render result without blocking the paint (because the original HTML will become visible before your Effect runs).

2. You can [mark your component as client-only.](/reference/react/Suspense#providing-a-fallback-for-server-errors-and-server-only-content) This tells React to replace its content up to the closest [`<Suspense>`](/reference/react/Suspense) boundary with a loading fallback (for example, a spinner or a glimmer) during server rendering.

3. You can display different components on the server and on the client. One way to do this is to keep a boolean `isMounted` state that's initialized to `false`, and set it to `true` inside a `useEffect` call. Your rendering logic can then be like `return isMounted ? <RealContent /> : <FallbackContent />`. On the server and during the hydration, the user will see `FallbackContent` which should not call `useLayoutEffect`. Then React will replace it with `RealContent` which runs on the client only and can include `useLayoutEffect` calls.

4. **If you synchronize your component with an external data store and rely on** `useLayoutEffect` for different reasons than measuring layout, consider **[`useSyncExternalStore`]**(/reference/react/useSyncExternalStore) instead which [supports server rendering.](/reference/react/useSyncExternalStore#adding-support-for-server-rendering)
