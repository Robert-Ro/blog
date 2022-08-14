# Init
创建一个新的 Lerna 仓库或将现有的仓库升级到 Lerna 的当前版本

在运行时，该仓库将会：

1. 如果其尚未存在于`package.json`的`devDependency`，则将`lerna`添加进去。
2. 创建`lerna.json`配置文件已储存`version`号。