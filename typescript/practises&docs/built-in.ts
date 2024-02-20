// 内置的一些工具性的类型定义或者类型工具函数 type function
{
  // Value transformation types✨✨

  /**
   * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
   * we can conveniently work with the resolved value of a promise without explicitly chaining .then() handlers.
   */
  type Awaited<T> = T extends null | undefined
    ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
    : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
    ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
      ? Awaited<V> // recursively unwrap the value
      : never // the argument to `then` was not callable
    : T // non-object or non-thenable

  // Object manipulation types✨✨
  /**
   * Make all properties in T optional
   */
  type Partial<T> = {
    [P in keyof T]?: T[P]
  }

  /**
   * Make all properties in T required
   */
  type Required<T> = {
    [P in keyof T]-?: T[P]
  }

  /**
   * Make all properties in T readonly
   */
  type Readonly<T> = {
    readonly [P in keyof T]: T[P]
  }

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P]
  }

  /**
   * Construct a type with a set of properties K of type T
   * 生成新的类型
   */
  type Record<K extends keyof any, T> = {
    [P in K]: T
  }

  /**
   * Construct a type with the properties of T except for those in type K.
   */
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

  // Union manipulation types✨✨

  /**
   * Exclude from T those types that are assignable to U
   */
  type Exclude<T, U> = T extends U ? never : T

  /**
   * Extract from T those types that are assignable to U
   */
  type Extract<T, U> = T extends U ? T : never

  /**
   * Exclude null and undefined from T
   */
  type NonNullable<T> = T & {}

  // Function types✨✨
  /**
   * Obtain the parameters of a function type in a tuple
   */
  type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
  /**
   * Obtain the return type of a function type
   */
  type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

  // Class/object-oriented types✨✨
  /**
   * Obtain the parameters of a constructor function type in a tuple
   */
  type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
    ...args: infer P
  ) => any
    ? P
    : never

  /**
   * Obtain the return type of a constructor function type
   * InstanceType is similar to ReturnType we saw above. The only difference is that InstanceType works on a class constructor
   */
  type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R
    ? R
    : any

  // MISC✨✨
  /**
   * Convert string literal type to uppercase
   */
  type Uppercase<S extends string> = intrinsic

  /**
   * Convert string literal type to lowercase
   */
  type Lowercase<S extends string> = intrinsic

  /**
   * Convert first character of string literal type to uppercase
   */
  type Capitalize<S extends string> = intrinsic

  /**
   * Convert first character of string literal type to lowercase
   */
  type Uncapitalize<S extends string> = intrinsic

  /**
   * Marker for non-inference type position
   */
  type NoInfer<T> = intrinsic

  /**
   * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
   */
  type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any ? U : unknown

  /**
   * Removes the 'this' parameter from a function type.
   */
  type OmitThisParameter<T> = unknown extends ThisParameterType<T>
    ? T
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R
    : T

  type PropertyKey = string | number | symbol
}
