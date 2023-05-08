# 03 ｜内置 `Hooks`（1）：如何保存组件状态和使用生命周期

> 彻底忘掉类组件的那些生命周期方法。实现功能时，不要试图去映射这些生命周期方法。

## `useState`: 让函数组件具有维持状态的能力

> `state`是会影响组件展示`UI`的变量
> 只有需要触发 `UI` 更新的状态才需要放到 `state` 里

函数签名:

```js
const [state1, setState1] = useState(initialValue)
```

- 函数组件多次渲染之间，这个`state`是共享的
- `seState(initialState)`的参数`initialState` 是创建`state`的初始值，它可以是任意类型，比如**数字**、**对象**、**数组**等等，仅表示某一种状态

- `useState()`的返回值是一个有着两个元素的数组。第一个数组元素用来读取`state`的值，第二个则是用来设置这个`state`的值。在这里要注意的是，`state`的变量（例子中的`count`）是只读的，所以我们必须通过第二个数组元素`setCount`来设置它的值

- 如果要创建多个`state`，那么我们就需要多次调用`useState`

  - 类组件的`state`只能有一个，函数组件中可以使用`useState`创建多个`state`

- **`state`中永远不用保存可以通过计算得到的值**

  - `props` 传递过来的值
    > 有时候 `props` 传递过来的值无法直接使用，而是要通过一定的计算后再在 `UI` 上展示，比如说**排序**。那么我们要做的就是每次用的时候，都重新排序一下，或者利用某些 `cache` 机制，而不是将结果直接放到 `state` 里。
  - 从 `url` 中读取到的值

    > 那么我们可以在每次需要用的时候从 `URL` 中读取，而不是读出来直接放到 `state` 里。

  - 从 `cookie`、`localstorage` 中读取到的值 // NOTE ?
    > 通常来说，也是每次要用的时候直接去读取，而不是读出来后放到 `state` 里。

## useEffect：执行副作用

> 顾名思义，就是用于执行一段副作用。**在`React`中表示当前渲染完成后执行的回调函数**。

什么是副作用呢？通常来说，**副作用是一段和当前执行结果无关的代码**。比如说

- 要修改函数外部的某个变量，
- 要发起一个请求，等等。

也就是说，在函数组件的当次执行过程中，`useEffect`中代码的执行是**不影响本次渲染出来的`UI`的**。

函数签名:

```js
useEffect(callback, dependencies)
```

- `callback`: 要执行的函数`callback`
- 可选的依赖项数组`dependencies`
  - **不指定**，那么`callback`就会在**每次函数组件执行完后都执行**；
  - 指定了，
    - **有值**：那**只有依赖项中的值发生变化的时候，才会执行** ,
    - **空数组**：只在首次执行时触发
- 允许返回一个函数，用于在**组件销毁的时候做一些清理的操作**
  - 销毁 dom 绑定事件
  - 销毁大内存对象

### 小结

总结一下，`useEffect` 让我们能够在下面四种时机去执行一个回调函数产生副作用：

1. 每次 `render` 后执行：不提供第二个依赖项参数。比如
   `useEffect(() => {})`。
2. 仅第一次`render` 后执行：提供一个空数组作为依赖项。比如
   `useEffect(() => {}, [])`。
3. 第一次以及依赖项发生变化后执行：提供依赖项数组。比如
   `useEffect(() => {}, [deps])`。
4. 组件 `unmount` 后执行：返回一个回调函数。比如
   `useEffect() => { return () => {} }, [])`。

## Hooks 的依赖

`Hooks` 能监听某个数据变化的能力。定义要监听哪些数据变化的机制，其实就是指定 `Hooks` 的依赖项。

- _依赖项中定义的变量一定是会在回调函数中用到的，否则声明依赖项其实是没有意义的_。
  > // NOTE 最佳实践?
- 依赖项一般是一个**常量数组**，_而不是一个变量_。因为一般在创建`callback`的时候，你其实非常清楚其中要用到哪些依赖项了。
- `React`会使用**浅比较**来对比依赖项是否发生了变化，所以**要特别注意数组或者对象类型**, [areHookInputsEqual](https://github.com/facebook/react/blob/c08d8b8041a1fa2eba423cdb0398dfbc6402a5bc/packages/react-reconciler/src/ReactFiberHooks.new.js#L370), [is](https://github.com/facebook/react/blob/c08d8b8041a1fa2eba423cdb0398dfbc6402a5bc/packages/shared/objectIs.js#L14)。

  ```js
  function is(x: any, y: any) {
    return (
      (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
    )
  }
  const objectIs: (x: any, y: any) => boolean =
    // $FlowFixMe[method-unbinding]
    typeof Object.is === 'function' ? Object.is : is

  export default objectIs
  ```

  - _如果你是每次创建一个新对象，即使和之前的值是等价的，也会被认为是依赖项发生了变化_。
    > 这是一个刚开始使用 `Hooks` 时很容易导致 `Bug` 的地方。

### Hooks 的使用规则

`Hooks` 本身作为纯粹的 `JavaScript` 函数，不是通过某个特殊的 `API` 去创建的，而是直接定义一个函数。它需要在降低学习和使用成本的同时，还需要遵循一定的规则才能正常工作.

> `Hooks` 的实现机制决定的

- 只能在函数组件的顶级作用域使用；-> **必须要被执行到**
- 只能在函数组件或者其他 `Hooks` 中使用。-> **必须按顺序执行(链表数据结构实现?)**

个例：`hooks` 如何在类组件中使用

> 使用 HOC 高阶函数组件模式

### 使用 ESLint 插件帮助检查 Hooks 的使用

[eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks), 然后在你的 `ESLint` 配置文件中加入两个规则：`rules-of-hooks` 和 `exhaustive-deps`

```json
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    // 检查 Hooks 的使用规则
    "react-hooks/rules-of-hooks": "error",
    // 检查依赖项的声明
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### FAQ

- Q: 回调中使用了某些变量，却没有在依赖数组中指定，会发生什么？
- A：变量发生变化，不会引起副作用重新执行
- Q：对于这节课中显示的 Blog 文章的例子，我们在 `useEffect` 中使用了 setBlogContent 这样一个函数，本质上它也是一个局部变量，那么这个函数需要被作为依赖项吗？为什么？
- A：函数是不变的?(// NOTE：内存地址不变)
