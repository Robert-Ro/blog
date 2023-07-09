## `BroadcastChannel` 跟 `window.postMessage` 的区别

`BroadcastChannel` 和 `window.postMessage` 是两种不同的浏览器 API，用于在不同的窗口或文档之间进行通信。

`window.postMessage` 是一个用于跨窗口通信的 API，允许在不同的窗口或文档之间发送消息。它使用目标窗口的引用或目标窗口的 origin（源）来确定消息的接收方。可以在页面中的 JavaScript 代码中使用 `window.postMessage` 方法发送消息，并在其他窗口的代码中通过监听 `message` 事件来接收消息。这个 API 可以用于与父窗口、子窗口或跨域窗口进行通信。

`BroadcastChannel` 是一个用于同一域下不同上下文之间的通信的 API。它允许在同一个域名下的多个文档或窗口之间进行广播消息。使用 `BroadcastChannel`，你可以在一个窗口中发送消息，并在其他窗口中通过监听 `message` 事件接收到这些消息。与 `window.postMessage` 不同，`BroadcastChannel` 不需要知道目标窗口的引用或 origin，只要在同一域名下，就可以广播消息给所有订阅该频道的窗口。

主要区别如下：

- `window.postMessage` 是用于跨窗口通信，可以在不同窗口之间发送消息，而 `BroadcastChannel` 是同一域下不同上下文之间的通信。
- `window.postMessage` 需要明确指定目标窗口的引用或 origin，而 `BroadcastChannel` 只需在同一域名下广播消息。
- `window.postMessage` 可以用于与父窗口、子窗口或跨域窗口进行通信，而 `BroadcastChannel` 只能用于同一域名下的文档或窗口之间的通信。

选择使用哪个 API 取决于你的具体需求。如果你需要与不同域名下的窗口进行通信，或者需要与特定窗口进行通信，那么应该使用 `window.postMessage`。如果你只需要在同一域名下的窗口之间广播消息，那么 `BroadcastChannel` 是一个更简单的选择。

## 涉及跨页面/跨窗口通信的这块的 web API 还有哪些呢

除了 `BroadcastChannel` 和 `window.postMessage`，还有其他一些用于跨页面或跨窗口通信的 Web API，包括：

1. `localStorage` 和 `sessionStorage`：这两个 API 允许在同一域名下的不同页面之间共享数据。通过在一个页面中设置数据，其他页面可以读取和监听这些数据的更改事件。

2. `IndexedDB`：IndexedDB 是浏览器提供的一个客户端数据库，可以存储大量的结构化数据。它可以在不同的页面或窗口之间进行通信和数据共享。

3. `Web Workers`：Web Workers 允许在后台线程中运行 JavaScript 代码，独立于主线程。这使得在不同的页面或窗口之间进行并行计算和消息传递成为可能。

4. `Server-Sent Events`：Server-Sent Events 允许服务器向客户端推送事件流。它可以用于在不同页面或窗口之间实现实时的服务器到客户端通信。

5. `SharedWorker`：SharedWorker 是一种特殊类型的 Web Worker，可以在多个页面或窗口之间共享。多个页面可以通过与 SharedWorker 进行通信来实现共享状态或传递消息。

6. `BroadcastChannel` 和 `window.postMessage`：这两个 API 已经在前面提到过，它们也是常用于跨页面或跨窗口通信的选择。

这些 API 提供了不同的方式来实现跨页面或跨窗口通信，你可以根据具体的需求选择最适合的 API。
除了上述提到的 API，还有其他一些用于跨页面或跨窗口通信的 Web API，包括：

1. `BroadcastChannel`：如前所述，`BroadcastChannel` 允许在同一域名下的不同上下文之间进行广播消息。

2. `Shared Storage API`：这是一个实验性的 API，用于在不同的浏览器上下文（例如标签页、窗口和框架）之间共享数据。它提供了类似于 `localStorage` 的接口，但可以在不同的上下文中同步数据变化。

3. `Service Workers`：Service Workers 是在后台运行的 JavaScript 脚本，可以拦截网络请求和管理缓存。它们可以用于在不同的页面之间共享状态或消息，以及实现离线功能。

4. `MessageChannel`：`MessageChannel` 是一个底层的 API，允许在不同的上下文之间创建通信管道，并通过管道发送和接收消息。

这些 API 提供了不同的方式和灵活性，以满足不同的跨页面或跨窗口通信需求。根据具体的使用场景和要求，选择适合的 API 可以实现所需的通信功能。