# Cache-Control header
> https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control#directives
 
The HTTP **`Cache-Control`** header holds _directives_ (instructions) in both requests and responses that control [caching](/en-US/docs/Web/HTTP/Guides/Caching) in browsers and shared caches (e.g., Proxies, CDNs).
`Cache-Control` 通用消息头字段，被用于在 http 请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

## Syntax

```http
Cache-Control: <directive>, <directive>, ...
```

Cache directives follow these rules 指令格式具有以下有效规则:

- Caching directives are case-insensitive. However, lowercase is recommended because some implementations do not recognize uppercase directives不区分大小写，但建议使用小写.
- Multiple directives are permitted and must be comma-separated (e.g., `Cache-control: max-age=180, public`) 多个指令以逗号分隔.
- Some directives have an optional argument. When an argument is provided, it is separated from the directive name by an equals symbol (`=`). Typically, arguments for the directives are integers and are therefore not enclosed in quote characters (e.g., `Cache-control: max-age=12`). 具有可选参数，可以用令牌或者带引号的字符串语法

### Cache directives 缓存请求指令

The following table lists the standard `Cache-Control` directives 客户端可以在 HTTP 请求中使用的标准 Cache-Control 指令:

| Request          | Response                 |
| ---------------- | ------------------------ |
| `max-age`        | `max-age`                |
| `max-stale`      | -                        |
| `min-fresh`      | -                        |
| -                | `s-maxage`               |
| `no-cache`       | `no-cache`               |
| `no-store`       | `no-store`               |
| `no-transform`   | `no-transform`           |
| `only-if-cached` | -                        |
| -                | `must-revalidate`        |
| -                | `proxy-revalidate`       |
| -                | `must-understand`        |
| -                | `private`                |
| -                | `public`                 |
| -                | `immutable`              |
| -                | `stale-while-revalidate` |
| `stale-if-error` | `stale-if-error`         |

Note: Check the [compatibility table](#browser_compatibility) for their support; user agents that don't recognize them should ignore them.

## Vocabulary 术语 ✨✨✨

This section defines the terms used in this document, some of which are from the specification.

- (HTTP) cache 缓存
  - Implementation that holds requests and responses for reusing in subsequent requests. It can be either a shared cache or a private cache.
- Shared cache 共享缓存
  - Cache that exists between the origin server and clients (e.g., Proxy, CDN). It stores a single response and reuses it with multiple users — **so developers should avoid storing personalized contents** to be cached in the shared cache. 存在于源服务器和客户端（例如代理、CDN）之间的缓存。它存储单个响应，并重复使用它供多个用户——因此开发者应避免将个性化内容存储在共享缓存中。
- Private cache 私有缓存
  - Cache that exists in the client. It is also called _local cache_ or _browser cache_. It can store and reuse personalized content for a single user. 客户端存在的缓存。它也被称为本地缓存或浏览器缓存。它可以存储并重用为单个用户定制的个性化内容。
- Store response 存储响应
  - Store a response in caches when the response is cacheable. However, the cached response is not always reused as-is. (Usually, "cache" means storing a response.) 当响应可缓存时，将响应存储在缓存中。但是，缓存的响应并不总是原样复用。（通常，“缓存”意味着存储响应。）
- Reuse response 复用响应
  - Reuse cached responses for subsequent requests. 复用这个缓存的响应用于随后的请求
- Revalidate response 重新验证响应
  - Ask the origin server whether or not the stored response is still [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). Usually, the revalidation is done through a conditional request. 询问服务器缓存的响应是否仍然是**新鲜**的。通常，这是通过条件请求完成的。
- Fresh response 新鲜响应
  - Indicates that the response is [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). This usually means the response can be reused for subsequent requests, depending on request directives. 响应是**新鲜**的，通常可以被后续请求复用，具体取决于请求指令。
- Stale response 过时响应
  - Indicates that the response is a [stale response](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). This usually means the response can't be reused as-is. Cache storage isn't required to remove stale responses immediately because revalidation could change the response from being stale to being [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) again. 表示响应是过期的。这通常意味着响应不能直接重用。缓存存储不需要立即移除过期响应，因为重新验证可能会将响应从过期状态转变为新鲜状态。
- Age
  - The time since a response was generated. It is a criterion for whether a response is [fresh or stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). 自响应生成以来的时间。它是判断响应是否新鲜或过期的标准。

## Directives 指令

This section lists directives that affect caching — both response directives and request directives.
本节列出了影响缓存的指令——包括响应指令和请求指令。

### Response Directives 响应指令

#### `max-age`

The `max-age=N` response directive indicates that the response remains [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) until _N_ seconds after the response is generated. `max-age=N`响应指令表示响应在生成后`N`秒内保持新鲜

```http
Cache-Control: max-age=604800
```

Indicates that caches can store this response and reuse it for subsequent requests while it's [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). 指示缓存可以存储此响应并在其保持**新鲜**时用于后续请求。

Note that `max-age` is not the elapsed time since the response was received; it is the elapsed time since the response was generated on the origin server.
So if the other cache(s) — on the network route taken by the response — store the response for 100 seconds (indicated using the `Age` response header field), the browser cache would deduct 100 seconds from its [freshness lifetime](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age).
请注意， `max-age`不是自响应接收以来的经过时间；它是自响应在源服务器上生成以来的经过时间。因此，如果其他缓存（在响应经过的网络路径上）将响应存储 100 秒（使用 Age 响应头字段指示），浏览器缓存将从其新鲜生命周期中减去 100 秒。

If the `max-age` value is negative (for example, `-1`) or isn't an integer (for example, `3599.99`), then the caching behavior is unspecified. Caches are encouraged to treat the value as if it were `0` (this is noted in the [Calculating Freshness Lifetime](https://httpwg.org/specs/rfc9111.html#calculating.freshness.lifetime) section of the HTTP specification).
如果`max-age`的值为负数（例如`-1`）或不为整数（例如`3599.99`），则缓存行为未指定。建议缓存将此值视为`0`（这在 HTTP 规范的["计算新鲜生命周期"](https://httpwg.org/specs/rfc9111.html#calculating.freshness.lifetime)部分有说明）。

```http
Cache-Control: max-age=604800
Age: 100
```

#### `s-maxage`

The `s-maxage` response directive indicates how long the response remains [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) in a shared cache.
The `s-maxage` directive is ignored by private caches, and overrides the value specified by the `max-age` directive or the `Expires` header for shared caches, if they are present.
`s-maxage`响应指令表示响应在共享缓存中保持新鲜的时间。 `s-maxage`指令被私有缓存忽略，并且如果存在，会覆盖`max-age`指令或`Expires`标头为共享缓存指定的值。

```http
Cache-Control: s-maxage=604800
```

#### `no-cache`

The `no-cache` response directive indicates that the response can be stored in caches, but the response must be validated with the origin server before each reuse, even when the cache is disconnected from the origin server.
`no-cache`响应指令表示响应可以存储在缓存中，但在每次重用时，即使缓存与源服务器断开连接，也必须使用源服务器验证响应。

```http
Cache-Control: no-cache
```

If you want caches to always check for content updates while reusing stored content, `no-cache` is the directive to use. It does this by requiring caches to revalidate each request with the origin server.
如果您希望缓存在使用存储内容时始终检查内容更新，应使用`no-cache`指令。它通过要求缓存对每个请求与源服务器重新验证来实现这一点。

Note that `no-cache` does not mean "don't cache". `no-cache` allows caches to store a response but requires them to revalidate it before reuse. If the sense of "don't cache" that you want is actually "don't store", then `no-store` is the directive to use.
请注意， `no-cache`并不表示“不要缓存”。 `no-cache`允许缓存存储响应，但要求它们在使用前重新验证。如果你想要的“不要缓存”的含义实际上是“不要存储”，那么应该使用 `no-store`指令。

#### `must-revalidate`

The `must-revalidate` response directive indicates that the response can be stored in caches and can be reused while [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age). If the response becomes [stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age), it must be validated with the origin server before reuse.
`must-revalidate`响应指令表示响应可以被缓存存储，并在新鲜时重用。如果响应变得陈旧，在使用前必须与源服务器进行验证。

Typically, `must-revalidate` is used with `max-age`.
通常情况下，`must-revalidate`与`max-age`一起使用。

```http
Cache-Control: max-age=604800, must-revalidate
```

HTTP allows caches to reuse [stale responses](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) when they are disconnected from the origin server. `must-revalidate` is a way to prevent this from happening - either the stored response is revalidated with the origin server or a 504 (Gateway Timeout) response is generated.
HTTP 允许缓存在不连接到源服务器时重用过期的响应。 `must-revalidate`是一种防止这种情况发生的方法——要么将存储的响应与源服务器进行重新验证，要么生成一个 504（网关超时）响应。

#### `proxy-revalidate`

The `proxy-revalidate` response directive is the equivalent of `must-revalidate`, but specifically for shared caches only.
`proxy-revalidate`响应指令与`must-revalidate`相同，但仅适用于共享缓存。

#### `no-store`

The `no-store` response directive indicates that any caches of any kind (private or shared) should not store this response.
`no-store`响应指令表示任何类型的缓存（私有的或共享的）都不应存储此响应。

```http
Cache-Control: no-store
```

#### `private`

The `private` response directive indicates that the response can be stored only in a private cache (e.g., local caches in browsers).
`private`响应指令表示该响应只能存储在私有缓存中（例如浏览器中的本地缓存）。

```http
Cache-Control: private
```

You should add the `private` directive for user-personalized content, especially for responses received after login and for sessions managed via cookies.
你应该为用户个性化内容添加`private`指令，特别是对于登录后接收的响应以及通过 cookie 管理的会话。

If you forget to add `private` to a response with personalized content, then that response can be stored in a shared cache and end up being reused for multiple users, which can cause personal information to leak.
如果你忘记在包含个性化内容的响应中添加`private`，那么该响应可能会被存储在共享缓存中，并最终被多个用户重复使用，这可能导致个人信息泄露。

#### `public`

The `public` response directive indicates that the response can be stored in a shared cache. Responses for requests with `Authorization` header fields must not be stored in a shared cache; however, the `public` directive will cause such responses to be stored in a shared cache.
`public`响应指令表示响应可以存储在共享缓存中。带有`Authorization`头字段的请求的响应不得存储在共享缓存中；然而，`public`指令会导致此类响应被存储在共享缓存中。

```http
Cache-Control: public
```

In general, when pages are under Basic Auth or Digest Auth, the browser sends requests with the `Authorization` header. This means that the response is access-controlled for restricted users (who have accounts), and it's fundamentally not shared-cacheable, even if it has `max-age`.
通常情况下，当页面处于基本认证或摘要认证时，浏览器会发送带有`Authorization`头的请求。这意味着响应是针对受限用户（即有账户的用户）进行访问控制的，即使它带有`max-age`，其本质上也不是共享缓存可用的。

You can use the `public` directive to unlock that restriction.
您可以使用`public`指令来解除该限制。

```http
Cache-Control: public, max-age=604800
```

Note that `s-maxage` or `must-revalidate` also unlock that restriction.
请注意，`s-maxage`或`must-revalidate`也解锁该限制。

If a request doesn't have an `Authorization` header, or you are already using `s-maxage` or `must-revalidate` in the response, then you don't need to use `public`.
如果请求没有`Authorization`头，或者您已经在响应中使用了`s-maxage`或`must-revalidate`，那么您不需要使用`public`。

#### `must-understand`

The `must-understand` response directive indicates that a cache should store the response only if it understands the requirements for caching based on status code.
`must-understand`响应指令表示，只有当缓存理解基于状态码的缓存要求时，才应存储该响应。

`must-understand` should be coupled with `no-store` for fallback behavior.
`must-understand`应与`no-store`配合使用以实现回退行为。

```http
Cache-Control: must-understand, no-store
```

If a cache doesn't support `must-understand`, it will be ignored. If `no-store` is also present, the response isn't stored.
如果缓存不支持`must-understand`，则会忽略它。如果`no-store`也存在，则不会存储响应

If a cache supports `must-understand`, it stores the response with an understanding of cache requirements based on its status code.
如果一个缓存支持`must-understand`，它会根据其状态码理解缓存需求，并存储响应。

#### `no-transform`

Some intermediaries transform content for various reasons. For example, some convert images to reduce transfer size. In some cases, this is undesirable for the content provider.
一些中间人出于各种原因转换内容。例如，有些会将图像转换为减小传输大小。在某些情况下，这对内容提供者来说是不希望的。

`no-transform` indicates that any intermediary (regardless of whether it implements a cache) shouldn't transform the response contents.
`no-transform`表示任何中间人（无论是否实现缓存）都不应转换响应内容。

#### `immutable`

The `immutable` response directive indicates that the response will not be updated while it's [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age).
`immutable`响应指令表示在响应**新鲜**时不会更新该响应。

```http
Cache-Control: public, max-age=604800, immutable
```

A modern best practice for static resources is to include version/hashes in their URLs, while never modifying the resources — but instead, when necessary, _updating_ the resources with newer versions that have new version-numbers/hashes, so that their URLs are different. That's called the **cache-busting** pattern.
静态资源的一个**现代最佳实践**✨是在它们的URL中包含版本/哈希值，而从不修改资源本身——而是在需要时，用具有新版本号/哈希值的新版本更新资源，使它们的URL不同。这被称为**缓存破坏**模式。

```html
<script src="https://example.com/react.0.0.0.js"></script>
```

When a user reloads the browser, the browser will send conditional requests for validating to the origin server. But it's not necessary to revalidate those kinds of static resources even when a user reloads the browser, because they're never modified.
`immutable` tells a cache that the response is immutable while it's [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) and avoids those kinds of unnecessary conditional requests to the server.
当用户刷新浏览器时，浏览器会向源服务器发送条件请求以进行验证。但即使用户刷新浏览器，也无需重新验证这些静态资源，因为它们从未被修改。 `immutable`告诉缓存，在响应仍然新鲜时它是不可变的，从而避免了向服务器发送这类不必要的条件请求。

When you use a cache-busting pattern for resources and apply them to a long `max-age`, you can also add `immutable` to avoid revalidation.
当你对资源使用缓存破坏模式，并将其应用于长时间`max-age`时，你也可以添加`immutable`来避免重新验证。

#### `stale-while-revalidate`

The `stale-while-revalidate` response directive indicates that the cache could reuse a stale response while it revalidates it to a cache.
`stale-while-revalidate`响应指令表示缓存可以在将其重新验证到缓存时**重用陈旧的响应**。

```http
Cache-Control: max-age=604800, stale-while-revalidate=86400
```

In the example above, the response is [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) for 7 days (604800s).
After 7 days it becomes [stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age), but the cache is allowed to reuse it for any requests that are made in the following day (86400s), provided that they revalidate the response in the background.
在上述示例中，响应在 7 天内（604800 秒）是**新鲜**的。7天后它变得不再**新鲜**，但缓存允许在接下来的24小时内（86400 秒）对任何请求重用它，前提是它们在后台重新验证了响应。

Revalidation will make the cache be [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) again, so it appears to clients that it was always [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) during that period — effectively hiding the latency penalty of revalidation from them.
验证将使缓存再次变得**新鲜**，因此它向客户端显示在该期间它始终是**新鲜**的——实际上隐藏了验证的延迟惩罚。

If no request happened during that period, the cache became [stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) and the next request will revalidate normally.
如果在该期间没有发生请求，缓存会变得陈旧，下一个请求将正常进行验证。

#### `stale-if-error`

The `stale-if-error` response directive indicates that the cache can reuse a [stale response](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) when an upstream server generates an error, or when the error is generated locally. Here, an error is considered any response with a status code of 500, 502, 503, or 504.
`stale-if-error`响应指令表示当上游服务器生成错误，或本地生成错误时，缓存可以重用过时的响应。在此，任何状态码为 500、502、503 或 504 的响应都被视为错误。

```http
Cache-Control: max-age=604800, stale-if-error=86400
```

In the example above, the response is [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) for 7 days (604800s). Afterwards, it becomes [stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age), but can be used for an extra 1 day (86400s) when an error is encountered.
在上述示例中，响应在7天内（604800 秒）是**新鲜**的。之后，它变得不再**新鲜**，但在遇到错误时，仍可额外使用1天（86400 秒）。

After the stale-if-error period passes, the client will receive any error generated.
过期后，客户端将接收任何生成的错误。

### Request Directives

#### `no-cache`

The `no-cache` request directive asks caches to validate the response with the origin server before reuse.
`no-cache`请求指令要求缓存在使用响应前先与源服务器进行验证。

```http
Cache-Control: no-cache
```

`no-cache` allows clients to request the most up-to-date response even if the cache has a [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) response.
`no-cache`允许客户端即使在缓存有新鲜响应的情况下，也能请求最新的响应。

Browsers usually add `no-cache` to requests when users are **force reloading** a page.
浏览器在用户强制刷新页面时通常会在请求中添加`no-cache`。

#### `no-store`

The `no-store` request directive allows a client to request that caches refrain from storing the request and corresponding response — even if the origin server's response could be stored.
`no-store`请求指令允许客户端请求缓存不要存储请求及其相应的响应——即使源服务器的响应可以被存储。

```http
Cache-Control: no-store
```

#### `max-age`

The `max-age=N` request directive indicates that the client allows a stored response that is generated on the origin server within _N_ seconds — where _N_ may be any non-negative integer (including `0`).
`max-age=N`请求指令表示客户端允许存储的响应，该响应是在源服务器上生成的，且生成时间在 N 秒内——其中 N 可以是任何非负整数（包括`0`）。

```http
Cache-Control: max-age=10800
```

In the case above, if the response with `Cache-Control: max-age=10800` was generated more than 3 hours ago (calculated from `max-age` and the `Age` header), the cache couldn't reuse that response.
在上述情况下，如果带有`Cache-Control: max-age=10800`的响应是在 3 小时之前生成的（根据 `max-age` 和 `Age` 头计算），缓存就无法重用该响应。

Many browsers use this directive for **reloading**, as explained below.
许多浏览器使用此指令进行**重新加载**，如下所述。

```http
Cache-Control: max-age=0
```

`max-age=0` is a workaround for `no-cache`, because many old (HTTP/1.0) cache implementations don't support `no-cache`. Recently browsers are still using `max-age=0` in "reloading" — for backward compatibility — and alternatively using `no-cache` to cause a "force reloading".
`max-age=0` 是 `no-cache` 的一个变通方法，因为许多旧的（HTTP/1.0）缓存实现不支持`no-cache`。最近浏览器仍然在“重新加载”时使用 `max-age=0` —— 为了向后兼容 —— 并交替使用 `no-cache` 来强制“重新加载”。

If the `max-age` value is negative (for example, `-1`) or isn't an integer (for example, `3599.99`), then the caching behavior is unspecified. Caches are encouraged to treat the value as if it were `0`.
如果`max-age`的值为负数（例如`-1`）或不为整数（例如`3599.99`），则缓存行为未指定。建议缓存将此值视为`0`。

#### `max-stale`

The `max-stale=N` request directive indicates that the client allows a stored response that is [stale](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) within _N_ seconds.
If no _N_ value is specified, the client will accept a stale response of any age.
`max-stale=N` 请求指令表示客户端允许存储的响应在 `N` 秒内过期。如果没有指定 `N` 值，客户端将接受任何年龄的过期响应。

```http
Cache-Control: max-stale=3600
```

For example, a request with the header above indicates that the browser will accept a stale response from the cache that has expired within the last hour.
例如，带有上述头的请求表示浏览器将接受缓存中在过去一小时内过期的陈旧响应。

Clients can use this header when the origin server is down or too slow and can accept cached responses from caches even if they are a bit old.
当源服务器宕机或响应过慢时，客户端可以使用此头部，并接受来自缓存稍显过时的响应。

Note that the major browsers do not support requests with `max-stale`.
注意主要浏览器不支持带有`max-stale`的请求。

#### `min-fresh`

The `min-fresh=N` request directive indicates that the client allows a stored response that is [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) for at least _N_ seconds.
`min-fresh=N`请求指令表示客户端允许存储的响应至少新鲜`N`秒。

```http
Cache-Control: min-fresh=600
```

In the case above, if the response with `Cache-Control: max-age=3600` was stored in caches 51 minutes ago, the cache couldn't reuse that response.
在上述情况下，如果带有`Cache-Control: max-age=3600`的响应在缓存中存储了 51 分钟，缓存将无法重用该响应。

Clients can use this header when the user requires the response to not only be [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age), but also requires that it won't be updated for a period of time.
当用户不仅需要响应保持新鲜，还要求在一定时间内不会更新时，客户端可以使用此头部。

Note that the major browsers do not support requests with `min-fresh`.
注意主要浏览器不支持带有`min-fresh`的请求。

#### `no-transform`

Same meaning that `no-transform` has for a response, but for a request instead.
`no-transform`在请求中的含义与在响应中相同，但作用对象是**请求**。

#### `only-if-cached`

The client indicates that an already-cached response should be returned. If a cache has a stored response, even a stale one, it will be returned. If no cached response is available, a [504 Gateway Timeout](/en-US/docs/Web/HTTP/Reference/Status/504) response will be returned.
客户端表示应返回已缓存的响应。如果缓存中有存储的响应，即使过时也会返回。如果没有可用的缓存响应，将返回 504 Gateway Timeout 响应。

#### `stale-if-error`

The `stale-if-error` request directive indicates that the browser is interested in receiving stale content on error from any intermediate server for a particular origin.
This is not supported by any browser (see [Browser compatibility](#browser_compatibility)).
`stale-if-error`请求指令表示浏览器希望从特定源的任何中间服务器在出错时接收过时内容。这不被任何浏览器支持（参见浏览器兼容性）。

## Use Cases 使用案例

### Preventing storing 防止存储

If you don't want a response stored in caches, use the `no-store` directive.
如果您不希望响应被缓存，请使用`no-store`指令。
```http
Cache-Control: no-store
```

Note that `no-cache` means "it can be stored but don't reuse before validating" — so it's not for preventing a response from being stored.
请注意， `no-cache`的意思是“可以存储，但在验证之前不要重用”——**因此它不是用来防止响应被存储的**。

```http example-bad
Cache-Control: no-cache
```

In theory, if directives are conflicted, the most restrictive directive should be honored. So the example below is basically meaningless because `private`, `no-cache`, `max-age=0` and `must-revalidate` conflict with `no-store`.
理论上，如果指令存在冲突，应该遵循最严格的指令。因此，下面的示例基本上没有意义，因为 `private`、`no-cache`、`max-age=0` 和 `must-revalidate` 与 `no-store` 冲突。

```http example-bad
# conflicted
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate

# equivalent to
Cache-Control: no-store
```

### Caching static assets with "cache busting" 使用"缓存破坏"缓存静态资源

When you build static assets with versioning/hashing mechanisms, adding a version/hash to the filename or query string is a good way to manage caching.
当你使用版本控制/哈希机制构建静态资源时，将版本/哈希添加到文件名或查询字符串中是管理缓存的好方法。

For example:

```html
<!-- index.html -->
<script src="/assets/react.min.js"></script>
<img src="/assets/hero.png" width="900" height="400" />
```

The React library version will change when you update the library, and `hero.png` will also change when you edit the picture. So those are hard to store in a cache with `max-age`.
当你更新库时，React 库的版本会改变，当你编辑图片时， `hero.png`也会改变。所以这些难以用`max-age`存储在缓存中。

In such a case, you could address the caching needs by using a specific, numbered version of the library, and including the hash of the picture in its URL.
在这种情况下，你可以通过使用库的特定编号版本，并在其 URL 中包含图片的哈希值来处理缓存需求。

```html
<!-- index.html -->
<script src="/assets/react.0.0.0min.js"></script>
<img src="/assets/hero.png?hash=deadbeef" width="900" height="400" />
```

You can add a long `max-age` value and `immutable` because the content will never change.
你可以添加一个长`max-age`值和`immutable`，因为内容永远不会改变。

```http
# /assets/*
Cache-Control: max-age=31536000, immutable
```

When you update the library or edit the picture, new content should have a new URL, and caches aren't reused. That is called the "cache busting" pattern.
当你更新库或编辑图片时，新内容应该有新的 URL，并且缓存不会被复用。这被称为"缓存破坏"模式

Use a `no-cache` to make sure that the HTML response itself is not cached. `no-cache` could cause revalidation, and the client will correctly receive a new version of the HTML response and static assets.
使用 `no-cache`来确保 HTML 响应本身不会被缓存。 `no-cache`可以导致重新验证，客户端将正确地接收到 HTML 响应和静态资源的新版本。

```http
# /index.html
Cache-Control: no-cache
```

Note: If `index.html` is controlled under Basic Authentication or Digest Authentication, files under `/assets` are not stored in the shared cache. If `/assets/` files are suitable for storing in a shared cache, you also need one of `public`, `s-maxage` or `must-revalidate`.
注意：如果`index.html`受基本认证或摘要认证控制，则`/assets`下的文件不会存储在共享缓存中。如果`/assets/`文件适合存储在共享缓存中，您还需要`public`、`s-maxage`或`must-revalidate`中的一个。

### Up-to-date contents always 最新内容始终

For content that's generated dynamically, or that's static but updated often, you want a user to always receive the most up-to-date version.
对于动态生成的内容，或静态但经常更新的内容，你希望用户始终接收最新版本。

If you don't add a `Cache-Control` header because the response is not intended to be cached, that could cause an unexpected result. Cache storage is allowed to cache it heuristically — so if you have any requirements on caching, you should always indicate them explicitly, in the `Cache-Control` header.
如果你因为响应不打算被缓存而没有添加`Cache-Control`头，这可能会导致意外结果。缓存存储允许启发式缓存它——所以如果你有任何缓存要求，你应该总是在`Cache-Control`头中明确指示它们。

Adding `no-cache` to the response causes revalidation to the server, so you can serve a [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) response every time — or if the client already has a new one, just respond `304 Not Modified`.
在响应中添加`no-cache`会导致向服务器进行重新验证，因此你可以每次都提供最新的响应——或者如果客户端已经有一个新的响应，只需响应`304 Not Modified` 。

```http
Cache-Control: no-cache
```

Most HTTP/1.0 caches don't support `no-cache` directives, so historically `max-age=0` was used as a workaround. But only `max-age=0` could cause a [stale response](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) to be reused when caches disconnected from the origin server. `must-revalidate` addresses that. That's why the example below is equivalent to `no-cache`.
大多数 HTTP/1.0 缓存不支持`no-cache`指令，因此历史上使用`max-age=0`作为解决方法。但只有`max-age=0`才能在缓存与源服务器断开连接时导致过时响应被重用。 `must-revalidate`解决了这个问题。这就是为什么下面的示例等同于`no-cache`。

```http
Cache-Control: max-age=0, must-revalidate
```

But for now, you can simply use `no-cache` instead.
但截至目前，你可以直接使用 `no-cache` 来替代 `max-age=0, must-revalidate`。

### Clearing an already-stored cache

There are no cache directives for clearing already-stored responses from caches on _intermediate_ servers.
没有用于清除中间服务器上已存储响应的缓存指令。

Imagine that clients/caches store a [fresh](/en-US/docs/Web/HTTP/Guides/Caching#fresh_and_stale_based_on_age) response for a path, with no request flight to the server. There is nothing a server could do to that path.
想象客户端/缓存存储了一个路径的**全新**响应，而无需向服务器发起请求。服务器对那个路径什么都做不了。

[`Clear-Site-Data: cache`](/en-US/docs/Web/HTTP/Reference/Headers/Clear-Site-Data#cache) can be used to clear every stored response for a site in the browser cache, so use this with care.
Note that this will not affect shared or intermediate caches.
`Clear-Site-Data: cache`可用于清除浏览器缓存中所有存储的响应，因此请谨慎使用。请注意，这不会影响共享缓存或中间缓存。

## Specifications 规范

- [HTTP Caching  HTTP 缓存](https://httpwg.org/specs/rfc9111.html#field.cache-control)
- [HTTP Immutable Responses  HTTP 不可变响应](https://httpwg.org/specs/rfc8246.html#the-immutable-cache-control-extension)

## See also

- [HTTP caching](/en-US/docs/Web/HTTP/Guides/Caching) HTTP 缓存
- [Caching Tutorial for Web Authors and Webmasters](https://www.mnot.net/cache_docs/) 网页作者和网站管理员的缓存教程
- [Caching best practices & max-age gotchas](https://jakearchibald.com/2016/caching-best-practices/) 缓存最佳实践 & max-age 潜在问题
- [Cache-Control for Civilians](https://csswizardry.com/2019/03/cache-control-for-civilians/) 普通人的 Cache-Control
- [RFC 9111 – HTTP Caching](https://httpwg.org/specs/rfc9111.html)  HTTP 缓存
- [RFC 5861 – HTTP Cache-Control Extensions for Stale Content](https://httpwg.org/specs/rfc5861.html) HTTP 对过时内容的缓存控制扩展
- [RFC 8246 – HTTP Immutable Responses](https://httpwg.org/specs/rfc8246.html) HTTP 不可变响应