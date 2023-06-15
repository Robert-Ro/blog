# useImperativeHandle

`useImperativeHandle` is a React Hook that lets you customize the handle exposed as a ref. 允许在组件内部自定义一个可暴露给父组件的引用(ref)， 以便更好地控制和操作组件的行为。通过使用`useImperativeHandle`,可以选择仅将特定的函数或值暴露给父组件，而不是暴露整个组件实例的引用。

## syntax

```js
useImperativeHandle(ref, createHandle, dependencies?)
```

## Reference

### useImperativeHandle(ref, createHandle, dependencies?)

Call `useImperativeHandle` at the top level of your component to customize the ref handle it exposes:

```js
import { forwardRef, useImperativeHandle } from 'react'

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        // ... your methods ...
        // 定义需要返回的方法
      }
    },
    []
  )
})
// ...
```

### Parameters 参数

- `ref`: The `ref` you received as the second argument from the forwardRef render function.来自`forwardRef`渲染函数的第二个参数`ref`。该参数用于在组件之间传递引用

- `createHandle`: A function that takes no arguments and returns the ref handle you want to expose. That ref handle can have any type. Usually, you will return an object with the methods you want to expose.一个不带参数的函数，用于返回需要公开的`ref`。该`ref`可以是任何类型，通常会返回一个包含要公开的方法的对象。

-` optional dependencies`: The list of all reactive values referenced inside of the `createHandle` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is configured for React, it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the `Object.is` comparison. If a re-render resulted in a change to some dependency, or if you omitted this argument, your `createHandle` function will re-execute, and the newly created handle will be assigned to the ref.
可选的依赖项。`createHandle`代码中引用所有响应式值的列表。响应式值包括`props`, `state`以及直接声明在组件体内的所有变量和函数。（...剩余的内容就是 hooks 依赖项的比对逻辑）

### Returns 返回值

`useImperativeHandle`返回值为`undefined`

## usage

### Exposing a custom ref handle to the parent component

By default, components don’t expose their DOM nodes to parent components. For example, if you want the parent component of `MyInput` to have access to the `<input>` DOM node, you have to opt in with `forwardRef`:
默认情况下，components 不会暴露组件内部的 dom 节点给到父组件。如果父组件需要访问子组件的 DOM 节点，则需要使用`forwardRef`

```js
import { forwardRef } from 'react'

const MyInput = forwardRef(function MyInput(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
    />
  )
})
```

With the code above, a ref to `MyInput` will receive the `<input>` DOM node. However, you can expose a custom value instead. To customize the exposed handle, call `useImperativeHandle` at the top level of your component:

```js
import { forwardRef, useImperativeHandle } from 'react'

const MyInput = forwardRef(function MyInput(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return {
        // ... your methods ...
        // 自定义的methods
      }
    },
    []
  )

  return <input {...props} />
})
```

Note that in the code above, the `ref` is no longer forwarded to the `<input>`使用了`useImperativeHandle`后，`ref`不再指向`<input>`.

For example, suppose you don’t want to expose the entire `<input>` DOM node, but you want to expose two of its methods: `focus` and `scrollIntoView`. To do this, keep the real browser DOM in a separate ref. Then use `useImperativeHandle` to expose a handle with only the methods that you want the parent component to call:

```js
import { forwardRef, useRef, useImperativeHandle } from 'react'

const MyInput = forwardRef(function MyInput(props, ref) {
  const inputRef = useRef(null)

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus()
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView()
        },
      }
    },
    []
  )

  return (
    <input
      {...props}
      ref={inputRef}
    />
  )
})
```

Now, if the parent component gets a ref to `MyInput`, it will be able to call the `focus` and `scrollIntoView` methods on it. However, it will not have full access to the underlying `<input>` DOM node. 父组件就只能访问`focus`和`scrollIntoView`两个方法了。

### Exposing your own imperative methods

可以用来公开自己的命令式方法。命令式方法是一些方法，可以直接操作组件实例，而不是需要通过 props 传递数据。当需要从组件外部控制和操作组件的状态和行为时，这种方式非常有用。

The methods you expose via an imperative handle don’t have to match the DOM methods exactly. For example, this Post component exposes a scrollAndFocusAddComment method via an imperative handle. This lets the parent Page scroll the list of comments and focus the input field when you click the button:

### 陷阱

- 避免滥用`ref`。只应将`refs`用于作为 props 无法表达的命令式行为。例如滚动到节点、聚焦节点、触发动画、选择文本等。
- 如果可以将某些行为表示为 prop，那就不应该使用 ref。如不应该从 modal 组件公开类似`open`, `close`的命令式方法，而应该将 open 作为参数传入给 modal 组件。使用 effect 副作用可以通过 props 来实现命令式行为。
