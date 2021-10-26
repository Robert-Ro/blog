/*
  110 - Capitalize
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Capitalize<T>` which converts the first letter of a string to uppercase and leave the rest as-is.

  For example

  ```ts
  type capitalized = Capitalize<'hello world'> // expected to be 'Hello world'
  ```

  > View on GitHub: https://tsch.js.org/110
*/

/* _____________ Your Code Here _____________ */

const convert = (s: String) => {
  const [f, ...rest] = s;
  return `${f.toUpperCase()}${rest}`;
};
type Capitalize2<S extends string> = S extends `${infer T}${infer U}`
  ? `${Uppercase<T>}${U}`
  : S;

/* _____________ Test Cases _____________ */
import { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Capitalize2<"foobar">, "Foobar">>,
  Expect<Equal<Capitalize2<"FOOBAR">, "FOOBAR">>,
  Expect<Equal<Capitalize2<"foo bar">, "Foo bar">>,
  Expect<Equal<Capitalize2<"">, "">>
];

/* _____________ Reference _____________ */
/**
 * Convert string literal type to uppercase
 */
type Uppercase<S extends string> = intrinsic;

/**
 * Convert string literal type to lowercase
 */
type Lowercase<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to uppercase
 */
type Capitalize<S extends string> = intrinsic;

/**
 * Convert first character of string literal type to lowercase
 */
type Uncapitalize<S extends string> = intrinsic;
