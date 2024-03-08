## 镜像拉取：

```bash
# https://hub.docker.com/r/gitlab/gitlab-ee/tags
docker pull gitlab/gitlab-ee # 企业版
docker pull gitlab/gitlab-ce # 社区版
```

## 创建目录

```bash
C:\Users\liuts\gitlab\data
C:\Users\liuts\gitlab\config
C:\Users\liuts\gitlab\logs
```

## 启动运行

```bash
docker run --detach --hostname gitlab.mapleimage.com --publish 443:443 --publish 80:80 --publish 22:22 --name maple-gitlab --restart always --volume C:\Users\liuts\gitlab\config:/etc/gitlab --volume C:\Users\liuts\gitlab\logs:/var/log/gitlab --volume C:\Users\liuts\gitlab\data:/var/opt/gitlab --shm-size 256m gitlab/gitlab-ce:latest
```

### `docker-compose`的方式安装

## 访问 web 端

### 获取管理员密码

```bash
# 进入docker容器，执行
grep 'Password:' /etc/gitlab/initial_root_password
# 使用root/<密码>进入
```

接下来就是正常的 gitlab 的使用操作了

## docker gitlab runner

```bash
# 运行实例
docker run -d --name shared-gitlab-runner --restart always -v /var/run/docker.sock:/var/run/docker.sock -v $pwd/gitlab-runnerN:/etc/gitlab-runner --network=host  gitlab/gitlab-runner:latest
# 或
docker run --hostname=docker-desktop --env=PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin --volume=/var/run/docker.sock:/var/run/docker.sock --volume=C:\Users\liuts\gitlab-runnerN:/etc/gitlab-runner --volume=/etc/gitlab-runner --volume=/home/gitlab-runner --network=host --name=gitlab-runnerN --restart=always --label='org.opencontainers.image.ref.name=ubuntu' --label='org.opencontainers.image.version=20.04' --runtime=runc -d gitlab/gitlab-runner:latest

# 注册runner
gitlab-runner register  --url <gitlab url>  --token <token>
```

## 资源

- [Install GitLab using Docker](https://docs.gitlab.com/ee/install/docker.html)
- [gitlab 安装中文教程](https://docs.gitlab.cn/jh/install/docker.html)
