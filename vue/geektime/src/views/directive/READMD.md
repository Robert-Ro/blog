# Directives

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
  // 5、添加filter
  Vue.filter(
    'filter-name', function (value) {
      // 逻辑...
    }
  )
}
```
## Hook Functions

A directive definition object can provide several hook functions (all optional):

- `bind`: called only once, when the directive is first bound to the element. This is where you can do one-time setup work.仅调用一次，仅当指令被绑定到元素上

- `inserted`: called when the bound element has been inserted into its parent node (this only guarantees parent node presence, not necessarily in-document).仅当绑定的元素插入到它的父节点当中时调用(仅保证父节点存在，但不一定已被插入文档中)

- `update`: called after the containing component’s `VNode` has updated, **but possibly before its children have updated**. The directive’s value may or may not have changed, but you can skip unnecessary updates by comparing the binding’s current and old values (see below on hook arguments).所在组件的 `VNode` 更新时调用，但是可能发生在其子 `VNode` 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

- `componentUpdated`: called after the containing component’s `VNode` and the `VNodes` of its children have updated.指令所在组件的 `VNode` 及其子 `VNode` 全部更新后调用

- `unbind`: called only once, when the directive is unbound from the element.只调用一次，指令与元素解绑时调用
## Resources
- [custom-directive](https://v2.vuejs.org/v2/guide/custom-directive.html)