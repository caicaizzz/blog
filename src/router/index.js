import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
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
  }
]

const router = createRouter ({
  routes,
  history: createWebHashHistory ()
})

export default router