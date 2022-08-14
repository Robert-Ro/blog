// tuple to union, [string, number] -> string | number

type ElementOf<T> = T extends Array<infer E> ? E : never;

type TTuple = [string, number];

type ToUnion = ElementOf<TTuple>; // string | number
type Res = TTuple[number]; // string | number @Reference: https://stackoverflow.com/questions/44480644/typescript-string-union-to-string-array/45486495#45486495
//TODO https://jkchao.github.io/typescript-book-chinese/tips/infer.html#%E4%B8%80%E4%BA%9B%E7%94%A8%E4%BE%8B

