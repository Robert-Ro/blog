> 傻瓜式/一键式的 CI/CD

Auto DevOps turns your code into production-ready applications without the usual configuration overhead. The entire DevOps lifecycle is pre-configured using industry best practices. Start with the defaults to ship quickly, then customize when you need more control. No complex configuration files or deep DevOps expertise is required.
Auto DevOps 无需通常的配置开销即可将您的代码转换为生产就绪的应用程序。整个 DevOps 生命周期采用行业最佳实践进行预配置。使用默认设置快速交付，需要更多控制时再进行自定义。无需复杂的配置文件或深厚的 DevOps 专业知识。

With Auto DevOps you get(使用 Auto DevOps，您将获得):

- CI/CD pipelines that automatically detect your language and framework 自动检测您的语言和框架的 CI/CD 流水线
- Built-in security scanning to find vulnerabilities before they reach production 内置安全扫描，在漏洞到达生产环境之前发现它们
- Code quality and performance testing on every commit 每次提交时的代码质量和性能测试
- Ready-to-use review apps for previewing changes in a live environment 即用型评审应用，用于在实时环境中预览更改
- Quick deployments to Kubernetes clusters 快速部署到 Kubernetes 集群
- Progressive deployment strategies that reduce risk and downtime 降低风险和停机时间的渐进式部署策略

## Auto DevOps features

Auto DevOps supports development during each of the DevOps [stages](https://docs.gitlab.com/topics/autodevops/stages/#auto-test).

| Stage  | Auto DevOps feature                              |                                                |
| ------ | ------------------------------------------------ | ---------------------------------------------- |
| Build  | Auto Build ✨                                    |                                                |
| Build  | Auto Dependency Scanning ✨                      | 扫描依赖，检查是否有安全漏洞                   |
| Test   | Auto Test ✨                                     |                                                |
| Test   | Auto Code Intelligence 📌                        |                                                |
| Test   | Auto Code Quality ✨                             |                                                |
| Test   | Auto Browser Performance Testing ✨              | with the Sitespeed.io container 测试浏览器性能 |
| Test   | Auto Load Performance Testing ✨                 | with the k6 container 测试服务端性能           |
| Test   | Auto Container Scanning                          | 容器环境扫描，检查是否有安全漏洞               |
| Deploy | Auto Review Apps                                 |                                                |
| Deploy | Auto Deploy                                      |                                                |
| Secure | Auto Dynamic Application Security Testing (DAST) | 动态安全分析                                   |
| Secure | Auto Static Application Security Testing (SAST)  | 静态安全分析                                   |
| Secure | Auto Secret Detection                            |                                                |

## Resources

- [Sitespeed.io container](https://hub.docker.com/r/sitespeedio/sitespeed.io/)✨
- [Sitespeed.io examples](https://www.sitespeed.io/examples/) ✅
- [k6 container](https://hub.docker.com/r/loadimpact/k6/) 已废弃，推荐 Grafana k6
- [Grafana k6 container](https://hub.docker.com/r/grafana/grafana/)
- [Auto Test](https://docs.gitlab.com/topics/autodevops/stages/#auto-test)✨✨✨
- [herokuish](https://github.com/gliderlabs/herokuish) Utility for emulating Heroku build and runtime tasks in containers ✨
- [Auto Code Quality](https://gitlab.com/gitlab-org/ci-cd/codequality) registry.gitlab.com/gitlab-org/ci-cd/codequality:0.96.0-gitlab.1 gitlab 推出的代码质量分析镜像 ✨✨✨
- [Auto Dependency Scanning](https://docs.gitlab.com/user/application_security/dependency_scanning/)✨
- [Semgrep analyzer](https://gitlab.com/gitlab-org/security-products/analyzers/semgrep)✨ 静态安全分析
- TODO, 更多开源的静态分析开源项目 Top Semgrep Alternatives for Code Security in 2025
- [gitlab-qa](https://gitlab.com/gitlab-org/gitlab-qa)
- [GitLab Performance Tool](https://gitlab.com/gitlab-org/quality/performance)
