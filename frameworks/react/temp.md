## 一些破碎的、暂时的想法

- react hooks 的位置会影响代码的执行，哪个 hooks 在前，哪个 hook 在后，对代码的逻辑影响很大

- useEffect：
  - render 之后执行的
  - 捕获最出的 props 和 state
  - 与渲染过程无关
- useState：需要在页面上显示的属性才设置为 state；状态不会被重置在多次 render 之后，这意味着在 react 中有**某些机制(?)**保持住最新的状态

- 在组件中使用的hooks的执行过程
- 自定义hooks的执行过程

### life-cycles
- `Mounting`（挂载）阶段：在这个阶段，组件首次被渲染到DOM。在函数组件中，`useState` 和 `useEffect` 等Hooks可以在这个阶段被执行。相当于类组件的`componentDidMount`阶段。
- `Re-rendering`（重新渲染）阶段：在这个阶段，组件发生重新渲染，可能是由于组件的状态或属性发生了变化。每次重新渲染时，Hooks都会重新执行，以更新状态、执行副作用等。
- `Unmounting`（卸载）阶段：在这个阶段，组件将被从DOM中卸载，不再显示在界面上。类似于类组件的`componentWillUnmount`阶段。

### custom hooks
- 组件中的内置hooks可类比枝干与叶子
- 组件中的自定义hooks可类比与带内置hooks(叶子)的分枝

### memo/useMemo
react本身很快，不急着优化，待出现性能问题再去优化
