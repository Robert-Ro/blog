# WrapperArray

A `WrapperArray` is an object that contains an array of `Wrappers`, and methods to test the `Wrappers`.

## Properties

### wrappers

`array` (read-only): the `Wrappers` contained in the `WrapperArray`

### length

`number` (read-only): the number of `Wrappers` contained in the `WrapperArray`

## Methods

### at ⭐⭐⭐⭐⭐

Returns `Wrapper` at `index` passed. Uses zero based numbering (i.e. first item is at index 0). If `index` is negative, indexing starts from the last element (i.e. last item is at index -1).

### contains ⭐⭐⭐

Assert every wrapper in `WrapperArray` contains selector.

### filter

Filter `WrapperArray` with a predicate function on `Wrapper` objects.

Behavior of this method is similar to `Array.prototype.filter`.

每个 wrapper 都执行

### setChecked

This method is an alias of the following code.

```js
wrapperArray.wrappers.forEach((wrapper) => wrapper.setChecked(checked));
```

### setProps

### setData

### setValue

### setMethods

### trigger
