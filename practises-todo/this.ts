// https://gitbook.cn/gitchat/column/5c91c813968b1d64b1e08fde/topic/5c99a854ccb24267c1d0194f
// 全局环境下的this
{
  function f1() {
    console.log(this)
  }
  function f2() {
    'use strict'
    console.log(this)
  }
  f1() // window
  f2() // undefined
}
{
  const foo = {
    bar: 10,
    fn: function () {
      console.log(this) // window
      console.log(this.bar) // window.bar
    },
  }
  var fn1 = foo.fn
  fn1()
}
{
  const foo = {
    bar: 10,
    fn: function () {
      console.log(this) // {bar: 10, fn: f}
      console.log(this.bar) // 10
    },
  }
  foo.fn()
}
// 上下文对象调用中的 this
{
  const student = {
    name: 'Lucas',
    fn: function () {
      return this
    },
  }
  console.log(student.fn() === student) // true
}
{
  const person = {
    name: 'Lucas',
    brother: {
      name: 'Mike',
      fn: function () {
        return this.name
      },
    },
  }
  console.log(person.brother.fn()) // Mike
}
{
  const o1 = {
    text: 'o1',
    fn: function () {
      return this.text
    },
  }
  const o2 = {
    text: 'o2',
    fn: function () {
      return o1.fn()
      // return o1.fn  o2.fn() = "o2"
    },
  }
  const o3 = {
    text: 'o3',
    fn: function () {
      var fn = o1.fn
      return fn()
    },
  }

  console.log(o1.fn()) // o1
  console.log(o2.fn()) // o1
  console.log(o3.fn()) // undefined
}
// bind/call/apply 改变 this 指向
{
  const foo = {
    name: 'lucas',
    logName: function () {
      console.log(this.name)
    },
  }
  const bar = {
    name: 'mike',
  }
  console.log(foo.logName.call(bar)) // mike
}
// 构造函数和 this
{
  function Foo() {
    this.bar = 'Lucas'
  }
  // @ts-ignore
  const instance = new Foo()
  console.log(instance.bar) // Lucas
}
{
  function Foo() {
    this.user = 'Lucas'
    const o = {}
    return o
  }
  // @ts-ignore
  const instance = new Foo()
  console.log(instance.user) // undefined
}
{
  function Foo() {
    this.user = 'Lucas'
    return 1
  }
  // @ts-ignore
  const instance = new Foo()
  console.log(instance.user) //Lucas
}
// 箭头函数中的 this 指向
{
  const foo = {
    fn: function () {
      setTimeout(function () {
        console.log(this) // window
      })
    },
  }
  console.log(foo.fn()) // undefined
}
{
  const foo = {
    fn: function () {
      // this
      setTimeout(() => {
        console.log(this)
      })
    },
  }
  console.log(foo.fn()) // { foo: { fn : f } }
}
// this 优先级相关
{
  // @ts-ignore
  function foo(a) {
    console.log(this.a)
  }

  const obj1 = {
    a: 1,
    foo: foo,
  }

  const obj2 = {
    a: 2,
    foo: foo,
  }
  // @ts-ignore
  obj1.foo.call(obj2) // 2
  // @ts-ignore
  obj2.foo.call(obj1) // 1
}
{
  // @ts-ignore
  function foo(a) {
    this.a = a
  }

  const obj1 = {}

  var bar = foo.bind(obj1)
  bar(2)
  // @ts-ignore
  console.log(obj1.a) // 2
  // @ts-ignore
  var baz = new bar(3)
  console.log(baz.a) // 3
}
{
  function foo() {
    //@ts-ignore
    return (a) => {
      //由于 foo() 的 this 绑定到 obj1，bar（引用箭头函数）
      // 的 this 也会绑定到 obj1，箭头函数的绑定无法被修改。
      console.log(this.a)
    }
  }

  const obj1 = {
    a: 2,
  }

  const obj2 = {
    a: 3,
  }

  const bar = foo.call(obj1)
  //@ts-ignore
  console.log(bar.call(obj2)) //2
}
{
  var a = 123
  //@ts-ignore
  const foo = () => (a) => {
    console.log(this.a) // window
  }

  const obj1 = {
    a: 2,
  }

  const obj2 = {
    a: 3,
  }

  var bar = foo.call(obj1)
  //@ts-ignore
  console.log(bar.call(obj2)) // 123
}
{
  const a = 123 // let a = 123
  //@ts-ignore
  const foo = () => (a) => {
    console.log(this.a)
  }

  const obj1 = {
    a: 2,
  }

  const obj2 = {
    a: 3,
  }

  var bar = foo.call(obj1)
  //@ts-ignore
  console.log(bar.call(obj2)) // undefined
}
