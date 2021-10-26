# TypeScript is more than you think

> 最难点：TypeScript 的类型编程介绍及举例

two level: value and type level

- value level can be simply considered as just javascript, the whole grammar and syntax works at this level exactly like JS specification says should work.
- type level is the the syntax and grammar which was created specially for TypeScript.

three levels of the language

- Type System Language
- Type Annotations
- the last but not least JavaScript

## TypeScript type system language(TSts)

When we think about any language,

- we consider values, variables, expressions, operators, functions.
- We have tools for performing data flow,
- we can branch the flow by conditions,
- we can iterate the flow by iterations or recursions.

### values and variables

What stands for value in TS type system? It's **a type**, value at this level is represented as **a type**. We can assign the value to the variable by typical assign operator.

```ts
type X = string;
type Y = number;
type Z = boolean;
```

_At the left_ we have alias, _name which we set for the value_, _on the right side_ _we have the value_. Variable `X` has value `string`.

> I say variable because variable is a term we all programmers know, in TS there are only single assignment variables, so we cannot re-declare the value, naturally then its like JS const

> Type in TSts is not only like const, but also like immutable const, as it cannot be mutated. We can compose types but never change the original one.

### Types of types

- `type` is the same thing as `value`
- `value` is the same thing as `type`
- `kind` is a type of the type

**Kind** can be something new here, in TypeScript type system, kind is something which defines another type shape, in the same way at JS level type annotation defines a JS value shape.

### Operators

- `A = B` assign
- `A & B` intersection
- `A | B` union
- `keyof A`
- `A extends B ? C : D` condition
- `K in T` iteration

### Conditions and equality

`A extends B`: means if `A` then `B` and `A` can be used as `B`, what conveys equality in the one direction(单向) (operation is not commutative), if `A` extends `B` it doesn't implies that `B extends A`

```ts
type A = string;
type B = "1";
type AisB = A extends B ? true : false; // false
type BisA = B extends A ? true : false; // true

// Below is full equality check, we check in two directions, and then types are considered equal.
type A = 1;
type B = 1;
type AisBandBisA = A extends B ? (B extends A ? true : false) : false; // true
```

> the equality implemented like that has some gotchas and doesn't properly work in some cases. Example of such case you can find in [the playground](https://www.typescriptlang.org/play/#code/C4TwDgpgBAGlC8UDeUCGAuKBnYAnAlgHYDmANFAEYD8mFA9nQDYSqFQC+AUKJFAJoJkaTDgIlyAYxqUGzVl27hoASSwBRAI4BXVIwA8AQXIAhAHydBBqBAAewCIQAmWKMagWqr63YfOoVjyg8LWgLTAAzXSxQqCgIqIhORV4AJUFVTR19GHI+UygAegKg3BCLIA).

> This naive implementation works also incorrectly for union types

> Very important to mention is the fact that such conditions and equality work in a logical way for sound types, but TS has also unsound ones like `any`, `unknown`, `never`, these types can give us quite surprising results and equality doesn't work correctly for these types.

### Functions

**Functions** are something fundamental for _basic abstraction_. Fortunately in TS type system there are functions, functions working with types which are commonly named - **generic types**. Lets create a function which will check any two values to be equal:

```ts
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
// use it
type Result1 = IsEqual<string, number>; // false
type Result2 = IsEqual<1, 2>; // false
type Result3 = IsEqual<"a", "a">; // true

type GetLength<A extends Array<any>> = A["length"];
type Length = GetLength<["a", "b", "c"]>; // evaluates to 3
```

Function `GetLength` is a function which works only with types being an `Array<any>` kind

```ts
type IsEqual<A, B> = A extends B ? (B extends A ? true : false) : false;
// JS🟨
const isEqual = (a: any, b: any) => (a == b ? (b == a ? true : false) : false);

// TSts🟦
type GetLength<A extends Array<any>> = A["length"];
// JS🟨
const getLength = (a: Array<any>) => a["length"];
```

Almost the same thing, don't you think? I hope now you are quite convinced that popular generic types are just functions evaluated at the compile time 💪

### Composing functions

If we have functions, then it is natural to think there is possibility to call one function in another. As an example lets reuse written before `IsEqual` function and use it inside body of another function `IfElse`.

```ts
type IfElse<A, B, IfTrue, IfFalse> = IsEqual<A, B> extends true
  ? IfTrue
  : IfFalse;

type Result1 = IfElse<0, 1, "Equal", "Not Equal">; // Not Equal
type Result2 = IfElse<1, 1, "Equal", "Not Equal">; // Equal
```

### Local variables

We have functions, we have also variables, but can we have function local scope variables? Again yes, at least we can have some illusion of them which is quite handy.

```ts
type MergePropertyValue<
  A,
  B,
  Prop extends keyof A & keyof B, // 共有属性
  _APropValue = A[Prop], // local variable
  _BPropValue = B[Prop] // local variable
> = _APropValue | _BPropValue; // sum type

// JS🟨 take a look at similar JS function but working at assumed number fields
function mergePropertyValue(a, b, prop) {
  const _aPropValue = a[prop];
  const _bPropValue = b[prop];
  return _aPropValue + _bPropValue; // sum
}

type AreEqual<
  A,
  B,
  C,
  _AisB = IsEqual<A, B>,
  _BisC = IsEqual<B, C>
> = _AisB extends true ? IsEqual<_AisB, _BisC> : false;

type Result = AreEqual<1, 1, 1>; // true
type Result2 = AreEqual<1, 2, 1>; // false
type Result3 = AreEqual<"A", "A", "A">; // true
type Result4 = AreEqual<"A", "A", "B">; // false
```

In above definition `_AisB` and `_BisC` can be considered as local variables of `AreEqual` function.

> issue with saying that these are local variables is in a fact that we can ruin our type behavior from outside by setting those arguments like `AreEqual<1, 1, 1, false, false>`.

> _underscore_ which I have used above for local variables is _only convention_. The purpose is to give a hint that **these arguments should not be touched**.

### Loops

Every language has a way to iterate over a data structure.

```ts
type X = { a: 1; b: 2; c: 3 };
type Y = {
  [Key in keyof X]: X[Key] | null;
}; // {a: 1 | null, b: 1 | null, c: 1 | null}
// TSts can do more, we can even just do iteration, lets say from 0 to 5
type I = 0 | 1 | 2 | 3 | 4 | 5;
type X = {
  [Key in I]: Key;
};
// X is [0, 1, 2, 3, 4, 5]
// JS🟨 look at JS similar code
const x = [];
for (let i = 0; i <= 6; i++) {
  x.push(i);
}
```

### Recursion

Recursion is a situation when function inside the definition call itself. Can we call the same function inside its body? Yes we can!

```ts
type HasValuesOfType<T extends object, F> = {
  [K in keyof T]: T[K] extends F
    ? true
    : T[K] extends object
    ? HasValuesOfType<T[K], F>
    : false;
}[keyof T] extends false
  ? false
  : true;
```

### Mapping, filtering and reducing

#### Mapping

```ts
type User = {
  name: string;
  lastname: string;
};
type MapUsers<T extends Array<User>> = {
  [K in keyof T]: T[K] extends User ? { name: T[K]["name"] } : never;
};
type X = [
  {
    name: "John";
    lastname: "Doe";
  },
  {
    name: "Tom";
    lastname: "Hanks";
  }
];

type Result = MapUsers<X>; // [{name: 'John'}, {name: 'Tom'}]
```

Function `MapUsers` works with array of users kind, and maps every user by removing `lastname`. Take a look how we map - `{ name: T[K]['name']}`, in every iteration over the type `T`, we get value at this point `T[K]` and take `name` property which we put to the new value.

#### Filtering

**TSts** gives us tools for simple filtering object types. We can make function `FilterField` which will perform removing field from an object kind of value.

```ts
type FilterField<T extends object, Field extends keyof T> = {
  [K in Exclude<keyof T, Field>]: T[K];
};
// book
type Book = {
  id: number;
  name: string;
  price: number;
};
type BookWithoutPrice = FilterField<Book, "price">; // {id: number, name: string}
```

> `filtering` tuple types is not so simple, language doesn't support it without very sophisticated tricks which are outside the scope of this article.

`FilterField` is doing iteration over `T`, but by using `Exclude` it is excluding `Field` from list of keys, in result we get object type without this field.

> there is utility type `Pick` and `Omit` which can be used instead of `FilterField`

#### Reducing

Reducing or folding is a transforming data from a shape `A` 🍌 into some other shape `B` 🌭. Can we do that and transform data from kind `A` to kind `B`? Sure we can 😎.

```ts
type Prepend<T, Arr extends Array<any>> = ((
  a: T,
  ...prev: Arr
) => any) extends (...merged: infer Merged) => any
  ? Merged
  : never;

type KeysArray<T extends object, ACC extends Array<any> = []> = {
  [K in keyof T]: {} extends Omit<T, K>
    ? Prepend<T[K], ACC>
    : KeysArray<Omit<T, K>, Prepend<T[K], ACC>>;
}[keyof T];

type CountProps<T extends object, _Arr = KeysArray<T>> = _Arr extends Array<any>
  ? _Arr["length"]
  : never;

type Y = CountProps<{ a: 1; b: 2; c: 3; d: 1 }>; // Evaluates to 4
```

Yes a lot of code, yes quite complicated, we needed to use some additional helper type `Prepend` and `KeysArray`, but finally we were able to count the number of properties in the object, so we've reduced the object from `{ a: 1, b: 2, c: 3, d: 4 }` to `4` 🎉.

### Tuple transformations

TypeScript 4.0 introduced [variadic tuple types](https://github.com/microsoft/TypeScript/pull/39094) which gives more tools to our TSts language level. We now very easily can remove, add elements or merge tuples.

```ts
// merging two lists
type A = [1, 2, 3];
type B = [4, 5, 6];
type AB = [...A, ...B]; // computes into [1,2,3,4,5,6]

// JS🟨 - the same looking code at value level
const a = [1, 2, 3];
const b = [1, 2, 3];
const ab = [...a, ...b];

// push element to the lists
// TSts🟦
type C = [...A, 4]; // computes into [1,2,3,4]
// JS🟨 - the same looking code at value level
const c = [...a, 4];

// unshift element to the list
// TSts🟦
type D = [0, ...C]; // computes into [0,1,2,3,4]
// JS🟨 - the same looking code at value level
const d = [0, ...c];
```

> Tuple type at our type level can be considered just as a list.

### String concatenation

We can glue strings at the type level in almost the same way we do that in value level.

```ts
// concatenate two strings
type Name = "John";
type LastName = "Doe";
type FullName = `${Name} ${LastName}`; // "John Doe"

// JS🟨 - the same looking code at value level 🤯
const name = "John";
const lastName = "Doe";
const fullName = `${name} ${lastName}`;

// TSts🟦
type IntoString<
  Arr extends string[],
  Separator extends string,
  Result extends string = ""
> = Arr extends [infer El, ...infer Rest]
  ? Rest extends string[]
    ? El extends string
      ? Result extends ""
        ? IntoString<Rest, Separator, `${El}`>
        : IntoString<Rest, Separator, `${Result}${Separator}${El}`>
      : `${Result}`
    : `${Result}`
  : `${Result}`;

type Names = ["Adam", "Jack", "Lisa", "Doroty"];
type NamesComma = IntoString<Names, ",">; // "Adam,Jack,Lisa,Doroty"
type NamesSpace = IntoString<Names, " ">; // "Adam Jack Lisa Doroty"
type NamesStars = IntoString<Names, "⭐️">; // "Adam⭐️Jack⭐️Lisa⭐️Doroty"
```

Above example maybe looks little bit **more complicated**, but proves that we can have generic type level function which will concatenate strings with given separator.

### Higher order functions?

Is TSts functional language, is there possibility to pass functions and return functions? Below some naive try example

```ts
// TSts🟦
type ExampleFunction<X> = X; // identity function
type HigherOrder<G> = G<1>; // 🛑 higher order function doesn't compile
type Result = HigherOrder<ExampleFunction>; // 🛑 passing function as argument doesn't compile
```

Unfortunately (or fortunately) there is no such option, at type level that sort of thing has a name -` Higher Kinded Types`, such constructs are available in for example Haskell programming language.

It also means we _cannot create polymorphic functions like map, filter and reduce, as those functional constructs_ demand kind `* -> *`(function) as argument.

## Standard library

Every language has some standard library, no difference with TypeScript type level language. It has standard library, called in official documentation "[utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)". Despite the name, utility types are type level functions included in TypeScript. These functions can help with advanced type transformations without the need of writing everything from scratch.

## In summary

TypeScript type system TSts is something which should be considered as fully flavored language, it has all the things any language should have, we have variables, functions, conditions, iterations, recursion, we can compose, we can write sophisticated transformations. **Type system is expression based and operates only on immutable values(types)**. It has no higher order functions, but it doesn't mean will not have them 😉.

## Reference

- [link](https://dev.to/macsikora/typescript-is-more-than-you-think-2nbf)
- [TypeScript is Turing complete](https://github.com/Microsoft/TypeScript/issues/14833)
- [Binary Arithmetic in TypeScript's Type System](https://www.youtube.com/watch?v=7lyb22x9tcM)
- [TS toolbelt - library with functions for type level TS](https://pirix-gh.github.io/ts-toolbelt/4.2.1/)
- [Advanced TypeScript Exercises series](https://dev.to/macsikora/advanced-typescript-exercises-question-1-45k4)
