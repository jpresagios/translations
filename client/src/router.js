import Vue from "vue";
import Router from "vue-router";

import Search from "./views/Search";
import History from "./views/History";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home.vue"),
      children: [
        { path: "/", component: Search },
        { path: "history", component: History }
      ]
    },
    {
      path: "/import",
      name: "import",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Import.vue")
    }
  ]
});
