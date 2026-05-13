# **GitLab Runner 标签命名的最佳实践总结**

## 一、核心原则

### 1. **聚焦 Runner 特性，而非容器内容**
- **Runner 标签**：描述 Runner 主机本身的特性（资源、网络、安全等）
- **Docker 镜像**：管理语言版本、SDK、依赖库等运行时环境

### 2. **保持简洁，避免冗余**
- 单个 Runner 标签建议 **3-5 个** 以内
- 避免使用过于冗长的标签名称


## 二、推荐的标签维度

### 1. **执行器类型**
```bash
docker              # Docker 执行器
docker-compose      # Docker Compose 执行器
shell               # Shell 执行器
kubernetes          # Kubernetes 执行器
```

### 2. **资源能力（核心维度）**
```bash
small               # 小资源（简单任务，如单元测试）
medium              # 中等资源（常规构建）
large               # 大资源（Android/Flutter构建）
xlarge              # 超大资源（大型编译任务）
gpu                 # GPU资源（AI训练）
high-memory         # 高内存配置
```

### 3. **环境等级**
```bash
dev                 # 开发环境
test                # 测试环境
staging             # 预发布环境
prod                # 生产环境
```

### 4. **网络/安全权限**
```bash
internal            # 可访问内网资源
external            # 仅外网访问
vpn                 # 需要VPN连接
secure              # 安全加固环境
isolated            # 隔离环境（敏感数据处理）
```

### 5. **地理位置**
```bash
cn-beijing          # 北京数据中心
cn-shanghai         # 上海数据中心
us-east             # 美国东部
eu-west             # 欧洲西部
```

### 6. **特殊能力**
```bash
cache-enabled       # 配置了缓存加速
nfs                 # 支持NFS挂载
s3-access           # 可访问S3存储
```

## 三、标签组合策略

### 推荐格式：`环境-执行器-资源`
```bash
prod-docker-large   # 生产环境 + Docker + 大资源
dev-docker-small    # 开发环境 + Docker + 小资源
test-shell-mac      # 测试环境 + Shell + macOS
```

### 您现有的命名方式（推荐继续使用）
```bash
# Shell执行器
shell-mac           # macOS Shell Runner
shell-win           # Windows Shell Runner
shell-linux         # Linux Shell Runner

# Docker执行器  
docker-shared       # 共享资源（简单任务）
docker-large        # 大资源（Android/Flutter构建）
docker-gpu          # GPU支持
```

## 四、.gitlab-ci.yml 使用示例

```yaml
# 常规构建任务
build:
  image: node:20-alpine
  script: npm run build
  tags:
    - docker-medium

# 大型构建任务（如Android）
build-android:
  image: my-registry/android:34
  script: ./gradlew assembleRelease
  tags:
    - docker-large
    - prod

# 测试任务
test:
  image: python:3.11-slim
  script: pytest
  tags:
    - docker-small
    - test

# 需要内网访问的任务
deploy-internal:
  image: alpine:latest
  script: ./deploy.sh
  tags:
    - docker-medium
    - internal
```

## 五、管理最佳实践

### 1. **文档化标签含义**
在项目 Wiki 或 README 中维护标签清单：
```bash
# Runner标签说明
docker-small:  共享Docker Runner，适用于单元测试等轻量任务
docker-large:  大资源Docker Runner，适用于Android/Flutter构建
shell-mac:     macOS Shell Runner，适用于iOS构建
```

### 2. **定期清理标签**
- 移除不再使用的标签
- 使用 CI/CD 监控标签使用情况

### 3. **团队统一规范**
- 制定团队级别的标签命名标准
- 避免使用模糊词汇（如 `default`、`runner1`）

## 六、关键分工总结

| 职责 | Runner 标签 | Docker 镜像 |
|------|-------------|-------------|
| **资源能力** | ✅ 定义（如 `docker-large`） | ❌ |
| **语言版本** | ❌ | ✅ 定义（如 `node:20`） |
| **环境配置** | ✅ 定义（如 `prod`, `internal`） | ❌ |
| **依赖库版本** | ❌ | ✅ 定义（预安装在镜像中） |

通过这套标签体系，可以实现 **精准的任务调度** 和 **资源隔离**，让 CI/CD 流水线更加高效和可靠。