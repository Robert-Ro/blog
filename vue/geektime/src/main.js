import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import customPlugin from "./directives/custom";
import antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
import './assets/tailwind.css'

// import { svgSpritePlugin } from "vue-svg-sprite";

Vue.use(antd)
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(customPlugin)

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
