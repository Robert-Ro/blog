# Mock Timers

- ⭐⭐ `jest.useFakeTimers(implementation?: 'modern' | 'legacy')`: Instructs Jest to use fake versions of the standard timer functions (`setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`, `nextTick`, `setImmediate` and `clearImmediate` as well as `Date`).
- `jest.useRealTimers()`: Instructs Jest to use the real versions of the standard timer functions.
- ⭐⭐`jest.runAllTicks()`: Exhausts the **micro-task queue**.

  When this API is called, all pending micro-tasks that have been queued via `process.nextTick` will be executed. Additionally, if those micro-tasks themselves schedule new micro-tasks, those **will be continually exhausted** until there are no more micro-tasks remaining in the queue.

- ⭐⭐⭐ **`jest.runAllTimers()`**: Exhausts both the **macro-task queue** (i.e., all tasks queued by `setTimeout()`, `setInterval()`, and `setImmediate()`) and the micro-task queue (usually interfaced in node via `process.nextTick`).

  When this API is called, _all pending macro-tasks and micro-tasks will be executed_. If those tasks themselves schedule new tasks, those will be continually exhausted until there are no more tasks remaining in the queue.

  This is often useful for synchronously executing setTimeouts during a test in order to synchronously assert about some behavior that would only happen after the `setTimeout()` or `setInterval() `callbacks executed. See the [Timer mocks](https://jestjs.io/docs/timer-mocks) doc for more information.

- `jest.runAllImmediates()`: Exhausts all tasks queued by `setImmediate()`. (This function is not available when using modern fake timers implementation)
- `jest.advanceTimersByTime(msToRun)`:
- ⭐⭐⭐`jest.runOnlyPendingTimers()`: Executes **only** the macro-tasks that are currently pending (i.e., only the tasks that have been queued by `setTimeout()` or `setInterval()` up to this point). _If any of the currently pending macro-tasks schedule new macro-tasks, those new tasks will not be executed by this call_.

  This is **useful** for scenarios such as one where the module being tested schedules a `setTimeout()` whose callback schedules another `setTimeout()` recursively (meaning the scheduling never stops). In these scenarios, it's useful to be able to run forward in time by a single step at a time.

- `jest.advanceTimersToNextTimer(steps)`:

- ⭐⭐`jest.clearAllTimers()`: Removes any pending timers from the timer system.

  This means, if any timers have been scheduled (but have not yet executed), they will be cleared and will **never have the opportunity to execute in the future**.

- `jest.getTimerCount()`: Returns the number of fake timers **still left** to run.
- `jest.setSystemTime(now?: number | Date)`:
- `jest.getRealSystemTime()`: When mocking time, `Date.now()` will also be mocked. If you for some reason need **access to the real current time**, you can invoke this function.

- `jest.setTimeout(timeout)`:
  **Set the default timeout interval for tests and before/after hooks in milliseconds**. This only **affects the test file from which this function is called**.

  Note: The default timeout interval is `5` seconds if this method is not called.

  Note: If you want to **set the timeout for all test files**, a good place to do this is in `setupFilesAfterEnv`.

## Reference

- [links](https://jestjs.io/docs/jest-object#mock-timers)
