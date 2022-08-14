type Point = { x: number; y: number }
type P = keyof Point // “x” | “y”
const array = [1, 2, 3, 4] as const
type A = keyof typeof array // tuple
type B1 = 'a' | 'b' | 'c'
type B = keyof B1 // 36 unions... 表达式上下文中
type C = keyof { a: 'a'; b: 'b' } // 'a' | 'b'

type Arrayish = { [n: number]: unknown }
type A1 = keyof Arrayish // number

type Mapish = { [k: string]: boolean }
type M = keyof Mapish // string | number
