import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import DashboardPage from '../components/DashboardPage.vue'
import UserFormPage from '../components/UserFormPage.vue'
import { store } from '../store'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: (to: any, from: any, next: any) => {
      // If user is already logged in, redirect to appropriate page
      if (store.isLoggedIn) {
        if (store.userRole === 'user') {
          next('/forms')
        } else {
          next('/dashboard')
        }
      } else {
        next()
      }
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    beforeEnter: (to: any, from: any, next: any) => {
      // If user is not logged in, redirect to login
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/forms',
    name: 'UserForms',
    component: UserFormPage,
    beforeEnter: (to: any, from: any, next: any) => {
      // Only allow logged in users
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
