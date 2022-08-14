const A3 = {
    a: '12',
}
type A2 = typeof A3

let s = 'hello'
let n: typeof s // string

const s1 = 'hello'
let n1: typeof s1 // "hello"

const s2 = 'hello' as const
let n2: typeof s2 // "hello"
