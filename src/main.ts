import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "@/styles/reset.scss";
import "@/styles/theme.scss";
import 'element-plus/theme-chalk/dark/css-vars.css'



import "animate.css";
createApp(App).use(router).use(pinia).

mount("#app");
