## Built-in types

The Dart language has special support for the following:

- `Numbers` (int, double)
- `Strings` (String)
- `Booleans` (bool)
- `Records` ((value1, value2))元组 ✨
- `Lists` (List, also known as arrays)
- `Sets` (Set)
- `Maps` (Map)
- `Runes` (Runes; often replaced by the `characters` API)
- `Symbols` (Symbol)
- The value `null` (Null)

拆包/装包

Some other types also have special roles in the Dart language:

- `Object`: The superclass of all Dart classes except Null.
- `Enum`: The superclass of all enums.
- `Future` and `Stream`: Used in asynchrony support.
- `Iterable`: Used in for-in loops and in synchronous generator functions.
- `Never`: Indicates that an expression can never successfully finish evaluating. Most often used for functions that always throw an exception.
- `dynamic`: Indicates that you want to disable static checking. Usually you should use `Object` or `Object?` instead.
- `void`: Indicates that a value is never used. Often used as a return type.

The `Object`, `Object?`, `Null`, and `Never` classes have special roles in the **class hierarchy**. Learn about these roles in Understanding null safety.

### Number

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

### string

```dart
// raw string
var s = r'In a raw string, not even \n gets special treatment.';
// """ 多行
// $ 字面量

```

### Runes and grapheme clusters

> Unicode 字符集

In Dart, runes expose the Unicode code points of a string. You can use the characters package to view or manipulate user-perceived characters, also known as Unicode (extended) grapheme clusters.

## Records 元组

Records are an anonymous, immutable, aggregate type. Like other collection types, they let you bundle multiple objects into a single object. Unlike other collection types, records are fixed-sized, heterogeneous, and typed.
