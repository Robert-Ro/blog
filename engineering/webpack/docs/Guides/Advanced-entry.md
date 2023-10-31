# Advanced entry entry 高级用法

## Multiple file types per entry 每个入口使用多种文件类型

It is possible to provide different types of files when using an array of values for `entry` to **achieve separate bundles for CSS and JavaScript** (and other) files in applications that are not using import for styles in JavaScript (pre Single Page Applications or different reasons).
在不使用 `import` 样式文件的应用程序中（预单页应用程序或其他原因），使用一个值数组结构的 entry，并且在其中传入不同类型的文件，可以实现将 CSS 和 JavaScript（和其他）文件分离在不同的 bundle。

Let's make an example. We have a PHP application with two page types: home and account. The home page has different layout and non-sharable JavaScript with the rest of the application (account page). We want to output `home.js` and `home.css` from our application files for the home page and `account.js` and `account.css` for account page.
举个例子。我们有一个具有两种页面类型的 PHP 应用程序：home(首页) 和 account(帐户)。home 与应用程序其余部分（account 页面）具有不同的布局和不可共享的 JavaScript。我们想要从应用程序文件中输出 home 页面的 home.js 和 home.css，为 account 页面输出 account.js 和 account.css。

```js
// home.js
console.log('home page type')
```

```scss
// home.scss
// home page individual styles
```

```js
// account.js
console.log('account page type')
```

```scss
// account.scss
// account page individual styles
```

We will use `MiniCssExtractPlugin` in `production` mode for css as a best practice.

```js
// webpack.config.js

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: ['./home.js', './home.scss'],
    account: ['./account.js', './account.scss'],
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
```

Running webpack with above configuration will output into `./dist` as we did not specify different output path. `./dist` directory will now contain four files:

- `home.js`
- `home.css`
- `account.js`
- `account.css`

生成的html文件
```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>Webpack App</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <script defer="defer" src="home.js"></script>
  <script defer="defer" src="account.js"></script>
  <link href="home.css" rel="stylesheet">
  <link href="account.css" rel="stylesheet">
</head>

<body></body>

</html>
```
