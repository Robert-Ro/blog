# 【转】为什么你不应该在 React 中直接使用 useEffect 从 API 获取数据

> 学习封装 hooks 的思路
> 理清请求中的各种花活/边界情况/未遇到过的需求

## TL;DR

- 绝大部分触发网络请求的原因都是用户操作，应该在 `Event Handler` 中发送网络请求
- 大部分时候，首屏需要的数据可以通过服务端渲染 `SSR` 直出、无需在客户端额外发送网络请求
- 即使需要客户端在首屏获取数据，未来 `React` 和社区维护的库会提供基于 `Suspense` 的数据请求 `Pattern`、实现「`Render as your fetch`」
- 即使在使用「`Fetch on render`」的 `Pattern`，也应该直接使用第三方库如 `SWR` 或 `React Query`，而不是直接使用 `useEffect`

## 从发送一个简单的请求开始

## 在 UI 中展示「加载中」和错误

## 封装一个新的 Hook

## 处理 Race Condition

## 缓存网络请求

## 缓存刷新

## 兼容 React 18 Concurrent Rendering

## 请求合并去重

## 更多，我还要更多

- Error Retry：在数据加载出问题的时候，要进行有条件的重试（如仅 5xx 时重试，403、404 时放弃重试）
- Preload：预加载数据，避免瀑布流请求
- SSR、SSG：服务端获取的数据用来提前填充缓存、渲染页面、然后再在客户端刷新缓存
- Pagination：大量数据、分页请求
- Mutation：响应用户输入、将数据发送给服务端
- Optimistic Mutation：用户提交输入时先更新本地 UI、形成「已经修改成功」的假象，同时异步将输入发送给服务端；如果出错，还需要回滚本地 UI
- Middleware：日志、错误上报、Authentication
