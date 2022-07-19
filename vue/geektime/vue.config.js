const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      vue: "Vue",
      'vue-i18n': "VueI18n"
    },
    cache: true,
    // pluginOptions: {
    // svg: {
    //   sprite: {}, // Pass options to svg-sprite-loader
    // }
    // }

  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        if (process.env.NODE_ENV === 'development') {
          options.compilerOptions.modules = [
            {
              transformNode: (el) => {
                // console.log(el)
                try {
                  // 静态渲染
                  if (el.tag === 'input' || el.tag === 'textarea') {
                    const key = el.rawAttrsMap[':placeholder'].value
                    el.attrsList.push({
                      name: `data-i18n`, value: key
                    })
                  }
                  if (el.tag === 'a-tab-pane') {
                    console.log(el, '====')
                    const key = el.rawAttrsMap[':tab'].value // $t('<key>')
                    el.attrsList.push({
                      name: `data-i18n`, value: key
                    })
                  }
                  if (el.children.length === 1) {
                    const child = el.children[0]
                    if (child.type === 2) {
                      const text = child.text
                      // FIXME 提取出 {{$t(<key>)}} 正则
                      const reg = new RegExp(`\{\{\\s?\\$t\\('([a-zA-Z0-9\\-\\.]+)'\\)\\s?\}\}`, 'gm')
                      const matches = text.match(reg)
                      if (matches) {
                        const values = []
                        for (let i = 0; i < matches.length; i++) {
                          const _match = matches[i];
                          const reg1 = new RegExp(`\\$t\\(['"](.+)['"]\\)`)
                          const matches1 = _match.match(reg1)
                          if (matches1) {
                            const key = matches1[1]
                            values.push(key)
                            // 处理input, 组件, 占位符, 枚举类 -> ant-design-vue组件内列名
                          }
                        }
                        if (values.length > 1) {
                          el.attrsList.push({
                            name: `data-i18n`, value: values
                          })
                        } else {
                          el.attrsList.push({
                            name: `data-i18n`, value: values[0]
                          })
                        }
                      }
                    }
                  }
                  // a-table列名, a-description.item
                } catch (error) {
                  console.log(error.message)
                }
              }
            }
          ]
        }
        return options
      })
  }

  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       postcssOptions: {
  //         plugins: {
  //           tailwindcss: {
  //           },
  //           autoprefixer: {},
  //         },
  //       },
  //     },
  //   },
  // },
});
