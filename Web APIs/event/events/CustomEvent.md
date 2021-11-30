# CustomEvent

The `CustomEvent` interface represents events initialized by an application for any purpose.

## Constructor

`CustomEvent`(): Creates a new CustomEvent.

```js
CustomEvent(typeArg);
CustomEvent(typeArg, options);
// 类型定义信息
interface CustomEvent<T = any> extends Event {
    /**
     * Returns any custom data event was created with. Typically used for synthetic events.
     */
    readonly detail: T;
    /** @deprecated */
    initCustomEvent(type: string, bubbles?: boolean, cancelable?: boolean, detail?: T): void;
}

declare var CustomEvent: {
    prototype: CustomEvent;
    new<T>(type: string, eventInitDict?: CustomEventInit<T>): CustomEvent<T>;
};
interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
interface CustomEventInit<T = any> extends EventInit {
  /**
  * "detail", optional and defaulting to null, of any type, containing an event-dependent value associated with the event. This is available to the handler using the CustomEvent.detail property.
  */
    detail?: T; // 可自定义存储一些事件相关的数据
}
```
