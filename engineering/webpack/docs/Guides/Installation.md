# Installation

This guide goes through the various methods used to install webpack.

## Local Installation

```shell
npm install --save-dev webpack
# or specific version
npm install --save-dev webpack@<version>
```

If you're using webpack v4 or later and want to call `webpack` from the command line, you'll also need to install the CLI.

```shell
npm install --save-dev webpack-cli
```

```js
"scripts": {
  "build": "webpack --config webpack.config.js"
}
```

## Global Installation

> not recommended practice

## Bleeding Edge

If you are enthusiastic about using the latest that webpack has to offer, you can install beta versions or even directly from the webpack repository using the following commands:

```shell
npm install --save-dev webpack@next
# or a specific tag/branch
npm install --save-dev webpack/webpack#<tagname/branchname>
```
