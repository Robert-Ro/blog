// typeof 在ts类型编程中的应用
/**
 * typeof：获取变量或表达式的类型/捕获变量的类型
 */
{
  // 捕获对象的类型
  const Obj = {
    a: '12',
  }
  type ObjType = typeof Obj

  // 捕获变量的类型
  // let声明的变量 -> 类型推测出
  let s = 'hello'
  type StringVal = typeof s
  let s1: StringVal // 类型为 string

  let n = 1
  type NumberVal = typeof n
  let n1: NumberVal // 类型为number

  // const声明的变量 -> 字面量类型
  const s2 = 'hello'
  type StringVal1 = typeof s2
  let s3: StringVal1 // 类型为 string

  let n2 = 1
  type NumberVal1 = typeof n2
  let n3: NumberVal1 // 类型为number

  // 对比 `as const`
  let s4 = 'hello' as const
  let s5: typeof s4 // "hello"

  // 捕获函数类型
  function greet(name: string) {}
  type GreetFunctionType = typeof greet

  // 类成员类型的捕获
  class Person {
    name: string = 'John'
    age: number = 30
  }

  type PersonType = typeof Person // 类型为 typeof Person，表示类的类型
  type PersonInstanceType = InstanceType<typeof Person> // 类型为 Person，表示类的实例类型

  // 动态创建新类型
  type Point = { x: number; y: number }
  type PointKeys = keyof Point // 类型为 'x' | 'y'
  type PointValues = Point[keyof Point] // 类型为 number

  // 泛型类型推导
  function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }

  const person = { name: 'John', age: 30 }
  const nameValue = getValue(person, 'name') // 类型为 string
  const ageValue = getValue(person, 'age') // 类型为 number
}
