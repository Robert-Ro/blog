# as const

`as const` 是 TypeScript 中的一个类型断言语法，它用于将一个表达式的类型推断为具体的字面量类型。通过使用 `as const`，你可以告诉 TypeScript 编译器将一个表达式视为不可变的常量，而不是推断为更宽泛的类型。

使用 `as const` 可以有以下几个方面的好处：

1. 字面量类型推断：当你使用 `as const` 来断言一个对象、数组、或元组时，TypeScript 将会根据字面量的值，推断出每个属性或元素的具体类型，而不是推断为更一般的类型。

   ```typescript
   const obj = { name: 'John', age: 30 } as const
   // 推断 obj 的类型为 { readonly name: 'John'; readonly age: 30; }

   const arr = [1, 2, 3] as const
   // 推断 arr 的类型为 readonly [1, 2, 3]

   const tuple = [10, 'hello', true] as const
   // 推断 tuple 的类型为 readonly [10, 'hello', true]
   ```

2. 只读属性：使用 `as const` 断言后，对象的所有属性都会被推断为只读属性。这意味着无法对这些属性进行修改，从而避免了意外的副作用。

   ```typescript
   const obj = { name: 'John', age: 30 } as const
   obj.name = 'Jane' // 错误：无法分配到 "name" ，因为它是只读属性
   ```

3. 更严格的类型检查：通过使用 `as const`，TypeScript 在类型检查时可以更加精确地捕获和推断类型。这有助于提前发现潜在的错误。

   ```typescript
   const num = 10 as const
   const squared = num * num // 类型错误：无法将类型“number”分配给类型“readonly [number]”
   ```

需要注意的是，使用 `as const` 可能会限制对象或数组的灵活性，因为它们的属性或元素将变为只读。因此，在使用 `as const` 断言之前，确保你真正需要将这些值视为不可变的常量。
