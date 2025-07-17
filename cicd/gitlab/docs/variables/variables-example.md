一个脚本输出的当前环境变量信息

## 原始的输出

```bash
export CI='true'
export CI_API_GRAPHQL_URL='https://gitlab.com/api/graphql'
export CI_API_V4_URL='https://gitlab.com/api/v4'
export CI_BUILDS_DIR='/builds'
export CI_COMMIT_AUTHOR='Liutsing Robert <liutsingluo@gmail.com>'
export CI_COMMIT_BEFORE_SHA='0000000000000000000000000000000000000000'
export CI_COMMIT_DESCRIPTION=''
export CI_COMMIT_MESSAGE='debug: 变量输出'
export CI_COMMIT_REF_NAME='react'
export CI_COMMIT_REF_PROTECTED='false'
export CI_COMMIT_REF_SLUG='react'
export CI_COMMIT_SHA='045f07645315dab2f014f58b5ea4f6e35ba814e3'
export CI_COMMIT_SHORT_SHA='045f0764'
export CI_COMMIT_TIMESTAMP='2025-03-05T14:10:15+08:00'
export CI_COMMIT_TITLE='debug: 变量输出'
export CI_CONCURRENT_ID='0'
export CI_CONCURRENT_PROJECT_ID='0'
export CI_CONFIG_PATH='.gitlab-ci.yml'
export CI_DEFAULT_BRANCH='main'
export CI_DEPENDENCY_PROXY_DIRECT_GROUP_IMAGE_PREFIX='gitlab.com:443/mapleimage/dependency_proxy/containers'
export CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX='gitlab.com:443/mapleimage/dependency_proxy/containers'
export CI_DEPENDENCY_PROXY_PASSWORD='[MASKED]'
export CI_DEPENDENCY_PROXY_SERVER='gitlab.com:443'
export CI_DEPENDENCY_PROXY_USER='gitlab-ci-token'
export CI_DEPLOY_PASSWORD='[MASKED]'
export CI_DEPLOY_USER='gitlab+deploy-token-7291437'
export CI_DISPOSABLE_ENVIRONMENT='true'
export CI_JOB_GROUP_NAME='install-job'
export CI_JOB_ID='9314856741'
export CI_JOB_IMAGE='mapleimage123/node:20-alpine3.19'
export CI_JOB_NAME='install-job'
export CI_JOB_NAME_SLUG='install-job'
export CI_JOB_STAGE='install'
export CI_JOB_STARTED_AT='2025-03-05T06:10:30Z'
export CI_JOB_STATUS='running'
export CI_JOB_TIMEOUT='3600'
export CI_JOB_TOKEN='[MASKED]'
export CI_JOB_URL='https://gitlab.com/MapleImage/maple-dolores/-/jobs/9314856741'
export CI_MERGE_REQUEST_DESCRIPTION=''
export CI_MERGE_REQUEST_DESCRIPTION_IS_TRUNCATED='false'
export CI_MERGE_REQUEST_DIFF_BASE_SHA=''
export CI_MERGE_REQUEST_DIFF_ID='1284117326'
export CI_MERGE_REQUEST_EVENT_TYPE='detached'
export CI_MERGE_REQUEST_ID='360380059'
export CI_MERGE_REQUEST_IID='1'
export CI_MERGE_REQUEST_PROJECT_ID='62099837'
export CI_MERGE_REQUEST_PROJECT_PATH='MapleImage/maple-dolores'
export CI_MERGE_REQUEST_PROJECT_URL='https://gitlab.com/MapleImage/maple-dolores'
export CI_MERGE_REQUEST_REF_PATH='refs/merge-requests/1/head'
export CI_MERGE_REQUEST_SOURCE_BRANCH_NAME='react'
export CI_MERGE_REQUEST_SOURCE_BRANCH_PROTECTED='false'
export CI_MERGE_REQUEST_SOURCE_BRANCH_SHA=''
export CI_MERGE_REQUEST_SOURCE_PROJECT_ID='62099837'
export CI_MERGE_REQUEST_SOURCE_PROJECT_PATH='MapleImage/maple-dolores'
export CI_MERGE_REQUEST_SOURCE_PROJECT_URL='https://gitlab.com/MapleImage/maple-dolores'
export CI_MERGE_REQUEST_SQUASH_ON_MERGE='false'
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME='main'
export CI_MERGE_REQUEST_TARGET_BRANCH_PROTECTED='true'
export CI_MERGE_REQUEST_TARGET_BRANCH_SHA=''
export CI_MERGE_REQUEST_TITLE='React'
export CI_NODE_TOTAL='1'
export CI_OPEN_MERGE_REQUESTS='MapleImage/maple-dolores!1'
export CI_PAGES_DOMAIN='gitlab.io'
export CI_PAGES_HOSTNAME='maple-dolores-860120.gitlab.io'
export CI_PAGES_URL='https://maple-dolores-860120.gitlab.io'
export CI_PIPELINE_CREATED_AT='2025-03-05T06:10:26Z'
export CI_PIPELINE_ID='1700399976'
export CI_PIPELINE_IID='289'
export CI_PIPELINE_NAME=''
export CI_PIPELINE_SOURCE='merge_request_event'
export CI_PIPELINE_URL='https://gitlab.com/MapleImage/maple-dolores/-/pipelines/1700399976'
export CI_PROJECT_CLASSIFICATION_LABEL=''
export CI_PROJECT_DESCRIPTION=''
export CI_PROJECT_DIR='/builds/MapleImage/maple-dolores'
export CI_PROJECT_ID='62099837'
export CI_PROJECT_NAME='maple-dolores'
export CI_PROJECT_NAMESPACE='MapleImage'
export CI_PROJECT_NAMESPACE_ID='1718121'
export CI_PROJECT_NAMESPACE_SLUG='mapleimage'
export CI_PROJECT_PATH='MapleImage/maple-dolores'
export CI_PROJECT_PATH_SLUG='mapleimage-maple-dolores'
export CI_PROJECT_REPOSITORY_LANGUAGES=''
export CI_PROJECT_ROOT_NAMESPACE='MapleImage'
export CI_PROJECT_TITLE='maple-dolores'
export CI_PROJECT_URL='https://gitlab.com/MapleImage/maple-dolores'
export CI_PROJECT_VISIBILITY='private'
export CI_REGISTRY='registry.gitlab.com'
export CI_REGISTRY_IMAGE='registry.gitlab.com/mapleimage/maple-dolores'
export CI_REGISTRY_PASSWORD='[MASKED]'
export CI_REGISTRY_USER='gitlab-ci-token'
export CI_REPOSITORY_URL='https://gitlab-ci-token:[MASKED]@gitlab.com/MapleImage/maple-dolores.git'
export CI_RUNNER_DESCRIPTION='frontend nodejs build runner on walle pc'
export CI_RUNNER_EXECUTABLE_ARCH='windows/amd64'
export CI_RUNNER_ID='45921895'
export CI_RUNNER_REVISION='656c1943'
export CI_RUNNER_SHORT_TOKEN='t3_adJG93'
export CI_RUNNER_TAGS='["nodejs"]'
export CI_RUNNER_VERSION='16.9.0'
export CI_SERVER='yes'
export CI_SERVER_FQDN='gitlab.com'
export CI_SERVER_HOST='gitlab.com'
export CI_SERVER_NAME='GitLab'
export CI_SERVER_PORT='443'
export CI_SERVER_PROTOCOL='https'
export CI_SERVER_REVISION='6151fbfaabe'
export CI_SERVER_SHELL_SSH_HOST='gitlab.com'
export CI_SERVER_SHELL_SSH_PORT='22'
export CI_SERVER_TLS_CA_FILE='/builds/MapleImage/maple-dolores.tmp/CI_SERVER_TLS_CA_FILE'
export CI_SERVER_URL='https://gitlab.com'
export CI_SERVER_VERSION='17.10.0-pre'
export CI_SERVER_VERSION_MAJOR='17'
export CI_SERVER_VERSION_MINOR='10'
export CI_SERVER_VERSION_PATCH='0'
export CI_TEMPLATE_REGISTRY_HOST='registry.gitlab.com'
export COREPACK_NPM_REGISTRY='https://registry.npmmirror.com'
export FF_CLEAN_UP_FAILED_CACHE_EXTRACT='false'
export FF_CMD_DISABLE_DELAYED_ERROR_LEVEL_EXPANSION='false'
export FF_DISABLE_POWERSHELL_STDIN='false'
export FF_DISABLE_UMASK_FOR_DOCKER_EXECUTOR='false'
export FF_ENABLE_BASH_EXIT_CODE_CHECK='false'
export FF_ENABLE_JOB_CLEANUP='false'
export FF_KUBERNETES_HONOR_ENTRYPOINT='false'
export FF_LOG_IMAGES_CONFIGURED_FOR_JOB='false'
export FF_NETWORK_PER_BUILD='false'
export FF_POSIXLY_CORRECT_ESCAPES='false'
export FF_PRINT_POD_EVENTS='false'
export FF_RESOLVE_FULL_TLS_CHAIN='false'
export FF_RETRIEVE_POD_WARNING_EVENTS='false'
export FF_SCRIPT_SECTIONS='false'
export FF_SECRET_RESOLVING_FAILS_IF_MISSING='true'
export FF_SET_PERMISSIONS_BEFORE_CLEANUP='true'
export FF_SKIP_NOOP_BUILD_STAGES='true'
export FF_TEST_FEATURE='false'
export FF_USE_ADVANCED_POD_SPEC_CONFIGURATION='false'
export FF_USE_DIRECT_DOWNLOAD='true'
export FF_USE_DOCKER_AUTOSCALER_DIAL_STDIO='true'
export FF_USE_DUMB_INIT_WITH_KUBERNETES_EXECUTOR='false'
export FF_USE_DYNAMIC_TRACE_FORCE_SEND_INTERVAL='false'
export FF_USE_FASTZIP='false'
export FF_USE_GIT_BUNDLE_URIS='true'
export FF_USE_IMPROVED_URL_MASKING='false'
export FF_USE_INIT_WITH_DOCKER_EXECUTOR='false'
export FF_USE_LEGACY_KUBERNETES_EXECUTION_STRATEGY='false'
export FF_USE_NEW_BASH_EVAL_STRATEGY='false'
export FF_USE_NEW_SHELL_ESCAPE='false'
export FF_USE_POD_ACTIVE_DEADLINE_SECONDS='true'
export FF_USE_POWERSHELL_PATH_RESOLVER='false'
export FF_USE_WINDOWS_JOB_OBJECT='false'
export FF_USE_WINDOWS_LEGACY_PROCESS_STRATEGY='true'
export GITLAB_CI='true'
export GITLAB_ENV='/builds/MapleImage/maple-dolores.tmp/gitlab_runner_env'
export GITLAB_FEATURES='ldap_group_sync,multiple_ldap_servers,seat_link,seat_usage_quotas,pipelines_usage_quotas,transfer_usage_quotas,product_analytics_usage_quotas,zoekt_code_search,repository_size_limit,elastic_search,admin_audit_log,auditor_user,custom_file_templates,custom_project_templates,db_load_balancing,default_branch_protection_restriction_in_groups,extended_audit_events,external_authorization_service_api_management,geo,instance_level_scim,ldap_group_sync_filter,object_storage,pages_size_limit,project_aliases,disable_private_profiles,password_complexity,amazon_q,enterprise_templates,git_abuse_rate_limit,integrations_allow_list,required_ci_templates,runner_maintenance_note,runner_performance_insights,runner_upgrade_management,observability_alerts'
export GITLAB_USER_EMAIL='liutsingluo@gmail.com'
export GITLAB_USER_ID='1421078'
export GITLAB_USER_LOGIN='MapleImage'
export GITLAB_USER_NAME='LiutsingRo'
export HOME='/root'
export HOSTNAME='runner-t3adjg93-project-62099837-concurrent-0'
export NODE_IMAGE='mapleimage123/node:20-alpine3.19'
export NODE_VERSION='20.17.0'
export OLDPWD='/'
export PATH='/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin'
export PNPM_HOME='/builds/MapleImage/maple-dolores/.pnpm'
export PNPM_STORE_DIR='/builds/MapleImage/maple-dolores/.pnpm-store'
export PWD='/builds/MapleImage/maple-dolores'
export RUNNER_TEMP_PROJECT_DIR='/builds/MapleImage/maple-dolores.tmp'
export SHLVL='3'
export TZ='Asia/Shanghai'
export USER_DOCKER_NS='mapleimage123'
export USER_DOCKER_REGISTRY='https://index.docker.io/v1/'
export USER_DOCKER_REGISTRY_PASSWORD='a1019656789'
export USER_DOCKER_REGISTRY_USER='mapleimage123'
export YARN_VERSION='1.22.22'

```
## 注释后的输出(常用的)
```bash
# GitLab CI/CD 环境变量清单（自动生成）

# 基础CI标识
export CI='true'                                     # CI环境标识
export GITLAB_CI='true'                              # GitLab CI专用标识
export CI_CONFIG_PATH='.gitlab-ci.yml'               # CI配置文件路径

# 提交信息
export CI_COMMIT_REF_NAME='react'                    # 当前分支/标签名称
export CI_COMMIT_SHA='045f07645315dab2f014f58b5ea4f6e35ba814e3' # 完整提交SHA
export CI_COMMIT_SHORT_SHA='045f0764'                # 简短提交SHA（前8位）
export CI_COMMIT_MESSAGE='debug: 变量输出'           # 完整提交信息
export CI_COMMIT_AUTHOR='Liutsing Robert <liutsingluo@gmail.com>' # 提交者信息

# 流水线信息
export CI_PIPELINE_ID='1700399976'                   # 流水线唯一ID
export CI_PIPELINE_SOURCE='merge_request_event'      # 流水线触发来源（合并请求事件）
export CI_JOB_ID='9314856741'                        # 当前作业唯一ID
export CI_JOB_NAME='install-job'                     # 作业名称
export CI_JOB_STAGE='install'                        # 所属CI阶段

# 合并请求信息
export CI_MERGE_REQUEST_ID='360380059'               # 合并请求唯一ID
export CI_MERGE_REQUEST_SOURCE_BRANCH_NAME='react'   # 源分支名称
export CI_MERGE_REQUEST_TARGET_BRANCH_NAME='main'    # 目标分支名称
export CI_MERGE_REQUEST_IID='1'                     # 项目内的合并请求ID

# 项目信息
export CI_PROJECT_ID='62099837'                      # 项目唯一ID
export CI_PROJECT_PATH='MapleImage/maple-dolores'    # 项目路径（命名空间/项目名）
export CI_PROJECT_URL='https://gitlab.com/MapleImage/maple-dolores' # 项目URL

# Runner信息
export CI_RUNNER_ID='45921895'                       # Runner唯一ID
export CI_RUNNER_DESCRIPTION='frontend nodejs build runner on walle pc' # Runner描述
export CI_RUNNER_TAGS='["nodejs"]'                   # Runner标签（执行环境要求）

# 依赖代理
export CI_DEPENDENCY_PROXY_SERVER='gitlab.com:443'   # 依赖代理服务器地址
export CI_DEPENDENCY_PROXY_GROUP_IMAGE_PREFIX='gitlab.com:443/mapleimage/dependency_proxy/containers' # 依赖代理镜像前缀

# 安全相关（敏感值已屏蔽）
export CI_JOB_TOKEN='[MASKED]'                       # 作业令牌（用于API认证）
export CI_REGISTRY_PASSWORD='[MASKED]'               # 容器仓库密码

# 用户自定义变量
export USER_DOCKER_REGISTRY='https://index.docker.io/v1/' # 私有Docker仓库地址
export USER_DOCKER_NS='mapleimage123'                # Docker命名空间
export NODE_IMAGE='mapleimage123/node:20-alpine3.19' # 自定义Node.js镜像

# 环境配置
export CI_BUILDS_DIR='/builds'                       # 构建目录路径
export CI_PROJECT_DIR='/builds/MapleImage/maple-dolores' # 项目克隆目录
export TZ='Asia/Shanghai'                            # 时区设置

# 实验性功能开关（FF前缀=Feature Flag）
export FF_USE_DIRECT_DOWNLOAD='true'                 # 启用直接下载功能
export FF_SKIP_NOOP_BUILD_STAGES='true'              # 跳过空构建阶段
# ...（其他FF开头的变量均为GitLab实验性功能开关）

# 系统信息
export CI_SERVER_VERSION='17.10.0-pre'                # GitLab服务器版本
export CI_RUNNER_VERSION='16.9.0'                    # Runner版本
export CI_SERVER_FQDN='gitlab.com'                   # GitLab完全限定域名
```
