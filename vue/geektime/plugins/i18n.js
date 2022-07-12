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
       */
      ObjectExpression(path) {
        const index = path.node.properties.findIndex((property) => {
          return property?.value?.callee?.property?.name === '$t'
        })
        if (index > -1) {
          const value = path.node.properties[index].value
          const id = value.arguments[0].value
          console.log(value, id, '============')
          const newNode = t.objectProperty(
            t.StringLiteral('data-i18n'),
            t.StringLiteral(id)
          )
          path.node.properties.push(newNode)
        }
      },
    },
  }
}

module.exports = i18nPlugin
