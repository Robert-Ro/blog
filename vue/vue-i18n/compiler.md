```vue
<template>
  <div>{{$t('hello')}}</div>
</template>
<script>
```
after compiler

```js
var render = function render() {
  var _vm = this,
    _c = _vm._self._c
  return _c("div", [_vm._v(_vm._s(_vm.$t("hello")))])
}
var staticRenderFns = []
render._withStripped = true

export { render, staticRenderFns }
```