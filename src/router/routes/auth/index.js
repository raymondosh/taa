import * as guards from "../../guards";

const AuthLayout = () =>
  import(/* webpackChunkName: "auth" */ "../../../views/auth/Layout.vue");

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    beforeEnter: guards.isNotAuthenticated,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "../../../views/auth/Login.vue"
          ),
      },
      {
        path: "register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "auth" */ "../../../views/auth/Register.vue"
          ),
      },
    ],
  },
];

export default routes;
