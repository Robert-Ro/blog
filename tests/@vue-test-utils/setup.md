base on `jest`

## use `vue-jest`

with `vue-jest` transform `.vue` file

```json
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      // tell Jest to handle `*.vue` files
      "vue"
    ],
    "transform": {
      // process `*.vue` files with `vue-jest`
      ".*\\.(vue)$": "vue-jest"
    }
  }
}
```

## use babel

```sh
npm install --save-dev babel-jest @babel/core @babel/preset-env babel-core@^7.0.0-bridge.0
```

```json
{
  "jest": {
    "transform": {
      // process `*.js` files with `babel-jest`
      ".*\\.(js)$": "babel-jest"
    }
  }
}
```

`babel.config.json`

```json
{
  "presets": ["@babel/preset-env"]
}
```

## Handling webpack aliases

```json
{
  "jest": {
    // support the same @ -> src alias mapping in source code
    "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
    }
  }
}
```

## Using other Test runners

[link](https://v1.test-utils.vuejs.org/installation/#using-other-test-runners)
