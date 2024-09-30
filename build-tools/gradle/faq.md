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

### Answer 1

> https://stackoverflow.com/questions/45387971/when-to-use-gradle-properties-vs-settings-gradle

The `settings.gradle` file is a Groovy script, just like the `build.gradle` file. Only one `settings.gradle` script will be executed in each build (in comparison to multiple `build.gradle` scripts in multi-project builds). The `settings.gradle` script will be executed before any `build.gradle` script and even before the [Project](https://docs.gradle.org/current/javadoc/org/gradle/api/Project.html) instances are created. Therefore, it is evaluated against a [Settings](https://docs.gradle.org/3.3/dsl/org.gradle.api.initialization.Settings.html) object. With this `Settings` object you can add subprojects to your build, modify the parameters from the command line ([StartParameter](https://docs.gradle.org/3.3/javadoc/org/gradle/StartParameter.html)), and access the [Gradle](https://docs.gradle.org/3.3/dsl/org.gradle.api.invocation.Gradle.html) object to register lifecycle handlers. As a consequence, use `settings.gradle` if your settings are build-related and not necessarily project-related or require logic **before** possible subprojects are included.

`settings.gradle`这个文件是一个 Groovy 脚本，就像 `build.gradle` 文件一样。每个构建中只会执行一个 `settings.gradle` 脚本（与多项目构建中的多个 `build.gradle` 脚本进行比较）。`settings.gradle` 脚本将在执行任何 `build.gradle` 脚本之前执行，甚至在创建 [Project](https://docs.gradle.org/current/javadoc/org/gradle/api/Project.html) 实例之前执行。因此，它将针对 [Settings](https://docs.gradle.org/3.3/dsl/org.gradle.api.initialization.Settings.html) 对象进行评估。通过这个 `Settings` 对象，您可以向构建添加子项目，修改命令行 ([StartParameter](URL_ADDRESS)) 中的参数，以及访问 [Gradle](URL_ADDRESS) 对象以注册生命周期处理程序。因此，如果您的设置与构建相关而不是项目相关，或者需要在可能包含子项目之前执行逻辑，则使用 `settings.gradle`。

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
