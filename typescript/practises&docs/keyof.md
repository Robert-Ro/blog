# keyof

> 主要的用处也不是针对基础类型
> 作用于 `type`层面

The `keyof` operator takes an object type and produces a string or numeric literal union of its keys(其键值的字面量类型). The following type `P` is the same type as `type P = "x" | "y"`:

```ts
type Point = { x: number; y: number }
type P = keyof Point
```

If the type has a `string` or `number` index signature, `keyof` will return those types instead:

```ts
type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish
// type A = number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish
// type M = string | number
```

Note that in this example, `M` is `string | number` — this is because JavaScript object keys are always coerced to a string, so `obj[0]` is always the same as `obj["0"]`.

`keyof` types become **especially useful when combined with mapped types**, which we’ll learn more about later.

## keyof 使用场景/blogs

### [blog1](https://byby.dev/ts-keyof)

- You can use `keyof` to access the property values of an object by using the bracket notation. This allows you to ensure that you’re only **accessing valid properties** of the object.
- You can also use `keyof` to create **generic constraints**, which are types that restrict the possible types that a generic parameter can take.
- You can use `keyof` with number index signature. A number index signature is a way to define an object type that can have any number of properties with numeric keys and a specific value type.
- The `keyof` `typeof` combination, which can be used to **get the property names of an object as a union of literal types**.
- You can use `keyof` to define mapped types, which are types that transform one object type into another object type by mapping over its properties. For example, you can use keyof to define a type that maps all properties of an object to optional properties:

### [blog2](https://blog.logrocket.com/how-to-use-keyof-operator-typescript/#defining-keyof-operator)

[how-to-use-keyof-operator-typescript](../blogs/how-to-use-keyof-operator-typescript.md)
