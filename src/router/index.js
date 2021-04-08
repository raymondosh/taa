import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import authRoutes from "./routes/auth";
import galleryRoutes from "./routes/gallery";

import * as guards from "./guards";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: guards.isAuthenticated,

    component: Home,
  },
  ...authRoutes,
  ...galleryRoutes,
  {
    path: "*",
    name: "error",
    component: () =>
      import(/* webpackChunkName: "error" */ "../views/Error.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
