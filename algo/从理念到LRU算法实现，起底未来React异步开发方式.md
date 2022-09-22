# 从理念到 LRU 算法实现，起底未来 React 异步开发方式

数据缓存相关的`LRU`算法，内容包括四个方面：

- React 特性
- 这个特性和`LRU`算法的关系
- `LRU`算法的原理
- `React`中`LRU`的实现

## `Suspence`特性

在`React`16.6 引入了`Suspense`和`React.lazy`，用来分割组件代码。

```js
import A from './A'
import B from './B'

function App() {
  return (
    <div>
      <A />
      <B />
    </div>
  )
}
```

输出： `chunk.js`（包含 `A`、`B`、`App` 组件代码）

```js
// 之前
import B from './B'
// 之后
const B = React.lazy(() => import('./B'))
```

输出：

- `chunk.js`（包含 `A`、`App` 组件代码）
- `b.js`（包含 `B` 组件代码）

这样，`B` 组件代码会在首屏渲染时以 `jsonp` 的形式被请求，请求返回后再渲染。

为了在 `B` **请求返回之前显示占位符**，需要使用 `Suspense`：

```js
// 之前，省略其余代码
return (
  <div>
    <A />
    <B />
  </div>
)
// 之后，省略其余代码
return (
  <div>
    <A />
    <Suspense fallback={<div>loading...</div>}>
      <B />
    </Suspense>
  </div>
)
```

可见，`Suspense`的作用是：

> 在异步内容返回前，_显示占位符_（`fallback`属性），**返回后显示内容**。

再观察下使用`Suspense`后组件返回的`JSX`结构，会发现一个很厉害的细节：

> `JSX` 中完全看不出组件 `B` 是异步渲染的！

同步和异步的区别在于：

- 同步：开始 -> 结果

- 异步：开始 -> **中间态** -> 结果

`Suspense`可以将包裹在其中的**子组件的中间态逻辑收敛到自己身上**来处理（即`Suspense`的`fallback`属性），**所以子组件不需要区分同步、异步**。

那么，能不能将`Suspense`的能力从`React.lazy`（**异步请求组件代码**）推广到所有异步操作呢？

## resource 的大作为

`React`仓库是个`monorepo`，其中有个和`Suspense`结合的缓存库 —— `react-cache`，让我们看看他的用处。

假设我们有个请求用户数据的方法 `fetchUser`：

```js
const fetchUser = (id) => {
  return fetch(`xxx/user/${id}`).then((res) => res.json())
}
```

经由`react-cache`的`createResource`方法包裹，他就成为一个`resource`（资源）：

```js
import { unstable_createResource as createResource } from 'react-cache'
const userResource = createResource(fetchUser)
```

`resource`配合`Suspense`就能以同步的方式编写异步请求数据的逻辑：

```js
function User({ userID }) {
  const data = userResource.read(userID)
  return (
    <div>
      <p>name: {data.name}</p>
      <p>age: {data.age}</p>
    </div>
  )
}
```

背后的逻辑是：

- 首次调用 `userResource.read`，会创建一个 `promise`（即 `fetchUser` 的返回值）
- `throw promise`
- `React` 内部 `catch promise` 后，离 `User` 组件最近的祖先 `Suspense` 组件渲染 `fallback`
- `promise resolve` 后，`User` 组件重新 `render`
- 此时再调用 `userResource.read` 会返回 `resolve` 的结果（即 `fetchUser` 请求的数据），使用该数据继续 `render`

从步骤 1 和步骤 5 可以看出，对于一个请求，`userResource.read`可能会调用 2 次，即：

- 第一次发送请求、返回`promise`
- 第二次返回请求到的数据

所以`userResource`内部需要缓存该`promise`的值，缓存的`key`就是`userID`：

```js
const data = userResource.read(userID)
```

由于 `userID` 是 `User` 组件的 `props`，所以当 `User` 组件接收不同的 `userID` `时，userResource` 内部需要缓存不同 `userID` 对应的 `promise`。

如果切换 100 个 `userID`，就会缓存 100 个 `promise`。显然我们需要**一个缓存清理算法，否则缓存占用会越来越多，直至溢出**。

`react-cache`使用的缓存清理算法就是 `LRU` 算法。

## `LRU`原理

`LRU`（Least recently used，最近最少使用）算法的核心思想是：

> 如果数据最近被访问过，那么将来被访问的几率也更高

所以，**越常被使用的数据权重越高**。当需要清理数据时，总是清理最不常使用的数据。

## `react-cache`中`LRU`的实现

`react-cache`的实现包括两部分：

- 数据的存取
- `LRU`算法实现

### 数据的存取

每个通过 `createResource` 创建的 `resource` 都有一个对应 `map`，其中：

- 该 `map` 的 `key` 为 `resource.read(key)`执行时传入的 `key`
- 该 `map` 的 `value` 为 `resource.read(key)`执行后返回的 `promise`

在我们的 `userResource` 例子中，`createResource` 执行后会创建 `map`：

```js
const userResource = createResource(fetchUser)
```

`userResource.read` 首次执行后会在该 `map` 中设置一条 `userID` 为 `key`，`promise` 为 `value` 的数据（被称为一个 `entry`）：

```js
const data = userResource.read(userID)
```

要获取某个 `entry`，需要知道两样东西：

- `entry` 对应的 `key`
- `entry` 所属的 `resource`

### `LRU`算法的实现

`react-cache`使用**双向环状链表**实现`LRU`算法，包含三个操作：**插入**、**更新**、**删除**。

### 插入操作

![](../assets/image/fbc3097dad03494bb2ba55b7db3ae548_tplv-k3u1fbpfcp-watermark.awebp)
![](../assets/image/d2a8c1237bf24a0a9e616dfc156b7078_tplv-k3u1fbpfcp-watermark.awebp)
![](../assets/image/c15a770415a94fd49015344f233a35ee_tplv-k3u1fbpfcp-watermark.awebp)
可以看到，每当加入一个新`entry`，`first`总是指向他，暗含了`LRU`中新的总是高权重的思想。

### 更新操作

每当访问一个`entry`时，由于他被使用，他的权重会被更新为最高。

当再次访问`n1`时，n1 会被赋予最高权重：
![](../assets/image/2e07282283d041a8a7da35dda9a01997_tplv-k3u1fbpfcp-watermark.awebp)

### 删除操作

当缓存数量超过设置的上限时，`react-cache`会清除权重较低的缓存。

如果缓存最大限制为 1（即只缓存一个`entry`），则会迭代清理`first.previous`，直到缓存数量为 1。

每次清理后也会将`map`中对应的`entry`删掉。

## 总结

除了`React.lazy`、`react-cache`能结合`Suspense`，只要发挥想象力，任何异步流程都可以收敛到`Suspense`中，比如`React Server Compontnt`、`流式SSR`。

不管未来 React 开发出多少新奇玩意儿，底层永远是这些**基础算法与数据结构**。

## Reference

- [Links](https://juejin.cn/post/7018003023330803742)
- [wiki LRU](<https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)>)
- [React LRU](https://github.com/facebook/react/blob/main/packages/react-cache/src/LRU.js)实现

## 延申 Source Code

### `LRU`实现源码

```js
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import * as Scheduler from 'scheduler'

// Intentionally not named imports because Rollup would
// use dynamic dispatch for CommonJS interop named imports.
const {
  unstable_scheduleCallback: scheduleCallback,
  unstable_IdlePriority: IdlePriority, // 闲置优先级
} = Scheduler
// 链表节点结构，双向循环链表
type Entry<T> = {|
  value: T,
  onDelete: () => mixed, // Delete hooks
  previous: Entry<T>,
  next: Entry<T>,
|}
/**
 * 创建lru链表
 */
export function createLRU<T>(limit: number) {
  let LIMIT = limit

  // Circular, doubly-linked list
  let first: Entry<T> | null = null
  let size: number = 0
  /**
   * lru链表清除标记
   */
  let cleanUpIsScheduled: boolean = false
  /**
   * lru链表清除操作条件判断
   */
  function scheduleCleanUp() {
    if (cleanUpIsScheduled === false && size > LIMIT) {
      // The cache size exceeds the limit. Schedule a callback to delete the least recently used entries.
      cleanUpIsScheduled = true
      // 闲置是执行清除操作
      scheduleCallback(IdlePriority, cleanUp)
    }
  }
  /**
   * lru链表清除操作
   */
  function cleanUp() {
    cleanUpIsScheduled = false // 重置标记
    deleteLeastRecentlyUsedEntries(LIMIT)
  }
  /**
   * lru链表实际的清除操作
   * 链表删除操作
   */
  function deleteLeastRecentlyUsedEntries(targetSize: number) {
    // Delete entries from the cache, starting from the end of the list.从尾部开始
    if (first !== null) {
      const resolvedFirst: Entry<T> = (first: any)
      let last = resolvedFirst.previous
      while (size > targetSize && last !== null) {
        //循环删除
        const onDelete = last.onDelete
        const previous = last.previous
        last.onDelete = (null: any)

        // Remove from the list
        last.previous = last.next = (null: any)
        if (last === first) {
          // Reached the head of the list.
          first = last = null
        } else {
          ;(first: any).previous = previous
          previous.next = (first: any)
          last = previous
        }

        size -= 1

        // Call the destroy method after removing the entry from the list. If it
        // throws, the rest of cache will not be deleted, but it will be in a
        // valid state.
        onDelete()
      }
    }
  }
  /**
   * lru链表添加节点
   */
  function add(value: Object, onDelete: () => mixed): Entry<Object> {
    const entry = {
      value,
      onDelete,
      next: (null: any),
      previous: (null: any),
    }
    if (first === null) {
      entry.previous = entry.next = entry
      first = entry
    } else {
      // Append to head
      const last = first.previous
      last.next = entry
      entry.previous = last

      first.previous = entry
      entry.next = first

      first = entry
    }
    size += 1
    return entry
  }
  /**
   * lru链表节点更新
   */
  function update(entry: Entry<T>, newValue: T): void {
    entry.value = newValue
  }
  /**
   * 访问lru链表节点，同时更新first指针指向
   */
  function access(entry: Entry<T>): T {
    const next = entry.next
    if (next !== null) {
      // Entry already cached
      const resolvedFirst: Entry<T> = (first: any)
      if (first !== entry) {
        // Remove from current position
        const previous = entry.previous
        previous.next = next
        next.previous = previous

        // Append to head
        const last = resolvedFirst.previous
        last.next = entry
        entry.previous = last

        resolvedFirst.previous = entry
        entry.next = resolvedFirst

        first = entry
      }
    } else {
      // Cannot access a deleted entry
      // TODO: Error? Warning?
    }
    scheduleCleanUp()
    return entry.value
  }
  /**
   * 更新链表长度，立即触发清理
   */
  function setLimit(newLimit: number) {
    LIMIT = newLimit
    scheduleCleanUp()
  }

  return {
    add,
    update,
    access,
    setLimit,
  }
}
```

### Schedule(调度)

```js
function unstable_scheduleCallback(priorityLevel, callback, options) {
  var currentTime = getCurrentTime() // Performance.now()

  var startTime
  if (typeof options === 'object' && options !== null) {
    var delay = options.delay
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay
    } else {
      startTime = currentTime
    }
  } else {
    startTime = currentTime
  }

  var timeout
  // 优先级判断
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT
      break
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT
      break
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT
      break
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT
      break
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT
      break
  }
  // 根据优先级和起始时间计算ddl
  var expirationTime = startTime + timeout

  var newTask = {
    id: taskIdCounter++, // 全局递增
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
  }
  if (enableProfiling) {
    // FIXME: enableProfiling?
    newTask.isQueued = false
  }

  // TODO 待整理
  if (startTime > currentTime) {
    // NOTE：This is a delayed task.
    newTask.sortIndex = startTime
    push(timerQueue, newTask) //NOTE 小顶堆 @https://github.com/facebook/react/blob/9db8713f9d08c1956939e33cc2da25c867748263/packages/scheduler/src/SchedulerMinHeap.js#L16
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout()
      } else {
        isHostTimeoutScheduled = true
      }
      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime)
    }
  } else {
    newTask.sortIndex = expirationTime
    push(taskQueue, newTask)
    if (enableProfiling) {
      markTaskStart(newTask, currentTime)
      newTask.isQueued = true
    }
    // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true
      requestHostCallback(flushWork)
    }
  }

  return newTask
}
```
