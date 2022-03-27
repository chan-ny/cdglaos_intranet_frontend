import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "LoginPage",
    component: () => import("../pages/loginPage.vue"),
    meta: {
      allowAccess: false
    }
  },
  {
    path: "/formatpwd",
    name: "formatpwdPage",
    component: () => import("../pages/formatpwdPage.vue"),
    meta: {
      allowAccess: false
    }
  },
  {
    path: "/",
    name: "HomeView",
    component: () => import('../views/HomeView.vue')
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
