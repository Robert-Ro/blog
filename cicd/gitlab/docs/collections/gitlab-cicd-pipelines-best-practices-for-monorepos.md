# GitLab CI/CD Pipelines: Best Practices for Monorepos

> 非相同技术栈架构的 monorepo 项目

使用**Parent-Child Pipelines Architecture**架构

将 monorepo 拆分成多个子项目，每个子项目都有自己的 CI/CD 流程，然后通过 `rules` 来控制子项目的 CI/CD 流程，从而实现 monorepo 的 CI/CD 流程。

## Resources

- https://dev.to/ichintansoni/gitlab-cicd-pipelines-best-practices-for-monorepos-cba
- https://gitlab.com/MapleImage/learning-ci-cd/-/tree/main?ref_type=heads， 配置示例
