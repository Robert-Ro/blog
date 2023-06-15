# Memoizing individual JSX nodes
缓存`JSX`节点

Instead of wrapping `List` in [`memo`](/reference/react/memo), you could wrap the `<List />` JSX node itself in `useMemo`:

```js
export default function TodoList({ todos, tab, theme }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab])
  const children = useMemo(() => <List items={visibleTodos} />, [visibleTodos])
  return <div className={theme}>{children}</div>
}
```

The behavior would be the same. If the `visibleTodos` haven't changed, `List` won't be re-rendered.

A JSX node like `<List items={visibleTodos} />` is an object like `{ type: List, props: { items: visibleTodos } }`. Creating this object is very cheap, but React doesn't know whether its contents is the same as last time or not. This is why by default, React will re-render the `List` component.

However, if React sees the same exact JSX as during the previous render, it won't try to re-render your component. This is because JSX nodes are [immutable.](https://en.wikipedia.org/wiki/Immutable_object) A JSX node object could not have changed over time, so React knows it's safe to skip a re-render. However, for this to work, the node has to _actually be the same object_, not merely look the same in code. This is what `useMemo` does in this example.

Manually wrapping JSX nodes into `useMemo` is not convenient. For example, you can't do this conditionally. This is usually why you would wrap components with [`memo`](/reference/react/memo) instead of wrapping JSX nodes.
