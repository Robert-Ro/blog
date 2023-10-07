# Escape Hatches “逃生舱”

Some of your components may need to control and synchronize with **systems outside of React**. For example, you might need to focus an input using the browser API, play and pause a video player implemented without React, or connect and listen to messages from a remote server. In this chapter, you’ll learn the escape hatches that let you “step outside” React and connect to external systems. Most of your application logic and data flow should not rely on these features.
你的一些组件可能需要控制和与 React 之外的系统进行同步。例如，你可能需要使用浏览器 API 聚焦一个输入框，播放和暂停一个不使用 React 实现的视频播放器，或者连接并监听来自远程服务器的消息。在本章中，你将学习一些逃生通道，让你“走出”React 并与外部系统连接。大部分应用程序逻辑和数据流不应依赖于这些特性。

In this chapter:

- [How to “remember” information without re-rendering]() 如何在不重新渲染的情况下“记住”信息
- [How to access DOM elements managed by React]() 如何访问由 React 管理的 DOM 元素
- [How to synchronize components with external systems]() 如何将组件与外部系统同步
- [How to remove unnecessary Effects from your components]() 如何从组件中移除不必要的 Effect
- [How an Effect’s lifecycle is different from a component’s]() Effect 的生命周期与组件的生命周期有何不同
- [How to prevent some values from re-triggering]() Effects 如何防止某些值重新触发 Effect
- [How to make your Effect re-run less often]() 如何减少 Effect 的重新运行次数
- [How to share logic between components](./Reusing-Logic-with-Custom-Hooks.md) 如何在组件之间共享逻辑

## Referencing values with refs

使用 ref 在多次渲染之间记住值

## Manipulating the DOM with refs

使用 ref 访问 DOM，如果需要的话

## Synchronizing with Effects

Some components need to synchronize with external systems. For example, you might want to control a non-React component based on the React state, set up a server connection, or send an analytics log when a component appears on the screen. Unlike event handlers, which let you handle particular events, Effects let you run some code after rendering. Use them to synchronize your component with a system outside of React.

一些组件需要与外部系统进行同步。例如，你可能希望根据 React 状态来控制一个非 React 组件，建立服务器连接，或者在组件出现在屏幕上时发送分析日志。与事件处理程序不同，事件处理程序让你处理特定事件，而 Effects 则让你在渲染后运行一些代码。使用 Effects 来将你的组件与 React 之外的系统进行同步。

- 控制视频播放
- 清除操作：断开服务器连接灯

> 开发模式下： React will immediately run and clean up your Effect one extra time.

## You Might Not Need An Effect 可能不需要 Effect

Effects are an escape hatch from the React paradigm. They let you “step outside” of React and synchronize your components with some external system. If there is no external system involved (for example, if you want to update a component’s state when some props or state change), you shouldn’t need an Effect. Removing unnecessary Effects will make your code easier to follow, faster to run, and less error-prone.
Effects 是从 React 范式中跳出的逃生通道。它们让你能够“走出”React，并将你的组件与某个外部系统进行同步。如果没有涉及外部系统（例如，如果你想在某些 props 或 state 改变时更新组件的状态），你不需要使用 Effect。移除不必要的 Effects 将使你的代码更易于理解、运行更快，且更不容易出错。

There are two common cases in which you don’t need Effects:
有两种常见情况下你不需要使用 Effects：

- You don’t need Effects to transform data for rendering.你不需要使用 Effects 来转换数据进行渲染。
- You don’t need Effects to handle user events.你不需要使用 Effects 来处理用户事件。

## Lifecycle of reactive effects 响应式效果的生命周期

Effects have a different lifecycle from components. Components may mount, update, or unmount. An Effect can only do two things: to start synchronizing something, and later to stop synchronizing it. This cycle can happen multiple times if your Effect depends on props and state that change over time.
Effects 与组件具有不同的生命周期。组件可能会挂载、更新或卸载。而 Effect 只能做两件事情：开始同步某个内容，然后停止同步。如果你的 Effect 依赖于随时间变化的 props 和 state，这个周期可能会多次发生。

## Separating events from Effects 将事件与 Effects 分离

> useEffectEvent: 实验性的 api
> Event handlers only re-run when you perform the same interaction again. Unlike event handlers, Effects re-synchronize if any of the values they read, like props or state, are different than during last render. Sometimes, you want a mix of both behaviors: an Effect that re-runs in response to some values but not others.
> 事件处理程序仅在执行相同的交互时重新运行。与事件处理程序不同，如果它们读取的值（如 props 或 state）与上次渲染时的值不同，Effects 将重新进行同步。有时，你希望同时具有两种行为：一种根据某些值重新运行的 Effect，但不根据其他值重新运行。

## Removing Effect dependencies 移除 Effect 的依赖项

When you write an Effect, the linter will verify that you’ve included every reactive value (like props and state) that the Effect reads in the list of your Effect’s dependencies. **This ensures that your Effect remains synchronized with the latest props and state of your component**. Unnecessary dependencies may cause your Effect to run too often, or even create an infinite loop. The way you remove them depends on the case.

## Reusing logic with custom Hooks

## Resources

- [escape-hatches](https://react.dev/learn/escape-hatches)
