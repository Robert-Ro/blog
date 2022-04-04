const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    externals:{
      vue: 'Vue'
    },
    // pluginOptions: {
    // svg: {
    //   sprite: {}, // Pass options to svg-sprite-loader
    // }
  // }
  }
});
