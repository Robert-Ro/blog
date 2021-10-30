"use strict";
Array.prototype.reduce =
  Array.prototype.reduce ||
  function reduce(fn, initialValue) {
    if (!Array.isArray(this)) {
      throw TypeError("should be array");
    }
    var arr = this;
    var length = arr.length;
    var prevEle = initialValue ? initialValue : arr[0];
    var startPoint = initialValue ? 0 : 1;
    for (var i = startPoint; i < length; i++) {
      var curr = arr[i];
      prevEle = fn(prevEle, curr, startPoint, arr);
    }
    return prevEle;
  };
if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, "reduce", {
    value: function (callback /*, initialValue*/) {
      if (this === null) {
        throw new TypeError(
          "Array.prototype.reduce " + "called on null or undefined"
        );
      }
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }
      var o = Object(this);
      var len = o.length >>> 0;
      var k = 0;
      var prevValue;
      if (arguments.length >= 2) {
        prevValue = arguments[1];
      } else {
        while (k < len && !(k in o)) {
          k++;
        }
        if (k >= len) {
          throw new TypeError(
            "Reduce of empty array " + "with no initial value"
          );
        }
        prevValue = o[k++];
      }
      while (k < len) {
        if (k in o) {
          prevValue = callback(prevValue, o[k], k, o);
        }
        k++;
      }
      return prevValue;
    },
  });
}
