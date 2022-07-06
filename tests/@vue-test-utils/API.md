# API

## `mount()`

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

## `shallowMount()`

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

## createLocalVue()

returns **a Vue class** for you to add components, mixins and install plugins **without polluting the global Vue class**.

The `errorHandler` option can be used to handle uncaught errors during component render function and watchers.

