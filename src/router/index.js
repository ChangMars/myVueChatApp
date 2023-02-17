import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/login',
    component: () => import('../views/ChatLogin.vue'),
  },
  {
    path: '/chat',
    component: () => import('../views/ChatIndex.vue'),
  },
  {
    path: '/about',
    component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
