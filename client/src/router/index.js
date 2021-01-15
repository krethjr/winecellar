import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MyWines from "../views/MyWines.vue";
import Dashboard from "../views/Dashboard.vue";
import Admin from "../views/Admin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/mywines",
    name: "MyWines",
    component: MyWines
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  }
];

const router = new VueRouter({
  routes
});

export default router;
