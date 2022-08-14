# Type Operation

## type operator
### **`keyof`**: ✨✨✨✨✨
takes an **object type对象类型** or **union type联合类型** and produces a string or numeric **literal union** of **its keys**所有key的字面量类型
  - keyof Array
  - keyof 'a' | 'b' | 'c'
  - keyof { a: 'a', b: 'b' }
### typeof 操作符
与js中的用法一致，不过是返回基于该值的类型(`TypeScript`层面的)
`TypeScript` adds a `typeof` operator you can use in a **type context** to refer to _the type of_ a **variable** or **property**:

### **`in`**:
我们可以使用索引签名语法和`in`关键字限定对象属性的范围
> 我们只能在类型别名定义中使用`in`(以及`keyof`)，如果在接口中使用，则会提示一个的错误
  - acts as a type guard as [described](https://github.com/Microsoft/TypeScript/issues/10485): 类型守卫
  - in mapped type definition: as part of the syntax to **iterate over all the items in a union of keys(`keyof` object)**：迭代联合类型中的所有key



- **`extends`**(三个作用):✨✨✨✨✨
  - class/interface Inheritance 继承 => NOTE 继承的判断逻辑
  - Generic Constraints：泛型约束
  - Conditional Types：条件类型 类型
    ```ts
    // T extends U 自带双重遍历，T：'a'|'b'|'c', U: 'a', T extends U ，T的各项会与U中的各项进行对比
    type Exclude<T, U> = T extends U ? never : T
    ```
- **`infer`**: 表示在 `extends` 条件语句中待推断的类型变量✨✨✨✨✨。
  > [Reference](https://github.com/Microsoft/TypeScript/pull/21496)
  - 用于提取函数类型的返回值类型：`type ReturnType<T> = T extends (...args: any[]) => infer P ? P : any;`
  - 用于提取构造函数中参数（实例）类型：[Detail](https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E5%86%85%E7%BD%AE%E7%B1%BB%E5%9E%8B)
- `...`: 析构
- `Mapped Types`: [link](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html)
- `Indexed Access Types`:[link](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)
- **`never`**: 不表示任何类型，类型编程中常用于三元操作符中的`false`状态下的取值
- `readonly`: 可读性操作符
- `?`: 可选性操作符
- `-`: 移除指定修饰符-> 用在`readonly`/`?`之前
- `+`: 添加指定修饰符
- `as const`:
- `T[number]`: 遍历数组T中的每一项，生成一个`union`
- `T['length']`: 获取数组的长度

### 遍历
- 遍历数组
  `T[number]`
- 遍历union
  `keyof`
- 遍历interface
## solutions
- 把类型类比值操作
- 递归
  - [examples1](https://tsch.js.org/189)
  - [Includes](https://tsch.js.org/898)
- 类型数组操作
  - [contact](https://tsch.js.org/533)
  - [Includes](https://tsch.js.org/898)
  - [Push](https://tsch.js.org/3057)
- problems
  - [T] extends [U]
## built-in type
> 定义路径：`ms-vscode.vscode-typescript/node_modules/typescript/lib/lib.es5.d.ts`，预先定义的一些工具类型函数
- `InstanceType`
- `ReturnType`
- `Parameters`
- `ConstructorParameters`
- `Partial`
- `Pick`
- `Omit`
- `Required`
- `Readonly`
- `Record`
- `Exclude`
- `Extract`
- `NonNullable`
- `Uppercase`
- `Lowercase`
- `Capitalize`
- `Uncapitalize`
- `ThisParameterType`
- `OmitThisParameter`