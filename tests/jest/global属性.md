# Globals

In your test files, Jest puts each of these methods and objects into the global environment. You don't have to require or import anything to use them. However, if you prefer explicit imports, you can do `import {describe, expect, test} from '@jest/globals'`.

## Methods

- ⭐⭐`afterAll(fn, timeout)`

  **Runs a function after all the tests in this file have completed**. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

  This is often useful if you want to clean up some global setup state that is shared across tests.执行清除操作

  If afterAll is inside a describe block, _it runs at the end of the describe block_.

  If you want to run _some cleanup after every test instead of after all tests_, use `afterEach` instead.

- ⭐⭐⭐`afterEach(fn, timeout)`

  **Runs a function after each one of the tests in this file completes**. If the function returns a promise or is a generator, Jest waits for that promise to resolve before continuing.

  Optionally, you can provide a `timeout` (in milliseconds) for specifying how long to wait before aborting. Note: _The default timeout is 5 seconds_.

  This is often useful if you want to clean up some temporary state that is created by each test.一般是：在每一个测试后面执行清除操作

  If `afterEach` is inside a `describe` block, it only runs after the tests that are inside this describe block.

- ⭐⭐`beforeAll(fn, timeout)`
  Runs a function before any of the tests in this file run. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running tests.

  Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before aborting. Note: The default timeout is 5 seconds.

  This is often useful if you want to set up some global state that will be used by many tests.设置用于多个测试的全局状态

  If `beforeAll` is inside a `describe` block, **it runs at the beginning of the describe block**.

- ⭐⭐⭐`beforeEach(fn, timeout)`
  Runs a function before each of the tests in this file runs. If the function returns a promise or is a generator, Jest waits for that promise to resolve before running the test.

  Optionally, you can provide a timeout (in milliseconds) for specifying how long to wait before aborting. Note: The default timeout is 5 seconds.

  This is often useful if you want to reset some global state that will be used by many tests. 重置某些状态

- ⭐⭐`describe(name, fn)`

  creates a block that groups together several related tests.创建一个快用于聚集相关的一些测试

  This isn't required 不是必需的 - you can write the `test` blocks directly at the top level. But this can be handy if you prefer your tests to be organized into groups.

  You can also nest describe blocks if you have a hierarchy of tests

- ⭐⭐`describe.each(table)(name, fn, timeout)`

  Use describe.each if you keep **duplicating the same test suites with different data**. `describe.each` allows you to write the test suite once and pass data in.批量创建一组数据不同的相同测试集

- `describe.only(name, fn)`
- `describe.only.each(table)(name, fn)`
- `describe.skip(name, fn)`
- `describe.skip.each(table)(name, fn)`
- ⭐⭐⭐`test(name, fn, timeout)`: Also under the alias: `it(name, fn, timeout)`

  - The first argument is the **test name**;
  - the second argument is **a function that contains the expectations to test**.
  - The third argument (optional) is timeout (in milliseconds) for specifying how long to wait before aborting. Note: **The default timeout is 5 seconds**.

  > Note: If a **promise is returned** from test, Jest will wait for the promise to resolve before letting the test complete. Jest will also wait if you **provide an argument to the test function**, usually called `done`. This could be handy when you want to test callbacks. See how to test async code [here](https://jestjs.io/docs/asynchronous#callbacks).

- `test.concurrent(name, fn, timeout)`: Also under the alias: `it.concurrent(name, fn, timeout)`
  Use `test.concurrent` if you want the test to run concurrently.
  > test.concurrent is considered experimental - see [here](https://github.com/facebook/jest/labels/Area%3A%20Concurrent) for details on missing features and other issues
- ⭐⭐`test.only(name, fn, timeout)`
  Also under the aliases: `it.only(name, fn, timeout)`, and `fit(name, fn, timeout)`

  When you are debugging a large test file, you will often only want to run a subset of tests. You can use `.only` to specify which tests are the only ones you want to run in that test file.

- ⭐⭐`test.skip(name, fn)`
  Also under the aliases: `it.skip(name, fn)`, `xit(name, fn)`, and `xtest(name, fn)`

  When you are maintaining a large codebase, you may sometimes find a test that is temporarily broken for some reason. If you want to skip running this test, but you don't want to delete this code, you can use `test.skip` to specify some tests to skip.
- ⭐⭐`test.todo(name)`: Also under the alias: `it.todo(name)`

  Use `test.todo` when you are planning on writing tests. These tests will be highlighted in the summary output at the end *so you know how many tests you still need todo*.
## Reference

- [Jest global methods](https://jestjs.io/docs/api#methods)
