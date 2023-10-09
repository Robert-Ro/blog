const path = require('path')

/**
 * @type {import('webpack').Configuration}
 */
const config = {
  entry: path.resolve(__dirname, './src/index.js'),
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].chunk.js',
    clean: true,
  },
  devtool: 'cheap-module-source-map',
}

module.exports = config
