# 全局API的实现原理
与实例方法不同，实例方法是挂载到原型上，全局API是直接挂载到Vue上。
## Vue.extend

使用方式：
```js
Vue.extend(options)
```

作用：创建一个子类，所以可以创建一个子类，然后让它继承Vue身上的一些功能，[源码实现](../../geektime/dist/vue.2.6.14.js#L5330)
- 缓存策略，基于一个递增的id
- 原型继承的逻辑⭐️⭐️⭐️⭐️⭐️
  - `mergeOptions`方法合并父类选项和子类选项，并将父类保存到子类的super中
  - 存在props的话，即初始化它，将key代理到_props上。例如`vm.name`实际上可以访问到的是`Sub.prototype._props.name`
  - 存在computed的话，也将computed对象遍历一遍，并将里面的每一项都定义一遍即可，[defineComputed](../../geektime/dist/vue.2.6.14.js#L4996)
  - 复制方法到子类中：`extend`, `mixin`, `use`, `component`, `directive`, `filter`
  - 子类上新增一些属性：`superOptions`, `extendOptions`, `sealedOptions`

## Vue.nextTick
用法；`Vue.nextTick([callback, context])`

在DOM更新循环之后执行延迟回调方法

在Vue上面添加`nextTick`方法

## Vue.set
```js
Vue.set(targer, key, value)
```
避开vue不能检测属性被添加的限制，对象不能是Vue.js实例或者Vue.js实例的根数据对象

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
注册/获取全局组件。注册组件时，还会自动使用给定的id设置组件的名称。

上述三个方法的实现非常相似，代码很多是重复的，实际上这三个方法的实现是在[一起的](../../geektime/dist/vue.2.6.14.js#L5407)

## Vue.use
```js
Vue.use(plugin) // {Object|Function}
```

安装Vue.js插件。如果插件是一个对象，必须提供install方法。如果插件是一个函数，它会被作为install方法。调用install方法时，会将Vue作为参数传入。install方法被同一个插件多次调用时(有去重判断)，插件也只会被安装一次。

[实现](../../geektime/dist/vue.2.6.14.js#L5287)

- 需要判断传参的类型(判断是否含有`install`方法)

## Vue.mixin

全局注入一个混入(mixin)，影响注册之后创建的每个Vue.js实例。因为该方法会更改`Vue.options`属性, 使用[`mergeOptions`](../../geektime/dist/vue.2.6.14.js#L1574)方法

## Vue.compile
```js
Vue.compile(template)
```

编译模板字符串并返回包含渲染的对象。只在完整版中才有效。

## Vue.version
返回当前的Vue的版本，方便社区的插件和组件，根据不同的版本采取不同的策略。