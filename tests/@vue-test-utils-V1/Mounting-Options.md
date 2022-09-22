# Mounting Options

Options for `mount` and `shallowMount`.

> Aside from the options documented below, the `options` object can contain any option that would be valid in a call to `new Vue ({ /_options here_/ })`. These options will be merged with the component's existing options when mounted with `mount` / `shallowMount`

## context ⭐⭐⭐⭐

-type: Object

Passes context to functional component. Can only be used with `functional components`.

## data

## slots

## scopedSlots

## stubs

Stubs child components can be an Array of component names to stub, or an object.

## mocks

Add additional properties to the instance. Useful for **mocking global injections**.

- `$route`
- `$router`
- `$t`

## localVue ⭐⭐⭐⭐⭐

A local copy of Vue created by createLocalVue to use when mounting the component. Installing plugins on this copy of Vue prevents polluting the original Vue copy.

## attachTo

指定挂载节点

## attrs

## propsData

## listeners ⭐⭐⭐⭐

> `Wrapper.emitted()`
> Set the component instance's `$listeners` object.

## parentComponent

Component to use as parent for mounted component.

## provide ⭐⭐⭐⭐

Pass properties for components to use in injection. See [`provide/inject`](https://vuejs.org/v2/api/#provide-inject).

## Other options

```js
const Component = {
  template: '<div>{{ foo }}</div>',
  data() {
    return {
      foo: 'fromComponent',
    }
  },
}
const options = {
  data() {
    return {
      foo: 'fromOptions',
    }
  },
}
const wrapper = mount(Component, options)
expect(wrapper.text()).toBe('fromOptions')
```
