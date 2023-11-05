# Hot Module Replacement

Hot Module Replacement (HMR) exchanges, adds, or removes [modules](/concepts/modules/) while an application is running, without a full reload. This can significantly speed up development in a few ways:
模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，**替换**、**添加**或**删除** 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

- Retain application state which is lost during a full reload. 保留在完全重新加载页面期间丢失的应用程序状态
- Save valuable development time by only updating what's changed. 只更新变更内容，以节省宝贵的开发时间。
- Instantly update the browser when modifications are made to CSS/JS in the source code, which is almost comparable to changing styles directly in the browser's dev tools. 在源代码中 `CSS/JS` 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式

## How It Works 这一切是如何运行的？

Let's go through some different viewpoints to understand exactly how HMR works...
让我们从一些不同的角度观察，以了解 HMR 的工作原理……

### In the Application

在应用程序中

The following steps allow modules to be swapped in and out of an application:

1. The application asks the HMR runtime to check for updates. 应用程序要求 HMR runtime 检查更新。
2. The runtime asynchronously downloads the updates and notifies the application. HMR runtime 异步地下载更新，然后通知应用程序。
3. The application then asks the runtime to apply the updates. 应用程序要求 HMR runtime 应用更新。
4. The runtime synchronously applies the updates. HMR runtime 同步地应用更新。

You can set up HMR so that this process happens automatically, or you can choose to require user interaction for updates to occur.
你可以设置 HMR，以使此进程自动触发更新，或者你可以选择要求在用户交互时进行更新。

### In the Compiler 在 compiler 中

In addition to normal assets, the compiler needs to emit an "update" to allow updating from the previous version to the new version. The "update" consists of two parts:
除了普通资源，compiler 需要发出 "update"，将之前的版本更新到新的版本。"update" 由两部分组成：

1. The updated [manifest](/concepts/manifest) (JSON) 更新后的 manifest (JSON)
2. One or more updated chunks (JavaScript) 一个或多个 updated chunk (JavaScript)

The manifest contains the new compilation hash and a list of all updated chunks. Each of these chunks contains the new code for all updated modules (or a flag indicating that the module was removed).
manifest 包括新的 compilation hash 和所有的 updated chunk 列表。每个 chunk 都包含着全部更新模块的最新代码（或一个 flag 用于表明此模块需要被移除）。

The compiler ensures that module IDs and chunk IDs are consistent between these builds. It typically stores these IDs in memory (e.g. with [webpack-dev-server](/configuration/dev-server/)), but it's also possible to store them in a JSON file.
compiler 会确保在这些构建之间的模块 ID 和 chunk ID 保持一致。通常将这些 ID 存储在内存中（例如，使用 [webpack-dev-server](https://webpack.docschina.org/configuration/dev-server/) 时），但是也可能会将它们存储在一个 JSON 文件中。

### In a Module 在模块中

HMR is an opt-in feature that only affects modules containing HMR code. One example would be patching styling through the [`style-loader`](https://github.com/webpack-contrib/style-loader). In order for patching to work, the `style-loader` implements the HMR interface; when it receives an update through HMR, it replaces the old styles with the new ones.
HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 `style-loader` 为 style 追加补丁。为了运行追加补丁，**`style-loader` 实现了 HMR 接口**；当它通过 `HMR` 接收到更新，它会使用新的样式替换旧的样式。

Similarly, when implementing the HMR interface in a module, you can describe what should happen when the module is updated. However, in most cases, it's not mandatory to write HMR code in every module. If a module has no HMR handlers, the update bubbles up. This means that a single handler can update a complete module tree. If a single module from the tree is updated, the entire set of dependencies is reloaded.
类似的，当在一个模块中实现了 `HMR` 接口，你可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要在每个模块中强行写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡(bubble up)。这意味着某个单独处理函数能够更新整个模块树。如果在模块树的一个单独模块被更新，那么整组依赖模块都会被重新加载。

See the [HMR API page](/api/hot-module-replacement) for details on the `module.hot` interface.
有关 `module.hot` 接口的详细信息，请查看 HMR API 页面。

### In the Runtime 在 runtime 中

Here things get a bit more technical... if you're not interested in the internals, feel free to jump to the [HMR API page](/api/hot-module-replacement) or [HMR guide](/guides/hot-module-replacement).
这件事情比较有技术性……如果你对其内部不感兴趣，可以随时跳到 HMR API 页面 或 HMR 指南。

For the module system runtime, additional code is emitted to track module `parents` and `children`. On the management side, the runtime supports two methods: `check` and `apply`.
对于模块系统运行时(module system runtime)，会发出额外代码，来跟踪模块 `parents` 和 `children` 关系。在管理方面，runtime 支持两个方法 `check` 和 `apply`。

A `check` makes an HTTP request to the update manifest. If this request fails, there is no update available. If it succeeds, the list of updated chunks is compared to the list of currently loaded chunks. For each loaded chunk, the corresponding update chunk is downloaded. All module updates are stored in the runtime. When all update chunks have been downloaded and are ready to be applied, the runtime switches into the `ready` state.
`check` 方法，发送一个 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，会将 updated chunk 列表与当前的 loaded chunk 列表进行比较。每个 loaded chunk 都会下载相应的 updated chunk。当所有更新 chunk 完成下载，runtime 就会切换到 `ready` 状态。

The `apply` method flags all updated modules as invalid. For each invalid module, there needs to be an update handler in the module or in its parent(s). Otherwise, the invalid flag bubbles up and invalidates parent(s) as well. Each bubble continues until the app's entry point or a module with an update handler is reached (whichever comes first). If it bubbles up from an entry point, the process fails.
`apply` 方法，将所有 updated module 标记为无效。对于每个无效 module，都需要在模块中有一个 update handler，或者在此模块的父级模块中有 update handler。否则，会进行无效标记冒泡，并且父级也会被标记为无效。继续每个冒泡，直到到达应用程序入口起点，或者到达带有 update handler 的 module（以最先到达为准，冒泡停止）。如果它从入口起点开始冒泡，则此过程失败。

Afterwards, all invalid modules are disposed (via the dispose handler) and unloaded. The current hash is then updated and all `accept` handlers are called. The runtime switches back to the `idle` state and everything continues as normal.
之后，所有无效 module 都会被（通过 dispose handler）处理和解除加载。然后更新当前 hash，并且调用所有 `accept` handler。runtime 切换回 `idle` 状态，一切照常继续。

## Get Started

HMR can be used in development as a LiveReload replacement. [webpack-dev-server](/configuration/dev-server/) supports a `hot` mode in which it tries to update with HMR before trying to reload the whole page. See the [Hot Module Replacement guide](/guides/hot-module-replacement) for details.
在开发环境，可以将 HMR 作为 LiveReload 的替代。webpack-dev-server 支持 hot 模式，在试图重新加载整个页面之前，hot 模式会尝试使用 HMR 来更新。更多细节请查看 模块热替换 指南。

> As with many other features, webpack's power lies in its customizability. There are _many_ ways of configuring HMR depending on the needs of a particular project. However, for most purposes, `webpack-dev-server` is a good fit and will allow you to get started with HMR quickly.

## Thinking & TODO

- `style-loader` 内部实现
- 手动实现 Webpack 并支持 HMR
