# CICD 下的缓存

## Resources

- https://docs.gitlab.com/ee/ci/caching

### blogs

- https://medium.com/@chiragbhuva1508/caching-in-gitlab-ci-android-pipeline-caching-99e038494217

## helper log

### log1

```shell
# 构建前
Checking cache for release-2...
No URL provided, cache will not be downloaded from shared cache server. Instead a local version of cache will be extracted.
Successfully extracted cache
# 构建成功后
Saving cache for successful job
Creating cache release-2...
WARNING: processPath: artifact path is not a subpath of project directory: /home/mobiledevops/.gradle/caches
build: found 15183 matching artifact files and directories
No URL provided, cache will not be uploaded to shared cache server. Cache will be stored only locally.
Created cache
```

> 通过查看 docker volume 发现当前项目的缓存只缓存了构建产物，没有 gradle 缓存信息

### log2

每次运行时都去安装 Install Android SDK Platform 之类，非常耗时

```shell
Checking the license for package Android Emulator in /opt/android-sdk-linux/licenses
License for package Android Emulator accepted.
Preparing "Install Android Emulator (revision: 35.1.21)".
"Install Android Emulator (revision: 35.1.21)" ready.
Installing Android Emulator in /opt/android-sdk-linux/emulator
"Install Android Emulator (revision: 35.1.21)" complete.
"Install Android Emulator (revision: 35.1.21)" finished.
Checking the license for package Android SDK Tools in /opt/android-sdk-linux/licenses
License for package Android SDK Tools accepted.
Preparing "Install Android SDK Tools (revision: 26.1.1)".
"Install Android SDK Tools (revision: 26.1.1)" ready.
Installing Android SDK Tools in /opt/android-sdk-linux/tools
"Install Android SDK Tools (revision: 26.1.1)" complete.
"Install Android SDK Tools (revision: 26.1.1)" finished.
Checking the license for package Android SDK Build-Tools 30.0.3 in /opt/android-sdk-linux/licenses
License for package Android SDK Build-Tools 30.0.3 accepted.
Preparing "Install Android SDK Build-Tools 30.0.3 (revision: 30.0.3)".
"Install Android SDK Build-Tools 30.0.3 (revision: 30.0.3)" ready.
Installing Android SDK Build-Tools 30.0.3 in /opt/android-sdk-linux/build-tools/30.0.3
"Install Android SDK Build-Tools 30.0.3 (revision: 30.0.3)" complete.
"Install Android SDK Build-Tools 30.0.3 (revision: 30.0.3)" finished.
Checking the license for package Android SDK Platform 29 in /opt/android-sdk-linux/licenses
License for package Android SDK Platform 29 accepted.
Preparing "Install Android SDK Platform 29 (revision: 5)".
"Install Android SDK Platform 29 (revision: 5)" ready.
Installing Android SDK Platform 29 in /opt/android-sdk-linux/platforms/android-29
"Install Android SDK Platform 29 (revision: 5)" complete.
"Install Android SDK Platform 29 (revision: 5)" finished.
```

## 最佳实践

### Android project

#### gradle cache 依赖缓存

#### 构建时缓存

### 缓存在哪里

All caches defined for a job are archived in a single `cache.zip` file. The runner configuration defines where the file is stored. By default, the cache is stored on the machine where GitLab Runner is installed. The location also depends on the type of executor.

| Runner executor(runner 的执行器类型) | Default path of the cache (默认缓存路径)                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Shell                                | Locally, under the `gitlab-runner` user’s home directory: `/home/gitlab-runner/cache/<user>/<project>/<cache-key>/cache.zip`.                    |
| Docker                               | Locally, under `Docker volumes`: `/var/lib/docker/volumes/<volume-id>/\_data/<user>/<project>/<cache-key>/cache.zip`. (runner-xx 开头的 volumes) |
| Docker Machine (autoscale runners)   | The same as the Docker executor(与 docker executor 一致) .                                                                                       |

If you use cache and artifacts to store the same path in your jobs, the cache might be overwritten because caches are restored before artifacts.
如果在 job 中使用了 cache 和 artifacts 来存储相同的路径，缓存可能会被覆盖，因为缓存会在 artifacts 之前被恢复。

## 📌📌 缓存不生效的原因

gitlab cicd 环境清理环境时导致缓存文件被删除

gitlab cicd 准备环境时会执行清理工作，清理 git 管理之外的文件和目录

比如：

```log
Reinitialized existing Git repository in /builds/etlink/frontend/app/ecar-tracing-vehicle-parts/.git/
Checking out eed9756f as detached HEAD (ref is cicd)...
Removing .dart_tool/
Removing .flutter-plugins
Removing .flutter-plugins-dependencies
Removing android/.gradle/
Removing android/app/src/main/java/
Removing android/gradle/wrapper/gradle-wrapper.jar
Removing android/gradlew
Removing android/gradlew.bat
Removing android/local.properties
Removing build.log
Removing build/
Removing ios/Flutter/Generated.xcconfig
Removing ios/Flutter/flutter_export_environment.sh
Removing ios/Runner/GeneratedPluginRegistrant.h
Removing ios/Runner/GeneratedPluginRegistrant.m
```

### working 的 nodejs project gitlab cicd config

```yaml
# NOTE 如果运行时使用了多个runner则某个job下会找不到缓存
# TODO 如何使用分布式缓存，比如使用minio

variables:
  GIT_CLEAN_FLAGS: -ffdx -e *.zip # 使用了云端缓存后，就不需要使用这个配置

before_script:
  - echo $CI_PROJECT_DIR # /builds/walle/ci-cache
  - echo $CI_PROJECT_NAME # ci-cache
  - echo $CI_PROJECT_NAMESPACE # walle
  - echo $CI_PROJECT_PATH_SLUG # walle-ci-cache
  - echo $CI_PROJECT_PATH # walle/ci-cache
  - echo $CI_PROJECT_ROOT_NAMESPACE # walle

stages:
  - install
  - build
  - test

cache:
  key:
    files:
      - package-lock.json
  paths:
    - node_modules/
  policy: pull-push

install-job:
  image: node:14
  stage: install
  script:
    # nodejs项目，如果缓存恢复生效，则存在node_modules，否则重新安装
    - |
      if ls | grep -q "node_modules"; then
        echo "cache exists"
      else
        echo "cache does not exist"
        time npm install --registry=https://registry.npmmirror.com
      fi
  after_script:
    # - 这里手动清除缓存，避免过期缓存一直存在
    # - find . -maxdepth 1 -type f -name "*cache.zip" -print0 | xargs -0 echo # 展示要被删除的文件
    - find . -maxdepth 1 -type f -name "*cache.zip" -print0 | xargs -0 rm -rf
  tags:
    - flutter-android

build-ember:
  image: node:14
  stage: build
  script:
    - npm run build
  tags:
    - flutter-android
  needs:
    - job: install-job
      optional: false

test-ember:
  image: node:14
  stage: test
  script:
    - ls -al
  tags:
    - flutter-android
  needs:
    - job: install-job
      optional: false
```

### 利用分布式缓存

> 适用于多个 runner

比如 s3，minio 等
配置参考

```toml
  [runners.custom_build_dir]
  [runners.cache]
    MaxUploadedArchiveSize = 0
    Type = "s3" # 兼容 s3，支持 s3 和 minio
    Path = "" # minio bucket name下面的某个目录
    Shared = true
    [runners.cache.s3]
      ServerAddress = "192.168.130.71:9000"
      AccessKey = "5M1fhkBL24Neaawu4TYe" # minio 的 access key
      SecretKey = "jFxxDZS1oCSeV0ly5oU69s7XVzCN6czSwMOHnqP1" # minio 的 secret key
      BucketName = "gitlab-test" # minio 的 bucket name
      Insecure = true
```

### 挂载缓存文件到 volumes

> 适用于单个 runner

```toml
[[runners]]
  name = "另一种方式的flutter-android runner"
  url = "http://192.168.110.136:8090/"
  id = 55
  token = "_LcW3Dxa46kedjM5XbeJ"
  token_obtained_at = 2024-09-26T16:09:50Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"

  [runners.cache]
    Type = "s3"
    Shared = true
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
      ServerAddress = "192.168.130.71:9000"
      AccessKey = "5M1fhkBL24Neaawu4TYe"
      SecretKey = "jFxxDZS1oCSeV0ly5oU69s7XVzCN6czSwMOHnqP1"
      BucketName = "gitlab-test"
      Insecure = true
  [runners.docker]
    tls_verify = false
    image = "alpine:3.20.3"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache", "/root/.gradle", "/root/.pub-cache"] # "/root/.gradle", "/root/.pub-cache" 这两个目录
    shm_size = 0
    network_mtu = 0
```

## cache vs Artifacts

`Artifacts` are small files that are guaranteed to be transmitted to further jobs in the same pipeline. On the other hand, `cache` is **non-guaranteed** and optimized for handling thousands of files downloaded from the internet. In the Maven world, `jars` are considered `artifacts`, while the Maven local repository (`.m2/repository`) serves as the `cache`. Similarly, in the NPM world, `dist` is used for `artifacts`, and `node_modules` are considered the cache.

|                                           | artifacts              | cache                        |
| ----------------------------------------- | ---------------------- | ---------------------------- |
| use case                                  | transmit data 传输数据 | speed up pipeline 加速流水线 |
| multi-jobs or multi-pipelines ?           | multi-jobs             | both                         |
| guaranteed                                | ✅                     | ❌                           |
| stored on GitLab server                   | ✅                     | ❌                           |
| downloadable through GUI and historicized | ✅                     | ❌                           |
| configurable lifetime                     | ✅                     | ❌                           |
| deletion in GUI                           | individual             | global                       |
| large size allowed                        | ❌                     | ✅                           |
| multiple per producer job                 | ❌                     | ✅                           |

We advise you to use artifacts and cache as intended to avoid duplicate tasks and unnecessary downloads in your jobs. By utilizing them correctly in their respective areas of use, you can optimize your pipeline and improve overall efficiency.建议使用 artifacts 和 cache 来避免重复任务和不必要的下载。通过正确地在各自的使用区域中利用它们，你可以优化你的流水线并提高整体效率。

## Resources

- https://docs.gitlab.com/ee/ci/caching/
- [Gitlab CI 加速 Node 项目编译](https://blog.csdn.net/Bruce1114/article/details/135284893)
- [GitLab CI/CD 在 Node.js 项目中的实践](https://juejin.cn/post/6844903856812326925)
- [gitlab ci 系列教程（三）—— 在 Node.js 项目中使用缓存](https://blog.whyun.com/posts/gitlab-ci-cache-in-node/)
