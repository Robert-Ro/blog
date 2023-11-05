# Output

Configuring the `output` configuration options tells **webpack how to write the compiled files to disk**. Note that, while there can be multiple `entry` points, only one `output` configuration is specified.

## Usage

The minimum requirement for the `output` property in your webpack configuration is to set its value to an object and provide an `output.filename` to use for the output file(s):

```js
module.exports = {
  output: {
    filename: 'bundle.js',
  },
}
```

This configuration would output a single `bundle.js` file into the `dist` directory.

## Multiple Entry Points

If your configuration creates more than a single "chunk" (as with multiple entry points or when using plugins like CommonsChunkPlugin), you should use [substitutions](https://webpack.js.org/configuration/output/#outputfilename) to ensure that each file has a unique name.

```js
module.exports = {
  entry: {
    app: './src/app.js',
    search: './src/search.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      // The [name] placeholder will be replaced with the entry name. Can also be a function e.g. (entryName) => entryName + '.html'.
      filename: (entryName) => entryName + '.html', // <- // TODO test
    }),
  ],
}
// writes to disk: ./dist/app.js, ./dist/search.js
```

## Advanced

Here's a more complicated example of using a CDN and hashes for assets:

```js
// config.js

module.exports = {
  //...
  output: {
    path: '/home/proj/cdn/assets/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',
  },
}
```

In cases where the eventual `publicPath` of output files isn't known at compile time, it can be left blank and set dynamically at runtime via the `__webpack_public_path__` variable in the entry point file:

```js
__webpack_public_path__ = myRuntimePublicPath

// NOTE html base attribute?

// rest of your application entry
```
