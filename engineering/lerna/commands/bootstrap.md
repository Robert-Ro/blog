# Bootsrap

将本地包**链接**在一起并**安装**剩余的包依赖项

引导当前 Lerna 仓库中的包。安装器所有·依赖项并连接所有的交叉依赖。

在运行时，该命令：

- `npm install`每个包所有的外部依赖。
- 将所有相互依赖的`Lerna package`符号链接在一起。
- 在所有引导包中运行`npm run prepublish`(除非传入了`--ignore-prepublish`)。
- 在所有引导包中运行`npm run prepare`。

额外的参数：

- `--hoist [glob]`，在仓库根目录安装与`glob`匹配的外部依赖，这样所有包都可以使用他们。这些依赖的任何二进制文件都将链接到依赖包的`node_modules/.bin/`目录中，这样`npm`脚本就可以使用它们了。默认提升所有。
