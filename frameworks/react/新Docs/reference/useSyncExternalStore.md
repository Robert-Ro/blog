# useSyncExternalStore
useSyncExternalStore 是一个 React Hook，它允许您订阅外部存储。
```js
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
```
## Reference 
在组件的顶层调用 useSyncExternalStore 来从外部数据存储中读取值。
```js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
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
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  // ...
}
```

useSyncExternalStore 返回存储中数据的快照。您需要传递两个函数作为参数：

1. subscribe 函数应该订阅存储并返回一个用于取消订阅的函数。
2. getSnapshot 函数应该从存储中读取数据的快照。

React 将使用这些函数来保持您的组件对存储的订阅，并在变化时重新渲染它。

> When possible, we recommend using built-in React state with useState and useReducer instead. The useSyncExternalStore API is mostly useful if you need to integrate with existing non-React code.

## Resources

- [links](https://react.dev/reference/react/useSyncExternalStore)
