# Integrations

首先，我们要消除一个常见的误解。webpack 是一个模块打包工具(`module bundler`)（例如，Browserify 或 Brunch）。而 不是一个任务执行工具(`task runner`)（例如，Make, Grunt 或者 Gulp ）。任务执行工具用来自动化处理常见的开发任务，例如，`lint`(代码检测)、`build`(构建)、`test`(测试)。相比模块打包工具，任务执行工具则聚焦在偏重上层的问题上面。你仍然可以得益于这种用法：使用上层的工具，而将打包部分的问题留给 webpack。

打包工具帮助你取得准备用于部署的 JavaScript 和 stylesheet，将它们转换为适合浏览器的可用格式。例如，可以通过 压缩、分离 chunk 和 惰性加载 我们的 JavaScript 来提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。

## NPM Scripts

通常 webpack 用户使用 npm scripts 来作为任务执行工具。这是比较好的开始。然而跨平台支持可能是个问题，但是有几种解决方案。许多用户（但不是大多数用户）直接使用 npm `scripts` 和各种级别的 webpack 配置和工具。

因此，**虽然 webpack 核心重点是打包，但是可以通过各种扩展，将它用于任务运行工具的常见工作**。集成一个单独的工具会增加复杂度，因此在开始前一定要权衡利弊。

## Grunt

对于那些使用 Grunt 的人，我们推荐使用 `grunt-webpack` package。使用 `grunt-webpack` 你可以将 `webpack` 或 `webpack-dev-server` **作为一项任务(task)执行**，访问 `grunt template tags` 中的统计信息，拆分开发和生产配置等等

Gruntfile.js

```js
const webpackConfig = require('./webpack.config.js')

module.exports = function (grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: true }, webpackConfig),
    },
  })

  grunt.loadNpmTasks('grunt-webpack')
}
```

## Gulp

在 [webpack-stream](https://github.com/shama/webpack-stream) package（也称作 `gulp-webpack`） 的帮助下，可以相当直接地将 Gulp 与 webpack 集成。在这种情况下，不需要单独安装 `webpack`，因为它是 `webpack-stream` 直接依赖：

```js
// gulpfile.js

const gulp = require('gulp')
const webpack = require('webpack-stream')
gulp.task('default', function () {
  return gulp
    .src('src/entry.js')
    .pipe(
      webpack({
        // Any configuration options...
      })
    )
    .pipe(gulp.dest('dist/'))
})
```
