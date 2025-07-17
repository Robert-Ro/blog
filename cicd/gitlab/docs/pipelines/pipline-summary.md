## 流水线总结

### 使用分布式缓存

#### 基于兼容 s3 协议的 minio

```toml
[[runners]]
  name = "docker-runner-with-minio-cache-setting"
  request_concurrency = 4
  url = "https://gitlab.com"
  id = 46384014
  token = "glrt-t3_iobBvrvzC11_xHb2FTYH"
  token_obtained_at = 2025-03-10T06:05:14Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]  <-------------------- 分布式缓存设置
    Type = "s3"
    Shared = true
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
      ServerAddress = "192.168.130.71:9000"
      AccessKey = "e68Cu2Fybl0KKJEs5i67"
      SecretKey = "ztHk5Z4tGLnYaiobFfD5cVfDN5R7pQtmyvc2MaUs"
      BucketName = "gitlab-cache"
      Insecure = true
```

### 使用空间换时间的策略加快构建

#### docker runner 配置缓存目录

任务结束后会缓存到本地的 docker volumes，下次任务执行时会从本地的 docker volumes 加载缓存，加快构建速度
比如使用 gradle 构建的项目，会将依赖下载到`~/.gradle/caches`目录，后续任务执行时会从本地的 docker volumes 加载缓存，加快构建速度

```yml
# 构建开始前:
- mkdir -p .gradle/caches
  - if [ -d "/cache/.gradle/caches" ]; then
  echo "恢复Gradle缓存";
  cp -r /cache/.gradle/caches .gradle/;
  ls -la .gradle/caches;
  else
  echo "无/cache/.gradle/caches缓存目录";
  fi
  - mkdir -p .gradle/wrapper
  - if [ -d "/cache/.gradle/wrapper" ]; then
  echo "恢复Gradle wrapper";
  cp -r .gradle/wrapper .gradle/;
  else
  echo "无/cache/.gradle/wrapper缓存目录";
  fi
  - ls -la .gradle/wrapper/dists/
```

```sh
# 构建完成后
mkdir -p /cache/.gradle && cp -r .gradle/caches /cache/.gradle
cp -r .gradle/wrapper /cache/.gradle
```

```toml
[[runners]]
  name = "docker-runner-with-minio-cache-setting"
  request_concurrency = 4
  url = "https://gitlab.com"
  id = 46384014
  token = "glrt-t3_iobBvrvzC11_xHb2FTYH"
  token_obtained_at = 2025-03-10T06:05:14Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
  [runners.docker]
    tls_verify = false
    image = "alpine:3.20.3"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    volumes = ["/cache"]    <-------------------- 额外挂载缓存目录
```

#### 使用分布式缓存

同上

### 使用父子流水线简化 CI/CD 任务的处理

#### flutter 项目基于`pubspec.lock`文件是否改变触发流水线(pull-only pipeline or push-only pipeline)

```yaml
trigger-android-push-build:
  stage: triggers
  trigger:
    include: .gitlab-ci-push.yml
    strategy: depend
  rules:
    # 当pubspec.lock有变化时执行
    - changes:
        - pubspec.lock

trigger-android-pull-build:
  stage: triggers
  trigger:
    include: .gitlab-ci-pull.yml
    strategy: depend
  rules:
    - changes:
        - pubspec.lock
      when: never # 当pubspec.lock有变化时不执行
    - when: always # 其他情况执行
```

#### flutter 项目区分 Android/iOS 项目的构建

- 根据 tag 区分 Android/iOS 项目的构建，触发各自的流水线
- Android 构建推荐使用 docker runner 执行
- iOS 构建必需使用 macos-based shell runner 执行

```yaml
stages:
  - triggers

trigger-android-build:
  stage: triggers
  trigger:
    include: .gitlab-ci-android.yml
    strategy: depend
  rules:
    - if: '$CI_COMMIT_TAG =~ /^android-.*/'

trigger_ios_build:
  stage: triggers
  trigger:
    include: .gitlab-ci-iOS.yml
    strategy: depend
  rules:
    - if: '$CI_COMMIT_TAG =~ /^iOS-.*/'
```

#### flutter 项目智能缓存策略: `pull-push`, `pull`, `push`

> 纯 gradle，可基于版本相关的那个`build.gradle`文件

- 调用 gitlab api 获取依赖相关的锁文件的最近提交 id，然后 sha1 处理得到基于这个依赖锁文件的 cache hash 值
- Head 方法调用 minio 的资源(public policy)的 url，根据响应码确定缓存是否存在
- 根据状态码触发动态子流水线(pull-only pipeline or push-only pipeline)

```yaml
api-check:
  stage: pre-build
  image: alpine/curl:8.14.1
  tags:
    - docker-shared
  script:
    - |
      commit_id_api_url=https://gitlab.com/api/v4/projects/$CI_PROJECT_ID/repository/files/pubspec.lock?ref=$CI_COMMIT_TAG;
      echo "commit_id_api_url=$commit_id_api_url";
      header=$(curl -s -I -H "PRIVATE-TOKEN: $GITLAB_TOKEN" $commit_id_api_url);
      commit_id=$(echo "$header" | grep -i 'x-gitlab-last-commit-id' | cut -d: -f2- | tr -d ' \r\n');
      echo "commit_id=$commit_id";
      hash_key=$(echo -n "$commit_id" | sha1sum | awk '{print $1}');
      echo "hash_key=$hash_key";
      url="http://<minio api>/gitlab-cache/project/$CI_PROJECT_ID/0_pubspec-$hash_key-non_protected";
      echo "$url";
      status=$(curl -s -I -o /dev/null -w "%{http_code}" "$url");
      echo "缓存查询状态: $status";
      if [[ "$status" == "200" ]]; then
        cp .gitlab-ci-pull.yml generated-config.yml
      else
        cp .gitlab-ci-push.yml generated-config.yml
      fi
  artifacts:
    # https://docs.gitlab.com/ci/pipelines/downstream_pipelines/?tab=Parent-child+pipeline#trigger-a-dynamic-child-pipeline
    paths:
      - generated-config.yml
```

### docker runner 设置

#### 最大并发执行的任务数

> 需要评估 runner 运行时的资源占用情况，太高的话，会引起 docker 进程挂起

```toml
[[runners]]
  name = "docker-runner-with-minio-cache-setting"
  request_concurrency = 4        <-------------------- 最大并发执行的任务数
  url = "https://gitlab.com"
  id = 46384014
  token = "glrt-t3_iobBvrvzC11_xHb2FTYH"
  token_obtained_at = 2025-03-10T06:05:14Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
```

#### 镜像拉取策略

推荐: `pull_policy = ["if-not-present"]`加快 runner 的初始化

```toml
[[runners]]
  name = "docker-runner-with-minio-cache-setting"
  request_concurrency = 4
  url = "https://gitlab.com"
  id = 46384014
  token = "glrt-t3_iobBvrvzC11_xHb2FTYH"
  token_obtained_at = 2025-03-10T06:05:14Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.docker]
    tls_verify = false
    image = "alpine:3.20.3"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    volumes = ["/cache"]
    pull_policy = ["if-not-present"]           <--------------- 镜像拉取策略: 如果本地不存在，才会从远程拉取
    shm_size = 0
    network_mtu = 0
```
