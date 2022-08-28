# 知乎问题：[有哪些必看的 JS 库？](https://www.zhihu.com/question/429436558)

## doodlewind
​
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

对于源码，个人还是倾向于「一定要会读，但能不读就不读」。**对于常见生态足够好的开源项目，教程、示例、设计文档和 issue 讨论足够解决大多数使用层面上的问题。如果想高效学习技术，一定要尽可能找到最高层面，最易于理解的信息源**。比如对于和 Chromium、V8 等谷歌系项目深度绑定的 Ninja 构建系统，我之前一直搞不懂它为什么要做成那样，直到偶然读到[作者自述的设计理念](http://aosabook.org/en/posa/ninja.html)以后，一下就豁然开朗了。这比上来就翻它的源码然后苦思冥想地倒推「这玩意到底想干嘛」要直接而方便得多。

毕竟某种程度上，读源码也是一种逆向工程，只应该在必要的时候去做。

## 花果山大圣
- vue3: @vue/reactivity: 1000行
- seajs: 1000行
- the-super-tiny-compiler这200行代码