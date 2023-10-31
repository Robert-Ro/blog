# Lazy Loading

Lazy, or "on demand", loading is a great way to optimize your site or application. This practice essentially involves splitting your code at logical breakpoints, and then loading it once the user has done something that requires, or will require, a new block of code. This speeds up the initial load of the application and lightens its overall weight as some blocks may never even be loaded.
懒加载或者按需加载，是一种很好的优化网页或应用的方式。这种方式实际上是先把你的代码在一些逻辑断点处分离开，然后在一些代码块中完成某些操作后，立即引用或即将引用另外一些新的代码块。这样加快了应用的初始加载速度，减轻了它的总体体积，因为某些代码块可能永远不会被加载。

## Example

Let's try something different. We'll add an interaction to log some text to the console when the user clicks a button. However, we'll wait to load that code (print.js) until the interaction occurs for the first time. To do this we'll go back and rework the final Dynamic Imports example from Code Splitting and leave lodash in the main chunk.

```js
import _ from 'lodash'

function component() {
  const element = document.createElement('div')
  const button = document.createElement('button')
  const br = document.createElement('br')

  button.innerHTML = 'Click me and look at the console!'
  element.innerHTML = _.join(['Hello', 'webpack'], ' ')
  element.appendChild(br)
  element.appendChild(button)

  // Note that because a network request is involved, some indication
  // of loading would need to be shown in a production-level site/app.
  button.onclick = (e) =>
    import(/* webpackChunkName: "print" */ './print').then((module) => {
      const print = module.default

      print()
    })

  return element
}

document.body.appendChild(component())
```

Now let's run webpack and check out our new lazy-loading functionality:

```shell
...
          Asset       Size  Chunks                    Chunk Names
print.bundle.js  417 bytes       0  [emitted]         print
index.bundle.js     548 kB       1  [emitted]  [big]  index
     index.html  189 bytes          [emitted]
...
```

## Frameworks

Many frameworks and libraries have their own recommendations on how this should be accomplished within their methodologies. Here are a few examples:

- React: [Code Splitting and Lazy Loading](https://reactjs.org/docs/code-splitting.html)
- Vue: [Dynamic Imports in Vue.js for better performance](https://vuedose.tips/tips/dynamic-imports-in-vue-js-for-better-performance/)
- Angular: [Lazy Loading route configuration](https://angular.io/guide/router#milestone-6-asynchronous-routing) and [AngularJS + webpack = lazyLoad](https://medium.com/@var_bin/angularjs-webpack-lazyload-bb7977f390dd)

## Further Reading

- [Lazy Loading ES2015 Modules in the Browser](https://dzone.com/articles/lazy-loading-es2015-modules-in-the-browser)
- [Asynchronous vs Deferred JavaScript](https://bitsofco.de/async-vs-defer/)
