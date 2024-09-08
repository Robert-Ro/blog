# Gradle Commands Reference

```shell
# build setup
./gradlew wrapper # 生成 gradle wrapper文件
./gradlew init # 初始化项目

# help
./gradlew tasks # 查看项目支持的任务
./gradlew tasks --all # 查看所有任务(包括所含依赖的任务)
./gradlew help
./gradlew help --task <task> # 查看任务的帮助信息

# 构建
./gradlew assemble # 构建应用📌
./gradlew build # 构建应用和执行应用的测试
./gradlew bundle #

# install tasks

# 依赖管理
./gradlew dependencies # 查看项目依赖📌

# 清理
./gradlew clean # 清理项目的build目录📌
```
