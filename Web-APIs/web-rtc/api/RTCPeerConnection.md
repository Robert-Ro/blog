# RTCPeerConnection

## Constructor

## Instance Methods

### addTrack

The `RTCPeerConnection` method `addTrack()` adds a new media track to the set of tracks which will be transmitted to the other peer.
RTCPeerConnection 的 addTrack()方法将一个新的媒体轨道添加到将传输到另一个对等端的轨道集合中。

> Adding a track to a connection triggers renegotiation by firing a negotiationneeded event. See Starting negotiation for details.

> 向连接添加轨道会通过触发 negotiationneeded 事件来触发重新协商。有关详细信息，请参阅开始协商。

#### syntax

```ts
addTrack(track: MediaStreamTrack, ...streams: MediaStream[])
```
