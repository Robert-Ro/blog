# API

## `mount()`⭐⭐⭐⭐⭐

```ts
export declare function mount<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>
): Wrapper<V>;
export declare function mount<V extends Vue>(
  component: ComponentOptions<V>,
  options?: ThisTypedMountOptions<V>
): Wrapper<V>;
export declare function mount<V extends Vue, Data, Methods, Computed, Props>(
  component: ExtendedVue<V, Data, Methods, Computed, Props>,
  options?: ThisTypedMountOptions<V>
): Wrapper<CombinedVueInstance<V, Data, Methods, Computed, Props> & Vue>;
export declare function mount<
  Props = DefaultProps,
  PropDefs = PropsDefinition<Props>
>(
  component: FunctionalComponentOptions<Props, PropDefs>,
  options?: MountOptions<Vue>
): Wrapper<Vue>;
export declare function mount<V extends Vue, Props = DefaultProps>(
  component: ExtendedVue<V, {}, {}, {}, Props>,
  options?: FunctionalComponentMountOptions<V>
): Wrapper<CombinedVueInstance<V, {}, {}, {}, Props> & Vue>;

interface MountOptions<V extends Vue> extends ComponentOptions<V> {
  // ComponentOptions Vue组件选项类型
  attachToDocument?: boolean;
  attachTo?: Element | string;
  context?: VNodeData;
  localVue?: typeof Vue;
  mocks?: object | false;
  parentComponent?: Component;
  slots?: Slots;
  scopedSlots?: Record<string, string | Function>;
  stubs?: Stubs | false;
  attrs?: Record<string, string>;
  listeners?: Record<string, Function | Function[]>;
}
```

- without Options
- with Vue Options
- Attach to DOM
- Default and named slots
- Stubbing global properties
- Stubbing components

## `shallowMount()`⭐⭐⭐⭐⭐

> Like `mount`, it creates a `Wrapper` that contains the mounted and rendered Vue component, but with **stubbed child components**.

## `render()`

> Renders an object to a string and returns a [cheerio wrapper](https://github.com/cheeriojs/cheerio)

- `render` uses [vue-server-renderer](https://ssr.vuejs.org/en/basic.html) under the hood, to render a component to static HTML.

- `render` is included in the `@vue/server-test-utils` package.

## `renderToString()`

Renders a component to HTML.

`renderToString` uses [vue-server-renderer](https://ssr.vuejs.org/en/basic.html) under the hood, to render a component to HTML.

`renderToString` is included in the `@vue/server-test-utils` package.

## Selectors

A lot of methods take a selector as an argument. A selector can either be **a CSS selector**, **a Vue component**, or **a find option object**.

### CSS Selectors

Mount handles any valid CSS selector:

- tag selectors (`div`, `foo`, `bar`)
- class selectors (`.foo`, `.bar`)
- attribute selectors (`[foo]`, `[foo="bar"]`)
- id selectors (`#foo`, `#bar`)
- pseudo selectors (`div:first-of-type`)

You can also use combinators:

- direct descendant combinator (`div > #bar > .foo`)
- general descendant combinator (`div #bar .foo`)
- adjacent sibling selector (`div + .foo`)
- general sibling selector (`div ~ .foo`)

### Vue Components

Vue components are also valid selectors.

### Find Option Object

- Name
- Ref

## createLocalVue()⭐⭐⭐⭐

returns **a Vue class** for you to add components, mixins and install plugins **without polluting the global Vue class**.

The `errorHandler` option can be used to handle uncaught errors during component render function and watchers.

## createWrapper(node [, options])

`createWrapper` creates a `Wrapper` for a mounted Vue instance, or an HTML element.

```js
import { createWrapper } from "@vue/test-utils";
import Foo from "./Foo.vue";

const Constructor = Vue.extend(Foo);
const vm = new Constructor().$mount();
const wrapper = createWrapper(vm);
expect(wrapper.vm.foo).toBe(true);
```

## Config

Vue Test Utils includes a config object to defined options used by Vue Test Utils.

### Vue Test Utils Config Options

- showDeprecationWarnings: `{type:Boolean, default: true}`
- stubs
  - type: { [name: string]: Component | boolean | string }
  - default: {}
    The stub stored in `config.stubs` is used by default. Stubs to use in components. These are overwritten by `stubs` passed in the mounting options.
- mocks
  - type: Object
  - default: {}
- methods
  - type: { [name: string]: Function }
  - default: {}
    You can configure default methods using the `config` object. This can be useful for plugins that inject methods to components, like [VeeValidate](https://logaretm.github.io/vee-validate/). You can override methods set in `config` by passing `methods` in the mounting options.
- provide
  - type: Object
  - default: {}
    Like `stubs` or `mocks`, the values passed to `config.provide` are used by default. Any values passed to the mounting options `provide` object will take priority over the ones declared in `config.provide`. Please take note that it is not supported to pass a function as `config.provide`.

## enableAutoDestroy(hook)

`enableAutoDestroy` will destroy all created `Wrapper` instances using the passed hook function (for example [`afterEach`](https://jestjs.io/docs/en/api#aftereachfn-timeout)). After calling the method, you can revert to the default behavior by calling the `resetAutoDestroyState` method.

```js
import { enableAutoDestroy, mount } from "@vue/test-utils";
import Foo from "./Foo.vue";
// calls wrapper.destroy() after each test
enableAutoDestroy(afterEach);
describe("Foo", () => {
  it("renders a div", () => {
    const wrapper = mount(Foo);
    expect(wrapper.contains("div")).toBe(true);
    // no need to call wrapper.destroy() here
  });
});
```

## resetAutoDestroyState

After calling `enableAutoDestroy` you might need to disable auto-destroy behavior (for example when some of your test suites rely on wrapper being persistent across separate tests)

To achieve this you might call `resetAutoDestroyState` to disable previously registered hook

```js
import {
  enableAutoDestroy,
  resetAutoDestroyState,
  mount,
} from "@vue/test-utils";
import Foo from "./Foo.vue";

// calls wrapper.destroy() after each test
enableAutoDestroy(afterEach);
// resets auto-destroy after suite completes
afterAll(resetAutoDestroyState);

describe("Foo", () => {
  it("renders a div", () => {
    const wrapper = mount(Foo);
    expect(wrapper.contains("div")).toBe(true);
    // no need to call wrapper.destroy() here
  });
});
```
