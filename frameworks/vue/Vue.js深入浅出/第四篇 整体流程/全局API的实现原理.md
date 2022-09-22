# 全局 API 的实现原理

与实例方法不同，实例方法是挂载到原型上，全局 API 是直接挂载到 Vue 上。

## Vue.extend

使用方式：

```js
Vue.extend(options)
```

作用：创建一个子类，所以可以创建一个子类，然后让它继承 Vue 身上的一些功能，[源码实现](../../geektime/dist/vue.2.6.14.js#L5330)

- 缓存策略，基于一个递增的 id
- 原型继承的逻辑 ⭐️⭐️⭐️⭐️⭐️
  - `mergeOptions`方法合并父类选项和子类选项，并将父类保存到子类的 super 中
  - 存在 props 的话，即初始化它，将 key 代理到\_props 上。例如`vm.name`实际上可以访问到的是`Sub.prototype._props.name`
  - 存在 computed 的话，也将 computed 对象遍历一遍，并将里面的每一项都定义一遍即可，[defineComputed](../../geektime/dist/vue.2.6.14.js#L4996)
  - 复制方法到子类中：`extend`, `mixin`, `use`, `component`, `directive`, `filter`
  - 子类上新增一些属性：`superOptions`, `extendOptions`, `sealedOptions`

## Vue.nextTick

用法；`Vue.nextTick([callback, context])`

在 DOM 更新循环之后执行延迟回调方法

在 Vue 上面添加`nextTick`方法

## Vue.set

```js
Vue.set(targer, key, value)
```

避开 vue 不能检测属性被添加的限制，对象不能是 Vue.js 实例或者 Vue.js 实例的根数据对象

## Vue.delete

```js
Vue.delete(targer, key)
```

删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。

## Vue.directive

```js
Vue.directive(id, [definition])
```

注册/获取全局的指令

definition

- 存在：注册，默认监听`bind`和`update`两个事件
- 不存在：获取

## Vue.filter

```js
Vue.filter(id, [definition])
```

注册/获取全局过滤器。用于一些常见的文本格式化。

## Vue.component

```js
Vue.component(id, [definition])
```

注册/获取全局组件。注册组件时，还会自动使用给定的 id 设置组件的名称。

上述三个方法的实现非常相似，代码很多是重复的，实际上这三个方法的实现是在[一起的](../../geektime/dist/vue.2.6.14.js#L5407)

## Vue.use

```js
Vue.use(plugin) // {Object|Function}
```

安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。调用 install 方法时，会将 Vue 作为参数传入。install 方法被同一个插件多次调用时(有去重判断)，插件也只会被安装一次。

[实现](../../geektime/dist/vue.2.6.14.js#L5287)

- 需要判断传参的类型(判断是否含有`install`方法)

## Vue.mixin

全局注入一个混入(mixin)，影响注册之后创建的每个 Vue.js 实例。因为该方法会更改`Vue.options`属性, 使用[`mergeOptions`](../../geektime/dist/vue.2.6.14.js#L1574)方法

## Vue.compile

```js
Vue.compile(template)
```

编译模板字符串并返回包含渲染的对象。只在完整版中才有效。

## Vue.version

返回当前的 Vue 的版本，方便社区的插件和组件，根据不同的版本采取不同的策略。
