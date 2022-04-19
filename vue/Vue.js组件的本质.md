# 组件的本质

## 组件的产出

### jquery 年代

在模板引擎年代，组件的产出是`html`字符串

```js
import { template } from "lodash";

const MyComponent = (props) => {
  const compile =
    MyComponent.cache ||
    (MyComponent.cache = template("<div><%= title %></div>"));
  return compile(props);
};
MyComponent.cache = null;

document.getElementById("app").innerHTML = MyComponent({
  title: "MyComponent",
});
setTimeout(() => {
  document.getElementById("app").innerHTML = MyComponent({
    title: "My New Component",
  });
}, 2000);
```

[在线 sandbox](https://codesandbox.io/s/keen-minsky-6lvrp5?file=/index.js:0-438)

### Vue/React 年代

组件所产出的内容并不是`html`字符串，而是`Virtual DOM`

#### Vue

Vue 组件最核心的东西是`render`函数，剩余的其他内容，如`data`, `computed`, `props`等都是为`render`函数提供数据来源服务的。`render`函数本可以直接产出`html`字符串，但却产生了`Virtual DOM`, 借助`snabbdom`的 api 可以描述为以下 API：

```js
import { h } from "snabbdom";
const MyComponent = (props) => {
  return h("h1", props.title);
};
```

`virtual DOM` 终究要渲染为真实 `DOM`，这个过程就可以理解为模板引擎年代的完全替换 `html`，只不过它采用的不是完全替换，我们把这个过程叫做 `patch`，同样可以借助 `snabbom` 的 `api` 轻松实现：

```js
import { h, init } from "snabbdom";

const patch = init([]);

const MyComponent = (props) => {
  return h("h1", props.title);
};

const prevNode = MyComponent({ title: "prev" });
patch(document.getElementById("app"), prevNode);

const nextNode = MyComponent({ title: "next" });
settimeout(() => {
  patch(prevNode, nextNode);
}, 2000);
```

### 总结

组件的产出就是`Virtual DOM`

`Virtual DOM`带来了分层设计，它对渲染过程的抽象，使得框架可以渲染到`web`(浏览器)意外的平台，以及能够实现`SSR`等

`Virtual DOM`相比原生`DOM`操作的性能，这并非`Virtual DOM`的目标，确切地说，如果要比较二者的性能是要**控制变量**的，例如：页面的大小、数据变化量等

## 组件 VNode 的表示

```js
// 基础元素的表示方法
const elementNode = {
  tag: "div",
};
const render = (vnode, container) => {
  mountElement(vnode, container);
};
/**
 * 仅适合基础元素(不含svg)，不适用于组件
 */
const mountElement = (vnode, container) => {
  const ele = document.createElement(vnode.tag);
  container.appendChild(ele);
};
// 组件的表示方法：
class MyComponent {
  render() {
    return {
      tag: "div",
    };
  }
}
const componentVNode = {
  tag: MyComponent,
};
//组件的正常渲染，需要改造render方法
const render = (vnode, container) => {
  if (typeof vnode.tag === "string") {
    mountElement(vnode, container);
  } else mountComponent(vnode, container);
};
const mountComponent = (vnode, container) => {
  const instance = new vnode.tag();
  instance.$vnode = instance.render();
  mountElement(instance.$vnode, container);
};
```

## 组件的总类
组件的描述方式：

- 一种方式是使用一个普通的函数 => 函数式组件
- 第二种方式是使用一个类 => 有状态组件

### 函数式组件
- 是一个纯函数
- 没有自身状态，只接收外部参数
- 产出vnode的方式：单纯的函数调用
### 有状态组件
- 是一个类，可实例化，可携带更多信息
- 可以有自身状态
- 产出vnode的方式：需要实例化，然后调用其render函数
## Resources

- [组件的本质](https://juejin.cn/post/6844903903209717768)
- [snabbdom demo](https://codesandbox.io/s/keen-minsky-6lvrp5?file=/src/snabbdom.js)
