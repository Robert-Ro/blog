# useSyncExternalStore

useSyncExternalStore 是一个 React Hook，它允许您订阅外部存储。

```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```

## Reference

在组件的顶层调用 useSyncExternalStore 来从外部数据存储中读取值。

```js
import { useSyncExternalStore } from 'react'
import { todosStore } from './todoStore.js'

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot)
  // ...
}
```

useSyncExternalStore 返回存储中数据的快照。您需要将两个函数作为参数传递：

1. subscribe 函数应该订阅存储并返回一个用于取消订阅的函数。
2. getSnapshot 函数应该从存储中读取数据的快照。

### 参数

- subscribe：一个接受单个回调参数并将其订阅到存储中的函数。当存储发生变化时，应调用提供的回调函数。这将导致组件重新渲染。subscribe 函数应返回一个用于清理订阅的函数。

- getSnapshot：一个返回组件所需的存储中数据的快照的函数。在存储未发生变化时，多次调用 getSnapshot 必须返回相同的值。如果存储发生变化并且返回的值不同（通过 Object.is 进行比较），React 将重新渲染组件。

- 可选的 getServerSnapshot：一个返回存储中数据的初始快照的函数。它仅在服务器渲染期间和客户端上的服务器渲染内容的混合期间使用。服务器快照必须在客户端和服务器之间保持一致，并且通常会序列化并从服务器传递到客户端。如果省略此参数，则在服务器上渲染组件时会引发错误。

### 返回值

The current snapshot of the store which you can use in your rendering logic.
存储的当前快照，您可以在渲染逻辑中使用。

### 注意事项

由 getSnapshot 返回的存储快照必须是不可变的。如果底层存储具有可变数据，如果数据发生变化，则返回一个新的不可变快照。否则，返回一个缓存的最后快照。

如果在重新渲染过程中传递了不同的 subscribe 函数，React 将使用新传递的 subscribe 函数重新订阅存储。您可以通过在组件外部声明 subscribe 来防止这种情况发生。

## Usage

### Subscribing to an external store

大多数 React 组件只会从它们的 props、state 和 context 中读取数据。然而，有时候组件需要从 React 之外的某个存储中读取一些随时间变化的数据。这包括：

- 第三方状态管理库，它们将状态保存在 React 之外。
- 浏览器 API，提供了可变的值和订阅其变化的事件。

在组件的顶层调用 useSyncExternalStore 来从外部数据存储中读取值。

```js
import { useSyncExternalStore } from 'react'
import { todosStore } from './todoStore.js'

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot)
  // ...
}
```

`useSyncExternalStore` 返回存储中数据的快照。您需要传递两个函数作为参数：

1. `subscribe` 函数应该订阅存储并返回一个用于取消订阅的函数。
2. `getSnapshot` 函数应该从存储中读取数据的快照。

React 将使用这些函数来保持您的组件对存储的订阅，并在变化时重新渲染它。

> When possible, we recommend using built-in React state with `useState` and `useReducer` instead. The `useSyncExternalStore` API is mostly useful if you need to integrate with existing non-React code.
> 在可能的情况下，我们建议使用内置的 React 状态管理 API，如`useState`和`useReducer`。使用`useSyncExternalStore` API 主要是为了与现有的非 React 代码进行集成时使用。

> 使用内置的 React 状态管理 API 可以获得更好的性能和更简单的代码逻辑。这些 API 已经经过优化和测试，并且与 React 的并发模型完全兼容。只有在需要与现有非 React 代码集成或无法改变外部数据存储的情况下，才建议使用`useSyncExternalStore`。

### Subscribing to a browser API

Another reason to add `useSyncExternalStore` is when you want to subscribe to some value exposed by the browser that changes over time. For example, suppose that you want your component to display whether the network connection is active. The browser exposes this information via a property called `navigator.onLine`.

This value can change without React’s knowledge, so you should read it with `useSyncExternalStore`.

当您希望订阅浏览器暴露的随时间变化的某个值时，使用 `useSyncExternalStore` 也是一个很好的选择。例如，假设您希望组件显示网络连接是否活动。浏览器通过一个名为 `navigator.onLine` 的属性暴露了这个信息。

这个值可能在没有 React 知晓的情况下发生变化，因此您应该使用 `useSyncExternalStore` 来读取它。通过将 `navigator.onLine` 作为外部数据存储传递给 `useSyncExternalStore`，您可以在组件中订阅并获取网络连接状态的变化。这样，您的组件将能够及时更新并反映出网络连接状态的变化。

```js
import { useSyncExternalStore } from 'react'

function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  // ...
}
```

To implement the getSnapshot function, read the current value from the browser API:

```js
function getSnapshot() {
  return navigator.onLine
}
```

Next, you need to implement the subscribe function. For example, when navigator.onLine changes, the browser fires the online and offline events on the window object. You need to subscribe the callback argument to the corresponding events, and then return a function that cleans up the subscriptions:
接下来，您需要实现 `subscribe` 函数。例如，当 `navigator.onLine` 发生变化时，浏览器会在 window 对象上触发 `online` 和 `offline` 事件。您需要将回调参数订阅到相应的事件上，并返回一个清理订阅的函数，如下所示：

```js
function subscribe(callback) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

// 在这个示例中，我们定义了两个事件处理函数 handleOnline 和 handleOffline，它们分别在 online 和 offline 事件发生时调用回调函数并传递相应的参数。然后，我们使用 addEventListener 方法订阅了这两个事件。最后，我们返回一个清理函数，用于在组件卸载或不再需要订阅时取消事件的订阅。
```

Now React knows how to read the value from the external `navigator.onLine` API and how to subscribe to its changes. Disconnect your device from the network and notice that the component re-renders in response:

这样，您就可以使用上述代码将 `navigator.onLine` 与 `useSyncExternalStore` 配合使用，并在网络连接状态变化时更新您的组件。

### Extracting the logic to a custom Hook

Usually you won’t write `useSyncExternalStore` directly in your components. Instead, you’ll typically call it from your own custom Hook. This lets you use the same external store from different components.

For example, this custom `useOnlineStatus` Hook tracks whether the network is online:

```js
import { useSyncExternalStore } from 'react'

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  return isOnline
}

function getSnapshot() {
  // ...
}

function subscribe(callback) {
  // ...
}
```

Now different components can call `useOnlineStatus` without repeating the underlying implementation:

### Adding support for server rendering

If your React app uses [server rendering](https://react.dev/reference/react-dom/server), your React components will also run outside the browser environment to generate the initial HTML. This creates a few challenges when connecting to an external store:

- If you’re connecting to a browser-only API, it won’t work because it does not exist on the server.
- If you’re connecting to a third-party data store, you’ll need its data to match between the server and client.

To solve these issues, pass a `getServerSnapshot` function as the third argument to `useSyncExternalStore`:

```js
import { useSyncExternalStore } from 'react'

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  return isOnline
}

function getSnapshot() {
  return navigator.onLine
}

function getServerSnapshot() {
  return true // Always show "Online" for server-generated HTML
}

function subscribe(callback) {
  // ...
}
```

The `getServerSnapshot` function is similar to `getSnapshot`, but it runs only in two situations:

- It runs on the server when generating the HTML.
- It runs on the client during [hydration](https://react.dev/reference/react-dom/client/hydrateRoot), i.e. when React takes the server HTML and makes it interactive.
  This lets you provide the initial snapshot value which will be used before the app becomes interactive. If there is no meaningful initial value for the server rendering, omit this argument to [force rendering on the client](https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-server-only-content).

`getServerSnapshot`函数与`getSnapshot`函数类似，但它只在两种情况下运行：

- 在生成 HTML 时，在服务器端运行。
- 在客户端进行混合渲染（hydration）时运行，即当 React 将服务器端的 HTML 转换为可交互的内容时。

这样可以提供在应用程序变为可交互之前使用的初始数据快照值。如果在服务器渲染时没有有意义的初始值，可以省略此参数以强制在客户端进行渲染。

> Make sure that `getServerSnapshot` returns the same exact data on the initial client render as it returned on the server. For example, if `getServerSnapshot` returned some prepopulated store content on the server, you need to transfer this content to the client. One way to do this is to emit a `<script>` tag during server rendering that sets a global like `window.MY_STORE_DATA`, and read from that global on the client in `getServerSnapshot`. Your external store should provide instructions on how to do that.

> 确保 getServerSnapshot 在初始客户端渲染时返回与服务器上返回的完全相同的数据。例如，如果 getServerSnapshot 在服务器上返回了一些预填充的存储内容，您需要将这些内容传输到客户端。一种方法是在服务器渲染期间生成一个`<script>`标签，设置一个全局变量，例如`window.MY_STORE_DATA`，并在客户端的 getServerSnapshot 中从该全局变量读取数据。您的外部存储库应提供如何执行此操作的说明。

## Troubleshooting

### I’m getting an error: “The result of `getSnapshot` should be cached”

This error means your getSnapshot function returns a new object every time it’s called, for example:

```js
function getSnapshot() {
  // 🔴 Do not return always different objects from getSnapshot
  return {
    todos: myStore.todos,
  }
}
```

React will re-render the component if `getSnapshot` return value is different from the last time. This is why, if you always return a different value, you will enter an infinite loop and get this error.

Your `getSnapshot` object should only return a different object if something has actually changed. If your store contains immutable data, you can return that data directly:

```js
function getSnapshot() {
  // ✅ You can return immutable data
  return myStore.todos
}
```

If your store data is mutable, your getSnapshot function should return an immutable snapshot of it. This means it does need to create new objects, but it shouldn’t do this for every single call. Instead, it should store the last calculated snapshot, and return the same snapshot as the last time if the data in the store has not changed. How you determine whether mutable data has changed depends on your mutable store.
如果您的存储数据是可变的，那么您的 getSnapshot 函数应该返回其不可变的快照。这意味着它确实需要创建新对象，但不应该在每次调用时都这样做。相反，它应该存储上次计算的快照，并在存储中的数据未发生变化时返回与上次相同的快照。如何确定可变数据是否发生了变化取决于您的可变存储。

### My `subscribe` function gets called after every re-render

This `subscribe` function is defined **inside a component so it is different on every re-render**:

```js
function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)

  // 🚩 Always a different function, so React will resubscribe on every re-render
  function subscribe() {
    // ...
  }

  // ...
}
```

React will resubscribe to your store if you pass a different `subscribe` function between re-renders. If this causes performance issues and you’d like to avoid resubscribing, **move the `subscribe` function outside**:

```js
function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  // ...
}

// ✅ Always the same function, so React won't need to resubscribe
function subscribe() {
  // ...
}
```

Alternatively, wrap `subscribe` into `useCallback` to only resubscribe when some argument changes:

```js
function ChatIndicator({ userId }) {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)

  // ✅ Same function as long as userId doesn't change
  const subscribe = useCallback(() => {
    // ...
  }, [userId])

  // ...
}
```

## Resources

- [links](https://react.dev/reference/react/useSyncExternalStore)
- [useMutableSource → useSyncExternalStore](https://github.com/reactwg/react-18/discussions/86)
- [示例](https://stackblitz-starters-kx6mmw.stackblitz.io)
- [React18 实现](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberHooks.js#L1700)
- [React shim 实现](./use-sync-external-store-shim.development.js)
