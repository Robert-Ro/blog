# Asset Management

webpack will dynamically bundle all dependencies (creating what's known as a dependency graph). This is great because every module now explicitly states its dependencies and we'll avoid bundling modules that aren't in use.

One of the coolest webpack features is that you can also include any other type of file, besides JavaScript, for which there is a loader or **built-in Asset** Modules support. This means that the same benefits listed above for JavaScript (e.g. explicit dependencies) can be applied to everything used in building a website or web app.

## Loading Images

```js
;[
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
]
```

## Loading Fonts

```js
;[
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
]
```

## Loading Data

```js
;[
  {
    test: /\.(csv|tsv)$/i,
    use: ['csv-loader'],
  },
  {
    test: /\.xml$/i,
    use: ['xml-loader'],
  },
]
```

## Customize parser of JSON modules

```js
const toml = require('toml')
const yaml = require('yamljs')
const json5 = require('json5')

const rules = [
  {
    test: /\.toml$/i,
    type: 'json',
    parser: {
      parse: toml.parse,
    },
  },
  {
    test: /\.yaml$/i,
    type: 'json',
    parser: {
      parse: yaml.parse,
    },
  },
  {
    test: /\.json5$/i,
    type: 'json',
    parser: {
      parse: json5.parse,
    },
  },
]
```

## Global Assets

manage Assets directory like:

```
 |– /components
 |  |– /my-component
 |  |  |– index.jsx
 |  |  |– index.css
 |  |  |– icon.svg
 |  |  |– img.png
```
