# TypeScript

## Resources

-

## repos

- [TypeScript](https://www.typescriptlang.org/)
- [type-challenges](https://github.com/type-challenges/type-challenges)

## Best Practise

### Service 类型化

在业务实践中，前后端需要约定统一的接口规范，并使用格式化的 `Swagger` 或者 `YAPI` 等方式定义接口格式，然后自动生成 `TypeScript` 接口调用代码

- [swagger-codegen](https://swagger.io/tools/swagger-codegen/)
- [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api)
- [auto-service](https://gogoyqj.github.io/auto-service/)
- [yapi-to-typescript](https://github.com/fjc0k/yapi-to-typescript)

GraphQL:

- [GraphQL Code Generator](https://graphql-code-generator.com/)

### ts + webpack
fork-ts-checker-webpack-plugin: 静态类型检测
- 旧项目：`ts-loader` + `fork-ts-checker-webpack-plugin`
  ts-loader: `transpileOnly: true`, fork-ts-checker-webpack-plugin: check type
- 新项目：`babel-loader` + `@babel/preset-typescript`

#### `babel-loader` + `@babel/preset-typescript`

处理类型检查：

package.json:

```json
{ "type-check": "tsc --watch" }
```

tsconfig.json:

```json
{
  "compilerOptions": {
    "noEmit": true
  }
}
```
### 类型注解
### 隐式`any`
```ts
// 比如我们可以在 global.d.ts 内添加如下所示的 AnyToFix 类型别名定义。
/** 需要替换成更明确的类型 */
type AnyToFix = any;
// 并且在条件成熟时，我们可以很方便地筛选出需要类型重构的 func 函数，然后将其参数类型修改为更明确的类型
```
### 自动迁移工具
- [ts-migrate](https://github.com/airbnb/ts-migrate)