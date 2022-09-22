# WebRTC(Web Real-Time Communication)
WebRTC is a free and open-source project providing **web browsers** and **mobile applications** with **real-time communication (RTC)** via application programming interfaces (APIs). It allows **audio** and **video communication** to work inside web pages by allowing **direct peer-to-peer communication**, eliminating the need to install plugins or download native apps无需安装插件或者下载原生App. WebRTC specifications have been published by `W3C`和`IETF`

Original author(s):	Justin Uberti, Peter Thatcher
Initial release：	2011;
Stable release：	1.0，May 4, 2018;
仓Repository库：https://webrtc.googlesource.com/
Written in:	C++, JavaScript
Standard(s):	https://w3.org/TR/webrtc/
Website: https://webrtc.org

## Design

Major components of WebRTC include several JavaScript APIs:

- `getUserMedia` acquires the audio and video media (e.g., by accessing a device's camera and microphone).
- `RTCPeerConnection` *enables audio and video communication between peers*. It performs **signal processing**, **codec handling**, **peer-to-peer communication**, **security**, and **bandwidth management**.
- `RTCDataChannel` allows bidirectional communication(双向通信) of arbitrary data between peers. The data is transported using SCTP over DTLS.[22] It uses the same API as WebSockets and has very low latency(低延时).

The WebRTC API also includes a statistics function:

- `getStats` allows the web application to retrieve a set of statistics about WebRTC sessions. These statistics data are being described in a separate W3C document.

The WebRTC API includes **no provisions for signaling**(), that is **discovering peers** to connect to and determine **how to establish connections among them**. Applications use Interactive Connectivity Establishment for connections and are responsible for managing sessions, possibly relying on any of **Session Initiation Protocol**, **Extensible Messaging** and **Presence Protocol**, **Message Queuing Telemetry Transport**, **Matrix**, or another protocol. Signaling may depend on one or more servers.[25][26]

[RFC 7478](https://datatracker.ietf.org/doc/html/rfc7478) requires implementations to provide **PCMA/PCMU** (RFC 3551), Telephone Event as **DTMF** (RFC 4733), and **Opus** (RFC 6716) audio codecs as minimum capabilities. The _PeerConnection_, _data channel_ and _media capture browser APIs_ are detailed in the W3C specification.

W3C is developing ORTC (Object Real-Time Communications) for WebRTC.

## Applications应用举例

WebRTC allows browsers to stream files **directly to one another**, _reducing or entirely removing the need for server-side file hosting_.
- **WebTorrent** uses a WebRTC transport to enable peer-to-peer file sharing using the [BitTorrent](https://en.wikipedia.org/wiki/BitTorrent) protocol in the browser.
- Some file-sharing websites use it to allow users to send files directly to one another in their browsers, although this requires the uploader to keep the tab open until the file has been downloaded.
- A few CDNs, such as the _Microsoft-owned Peer5_, use the client's bandwidth to upload media to other connected peers, enabling each peer to act as an edge server(边缘服务器).

Although initially developed for web browsers, WebRTC has applications for non-browser devices(非浏览器设备), including **mobile platforms** and **IoT devices**. Examples include browser-based [VoIP](https://en.wikipedia.org/wiki/VoIP) telephony, also called _cloud phones_ or _web phones_, which allow calls to be made and received from within a web browser(在web上拨打电话), replacing the requirement to download and install a softphone.

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

### Video codec compatibility视频解码兼容性

Codec name |	Profile(s) |	Browser compatibility
---|---|---
H.264 | 	Constrained Baseline (CB) |	Chrome (52+), Edge, Firefox[1], Safari |
VP8	| - |	Chrome, Edge, Firefox, Safari (12.1+)[42]
VP9	| - |	Chrome (48+), Firefox

### Audio codec compatibility音频解码兼容性

Codec name |	Browser compatibility
---|---
Opus |	Chrome, Edge, Firefox, Safari
G.711 PCM (A-law) |	Chrome, Firefox, Safari
G.711 PCM (µ-law) |	Chrome, Firefox, Safari
G.722 |	Chrome, Firefox, Safari
iLBC |	Chrome, Safari
iSAC |	Chrome, Safari
