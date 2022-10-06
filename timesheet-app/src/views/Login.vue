<template>
  <div class="d-flex justify-content-center">
    <div class="inputs">
      <div>
        <n-input v-model:value="username" type="email" placeholder="Email" />
      </div>
      <div class="mt-3">
        <n-input
          type="password"
          show-password-on="mousedown"
          placeholder="Password"
          v-model:value="password"
          :autocomplete="true"
        />
      </div>
      <n-button type="primary" class="mt-2" @click="loginHandler">
        Login
      </n-button>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginHandler() {
      const authStore = useAuthStore();
      authStore.login(this.username, this.password);
    },
  },
};
</script>

<style scoped>
.inputs {
  width: 30%;
  margin-top: 350px;
}
template {
  background-color: silver;
}
</style>
