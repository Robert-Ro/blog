# Modules

In [modular programming](https://en.wikipedia.org/wiki/Modular_programming), developers break programs up into discrete chunks of functionality called a _module_.
在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之为 模块。

Each module has a smaller surface area than a full program, making verification, debugging, and testing trivial. Well-written modules provide solid abstractions and encapsulation boundaries, so that each module has a coherent design and a clear purpose within the overall application.
每个模块都拥有小于完整程序的体积，使得验证、调试及测试变得轻而易举。 精心编写的 模块 提供了可靠的抽象和封装界限，使得应用程序中每个模块都具备了条理清晰的设计和明确的目的。

`Node.js` has supported modular programming almost since its inception. On the web, however, support for modules has been slow to arrive. Multiple tools exist that support modular JavaScript on the web, with a variety of benefits and limitations. Webpack builds on lessons learned from these systems and applies the concept of modules to any file in your project.
Node.js 从一开始就支持模块化编程。 然而，web 的 模块化 正在缓慢支持中。 在 web 界存在多种支持 JavaScript 模块化的工具，这些工具各有优势和限制。 Webpack 从这些系统中汲取了经验和教训，并将 模块 的概念应用到项目的任何文件中。

## What is a webpack Module

In contrast to [Node.js modules](https://nodejs.org/api/modules.html), webpack _modules_ can express their _dependencies_ in a variety of ways. A few examples are:

- An ES2015 `import` statement
- A CommonJS `require()` statement
- An AMD `define` and `require` statement
- An `@import` statement inside of a css/sass/less file.
- An image url in a stylesheet `url(...)` or HTML `<img src=...>` file.

## Supported Module Types

Webpack supports the following module types natively:

- ECMAScript modules
- CommonJS modules
- AMD modules
- Assets
- WebAssembly modules

In addition to that webpack supports modules written in a variety of languages and preprocessors **via loaders**. **Loaders describe to webpack how to process non-native modules and include these dependencies into your bundles**. The webpack community has built loaders for a wide variety of popular languages and language processors, including:

- CoffeeScript
- TypeScript
- ESNext (Babel)
- Sass
- Less
- Stylus
- Elm

And many others! Overall, webpack provides a powerful and rich API for customization that allows one to use webpack for **any stack**, while staying **non-opinionated** about your development, testing, and production workflows.
当然还有更多！总得来说，webpack 提供了可定制，强大且丰富的 API，允许在 **任何技术栈** 中使用，同时支持在开发、测试和生产环境的工作流中做到 **无侵入性**。

For a full list, see the [list of loaders](https://webpack.js.org/loaders) or [write your own](https://webpack.js.org/api/loaders).

## Further Reading

- [JavaScript Module Systems Showdown](https://auth0.com/blog/javascript-module-systems-showdown/)
