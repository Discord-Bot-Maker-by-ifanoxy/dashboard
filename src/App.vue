<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="max-h-screen h-screen dashboard flex flex-col bg-grey">
    <navbar :user="user" />
    <RouterView v-slot="{ Component, route }">
      <transition>
        <div class="flex flex-col flex-grow component-wrapper" :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  name: 'app',
  provide() {
    return {
      getUser: () => {
        return this.user
      }
    }
  },
  async mounted() {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      const res = await API.check()
      if (res.status === 200) this.user = res.data
    }
  },
  data() {
    return {
      user: null
    }
  },
  watch: {
    async $route(a, b) {
      if (b.path === '/login/callback') {
        const res = await API.check()
        if (res.status === 200) this.user = res.data
      }
    }
  }
}
</script>
