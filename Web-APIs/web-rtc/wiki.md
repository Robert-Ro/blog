# WebRTC(Web Real-Time Communication)

WebRTC is a free and open-source project providing **web browsers** and **mobile applications** with **real-time communication (RTC)** via application programming interfaces (APIs). It allows **audio** and **video communication** to work inside web pages by allowing **direct peer-to-peer communication**, eliminating the need to install plugins or download native apps 无需安装插件或者下载原生 App. WebRTC specifications have been published by `W3C`和`IETF`

Original author(s): Justin Uberti, Peter Thatcher
Initial release： 2011;
Stable release： 1.0，May 4, 2018;
仓 Repository 库：https://webrtc.googlesource.com/
Written in: C++, JavaScript
Standard(s): https://w3.org/TR/webrtc/
Website: https://webrtc.org

WebRTC（Web 实时通信）是一个免费且开源的项目，通过应用程序编程接口(API)为 Web 浏览器和移动应用程序提供实时通信(real-time communication, RTC)。它允许音频和视频通信在网页中工作，通过直接点对点(P2P)通信来消除安装插件或下载原生应用程序的需要。

得到苹果、谷歌、微软、Mozilla 和 Opera 等公司支持，WebRTC 规范已被万维网联盟(W3C)和互联网工程任务组(IETF)发布。

根据 webrtc.org 的官方网站显示，该项目旨在“为浏览器、移动平台和物联网设备开发丰富、高质量的 RTC 应用，并允许它们通过一套共同的协议进行通信”。

## history

In May 2010, Google bought Global IP Solutions or GIPS, a VoIP and videoconferencing software company that had developed many components required for RTC, such as codecs and echo cancellation techniques. Google open-sourced the GIPS technology and engaged with relevant standards bodies at the IETF and W3C to ensure industry consensus.[7][8] In May 2011, Google released an open-source project for browser-based real-time communication known as WebRTC.[9] This has been followed by ongoing work to standardize the relevant protocols in the IETF[10] and browser APIs in the W3C.[11]

In January 2011, Ericsson Labs built the first implementation of WebRTC using a modified WebKit library.[12][13] In October 2011, the W3C published its first draft for the spec.[14] WebRTC milestones include the first cross-browser video call (February 2013), first cross-browser data transfers (February 2014), and as of July 2014 Google Hangouts was "kind of" using WebRTC.[15]

The W3C draft API was based on preliminary work done in the WHATWG.[16] It was referred to as the ConnectionPeer API, and a pre-standards concept implementation was created at Ericsson Labs.[12] The WebRTC Working Group expects this specification to evolve significantly based on:

Outcomes of ongoing exchanges in the companion RTCWEB group at IETF[17] to define the set of protocols that, together with this document, define real-time communications in web browsers. While no one signaling protocol is mandated, SIP over WebSockets (RFC 7118) is often used partially due to the applicability of SIP to most of the envisaged communication scenarios as well as the availability of open-source software such as JsSIP.
Privacy issues that arise when exposing local capabilities and local streams
Technical discussions within the group, on implementing data channels in particular[18]
Experience gained through early experimentation
Feedback from other groups and individuals
In November 2017, the WebRTC 1.0 specification transitioned from Working Draft to Candidate Recommendation.[19]

In January 2021, the WebRTC 1.0 specification transitioned from Candidate Recommendation to Recommendation.[4]

在 2010 年 5 月，Google 收购了全球 IP 解决方案或 GIPS，这是一家开发了许多 RTC 所需组件的 VoIP 和视频会议软件公司，例如编解码器和回声消除技术。Google 将 GIPS 技术开源，并与 IETF 和 W3C 的相关标准机构进行了接触，以确保行业共识。在 2011 年 5 月，Google 发布了一个名为 WebRTC 的基于浏览器的实时通信开源项目。这之后，IETF 的相关协议和 W3C 的浏览器 API 的标准化工作一直在进行。

在 2011 年 1 月，Ericsson Labs 使用修改过的 WebKit 库构建了 WebRTC 的第一个实现。在 2011 年 10 月，W3C 发布了该规范的第一份草案。WebRTC 的里程碑包括第一个跨浏览器视频通话（2013 年 2 月），第一个跨浏览器数据传输（2014 年 2 月），以及截至 2014 年 7 月，Google Hangouts 已经"有点"使用 WebRTC。

W3C 的草案 API 基于 WHATWG 的初步工作。它被称为 ConnectionPeer API，Ericsson Labs 创建了一个预标准概念实现。WebRTC 工作组期望这个规范会基于以下因素显著地演变：

- 在 IETF 的伴侣 RTCWEB 组中进行的持续交流的结果，以定义一套协议，这些协议与本文档一起定义了 web 浏览器中的实时通信。虽然没有强制要求使用一个信令协议，但 SIP over WebSockets (RFC 7118)经常被部分使用，这是因为 SIP 适用于大多数预想的通信场景，以及开源软件如 JsSIP 的可用性。
- 当暴露本地能力和本地流时产生的隐私问题
- 在组内进行的技术讨论，特别是在实现数据通道方面
- 通过早期实验获得的经验
- 来自其他组和个人的反馈
  在 2017 年 11 月，WebRTC 1.0 规范从工作草案转变为候选推荐。

在 2021 年 1 月，WebRTC 1.0 规范从候选推荐转变为推荐。

## Design

Major components of WebRTC include several JavaScript APIs:

- `getUserMedia` acquires the **audio** and **video** media (e.g., by accessing a device's camera and microphone).`getUserMedia`获取音频和视频媒体（例如通过访问设备的摄像头和麦克风）。[20]
- `RTCPeerConnection` _enables audio and video communication between peers_. It performs **signal processing**, **codec handling**, **peer-to-peer communication**, **security**, and **bandwidth management**.`RTCPeerConnection`允许对等之间进行音频和视频通信。它执行**信号处理**、**编解码器处理**、**点对点通信**、**安全性**和**带宽管理**等功能。
- `RTCDataChannel` allows bidirectional communication(双向通信) of arbitrary data between peers. The data is transported using SCTP over DTLS.[22] It uses the same API as WebSockets and has very low latency(低延时).`RTCDataChannel`允许对等之间双向传输任意数据。该数据使用 DTLS 上的 SCTP 进行传输。它使用与`WebSockets`相同的 API，**并具有非常低的延迟**。

The WebRTC API also includes a statistics function:

- `getStats` allows the web application to retrieve a set of statistics about WebRTC sessions. These statistics data are being described in a separate W3C document.`getStats`允许 Web 应用程序检索有关 WebRTC 会话的一组统计数据。这些统计数据在单独的 W3C 文档中进行描述。[24]

The WebRTC API includes **no provisions for signaling**(包含信令的规定), that is **discovering peers** to connect to and determine **how to establish connections among them**. Applications use Interactive Connectivity Establishment for connections and are responsible for managing sessions, possibly relying on any of **Session Initiation Protocol**, **Extensible Messaging** and **Presence Protocol**, **Message Queuing Telemetry Transport**, **Matrix**, or another protocol. Signaling may depend on one or more servers.[25][26]
WebRTC API 并未包含信令的规定，也就是说，它没有规定如何发现要连接的对等节点以及如何在它们之间建立连接。应用程序使用交互式连接建立（Interactive Connectivity Establishment）进行连接，并负责管理会话，可能依赖于会话初始协议（Session Initiation Protocol）、可扩展消息和存在协议（Extensible Messaging and Presence Protocol, XMPP）、消息队列遥测传输（Message Queuing Telemetry Transport）、Matrix 或其他协议。信令可能依赖于一个或多个服务器。

[RFC 7478](https://datatracker.ietf.org/doc/html/rfc7478) requires implementations to provide **PCMA/PCMU** ([RFC 3551](https://datatracker.ietf.org/doc/html/rfc3551)), Telephone Event as **DTMF** ([RFC 4733](https://datatracker.ietf.org/doc/html/rfc4733)), and **Opus** ([RFC 6716](https://datatracker.ietf.org/doc/html/rfc6716)) audio codecs as minimum capabilities. The _PeerConnection_, _data channel_ and _media capture browser APIs_ are detailed in the W3C specification.
RFC 7478 要求实现提供 **PCMA/PCMU（RFC 3551）**、电话事件作为 **DTMF（RFC 4733）**和 **Opus（RFC 6716）**音频编解码器作为最小能力。PeerConnection、数据通道和媒体捕获浏览器 API 在 W3C 规范中有详细说明。

W3C 正在开发 ORTC(Object Real-Time Communications)以用于 WebRTC。[27]

W3C is developing ORTC (Object Real-Time Communications) for WebRTC.

## Applications 应用举例

WebRTC allows browsers to stream files **directly to one another**, _reducing or entirely removing the need for server-side file hosting_.
WebRTC 允许浏览器直接流式传输文件，减少或完全消除了需要服务器端文件托管的需求。

- **WebTorrent** uses a WebRTC transport to enable peer-to-peer file sharing using the [BitTorrent](https://en.wikipedia.org/wiki/BitTorrent) protocol in the browser.
- Some file-sharing websites use it to allow users to send files directly to one another in their browsers, although this requires the uploader to keep the tab open until the file has been downloaded.
- A few CDNs, such as the _Microsoft-owned Peer5_, use the client's bandwidth to upload media to other connected peers, enabling each peer to act as an edge server(边缘服务器).

- WebTorrent 使用 WebRTC 传输，在浏览器中使用 BitTorrent 协议实现点对点文件共享。[28]
- 一些文件共享网站使用它来允许用户在他们的浏览器之间直接发送文件，尽管这需要上传者保持选项卡打开，直到文件被下载为止。[29][30][31]
- 一些 CDN（内容分发网络），例如微软拥有的 Peer5，利用客户端的带宽将媒体上传到其他连接的对等方，并使每个对等方都可以充当边缘服务器。[32][33]

Although initially developed for web browsers, WebRTC has applications for non-browser devices(非浏览器设备), including **mobile platforms** and **IoT devices**. Examples include browser-based [VoIP](https://en.wikipedia.org/wiki/VoIP) telephony, also called _cloud phones_ or _web phones_, which allow calls to be made and received from within a web browser(在 web 上拨打电话), replacing the requirement to download and install a softphone.

尽管最初是为 Web 浏览器开发的，但 WebRTC 也适用于非浏览器设备，包括移动平台和物联网设备。例如基于浏览器的 VoIP 电话（也称为云电话或网络电话），它允许从 Web 浏览器内进行呼叫和接收呼叫，取代了下载和安装软电话的要求。[34]

## Support

WebRTC is supported by the following browsers (incomplete list; oldest supported version specified):

- Desktop PC
  - Microsoft Edge 12+[35]
  - Google Chrome 28+
  - Mozilla Firefox 22+[36]
  - Safari 11+[37]
  - Opera 18+[38]
  - Vivaldi 1.9+
  - Brave
- Android
  - Google Chrome 28+ (enabled by default since 29)
  - Mozilla Firefox 24+[39]
  - Opera Mobile 12+
    Chrome OS
    Firefox OS
    BlackBerry 10
    iOS
  - MobileSafari/WebKit (iOS 11+)
    Tizen 3.0

## Codec support across browsers

WebRTC establishes a standard set of codecs which all compliant browsers are required to implement. Some browsers may also support other codecs.[41]

### Video codec compatibility 视频解码兼容性

| Codec name | Profile(s)                | Browser compatibility                     |
| ---------- | ------------------------- | ----------------------------------------- |
| H.264      | Constrained Baseline (CB) | Chrome (52+), Edge, Firefox[1], Safari    |
| VP8        | -                         | Chrome, Edge, Firefox, Safari (12.1+)[42] |
| VP9        | -                         | Chrome (48+), Firefox                     |

### Audio codec compatibility 音频解码兼容性

| Codec name        | Browser compatibility         |
| ----------------- | ----------------------------- |
| Opus              | Chrome, Edge, Firefox, Safari |
| G.711 PCM (A-law) | Chrome, Firefox, Safari       |
| G.711 PCM (µ-law) | Chrome, Firefox, Safari       |
| G.722             | Chrome, Firefox, Safari       |
| iLBC              | Chrome, Safari                |
| iSAC              | Chrome, Safari                |
