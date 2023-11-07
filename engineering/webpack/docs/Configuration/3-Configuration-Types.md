# Configuration Types

Besides exporting a single configuration object, there are a few more ways that cover other needs as well.

## Exporting a Function

Eventually you will find the need to disambiguate in your `webpack.config.js` between `development` and `production` builds. There are multiple ways to do that. One option is to export a function from your webpack configuration instead of exporting an object. The function will be invoked with two arguments:

- An environment as the first parameter. See the [environment options CLI documentation](https://webpack.js.org/api/cli/#environment-options) for syntax examples.
- An options map (`argv`) as the second parameter. This describes the options passed to webpack, with keys such as [`output-path`](https://webpack.js.org/api/cli/#flags) and [`mode`](https://webpack.js.org/api/cli/#flags).

```js
module.exports = function (env, argv) {
  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'eval',
    plugins: [
      new TerserPlugin({
        terserOptions: {
          compress: argv.mode === 'production', // only if `--mode production` was passed
        },
      }),
    ],
  }
}
```

## Exporting a Promise

Webpack will run the function exported by the configuration file and wait for a Promise to be returned. Handy when you need to asynchronously load configuration variables.

> It is possible to export multiple promises by wrapping them into `Promise.all([/* Your promises */])`.

```js
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        entry: './app.js',
        /* ... */
      })
    }, 5000)
  })
}
```

> Returning a `Promise` only works when using webpack via CLI. [`webpack()`](https://webpack.js.org/api/node/#webpack) expects an object.

## Exporting multiple configurations✨✨✨

Instead of exporting a single configuration object/function, you may export multiple configurations (multiple functions are supported since webpack 3.1.0). When running webpack, all configurations are built. For instance, this is useful for `bundling a library` for multiple `targets` such as `AMD` and `CommonJS`:

```js
module.exports = [
  {
    output: {
      filename: './dist-amd.js',
      libraryTarget: 'amd',
    },
    name: 'amd',
    entry: './app.js',
    mode: 'production',
  },
  {
    output: {
      filename: './dist-commonjs.js',
      libraryTarget: 'commonjs',
    },
    name: 'commonjs',
    entry: './app.js',
    mode: 'production',
  },
]
```

> If you pass a name to `--config-name` flag, webpack will only build that specific configuration.

### dependencies

In case you have a configuration that depends on the output of another configuration, you can specify a list of dependencies using the [dependencies](https://webpack.js.org/configuration/other-options/#dependencies) array.

```js
// webpack.config.js
module.exports = [
  {
    name: 'client',
    target: 'web',
    // …
  },
  {
    name: 'server',
    target: 'node',
    dependencies: ['client'],
  },
]
```

### parallelism

In case you export multiple configurations, you can use the `parallelism` option on the configuration array to **specify the maximum number of compilers that will compile in parallel**.

```js
// webpack.config.js
module.exports = [
  {
    //config-1
  },
  {
    //config-2
  },
]
module.exports.parallelism = 1
```
