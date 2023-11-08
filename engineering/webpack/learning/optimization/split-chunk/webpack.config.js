const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  // mode: "development",
  mode: 'production',
  devtool: false,
  //   devtool: 'hidden-source-map', // with source content not link
  //   devtool: 'source-map', // 完整的sourcemap
  //   entry: './pageB.js',
  entry: './pageA.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/env',
                {
                  targets: 'defaults',
                  corejs: 3,
                  useBuiltIns: 'usage',
                },
              ],
              '@babel/react',
            ],
          },
        },
      },
    ],
  },
  //   entry: {
  //     pageA: './pageA',
  //     pageB: './pageB',
  //     pageC: './pageC',
  //   },
  optimization: {
    chunkIds: 'named', // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
    splitChunks: {
      chunks: 'initial',
      //   minSize: 30000, //构建出来的chunk大于30000才会被分割
      //   minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
      //   maxSize: 0, //会尝试根据这个大小进行代码分割
      minChunks: 1, //制定用了几次才进行代码分割
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      //   // name: false,
      //   automaticNameDelimiter: '-',
      //   cacheGroups: {
      //     commons: {
      //       chunks: 'all', //加入按需加载后，设为all将所有模块包括在拆包优化范围内
      //       minChunks: 2, // 最小被多少个chunk引用后才可被分包
      //       maxInitialRequests: 5, // 默认为3
      //     },
      //     vendor: {
      //       test: /node_modules/,
      //       chunks: 'initial',
      //       name: 'vendor',
      //     },
      //   },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  plugins: [new BundleAnalyzerPlugin({ analyzerPort: 8889 }), new HtmlWebpackPlugin({ inject: true })],
}

module.exports = config
