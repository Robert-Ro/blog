# memory-management-in-programming - 01

## Demystifying memory management in modern programming languages

Learning about memory management will also help us to write more performant code as the way we write code also has an impact on memory management regardless of the automatic memory management technique used by language.

## Introduction to Memory management

Memory managemnt is the process of controlling and coordingating the way a software application access **computer memory**.

### What is it?

When a sortware runs on a target Operating system on a computer it needs access to the computers RAM(Random-access memory) to:

- load its own bytecode that needs to executed
- store the data values and data structures used by the program that is executed
- load any run-time systems that are required for the program to execute

When a sortware program uses memory there are two regions of memory they use, apart from the space used to load the bytecode, Stack and Heap memory.

### stack

The stack is used for static memory allocation and as the name suggests it is a last in first out(LIFO) stack.

- Due to the nature, the process of sorting and retrieving data from the stack is very fast as there is no lookup required, your just store and retrieve data from the topmost block on it
- But this means any data that is stored on the stack has to be finite and static(The size of data is known at **compile-time**)
- There is where the execution data of the functions are stored as **stack frames**(So, this is the actual exection stack). Each frame is a block of space where the data required for that function is stored.every time a function delcares a new variable, it is "pushed" on to the topmost in the stack. Then every time a function exits, the topmost block is cleared, thus all of the variables pushed on to the stack by that function, are cleared. **These can be determined at compile time due to the static nature of the data stored value**.
- **Multi-threaded applications** can have a stack per thred
- Memory management of the stack is **simple and straightforward** and is done by the OS
- Typical data that are stored on stack are **local variables**(value types or primitives, primitive constants), **pointers**, and **function frames?**
- There is where you would encounter **stack overflow errors** as the size of the stack is limited compared to the Heap
- There is a **limit on the size** of value that can be stored on the Stack for most languages

![7KpvEn1](assets/image/7KpvEn1.gif)

Stack used in JavaScript, objects are stored in Heap and referenced when needed. Here is a [video](https://youtu.be/95_CAUC9nvE) of the same.

## memory mode

### stack memory

### heap memory

## reference

- [memory-management-in-programming](https://deepu.tech/memory-management-in-programming/)
- \*[Visualizing memory management in V8 Engine (JavaScript, NodeJS, Deno, WebAssembly)](https://deepu.tech/memory-management-in-v8/)
- [Avoiding Memory Leaks in Node.js: Best Practices for Performance](https://blog.appsignal.com/2020/05/06/avoiding-memory-leaks-in-nodejs-best-practices-for-performance.html)
