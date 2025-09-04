# Event loops

## Definitions 定义

- 是一种浏览器的规范
- 为了协调事件、用户交互、脚本、渲染、网络等，用户 `agent` 必须使用本节所述的事件循环。
- 每个 `agent` 都有一个相关的事件循环，该事件循环是特定于该 `agent` 的。
  - window event loop
  - worker event loop
  - worklet event loop
- 事件循环不一定与实现线程对应。例如，多个窗口事件循环可能在一个线程中协作调度。
- An event loop has one or more task queues. A task queue is a **set** of tasks. 事件循环有一个或多个任务队列。 任务队列是集合，不是队列，因为事件循环处理模型是从选定队列中获取**第一个可运行的任务**，而不是出队第一个任务。
- The microtask queue is not a task queue. 微任务队列不是任务队列。
- 每个事件循环都有一个当前正在运行的任务，该任务要么是一个任务，要么是 null。最初，它是 null。它用于处理可重入性。
- Each event loop has a microtask queue, which is a queue of microtasks, initially empty. A microtask is a colloquial way of referring to a task that was created via the queue a microtask algorithm. **每个事件循环都有一个微任务队列**，这是一个初始为空的微任务队列。微任务是指通过微任务算法队列创建的任务的非正式说法。
- Each event loop has a **performing a microtask checkpoint** boolean, which is initially `false`. It is used to prevent reentrant invocation of the perform a microtask checkpoint algorithm. 每个事件循环都有一个**执行微任务检查点**的布尔值，最初为 `false`。**它用于防止执行微任务检查点算法的可重入调用**。

## Queuing tasks 排队任务

- To queue a task on a task source source, which performs a series of steps steps, optionally given an event loop event loop and a document document 要在任务源 source 上队列一个任务，它执行一系列步骤 steps，可选择提供一个事件循环 event loop 和一个文档 document：

## Processing model 处理模型
An event loop must continually run through the following steps for as long as it exists:
事件循环必须在其存在期间持续运行以下步骤：
1. Let oldestTask and taskStartTime be null.将 oldestTask 和 taskStartTime 设为 null。

2. If the event loop has a task queue with at least one runnable task, then: 如果事件循环有一个包含至少一个可运行任务的任务队列📍，那么：
    1. Let taskQueue be one such task queue, chosen in an implementation-defined manner.让 taskQueue 是这样一个任务队列，其选择方式由实现定义。
    2. Set taskStartTime to the unsafe shared current time. 将 taskStartTime 设置为不安全的共享当前时间。
    3. Set oldestTask to the first runnable task in taskQueue, and remove it from taskQueue. 将 oldestTask 设置为 taskQueue 中的第一个可运行任务，并将其从 taskQueue 中移除。
    4. If oldestTask's document is not null, then record task start time given taskStartTime and oldestTask's document. 如果 oldestTask 的文档不为 null，则使用 taskStartTime 和 oldestTask 的文档记录任务开始时间。
    5. Set the event loop's currently running task to oldestTask.将事件循环当前正在运行的任务设置为 oldestTask。
    6. Perform oldestTask's steps. 执行 oldestTask 的步骤。
    7. Set the event loop's currently running task back to null. 将事件循环当前正在运行的任务重置为 null。
    8. **Perform a microtask checkpoint**📍. 执行微任务检查点。
3. Let taskEndTime be the unsafe shared current time. [HRT] 令 taskEndTime 为不安全的共享当前时间。[HRT]

4. If oldestTask is not null, then: 如果 oldestTask 不为 null，则：
    - 待理解
5. If this is a window event loop that has no runnable task in this event loop's task queues, then 如果这是一个没有可运行任务的事件循环，且该事件循环的任务队列中没有可运行的任务，则：
    - 待理解
...

When a user agent is to perform a microtask checkpoint:当用户代理要执行微任务检查点时：
1. If the event loop's performing a microtask checkpoint is true, then return. 如果事件循环正在执行微任务检查点，则返回。
2. Set the event loop's performing a microtask checkpoint to true. 将事件循环的微任务检查点设置为 true。
3. While the event loop's microtask queue is not empty: 当事件循环的微任务队列不为空时： <------------ 重复执行
    1. Let oldestMicrotask be the result of dequeuing from the event loop's microtask queue. 令 oldestMicrotask 为从事件循环的微任务队列中出队的结果。
    2. Set the event loop's currently running task to oldestMicrotask. 将事件循环当前正在运行的任务设置为**最老**的微任务。
    3. Run oldestMicrotask.  运行**最旧**的微任务。
    4. Set the event loop's currently running task back to null. 将事件循环当前正在运行的任务重置为 null。

7. Set the event loop's performing a microtask checkpoint to false. 将事件循环的微任务检查点设置为 false。
8. Record timing info for microtask checkpoint. 记录微任务检查点的计时信息。

## Generic task sources 通用任务源
- The DOM manipulation task source DOM 操作任务源
- The user interaction task source 用户交互任务源
- The networking task source 网络任务源
- The navigation and traversal task source 导航和遍历任务源
- The rendering task source 渲染任务源

## 任务的类型
- 宏任务
    - 脚本任务
    - I/O 任务
    - 定时器任务: setTimeout, setInterval
    - 用户交互任务: 点击, 滚动, 输入
    - UI渲染
- 微任务（微任务仅来自于我们的代码）：为了更及时的执行任务，微任务的执行时机是在宏任务执行完成后，DOM 渲染前。
  - `Promise`
  - `MutationObserver`：等待DOM更新后立即执行的需求
  - `queueMicrotask(func)`： 它对 `func` 进行排队，以在微任务队列中执行。

## Resources

- [Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)规范