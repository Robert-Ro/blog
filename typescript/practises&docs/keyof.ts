{
  type Point = { x: number; y: number }
  type P = keyof Point // “x” | “y”

  const array = [1, 2, 3, 4] as const
  type A = keyof typeof array // tuple
  {
    type B1 = 'a' | 'b' | 'c'
    type B2 = keyof B1 // String对象的属性和方法
  }
  // 等同
  {
    type B1 = 'a'
    type B2 = keyof B1 // String对象的属性和方法
  }

  {
    type B3 = 1 | 2 | 3
    type B4 = keyof B3 // Number对象的属性和方法
  }
  {
    type B3 = 1
    type B4 = keyof B3 // Number对象的属性和方法
  }
  {
    type B3 = 1 | 2 | 3 | 'a'
    type B4 = keyof B3 // 装包对象(Number/String)的公有属性和方法
    // "valueOf" | "toString"
  }

  {
    type B1 = true
    type B2 = keyof B1 // String对象的属性和方法
    // "valueOf"
  }
  type C = keyof { a: 'a'; b: 'b' } // 'a' | 'b'

  type Arrayish = { [n: number]: unknown }
  type A1 = keyof Arrayish // number

  type Mapish = { [k: string]: boolean }
  type M = keyof Mapish // string | number
}
{
  interface Person {
    name: string
    age: number
    address: string
  }
  type PersonKey = keyof Person
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }

  const person: Person = {
    name: 'John',
    age: 30,
    address: '123 Main St',
  }

  // Once you have a keyof type, you can use it to access the properties
  // of an object in a type-safe way.
  const age = getProperty(person, 'age')
  const address = getProperty(person, 'address')

  // error: Argument of type '"invalid"' is not assignable to parameter
  // of type '"name" | "age" | "address"'.
  // @ts-expect-error
  const invalid = getProperty(person, 'invalid')
}
{
  // 索引类型约束
  type Attributes = {
    [key: string]: number
  }

  function getAttributeValue<T extends Attributes>(obj: T, key: keyof T) {
    return obj[key] // number
  }

  let attributes = {
    foo: 1,
    bar: 2,
    baz: 3,
  }

  getAttributeValue(attributes, 'foo') // 1
  // @ts-expect-error
  getAttributeValue(attributes, 0) // error, 0 is not a key of attributes
}
{
  // The keyof typeof combination, which can be used to get the property names of an object as a union of literal types.
  enum ColorsEnum {
    white = '#ffffff',
    black = '#000000',
  }

  type Colors = keyof typeof ColorsEnum // "white" | "black"
}
{
  // 定义map类型
  interface Person {
    name: string
    age: number
    address: string
  }

  type Optional<T> = {
    [K in keyof T]?: T[K]
  }

  type OptionalPerson = Optional<Person> // equivalent to { name?: string; age?: number; address?:
}

{
  const user = {
    name: 'John',
    age: 32,
  }
  console.log(Object.keys(user)) // output: ["name", "age"]

  Object.keys(user).forEach((key) => {
    console.log(user[key]) // error is shown
    //   Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ name: string; age: number; }'.
    //   No index signature with a parameter of type 'string' was found on type '{ name: string; age: number; }'.
  })
}
type Point = { x: number; y: number }
type P = keyof Point // “x” | “y”
const array = [1, 2, 3, 4] as const
type A = keyof typeof array // tuple
type B1 = 'a' | 'b' | 'c'
type B = keyof B1 // 36 unions... 表达式上下文中
type C = keyof { a: 'a'; b: 'b' } // 'a' | 'b'

  const array = [1, 2, 3, 4] as const
  type A = keyof typeof array // tuple
  {
    type B1 = 'a' | 'b' | 'c'
    type B2 = keyof B1 // String对象的属性和方法
  }
  // 等同
  {
    type B1 = 'a'
    type B2 = keyof B1 // String对象的属性和方法
  }

  {
    type B3 = 1 | 2 | 3
    type B4 = keyof B3 // Number对象的属性和方法
  }
  {
    type B3 = 1
    type B4 = keyof B3 // Number对象的属性和方法
  }
  {
    type B3 = 1 | 2 | 3 | 'a'
    type B4 = keyof B3 // 装包对象(Number/String)的公有属性和方法
    // "valueOf" | "toString"
  }

  {
    type B1 = true
    type B2 = keyof B1 // String对象的属性和方法
    // "valueOf"
  }
  type C = keyof { a: 'a'; b: 'b' } // 'a' | 'b'

  type Arrayish = { [n: number]: unknown }
  type A1 = keyof Arrayish // number

  type Mapish = { [k: string]: boolean }
  type M = keyof Mapish // string | number
}
{
  interface Person {
    name: string
    age: number
    address: string
  }
  type PersonKey = keyof Person
  function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
  }

  const person: Person = {
    name: 'John',
    age: 30,
    address: '123 Main St',
  }

  // Once you have a keyof type, you can use it to access the properties
  // of an object in a type-safe way.
  const age = getProperty(person, 'age')
  const address = getProperty(person, 'address')

  // error: Argument of type '"invalid"' is not assignable to parameter
  // of type '"name" | "age" | "address"'.
  // @ts-expect-error
  const invalid = getProperty(person, 'invalid')
}
{
  // 索引类型约束
  type Attributes = {
    [key: string]: number
  }

  function getAttributeValue<T extends Attributes>(obj: T, key: keyof T) {
    return obj[key] // number
  }

  let attributes = {
    foo: 1,
    bar: 2,
    baz: 3,
  }

  getAttributeValue(attributes, 'foo') // 1
  // @ts-expect-error
  getAttributeValue(attributes, 0) // error, 0 is not a key of attributes
}
{
  // The keyof typeof combination, which can be used to get the property names of an object as a union of literal types.
  enum ColorsEnum {
    white = '#ffffff',
    black = '#000000',
  }

  type Colors = keyof typeof ColorsEnum // "white" | "black"
}
{
  // 定义map类型
  interface Person {
    name: string
    age: number
    address: string
  }

  type Optional<T> = {
    [K in keyof T]?: T[K]
  }

  type OptionalPerson = Optional<Person> // equivalent to { name?: string; age?: number; address?:
}

{
  const user = {
    name: 'John',
    age: 32,
  }
  console.log(Object.keys(user)) // output: ["name", "age"]

  Object.keys(user).forEach((key) => {
    console.log(user[key]) // error is shown
    //   Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ name: string; age: number; }'.
    //   No index signature with a parameter of type 'string' was found on type '{ name: string; age: number; }'.
  })
}
