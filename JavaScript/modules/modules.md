modules Objects:

```js
// nodejs exec runtime: local scopes + global scopes

const local = {
  // variables
  exports: {}, // object
  module: {
    children: [],
    exports: [],
    filename: '',
    id: '',
    loaded: false, //boolean
    parent: null,
    path: '', // directories
    paths: [], // possibile node_modules
  },
  require: function () {}, // funtion, nodejs加载模块机制
  this: {},
  __dirname: '', //current exected file's directory
  __filename: '', // current exected file
}
```
