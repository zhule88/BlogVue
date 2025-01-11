
import type { RouteRecordRaw } from 'vue-router'


const routes : Array<RouteRecordRaw> = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/layout/user/index.vue'),
    children:[
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/user/Home/index.vue')
      },

      {
        path: 'article/:id',
        name: 'article',
        component: () => import('@/views/user/article/index.vue')
      },
      {
        path: ':type/:id',
        name: 'categoryTag',
        component: () => import('@/views/user/categoryTag/index.vue')
      },
      {
        path: 'archive/article',
        name: 'ararticle',
        component: () => import('@/views/user/archive/article/index.vue')
      },
      {
        path: 'link',
        name: 'linkU',
        component: () => import('@/views/user/link/index.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import('@/views/user/message/index.vue')
      },
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/user/welcome/index.vue'),
    redirect: '/welcome/login',
    children:[
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/user/welcome/login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/user/welcome/register.vue')
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import('@/views/user/welcome/reset.vue')
      },
    ]
  }
]

 export default routes
