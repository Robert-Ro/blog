## 两台电脑怎么通过 webRTC 建立连接呢

要通过 WebRTC 在两台电脑之间建立连接，可以按照以下步骤进行：

1. 获取媒体流：每台电脑上的浏览器需要获取本地的媒体流，如音频和视频。这可以通过使用 `getUserMedia` API 来实现，该 API 允许浏览器访问摄像头和麦克风等媒体设备。

2. 创建 RTCPeerConnection 对象：每台电脑上的浏览器需要创建一个 RTCPeerConnection 对象，它负责建立对等连接并处理媒体传输。通过调用 `new RTCPeerConnection()` 可以创建一个 RTCPeerConnection 对象。

3. 添加媒体流到 RTCPeerConnection：每台电脑上的浏览器需要将获取到的本地媒体流添加到 RTCPeerConnection 对象中，使用 `addStream` 方法来实现。这样可以将音频和视频流发送给对等端。

4. 创建信令通道：为了交换连接建立所需的信息，需要建立一个信令通道。这个通道可以使用各种方法实现，例如使用 `WebSocket`、`HTTP POST` 或**其他实时通信机制**。通过信令通道，两台电脑可以交换必要的信息来建立对等连接。

5. 生成和交换 SDP：每台电脑上的浏览器需要生成一个 SDP（Session Description Protocol）描述，其中包含了有关本地媒体和网络连接的信息。然后，将该 SDP 通过信令通道发送给对等端，并接收对等端发送的 SDP。

6. 设置远程 SDP：每台电脑上的浏览器需要将对等端发送的远程 SDP 设置到其本地的 RTCPeerConnection 对象中，使用 `setRemoteDescription` 方法。

7. 交换 ICE 候选地址：每台电脑上的浏览器会收集本地的 ICE（Interactive Connectivity Establishment）候选地址，并通过信令通道将其发送给对等端。对等端收到候选地址后，也会设置到其本地的 RTCPeerConnection 对象中。

8. 建立连接：当两台电脑上的浏览器都设置了远程 SDP 和 ICE 候选地址后，RTCPeerConnection 会开始通过 ICE 协议进行候选地址的检查和连接的建立。它会尝试直接连接、进行 NAT 穿透和中继等操作，以找到最佳的连接路径。

9. 传输媒体数据：一旦连接建立成功，两台电脑上的浏览器就可以通过 RTCPeerConnection 对象交换音频和视频数据。可以使用 `addTrack` 方法添加要发送的音频和视频轨道，通过监听 `ontrack` 事件接收对等端发送的音频和视频轨道。

以上是通过 WebRTC 在两台电脑之间建立连接的基本步骤。需要注意的是，这只是一个简单的概述，实际的实现可能涉及更多细节和配置选项。此外，为了确保连接的安全性和稳定性，可能需要考虑添加一些额外的功能和协议，如身份验证、加密和网络状况监测等。

## WebRTC 概念

WebRTC 涉及设备之间实时媒体流的交换，并依赖 IP 地址和端口号进行通信。以下是一些关键要点：

- 本地 IP 地址：参与 WebRTC 会话的每个设备都有一个本地 IP 地址。该地址通常由本地网络的路由器或网关分配。它是一个私有 IP 地址，只能在本地网络中访问。

- 公共 IP 地址：除了本地 IP 地址，设备可能还有一个公共 IP 地址。公共 IP 地址是唯一的，并且可以从互联网访问。它允许设备在不同的网络之间进行通信。

- NAT 和防火墙穿越：设备通常位于网络地址转换器（NAT）和防火墙之后，这可能会在它们之间的直接通信中带来复杂性。WebRTC 使用诸如 STUN（用于 NAT 的会话遍历实用程序）和 TURN（通过 NAT 周围中继进行遍历）等技术来克服这些障碍并建立直接连接。

- 端口范围：WebRTC 使用一系列端口进行通信。默认情况下，它从预定义的范围中选择一个随机端口，通常介于 49152 和 65535 之间。但是，具体的实现或配置可能会导致此范围有所变化。

- 加密：WebRTC 优先保障安全性，对所有媒体流进行端到端加密。这确保设备之间交换的数据保持机密性，不能被拦截或篡改。

值得注意的是，WebRTC 在内部处理这些复杂性，使开发人员能够专注于构建应用程序，而无需过多关注底层的网络细节。

## 两个 peer 建立连接后发送消息都要走 TURN 服务器吗

在 WebRTC 中，当两个对等端（peers）建立连接后，它们可以直接通过对等连接（peer-to-peer）交换媒体数据，而不需要经过 TURN 服务器。这称为直连（direct connection）。直连可以在两个对等端都能够通过 NAT 穿越并建立连接时发生。

然而，有时候两个对等端无法直接建立连接，例如由于存在对称 NAT 或防火墙等网络限制。在这种情况下，TURN 服务器会充当中继，接收一个对等端的媒体数据，并将其转发给另一个对等端。TURN 服务器的作用是帮助穿越 NAT 或防火墙等限制，以便实现对等通信。

因此，只有在直连不可行时，WebRTC 才会通过 TURN 服务器进行媒体数据的传输。一旦两个对等端能够建立直连，它们将尽量避免使用 TURN 服务器，并直接进行对等通信。这有助于提高传输效率和减少延迟。

## TURN 服务器是公开免费的吗，还是收费的，我如何访问最近的 TURN 服务器呢

TURN 服务器可以是公开免费的，也可以是收费的，具体取决于提供 TURN 服务的组织或服务提供商。有一些公共的免费 TURN 服务器可供使用，例如 Google 提供的公共 STUN 和 TURN 服务器。然而，这些公共服务器可能会有一些限制，如并发连接数或带宽限制。

如果您需要更高质量的服务或需要处理大量的连接，您可能需要考虑使用收费的 TURN 服务或自己设置和运行 TURN 服务器。有一些第三方服务提供商和云服务提供商提供专门的 TURN 服务器解决方案，您可以根据您的需求选择适合的服务。

要访问最近的 TURN 服务器，您可以通过搜索引擎或参考 WebRTC 开发文档中的推荐列表来找到公共的 TURN 服务器。另外，您还可以考虑使用特定地理位置的云服务提供商，他们通常会提供最接近您所在地区的 TURN 服务器。您可以在他们的文档或网站上查找有关 TURN 服务器的信息，并按照指导进行设置和使用。
