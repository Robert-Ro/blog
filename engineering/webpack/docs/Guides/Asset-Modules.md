# Asset Modules

Asset Modules allow one to use asset files (`fonts`, `icons`, etc) _without configuring additional loaders_.

Prior to webpack 5 it was common to use:

- `raw-loader` to import a file as a string
- `url-loader` to inline a file into the bundle as a data URI
- `file-loader` to emit a file into the output directory

Asset Modules types replace all of these loaders by adding 4 new module types:

- `asset/resource` emits a separate file and exports the URL. Previously achievable by using `file-loader`.
- `asset/inline` exports a data URI of the asset. Previously achievable by using `url-loader`.
- `asset/source` exports the source code of the asset. Previously achievable by using `raw-loader`.
- `asset` automatically chooses between exporting a data URI and emitting a separate file. Previously achievable by using `url-loader` with asset size limit.

When using the old assets loaders (i.e. `file-loader`/`url-loader`/`raw-loader`) along with Asset Modules in webpack 5, you might want to stop Asset Modules from processing your assets again as that would result in asset duplication. This can be done by setting the asset's module type to `'javascript/auto'`.

## Resource assets

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
}
```

### Custom output filename

By default, `asset/resource` modules are emitting with `[hash][ext][query]` filename into output directory.

You can modify this template by setting [output.assetModuleFilename](https://webpack.js.org/configuration/output/#outputassetmodulefilename) in your webpack configuration:

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
    ],
  },
}
```

Another case to **customize output filename** is to emit some kind of assets to a specified directory:

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.png/,
        type: 'asset/resource',
      },
      {
        test: /\.html/,
        type: 'asset/resource',
        generator: {
          filename: 'static/[hash][ext][query]', // <-
        },
      },
    ],
  },
}
```

With this configuration all the `html` files will be emitted into a `static` directory within the output directory.

`Rule.generator.filename` is the same as `output.assetModuleFilename` and works only with `asset` and `asset/resource` module types.

## Inlining assets

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },
}
```

```js
import metroMap from './images/metro.svg'

block.style.background = `url(${metroMap})` // url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDo...vc3ZnPgo=)
```

All `.svg` files will be injected into the bundles as data URI.

### Custom data URI generator

By default, data URI emitted by webpack represents file contents encoded by using **Base64** algorithm.

If you want to **use a custom encoding algorithm**, you may specify a custom function to encode a file content:

```js
const path = require('path')
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => {
            // <- custom encoding algorithm
            content = content.toString()
            return svgToMiniDataURI(content)
          },
        },
      },
    ],
  },
}
```

Now all `.svg` files will be encoded by `mini-svg-data-uri` package.

## Source assets

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset/source',
      },
    ],
  },
}
```

## URL assets

When using `new URL('./path/to/asset', import.meta.url)`, webpack creates an asset module too.

```js
const logo = new URL('./logo.svg', import.meta.url)
```

Depending on the **target** in your configuration, webpack would compile the above code into a different result:

```js
// target: web
new URL(__webpack_public_path__ + 'logo.svg', document.baseURI || self.location.href)

// target: webworker
new URL(__webpack_public_path__ + 'logo.svg', self.location)

// target: node, node-webkit, nwjs, electron-main, electron-renderer, electron-preload, async-node
new URL(__webpack_public_path__ + 'logo.svg', require('url').pathToFileUrl(__filename))
```

As of webpack 5.38.0, `Data URLs` are supported in `new URL()` as well:

```js
const url = new URL('data:,', import.meta.url)
console.log(url.href === 'data:,')
console.log(url.protocol === 'data:')
console.log(url.pathname === ',')
```

## General asset type

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
      },
    ],
  },
}
```

Now webpack **will automatically choose** between `resource` and `inline` by following a default condition: _a file with size less than 8kb will be treated as a inline module type_ and resource module type otherwise.

You can change this condition by setting a `Rule.parser.dataUrlCondition.maxSize` option on the module rule level of your webpack configuration:

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.txt/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb
          },
        },
      },
    ],
  },
}
```

Also you can [specify a function](https://webpack.js.org/configuration/module/#ruleparserdataurlcondition) to decide to inlining a module or not.

## Replacing Inline Loader Syntax

Before Asset Modules and Webpack 5, it was possible to use [inline syntax](https://webpack.js.org/concepts/loaders/#inline) with the legacy loaders mentioned above.

It is **now recommended to remove all inline loader syntax and use a resourceQuery condition to mimic the functionality of the inline syntax**.

For example, in the case of replacing `raw-loader` with `asset/source` type:

```js
// import myModule from 'raw-loader!my-module';
 import myModule from 'my-module?raw';

module: {
    rules: [
    // ...
     {
       resourceQuery: /raw/,
       type: 'asset/source',
     }
    ]
  },
```

and if you'd like to exclude raw assets from being processed by other loaders, use a negative condition:

```js
module.exports = {
    module: {
    rules: [
    // ...
     {
       test: /\.m?js$/,
       resourceQuery: { not: [/raw/] },
       use: [ ... ]
     },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      }
    ]
  }
}
```

or a `oneOf` list of rules. Here only the first matching rule will be applied:

```js
module: {
    rules: [
    // ...
     { oneOf: [
        {
          resourceQuery: /raw/,
          type: 'asset/source',
        },
       {
         test: /\.m?js$/,
         use: [ ... ]
       },
     ] }
    ]
  },
```

## Disable emitting assets

For use cases like Server side rendering, you might want to disable emitting assets, which is feasible with `emit` option under `Rule.generator`:

```js
module.exports = {
  // …
  module: {
    rules: [
      {
        test: /\.png$/i,
        type: 'asset/resource',
        generator: {
          emit: false,
        },
      },
    ],
  },
}
```

## Further Reading

- [webpack 5 - Asset Modules](https://dev.to/smelukov/webpack-5-asset-modules-2o3h)
