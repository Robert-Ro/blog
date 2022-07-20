/**
 * @type {import('@babel/core').PluginObj}
 */
const i18nPlugin = (babel) => {
  const { types: t } = babel

  return {
    name: 'babel-plugin-i18n',
    visitor: {
      // Identifier(path) {
      //   path.node.name = path.node.name.split('').reverse().join('');
      // },
      /**
       *
       * @param {import('@babel/core').NodePath} path
       * @param {*} state
       * FIXME: form-item字段错误提示
       * NOTE: column列名
       */
      ObjectExpression(path) {
        if (path.node.isNew) return
        const index = path.node.properties.findIndex((property) => {
          return property?.value?.callee?.property?.name === '$t'
        })
        if (index > -1) {
          const value = path.node.properties[index].value
          if (t.isMemberExpression(value.callee)) {
            const argus = value.arguments[0]
            let newNode
            if (t.isStringLiteral(argus)) {
              const id = argus.value
              newNode = t.objectProperty(
                t.StringLiteral('data-i18n'),
                t.StringLiteral(id)
              )
            }
            if (t.isTemplateLiteral(argus)) {
              newNode = t.objectProperty(
                t.StringLiteral('data-i18n'), // 动态拼接字段
                argus
              )
            }
            if (newNode) {
              newNode.isNew = true
              path.node.properties.unshift(newNode)
            }
          }
        }
      },
      // NOTE v-decorator -> compiled -> 指令解析 -> ast分析
    },
  }
}

module.exports = i18nPlugin
