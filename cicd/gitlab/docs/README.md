# Gitlab docs

## 个人总结

- yml 配置复用
- 控制流水线的创建
- 控制流水线的 job 的执行顺序
- jog 的产物和依赖的缓存
- 提高流水线的执行效率
- [流水线总结](./pipelines/pipeline-summary.md)
 
## 落地实践

- [x] 合并到特定分支(主分支)后自动构建部署
- [ ] 代码 eslint 检测
  - 不通过后自动提交？
- [ ] 代码单元测试
  - 不通过触发通知
- [x] SonarQube 代码质量检测
- needs 关键字打破流水线的执行顺序 📌

### Auto DevOps

[auto devops](./autodevops.md)

## Resources

- [gitlab CI/CD 实践](https://docs.gitlab.com/topics/build_your_application/)
- [gitlab Web IDE](https://gitlab.com/-/ide/project/gitlab-org/gitlab)
- [gitlab Runner 配置 - git 策略](https://docs.gitlab.com/ci/runners/configure_runners/#git-strategy)
- [gitlab 缓存依赖](https://docs.gitlab.com/ci/caching/#cache-nodejs-dependencies)
