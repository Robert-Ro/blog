# Temp
## Resouces
### 布局

- 一、CSS布局生成器:https://layout.bradwoods.io/customize
- 十、Layout patterns:https://web.dev/patterns/layout/
- 二、Riju:https://riju.codes/
- 三、Whirl:https://whirl.netlify.app/
- 四、Pikaday:https://pikaday.com/

- 五、Tailwind Components:https://tailwindcomponents.com/
- 六、Tail-Kit:https://www.tailwind-kit.com/
- 七、tidy.js:https://pbeshai.github.io/tidy/
- 八、party.js:https://party.js.org/
- 九、AI去背景:https://baseline.is/tools/background-remover/

## CS网课资源
- [UCB的CS61B](https://link.zhihu.com/?target=https%3A//inst.eecs.berkeley.edu/~cs61b/fa19/), 以java为主
- MIT的算法课，教程用的算法导论，[地址](https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3DHtSuA80QTyo%26list%3DPLUl4u3cNGP61Oq3tWYp6V_F-5jb5L2iHb)
- 然后就是红宝书的网课以及配套官网, [1](https://link.zhihu.com/?target=https%3A//algs4.cs.princeton.edu/lectures/), [2](https://link.zhihu.com/?target=https%3A//www.youtube.com/watch%3Fv%3D1QZDe28peZk%26list%3DPLRdD1c6QbAqJn0606RlOR6T3yUqFWKwmX)
- 斯坦福2018 Winter CS106B: Programming Abstractions, 使用c++，[地址](https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/av21620553%3Fp%3D1)
- edX: Introduction to Computer Science (计算机科学导论), [link](https://link.zhihu.com/?target=https%3A//www.edx.org/course/cs50s-introduction-to-computer-science)
- CS 61A: The Structure and Intrepretation of Computer Science, [link](https://link.zhihu.com/?target=https%3A//cs61a.org/)
- CS 61B: Data Structures, [link](https://link.zhihu.com/?target=https%3A//sp19.datastructur.es/)
- Coursera: Princeton Algorithm, [link](https://link.zhihu.com/?target=https%3A//www.coursera.org/learn/algorithms-part1)
- Introduction to Computer Systems (ICS), 经典教材CSAPP - Computer Systems: A Programmer's Perspective, [link](https://link.zhihu.com/?target=https%3A//www.cs.cmu.edu/~213/)
- 剑指 offer图解视频，[链接](https://link.zhihu.com/?target=https%3A//b23.tv/av82476697)
- [计算机网络微课堂](https://link.zhihu.com/?target=https%3A//www.bilibili.com/video/BV1c4411d7jb%3Fp%3D1)


## 1223
- ids byId的意思
## 1211
- [Gray Area on When to use Different Rendering Modes CSR, SSR, SSG](https://medium.com/@kirillIbrahim/gray-area-on-when-to-use-different-rendering-modes-csr-ssr-ssg-214a636a24a4)
## 1206
### Promise V8 源码分析
- [Promise V8 源码分析(一)](https://zhuanlan.zhihu.com/p/264944183)
- [Promise V8 源码分析(二)](https://zhuanlan.zhihu.com/p/329201628)
- [V8、Chrome、Node.js](https://www.zhihu.com/column/v8core)
### JavaScript与C++
- [Nodejs 如何获取 CPU 信息](https://zhuanlan.zhihu.com/p/234739164)
- [从os.cpus()来分析nodejs源码结构](https://segmentfault.com/a/1190000004334555)
- [深入 Nodejs 源码探究 CPU 信息的获取与利用率计算](https://zhuanlan.zhihu.com/p/126334155)
## 1202
- [有哪些必看的 JS 库？](https://www.zhihu.com/question/429436558)

没有吧，Vue 和 React 等主流框架的源码我基本都没读过，越好的框架越不需要使用者特地去读。但对于和 JS 相关的源码阅读，那肯定是工作里绕不开的。个人印象里比较深的有这些：

- 读 Node.js 和 Txiki 运行时的源码，参考它们的方式调 libuv 来搭 JS 的 event loop。
- 读 Skia 配套的 canvas2dcontext.js 源码，照着用 C++ 实现 Canvas 的 eclipse 方法。
- 读 QuickJS 配套的 quickjs-libc 源码，照着实现对 JS 原生 class 的封装。
- 读 Flutter Tool 的源码，把它调 Dart 编译服务的参数扒出来，编译出二进制 AST 文件自己用。
- 读 Three 的源码，学着它引入 WeakMap 解决纹理资源管理的问题。
- 读 Slate 富文本框架的源码，修它 IME 和选区的 bug（太多了修不完）。
- 读 Pica（基于 lanczos 的图片缩放库）的源码，解决它处理特殊尺寸图片报错的问题。
- 读 PBR 标准的 shader 源码，照着定制 3D 文字的渲染算法。
- 读 Photopea 的 shader 源码（需要 monkey-patch 一下），看它是怎么在 WebGL 和 canvas 之间无缝切换的。

读这些源码的经历，都源于实际需求中的需要。我其实并没有靠读源码精通上面任何一个项目，但可以用它们解决遇到的问题，这就够了。

对于源码，个人还是倾向于「一定要会读，但能不读就不读」。对于常见生态足够好的开源项目，教程、示例、设计文档和 issue 讨论足够解决大多数使用层面上的问题。如果想高效学习技术，一定要尽可能找到最高层面，最易于理解的信息源。比如对于和 Chromium、V8 等谷歌系项目深度绑定的 Ninja 构建系统，我之前一直搞不懂它为什么要做成那样，直到偶然读到[作者自述的设计理念](http://aosabook.org/en/posa/ninja.html)以后，一下就豁然开朗了。这比上来就翻它的源码然后苦思冥想地倒推「这玩意到底想干嘛」要直接而方便得多。

毕竟某种程度上，读源码也是一种逆向工程，只应该在必要的时候去做。

## 1107
- [前端组件化埋点实践](https://zhuanlan.zhihu.com/p/270189082)
- [一篇看完2020年CSS的24个新特性](https://zhuanlan.zhihu.com/p/267381937)
- [「划线高亮」和「插入笔记」—— 不止是前端知识点](https://zhuanlan.zhihu.com/p/225773857)
- [前端中台化，把格局做大——NodeJS 和测试服务探索](https://zhuanlan.zhihu.com/p/265729825)
- [为知乎增加注释](https://zhuanlan.zhihu.com/p/252615892)
- [精读《React Hooks》](https://zhuanlan.zhihu.com/p/49408348)
- [React源码，你在第几层](https://www.bilibili.com/video/BV1Ki4y1u7Vr)
- [python principles](https://www.google.com/search?q=python+principles&newwindow=1&source=lnms&tbm=vid&sa=X&biw=1440&bih=709)
- [Python3 入门教程 2020全新版](https://www.imooc.com/learn/1261)
## 1022
- [Antd-Design 解析](https://juejin.im/post/6850418112680951815),目录结构分析
- [rc-utils](https://github.com/react-component/util), react工具库
## 1019
### scroll
- [JS滚轮事件(mousewheel/DOMMouseScroll)了解](https://www.zhangxinxu.com/wordpress/2013/04/js-mousewheel-dommousescroll-event/)
- [滚动的特性](https://www.w3cplus.com/javascript/scroll-to-the-future-modern-javascript-css-scrolling-implementations.html)
- [滑向未来（现代 JavaScript 与 CSS 滚动实现指南）](https://www.zcfy.cc/article/scroll-to-the-future),译文
- [Scroll
to the future](https://evilmartians.com/chronicles/scroll-to-the-future-modern-javascript-css-scrolling-implementations),原文
## 1012
- [戴克斯特拉算法](https://zh.wikipedia.org/wiki/%E6%88%B4%E5%85%8B%E6%96%AF%E7%89%B9%E6%8B%89%E7%AE%97%E6%B3%95), 最短路径问题
## 1010
### React Native infrastructure
- [An In-depth Look Inside React Native](https://levelup.gitconnected.com/wait-what-happens-when-my-react-native-application-starts-an-in-depth-look-inside-react-native-5f306ef3250f)
- [React Native's re-architecture in 2020](https://medium.com/swlh/react-natives-re-architecture-in-2020-9bb82659792c)
## 0919
- dva内部实现
- umi内部实现
- ts+axios  =>类似retrofit
## 0915
- https://github.com/Airkro/shaking
- 模块加载
- webpackloader
## 0914
- [Ant Design 4.0 的一些杂事儿 - VirtualList 篇](https://zhuanlan.zhihu.com/p/237996796)
## 0912
- context
- rebder props
- Object.is
## 0911
```
"search.exclude": {
        "**/node_modules": true,
        "dist": true,
        "yarn.lock": true
    },
    // 指定哪些文件不被 VSCode 监听，预防启动 VSCode 时扫描的文件太多，导致 CPU 占用过高
    "files.watcherExclude": {
        "**/.git/objects/**": true,
        "**/.git/subtree-cache/**": true,
        "**/node_modules/*/**": true,
        "**/dist/**": true
    },
```
## 0907
### 拓展阅读
- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
- [Typescript Generics Explained](https://medium.com/@rossbulat/typescript-generics-explained-15c6493b510f)
- [useEffect 完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
## 9001
- ~~JavaScript异步编程训练~~
- 前端微专业react高阶组件练习
- 前端工程化知识整理
- ~~仿Reactkit加载首页JavaScript资源显示进度条~~(单个资源文件)
### 关注动画
- Ant Motion库
- animate.css
- bootstrap，学习命名规则

## 0830
- [WebAPI接口参考](https://developer.mozilla.org/zh-CN/docs/Web/API)
    - [文档对象模型 (DOM)](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)
    - [CSS Object Model](https://developer.mozilla.org/zh-CN/docs/Web/API/CSS_Object_Model)
## 0816
- 查看热替换的Loader的依赖
## 0810
- [React 事件 | 1. React 中的事件委托](https://zhuanlan.zhihu.com/p/165089379)，理解合成事件，方便处理快捷键
## 0808
- [聊聊开发富文本编辑器：range对象](https://laixiazheteng.com/article/page/id/uMXiMenCofsB)
- reflow
- life of frame
## 0726
- Native loading
- link标签属性
- will-change引起的性能分析
- React事件
- event loop vsync rqf 宏任务 微任务
## 0712
### 专栏
- [关于Web](https://zhuanlan.zhihu.com/c_1252715898932801536)

### vue前端监控体系搭建
- [上篇](https://zhuanlan.zhihu.com/p/142418902)
- [下篇](https://zhuanlan.zhihu.com/p/144041346)

### 动画效果 - Flip
> eventloop 浏览器空闲

- [前端动画必知必会：React 和 Vue 都在用的 FLIP 思想实战](https://zhuanlan.zhihu.com/p/146641652)
- [FLIP Your Animations](https://aerotwist.com/blog/flip-your-animations/)
- [深入解析你不知道的 EventLoop 和浏览器渲染、帧动画、空闲回调（动图演示）](https://juejin.im/post/5ec73026f265da76da29cb25)
- [flip demo](http://sl1673495.gitee.io/flip-animation/)
- [CSS Flip 3D](https://codepen.io/kevinpowell/pres/a60d44c86df49ed1baa3a0a230158885)
## 0624

### react-hooks
- hooks出现的缘由
- [Umi Hooks - 助力拥抱 React Hooks](https://zhuanlan.zhihu.com/p/103150605)
- [React Hooks 在蚂蚁金服的实践](https://zhuanlan.zhihu.com/p/94030173)
- [useRequest- 蚂蚁中台标准请求 Hooks](https://zhuanlan.zhihu.com/p/106796295)
- [React Hooks 原理](https://github.com/brickspert/blog/issues/26)
- [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e)
- [Deep dive: How do React hooks really work?](https://www.netlify.com/blog/2019/03/11/deep-dive-how-do-react-hooks-really-work/)

### React Memo
### React.lazy() React.suspense()
### React Fiber
- [Fiber](https://juejin.im/post/5ab7b3a2f265da2378403e57)，掘金原理分析
- [reconciliation](https://reactjs.org/docs/reconciliation.html)，官方文档介绍
- [requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)
- [React Fiber Architecture
](https://github.com/acdlite/react-fiber-architecture)
## 0620
- [svg做自定义折线图表](https://segmentfault.com/a/1190000009605945)
 - [HTML5 进阶系列：canvas 动态图表](https://github.com/lin-xin/blog/issues/15)
 - [2019年Gulp自动化压缩合并构建的解决方案](https://github.com/lin-xin/blog/issues/1)
 - [精通 gulp 常用插件的功能和用法](https://github.com/lin-xin/blog/issues/2)
 - [如何用 canvas 画图表（1）扇形图和环形图](http://www.alloyteam.com/2015/05/ru-he-yong-canvas-hua-tu-biao-1-shan-xing-tu-he-huan-xing-tu/#prettyPhoto)
 - [SVG入门—如何手写SVG](https://juejin.im/post/5acd7c316fb9a028c813348d#heading-21)
 - dva effect机制

## 0619
### 未了解过的领域

- PWA
- 编辑器/文档编辑/脑图
- WASM
- vuepress博客

## 0618
- 要问`why`
    > 为什么会有这些问题，比如`xhr`跨域安全问题
- [Should cookies be used in a RESTful API?](https://softwareengineering.stackexchange.com/questions/141019/should-cookies-be-used-in-a-restful-api)

## 0617
- [trello拖动研究](https://trello.com/b/lDsFiIuG/%E5%AD%A6%E4%B9%A0%E4%BB%BB%E5%8A%A1)
- [Dva 中使用 WebSocket](https://www.jianshu.com/p/6a7a03ce31bd)
- redux开发者工具
- react开发者工具

## 0616
### ast
- [Read JavaScript Source Code, Using an AST](https://www.digitalocean.com/community/tutorials/js-traversing-ast)
- [astexplorer](https://astexplorer.net/)，在线查看AST
- React开发常见错误
```js
Uncaught (in promise) Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
    at createFiberFromTypeAndProps (react-dom.development.js:23965)
    at createFiberFromElement (react-dom.development.js:23988)
    at createChild (react-dom.development.js:13628)
    at reconcileChildrenArray (react-dom.development.js:13900)
    at reconcileChildFibers (react-dom.development.js:14305)
    at reconcileChildren (react-dom.development.js:16762)
    at updateHostComponent (react-dom.development.js:17302)
    at beginWork (react-dom.development.js:18627)
    at HTMLUnknownElement.callCallback (react-dom.development.js:188)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:237)
    at invokeGuardedCallback (react-dom.development.js:292)
    at beginWork$1 (react-dom.development.js:23203)
    at performUnitOfWork (react-dom.development.js:22154)
    at workLoopSync (react-dom.development.js:22130)
    at performSyncWorkOnRoot (react-dom.development.js:21756)
    at react-dom.development.js:11089
    at unstable_runWithPriority (scheduler.development.js:653)
    at runWithPriority$1 (react-dom.development.js:11039)
    at flushSyncCallbackQueueImpl (react-dom.development.js:11084)
    at flushSyncCallbackQueue (react-dom.development.js:11072)
    at scheduleUpdateOnFiber (react-dom.development.js:21199)
    at Object.enqueueSetState (react-dom.development.js:12639)
    at DynamicComponent../node_modules/react/cjs/react.development.js.Component.setState (react.development.js:471)
    at dynamic.js:91
```

- [Dva 源码解析](https://dvajs.com/guide/source-code-explore.html#start-%E6%96%B9%E6%B3%95)