# RTCDataChannel

The RTCDataChannel interface represents a network channel which can be used for bidirectional peer-to-peer transfers of arbitrary data. Every data channel is associated with an RTCPeerConnection, and each peer connection can have up to a theoretical maximum of 65,534 data channels (the actual limit may vary from browser to browser).
`RTCDataChannel` 接口表示一个网络通道，可以用于双向点对点传输任意数据。每个数据通道都与一个 `RTCPeerConnection` 相关联，每个对等连接最多可以拥有理论上的 65534 个数据通道（实际限制可能因浏览器而异）。

To create a data channel and ask a remote peer to join you, call the RTCPeerConnection's createDataChannel() method. The peer being invited to exchange data receives a datachannel event (which has type RTCDataChannelEvent) to let it know the data channel has been added to the connection.
要创建一个数据通道并邀请远程对等方加入，可以调用 `RTCPeerConnection` 的 `createDataChannel()`方法。被邀请交换数据的对等方将接收到一个 `datachannel` 事件（类型为 `RTCDataChannelEvent`），通知它数据通道已添加到连接中。

## Q

一个 peer A 创建了 datachannel A，然后用这个 datachannel A 发送数据，另一个 peer B 会在 RTCPeerConnection 的 ondatachannel 事件中获取到这个 datachannel A，然后用获取到的这个 datachannel A 发送数据，则 peer A 的那个 datachannel A 的 message 事件会被触发

## 实例方法

### send

The send() method of the RTCDataChannel interface sends data across the data channel to the remote peer. This can be done any time except during the initial process of creating the underlying transport channel. Data sent before connecting is buffered if possible (or an error occurs if it's not possible), and is also buffered if sent while the connection is closing or closed.

Note: Different browsers have different limitations on the size of the message you can send. Specifications exist to define how to automatically fragment large messages, but not all browsers implement them, and those that do have various additional restrictions. This will get less complicated over time, but for now, if you have questions, see Understanding message size limits.

#### Syntax

```js
send(data)
```

##### Parameters

The `data` to transmit across the connection. This may be a `string`, a `Blob`, an `ArrayBuffer`, a `TypedArray` or a `DataView` object.

##### Return value

None (undefined).

##### Exceptions

- InvalidStateError
- NetworkError
- TypeError

## Resources

- https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
