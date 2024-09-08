- 构建缓存复用： 暂时没有想法
- 访问 google 资源的解决方案
  - 使用代理
- 代理测试
  - 删除本地的 gradle 缓存
  - 系统代理中使用待测试的地址
  - gradle 同步
- gitlab runner 设置项
  image = "liasoft/android-sdk-flutter-build:3.24.0"
  pull_policy="if-not-present"
  volumes = ["/cache", "/root/.gradle", "/root/.android"]
  network_mtu = 0

## 指定分支

- `only`
- `except`

## 环境变量
### 定义
variable:
 key: value

### 使用
- `$key`

### 内置变量
- CI_COMMIT_BRANCH
- CI_PIPELINE_SOURCE 
    - merge_request_event✨✨✨

### 增加内置变量
cicd下配置

## Workflow
rules:
  - if: $CI_COMMIT_BRANCH == "master"
  - when: manual