import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import customPlugin from "./directives/custom";

Vue.config.productionTip = false;
Vue.use(Router);
Vue.use(customPlugin)

new Vue({
  router: Router,
  render: (h) => h(App),
}).$mount("#app");
