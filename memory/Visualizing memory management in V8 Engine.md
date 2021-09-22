# 🚀 Visualizing memory management in V8 Engine (JavaScript, NodeJS, Deno, WebAssembly)

Since JavaScript is an _interpreted language_, it needs an engine to interpret and execute code. The `V8` engine interprets JavaScript and compiles it down to native machine code. `V8` is written in `C++` and can be embedded in any `C++` application.

## V8 memory structure

Since JavaScript is _single-threaded_ **V8 also uses a single process per JavaScript context** and hence if _you use service workers it will spawn a new V8 process per worker_. A running program is always represented by(由……代表) some allocated memory in the V8 process and this is called **Resident Set**. This is further divided into different segments as below:
![](../assets/image/kSgatSL.png)

### Heap Memory

> 动态的，可变大小的
> This is where V8 **stores objects or dynamic data**. This is the biggest block of memory area and _this is where **Garbage Collection(GC)** takes place_. _The entire heap memory is not garbage collected, only the Young and Old space is managed by garbage collection_. Heap is further divided into below:

- **New Space**: New space or **“Young generation”** is where new objects live and most of these objects are short-lived. This space is small and has two **semi-space**, similar to `S0` & `S1` in JVM. This space is managed by the **“Scavenger(Minor GC)”**, we will look at it later. The size of the new space can be controlled using the `--min_semi_space_size`(Initial) and `--max_semi_space_size`(Max) V8 flags.
- **Old Space**: Old space or **“Old generation”** is where objects that survived the “New space” for two minor GC cycles are moved to. This space is managed up by the **Major GC(Mark-Sweep & Mark-Compact)”**, we will look at it later. The size of old space can be controlled using the `--initial_old_space_size`(Initial) and `--max_old_space_size`(Max) V8 flags. This space is divided into two:
  - **Old pointer space**: Contains _survived objects that have pointers to other objects_.
  - Old data space: Contains **objects that just contain data**(no pointer to other objects). Strings, boxed numbers, and arrays of unboxed doubles are moved here after _surviving in “New space” for two minor GC cycles_.
- **Large object space**: This is where objects which are larger than the size limits of other spaces live. Each object gets its own [mmap](https://en.wikipedia.org/wiki/Mmap)'d region of memory. _Large objects are never moved by the garbage collector_.
- **Code-space**: This is where the **Just In Time(JIT)** compiler stores _compiled code Blocks_. This is the only space with _executable memory_ (although Codes may be allocated in “Large object space”, and those are executable, too).
- **Cell space**, **property cell space**, **and map space**: These spaces contain `Cells`, `PropertyCells`, and `Maps`, respectively. Each of these spaces contains objects which are all the same size and has some constraints on what kind of objects they point to, which simplifies collection.

Each of these spaces is composed of a set of pages. A Page is a contiguous chunk of memory allocated from the operating system with mmap. _Each page is 1MB in size_, except for Large object space.

### Stack

> 静态的，固定大小的
> This is the stack memory area and **there is one stack per V8 process**. This is where static data including **method/function frames**, primitive values, and pointers to objects are stored. The stack memory limit can be set using the `--stack_size` V8 flag.

## V8 memory usage (Stack vs Heap)

Now that we are clear about how memory is organized let’s see how the most important parts of it are used when a program is executed.

Let’s use the below JavaScript program, the code is not optimized for correctness hence ignore issues like unnecessary intermediatory variables and such, the focus is to visualize stack and heap memory usage.

```js
class Employee {
  constructor(name, salary, sales) {
    this.name = name;
    this.salary = salary;
    this.sales = sales;
  }
}

const BONUS_PERCENTAGE = 10;

function getBonusPercentage(salary) {
  const percentage = (salary * BONUS_PERCENTAGE) / 100;
  return percentage;
}

function findEmployeeBonus(salary, noOfSales) {
  const bonusPercentage = getBonusPercentage(salary);
  const bonus = bonusPercentage * noOfSales;
  return bonus;
}

let john = new Employee("John", 5000, 5);
john.bonus = findEmployeeBonus(john.salary, john.sales);
console.log(john.bonus);
```

As you can see:

- **Global scope** is kept in a “Global frame” on the `Stack`
- Every function call is added to the `stack` memory as a `frame-block`
- *All local variables* including arguments and the return value is saved within the function frame-block on the `Stack`
- *All primitive types* like int & string are stored directly on the `Stack`. This applies to global scope as well and yes String is a primitive type of JavaScript
- *All object* types like Employee & Function are created on the `Heap` and is referenced from the `Stack` using `Stack` pointers. Functions are just objects in JavaScript. This applies to global scope as well
- Functions called from the current function is pushed on top of the `Stack`
- When a function returns its frame is removed from the `Stack`
- Once the main process is complete, the objects on the `Heap` do not have any more pointers from `Stack` and becomes `orphan`
- Unless you make a copy explicitly, all object references within other objects are done using `reference pointers`
- // FIXME ? cloures 存放位置

The `Stack` as you can see is automatically managed and is done so by the operating system rather than V8 itself. Hence we do not have to worry much about the `Stack`. The Heap, on the other hand, is not automatically managed by the `OS` and since it’s the biggest memory space and holds dynamic data,
- it could grow exponentially causing our program to run out of memory over time.
- It also becomes fragmented over time slowing down applications. This is where garbage collection comes in.

Distinguishing pointers and data on the heap is important for garbage collection and V8 uses the **“Tagged pointers”** approach for this - in this approach, it reserves a bit at the end of each word to indicate whether it is pointer or data. This approach requires limited compiler support, but it’s simple to implement while being fairly efficient.
## V8 Memory management: Garbage collection
### Minor GC(Scavenger)
This type of GC **keeps the young or new generation space compact and clean**. Objects are allocated in new-space, which is fairly small (between 1 and 8 MB, depending on behavior heuristics). Allocation in “new space” is very cheap: there is an allocation pointer which we increment whenever we want to reserve space for a new object.

When the allocation pointer reaches the end of the new space, a minor GC is triggered. This process is also called **Scavenger** and it implements [Cheney’s algorithm](http://en.wikipedia.org/wiki/Cheney's_algorithm). It occurs frequently and uses parallel helper threads and is very fast.

The new space is divided into *two equal-sized semi-spaces*: **to-space** and **from-space**. Most allocations are made in `from-space` (except certain kinds of objects, such as executable Codes which are always allocated in old-space). *When `from-space` fills up the minor GC is triggered*.

Click on the slides and move forward/backward using arrow keys to see the process:
1. Let us assume that there are already objects on the **“from-space”** when we start(Blocks 01 to 06 marked as used memory)
2. The process creates a new object(07)
3. V8 tries to get the required memory from from-space, but there is no free space in there to accommodate our object and hence **V8 triggers minor GC**
4. Minor GC recursively traverses the object graph in **“from-space”**
    1. starting from stack pointers(GC roots) to find objects that are used or alive(Used memory).
    2. These objects are moved to a page in the **“to-space”**.
    3. Any objects reference by these objects are also moved to this page in **“to-space”** and their pointers are updated.
    4. This is repeated until all the objects in **“from-space”** are scanned全部扫描完.
    5. By end of this, the **“to-space”** is automatically compacted reducing fragmentation紧凑减少碎片
5. Minor GC now empties the **“from-space”** as any remaining object here is garbage
6. Minor GC swaps the **“to-space”** and **“from-space”**, all the objects are now in **“from-space”** and the **“to-space”** is empty
7. The new object is allocated memory in the **“from-space”**
8. Let us assume that some time has passed and there are more objects on the **“from-space”** now(Blocks 07 to 09 marked as used memory)
9. The application creates a new object(10)
10. V8 tries to get required memory from **“from-space”**, but there is no free space in there to accommodate our object and hence V8 triggers a second minor GC
11. The above process is repeated and any alive objects that survived the second minor GC is moved to the “Old space”. First-time survivors are moved to the **“to-space”** and the remaining garbage is cleared from **“from-space”**
12. Minor GC swaps the **“to-space”** and **“from-space”**, all the objects are now in **“from-space”** and the **“to-space”** is empty
13. The new object is allocated memory in the **“from-space”**

So we saw how minor GC reclaims space from the young generation and keeps it compact. It is a stop-the-world process but *it’s so fast* and *efficient* that *it is negligible* most of the time. Since this process doesn’t scan objects in the “old space” for any reference in the “new space” it uses a register of all pointers from old space to new space. This is recorded to the store buffer by a process called [write barriers](https://www.memorymanagement.org/glossary/w.html#term-write-barrier).
### Major GC
> Mark-Sweep-Compact algorithm

## Conclusion
This post should give you an overview of the **V8 memory structure** and **memory management**. This is not exhaustive, there are a lot *more advanced concepts* and you can learn about them from [v8.dev](https://v8.dev). But for most `JS/WebAssembly` developers, this level of information would be sufficient and I hope it helps you write better code, considering these in mind, for more performant applications, and keeping these in mind would help you to avoid the next memory leak issue you might encounter otherwise.

## References
- [v8.dev/blog/trash-talk](https://v8.dev/blog/trash-talk)
- [jayconrod.com](http://jayconrod.com/posts/55/a-tour-of-v8-garbage-collection)
- [blog.codeship.com](https://blog.codeship.com/understanding-garbage-collection-in-node-js/)
- [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
- [blog.sessionstack.com](https://blog.sessionstack.com/how-javascript-works-memory-management-how-to-handle-4-common-memory-leaks-3f28b94cfbec)