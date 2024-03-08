{
  const arr: number[] = [1, 2, 3]
  const value: number = arr[0] // 获取数组索引为 0 的元素，类型为 number
  const length = arr.length // 获取数组的长度，类型为 3
}
{
  type ArrKeys = keyof number[] // 类型为 number
}
{
  type Person = { name: string; age: number }
  type PersonKeys = keyof Person // 类型为 "name" | "age"

  type PersonArray = Person[]
  type PersonArrayKeys = keyof PersonArray // 类型为 number | "length"

  type PersonArrayElementKeys = keyof PersonArray[number] // 类型为 "name" | "age"
}
{
  type Person = {
    age: number
    name: string
    alive: boolean
  }
  type Age = Person['age'] // number
  type I1 = Person['age' | 'name']
  type I2 = Person[keyof Person]
  type AliveOrName = 'alive' | 'name'
  type I3 = Person[AliveOrName]
  // Another example of indexing with an arbitrary type is using number to get the type of an array’s elements.
  // We can combine this with `typeof` to conveniently capture the element type of an array literal:
  const MyArray = [
    { name: 'Alice', age: 15 },
    { name: 'Bob', age: 23 },
    { name: 'Eve', age: 38 },
  ]
  type Person2 = (typeof MyArray)[number]
  // type Person2 = {
  //   name: string;
  //   age: number;
  // };
  type Person3 = typeof MyArray
  // type Person3 = {
  //   name: string;
  //   age: number;
  // }[];
  const key = 'age'
  type Age1 = Person[key]

  type key = 'age'
  type Age2 = Person[key]
}
