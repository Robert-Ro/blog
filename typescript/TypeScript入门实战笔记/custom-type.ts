type isAny<S> = S extends 1 & any ? true : false;
type _Equal<S, T> = [S] extends [T] ? ([T] extends [S] ? true : false) : false; //  [] 解除条件分配类型和 never “陷阱”
type Equal<S, T> = isAny<S> extends true
  ? isAny<T> extends true
    ? true
    : false
  : isAny<T> extends true
  ? false
  : _Equal<S, T>;

type Merge<A, B> = {
  [key in keyof A | keyof B]: key extends keyof A
    ? key extends keyof B
      ? A[key] | B[key]
      : A[key]
    : key extends keyof B
    ? B[key]
    : never;
};
