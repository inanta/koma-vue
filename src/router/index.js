import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    // name: "Home",
    // path: "",
    component: Home,
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
        alias: "/dashboard"
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue")
      },
      {
        path: "app/view/:name",
        name: "AppView",
        component: () => import("../views/AppView")
      },
      {
        path: "app/insert/:name",
        name: "AppInsert",
        component: () => import("../views/AppInsert.vue")
      },
      {
        path: "app/edit/:name/:id",
        name: "AppEdit",
        component: () => import("../views/AppEdit.vue")
      },
      {
        path: "appbuilder/view",
        name: "App Builder View",
        component: () => import("../views/AppBuilderView")
      },
      {
        path: "appbuilder/build/:name?",
        name: "App Builder",
        component: () => import("../views/AppBuilder")
      }
    ],
    redirect: "/dashboard"
  },
  {
    path: "/signout",
    name: "Sign Out",
    component: () => import("../views/SignOut.vue")
  },
  {
    path: "/signin",
    name: "Sign In",
    component: () => import("../views/SignIn.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
