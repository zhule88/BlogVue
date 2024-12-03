import {createRouter , createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import user from "@/router/user"
import admin from "@/router/admin"


const routes : Array<RouteRecordRaw> = [
  {path:'/:pathMatch(.*)*',
    redirect: '/user/home',},
 ...user,
 ...admin
]

const router = createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes
})

/* router.beforeEach((to, from, next) => {
  if (to.name == 'article' ) {
  router.afterEach(() => {
    window.scrollTo(0, 0)
})
  }
  next(); // 确保要调用 next()
}); */

export default router
