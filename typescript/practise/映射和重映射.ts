// 索引类型的映射

// TS 支持类型编程，也就是对类型参数做各种运算然后返回新的类型。对索引类型当然也可以做运算，对应的类型就是`映射类型`。

/**********************映射**************************/
// 映射类型可以生成新的索引类型，在生成过程中可以加上或去掉readonly, ? 的修饰符。内置的 Record、ReadOnly、Required、Partial 等类型都是映射类型。
{
  type Obj = {
    name: string;
    age: number;
    gender: boolean;
  };
  type Partial<T extends any> = {
    [key in keyof T]?: T[key]
  }
  type PartialData = Partial<Obj>
  type isString<T> = T extends string ? true : false
  type True =  isString<'a'>
}
// from non required to required
{
  type Person = {
    name?: string;
    age?: number;
  };
  type Required<T extends any> = {
    [key in keyof T]-?: T[key];
  };
  type RequiredPerson = Required<Person>;
}
/**********************重映射**************************/
// 重映射就是在索引后加一个 as 语句，表明索引转换成什么，它可以用来对索引类型做过滤和转换。
// 取出字符串键值
{
  type Person = {
    name?: string;
    age?: number;
  };
  type ExtractString<T extends Record<any, any>> = {
    [key in keyof T as T[key] extends string | undefined
      ? key
      : never]-?: T[key];
  };
  type StringPerson = ExtractString<Person>;
}
// 修改属性名
{
  type Person = {
    readonly name?: string;
    readonly age?: number;
  };
  type Modify<T extends any> = {
    -readonly [key in keyof T as `get${Capitalize<key & string>}`]-?: T[key];
  };
  type ModifiedPerson = Modify<Person>;
}
// key value 反转
{
  type Person = {
    name: "guang";
    age: 20;
  };
  type ExtractString<T extends Record<any, any>> = {
    [key in keyof T as `${T[key]}`]: key;
  };
  type a = ExtractString<Person>;
}

// https://juejin.cn/post/7054941539876732964#heading-0