# Make jobs start earlier with needs
使用 needs 使作业提前启动

You can use the `needs` keyword to create dependencies between jobs in a pipeline. Jobs run as soon as their dependencies are met, regardless of the pipeline’s stages configuration. You can even configure a pipeline with no stages defined (effectively one large stage) and jobs still run in the proper order. This pipeline structure is a kind of directed acyclic graph.
您可以使用 `needs` 关键字在管道中的作业之间创建依赖关系。只要依赖关系满足，作业就会立即运行，**而不管管道的 stages 配置如何**。您甚至可以配置一个没有定义阶段的管道（实际上是一个大阶段），作业仍然会按正确的顺序运行。这种管道结构是一种有向无环图。
