<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="max-h-screen h-screen dashboard flex flex-col bg-grey">
    <navbar :user="user" />
    <RouterView v-slot="{ Component }">
      <transition>
        <div class="flex flex-col flex-grow component-wrapper">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'
import { watch } from 'vue'

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
      console.log(a.path, b.path)
      if (b.path === '/login/callback') {
        const res = await API.check()
        if (res.status === 200) this.user = res.data
      }
      if (b.path === '/settings') {
        this.user = null
      }
    }
  }
}
</script>
