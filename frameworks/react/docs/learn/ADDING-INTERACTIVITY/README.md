# Adding Interactivity

## Responding to Events响应事件
### Adding event handlers
Functions passed to event handlers must be passed, not called
### Reading props in event handlers 
### Passing event handlers as props 
### Naming event handler props
By convention, event handler props should start with on, followed by a capital letter.

Make sure that you use the appropriate HTML tags for your event handlers. For example, to handle clicks, use `<button onClick={handleClick}>` instead of `<div onClick={handleClick}>`

### Event propagation 
> All events propagate in React except `onScroll`, which only works on the JSX tag you attach it to.
> // TODO 事件合成  
### Stopping propagation
```js
e.stopPropagation();
```
### Passing handlers as alternative to propagation 

### onClickCapture
React `onClickCapture` is an event handler that gets triggered whenever we click on an element. like onclick, but the difference is that `onClickCapture` acts in the capture phase whereas onClick acts in the bubbling phase i.e. `phases` of an event.
### e.stopPropagation()/e.preventDefault()/e.stopImmediatePropagation
- `e.stopPropagation()` stops the event handlers attached to the tags above from firing.
- `e.preventDefault()` prevents the default browser behavior for the few events that have it.
- `stopImmediatePropagation` prevents other listeners of the same event from being called阻止监听同一事件的其他事件监听器被调用.

## State: A Component's Memory

- Local variables don’t persist between renders. When React renders this component a second time, it renders it from scratch—it doesn’t consider any changes to the local variables.
- Changes to local variables won’t trigger renders. React doesn’t realize it needs to render the component again with the new data.



#### How does React know which state to return? 
> 依赖hooks的顺序

Instead, to enable their concise syntax, Hooks rely on a **stable call order** on _every render of the same component_. This works well in practice because if you follow the rule above (“only call Hooks at the top level”), Hooks will always be called in the same order. Additionally, a linter plugin catches most mistakes.

Internally, React holds an array of state pairs for every component. It also maintains the current pair index, which is set to `0` before rendering. Each time you call `useState`, React gives you the next state pair and increments the index. You can read more about this mechanism in React Hooks: [Not Magic, Just Arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e).
```js
// https://codesandbox.io/s/simplified-react-hooks-implemented-73jnnh
/**
 * 组件的Hook数
 */
let componentHooks = [];
/**
 * 当前的Hook索引
 */
let currentHookIndex = 0;

// How useState works inside React (simplified).
function useState(initialState) {
  let pair = componentHooks[currentHookIndex];
  if (pair) {
    // This is not the first render,
    // so the state pair already exists.
    // Return it and prepare for next Hook call.
    currentHookIndex++;
    return pair;
  }

  // This is the first time we're rendering,
  // so create a state pair and store it.
  pair = [initialState, setState];

  function setState(nextState) {
    // When the user requests a state change,
    // put the new value into the pair.
    pair[0] = nextState;
    updateDOM();
  }

  // Store the pair for future renders
  // and prepare for the next Hook call.
  componentHooks[currentHookIndex] = pair;
  currentHookIndex++;
  return pair;
}
```

### State is isolated and private

State is local to a component instance on the screen. In other words, if you render the same component twice, each copy will have completely isolated state! Changing one of them will not affect the other换句话说，如果你render两次同一个组件的话，每一份拷贝将具有完整独立的内部状态，改变任一组件的状态不会影响另一个组件.

### recap
- Use a state variable when a component needs to “remember” some information between renders.
- State variables are declared by calling the useState Hook.
- Hooks are special functions that start with use. They let you “hook into” React features like state.
- Hooks might remind you of imports: they need to be called unconditionally. Calling Hooks, including useState, is only valid at the top level of a component or another Hook.
- The useState Hook returns a pair of values: the current state and the function to update it.
- You can have more than one state variable. Internally, React matches them up by their order.
- State is private to the component. If you render it in two places, each copy gets its own state.

## Render and Commit

Before your components are displayed on screen, they must be **rendered** by React. Understanding the steps in this process will help you think about how your code executes and explain its behavior.

Imagine that your components are cooks in the kitchen, assembling tasty dishes from ingredients. In this scenario, _React is the waiter_ who puts in requests from customers and brings them their orders. This process of requesting and serving UI has three steps:

1. **Triggering** a render(触发渲染) (delivering the guest’s order to the kitchen)
2. **Rendering** the component(渲染组件) (preparing the order in the kitchen)
3. **Committing** to the DOM(提交到DOM) (placing the order on the table)

### Step 1: Trigger a render

There are _two reasons_ for a component to render:

1. It’s the component’s initial render(组件的首次渲染).
2. The component’s (or one of its ancestors’) state has been updated(组件的/父组件的状态被更新了).

#### Initial render 

When your app starts, you need to trigger the initial render(app开始运行时，你需要触发首次渲染). Frameworks and sandboxes sometimes hide this code, but it’s done by calling [createRoot](https://react.dev/reference/react-dom/client/createRoot) with the target DOM node(这是调用createRoot方法，挂载到目的DOM节点上触发的), and then calling its render method with your component(然后再调用组件的render方法):

#### Re-renders when state updates
Once the component has been initially rendered, you can trigger further renders by updating its state with the `set function`(组件初始化渲染后，通过更新状态来触发新一次的渲染). Updating your component’s state automatically queues a render(更新组件的状态会自动将这个渲染推到渲染队列中). (You can imagine these as a restaurant guest ordering tea, dessert, and all sorts of things after putting in their first order, depending on the state of their thirst or hunger.(你可以将这想象成一个餐厅的客人，在他们下了第一道菜的订单后，根据他们的口渴或饥饿程度的状态，点了茶、甜点以及各种不同的东西。))

### Step 2: React renders your components

After you trigger a render, React calls your components to figure out what to display on screen(在你触发一次渲染之后，React会调用你的组件，以确定在屏幕上显示什么内容。). **“Rendering” is React calling your components**.

On initial render, React will call the root component.
For subsequent renders, React will call the function component whose state update triggered the render.
This process is recursive: if the updated component returns some other component, React will render that component next, and if that component also returns something, it will render that component next, and so on. The process will continue until there are no more nested components and React knows exactly what should be displayed on screen(在初始渲染时，React会调用根组件。
对于后续的渲染，React会调用触发渲染的函数组件。
这个过程是递归的：如果更新后的组件返回另一个组件，React会接着渲染该组件；如果那个组件也返回了一些内容，React会继续渲染下一个组件，依此类推。这个过程会一直持续，直到没有更多的嵌套组件，React就会准确地知道在屏幕上应该显示什么内容。).
> React 使用一种名为 **Fiber** 架构的数据结构来追踪组件的变化，并在渲染时决定哪些组件需要更新。当组件的状态发生变化时，React 会通过以下步骤来确定哪个组件的状态发生了改变，并触发相应的渲染：

1. **Marking Phase（标记阶段）**：在发生状态变化后，React 会在 **Fiber** 树中进行一次标记阶段，标记需要更新的组件。这个阶段会确定哪些组件需要重新渲染，以及在 **Fiber** 树中的哪些节点发生了变化。

2. **Commit Phase（提交阶段）**：在标记阶段结束后，React 开始进入提交阶段。在这个阶段，React 会根据标记的结果更新真实的 DOM。这个过程中可能涉及到 DOM 的创建、更新和删除。

> 通过这种方式，React 能够高效地确定哪些组件需要重新渲染，从而避免了不必要的渲染操作，提高了性能。Fiber 架构的设计使得 React 能够以高效的方式管理组件的状态变化，并在组件树中追踪变化，以便准确地触发渲染。
#### Pitfall
Rendering must always be a [pure calculation](https://react.dev/learn/keeping-components-pure):

- **Same inputs, same output**. Given the same inputs, a component should always return the same JSX. (When someone orders a salad with tomatoes, they should not receive a salad with onions!)
- **It minds its own business**. It should not change any objects or variables that existed before rendering(在渲染之前存在的任何对象或变量都不应该被改变。). (One order should not change anyone else’s order.)

Otherwise, you can encounter confusing bugs and unpredictable behavior as your codebase grows in complexity. When developing in “Strict Mode”, React calls each component’s function twice, which can help surface mistakes caused by impure functions(否则，在代码库变得更加复杂时，你可能会遇到令人困惑的错误和不可预测的行为。在开发中使用“严格模式”时，React会调用每个组件的函数两次，这有助于暴露由于不纯函数引起的错误。).

#### Optimizing performance优化性能

The default behavior of rendering all components nested within the updated component is not optimal for performance if the updated component is very high in the tree. If you run into a performance issue, there are several opt-in ways to solve it described in the Performance section. Don’t optimize prematurely!(如果更新的组件位于组件树的较高位置，那么默认的渲染所有嵌套在更新组件内部的组件的行为对于性能来说可能不够优化。如果遇到性能问题，在“性能”部分中描述了几种可选择的解决方案。**不要过早进行优化**！)

### Step 3: React commits changes to the DOM
After rendering (calling) your components, React will modify the DOM(在组件渲染之后，React将会修改DOM结构).

- **For the initial render**, React will use the `appendChild()` DOM API to put _all the DOM nodes_ it has created on screen.
- **For re-renders**, React will apply the _minimal necessary operations_ (calculated while rendering!) to make the DOM match the latest rendering output.

**React only changes the DOM nodes if there’s a difference between renders**. For example, here is a component that re-renders with different props passed from its parent every second. Notice how you can add some text into the `<input>`, updating its `value`, but the text doesn’t disappear when the component re-renders:
```JS
export default function Clock({ time }) {
  return (
    <>
      <h1>{time}</h1>
      <input />
    </>
  );
}
```
This works because during this last step, React only updates the content of `<h1>` with the new time. It sees that the `<input>` appears in the JSX in the same place as last time, so React doesn’t touch the `<input>`—or its value!

### Epilogue: Browser paint(结语：浏览器渲染) 
After rendering is done and React updated the DOM, the browser will repaint the screen(在渲染完成并且React更新了DOM之后，浏览器将重新绘制屏幕). Although this process is known as “browser rendering”, we’ll refer to it as “painting” to avoid confusion throughout the docs(虽然这个过程被称为“浏览器渲染”，但在文档中我们将称之为“绘制”，以避免混淆。).

### Recap
- Any screen update in a React app happens in three steps:
  1. Trigger
  2. Render
  3. Commit
- You can use Strict Mode to find mistakes in your components
- React does not touch the DOM if the rendering result is the same as last time

## State as a Snapshot

State variables might look like **regular JavaScript variables** that you can read and write to. However, state behaves more like a snapshot(实际上，状态表现得更像快照). Setting it does not change the state variable you already have, but instead triggers a re-render(对它的设置并不会改变你已经拥有的状态变量，而是会触发重新渲染).

### Setting state triggers renders(设置状态会触发渲染)

### Rendering takes a snapshot in time
**“Rendering”** means that React is calling your component, which is a function. The JSX you return from that function is like a snapshot of the UI in time. Its props, event handlers, and local variables were all calculated **using its state at the time of the render**(“渲染”意味着React正在调用你的组件，而组件本身是一个函数。你从这个函数中返回的JSX就像是某个时刻的UI快照。它的props、事件处理程序和局部变量都是在渲染时使用它的状态计算出来的。).

Unlike a photograph or a movie frame, the UI “snapshot” you return is interactive. It includes logic like event handlers that specify what happens in response to inputs. React updates the screen to match this snapshot and connects the event handlers. As a result, pressing a button will trigger the click handler from your JSX(与照片或电影帧不同，你返回的UI“快照”是交互式的。它包含了诸如事件处理程序之类的逻辑，用于指定对输入的响应。React会更新屏幕以匹配这个快照，并连接事件处理程序。因此，按下按钮会触发你的JSX中的点击处理程序。).

When React re-renders a component:

1. React calls your function again(React再次调用你的函数).
2. Your function returns a new JSX snapshot(你的函数返回一个新的JSX快照).
3. React then updates the screen to match the snapshot you’ve returned(然后，React会更新屏幕以匹配你返回的快照).

As a component’s memory, state is not like a regular variable that disappears after your function returns. State actually “lives” in React itself—as if on a shelf!—outside of your function. When React calls your component, it gives you a snapshot of the state for that particular render. Your component returns a snapshot of the UI with a fresh set of props and event handlers in its JSX, all calculated using the state values from that render!

作为组件的内存，状态并不像普通变量一样在函数返回后消失。状态实际上“存在于”React自身中，就好像放在一个架子上一样！它位于你的函数之外。当React调用你的组件时，它会为那次渲染提供状态的快照。你的组件在其JSX中返回了UI的快照，其中包含了一组全新的props和事件处理程序，所有这些都是使用该次渲染的状态值计算得出的！

### State over time随着时间的推移的状态
**React keeps the state values “fixed” within one render’s event handlers**. You don’t need to worry whether the state has changed while the code is running.

But what if you wanted to read the latest state before a re-render? You’ll want to use a [state updater function](https://react.dev/learn/queueing-a-series-of-state-updates), covered on the next page!

### Recap
- Setting state requests a new render(设置状态会请求进行新的渲染).
- React stores state outside of your component, as if on a shelf(React 将状态存储在组件外部，就像放在架子上一样).
- When you call `useState`, React gives you a snapshot of the state for _that render_(当你调用 useState 时，React 会为该渲染提供状态的快照).
- Variables and event handlers don’t “survive” re-renders. Every render has its own event handlers(变量和事件处理程序不会在重新渲染后“保留”。每次渲染都有自己的事件处理程序).
- Every render (and functions inside it) will always “see” the snapshot of the state that React gave to that render(每次渲染（以及其内部的函数）都会始终“看到”React为该渲染提供的状态快照).
- You can mentally substitute state in event handlers, similarly to how you think about the rendered JSX(在事件处理程序中可以将状态进行替换，类似于你在思考渲染的 JSX 时的方式).
- Event handlers created in the past have the state values from the render in which they were created(过去创建的事件处理程序具有它们所在渲染的状态值).

## Queueing a Series of State Updates

Setting a state variable will queue another render. But sometimes you might want to perform multiple operations on the value before queueing the next render. To do this, it helps to understand how **React batches state updates**.

设置状态变量会排队另一个渲染。但有时在排队下一个渲染之前，你可能想对值执行多个操作。为了做到这一点，了解React如何**批处理状态更新**会很有帮助。

### React batches state updates
However, as you might recall from the previous section, **each render’s state values are fixed**, so the value of `number` inside the first render’s event handler is always `0`, no matter how many times you call `setNumber(1)`

But there is one other factor at play here. React waits until all code in the event handlers has run before processing your state updates. This is why the re-render only happens _after all_ these `setNumber()` calls.

但这里还有另一个因素在起作用。在处理你的状态更新之前，React会等到事件处理程序中的所有代码都执行完毕。这就是为什么重新渲染只会在所有这些`setNumber()`调用之后发生

This might remind you of a waiter taking an order at the restaurant. A waiter doesn’t run to the kitchen at the mention of your first dish! Instead, they let you finish your order, let you make changes to it, and even take orders from other people at the table.

这可能让你想起了在餐厅点菜时的服务员。服务员并不会在你点了第一道菜时就冲向厨房！相反，他们会等你完成点菜，允许你对其进行更改，甚至还会在桌子上接受其他人的点单。

This lets you update multiple state variables—even from multiple components—without triggering too many re-renders. But this also means that the UI won’t be updated until after your event handler, and any code in it, completes. This behavior, also known as batching, makes your React app run much faster. It also avoids dealing with confusing “half-finished” renders where only some of the variables have been updated.

这使你可以更新多个状态变量，甚至来自多个组件，而不会触发过多的重新渲染。但这也意味着在你的事件处理程序及其中的任何代码完成之前，UI不会被更新。这种行为也被称为**批处理**，它使你的React应用运行速度更快。它还避免了处理混乱的“未完成”渲染，其中只有一些变量已经更新。

React does not batch across multiple intentional events like clicks—each click is handled separately. Rest assured that React only does batching when it’s generally safe to do. This ensures that, for example, if the first button click disables a form, the second click would not submit it again.

React在多个有意义的事件（如点击）之间不会进行批处理，每次点击都会单独处理。请放心，React只在通常安全的情况下进行批处理。这确保了，例如，如果第一次按钮点击禁用了一个表单，第二次点击将不会再次提交它。

### Updating the same state multiple times before the next render 

It is an uncommon use case, but if you would like to update the same state variable multiple times before the next render, instead of passing the next state value like `setNumber(number + 1)`, you can pass a function that calculates the next state based on the previous one in the queue, like `setNumber(n => n + 1)`. It is a way to tell React to “do something with the state value” instead of just replacing it.

这是一个不常见的用例，但如果你想在下一次渲染之前多次更新同一个状态变量，而不是像`setNumber(number + 1)`这样传递下一个状态值，你可以传递一个基于队列中前一个状态的函数来计算下一个状态，例如`setNumber(n => n + 1)`。这是一种告诉React“对状态值进行操作”而不仅仅是替换它的方式。
```JS
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button onClick={() => {
        setNumber(n => n + 1);
        setNumber(n => n + 1);
        setNumber(n => n + 1);
      }}>+3</button>
    </>
  )
}
```
[LINK Code](https://codesandbox.io/s/xqyjcg?file=/App.js&utm_medium=sandpack)

Here, `n => n + 1` is called an **updater function**. When you pass it to a state setter:

React queues this function to be processed after all the other code in the event handler has run.React将此函数添加到队列中，以便在事件处理程序中的所有其他代码运行后进行处理

During the next render, React goes through the queue and gives you the final updated state.在下一次渲染期间，React会遍历队列并提供给你最终更新的状态。

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```
Here’s how React works through these lines of code while executing the event handler:

1. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.
2. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.
3. `setNumber(n => n + 1)`: `n => n + 1` is a function. React adds it to a queue.

When you call `useState` during the next render, React goes through the queue. The previous `number` state was `0`, so that’s what React passes to the first updater function as the `n` argument. Then React takes the return value of your previous updater function and passes it to the next updater as `n`, and so on:

当你在下一次渲染期间调用`useState`时，React会遍历队列。先前的数字状态为`0`，因此React将其作为n参数传递给第一个更新函数。然后，React会将上一个更新函数的返回值作为n传递给下一个更新函数，依此类推：

|queued update|n|returns|
|--|--|--|
|n => n + 1|0|0 + 1 = 1|
|n => n + 1|1|1 + 1 = 2|
|n => n + 1|2|2 + 1 = 3|

React stores `3` as the final result and returns it from `useState`.

This is why clicking “+3” in the above example correctly increments the value by 3.

### What happens if you update state after replacing it 
What about this event handler? What do you think number will be in the next render?
```JS
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
}}>
```
[Code Link](https://codesandbox.io/s/8kpdvd?file=/App.js&utm_medium=sandpack)
Here’s what this event handler tells React to do:

1. `setNumber(number + 5)`: `number` is `0`, so `setNumber(0 + 5)`. **React adds “replace with 5” to its queue**.
2. `setNumber(n => n + 1)`: `n => n + 1` is an updater function. React adds _that function_ to its queue.

During the next render, React goes through the state queue:

|queued update|`n`|returns|
|--|--|--|
|“replace with `5`”|`0` (unused)|`5`|
|`n => n + 1`|`5`|`5 + 1 = 6`| 

> You may have noticed that `setState(5)` actually works like `setState(n => 5)`, but `n` is unused!

### What happens if you replace state after updating it

Let’s try one more example. What do you think `number` will be in the next render?

```js
<button onClick={() => {
  setNumber(number + 5);
  setNumber(n => n + 1);
  setNumber(42);
}}>
```
[Code Link](https://codesandbox.io/s/wpwz2f?file=/App.js&utm_medium=sandpack)

Here’s how React works through these lines of code while executing this event handler:

1. `setNumber(number + 5)`: number is `0`, so `setNumber(0 + 5)`. React adds “_replace with 5_” to its queue.
2. `setNumber(n => n + 1)`: `n => n + 1` is an updater function. React adds _that function_ to its queue.
3. `setNumber(42)`: React adds _“replace with 42”_ to its queue.

During the next render, React goes through the state queue:

|queued update|`n`|returns|
|--|--|--|
|“replace with `5`”|`0` (unused)|`5`|
|`n => n + 1`|`5`|`5 + 1 = 6`| 
|“replace with `42`”|`6` (unused)|`42`|

Then React stores `42` as the final result and returns it from `useState`.

To summarize, here’s how you can think of what you’re passing to the `setNumber` state setter:

- **An updater function** (e.g. `n => n + 1`) gets added to the queue.
- **Any other value** (e.g. number `5`) adds “replace with 5” to the queue, **ignoring what’s already queued**.

After the event handler completes, React will trigger a re-render. During the re-render, React will process the queue. Updater functions run during rendering, so **updater functions** must be **pure** and only return the result. Don’t try to set state from inside of them or run other side effects. In Strict Mode, React will run each updater function twice (but discard the second result) to help you find mistakes.

### Naming conventions命名惯例
It’s common to name the updater function argument by **the first letters** of the corresponding state variable:
```JS
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
```
If you prefer more verbose code, another common convention is to repeat the full state variable name, like `setEnabled(enabled => !enabled)`, or to use a prefix like `setEnabled(prevEnabled => !prevEnabled)`.

### Recap
- Setting state does not change the variable in the existing render, but it requests a new render.
- React processes state updates after event handlers have finished running. This is called batching.
- To update some state multiple times in one event, you can use `setNumber(n => n + 1)` updater function.
### Challenges
- [challenge 1](https://codesandbox.io/s/wizardly-shannon-6pqyvv?file=/App.js), // TODO eventloop
- [challenge 2](https://codesandbox.io/s/elegant-babycat-jzfz4d?file=/processQueue.js), 手动实现react中的`update queue`

## Updating Objects in State

State can hold any kind of JavaScript value, including objects. But you shouldn’t change objects that you hold in the React state directly. Instead, when you want to update an object, you need to **create a new one** (or make a copy of an existing one), and then **set the state to use that copy**.

### What’s a mutation? 
Now consider an object in state:
```JS
const [position, setPosition] = useState({ x: 0, y: 0 });
```
Technically, it is possible to change the contents of the object itself. **This is called a mutation**:
```js
position.x = 5;
```
However, although objects in React state are technically mutable, you should treat them as if they were immutable—like numbers, booleans, and strings. **Instead of mutating them, you should always replace them.**

### Treat state as read-only 

In other words, you should **treat any JavaScript object that you put into state as read-only**.

This code modifies the object assigned to `position` from `the previous render`. **But without using the state setting function, React has no idea that object has changed**. So React does not do anything in response. It’s like trying to change the order after you’ve already eaten the meal. While mutating state can work in some cases, we don’t recommend it. You should treat the state value you have access to in a render as read-only.
#### Local mutation is fine 

Mutation is only a problem when you change _existing_ objects that are already in state. Mutating an object you’ve just created is okay because _no other code references it yet_. Changing it isn’t going to accidentally impact something that depends on it. This is called a “local mutation”. You can even do local mutation while rendering. Very convenient and completely okay!

### Copying objects with the spread syntax

Note that the `...` spread syntax is `“shallow”`—it only copies things one level deep. This makes it fast, but it also means that if you want to update a nested property, you’ll have to use it more than once(嵌套属性，需要多次使用`...`).
#### Using a single event handler for multiple fields 

You can also use the `[` and `]` braces inside your object definition to specify a property with dynamic name. Here is the same example, but with a single event handler instead of three different ones:
```js
  function handleChange(e) {
    setPerson({
      ...person,
      [e.target.name]: e.target.value
    });
  }
```
### Updating a nested object
多次使用`...`操作符
### Write concise update logic with Immer

If your state is deeply nested, you might want to consider [flattening it](https://react.dev/learn/choosing-the-state-structure#avoid-deeply-nested-state). But, if you don’t want to change your state structure, you might prefer a shortcut to nested spreads. [Immer](https://github.com/immerjs/use-immer) is a popular library that **lets you write using the convenient but mutating syntax and takes care of producing the copies for you**. With Immer, the code you write looks like you are “breaking the rules” and mutating an object:
```JS
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```
#### How does Immer work?
The `draft` provided by Immer is a special type of object, called a `Proxy`, that “records” what you do with it. This is why you can mutate it freely as much as you like! Under the hood, Immer figures out which parts of the `draft` have been changed, and produces a completely new object that contains your edits.

To try Immer:

1. Run `npm install use-immer` to add Immer as a dependency
2. Then replace `import { useState } from 'react'` with `import { useImmer } from 'use-immer'`

[LINK Code](https://codesandbox.io/s/8kyspf?file=/App.js&utm_medium=sandpack)

使用场景：

Immer is a great way to keep the update handlers concise, especially if there’s nesting in your state, and copying objects leads to repetitive code.

#### Why is mutating state not recommended in React? 

There are a few reasons:

- **Debugging**: If you use `console.log` and don’t mutate state, your past logs won’t get clobbered by the more recent state changes. So you can clearly see how state has changed between renders.
- **Optimizations**: Common React [optimization strategies](https://react.dev/reference/react/memo) rely on skipping work if previous props or state are the same as the next ones. If you never mutate state, it is very fast to check whether there were any changes. If `prevObj === obj`, you can be sure that nothing could have changed inside of it.
- **New Features**: The new React features we’re building rely on state being [treated like a snapshot](https://react.dev/learn/state-as-a-snapshot). If you’re mutating past versions of state, that may prevent you from using the new features.
- **Requirement Changes**: Some application features, like implementing **Undo/Redo**, showing a history of changes, or letting the user reset a form to earlier values, are easier to do when nothing is mutated. This is because you can keep past copies of state in memory, and reuse them when appropriate. If you start with a mutative approach, features like this can be difficult to add later on.
- **Simpler Implementation**: Because React does not rely on mutation, it does not need to do anything special with your objects. It does not need to hijack their properties, always wrap them into Proxies, or do other work at initialization as many “reactive” solutions do. This is also why React lets you put any object into state—no matter how large—without additional performance or correctness pitfalls.因为React不依赖于改变，所以它不需要对你的对象进行任何特殊处理。它不需要劫持它们的属性，总是将它们包装成代理，或者在初始化时做其他工作，就像许多“响应式”解决方案那样。这也是为什么React允许你将任何对象放入状态中，无论有多大，都不会产生额外的性能或正确性问题。

In practice, you can often “get away” with mutating state in React, but we strongly advise you not to do that so that you can use new React features developed with this approach in mind. Future contributors and perhaps even your future self will thank you!
实际上，在React中，你通常可以“做到”改变状态，但我们强烈建议你不要这样做，以便可以使用以此方法为基础开发的新React功能。未来的贡献者，甚至你未来的自己，都会感谢你！

### Recap
- Treat all state in React as immutable.
- When you store objects in state, mutating them will not trigger renders and will change the state in previous render “snapshots”.
- Instead of mutating an object, create a new version of it, and trigger a re-render by setting state to it.
- You can use the `{...obj, something: 'newValue'}` object spread syntax to create copies of objects.
- Spread syntax is shallow: it only copies one level deep.
- To update a nested object, you need to create copies all the way up from the place you’re updating.
- To reduce repetitive copying code, use `Immer`.

## Updating Arrays in State

Arrays are mutable in JavaScript, but you should treat them as immutable when you store them in state. **Just like with objects, when you want to update an array stored in state, you need to create a new one (or make a copy of an existing one), and then set state to use the new array**.

### Updating arrays without mutation 
||avoid (mutates the array)|prefer (returns a new array)|
|--|--|--|
|adding|`push`, `unshift`|`concat`, `[...arr]` spread syntax ([example](#adding-to-an-array))|
|removing|`pop`, `shift`, `splice`|`filter`, `slice` ([example](#remove-from-an-array))|
|replacing|`splice`, `arr[i] = ...` assignment|`map` ([example](#replacing-items-in-an-array))|
|sorting|`reverse`, `sort`|copy the array first ([example](#making-other-changes-to-an-array))|
#### Pitfall
Unfortunately, `slice` and `splice` are named similarly but are very different:

- `slice` lets you copy an array or a part of it.
- `splice` **mutates** the array (to insert or delete items).

In React, you will be using `slice` (no `p`!) a lot more often because **you don’t want to mutate objects or arrays in state**. [Updating Objects](#updating-objects-in-state) explains what mutation is and why it’s not recommended for state.

### Adding to an array

### Removing from an array 

### Transforming an array

### Replacing items in an array 

### Inserting into an array

### Making other changes to an array 

### Updating objects inside arrays 

### Write concise update logic with Immer

Updating nested arrays without mutation can get a little bit repetitive. Just as with objects:

- Generally, you shouldn’t need to update state more than a couple of levels deep. If your state objects are very deep, you might want to `restructure them differently` so that they are flat.
- If you don’t want to change your state structure, you might prefer to use `Immer`, which lets you write using the convenient but mutating syntax and takes care of producing the copies for you.

  

### Recap
- You can put arrays into state, but you can’t change them.
- Instead of mutating an array, create a **new version** of it, and update the state to it.
- You can use the `[...arr, newItem]` array spread syntax to create arrays with new items.
- You can use `filter()` and `map()` to create new arrays with filtered or transformed items.
- You can use **Immer** to keep your code concise.