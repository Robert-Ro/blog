// tuple to union, [string, number] -> string | number

type ElementOf<T> = T extends Array<infer E> ? E : never

type TTuple = [string, number]

type ToUnion = ElementOf<TTuple> // string | number
type Res = TTuple[number] // string | number @Reference: https://stackoverflow.com/questions/44480644/typescript-string-union-to-string-array/45486495#45486495
//TODO https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%B8%80%E4%BA%9B%E7%94%A8%E4%BE%8B

// 第一个参数
type FirstArg<T> = T extends (arg1: infer R, arg2: any) => void ? R : never

type fa = FirstArg<(name: number, age: number) => void>

// 递归拆解
type PromiseType<T> = T extends PromiseLike<infer R> ? (R extends PromiseLike<infer _> ? PromiseType<R> : R) : never

type pt = PromiseType<Promise<string>>
type pt1 = PromiseType<Promise<Promise<string>>>
type pt2 = PromiseType<Promise<Promise<Promise<string>>>>

// 数据元素
type ArrayType<T> = T extends (infer R)[] ? R : never
type ItemType1 = ArrayType<[string, number]>
type ItemType2 = ArrayType<string[]>
