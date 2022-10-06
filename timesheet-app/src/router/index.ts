import { createRouter, createWebHistory } from "vue-router";
import Categories from "../views/Categories.vue";
import Clients from "../views/Clients.vue";
import Timesheets from "../views/Timesheets.vue";
import Reports from "../views/Reports.vue";
import Login from "../views/Login.vue";
import { useAuthStore } from "@/stores/auth.store";
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
    {
      path: "/reports",
      name: "Reports",
      component: Reports,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router;
