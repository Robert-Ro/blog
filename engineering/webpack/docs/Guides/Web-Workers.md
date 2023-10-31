# Web Workers

As of webpack 5, you can use [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) without [worker-loader](https://github.com/webpack-contrib/worker-loader).

## Syntax

```js
new Worker(new URL('./worker.js', import.meta.url))

// or customize the chunk name with magic comments
// see https://webpack.js.org/api/module-methods/#magic-comments
new Worker(/* webpackChunkName: "foo-worker" */ new URL('./worker.js', import.meta.url))
```

## Example

```js
// src/index.js
const worker = new Worker(new URL('./deep-thought.js', import.meta.url))
worker.postMessage({
  question: 'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
})
worker.onmessage = ({ data: { answer } }) => {
  console.log(answer)
}
// src/deep-thought.js

self.onmessage = ({ data: { question } }) => {
  self.postMessage({
    answer: 42,
  })
}
```

## Node.js

Similar syntax is supported in Node.js (>= 12.17.0):

```js
import { Worker } from 'worker_threads'

new Worker(new URL('./worker.js', import.meta.url))
```

Note that this is only available in ESM. `Worker` in CommonJS syntax is not supported by either webpack or Node.js.
