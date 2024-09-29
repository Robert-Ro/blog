# Building a GitLab CI/CD pipeline for a monorepo the easy way

## 处理多仓库的 cicd 问题

### 16.4 以前

```yml
# gitlab-ci.yml
stages:
  - build
  - test
  - deploy

top-level-job:
  stage: build
  script:
    - echo "Hello world..."

include:
  - local: '/java/j.gitlab-ci.yml'
  - local: '/python/py.gitlab-ci.yml'

# j.gitlab-ci.yml
stages:
  - build
  - test
  - deploy

.java-common:
  rules:
    - changes:
      - '../java/*'

java-build-job:
  extends: .java-common
  stage: build
  script:
    - echo "Building Java"

java-test-job:
  extends: .java-common
  stage: test
  script:
    - echo "Testing Java"

# py.gitlab-ci.yml
stages:
  - build
  - test
  - deploy

.python-common:
  rules:
    - changes:
      - '../python/*'

python-build-job:
  extends: .python-common
  stage: build
  script:
    - echo "Building Python"

python-test-job:
  extends: .python-common
  stage: test
  script:
    - echo "Testing Python"
```

### 16.4 以后

```yml
# gitlab-ci.yml
stages:
  - build
  - test

top-level-job:
  stage: build
  script:
    - echo "Hello world..."

include:
  - local: '/java/j.gitlab-ci.yml'
    rules:
      - changes:
          - 'java/*'
  - local: '/python/py.gitlab-ci.yml'
    rules:
      - changes:
          - 'python/*'
```

```yml
# j.gitlab-ci.yml
stages:
  - build
  - test
  - deploy

java-build-job:
  stage: build
  script:
    - echo "Building Java"

java-test-job:
  stage: test
  script:
    - echo "Testing Java"
```

```yml
# py.gitlab-ci.yml
stages:
  - build
  - test
  - deploy

python-build-job:
  stage: build
  script:
    - echo "Building Python"

python-test-job:
  stage: test
  script:
    - echo "Testing Python"
```

## Resources

- https://about.gitlab.com/blog/2024/07/30/building-a-gitlab-ci-cd-pipeline-for-a-monorepo-the-easy-way/
