- https://deepwiki.com/search/1pubspece0e355916780905cc49999_caa48882-e0b9-4440-9e69-550bf691093c
- gitlab cicd file-based cache key hash calc algo
- https://chatgpt.com/c/6875b98e-b7b0-8000-b4eb-871abb63ae2a
- https://gitlab.com/gitlab-org/gitlab/-/issues/301161
- https://gitlab.com/gitlab-org/gitlab/-/issues/18986

## cache miss

- 是否存在缓存-> 动态缓存策略

- fallback key: 初始缓存，怎么手动去创建这么一个缓存
- download cache
- use gradle caches
- build
- push cache

## cache hit
- download cache
- build



The cache:key:files keyword extends the cache:key functionality by making it easier to reuse some caches, and rebuild them less often, which speeds up subsequent pipeline runs.

When you include cache:key:files, you must also list the project files that are used to generate the key, up to a maximum of two files. The cache key is a SHA checksum computed from the most recent commits (up to two, if two files are listed) that changed the given files. If neither file was changed in any commits, the fallback key is default.


https://stackoverflow.com/questions/56124729/dependency-caching-in-gitlab-ci-based-on-the-sha1-of-my-dependencies-list#:~:text=The%20cache%20key%20is%20a%20SHA%20checksum%20computed%20from%20the%20most%20recent%20commits%20%28up%20to%20two%2C%20if%20two%20files%20are%20listed%29%20that%20changed%20the%20given%20files

https://www.kimi.com/chat/d1qum01l88blfu9lp9b0

https://docs.gitlab.com/ci/yaml/#cachekey

- https://gitlab.com/gitlab-org/gitlab/-/blob/master/doc/api/openapi/openapi_v2.yaml api文档


# 删除远程标签
git tag | Select-String -Pattern '^android-V0.0.0-' | ForEach-Object { git push gitlab --delete $_.ToString().Trim() }
# 删除本地标签
git tag | Select-String -Pattern '^android-V0.0.0-' | ForEach-Object { git tag -d $_.ToString().Trim() }
