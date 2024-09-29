# gitlab ci 系列教程（二）—— docker 模式 runner

## 亮点

- 介绍几种 runner 的使用方式
- 定义变量 DOCKER_TOKEN
- docker runner 共享宿主机 docker 的信息

```toml
[[runners]]
  name = "My Docker Runner"
  url = "https://gitlab.com"
  id = xxxx
  token = "yyyy"
  token_obtained_at = 2023-12-16T12:54:50Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
    MaxUploadedArchiveSize = 0
  [runners.docker]
    tls_verify = false
    image = "docker:20.10.16"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/var/run/docker.sock:/var/run/docker.sock","/cache"]
    shm_size = 0
    network_mtu = 0
```

## Resources

- https://blog.whyun.com/posts/gitlab-runner-docker/
