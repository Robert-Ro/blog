# The Dart type system

> [LINKS](https://github.com/dart-lang/site-www/blob/main/src/content/language/type-system.md)

## What is soundness?

什么是健全性？

Soundness is about ensuring your program can't get into certain invalid states. A sound type system means you can never get into a state where an expression evaluates to a value that doesn't match the expression's static type. For example, if an expression's static type is String, at runtime you are guaranteed to only get a string when you evaluate it.
健全性是关于确保程序不能进入某些无效状态。一个健全的类型系统意味着你永远不会进入一个表达式求值结果与其静态类型不匹配的状态。例如，如果一个表达式的静态类型是 String，在运行时你被保证在求值时只能得到一个字符串。

Dart's type system, like the type systems in Java and C#, is sound. It enforces that soundness using a combination of static checking (compile-time errors) and runtime checks. For example, assigning a String to int is a compile-time error. Casting an object to a String using as String fails with a runtime error if the object isn't a String.
Dart 的类型系统，就像 Java 和 C# 中的类型系统一样，是健全的。它使用静态检查（编译时错误）和运行时检查的组合来强制执行这种健全性。例如，将 String 分配给 int 是一个编译时错误。如果对象不是一个 String，使用 as String 将对象强制转换为 String 会在运行时失败并产生运行时错误。
