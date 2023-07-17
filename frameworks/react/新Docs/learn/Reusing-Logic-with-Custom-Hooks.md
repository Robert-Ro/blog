# Reusing Logic with Custom Hooks

React comes with several built-in Hooks like useState, useContext, and useEffect. Sometimes, you’ll wish that there was a Hook for some more specific purpose: for example, _to fetch data_, _to keep track of whether the user is online_, or _to connect to a chat room_. You might not find these Hooks in React, but you **can create your own Hooks for your application’s needs**.

## Custom Hooks: Sharing logic between components 自定义 Hooks：在组件之间共享逻辑

Imagine you’re developing an app that heavily relies on the network (as most apps do). You want to warn the user if their network connection has accidentally gone off while they were using your app. How would you go about it? It seems like you’ll need two things in your component:
假设你正在开发一个严重依赖网络的应用程序（大多数应用程序都是如此）。你希望在用户使用你的应用程序时，如果网络连接意外断开，能够向用户发出警告。你需要在组件中做两件事情：

1. A piece of state that tracks whether the network is online.一个状态来跟踪网络是否在线。
2. An Effect that subscribes to the global online and offline events, and updates that state.一个副作用（Effect）订阅全局的在线和离线事件，并更新该状态。

This will keep your component synchronized with the network status. You might start with something like this:
这将使你的组件与网络状态保持同步。你可以从以下代码开始：

```js
//代码略
```

These two components work fine, but the duplication in logic between them is unfortunate. It seems like even though they have different visual appearance, you want to reuse the logic between them.
这两个组件工作得很好，但是它们之间的逻辑重复是不幸的。尽管它们具有不同的视觉外观，但你希望在它们之间重用逻辑。

### Extracting your own custom Hook from a component 从组件中提取你自己的自定义 Hook

Imagine for a moment that, similar to `useState` and `useEffect`, there was a built-in `useOnlineStatus` Hook. Then both of these components could be simplified and you could remove the duplication between them:

想象一下，假设类似于 `useState` 和 `useEffect`，存在一个内置的 `useOnlineStatus` Hook。那么这两个组件可以简化，并且可以消除它们之间的重复部分。

Although there is no such built-in Hook, you can write it yourself. Declare a function called `useOnlineStatus` and move all the duplicated code into it from the components you wrote earlier:
虽然没有这样的内置 Hook，但你可以自己编写它。声明一个名为 `useOnlineStatus` 的函数，并将之前你编写的组件中的重复代码移动到这个函数中：

```js
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

Now your components don’t have as much repetitive logic. **More importantly, the code inside them describes what they want to do (use the online status!) rather than how to do it (by subscribing to the browser events)**.
现在你的组件中没有那么多重复的逻辑了。更重要的是，它们内部的代码描述了它们想要做什么（使用在线状态！），而不是如何做（通过订阅浏览器事件）。

When you extract logic into custom Hooks, you can hide the gnarly details of how you deal with some external system or a browser API. The code of your components expresses your intent, not the implementation.

当你将逻辑提取到自定义 `Hooks` 中时，你可以隐藏处理外部系统或浏览器 API 的复杂细节。你的组件代码表达了你的意图，而不是具体的实现方式。

### Hook names always start with `use`

React applications are built from components. Components are built from Hooks, whether built-in or custom. You’ll likely often use custom Hooks created by others, but occasionally you might write one yourself!
React 应用程序由组件构建，而组件则由 Hooks 构建，无论是内置的 Hooks 还是自定义的 Hooks。你可能经常使用其他人创建的自定义 Hooks，但偶尔你也可能自己编写一个！

You must follow these naming conventions:
你必须遵循以下命名约定:

1. **React component names must start with a capital letter**, like `StatusBar` and `SaveButton`. React components also need to return something that React knows how to display, like a piece of JSX.
   React 组件的名称必须以大写字母开头，例如`StatusBar`和`SaveButton`。React 组件还需要返回 React 知道如何显示的内容，例如一段 JSX 代码。

2. **Hook names must start with use followed by a capital letter**, like useState (built-in) or useOnlineStatus (custom, like earlier on the page). Hooks may return arbitrary values.
   Hook 的名称必须以`use`开头，后面跟着一个大写字母，例如`useState`（内置的）或`useOnlineStatus`（自定义的，就像页面上之前提到的）。Hooks 可以返回任意值。

This convention guarantees that you can always look at a component and know where its state, Effects, and other React features might “hide”. For example, if you see a getColor() function call inside your component, you can be sure that it can’t possibly contain React state inside because its name doesn’t start with use. However, a function call like useOnlineStatus() will most likely contain calls to other Hooks inside!
这种约定确保你始终可以查看一个组件，并知道它的状态、Effect 和其他 React 特性可能“隐藏”在哪里。例如，如果你在组件中看到 `getColor()`函数调用，你可以确定它不可能包含 React 状态，因为它的名称不以 `use` 开头。然而，像 `useOnlineStatus()`这样的函数调用很可能会包含其他 Hooks 的调用！

> **Only Hooks and components can call other Hooks**!

### Custom Hooks let you share stateful logic, not state itself

自定义 Hooks 确实允许你在多个组件之间共享有状态的逻辑，而不是直接共享状态本身。这是在 React 中使用自定义 Hooks 的一个关键优势。

当你创建一个自定义 Hook 时，它封装了特定的可重用逻辑。这个逻辑可能涉及使用 React 内置的状态管理 Hooks，比如 useState、useReducer，或者其他自定义的状态管理解决方案。然而，状态本身并不直接在组件之间使用该 Hook 共享。

相反，自定义 Hook 提供了一种在内部使用和访问有状态逻辑的方式。它可以暴露一些函数、值或其他抽象，以允许组件与该逻辑进行交互和利用。使用自定义 Hook 的组件将拥有自己独立的状态实例，由 Hook 进行管理。

通过将有状态逻辑抽象为自定义 Hook，你可以在不重复代码的情况下轻松地在不同的组件之间进行复用。这促进了代码的可重用性、关注点分离和更清晰的组件实现。

需要注意的是，使用自定义 Hook 的每个组件都将拥有自己隔离的状态，并且不会干扰其他使用相同 Hook 的组件的状态。这确保了封装性并避免了意外的副作用。

总而言之，自定义 Hooks 使你能够在组件之间共享有状态的逻辑，促进代码的可重用性和更好的组织，同时保持实际状态在使用 Hook 的每个组件内部隔离。

In the earlier example, when you turned the network on and off, both components updated together. However, it’s wrong to think that a single `isOnline` state variable is shared between them. Look at this code:

Notice that it only declares one state variable called value.
请注意，它只声明了一个名为 value 的状态变量。

However, the Form component calls useFormInput two times:
然而，Form 组件调用了 useFormInput 两次：

```js
function Form() {
  const firstNameProps = useFormInput('Mary')
  const lastNameProps = useFormInput('Poppins')
  // ...
}
```

This is why it works like declaring two separate state variables!
这就是为什么它起作用就像声明了两个独立的状态变量一样！

**Custom Hooks let you share stateful logic but not state itself. Each call to a Hook is completely independent from every other call to the same Hook**. This is why the two sandboxes above are completely equivalent. If you’d like, scroll back up and compare them. The behavior before and after extracting a custom Hook is identical.
自定义 Hooks 允许你共享有状态的逻辑，但不共享状态本身。对于同一个 Hook 的每次调用都是完全独立的。这就是为什么上面的两个例子完全等价的原因。如果你愿意，可以向上滚动并进行比较。在提取自定义 Hook 之前和之后的行为是完全相同的。

When you need to share the state itself between multiple components, lift it up and pass it down instead.
当你需要在多个组件之间共享状态本身时，请将其提升并通过传递属性进行传递。

## Passing reactive values between Hooks 在 Hooks 之间传递响应式值

The code inside your **custom Hooks** will **re-run during every re-render of your component**. This is why, like components, custom Hooks need to be pure. Think of custom Hooks’ code as part of your component’s body!

Because custom Hooks **re-render** together with your component, they always receive the latest props and state. To see what this means, consider this chat room example. Change the server URL or the chat room:

When you change serverUrl or roomId, the Effect “reacts” to your changes and re-synchronizes. You can tell by the console messages that the chat re-connects every time that you change your Effect’s dependencies.

Now move the Effect’s code into a custom Hook:

This lets your ChatRoom component call your custom Hook without worrying about how it works inside:

This looks much simpler! (But it does the same thing.)

Notice that the logic still responds to prop and state changes. Try editing the server URL or the selected room:

Every time your `ChatRoom` component re-renders, it passes the latest `roomId` and `serverUrl` to your Hook. This is why your Effect re-connects to the chat whenever their values are different after a re-render. (If you ever worked with audio or video processing software, chaining Hooks like this might remind you of chaining visual or audio effects. It’s as if the output of `useState` “feeds into” the input of the `useChatRoom`.)

## Passing event handlers to custom Hooks 传递事件处理函数给自定义 Hooks✨✨✨

> This section describes an experimental API that has not yet been released in a stable version of React.

As you start using useChatRoom in more components, **you might want to let components customize its behavior**. For example, currently, the logic for what to do when a message arrives is hardcoded inside the Hook:

```js
export function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      showNotification('New message: ' + msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl])
}
```

Let’s say you want to move this logic back to your component:

```js
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234')

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg)
    },
  })
}
```

To make this work, change your custom Hook to take onReceiveMessage as one of its named options:

```js
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      onReceiveMessage(msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl, onReceiveMessage]) // ✅ All dependencies declared
}
```

This will work, but there’s one **more improvement you can do when your custom Hook accepts event handlers**.

Adding a dependency on `onReceiveMessage` is **not ideal** because it will **cause the chat to re-connect every time the component re-renders**. [Wrap this event handler into an Effect Event to remove it from the dependencies](https://react.dev/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props):

```js
import { useEffect, useEffectEvent } from 'react'
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  const onMessage = useEffectEvent(onReceiveMessage)

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId,
    }
    const connection = createConnection(options)
    connection.connect()
    connection.on('message', (msg) => {
      onMessage(msg)
    })
    return () => connection.disconnect()
  }, [roomId, serverUrl]) // ✅ All dependencies declared
}
```

Now the chat won’t re-connect every time that the ChatRoom component re-renders. Here is a fully working demo of passing an event handler to a custom Hook that you can play with:

Notice how you no longer need to know how useChatRoom works in order to use it. You could add it to any other component, pass any other options, and it would work the same way. That’s the power of custom Hooks.

## When to use custom Hooks

You don’t need to extract a custom Hook for every little duplicated bit of code. Some duplication is fine. For example, extracting a useFormInput Hook to wrap a single useState call like earlier is probably unnecessary.
你不需要为每个重复的代码片段提取一个自定义 Hook。有些重复是可以接受的。例如，像之前一样提取一个 useFormInput Hook 来封装单个 useState 调用可能是不必要的。

However, whenever you write an Effect, consider whether it would be clearer to also wrap it in a custom Hook. You shouldn’t need Effects very often, so if you’re writing one, it means that you need to “step outside React” to synchronize with some external system or to do something that React doesn’t have a built-in API for. Wrapping it into a custom Hook lets you precisely communicate your intent and how the data flows through it.
然而，每当你编写一个 Effect 时，考虑是否将其包装在一个自定义 Hook 中会更清晰。你通常不需要经常使用 Effect，所以如果你正在编写一个 Effect，意味着你需要“走出 React”与某些外部系统同步，或者做一些 React 没有内置 API 的操作。将其包装成一个自定义 Hook 可以让你精确地传达你的意图以及数据如何在其中流动。

For example, consider a ShippingForm component that displays two dropdowns: one shows the list of cities, and another shows the list of areas in the selected city. You might start with some code that looks like this:
举个例子，考虑一个 ShippingForm 组件，它显示两个下拉框：一个显示城市列表，另一个显示所选城市的区域列表。你可以从下面的代码开始：

```js
// 代码略
```

Although this code is quite repetitive, it’s correct to keep these Effects separate from each other. They synchronize two different things, so you shouldn’t merge them into one Effect. Instead, you can simplify the ShippingForm component above by extracting the common logic between them into your own useData Hook:
虽然这段代码非常重复，但将这些 Effect 保持分开是正确的做法。它们同步了两个不同的事物，因此不应将它们合并为一个 Effect。相反，你可以通过将它们之间的共同逻辑提取到自定义的 useData Hook 中来简化上面的 ShippingForm 组件：

Now you can replace both Effects in the ShippingForm components with calls to useData:

Extracting a custom Hook makes the data flow explicit. You feed the url in and you get the data out. By “hiding” your Effect inside useData, you also prevent someone working on the ShippingForm component from adding unnecessary dependencies to it. **With time, most of your app’s Effects will be in custom Hooks**.
提取一个自定义 Hook 使数据流变得明确。你输入一个 URL，然后获取数据输出。通过将 Effect “隐藏” 在 useData 中，你还可以防止在 ShippingForm 组件中添加不必要的依赖关系。随着时间的推移，你应用程序中的大多数 Effect 将存在于自定义的 Hooks 中。

### Custom Hooks help you migrate to better patterns

Effects are an “escape hatch”: you use them when you need to “step outside React” and when there is no better built-in solution for your use case. With time, the React team’s goal is to reduce the number of the Effects in your app to the minimum by providing more specific solutions to more specific problems. Wrapping your Effects in custom Hooks makes it easier to upgrade your code when these solutions become available.
Effects 是一种“逃生通道”：当你需要“走出 React”且没有更好的内置解决方案适用于你的用例时，你可以使用它们。随着时间的推移，React 团队的目标是通过提供更具体的解决方案来将应用程序中的 Effect 数量减少到最小。将你的 Effects 包装在自定义 Hooks 中使得在这些解决方案可用时更容易升级你的代码。

In the above example, useOnlineStatus is implemented with a pair of useState and useEffect. However, this isn’t the best possible solution. There is a number of edge cases it doesn’t consider. For example, it assumes that when the component mounts, isOnline is already true, but this may be wrong if the network already went offline. You can use the browser navigator.onLine API to check for that, but using it directly would not work on the server for generating the initial HTML. In short, this code could be improved.
在上面的示例中，useOnlineStatus 是使用一对 useState 和 useEffect 实现的。然而，这并不是最佳解决方案。它存在一些未考虑到的边缘情况。例如，它假设组件挂载时 isOnline 已经为 true，但如果网络已经离线，这可能是错误的。你可以使用浏览器的 navigator.onLine API 来检查，但直接使用它在服务器端生成初始 HTML 时将无法工作。简而言之，这段代码可以改进。

Luckily, React 18 includes a dedicated API called useSyncExternalStore which takes care of all of these problems for you. Here is how your useOnlineStatus Hook, rewritten to take advantage of this new API:

幸运的是，React 18 引入了一个专门的 API，名为 useSyncExternalStore，它可以为你解决所有这些问题。下面是重写后利用这个新 API 的 useOnlineStatus Hook 的示例代码：

This is another reason for why wrapping Effects in custom Hooks is often beneficial:
这是为什么将 Effects 包装在自定义 Hooks 中通常是有益的另一个原因：

1. You make the data flow to and from your Effects very explicit.你使得数据流进出 Effects 变得非常明确。
2. You let your components focus on the intent rather than on the exact implementation of your Effects.你让你的组件专注于意图，而不是精确实现 Effects 的细节。
3. When React adds new features, you can remove those Effects without changing any of your components.当 React 添加新功能时，你可以移除那些 Effects，而无需更改任何组件。

Similar to a design system, you might find it helpful to start extracting common idioms from your app’s components into custom Hooks. This will keep your components’ code focused on the intent, and let you avoid writing raw Effects very often. Many excellent custom Hooks are maintained by the React community.
类似于设计系统，你可能会发现将应用程序组件中的常见习惯用法提取到自定义 Hooks 中很有帮助。这将使你的组件代码专注于意图，并且能够避免经常编写原始 Effects。React 社区维护了许多优秀的自定义 Hooks。

> Will React provide any built-in solution for data fetching?
>
> **We’re still working out the details**, but we expect that in the future, you’ll write data fetching like this: `import { use } from 'react' // Not available yet!`

## There is more than one way to do it

// TODO 在 codeSandbox 里面添加/code workspaces

## Recap

1. Custom Hooks let you share logic between components.
   自定义钩子允许您在组件之间共享逻辑。
2. Custom Hooks must be named starting with use followed by a capital letter.
   自定义钩子的命名必须以 use 开头，后面跟着一个大写字母。
3. Custom Hooks only share stateful logic, not state itself.
   自定义钩子只共享有状态的逻辑，而不是状态本身。
4. You can pass reactive values from one Hook to another, and they stay up-to-date.
   您可以将响应式值从一个钩子传递到另一个钩子，并且它们保持最新状态。
5. All Hooks re-run every time your component re-renders.
   每当组件重新渲染时，所有钩子都会重新运行。
6. The code of your custom Hooks should be pure, like your component’s code.
   您的自定义钩子的代码应该是纯净的，就像组件的代码一样。
7. Wrap event handlers received by custom Hooks into Effect Events.
   将自定义钩子接收到的事件处理程序包装到 Effect Events 中。
8. Don’t create custom Hooks like useMount. Keep their purpose specific.
   不要像 useMount 这样创建通用的自定义钩子。保持它们的目的具体化。
9. It’s up to you how and where to choose the boundaries of your code.
   如何选择代码的边界以及位置由您决定。

## Resources

- [reusing-logic-with-custom-hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
