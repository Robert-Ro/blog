# 解析 Webpack 源码，实现自己的构建工具

我们独辟蹊径，从 Webpack 的实现入手，帮助你构建一个自己的工程化工具

## Webpack 的初心和揭秘

> 我不建议对着 Webpack 源码讲解，因为 Webpack 是一个庞大的体系，其源码逐行讲解太过枯燥，真正能转化在技术积累上的内容较少

Webpack 的介绍只有简单一句：

> Webpack is a static module bundler for modern JavaScript applications.

虽然 Webpack 看上去无所不能，但从其本质上来说，Webpack 实质就是一个“前端模块打包器”。前端模块打包器做的事情很简单：**它帮助开发者将 JavaScript 模块（各种类型的模块化规范）打包为一个或多个 JavaScript 脚本文件**。

我们回到最初起源，前端为什么需要一个模块打包器呢？其实理由很简单：

- 不是所有浏览器都直接支持 JavaScript 规范；
- 前端需要管理依赖脚本，把控不同脚本加载的顺序；
- 前端需要按顺序加载不同类型的静态资源。

打包需要注意几点：

- 随着 HTTP/2 技术的推广，未来长远上看，浏览器像上述代码一样发送多个请求不再是性能瓶颈，但目前来看还过于乐观（更多内容参见 [HTTP/2 简介](https://developers.google.com/web/fundamentals/performance/http2/)）；
- **并不是将所有脚本都打包在一起就是性能最优**，`/dist/bundle.js` 的 size 一般较大，但这属于另外“性能优化”话题了，相关内容，我们在 10 讲“代码拆分和按需加载：缩减 bundle size，把性能做到极致”中已有涉及。

## Resources

- [解析 Webpack 源码，实现自己的构建工具](https://kaiwu.lagou.com/course/courseInfo.htm?courseId=584#/detail/pc?id=5919)
