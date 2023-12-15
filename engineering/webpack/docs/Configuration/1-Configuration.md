# Configuration

Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is `src/index.js` and will output the result in `dist/main.js` minified and optimized for production.
webpack 开箱即用，可以无需使用任何配置文件。然而，webpack 会假定项目的入口起点为 src/index.js，然后会在 dist/main.js 输出结果，并且在生产环境开启压缩和优化。

> [createapp.dev](https://createapp.dev/webpack) is an online tool for creating custom webpack configurations. It allows you to select various features that will be combined and added to the resulting configuration file. Also, it generates an example project based on provided webpack configuration that you can review in your browser and download.

Usually, your projects will need to extend this functionality, for this you can create a `webpack.config.js` file in the root folder and webpack will automatically use it.

All the available configuration options are specified below.

## Use a different configuration file

If for some reason you want to use a different configuration file depending on certain situations, you can change this via command line by using the `--config` flag.

```json
{
  "scripts": {
    "build": "webpack --config prod.config.js"
  }
}
```

## Set up a new webpack project

Webpack has a huge set of options which might be overwhelming to you, please take advantage of [webpack-cli's `init` command](https://webpack.js.org/api/cli/#init) which could rapidly generate webpack configuration files for your project requirements, it will ask you a couple of questions before creating a configuration file.

```shell
npx webpack init
```

npx might prompt you to install `@webpack-cli/generators` if it is not yet installed in the project or globally. You might also get additional packages installed to your project depending on the choices you've made during the configuration generation.
```sh
$ npx webpack init

[webpack-cli] For using this command you need to install: '@webpack-cli/generators' package.
[webpack-cli] Would you like to install '@webpack-cli/generators' package? (That will run 'npm install -D @webpack-cli/generators') (Y/n)
devDependencies:
+ @webpack-cli/generators 2.5.0
? Which of the following JS solutions do you want to use? ES6
? Do you want to use webpack-dev-server? Yes
? Do you want to simplify the creation of HTML files for your bundle? Yes
? Do you want to add PWA support? No
? Which of the following CSS solutions do you want to use? CSS only
? Will you be using PostCSS in your project? Yes
? Do you want to extract CSS for every file? Only for Production
? Do you like to install prettier to format generated configuration? Yes
? Pick a package manager: pnpm
[webpack-cli] ℹ INFO  Initialising project...

devDependencies:
+ @babel/core 7.19.3
+ @babel/preset-env 7.19.4
+ autoprefixer 10.4.12
+ babel-loader 8.2.5
+ css-loader 6.7.1
+ html-webpack-plugin 5.5.0
+ mini-css-extract-plugin 2.6.1
+ postcss 8.4.17
+ postcss-loader 7.0.1
+ prettier 2.7.1
+ style-loader 3.3.1
+ webpack-dev-server 4.11.1
[webpack-cli] Project has been initialised with webpack!
```