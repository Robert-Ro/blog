## Virtual Machines

A JavaScript engine is often defined as a type of virtual machine or software-driven emulation of a given computer system. There are many types of virtual machines and they are classified by how precisely they are able to emulate or substitute for actual physical machines.

### A system virtual machine

for example, provides a complete emulation of a platform on which an operating system can be executed. Mac users are familiar with Parallels, a system virtual machine that allows Windows to be run on a Mac.

### A process virtual machine

on the other hand, is less fully functional and can run only one program or process. Wine is a process virtual machine that allows Windows applications to be run on a Linux machine, but does not provide an entire Windows OS on a Linux box.

A JavaScript engine is a kind of process virtual machine that is designed specifically to interpret and execute JavaScript code. It’s important to differentiate between the **layout engines** that power a browser by structuring a Web page, versus the lower level JavaScript engines that interpret and execute code.

## What is a JavaScript Engine?

The basic job of a JavaScript engine is to take the JavaScript code that **a developer writes** and **convert it to fast, optimized code** that can be interpreted by a browser or even embedded into an application.

More precisely, **each JavaScript engine implements a version of ECMAScript, of which JavaScript is a dialect**. As ECMAScript evolves, so do JavaScript engines.

There are so many different engines because each one is designed to

- work with a different Web browser,
- headless browser,
- or runtime like Node.js.

Headless browsers are Web browsers without a graphic user interface that are useful for running automated tests against Web products. A good example is PhantomJS.

Node.js is an asynchronous, event-driven framework that allows JavaScript to be used on the server side.

Since these are JavaScript-driven tools, they are powered by JavaScript engines.

## How Does a JavaScript Engine Work?

Given the definition of a virtual machine, it makes sense to term a JavaScript engine as a **process virtual machine**, since its sole purpose is to read and compile JavaScript code. This doesn’t mean that it’s a simple engine.

> JavaScriptCore, for example, has six building blocks that analyze, interpret, optimize, and garbage collect JavaScript code.

So how does this work? This depends, of course, on the engine. The two main engines of interest are:

- WebKit’s JavaScriptCore and
- Google’s V8 engine

because they are leveraged by NativeScript. These two engines handle processing code differently.

### JavaScriptCore

performs a series of steps to interpret and optimize a script.

- It performs a lexical analysis,
- breaking down the source into a series of tokens or strings with an identified meaning.
- The tokens are then analyzed by the parser for syntax and built into a syntax tree.
- Four just-in-time processes then kick in, analyzing and executing the bytecode produced by the parser.

In simple terms, this JavaScript engine takes the source code, breaks it up into strings—a.k.a. lexes it, takes those strings and converts them into bytecode that a compiler can understand, and then executes it.

### Google’s V8 engine

written in C++, also compiles and executes JavaScript source code, handles memory allocation, and garbage collects leftovers. Its design consists of two compilers that assemble source code directly into machine code.

These compilers are Full-codegen, a fast compiler that produces un-optimized code and Crankshaf, a slower compiler that produces fast, optimized code.

If Crankshaft determines that the un-optimized code generated by Full-codegen is in need of optimization, it replaces it—a process known as ‘crankshafting.’

Once machine code is produced by the compilation process, the engine exposes all the data types, operators, objects, and functions specified in the ECMA standard to the browser or any runtime that needs to use them, like NativeScript.