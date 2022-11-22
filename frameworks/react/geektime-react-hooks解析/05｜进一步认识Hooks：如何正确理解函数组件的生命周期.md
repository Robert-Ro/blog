# 05 ｜进一步认识 `Hooks`：如何正确理解函数组件的生命周期

## 忘掉 Class 组件的生命周期

`React` 中仍存在 `class` 组件的原因：

- `react` 团队努力保持 API 的稳定性
- 大量的存量应用还是使用 `class` 组件实现的，对于维护者或加入者来说，了解 `class` 组件时很有必要的

**在函数组件中你要思考的方式永远是：当某个状态发生变化时，我要做什么**，_而不再是在 `Class`组件中的某个生命周期方法中我要做什么_。

为了理解函数组件的执行过程，我们不妨思考下 `React` 的本质：从 `Model` 到 `View` 的映射。假设状态永远不变，那么实际上函数组件就相当于是一个模板引擎，只执行一次。但是 `React` 本身正是为动态的状态变化而设计的，而可能引起状态变化的原因基本只有两个：

1. 用户操作产生的事件，比如点击了某个按钮。
2. 副作用产生的事件，比如发起某个请求正确返回了。

这两种事件本身并不会导致组件的重新渲染，但我们在这两种事件处理函数中，一定是因为改变了某个状态，这个状态可能是`State` 或者 `Context`，从而导致了 `UI` 的重新渲染。

当然，要一下子彻底转变是很难的，你需要在实际开发中不断练习。那具体这样才能算是用 Hooks 方式思考呢？接下来我们就一起来对比看个例子，当一个需求来的时候，基于类组件的生命周期机制是如何做的，而在函数组件中又是如何做的。

## 重新思考组件的生命周期

### 构造函数

这时候我们不妨思考下构造函数的本质，其实就是：在所以其它代码执行之前的一次性初始化工作。在函数组件中，因为没有生命周期的机制，那么转换一下思路，其实我们要实现的是：**一次性的代码执行**。

```ts
import { useRef } from 'react'
// 创建一个自定义 Hook 用于执行一次性代码
function useSingleton(callback) {
  // 用一个 called ref 标记 callback 是否执行过
  const called = useRef(false)
  // 如果已经执行过，则直接返回
  if (called.current) return
  // 第一次调用时直接执行
  callBack()
  // 设置标记为已执行过
  called.current = true
}
```

所以你在日常开发中，是无需去将功能映射到传统的生命周期的构造函数的概念，而是要从函数的角度出发，去思考功能如何去实现。比如在这个例子中，我们需要的其实就是抓住某段代码只需要执行一次这样一个本质的需求，从而能够更自然地用 `Hooks` 解决问题。

### 三种常用的生命周期方法

class 组件常用的三个生命周期方法：`componentDidMount`, `componentDidUpdate`, `componentWillUnMount`

```ts
useEffect(() => {
  // componentDidMount + componentDidUpdate
  console.log('这里基本等价于 componentDidMount + componentDidUpdate')
  return () => {
    // componentWillUnmount
    console.log('这里基本等价于 componentWillUnmount')
  }
}, [deps])
```

基本等价：

- useEffect(callback)这个 Hook 接收的 callback，只有在依赖项变化时才被执行，而传统的`componentDidUpdate`一定会执行
- `callback` 返回的函数（一般用于清理工作）在**下一次依赖项发生变化**以及**组件销毁之前**执行，而传统的
  `componentWillUnmount` 只在**组件销毁时**才会执行。

#### 举例

我们不妨继续看博客文章这个例子。假设当文章 id 发生变化时，我们不仅需要获取文章，同时还要监听某个事件，这样在有新的评论时获得通知，就能显示新的评论了。这时候的代码结构如下：

```ts
import React, { useEffect } from 'react'
import comments from './comments'
function BlogView({ id }) {
  const handleCommentsChange = useCallback(() => {
    // 处理评论变化的通知
  }, [])
  useEffect(() => {
    // 获取博客内容
    fetchBlog(id)
    // 监听指定 id 的博客文章的评论变化通知
    const listener = comments.addListener(id, handleCommentsChange)
    return () => {
      // 当 id 发生变化时，移除之前的监听,
      comments.removeListener(listener)
    }
  }, [id, handleCommentsChange])
}
```

那么可以比较清楚地看到，`useEffect` 接收的返回值是一个回调函数，这个回调函数不只是会在组件销毁时执行，而且是每次`Effect` 重新执行之前都会执行，用于清理上一次 `Effect` 的执行结果。

理解这一点非常重要。`useEffect` 中返回的回调函数，只是清理当前执行的 `Effect` 本身。

### 其他的生命周期方法

但是 `Class` 组件中还有其它一些比较少用的方法，比如 `getSnapshotBeforeUpdate`, `componentDidCatch`,
`getDerivedStateFromError`。比较遗憾的是目前 `Hooks` 还没法实现这些功能。因此如果必须用到，你的组件仍然需要用类组件去实现。

## 已有应用是否应该迁移到 `Hooks`？

> 完全没有必要

在 `React` 中，`Class` 组件和函数组件是完全可以共存的。对于新的功能，我会更推荐使用函数组件。而对于已有的功能，则维持现状就可以。除非要进行大的功能改变，可以顺便把相关的类组件进行重构，否则是没有必要进行迁移的。

1. 类组件和函数组件可以互相引用；
2. `Hooks` 很容易就能转换成高阶组件，并供类组件使用。

## 思考题

今天这节课我们只描述了 `componentWillUnmount` 近似的实现：组件销毁和文章 `id` 变化时执行。那么在函数组件中如果要实现严格的 `componentWillUnmount`，也就是只在组件销毁时执行，应该如何实现？
