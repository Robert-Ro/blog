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
