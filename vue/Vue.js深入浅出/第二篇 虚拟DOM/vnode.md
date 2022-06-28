# vnode

> The most important parts of Virtual DOM

## what is vnode

A class, can be instantiation to different types vnode

### Constructor

[VNode types](../../2.x/types/vnode.d.ts)

[VNode Definition](../../geektime/dist/vue.2.6.14.js#L809)

```js
export default class vnode {
  constructor(
    tag,
    data,
    children,
    text,
    elm,
    context,
    componentOptions,
    asyncFactor
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    /**
     * ?
     */
    this.elm = elm;
    this.ns = undefined;
    /**
     * 根组件的组件实例(一个Vue实例)
     */
    this.context = context;
    /**
     * 函数节点上下文对应一个Vue实例
     */
    this.functionalContext = undefined;
    /**
     * 函数节点配置属性
     */
    this.functionalOptions = undefined;
    /**
     * ?
     */
    this.functionalScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    /**
     * 组件实例对应一个Vue.js
     */
    this.componentInstance = undefined;
    this.parent = undefined;
    /**
     * ?
     */
    this.raw = false;
    /**
     * 是否是静态节点
     */
    this.isStatic = false;
    /**
     * ?
     */
    this.isRootInsert = true;
    this.isComment = false;
    /**
     * 是否是克隆节点
     */
    this.isCloned = false;
    this.isOnce = false;
    /**
     * 异步组件实例化所需
     */
    this.asyncFactory = asyncFactor;
    /**
     * ?
     */
    this.asyncMeta = undefined;
    /**
     * ?
     */
    this.isAsyncPlaceholder = false;
  }

  get Child() {
    return this.componentInstance;
  }
}
```

简单的说， `vnode` 可以理解成**节点描述对象**，它描述了应该怎样去创建真实的 `DOM` 节点

## The function of vnode

## vnode types

### Comment vnode

[Comment VNode](../../geektime/dist/vue.2.6.14.js#L852)

```js
export const createEmptyVnode = (text) => {
  const node = new Vnode();
  node.text = text;
  node.isComment = true;
  return node;
};
```

### Text vnode

[Text VNode](../../geektime/dist/vue.2.6.14.js#L863)

```js
export const createTextVnode = (text) => {
  return new Vnode(undefined, undefined, undefined, String(text));
};
```

### Clone vnode

[Clone VNode](../../geektime/dist/vue.2.6.14.js#L871)

将现有的节点的属性复制到新节点中，让新创建的节点和被克隆节点的属性保持一致，从而实现克隆效果。它的作用是优化静态节点和插槽节点(slot node)。

以静态节点为例，当组件内的某个状态发生变化后，当前组件会通过虚拟 DOM 重新渲染视图，静态节点因为它的内容不会变，所以除了首次渲染需要执行渲染函数获取 vnode 之外，后续更新不需要执行渲染函数重新生成 vnode。因此，这时就会使用创建克隆节点的方法将 vnode 克隆一份，使用克隆节点进行渲染。这样就不需要重新执行渲染函数生成新的静态节点的 vnode，从而提升一定程度的性能。

```js
export const cloneVnode = (vnode, deep) => {
  const cloned = new Vnode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep && vnode.children) {
    cloned.children = cloneVnode(vnode.children);
  }
  return cloned;
};
```

### Element vnode

元素节点通常会存在以下四种有效属性

[createElement](../../geektime/dist/vue.2.6.14.js#L3455)

- tag: 节点就是一个节点的名称，如 p、ul 等；
- data：该属性包含了一些节点上的数据，比如 attrs, class, style 等
- children: 当前的子节点列表
- context: 它是当前组件的 Vue.js 实例

```js
export const elementVnode = (tag, data, children, context) => {
  return new Vnode(tag, data, children, undefined, undefined, context);
};
```

### Component vnode

组件节点和元素节点，有以下两个独有的属性。

- componentOptions: 就是组件节点的选项参数，其中包含`propsData`、`tag`和`children`等信息
- componentInstance: 就是组件的实例，也是 Vue.js 的实例。事实上，在 Vue.js 中，每个组件都有一个 Vue.js 实例

所对应的 vnode 是下面的样子：

[Component VNode](../../geektime/dist/vue.2.6.14.js#L3364)

```js
{
    componentInstance: {},
    componentOptions: {},
    context: {},
    data: {},
    tag: 'vue-component-1-child'
}
const name = Ctor.options.name || tag;
const componentVNode =  new VNode('vue-component-' + Ctor.cid + ( name ? "-"+ name : ""), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData : propsData,
    listeners: listeners,
    tag: tag,
    children: children
}, asyncFactory
)

```

### Functional vnode

函数式组件和组件节点，它有两个独有的属性 `functionalContext` 和 `functionalOptions`
[functional component](../../geektime/dist/vue.2.6.14.js#L3114)

```js
{
    funtionalContext: {},
    functionOptions: {},
    context: {},
    data: {},
    tag: 'div'
}
function createFunctionalComponent(Ctor, propsData, data, contextVm, children){

}
```

## 总结

vnode 是一个类，可以生成不同类型的 vnode 实例，而不同类型的 vnode 表示不同类型的真实 DOM 元素。

由于 Vue.js 对组件采用了虚拟 DOM 来更新视图，当属性发生了变化时，整个组件都要进行重新渲染的操作，但组件内并不是所有 DOM 节点都需要进行更新，所以将 vnode 缓存并将当前新生成的 vnode 和上一次缓存的 oldVnode 进行对比，只对需要更新的部分进行 DOM 操作可以提升很多性能。
