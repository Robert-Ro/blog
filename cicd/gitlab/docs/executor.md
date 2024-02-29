# Executor

> 实际的任务执行者

## Shell executor

**Shell** is the simplest executor to configure. All required dependencies for your builds need to be installed manually on the same machine that GitLab Runner is installed on.

## Docker executor

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
