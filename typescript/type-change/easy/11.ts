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
  [P in T[number]]: P;
};

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type cases = [
  Expect<
    Equal<
      TupleToObject<typeof tuple>,
      {
        tesla: "tesla";
        "model 3": "model 3";
        "model X": "model X";
        "model Y": "model Y";
      }
    >
  >
];

// @ts-expect-error
type error = TupleToObject<[[1, 2], {}]>;

/* _____________ Solution _____________ */
// We need to take all the values from the array and make it as keys and values in our new object.
// It is easy to do with indexed types. We can get the values from an array by using T[number] construct. With the help of mapped types, we can iterate over those values in T[number] and return a new type where the key and value is the type from T[number]:
