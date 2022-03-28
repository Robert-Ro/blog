import Vue from 'vue'

const customPlugin = {}
customPlugin.install = function(Vue, option){
  Vue.directive('custom-directive', {
    bind(){},
    insert(){},
  })
}