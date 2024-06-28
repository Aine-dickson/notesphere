import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: () => import("@/views/app/general_body.vue"),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/app/home.vue')
        },
        {
          path: 'search/',
          name: 'search', 
          component: () => import('@/views/app/search.vue')
        },
        {
          path: 'editor/',
          name: 'editor',
          component: () => import('@/views/app/editor.vue')
        },
        {
          path: 'inbox/',
          name: 'inbox',
          component: () => import('@/views/app/inbox.vue')
        },
        {
          path: 'library/',
          name: 'library',
          component: () => import('@/views/app/library.vue')
        },
        {
          path: 'channels/',
          name: 'channels',
          component: () => import('@/views/app/channels.vue')
        },
        {
          path:'settings/',
          name: 'settings',
          component: () => import('@/views/app/settings.vue')
        },
        {
          path: 'profile/',
          name: 'profile',
          component: () => import('@/views/app/profile.vue')
        },
        {
          path: 'create-media/',
          name:'create-media',
          component: () => import('@/views/app/camera.vue')
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      children: [
        {
          path: 'index/',
          name: 'index',
          component: () => import('@/views/auth/index.vue')
        },
        {
          path: 'register/',
          name: 'register',
          component: () => import('@/views/auth/register.vue')
        }
      ]
    }
  ]
})

export default router
