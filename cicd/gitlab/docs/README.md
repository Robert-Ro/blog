# gitlab docs

## 最佳实践

> 致力于解决实际开发中的存在的问题，减少心智负担

### yaml 文件片段复用

- 使用 `&`符号可以定义一个片段的别名
- 使用 `<<`符号和 `*` 符号可以将别名对应的 YML 片段导入
- `extends` 实现片段复用
- `include` 实现模块化

### 分语言

- Nodejs
  - CSR
  - SSR
  - nestjs
- Android
- Java
- Python
- Go
- PHP
- Ruby
- Flutter
- C++
- iOS
- Rust
- Deno

### 按需求

- 并行任务
- 单元测试
- lint 检查
- 代码改动然后自动提交
- 读取 CI 下的环境变量
- 自动部署

### 常见 stage

- install✨✨
- lint✨✨
- unit test✨✨
- build✨✨
- deploy✨✨
- upload
- notify✨

### 分系统架构构建

> 比如 c++项目的**交叉编译**，按系统架构来构建多个产物

### 搭建语言的构建环境 Container

> 一般基于 ubuntu/debian 的基础镜像，然后按需安装相关的基础工具

**需要良好熟练的 Dockerfile 编写能力**

### cache 缓存

- 减少每次 `install`任务时需要访问外部网络，拉取相关的依赖导致的耗时
- gitlab-ci 的一个优点“恶心人”它在运行下一个 Job 的时候，会默认把前一个 Job 新增的资源删除得干干静静

### 使用`artifacts`

构建好的产物

### 使用`services`📌

```yaml
services:
  - docker:dind
```

### job 失败处理/执行控制

- retry
- allowed_failure
- timeout
- when
- rules
- only/except

### 触发器

- 默认时代码的 push/merge-request 触发
- 使用 webhook 触发 📌，配合权限使用，比如生产服务发版

流水线触发方式

- 手动点击触发；
- 通过计划表（Schedule）触发
- 通过触发器（Trigger）触发

### variables

存储敏感信息，比如登陆服务器的 SSH 的密码。可以在 Variables 里面进行设置，然后在 `.gitlab-ci.yml` 进行引用即可。

### misc

- before_script
- after_script
- needs
- dependencies

### runner 配置

#### ssh executor

#### docker executor

--docker-pull-policy "if-not-present"


## ideas

> 需要做什么，该做什么，

- feature 分支检测，没有问题，没有问题就发起合并请求到主分支，主分支再构建发布开发环境，代码推送用到的是 ssh 密钥可以使用 variables 来配置
- shell 命令
    - find
    - xargs
    - echo
    - time
    - sed
## Resources

- [official docs](https://gitlab.com/-/ide/project/gitlab-org/gitlab)
- [极狐 gitlab](https://gitlab.cn/docs/jh/ci/caching/)
