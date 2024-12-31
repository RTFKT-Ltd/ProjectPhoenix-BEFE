import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import { auth } from '../utils/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        if (!auth.isAuthenticated()) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})

export default router 