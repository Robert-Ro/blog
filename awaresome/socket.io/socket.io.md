# Socket.io

## Features

Socket.IO enables real-time bidirectional event-based communication. It consists of:
Socket.IO 实现了实时的双向基于事件的通信。它由以下组件组成：

- a Node.js server (this repository) 一个 Node.js 服务器（本仓库）
- a [Javascript client library](https://github.com/socketio/socket.io-client) for the browser (or a Node.js client), 一个用于浏览器（或 Node.js 客户端）的 JavaScript 客户端库

Some implementations in other languages are also available 一些其他语言的实现也是可用的：

- [Java](https://github.com/socketio/socket.io-client-java)
- [C++](https://github.com/socketio/socket.io-client-cpp)
- [Swift](https://github.com/socketio/socket.io-client-swift)
- [Dart](https://github.com/rikulo/socket.io-client-dart)
- [Python](https://github.com/miguelgrinberg/python-socketio)
- [.NET](https://github.com/doghappy/socket.io-client-csharp)
- [Rust](https://github.com/1c3t3a/rust-socketio)

Its main features are:

#### Reliability 可靠性

Connections are established even in the presence of 即使存在以下情况，也可以建立连接:

- proxies and load balancers 代理和负载均衡器.
- personal firewall and antivirus software 个人防火墙和杀毒软件.

For this purpose, it relies on [Engine.IO](https://github.com/socketio/engine.io), which first establishes a long-polling connection, then tries to upgrade to better transports that are "tested" on the side, like WebSocket. Please see the [Goals](https://github.com/socketio/engine.io#goals) section for more information. 为此，它依赖于 Engine.IO，它首先建立一个长轮询连接，然后尝试升级到更好的传输方式，如 `WebSocket` 等。请参阅 Goals 部分了解更多信息。

#### Auto-reconnection support 自动重连支持

Unless instructed otherwise a disconnected client will try to reconnect forever, until the server is available again. Please see the available reconnection options [here](https://socket.io/docs/v3/client-api/#new-Manager-url-options).除非另有指示，断开连接的客户端将无限次地尝试重新连接，直到服务器再次可用。请参阅此处了解可用的重新连接选项。

#### Disconnection detection 断开连接检测

A heartbeat mechanism is implemented at the Engine.IO level, allowing both the server and the client to know when the other one is not responding anymore.在 Engine.IO 级别实现了一个心跳机制，允许服务器和客户端都知道对方不再响应。

That functionality is achieved with timers set on both the server and the client, with timeout values (the `pingInterval` and `pingTimeout` parameters) shared during the connection handshake. Those timers require any subsequent client calls to be directed to the same server, hence the `sticky-session` requirement when using multiples nodes.该功能通过在服务器和客户端上设置计时器实现，使用连接握手期间共享的超时值（pingInterval 和 pingTimeout 参数）。这些计时器要求任何后续的客户端调用都指向同一个服务器，因此在使用多个节点时需要 sticky-session。

#### Binary support 二进制支持

Any serializable data structures can be emitted, including 可以发送任何可序列化的数据结构，包括:

- [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) in the browser 在浏览器中使用 ArrayBuffer 和 Blob
- [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and [Buffer](https://nodejs.org/api/buffer.html) in Node.js 在 Node.js 中使用 ArrayBuffer 和 Buffer

#### Simple and convenient API 简单和便捷的 API

Sample code:

```js
io.on('connection', (socket) => {
  socket.emit('request' /* … */) // emit an event to the socket
  io.emit('broadcast' /* … */) // emit an event to all connected sockets
  socket.on('reply', () => {
    /* … */
  }) // listen to the event
})
```

#### Cross-browser

Browser support is tested in Sauce Labs:
[![Sauce Test Status](https://saucelabs.com/browser-matrix/socket.svg)](https://saucelabs.com/u/socket)

#### Multiplexing support 多路复用支持

In order to create separation of concerns within your application (for example per module, or based on permissions), Socket.IO allows you to create several `Namespaces`, which will act as separate communication channels but will share the same underlying connection 为了在应用程序中创建关注点的分离（例如按模块或基于权限），Socket.IO 允许您创建多个 Namespace，它们将充当独立的通信通道，但共享相同的底层连接.

#### Room support 房间支持

Within each `Namespace`, you can define arbitrary channels, called `Rooms`, that sockets can join and leave. You can then broadcast to any given room, reaching every socket that has joined it 在每个 Namespace 中，您可以定义任意的通道，称为 Room，套接字可以加入和离开这些房间。然后，您可以向任何给定的房间进行广播，以达到加入该房间的每个套接字.

This is a useful feature to send notifications to a group of users, or to a given user connected on several devices for example 这是一个有用的功能，可以向一组用户或连接在多个设备上的给定用户发送通知.

**Note:** Socket.IO is not a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a WebSocket server (like `ws://echo.websocket.org`) either. Please see the protocol specification [here](https://github.com/socketio/socket.io-protocol)
Socket.IO 不是 WebSocket 的实现。虽然 Socket.IO 在可能的情况下确实使用 WebSocket 作为传输，但它会向每个数据包添加一些元数据：数据包类型、命名空间和在需要消息确认时的 ack id。这就是为什么 WebSocket 客户端无法成功连接到 Socket.IO 服务器，Socket.IO 客户端也无法连接到 WebSocket 服务器（例如 ws://echo.websocket.org）。请参阅协议规范此处.

## socket.io Emit cheatsheet

```js
// Server-side
io.on('connection', (socket) => {
  // 向发送方发送基本的emit
  socket.emit(/* ... */)

  // 向当前命名空间中的所有客户端（除发送方外）广播
  socket.broadcast.emit(/* ... */)

  // 向房间1中的所有客户端（除发送方外）广播
  socket.to('room1').emit(/* ... */)

  // 向房间1和/或房间2中的所有客户端（除发送方外）广播
  socket.to(['room1', 'room2']).emit(/* ... */)

  // 向房间1中的所有客户端广播
  io.in('room1').emit(/* ... */)

  // 向房间1和/或房间2中的所有客户端（除了房间3中的客户端）广播
  io.to(['room1', 'room2']).except('room3').emit(/* ... */)

  // 向命名空间"myNamespace"中的所有客户端广播
  io.of('myNamespace').emit(/* ... */)

  // 向命名空间"myNamespace"中的房间1中的所有客户端广播
  io.of('myNamespace').to('room1').emit(/* ... */)

  // 向特定socketid发送私密消息
  io.to(socketId).emit(/* ... */)

  // 向当前节点上的所有连接的客户端广播（在使用多个节点时）
  io.local.emit(/* ... */)

  // 向所有已连接的客户端广播
  io.emit(/* ... */)

  // 向所有客户端发送消息，并对每个客户端进行一次确认
  io.timeout(5000).emit('hello', 'world', (err, responses) => {
    if (err) {
      // 一些客户端在给定的延迟内没有确认该事件
    } else {
      console.log(responses) // 每个客户端的一个响应
    }
  })

  // 警告：`socket.to(socket.id).emit()`不起作用，因为它将发送给房间名为`socket.id`的所有人，但不包括发送方。请改用经典的`socket.emit()`。

  // 带有确认的emit
  socket.emit('question', (answer) => {
    // ...
  })

  // 不使用压缩
  socket.compress(false).emit(/* ... */)

  // 一个可能在低级传输不可写时被丢弃的消息
  socket.volatile.emit(/* ... */)

  // 带有超时设置
  socket.timeout(5000).emit('my-event', (err) => {
    if (err) {
      // 在给定的延迟内，对方没有确认该事件
    }
  })
})
// Client-side
// 基本的emit
socket.emit(/* ... */)

// 带有确认的emit
socket.emit('question', (answer) => {
  // ...
})

// 不使用压缩
socket.compress(false).emit(/* ... */)

// 一个可能在低级传输不可写时被丢弃的消息
socket.volatile.emit(/* ... */)

// 带有超时设置
socket.timeout(5000).emit('my-event', (err) => {
  if (err) {
    // 在给定的延迟内，对方没有确认该事件
  }
})
```

## chatGPT-概念帮助

### 概念

当然！以下是一些常见的 Socket.IO 概念的整理：

1. Socket.IO 服务器（Server）：Socket.IO 的服务器端组件，负责处理客户端连接、事件传输和房间管理等功能。

2. Socket.IO 客户端（Client）：Socket.IO 的客户端组件，用于与服务器建立连接、发送和接收事件。

3. 命名空间（Namespace）：Socket.IO 中的命名空间用于对不同类型的连接进行分组，允许在同一个服务器上使用多个独立的 Socket.IO 实例。命名空间可以用于隔离不同的功能或应用程序。

4. 房间（Room）：Socket.IO 中的房间是一种分组机制，允许将连接分配到特定的房间中。这样可以实现向特定房间中的连接发送事件，或者从房间中排除某些连接。

5. 事件（Event）：Socket.IO 是基于事件的通信模型，通过事件进行数据传输和通信。客户端和服务器可以发送和监听不同的事件。

6. emit()：在 Socket.IO 中，emit() 是客户端和服务器用于发送事件的方法。通过指定事件名称和要传输的数据，可以向特定的连接或房间发送事件。

7. on()：在 Socket.IO 中，on() 是客户端和服务器用于监听事件的方法。通过指定事件名称和回调函数，可以接收和处理接收到的事件。

8. 广播（Broadcast）：在 Socket.IO 中，广播是指向除发送者之外的所有连接发送事件。可以使用 socket.broadcast.emit() 方法实现广播功能。

9. 私有消息（Private Message）：Socket.IO 允许通过指定特定连接的标识符（如 socket.id）来发送私有消息，只有指定的连接可以接收到该消息。

10. 压缩（Compression）：Socket.IO 允许对事件进行压缩，以减少数据传输的大小。可以使用 socket.compress() 方法启用或禁用压缩功能。

11. 超时（Timeout）：Socket.IO 允许为事件设置超时时间，在指定的时间内对方未确认事件，则触发超时处理逻辑。可以使用 socket.timeout() 方法设置超时时间。

这些是 Socket.IO 中的一些核心概念和方法，希望对你有所帮助！如果你有任何进一步的问题，请随时提问。
当然！这里还有一些其他的 Socket.IO 概念：

12. Socket（套接字）：Socket 表示客户端和服务器之间的单个连接。每个连接都有一个唯一的标识符（socket.id）。

13. Acknowledgement（确认）：在 Socket.IO 中，可以通过在发送事件时提供回调函数来请求对方确认接收事件。对方接收到事件后，可以调用回调函数，向发送方发送确认信息。

14. Middleware（中间件）：Socket.IO 支持中间件功能，允许在事件发送和接收过程中插入自定义的逻辑。中间件可以用于验证、处理数据、记录日志等操作。

15. 集群（Clustering）：Socket.IO 可以在多个节点之间进行集群部署，以支持更高的并发连接和负载均衡。

16. 跨域通信（Cross-Origin Communication）：Socket.IO 提供了跨域通信的能力，允许不同域名或端口的客户端和服务器之间建立连接和传输数据。

17. 传输机制（Transport）：Socket.IO 使用不同的传输机制来实现实时通信，包括 WebSocket、轮询（Polling）等。它会根据客户端和服务器之间的支持情况选择最佳的传输方式。

18. 中间件（Middleware）：Socket.IO 中的中间件是一种机制，允许你在每个连接上处理自定义逻辑。你可以使用中间件来验证连接、处理消息、修改数据等。中间件可以被注册到命名空间或服务器级别，以便在连接或事件处理过程中执行相应的操作。

19. 命名空间（Namespace）：命名空间是 Socket.IO 中的一个隔离机制，用于将连接和事件划分为不同的逻辑组。通过创建多个命名空间，你可以将连接和事件分类，以便更好地组织和管理它们。

20. 房间（Room）：房间是 Socket.IO 中的一个机制，用于将连接分组。你可以将连接加入到特定的房间中，然后向该房间中的所有连接发送事件。这允许你实现针对特定组的广播和通信。

21. 事件（Event）：事件是 Socket.IO 中进行实时通信的基本单位。通过触发和侦听事件，连接可以相互交换数据和消息。你可以自定义事件名称，并在事件中携带数据。Socket.IO 提供了一组预定义的事件（如连接、断开连接等），同时也支持自定义事件。

22. 客户端（Client）：Socket.IO 提供了适用于多种平台的客户端库，包括浏览器端的 JavaScript 客户端和服务器端的 Node.js 客户端。客户端库提供了一组 API，使你能够在客户端与服务器之间建立连接、发送和接收事件等。

23. 在 Socket.IO 中，"adapter" 是一个用于管理房间、命名空间和连接的组件。它负责跟踪每个连接的信息，并将连接分配到相应的房间和命名空间中。
    适配器允许 Socket.IO 应用程序在不同的环境中工作，包括单服务器、多服务器和跨服务器的部署。它提供了一个统一的接口，用于在不同的传输机制和存储引擎之间进行交互。
    适配器可以配置为使用不同的存储引擎，如内存存储、Redis、MongoDB 等。这样可以确保在多个进程或服务器之间共享房间和连接信息，以实现跨节点的实时通信。
    适配器还提供了一些方法和事件，用于管理连接、房间和命名空间，如添加连接、删除连接、加入房间、离开房间等。
    总之，适配器是 Socket.IO 中的一个重要组件，用于管理连接和实现分布式的实时通信。它为应用程序提供了灵活的部署选项，并支持可扩展性和高可用性的需求。

---

当然！以下是关于 Socket.IO 中的一些关键概念的详细汇总：

1. **服务器（Server）**：Socket.IO 服务器是用于实时通信的中心节点。它负责接受客户端的连接，并管理连接、处理事件和消息的传递。

2. **客户端（Client）**：Socket.IO 客户端是连接到 Socket.IO 服务器的节点。客户端可以是浏览器端的 JavaScript 客户端，也可以是服务器端的 Node.js 客户端。客户端可以发送事件、接收事件和与服务器进行实时通信。

3. **连接（Connection）**：连接是指客户端与服务器之间的连接。当客户端成功连接到 Socket.IO 服务器时，就建立了一个连接。连接是双向的，允许客户端向服务器发送事件，并接收服务器发送的事件。

4. **事件（Event）**：事件是 Socket.IO 中进行实时通信的基本单位。通过触发和侦听事件，连接可以相互交换数据和消息。Socket.IO 提供了一组预定义的事件（如连接、断开连接等），同时也支持自定义事件。事件可以携带数据，以便在连接之间传递信息。

5. **命名空间（Namespace）**：命名空间是 Socket.IO 中的一个隔离机制，用于将连接和事件划分为不同的逻辑组。通过创建多个命名空间，你可以将连接和事件分类，以便更好地组织和管理它们。每个命名空间都有自己的独立连接池和事件处理机制。

6. **房间（Room）**：房间是 Socket.IO 中的一个机制，用于将连接分组。你可以将连接加入到特定的房间中，然后向该房间中的所有连接发送事件。这允许你实现针对特定组的广播和通信。连接可以同时加入多个房间，也可以从房间中离开。

7. **中间件（Middleware）**：中间件是 Socket.IO 中的一种机制，允许你在每个连接上处理自定义逻辑。你可以使用中间件来验证连接、处理消息、修改数据等。中间件可以被注册到命名空间或服务器级别，以便在连接或事件处理过程中执行相应的操作。

8. **Adapter**：Adapter 是 Socket.IO 的一个组件，用于在不同节点之间实现广播和房间管理。它负责管理连接和房间的状态，并确保在多个节点之间同步信息。

以上是关于 Socket.IO 中一些关键概念的详细介绍。它们共同构成了 Socket.IO 的核心功能，使实时通信和协作变得简单和可扩展。如果你对任何概念有进一步的疑问，请随时提问！

### 房间

是的，Socket.IO 中的房间概念可以理解为一个包含多个 Socket 实例的集合。当多个 Socket 实例加入同一个房间时，它们就可以在该房间中进行消息交互。

Socket.IO 的房间概念提供了一种方便的方式来组织和管理 Socket 实例。通过将 Socket 实例添加到特定的房间中，您可以轻松地向该房间中的所有 Socket 实例发送消息，或者从该房间中的任意 Socket 实例接收消息。

您可以使用`socket.join(room)`方法将 Socket 实例加入指定的房间，使用`socket.leave(room)`方法将 Socket 实例从房间中移除。同时，可以使用`io.sockets.in(room)`或`socket.broadcast.to(room)`来选择性地向指定房间中的 Socket 实例发送消息。

在您提供的代码中，`socket.rooms`返回的是一个 Set 对象，其中包含了当前连接所在的所有房间。通过遍历这个 Set 对象，可以获取当前连接所在的每个房间的标识符，并进行相应的操作。

### 应用场景

虽然 Socket.IO 在前端实时通信中非常常见，但它并不仅限于前端或 WebSocket 通信。以下是一些解释：

1. **前端实时通信需求：** 前端应用程序通常需要实时通信的功能，例如聊天应用、协作编辑、实时更新等。Socket.IO 提供了一个简单而强大的方式来实现这些需求，因此在前端开发中被广泛使用。

2. **WebSocket 兼容性：** Socket.IO 建立在 WebSocket 协议之上，WebSocket 是一种现代的、全双工的通信协议，能够实现实时的双向通信。Socket.IO 在不同浏览器和设备上提供了对 WebSocket 的兼容性，这使得开发者能够轻松地在不同环境下实现实时通信。

3. **传输机制的灵活性：** Socket.IO 不仅仅局限于 WebSocket，它还提供了对传统的 HTTP 长轮询和其他实时传输机制的兼容性。这意味着即使在某些环境下无法使用 WebSocket，仍然可以使用 Socket.IO 的其他传输机制来实现实时通信。

4. **可扩展性和分布式部署：** Socket.IO 具有可扩展性，可以在多个服务器之间进行分布式部署。这使得 Socket.IO 能够处理大规模应用程序的实时通信需求，例如实时分析、多人游戏等。通过适配器机制，不同 Socket.IO 服务器之间可以共享状态和连接信息。

虽然 Socket.IO 在前端实时通信中非常流行，但它也可以在后端或服务器端使用。事实上，Socket.IO 提供了适用于服务器端的 Node.js 客户端库，可以在后端应用程序中使用 Socket.IO 来实现实时通信功能。

综上所述，Socket.IO 虽然常用于前端实时通信和 WebSocket 通信，但它具有广泛的适用性和灵活性，可以用于各种场景和环境中实现实时通信功能。

### 应用举例

Socket.IO 在实际应用中被广泛使用，以下是一些例子：

1. **即时通讯应用：** 许多即时通讯应用程序，如聊天应用、社交媒体应用和实时协作工具，使用 Socket.IO 来实现实时消息传递和实时更新功能。例如，Slack 和 Discord 都使用 Socket.IO 来提供实时聊天和协作功能。

2. **多人游戏：** 多人在线游戏通常需要实时通信和协调。Socket.IO 可以用于实现游戏中的实时事件传递、玩家位置同步、聊天和游戏状态更新等功能。一些游戏平台和服务，如 Agar.io 和 Diep.io，使用 Socket.IO 来实现多人游戏功能。

3. **金融交易和股票市场：** 在金融领域，实时数据的传递非常重要。Socket.IO 可以用于实时交易数据的传递、实时股票报价和市场更新等功能。一些金融服务提供商和交易平台，如 E\*TRADE 和 Robinhood，使用 Socket.IO 来提供实时市场数据。

4. **实时协作和共享编辑：** 在协作工具和共享编辑应用中，多个用户需要实时同步和协作。Socket.IO 可以用于实现实时文本编辑、实时白板和协作功能。例如，Google Docs 使用 Socket.IO 来实现多用户实时协作编辑。

5. **推送通知和实时提醒：** 许多应用程序需要向用户发送实时的推送通知和提醒。Socket.IO 可以用于实现实时推送功能，将通知即时地发送给用户。一些消息推送服务，如 Pusher 和 OneSignal，使用 Socket.IO 来提供实时通知功能。

值得注意的是，具体哪些大厂的服务在使用 Socket.IO 并不是公开可知的。Socket.IO 是一个开源的工具，因此它可以被任何公司或开发者在其应用程序中使用。许多大型互联网公司和知名的应用程序开发者社区都使用 Socket.IO 或类似的实时通信工具来构建其实时通信和协作功能。

## Resources

- [socket.io docs](https://socket.io/docs/), socket.io 文档
- [socket.io server-api](https://socket.io/docs/v4/server-api/)
- [socket.io client-api](https://socket.io/docs/v4/client-api/)
- [socket.io-tester](https://www.piesocket.com/socketio-tester), Socket.IO 在线测试工具
