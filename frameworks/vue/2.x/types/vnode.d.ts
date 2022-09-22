/**
 * 虚拟DOM
 */
export interface VNode {
  tag?: string
  data?: VNodeData
  children?: VNode[]
  text?: string
  elm?: Node
  ns?: string
  context?: Vue // vnode->context->vm->$vnode === vnode
  key?: string | number | symbol | boolean
  componentOptions?: VNodeComponentOptions
  componentInstance?: Vue
  parent?: VNode
  raw?: boolean
  isStatic?: boolean
  isRootInsert: boolean
  isComment: boolean
}

export interface VNodeComponentOptions {
  Ctor: typeof Vue
  propsData?: object
  listeners?: object
  children?: VNode[]
  tag?: string
}
/**
 *
 */
export interface VNodeData {
  key?: string | number
  slot?: string
  scopedSlots?: { [key: string]: ScopedSlot | undefined }
  ref?: string
  refInFor?: boolean
  tag?: string
  staticClass?: string
  class?: any
  staticStyle?: { [key: string]: any }
  style?: string | object[] | object
  props?: { [key: string]: any }
  attrs?: { [key: string]: any }
  domProps?: { [key: string]: any }
  hook?: { [key: string]: Function }
  on?: { [key: string]: Function | Function[] }
  nativeOn?: { [key: string]: Function | Function[] }
  transition?: object
  show?: boolean
  inlineTemplate?: {
    render: Function
    staticRenderFns: Function[]
  }
  directives?: VNodeDirective[]
  keepAlive?: boolean
}

export interface VNodeDirective {
  name: string
  value?: any
  oldValue?: any
  expression?: string
  arg?: string
  oldArg?: string
  modifiers?: { [key: string]: boolean }
}
/**
 * Vue实例
 */
export interface Vue {
  readonly $el: Element // vm.$el.__vue__ === vm
  readonly $options: ComponentOptions<Vue>
  readonly $parent: Vue
  readonly $root: Vue
  readonly $children: Vue[]
  readonly $refs: {
    [key: string]: Vue | Element | (Vue | Element)[] | undefined
  }
  readonly $slots: { [key: string]: VNode[] | undefined }
  readonly $scopedSlots: { [key: string]: NormalizedScopedSlot | undefined }
  readonly $isServer: boolean
  readonly $data: Record<string, any>
  readonly $props: Record<string, any>
  readonly $ssrContext: any
  readonly $vnode: VNode
  readonly $attrs: Record<string, string>
  readonly $listeners: Record<string, Function | Function[]>

  $mount(elementOrSelector?: Element | string, hydrating?: boolean): this
  $forceUpdate(): void
  $destroy(): void
  $set: typeof Vue.set
  $delete: typeof Vue.delete
  $watch(expOrFn: string, callback: (this: this, n: any, o: any) => void, options?: WatchOptions): () => void
  $watch<T>(expOrFn: (this: this) => T, callback: (this: this, n: T, o: T) => void, options?: WatchOptions): () => void
  $on(event: string | string[], callback: Function): this
  $once(event: string | string[], callback: Function): this
  $off(event?: string | string[], callback?: Function): this
  $emit(event: string, ...args: any[]): this
  $nextTick(callback: (this: this) => void): void
  $nextTick(): Promise<void>
  $createElement: CreateElement
}
