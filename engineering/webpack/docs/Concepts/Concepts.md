# Concepts

At its core, **webpack** is a **`static` module bundler** for modern JavaScript applications. When webpack processes your application, it internally builds a **dependency graph** from one or more entry points and then combines every module your project needs into one or more bundles, which are static assets to serve your content from.

To get started you only need to understand its **Core Concepts**:

- Entry
- Output
- Loaders
- Plugins
- Mode
- Browser Compatibility

## Entry

An entry point indicates which module webpack should use to begin building out its internal dependency graph. Webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

## Output

The output property tells webpack where to emit the bundles it creates and how to name these files. It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

## Loaders

Out of the box, webpack only understands `JavaScript` and `JSON` files. Loaders allow webpack to process other types of files and convert them into valid modules that can be consumed by your application and added to the dependency graph.

At a high level, loaders have two properties in your webpack configuration:

- The `test` property identifies which file or files should be transformed.
- The `use` property indicates which loader should be used to do the transforming.

This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to _transform it before you add it to the bundle_."

## Plugins

**While loaders are used to transform certain types of modules**, **plugins can be leveraged to perform a wider range of tasks like `bundle optimization`, `asset management` and `injection of environment variables`**.

## Mode

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimizations that correspond to each environment. The default value is `production`.

## Browser Compatibility

Webpack supports all browsers that are **ES5-compliant** (IE8 and below are not supported). Webpack needs `Promise` for `import()` and `require.ensure()`. If you want to support older browsers, you will need to `load a polyfill` before using these expressions.

## Resources

- [Manually Bundling an Application](https://www.youtube.com/watch?v=UNMkLHzofQI)
- [Live Coding a Simple Module Bundler](https://www.youtube.com/watch?v=Gc9-7PBqOC8)
- [Detailed Explanation of a Simple Module Bundler](https://github.com/ronami/minipack)
