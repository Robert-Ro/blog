# useRef

`useRef` is a React Hook that lets you reference a value that's not needed for rendering.
`useRef`用于引用一个不需要用于`rendering`的 value

```js
const ref = useRef(initialValue)
```

## Reference

### `useRef(initialValue)`

Call `useRef` at the top level of your component to declare a [ref.](/learn/referencing-values-with-refs)调用`useRef`声明一个`ref`

```js
import { useRef } from 'react'

function MyComponent() {
  const intervalRef = useRef(0)
  const inputRef = useRef(null)
  // ...
}
```

[See more examples below.](#usage)

#### Parameters 参数

- `initialValue`: The value you want the ref object's `current` property to be initially. It can be a value of any type. This argument is ignored after the initial render. 初始值，可以是任何类型的值。在第一次渲染之后，这个初始值参数就不再使用了

#### Returns 返回值

`useRef` returns an object with a single property:返回一个仅还有一个属性名为[`current`]的对象

- `current`: Initially, it's set to the `initialValue` you have passed. You can later set it to something else. If you pass the ref object to React as a `ref` attribute to a JSX node, React will set its `current` property.初始化时，初始化参数会给到`current`。之后你可以给`current`赋其他任何值。如果将返回值传值给`React`组件的`ref` `attribute`上，`React`将会设置`current`属性值。

On the next renders, `useRef` will return the same object.在之后的渲染中，`useRef`将会返回同一个对象

#### Caveats 说明

- You can mutate the `ref.current` property. Unlike state, it is mutable. However, if it holds an object that is used for rendering (for example, a piece of your state), then you shouldn't mutate that object.你可以改变`ref.current`的值。与`state`不同的是，它是可变的。但是如果它持有一个用于`rendering`的对象的话(如果是`state`的一部分)，那么你就不能改变这个对象。
- When you change the `ref.current` property, React does not re-render your component. React is not aware of when you change it because a ref is a plain JavaScript object.当你改变`ref.current`对象，React 不会重新渲染你的组件。`React`不会追踪引用了一个普通 js 对象的变化。
- Do not write _or read_ `ref.current` during rendering, except for [initialization.](#avoiding-recreating-the-ref-contents) This makes your component's behavior unpredictable.不能在`rendering`过程中对`ref.current`进行读写，除了初始化，因为这会导致你的组件的行为变得很奇怪。
- In Strict Mode, React will **call your component function twice** in order to [help you find accidental impurities.](#my-initializer-or-updater-function-runs-twice) This is development-only behavior and does not affect production. This means that each ref object will be created twice, and one of the versions will be discarded. If your component function is pure (as it should be), this should not affect the logic of your component. 在严格模式下， React 会两次调用组件函数，为了尽早地发现组件`accidental impurities`。这意味着任何`ref`对象将会被创建两次，老的对象将会被丢弃。如果你的组件函数是`pure`，这就不会对你的组件的逻辑有任何影响。

## Usage 使用场景

### Referencing a value with a ref 保持一个值的引用

Call `useRef` at the top level of your component to declare one or more [refs.](/learn/referencing-values-with-refs)

```js
import { useRef } from 'react'

function Stopwatch() {
  const intervalRef = useRef(0)
  // ...
}
```

`useRef` returns a `ref object` with a single `current` property initially set to the `initial value` you provided.

On the next renders, `useRef` will return the same object. You can change its `current` property to store information and read it later. This might remind you of [state](/reference/react/useState), but there is an important difference. 下次渲染时，`useRef`将返回同一个对象。再此之后，你可以改变它的`current`属性， 这与`state`类似，但本质上不同。

**Changing a ref does not trigger a re-render.** This means refs are perfect for storing information that doesn't affect the visual output of your component. For example, if you need to store an [interval ID](https://developer.mozilla.org/en-US/docs/Web/API/setInterval) and retrieve it later, you can put it in a ref. To update the value inside the ref, you need to manually change its `current` property`:
修改`ref`不会因此重新渲染，意味着这是最理想的方式来存储一个不影响组件视觉效果的对象。举个例子：如果你想存储`interval ID`引用，你可以使用`useRef`来引用这个值。为了你想改变这个值，你需要手动改变这个`current`属性

```js
function handleStartClick() {
  const intervalId = setInterval(() => {
    // ...
  }, 1000)
  intervalRef.current = intervalId // 赋值
}
```

Later, you can read that interval ID from the ref so that you can call [clear that interval](https://developer.mozilla.org/en-US/docs/Web/API/clearInterval):之后你可以从 ref 中读取到这个`interval ID`, 再将它清除掉

```js
function handleStopClick() {
  const intervalId = intervalRef.current
  clearInterval(intervalId)
}
```

By using a ref, you ensure that:在使用 ref 的过程中，你需要确保以下几点：

- You can **store information** between re-renders (unlike regular variables, which reset on every render). 多次渲染之间，你可以存储值
- Changing it **does not trigger a re-render** (unlike state variables, which trigger a re-render).改变引用不会引起重新渲染
- The **information is local** to each copy of your component (unlike the variables outside, which are shared).引用的值是局部的，在每个组件拷贝中都有一份。

Changing a ref does not trigger a re-render, so refs are not appropriate for storing information that you want to display on the screen. Use state for that instead. Read more about [choosing between `useRef` and `useState`.](/learn/referencing-values-with-refs#differences-between-refs-and-state)。改变 ref 值不会因此重新渲染，因此 ref 不适合存储展示在 UI 上的对象，你可以使用`State`来代替。

#### Pitfall 陷阱

**Do not write _or read_ `ref.current` during rendering.**不饿能在`rendering`中读写`ref.current`

React expects that the body of your component [behaves like a pure function](/learn/keeping-components-pure):
React 希望你的组件的 body 表现为纯函数

- If the inputs ([props](/learn/passing-props-to-a-component), [state](/learn/state-a-components-memory), and [context](/learn/passing-data-deeply-with-context)) are the same, it should return exactly the same JSX.
- Calling it in a different order or with different arguments should not affect the results of other calls.

Reading or writing a ref **during rendering** breaks these expectations.

```js
function MyComponent() {
  // ...
  // 🚩 Don't write a ref during rendering
  myRef.current = 123
  // ...
  // 🚩 Don't read a ref during rendering
  return <h1>{myOtherRef.current}</h1>
}
```

You can read or write refs **from event handlers or effects instead**.

```js
function MyComponent() {
  // ...
  useEffect(() => {
    // ✅ You can read or write refs in effects
    myRef.current = 123
  })
  // ...
  function handleClick() {
    // ✅ You can read or write refs in event handlers
    doSomething(myOtherRef.current)
  }
  // ...
}
```

If you _have to_ read [or write](/reference/react/useState#storing-information-from-previous-renders) something during rendering, [use state](/reference/react/useState) instead.

When you break these rules, your component might still work, but most of the newer features we're adding to React will rely on these expectations. Read more about [keeping your components pure.](/learn/keeping-components-pure#where-you-can-cause-side-effects)

### Manipulating the DOM with a ref 通过`ref`操作 DOM

It's particularly common to use a ref to manipulate the [DOM.](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API) React has built-in support for this.

First, declare a `ref object` with an `initial value` of `null`:

```js
import { useRef } from 'react'

function MyComponent() {
  const inputRef = useRef(null)
  // ...
}
```

Then pass your ref object as the `ref` attribute to the JSX of the DOM node you want to manipulate:

```js
// ...
return <input ref={inputRef} />
```

After React creates the DOM node and puts it on the screen, React will set the `current` property of your ref object to that DOM node. Now you can access the`<input>`'s DOM node and call methods like [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus):

```js
function handleClick() {
  inputRef.current.focus()
}
```

React will set the `current` property back to `null` when the node is removed from the screen. 当节点被移除后，ref.current 会设置为`null`

Read more about [manipulating the DOM with refs.](/learn/manipulating-the-dom-with-refs)

### Avoiding recreating the ref contents 避免重新创建 ref contents

React saves the initial ref value once and ignores it on the next renders.

```js
function Video() {
  const playerRef = useRef(new VideoPlayer())
  // ...
}
```

Although the result of `new VideoPlayer()` is only used for the initial render, you're still calling this function on every render. This can be wasteful if it's creating expensive objects.

To solve it, you may initialize the ref like this instead:

```js
function Video() {
  const playerRef = useRef(null)
  if (playerRef.current === null) {
    // 非空判断
    playerRef.current = new VideoPlayer()
  }
  // ...
}
```

Normally, writing or reading `ref.current` during render is not allowed. However, it's fine in this case because the result is always the same, and the condition only executes during initialization so it's fully predictable.

[How to avoid null checks when initializing useRef later](./%5Bdeep%20dive%5DHow%20to%20avoid%20null%20checks%20when%20initializing%20useRef%20later.md)

## Troubleshooting

### I can't get a ref to a custom component 如何获取自定义组件的 ref

If you try to pass a `ref` to your own component like this:

```js
const inputRef = useRef(null)

return <MyInput ref={inputRef} />
```

You might get an error in the console:

> Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?

By default, your own components don't expose refs to the DOM nodes inside them. 默认情况下，你的组件没有暴露 ref 出来，因此你需要`forwardRef`将其转发出来, 然后你就可以访问到自定义组件的 ref 了

To fix this, find the component that you want to get a ref to:

```js
export default function MyInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
    />
  )
}
```

And then wrap it in [`forwardRef`](/reference/react/forwardRef) like this:

```js
import { forwardRef } from 'react'

const MyInput = forwardRef(({ value, onChange }, ref) => {
  return (
    <input
      value={value}
      onChange={onChange}
      ref={ref}
    />
  )
})

export default MyInput
```

Then the parent component can get a ref to it.

Read more about [accessing another component's DOM nodes.](/learn/manipulating-the-dom-with-refs#accessing-another-components-dom-nodes)
