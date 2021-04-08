import * as guards from "../../guards";

const routes = [
  {
    path: "/gallery-page",
    name: "gallery",
    beforeEnter: guards.isAuthenticated,
    component: () =>
      import(
        /* webpackChunkName: "gallery" */ "../../../views/gallery/Gallery.vue"
      ),
  },
  {
    path: "/create-gallery",
    name: "create-gallery",
    beforeEnter: guards.isAuthenticated,
    component: () =>
      import(
        /* webpackChunkName: "gallery" */ "../../../views/gallery/CreateGallery.vue"
      ),
  },
];

export default routes;
