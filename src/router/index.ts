import {createRouter , createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import user from "@/router/user"
import admin from "@/router/admin"


const routes : Array<RouteRecordRaw> = [
  {path:'/',
    redirect: '/user/home',},
 ...user,
 ...admin
]

const router = createRouter({
  history:createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
