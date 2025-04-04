# gitlab cicd

## gitlab runner 的执行原理

> 一个 gitlab runner container 可以跑多个 gitlab runner
> runner 的网络模式很重要，用于和 gitlab 服务连接访问

![执行图]()

## Awaresome

- 自动化
- 并行任务
- docker 隔离环境

## FAQ

### mac 下安装 gitlab runner

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

### mac 下安装的 gitlab-runner 开机自启

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

```sh
launchctl load ~/Library/LaunchAgents/gitlab-runner.plist # 加载服务
launchctl list | grep gitlab-runner # 查看服务状态
launchctl unload ~/Library/LaunchAgents/gitlab-runner.plist # 卸载服务
```

## Resources

- [Gitlab CICD 概念](https://docs.gitlab.cn/jh/ci/introduction/index.html#%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90)
- https://zhuanlan.zhihu.com/p/441581000 GitLab Runner 介绍及安装
- https://docs.gitlab.com/runner/executors/docker.html
- https://www.zhihu.com/question/485285429 gitlab + jenkins
- [docker in docker](https://hub.docker.com/_/docker)
- [gitlab ci examples](https://docs.gitlab.com/ee/ci/examples/)
- [ci yaml 配置参考](https://docs.gitlab.com/ee/ci/yaml/index.html)
- [jenkins-vs-gitlab](https://www.browserstack.com/guide/jenkins-vs-gitlab)
- [Migrating from Jenkins](https://docs.gitlab.com/ee/ci/migration/jenkins.html)
- [mac 下安装 gitlab-runner](https://docs.gitlab.com/runner/install/osx/)
