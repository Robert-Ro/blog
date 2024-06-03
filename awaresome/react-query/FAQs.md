## FAQs

## 如何主动刷新数据？

- queryClient: 可在外部使用
  - `invalidateQueries`
  - `fetchQuery` ?
- useQuery 的返回值`refetch`

## 如何设置数据

- `queryClient.setQueryData`

## 数据过期了，怎么让其重新加载数据？

```tsx
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

export const MountStateChangeComponent = () => {
  const { data } = useQuery<string>({
    queryKey: ['test'],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const value = `test${Math.random()}`
          console.log('query exec result: ', value, new Date().getTime() / 1000)
          resolve(value)
        }, 1000)
      })
    },
    staleTime: 30 * 1000, // 控制数据多久过期 -> 组件mount/unmount。数据过期了，然后组件又重新挂载，则立即请求数据；数据没有过期，组件重新挂载，不会请求数据(// NOTE: 原因，从源码中找答案)
    gcTime: 1000, // 数据是否被gc回收掉，如果回收了，然后组件又挂载，则会立即获取数据
    refetchInterval: 30 * 1000, // 数据过期了，则立马请求新的数据
    refetchOnWindowFocus: true, // 数据过期了，当前页面重新获取到焦点则立马请求新的数据(默认行为)
    refetchOnReconnect: true, // 数据过期了，当前页面重新联网则立马请求新的数据
    refetchOnMount: true, // 数据过期了，当前页面重新mount则立马请求新的数据(默认行为)
  })

  return <div>{data}</div>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>React + TypeScript</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        {count % 2 === 0 && <MountStateChangeComponent />}
      </div>
    </div>
  )
}

export default App
```
