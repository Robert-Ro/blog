// 作用1，类型收缩时
type Method = 'GET' | 'POST' | 'PUT'

function request(method: Method, url: string) {
  switch (method) {
    case 'GET':
      console.log(method)
      break
    case 'POST':
      console.log(method)
      break

    default:
      //@ts-expect-error: 处理分支类型收缩问题
      let _n: never = method
      break
  }
}
// 作用2，类型取反
type BanType<T, R> = T extends R ? never : T
type X<T> = BanType<T, number>

function log<T>(x: X<T>) {
  console.log(x)
}

log('1')
//@ts-expect-error
log(1)
