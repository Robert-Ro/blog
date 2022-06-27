# vnode

> The most important parts of Virtual DOM

## what is vnode

A class, can be instantiation to different types vnode

### Constructor

```js
export default class vnode {
    constructor(tag, data, children, text, elm, context, componentOptions, asyncFactor) {
        this.tag = tag
        this.data = data
        this.children = children
        this.text = text
        /**
         * ?
         */
        this.elm = elm
        this.ns = undefined
        /**
         * ?
         */
        this.context = context
        /**
         * ?
         */
        this.functionalContext = undefined
        /**
         * ?
         */
        this.functionalOptions = undefined
        /**
         * ?
         */
        this.functionalScopeId = undefined
        this.key = data && data.key
        this.componentOptions = componentOptions
        /**
         * ?
         */
        this.componentInstance = undefined
        this.parent = undefined
        /**
         * ?
         */
        this.raw = false
        /**
         * ?
         */
        this.isStatic = false
        /**
         * ?
         */
        this.isRootInsert = true
        this.isComment = false
        /**
         * ?
         */
        this.isCloned = false
        this.isOnce = false
        /**
         * ?
         */
        this.asyncFactory = asyncFactor
        /**
         * ?
         */
        this.asyncMeta = undefined
        /**
         * ?
         */
        this.isAsyncPlaceholder = false
    }

    get Child() {
        return this.componentInstance
    }
}
```

简单的说， `vnode` 可以理解成**节点描述对象**，它描述了应该怎样去创建真实的 `DOM` 节点

## The function of vnode

## vnode types

### Comment vnode

```js
export const createEmptyVnode = text => {
    const node = new Vnode()
    node.text = text
    node.isComment = true
    return node
}
```

### Text vnode

```js
export const createTextVnode = text => {
    return new Vnode(undefined, undefined, undefined, String(text))
}
```

### Clone vnode

将现有的节点的属性复制到新节点中，让新创建的节点和被克隆节点的属性保持一致，从而实现克隆效果。它的作用是优化静态节点和插槽节点(slot node)。

以静态节点为例，当组件内的某个状态发生变化后，当前组件会通过虚拟DOM重新渲染视图，静态节点因为它的内容不会变，所以除了首次渲染需要执行渲染函数获取vnode之外，后续更新不需要执行渲染函数重新生成vnode。因此，这时就会使用创建克隆节点的方法将vnode克隆一份，使用克隆节点进行渲染。这样就不需要重新执行渲染函数生成新的静态节点的vnode，从而提升一定程度的性能。

```js
export const cloneVnode = (vnode, deep) => {
    const cloned = new Vnode(vnode.tag, vnode.data, vnode.children, vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory)
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key
    cloned.isComment = vnode.isComment
    cloned.isCloned = true
    if (deep && vnode.children) {
        cloned.children = cloneVnode(vnode.children)
    }
    return cloned
}
```

### Element vnode

元素节点通常会存在以下四种有效属性
* tag: 节点就是一个节点的名称，如p、ul等；
* data：该属性包含了一些节点上的数据，比如attrs, class, style等
* children: 当前的子节点列表
* context: 它是当前组件的Vue.js实例

```js
export const elementVnode = (tag, data, children, context) => {
    return new Vnode(tag, data, children, context)
}
```

### Component vnode

组件节点和元素节点，有以下两个独有的属性。
* componentOptions: 就是组件节点的选项参数，其中包含`propsData`、`tag`和`children`等信息
* componentInstance: 就是组件的实例，也是Vue.js的实例。事实上，在Vue.js中，每个组件都有一个Vue.js实例

所对应的vnode是下面的样子：

```js
{
    componentInstance: {},
    componentOptions: {},
    context: {},
    data: {},
    tag: 'vue-component-1-child'
}
```

### Functional vnode

函数式组件和组件节点，它有两个独有的属性 `functionalContext` 和 `functionalOptions`

```js
{
    funtionalContext: {},
    functionOptions: {},
    context: {},
    data: {},
    tag: 'div'
}
```

## 总结

vnode是一个类，可以生成不同类型的vnode实例，而不同类型的vnode表示不同类型的真实DOM元素。

由于Vue.js对组件采用了虚拟DOM来更新视图，当属性发生了变化时，整个组件都要进行重新渲染的操作，但组件内并不是所有DOM节点都需要进行更新，所以将vnode缓存并将当前新生成的vnode和上一次缓存的oldVnode进行对比，只对需要更新的部分进行DOM操作可以提升很多性能。
