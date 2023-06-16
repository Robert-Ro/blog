# 04 ｜内置 Hooks（2）：为什么要避免重复定义回调函数

> 上一节还遗留了一些问题
>
> - 事件处理函数会被重复定义
> - 计算过程需要缓存
> - 多次渲染之间共享数据
> - 跨组件传递数据
> - 多个状态方便维护

## useCallback：缓存回调函数

在 `React` 函数组件中，每一次 `UI` 的变化，都是通过重新执行整个函数来完成的，这和传统的 `Class` 组件有很大区别：

函数组件中并没有一个直接的方式在多次渲染之间维持一个状态。

每次重新执行**都会创建一个新的事件处理函数， 即使函数中的某个状态没有变化**。

_创建一个新的事件处理函数，虽然不影响结果的正确性，但其实是没必要的_。

- 增加系统的开销
- **创建新函数的方式会让接收事件处理函数的组件，需要重新渲染(属性变更了)**

> 比如这个例子中的 `button` 组件，接收了 `handleIncrement` ，并作为一个属性。如果每次都是一个新的，那么这个 `React`就会认为这个组件的 `props` 发生了变化，从而必须重新渲染。因此，我们需要做到的是：**只有当 `count` 发生变化时，我们才需要重新定一个回调函数。而这正是 `useCallback` 这个 `Hook` 的作用**。

函数签名：

```js
useCallback(fn, deps)
```

这里 `fn` 是定义的回调函数，`deps` 是依赖的变量数组。只有当某个依赖变量发生变化时，才会重新声明 `fn` 这个回调函数

## useMemo：缓存计算的结果

函数签名：

```js
useMemo(fn, deps)
```

这里的 `fn` 是产生所需数据的一个计算函数。通常来说，`fn` 会使用 `deps` 中声明的一些变量来生成一个结果，用来渲染出最终的 `UI`。

**如果某个数据是通过其它数据计算得到的，那么只有当用到的数据，也就是依赖的数据发生变化的时候，才应该需要重新计算**。

### 好处

- 避免重复计算
- 避免子组件的重复渲染

`useCallback`: 也可以用 `useMemo` 来实现(返回一个函数)

### 小结

**建立了一个绑定某个结果到依赖数据的关系。只有当依赖变了，这个结果才需要被重新得到**。

## useRef：在多次渲染之间共享数据

函数签名：

```js
const myRefContainer = useRef(initialValue)
```

> 我们可以把`useRef`看作是在函数组件之外创建的一个容器空间。在这个容器上，我们可以通过唯一的 `current` 属性上设置一个值，从而**在函数组件的多次渲染之间共享这个值**。

- **对象引用**：**计时器**、**`dom` 节点**的引用
- 保存的数据与 `UI` 渲染无关
  > 因此当 `ref` 的值发生变化时，是不会触发组件的重新渲染的，这也是 `useRef` 区别于 `useState` 的地方。

## useContext：定义全局状态

> 跨层次、同级组件通信

函数签名：

```js
const value = useContext(MyContext)
```

- `context` 存储的是固定的不可变数据

```js
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}
// 创建一个 Theme 的 Context
const ThemeContext = React.createContext(themes.light)
function App() {
  const [theme, setTheme] = useState('light')
  // 切换 theme 的回调函数
  const toggleTheme = useCallback(() => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))
  }, [])

  // 整个应用使用 ThemeContext.Provider 作为根组件
  return (
    // 使用 themes.dark 作为当前 Context
    <ThemeContext.Provider value={themes[theme]}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Toolbar />
    </ThemeContext.Provider>
  )
}
// 在 Toolbar 组件中使用一个会使用 Theme 的 Button
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}
// 在 Theme Button 中使用 useContext 来获取当前的主题
function ThemedButton() {
  const theme = useContext(ThemeContext)
  return (
    <button
      style={{
        background: theme.background,
        color: theme.foreground,
      }}
    >
      I am styled by theme context!
    </button>
  )
}
```

Q: `Context` 看上去就是一个全局的数据，为什么要设计这样一个复杂的机制，而不是直接用一个全局的变量去保存数据呢？
A: 其实很简单，就是为了能够进行数据的绑定。当这个 `Context` 的数据发生变化时，使用这个数据的组件就**能够自动刷新**。但如果没有 `Context`，而是使用一个简单的全局变量，就很难去实现了。

```jsx
<ThemeContext.Provider value={themes.dark}>
```

> 全局变量的问题：组件间数据隔离

`Context` 相当于提供了一个定义 `React` 世界中全局变量的机制，而全局变量则意味着两点：

1. 会让调试变得困难，因为你很难跟踪某个 `Context` 的变化究竟是如何产生的。
2. 让组件的复用变得困难，因为一个组件如果使用了某个 `Context`，它就必须确保被用到的地方一定有这个`Context` 的`Provider` 在其父组件的路径上。

所以在 `React` 的开发中，除了像 `Theme`、`Language` 等一目了然的需要全局设置的变量外，我们很少会使用 `Context` 来做太多数据的共享。需要再三强调的是，`Context` 更多的是提供了一个强大的机制，让 `React` 应用具备定义全局的响应式数据的能力。

> 主要应用在 UI lib 的开发中
> 应用中的全局解决方案多用 `Redux`等第三方状态库来处理

## Q&A

- Q: 关于子组件 `props` 不变，可以减少不必要的渲染问题，不是特别理解。似乎只要父组件重新渲染子组件必然重新渲染，是内部有什么别的地方优化么？
- A: 好问题，之前在 `Class` 组件中可以把组件继承自 `React.PureComponent`，从而 `props` 没变就不重新 `render`。现在函数组件没有 `PureComponent` 的概念，但是提供了 [React.memo](https://reactjs.org/docs/react-api.html#reactmemo) 这样一个高阶组件，**可以让任何`React`组件都能在`props`不变时就不重新渲染**。所以，在开发过程中，即使现在没有使用 `React.memo`，但是使用 `useCallback` 或者 `useMemo` 至少可以为性能优化提供一个基础。
- Q: `useRef` 如果只是用来在多次渲染之间共享数据，是不是直接可以把变量定义到组件外面，这样也可以达到目的，感觉还更方便一点呢
- A: `useRef`可以**保证这个变量只在当前组件的实例中使用**。也就是说，_如果一个组件页面上有多个实例_，比如：`<div><Timer /><Timer /></div>`,那么组件外的普通变量是被 `Timer` 共享的，就会产生问题。
- Q: 是任何场景函数都用 `useCallback` 包裹吗？那种轻量的函数是不是不需要？
- A: 确实不是，`useCallback` 可以减少不必要的渲染，主要体现在将回调函数作为属性传给某个组件。如果每次都不一样就会造成组件的重新渲染。_但是如果你确定子组件多次渲染也没有太大问题，特别是原生的组件，比如 `button`，那么不用 `useCallback` 也问题不大_。所以这和子组件的实现相关，和函数是否轻量无关。但是比较好的实践是都使用`useCallback`包裹一个事件处理函数
- Q: `useCallback`依赖数组是空数组表示什么？
- A: 没有意义，相当于每次都创建一个新的函数
- Q: 关于 `useMemo`，文档说的是性能优化的保证，也就是涉及到大量计算的时候可以使用，因为依赖项的比较本身也是有开销的。那如果我就只是很简单的计算，或者就只是返回一个固定的对象，有必要使用吗
- A: 依赖项比较大的性能开销可以忽略。`useMemo` 其实除了**解决自身计算的性能问题之外**，还有就是**可以避免接收这个数据的组件过多的重新渲染，以及依赖这个数据的其它`hooks`多余的计算**。所以即使简单的计算，最好也是用 `useMemo`
- Q: `const handleIncrement = useCallback(() => setCount(count + 1), [count]);` `const handleIncrement = useCallback(() => setCount(q => q + 1), []);`后者只创建了一次函数，但是又调用了多次在 `setCount` 的回调函数,前者只会在 `count` 变化的时候创建新的回调函数
- A: 严格来说，后者确实优于前者，因为后者在 `count` 变化时不会创建新的 `handleIncrement` 这样的 `callback`，这样接收这个属性的组件就不需要重新刷新。_但是对于简单的场景，可以忽略这种差异_。
- Q: `useCallback`、`useMemo` 和 `useEffect` 的依赖机制一样吗？都是浅比较吗？
- A: 是的，所以依赖比较都是浅比较
