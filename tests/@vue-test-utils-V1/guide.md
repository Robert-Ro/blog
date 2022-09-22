# Guides

## What is Vue Test Utils?

Vue Test Utils (VTU) is a set of utility functions aimed to simplify testing Vue.js components. It provides some methods to **mount** and **interact** with Vue components in an isolated manner.

Mounted components are returned inside a [**Wrapper**](./wrapper.md), which exposes methods for querying and interacting with the component under testing.

## Simulating User Interaction 模拟用户交互

`wrapper.find()`返回元素，然后调用元素的`.trigger()`方法来模拟点击(异步操作)

## Common Tips

### Knowing What to Test 懂应该测什么

> 回归程序的本身：输入与输出

For UI components, we **don't recommend aiming for complete line-based coverage**, because it leads to too much focus on the internal implementation details of the components and could result in brittle tests.(没有必要且繁琐)

Instead, we recommend writing tests that **assert your component's public interface**(测试组件的公共接口，对外的操作), and treat its internals as a black box. A single test case would assert that **some input** (输入指的是：user interaction 用户输入 or change of props 属性变化) provided to the component results in the **expected output** (输出指的是：render result 渲染结果 or emitted custom events 触发特定的事件).

举例：
组件`Counter`显示的 counter 每点击一次会递增，因此需要模拟点击，然后判断渲染结果是否增加了 1，仅关心输入/输出

The benefit of this approach is that as long as your component's public interface remains the same, your tests will pass no matter how the component's internal implementation changes over time.(只要对外的接口保持不变，测试就能正常通过，而不用关心组件的内部实现是否更改了)。

更多阅读：[great presentation by Matt O'Connell](https://www.youtube.com/watch?v=OIpfWTThrK8)

### Shallow mounting

> 浅渲染，仅渲染当前组件，涉及到子组件的话，都使用`by stubbing them`(渲染整个组件可能比较耗时，有些组件的 render 比较麻烦等)

同样是返回一个`Wrapper`对象， Wrapper that contains the mounted and rendered Vue component, but with **stubbed child components**.

> 注：部分不会被渲染，只在考虑性能或者需要简化测试用例时使用

### Lifecycle Hooks

Wrapper.destroy(): 手动执行，触发 `beforeDestroy` 和 `destroyed` 钩子， 受 stub 和是否手动清除处理相关

### Writing asynchronous tests

> to prevent unnecessary DOM re-renders, and watcher computations, Vue batches updates to run asynchronously (on the next "tick"). So, you **must wait for updates** to run after you change a reactive property

[Testing Asynchronous Behavior]()

### Asserting Emitted Events

Each mounted wrapper automatically records **all events emitted** by the underlying Vue instance. You can retrieve the recorded events using the **wrapper.emitted()** method:

```js
wrapper.vm.$emit('foo')
wrapper.vm.$emit('foo', 123)

/*
`wrapper.emitted()` returns the following object:
{
  foo: [[], [123]]
}
*/
```

基于此，可测试的举例：

```js
// assert event has been emitted 事件被触发出
expect(wrapper.emitted().foo).toBeTruthy()
// assert event count 事件被触发的次数
expect(wrapper.emitted().foo.length).toBe(2)
// assert event payload 事件回调的参数
expect(wrapper.emitted().foo[1]).toEqual([123])
```

> 更多查看[Wrapper](./wrapper.md)

### Emitting Event from Child Component 子组件的事件

获取子组件的实例，然后`vm.$emit()`事件出来

### Manipulating Component State

> 修改 data 和 prop

You can directly manipulate the state of the component using the `setData` or `setProps` method on the wrapper:

```js
it('manipulates state', async () => {
  await wrapper.setData({ count: 10 })
  await wrapper.setProps({ foo: 'bar' }) // NOTE top-level component
})
```

### Mocking Props

通过传内置的`propsData`选项

```js
import { mount } from '@vue/test-utils'

mount(Component, {
  propsData: {
    aProp: 'some value',
  },
})
```

### Mocking Transitions

Although calling `await Vue.nextTick()` works well for most use cases, there are some situations where additional workarounds are required.

// TODOs

### Applying Global Plugins and Mixins

> 处理涉及第三方插件和 Mixins 的测试

> it's better to test your components in a more isolated setup, without polluting the global Vue constructor

```js
import { createLocalVue, mount } from '@vue/test-utils'
// create an extended `Vue` constructor
const localVue = createLocalVue()
// install plugins as normal
localVue.use(MyPlugin)
// pass the `localVue` to the mount options
mount(Component, {
  localVue,
})
```

### Mocking Injections

```js
import { mount } from '@vue/test-utils'
const $route = {
  path: '/',
  hash: '',
  params: { id: '123' },
  query: { q: 'hello' },
}
mount(Component, {
  mocks: {
    // adds mocked `$route` object to the Vue instance
    // before mounting component
    $route,
  },
})
```

### Stubbing components

> You can override components that are registered globally or locally by using the `stubs` option:

```js
import { mount } from '@vue/test-utils'
mount(Component, {
  // Will resolve globally-registered-component with
  // empty stub
  stubs: ['globally-registered-component'],
})
```

### Dealing with Routing

Since routing by definition has to do with the overall structure of the application and involves multiple components, it is best tested via **integration** or **end-to-end tests**.

For **individual components that rely on vue-router features**, you can mock them using the techniques mentioned above.

### Detecting styles

Your test can only **detect inline styles** when running in `jsdom`

## Testing Key, Mouse and other DOM events

### Trigger events

The `Wrapper` exposes an async `trigger` method. It can be used to trigger DOM events.

### Options

The trigger method takes an optional options object. The properties in the options object are added to the Event.

### Mouse Click Example

[spy api](https://sinonjs.org/releases/v14/spies/)

## Testing Asynchronous Behavior 测试异步代码

There are two types of asynchronous behavior you will encounter in your tests:

- 场景 1：Updates applied by Vue
- 场景 2：Asynchronous behavior outside of Vue

### Updates applied by Vue

Vue **batches pending DOM updates** and applies them asynchronously to **prevent unnecessary re-renders caused by multiple data mutations**.

> Async-Update-Queue

In practice, this means that after _mutating a reactive property_, to assert that change your test has to wait while Vue is performing updates.

- One way is to use `await Vue.nextTick()`, but an easier and cleaner way is
- to just `await` the method that you mutated the state with, like `trigger`.

```js
// inside test-suite, add this test case
it('button click should increment the count text', async () => {
  expect(wrapper.text()).toContain('0')
  const button = wrapper.find('button')
  await button.trigger('click')
  // 等同于下面的代码
  // button.trigger("click")
  // await Vue.nextTick()
  expect(wrapper.text()).toContain('1')
})
```

Methods that **can be awaited** are:

- [setData](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#setdata)
- [setValue](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#setvalue)
- [setChecked](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#setchecked)
- [setSelected](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#setselected)
- [setProps](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#setprops)
- [trigger](https://github.com/vuejs/vue-test-utils/blob/dev/docs/api/wrapper/README.md#trigger)

### Asynchronous behavior outside of Vue

One of the most common asynchronous behaviors 最常见场景：

- outside of Vue is **API calls** in Vuex actions

## Using with Vue Router

### Installing Vue Router in tests

**You should never install Vue Router on the Vue base constructor in tests**. Installing Vue Router adds `$route` and `$router` as read-only properties on Vue prototype.

> This means you **can not use the mocks option** to overwrite `$route` and `$router` when mounting a component using a `localVue` with Vue Router installed

To avoid this, we can create a **localVue**, and install Vue Router on that.

### Testing components that use `router-link` or `router-view`

When you install Vue Router, the `router-link` and `router-view` components are registered. This means we can use them anywhere in our application without needing to import them.

When we run tests, _we need to make these Vue Router components available to the component we're mounting_. There are two methods to do this.

#### Using stubs

```js
import { shallowMount } from '@vue/test-utils'
shallowMount(Component, {
  stubs: ['router-link', 'router-view'],
})
```

#### Installing Vue Router with localVue

```js
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)

mount(Component, {
  localVue,
  router: VueRouter, // ?
})
```

The router instance is available to all children components, this is useful for integration level testing.

### Mocking `$route` and `$router`

> 直接 mock

Sometimes you want to test that a component does something with parameters from the `$route` and `$router` objects. To do that, you can pass custom mocks to the Vue instance.

```js
import { shallowMount } from '@vue/test-utils'
const $route = {
  path: '/some/path',
}
const wrapper = shallowMount(Component, {
  mocks: {
    $route,
  },
})
wrapper.vm.$route.path // /some/path
```

> Note: the mocked `$route` and `$router` values are not available to children components, either stub this components or use the `localVue` method

#### Vue-Router 测试场景

> 核心思想：从用户的角度来看

- 能正常跳转：根据地址能路由到特定组件，基于组件是否存在来判断
- 能正常跳转，且根据参数正常渲染

## Using with Vuex

> how to test Vuex in components with Vue Test Utils, and how to approach testing a Vuex store.

> - dispatch action
> - commit mutation -> state change

### Testing Vuex in components

#### Mocking Actions

```js
export default {
  methods: {
    test() {
      this.$store.dispatch('actionInput', { inputValue })
    },
  },
}
```

For the purposes of this test, **we don’t care what the actions do**, or **what the store looks like**. We just need to know that these actions are being fired(action 能正常 fired) when they should, and that they are fired with the expected value.

To test this, we need to pass a **mock store to Vue** when we shallowMount our component.

> **localVue**. A localVue is a scoped Vue constructor that we can make changes to without affecting the global Vue constructor.

#### Mocking Getters

This test is similar to our actions test. We create a mock store before each test, pass it as an option when we call `shallowMount`, and assert that the value returned by our mock getters is being rendered.

#### Mocking with Modules

inject a mocking module and then pass it to store, similar to upper

#### Testing a Vuex Store

two approaches to testing a Vuex store:

- to unit test the getters, mutations, and actions separately
- to create a store and test against that

##### Testing getters, mutations, and actions separately

`Getters`, `mutations`, and `actions` **are all JavaScript functions**, so we can test them without using Vue Test Utils and Vuex.

- The **benefit** to testing getters, mutations, and actions separately is that your unit tests are detailed. When they fail, you know exactly what is wrong with your code.
- The **downside** is that you will need to _mock Vuex functions_, like `commit` and `dispatch`. This can lead to a situation where your unit tests pass, but your production code fails because your mocks are incorrect.

```js
// mutations.spec.js
import mutations from './mutations'
test('"increment" increments "state.count" by 1', () => {
  const state = {
    count: 0,
  }
  mutations.increment(state)
  expect(state.count).toBe(1)
})

// getters.spec.js
import getters from './getters'
test('"evenOrOdd" returns even if "state.count" is even', () => {
  const state = {
    count: 2,
  }
  expect(getters.evenOrOdd(state)).toBe('even')
})
test('"evenOrOdd" returns odd if "state.count" is odd', () => {
  const state = {
    count: 1,
  }
  expect(getters.evenOrOdd(state)).toBe('odd')
})
```

##### Testing a running store

Another approach to testing a Vuex store is to create a running store using the store config.

The **benefit** of creating a running store instance is we don't have to mock any Vuex functions.

The **downside** is that when a test breaks, it can be difficult to find where the problem is.

```js
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from './store-config'
import { cloneDeep } from 'lodash' // to create clear store not deep

test('increments "count" value when "increment" is committed', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  expect(store.state.count).toBe(0)
  store.commit('increment')
  expect(store.state.count).toBe(1)
})

test('updates "evenOrOdd" getter when "increment" is committed', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  const store = new Vuex.Store(cloneDeep(storeConfig))
  expect(store.getters.evenOrOdd).toBe('even')
  store.commit('increment')
  expect(store.getters.evenOrOdd).toBe('odd')
})

import myModule from './myModule'
// ...
const store = new Vuex.Store({ modules: { myModule: cloneDeep(myModule) } })
```

## Using with Vue-i18n

> default locale can show right
> show right locale after locale change
> show fallback locale if locale no the key

## Settings default mocks using config

> 设置默认 mock

Sometimes you want to have a default value for the mock, so you don't create it on a test by test basis. You can do this using the [config](https://vue-test-utils.vuejs.org/api/#vue-test-utils-config-options) API provided by `vue-test-utils`. Let's expand the `vue-i18n` example. You can set default mocks anywhere by doing the following:

```js
import { config } from '@vue/test-utils'
config.mocks['mock'] = 'Default Mock Value'
```

declare the default mock in `jest.init.js`, which is loaded before the tests are run automatically.

```js
// jest.init.js

import VueTestUtils from '@vue/test-utils'
import translations from './src/translations.js'
const locale = 'en'
VueTestUtils.config.mocks['$t'] = (msg) => translations[locale][msg]
```
