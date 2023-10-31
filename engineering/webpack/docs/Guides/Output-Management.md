# Output Management

## Setting up HtmlWebpackPlugin

Before we do a build, you should know that the `HtmlWebpackPlugin` by **default will generate** its own `index.html` file, even though we already have one in the `dist/` folder. This means that it will replace our `index.html` file with a newly generated one.

## Cleaning up the `/dist` folder

```js
const config = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}
```

## The Manifest

The manifest data can be extracted into a json file for consumption using the [`WebpackManifestPlugin`](https://github.com/shellscape/webpack-manifest-plugin).

在编程领域中，"manifest" 通常指的是一个描述文件或清单文件，用于描述和定义软件、应用程序或资源的属性、配置和元数据。

具体来说，"manifest" 文件通常包含以下信息：

1. 版本信息：指定软件或应用程序的版本号。

2. 依赖关系：列出软件或应用程序所依赖的其他库、模块或组件。

3. 资源列表：列出软件或应用程序所需的文件、图像、样式表、脚本等资源。

4. 配置选项：包括各种配置参数、设置和选项，用于自定义软件或应用程序的行为。

5. 权限和许可：指定软件或应用程序所需的权限和许可，例如访问文件系统、网络等。

6. 元数据：提供关于软件或应用程序的其他信息，如作者、描述、图标等。

"manifest" 文件通常以特定的格式或结构进行编写，以便能够被解析和读取。常见的 "manifest" 文件格式包括 JSON、XML、YAML 等。

在不同的上下文中，"manifest" 的含义可能会有所不同。例如，在 Web 开发中，"manifest" 可能指的是一个用于描述 Progressive Web App (PWA) 的清单文件，其中包含了应用程序的名称、图标、离线缓存策略等信息。在移动应用开发中，"manifest" 可能指的是一个用于描述 Android 应用的清单文件，其中包含了应用程序的包名、权限、启动配置等信息。

总之，"manifest" 在编程领域中通常指的是一个描述文件，用于定义和描述软件、应用程序或资源的属性、配置和元数据。
