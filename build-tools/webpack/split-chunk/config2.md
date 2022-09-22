## add async code

### cache groups

```
Entrypoint pageA = commons-pageA-pageB-pageC.js vendor.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js vendor.js commons-pageB-pageC.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[./async1.js] 87 bytes {0} [built]
[./async2.js] 87 bytes {1} [built]
[./node_modules/vendor1.js] 51 bytes {vendor} [built]
[./node_modules/vendor2.js] 51 bytes {vendor} [built]
[./pageA.js] 210 bytes {pageA} [built]
[./pageB.js] 152 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {pageA} [built]
[./utility2.js] 53 bytes {commons-pageA-pageB-pageC} [built]
[./utility3.js] 53 bytes {commons-pageB-pageC} [built]
```

utility1.js 同时被 pageA.js，async1.js，async2.js 三个模块引用，照理应该命中 commons 缓存组的规则，从而被单独提取成一个 chunk，然而结果是它依然打包在 pageA.js 中。这是因为 async1.js，async2.js 都是 pageA.js 的懒加载模块，而 pageA.js 同步引用了 utility1.js，所以在加载 async1.js，async2.js 时 utility1.js 已经有了，直接拿来用即可，所以就没必要提出一个新的 chunk，白白增加一个请求。

- async code move to pageB

```
Entrypoint pageA = 0.js commons-pageA-pageB-pageC.js vendor.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js vendor.js commons-pageB-pageC.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[./async1.js] 87 bytes {1} [built]
[./async2.js] 87 bytes {2} [built]
[./node_modules/vendor1.js] 51 bytes {vendor} [built]
[./node_modules/vendor2.js] 51 bytes {vendor} [built]
[./pageA.js] 216 bytes {pageA} [built]
[./pageB.js] 210 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {0} [built]
[./utility2.js] 53 bytes {commons-pageA-pageB-pageC} [built]
[./utility3.js] 53 bytes {commons-pageB-pageC} [built]
```

发现多了一个 chunk，utility1.js 被单独提取到了 0.js 中，且属于 commons 缓存组。将按需加载代码从 pageA.js 移到 pageB.js 后，因为 pageB 和 pageA 并行，没有依赖关系，所以 async1.js 和 async2.js 需要单独加载 utility1.js 模块，又因为 commons 缓存组 chunks=all，所以 async1.js，async2.js 和 pageA.js 的公共模块 utility1.js 会被单独提取。

我们想把数字 id 名称变成有意义的名称，可以使用 webpack 的 magic comments，把 pageB.js 改为:

```js
import(/* webpackChunkName: "async1" */ './async1')
import(/* webpackChunkName: "async2" */ './async2')
```

```
Entrypoint pageA = commons-async1-async2-pageA.js commons-pageA-pageB-pageC.js vendor.js pageA.js
Entrypoint pageB = commons-pageA-pageB-pageC.js vendor.js commons-pageB-pageC.js pageB.js
Entrypoint pageC = commons-pageA-pageB-pageC.js commons-pageB-pageC.js pageC.js
[./async1.js] 87 bytes {async1} [built]
[./async2.js] 87 bytes {async2} [built]
[./node_modules/vendor1.js] 51 bytes {vendor} [built]
[./node_modules/vendor2.js] 51 bytes {vendor} [built]
[./pageA.js] 216 bytes {pageA} [built]
[./pageB.js] 274 bytes {pageB} [built]
[./pageC.js] 121 bytes {pageC} [built]
[./utility1.js] 89 bytes {commons-async1-async2-pageA} [built]
[./utility2.js] 53 bytes {commons-pageA-pageB-pageC} [built]
[./utility3.js] 53 bytes {commons-pageB-pageC} [built]
```
