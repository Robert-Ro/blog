- 如何获取 Vue3 组件的属性的类型定义

  ```ts
  import MyComponent from "./mycomponent.vue";
  type MyComponentProps = InstanceType<typeof MyComponent>["$props"];
  const props: MyComponentProps = { ... }
  ```

- 拓展 Vue 对象

  ```ts
  import axios from 'axios'
  import { message } from 'ant-design-vue'

  // NOTE 模块扩充必须是一个.ts文件或者一个以全局项目为范围的`.d.ts`文件，无论哪一种，必须确保在tsconfig中被引入。如果是库或插件，则必须添加在package.json的types中。
  // NOTE 模块扩充必须添加在typescript模块中，也就是说，文件需要包含至少一个顶级的import或export。如果扩充在模块之外，它将**覆盖原始类型，而不是扩充**。

  declare module 'vue' {
    interface ComponentCustomProperties {
      $http: typeof axios
      $translate: (key: string) => string
      $message: typeof message
      // more property
    }
  }
  ```

- 定义`vue`文件模块
  ```ts
  declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  ```
- vue 源码中可能用得到的工具类型

  ```ts
  // 工具类
  type ExtractPropTypes

  type ExtractDefaultPropTypes

  type PropType

  type RenderFunction

  export declare type AsyncComponentLoader<T = any> = () => Promise<AsyncComponentResolveResult<T>>;

  // VNode
  export declare type VNodeArrayChildren = Array<VNodeArrayChildren | VNodeChildAtom>;

  export declare type VNodeChild = VNodeChildAtom | VNodeArrayChildren;

  declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;

  export declare type VNodeNormalizedChildren = string | VNodeArrayChildren | RawSlots | null;

  export declare type VNodeProps = {}

  // watch

  export declare type WatchEffect = Function

  export declare type WatchCallback<V = any, OV = any> = Function

  export declare type WatchSource<T = any> = Ref<T> | ComputedRef<T> | (() => T);

  type Slot = () => VNode
  // 响应式

  type Ref

  type UnwrapRef

  type ShallowRef

  type ShallowUnwrapRef

  type ShallowUnwrapRef

  type ShallowReactive

  //
  export declare type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
  ```
