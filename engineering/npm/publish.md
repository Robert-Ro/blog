# NPM package publish

## Basic

```sh

npm login --registry <repo url>
npm publish --registry <repo url>
```

> 注册机构名不可用的原因：机构名与其他的用户名重复了

### publish

```sh
# 最新
npm login
# scope保持一致
npm publish --access public
# 输入otp一次性密码即可
```

#### publish 命令

```sh
[--access public] Tells the registry whether this package should be published as public or restricted
[--tag <tag>] 指定tag
[--workspaces] Enables workspace context while publishing. All workspace packages will be published. 发布当前workspace下的所有packages
[--workspace] Enables workspaces context and limits results to only those specified by this config item. Only the packages in the workspaces given will be published. 发布当前workspace下的指定packages
```

#### unpublish 命令

```sh
# 下架<package-name>
npm unpublish <package-name> -f
# 下架特定版本
npm unpublish <package-name>@<version>
```

### TypeScript project

类型生成相关

```json
  "declaration": true,
  "declarationDir": "./types",
  "declarationMap": false,
```

## `package.json`配置相关

### Separate repo

```json
// meta
"name": "",
"version": "", // semver syntax FIXME beta alpha怎么处理
"keywords": "",
"descriptions": "",
"homepage": "",
"author": "" || [], // Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)
"license":"",
"repository": {
  "type":"git",
  "url": ""
},
"bugs": {
  "url":""
}
"private": false, // 为true的话则不会被publish
//
"files": [] // 包括dir和files, 仅这些文件会被publish上传到registry
"main": "",
"bin": "",
"module": "",
"typings": "",
"type": "", // 项目类型
"typesVersions":"", //  makes sure that TypeScript finds the type definitions (.d.ts files) that it needs.
// env
"engines": {
  "node": "",
  "npm": ""
},
"os": [],
// new some match node version
"exports": {},
"imports": {},
"jsnext:main": "",
"umd:main": "",
"source": "",
```

### Monorepo

## scope 包

> [links](https://docs.npmjs.com/cli/v8/using-npm/scope)

### Publishing scoped packages

- Publishing public scoped packages(公开的 scoped 包) to the primary npm registry

  Publishing to a scope, you have two options:

  - Publishing to your user scope (example: `@username/module`)
  - Publishing to an organization scope (example: `@org/module`)

  If publishing a public module to an organization scope, you must first either create an organization with the name of the scope that you'd like to publish to or be added to an existing organization with the appropriate permisssions. For example, if you'd like to publish to `@org`, you would need to create the org organization on npmjs.com prior to trying to publish.

  Scoped packages are not public by default. You will need to specify `--access public` with the initial npm publish command. This will publish the package and set access to public as if you had run `npm access public` after publishing. You do not need to do this when publishing new versions of an existing scoped package.

- Publishing private scoped packages(私有的 scoped 包) to the npm registry

  To publish a private scoped package to the npm registry, you must have an [npm Private Modules account](https://docs.npmjs.com/private-modules/intro)(需要付费).

  You can then publish the module with `npm publish` or `npm publish --access` restricted, and it will be present in the npm registry, with restricted access. You can then change the access permissions, if desired, with `npm access` or on the npmjs.com website.

### Associating a scope with a registry

> 关联 scope 包到特定的仓库地址，多用于内部部署
> Scopes can be associated with a separate registry. This allows you to seamlessly use a mix of packages from the primary npm registry and one or more private registries, such as [GitHub Packages](https://github.com/features/packages)(需要付费) or the open source [Verdaccio](https://verdaccio.org/) project.

```sh
# You can associate a scope with a registry at login, e.g.
npm login --registry=http://reg.example.com --scope=@myco
# You can also associate a scope with a registry using `npm config`:
npm config set @myco:registry http://reg.example.com
```

## resources

### npmjs 相关

- https://docs.npmjs.com/packages-and-modules
- https://docs.npmjs.com/about-private-packages
- https://docs.npmjs.com/cli/v8/using-npm/scope

### publish

- https://docs.npmjs.com/getting-started
- https://docs.npmjs.com/cli/v8/

TODO publish script
