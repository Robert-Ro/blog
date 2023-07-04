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

## Events

### bufferedamountlow

> 用于指示数据通道内的缓冲区剩余空间已经达到了预设的最低阈值。控制数据传输质量

A bufferedamountlow event is sent to an RTCDataChannel when the number of bytes currently in the outbound data transfer buffer falls below the threshold specified in bufferedAmountLowThreshold. bufferedamountlow events aren't sent if bufferedAmountLowThreshold is 0

当 RTCDataChannel 中的出站数据传输缓冲区中的字节数低于 bufferedAmountLowThreshold 中指定的阈值时，将向其发送一个 bufferedamountlow 事件。如果 bufferedAmountLowThreshold 为 0，则不会发送 bufferedamountlow 事件。
简单来说，当 RTCDataChannel 中待发送的数据量低于设定的阈值时，会触发 bufferedamountlow 事件。这个事件可以用来监测数据传输的状态，以便在需要时采取相应的操作。
注意，bufferedamountlow 事件只在 RTCDataChannel 中发送，用于 WebRTC 数据通信。它提供了一种机制，使开发人员能够根据数据传输的缓冲区状态来优化数据传输的效率和性能。

---

RTCDataChannel 是 WebRTC API 提供的一种用于点对点通信的数据通道。bufferedamountlow 事件是 RTCDataChannel 对象上的一个事件，用于指示数据通道内的缓冲区剩余空间已经达到了预设的最低阈值。

当数据通道内的缓冲区剩余空间达到预设的最低阈值时，将触发 bufferedamountlow 事件。通过监听这个事件，应用程序可以及时了解数据通道的缓冲状态，从而对数据的发送和处理进行优化，避免出现缓冲区溢出的情况。

从这个意义上讲，bufferedamountlow 事件可以说是一种神，因为它可以帮助应用程序更好地控制数据通道的缓冲状态，从而提高数据传输的效率和稳定性。当缓冲区的剩余空间达到最低阈值时，应用程序可以通过暂停发送数据或降低发送频率等方式来避免缓冲区溢出，从而确保数据的传输质量。

因此，通过监听和处理 bufferedamountlow 事件，应用程序可以更好地控制数据传输过程中的缓冲状态，从而提高数据传输的效率和稳定性。

### close

通道关闭

### closing

通道关闭中

### error

通道出现错误

### message

处理收到的消息

### open

通道打开

## Resources

- https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
