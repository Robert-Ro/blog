## secrets of the `act(...)` api

[link](https://github.com/threepointone/react-act-examples/blob/master/sync.md)

tl;dr: wrap your test interactions with `act(() => ...)`. React will take care of the rest.
Note that for `async act(...)` you need React version at least [v16.9.0-alpha.0](https://github.com/facebook/react/releases/tag/v16.9.0-alpha.0).

### effects

Let's start with a simple component. It's contrived and doesn't do much, but is useful for this discussion.

```jsx
function App() {
  let [ctr, setCtr] = useState(0)
  useEffect(() => {
    setCtr(1)
  }, [])
  return ctr
}
```

So, it's an `App` with 2 hooks - a `useState` initialized with `0`, and a `useEffect` which runs only once, setting this state to `1`. We'll render it to a browser like so:

```jsx
ReactDOM.render(<App />, document.getElementById('app'))
```

You run it, and you see `1` on your screen. This makes sense to you - the effect ran immediately, updated the state, and that rendered to your screen.

So you write a test for this behavior, in everyone's favorite testing framework, [jest](https://jestjs.io/):

```jsx
it('should render 1', () => {
  const el = document.createElement('div')
  ReactDOM.render(<App />, el)
  expect(el.innerHTML).toBe('1') // this fails!
  // multiple render
})
```

You run your tests, and oops 😣

![screenshot of the test failing](https://user-images.githubusercontent.com/18808/52912654-441c9b80-32ac-11e9-9112-50b9329feebb.png)

That doesn't seem right. The value of `el.innerHTML` claims to `0`. But how can that be? Does jest do something strange? Or are you just hallucinating 或者你只是在幻觉中? The docs for useEffect make this a bit clearer - "By using this Hook, you tell React that your component needs to do something **after render**". How did you never see `0` in the browser, if even for a single moment?

To understand this, let's talk a bit about how React works. Since the big fiber rewrite of yore, React doesn't just 'synchronously' render the whole UI everytime you poke at it. It divides its work into chunks (called, er, 'work' 🙄), and queues it up in a scheduler.

In the component above, there are a few pieces of 'work' that are apparent to us:

- the 'first' render where react outputs `0`,
- the bit where it runs the effect and sets state to `1`
- the bit where it rerenders and outputs `1`

<img
  width="609"
  alt="a timeline of how react would schedule this work in a single browser frame. our test runs in the middle of this work, so misses later updates to the dom"
  src="https://user-images.githubusercontent.com/18808/52914771-3ecb4b00-32c4-11e9-9923-c577f371a4aa.png"
/>

We can now see the problem. We run our test at a point in time when react hasn't even finished updating the UI. You _could_ hack around this:

- by using `useLayoutEffect` instead of `useEffect`: while this would pass the test, we've changed product behavior for no good reason, and likely to its detriment.
- by waiting for some time, like 100ms or so: this is pretty ick, and might not even work depending on your setup.

Neither of these solutions are satisfying; we can do much better. In 16.8.0, we introduced a new testing api `act(...)`. It guarantees 2 things for any code run inside its scope:

- any state updates will be executed 任何状态更新都会被执行
- any enqueued effects will be executed 任何排队的副作用都将被执行

Further, React will warn you when you try to "set state" _outside of the scope of an `act(...)` call_. (ie - when you call the 2nd return value from a `useState`/`useReducer` hook)

Let's rewrite our test with this new api:

```jsx
it('should render 1', () => {
  const el = document.createElement('div')
  act(() => {
    // 在act的作用范围内
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('1') // this passes!
})
```

Neat, the test now passes! In short, "act" is a way of putting 'boundaries' around those bits of your code that actually 'interact' with your React app - these could be user interactions, apis, custom event handlers and subscriptions firing; anything that looks like it 'changes' something in your ui. React will make sure your UI is updated as 'expected', so you can make assertions on it.

太好了，现在测试通过了！简而言之，"act" 是一种在您的代码中放置'边界'的方法，用于实际'交互'您的 React 应用程序的那些部分 - 这些部分可能是用户交互、API、自定义事件处理程序和订阅触发等任何看起来像是'更改' UI 的东西。React 将确保您的 UI 被更新为'预期'的状态，因此您可以对其进行断言。

<img
  width="559"
  alt="a timeline like before, except this time all the work is bunched into one group, and we show how the test assertions happen after it"
  src="https://user-images.githubusercontent.com/18808/52914772-3ecb4b00-32c4-11e9-99c4-4915af46c149.png"
/>

(You can even nest multiple calls to `act`, composing interactions across functions, but in most cases you wouldn't need more than 1-2 levels of nesting.)

### events

Let's look at another example; this time, events:

```jsx
function App() {
  let [counter, setCounter] = useState(0)
  return <button onClick={() => setCounter(counter + 1)}>{counter}</button>
}
```

Pretty simple, I think: A button that increments a counter. You render this to a browser like before.

![a gif of a button being clicked, whose contents go from 0 to 10](https://user-images.githubusercontent.com/18808/52912742-64992580-32ad-11e9-8e1b-70e24d6329ee.gif)

So far, so good. Let's write a test for it.

```jsx
it('should increment a counter', () => {
  const el = document.createElement('div')
  document.body.appendChild(el)
  // we attach the element to document.body to ensure events work
  ReactDOM.render(<App />, el)
  const button = el.childNodes[0]
  for (let i = 0; i < 3; i++) {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  }
  expect(button.innerHTML).toBe('3')
})
```

This 'works' as expected. The warning doesn't fire for setStates called by 'real' event handlers, and for all intents and purposes this code is actually fine.

But you get suspicious, and because Sunil told you so, you extend the test a bit -

```jsx
act(() => {
  for (let i = 0; i < 3; i++) {
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  }
})
expect(button.innerHTML).toBe(3) // this fails, it's actually "1"!
```

The test fails, and `button.innerHTML` claims to be "1"! Well shit, at first, this seems annoying. But `act` has uncovered a potential bug here - if the handlers are ever called close to each other, it's possible that the handler will use stale data and miss some increments. The 'fix' is simple - we rewrite with 'setState' call with the updater form ie - `setCounter(x => x + 1)`, and the test passes. This demonstrates the value `act` brings to grouping and executing interactions together, resulting in more 'correct' code. Yay, thanks `act`!

测试失败了，而 `button.innerHTML` 声称为 "1"！这一开始看起来很烦人。但是，`act` 在这里揭示了一个潜在的 bug - 如果处理程序彼此接近地调用，那么处理程序可能会使用过时的数据并且会错过一些增量。'修复'很简单 - 我们使用更新程序形式重写了 `setState` 调用，即 `setCounter(x => x + 1)`，然后测试通过了。这证明了 `act` 在将交互分组和执行在一起方面所带来的价值，从而产生了更加'正确'的代码。太好了，感谢 `act`！

### timers

Let's keep going. How about stuff based on timers? Let's write a component that 'ticks' after one second.

```jsx
function App() {
  const [ctr, setCtr] = useState(0)
  useEffect(() => {
    setTimeout(() => setCtr(1), 1000)
  }, [])
  return ctr
}
```

Let's write a test for this:

```jsx
it('should tick to a new value', () => {
  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('0')
  // ???
  expect(el.innerHTML).toBe('1')
})
```

What could we do here?

Option 1 - Let's lean on jest's [timer mocks](https://jestjs.io/docs/en/timer-mocks).

```jsx
it('should tick to a new value', () => {
  jest.useFakeTimers()
  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('0')
  jest.runAllTimers()
  expect(el.innerHTML).toBe('1')
})
```

![a screnshot of jest's output - showing that the test passed, but a warning appeared as well](https://user-images.githubusercontent.com/18808/52912877-885d6b00-32af-11e9-9a0b-0ba4f9adc756.png)

Better! We were able to convert asynchronous time to be synchronous and manageable. We also get the warning; when we ran `runAllTimers()`, the timeout in the component resolved, triggering the setState. Like the warning advises, we mark the boundaries of that action with `act(...)`. Rewriting the test -

太好了！我们能够将异步时间转换为同步和可管理的时间。我们还收到了警告；当我们运行 `runAllTimers()` 时，组件中的超时解析，触发了 `setState`。就像警告建议的那样，我们使用 `act(...)` 标记了该操作的边界。重写测试 -

```jsx
it('should tick to a new value', () => {
  jest.useFakeTimers()
  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('0')
  act(() => {
    jest.runAllTimers()
  })
  expect(el.innerHTML).toBe('1')
})
```

Test passes, no warnings, huzzah! Good stuff.

Option 2 - Alternately, let's say we wanted to use 'real' timers. This is a good time to introduce the asynchronous version of act. Introduced in 16.9.0-alpha.0, it lets you define an asynchronous boundary for `act()`. Rewriting the test from above -

```jsx
it('should tick to a new value', async () => {
  // a helper to use promises with timeouts
  function sleep(period) {
    return new Promise((resolve) => setTimeout(resolve, period))
  }
  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('0')
  await act(async () => {
    await sleep(1100) // wait *just* a little longer than the timeout in the component
  })
  expect(el.innerHTML).toBe('1')
})
```

Again, tests pass, no warnings. excellent!
再次测试通过，没有警告。太棒了！

This simplifies a lot of rough edges with testing asynchronous logic in components. You don't have to mess with fake timers or builds anymore, and can write tests more 'naturally'. As a bonus, it will (eventually) be compatible with concurrent mode!
这简化了在组件中测试异步逻辑的许多棘手问题。您不再需要使用虚拟计时器或构建，可以更'自然地'编写测试。作为奖励，它（最终）将与并发模式兼容！

While it's less restrictive than the synchronous version, it supports all its features, but in an async form. The api makes some effort to make sure you don't interleave these calls, maintaining a tree-like shape of interactions at all times.

虽然它比同步版本不那么严格，但它支持所有功能，但以异步形式。API 会尽力确保您不会交错这些调用，始终保持交互的树状形状。

### promises

Let's keep going. This time, let's use promises. Consider a component that fetches data with, er, `fetch` -

```jsx
function App() {
  let [data, setData] = useState(null)
  useEffect(() => {
    fetch('/some/url').then(setData)
  }, [])
  return data
}
```

Let's write a test again. This time, we'll mock `fetch` so we have control over when and how it responds:

```jsx
it('should display fetched data', () => {
  // a rather simple mock, you might use something more advanced for your needs
  let resolve
  function fetch() {
    return new Promise((_resolve) => {
      resolve = _resolve
    })
  }

  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('')
  resolve(42)
  expect(el.innerHTML).toBe('42')
})
```

The test passes, but we get the warning again. Like before, we wrap the bit that 'resolves' the promise with `act(...)`

```jsx
// ...
expect(el.innerHTML).toBe('')
await act(async () => {
  resolve(42)
})
expect(el.innerHTML).toBe('42')
// ...
```

This time, the test passes, and the warning's disappeared. Brilliant. Of note, even though it might appear like `resolve(42)` is synchronous, we use the async version to make sure microtasks are flushed before releasing scope, preventing the warning. Neat.

### async / await

Now, let's do _hard mode_ with `async/await`. :(

Haha, just joking, this is now as simple as the previous examples, now that we have the asynchronous version to capture the scope. Revisiting the component from the previous example -

```jsx
function App() {
  let [data, setData] = useState(null)
  async function somethingAsync() {
    // this time we use the await syntax
    let response = await fetch('/some/url')
    setData(response)
  }
  useEffect(() => {
    somethingAsync()
  }, [])
  return data
}
```

And run the same test on it -

```jsx
it('should display fetched data', async () => {
  // a rather simple mock, you might use something more advanced for your needs
  let resolve
  function fetch() {
    return new Promise((_resolve) => {
      resolve = _resolve
    })
  }
  const el = document.createElement('div')
  act(() => {
    ReactDOM.render(<App />, el)
  })
  expect(el.innerHTML).toBe('')
  await act(async () => {
    resolve(42)
  })
  expect(el.innerHTML).toBe('42')
})
```

Literally the same as the previous example. All good and green. Niceee.

---

Notes:

- if you're using `ReactTestRenderer`, you should use `ReactTestRenderer.act` instead.
- we can reduce some of the boilerplate associated with this by integrating `act` directly with testing libraries; [react-testing-library](https://github.com/kentcdodds/react-testing-library/) already wraps its helper functions by default with act, and I hope that enzyme, and others like it, will do the same.

---

with chatGPT:

这篇文章介绍了 React 中的 `act` 函数以及它在测试中的应用。下面是对文章的翻译：

# React `act` 函数同步行为的例子

> 这是一系列关于 React `act` 函数用法的例子。它们旨在帮助你更好地理解和使用 `act` 函数。

## 引言

React 提供了一个名为 `act` 的函数，用于确保在进行 React 组件的测试时，所有的状态变更和副作用操作都能在**合适的时间点**得到处理。

在 React 组件测试中，我们经常会进行异步操作，例如**数据获取**、**事件处理**等。这些操作可能会导致组件状态的更新，从而引发重新渲染。**`act` 函数的目的就是在这些异步操作执行后，等待所有状态更新和副作用操作完成，然后进行断言**。

## 同步行为的例子

下面的例子展示了一些同步行为的使用情况。这些情况下，我们不需要 `act` 函数来包装测试代码，因为没有异步操作或延迟的状态更新。

### 例子 1: 初始化状态

```jsx
test('初始状态', () => {
  const { getByTestId } = render(<Component />)
  expect(getByTestId('counter').textContent).toBe('0')
})
```

在这个例子中，我们渲染了一个组件，并断言初始状态下计数器的文本内容为 `'0'`。由于没有异步操作，我们不需要使用 `act` 函数包装测试代码。

### 例子 2: 用户交互

```jsx
test('用户交互', () => {
  const { getByTestId, getByText } = render(<Component />)
  fireEvent.click(getByText('增加'))
  expect(getByTestId('counter').textContent).toBe('1')
})
```

在这个例子中，我们模拟了用户的点击行为，并断言计数器的文本内容是否为 `'1'`。由于点击事件是同步触发的，没有异步操作，因此不需要使用 `act` 函数。

### 例子 3: 使用 `waitFor`

```jsx
test('使用 waitFor', async () => {
  const { getByTestId, getByText } = render(<Component />)
  fireEvent.click(getByText('异步增加'))
  await waitFor(() => expect(getByTestId('counter').textContent).toBe('1'))
})
```

在这个例子中，我们使用了 `waitFor` 函数来等待异步操作完成。**`waitFor` 函数会不断地检查断言条件是否满足，直到超时或条件满足**。由于 `waitFor` 函数会等待异步操作完成后才继续执行后面的代码，因此不需要额外的 `act` 函数来包装测试代码。

## 结论

`act` 函数在 React 组件测试中起到了关键的作用，确保我们在进行异步操作时能够正确处理状态更新和副作用操作。然而，在一些同步行为的情
