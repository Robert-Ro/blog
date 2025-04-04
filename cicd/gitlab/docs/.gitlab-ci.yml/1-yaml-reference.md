# `.gitlab-ci.yml` 关键字参考

> [link](https://gitlab.cn/docs/jh/ci/yaml)

- 要查看企业使用的大型 `.gitlab-ci.yml` 文件，请参阅 gitlab 的[`.gitlab-ci.yml`](https://jihulab.com/gitlab-cn/gitlab/-/blob/master/.gitlab-ci.yml)文件。
- 当在编辑您的 `.gitlab-ci.yml` 文件时，可以使用 [CI Lint](https://gitlab.cn/docs/jh/ci/lint.html) 工具来验证它。

## 关键字

> 作业关键字： ⛏️🪵
> 全局关键字：📕

### 配置流水线行为的全局关键字

| 关键字   | 描述                       |
| -------- | -------------------------- |
| default  | 作业关键字的自定义默认值。 |
| stages   | 流水线阶段的名称和顺序。   |
| workflow | 控制运行的流水线类型。     |
| include  | 从其他 YAML 文件导入配置。 |

### 作业由作业关键字配置

| 关键字             | 描述                                                               |
| ------------------ | ------------------------------------------------------------------ |
| after_script ✨    | 覆盖作业后执行的一组命令。                                         |
| allow_failure ✨   | 允许作业失败。失败的作业不会导致流水线失败。                       |
| artifacts ✨✨✨   | 成功时附加到作业的文件和目录列表。                                 |
| before_script      | 覆盖在作业之前执行的一组命令。                                     |
| cache ✨✨✨       | 应在后续运行之间缓存的文件列表。                                   |
| coverage           | 给定作业的代码覆盖率设置。                                         |
| dast_configuration | 在作业级别使用来自 DAST 配置文件的配置。                           |
| dependencies✨✨   | 通过提供要从中获取产物的作业列表，来限制将哪些产物传递给特定作业。 |
| environment        | 作业部署到的环境的名称。                                           |
| except             | 控制何时不创建作业。                                               |
| extends ✨✨✨     | 此作业继承自的配置条目。                                           |
| image ✨           | 使用 Docker 镜像。                                                 |
| inherit            | 选择所有作业继承的全局默认值。                                     |
| interruptible      | 定义当新运行使作业变得多余时，是否可以取消作业。                   |
| needs ✨✨✨       | 在 stage 顺序之前执行的作业。                                      |
| only               | 控制何时创建作业。                                                 |
| pages              | 上传作业的结果，与 GitLab Pages 一起使用。                         |
| parallel✨         | 应该并行运行多少个作业实例。                                       |
| release ✨         | 指示运行器生成 release 对象。                                      |
| resource_group     | 限制作业并发。                                                     |
| retry ✨✨✨       | 在失败的情况下可以自动重试作业的时间和次数。                       |
| rules ✨✨✨✨✨   | 用于评估和确定作业的选定属性以及它是否已创建的条件列表。           |
| script ✨✨✨      | 由 runner 执行的 Shell 脚本。                                      |
| secrets            | 作业所需的 CI/CD secret 信息。                                     |
| services           | 使用 Docker 服务镜像。                                             |
| stage ✨✨         | 定义作业阶段。                                                     |
| tags ✨            | 用于选择 runner 的标签列表。                                       |
| timeout            | 定义优先于项目范围设置的自定义作业级别超时。                       |
| trigger            | 定义下游流水线触发器。                                             |
| variables✨✨✨✨  | 在作业级别定义作业变量。                                           |
| when ✨✨✨        | 何时运行作业。                                                     |

## 全局关键字

### default✨✨✨

您可以为某些关键字设置全局默认值。 未定义一个或多个所列关键字的作业使用在 `default:` 部分中定义的值。
**可能的输入**：以下关键字可以具有自定义默认值：

- after_script
- artifacts
- before_script
- cache
- hooks
- image
- interruptible
- retry
- services
- tags
- timeout

额外细节：

- 创建流水线时，每个默认值都会复制到所有未定义该关键字的作业。
- 如果作业已经配置了其中一个关键字，则作业中的配置优先，不会被默认替换。
- 使用 `inherit:default` 控制作业中默认关键字的继承。

### stages

使用 `stages` 来定义包含作业组的阶段。`stages` 是为流水线全局定义的。在作业中使用 `stage` 来定义作业属于哪个阶段。

如果 `.gitlab-ci.yml` 文件中没有定义 `stages`，那么默认的流水线阶段是：

- .pre
- build
- test
- deploy
- .post

`stages` 项的顺序定义了作业的执行顺序 📌：

- **同一阶段的作业并行运行**。
- **下一阶段的作业在上一阶段的作业成功完成后运行**。
- 如果任何作业失败，流水线将被标记为 `failed` 并且后续阶段的作业不会启动。当前阶段的作业不会停止并继续运行。
- 如果作业未指定 stage，则作业被分配到 test 阶段。
- 如果定义了一个阶段，但没有作业使用它，则该阶段在流水线中不可见。 这对合规流水线配置很有用，因为：
  - 阶段可以在合规性配置中定义，但如果不使用则保持隐藏。
  - 当开发人员在作业定义中使用它们时，定义的阶段变得可见。
- 要使作业更早开始并忽略阶段顺序，请使用 `needs` 关键字。

### workflow

使用 `workflow:` 来确定是否创建流水线。 在顶层定义此关键字，使用单个 `rules:` 关键字，类似于在作业中定义的 `rules:`。

#### `workflow:name`

- 您可以在 workflow: 中使用 name 来定义流水线的名称。
- 所有流水线都分配有定义的名称。
- 默认是 commit message
- 可能的输入：
  - 字符串。
  - CI/CD 变量。
  - 两者结合。

例子：

```yaml
variables:
  PROJECT1_PIPELINE_NAME: 'Default pipeline name' # A default is not required.

workflow:
  name: '$PROJECT1_PIPELINE_NAME'
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      variables:
        PROJECT1_PIPELINE_NAME: 'MR pipeline: $CI_MERGE_REQUEST_SOURCE_BRANCH_NAME'
    - if: '$CI_MERGE_REQUEST_LABELS =~ /pipeline:run-in-ruby3/'
      variables:
        PROJECT1_PIPELINE_NAME: 'Ruby 3 pipeline'
```

额外细节：

- 如果名称为空字符串，则不会为流水线分配名称。如果所有变量也为空，则仅由 CI/CD 变量组成的名称可以被认为空字符串。
- `workflow:rules:variables` **成为所有作业中可用的全局变量**，包括默认将变量转发到下游流水线的 trigger 作业。 如果下游流水线使用相同的变量，**则变量被上游变量值覆盖**。请务必：
  - 在每个项目的流水线配置中使用唯一的变量名称，例如 `PROJECT1_PIPELINE_NAME`。
  - 在触发器作业中使用 `inherit:variables` 并列出要转发到下游流水线的确切变量。

#### workflow:rules

- 您可以使用 workflow:rules 模板 导入预先配置的 workflow:rules 条目。
- `workflow: rules` 接受这些关键字：
  - `if`：检查此规则以确定何时运行流水线。
  - `when`：指定当 `if` 规则为 `true` 时要做什么。
    - 要运行流水线，请设置为 `always`。
    - 要阻止流水线运行，请设置为 `never`。
  - `variables`：如果未定义，则使用在别处定义的变量。
- 当没有规则为 true 时，流水线不会运行。
- workflow: rules 的一些示例 if 子句如下：
  - `if: '$CI_PIPELINE_SOURCE == "merge_request_event"'`: 控制合并请求流水线何时运行
  - `if: '$CI_PIPELINE_SOURCE == "push"'` 控制分支流水线和标签流水线何时运行。
  - `if: $CI_COMMIT_TAG` 控制标签流水线何时运行。
  - `if: $CI_COMMIT_BRANCH` 控制分支流水线何时运行。
- 所有规则都可以是 `when: never`，最后是 `when:always` 规则。匹配 `when: never` 规则的流水线不会运行。 **所有其他流水线类型运行**

##### `workflow:rules:variables`

- 当条件匹配时，将创建该变量并可供流水线中的所有作业使用。如果该变量已在全局级别定义，则 workflow 变量优先并覆盖全局变量。
- 名称只能使用数字、字母和下划线 (\_)。
- 值必须是字符串。

### include

使用 include 在 CI/CD 配置中包含外部 YAML 文件。 您可以将一个长的 `.gitlab-ci.yml` 文件拆分为多个文件以提高可读性，或**减少同一配置在多个位置的重复**。

您还可以将模板文件存储在中央仓库中并将它们包含在项目中。

include 文件：

> 专门建一个仓库，专门用来存储 cicd 模板，然后其他的项目引用这个仓库，这样就可以减少重复的代码。

- 与 `.gitlab-ci.yml` 文件中的那些合并。
- 无论 `include` 关键字的位置如何，始终先求值，然后与 `.gitlab-ci.yml` 文件的内容合并。

可能的输入：`include` 子键：

- `include:local`
- `include:project`
- `include:remote`
- `include:template`

#### `include:local`

使用 include:local 包含与带有 include 关键字的配置文件位于同一仓库中的文件。 使用 include:local 代替符号链接。

相对于根目录 (`/`) 的完整路径：

- YAML 文件的扩展名必须是 .yml 或 .yaml。
- 您可以在文件路径中使用 `*` 和 `**` 通配符。
- 您可以使用某些 CI/CD 变量。
- `.gitlab-ci.yml` 文件和本地文件必须在同一个分支上。
- 您不能通过 Git 子模块路径包含本地文件。
- 所有的 `nested includes` 都在同一个项目范围内执行，所以您可以使用`本地`、`项目`、`远端`或`模板` include。

#### `include:project` ❓

要在同一个实例上包含来自另一个私有项目的文件

#### `include:remote`

使用带有完整 URL 的 `include:remote` 来包含来自不同位置的文件。

- 可通过 HTTP/HTTPS `GET` 请求访问的公共 URL。不支持使用远端 URL 进行身份验证。
- YAML 文件的扩展名必须是 .yml 或 .yaml
- 包含远端 CI/CD 配置文件时要小心。当外部 CI/CD 配置文件更改时，不会触发任何流水线或通知

#### `include:template`❓

使用 include:template 包含 [`.gitlab-ci.yml`模板](https://jihulab.com/gitlab-cn/gitlab/-/tree/master/lib/gitlab/ci/templates)。

## 作业关键字

### hooks

### id_tokens

### image

使用 image 指定运行作业的 Docker 镜像。

#### image:name

#### image:pull_policy

- 单个拉取策略或数组中的多个拉取策略。可以是 `always`、`if-not-present` 或 `never`。

#### image:entrypoint

### services

> 工作期间运行的另一个 Docker 镜像，并 link 到 images 关键字定义的 Docker 镜像。这样就可以在构建期间访问服务镜像，比较常见的是数据库服务
> **单元测试、自动化测试时需要用到数据库服务**

使用 services 指定您的 job 成功运行**所需的任何其他 Docker 镜像**。services 镜像链接到 image 关键字中指定的镜像。
例子：

```yaml
default:
  image:
    name: ruby:2.6
    entrypoint: ['/bin/bash']

  services:
    - name: my-postgres:11.7
      alias: db-postgres
      entrypoint: ['/usr/local/bin/db-postgres']
      command: ['start']

  before_script:
    - bundle install

test:
  script:
    - bundle exec rake spec
```

在此示例中，作业启动一个 Ruby 容器。然后，该作业从该容器启动另一个运行 PostgreSQL 的容器。然后该作业在该容器中运行脚本。

在此示例中，极狐 GitLab 为作业启动了两个容器：

- 运行 script 命令的 Ruby 容器。
- 一个 PostgreSQL 容器。Ruby 容器中的 script 命令可以连接到位于 db-postgrest 主机名的 PostgreSQL 数据库。

#### service:pull_policy

- 单个拉取策略，或数组中的多个拉取策略。可以是 `always`、`if-not-present` 或 `never`。

### script

- 使用 script 指定 runner 要执行的命令。
- 除了 trigger jobs 之外的所有作业都需要一个 script 关键字。
- 可能的输入：一个数组，包括：

  - 单行命令。
  - 长命令拆分多行。
  - **YAML 锚点**。✨

#### before_script

使用 before_script 来定义一系列命令，这些命令应该在每个作业的 script 命令之前运行，但在 artifacts 恢复之后。

- 可能的输入：一个数组，包括：

  - 单行命令。
  - 长命令拆分多行。
  - **YAML 锚点**。✨

- 您在 before_script 中指定的脚本与您在主 script 中指定的任何脚本连接在一起。组合脚本在单个 shell 中一起执行。❓
- 在顶层使用 before_script，但不在 default 部分，**已弃用**。

#### after_script

使用 after_script 定义在每个作业之后运行的命令数组，包括失败的作业。

- 可能的输入：一个数组，包括：

  - 单行命令。
  - 长命令拆分多行。
  - **YAML 锚点**。✨

- 如果作业超时或被取消，则不会执行 after_script 命令。

### stage

使用 stage 定义作业在哪个 stage 中运行。同一个 stage 中的作业可以并行执行（参见 额外细节）。

如果没有定义 stage，则作业默认使用 test 阶段。

- 可能的输入：字符串，可以是：
  - 默认阶段。
  - 用户定义的阶段。
- **如果作业在不同的 runner 上运行，则它们可以并行运行**。
- **如果您只有一个 runner，如果 runner 的 concurrent 设置大于 1，作业可以并行运行**。

#### `stage:.pre`

使用 `.pre` 阶段在流水线开始时运行作业。`.pre` 始终是流水线的第一阶段。用户定义的阶段在 `.pre` 之后执行。 **您不必在 `stages` 中定义 `.pre`**。

如果流水线仅包含 `.pre` 或 `.post` 阶段的作业，则它不会运行。 在不同的阶段必须至少有一项其他作业。

#### `stage: .post`

使用 .post 阶段使作业在流水线的末尾运行。.post 始终是流水线的最后阶段。用户定义的阶段在 .post 之前执行。 你不必在 stages 中定义 .post。

如果流水线仅包含 .pre 或 .post 阶段的作业，则它不会运行。 在不同的阶段必须至少有一项其他作业。

- 如果流水线有包含 `needs:[]` 的作业和 `.pre` 阶段的作业，它们将在流水线创建后立即启动。具有 `needs:[]` 的作业会立即启动，忽略任何阶段配置。

### extends

使用 extends 来**重用配置 section**。它是 **YAML 锚点** 的替代方案，**并且更加灵活和可读**。

可能的输入：

- 流水线中另一个作业的名称。
- 流水线中其他作业的名称列表（数组）。

创建流水线时：

- 根据键执行**反向深度合并**。✨✨✨
- 将 `.tests` 内容与 `rspec` 作业合并。
- Doesn’t merge the values of the keys(不合并键的值)。 ❓🔲

### `rules`

使用 rules 来包含或排除流水线中的作业。

创建流水线时会评估规则，**并按顺序评估，直到第一次匹配**。找到匹配项后，该作业将包含在流水线中或从流水线中排除，具体取决于配置。

`rules` 替换了 `only/except`，并且它们不能在同一个作业中一起使用

`rules` accepts an array of rules. Each rules must have at least one of:

- `if`
- `changes`
- `exists`
- `when`

Rules can also optionally be combined with:

- `allow_failure`
- `needs`
- `variables`
- `interruptible`

作业被添加到流水线中：

- 如果 `if`、`changes` 或 `exists` 规则匹配并且还具有 `when: on_success`（默认）、`when: delay` 或 `when: always`。
- 如果达到的规则只有 `when:on_success`、`when: delay` 或 `when: always`。

作业未添加到流水线中：

- 如果没有规则匹配。
- 如果规则匹配并且有 `when:never`。

您可以在不同的工作中使用 `!reference` 标签 来重用 rules 配置。

#### `rules:if`

使用 `rules:if` 子句指定何时向流水线添加作业：

- 如果 `if` 语句为 `true`，则将作业添加到流水线中。
- 如果 `if` 语句为 `true`，但它与 `when: never` 结合使用，则**不要将作业添加到流水线中**。
- 如果没有 `if` 语句为 `true`，则**不要将作业添加到流水线中**。

`if`: 子句根据预定义 CI/CD 变量或自定义 CI/CD 变量。

- 如果规则匹配并且没有定义 when，则规则使用为作业定义的 when，如果未定义，则默认为 `on_success`。

#### `rules:changes`

使用 `rules:changes` 通过检查对**特定文件的更改**来指定何时将作业添加到流水线。

> 您应该仅将 `rules:changes` 用于 **分支流水线** 或 **合并请求流水线**。 您可以将 `rules:changes` 与其他管道类型一起使用，但是当没有 Git push 事件时，rules:changes 总是评估为 true。 标记流水线、计划流水线和手动流水线等没有与它们关联的 Git push 事件。 如果没有将作业限制为分支或合并请求管道的 `if:`，则 `rules:changes` 作业**总是**添加到这些管道中。

**可能的输入**：

一个包含任意数量的数组：

- 文件的路径
- 通配符路径
  - 单个目录，例如 `path/to/directory/*`
  - 目录及其所有子目录，例如 `path/to/directory/**/*`
- 具有相同扩展名或多个扩展名的所有文件的通配符全局路径: `*.md` 或 `path/to/directory/*.{rb,py,sh}`
- 根目录或所有目录中文件的通配符路径，用双引号括起来。 例如 `"*.json"` 或 `"**/*.json"`

例子：

```yaml
docker build:
  script: docker build -t my-image:$CI_COMMIT_REF_SLUG .
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
      changes:
        - Dockerfile
      when: manual
      allow_failure: true
```

- 如果流水线是合并请求流水线，请检查 `Dockerfile` 是否有更改。
- 如果 Dockerfile 已更改，则将作业作为`手动作业`添加到流水线中，即使作业未触发，流水线也会继续运行（allow_failure: true）。
- 每个 rules:changes 部分最多可以定义 50 个样式或文件路径。
- 如果 Dockerfile 没有改变，不要将作业添加到任何流水线（与 when: never 相同）。
- rules:changes:paths 与 rules:changes 相同，没有任何子键。

##### `rules:changes:paths`

使用 `rules:changes` 指定仅在更改特定文件时才将作业添加到流水线中，并使用 `rules:changes:paths` 指定文件。
可能的输入：

- 文件路径数组。在 13.6 及更高版本中，文件路径可以包含变量。

##### `rules:changes:compare_to`

使用 `rules:changes:compare_to` 指定要比较哪个 `ref` 来比较 `rules:changes:paths` 下列出的文件的更改。

可能的输入：

- 分支名称，如 `main`、`branch1` 或 r`efs/heads/branch1`。
- 标签名称，如 `tag1` 或 `refs/tags/tag1`。
- 提交 SHA，如 `2fg31ga14b`。

例子：

```yaml
docker build:
  script: docker build -t my-image:$CI_COMMIT_REF_SLUG .
  rules:
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      changes:
        paths:
          - Dockerfile
        compare_to: 'refs/heads/branch1'
```

在此示例中，仅当 Dockerfile 相对于 `refs/heads/branch1` 发生更改并且**流水线源是合并请求事件**时，才包含 docker build 作业。

#### `rules:exists`

当仓库中存在某些文件时，使用 exists 来运行作业。

输入：

- 文件路径数组。路径相对于项目目录 ($CI_PROJECT_DIR)，不能直接链接到项目目录之外。文件路径可以使用 **glob 样式**和 **CI/CD 变量**。

#### `rules:allow_failure`

在 `rules:` 中使用 `allow_failure: true` 允许作业在不停止流水线的情况下失败。

您还可以在手动作业中使用 `allow_failure: true`。流水线继续运行，无需等待手动作业的结果。`allow_failure: false` 与规则中的 `when: manual` 结合导致流水线在继续之前等待手动作业运行。

示例

```yaml
job:
  script: echo "Hello, Rules!"
  rules:
    - if: $CI_MERGE_REQUEST_TARGET_BRANCH_NAME == $CI_DEFAULT_BRANCH
      when: manual
      allow_failure: true
```

如果规则匹配，则该作业是带有 allow_failure: true 的手动作业。❓

#### `rules:needs`

在`规则`中使用 `needs` 来针对特定条件更新`作业`的 `needs`。当条件与`规则`匹配时，`作业`的 `needs` 配置将完全替换为`规则`中的 `needs`。

可能的输入：

- 作为字符串的作业名称数组。
- 带有作业名称的哈希值，可选地带有附加属性。
- 一个空数组（`[]`），当满足特定条件时将作业设置为无。

示例

```yaml
build-dev:
  stage: build
  rules:
    - if: $CI_COMMIT_BRANCH != $CI_DEFAULT_BRANCH
  script: echo "Feature branch, so building dev version..."

build-prod:
  stage: build
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  script: echo "Default branch, so building prod version..."

specs:
  stage: test
  needs: ['build-dev']
  rules:
    - if: $CI_COMMIT_REF_NAME == $CI_DEFAULT_BRANCH
      needs: ['build-prod']
    - when: on_success # Run the job in other cases
  script: echo "Running dev specs by default, or prod specs when default branch..."
```

在此示例中：

- 如果流水线在非默认分支的分支上运行，则 specs 作业需要 build-dev 作业（默认）。
- 如果流水线在默认分支上运行，因此规则与条件匹配，则 specs 作业需要 build-prod 作业。

#### `rules:variables`

在 `rules:` 中使用 variables 来**定义特定条件的变量**。

可能的输入：格式为 `VARIABLE-NAME: value` 的变量哈希。

#### `rules:when`

在 `rules:` 中使用 `when` 来控制作业何时运行。
可能的输入：

- `on_success` (default): Run the job only when no jobs in earlier stages fail. (默认)
- `on_failure`: Run the job only when at least one job in an earlier stage fails.
- `never`: Don’t run the job regardless of the status of jobs in earlier stages.
- `always`: Run the job regardless of the status of jobs in earlier stages.
- `manual`: Add the job to the pipeline as a manual job. The default value for allow_failure changes to false.
- `delayed`: Add the job to the pipeline as a delayed job.

### `only/except`

> 不推荐使用了，使用 rules 代替

### `needs`

使用 `needs:` 来**不按顺序执行作业**。使用 `needs` 的作业之间的关系可以可视化为有向无环图。

您可以忽略阶段排序并运行一些作业，而无需等待其他作业完成。 **多个阶段的作业可以同时运行**。

可能的输入：

- 一个数组的作业。
- 一个空数组 (`[]`)，用于将作业设置为在创建流水线后立即启动。

额外细节：

- needs: 数组中单个作业可以需要的最大作业数是有限的：
  - 对于私有化部署实例，默认限制为 50。此限制可以更改。
- 如果 needs: 指的是使用 `parallel` 关键字的作业，它取决于并行创建的所有作业，而不仅仅是一个作业。 **默认情况下，它还从所有并行作业下载产物。如果产物具有相同的名称，它们会相互覆盖，并且只保存最后下载的产物**。
- 在 14.1 及更高版本中，您可以引用与您正在配置的作业处于同一阶段的作业。在私有化部署的 14.2 及更高版本上，此功能默认可用。
- 在 14.0 及更早版本中，您只能引用早期阶段的作业。必须为所有使用 needs: 关键字或在作业的 needs: 部分中引用的作业明确定义阶段。
- 在 13.9 及更早版本中，如果 needs: 指的是由于 only、except 或 rules 可能无法添加到流水线中的作业，则流水线可能无法创建。
- 如果流水线有 `needs:[]` 的作业和处于 `.pre` 阶段的作业，它们将在流水线创建后立即启动。`needs:[]` 的作业立即开始，`.pre` 阶段的作业也立即开始。

#### `needs:artifacts`

当作业使用 needs 时，**默认情况下它不再下载前一阶段的所有产物**，因为带有 `needs` 的作业可以在早期阶段完成之前开始。使用 `needs`，您只能从 `needs:` 配置中列出的作业中下载产物。

可能的输入：

- `true`（默认）或 `false`.

额外细节：

- 在 12.6 及更高版本中，您不能将 dependencies 关键字与 needs 结合使用。

#### `needs:project`

使用 `needs:project` 从**其他流水线**中最多五个作业下载产物。 从指定引用的最新成功流水线下载产物。 要指定多个作业，请将每个作业添加为 needs 关键字下的单独数组项。

#### `needs:pipeline:job`

**子流水线** 可以从其父流水线或同一父子流水线层次结构中的另一个子流水线中的作业下载产物。

#### `needs:optional`

如果需要有时在流水线中不存在的作业，请将 `optional:true` 添加到 `needs` 配置中。如果未定义，`optional:false` 是默认值。

#### `needs:pipeline`

#### `needs:parallel:matrix`

指定依赖特定并行作业的作业。

### `tags`

使用 `tags` 从项目可用的所有 `runner` 列表中选择一个特定的 `runner`。

### `allow_failure`

使用 `allow_failure` 来确定当作业失败时，**流水线是否应该继续运行**。

- 要让流水线继续运行后续作业，请使用 `allow_failure: true`。
- 要停止流水线运行后续作业，请使用 `allow_failure: false`。

allow_failure 的默认值为：

- 手动作业 ❓ 为 true。
- 对于在 rules 中使用 `when:manual` 的作业为 false。
- 在所有其它情况下为 false。

#### `allow_failure:exit_codes`

使用 `allow_failure:exit_codes` 来控制何时允许作业失败。对于任何列出的退出代码，作业是 `allow_failure: true`，对于任何其他退出代码，`allow_failure` 为 false。
可能的输入：

- 单个退出代码。
- 退出代码数组。

exit code 🔲

### `when`

使用 `when` 配置作业运行的条件。如果未在作业中定义，则默认值为 `when: on_success`。

可能的输入：

- `on_success` （默认）：仅当早期阶段没有作业失败或具有 `allow_failure: true` 时才运行作业。
- `on_failure`：**仅当早期阶段至少有一个作业失败时才运行作业**。早期阶段具有 `allow_failure: true` 的作业始终被认为是成功的。(**执行清理操作**)
- `never`：无论早期阶段的作业状态如何，都不要运行作业。只能在 `rules` 部分或 `workflow: Rules` 中使用。
- `always`：无论早期阶段的作业状态如何，都运行作业，也可以在 `workflow:rules` 中使用。
- `manual`：仅在手动触发时运行作业。(gitalb UI 手动运行时执行)
- `delayed`：延迟作业的执行指定的持续时间。

### `environment`

> 部署环境的管理
> 可以直接访问
> 可以回滚

使用 environment 定义作业部署到的**环境**。

#### `environment:name`

为环境设置名称。

常见的环境名称是 `qa`、`staging` 和 `production`，但您可以使用任何名称。

#### `environment:url`

为环境设置 URL。

额外细节：

- 作业完成后，您可以通过选择合并请求、环境或部署页面中的按钮来访问 URL。

#### `environment:on_stop`

关闭（停止）环境可以通过在 `environment` 下定义的 `on_stop` 关键字来实现。 它声明了一个为了关闭环境而运行的不同作业。

#### `environment:action`

❓
使用 action 关键字来指定作业如何与环境交互。

| 值      | 描述                                                  |
| ------- | ----------------------------------------------------- |
| start   | 默认值。 表示作业启动环境。部署是在作业启动后创建的。 |
| prepare | 表示作业只准备环境。它不会触发部署。                  |
| stop    | 表示作业停止环境。请参阅下面的示例。                  |
| verify  | 表示作业只验证环境。它不会触发部署。                  |
| access  | 表示作业仅访问环境。它不会触发部署。                  |

#### `environment:auto_stop_in`

#### `environment:kubernetes`

#### `environment:deployment_tier`

### `cache`

使用 `cache` 指定要在**作业之间缓存的文件和目录列表**。您只能使用本地工作副本中的路径。

缓存：

- 在流水线和作业之间共享。
- 默认情况下，不在受保护和未受保护的分支之间共享。
- 在产物之前恢复。
- 限制为最多四个不同的缓存。

您可以禁用特定作业的缓存，例如覆盖：

- 使用 default 定义的默认缓存。
- 添加了 include 的作业的配置。

[缓存实践](https://gitlab.cn/docs/jh/ci/caching/)✨

#### `cache:paths`

使用 `cache:paths` 关键字来选择要缓存的文件或目录。
额外细节：

- `cache:paths` 关键字包括文件，即使它们未被跟踪或在您的 `.gitignore` 文件中。

#### `cache:key`

使用 `cache:key` 关键字为每个缓存提供唯一的标识键。使用相同缓存键的所有作业都使用相同的缓存，包括在不同的流水线中。

如果未设置，则默认键为 `default`。所有带有 `cache:` 关键字但没有 `cache:key` 的作业共享 default 缓存。
必须与 `cache:paths` 一起使用，否则不会缓存任何内容

可能的输入：

- 一个字符串。
- 预定义变量。
- 两者的结合。

##### `cache:key:files`

使用 `cache:key:files` 关键字在**一两个特定文件更改时**生成新密钥。`cache:key:files` 可让您重用一些缓存，并减少重建它们的频率，从而加快后续流水线运行的速度。

示例

```yaml
cache-job:
  script:
    - echo "This job uses a cache."
  cache:
    key:
      files:
        - Gemfile.lock
        - package.json
    paths:
      - vendor/ruby
      - node_modules
```

**额外信息**：缓存 key 是根据最近更改了每个列出的文件的提交计算得出的 SHA。如果在任何提交中都没有更改任何文件，则回退键是 `default`。

##### `cache:key:prefix`

使用 `cache:key:prefix` 将前缀与为 `cache:key:files` 计算的 SHA 结合起来。

可能的输入：

- 一个字符串
- 预定义变量
- 两者的结合。

#### `cache:untracked`

使用 `untracked: true` 来缓存 Git 仓库中所有未跟踪的文件：
可能的输入：`true` 或 `false`（默认）。

#### `cache:unprotect`

使用 `cache:unprotect` 设置要在受保护的和未受保护的分支之间共享的缓存。

> 当设置为 `true` 时，无法访问受保护分支的用户可以读取和写入受保护分支使用的缓存键

#### `cache:when`

使用 `cache:when` 定义何时根据作业的状态保存缓存。

必须与 `cache:paths` 一起使用，否则不会缓存任何内容。

可能的输入：

- `on_success`（默认）：仅在作业成功时保存缓存。
- `on_failure`：仅在作业失败时保存缓存。
- `always`：始终保存缓存。

#### `cache:policy`

要更改缓存的上传和下载行为，请使用 `cache:policy` 关键字。 默认情况下，作业在作业开始时下载缓存，并在作业结束时将更改上传到缓存。 这是 `pull-push` 策略（默认）。

要将作业设置为仅在作业开始时下载缓存，但在作业完成时从不上传更改，请使用 `cache:policy:pull`。

要将作业设置为仅在作业完成时上传缓存，但在作业开始时从不下载缓存，请使用 `cache:policy:push`。

当您有许多使用相同缓存并行执行的作业时，请使用 `pull` 策略。 此策略可加快作业执行速度并减少缓存服务器上的负载。 您可以使用带有 push 策略的作业来构建缓存。

必须与 `cache:paths` 一起使用，否则不会缓存任何内容。

可能的输入：

- `pull`
- `push`
- `pull-push`（默认）
- `CI/CD` 变量

#### `cache:fallback_keys`

使用 `cache:fallback_keys` 指定一个键列表，如果没有找到 `cache:key` 的缓存，**则尝试恢复缓存**。缓存按照 `fallback_keys` 部分中指定的顺序检索。

可能的输入：

- 缓存键数组

### `dependencies`

使用 `dependencies` 关键字定义要从中获取产物的作业列表。 您还可以设置一个作业以完全不下载任何产物。

如果您不使用 `dependencies`，则**前一阶段的所有产物都会传递给每个作业**。

可能的输入：

- 从中获取产物的作业名称。
- 一个空数组 (`[]`)，用于将作业配置为不下载任何产物。
  额外细节：

- 作业状态无关紧要。如果作业失败或者是未触发的手动作业，则不会发生错误。
- 如果依赖作业的产物是已过期或已删除，则作业失败。

### artifacts

使用 `artifacts` 指定在作业 `succeeds`, `fails`, 或 `always` 时附加到作业的文件和目录列表。

作业完成后，产物将发送到 GitLab。如果大小不大于最大产物大小，它们可以在 GitLab UI 中下载。

默认情况下，后期的作业会自动下载早期作业创建的所有产物。您可以使用 `dependencies` 控制作业中的产物下载行为。

使用 `needs` 关键字时，作业只能从 `needs` 配置中定义的作业下载产物。

**默认只收集成功作业的作业产物，产物在缓存后恢复**。

[阅读有关产物的更多信息](https://gitlab.cn/docs/jh/ci/jobs/job_artifacts.html)。

#### `artifacts:exclude`

`exclude` 可以防止将文件添加到产物存档中。

类似于 `artifacts:paths`，`exclude` 路径是相对于项目目录的。您可以使用使用 `glob` 或 `doublestar.PathMatch` 模式的通配符。

与 `artifacts:paths` 不同，`exclude` 路径不是递归的。要排除目录的所有内容，您可以显式匹配它们而不是匹配目录本身。

```yaml
# 将所有文件存储在 binaries/ 中，但不存储在 temp/ 子目录中：
artifacts:
  paths:
    - binaries/
  exclude:
    - binaries/temp/**/*
```

#### `artifacts:expire_in`

过期时间段从产物上传并存储到 GitLab 时开始

#### `artifacts:expose_as`

使用 `expose_as` 关键字在`合并请求` UI 中公开`作业产物`。

请注意以下事项：

- 使用变量定义 artifacts:paths 时，不会在合并请求 UI 中显示产物。
- 每个合并请求最多可以公开 10 个作业产物。
- 不支持全局模式。
- 如果指定了目录，如果目录中有多个文件，则链接指向作业产物浏览器。
- 对于带有 `.html`、`.htm`、`.txt`、`.json`、`.xml` 和 `.log` 扩展名的公开单个文件产物，如果 GitLab Pages：
  - 启用，系统自动呈现产物。
  - 未启用，文件显示在产物浏览器中。

#### `artifacts:name`

使用 name 指令来定义创建的产物存档的名称。您可以为每个存档指定唯一的名称。`artifacts:name` 变量可以使用任何[预定义变量](https://gitlab.cn/docs/jh/ci/variables/index.html)。 默认名称是 `artifacts`，下载后会变成 `artifacts.zip`。

```yaml
- $CI_JOB_NAME
- $CI_COMMIT_REF_NAME
- '$CI_JOB_NAME-$CI_COMMIT_REF_NAME'
- '$CI_JOB_STAGE-$CI_COMMIT_REF_NAME'
```

#### `artifacts:paths`

路径相对于项目目录 (`$CI_PROJECT_DIR`)，不能直接链接到项目目录之外。您可以使用 `glob` 模式的通配符和：

- 在 GitLab Runner 13.0 和更高版本，`doublestar.Glob`。
- 在 GitLab Runner 12.10 和更早版本，`filepath.Match`。

- 发送 `binaries` 和 `.config` 中的所有文件：
- 要禁用产物传递，请使用空 `dependencies` 定义作业：

#### `artifacts:public`

使用 `artifacts:public` 来确定作业产物是否应该公开可用。

`artifacts:public` 的默认值为 `true`，这意味着匿名和访客用户可以下载公共流水线中的产物：

#### `artifacts:reports`

使用 `artifacts:reports` 收集作业中包含的模板生成的产物。

> 例如测试报告

#### `artifacts:untracked`

使用 `artifacts:untracked` 将所有 Git 未跟踪文件添加为产物（以及在 `artifacts:paths` 中定义的路径）。`artifacts:untracked` 忽略仓库的 `.gitignore` 文件中的配置。

#### `artifacts:when`

使用 `artifacts:when` 在**作业失败时上传产物**。
可能的输入：

- `on_success`（默认）：仅在作业成功时上传产物。
- `on_failure`：仅在作业失败时上传产物。
- `always`：始终上传产物（作业超时时除外）。例如，当 上传产物需要对失败的测试进行故障排除时。

额外细节：

- 为 `artifacts:reports` 创建的产物总是被上传，无论作业结果（成功或失败）如何。`artifacts:when` 不会改变这种行为。

### `coverage`

使用带有自定义正则表达式的 `coverage` 来配置如何从作业输出中提取代码覆盖率。如果作业输出中至少有一行与正则表达式匹配，则覆盖率会显示在 UI 中。

为了提取匹配行中的代码覆盖率值，GitLab 使用以下正则表达式：`\d+(\.\d+)?`。

### `dast_configuration`

❓
使用 `dast_configuration` 关键字指定要在 `CI/CD` 配置中使用的站点配置文件和扫描程序配置文件。必须首先在项目中创建这两个配置文件。作业的阶段必须是 `dast`。

### `retry`

使用 `retry` 配置作业失败时重试的次数。如果未定义，则默认为 `0` 并且作业不会重试。

当作业失败时，该作业最多再处理两次，直到成功或达到最大重试次数。

默认情况下，**所有失败类型都会导致重试作业**。使用 `retry:when` 选择要重试的失败。
**可能的输入**：`0`（默认）、`1` 或`2`。

#### `retry:when`

使用 `retry:when` 和 `retry:max` 仅针对特定的失败情况重试作业。`retry:max` 是最大重试次数，如 `retry`，可以是 `0`、`1` 或 `2`。

**可能的输入**：单一故障类型，或一个或多个故障类型的数组：

- `always`：任何失败重试（默认）。
- `unknown_failure`：当失败原因未知时重试。
- `script_failure`：脚本失败时重试。对于 docker、docker+machine、kubernetes 执行器，runner 拉取 Docker 镜像失败时重试。
- `api_failure`：在 API 失败时重试。
- `stuck_or_timeout_failure`：当作业卡住或超时时重试。
- `runner_system_failure`：如果 runner 系统出现故障（例如，作业设置失败），请重试。
- `runner_unsupported`：如果 runner 不受支持，请重试。
- `stale_schedule`：如果无法执行延迟的作业，请重试。
- `job_execution_timeout`：如果脚本超过为作业设置的最大执行时间，请重试。
- `archived_failure`：如果作业已存档且无法运行，请重试。
- `unmet_prerequisites`：如果作业未能完成先决任务，请重试。
- `scheduler_failure`：如果 scheduler 未能将作业分配给 runner，请重试。
- `data_integrity_failure`：如果检测到结构完整性问题，请重试。

示例

```yaml
test:
  script: rspec
  retry: 2

test_advanced:
  script:
    - echo "Run a script that results in exit code 137."
    - exit 137
  retry:
    max: 2
    when: runner_system_failure
    exit_codes: 137
```

### `timeout`

> 跑单元测试时容器引起超时

使用 `timeout` 为特定作业配置超时。**如果作业运行的时间超过超时时间，作业将失败**。

作业级超时可以长于项目级超时。但不能超过 `runner` 的超时。

**可能的输入**：用自然语言编写的一段时间。例如，以下都是等价的：

- 3600 seconds
- 60 minutes
- one hour

### `parallel`⛏️🪵📕

> https://docs.gitlab.com/ci/yaml/#parallel
> 运行的次数
> 一个 job 并行执行的数量

使用 `parallel` 配置并行运行的作业实例数。

`parallel` 关键字创建并行运行的同一作业的 N 个实例。 它们从 `job_name 1/N` 到 `job_name N/N` 按顺序命名：

关键字类型：作业关键字。您只能将其用作作业的一部分。

可能的输入：从 `1` 到 `200` 的数值。

### `trigger`

使用 trigger 来声明一个作业是一个“触发器作业”，它启动一个`下游流水线`：

- 多项目流水线: -> 微服务项目 ✨
- 子流水线。monorepo 项目 ✨

### interruptible

如果在作业完成之前新流水线启动时应取消作业，请使用 `interruptible`。

如果[**禁用自动取消冗余流水线**](https://gitlab.cn/docs/jh/ci/pipelines/settings.html#auto-cancel-redundant-pipelines)，则此关键字无效。启用后，在为同一分支上的新更改启动流水线时，会取消正在运行的具有 `interruptible: true` 的作业。

在带有 `interruptible: false` 的作业开始后，您无法取消后续作业。

### resource_group

使用 `resource_group` 创建一个资源组，以确保同一项目的不同流水线之间的作业是互斥的。

例如，如果属于同一资源组的多个作业同时排队，则只有其中一个作业启动。其他作业一直等到 `resource_group` 空闲。

资源组的行为类似于其他编程语言中的信号量。

您可以为每个环境定义多个资源组。例如，**在部署到物理设备时，您可能有多个物理设备。 每个设备都可以部署到，但在任何给定时间每个设备只能进行一次部署**。

### `release`

> NOTE: 像 github 的 release 那样，方便下载资源

使用 `release` 创建一个[`发布`](https://gitlab.cn/docs/jh/user/project/releases/index.html)。

发布作业必须有权访问 `release-cli`，其必须在 `$PATH` 中。

关键字类型：作业关键字。您只能将其用作作业的一部分。

可能的输入：`release`: 子键：

- tag_name
- description
- tag_message（可选）
- name（可选）
- ref（可选）
- milestones（可选）
- released_at（可选）
- assets:links（可选）

### `secrets`

> 密钥相关

使用 `secrets` 将 `CI/CD secret` 指定为：

- 从外部 secret 提供商处检索。
- 在作业中作为 `CI/CD 变量`（`file 类型` 默认情况下提供）。

### `pages`

使用 `pages` 定义一个 GitLab Pages 作业，将静态内容上传到 GitLab，然后将**内容发布为网站**。

额外细节：

你必须：

- 将任何静态内容放在 `public/` 目录中。
- 定义 `artifacts` 和 `public/` 目录的路径。

示例：

```yaml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
  environment: production
```

### `inherit`

使用`inherit:`来控制**默认关键字**和**变量的继承**。

#### `inherit:default`

使用`inherit:default`来控制**默认关键字**的继承。

可能的输入：

- `true`（默认）或 `false` 启用或禁用所有默认关键字的继承。
- 要继承的特定默认关键字列表。

示例:

```yaml
default:
  retry: 2
  image: ruby:3.0
  interruptible: true

job1:
  script: echo "This job does not inherit any default keywords."
  inherit:
    default: false

job2:
  script: echo "This job inherits only the two listed default keywords. It does not inherit 'interruptible'."
  inherit:
    default:
      - retry
      - image
```

#### `inherit:variables`

使用`inherit:variables`来控制全局变量关键字的继承。

关键字类型：作业关键字。您只能将其用作作业的一部分。

可能的输入：

- `true`（默认）或 `false` 来启用或禁用所有全局变量的继承。
- 要继承的特定变量的列表。

### `variables`

使用 `variables` 为作业定义自定义变量。

变量在 `script`、`before_script` 和 `after_script` 命令**中始终可用**。 您还可以在某些作业关键字中使用变量作为输入。

如果您将 `variables` 定义为全局关键字，它的行为类似于所有作业的默认变量。创建流水线时，每个变量都会复制到每个作业配置。 **如果作业已经定义了该变量，则作业级别变量优先**。

**在全局级别定义的变量不能用作其他全局关键字的输入**，例如 `include`。这些变量只能在作业级别使用，在 `script`、`before_script` 和 `after_script` 部分，以及一些作业关键字中的输入，例如 `rules`。
可能的输入：变量名和值对：

- 名称只能使用数字、字母和下划线 (`_`)。
- 值必须是字符串。

## 废弃的关键字

以下关键字已弃用。

全局定义的 `image`, `services`, `cache`, `before_script`, `after_script`

不推荐在全局范围内定义 `image`、`services`、`cache`、`before_script` 和 `after_script`。可能会从未来的版本中删除支持。

**使用 `default:` 代替**
