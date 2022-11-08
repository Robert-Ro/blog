# QueryClient

## `QueryClient`

The QueryClient can be used to interact with a cache 与缓存交互:

```tsx
import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: fetchPosts })
```

**Options**

- `queryCache?: QueryCache`
  - Optional
  - The query cache this client is connected to 当前 client 连接的 `query cache`.
- `mutationCache?: MutationCache`
  - Optional
  - The mutation cache this client is connected to 当前 client 连接的 `mutation cache`.
- `logger?: Logger`
  - Optional
  - The logger this client uses to log debugging information, warnings and errors. If not set, `console` is the default logger. 配置 log，一般使用 react-query devtool
- `defaultOptions?: DefaultOptions`
  - Optional
  - Define defaults for all queries and mutations using this queryClient 默认配置.

```ts
export interface DefaultOptions<TError = unknown> {
  queries?: QueryObserverOptions<unknown, TError>
  mutations?: MutationObserverOptions<unknown, TError, unknown, unknown>
}
```

## `queryClient.fetchQuery`

`fetchQuery` is an asynchronous method that can be used to **fetch and cache a query**. It will either _resolve with the data_ or _throw with the error_. Use the `prefetchQuery` method if you just want to fetch a query without needing the result.

If the query exists and the data is not invalidated(使作废) or older than the given `staleTime`(过期时间), then the data from the cache will be returned. Otherwise it will try to fetch the latest data 否则将会获取最新的数据.

> The difference between using `fetchQuery` and `setQueryData` is that `fetchQuery` is async 异步的 and will ensure that duplicate requests for this query are not created 不会创建重复的请求 with `useQuery` instances for the same query are rendered while the data is fetching.

```tsx
try {
  const data = await queryClient.fetchQuery({ queryKey, queryFn })
} catch (error) {
  console.log(error)
}
```

Specify a `staleTime` to only fetch when the data is older than a certain amount of time:

```tsx
try {
  const data = await queryClient.fetchQuery({ queryKey, queryFn, staleTime: 10000 })
} catch (error) {
  console.log(error)
}
```

**Options**

The options for `fetchQuery` are exactly the same as those of [`useQuery`](../reference/useQuery), except the following: `enabled, refetchInterval, refetchIntervalInBackground, refetchOnWindowFocus, refetchOnReconnect, notifyOnChangeProps, onSuccess, onError, onSettled, useErrorBoundary, select, suspense, keepPreviousData, placeholderData`; which are strictly for useQuery and useInfiniteQuery. You can check the [source code](https://github.com/tannerlinsley/react-query/blob/361935a12cec6f36d0bd6ba12e84136c405047c5/src/core/types.ts#L83) for more clarity.

```ts
export interface QueryObserverOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryData = TQueryFnData
> extends QueryOptions<TQueryFnData, TError, TData> {
  /**
   * 是否自动发起请求当query挂载或query key更新了
   * Set this to `false` to disable automatic refetching when the query mounts or changes query keys.
   * To refetch the query, use the `refetch` method returned from the `useQuery` instance.
   * Defaults to `true`.
   */
  enabled?: boolean
  /**
   * 过期时间(单位：ms)
   * The time in milliseconds after data is considered stale.
   * If set to `Infinity`, the data will never be considered stale.
   */
  staleTime?: number
  /**
   * 定时发起请求的间隔时间(单位：ms)
   * If set to a number, the query will continuously refetch at this frequency in milliseconds.
   * Defaults to `false`. 默认false
   */
  refetchInterval?: number | false
  /**
   * 是否在后台定时发起请求(单位：ms)
   * 后台指的是当前tab/window不聚焦
   * If set to `true`, the query will continue to refetch while their tab/window is in the background.
   * Defaults to `false`.
   */
  refetchIntervalInBackground?: boolean
  /**
   * 是否当windows处于焦点的时候获取数据
   * If set to `true`, the query will refetch on window focus if the data is stale 数据过期且处于焦点.
   * If set to `false`, the query will not refetch on window focus. windows重新聚集不获取数据
   * If set to `'always'`, the query will always refetch on window focus.windows处于焦点的时候一直会获取数据
   * Defaults to `true`.
   */
  refetchOnWindowFocus?: boolean | 'always'
  /**
   * 网络重连时获取数据
   * If set to `true`, the query will refetch on reconnect if the data is stale.
   * If set to `false`, the query will not refetch on reconnect.
   * If set to `'always'`, the query will always refetch on reconnect.
   * Defaults to `true`.
   */
  refetchOnReconnect?: boolean | 'always'
  /**
   * mount的时候重新获取数据
   * If set to `true`, the query will refetch on mount if the data is stale.
   * If set to `false`, will disable additional instances of a query to trigger background refetches.
   * If set to `'always'`, the query will always refetch on mount.
   * Defaults to `true`.
   */
  refetchOnMount?: boolean | 'always'
  /**
   * mount的时候重新获取数据，如果出错了，会重试
   * If set to `false`, the query will not be retried on mount if it contains an error. false：出错的时候不会重试
   * Defaults to `true`.
   */
  retryOnMount?: boolean
  /**
   * 是否发起事件，更新组件当属性(data, error, isSuccess等)变更了
   * If set, the component will only re-render if any of the listed properties change.
   * When set to `['data', 'error']`, the component will only re-render when the `data` or `error` properties change.
   */
  notifyOnChangeProps?: Array<keyof InfiniteQueryObserverResult>
  /**
   * 与上面一致，取反而已
   * If set, the component will not re-render if any of the listed properties change.
   */
  notifyOnChangePropsExclusions?: Array<keyof InfiniteQueryObserverResult>
  /**
   * 获取到新数据时的回调函数
   * This callback will fire any time the query successfully fetches new data.
   */
  onSuccess?: (data: TData) => void
  /**
   * 获取新数据失败时的回调函数
   * This callback will fire if the query encounters an error and will be passed the error.
   */
  onError?: (err: TError) => void
  /**
   * 请求完成时触发的回调
   * This callback will fire any time the query is either successfully fetched or errors and be passed either the data or error.
   */
  onSettled?: (data: TData | undefined, error: TError | null) => void
  /**
   * 是否向上抛出错误
   * Whether errors should be thrown instead of setting the `error` property.
   * Defaults to `false`.
   */
  useErrorBoundary?: boolean
  /**
   * 转变数据的钩子函数
   * This option can be used to transform or select a part of the data returned by the query function.
   */
  select?: (data: TQueryData) => TData
  /**
   * 是否设置请求pending(使用场景？)
   * If set to `true`, the query will suspend when `status === 'loading'`
   * and throw errors when `status === 'error'`.
   * Defaults to `false`.
   */
  suspense?: boolean
  /**
   * 是否保存上一份的数据(✨✨✨)
   * Set this to `true` to keep the previous `data` when fetching based on a new query key.
   * Defaults to `false`.
   */
  keepPreviousData?: boolean
  /**
   * 占位数据(✨✨)
   * If set, this value will be used as the placeholder data for this particular query observer while the query is still in the `loading` data and no initialData has been provided.
   */
  placeholderData?: TData | PlaceholderDataFunction<TData>
}
```

**Returns**

- `Promise<TData>`

## `queryClient.fetchInfiniteQuery`

`fetchInfiniteQuery` is similar to `fetchQuery` but can be used to fetch and cache an infinite query.

```tsx
try {
  const data = await queryClient.fetchInfiniteQuery({ queryKey, queryFn })
  console.log(data.pages)
} catch (error) {
  console.log(error)
}
```

**Options**

The options for `fetchInfiniteQuery` are exactly the same as those of [`fetchQuery`](#queryclientfetchquery).

**Returns**

- `Promise<InfiniteData<TData>>`
