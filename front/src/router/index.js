import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { requiresAuth: true },
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import("../views/Authentication.vue"),
  },
  {
    path: "/chat",
    name: "Chat",
    meta: { requiresAuth: true },
    component: () => import("../views/Chat.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta?.requiresAuth)) {
    if (store.getters["user"].id) {
      next();
    } else {
      next({ name: "Auth" });
    }
  } else {
    next();
  }
});

export default router;
