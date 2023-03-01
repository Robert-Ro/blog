const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-i18n': 'VueI18n',
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
                if (/div/.test(el.tag) && el.tag !== 'a-table') {
                  // console.log(el)
                  // console.log('=====================')
                }
                if (el.tag === 'a-button') {
                  console.log(el)
                  // console.log('=====================')
                }
                try {
                  // 静态渲染
                  if (el.tag === 'input' || el.tag === 'textarea') {
                    const key = el.rawAttrsMap[':placeholder'].value
                    const reg = new RegExp(`\\s?\\$t\\('([a-zA-Z0-9\\-\\.]+)'\\)\\s?`)
                    const matches = key.match(reg)
                    if (matches) {
                      el.attrsList.push({
                        name: `data-i18n`,
                        value: matches[1],
                      })
                    }
                  }
                  if (el.tag === 'a-tab-pane') {
                    const key = el.rawAttrsMap[':tab'].value // $t('<key>')
                    const reg = new RegExp(`\\s?\\$t\\('([a-zA-Z0-9\\-\\.]+)'\\)\\s?`)
                    const matches = key.match(reg)
                    if (matches) {
                      el.attrsList.push({
                        name: `data-i18n`,
                        value: matches[1],
                      })
                    }
                  }
                  /**
                   * 判断是否是带有icon的<a-button />组件
                   * @param {*} _el
                   * @returns
                   */
                  const isIconButton = (_el) => {
                    return _el.tag === 'a-button' && _el.children.some((child) => child.tag === 'a-icon')
                  }
                  if (el.children.length === 1 || isIconButton(el)) {
                    const child = el.children.find((child) => child.type === 2)
                    if (child) {
                      // NOTE 父节点上有国际化，子节点上也有国际化->子节点覆盖父节点
                      const text = child.text
                      // FIXME 提取出 {{$t(<key>)}} 正则
                      const reg = new RegExp(`\{\{\\s?\\$t\\('([a-zA-Z0-9\\-\\.]+)'\\)\\s?\}\}`, 'gm')
                      const matches = text.match(reg)
                      if (matches) {
                        const values = []
                        for (let i = 0; i < matches.length; i++) {
                          const _match = matches[i]
                          const reg1 = new RegExp(`\\$t\\(['"](.+)['"]\\)`)
                          const matches1 = _match.match(reg1)
                          if (matches1) {
                            const key = matches1[1]
                            values.push(key)
                            // 组件, 占位符, 枚举类 -> ant-design-vue组件内列名
                          }
                        }
                        const getExistedI18nAttrs = (attrs) => {
                          return attrs.find((attr) => attr.name === 'data-i18n')?.value
                        }
                        if (values.length > 1) {
                          const i18nAttr = getExistedI18nAttrs(el.attrsList)
                          el.attrsList.push({
                            name: `data-i18n`,
                            value: i18nAttr ? [i18nAttr, ...values] : values,
                          })
                        } else {
                          const i18nAttr = getExistedI18nAttrs(el.attrsList)
                          el.attrsList.push({
                            name: `data-i18n`,
                            value: i18nAttr ? [i18nAttr, values[0]] : values[0],
                          })
                        }
                      }
                    }
                  }
                  // a-table列名, a-description.item
                } catch (error) {
                  console.log(error.message)
                }
              },
            },
          ]
        }
        return options
      })
  },

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
})
