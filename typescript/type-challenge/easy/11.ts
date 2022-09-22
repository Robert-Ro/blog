/*
  11 - Tuple to Object
  -------
  by sinoon (@sinoon) #easy

  ### Question

  Give an array, transform into an object type and the key/value must in the given array.

  For example

  ```ts
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  const result: TupleToObject<typeof tuple> // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
  ```

  > View on GitHub: https://tsch.js.org/11
*/
/* _____________ Your Code Here _____________ */

type TupleToObject<T extends readonly (keyof any)[]> = {
  [P in T[number]]: P
}

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: 'tesla'
        'model 3': 'model 3'
        'model X': 'model X'
        'model Y': 'model Y'
      }
    >
  >
]

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ Solution _____________ */
// We need to take all the values from the array and make it as keys and values in our new object.
// It is easy to do with indexed types. We can get the values from an array by using T[number] construct. With the help of mapped types, we can iterate over those values in T[number] and return a new type where the key and value is the type from T[number]:

/*
- 字面量类型
    - let x = '123', type A = typeof x === string
    - const x = '123', type A = typeof x === '123'
    - const x = ['123', '456'] as const; type A = typeof x; A[0] = '34' 报错
- 遍历数组
    - NOTE 如何取出数组里面的每一项: T[number]
- typeof: 将js世界里面的东西转变为ts世界里面的东西
// 崔晓瑞思路：先用js去实现一遍



*/
