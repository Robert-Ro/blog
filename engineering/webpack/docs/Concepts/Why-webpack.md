# Why webpack

To understand why you should use webpack, let's recap how we used JavaScript on the web before bundlers were a thing.
想要理解为什么要使用 webpack，我们先回顾下历史，在打包工具出现之前，我们是如何在 web 中使用 JavaScript 的。

There are two ways to run JavaScript in a browser. First, include a script for each functionality; this solution is hard to scale because loading too many scripts can cause a network bottleneck. The second option is to use a big `.js` file containing all your project code, but this leads to problems in scope, size, readability and maintainability.
在浏览器中运行 JavaScript 有两种方法。第一种方式，引用一些脚本来存放每个功能；此解决方案很难扩展，因为加载太多脚本会导致网络瓶颈。第二种方式，使用一个包含所有项目代码的大型 .js 文件，但是这会导致作用域、文件大小、可读性和可维护性方面的问题。

## IIFEs - Immediately invoked function expressions 立即调用函数表达式(IIFE)

IIFEs solve scoping issues for large projects; when script files are wrapped by an IIFE, you can safely concatenate or safely combine files without worrying about scope collision.
IIFE 解决大型项目的作用域问题；当脚本文件被封装在 IIFE 内部时，你可以安全地拼接或安全地组合所有文件，而不必担心作用域冲突。

The use of IIFEs led to tools like Make, Gulp, Grunt, Broccoli or Brunch. These tools are known as task runners, and they concatenate all your project files together.
IIFE 使用方式产生出 Make, Gulp, Grunt, Broccoli 或 Brunch 等工具。这些工具称为任务执行器，它们将所有项目文件拼接在一起。

However, changing one file means you have to rebuild the whole thing. Concatenating makes it easier to reuse scripts across files but makes build optimizations more difficult. How can you find out if code is actually being used or not?
但是，修改一个文件意味着必须重新构建整个文件。拼接可以做到很容易地跨文件重用脚本，但是却使构建结果的优化变得更加困难。如何判断代码是否实际被使用？

Even if you only use a single function from lodash, you have to add the entire library and then squish it together. How do you treeshake the dependencies on your code? Lazy loading chunks of code can be hard to do at scale and requires a lot of manual work from the developer.
即使你只用到 lodash 中的某个函数，也必须在构建结果中加入整个库，然后将它们压缩在一起。如何 treeshake 代码依赖？难以大规模地实现延迟加载代码块，这需要开发人员手动地进行大量工作。

## Birth of JavaScript Modules happened thanks to Node.js 感谢 Node.js，JavaScript 模块诞生了

Webpack runs on Node.js, a JavaScript runtime that can be used in computers and servers outside a browser environment.
Node.js 是一个 JavaScript 运行时，可以在浏览器环境之外的计算机和服务器中使用。webpack 运行在 Node.js 中。

When Node.js was released a new era started, and it came with new challenges. Now that JavaScript is not running in a browser, how are Node applications supposed to load new chunks of code? There are no html files and script tags that can be added to it.
当 Node.js 发布时，一个新的时代开始了，它带来了新的挑战。既然不是在浏览器中运行 JavaScript，现在已经没有了可以添加到浏览器中的 html 文件和 script 标签。那么 Node.js 应用程序要如何加载新的代码 chunk 呢？

CommonJS came out and introduced `require`, which allows you to load and use a module in the current file. This solved scope issues out of the box by importing each module as it was needed.
CommonJS 问世并引入了 require 机制，它允许你在当前文件中加载和使用某个模块。导入需要的每个模块，这一开箱即用的功能，帮助我们解决了作用域问题。

## npm + Node.js + modules – mass distribution 大规模分发模块

JavaScript is taking over the world as a language, as a platform and as a way to rapidly develop and create fast applications.
JavaScript 已经成为一种语言、一个平台和一种快速开发和创建快速应用程序的方式，接管了整个 JavaScript 世界。

But there is no browser support for CommonJS. There are no [live bindings](https://medium.com/webpack/the-state-of-javascript-modules-4636d1774358). There are problems with circular references. Synchronous module resolution and loading is slow. While CommonJS was a great solution for Node.js projects, browsers didn't support modules, so bundlers and tools like Browserify, RequireJS and SystemJS were created, allowing us to write CommonJS modules that run in a browser.
但 CommonJS 没有浏览器支持。没有 live binding(实时绑定)。循环引用存在问题。同步执行的模块解析加载器速度很慢。虽然 CommonJS 是 Node.js 项目的绝佳解决方案，但浏览器不支持模块，因而产生了 Browserify, RequireJS 和 SystemJS 等打包工具，允许我们编写能够在浏览器中运行的 CommonJS 模块。

## ESM - ECMAScript Modules 模块

The good news for web projects is that modules are becoming an official feature in the ECMAScript standard. However, browser support is incomplete and bundling is still faster and currently recommended over these early module implementations.
来自 Web 项目的好消息是，模块正在成为 ECMAScript 标准的官方功能。然而，浏览器支持不完整，版本迭代速度也不够快，目前还是推荐上面那些早期模块实现。

## Automatic Dependency Collection 依赖自动收集

Old school Task Runners and even Google Closure Compiler requires you to manually declare all dependencies upfront. While bundlers like webpack automatically build and infer your [dependency graph](/concepts/dependency-graph/) based on what is imported and exported. This along with other [plugins](/concepts/plugins/) and [loaders](/concepts/loaders/) make for a great developer experience.
传统的任务构建工具基于 Google 的 Closure 编译器都要求你手动在顶部声明所有的依赖。然而像 webpack 一类的打包工具自动构建并基于你所引用或导出的内容推断出依赖的图谱。这个特性与其它的如插件 and 加载器一道让开发者的体验更好。

## Wouldn't it be nice… 看起来都不是很好

...to have something that will not only let us write modules but also support any module format (at least until we get to ESM) and handle resources and assets at the same time?
是否可以有一种方式，不仅可以让我们编写模块，而且还支持任何模块格式（至少在我们到达 ESM 之前），并且可以同时处理资源和资产？

This is why webpack exists. It's a tool that lets you bundle your JavaScript applications (supporting both ESM and CommonJS), and it can be extended to support many different assets such as images, fonts and stylesheets.
这就是 webpack 存在的原因。它是一个工具，可以打包你的 JavaScript 应用程序（支持 ESM 和 CommonJS），可以扩展为支持许多不同的静态资源，例如：images, fonts 和 stylesheets。

Webpack cares about performance and load times; it's always improving or adding new features, such as async chunk loading and prefetching, to deliver the best possible experience for your project and your users.
webpack 关心性能和加载时间；它始终在改进或添加新功能，例如：异步地加载 chunk 和预取，以便为你的项目和用户提供最佳体验。
