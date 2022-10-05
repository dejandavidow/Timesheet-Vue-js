import { createRouter, createWebHistory } from "vue-router";
import Categories from '../views/Categories.vue';
import Clients from '../views/Clients.vue';
import Timesheets from '../views/Timesheets.vue'
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
    {
      path: "/",
      name: "Timesheets",
      component: Timesheets,
    },
  ],
});

export default router;
