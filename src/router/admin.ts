import type { RouteRecordRaw } from 'vue-router'


const routes : Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layout/admin/index.vue'),
    children:[
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/admin/article/list.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/admin/article/add.vue'),
      },
    ]
  }
]

 export default routes
