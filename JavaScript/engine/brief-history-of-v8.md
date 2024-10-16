## In 2008 Google introduced its souped-up version of the engine, V8.

The V8 engine uses **several threads**. The **main thread** does what you would expect: it fetches your code, compiles it, and executes it. There's also a **separate thread for compiling**, so that the main thread can keep executing while this one is optimizing the code, and a **profiler thread** that will tell the runtime in which methods we spend a lot of time, so that the compilers can optimize them. There are also a **few threads** to handle garbage collection and dead code elimination.

V8 has 2 compilers, **Full-Codegen** and **Crankshaft**. Full-Codegen parses JavaScript directly to machine code, without an intermediary language, allowing it to begin execution sooner. A JIT compiler called Crankshaft produces optimized code for hot methods. This means that in the same V8 program, different levels of optimized code coexist at the same time.

Crankshaft is where the speed really comes from. While Full-Codgen is running, a runtime profiler identifies “hot code,” code that’s executed many times. At this point, the current thread stops executing your code and passes it to Crankshaft. The base here for all optimizations is inline-caching, a technique pioneered by Smaltalk. It consists of patching the code with better code instantly.

The parsed JS is first compiled to a high-level representation called Hydrogen, where most optimizations are done. This is where type-specialization happens. The type-specialization removes what JavaScript calls boxing and unboxing operations. So, for example, if your script often runs a function on a set of integers, it avoids sorting through all the necessary steps to parse strings and floats, and saves the needed steps to parse your integers so it doesn’t have to run them again.

Because JS is non-typed, there is no guarantee that the specialized generated code will continue to work. Your function could be called on to work with strings, or doubles. This code now has to be de-optimized, pulled out of the running thread and replaced with the original runtime code. This is accomplished with a technique called on-stack replacement (OSR). OSR is the mechanism that preserves the semantics of the current stack frame while switching between optimized and unoptimized code. Using OSR, when your function arguments switch types, the optimized code is pulled and your thread is dumped back into the original Hydrogen generated thread to be recompiled.

Crankshafts final job is to lower the representation to a level called Lithium, which is architecture specific. Lithium is the representation that is finally translated into machine code. Here, we see OSR again. The code has been running in your browser or application while all these steps were going on, and now that we have a fully compiled and optimized version we can switch to the optimized version in the middle of the execution.

Simply running the two compilers concurrently boosts performance by 27%. And it’s not done. Every six weeks the V8 team releases a new branch. On September 11th, the team announced version 6.2, which will be released with Chrome 62 in a few weeks. This next version includes what the team calls “all sorts of developer-facing goodies” and performance optimizations. You can read about the next release [HERE](https://v8project.blogspot.com/2017/09/v8-release-62.html).

## learn more

- [Chrome V8 developer channel](https://developers.google.com/v8/)
