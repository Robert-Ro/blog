# Executor

> 实际的任务执行者

## Shell executor

**Shell** is the simplest executor to configure. All required dependencies for your builds need to be installed manually on the same machine that GitLab Runner is installed on.
shell 是最简单的执行器，所有依赖都需要在 runner 所在的机器上手动安装。

## Docker executor

> runner(中介)接收到任务后，会基于 runner 里面设置的 docker 镜像，启动一个新的镜像实例，执行相应的脚本

You can use **Docker** for a clean build environment. All dependencies for building the project can be put in the Docker image, which makes dependency management more straight-forward. You can use the Docker executor to create a build environment with dependent services, like MySQL.

## Docker Machine executor

The **Docker Machine** is a special version of the **Docker** executor with support for auto-scaling. It works like the typical Docker executor but with build hosts created on demand by Docker Machine.

## Kubernetes executor

You can use the Kubernetes executor to use an existing Kubernetes cluster for your builds. The executor calls the Kubernetes cluster API and creates a new Pod (with a build container and services containers) for each GitLab CI job.

## SSH executor

The SSH executor is added for completeness, but it’s the least supported executors. When you use the SSH executor, GitLab Runner connects to an external server and runs the builds there. We have some success stories from organizations using this executor, but usually we recommend using one of the other types.

## Custom executor

You can use the Custom executor to specify your own execution environments. When GitLab Runner does not provide an executor (for example, LXC containers), you can provide your own executables to GitLab Runner to provision and clean up any environment you want to use.

## Resources

- [gitlab docs Executors](https://docs.gitlab.com/runner/executors/)
- [gitlab docs Executors 中文](https://docs.gitlab.cn/runner/executors/docker.html#docker-%E6%89%A7%E8%A1%8C%E5%99%A8)
- [gitlab runner 的高级配置](https://docs.gitlab.com/runner/configuration/advanced-configuration.html)

> executor 是一个执行任务的角色，会在目录(`/builds`)下拉取代码

## Docker executor workflow 工作流程

The Docker executor uses a special Docker image based on Alpine Linux that contains the tools to run the `prepare`, `pre-job`, and `post-job` steps. To view the definition of the special Docker image, see the GitLab Runner repository.
这个 Docker 执行器使用一个基于 Alpine Linux 的特殊 Docker 镜像，该镜像包含运行 prepare、pre-job 和 post-job 步骤所需的工具。要查看特殊 Docker 镜像的定义，请查看 GitLab Runner 存储库。

The Docker executor divides the job into several steps:
Docker 执行器将作业分为以下几个步骤：

1. `Prepare`: Creates and starts the services.创建并启动服务。
2. `Pre-job`: Clones, restores cache, and downloads artifacts from previous stages. Runs on a special Docker image.克隆、恢复缓存、从先前的阶段下载工件。在特殊的 Docker 镜像上运行。
3. `Job`: Runs your build in the Docker image you configure for the runner.在为运行程序配置的 Docker 镜像中运行您的构建。
4. `Post-job`: Create cache, upload artifacts to GitLab. Runs on a special Docker Image.创建`缓存`, 上传`工件`到 GitLab。在特殊的 Docker 镜像上运行。

## Configure directories for the container build and cache 配置容器构建和缓存的目录

To define where data is stored in the container, configure `/builds` and `/cache` directories in the `[[runners]]` section in `config.toml`.
为了在容器中定义数据存储位置，在 `config.toml` 中的 `[[runners]]` 部分中配置 `/builds` 和 `/cache` 目录。

> `/cache`目录会映射到容器中的 `/cache` 目录

If you modify the `/cache` storage path, to mark the path as persistent you must define it in `volumes = ["/my/cache/"]`, under the `[runners.docker]` section in `config.toml`.
如果修改了 `/cache` 存储路径，为了将路径标记为持久化，必须在 `config.toml` 中的 `[runners.docker]` 部分中定义 `volumes = ["/my/cache/"]`。

By default, the Docker executor stores builds and caches in the following directories:
默认下，Docker executor 会在以下目录中存储构建和缓存：

- Builds in `/builds/<namespace>/<project-name>`
- Caches in `/cache` inside the container.

## 推荐镜像

- `docker:20.10.16`: docker-in-docker，可用于 docker build, docker push 等, **可在 volume 里面挂载宿主机的 docker.sock，从而实现利用宿主 docker 授权访问相关**；`privileged = true`必需设置
- `ghcr.io/cirruslabs/flutter:3.22.2`： flutter 镜像，可用于 flutter build 等

## Resources

- https://gitlab.cn/docs/jh/ci/docker/using_docker_build.html
