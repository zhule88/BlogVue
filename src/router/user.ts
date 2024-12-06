
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
      }
    ]
  }
]

 export default routes
