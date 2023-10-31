# Production

In this guide, we'll dive into some of the **best practices** and utilities for building a production site or application.

## Setup

The goals of _development_ and _production_ builds differ greatly. In _development_, we want strong source mapping and a localhost server with live reloading or hot module replacement. In _production_, our goals shift to a focus on **minified bundles**, **lighter weight source maps**, and **optimized assets** to improve load time. With this logical separation at hand, we typically recommend writing **separate webpack configurations** for each environment.

While we will separate the _production_ and _development_ specific bits out, _note that we'll still maintain a "common" configuration to **keep things DRY**_. In order to merge these configurations together, we'll use a utility called [webpack-merge](https://github.com/survivejs/webpack-merge). With the "common" configuration in place, we won't have to duplicate code within the environment-specific configurations.

Let's start by installing `webpack-merge` and splitting out the bits we've already worked on in previous guides:

```shell
npm install --save-dev webpack-merge
```

project

```shell
  webpack-demo
  |- package.json
  |- package-lock.json
 |- webpack.common.js
 |- webpack.dev.js
 |- webpack.prod.js
  |- /dist
  |- /src
    |- index.js
    |- math.js
  |- /node_modules
```

> 配置略

In `webpack.common.js`, we now have setup our `entry` and `output` configuration and we've included any plugins that are required for both environments. In `webpack.dev.js`, we've set `mode` to `development`. Also, we've added the recommended `devtool` for that environment (**strong source mapping**), as well as our devServer configuration. Finally, in `webpack.prod.js`, mode is set to production which loads [`TerserPlugin`](https://webpack.js.org/plugins/terser-webpack-plugin/), which was first introduced by the [tree shaking](https://webpack.js.org/guides/tree-shaking/) guide.

Note the use of `merge()` calls in the environment-specific configurations to include our common configuration in `webpack.dev.js` and `webpack.prod.js`. The webpack-merge tool offers a variety of advanced features for merging but for our use case we won't need any of that.

## NPM Scripts

```shell
 "build": "webpack --config webpack.prod.js"
```

## Specify the Mode

Many libraries will key off the `process.env.NODE_ENV` variable to determine what should be included in the library. For example, when `process.env.NODE_ENV` is not set to `'production'` some libraries may add additional logging and testing to make debugging easier. However, with `process.env.NODE_ENV` set to `'production'` they might drop or add significant portions of code to optimize how things run for your actual users. Since webpack v4, specifying mode automatically configures `process.env.NODE_ENV` for you through [`DefinePlugin`](https://github.com/webpack/webpack/blob/fcccd192ce550210186f84a7ca59ee4cd47a8b2d/lib/WebpackOptionsApply.js#L565):

> Thus, conditionals like `process.env.NODE_ENV === 'production' ? '[name].[contenthash].bundle.js' : '[name].bundle.js'` won't work in webpack configurations unless you specify `NODE_ENV` explicitly with `NODE_ENV=production` through CLI.

## Minification

Webpack v4+ will minify your code by default in `production mode`.

Note that while the `TerserPlugin` is a great place to start for minification and being used by default, there are other options out there:

- [ClosureWebpackPlugin](https://github.com/webpack-contrib/closure-webpack-plugin)

If you decide to try another minification plugin, make sure your new choice also drops dead code as described in the [tree shaking](https://webpack.js.org/guides/tree-shaking) guide and provide it as the [optimization.minimizer](https://webpack.js.org/configuration/optimization/#optimizationminimizer).

## Source Mapping

**We encourage you to have source maps enabled in production, as they are useful for debugging as well as running benchmark tests**. That said, you should choose one with a fairly quick build speed that's recommended for production use (see `devtool`). For this guide, we'll use the `source-map` option in the production as opposed to the `inline-source-map` we used in the development:

> Avoid `inline-***` and `eval-***` use in production as they can increase bundle size and reduce the overall performance.

> Recommend: `hidden-sources-map`

## Minimize CSS

It is crucial to minimize your CSS for production. Please see the [Minimizing for Production](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production) section.

## CLI Alternatives

Many of the options described above can be set as command line arguments. For example, `optimization.minimize` can be set with `--optimization-minimize`, and `mode` can be set with `--mode`. Run `npx webpack --help=verbose` for a full list of CLI arguments.

While these shorthand methods are useful, **we recommend setting these options in a webpack configuration file for more configurability**.
