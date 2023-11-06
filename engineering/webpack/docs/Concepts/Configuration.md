# Configuration

You may have noticed that few webpack configurations look exactly alike. This is because **webpack's configuration file is a JavaScript file that exports a webpack [configuration](https://webpack.js.org/configuration/)**. This configuration is then processed by webpack based upon its defined properties.

Because it's a **standard Node.js CommonJS module**, you _can do the following_:

- Import other files via `require(...)`
- use utilities on npm via `require(...)`
- use JavaScript control flow expressions, e.g. the `?:` operator
- use constants or variables for often used values
- write and execute functions to generate a part of the configuration

Use these features when appropriate.

While they are technically feasible, **the following practices should be avoided**:

- Access CLI arguments, when using the webpack CLI (instead write your own CLI, or [use `--env`](https://webpack.js.org/api/cli/#env))
- Export non-deterministic values (calling webpack twice should result in the same output files)
- Write long configurations (instead split the configuration into multiple files)

> The most important part to take away from this document is that there are many different ways to format and style your webpack configuration. The key is to stick with something consistent that you and your team can understand and maintain.

The examples below describe how webpack's configuration can be both expressive and configurable because _it is code_:

## Introductory Configuration

```js
// webpack.config.js

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
}
```

See: [Configuration section](https://webpack.js.org/configuration/) for all supported configuration options

## Multiple Targets

Along with exporting a single configuration as an object, `function` or `Promise`, you can export multiple configurations.

See: [Exporting multiple configurations](https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations)

## Using other Configuration Languages

Webpack accepts configuration files written in multiple programming and data languages.

See: [Configuration Languages](https://webpack.js.org/configuration/configuration-languages/)