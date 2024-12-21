import type { RouteRecordRaw } from 'vue-router'


const routes : Array<RouteRecordRaw> = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/layout/admin/index.vue'),
    redirect: '/admin/list',
    children:[
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/admin/article/list.vue'),
      },
      {
        path: 'add',
        name: 'add',
        component: () => import('@/views/admin/article/add/index.vue'),
      },
      {
        path: 'link',
        name: 'linkA',
        component: () => import('@/views/admin/link/index.vue'),
      },
    ]
  }
]

 export default routes
