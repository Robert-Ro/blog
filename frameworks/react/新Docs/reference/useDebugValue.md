# useDebugValue

`useDebugValue` is a React Hook that lets you add a label to a custom Hook in React DevTools.

```js
useDebugValue(value, format?)
```

## Reference

### useDebugValue(value, format?)

Call `useDebugValue` at the top level of your custom Hook to display a readable debug value:

```js
import { useDebugValue } from 'react'

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline')
  // ...
}
```

### Parameters

- `value`: The value you want to display in React DevTools. It can have any type.
- optional `format`: **A formatting function**. When the component is inspected, React DevTools will call the formatting function with the `value` as the argument, and then display the returned formatted value (which may have any type). If you don’t specify the formatting function, the original `value` itself will be displayed.

### Returns

`useDebugValue` does not return anything.

## Usage

### Adding a label to a custom Hook

Call `useDebugValue` at the top level of your custom Hook to display a readable `debug value` for React DevTools.

```js
import { useDebugValue } from 'react'

function useOnlineStatus() {
  // ...
  useDebugValue(isOnline ? 'Online' : 'Offline')
  // ...
}
```

This gives components calling `useOnlineStatus` a label like `OnlineStatus:` `"Online"` when you inspect them:
![](https://react.dev/images/docs/react-devtools-usedebugvalue.png)

#### Note

**Don’t add debug values to every custom Hook**. It’s most valuable for custom Hooks that are part of shared libraries and that **have a complex internal data structure that’s difficult to inspect**.

### Deferring formatting of a debug value

You can also pass a formatting function as the second argument to `useDebugValue`:

```js
useDebugValue(date, (date) => date.toDateString())
```

Your formatting function will receive the `debug value` as a parameter and should return a `formatted display value`. When your component is inspected, React DevTools will call this function and display its result.

This lets you avoid running potentially expensive formatting logic unless the component is actually inspected. For example, if date is a `Date` value, this avoids calling `toDateString()` on it for every render.