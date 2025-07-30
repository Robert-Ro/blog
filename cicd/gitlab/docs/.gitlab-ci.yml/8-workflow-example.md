# GitLab CI/CD workflow keyword  

Use the workflow keyword to control when pipelines are created.使用 workflow 关键字来控制流水线的创建。✨

```yml
workflow:
  rules:
    - if: $CI_COMMIT_MESSAGE =~ /-draft$/
      when: never
    - if: $CI_PIPELINE_SOURCE == "push"
```

## Resources
- [workflow关键字示例](https://docs.gitlab.com/ci/yaml/workflow/)