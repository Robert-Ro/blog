## gitlab runner

在 GitLab Runner 的 `config.toml` 文件中，`[runners.docker]` 部分包含了用于配置 Docker executor 的选项。以下是一些常见的配置选项：

1. **host** (string):
   指定 Docker 守护进程的主机地址，如果 Runner 运行在 Docker 容器内，可能需要配置这个选项。

2. **tls_verify** (bool):
   是否验证 Docker 守护进程的 TLS 证书，默认为 `true`。

3. **cert_path** (string):
   指定 Docker 客户端证书的路径，用于与 Docker 守护进程通信。

4. **image** (string):
   默认的 Docker 镜像名称，用于 CI/CD 作业。

   在 `.gitlab-ci.yml` 文件中为特定的作业指定了 image，那么这个指定的镜像将覆盖 GitLab Runner `config.toml `文件中 runners.docker 部分配置的默认镜像。

5. **privileged** (bool):
   是否以特权模式运行 Docker 容器，默认为 `false`。

6. **disable_cache** (bool):
   是否禁用 Docker 构建缓存，默认为 `false`。

7. **cache_dir** (string):
   指定 Docker 构建缓存的存储目录。

8. **volumes** ([]string):
   挂载到 Docker 容器的卷列表。

9. **shm_size** (string):
   设置 Docker 容器的共享内存大小。

10. **pull_policy** (string):
    设置 Docker 镜像拉取策略，如 `always`、`if-not-present`、`never`。

11. **extra_hosts** ([]string):
    添加额外的 hosts 映射。

12. **dns** ([]string):
    指定 DNS 服务器地址。

13. **dns_search** ([]string):
    指定 DNS 搜索域。

14. **ulimits** ([]map):
    设置 Docker 容器的 ulimit 配置。

15. **environment** ([]string):
    设置环境变量。

16. **extra_build_args** ([]string):
    设置 Docker 构建参数。

17. **force_pull** (bool):
    强制拉取 Docker 镜像。

18. **oom_kill_disable** (bool):
    禁用 Docker 的 OOM 杀死进程的默认行为。

19. **disable_entrypoint_overwrite** (bool):
    禁止覆盖 Docker 容器的入口点。

20. **cidr** (string):
    设置容器的网络 CIDR。

21. **network_mode** (string):
    设置 Docker 容器的网络模式。

22. **cap_add** ([]string):
    添加 Docker 容器的 Linux 内核能力。

23. **cap_drop** ([]string):
    删除 Docker 容器的 Linux 内核能力。

24. **security_opt** ([]string):
    设置 Docker 容器的安全选项。

25. **devices** ([]string):
    添加要挂载的设备。

26. **init** (bool):
    在 Docker 容器中运行 `init` 初始化系统。

27. **ipc_mode** (string):
    设置 Docker 容器的 IPC 模式。

28. **pids_limit** (int):
    设置 Docker 容器的 PID 数量限制。
