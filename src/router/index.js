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
      allowAccess: false,
    },
  },
  {
    path: "/formatpwd",
    name: "formatpwdPage",
    component: () => import("../pages/formatpwdPage.vue"),
    meta: {
      allowAccess: false,
    },
  },
  {
    path: "/",
    name: "HomeView",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/account",
    name: "Account",
    component: () => import("../pages/Acoount/index.vue"),
  },
  {
    path: "/province",
    name: "Province",
    component: () => import("../pages/Province/index.vue"),
  },
  {
    path: "/district",
    name: "District",
    component: () => import("../pages/District/index.vue"),
  },
  {
    path: "/gender",
    name: "Gender",
    component: () => import("../pages/Gender/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
