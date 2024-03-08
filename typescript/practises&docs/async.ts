//===============================================================
// Name            : request.ts
// Author          : liutsing
// Version         : V0.0.1
// Copyright       : MIT
// Description     : 接口请求相关
// Date            : 2024-03-08 Friday 09:51
//===============================================================
function getUsers(): Promise<{ name: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          name: 'tom',
        },
        {
          name: 'jack',
        },
      ])
    }, 1000)
  })
}

type User = Awaited<ReturnType<typeof getUsers>>
// 使用举例
// const [users, setUsers] = useState<Awaited<ReturnType<typeof getUsers>>>([]);
