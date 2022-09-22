/*
  3060 - Unshift
  -------
  by jiangshan (@jiangshanmeta) #easy #array

  ### Question

  Implement the type version of ```Array.unshift```

  For example

  ```typescript
  type Result = Unshift<[1, 2], 0> // [0, 1, 2,]
  ```

  > View on GitHub: https://tsch.js.org/3060
*/

/* _____________ Your Code Here _____________ */

type Unshift<T extends unknown[], U> = [U, ...T]
// type Unshift<T, U> = T extends [...infer R] ? [U, ...R] : never;

/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Unshift<[], 1>, [1]>>,
  Expect<Equal<Unshift<[1, 2], 0>, [0, 1, 2]>>,
  Expect<Equal<Unshift<['1', 2, '3'], boolean>, [boolean, '1', 2, '3']>>
]
