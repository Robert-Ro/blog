# 数据驱动

`Vue.js` 一个核心思想是数据驱动。所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作`DOM`，而是通过修改数据。

- 相比直接修改`DOM`，大大简化代码量
- 复杂交互时，只关心数据的修改会让代码的逻辑变得非常清晰，非常利于维护

## `new Vue`发生了什么

### 先判断是否是`new`调用

### 调用`src/core/instance/init.js`中的`_init`方法

> 为`Vue`原型添加`_init`方法

- 借助[`performance API`](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance)进行性能计算
- 合并配置
- 初始化生命周期
- 初始化事件中心
- 初始化渲染
- 初始化`data`, `props`, `computed`, `watcher`等

### 小结

- Vue 的初始化逻辑代码中，不同的功能逻辑拆成一些单独的函数模块，让主逻辑一目了然。

## Vue 实例挂载

`Vue` 中我们是通过 `$mount` 实例方法去挂载 `vm` 的，`$mount` 方法在多个文件中都有定义，如：

- `src/platform/web/entry-runtime-with-compiler.js`
- `src/platform/web/runtime/index.js`
- `src/platform/weex/runtime/index.js`

因为 `$mount` 这个方法的实现是和平台、构建方式都相关的。

实现代码：[`src/platform/web/entry-runtime-with-compiler.js`](../../../vue/src/platforms/web/entry-runtime-with-compiler.js#L18)

`src/core/instance/lifecycle.js`中的`mountComponent`方法作用：

- 先实例化一个渲染`Watcher`，在它的回调函数中调用`updateComponent`，在此方法中调用`vm._render`方法先生成`VNode`，最终调用`vm._update`更新 DOM

`Watcher` 在这里起到两个作用:

- 初始化的时候会执行回调函数
- 当`vm`实例中的监测的数据发生变化的时候执行回调函数

## render

`Vue` 的 `_render` 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟`Node`。它的定义在 `src/core/instance/render.js` 文件中：

`vm.$createElement`方法定义是在执行`initRender`方法的时候，可以看到除了`vm.$createElement`方法，还有一个`vm._c`方法，它是被模板编译成的`render`函数使用，而`vm.$createElement`是用户手写`render`方法使用的。

## VirtualDOM

- 创建昂贵(调用浏览器`C++`进程生成)，属性很多

`Virtual DOM`就是用一个原生的 `JS` 对象去描述一个 `DOM` 节点，所以它比创建一个`DOM` 的代价要小很多。

`Virtual DOM` 是用 `VNode` 这么一个 `Class` 去描述，它是定义在 `src/core/vdom/vnode.js`中的。

`Vue.js` 中 `Virtual DOM` 是借鉴了一个开源库 [snabbdom](https://github.com/snabbdom/snabbdom) 的实现，然后加入了一些 `Vue.js` 特色的东西。

### 总结

其实 `VNode` 是对真实 `DOM` 的一种抽象描述，它的核心定义无非就几个关键属性，**标签名**、**数据**、**子节点**、**键值**等，其它属性都是用来扩展 `VNode` 的灵活性以及实现一些特殊 `feature` 的。由于 `VNode` 只是用来映射到真实 DOM 的渲染，**不需要包含操作 DOM 的方法，因此它是非常轻量和简单的**。

`Virtual DOM` 除了它的数据结构的定义，映射到真实的 `DOM` 实际上要经历 `VNode` 的 `create`、`diff`、`patch` 等过程。那么在 `Vue.js` 中，`VNode` 的 `create` 是通过之前提到的 `createElement` 方法创建的，我们接下来分析这部分的实现。

## `createElement`

`src/core/vdom/create-element.js`:

`_createElement` 方法有 5 个参数，`context` 表示 `VNode` 的上下文环境，它是 `Component` 类型；`tag` 表示标签，它可以是一个字符串，也可以是一个 `Component`；`data` 表示 `VNode` 的数据，它是一个 `VNodeData` 类型，可以在 `flow/vnode.js` 中找到它的定义，这里先不展开说；`children` 表示当前 `VNode` 的子节点，它是任意类型的，它接下来需要被规范为标准的 `VNode` 数组；`normalizationType` 表示子节点规范的类型，类型不同规范的方法也就不一样，它主要是参考 `render` 函数是编译生成的还是用户手写的。

### `children`的规范化

由于 `Virtual DOM` 实际上是一个树状结构，每一个 `VNode` 可能会有若干个子节点，这些子节点应该也是 `VNode` 的类型。`_createElement` 接收的**第 4 个参数 `children` 是任意类型的，因此我们需要把它们规范成 `VNode` 类型**。

`src/core/vdom/helpers/normalzie-children.js`:

- `simpleNormalizeChildren`: 调用场景是 `render` 函数是编译生成的。理论上编译生成的 `children` 都已经是 `VNode` 类型的，但这里有一个例外，就是 `functional component` 函数式组件返回的是一个数组而不是一个根节点，所以会通过 `Array.prototype.concat` 方法把整个 `children` 数组打平，让它的深度只有一层。
- `normalizeChildren`: 调用场景有 2 种，
  - 一个场景是 `render` 函数是用户手写的，当 `children` 只有一个节点的时候，`Vue.js` 从接口层面允许用户把 `children` _写成基础类型用来创建单个简单的文本节点_，这种情况会调用 `createTextVNode` 创建一个文本节点的 `VNode`；
  - 另一个场景是当编译 `slot`、`v-for` 的时候会产生嵌套数组的情况，会调用 `normalizeArrayChildren` 方法：递归调用/合并连续的`text`节点

### `VNode`的创建

这里先对 `tag` 做判断，如果是 `string` 类型，则接着判断如果是内置的一些节点，则直接创建一个普通 `VNode`，如果是为**已注册的组件名**，则通过 `createComponent` 创建一个组件类型的 `VNode`，否则创建一个*未知的标签*的 `VNode`。 如果是 `tag` 一个 `Component` 类型，则直接调用 `createComponent` 创建一个组件类型的 `VNode` 节点。对于 `createComponent` 创建组件类型的 `VNode` 的过程，我们之后会去介绍，本质上它还是返回了一个 `VNode`。

### 总结

那么至此，我们大致了解了 `createElement` 创建 `VNode` 的过程，每个 `VNode` 有 `children`，`children` 每个元素也是一个 `VNode`，这样就形成了一个 `VNode Tree`，它很好的描述了我们的 `DOM Tree`。

回到 `mountComponent` 函数的过程，我们已经知道 `vm._render` 是如何创建了一个 `VNode`，接下来就是要把这个 `VNode` 渲染成一个真实的 `DOM` 并渲染出来，这个过程是通过 `vm._update` 完成的，接下来分析一下这个过程。

## update

> `src/core/instance/lifecycle.js`

Vue 的 `_update` 是实例的一个私有方法，它被调用的时机有 2 个，一个是**首次渲染**，一个是**数据更新的时候**；由于我们这一章节只分析首次渲染部分，数据更新部分会在之后分析响应式原理的时候涉及。`_update` 方法的作用是把 `VNode` 渲染成真实的 `DOM`

`_update` 的核心就是调用 `vm.__patch__` 方法，这个方法实际上在不同的平台，因此在 `web` 平台中它的定义在 `src/platforms/web/runtime/index.js` 中：

```js
Vue.prototype.__patch__ = inBrowser ? patch : noop;
```

`patch`过程：`DOM diff`

参考`Snabbdom`的算法进行改写，思路：**借助前面读源码的经验调试那个库**

一个函数柯里化的技巧，通过 `createPatchFunction` 把差异化参数提前固化，这样不用每次调用 `patch` 的时候都传递 `nodeOps` 和 `modules`

TODO 借助代码debug

### 总结
![](../../assets/image/new-vue.png)