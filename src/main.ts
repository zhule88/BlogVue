
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import "@/styles/reset.scss";
import "@/styles/theme.scss";
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'virtual:svg-icons-register'

import lazyPlugin from 'vue3-lazy'
import animate from "./directive/animate";


createApp(App).use(router).use(pinia)
.use(lazyPlugin, {
  loading: './assets/image/小埋.gif',
  error:'./assets/xiubi.jpg'
})
.directive('animate', animate)
.mount("#app");
