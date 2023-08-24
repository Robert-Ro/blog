# A Complete Guide to useEffect 中文

## 问题：

- 🤔 如何用 useEffect 模拟 componentDidMount 生命周期？
- 🤔 如何正确地在 useEffect 里请求数据？[]又是什么？
- 🤔 我应该把函数当做 effect 的依赖吗？
- 🤔 为什么有时候会出现无限重复请求的问题？
- 🤔 为什么有时候在 effect 里拿到的是旧的 state 或 prop？

## TL,DR

### Question: 如何用`useEffect`模拟`componentDidMount`生命周期？

虽然可以使用`useEffect(fn, [])`，但它们并不完全相等。和`componentDidMount`不一样，`useEffect`会捕获 `props`和`state`。所以即便在回调函数里，你拿到的还是初始的`props`和`state`。如果你想得到“最新”的值，你可以使用`ref`。不过，通常会有更简单的实现方式，所以你并不一定要用`ref`。记住，`effects`的心智模型和`componentDidMount`以及其他生命周期是不同的，试图找到它们之间完全一致的表达反而更容易使你混淆。想要更有效，你需要“think in effects”，它的心智模型更接近于实现状态同步，而不是响应生命周期事件。

### 🤔 Question: 如何正确地在 `useEffect` 里请求数据？`[]`又是什么？

[这篇文章](https://www.robinwieruch.de/react-hooks-fetch-data/)是很好的入门，介绍了如何在`useEffect`里做数据请求。请务必读完它！它没有我的这篇这么长。`[]`表示 `effect` 没有使用任何 `React` 数据流里的值，因此该 `effect` 仅被调用一次是安全的。`[]`同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。你需要学习一些策略（主要是 `useReducer` 和 `useCallback`）来移除这些 `effect` 依赖，而不是错误地忽略它们。

### 🤔 Question: 我应该把函数当做 effect 的依赖吗？

一般建议:

- 把不依赖`props`和`state`的函数提到你的组件外面
- 并且把那些仅被`effect`使用的函数放到`effect`里面

如果这样做了以后，你的`effect`还是需要用到组件内的函数（包括通过`props`传进来的函数），可以在定义它们的地方用`useCallback`包一层。为什么要这样做呢？因为这些函数可以访问到`props`和`state`，因此它们会参与到数据流中。我们官网的 FAQ[有更详细的答案](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)。

### 🤔 Question: 为什么有时候会出现无限重复请求的问题？

> 没有设置依赖项/依赖项总是改变

这个通常发生于你在`effect`里做数据请求并且没有设置`effect`依赖参数的情况。没有设置依赖，`effect`会在每次渲染后执行一次，然后在`effect`中更新了状态引起渲染并再次触发`effect`。无限循环的发生也可能是因为你设置的依赖总是会改变。你可以通过一个一个移除的方式排查出哪个依赖导致了问题。但是，移除你使用的依赖（或者盲目地使用`[]`）通常是一种错误的解决方式。你应该做的是解决问题的根源。举个例子，函数可能会导致这个问题，你可以把它们放到`effect`里，或者提到组件外面，或者用`useCallback`包一层。`useMemo` 可以做类似的事情以避免重复生成对象。

### 🤔 为什么有时候在 `effect` 里拿到的是旧的 `state` 或 `prop` 呢？

`Effect` **拿到的总是定义它的那次渲染中的 `props` 和 `state`**。这能够避免一些 bugs，但在一些场景中又会有些讨人嫌。对于这些场景，你可以明确地使用可变的 `ref` 保存一些值（上面文章的末尾解释了这一点）。如果你觉得在渲染中拿到了一些旧的 `props` 和 `state`，且不是你想要的，你很可能遗漏了一些依赖。可以尝试使用这个 lint 规则来训练你发现这些依赖。可能没过几天，这种能力会变得像是你的第二天性。同样可以看我们官网 FAQ 中的这个回答。

## 每一次渲染都有它自己的 props 和 state

当我们更新状态的时候，React 会重新渲染组件。每一次渲染都能拿到独立的 count 状态，这个状态值是函数中的一个常量

## 每一次渲染都有它自己的事件处理函数

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  )
}
```

组件函数每次渲染都会调用，但是每一次调用中的 count 值都是常量，并且它被赋予了当前渲染中的状态值

组件拆解时序图：

```jsx
// During first render
function Counter() {
  const count = 0 // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  // ...
}

// After a click, our function is called again
function Counter() {
  const count = 1 // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  // ...
}

// After another click, our function is called again
function Counter() {
  const count = 2 // Returned by useState()
  // ...
  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  // ...
}
```

## 每次渲染都有它自己的 Effects

例子：

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

拆解：

```jsx
// During first render
function Counter() {
  // ...
  useEffect(
    // Effect function from first render
    () => {
      document.title = `You clicked ${0} times`
    }
  )
  // ...
}

// After a click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from second render
    () => {
      document.title = `You clicked ${1} times`
    }
  )
  // ...
}

// After another click, our function is called again
function Counter() {
  // ...
  useEffect(
    // Effect function from third render
    () => {
      document.title = `You clicked ${2} times`
    }
  )
  // ..
}
```

// NOTE 疑问：

```jsx
useEffect(() => {
  document.title = `You clicked ${count} times` // 这里却不是最新的count，是因为加了依赖数组项的缘故吗
}, [])
```

答：设置了`[]`依赖，`effect`不会再重新运行

## 每一次渲染都有它自己的…所有
