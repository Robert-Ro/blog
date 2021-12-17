## 常用命令

- `npm init`
- `npm run`
- `npm install`
- `npm update`: Update packages
- `npm bin`: Display npm bin folder
- `npm link`: Symlink a package folder
- `npm publish`
- `npm deprecate`: Deprecate a version of a package
- `npm hook`: Manage registry hooks, [wombat-cli](https://github.com/npm/wombat-cli)
- `npm version`: Bump a package version: Run this in a package directory to bump the version and write the new data back to `package.json`, `package-lock.json`, and, if present, `npm-shrinkwrap.json`.

## 内部变量

> read `package.json` field and then inject into bash env

- `$npm_package_name`
- `$npm_package_version`
- `$npm_package_config_var1`

## 二次传参

利用`--`透传参数

## 脚本钩子hooks
- preXXX
- postXXX

### example
- 版本递增：`require('semver').inc(v, release)`等方法

## MISC
- [concurrently](https://github.com/open-cli-tools/concurrently), Run multiple commands concurrently
- [wait-on](https://github.com/jeffbski/wait-on), wait-on is a cross-platform command line utility which will wait for files, ports, sockets, and http(s) resources to become available (or not available using reverse mode)
- [node-semver](https://github.com/npm/node-semver), The semver parser for node (the one npm uses)
- ⭐⭐⭐[patch-package](https://github.com/ds300/patch-package), Fix broken node modules instantly 🏃🏽‍♀️💨