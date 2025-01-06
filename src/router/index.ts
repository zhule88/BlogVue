import {createRouter , createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import user from "@/router/user"
import admin from "@/router/admin"
import { ElMessage } from "element-plus";
import "element-plus/theme-chalk/index.css";


const routes : Array<RouteRecordRaw> = [
  {path:'/:pathMatch(.*)*',
    redirect: '/user/home'},
 ...user,
 ...admin
]

const router = createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.path.startsWith('/admin') ) {
    if(localStorage.getItem('admin')){
      next();
    }else{
      ElMessage.error("只有管理员才能进入")
      next('/');
    }
  }else{
    next();
  }
});

export default router
