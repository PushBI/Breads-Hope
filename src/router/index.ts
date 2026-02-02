import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import DashboardPage from '../components/DashboardPage.vue'
import FormButtonPage from '../components/FormButtonPage.vue'
import AddSchoolDetailsPage from '../components/AddSchoolDetailsPage.vue'
import MonthlyReportPage from '../components/MonthlyReportPage.vue'
import MonthlyPlanPage from '../components/MonthlyPlanPage.vue'
import ConsolidatedNarrativePage from '../components/ConsolidatedNarrativePage.vue'
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
    beforeEnter: (_to: any, _from: any, next: any) => {
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
    beforeEnter: (_to: any, _from: any, next: any) => {
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
    component: FormButtonPage,
    beforeEnter: (_to: any, _from: any, next: any) => {
      // Only allow logged in users
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/school-forms',
    name: 'SchoolFormsCreate',
    component: AddSchoolDetailsPage,
    beforeEnter: (_to: any, _from: any, next: any) => {
      // Only allow logged in users
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/monthly-report',
    name: 'MonthlyReport',
    component: MonthlyReportPage,
    beforeEnter: (_to: any, _from: any, next: any) => {
      // Only allow logged in users
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/monthly-plan',
    name: 'MonthlyPlan',
    component: MonthlyPlanPage,
    beforeEnter: (_to: any, _from: any, next: any) => {
      // Only allow logged in users
      if (!store.isLoggedIn) {
        next('/login')
      } else {
        next()
      }
    }
  },
  {
    path: '/consolidated-narrative',
    name: 'AwarenessProgramme',
    component: ConsolidatedNarrativePage,
    beforeEnter: (_to: any, _from: any, next: any) => {
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
  history: createWebHistory('/Breads-Hope/'),
  routes
})

export default router
