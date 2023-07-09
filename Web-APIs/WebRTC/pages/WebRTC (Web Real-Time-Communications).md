# WebRTC (Web Real-Time Communications)

## What is WebRTC (Web Real-Time Communications)?

WebRTC (Web Real-Time Communications) is an open source project that enables real-time voice, text and video communications capabilities between web browsers and devices. WebRTC provides software developers with application programming interfaces (APIs) written in JavaScript.
WebRTC (Web 实时通信)是一个开源项目，它使得在 Web 浏览器和设备之间实现实时语音、文本和视频通信成为可能。WebRTC 提供了用 JavaScript 编写的应用程序编程接口（API）。

Developers use these APIs to create peer-to-peer (P2P) communications between internet web browsers and mobile applications without worrying about compatibility and support for audio-, video- or text-based content.
开发人员可以利用这些 API 在互联网浏览器和移动应用程序之间创建点对点（P2P）通信，无需担心音频、视频或文本内容的兼容性和支持。

With WebRTC, data transfer occurs in real time without the need for custom interfaces, extra plugins or special software for browser integration. WebRTC enables real-time audio and video communication simply by opening a webpage.
通过 WebRTC，数据传输实时进行，无需自定义接口、额外插件或特殊软件以进行浏览器集成。WebRTC 只需打开一个网页，就能实现实时音频和视频通信。

## How does WebRTC work?

WebRTC uses JavaScript, APIs and Hypertext Markup Language to embed communications technologies within web browsers. It is designed to make audio, video and data communication between browsers user-friendly and easy to implement. WebRTC works with most major web browsers.
WebRTC 利用 JavaScript、API 和超文本标记语言在 Web 浏览器中嵌入通信技术。它旨在使浏览器之间的音频、视频和数据通信对用户友好和易于实现。WebRTC 与大多数主要的 Web 浏览器兼容。

WebRTC APIs perform several key functions, including accessing and recording video-, audio- and text-based data from devices to initiating, monitoring and ending P2P connections between devices via browsers and facilitating bidirectional data transfer over multiple data channels.
WebRTC API 执行多个关键功能，包括从设备访问和记录基于视频、音频和文本的数据，通过浏览器在设备之间启动、监控和结束点对点连接，并通过多个数据通道实现双向数据传输。

In most cases, WebRTC connects users by transferring real-time audio, video and data from device to device using P2P communications. In situations where users are on different Internet Protocol (IP) networks that have Network Address Translation (NAT) firewalls that prevent RTC, WebRTC can be used in conjunction with Session Traversal Utilities for NAT (STUN) servers. This enables a given IP address to be translated into a public internet address so peer connections can be established.
在大多数情况下，WebRTC 通过 P2P 通信将实时音频、视频和数据从设备传输到设备以连接用户。在用户位于具有防止实时通信的网络地址转换（NAT）防火墙的不同互联网协议（IP）网络的情况下，WebRTC 可以与会话遍历实用程序（STUN）服务器结合使用。这将特定的 IP 地址转换为公共互联网地址，以便建立对等连接。

But there are also networks that are so restrictive that even a STUN server cannot be used to translate IP addresses. In these cases, WebRTC is used with a Traversal Using Relays around NAT (TURN) server, which relays traffic between users, enabling them to connect. The Interactive Connectivity Establishment protocol is used to find the best connection.
但也有一些网络非常严格，甚至无法使用 STUN 服务器来转换 IP 地址。在这种情况下，WebRTC 与 Traversal Using Relays around NAT (TURN)服务器一起使用，该服务器在用户之间中继流量，使它们能够连接。使用交互式连接建立协议来找到最佳连接。

![](../how_webrtc_works-f.png)

Before audio and video files are sent, they must be compressed due to their large size. Also, media that is received over a peer connection must be decompressed. WebRTC uses a codec process to do this.
在发送音频和视频文件之前，由于它们的尺寸较大，需要对其进行压缩。同样，通过对等连接接收的媒体也需要进行解压缩。WebRTC 使用编解码器（codec）来执行这个过程。

## What is WebRTC used for? WebRTC 被用于以下几个方面：

The goal of WebRTC is to facilitate real-time P2P communications over the internet. There are several use cases for WebRTC, including the following:

1. WebRTC is used for video chats and meetings on video calling platforms, such as Zoom, Microsoft Teams, Slack or Google Meet.
   视频聊天和会议：WebRTC 用于视频通话平台，如 Zoom、Microsoft Teams、Slack 或 Google Meet 等，使用户能够进行实时的视频聊天和会议。
2. Industries, including healthcare, surveillance and monitoring, and internet of things, use WebRTC. For example, WebRTC use in Telehealth enables doctors to conduct virtual office visits with a patient over a web browser.
   医疗保健：WebRTC 在医疗保健领域被广泛应用。例如，通过 WebRTC，医生可以通过 Web 浏览器与患者进行虚拟诊疗。
3. In the field of home and business security and surveillance, WebRTC is used as a connecting agent between browsers and security cameras.
   安全监控：WebRTC 被用作连接代理，将浏览器与安全摄像头进行连接，用于家庭和商业安全监控领域。
4. WebRTC is heavily used for real-time media.
   实时媒体：WebRTC 在实时媒体方面得到广泛应用，包括音频和视频的实时传输。
5. WebRTC provides the underlying connection between instructors and students for online education.
   在线教育：WebRTC 为在线教育提供了教师和学生之间的连接，使其能够进行实时的在线教学。

## What are the pros and cons of WebRTC?

WebRTC presents opportunities and challenges to organizations.

The advantages of WebRTC include the following:WebRTC 的优势包括以下方面：

- eliminates much of the in-house manual integration work required of IT;减少了 IT 部门需要进行的大部分内部手动集成工作。
- can adjust communication quality, bandwidth and traffic flow whenever network conditions change;可以根据网络条件的变化调整通信质量、带宽和流量。
- is supported by most major web browsers, including Google Chrome for desktop and Android, Mozilla Firefox for desktop and Android, and Safari;得到大多数主流网络浏览器的支持，包括桌面和 Android 平台的 Google Chrome、桌面和 Android 平台的 Mozilla Firefox 以及 Safari 浏览器。
- works on any operating system as long as the browser supports WebRTC;在任何操作系统上只要浏览器支持 WebRTC 就可以运行。
- does not require third-party components or plugins; and 不需要第三方组件或插件。
- is free as open source software.作为开源软件，免费使用。

Disadvantages of WebRTC include the following:WebRTC 的劣势包括以下方面：

- Each user must establish a P2P browser connection, making bandwidth an issue.每个用户都必须建立 P2P 浏览器连接，这可能会带来带宽问题。
- Maintenance costs can be high because WebRTC requires powerful servers.WebRTC 需要强大的服务器，因此维护成本可能较高。
- Security and privacy standards are still unclear, leaving it up to IT departments to ensure that corporate security and privacy standards can be met.安全和隐私标准尚不明确，IT 部门需要确保符合企业的安全和隐私标准。
- There are no definitive quality of service standards, which means that quality of video or audio over the internet may be inconsistent.缺乏明确的服务质量标准，这意味着互联网上的视频或音频质量可能不一致。

## Is WebRTC secure?

Every WebRTC software component is encrypted, and every WebRTC API requires secure origins via Hypertext Transfer Protocol Secure (HTTPS) or localhost. Nevertheless, there are still open security questions that developers using WebRTC must consider. Signaling processing methods, or the methods used to exchange metadata, are not specified for WebRTC signaling. This means that developers must decide which security protocols to use and ensure that the protocols they select can be maintained with WebRTC.
每个 WebRTC 软件组件都是加密的，而且每个 WebRTC API 都要求使用安全的源，即通过 Hypertext Transfer Protocol Secure (HTTPS) 或 localhost。然而，使用 WebRTC 的开发者仍然需要考虑一些安全问题。**WebRTC 信令处理方法，即用于交换元数据的方法，在规范中没有明确指定**。这意味着开发者必须决定使用哪种安全协议，并确保所选择的协议能够与 WebRTC 保持兼容。

## Resources

- [link](https://www.techtarget.com/searchunifiedcommunications/definition/WebRTC-Web-Real-Time-Communications)
