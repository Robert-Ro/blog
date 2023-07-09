# Lifetime of a WebRTC session

WebRTC lets you build peer-to-peer communication of arbitrary data, audio, or video—or any combination thereof—into a browser application. In this article, we'll look at the lifetime of a WebRTC session, from establishing the connection all the way through closing the connection when it's no longer needed.
WebRTC 允许您将任意数据、音频或视频或它们的任意组合构建为浏览器应用程序中的点对点通信。在本文中，我们将查看 WebRTC 会话的生命周期，从建立连接到在不再需要时关闭连接的整个过程。

This article doesn't get into details of the actual APIs involved in establishing and handling a WebRTC connection; it reviews the process in general with some information about why each step is required. See [Signaling and video calling](/en-US/docs/Web/API/WebRTC_API/Signaling_and_video_calling) for an actual example with a step-by-step explanation of what the code does.
本文不涉及实际 API 在建立和处理 WebRTC 连接中所涉及的细节；它以一些关于为什么每个步骤都是必需的信息的一般过程回顾了这个过程。有关具有逐步解释代码执行的实际示例，请参见信令和视频通话。

## Establishing the connection 建立连接

The internet is big. Really big. It's so big that years ago, smart people saw how big it was, how fast it was growing, and the [limitations](https://en.wikipedia.org/wiki/IPv4_address_exhaustion) of the 32-bit IP addressing system, and realized that something had to be done before we ran out of addresses to use, so they started working on designing a new 64-bit addressing system. But they realized that it would take longer to complete the transition than 32-bit addresses would last, so other smart people came up with a way to let multiple computers share the same 32-bit IP address. Network Address Translation ({{Glossary("NAT")}}) is a standard which supports this address sharing by handling routing of data inbound and outbound to and from devices on a LAN, all of which are sharing a single WAN (global) IP address.
互联网很大。真的很大。它非常之大，以至于多年前，聪明人看到它有多大，它增长得多么快，32 位 IP 寻址系统的限制，并意识到在地址用尽之前必须做些什么，因此开始设计新的 64 位寻址系统。但他们意识到，完成过渡所需的时间比 32 位地址的寿命要长，因此其他聪明人想出了一种方法，允许多台计算机共享同一个 32 位 IP 地址。网络地址转换（[NAT](https://developer.mozilla.org/en-US/docs/Glossary/NAT)）是一种标准，它通过处理路由到和从局域网上的设备的数据，来支持这种地址共享，这些设备都共享着单个广域网（全球）IP 地址。

The problem for users is that each individual computer on the internet no longer necessarily has a unique IP address, and, in fact, each device's IP address may change not only if they move from one network to another, but if their network's address is changed by {{Glossary("NAT")}} and/or [DHCP](https://en.wikipedia.org/wiki/DHCP). For developers trying to do peer-to-peer networking, this introduces a conundrum: without a unique identifier for every user device, it's not possible to instantly and automatically know how to connect to a specific device on the internet. Even though you know who you want to talk to, you don't necessarily know how to reach them or even what their address is.
对于用户而言，问题在于互联网上的每台计算机不再必然具有唯一的 IP 地址，事实上，如果它们的网络地址被[NAT](https://developer.mozilla.org/en-US/docs/Glossary/NAT)和/或[DHCP](https://en.wikipedia.org/wiki/DHCP)更改，每个设备的 IP 地址甚至可能会发生变化。对于试图进行点对点网络的开发人员来说，这引入了一个难题：没有每个用户设备的唯一标识符，就不可能立即自动知道如何连接到互联网上的特定设备。即使您知道要与谁交谈，您也不一定知道如何联系他们，甚至不知道他们的地址是什么。

This is like trying to mail a package to your friend Michelle by labeling it "Michelle" and dropping it in a mailbox when you don't know her address. You need to look up her address and include it on the package, or she'll wind up wondering why you forgot her birthday again.
这就像试图通过在邮件上标记“Michelle”并将其投入邮箱来邮寄包裹给您的朋友 Michelle，但您不知道她的地址。您需要查阅她的地址并在包裹上加上它，否则她会想知道为什么您再次忘记了她的生日。

This is where signaling comes in.
这就是信令的作用。

### Signaling 信令

Signaling is the process of sending control information between two devices to determine the communication protocols, channels, media codecs and formats, and method of data transfer, as well as any required routing information. The most important thing to know about the signaling process for WebRTC: **it is not defined in the specification**.
信令是在两个设备之间发送控制信息的过程，以确定通信协议、通道、媒体编解码器和格式，以及数据传输方法，以及任何所需的路由信息。关于 WebRTC 信令过程最重要的一点是：**它没有在规范中定义**。

Why, you may wonder, is something fundamental to the process of establishing a WebRTC connection left out of the specification? The answer is simple: since the two devices have no way to directly contact each other, and the specification can't predict every possible use case for WebRTC, it makes more sense to let the developer select an appropriate networking technology and messaging protocol.
你可能会想，为什么在建立 WebRTC 连接的过程中如此基本的事情被省略在了规范中？答案很简单：由于两个设备没有直接联系的方式，规范无法预测 WebRTC 的每种可能用例，所以让开发人员选择适当的网络技术和消息协议更有意义。

In particular, if a developer already has a method in place for connecting two devices, it doesn't make sense for them to have to use another one, defined by the specification, just for WebRTC. Since WebRTC doesn't live in a vacuum, there is likely other connectivity in play, so it makes sense to avoid having to add additional connection channels for signaling if an existing one can be used.
特别是，如果开发人员已经有了将两个设备连接的方法，那么让他们使用规范中定义的另一种方法来连接 WebRTC 是没有意义的。由于 WebRTC 并不是孤立存在的，因此可能存在其他连接方式，因此如果可以使用现有的连接通道进行信令，那么避免添加额外的连接通道是有意义的。

In order to exchange signaling information, you can choose to send JSON objects back and forth over a WebSocket connection, or you could use XMPP or SIP over an appropriate channel, or you could use {{domxref("XMLHttpRequest")}} over {{Glossary("HTTPS")}} with polling, or any other combination of technologies you can come up with. You could even use email as the signaling channel.

为了交换信令信息，您可以选择通过 WebSocket 连接来回传送 JSON 对象，或者使用 XMPP 或 SIP 通过适当的通道进行传输，或者使用轮询的方式通过 HTTPS 使用 XMLHttpRequest 进行传输，或使用任何其他您可以想到的技术组合。您甚至可以使用电子邮件作为信令通道。

It's also worth noting that the channel for performing signaling doesn't even need to be over the network. One peer can output a data object that can be printed out, physically carried (on foot or by carrier pigeon) to another device, entered into that device, and a response then output by that device to be returned on foot, and so forth, until the WebRTC peer connection is open. It'd be very high latency but it could be done.
还值得注意的是，用于执行信令的通道甚至不需要通过网络进行。一个对等方可以输出一个数据对象，将其打印出来，亲自携带（步行或由鸽子传递）到另一个设备，输入到该设备中，并由该设备输出响应，然后继续以此类推，直到 WebRTC 对等连接打开。这将具有非常高的延迟，**但是可以实现**。

#### Information exchanged during signaling

There are three basic types of information that need to be exchanged during signaling:
在信令期间需要交换的基本信息分为三种类型：

- Control messages used to set up, open, and close the communication channel, and to handle errors.控制消息：用于设置、打开和关闭通信通道，并处理错误。
- Information needed in order to set up the connection: the IP addressing and port information needed for the peers to be able to talk to one another.建立连接所需的信息：对等方需要的 IP 地址和端口信息，以便彼此通信。
- Media capability negotiation: what codecs and media data formats can the peers understand? These need to be agreed upon before the WebRTC session can begin.媒体能力协商：对等方能够理解的编解码器和媒体数据格式是什么？在 WebRTC 会话开始之前，需要达成协议。

Only once signaling has been successfully completed can the true process of opening the WebRTC peer connection begin.只有在信令成功完成后，才能开始真正的打开 WebRTC 对等连接的过程。

It's worth noting that the signaling server does not actually need to understand or do anything with the data being exchanged through it by the two peers during signaling. The signaling server is, in essence, a relay: a common point which both sides connect to knowing that their signaling data can be transferred through it. The server doesn't need to react to this information in any way.
值得注意的是，信令服务器实际上不需要理解或处理两个对等方在信令期间通过它交换的数据。信令服务器本质上是一个中继：两侧都连接到它，知道它们的信令数据可以通过它传输。服务器不需要对此信息做出任何反应。

#### The signaling process

There's a sequence of things that have to happen in order to make it possible to begin a WebRTC session:

1. Each peer creates an {{domxref("RTCPeerConnection")}} object representing their end of the WebRTC session.每个对等方创建一个表示 WebRTC 会话终端的 RTCPeerConnection 对象。
2. Each peer establishes a handler for {{domxref("RTCPeerConnection/icecandidate_event", "icecandidate")}} events, which handles sending those candidates to the other peer over the signaling channel.每个对等方建立一个 icecandidate 事件处理程序，用于将这些候选项通过信令通道发送到另一个对等方。
3. Each peer establishes a handler for {{domxref("RTCPeerConnection.track_event", "track")}} event, which is received when the remote peer adds a track to the stream. This code should connect the tracks to its consumer, such as a {{HTMLElement("video")}} element.每个对等方建立一个 track 事件处理程序，在接收远程对等方添加流轨道时接收该事件。此代码应将轨道连接到其使用者，例如<video>元素。
4. The caller creates and shares with the receiving peer a unique identifier or token of some kind so that the call between them can be identified by the code on the signaling server. The exact contents and form of this identifier is up to you.呼叫方创建并与接收方共享某种唯一标识符或令牌，以便信令服务器上的代码可以识别它们之间的通话。该标识符的确切内容和形式由您决定。
5. Each peer connects to an agreed-upon signaling server, such as a WebSocket server they both know how to exchange messages with.
   每个对等方连接到一个协商一致的信令服务器，例如 WebSocket 服务器，他们都知道如何交换消息。
6. Each peer tells the signaling server that they want to join the same WebRTC session (identified by the token established in step 4).每个对等方告诉信令服务器他们想加入同一个 WebRTC 会话（由步骤 4 中建立的令牌标识）。
7. **_descriptions, candidates, etc. — more coming up_**

## ICE restart

Sometimes, during the lifetime of a WebRTC session, network conditions change. One of the users might transition from a cellular to a Wi-Fi network, or the network might become congested, for example. When this happens, the ICE agent may choose to perform **ICE restart**. This is a process by which the network connection is renegotiated, exactly the same way the initial ICE negotiation is performed, with one exception: media continues to flow across the original network connection until the new one is up and running. Then media shifts to the new network connection and the old one is closed.
有时，在 WebRTC 会话的生命周期中，网络条件会发生变化。例如，用户可能从蜂窝网络切换到 Wi-Fi 网络，或者网络可能变得拥挤。当发生这种情况时，ICE 代理可能会选择执行 ICE 重启。这是一种重新协商网络连接的过程，与初始 ICE 协商执行的方式完全相同，只有一个例外：媒体将继续在原始网络连接上流动，直到新的网络连接正常运行。然后，媒体将转移到新的网络连接，并关闭旧连接。

> **Note:** Different browsers support ICE restart under different sets of conditions. Not all browsers will perform ICE restart due to network congestion, for example.

> **注意：**不同的浏览器支持不同条件下的 ICE 重启。例如，不是所有浏览器都会因网络拥塞而执行 ICE 重启。

If you need to change the configuration of the connection in some way (such as changing to a different set of ICE servers), you can do so before restarting ICE by calling [`RTCPeerConnection.setConfiguration()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/setConfiguration) with an updated configuration object before restarting ICE.
如果您需要以某种方式更改连接的配置（例如更改到不同的 ICE 服务器集），则可以在重新启动 ICE 之前通过调用具有更新配置对象的`RTCPeerConnection.setConfiguration()`进行更改。

To explicitly trigger ICE restart, start the renegotiation process by calling [`RTCPeerConnection.createOffer()`](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer), specifying the `iceRestart` option with a value of `true`. Then handle the connection process from then on just like you normally would. This generates new values for the ICE username fragment (ufrag) and password, which will be used by the renegotiation process and the resulting connection.
要明确触发 ICE 重启，请调用{{domxref("RTCPeerConnection.createOffer()")}}启动重新协商过程，并使用值为 true 的 iceRestart 选项。然后，像通常一样处理连接过程。这会生成新的 ICE 用户名片段（ufrag）和密码的值，这些值将由重新协商过程和生成的连接使用。

The answerer side of the connection will automatically begin ICE restart when new values are detected for the ICE ufrag and ICE password.
连接的应答方在检测到 ICE ufrag 和 ICE 密码的新值时将自动开始 ICE 重启。
