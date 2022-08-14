# workspaces
用于支持：在单一目录中管理多个包

This set of features makes up for a much more streamlined workflow handling linked packages from the local file system.自动link，无需手动操作

定义作用区间
```JSON
{
  "name": "my-workspaces-powered-project",
  "workspaces": [
    "packages/a"
  ]
}
```

初始化作用区间
```
npm init -w ./packages/a
```
作用区间增加依赖
```
npm install <package_name> -w a
```
