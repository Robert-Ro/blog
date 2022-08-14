- 如何获取Vue3组件的属性的类型定义

    ```ts
    import MyComponent from "./mycomponent.vue";
    type MyComponentProps = InstanceType<typeof MyComponent>["$props"];
    const props: MyComponentProps = { ... }
    ```