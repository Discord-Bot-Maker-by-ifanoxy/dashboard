import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardHomeView from '@/views/Dashboard/DashboardHomeView.vue'
import DashboardViewFocused from '@/views/DashboardViewFocused.vue'
import DashboardModulesView from '@/views/Dashboard/DashboardModulesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard-focused',
      component: DashboardViewFocused,
      children: [
        {
          path: '',
          name: 'informations',
          component: DashboardHomeView
        },
        {
          path: 'modules',
          name: 'modules',
          component: DashboardModulesView
        },
        {
          path: 'settings',
          name: 'settings',
          component: DashboardHomeView
        },
        {
          path: 'modules-config/:module_id',
          name: 'modules-config',
          component: DashboardHomeView
        }
      ]
    }
  ]
})

export default router
