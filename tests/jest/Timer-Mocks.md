# Timer Mocks

The native timer functions (i.e., `setTimeout`, `setInterval`, `clearTimeout`, `clearInterval`) are **less than ideal for a testing environment since they depend on real time to elapse**.

> 延迟 1s 执行，经过 mock 后，10ms+就可以完成

## Run All Timers

Another test we might want to write for this module is one that asserts that the callback is called after 1 second. To do this, we're going to use Jest's timer control APIs to fast-forward time right in the middle of the test:

## Run Pending Timers

## Advance Timers by Time

## Reference

[timer-mocks](https://jestjs.io/docs/timer-mocks)
