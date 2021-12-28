## native 渲染

如渲染 splash 页面

## 预初始化

`RN`容器池这个概念看着很玄乎，其实就是一个 Map，key 为 `RN` 页面的 `componentName`（即 `AppRegistry.registerComponent(appName, Component)` 中传入的 `appName`），`value` 就是一个已经实例化的 `RCTRootView/ReactRootView`。

`APP` 启动后找个触发时机提前初始化，进入 `RN` 容器前先读容器池，如果有匹配的容器，直接拿来用即可，没有匹配的再重新初始化。

## Reference

- [link](https://juejin.cn/post/6948980459602706445)
