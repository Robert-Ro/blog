# useMutableSource → useSyncExternalStore

Since experimental `useMutableSource` API was added, we’ve made changes to our overall concurrent rendering model that have led us to reconsider its design. Members of this Working Group have also reported flaws with the existing API contract that make it difficult for library maintainers to adopt `useMutableSource` in their implementations.

After additional research and discussions, here are our proposed changes to the API, which we intend to complete for React 18.

(For background, refer to the RFC for `useMutableSource`: https://github.com/reactjs/rfcs/blob/master/text/0147-use-mutable-source.md)

由于我们对并发渲染模型进行了一些更改，我们已经重新考虑了 `useMutableSource` API 的设计。工作组的成员也报告了现有 API 合约中存在的缺陷，这使得库维护者难以在实现中采用 `useMutableSource`。

在进一步的研究和讨论之后，我们提出了对 API 的修改建议，我们打算在 React 18 中完成这些修改。

（有关背景，请参考 `useMutableSource` 的 RFC：https://github.com/reactjs/rfcs/blob/master/text/0147-use-mutable-source.md）

## API overview

```js
import { useSyncExternalStore } from 'react'

// We will also publish a backwards compatible shim
// It will prefer the native API, when available
import { useSyncExternalStore } from 'use-sync-external-store/shim'

// Basic usage. getSnapshot must return a cached/memoized result
const state = useSyncExternalStore(store.subscribe, store.getSnapshot)

// Selecting a specific field using an inline getSnapshot
const selectedField = useSyncExternalStore(store.subscribe, () => store.getSnapshot().selectedField)
```

`getSnapshot` is used to check if the subscribed value has changed since the last time it was rendered, so the result needs to be referentially stable. That means it either needs to be an immutable value like a string or number, or it needs to be a cached/memoized object.

As a convenience, we will provide a version of the API with automatic support for memoizing the result of getSnapshot:

`getSnapshot` 用于检查自上次渲染以来订阅的值是否发生了变化，因此结果需要具备引用稳定性。这意味着它要么是一个不可变的值，比如字符串或数字，要么是一个已缓存/记忆化的对象。

为了方便起见，我们将提供一个带有自动支持的 API 版本，用于对 getSnapshot 的结果进行记忆化处理：

```js
// Name of API is not final
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector'
const selection = useSyncExternalStoreWithSelector(
  store.subscribe,
  store.getSnapshot,
  getServerSnapshot,
  selector,
  isEqual
)
```

## Selectors no longer need to be memoized 选择器（selectors）不再需要进行记忆化处理。

Inline selectors are a common feature of state libraries, especially those that provide a hook-based API, such as Redux’s `useSelector`.

A selector is a function that accepts a state value and “selects” the subset that is needed by the component. It signals that React only needs to re-render if that subset has changed.

Because `useMutableSource` does not provide a built-in `selector` API, the only way to implement this behavior is to resubscribe to the store every time the inline selector changes. If the selector function is not memoized, this means resubscribing on every new render. This is not only a performance pitfall, it’s one that leaks into user code: the user of a state management library must take extra caution to memoize all of its selectors.

Refer to [#84](https://github.com/reactwg/react-18/discussions/84) for a detailed description of this problem.

The new API is designed so that React no longer needs to resubscribe when the `getSnapshot` function changes. So you can pass an unmemoized selector without degrading performance.

By default, React will detect changes to a selected value by comparing with `Object.is`. Some state libraries rely on comparing values with a custom comparison function, like `shallowEqual`. While we don’t necessarily recommend this pattern, it can be implemented in userspace. Since we expect this to be a common feature request, we will publish our own userspace implementation.

内联选择器（inline selectors）是状态库的常见功能，特别是那些提供基于钩子（hook）API 的库，比如 Redux 的 `useSelector`。

选择器是一个接受状态值并“选择”组件所需子集的函数。它表明只有当子集发生变化时，React 才需要重新渲染。

由于 `useMutableSource` 不提供内置的选择器 API，实现这种行为的唯一方式是在内联选择器发生变化时重新订阅存储。如果选择器函数没有进行记忆化处理，这意味着在每次新渲染时都要重新订阅。这不仅是性能问题，而且会泄漏到用户代码中：状态管理库的用户必须特别小心地对所有选择器进行记忆化处理。

有关此问题的详细描述，请参考[#84](https://github.com/reactwg/react-18/discussions/84)。

新的 API 设计使得当 `getSnapshot` 函数发生变化时，React 不再需要重新订阅。因此，您可以传递一个未进行记忆化处理的选择器而不会降低性能。

默认情况下，React 将使用 `Object.is` 来检测选定值的变化。一些状态库依赖于使用自定义比较函数（例如 `shallowEqual`）进行值比较。虽然我们不一定推荐这种模式，但它可以在用户空间中实现。由于我们预计这将成为一个常见的功能需求，我们将发布我们自己的用户空间实现。

## Concurrent reads, synchronous updates 并发读取、同步更新

Another flaw of the `useMutableSource` API is that it can sometimes cause visible parts of the UI to be replaced with a fallback, even when the update is wrapped with `startTransition` (the API that is meant to avoid this scenario).

The reason is that `startTransition` relies on the ability to maintain multiple versions of a UI simultaneously (“concurrently”): the current UI that’s visible on screen, and a work-in-progress UI that is prepared in the background while data progressively streams in. React can do this with its built-in state APIs — `useState` and `useReducer` — but not for state that lives outside React, because we only can access a single version of state at a time. (To illustrate with an example, Redux’s store has a `getState` method, but it doesn’t have a `getBackgroundState` method; we could theoretically implement a contract to support concurrent data stores, but that’s outside the scope of this proposal.)

Our original strategy was to provide partial support for concurrent features: start rendering concurrently, and only deopt back to synchronous when we detect an inconsistency. “Deopt" in this context can mean:

1. Disabling time-slicing and reverting to fully synchronous, blocking rendering
2. During a refresh transition, hiding the UI and replacing it with a fallback instead of waiting for the new data to load in the background
   We went through great pains to preserve time-slicing as much as possible (1), even if it meant hiding already-visible UI with a fallback (2).

**We’ve since concluded that this trade-off is backwards: Replacing visible content with a fallback is a significant regression in the user experience, especially if it happens unpredictably**. By contrast, occasionally disabling time-slicing — while not ideal — has a much less dramatic effect on the end user experience.

Even worse is that useMutableSource can cause bad fallbacks during state updates that are completely unrelated, such as those triggered by a router, or a regular useState hook.

As we were brainstorming alternative strategies, a key revelation was that **if you can’t rely on startTransition to always avoid bad fallbacks caused by a store update, then you shouldn’t ever rely on it** — you should avoid the fallbacks in some other way. For example, you could do it the same way you would today without Suspense: by waiting for new data to load before triggering the update.

The next key revelation was that we **can avoid deopts during updates triggered by React state transitions if updates triggered by external stores are always synchronous**. That’s because if updates to stores are synchronous, they are guaranteed to be consistent.

So, in the new design:

- Updates triggered by a store change will always be synchronous, even when wrapped in startTransition
- In exchange, updates triggered by built-in React state will never deopt by showing a bad fallback, even if it reads from a store during the same render
  We think this hits the sweet spot of feature compatibility, ease of adoption, and predictable user experience.

We will be renaming the API to `useSyncExternalStore` to reflect its updated behavior.

As a bonus, we can get rid of the source argument and the corresponding `createMutableSource` API.

`useMutableSource` API 存在另一个缺陷，即有时即使使用`startTransition`包裹了更新，它仍可能导致可见部分的 UI 被替换为回退 UI。

原因是`startTransition`依赖于同时维护多个版本的 UI：当前可见在屏幕上的 UI 以及在数据逐步流入时在后台准备的工作中的 UI。React 可以通过其内置的状态 API（`useState`和`useReducer`）来实现这一点，但对于在 React 之外存在的状态，我们只能一次访问一个版本的状态（“并发”）。 （以一个例子来说明，Redux 的 store 有一个`getState`方法，但没有`getBackgroundState`方法；理论上我们可以实现一个支持并发数据存储的协议，但这超出了本提案的范围）。

我们最初的策略是为并发功能提供部分支持：开始并发渲染，并在检测到不一致性时恢复为同步阻塞渲染。在这种情况下，“恢复为同步阻塞渲染”可以意味着：

1. 禁用时间切片并完全恢复为同步阻塞渲染
2. 在刷新过渡期间，隐藏 UI 并替换为回退 UI，而不是等待新数据在后台加载完成
   我们费尽心思尽量保持时间切片（1），即使这意味着将已可见的 UI 隐藏起来显示回退 UI（2）。

**然而，我们后来得出的结论是这种权衡是错误的：用回退 UI 替换可见内容在用户体验上是一个显著的退步，特别是当这种情况发生时无法预测时**。相比之下，偶尔禁用时间切片虽然不理想，但对最终用户体验的影响要小得多。

更糟糕的是，`useMutableSource`可以导致完全不相关的状态更新引发糟糕的回退，例如由路由器或常规的`useState`钩子触发的更新。

当我们集思广益寻找替代策略时，一个关键的启示是**如果您不能依赖`startTransition`始终避免由存储更新引发的糟糕回退，那么您永远不应该依赖它**，您应该以其他方式避免回退。例如，您可以像今天没有使用 Suspense 一样，在触发更新之前等待新数据加载。

接下来的关键启示是，**如果由 React 状态转换引发的更新始终是同步的，我们可以避免更新期间的退化**。这是因为如果对存储的更新是同

步的，则可以确保它们是一致的。

因此，在新设计中：

- 由存储更改触发的更新将始终是同步的，即使包裹在`startTransition`中
- 作为交换，由内置 React 状态触发的更新将永远不会通过显示糟糕的回退来退化，即使在同一渲染过程中从存储中读取
  我们认为这符合特性兼容性、易用性和可预测的用户体验的最佳平衡点。

我们将重命名 API 为`useSyncExternalStore`以反映其更新后的行为。

额外的好处是，我们可以摒弃`source`参数和相应的`createMutableSource`API。

## Adoption strategy

Our goal is for all subscription-based libraries to migrate their implementations to `useSyncExternalStore`.

While it’s possible to implement a concurrent-compatible subscription in userspace, it’s very tricky to get right. Existing store implementations will continue to work as they do in React 17 until or unless a store update is wrapped with `startTransition`, at which point concurrency bugs may surface.

To encourage adoption by open source libraries, we will provide a shim that is compatible with older versions of React. The shim will prefer the built-in API when it is available, so that users get the correct implementation regardless of which version they’re running.

We are also considering a heuristic to detect when a userspace store update is wrapped with `startTransition`, so we can print advice to the console (in development mode) to use `useSyncExternalStore` instead. The heuristic is to count how many separate components are updated within a single `startTransition` call. If it’s greater than some arbitrary threshold, say 20, we can infer that it likely contains a subscription.

我们的目标是让所有基于订阅的库迁移到`useSyncExternalStore`。

虽然在用户空间中实现与并发兼容的订阅是可能的，但它非常棘手。现有的存储库实现将继续像在React 17中一样工作，直到（或除非）存储更新被`startTransition`包裹，此时可能会出现并发错误。

为了鼓励开源库的采用，我们将提供一个兼容旧版本React的shim。该shim将优先使用内置API，以便无论用户运行的是哪个版本，都可以获得正确的实现。

我们还在考虑一种启发式方法，用于检测用户空间存储更新是否被`startTransition`包裹，这样我们就可以在控制台（开发模式下）输出建议，使用`useSyncExternalStore`替代。启发式方法是计算在单个`startTransition`调用中更新的不同组件数量。如果该数量大于某个任意阈值，例如20，我们可以推断出它可能包含一个订阅。

这些举措旨在帮助库开发者顺利过渡到新的API，并提供支持和建议来解决可能出现的问题。