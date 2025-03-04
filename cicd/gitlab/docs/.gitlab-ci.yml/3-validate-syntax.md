# Validate GitLab CI/CD configuration

## Check CI/CD syntax 检查 CI/CD 语法

CI lint 工具检查极狐 GitLab CI/CD 配置的语法，包括使用 `includes` 关键字添加的配置。

要使用 CI lint 工具检查 CI/CD 配置：

1. On the left sidebar, select **Search or go** to and find your project.
2. Select **Build** > **Pipeline editor**.
3. Select the **Validate** tab.
4. Select **Lint CI/CD sample**.
5. Paste a copy of the CI/CD configuration you want to check into the text box.
6. Select **Validate**.

## Simulate a pipeline 模拟流水线

You can simulate the creation of a GitLab CI/CD pipeline to find more complicated issues, including problems with needs and rules configuration. A simulation runs as a Git push event on the default branch.
您可以通过模拟 GitLab CI/CD 流水线的创建来发现更多复杂的问题，包括使用 `needs` 和 `rules` 配置的问题。模拟运行就像在默认分支上触发一个 `push` 事件一样。

Prerequisites 先决条件:

- You must have permissions to create pipelines on this branch to validate with a simulation.您必须有权限在默认分支上创建流水线来模拟验证。

To simulate a pipeline:

1. On the left sidebar, select **Search or go** to and find your project.
2. Select **Build** > **Pipeline editor**.
3. Select the **Validate** tab.
4. Select **Lint CI/CD sample**.
5. Paste a copy of the CI/CD configuration you want to check into the text box.
6. Select **Simulate pipeline creation for the default branch**.
7. Select **Validate**.
