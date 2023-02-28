# Should you add useCallback everywhere 你应当在任何时候使用 useCallback 吗?

If your app is like this site, and most interactions are coarse(粗粒度的) (like replacing a page or an entire section 如替换整个页面或者当前 section), memoization is usually unnecessary 缓存不是那么必要的. On the other hand, if your app is more like a drawing editor, and most interactions are granular (like moving shapes), then you might find memoization very helpful 如果你的 app 是绘图编辑器的话，且大多数交互是细粒度的话(如移动形状)，那么你可能非常需要缓存.

Caching a function with `useCallback` is only valuable in a few cases 比较常见的使用场景:

- You pass it as a prop to a component wrapped in [`memo`.](/reference/react/memo) You want to skip re-rendering if the value hasn't changed. Memoization lets your component re-render only when dependencies aren't the same 避免重新渲染.

- The function you're passing is later used as a dependency of some Hook 将会被作为其他 hook 依赖项的函数需要使用`useCallback`. For example, another function wrapped in `useCallback` depends on it, or you depend on this function from [`useEffect.`](/reference/react/useEffect)

There is no benefit to wrapping a function in `useCallback` in other cases. There is no significant harm to doing that either, so some teams choose to not think about individual cases, and memoize as much as possible. The downside of this approach is that code becomes less readable. Also, not all memoization is effective: a single value that's "always new" is enough to break memoization for an entire component.其余的场景下，则没有太多收益来自于`useCallback`，但也没有危害，因此一些团队一股脑的尽可能多地使用`useCallback`。这种方式的缺点在于，1. 代码可读性变得很差；2. 不是所有的缓存都是有效的。

Note that `useCallback` does not prevent _creating_ the function. You're always creating a function (and that's fine!), but React ignores it and gives you back a cached function if dependencies haven't changed.记住`useCallback`不会阻止创建函数。你可以一直创建函数，但是如果它的依赖项没有改变， React 会忽略它，返回给你一个缓存的函数。

**In practice, you can make a lot of memoization unnecessary by following a few principles:实际的场景下，参考如下原则，你可能做了很多不必要的缓存**

1. When a component visually wraps other components, let it [accept JSX as children.](/learn/passing-props-to-a-component#passing-jsx-as-children) This way, when the wrapper component updates its own state, React knows that its children don't need to re-render.
2. Prefer local state and don't [lift state up](/learn/sharing-state-between-components) any further than necessary. For example, don't keep transient state like forms and whether an item is hovered at the top of your tree or in a global state library.
3. Keep your [rendering logic pure.](/learn/keeping-components-pure) If re-rendering a component causes a problem or produces some noticeable visual artifact, it's a bug in your component! Fix the bug instead of adding memoization.
4. Avoid [unnecessary Effects that update state.](/learn/you-might-not-need-an-effect) Most performance problems in React apps are caused by chains of updates originating from Effects that cause your components to render over and over.
5. Try to [remove unnecessary dependencies from your Effects.](/learn/removing-effect-dependencies) For example, instead of memoization, it's often simpler to move some object or a function inside an Effect or outside the component.

If a specific interaction still feels laggy, [use the React Developer Tools profiler](/blog/2018/09/10/introducing-the-react-profiler.html) to see which components would benefit the most from memoization, and add memoization where needed. These principles make your components easier to debug and understand, so it's good to follow them in any case. In the long term, we're researching [doing granular memoization automatically](https://www.youtube.com/watch?v=lGEMwh32soc) to solve this once and for all.
