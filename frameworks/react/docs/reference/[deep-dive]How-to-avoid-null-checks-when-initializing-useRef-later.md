# How to avoid null checks when initializing useRef later 如何避免使用 null 判断在 useRef 初始化之后

If you use a type checker and don't want to always check for `null`, you can try a pattern like this instead:

```js
function Video() {
  const playerRef = useRef(null);

  function getPlayer() {
    if (playerRef.current !== null) {
      return playerRef.current;
    }
    const player = new VideoPlayer();
    playerRef.current = player;
    return player;
  }

  // ...
```

Here, the `playerRef` itself is nullable. However, you should be able to convince your type checker that there is no case in which `getPlayer()` returns `null`. **Then use `getPlayer()` in your event handlers**.
