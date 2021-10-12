# type-challenges

## Termology & type Operator

- `keyof`: takes an **object type** or **union type** and produces a string or numeric **literal union** of its keys
- `in`:
  - acts as a type guard as [described](https://github.com/Microsoft/TypeScript/issues/10485)
  - in mapped type definition: as part of the syntax to **iterate over all the items in a union of keys(`keyof` object)**.
- `extends`:
  - class/interface Inheritance
  - Generic Constraints
  - Conditional Types
- `infer`: 表示在 `extends` 条件语句中待推断的类型变量。[Reference](https://github.com/Microsoft/TypeScript/pull/21496)
  - 用于提取函数类型的返回值类型：`type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;`
  - 用于提取构造函数中参数（实例）类型：[Detail](https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E5%86%85%E7%BD%AE%E7%B1%BB%E5%9E%8B)
- `...`: 析构
- `length`：length of tuple ?
- `number`：
- `Mapped Types`: [link](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- `Indexed Access Types`:[link](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)

## easy

- [pick](./easy/4.ts)
- [readonly](./easy/7.ts)
- [Tuple to Object](./easy/11.ts)
- [First of Tuple](./easy/14.ts)
- [Length of Tuple](./easy/18.ts)
- [Exclude](./easy/43.ts)
- [Awaited](./easy/189.ts) ✨✨
- [If](./easy/268.ts)
- [Concat](./easy/533.ts) ✨✨
- [Includes](./easy/898.ts), ✨✨✨✨, // FIXME 看不懂
- [Push](./easy/3057.md)
- [Unshift](./easy/3060.md)
- [Parameters](./easy/3312.md)
## medium
- [Get Return Type](./medium/2.md)
## Reference

- [repo](https://github.com/type-challenges/type-challenges/)

## Recommended Readings

### Official

- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
  - [Unions and Intersection Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
  - [Literal Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
  - [Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
  - [Advanced Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [The New Handbook](https://github.com/microsoft/TypeScript-Website/tree/v2/packages/documentation/copy/en/handbook-v2)

### Articles

- [Learn Advanced TypeScript Types](https://medium.com/free-code-camp/typescript-curry-ramda-types-f747e99744ab)
- [The Art of Type Programming](https://mistlog.medium.com/the-art-of-type-programming-cfd933bdfff7)

### Projects / Solutions

- [Type Gymnastics](https://github.com/g-plane/type-gymnastics)
- [TypeType Examples](https://github.com/mistlog/typetype-examples)### Inspired by

### Inspired by

- [piotrwitek/utility-types](https://github.com/piotrwitek/utility-types)
- [psmyrdek/typescript-challenges](https://github.com/psmyrdek/typescript-challenges)
- [andnp/SimplyTyped](https://github.com/andnp/SimplyTyped)
