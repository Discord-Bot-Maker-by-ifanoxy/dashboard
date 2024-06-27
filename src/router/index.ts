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
import DashboardModulesConfigView from '@/views/Dashboard/DashboardModulesConfigView.vue'
import Basic_Moderation from '@/views/Dashboard/Modules/Basic_Moderation.vue'
import NotFound from '@/views/NotFound.vue'
import Presence from '@/views/Dashboard/Modules/Presence.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/discord',
      name: 'discord',
      beforeEnter: (to, from, next) => {
        window.open('https://discord.gg/3dCzRuMPry', '_BLANK')
        next(from)
      }
    },
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
      path: '/dashboard/create-bot',
      name: 'create-bot',
      component: DashboardCreateBotView,
      meta: {
        login: true
      }
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
      path: '/dashboard/:id',
      name: 'dashboard-focused',
      component: DashboardViewFocused,
      meta: {
        login: true,
        title: `DBM - :id`
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
          path: 'export',
          name: 'export',
          component: DashboardSettingsView
        },
        {
          path: 'modules-config/:module_id',
          name: 'modules-config2',
          component: NotFound
        },
        {
          path: 'modules-config',
          name: 'modules-config',
          component: DashboardModulesConfigView,
          children: [
            {
              path: '1',
              name: 'moderation',
              component: Basic_Moderation,
              meta: { module_id: 1 }
            },
            {
              path: '2',
              name: 'presence',
              component: Presence,
              meta: { module_id: 2 }
            }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) document.title = to.meta.title.replace(':id', to.params.id)
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
