import { defineStore } from "pinia";
import router from "../router/index";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem("user")),
    returnUrl: "",
  }),
  actions: {
    async login(email, password) {
      const user = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }).then((resp) => resp.json());
      console.log(user);
      if (user.token) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(user));
        router.push(this.returnUrl || "/");
      }

      // store user details and jwt in local storage to keep user logged in between page refreshes

      // redirect to previous url or default to home page
    },
    logout() {
      this.user = null;
      localStorage.removeItem("user");
      router.push("/login");
    },
  },
});
