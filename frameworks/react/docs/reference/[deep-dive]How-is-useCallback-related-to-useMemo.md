# How is useCallback related to useMemo `useCallback`与`useMemo`的关系和区别

You will often see [`useMemo`](/reference/react/useMemo) alongside `useCallback`. They are both useful when you're trying to optimize a child component. They let you [memoize](https://en.wikipedia.org/wiki/Memoization) (or, in other words, cache) something you're passing down:

```js
import { useMemo, useCallback } from 'react'

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId)

  const requirements = useMemo(() => {
    // Calls your function and caches its result
    return computeRequirements(product)
  }, [product])

  const handleSubmit = useCallback(
    (orderDetails) => {
      // Caches your function itself
      post('/product/' + productId + '/buy', {
        referrer,
        orderDetails,
      })
    },
    [productId, referrer]
  )

  return (
    <div className={theme}>
      <ShippingForm
        requirements={requirements}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
```

The difference is in _what_ they're letting you cache 它们之间的缓存区别:

- **[`useMemo`](/reference/react/useMemo) caches the _result_ of calling your function 缓存函数调用的结果.** In this example, it caches the result of calling `computeRequirements(product)` so that it doesn't change unless `product` has changed. This lets you pass the `requirements` object down without unnecessarily re-rendering `ShippingForm`. When necessary, React will call the function you've passed during rendering to calculate the result.
- **`useCallback` caches _the function itself.缓存函数本身_** Unlike `useMemo`, it does not call the function you provide. Instead, it caches the function you provided so that `handleSubmit` _itself_ doesn't change unless `productId` or `referrer` has changed. This lets you pass the `handleSubmit` function down without unnecessarily re-rendering `ShippingForm`. Your code won't be called until the user submits the form.

If you're already familiar with [`useMemo`,](/reference/react/useMemo) you might find it helpful to think of `useCallback` as this:

```js
// Simplified implementation (inside React)
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies)
}
```

[Read more about the difference between `useMemo` and `useCallback`.](/reference/react/useMemo#memoizing-a-function)
