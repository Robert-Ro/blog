## Parameters

A function can have any number of **required positional parameters**. These can be followed either by **named parameters** or by **optional positional parameters** (but not both).

> Some APIs—notably **Flutter widget constructors—use** only **named parameters**, even for parameters that are mandatory. See the next section for details.

### Named parameters 具名参数

Named parameters are optional unless they're explicitly marked as required.都是可选的参数，除非它们被标记为**必需的**

When defining a function, use `{param1, param2, …}` to specify named parameters. If you don't provide a default value or mark a named parameter as required, their types must be nullable as their default value will be null:

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold, bool? hidden}) {...}
```

When calling a function, you can specify named arguments using paramName: value. For example:

```dart
enableFlags(bold: true, hidden: false);
```

To define a default value for a named parameter besides `null`, use `=` to specify a default value. The specified value must be a compile-time constant. For example:
除了给具名参数的值添加默认值为 null 外，可使用`=`赋一个默认值

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```

If you instead want a named parameter to be mandatory, requiring callers to provide a value for the parameter, annotate them with `required`:

```dart
const Scrollbar({super.key, required Widget child});
```

If someone tries to create a Scrollbar **without specifying the child argument**, _then the analyzer reports an issue_.

You might want to place positional arguments first, but Dart doesn't require it. Dart allows named arguments to be placed anywhere in the argument list when it suits your API: 参数的顺序可以是任意的

```dart
repeat(times: 2, () {
  ...
});
```

## Optional positional parameters

Wrapping a set of function parameters in `[]` marks them as optional positional parameters 可选的位置参数. If you don't provide a default value, their types must be nullable as their default value will be null:

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

## The main() function

Every app must have a top-level main() function, **which serves as the entrypoint to the app**. The main() function returns void and has an **optional List<String> parameter for arguments**.

Here's a simple main() function:

```dart
void main() {
  print('Hello, World!');
}
```

## Functions as first-class objects

函数是一等对象，可以赋值给变量，作为参数传递给其他函数，作为返回值返回给其他函数。

## Anonymous functions

匿名函数是函数表达式，可以赋值给变量，作为参数传递给其他函数，作为返回值返回给其他函数。

An anonymous function resembles a named function as it has:

- Zero or more parameters, comma-separated
- Optional type annotations between parentheses.

```dart
([[Type]] param1[, ...]]) {
  codeBlock;
}
```

## Lexical scope

Dart determines the scope of variables based on the layout of its code. A programming language with this feature is termed a lexically scoped language. You can "follow the curly braces outwards" to see if a variable is in scope.

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;
        var insideFunction = true;
      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

## Lexical closures

A function object that can access variables in its lexical scope when the function sits outside that scope is called a **closure**.
当一个函数对象能够在其作用域之外访问其词法作用域内的变量时，这个函数对象被称为闭包。

Functions can close over variables defined in surrounding scopes. In the following example, `makeAdder()` captures the variable `addBy`. Wherever the returned function goes, it remembers `addBy`.
函数可以闭合周围作用域中定义的变量。在以下示例中，`makeAdder()` 捕获了变量 `addBy`。无论返回的函数去向何处，它都会记住 `addBy`。

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

## Tear-offs

> 从类或对象上“撕下”一个方法或函数，创建一个新的函数引用

When you refer to a function, method, or named constructor without parentheses, Dart creates a tear-off. This is a closure that takes the same parameters as the function and invokes the underlying function when you call it. If your code needs a closure that invokes a named function with the same parameters as the closure accepts, don't wrap the call in a lambda. Use a tear-off.
当你引用一个函数、方法或具名构造函数而不使用括号时，Dart 会创建一个 tear-off（撕下）。这是一个闭包，它接受与原函数相同的参数，并在调用时触发原函数的执行。如果你的代码需要一个闭包来以与闭包接受的参数相同的方式调用具名函数，不要将调用包装在 lambda 表达式中。使用 tear-off。

## Testing functions for equality

- A top-level function
- A static method
- An instance method

## Return values

All functions return a value. If no return value is specified, the statement **return null**; is implicitly appended to the function body.

## Generators✨✨✨✨✨

When you need to **lazily produce a sequence of values**, consider using a **generator function**. Dart has built-in support for two kinds of generator functions:

- **Synchronous** generator: Returns an Iterable object.
- **Asynchronous** generator: Returns a Stream object.

To implement a **synchronous** generator function, mark the function body as `sync*`, and use `yield` statements to deliver values:

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

To implement an **asynchronous** generator function, mark the function body as `async*`, and use `yield` statements to deliver values:

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

If your generator is recursive, you can improve its performance by using `yield*`:

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

## External functions

An external function is a function whose body is implemented separately from its declaration. Include the external keyword before a function declaration, like so:
函数的声明和实现是分开的。在函数声明之前使用 external 关键字，如下：

```dart
external void someFunc(int i);
```

An external function's implementation can come from another Dart library, or, more commonly, from another language. In interop(互操作) contexts, **external** introduces type information for foreign functions or values, making them usable in Dart. Implementation and usage is heavily platform specific, so check out the interop docs on, for example, `C` or `JavaScript` to learn more.
外部函数的实现可以来自另一个 Dart 库，或者更常见的是，来自另一种语言。在互操作（interop）上下文中，external 关键字引入了外部函数或值的类型信息，使它们能够在 Dart 中使用。实现和使用方式高度依赖于平台，因此请查阅有关 C 或 JavaScript 等的互操作文档以了解更多信息。

External functions can be `top-level functions`, `instance methods`, `getters or setters`, or `non-redirecting constructors`. An `instance variable` can be `external` too, which is equivalent to an external getter and (if the variable is not `final`) an external setter.
外部函数可以是**顶级函数**、**实例方法**、**getter 或 setter**，或者是**非重定向构造函数**。实例变量也可以是外部的，这等同于一个外部 getter（如果变量不是 final），以及一个外部 setter。
