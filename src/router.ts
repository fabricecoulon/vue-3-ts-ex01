import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/beers",
    name: "beers",
    component: () => import("./components/BeersList.vue"),
  },
  {
    path: "/beers/:id",
    name: "beer-details",
    component: () => import("./components/BeerDetails.vue"),
  },
  {
    path: "/add",
    name: "add",
    component: () => import("./components/AddBeer.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
