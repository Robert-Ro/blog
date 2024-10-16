const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/**
 * @type {import('webpack').Configuration}
 */
const config = {
  // mode: "development",
  mode: 'production',
  entry: {
    pageA: './pageA',
    pageB: './pageB',
    pageC: './pageC',
  },
  optimization: {
    chunkIds: 'named', // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
    splitChunks: {
      // name: false,
      automaticNameDelimiter: '-',
      minSize: 0, // 默认30000（30kb），但是demo中的文件都很小，minSize设为0，让每个文件都满足大小条件
      cacheGroups: {
        commons: {
          chunks: 'all', //加入按需加载后，设为all将所有模块包括在拆包优化范围内
          minChunks: 2, // 最小被多少个chunk引用后才可被分包
          maxInitialRequests: 5, // 默认为3
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [new BundleAnalyzerPlugin()],
}

module.exports = config
