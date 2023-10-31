# TypeScript

`TypeScript` is a typed superset of JavaScript that compiles to plain JavaScript. In this guide we will learn how to integrate TypeScript with webpack.

## Basic Setup

```shell
npm install --save-dev typescript ts-loader
```

create `tsconfig.json`

```js
const path = require('path')

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader', // <-
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
```

> To make imports do this by default and keep `import _ from 'lodash';` syntax in TypeScript, set `"allowSyntheticDefaultImports" : true` and `"esModuleInterop" : true` in your `tsconfig.json` file. This is related to TypeScript configuration and mentioned in our guide only for your information.

## Loader

We use `ts-loader` in this guide as it makes enabling additional webpack features, such as importing other web assets, a bit easier.

> `ts-loader` uses `tsc`, the TypeScript compiler, and relies on your `tsconfig.json` configuration. Make sure to avoid setting `module` to "CommonJS", or webpack won't be able to [tree-shake your code](https://webpack.js.org/guides/tree-shaking).

Note that if you're already using `babel-loader` to transpile your code, you can use `@babel/preset-typescript` and let Babel handle both your JavaScript and TypeScript files instead of using an additional loader. Keep in mind that, contrary to `ts-loader`, the underlying `@babel/plugin-transform-typescript` plugin **does not perform any type checking 不执行类型检查**.

## Source Maps

## Client types

It's possible to use webpack specific features in your TypeScript code, such as `import.meta.webpack`. And webpack provides types for them as well, just add a TypeScript `reference` directive to declare it:

```js
/// <reference types="webpack/module" />
console.log(import.meta.webpack) // without reference declared above, TypeScript will throw an error
```

## Using Third Party Libraries

## Importing Other Assets

To use non-code assets with TypeScript, we need to defer the type for these imports. This requires a `custom.d.ts` file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for `.svg` files:

```ts
declare module '*.svg' {
  const content: any
  export default content
}
```
