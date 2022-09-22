const path = require('path')

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: process.env.NODE_ENV === 'development' ? [require('./plugins/i18n')] : [],
  exclude: process.env.NODE_ENV === 'development' ? [path.resolve('node_modules')] : [],
}
