## memory management

## v8

> machine code, bytecode, optimization/hot code

### compile

> pre-compile function ?

### compiler

- full-codegen: a simply and very fast compiler that produced simple and relatively slow machine code
- Crankshaft: a more complex (Just-In-Time) optimizing compiler that produced highly-optimized code
- JIT(Just-In-Time) compiler

### threads

> threads??? => browser main thread

- main thread: does what your would expect: fetch your code, compile it and then execute it
- separate thread for compiling: so that main thread can keep executing while the former is optimizing the code
- profiler thread: tell the runtime on which mehods we spend a lot of time so that CrankShaft can optimize them
- few theads to handle Garbage Collector sweeps

### reference

- [How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)

## event-loop

- [图示 event-loop](https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0)
- [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/),借助 debug 动画的形式展现执行顺序
- [How JavaScript works: Event loop and the rise of Async programming + 5 ways to better coding with async/await](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
