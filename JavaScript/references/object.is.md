# `Object.is()`

## Syntax

```js
Object.is(value1, value2): boolean
```

## Description

`Object.is()` determines whether two values are [the same value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value_equality_using_object.is). Two values are the same if one of the following holds: `Object.is()`确定两个值是否是相同的。以下比较结果都是相同的值：

- 都为`undefined`
- 都为`null`
- 都为`true`或都为`false`
- 具有相同长度、相同字符、相同顺序的字符串
- 都是同一个对象：意味着对象具有同样的内存引用
- 都为数值相同的`BigInts`
- 都为引用了相同`symbol`的`symbols`
- 都是数字
  - 都为+0
  - 都为-0
  - 都为 NaN
  - 非 0，非 NaN 的具有相同值

`Object.is()` is also not equivalent to the `===` operator. The only difference between `Object.is()` and `===` is in their treatment of signed zeros and `NaN` values. The `===` operator (and the `==` operator) treats the number values `-0` and `+0` as equal, but treats `NaN` as not equal to each other. `Object.is()`与`===`的不一致的地方在于对`+0`与`+0`, `NaN`的比较

## Resources

- [mdn `Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is)
- [Equality comparisons and sameness 相等比较和同一性](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value_equality_using_object.is), // TODO

## Usage Example

- React Shallow comparison
