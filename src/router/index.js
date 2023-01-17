import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{
  path: "/",
  redirect: "/home"
},
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home/Home.vue"),
    meta: {
      title: "home"
    }
  }]
const router = createRouter ({
  routes,
  mode: createWebHashHistory ()
})
//全局前置守卫
router.beforeEach ((to, from, next) => {
})
//全局解析守卫
router.beforeResolve (async to => {
})
//全局后置守卫
router.afterEach ((to, from, failure) => {
})
export default router