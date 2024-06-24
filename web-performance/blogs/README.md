# Reading Lists

- https://note.youdao.com/web/#/file/recent/note/wcp1718762790552947/ 方案性阐述及监控产品推荐
- https://note.youdao.com/web/#/file/recent/note/wcp1718762790552947/ 方案性阐述， [原文连接](https://www.freecodecamp.org/news/measure-and-improve-performance-of-react-apps/)
  - 拓展阅读：
  - https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster
  - https://www.freecodecamp.org/news/memoization-in-javascript-and-react/

## Small Bundles, Fast Pages: What To Do With Too Much JavaScript

#方案性阐述 #最佳实践

- https://note.youdao.com/web/#/file/recent/note/wcp1718762790552947/
- https://calibreapp.com/blog/bundle-size-optimization 原文链接
- max script size recommend: 300kb✨✨✨✨✨
- The new global baseline leaves space for **~100KiB** (gzipped) of HTML/CSS/fonts and **300-350KiB** of JavaScript on the wire (compressed).✨✨✨✨✨📌
- import cost plugin: 开发时大小分析
- Visualise what your bundles include：包大小可视化分析 ✨✨✨✨✨
- Look for smaller, alternative third-party libraries
- Dynamically load components and dependencies
  - Less initial script to load
  - A greater number of smaller requests loaded in parallel
  - Code that isn’t changed regularly can be cached long-term
- Prefer server-side rendering for primary content
- Lazy load third party resources with facades 第三方资源加载处理
  - Use dns-prefetching
- Deliver ES6 modules to up-to-date browsers✨✨✨✨✨
  - `type="module"`
  - `nomodule`
  - webpack 下如何落地
- Keep monitoring JavaScript size(持续性监控)✨✨✨✨✨
  - 如何落地

## Performance Budgets: The Easiest Way to a Faster Site

#方案性阐述 #最佳实践 #数据量化 #产品推荐

- https://note.youdao.com/web/#/file/recent/note/wcp1718762790552947/
- Once you set that goal 需要设置一个性能目标
  - 对照大厂产品
  - 内部产品需求
  - 秒开 ✨✨✨✨✨+优雅的过渡加载动画
- improved page speed is often a trade-off
- Which metrics should you track
  - **Largest Contentful Paint (LCP)**: How quickly users see your main content.
  - **Cumulative Layout Shift (CLS)**: How visually stable your page is for users.
  - **Total Blocking Time (TBT)**: How often and for how long does user input get blocked by long tasks.
  - **First Input Delay (FID)**: How long it takes before users can interact with the page.
  - **Time to First Byte (TTFB)**: How long users have to wait for the server to start downloading the page.
  - **Number of Third-Party Providers**: How many third-party providers are slowing down the loading process for the user.
  - **Total JavaScript Size in Bytes**: How much JavaScript a device needs to download, parse, compile, and execute to display your content; this is an excellent indicator of potentially poor experiences for users with slower devices.
- readling list
  - https://calibreapp.com/docs/get-started/guide#step-6-organise-work-with-teams
- Consider the best baseline for that metric 设定指标的基准值 ✨✨✨✨✨
- Track across multiple conditions
  - 多种网络状况
  - 多种设备
- Set up scheduling and responsibilities 持续监控
- https://calibreapp.com/tools/core-web-vitals-checker
  - 需要授权的网页如何监控呢 // TODO

## vite 拆包策略

- dynamic module: single chunk
- static module(**rollup manualChunks api**):
  - vendor chunk
  - initial chunk

### manualChunks

类似 webpack 下的 cacheGroup

chunk 的 hash 值也相对变化的不那么频繁

### 解决循环引用问题

借助[第三包 vite-plugin-chunk-split](https://github.com/sanyuan0704/vite-plugin-chunk-split)类似 webpack 的 split-chunk-plugin

- https://note.youdao.com/web/#/file/recent/note/wcp1718787979356159/
- https://cloud.tencent.com/developer/article/2357991
