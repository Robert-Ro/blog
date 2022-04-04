import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: "/chart", component: () => import("@/views/charts") },
  { path: "/slot", component: () => import("@/views/slot") },
  { path: "/babel", component: () => import("@/views/babel") },
  { path: "/directive", component: () => import("@/views/directive") },
  { path: "/date-fns", component: () => import("@/views/date-fns") },
  { path: "/antdv", component: () => import("@/views/antdv") },
  { path: "/vue-router/:id", component: () => import("@/views/vue-router") },
  { path: "/scoped-style", component: () => import("@/views/scope-style") },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
});

const query = { referer: "hao123" };
/**
 * 1、全局路由守卫方案
 */
// router.beforeEach((to, from, next) => {
//   to.query.referer
//     ? next()
//     : next({
//         ...to,
//         query: { ...to.query, ...query },
//       });
// });
/**
 * 2、函数劫持的方案
 */
const transitionTo = router.history.transitionTo;
router.history.transitionTo = function (location, onComplete, onAbort) {
  location =
    typeof location === "object"
      ? {
          ...location,
          query: { ...location.query, ...query },
        }
      : { path: location, query };
  transitionTo.call(router.history, location, onComplete, onAbort);
};
export default router;
