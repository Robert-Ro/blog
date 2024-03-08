// UnionType vs IntersectionType
// example1
/**
 * 联合类型转交叉类型
 * 拆解
 * 1: T extends any ? (args: T) => any : never
 * 2: T extends (x: infer R) => any ? R : never
 */
type UnionToIntersection<T> = (T extends any ? (args: T) => any : never) extends (x: infer R) => any ? R : never

type BB = UnionToIntersection<{ a: string } | { b: number }>

type B = UnionToIntersection<BB>

/**
 * 联合类型三目运算是分开来操作的
 * 1. { a: string } extends any ? (args: { a: string }) => any : never
 * 2. { b: number } extends any ? (args: { b: number }) => any : never
 * 结果：
 * ((args: { a: string }) => any) | ((args: { b: number }) => any)
 */
type BStep1 = ((args: { a: string }) => any) | ((args: { b: number }) => any)
// example 类型推导 类型逆变
function test1(args: BStep1) {
  args({ a: '1', b: 2 })
}

type BStep2 = BStep1 extends (x: infer R) => any ? R : never

// -------------

type AA = 'a' | 'b' | string // string
type AStep1 = AA extends any ? (args: AA) => void : never
// example 类型推导 类型逆变
function test2(args: AStep1) {
  args('')
}

type AStep2 = AStep1 extends (x: infer R) => void ? R : never

type A = UnionToIntersection<AA>

// 联合类型(是它或它) 并集并的并不是属性，指的是这些类型他们从属的数据求并集
type UnionType = { a: string; b: number } | { c: string; b: number }
const data1: UnionType = { a: 'a', b: 2, c: 'c' }

// @ts-expect-error: 报错， 有可能没有这个数据
console.log(data1.a)

console.log(data1.b)

// 交叉类型(即是又是) 交集并的并不是属性 指的是这些类型他们从属的数据求交集
type IntersectionType = { a: string; b: number } & { c: string; b: number }
const data2: IntersectionType = { a: 'a', b: 2, c: 'c' }

console.log(data2.a)
console.log(data2.b)

// --------------
type I1 = 'A' | string // string
type I2 = 'A' & string // "A"
type I3 = ('A' | 'B' | number) & string // 应用举例：联合类型中取出字符串的类型
// 等同于
type I31 = ('A' & string) | ('B' & string) | (number & string)
// 'A' | 'B' | never => 'A' | 'B'
