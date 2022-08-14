# Run

在包含该脚本中的**每个包**中运行`npm`脚本
## 使用
```sh
lerna run <script> -- [..args] # 在所有包含 my-script 的包中运行 npm run
lerna run test
lerna run build

# 观察所有包和 transpile 的变化，使用流前缀输出
lerna run --parallel watch
```
## 配置项
- `--npm-client <client>`
- `--stream`
- `--parallel`, 和`--stream`相类似，但完全忽略**并发性**和**拓扑顺序**
  > 在使用`--parallel`时建议限制该命令的作用域，因为生成几十个子进程可能会损害 shell 的稳定性(例如，最大文件描述符限制)。这个因人而异。

- `--no-bail`, 忽略非零(错误)退出代码
- `--profile`, 对命令执行进行分析，并生成性能分析文件，可以在基于 chrome 的浏览器中使用 DevTools 进行分析(URL为：devtools://devtools/bundled/devtools_app.html)。该分析文件显示了命令执行的时间线，其中每次执行都会分配给一个打开的槽。槽的数量由`--concurrency`决定，开放槽的数量由`--concurrency`减去正在进行的操作的数量决定。最终结果是对并行执行命令的可视化展示。