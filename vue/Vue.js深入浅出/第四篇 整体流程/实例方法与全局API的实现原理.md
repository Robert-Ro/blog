# 实例方法与全局API的实现原理

> 给Vue原型添加方法

* initMixin()
* stateMixin()
* eventMixin()
* lifecycleMixin()
* renderMixin()

## 数据相关的实例方法

> stateMixin()

* $set()
* $delete()
* $watch()

## 与事件相关的实例方法

> eventMixin()，发布订阅模式

`vm._events = Object.create(null)` 是一个对象，用于存储事件

* $on: 监听实例上的自定义事件
* $off: 移除自定义事件监听器
  > 通过参数长度来判断
  + 无参数：移除所有的事件监听器
    > 直接重置 `_events` 对象

  + 只提供了事件：移除该事件所有的监听器
    > `_events[event] = null`

  + 提供事件和回调：只移除这个回调的监听器
    > **从后向前**遍历，使用数组的 `splice` 方法
    > 从后向前遍历，不会影响列表中未遍历到的监听器的位置

* $once：监听实例上的自定义事件，但只执行一次
  > 执行前先 `$off`

* $emit: 触发当前实例上的事件。附加参数会传给监听器回调作为参数
  > 从 `vm._events` 中取出对应的事件监听回调函数列表，依次执行

## 生命周期相关的实例方法

> lifecycleMixin

* [`$forceUpdate()`](../../geektime/dist/vue.2.6.14.js#4131):vm实例重新渲染，只影响实例本身以及插入插槽内容的子组件，而不是所有组件
  > 只需要执行实例 `watcher` 的 `update` 方法
* [`$destroy()`](../../geektime/dist/vue.2.6.14.js#L4138)：完全销毁一个实例。大部分场景不需要销毁组件，只需要使用v-if或者v-for等治理以数据驱动的方式控制子组件的生命周期即可
  > 实例与其他实例的连接，解绑其全部指令及监听器，同时触发 `beforeDestroy` 和 `destroyed` 的钩子函数
  + 销毁与父组件的连接：$parent获取到父组件的实例，然后从父组件的实例的$children对象中spice当前实例就可
  + 销毁实例上所有的`watcher`
    - `vm._watcher`的`teardown()`方法：从所有依赖向的`Dep`列表中将自己移除
    - 清除用户使用`vm.$watch()`所创建`watcher`实例
    - `vm._watchers`存储了当前vue实例所有的`watcher`实例
    - `vm._isDestroyed = true`
    - 执行`vm.__patch__(vm._vnode, null)`更新真实DOM
    - 触发`destroyed`钩子函数, `callhook(vm ,'destroyed')`
    - 移除实例上所有的事件监听器, `vm.$off()`
* `$nextTick()`：接收一个回调函数作为参数，它的作用是将回调延迟到下次DOM更新周期之后执行。
  + 应用场景：当更新了状态(数据)后，需要对新DOM做一些操作，但这时我们其实获取不到更新后的DOM，因为数据还没有重新渲染。
  + 下次DOM更新周期时机：
    - 在Vue.js中，当状态发生了变化时，watcher会得到通知，然后触发虚拟DOM的渲染流程。而watcher触发渲染这个操作并不是同步的，而是异步的。Vue.js中有一个队列，每当需要渲染时，会将watcher推送到这个队列中，在下一次事件循环(//NOTE eventloop，避免卡顿)中再让watcher触发渲染的流。
    - 为何需要异步更新队列：
      - 使用虚拟DOM进行渲染，变化侦测的通知只发送到组件，组件内用到的所有状态的变化都会通知到同一个watcher，然后虚拟DOM会对整个组件进行比对(diff)并更改DOM。也就是说，如果同一轮事件循环内有两个数据发生了变化，那么组件的watcher会受到两份通知，从而进行两次渲染。但是事实上，并不需要渲染两次，虚拟DOM会对整个组件进行渲染，所以只需要等所有状态都修改完毕后，一次性将整个组件的DOM渲染到最新即可。
      解决方式是：将收到通知的watcher实例添加到队列中缓存起来，并且在添加到队列之前检查其中是否已经存在相同的watcher，只要不存在时，才将watcher实例添加到队列中。然后再下一次事件循环中，Vue.js才让watcher触发渲染流程并清空队列，这样才可以保证即便在同一个事件循环中有两个状态发生改变，watcher最后也只执行一次渲染流程。

* `$mount()`：
