import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DashboardHomeView from '@/views/Dashboard/DashboardHomeView.vue'
import DashboardViewFocused from '@/views/DashboardViewFocused.vue'
import DashboardModulesView from '@/views/Dashboard/DashboardModulesView.vue'
import DashboardSettingsView from '@/views/Dashboard/DashboardSettingsView.vue'
import LoginView from '@/views/LoginView.vue'
import LoginCallBack from '@/callback/LoginCallBack.vue'
import { API } from '@/script/api'
import DashboardCreateBotView from '@/views/Dashboard/DashboardCreateBotView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/login/callback',
      name: 'loginCallBack',
      component: LoginCallBack
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        login: true
      }
    },

    {
      path: '/dashboard/create-bot',
      name: 'create-bot',
      component: DashboardCreateBotView
    },
    {
      path: '/dashboard/:id',
      name: 'dashboard-focused',
      component: DashboardViewFocused,
      meta: {
        login: true
      },
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
          component: DashboardSettingsView
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

router.beforeEach(async (to, from, next) => {
  try {
    if (to?.meta?.login) {
      const access_token = localStorage.getItem('access_token')

      if (!access_token) next({ name: 'login' })

      const res = await API.check(access_token)

      if (res.status !== 200) next({ name: 'login' })
    }
    next()
  } catch {
    next(from)
  }
})

export default router
