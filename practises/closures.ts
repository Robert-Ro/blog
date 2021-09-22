{
  const foo = (function () {
    var v = 0;
    return () => {
      return v++;
    };
  })();

  for (let i = 0; i < 10; i++) {
    foo();
  }

  console.log(foo()); // 10
}
{
  const foo = () => {
    var arr = [];
    // @ts-ignore
    var i;

    for (i = 0; i < 10; i++) {
      arr[i] = function () {
        // @ts-ignore
        console.log(i);
      };
    }

    return arr[0];
  };

  foo()(); // 10
}
{
  //@ts-ignore
  var fn = null;
  const foo = () => {
    var a = 2;
    function innerFoo() {
      console.log(a);
    }
    fn = innerFoo;
  };

  const bar = () => {
    //@ts-ignore
    fn();
  };

  foo();
  bar(); // 2
}

{
  var fn = null;
  const foo = () => {
    var a = 2;
    function innerFoo() {
      // @ts-ignore
      console.log(c);
      console.log(a);
    }
    fn = innerFoo;
  };

  const bar = () => {
    var c = 100;
    // @ts-ignore
    fn();
  };

  foo();
  bar(); // ReferenceError, 2
}
{
  function Person() {
    this.name = "lucas";
  }

  const getSingleInstance = (function () {
    // @ts-ignore
    var singleInstance;
    return function () {
      // @ts-ignore
      if (singleInstance) {
        // @ts-ignore
        return singleInstance;
      } // @ts-ignore
      return (singleInstance = new Person());
    };
  })();
  // @ts-ignore
  const instance1 = new getSingleInstance();
  // @ts-ignore
  const instance2 = new getSingleInstance();
  console.log(instance1 === instance2); // true
}