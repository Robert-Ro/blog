# vnode
> The most important parts of Virtual DOM
## what is vnode
A class, can be instantiation to different types vnode
### Constructor
```js
export default class vnode{
  constructor(tag, data, children, text, elm, context, componentOptions, asyncFactor){
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

  get Child(){
    return this.componentInstance
  }
}
```
简单的说，`vnode`可以理解成**节点描述对象**，它描述了应该怎样去创建真实的`DOM`节点
## The function of vnode

## vnode types
### Comment vnode
### Text vnode
### Clone vnode
### Element vnode
### Component vnode
### Functional vnode