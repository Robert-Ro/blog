## 一些破碎的、暂时的想法

- react hooks 的位置会影响代码的执行，哪个 hooks 在前，哪个 hook 在后，对代码的逻辑影响很大

- useEffect：
  - render 之后执行的
  - 捕获最出的 props 和 state
- useState：需要在页面上显示的属性才设置为 state；状态不会被重置在多次 render 之后，这意味着在 react 中有**某些机制(?)**保持住最新的状态


