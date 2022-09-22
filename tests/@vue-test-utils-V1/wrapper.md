# Wrapper

A `Wrapper` is an object that contains **a mounted component** or **vnode** and **methods** to _test the component or vnode_.

## Properties

### vm ⭐⭐⭐⭐⭐

`Component` (read-only): This is the `Vue` instance. You can access all the [instance methods and properties of a vm](https://vuejs.org/v2/api/#Instance-Properties) with `wrapper.vm`. This only exists on Vue component wrapper or HTMLElement binding Vue component wrapper.

### element

`HTMLElement` (read-only): the root DOM node of the wrapper

### options

`options.attachedToDocument`

`Boolean` (read-only): `true` if component is [attached to document](https://v1.test-utils.vuejs.org/api/options.html) when rendered

### selector

`Selector`: the selector that was used by `find()` or `findAll()` to create this wrapper

## Methods

### attributes ⭐⭐⭐⭐

Returns Wrapper DOM node attribute object. If key is provided, the value for the key will be returned. 返回 Wrapper DOM 节点的属性对象，如果传了 key，则直接返回对应的属性值

### classes ⭐⭐⭐⭐

return `Wrapper` DOM node classes. `Array<{string}> | boolean`

### destroy

Destroys a Vue component instance

### emitted ⭐⭐⭐⭐⭐

Return an object containing custom events emitted by the `Wrapper` `vm`.

### exists

> 判断节点是否存在

Assert a Wrapper exist or not

### find

> deprecated, Use [findComponent](#findcomponent) instead

```ts
(selector:string): Wrapper
```

### findAll

> deprecated, Use [findComponents ](#findcomponents) instead

```ts
(selector:string): WrapperArray
```

### findComponent ⭐⭐⭐⭐⭐

Returns `Wrapper` of **first** matching Vue component.

```ts
(selector: Component|ref|string ): Wrapper
```

### findComponents ⭐⭐⭐⭐⭐

Returns `Wrapper` of **first** matching Vue component.

```ts
(selector: Component|ref|string ): WrapperArray
```

### html

Returns HTML of `Wrapper` DOM node as a string.

```ts
(): string
```

### get

> deprecated, use [getComponent]() instead

Works just like [`find`](#find) **but will throw an error if nothing matching the given selector is found**.

- You should use find when searching for an element that may not exist.
- You should use this method when getting an element that should exist and it will provide a nice error message if that is not the case.

### isVisible ⭐⭐⭐⭐

Assert `Wrapper` is visible.

Returns `false` if an ancestor element has `display: none`, `visibility: hidden`, `opacity :0` style, is located inside collapsed `<details>` tag or has `hidden` attribute.

This can be used to assert that a component is hidden by `v-show`.

### props

Return `Wrapper` `vm` props object. If `key` is provided, the value for the `key` will be returned.

### setChecked ⭐⭐⭐⭐

Sets checked value for input element of type checkbox or radio and updates `v-model` bound data.

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

test('setChecked demo', async () => {
  const wrapper = mount(Foo)
  const radioInput = wrapper.find('input[type="radio"]')
  await radioInput.setChecked()
  expect(radioInput.element.checked).toBeTruthy()
})
```

`checkboxInput.setChecked(checked)` is an alias of the following code.

```js
checkboxInput.element.checked = checked
checkboxInput.trigger('click')
checkboxInput.trigger('change')
```

### setData ⭐⭐⭐⭐

Sets `Wrapper` `vm` data.

### setMethods ⭐⭐⭐⭐

> deprecated

### setProps ⭐⭐⭐⭐

Sets `Wrapper` `vm` props and forces update.

### setSelected ⭐⭐⭐⭐

Selects an option element and updates `v-model` bound data.

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'
test('setSelected demo', async () => {
  const wrapper = mount(Foo)
  const options = wrapper.find('select').findAll('option')
  await options.at(1).setSelected()
  expect(wrapper.find('option:checked').element.value).toBe('bar')
})
```

`option.setSelected()` is an alias of the following code.

```js
option.element.selected = true
parentSelect.trigger('change')
```

### setValue ⭐⭐⭐⭐

Sets value of a text-control input or select element and updates `v-model` bound data.

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

test('setValue demo', async () => {
  const wrapper = mount(Foo)

  const textInput = wrapper.find('input[type="text"]')
  await textInput.setValue('some value')

  expect(wrapper.find('input[type="text"]').element.value).toBe('some value')

  const select = wrapper.find('select')
  await select.setValue('option value')

  expect(wrapper.find('select').element.value).toBe('option value')

  // requires <select multiple>
  const multiselect = wrapper.find('select')
  await multiselect.setValue(['value1', 'value3'])

  const selectedOptions = Array.from(multiselect.element.selectedOptions).map((o) => o.value)
  expect(selectedOptions).toEqual(['value1', 'value3'])
})
```

- `textInput.setValue(value)` is an alias of the following code.

```js
textInput.element.value = value
textInput.trigger('input')
```

- `select.setValue(value)` is an alias of the following code.

```js
select.element.value = value
select.trigger('change')
```

### text ⭐⭐⭐⭐

Returns text content of `Wrapper`.

### trigger ⭐⭐⭐⭐

Triggers an **event asynchronously** on the `Wrapper` DOM node.

`trigger` takes an optional `options` object. The properties in the `options` object are added to the Event. `trigger` returns a Promise, **which when resolved, guarantees the component is updated**. **`trigger` only works with native DOM events**. To emit a custom event, use `wrapper.vm.$emit('myCustomEvent')`

> When using `trigger('focus')` with `jsdom v16.4.0` and above you must use the `attachTo` option when mounting the component. This is because a bug fix in `jsdom v16.4.0` changed `el.focus()` to do nothing on elements that are disconnected from the DOM.

#### Setting the event target:

To add an attribute to the `target`, you need to set the value of the Wrapper element before calling `trigger`. You can do this with the `element` property.

```js
const input = wrapper.find('input')
input.element.value = 100
input.trigger('click')
```
