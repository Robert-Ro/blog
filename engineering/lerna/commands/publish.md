# publish

在当前项目中发布包

## 使用

```sh
lerna publish              # 发布自上一个版本以来发生了变化的包
lerna publish from-git     # 发布当前提交中标记的包
lerna publish from-package # 发布注册表中没有最新版本的包
```

在运行时，该命令做了下面几件事中的一个：

- 发布自上一个版本以来更新的包(背后调用了[lerna version](./version.md))。
  - 这是 lerna 2.x 版本遗留下来的。
- 发布在当前提交中标记的包(`from-git`)。
- 发布在最新提交时注册表中没有版本的包(`from-package`)。
- 发布在前一次提交中更新的包(及其依赖项)的“`金丝雀(canary)`”版。

## 配置项

- `-- canary`

  ```sh
  lerna publish --canary
  # 1.0.0 => 1.0.1-alpha.0+${SHA} of packages changed since the previous commit
  # a subsequent canary publish will yield 1.0.1-alpha.1+${SHA}, etc

  lerna publish --canary --preid beta
  # 1.0.0 => 1.0.1-beta.0+${SHA}

  # The following are equivalent:
  lerna publish --canary minor
  lerna publish --canary preminor
  # 1.0.0 => 1.1.0-alpha.0+${SHA}
  ```

- `--preid`
  ```sh
  lerna publish --canary
  # 举例，使用下一个语义化预发布版本
  # 1.0.0 => 1.0.1-alpha.0
  lerna publish --canary --preid next
  # 举例，使用指定的预发布标识符来标识下一个语义化预发布版本
  # 1.0.0 => 1.0.1-next.0
  ```
