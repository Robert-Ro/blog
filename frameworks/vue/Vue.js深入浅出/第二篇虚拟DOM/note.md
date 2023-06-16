## Function

render -> get vnode
patch -> get el

## render-related abbr

```js
var _vm = this
let _h = _vm.$createElement,
  _c = _vm._self._c || _h,
  _l = renderList,
  _v = createTextVNode,
  _s = toString
```

[`installRenderHelpers`](../../geektime/dist/vue.2.6.14.js#L3022)

```js
function installRenderHelpers(target) {
  target._o = markOnce
  target._n = toNumber
  target._s = toString //
  target._l = renderList //
  target._t = renderSlot
  target._q = looseEqual
  target._i = looseIndexOf
  target._m = renderStatic
  target._f = resolveFilter
  target._k = checkKeyCodes
  target._b = bindObjectProps
  target._v = createTextVNode //
  target._e = createEmptyVNode //
  target._u = resolveScopedSlots
  target._g = bindObjectListeners
  target._d = bindDynamicKeys
  target._p = prependModifier
}
```

- scopeId 生成实现(css-loader)

```js
const nodeOps = {
  appendChild: ƒ appendChild(node, child)
  createComment: ƒ createComment(text)
  createElement: ƒ createElement$1(tagName, vnode)
  createElementNS: ƒ createElementNS(namespace, tagName)
  createTextNode: ƒ createTextNode(text)
  insertBefore: ƒ insertBefore(parentNode, newNode, referenceNode)
  nextSibling: ƒ nextSibling(node)
  parentNode: ƒ parentNode(node)
  removeChild: ƒ removeChild(node, child)
  setStyleScope: ƒ setStyleScope(node, scopeId)
  setTextContent: ƒ setTextContent(node, text)
  tagName: ƒ tagName(node)
}
```

```js
// cbs.update
[
  0: ƒ updateAttrs(oldVnode, vnode)
  1: ƒ updateClass(oldVnode, vnode)
  2: ƒ updateDOMListeners(oldVnode, vnode)
  3: ƒ updateDOMProps(oldVnode, vnode)
  4: ƒ updateStyle(oldVnode, vnode)
  5: ƒ update(oldVnode, vnode)
  6: ƒ updateDirectives(oldVnode, vnode)
]
```

```js
patchVnode(): void //作用: 更新VNode属性(含el)
updateChildren(): void //创建、移除、移动VNode
```
