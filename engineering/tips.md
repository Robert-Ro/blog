## npmrc

```bash
auto-install-peers=true
strict-peer-dependencies=true
registry=https://registry.npmjs.com
# registry=https://registry.npmmirror.com
git-checks=false
enable-pre-post-scripts=true
strict-peer-dependencies=false

```

## commands

### npm

- `npm install --package-lock-only` 只创建 `package-lock.json` 文件

## pnpm

pnpm link package

```sh
git clone https://github.com/vitejs/vite.git
cd vite
pnpm install
cd packages/vite
pnpm run build
pnpm link --global # you can use your preferred package manager for this step
```

## get package version

`grep version package.json | awk -F \" '{print $4}'`

## 删除 node_modules

`npx rimraf ./**/node_modules`

## repo 相关

npm config set registry https://registry.npmmirror.com
npm config set registry https://registry.npmjs.org
npm config set <@scope>:registry <private repo url>
npm config get registry
npm update package
npm config ls

---

npm config set @ecar:registry https://packages.aliyun.com/627b04ae0065edd3d51a7108/npm/npm-registry/
// 私有仓库 publish
// 用户名: 63155f3da5020a75d4b53e50
// 密码: Gcd9dfAI7D\_(

npm login --registry=https://packages.aliyun.com/627b04ae0065edd3d51a7108/npm/npm-registry/ --scope=@ecar
npm publish --scope=@ecar

-------------------pnpm---------------
Run pnpm install -g then pnpm install -g pnpm

enable-pre-post-scripts=true

## version 相关

\~ 与 ^ 版本
版本分为: 主版本号、次版本号、补丁版本号

```json
"devDependencies": {
"vue": "~2.2.2",// 匹配最近小版本，如，会匹配所有的2.2.x版本，但最高不会匹配2.3.0
"vue-router": "^2.2.0"// 最近的一个大版本，所有 2.x.x但不不包括3.0.0，相当于 2.0.0 <= version < 3.0.0
}
```

## 查看项目依赖更新

`npx npm-check -u`： 参考版本限制
`npx npm-check-updates`: 不参考版本限制
