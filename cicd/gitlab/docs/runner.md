# runner

> 基础功能：访问 gitlab 仓库，拉取代码
> 类似去接任务的中间人，然后将任务发给 executor 去做

## 命令行

## 注册

```shell
gitlab-runner register  --url <gitlab url>  --token <token> --executor <executor> --description <description> --tag-list <tag-list>

```

## 配置

### docker executor

```toml
    # 起始镜像
    image = "docker:latest"
    # 避免镜像重复拉取
    pull_policy="if-not-present"
```

## runner 的范围

- specific
- shared
- group

尽量以管理员的形式来注册 runner

### 配置 runner 的可见性

1. 注册后修改
   在管理员界面：http://192.168.110.136:8090/admin/runners中修改
2. 注册时指定
   以管理员的形式进行注册 runner
3. runner不设置为locked，则其他项目能够看到这个runner