# Version
更改自上次发布以来的包版本号。

```json
lerna version 1.0.1 # 显式指定
lerna version patch # 语义化关键字
lerna version       # 根据提示选择
```

在运行时，该命令执行以下操作:
1. 标识自上一个版本以来更新的包。
2. 提示输入新版本。
3. 修改包的元数据，在根目录和每个包当中运行适当的生命周期脚本。
4. 提交这些更改并打上标记。
5. 推动到`git`远程服务器。

### 语义化版本号
```sh
lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
# 使用下一个语义化版本号，然后跳过“为…选择一个新版本”的提示。
```

### 配置项
- `--allow-branch <glob>`，允许的分支
- `--amend`，当使用该参数运行时，`lerna version`将对当前提交执行所有更改，而不是添加一个新的。
- `--changelog-preset`，改变预设值`lerna version --conventional-commits --changelog-preset angular-bitbucket`
- `--conventional-commits`，当您使用这个参数运行时，lerna version将使用[传统的提交规范](https://conventionalcommits.org/)来[确定版本](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-recommended-bump)并生成`CHANGELOG.md`文件。传入`--no-changelog`将阻止生成(或更新)`CHANGELOG.md`文件。

- `--no-push`
- `--no-commit-hooks`
- `--no-git-tag-version`
- `--message <msg>`
- `--no-changelog`
- `--yes`， skip all confirm hint