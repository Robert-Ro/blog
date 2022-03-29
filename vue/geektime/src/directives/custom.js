
/**
 *@type {import('vue').PluginObject}
 */
const customPlugin = {};

customPlugin.install = function (Vue) {
  /**
   * @type {import('vue').DirectiveOptions}
   */
  const directive = {
    bind(el, binding, vnode, oldVnode) {
      console.log("bind", el, binding, vnode, oldVnode);
    },
    inserted(el, binding, vnode, oldVnode) {
      console.log("inserted", el, binding, vnode, oldVnode);
    },
    update(el, binding, vnode, oldVnode) {
      console.log("update", el, binding, vnode, oldVnode);
    },
    componentUpdated(el, binding, vnode, oldVnode) {
      console.log("componentUpdated", el, binding, vnode, oldVnode);
    },
    unbind(el, binding, vnode, oldVnode) {
      console.log('unbind',el, binding, vnode, oldVnode);
    },
  };
  Vue.directive("custom-directive", directive);
};

export default customPlugin;