# 读懂类型体操：TypeScript 类型元编程基础入门

## 循环依赖与类型空间

```ts
// editor.ts
import { Element } from "./element";

// Editor 中需要建立 Element 实例
class Editor {
  constructor() {
    this.element = new Element();
  }
}

// element.ts
import { Editor } from "./editor";

// Element 中需要标注类型为 Editor 的属性
class Element {
  editor: Editor;
}
```

最佳实践：使用 TypeScript3.8 中的`import type`语法

```ts
// element.ts
import type { Editor } from "./editor";

// 这个 type 可以放心地用作类型标注，不造成循环引用
class Element {
  editor: Editor;
}

// 但这里就不能这么写了，会报错
const editor = new Editor();
```

`TypeScript`这样的现代静态类型语言，一般都具备两个放置语言实体的「空间」，即**类型空间**（type-level space）和**值空间**（value-level space）。**前者用于存放代码中的类型信息，在运行时会被完全擦除掉**。**而后者则存放了代码中的「值」，会保留到运行时**。

### 值

字面量、变量、常量、函数形参、函数对象、`class`、`enum`……它们都是值，因为这些实体在编译出的 JS 中都会保留下来。

### 类型

类型空间中则存放着所有用 type 关键字定义的类型，以及 `interface`、`class` 和 `enum`——也就是所有能拿来当作类型标注的东西。

> `class` 和 `enum` 是横跨两个空间的

```ts
let foo: Foo; // 类型
let foo = new Foo(); // 值
```

### 小结

这里的 `import type` 相当于只允许所导入的实体在**类型空间**使用，因此上面导入的 `Editor` 就被限定在了**类型空间**，从而杜绝了**值空间**（JS）中潜在的循环引用问题。

## 类型空间与类型变量

显然，类型空间里容纳着的是各种各样的类型。而非常有趣的是，编程语言中的「常量」和「变量」概念在这里同样适用：

- 当我们写 let x: number 时，这个固定的 _number 类型就是典型的常量_。如果我们把某份 JSON 数据的字段结构写成朴素的 interface，那么这个 _interface 也是类型空间里的常量_。
- 在使用泛型时，我们会遇到类型空间里的**变量**。这里的「变」体现在哪里呢？举例来说，通过泛型，函数的返回值类型可以由输入参数的类型决定。如果纯粹依靠「写死」的常量来做类型标注，是做不到这一点的。

在 TypeScript 中使用泛型的默认方式，相比 Java 和 C++ 这些（名字拼写）大家都很熟悉的经典语言，并没有什么区别。这里重要的地方并不是 <T> 形式的语法，而是这时我们实际上是在**类型空间**中定义了一个**类型变量**：

```ts
// 使用泛型标注的加法函数，这里的 Type 就是一个类型变量
function add<Type>(a: Type, b: Type): Type {
  return a + b;
}

add(1, 2); // 返回值类型可被推断为 number
add("a", "b"); // 返回值类型可被推断为 string

add(1, "b"); // 形参类型不匹配，报错
```

在上面这个非常简单的例子里，通过`Type`这个类型变量，我们不仅在*输入参数*和*返回值的类型*之间建立了动态的联系，还在输入参数之间建立了约束，这是一种很强大的表达力。另外由于**这类变量在语义上几乎总是相当于占位符**，所以我们一般会把它们简写成`T`/`U`/`V`之类。

### `keyof`

除了声明类型变量以外，另一种能在类型空间里进行的重要操作，就是从**一种类型推导出另一种类型**。TypeScript 为此扩展出了自己定义的一套语法，比如一个非常典型的例子就是 `keyof` 运算符。这个运算符是专门在类型空间里使用的，（不太准确地说）相当于能在类型空间里做的 Object.keys，像这样：

```ts
// 定义一个表达坐标的 Point 结构
interface Point {
  x: number;
  y: number;
}

// 取出 Point 中全部 key 的并集
type PointKey = keyof Point;

// a 可以是任意一种 PointKey
let a: PointKey;

a = "x"; // 通过
a = "y"; // 通过
a = { x: 0, y: 0 }; // 报错
```

`Object.keys` 返回的是一个数组 => `['x', 'y']`

`keyof` 返回的是一个集合 => `'x' | 'y'`

我们也可以用形如 `type C = A | B` 的语法来取并集，这时其实也是在类型空间进行了 `A | B` 的表达式运算。

### `extends`

并非 `class` 和 `interface` 中的「继承」，而更类似于**由一个类型表达式来「约束」住另一个类型变量**

```ts
// identity 就是返回原类型自身的简单函数
// 这里的 T 就相当于被标注成了 Point 类型
function identity1<T extends Point>(a: T): T {
  return a;
}

// 这里的 T 来自 Point2D | Point3D 这个表达式
function identity2<T extends Point2D | Point3D>(a: T): T {
  return a;
}
```

### 小结

- 类型空间里同样可以存在变量，其运算结果还可以赋值给新的类型变量。实际上 TypeScript 早已做到让这种运算图灵完备了。
- 类型空间里的运算始终只能针对类型空间里的实体，**无法涉及运行时的值空间**。比如从后端返回的 `data` 数据里到底有哪些字段，显然不可能在编译期的类型空间里用 `keyof` 获知。不要尝试表演超出生理极限的体操动作。
- 类型空间在运行时会被彻底擦除，因此你哪怕完全不懂不碰它也能写出业务逻辑，这时就相当于回退到了 JavaScript。

## 类型变量与类型体操

[example](./type-example.ts)

当然，相信可能很多同学会指出，这种手法还无法对运行时动态的数据做校验。但其实只要通过运行时库，TypeScript 也可以用来写出语义化的运行时校验。笔者贡献过的 [Superstruct](https://github.com/ianstormtaylor/superstruct) 和[@工业聚](https://www.zhihu.com/people/6751e943236c0381facaf51cf6fa1f43)的 [Farrow](https://github.com/farrow-js/farrow) 都做到了这一点（Farrow 已经做成了全家桶式的 Web 框架，但个人认为其中最创新的地方是其中可单独使用的 Schema 部分）。比如这样：

```ts
import { assert, object, number, string, array } from "superstruct";

// 定义出校验结构，相当于运行时的 interface
const Article = object({
  id: number(),
  title: string(),
  tags: array(string()),
  author: object({
    id: number(),
  }),
});

const data = {
  id: 34,
  title: "Hello World",
  tags: ["news", "features"],
  author: {
    id: 1,
  },
};

// 这个 assert 发生在运行时而非编译时
assert(data, Article);
```

这样一来，我们就以 schema 为抓手，将**类型空间**的能力下沉到了**值空间**，拉通了端到端类型校验的全链路，形成了强类型闭环，赋能了运行时业务，打出了一套组合拳。

## Reference

- [原文链接](https://zhuanlan.zhihu.com/p/384172236)
- [What are some examples of type-level programming?](https://stackoverflow.com/questions/24481113/what-are-some-examples-of-type-level-programming)
- [What is the difference between type and class in Typescript?](https://stackoverflow.com/questions/51131898/what-is-the-difference-between-type-and-class-in-typescript/51132333%2351132333)
- [TypeScript: Documentation - Creating Types from Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [TypeScript: Documentation - Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [TypeScript: Documentation - Keyof Type Operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
- [来玩 TypeScript 啊，机都给你开好了](https://www.zhihu.com/column/c_206498766)
