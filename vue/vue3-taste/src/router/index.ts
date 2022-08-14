import * as VueRouter from "vue-router";
import { h } from "vue";
import { dynamicRoutes } from "@/utils";

const routes = [
  {
    path: "/",
    component: {
      render: () => h("div", ["home"]),
    },
  },
  ...dynamicRoutes,
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

export default router;
