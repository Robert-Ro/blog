# Targets

Because JavaScript can be written for both server and browser, webpack offers multiple deployment targets that you can set in your webpack [configuration](https://webpack.js.org/configuration).

> The webpack `target` property is not to be confused with the `output.libraryTarget` property. For more information see our guide on the output property.

## Usage

To set the `target` property, you set the target value in your webpack config:

```js
module.exports = {
  target: 'node',
}
```

In the example above, using `node` webpack will compile for usage in a Node.js-like environment (uses Node.js `require` to load chunks and not touch any built in modules like `fs` or `path`).

Each target has a variety of deployment/environment specific additions, support to fit its needs. See what [targets are available](https://webpack.js.org/configuration/target/).

> node, web, electron, nwjs, webworker 等

## Multiple Targets

Although webpack does **not** support multiple strings being passed into the `target` property, you can create an `isomorphic(同构)` library by bundling two separate configurations:

```js
const path = require('path')
const serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js',
  },
  //…
}

const clientConfig = {
  target: 'web', // <=== can be omitted as default is 'web'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js',
  },
  //…
}

module.exports = [serverConfig, clientConfig]
```

The example above will create a `lib.js` and `lib.node.js` file in your `dist` folder.

## Resources

As seen from the options above, there are multiple deployment targets that you can choose from. Below is a list of examples and resources that you can refer to.

- [compare-webpack-target-bundles](https://github.com/TheLarkInn/compare-webpack-target-bundles): A great resource for testing and viewing different webpack targets. Also great for bug reporting.
- [Boilerplate of Electron-React Application](https://github.com/chentsulin/electron-react-boilerplate): A good example of a build process for electron's main process and renderer process.
