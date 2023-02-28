# useState

> `useState` is a React Hook that lets you add a **state variable** to your component.

- 在严格模式([Strict Mode](https://beta.reactjs.org/apis/react/StrictMode))下,`React`将会调用你的函数两次
  > 在开发模式下方便发现错误，尽量将函数写成纯函数等

## [StrictMode](https://reactjs.org/docs/strict-mode.html)

StrictMode is a tool for **highlighting potential problems** in an application. Like `Fragment`, `StrictMode` does not render any visible UI. It activates additional checks and warnings for its descendants.

> Strict mode checks are run in development mode only; they do not impact the production build.仅在开发模式下有效

## Reference

### useState(initialState)

```js
const [something, setSomething] = useState(initialState)
```

- Parameters
  - `initialValue`: The value you want the state to be initially. It can be a value of any type, but there is a special behavior for functions. This arguments is **ignored** after the initial render. [两种参数形式: 非函数和函数]
    - If you pass functions as `initialValue`, it will be treated as an **initializer function**. It should be pure, should take no arguments, and should return a value of any type. **React will call your initializer function when initializing the component, and store its value as the initial state**
- Returns
  `useState` returns an array with exactly two values:
  1. The current state. During the **first render**, it will match the `initialState` you have passed.
  2. The `set` function that lets you update the state to a different value and **trigger** a re-render.
- Caveats 说明
  - UseState is a hook, should match the rule of hook usage
  - In **Strict Mode**, React will call your initializer function twice in order to find accidental impurities(提前发现是否存在渲染副作用，性能瓶颈等, 仅在开发模式下起作用). If your initializer function is pure(as it should be), this should not affect the logic of your component.
- `set` functions, like `setSomething(nextState)`
  The `set` functions returned by `useState` let you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from previous state:
  ```js
  setXX((prevState) => prevState + 1)
  ```
  - If you pass a function as `nextState`, it will be treated as an _updater function_. It must be pure, should take the pending state as its only argument, and should return the next state. React **will put your updater function in a queue and re-render your component**. During the next render, React will calculate the next state by applying all of the queued updaters to previous state.
  - no return value
  - Caveats
    - The set function only updates the state variable for next render. If you read the state variable after calling the set function, **you will get the old value**
    - If the new value you provide is identical to the current `state`, as determined by an `Object.is` comparision(浅比较), React will skip re-rendering the component and its children. **This is an optimization**
    - React **batches state updates**(批量更新). It updates the screen after all the event handlers have run and have called their `set` functions. This **prevents** multiple re-renders during a single event(类似数据插入数据，推荐批量插入数据，尽可能少地建立数据库连接). _In the rare case[极其罕见的场景] that you need to force React to update the screen earlier, you can use [flushSync](https://beta.reactjs.org/reference/react-dom/flushSync)_
    - Calling the `set` function _during rending_ is only allowed from within the currently rending component. // FIXME ?不太明白
    - In Strict Mode, React will call your updater function twice in order to `help you find accidental impurities`. The result from one of the calls will be ignored.

### usage

#### Adding state to a component

after call the `set` function with some next state, React will store the next state, render your component again with new values, and update the UI.

**Pitfall**

- Calling the set function does not change the current state in the already executing code, it only affects what useState will return starting from the **next** render

#### Updating state based on the previous state

```js
function handleClick() {
  setAge(age + 1) // setAge(42 + 1)
  setAge(age + 1) // setAge(42 + 1)
  setAge(age + 1) // setAge(42 + 1)
}
```

However, after one click, `age` will only be `43` rather than `45`! This is because calling the `set` function **does not update** the age state variable _in the already running code_. So each `setAge(age + 1)` call becomes `setAge(43)`.

To solve this problem, you may pass an _updater function 更新函数_ to `setAge` instead of the next state:

```js
function handleClick() {
  setAge((a) => a + 1) // setAge(42 => 43)
  setAge((a) => a + 1) // setAge(43 => 44)
  setAge((a) => a + 1) // setAge(44 => 45)
}
```

Here, `a => a + 1` is your updater functions. It takes the `pending state` and calculates the `next state` from it. React puts your updater functions in a queue. Then, during the next render, it will call them in the same order:

1. `a => a + 1` will receive `42` as the pending state and return `43` as the next state.
2. `a => a + 1` will receive `43` as the pending state and return `44` as the next state.
3. `a => a + 1` will receive `44` as the pending state and return `45` as the next state.

By convention, you may also call it like `prevAge` or something else that you find clearer.

> React may call your updaters twice in development to verify that they are pure

[[deep dive], Is using an updater always preferred](./%5Bdeep%20dive%5D%20Is%20using%20an%20updater%20always%20preferred.md)

#### Updating objects and arrays in state 处理更新状态是：对象/数组的状况

You can put objects and arrays into state. In React, state is considered read-only, so you should _replace it_ rather than mutate your existing objects, pass a **new object** to state.

#### Avoiding recreating the initial state

React saves the initial state once and ignores it on the next renders

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos())
  // ...
}
```

Although the result of `createInitialTodos` is only used for the initial render, your're still calling this function only every render. This can be _wasteful_ if it's creating large arrays or performing expensive calculations.

To solve this, you may pass it as an initializer function to `useState` instead:

```js
function TodoList() {
  const [todos, setTodos] = useState(createInitialTodos)
  // ...
}
```

Notice that you’re passing `createInitialTodos`, which is the _function itself_, and not `createInitialTodos()`, which is the result of calling it. If you pass a function to `useState`, **React will only call it during initialization**.

React may call your initializers twice in development to verify that they are pure.

#### Resetting state with a key

Typically, you might encounter the `key` attribute when `rendering lists`. However, it also serves antother purpose.
通常 key 在列表渲染中起重要作用，同时，它还有其他的作用。

You can reset a component's state by passing a different `key` to a component. In this example, the Reset button changes the `version` state variable, which we pass as a key to the Form. When the key changes, React re-creates the Form component, so its state get reset.

#### Storing information from previous renders

Usually, you will update state in event handlers. However, in rare cases you might want to adjust state in response to rendering -- for example, you might want to change a state variable when a prop changes.
比如想要改变状态当属性改变

In most cases, you don't need this:

- if the value you need can be computed entirely form the current props or other state, remove the redundant state althogether. If you're worried about recomputing too ofter, the `useMemo` Hook can help. 基于当前属性或者其他的状态，可以使用`useMemo`来处理
- If you want to reset the entire component tree's state, pass a different key for your component. 使用不同的 key 来重置组件的状态
- If you can, update all the relevant state in the event handlers

```jsx
import { useState } from 'react'

export default function CountLabel({ count }) {
  const [prevCount, setPrevCount] = useState(count)
  const [trend, setTrend] = useState(null)
  if (prevCount !== count) {
    setPrevCount(count)
    setTrend(count > prevCount ? 'increasing' : 'decreasing')
  }
  return (
    <>
      <h1>{count}</h1>
      {trend && <p>The count is {trend}</p>}
    </>
  )
}
```

This pattern can be hard to understand and is usually best avoided. However, it’s better than updating state in an effect. When you call the set function during render, React will re-render that component immediately after your component exits with a return statement, and before rendering the children. This way, children don’t need to render twice. The rest of your component function will still execute (and the result will be thrown away), but if your condition is below all the calls to Hooks, you may add an early return; inside it to restart rendering earlier.
这种模式难以理解，最好不去使用这模式。但是这种还是好过在 effect hook 中更新状态。当在 render 过程中调用 set 函数，React 将会立即重新更新组件， 。。。这种情况下，子组件能够避免被更新两次 //FIXME -

### Troubleshooting

- I’ve updated the state, but logging gives me the old value

```js
function handleClick() {
  console.log(count) // 0

  setCount(count + 1) // Request a re-render with 1
  console.log(count) // Still 0!

  setTimeout(() => {
    console.log(count) // Also 0!
  }, 5000)
}
```

This is because [states behaves like a snapshot](https://beta.reactjs.org/learn/state-as-a-snapshot). Updating state requests another render with the new state value, but does not affect the `count` JavaScript variable _in your already-running event handler_.

If you need to use the next state, you can save it in a variable before passing it to the set function:

```js
const nextCount = count + 1
setCount(nextCount)

console.log(count) // 0
console.log(nextCount) // 1
```

- I’ve updated the state, but the screen doesn’t update

**React will ignore your update if the next state is equal to the previous state, as determined by an [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison**. This usually happens when you change an object or an array in state directly:

```js
obj.x = 10 // 🚩 Wrong: mutating existing object
setObj(obj) // 🚩 Doesn't do anything -> 未改变对象，对象的引用保持不变
```

You mutated an existing obj object and passed it back to setObj, so React ignored the update. To fix this, you need to ensure that you’re always replacing objects and arrays in state instead of mutating them:

```js
setObj({
  ...obj,
  x: 10,
})
```

- I’m getting an error: “Too many re-renders”

You might get an error that says: Too many re-renders. React limits the number of renders to prevent an infinite loop. Typically, this means that you’re unconditionally setting state during render, so your component enters a loop: render, set state (which causes a render), render, set state (which causes a render), and so on. Very often, this is caused by a mistake in specifying an event handler:

```js
// 🚩 Wrong: calls the handler during render
return <button onClick={handleClick()}>Click me</button>

// ✅ Correct: passes down the event handler
return <button onClick={handleClick}>Click me</button>

// ✅ Correct: passes down an inline function
return <button onClick={(e) => handleClick(e)}>Click me</button>
```

- My initializer or updater function runs twice
  In Strict Mode, React will call some of your functions twice instead of once:
  > **keeping components pure**.

```js
setTodos((prevTodos) => {
  // 🚩 Mistake: mutating state
  prevTodos.push(createTodo())
})

setTodos((prevTodos) => {
  // ✅ Correct: replacing with new state
  return [...prevTodos, createTodo()]
})
```

- I’m trying to set state to a function, but it gets called instead
  You can’t put a function into state like this:

```JS

const [fn, setFn] = useState(someFunction);

function handleClick() {
  setFn(someOtherFunction);
}
```

Because you're passing a function, React assumes that `SomeFunction` is an initializer function, and that `SomeOtherFunction` is an updater function, so it tries to call them and store the result. To actually store a function, you have to put `() =>` before them in both cases. Then React will store the functions you pass.

```JS
const [fn, setFn] = useState(() => someFunction);

function handleClick() {
  setFn(() => someOtherFunction);
}
```

## Resources

- [useState](https://beta.reactjs.org/reference/react/useState)
- [flushSync](https://beta.reactjs.org/reference/react-dom/flushSync)
- [react update queue](https://beta.reactjs.org/learn/queueing-a-series-of-state-updates)
