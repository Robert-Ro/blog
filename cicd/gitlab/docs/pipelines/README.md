## CI/CD pipelines

## 组成
- 控制项目流水线整体行为的全局 YAML 关键字
- 作业(jobs)
- 阶段(stages)

## 流水线类型

流水线可以通过多种不同的方式进行配置：

- 基本流水线：同时运行每个阶段的所有内容，然后是下一个阶段。
- 使用 `needs` 关键字的流水线：基于作业之间的依赖而运行，而且比基本流水线运行更快。
- 合并请求的流水线：仅针对合并请求运行（而不是针对每次提交）。
- 合并结果的流水线：是来自源分支的更改已经合并到目标分支的合并请求流水线。
- 合并队列：使用合并结果流水线将合并一个接一个地排队
- 多项目流水线：将不同项目的流水线组合在一起。
- 父子流水线：将复杂的流水线分解为一个可以触发多个子流水线的父流水线，这些子流水线都运行在同一个项目中并具有相同的 SHA。这种流水线架构通常用于微服务架构下(项目之间有上下游关系)。

## 配置流水线

### 手动运行流水线
Pipelines can be manually executed, with predefined or manually-specified variables.流水线可以手动执行，配合Gitlab内置的变量或者用户流水线自定义变量(支持下拉)。

操作步骤：
`Pipelines` -> `New pipeline`

### Run a pipeline by using a URL query string 使用url运行流水线

### 向流水线中添加手动交互job

**手动作业**允许您在推进流水线之前需要手动交互。

您可以直接从流水线图中执行此操作。只需**单击运行按钮即可执行该特定作业**。

例如，您的流水线可以自动启动，但**需要手动操作才能部署到生产**。

### Skip a pipeline跳过流水线

使用`git push -o ci.skip`跳过触发流水线

### How pipeline duration is calculated 流水线耗时分析

两个部分:
- The duration of the initial run for any job that is retried or manually re-run.
- Any pending (queue) time.

### CI/CD configuration file

指定 CI/CD 配置文件，默认是 `.gitlab-ci.yml`，也可以指定为其他文件，比如公共的 template 模板(专门创建一个项目用来存储 template 文件)

### git 策略

- `git clone`: 对于任何一个 job，都需要 clone 整个项目
- `git fetch`: For each job, re-use the project workspace. If the workspace doesn't exist, use git clone. 如果工作区间不存在，就会使用 git clone，后创建工作区间，否则就会复用已有的工作区间，拉取增量代码

## 难点

- 流水线的创建条件 ✨✨✨
- 如何调试高效的调试“创建流水线”

## Real world example

- [gitlab-runner](https://gitlab.com/gitlab-org/gitlab-runner/-/pipelines/1017591182) 多子流水线，多并行 job

## Resource

- [gitlab ci/cd 文档 - pipelines](https://docs.gitlab.com/ci/pipelines/) 流水线文档 

## Predefined variables 预定义变量

### $CI_PIPELINE_SOURCE 流水线来源

[link](https://docs.gitlab.com/ci/jobs/job_rules/#ci_pipeline_source-predefined-variable)

|Value | Description|
| --- | --- |
|`api` | For pipelines triggered by the pipelines API.|
|`chat` | For pipelines created by using a GitLab ChatOps command.|
|`external` | When you use CI services other than GitLab.|  
|`external_pull_request_event` | When an external pull request on GitHub is created or updated.|
|`merge_request_event` | For pipelines created when a merge request is created or updated. Required to enable merge request pipelines, merged results pipelines, and merge trains.|
|`merge_train` | For pipelines created by using merge trains.|
|`ondemand_dast_scan` |	For DAST on-demand scan pipelines.|
|`ondemand_dast_validation` |	For DAST on-demand validation pipelines.|
|`parent_pipeline` |	For pipelines triggered by a parent/child pipeline. Use this pipeline source in the child pipeline configuration so that it can be triggered by the parent pipeline.|
|`pipeline` |	For **multi-project pipelines** created by using the API with **CI_JOB_TOKEN**, or the trigger keyword.|
|`push` |	For pipelines triggered by a Git push event, including for branches and tags(最常见的值).|
|`schedule` |	For scheduled pipelines. |
|`security_orchestration_policy` |	For security orchestration policy pipelines.❓|
|`trigger` | 	For pipelines created by using a trigger token.|
|`web` |	For pipelines created by selecting **New pipeline** in the GitLab UI, from the project’s **Build > Pipelines** section(gitlab web页面上点击触发).|
|`webide` |	For pipelines created by using the Web IDE.|
