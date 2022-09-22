# Snapshot

Snapshot tests are a very useful tool whenever you want to **make sure the output of your functions not change unexpectedly**.

When using snapshot, Vitest will take a snapshot of the given value, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the result.

## Reference

- [vitest snapshot](https://vitest.dev/guide/snapshot.html)
