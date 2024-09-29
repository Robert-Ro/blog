# web app

## 创建 runner

### nodejs

基础镜像：`node:20-alpine3.19`
激活 pnpm

```sh
    - corepack enable
    - corepack prepare --activate
```

```sh
.\gitlab-runner.exe register  --url https://gitlab.com --non-interactive --token glrt-uPD3cbzMDf6x7yH3LQdr --executor docker --docker-image alpine:3.20.3 --docker-pull-policy if-not-present
```

```toml
[[runners]]
  name = "nodejs runner"
  url = "https://gitlab.com"
  id = 41571623
  token = "glrt-uPD3cbzMDf6x7yH3LQdr"
  token_obtained_at = 2024-09-29T02:27:35Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
    Type = "s3"
    Shared = true
    MaxUploadedArchiveSize = 0
    [runners.cache.s3]
      ServerAddress = "192.168.130.71:9000"
      AccessKey = "Ilr66DKJSk4xlGKc4z0L"
      SecretKey = "kAaDhDzw7Co0EkOlHgVHTCwWivbbckQ4YJK1iLTe"
      BucketName = "gitlab-cache"
      Insecure = true
  [runners.docker]
    tls_verify = false
    image = "alpine:3.20.3"
    privileged = false
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/cache"]
    pull_policy = ["if-not-present"]
    shm_size = 0
    network_mtu = 0

```

### docker-in-docker

> 使用 gitlab 平台提供的 runner

基础镜像：`docker:27.3-dind`

### nginx

## 任务

- install
- test/lint(可选)
- build
- build image
- deploy

## 测试项目

### pnpm monorepo

- https://gitlab.com/MapleImage/maple-dolores
- [参考示例 on gitlab-ci](https://pnpm.io/continuous-integration#gitlab-ci)
