# TroublesShoot

## Failed to connect to gitlab.mapleimage.com port 80 after 6 ms: Couldn't connect to server

docker executor 无法访问，但是 windows shell 没有问题
解决方法：

- gitlab runner 新增配置：
  ```bash
    [runners.docker]
      network_mode = "host" # 使用宿主机的网络栈
  ```

## gitlab runner 的选择

## gitlab docker executor

## problems

- [ ] cicd 下的 git branch 信息
- [ ] cicd 下的 github runner: docker
- [ ] 构建产物如何在多个 job 之间共享
- [ ] cicd 中的路径问题
- [ ] cicd 中的内置变量
- [ ] cache
  - [ ] 构建缓存
  - [ ] android gradle 依赖缓存
- [x] cicd google 资源代理
  - `~/.gradle/gradle.properties`注入 `systemProp.http.proxyHost`等代理信息

## Resources

- https://docs.gitlab.com/ee/ci/jobs/job_artifacts.html
- https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
- https://stackoverflow.com/questions/54855472/how-the-gitlab-ci-cache-is-working-on-docker-runner-what-is-cache-directory-w
