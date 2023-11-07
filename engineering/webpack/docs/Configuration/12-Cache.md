# Cache

## cache

`boolean` `object`

Cache the generated webpack modules and chunks to improve build speed 缓存生成的 webpack 模块和 chunk，来改善构建速度. `cache` is set to `type: 'memory'` in [`development` mode](/configuration/mode/#mode-development) and disabled in [`production` mode](/configuration/mode/#mode-production). `cache: true` is an alias to `cache: { type: 'memory' }`. To disable caching pass `false`:

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: false,
}
```

While setting `cache.type` to `'filesystem'` opens up more options for configuration.

### cache.allowCollectingMemory V5.35.0+

Collect unused memory allocated during deserialization, only available when [`cache.type`](#cachetype) is set to `'filesystem'`. This requires copying data into smaller buffers and has a performance cost.
收集在反序列化期间分配的未使用的内存，仅当 `cache.type` 设置为 `'filesystem'` 时生效。这需要将数据复制到更小的缓冲区中，并有性能成本。

- Type: `boolean`
  - It defaults to `false` in production mode and `true` in development mode.

**webpack.config.js**

```js
module.exports = {
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
}
```

### cache.buildDependencies

`object`

`cache.buildDependencies` is an object of arrays of additional code dependencies for the build. Webpack will use a hash of each of these items and all dependencies to invalidate the filesystem cache.
`cache.buildDependencies` 是一个针对构建的额外代码依赖的数组对象。webpack 将使用这些项和所有依赖项的哈希值来使文件系统缓存失效。
Defaults to `webpack/lib` to get all dependencies of webpack.
默认是 `webpack/lib` 来获取 webpack 的所有依赖项。

> It's recommended to set `cache.buildDependencies.config: [__filename]` in your webpack configuration to get the latest configuration and all dependencies.
> 推荐在 webpack 配置中设置 `cache.buildDependencies.config: [__filename]` 来获取最新配置以及所有依赖项。

**webpack.config.js**

```javascript
module.exports = {
  cache: {
    buildDependencies: {
      // This makes all dependencies of this file - build dependencies
      config: [__filename],
      // By default webpack and loaders are build dependencies
    },
  },
}
```

### cache.cacheDirectory

`string`

Base directory for the cache. Defaults to `node_modules/.cache/webpack`.

`cache.cacheDirectory` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache'),
  },
}
```

> The final location of the cache is a combination of `cache.cacheDirectory` + `cache.name`.

### cache.cacheLocation

`string`

Locations for the cache. Defaults to `path.resolve(cache.cacheDirectory, cache.name)`.

**webpack.config.js**

```javascript
const path = require('path')

module.exports = {
  //...
  cache: {
    type: 'filesystem',
    cacheLocation: path.resolve(__dirname, '.test_cache'),
  },
}
```

### cache.cacheUnaffected V5.54.0+

Cache computation of modules which are unchanged and reference only unchanged modules. It can only be used along with [`cache.type`](#cachetype) of `'memory'`, besides, [`experiments.cacheUnaffected`](/configuration/experiments/#experimentscacheunaffected) must be enabled to use it.
对未改变的模块进行缓存计算，只引用未改变的模块。它只能在 `cache.type` 值为 `'memory'` 时使用，除此之外，必须启用 `experiments.cacheUnaffected` 配置项。

- Type: `boolean`

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'memory',
    cacheUnaffected: true,
  },
}
```

### cache.compression V5.42.0+

`false | 'gzip' | 'brotli'`

Compression type used for the cache files. By default it is `false`.

`cache.compression` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    compression: 'gzip',
  },
}
```

### cache.hashAlgorithm

`string`

Algorithm used the hash generation. See [Node.js crypto](https://nodejs.org/api/crypto.html) for more details. Defaults to `md4`.

`cache.hashAlgorithm` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    hashAlgorithm: 'md4',
  },
}
```

### cache.idleTimeout

`number = 60000`

Time in milliseconds. `cache.idleTimeout` denotes the time period after which the cache storing should happen.
时间以毫秒为单位。`cache.idleTimeout` 表示缓存存储发生的时间间隔。

`cache.idleTimeout` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //..
  cache: {
    type: 'filesystem',
    idleTimeout: 60000,
  },
}
```

### cache.idleTimeoutAfterLargeChanges V5.41.0+

`number = 1000`

Time in milliseconds. `cache.idleTimeoutAfterLargeChanges` is the time period after which the cache storing should happen when larger changes have been detected.
以毫秒为单位。`cache.idleTimeoutAfterLargeChanges` 是当检测到较大的更改时，缓存存储应在此之后发生的时间段。

`cache.idleTimeoutAfterLargeChanges` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //..
  cache: {
    type: 'filesystem',
    idleTimeoutAfterLargeChanges: 1000,
  },
}
```

### cache.idleTimeoutForInitialStore

`number = 5000`

Time in milliseconds. `cache.idleTimeoutForInitialStore` is the time period after which the initial cache storing should happen.
单位毫秒。 cache.idleTimeoutForInitialStore 是在初始缓存存储发生后的时间段。

`cache.idleTimeoutForInitialStore` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //..
  cache: {
    type: 'filesystem',
    idleTimeoutForInitialStore: 0,
  },
}
```

### cache.managedPaths

`[string] = ['./node_modules']`

> Moved to [snapshot.managedPaths](/configuration/other-options/#managedpaths)

`cache.managedPaths` is an array of package-manager only managed paths. Webpack will avoid hashing and timestamping them, assume the version is unique and will use it as a snapshot (for both memory and filesystem cache).
`cache.managedPaths` 是仅托管路径的包管理器数组。webpack 将避免将他们进行哈希和时间戳处理，假设版本是唯一的，并将其用作快照（用于内存和文件系统缓存）。

### cache.maxAge V5.30.0+

`number = 5184000000`

The amount of time in milliseconds that unused cache entries are allowed to stay in the filesystem cache; defaults to one month.
允许未使用的缓存留在文件系统缓存中的时间（以毫秒为单位）；默认为一个月。

`cache.maxAge` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  // ...
  cache: {
    type: 'filesystem',
    maxAge: 5184000000,
  },
}
```

### cache.maxGenerations V5.30.0+

`number`

Define the lifespan of unused cache entries in the memory cache.
定义内存缓存中未使用的缓存项的生命周期。

- `cache.maxGenerations: 1`: Cache entries are removed after being unused for a single compilation 在一次编译中未使用的缓存被删除.

- `cache.maxGenerations: Infinity`: Cache entries are kept forever 缓存将永远保存.

`cache.maxGenerations` option is only available when [`cache.type`](#cachetype) is set to `'memory'`.

**webpack.config.js**

```javascript
module.exports = {
  // ...
  cache: {
    type: 'memory',
    maxGenerations: Infinity,
  },
}
```

### cache.maxMemoryGenerations V5.30.0+

`number`

Define the lifespan of unused cache entries in the memory cache.
定义内存缓存中未使用的缓存项的生命周期

- `cache.maxMemoryGenerations: 0`: Persistent cache will not use an additional memory cache. It will only cache items in memory until they are serialized to disk. Once serialized the next read will deserialize them from the disk again. This mode will minimize memory usage but introduce a performance cost.
  持久化缓存不会使用额外的内存缓存。它只将项目缓存到内存中，直到它们被序列化到磁盘。一旦序列化，下一次读取将再次从磁盘反序列化它们。这种模式将最小化内存使用，但会带来性能成本。

- `cache.maxMemoryGenerations: 1`: This will purge items from the memory cache once they are serialized and unused for at least one compilation. When they are used again they will be deserialized from the disk. This mode will minimize memory usage while still keeping active items in the memory cache.
  这将从内存缓存中清除已序列化且在至少一次编译中未使用的项。当再次使用它们时，它们将从磁盘反序列化。这种模式将最小化内存使用量，同时仍将活动项保留在内存缓存中。

- `cache.maxMemoryGenerations`: small numbers > 0 will have a performance cost for the GC operation. It gets lower as the number increases.
  大于 0 的小数字将为 GC 操作带来性能成本。它会随着数字的增加而降低。
- `cache.maxMemoryGenerations`: defaults to 10 in `development` mode and to `Infinity` in `production` mode.
  development 模式下默认为 10，production 模式下默认为 Infinity。

`cache.maxMemoryGenerations` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  // ...
  cache: {
    type: 'filesystem',
    maxMemoryGenerations: Infinity,
  },
}
```

### cache.memoryCacheUnaffected V5.54.0+

Cache computation of modules which are unchanged and reference only unchanged modules in memory. It can only be used along with [`cache.type`](#cachetype) of `'filesystem'`, besides, [`experiments.cacheUnaffected`](/configuration/experiments/#experimentscacheunaffected) must be enabled to use it.
对未改变的模块进行缓存计算，并且只引用内存中未改变的模块。它只能在 `cache.type` 值为 `'filesystem'` 时使用，除此之外，必须启用 [`experiments.cacheUnaffected`](https://webpack.docschina.org/configuration/experiments/#experimentscacheunaffected) 配置项。

- Type: `boolean`

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    memoryCacheUnaffected: true,
  },
}
```

### cache.name

`string`

Name for the cache. Different names will lead to different coexisting caches. Defaults to `${config.name}-${config.mode}`. Using `cache.name` makes sense when you have multiple configurations which should have independent caches.
缓存的名称。不同的名字会导致不同的的共存的缓存。默认值为 `${config.name}-${config.mode}`。使用 `cache.name` 当你有多份配置的时候，是比较合理的因为会有配置会有独立的缓存。

`cache.name` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.
`cache.name` 选项仅当 `cache.type` 被设置成 `'filesystem'` 的时候可进行配置。

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    name: 'AppBuildCache',
  },
}
```

### cache.profile

`boolean = false`

Track and log detailed timing information for individual cache items of type `'filesystem'`.
跟踪并记录各个 `'filesystem'` 缓存项的详细时间信息。

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    profile: true,
  },
}
```

### cache.readonly V5.85.0

`boolean`

Prevent webpack from storing cache into file system. Only available when `cache.type === "filesystem"` and `cache.store === 'pack'`.

```js
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    store: 'pack',
    readonly: true,
  },
}
```

### cache.store

`string = 'pack': 'pack'`

`cache.store` tells webpack when to store data on the file system.
`cache.store` 告诉 webpack 什么时候将数据存放在文件系统中。

- `'pack'`: Store data when compiler is idle in a single file for all cached items 当编译器闲置时候，将缓存数据都存放在一个文件中

`cache.store` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'` 选项仅当 `cache.type` 设置成 `'filesystem'` 才可配置.

> `pack` is the only supported mode since webpack 5.0.x

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    store: 'pack',
  },
}
```

### cache.type

`string: 'memory' | 'filesystem'`

Sets the `cache` type to either in memory or on the file system. The `memory` option is straightforward, it tells webpack to store cache in memory and doesn't allow additional configuration:
将 `cache` 类型设置为内存或者文件系统。`memory` 选项很简单，它告诉 webpack 在内存中存储缓存，不允许额外的配置：

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'memory',
  },
}
```

### cache.version

`string = ''`

Version of the cache data. Different versions won't allow to reuse the cache and override existing content. Update the version when configuration changed in a way which doesn't allow to reuse cache. This will invalidate the cache.
缓存数据的版本。不同版本不会允许重用缓存和重载当前的内容。当配置以一种无法重用缓存的方式改变时，要更新缓存的版本。这会让缓存失效。

`cache.version` option is only available when [`cache.type`](#cachetype) is set to `'filesystem'`.

**webpack.config.js**

```javascript
module.exports = {
  //...
  cache: {
    type: 'filesystem',
    version: 'your_version',
  },
}
```

> Don't share the cache between calls with different options.

## Setup cache in CI/CD system 在 CI/CD 系统中设置缓存

Filesystem cache allows to share cache between builds in CI. To setup cache:
文件系统缓存允许在 CI 的构建之间共享缓存。为了设置设置缓存：

- CI should have an option to share cache between builds CI 应该有一个在构建之间共享缓存的配置项.
- CI should run job in the same absolute path. This is important since webpack cache files store absolute paths CI 应该在相同的绝对路径中运行任务。这非常重要，因为 webpack 缓存文件存储绝对路径.

### GitLab CI/CD

Common config could looks like

```yaml
variables:
  # fallback to use "main" branch cache, requires GitLab Runner 13.4
  CACHE_FALLBACK_KEY: main

# this is webpack build job
build-job:
  cache:
    key: '$CI_COMMIT_REF_SLUG' # branch/tag name
    paths:
      # cache directory 缓存文件夹
      # make sure that you don't run "npm ci" in this job or change default cache directory
      # otherwise "npm ci" will prune cache files
      - node_modules/.cache/webpack/
```

### Github actions

```yaml
- uses: actions/cache@v3
  with:
    # cache directory
    path: node_modules/.cache/webpack/
    key: ${{ GITHUB_REF_NAME }}-webpack-build
    # fallback to use "main" branch cache
    restore-keys: |
      main-webpack-build
```
