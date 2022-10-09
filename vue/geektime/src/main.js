import Vue from "vue";
// import App from "./App.vue";
import App from "./views/i18n/list.vue";
import Router from "./router";
import customPlugin from "./directives/custom";
import antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import "./assets/tailwind.css";
import { i18n } from './i18n'

// import { svgSpritePlugin } from "vue-svg-sprite";

Vue.use(antd);
Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(customPlugin);
Vue.config.performance = true;

new Vue({
  router: Router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
