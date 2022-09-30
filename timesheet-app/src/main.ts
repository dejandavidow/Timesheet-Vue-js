import { createPinia } from "pinia";
import router from "./router";
import { createApp } from 'vue'
import App from './App.vue'
import naive from 'naive-ui'
//import "./assets/main.css";

const app = createApp(App);
app.use(naive)
app.use(createPinia());
app.use(router);
app.mount("#app");

