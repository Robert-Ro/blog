function incrementX(obj) {
  return 1 + obj.x;
}
incrementX({ x: 42 }); // V8’s compiler is lazy, if you don’t run a function, it won’t interpret it.
