# Triple-slash directives

三斜线指令

Triple-slash directives are single-line comments containing a single XML tag. The contents of the comment are used as compiler directives.

- 仅在文件顶部有效
- 如果它们出现在一个语句或声明之后，那么它们会被当做普通的单行注释，并且不具有特殊的涵义。

## /// <reference path="..." />

最常见的一种，它用于声明文件间的依赖

**三斜线引用告诉编译器在编译过程中要引入的额外的文件**。

## 预处理输入文件

编译器会对输入文件进行预处理来解析所有三斜线引用指令。 在这个过程中，额外的文件会加到编译过程中。

这个过程会以一些根文件开始； 它们是在命令行中指定的文件或是在`tsconfig.json`中的"files"列表里的文件。 这些根文件按指定的顺序进行预处理。 在一个文件被加入列表前，它包含的所有三斜线引用都要被处理，还有它们包含的目标。 三斜线引用以它们在文件里出现的顺序，使用深度优先的方式解析。

一个三斜线引用路径是相对于包含它的文件的，如果不是根文件。

## /// <reference types="..." />

这个指令是用来声明依赖的，声明了对某个包的依赖。

## /// <reference lib="..." />

包含内置的 lib file，如`lib="es2015"`, `lib="es2017.string"`
