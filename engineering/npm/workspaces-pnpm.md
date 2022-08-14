# WorkSpace 工作空间

`pnpm`内置了对单一存储库（monorepositories, 也称为多包存储库、多项目存储库或单体存储库）的支持， 你可以创建一个 `workspace` 以将多个项目合并到一个仓库中。

一个 `workspace` 的根目录下必须有 `pnpm-workspace.yaml` 文件， 也可能会有 `.npmrc` 文件。

## Workspace协议(workspace)
### 通过别名应用workspace
### 通过相对路径应用workspace包
假如 workspace 中有两个包：
```
+ packages
    + foo
    + bar
```
`bar` 中可能有 `foo` 的依赖： `"foo": "workspace:../foo"`， 在发布之前，这些将转换为所有包管理器支持的常规版本规范。
### 发布workspace包
执行`pnpm pack`或`pnpm publish`之类的发布命令时，将动态替换`workspace:`依赖：
- 目标workspace中对应的版本：如`workspace:*`,`workspace:~`,`workspae:^`
- 相关`sermver`范围

转换前：
```JSON
{
    "dependencies": {
        "foo": "workspace:*",
        "bar": "workspace:~",
        "qar": "workspace:^",
        "zoo": "workspace:^1.5.0"
    }
}
```
转换后：
```JSON
{
    "dependencies": {
        "foo": "1.5.0",
        "bar": "~1.5.0",
        "qar": "^1.5.0",
        "zoo": "^1.5.0"
    }
}
```
## 发布工作流
> 相对来说，lerna完成该任务
`workspace` 中的包版本管理是一个复杂的任务，`pnpm` 目前也并未提供内置的解决方案。 不过，有两个不错且支持 `pnpm` 的版本控制工具可以使用：

- [changesets](https://github.com/changesets/changesets)
- [Rush](https://rushjs.io/)
## 故障排查
### **循环依赖**问题

如果您看到此消息`There are cyclic workspace dependencies`，请检查在`dependencies`, `optionalDependencies` 和 `devDependencies` 中声明的工作空间依赖。

## 使用示例
> 最佳实践
- https://github.com/vercel/next.js
- https://github.com/vitejs/vite
- https://github.com/vuejs/vue-next
- https://github.com/prisma/prisma
- https://github.com/slidevjs/slidev
- https://github.com/element-plus/element-plus
- https://github.com/verdaccio/verdaccio
- https://github.com/withastro/astro
- https://github.com/cyclejs/cyclejs
- https://github.com/vueuse/vueuse
- https://github.com/nextauthjs/next-auth
- https://github.com/sveltejs/kit
- https://github.com/Saul-Mirone/milkdown
- https://github.com/vitest-dev/vitest
- https://github.com/logto-io/logto
- https://github.com/nhost/nhost
- https://github.com/rollup/plugins
- https://github.com/bytedance/bytemd
- https://github.com/ice-lab/icestark
- https://github.com/vuepress/vuepress-next
- https://github.com/vercel/turborepo

## pnpm-workspae.yaml文件内容

```sh
packages:
  # all packages in direct subdirs of packages/ 列出所有包的子目录
  - 'packages/*'
  # all packages in subdirs of components/ 列出所有组件的子目录
  - 'components/**'
  # exclude packages that are inside test directories 排除包中的某些目录
  - '!**/test/**'
```
## Resources
- [pnpm workspaces](https://pnpm.io/workspaces)
- [Bit](https://github.com/teambit/bit), 多包管理工具，依赖pnpm
- [rush](https://rushjs.io/pages/maintainer/setup_new_repo)，设置新的仓库
- [changesets](https://pnpm.io/zh/using-changesets), 使用指南