## TODOs

### 移动应用

- 构建缓存复用
  - cicd(docker-executor)下的 gradle 缓存在哪里
  - cicd(docker-executor)下的构建缓存在哪里
  - 可能的解决方法：volumes = ["/cache", "/root/.gradle", "/root/.android"]
- gradle 依赖处理
- cicd 最佳实践
- android 构建镜像最佳实践(构建基础镜像包含哪些东西，需要装哪些命令，预设好哪些 sdk， gradle 等)
- android 构建容器 jvm 设置等
- android 构建流程基础知识
- 产物 job 之间共享
- docker 的 executor 会默认使用系统的代理

## 预设变量

- [文档](https://docs.gitlab.com/ee/ci/variables/predefined_variables.html)

```yaml
# 对于项目wall/ci-cache来说
- echo $CI_PROJECT_DIR # /builds/walle/ci-cache
- echo $CI_PROJECT_NAME # ci-cache
- echo $CI_PROJECT_NAMESPACE # walle
- echo $CI_PROJECT_PATH_SLUG # walle-ci-cache
- echo $CI_PROJECT_PATH # walle/ci-cache
- echo $CI_PROJECT_ROOT_NAMESPACE # walle
```

## misc

- 使用`time`对某个命令的执行时间进行统计
