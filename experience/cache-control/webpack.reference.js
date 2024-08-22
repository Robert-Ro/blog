const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  output: {
    filename: '[name].[contenthash].js', // 让hash值只在内容变动时更新
    chunkFilename: '[name].[contenthash].js', // 动态引入的模块命名，同上
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'loader: MiniCssExtractPlugin.loader', // 提取出来css "css-loader"
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed', // 混淆文件路径名
    runtimeChunk: { name: 'manifest' }, // 提取runtime代码命名为manifest
    namedModules: true, // 让模块id根据路径设置，避免每增加新模块，所有id都改变，造成缓存失效的情况
    namedChunks: true, // 避免增加entrypoint，其他文件都缓存失效
    cacheGroups: {
      vendor: {
        // 提取第三方库文件
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
      },
    },
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(), // 与namedModules: true作用一样
    new MiniCssExtractPlugin({
      filename: '[contenthash].css', // css文件也是按contenthash命名
      chunkFilename: '[contenthash].css', // 动态引入的css命名，同上
    }),
  ],
}
// optimization.namedChunks: true → optimization.chunkIds: 'named'
// optimization.namedModules: true → optimization.moduleIds: 'named'
// https://webpack.js.org/migrate/5/#update-outdated-options
