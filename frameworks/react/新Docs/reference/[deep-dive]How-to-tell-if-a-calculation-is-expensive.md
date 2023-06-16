# How to tell if a calculation is expensive

如何分辨一个计算函数是否是耗时的

In general, unless you're creating or looping over thousands of objects, it's probably not expensive. If you want to get more confidence, you can add a console log to measure the time spent in a piece of code:
一般情况下，除非你创建或循环超过 1 千个对象，大概率这个函数不算太耗时。如果你还想自信些，你可以添加一个`console.time`函数来统计耗时信息

```js
console.time('filter array')
const visibleTodos = filterTodos(todos, tab)
console.timeEnd('filter array')
```

Perform the interaction you're measuring (for example, typing into the input). You will then see logs like `filter array: 0.15ms` in your console. If the overall logged time adds up to a significant amount (say, `1ms` or more), it might make sense to memoize that calculation 如果函数的计算耗时超过 1ms，则你需要缓存这个函数. As an experiment, you can then wrap the calculation in `useMemo` to verify whether the total logged time has decreased for that interaction or not:

```js
console.time('filter array')
const visibleTodos = useMemo(() => {
  return filterTodos(todos, tab) // Skipped if todos and tab haven't changed
}, [todos, tab])
console.timeEnd('filter array')
```

`useMemo` won't make the _first_ render faster. It only helps you skip unnecessary work on updates.

Keep in mind that your machine is probably faster than your users' so it's a good idea to test the performance with an artificial slowdown. For example, Chrome offers a [CPU Throttling](https://developer.chrome.com/blog/new-in-devtools-61/#throttling) option for this.
记住你的机器可能优于用户的机器，因此最好的调试方式是降低 cpu 性能。
Also note that measuring performance in development will not give you the most accurate results. (For example, when [Strict Mode](/reference/react/StrictMode) is on, you will see each component render twice rather than once.) To get the most accurate timings, build your app for production and test it on a device like your users have.同时，需要记住的是，开发下的性能测试不是正确的结果(因为`Strict Mode`的缘由)，为了获得更准确的耗时结果，在类似用户机器性能的电脑测试生产模式下的代码
