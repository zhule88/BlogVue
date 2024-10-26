import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
/* import '@/styles/mixin.scss' */
import '@/styles/reset.scss'
import '@/styles/theme.scss'

import 'animate.css';
createApp(App)
.use(router)
.mount('#app')
