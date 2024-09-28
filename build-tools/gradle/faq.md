# FAQs

```groovy
// 代码片段
gradle.beforeSettings {
    pluginManagement.repositories.enableMirror()
    dependencyResolutionManagement.repositories.enableMirror()
}
//
settingsEvaluated {

}
```

## `setting.gradle` 文件的作用

## `init.gradle`

## 项目级 `build.gradle`

## 模块级 `build.gradle`

## 开发环境 vs `CI`环境

### 开发环境

- 有 gradle 缓存
- cpu、RAM 资源足
- 有代理

### `CI`环境

- gradle 缓存，情况复杂
- 代理基于宿主机
