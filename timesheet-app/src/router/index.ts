import { createRouter, createWebHistory } from "vue-router";
import Categories from '../views/Categories.vue';
import Clients from '../views/Clients.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/categories",
      name: "Categories",
      component: Categories,
    },
    {
      path: "/clients",
      name: "Clients",
      component: Clients,
    },
  ],
});

export default router;
