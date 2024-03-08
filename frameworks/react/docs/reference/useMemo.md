# useMemo

`useMemo` is a React Hook that lets you cache the result of a calculation between re-renders.
在重新渲染之间缓存计算结果

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

## Reference

### `useMemo(calculateValue, dependencies)`

Call `useMemo` at the top level of your component to cache a calculation between re-renders:

```js
import { useMemo } from 'react'

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
  // ...
}
```

#### Parameters

- `calculateValue`: The function calculating the value that you want to cache. It should be pure, should take no arguments, and should return a value of any type. React will call your function during the initial render. On subsequent renders, React will return the same value again if the `dependencies` have not changed since the last render. Otherwise, it will call `calculateValue`, return its result, and store it in case it can be reused later.
  这个函数用于计算想要缓存的值。这个函数应该是纯函数，不接受任务参数，应该返回一个任何类型的值。React 会在第一次渲染时调用这个函数。在随后的渲染中，React 将会返回相同的值，如果这个依赖项自上一次渲染没有改变的话。否则，这个函数会重新调用，调用结果会被缓存。

- `dependencies`: The list of all reactive values referenced inside of the `calculateValue` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](/learn/editor-setup#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison algorithm.
  依赖项：同`useCallback`里面的依赖项

#### Returns

On the initial render, `useMemo` returns the result of calling `calculateValue` with no arguments.

During subsequent renders, it will either return an already stored value from the last render (if the dependencies haven't changed), or call `calculateValue` again, and return the result that `calculateValue` has returned.
返回调用函数的结果

#### Caveats

- `useMemo` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can't call it inside loops or conditions. If you need that, extract a new component and move the state into it.`UseMemo`是一个`Hook`,因此只能在组件顶层中使用，如果你想在循环或条件中使用，你需要提取一个新的组件，然后把这个`hook`移动到组件里面
- In Strict Mode, React will **call your calculation function twice** in order to [help you find accidental impurities.](#my-calculation-runs-twice-on-every-re-render) This is development-only behavior and does not affect production. If your calculation function is pure (as it should be), this should not affect the logic of your component. The result from one of the calls will be ignored.在`Strict Mode`下，React 会调用两次 memo 函数，来检测函数是否有副作用(这种行为只会影响开发环境)。如果计算函数是纯函数，则不会影响组件的逻辑。
- React **will not throw away the cached value unless there is a specific reason to do that.** For example, in development, React throws away the cache when you edit the file of your component. Both in development and in production, React will throw away the cache if your component suspends during the initial mount. In the future, React may add more features that take advantage of throwing away the cache--for example, if React adds built-in support for virtualized lists in the future, it would make sense to throw away the cache for items that scroll out of the virtualized table viewport. This should match your expectations if you rely on `useMemo` solely as a performance optimization. Otherwise, a [state variable](/reference/react/useState#avoiding-recreating-the-initial-state) or a [ref](/reference/react/useRef#avoiding-recreating-the-ref-contents) may be more appropriate.除非有特定的原因，否则 React 不会丢弃缓存值。例如，在开发中，当您编辑组件文件时，React 会丢弃缓存。在开发和生产中，如果您的组件在初始挂载期间暂停，则 React 将丢弃缓存。未来，React 可能会添加更多利用抛弃缓存的功能——例如，如果 React 在未来内置支持虚拟列表，则对于滚动出虚拟表视口的项目抛弃缓存是有意义的。如果您仅依赖 useMemo 作为性能优化，则应该符合您的预期。否则，状态变量或 ref 可能更合适。

Caching return values like this is also known as [_memoization_,](https://en.wikipedia.org/wiki/Memoization) which is why this Hook is called `useMemo`.
缓存结果可以被认为是`_memoization_`，这就是这个`Hook`为什么叫做`useMemo`

## Usage 使用场景

### Skipping expensive recalculations 忽略耗时的重新计算

To cache a calculation between re-renders, wrap it in a `useMemo` call at the top level of your component:

```js
import { useMemo } from 'react'

function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
  // ...
}
```

You need to pass two things to `useMemo`:

1. A `calculation function` that takes no arguments, like `() =>`, and returns what you wanted to calculate.
2. A `list of dependencies` including every value within your component that's used inside your calculation.

On the initial render, the `value` you'll get from `useMemo` will be the result of calling your `calculation`.

On every subsequent render, React will compare the `dependencies` with the dependencies you passed during the last render. If none of the dependencies have changed (compared with [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)), `useMemo` will return the value you already calculated before. Otherwise, React will re-run your calculation and return the new value.

In other words, `useMemo` caches a calculation result between re-renders until its dependencies change.

**Let's walk through an example to see when this is useful.**

By default, React will re-run the entire body of your component every time that it re-renders. For example, if this `TodoList` updates its state or receives new props from its parent, the `filterTodos` function will re-run:

```js
function TodoList({ todos, tab, theme }) {
  const visibleTodos = filterTodos(todos, tab)
  // ...
}
```

Usually, this isn't a problem because most calculations are very fast. However, if you're filtering or transforming a large array, or doing some expensive computation, you might want to skip doing it again if data hasn't changed. If both `todos` and `tab` are the same as they were during the last render, wrapping the calculation in `useMemo` like earlier lets you reuse `visibleTodos` you've already calculated before. This type of caching is called _[memoization.](https://en.wikipedia.org/wiki/Memoization)_

**You should only rely on `useMemo` as a performance optimization.** If your code doesn't work without it, find the underlying problem and fix it first. Then you may add `useMemo` to improve performance.

#### DeepDive

[How to tell if a calculation is expensive?](./%5Bdeep%20dive%5DHow%20to%20tell%20if%20a%20calculation%20is%20expensive.md)

[Should you add useMemo everywhere?](./%5Bdeep%20dive%5DShould%20you%20add%20useMemo%20everywhere%3F.md)

#### Skipping recalculation with `useMemo`

#### Always recalculating a value

### Skipping re-rendering of components 跳过组件的重新渲染

In some cases, `useMemo` can also help you optimize performance of re-rendering child components. To illustrate this, let's say this `TodoList` component passes the `visibleTodos` as a prop to the child `List` component:
在一些情况下，`useMemo`可以帮助你优化子组件重新渲染的性能问题。

```js
export default function TodoList({ todos, tab, theme }) {
  // ...
  return (
    <div className={theme}>
      <List items={visibleTodos} />
    </div>
  )
}
```

You've noticed that toggling the `theme` prop freezes the app for a moment, but if you remove `<List />` from your JSX, it feels fast. This tells you that it's worth trying to optimize the `List` component.

**By default, when a component re-renders, React re-renders all of its children recursively.** This is why, when `TodoList` re-renders with a different `theme`, the `List` component _also_ re-renders. This is fine for components that don't require much calculation to re-render. But if you've verified that a re-render is slow, you can tell `List` to skip re-rendering when its props are the same as on last render by wrapping it in [`memo`:](/reference/react/memo)

```js
import { memo } from 'react'

const List = memo(function List({ items }) {
  // ...
})
```

**With this change, `List` will skip re-rendering if all of its props are the _same_ as on the last render.** This is where caching the calculation becomes important! Imagine that you calculated `visibleTodos` without `useMemo`:

```js
export default function TodoList({ todos, tab, theme }) {
  // Every time the theme changes, this will be a different array...
  const visibleTodos = filterTodos(todos, tab)
  return (
    <div className={theme}>
      {/* ... so List's props will never be the same, and it will re-render every time */}
      <List items={visibleTodos} />
    </div>
  )
}
```

**In the above example, the `filterTodos` function always creates a _different_ array,** similar to how the `{}` object literal always creates a new object. Normally, this wouldn't be a problem, but it means that `List` props will never be the same, and your [`memo`](/reference/react/memo) optimization won't work. This is where `useMemo` comes in handy:

```js
export default function TodoList({ todos, tab, theme }) {
  // Tell React to cache your calculation between re-renders...
  const visibleTodos = useMemo(
    () => filterTodos(todos, tab),
    [todos, tab] // ...so as long as these dependencies don't change...
  )
  return (
    <div className={theme}>
      {/* ...List will receive the same props and can skip re-rendering */}
      <List items={visibleTodos} />
    </div>
  )
}
```

**By wrapping the `visibleTodos` calculation in `useMemo`, you ensure that it has the _same_ value between the re-renders** (until dependencies change). You don't _have to_ wrap a calculation in `useMemo` unless you do it for some specific reason. In this example, the reason is that you pass it to a component wrapped in [`memo`,](/reference/react/memo) and this lets it skip re-rendering. There are a few other reasons to add `useMemo` which are described further on this page.

#### [Memoizing individual JSX nodes](./%5Bdeep%20dive%5DMemoizing%20individual%20JSX%20nodes.md)

#### Skipping re-rendering with `useMemo` and `memo`

In this example, the `List` component is **artificially slowed down** so that you can see what happens when a React component you're rendering is genuinely slow. Try switching the tabs and toggling the theme.

Switching the tabs feels slow because it forces the slowed down `List` to re-render. That's expected because the `tab` has changed, and so you need to reflect the user's new choice on the screen.

Next, try toggling the theme. **Thanks to `useMemo` together with [`memo`](/reference/react/memo), it’s fast despite the artificial slowdown!** The `List` skipped re-rendering because the `visibleItems` array has not changed since the last render. The `visibleItems` array has not changed because both `todos` and `tab` (which you pass as dependencies to `useMemo`) haven't changed since the last render.

#### Always re-rendering a component

In this example, the `List` implementation is also **artificially slowed down** so that you can see what happens when some React component you're rendering is genuinely slow. Try switching the tabs and toggling the theme.

Unlike in the previous example, toggling the theme is also slow now! This is because **there is no `useMemo` call in this version,** so the `visibleTodos` is always a different array, and the slowed down `List` component can't skip re-rendering.

However, here is the same code **with the artificial slowdown removed.** Does the lack of `useMemo` feel noticeable or not?

Quite often, code without memoization works fine. If your interactions are fast enough, you don't need memoization.

Keep in mind that you need to run React in production mode, disable [React Developer Tools](/learn/react-developer-tools), and use devices similar to the ones your app's users have in order to get a realistic sense of what's actually slowing down your app.

### Memoizing a dependency of another Hook

Suppose you have a calculation that depends on an object created directly in the component body:

```js
function Dropdown({ allItems, text }) {
  const searchOptions = { matchMode: 'whole-word', text }

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions)
  }, [allItems, searchOptions]) // 🚩 Caution: Dependency on an object created in the component body
  // ...
}
```

Depending on an object like this defeats the point of memoization. When a component re-renders, all of the code directly inside the component body runs again. **The lines of code creating the `searchOptions` object will also run on every re-render.** Since `searchOptions` is a dependency of your `useMemo` call, and it's different every time, React will know the dependencies are different from the last time, and recalculate `searchItems` every time.

To fix this, you could memoize the `searchOptions` object _itself_ before passing it as a dependency:

```js
function Dropdown({ allItems, text }) {
  const searchOptions = useMemo(() => {
    return { matchMode: 'whole-word', text };
  }, [text]); // ✅ Only changes when text changes

  const visibleItems = useMemo(() => {
    return searchItems(allItems, searchOptions);
  }, [allItems, searchOptions]); // ✅ Only changes when allItems or searchOptions changes
  // ...
```

In the example above, if the `text` did not change, the `searchOptions` object also won't change. However, an even better fix is to move the `searchOptions` object declaration _inside_ of the `useMemo` calculation function:

```js
function Dropdown({ allItems, text }) {
  const visibleItems = useMemo(() => {
    const searchOptions = { matchMode: 'whole-word', text };
    return searchItems(allItems, searchOptions);
  }, [allItems, text]); // ✅ Only changes when allItems or text changes
  // ...
```

**Now your calculation depends on `text` directly (which is a string and can't "accidentally" be new like an object).**
You can use a similar approach to prevent [`useEffect`](/reference/react/useEffect) from firing again unnecessarily. Before you try to optimize dependencies with `useMemo`, see if you can make them unnecessary. [Read about removing Effect dependencies.](/learn/removing-effect-dependencies)

### Memoizing a function

Suppose the `Form` component is wrapped in [`memo`.](/reference/react/memo) You want to pass a function to it as a prop:

```js
export default function ProductPage({ productId, referrer }) {
  function handleSubmit(orderDetails) {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    })
  }

  return <Form onSubmit={handleSubmit} />
}
```

Similar to how `{}` always creates a different object, function declarations like `function() {}` and expressions like `() => {}` produce a _different_ function on every re-render. By itself, creating a new function is not a problem. This is not something to avoid! However, if the `Form` component is memoized, presumably you want to skip re-rendering it when no props have changed. A prop that is _always_ different would defeat the point of memoization.

To memoize a function with `useMemo`, your calculation function would have to return another function:

```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useMemo(() => {
    return (orderDetails) => {
      post('/product/' + product.id + '/buy', {
        referrer,
        orderDetails,
      })
    }
  }, [productId, referrer])

  return <Form onSubmit={handleSubmit} />
}
```

This looks clunky! **Memoizing functions is common enough that React has a built-in Hook specifically for that. Wrap your functions into [`useCallback`](/reference/react/useCallback) instead of `useMemo`** to avoid having to write an extra nested function:

```js
export default function Page({ productId, referrer }) {
  const handleSubmit = useCallback(
    (orderDetails) => {
      post('/product/' + product.id + '/buy', {
        referrer,
        orderDetails,
      })
    },
    [productId, referrer]
  )

  return <Form onSubmit={handleSubmit} />
}
```

The two examples above are completely equivalent. The only benefit to `useCallback` is that it lets you avoid writing an extra nested function inside. It doesn't do anything else. [Read more about `useCallback`.](/reference/react/useCallback)

## Troubleshooting

### My calculation runs twice on every re-render 为何我的计算函数每次渲染都执行两次

In [Strict Mode](/reference/react/StrictMode), React will call some of your functions twice instead of once:
`Strict Mode`模式下会调用两次

```js
function TodoList({ todos, tab }) {
  // This component function will run twice for every render.

  const visibleTodos = useMemo(() => {
    // This calculation will run twice if any of the dependencies change.
    return filterTodos(todos, tab)
  }, [todos, tab])

  // ...
}
```

This is expected and shouldn't break your code.

This **development-only** behavior helps you [keep components pure.](/learn/keeping-components-pure) React uses the result of one of the calls, and ignores the result of the other call. As long as your component and calculation functions are pure, this shouldn't affect your logic. However, if they are accidentally impure, this helps you notice the mistakes and fix it.

For example, this impure calculation function mutates an array you received as a prop:

```js
const visibleTodos = useMemo(() => {
  // 🚩 Mistake: mutating a prop 改变了属性
  todos.push({ id: 'last', text: 'Go for a walk!' })
  const filtered = filterTodos(todos, tab)
  return filtered
}, [todos, tab])
```

Because React calls your calculation twice, you'll see the todo was added twice, so you'll know that there is a mistake. Your calculation can't change the objects that it received, but it can change any _new_ objects you created during the calculation. For example, if `filterTodos` always returns a _different_ array, you can mutate _that_ array:

```js
const visibleTodos = useMemo(() => {
  const filtered = filterTodos(todos, tab)
  // ✅ Correct: mutating an object you created during the calculation
  filtered.push({ id: 'last', text: 'Go for a walk!' })
  return filtered
}, [todos, tab])
```

Read [keeping components pure](/learn/keeping-components-pure) to learn more about purity.

Also, check out the guides on [updating objects](/learn/updating-objects-in-state) and [updating arrays](/learn/updating-arrays-in-state) without mutation.

---

### My `useMemo` call is supposed to return an object, but returns undefined

This code doesn't work:

```js
  // 🔴 You can't return an object from an arrow function with () => {
  const searchOptions = useMemo(() => {
    matchMode: 'whole-word',
    text: text
  }, [text]);
```

In JavaScript, `() => {` starts the arrow function body, so the `{` brace is not a part of your object. This is why it doesn't return an object, and leads to confusing mistakes. You could fix it by adding parentheses like `({` and `})`:

```js
// This works, but is easy for someone to break again
const searchOptions = useMemo(
  () => ({
    matchMode: 'whole-word',
    text: text,
  }),
  [text]
)
```

However, this is still confusing and too easy for someone to break by removing the parentheses.

To avoid this mistake, write a `return` statement explicitly:

```js
// ✅ This works and is explicit
const searchOptions = useMemo(() => {
  return {
    matchMode: 'whole-word',
    text: text,
  }
}, [text])
```

### Every time my component renders, the calculation in `useMemo` re-runs 每次组件渲染时，`useMemo`的计算函数都会执行

Make sure you've specified the dependency array as a second argument!

If you forget the dependency array, `useMemo` will re-run the calculation every time:
如果忘记传入`dependency array`, `useMEemo`将会在每次重新渲染时重新调用计算函数

```js
function TodoList({ todos, tab }) {
  // 🔴 Recalculates every time: no dependency array
  const visibleTodos = useMemo(() => filterTodos(todos, tab));
  // ...
```

This is the corrected version passing the dependency array as a second argument:

```js
function TodoList({ todos, tab }) {
  // ✅ Does not recalculate unnecessarily
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
```

If this doesn't help, then the problem is that at least one of your dependencies is different from the previous render. You can debug this problem by manually logging your dependencies to the console:
如果添加了`dependency array`还不起作用，问题就可能在于这个`dependencies`自上一次`render`后变化了

```js
const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
console.log([todos, tab])
```

You can then right-click on the arrays from different re-renders in the console and select "Store as a global variable" for both of them. Assuming the first one got saved as `temp1` and the second one got saved as `temp2`, you can then use the browser console to check whether each dependency in both arrays is the same: 将第一次的`dependencies array`console 出来，然后右键存储为全局变量`temp1`,然后将第二次的`dependencies array`console 出来, 再次存储为`temp2`, 再调用`Object.is`来对比两次的值，挨个索引来对比，由此来找出不同所在。

```js
Object.is(temp1[0], temp2[0]) // Is the first dependency the same between the arrays?
Object.is(temp1[1], temp2[1]) // Is the second dependency the same between the arrays?
Object.is(temp1[2], temp2[2]) // ... and so on for every dependency ...
```

When you find which dependency is breaking memoization, either find a way to remove it, or [memoize it as well.](#memoizing-a-dependency-of-another-hook)

### I need to call `useMemo` for each list item in a loop, but it's not allowed 希望在列表中使用`useMemo`,但是不允许

> 与`useCallback`一样提取组件

Suppose the `Chart` component is wrapped in [`memo`](/reference/react/memo). You want to skip re-rendering every `Chart` in the list when the `ReportList` component re-renders. However, you can't call `useMemo` in a loop:

```js
function ReportList({ items }) {
  return (
    <article>
      {items.map((item) => {
        // 🔴 You can't call useMemo in a loop like this:
        const data = useMemo(() => calculateReport(item), [item])
        return (
          <figure key={item.id}>
            <Chart data={data} />
          </figure>
        )
      })}
    </article>
  )
}
```

Instead, extract a component for each item and memoize data for individual items:

```js
function ReportList({ items }) {
  return (
    <article>
      {items.map((item) => (
        <Report
          key={item.id}
          item={item}
        />
      ))}
    </article>
  )
}

function Report({ item }) {
  // ✅ Call useMemo at the top level:
  const data = useMemo(() => calculateReport(item), [item])
  return (
    <figure>
      <Chart data={data} />
    </figure>
  )
}
```

Alternatively, you could remove `useMemo` and instead wrap `Report` itself in [`memo`.](/reference/react/memo) If the `item` prop does not change, `Report` will skip re-rendering, so `Chart` will skip re-rendering too:
或者使用`memo`来包裹组件

```js
function ReportList({ items }) {
  // ...
}

const Report = memo(function Report({ item }) {
  const data = calculateReport(item)
  return (
    <figure>
      <Chart data={data} />
    </figure>
  )
})
```
