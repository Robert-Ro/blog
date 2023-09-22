# Managing State

As your application grows, it helps to be more intentional about how your state is organized and how the data flows between your components. **Redundant** or **duplicate state** is a common source of bugs. In this chapter, you’ll learn how to structure your state well, how to keep your state update logic maintainable, and how to share state between distant components.

## Reacting to input with state

React provides a declarative way to manipulate the UI. Instead of manipulating individual pieces of the UI directly, you describe the different states that your component can be in, and switch between them in response to the user input. This is similar to how designers think about the UI.

### How declarative UI compares to imperative 声明式vs命令式
 
 In React, you don’t directly manipulate the UI—meaning you don’t enable, disable, show, or hide components directly. Instead, **you declare what you want to show**, and **React figures out how to update the UI**. Think of getting into a taxi and **telling the driver where you want to go instead of telling them exactly where to turn**. It’s the driver’s job to **get you there, and they might even know some shortcuts you haven’t considered**!

在React中，你不直接操作UI，也就是说你不会直接启用、禁用、显示或隐藏组件。相反，你声明想要显示什么，React会计算如何更新UI。想象一下坐上出租车，告诉司机你想去哪里，而不是准确告诉他们在哪里转弯。司机的工作是把你带到目的地，他们甚至可能知道一些你没有考虑过的捷径！

### Thinking about UI declaratively 

- Identify your component’s different visual states
- Determine what triggers those state changes
- Represent the state in memory using useState
- Remove any non-essential state variables
- Connect the event handlers to set the state

#### Step 1: Identify your component’s different visual states
#### Step 2: Determine what triggers those state changes 
You can trigger state updates in response to two kinds of inputs:

- **Human inputs**, like _clicking a button_, _typing in a field_, _navigating a link_.
- **Computer inputs**, like a _network response arriving_, a _timeout completing_, an _image loading_.

> Notice that human inputs often require **event handlers**!

#### Step 3: Represent the state in memory with `useState`

**Simplicity is key**

**More complexity leads to more bugs!**


If you struggle to think of the best way immediately, start by adding enough state that you’re definitely sure that **all the possible visual states are covered**先声明足够的状态来覆盖所有的UI状态(然后再移除多余的状态)

#### Step 4: Remove any non-essential state variables

Your goal is to prevent the cases where the state in memory doesn’t represent any valid UI that you’d want a user to see. (For example, you never want to show an error message and disable the input at the same time, or the user won’t be able to correct the error!)

你的目标是防止内存中的状态不代表任何你想让用户看到的有效UI情况。（例如，你永远不想同时显示错误消息和禁用输入，否则用户将无法纠正错误！）

也就是说不在UI中显示的数据没有必要作为`state`表示出来

Here are some questions you can ask about your state variables:

- **Does this state cause a paradox**? For example, `isTyping` and `isSubmitting` can’t both be `true`. A paradox usually means that the state is not constrained enough. There are four possible combinations of two booleans, but only three correspond to valid states. To remove the “impossible” state, you can combine these into a status that must be one of three values: `'typing'`, `'submitting'`, or `'success'`(这个状态是否引发了悖论？例如，`isTyping`和`isSubmitting`不能同时为true。悖论通常意味着状态没有足够的约束。两个布尔值有四种可能的组合，但只有三种对应有效状态。为了去除“不可能”的状态，您可以将它们组合成一个状态，必须是三个值之一：'typing'、'submitting'或'success'。).
- **Is the same information available in another state variable already**? Another paradox: isEmpty and isTyping can’t be true at the same time. By making them separate state variables, you risk them going out of sync and causing bugs. Fortunately, you can remove isEmpty and instead check answer.length === 0(同样的信息是否已经在另一个状态变量中可用？另一个悖论：isEmpty和isTyping不能同时为true。通过将它们作为单独的状态变量，您会让它们失去同步，引发错误。幸运的是，您可以移除isEmpty，而是检查answer.length === 0。).
- **Can you get the same information from the inverse of another state variable**? isError is not needed because you can check error !== null instead(是否可以从另一个状态变量的反面获取相同的信息？不需要isError，因为您可以检查error !== null来代替。).

> 是否可由其他数据计算而出的数据，都不应当设置为状态? // FIXME

Eliminating “impossible” states with a reducer 

These three variables are a good enough representation of this form’s state. However, there are still some intermediate states that don’t fully make sense. For example, a non-null error doesn’t make sense when `status` is `'success'`. To model the state more precisely, you can [extract it into a reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer). Reducers let you unify multiple state variables into a single object and consolidate all the related logic!

#### Step 5: Connect the event handlers to set state

### Recap
- Declarative programming means describing the UI for each visual state rather than micromanaging the UI (imperative).
- When developing a component:
    1. Identify all its visual states.
    2. Determine the human and computer triggers for state changes.
    3. Model the state with useState.
    4. Remove non-essential state to avoid bugs and paradoxes.
    5. Connect the event handlers to set state.

## Choosing the State Structure

Structuring state well can make a difference between a component that is pleasant to modify and debug, and one that is a constant source of bugs. Here are some tips you should consider when structuring state.

合理地构造状态可以在修改和调试组件时产生差异，使组件更加愉快，而不是成为bug的不断来源。以下是在构造状态时应考虑的一些建议。

### Principles for structuring state 

When you write a component that holds some state, you’ll have to make choices about how many state variables to use and what the shape of their data should be. While it’s possible to write correct programs even with a suboptimal state structure, there are a few principles that can guide you to make better choices:

1. **Group related state**将相关状态分组. If you always update two or more state variables at the same time, consider merging them into a single state variable如果您总是同时更新两个或更多的状态变量，请考虑将它们合并为一个单一的状态变量.
2. **Avoid contradictions in state**避免状态矛盾. When the state is structured in a way that several pieces of state may contradict and “disagree” with each other, you leave room for mistakes. Try to avoid this当状态以一种可能导致几个状态片段相互矛盾和“不一致”的方式结构化时，会留下错误的空间。尽量避免这种情况.
3. **Avoid redundant state**避免冗余状态. If you can calculate some information from the component’s props or its existing state variables during rendering, you should not put that information into that component’s state如果您可以在组件的属性或其现有状态变量中计算出一些信息，那么不应将该信息放入该组件的状态中.
4. **Avoid duplication in state**避免状态重复. When the same data is duplicated between multiple state variables, or within nested objects, it is difficult to keep them in sync. Reduce duplication when you can.当相同的数据在多个状态变量之间重复，或在嵌套对象内部重复时，很难使它们保持同步。可以时减少重复
5. **Avoid deeply nested state**避免深度嵌套状态. Deeply hierarchical state is not very convenient to update. When possible, prefer to structure state in a flat way深层次的分层状态不太方便更新。如果可能的话，最好以扁平的方式构造状态.

The goal behind these principles is to make state easy to update without introducing mistakes. Removing redundant and duplicate data from state helps ensure that all its pieces stay in sync. This is similar to how a database engineer might want to [“normalize” the database structure](https://docs.microsoft.com/en-us/office/troubleshoot/access/database-normalization-description) to reduce the chance of bugs. To paraphrase Albert Einstein, **“Make your state as simple as it can be—but no simpler.”**
这些原则背后的目标是使状态易于更新，而不引入错误。从状态中删除冗余和重复数据有助于确保所有部分保持同步。这类似于数据库工程师可能希望“规范化”数据库结构以减少错误机会。用爱因斯坦的话说，“让您的状态尽可能简单，但不要过于简单。”
#### Group related state将相关状态分组
 If some two state variables always change together, it might be a good idea to unify them into a single state variable. Then you won’t forget to always keep them in sync。

**Another case** _where you’ll group data into an object or an array is when you don’t know how many pieces of state you’ll need_. For example, it’s helpful when you have a **form** where the user can add custom fields.

> If your state variable is an object, remember that you can’t update only one field in it without explicitly copying the other fields.

#### Avoid contradictions in state避免状态矛盾
#### Avoid redundant state避免冗余状态

If you can calculate some information from the **component’s props** or **its existing state variables** during rendering, you should not put that information into that component’s state.

##### Don’t mirror props in state

A common example of redundant state is code like this:
```JSX
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
}
```
Here, a color state variable is initialized to the messageColor prop. The problem is that if the parent component passes a different value of messageColor later (for example, 'red' instead of 'blue'), _the color state variable would not be updated!_ **The state is only initialized during the first render**.

This is why “mirroring” some prop in a state variable can **lead to confusion**. Instead, use the `messageColor` prop directly in your code. If you want to give it a shorter name, use a constant:
```JS
function Message({ messageColor }) {
  const color = messageColor;
}
```

This way it won’t get out of sync with the prop passed from the parent component.

“Mirroring” props into state only makes sense when you *want* to ignore all updates for a specific prop. By convention, start the prop name with initial or default to clarify that its new values are ignored:
```JS
function Message({ initialColor }) {
  // The `color` state variable holds the *first* value of `initialColor`.
  // Further changes to the `initialColor` prop are ignored.
  const [color, setColor] = useState(initialColor);
}
```

#### Avoid duplication in state 避免状态重复

#### Avoid deeply nested state 避免深度嵌套状态

尽可能的打平数据

[Link Code](https://codesandbox.io/s/boring-meadow-qjm9sh)

##### Improving memory usage

Ideally, you would also remove the deleted items (and their children!) from the “table” object to improve memory usage. This version does that. It also [uses Immer](https://react.dev/learn/updating-objects-in-state#write-concise-update-logic-with-immer) to make the update logic more concise.

[Link Code](https://codesandbox.io/s/stupefied-feistel-5dqmhm)

Sometimes, you can also reduce state nesting by moving some of the nested state into the child components. This works well for ephemeral UI state that doesn’t need to be stored, like whether an item is hovered.

### Recap
- If two state variables always update together, consider merging them into one.
- Choose your state variables carefully to avoid creating “impossible” states.
- Structure your state in a way that reduces the chances that you’ll make a mistake updating it.
- Avoid redundant and duplicate state so that you don’t need to keep it in sync.
- Don’t put props into state unless you specifically want to prevent updates.
- For UI patterns like selection, keep ID or index in state instead of the object itself.
- If updating deeply nested state is complicated, try flattening it.

## Sharing State Between Components

Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as **lifting state up**(状态提升), and it’s one of the most common things you will do writing React code.

### Lifting state up by example 
#### Step 1: Remove state from the child components
#### Step 2: Pass hardcoded data from the common parent
#### Step 3: Add state to the common parent 
##### Controlled and uncontrolled components受控组件与非受控组件
**It is common to call a component with some local state “uncontrolled”**. For example, the original Panel component with an isActive state variable is uncontrolled because its parent cannot influence whether the panel is active or not.

**In contrast, you might say a component is “controlled” when the important information in it is driven by props rather than its own local state**. This lets the parent component fully specify its behavior. The final Panel component with the isActive prop is controlled by the Accordion component.

Uncontrolled components are easier to use within their parents because they require less configuration. But they’re less flexible when you want to coordinate them together. Controlled components are maximally flexible, but they require the parent components to fully configure them with props.

In practice, “controlled” and “uncontrolled” aren’t strict technical terms—each component usually has some mix of both local state and props. However, this is a useful way to talk about how components are designed and what capabilities they offer.

When writing a component, consider which information in it should be controlled (via props), and which information should be uncontrolled (via state). But you can always change your mind and refactor later.

### A single source of truth for each state 

In a React application, many components will have their own state. Some state may “live” close to the leaf components (components at the bottom of the tree) like inputs. Other state may “live” closer to the top of the app. For example, even client-side routing libraries are usually implemented by storing the current route in the React state, and passing it down by props!

For each unique piece of state, you will choose the component that “owns” it. This principle is also known as having a “single source of truth”. It doesn’t mean that all state lives in one place—but that for each piece of state, there is a specific component that holds that piece of information. Instead of duplicating shared state between components, lift it up to their common shared parent, and pass it down to the children that need it.

Your app will change as you work on it. It is common that you will move state down or back up while you’re still figuring out where each piece of the state “lives”. This is all part of the process!

To see what this feels like in practice with a few more components, read Thinking in React.

### Recap
- When you want to coordinate two components, move their state to their common parent.
- Then pass the information down through props from their common parent.
- Finally, pass the event handlers down so that the children can change the parent’s state.
- It’s useful to consider components as **“controlled”** (driven by props) or **“uncontrolled”** (driven by state).

## Preserving and Resetting State

State is isolated between components. React keeps track of which state belongs to which component based on their place in the UI tree. You can control when to preserve state and when to reset it between re-renders.

### The UI tree

Browsers use many tree structures to model UI. The `DOM` represents HTML elements, the [CSSOM](https://developer.mozilla.org/docs/Web/API/CSS_Object_Model) does the same for CSS. There’s even an [Accessibility tree](https://developer.mozilla.org/docs/Glossary/Accessibility_tree)!

React also uses tree structures to manage and model the UI you make. React makes UI trees from your JSX. Then React DOM updates the browser DOM elements to match that UI tree. (React Native translates these trees into elements specific to mobile platforms.)

### State is tied to a position in the tree

When you give a component state, you might think the state “lives” inside the component. **But the state is actually held inside React**. React associates each piece of state it’s holding with the correct component by where that component sits in the UI tree.

In React, each component on the screen has **fully isolated state**. 

### Same component at the same position preserves state
[Link Code](https://codesandbox.io/s/lucid-kowalevski-pfcx88?file=/App.js)

When you tick or clear the checkbox, *the counter state does not get reset*. Whether isFancy is `true` or `false`, you always have a `<Counter />` as the first child of the `div` returned from the root `App` component:

**It’s the same component at the same position, so from React’s perspective, it’s the same counter**.

#### Pitfall
Remember that it’s the position in the **UI tree**—not in the JSX markup—that matters to React! This component has two `return` clauses with different `<Counter />` JSX tags inside and outside the if:
[Link Code](https://codesandbox.io/s/lucid-kare-vsmt2y)

You might expect the state to reset when you tick checkbox, but it doesn’t! This is because both of these `<Counter />` tags are **rendered at the same position**. React doesn’t know where you place the conditions in your function. **All it “sees” is the tree you return**.

In both cases, the App component returns a `<div>` with `<Counter />` as a first child. To React, these two counters have the same “address”: the first child of the first child of the root. This is how React matches them up between the previous and next renders, regardless of how you structure your logic.

### Different components at the same position reset state 

Here, you switch between different component types at the same position. Initially, the first child of the `<div>` contained a `Counter`. But when you swapped in a `p`, React removed the `Counter` from the UI tree and destroyed its state.

Also, **when you render a different component in the same position, it resets the state of its entire subtree**. To see how this works, increment the counter and then tick the checkbox:

[Link Code](https://codesandbox.io/s/dazzling-austin-msjh97)

As a rule of thumb, **if you want to preserve the state between re-renders, the structure of your tree needs to “match up” from one render to another**. _If the structure is different, the state gets destroyed because React destroys state when it removes a component from the tree_.
#### Pitfall
This is why you should not nest component function definitions.

Here, the `MyTextField` component function is defined inside `MyComponent`:
[Link Code](https://codesandbox.io/s/jolly-framework-drjz75?file=/App.js)

Every time you click the button, the input state disappears! This is because a _different_ **MyTextField** function is created for every render of **MyComponent**. _You’re rendering a different component in the same position_, so React resets all state below. This leads to bugs and performance problems. To avoid this problem, **always declare component functions at the top level, and don’t nest their definitions**.

### Resetting state at the same position

By default, _React preserves state of a component while it stays at the same position_. Usually, this is exactly what you want, so it makes sense as the default behavior. But sometimes, _you may want to reset a component’s state_. Consider this app that lets two players keep track of their scores during each turn:

[Link Code](https://codesandbox.io/s/interesting-platform-72wx9v?file=/App.js)

But conceptually, in this app they should be two separate counters. They might appear in the same place in the UI, but _one is a counter for Taylor, and another is a counter for Sarah_.

There are two ways to **reset state when switching between them**:

1. Render components in different positions
2. Give each component an explicit identity with key(**more generic**)

> Remember that keys are not globally unique. **They only specify the position within the parent**.

### Resetting a form with a key

Resetting state with a key is particularly useful when dealing with forms.
#### Preserving state for removed components

In a real chat app, you’d probably want to recover the input state when the user selects the previous recipient again(有时需要恢复input的输入状态). There are a few ways to keep the state “alive” for a component that’s no longer visible(有以下几种方式保持组件的**状态为仍然可见**，当组件不可见时):

- You could render all chats instead of just the current one, but **hide all the others with CSS**. The chats would not get removed from the tree, so their local state would be preserved. This solution works great for simple UIs. **But it can get very slow if the hidden trees are large and contain a lot of DOM nodes**.
- You could [lift the state up](#sharing-state-between-components) and hold the pending message for each recipient in the parent component. This way, when the child components get removed, it doesn’t matter, because it’s the parent that keeps the important information. This is the most common solution.
- You might also use a different source in addition to React state. For example, you probably want a message draft to persist even if the user accidentally closes the page. To implement this, you could have the Chat component initialize its state by reading from the `localStorage`, and save the drafts there too.

No matter which strategy you pick, a chat with Alice is conceptually distinct from a chat with Bob, so it makes sense to give a key to the `<Chat>` tree based on the current recipient.

### Recap

- React keeps state for as long as the same component is rendered at the same position.
- State is not kept in JSX tags. It’s associated with the tree position in which you put that JSX.
- You can force a subtree to reset its state by giving it a different key.
- Don’t nest component definitions, or you’ll reset state by accident.

## Extracting State Logic into a Reducer

Components with many state updates spread across many event handlers can get overwhelming. For these cases, you can consolidate all the state update logic outside your component in a single function, called a _reducer_.

### Consolidate state logic with a reducer
#### Step 1: Move from setting state to dispatching actions 

### Recap
- To convert from `useState` to `useReducer`:
    1. Dispatch actions from event handlers.
    2. Write a reducer function that returns the next state for a given state and action.
    3. Replace `useState` with `useReducer`.
- Reducers require you to write a bit more code, but they help with debugging and testing.
- Reducers must be pure.
- Each action describes a single user interaction.
- Use Immer if you want to write reducers in a mutating style.