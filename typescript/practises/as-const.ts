{
  const obj = { name: 'John', age: 30 } as const
  // 推断 obj 的类型为 { readonly name: 'John'; readonly age: 30; }

  const arr = [1, 2, 3] as const
  // 推断 arr 的类型为 readonly [1, 2, 3]

  const tuple = [10, 'hello', true] as const
  // 推断 tuple 的类型为 readonly [10, 'hello', true]
}
{
  const obj = { name: 'John', age: 30 } as const
  //@ts-expect-error: 只读属性
  obj.name = 'Jane' // 错误：无法分配到 "name" ，因为它是只读属性
}
{
  const num = 10 as const
  const squared = num * num
  console.log(squared)
}
