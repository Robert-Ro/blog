# Dart 语法

> 学新语言的思路=>高屋建瓴+实际的需求

## [语言特性](./语言特性.md)

## base

### variables & type

> [variables Docs](https://dart.dev/language/variables)

#### num

- int
- double
- dart:math

#### bool

#### String

- 单双引号都 ok
- 字符串中嵌入变量或表达式：你可以使用 `${express}` 把一个表达式的值放进字符串。而如果是一个标识符，你可以省略`{}`。
- `+` 拼接字符串
- 多行字符串 `"""`

#### List

#### Map

#### 常量定义

- final: 它定义的变量可以在运行时确定值，而一旦确定后就不可再变
- const: 表示变量在编译期间即能确定的值

### function

```dart
bool isZero(int number) { //判断整数是否为0
    return number == 0;
}
void printInfo(int number,Function check) { //用check函数来判断整数是否为0
    print("$number is Zero: ${check(number)}");
}
Function f = isZero;

bool isZero(int number) => number == 0;

void printInfo(int number,Function check) => print("$number is Zero: ${check(number)}");
// void可不显示声明
```

一个函数中可能需要传递多个参数。那么，如何让这类函数的参数声明变得更加优雅、可维护，同时降低调用者的使用成本呢？

C++ 与 Java 的做法是，**提供函数的重载**，即提供同名但参数不同的函数。但 **Dart 认为重载会导致混乱，因此从设计之初就不支持重载，而是提供了可选命名参数和可选参数**。

具体方式是，在声明函数时：

- 给参数增加{}，以 `paramName: value` 的方式指定调用参数，也就是可选命名参数；
- 给参数增加[]，则意味着这些参数是可以忽略的，也就是可选参数。

```dart
//要达到可选命名参数的用法，那就在定义函数的时候给参数加上 {}
void enable1Flags({bool bold, bool hidden}) => print("$bold , $hidden");

//定义可选命名参数时增加默认值
void enable2Flags({bool bold = true, bool hidden = false}) => print("$bold ,$hidden");

//可忽略的参数在函数定义时用[]符号指定
void enable3Flags(bool bold, [bool hidden]) => print("$bold ,$hidden");

//定义可忽略参数时增加默认值
void enable4Flags(bool bold, [bool hidden = false]) => print("$bold ,$hidden");

//可选命名参数函数调用
enable1Flags(bold: true, hidden: false); //true, false
enable1Flags(bold: true); //true, null
enable2Flags(bold: false); //false, false

//可忽略参数函数调用
enable3Flags(true, false); //true, false
enable3Flags(true,); //true, null
enable4Flags(true); //true, false
enable4Flags(true,true); // true, true
```

### class

> 与 java 类似

Dart 中并没有 `public`、`protected`、`private` 这些关键字，我们只要在声明变量与方法时，在前面加上“_”即可作为 `private` 方法使用。如果不加“_”，则默认为 public。不过，“\_”的限制范围并不是类访问级别的，而是库访问级别。

```dart
class Point {
  num x, y;
  static num factor = 0;
  //语法糖，等同于在函数体内：this.x = x;this.y = y;
  Point(this.x,this.y);
  void printInfo() => print('($x, $y)');
  static void printZValue() => print('$factor');
}

var p = new Point(100,200); // new 关键字可以省略
p.printInfo();  // 输出(100, 200);
Point.factor = 10;
Point.printZValue(); // 输出10

```

与 C++ 类似，Dart 支持初始化列表。在构造函数的函数体真正执行之前，你还有机会给实例变量赋值，甚至重定向至另一个构造函数。

```dart
class Point {
  num x, y, z;
  Point(this.x, this.y) : z = 0; // 初始化变量z
  Point.bottom(num x) : this(x, 0); // 重定向构造函数
  void printInfo() => print('($x,$y,$z)');
}

var p = Point.bottom(100);
p.printInfo(); // 输出(100,0,0)
```

### enum

### extends/implements/abstract/mixin

> 复用

Dart 中，你可以对同一个父类进行继承或接口实现：

- 继承父类意味着，子类由父类派生，会自动获取父类的成员变量和方法实现，子类可以根据需要覆写构造函数及父类方法；
- 接口实现则意味着，子类获取到的仅仅是接口的成员变量符号和方法符号，需要重新实现成员变量，以及方法的声明和初始化，否则编译器会报错。

```dart
class Point {
  num x = 0, y = 0;
  void printInfo() => print('($x,$y)');
}

//Vector继承自Point
class Vector extends Point{
  num z = 0;
  @override
  void printInfo() => print('($x,$y,$z)'); //覆写了printInfo实现
}

//Coordinate是对Point的接口实现
class Coordinate implements Point {
  num x = 0, y = 0; //成员变量需要重新声明
  void printInfo() => print('($x,$y)'); //成员函数需要重新声明实现
}

var xxx = Vector();
xxx
  ..x = 1
  ..y = 2
  ..z = 3; //**级联运算符**，等同于xxx.x=1; xxx.y=2;xxx.z=3;
xxx.printInfo(); //输出(1,2,3)

var yyy = Coordinate();
yyy
  ..x = 1
  ..y = 2; //级联运算符，等同于yyy.x=1; yyy.y=2;
yyy.printInfo(); //输出(1,2)
print (yyy is Point); //true
print(yyy is Coordinate); //true
```

除了**继承和接口实现之外，Dart 还提供了另一种机制来实现类的复用，即“混入”（Mixin）**。混入鼓励代码重用，可以被视为具有实现方法的接口。这样一来，不仅可以解决 Dart 缺少对多重继承的支持问题，还能够避免由于多重继承可能导致的歧义（菱形问题）。

> 菱形继承问题
> 备注：继承歧义，也叫菱形问题，是支持多继承的编程语言中一个相当棘手的问题。当 B 类和 C 类继承自 A 类，而 D 类继承自 B 类和 C 类时会产生歧义。如果 A 中有一个方法在 B 和 C 中已经覆写，而 D 没有覆写它，那么 D 继承的方法的版本是 B 类，还是 C 类的呢？

### Operator✨✨✨

> [operators Docs](https://dart.dev/language/operators)

Dart 和绝大部分编程语言的运算符一样，所以你可以用熟悉的方式去执行程序代码运算。不过，**Dart 多了几个额外的运算符，用于简化处理变量实例缺失（即 null）的情况**。

- `?.` 运算符：假设 Point 类有 printInfo() 方法，p 是 Point 的一个可能为 null 的实例。那么，p 调用成员方法的安全代码，可以简化为 p?.printInfo() ，表示 p 为 null 的时候跳过，避免抛出异常。
- `??=` 运算符：如果 a(左值) 为 null，则给 a 赋值 value，否则跳过。这种用默认值兜底的赋值语句在 Dart 中我们可以用 a ??= value 表示。
- `??` 运算符：如果 a 不为 null，返回 a 的值，否则返回 b。在 Java 或者 C++ 中，我们需要通过三元表达式 (a != null)? a : b 来实现这种情况。而在 Dart 中，这类代码可以简化为 a ?? b。

**Dart 提供了类似 C++ 的运算符覆写机制**✨✨✨，使得我们不仅可以覆写方法，还可以覆写或者自定义运算符。

```dart
class Vector {
  num x, y;
  Vector(this.x, this.y);
  // 自定义相加运算符，实现向量相加
  Vector operator +(Vector v) =>  Vector(x + v.x, y + v.y);
  // 覆写相等运算符，判断向量相等
  bool operator == (dynamic v) => x == v.x && y == v.y;
}

final x = Vector(3, 3);
final y = Vector(2, 2);
final z = Vector(1, 1);
print(x == (y + z)); //  输出true

```

#### problem

如果父类有多个构造函数，子类也有多个构造函数，如何从代码层面确保父类子类之间构造函数的正确调用？

```dart
class Point {
  num x, y;
  Point() : this.make(0,0);
  Point.left(x) : this.make(x,0);
  Point.right(y) : this.make(0,y);
  Point.make(this.x, this.y);
  void printInfo() => print('($x,$y)');
}

class Vector extends Point{
  num z = 0;
/*5个构造函数
  Vector
  Vector.left;
  Vector.middle
  Vector.right
  Vector.make
*/
  @override
  void printInfo() => print('($x,$y,$z)'); //覆写了printInfo实现
}
```

### Metadata

Metadata can appear before a **library**, **class**, **typedef**, **type parameter**, **constructor**, **factory**, **function**, **field**, **parameter**, or **variable declaration** and before an import or export directive.

#### @Deprecated

```dart
class Television {
  /// Use [turnOn] to turn the power on instead.
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// Turns the TV's power on.
  void turnOn() {...}
  // ···
}
```

#### @deprecated

without message

#### @override

方法重载

#### @pragma

在 Dart 中，`@pragma` 是一个指令，用于提供编译器特定的信息或进行特定的编译器操作。它是一种元数据，可以附加到库、类、方法或函数上，以指示编译器如何处理这些代码实体。

#### 自定义 metadata annotations

```dart
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}

@Todo('Dash', 'Implement this function')
void doSomething() {
  print('Do something');
}
```

### Libraries & imports

The `import` and `library` directives can help you create a modular and shareable code base. Libraries not only provide APIs, but are a unit of privacy: identifiers that start with an underscore (\_) are visible only inside the library. **Every Dart file (plus its parts) is a library, even if it doesn't use a library directive**.

Libraries can be searched in [pub.dev](https://pub.dev/).

```dart
import 'dart:html';
import 'package:test/test.dart';

import 'package:lib1/lib1.dart';
import 'package:lib2/lib2.dart' as lib2;

// Uses Element from lib1.
Element element1 = Element();

// Uses Element from lib2.
lib2.Element element2 = lib2.Element();

// Import only foo.
import 'package:lib1/lib1.dart' show foo;

// Import all names EXCEPT foo.
import 'package:lib2/lib2.dart' hide foo;
// lazily load library
import 'package:greetings/hello.dart' deferred as hello;
```

#### Lazily loading a library

Deferred loading (also called lazy loading) allows a web app to load a library on demand, if and when the library is needed. Use deferred loading when you want to meet one or more of the following needs.
延迟加载（也称为懒加载）允许一个 Web 应用程序按需加载库，即在需要时才加载库。当你想要满足以下一个或多个需求时，使用延迟加载：

- Reduce a web app's initial startup time 减少 Web 应用程序的初始启动时间.
- Perform A/B testing—trying out alternative implementations of an algorithm, for example.
- Load rarely used functionality, such as optional screens and dialogs.加载不常用的功能，如可选的屏幕和对话框。

That doesn't mean Dart loads all the deferred components at start time. The web app can download deferred components via the web when needed.这并不意味着 Dart 在启动时加载所有延迟组件。Web 应用程序可以在需要时通过 Web 下载延迟组件。

The `dart` tool doesn't support deferred loading for targets other than web. If you're building a Flutter app, consult its implementation of deferred loading in the Flutter guide on `deferred components`.dart 工具不支持除 Web 之外的目标的延迟加载。如果你正在构建一个 Flutter 应用程序，请参考 Flutter 指南中关于`延迟组件`的实现。

To lazily load a library, first import it using `deferred as`.

```dart
import 'package:greetings/hello.dart' deferred as hello;
```

When you need the library, invoke loadLibrary() using the library's identifier.

```dart
Future<void> greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}
```

In the preceding code, the await keyword pauses execution until the library is loaded. For more information about `async` and `await`, see asynchrony support.

You can invoke `loadLibrary()` multiple times on a library without problems. The library is loaded only once.你可以多次调用库的 loadLibrary()，不会有问题。库只会被加载一次。

Keep in mind the following when you use deferred loading 使用延迟加载时请注意以下几点:

- A deferred library's constants aren't constants in the importing file. Remember, these constants don't exist until the deferred library is loaded.延迟库中的常量在导入文件中不是常量。记住，这些常量在延迟库被加载之前是不存在的
- You can't use types from a deferred library in the importing file. Instead, consider moving interface types to a library imported by both the deferred library and the importing file.你不能在导入文件中使用来自延迟库的类型。相反，考虑将接口类型移动到由延迟库和导入文件都导入的库中。
- Dart implicitly inserts loadLibrary() into the namespace that you define using deferred as namespace. The loadLibrary() function returns a Future.Dart 会隐式地将 loadLibrary() 插入到你使用 deferred as 命名空间定义的命名空间中。loadLibrary() 函数返回一个 Future。

#### The library directive

To specify library-level doc comments or metadata annotations, attach them to a library declaration at the start of the file.

```dart
/// A really great test library.
@TestOn('browser')
library; // -> 指令
```

#### Implementing libraries

开发自定义包

### Keywords

[keywords docs](https://dart.dev/language/keywords)

- as
- is
- late
- library
- required
- rethrow
- sync
- typedef
- when
- mixin
- hide
- on
- dynamic
- covariant
- deferred
- external
- factory

### async/await/generator

### exception
### class
- https://dart.dev/language/callable-objects
- https://dart.dev/language/extension-methods
- https://dart.dev/language/extension-types

## dart 虚拟机

### dart 命令

```sh
# 直接执行
dart x.dart
# 编译为exe
dart compile exe path/to/your_script.dart -o path/to/output_executable
```

## Resources

- [dart 文档](https://dart.dev)
- [dart 语法](https://dart.dev/language)