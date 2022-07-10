# Vue模板编译原理

难点：模板编译
* 多种元素类型
* 多种节点类型
* 多种指令
* 边界条件

## 源码

* [parse](../../geektime/dist/vue.2.6.14.js#9886), 解析
* [optimize](../../geektime/dist/vue.2.6.14.js#L11294)，优化
* [generate](../../geektime/dist/vue.2.6.14.js#L11657)，生成

* [html-parser](http://erik.eae.net/simplehtmlparser/simplehtmlparser.js), modified

## Questions

* 模板解析的实现，为何用的是正则? 有限状态机如何?
* 使用rust解析实现?
