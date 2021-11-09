# Hooks api

## 类型

### 数据类

- `useState`： 在 `fiber.memoriedState` 的对应元素中存放数据
- `useMemo`：在 `fiber.memoriedState` 的对应元素中存放数据，值是缓存的函数计算的结果，在 state 变化后重新计算值，包括组件
- `useCallback`：在 `fiber.memoriedState` 的对应元素中存放数据，值是函数，在 `state` 变化后重新执行函数，是 `useMemo` 在值为函数的场景下的简化 `api`，比如 `useCallback(fn, [a,b])` 相当于 `useMemo(() => fn, [a, b])`
- `useReducer`：在 `fiber.memoriedState` 的对应元素中存放数据，值为 `reducer` 返回的结果，可以通过 action 来触发值的变更
- `useRef`：在 `fiber.memoriedState` 的对应元素中存放数据，值为 `{current: 具体值}` 的形式，因为对象不变，只是 `current` 属性变了，所以不会修改。
- `useContext`:

### 逻辑类

> 不需要等渲染完的逻辑都可以放到`useEffect`里面

- `useEffect`：异步执行函数，当依赖 state 变化之后会再次执行，当组件销毁的时候会调用返回的清理函数
- `useLayoutEffect`： 在渲染完成后同步执行函数，可以拿到 `dom`

### ref 转发专用

- `useImperativeHandle`:

## 自变量因变量？

## 出现意义

- 跨组件逻辑复用
  - 解决 class 组件嵌套太深和组件太大的问题

## Reference

- [链接](https://juejin.cn/post/7007048306438176799)
- [hooks-reference](https://reactjs.org/docs/hooks-reference.html)
