# typeof

## Usage

> 对于基础类型的作用不大

This isn’t very useful for basic types, but combined with other type operators, you can use `typeof` to conveniently express many patterns. For an example, let’s start by looking at the predefined type `ReturnType<T>`. It takes a _function type_ and produces its return type:

```ts
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate>

type K = boolean
```

If we try to use `ReturnType` on a function name, we see an instructive error:

```ts
function f() {
  return { x: 10, y: 3 }
}
type P = ReturnType<f>
// 'f' refers to a value, but is being used as a type here. Did you mean 'typeof f'?
```

Remember that _values_ and _types_ aren’t the same thing(TypeScript 中的**值**和**类型**不是同一样的东西). To refer to the _type_ that the _value f_ has, we use `typeof`:

```ts
function f() {
  return { x: 10, y: 3 }
}
type P = ReturnType<typeof f>

type P = {
  x: number
  y: number
}
```

## Limitations

> 仅适用于标识符

TypeScript intentionally limits the sorts of expressions you can use `typeof` on.

Specifically, it’s only legal to use `typeof` on `identifiers` (i.e. variable names) or their properties. This helps avoid the confusing trap of writing code you think is executing, but isn’t:
