# [deep dive] Is using an updater always preferred?

You might hear a recommendation to always write code like setAge(a => a + 1) if the state you’re setting is calculated from the previous state. There is no harm in it but it is also not always necessary.
`set(a => a + 1)`这样写没有害处, 但也不是一直有必要.

In most cases, there is no difference between these two approaches. React always makes sure that for intentional user actions, like clicks, the age state variable would be updated before the next click. This means there is no risk of a click handler seeing a “stale” age at the beginning of the event handler.
大多数场景下，这两种方式没有啥区别。一直确保用户的主动行为，如点击事件，在下一次点击之前必定更新.

However, if you do multiple updates within the same event, updaters can be helpful. They’re also helpful if accessing the state variable itself is inconvenient (you might run into this when optimizing re-renders).
但是，如果你在相同的事件中做多次更新，`updater` 的方式就更有帮助。同样地，`updater` 也同样适用于如果你不是特别方便访问状态变量的情况下。有时可以通过这种方式优化`re-renders`.

If you prefer consistency over slightly more verbose syntax, it’s reasonable to always write an updater if the state you’re setting is calculated from the previous state. If it’s calculated from the previous state of some other state variable, you might want to combine them into one object and use a reducer.
如果你偏好 `updater` 这种稍微繁琐的语法，你可以一直使用 `updater` 这种方式。如果新的状态需要基于其他的状态变量，你可能需要使用`reducer`

> if updater not use previous state, then what happens?
>
> no meaning ?
