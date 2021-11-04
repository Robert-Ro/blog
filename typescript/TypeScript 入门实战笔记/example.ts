{
  // 类型守卫
  {
    // typeof
    const convertToUpperCase = (strOrArray: string | string[]) => {
      if (typeof strOrArray === "string") {
        return strOrArray.toUpperCase();
      } else if (Array.isArray(strOrArray)) {
        return strOrArray.map((item) => item.toUpperCase());
      }
    };
  }
  {
    // switch、字面量恒等
    const convert = (c: "a" | 1) => {
      switch (c) {
        case 1:
          return c.toFixed(); // 缩小
        case "a":
          return c.toLowerCase(); // 缩小
      }
    };
    // switch
    const feat = (
      c: { animal: "panda"; name: "China" } | { feat: "video"; name: "Japan" }
    ) => {
      switch (c.name) {
        case "China":
          return c.animal; // c is "{ animal: 'panda'; name: 'China' }"
        case "Japan":
          return c.feat; // c is "{ feat: 'video'; name: 'Japan' }"
      }
    };
  }
  // instanceof
  {
    class Dog {
      wang = "wangwang";
    }
    class Cat {
      miao = "miaomiao";
    }
    const getName = (animal: Dog | Cat) => {
      if (animal instanceof Dog) {
        return animal.wang;
      } else if (animal instanceof Cat) {
        return animal.miao;
      }
    };
  }
  // in
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }

    const getName = (animal: Dog | Cat) => {
      // @ts-expect-error
      if (typeof animal.wang == "string") {
        // ts(2339)
        // @ts-expect-error
        return animal.wang; // ts(2339)
        // @ts-expect-error
      } else if (animal.miao) {
        // ts(2339)
        // @ts-expect-error
        return animal.miao; // ts(2339)
      }
    };
  }
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }
    const getName = (animal: Dog | Cat) => {
      if ("wang" in animal) {
        // ok

        return animal.wang; // ok
      } else if ("miao" in animal) {
        // ok

        return animal.miao; // ok
      }
    };
  }
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }
    const isDog = function (animal: Dog | Cat): animal is Dog {
      return "wang" in animal;
    };
    const getName = (amimal: Dog | Cat) => {
      if (isDog(amimal)) {
        //  isDog 将 animal 的类型缩小为 Dog
        return amimal.wang;
      }
    };
  }
  {
    interface Dog {
      wang: string;
    }

    interface Cat {
      miao: string;
    }
    const getName = <T extends Dog | Cat>(animal: T) => {
      if ("wang" in animal) {
        return animal.wang; // ts(2339)
      }

      return animal.miao; // ts(2339)
    };
  }
}
{
  // 类型兼容
  {
    let never: never = (() => {
      throw Error("never");
    })();
    let a: number = never; // ok
    let b: () => any = never; // ok
    let c: {} = never; // ok
    //@ts-expect-error
    let d: never = ""; // ts2332
  }
  {
    let unknown: unknown;
    //@ts-expect-error
    const a: number = unknown; // ts(2322)
    //@ts-expect-error
    const b: () => any = unknown; // ts(2322)
    //@ts-expect-error
    const c: {} = unknown; // ts(2322)
  }
  {
    let thisIsAny: any;
    let thisIsNever: never;
    let thisIsUnknown: unknown;
    let thisIsVoid: void;
    let thisIsUndefined: undefined;
    let thisIsNull: null;
    // void 赋值给unknown, any
    thisIsAny = thisIsVoid; // ok
    thisIsUnknown = thisIsVoid; // ok
    // any never undefined赋值给void
    thisIsVoid = thisIsAny; // ok
    thisIsVoid = thisIsNever; // ok
    thisIsVoid = thisIsUndefined; // ok
    // null undefined
    thisIsAny = thisIsNull; // ok
    thisIsUnknown = thisIsNull; // ok
    thisIsAny = thisIsUndefined; // ok
    thisIsUnknown = thisIsUndefined; // ok

    thisIsNull = thisIsAny; // ok
    thisIsNull = thisIsNever; // ok
    thisIsUndefined = thisIsAny; // ok
    thisIsUndefined = thisIsNever; // ok
  }
  {
    enum A {
      one,
    }
    let num: number = A.one; // ok 枚举 A 赋值给了数字（number）类型
    let fun = (param: A) => void 0;
    fun(1); // ok 使用数字字面量 1 替代了枚举 A。
  }
  {
    enum A {
      one,
    }
    enum B {
      one,
    }
    let a: A;
    let b: B;
    //@ts-expect-error
    a = b; // ts(2322)
    //@ts-expect-error
    b = a; // ts(2322)
  }
  {
    const one = 1;
    let num: number = one; // ok
    interface IPar {
      name: string;
    }
    interface IChild extends IPar {
      id: number;
    }
    let Par: IPar;
    let Child: IChild;
    Par = Child; // ok
    class CPar {
      cname = "";
    }
    class CChild extends CPar {
      cid = 1;
    }
    let ParInst: CPar;
    let ChildInst: CChild;
    ParInst = ChildInst; // ok
    let mixedNum: 1 | 2 | 3 = one; // ok

    let ICPar: IPar | CPar;
    let ICChild: IChild | CChild;
    ICPar = ICChild; // ok
  }
  {
    class C1 {
      name = "1";
    }
    class C2 {
      name = "2";
    }
    interface I1 {
      name: string;
    }
    interface I2 {
      name: string;
    }
    let InstC1: C1;
    let InstC2: C2;
    let O1: I1;
    let O2: I2;
    InstC1 = InstC2; // ok
    O1 = O2; // ok
    InstC1 = O1; // ok
    O2 = InstC2; // ok
  }
  {
    interface I1 {
      name: string;
    }
    interface I2 {
      id: number;
      name: string;
    }
    class C2 {
      id = 1;
      name = "1";
    }
    let O1: I1;
    let O2: I2;
    let InstC2: C2;
    O1 = O2;
    O1 = InstC2;
    //@ts-expect-error
    O2 = O1; //ts2741

    O1 = {
      // @ts-expect-error
      id: 2, // ts(2322)
      name: "name",
    };
    let O3 = {
      id: 2,
      name: "name",
    };
    O1 = O3; // ok
    O1 = {
      id: 2,
      name: "name",
    } as I2; // ok
  }
  {
    class C1 {
      name = "1";
      private id = 1;
      protected age = 30;
    }

    class C2 {
      name = "2";
      private id = 1;
      protected age = 30;
    }
    let InstC1: C1;
    let InstC2: C2;
    // 因为类 C1 和类 C2 各自包含私有和受保护的属性，且实例 InstC1 和 InstC2 不能相互赋值，
    // 所以提示了一个 ts(2322) 类型的错误
    //@ts-expect-error
    InstC1 = InstC2; // ts(2322)
    // @ts-expect-error
    InstC2 = InstC1; // ts(2322)
  }
  {
    class CPar {
      private id = 1;
      protected age = 30;
    }
    class C1 extends CPar {
      constructor(inital: string) {
        super();
      }
      name = "1";
      static gender = "man";
    }
    class C2 extends CPar {
      constructor(inital: number) {
        super();
      }
      name = "2";
      static gender = "woman";
    }
    let InstC1: C1;
    let InstC2: C2;
    // 因为类 C1、类 C2 的私有、受保护属性都继承自同一个父类 CPar，
    // 所以检测类型兼容性时会忽略其类型不相同的构造函数和静态属性 gender
    InstC1 = InstC2; // ok
    InstC2 = InstC1; // ok
  }
  {
    interface I1 {
      name: number;
    }
    //@ts-expect-error
    interface I2 extends I1 {
      // ts(2430)
      name: string;
    }
    class C1 {
      name = "1";
      private id = 1;
    }
    //@ts-expect-error
    class C2 extends C1 {
      // ts(2415) Types have separate declarations of a private property 'id'
      name = "2";
      private id = 1; // <- 都含有私有属性id
    }
    class C3 implements I1 {
      //@ts-expect-error
      name = ""; // ts(2416) Type 'string' is not assignable to type 'number'
    }
  }
  {
    interface I1<T> {
      id: number; // 入参 T 是无用的
    }
    let O1: I1<string>;
    let O2: I1<number>;
    O1 = O2; // ol
  }
  {
    // 而对于未明确指定类型入参泛型的兼容性，例如函数泛型（实际上仅有函数泛型才可以在不需要实例化泛型的情况下赋值），
    // TypeScript 会把 any 类型作为所有未明确指定的入参类型实例化泛型，然后再检测其兼容性，如下代码所示：
    let fun1 = <T>(p1: T): 1 => 1;
    let fun2 = <T>(p2: T): number => 2;
    fun2 = fun1; // ok？
  }
  // 协变例子
  {
    type isChild<Child, Par> = Child extends Par ? true : false;
    interface Animal {
      name: string;
    }
    interface Dog extends Animal {
      woof: () => void;
    }
    type Covariance<T> = T;
    type isCovariant = isChild<Covariance<Dog>, Covariance<Animal>>; // true 协变 <-
    // 更多例子
    type isPropAssignmentCovariant = isChild<{ type: Dog }, { type: Animal }>; // true
    type isArrayElementCovariant = isChild<Dog[], Animal[]>; // true
    type isReturnTypeCovariant = isChild<() => Dog, () => Animal>; // true
    // 逆变例子
    type Contravariance<T> = (param: T) => void;
    type isNotContravariance = isChild<
      Contravariance<Dog>,
      Contravariance<Animal>
    >; // false;
    type isContravariance = isChild<
      Contravariance<Animal>,
      Contravariance<Dog>
    >; // true;

    const visitDog = (animal: Dog) => {
      animal.woof();
    };
    // @ts-expect-error
    let animals: Animal[] = [{ name: "Cat", miao: () => void 0 }];
    // @ts-expect-error
    animals.forEach(visitDog); // ts(2345)
    // FIX
    const visitAnimal = (animal: Animal) => {};
    let dogs2: Dog[] = [{ name: "dog", woof: () => void 0 }];
    dogs2.forEach(visitDog);

    // 不变例子
    interface Cat extends Animal {
      miao: () => void;
    }
    const cat: Cat = {
      name: "Cat",
      miao: () => void 0,
    };
    const dog: Dog = {
      name: "Dog",
      woof: () => void 0,
    };
    let dogs: Dog[] = [dog];
    animals = dogs; // ok
    animals.push(cat); // ok
    dogs.forEach(visitDog); // 类型 ok，但运行时会抛出错误，因为 visitDog 中调用了 cat 上没有 woof 的方法
  }
  {
    interface Event {
      timestamp: number;
    }

    interface MouseEvent extends Event {
      x: number;

      y: number;
    }

    function addEventListener(handler: (n: Event) => void) {}
    // @ts-expect-error
    addEventListener((e: MouseEvent) => console.log(e.x + "," + e.y)); // ts(2769)
    // 使用泛型修复
    function addEventListener2<E extends Event>(handler: (n: E) => void) {}
    addEventListener2((e: MouseEvent) => console.log(e.x + "," + e.y));
  }
  {
    let lessParams = (one: number) => void 0;
    let moreParams = (one: number, two: string) => void 0;
    // @ts-expect-error
    lessParams = moreParams; // ts(2322) 从安全性角度理解
    moreParams = lessParams; // ok
    // 可选和剩余参数例子
    let optionalParams = (one?: number, tow?: number) => void 0;
    let requiredParams = (one: number, tow: number) => void 0;
    let restParams = (...args: number[]) => void 0;

    requiredParams = optionalParams; // ok 不可选参数
    restParams = optionalParams; // ok
    // @ts-expect-error
    optionalParams = restParams; // ts(2322)
    // @ts-expect-error
    optionalParams = requiredParams; // ts(2322)
    restParams = requiredParams; // ok
    requiredParams = restParams; // ok

    type GetFun<F extends (...args: number[]) => any> = Parameters<F>;
    type GetRequiredParams = GetFun<typeof requiredParams>;
    type GetRestParams = GetFun<typeof restParams>;
    type GetEmptyParams = GetFun<() => void>;
  }
}
