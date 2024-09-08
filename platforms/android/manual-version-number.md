## 读取`*.properties`中的内容

```groovy
    def filename = "version.properties"
    def versionPropsFile = rootProject.file(filename)
    def versionBuild
    if (versionPropsFile.canRead()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionPropsFile))
        versionBuild = versionProps['VERSION_BUILD'].toInteger()
    } else {
        throw new FileNotFoundException("Could not read $filename!")
    }
```

## 使用`ext`扩展方法

在 Gradle 构建脚本中，ext 是一个用于定义扩展属性的机制，它允许你在脚本中创建自定义变量。这些变量可以在构建脚本的任何地方被访问和使用，从而提高构建脚本的可读性和可维护性。
`ext` 被用来定义一个名为 `autoIncrementBuildNumber` 的闭包（Closure）。这个闭包封装了自动增加构建编号的逻辑。

```groovy
ext.autoIncrementBuildNumber = {
    if (versionPropsFile.canRead()) {
        def Properties versionProps = new Properties()
        versionProps.load(new FileInputStream(versionPropsFile))
        versionBuild = versionProps['VERSION_BUILD'].toInteger() + 1
        versionProps['VERSION_BUILD'] = versionBuild.toString()
        versionProps.store(versionPropsFile.newWriter(), null)
    } else {
        throw new FileNotFoundException("Could not read version.properties!")
    }
}
```

## gradle构建插件

它使用了 Gradle 的 `taskGraph.whenReady` 回调来执行特定的逻辑。这个回调在构建任务图（task graph）准备好之后、任务执行之前被触发

```groovy
    gradle.taskGraph.whenReady { taskGraph ->
        if (taskGraph.hasTask(assembleDebug)) {
            autoIncrementBuildNumber()
        } else if (taskGraph.hasTask(assembleRelease)) {
            autoIncrementBuildNumber()
        }
    }
```
