## 如何构建gitlab-runner的docker镜像

> 需要在安装了 docker 的类 unix 系统上才能构建成功

```bash
go mod tidy
make
```

## runner executor 配置参考

```toml
# nodejs runner
[[runners]]
  name = "nodejs-docker-runner"
  url = "https://gitlab.com"
  id = 45846384
  token = "glrt-t3_ass78_RwMSUBq4421LRp"
  token_obtained_at = 2025-02-06T09:31:39Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  limit = 0
  request_concurrency = 4
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
  # https://docs.gitlab.com/runner/configuration/advanced-configuration/#the-runnersdocker-section
  [runners.docker]
    # Enable or disable TLS verification of connections to the Docker daemon.
    tls_verify = false
    image = "alpine:3.20.3"
    # Make the container run in privileged mode. Insecure.
    privileged = false
    # Disable the image entrypoint overwriting.
    disable_entrypoint_overwrite = false
    # If an out-of-memory (OOM) error occurs, do not terminate processes in a container✨.
    oom_kill_disable = false
    disable_cache = false
    # TODO Additional volumes that should be mounted. Same syntax as the Docker -v flag✨.
    volumes = ["/cache"]
    # A list of volumes to inherit from another container in the form <container name>[:<access_level>]✨ Access level defaults to read-write, but can be manually set to ro (read-only) or rw (read-write).
    volumes_from=["storage_container:ro"]
    # The image pull policy: never, if-not-present or always (default)
    pull_policy = ["if-not-present"]
    # Shared memory size for images (in bytes).
    shm_size = 0
    # 最大传输单元（Maximum Transmission Unit, MTU） FIXME 为0，默认不覆盖?
    network_mtu = 0
    # TODO Absolute path to a directory where builds are stored in the context of the selected executor. For example, locally, Docker, or SSH.
    builds_dir = "/builds"
    # TODO Absolute path to a directory where build caches are stored in context of selected executor. For example, locally, Docker, or SSH. If the docker executor is used, this directory needs to be included in its volumes parameter. 构建缓存存储的绝对路径。如果docker executor被使用，这个目录需要包含在volumes参数中。
    cache_dir = "/cache"
    # The Docker executor has two levels of caching: a global one (like any other executor) and a **local cache based on Docker volumes**. This configuration flag acts only on the local one which disables the use of automatically created (not mapped to a host directory) cache volumes. In other words, it only prevents creating a container that holds temporary files of builds, it does not disable the cache if the runner is configured in distributed cache mode. 控制是否自动创建本地的Docker 缓存卷。换句话说，这个选项控制是否禁用本地缓存，不会禁止runner的了分布式缓存配置。NOTE
    disable_cache = false
    # Number of CPUs (available in Docker 1.13 or later). A string
    cpus = "2"
    # (Advanced) The default helper image used to clone repositories and upload artifacts✨.
    helper_image = "alpine:3.20.3"
    # Containers that should be linked with container that runs the job✨.
    links=["mysql_container:mysql"]
    # The memory limit. A string.
    memory = "128m"
    memory_swap = "256m"
    memory_reservation = "64m"
    # Ulimit values that are passed to the container. Uses the same syntax as the Docker --ulimit flag.
    ulimit=""
    container_labels=""
    # Network mode for the container. Defaults to "bridge".
    # 可选值："bridge"、"host"、"none"、"overlay"、"vlan"、"macvlan"、"macvtap"
    # 详细信息：https://docs.docker.com/network/
    network_mode="host" 

```

## mac 下安装 gitlab runner

```shell
# step 1
# For Intel-based systems:
sudo curl --output /usr/local/bin/gitlab-runner "https://s3.dualstack.us-east-1.amazonaws.com/gitlab-runner-downloads/latest/binaries/gitlab-runner-darwin-amd64"
# For Apple Silicon-based systems:
sudo curl --output /usr/local/bin/gitlab-runner "https://s3.dualstack.us-east-1.amazonaws.com/gitlab-runner-downloads/latest/binaries/gitlab-runner-darwin-arm64"
# use brew
brew install gitlab-runner
# step 2
# Give it permissions to execute:
sudo chmod +x /usr/local/bin/gitlab-runner
# step 3
cd ~
gitlab-runner install
gitlab-runner start
# step 4
# reboot your computer
```

用户模式的 gitlab-runner 在`/Users/<user_name>/.gitlab-runner`目录下
系统模式的 gitlab-runner 在`/etc/gitlab-runner`目录下

## mac 下安装的 gitlab-runner 开机自启✨

查看`~/Library/LaunchAgents/gitlab-runner.plist`文件内容

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>Disabled</key>
	<false/>
	<key>KeepAlive</key>
	<true/> <!-- 服务退出后自动重启 -->
	<key>Label</key>
	<string>gitlab-runner</string>
	<key>ProgramArguments</key>
	<array>
		<string>/usr/local/bin/gitlab-runner</string>
		<string>run</string>
		<string>--config</string>
		<string>/Users/`<user_name>`/.gitlab-runner/config.toml</string>
		<string>--working-directory</string>
		<string>/Users/`<user_name`></string>
		<string>--service</string> <!-- 指定以服务模式运行 -->
		<string>gitlab-runner</string>  <!-- 服务名称（实际不需要此参数） -->
		<string>--syslog</string>  <!-- 将日志输出到系统日志 -->
	</array>
	<key>RunAtLoad</key>
	<true/>
	<key>SessionCreate</key>
	<false/>
	<key>StandardErrorPath</key>
	<string>/Users/`<user_name>`/gitlab-runner.err.log</string>
	<key>StandardOutPath</key>
	<string>/Users/`<user_name>`/gitlab-runner.out.log</string>
</dict>
</plist>
```
检查`gitlab-runner`服务状态
```sh
launchctl load ~/Library/LaunchAgents/gitlab-runner.plist # 加载服务
launchctl list | grep gitlab-runner # 查看服务状态
launchctl unload ~/Library/LaunchAgents/gitlab-runner.plist # 卸载服务
```
## windows本地安装的gitlab-runner升级
> macos下类似

升级步骤：

```sh
# 停止服务
./gitlab-runner.exe stop
# 下载最新的exe文件
# 替换旧的exe文件
# 启动服务
./gitlab-runner.exe start
# 版本检测
./gitlab-runner.exe --version
```