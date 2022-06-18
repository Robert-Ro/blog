# JavaScript debugging

## node + babel

- 添加`.babelrc`文件

```sh
{
  "presets": [
    "@babel/preset-env"
  ],
  "env": {
    "debug": { // 环境变量对应launch.json下面的`BABEL_ENV`变量
      "sourceMaps": "inline",
      "retainLines": true
    }
  }
}
```

- `.vscode/launch.json`
  > 使用`babel-node`(`@babel/node`库)去执行代码，`babel-node`读取`.babelrc`配置信息

```sh
{
   "type": "node",
      "request": "launch",
      "name": "<name>",
      "program": "${file}",
      "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/babel-node",
      "sourceMaps": true,
      "env": {
        "BABEL_ENV": "debug"
      }
}
```

## problems
- 在ts项目(大多数文件都是ts格式的)中，怎么去debug js文件