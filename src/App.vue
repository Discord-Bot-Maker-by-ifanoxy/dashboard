<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="max-h-screen h-screen dashboard flex flex-col bg-grey">
    <navbar :login="isLoggin" />
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
export default {
  methods: {
    isLoggin() {
      const access_token = localStorage.getItem('access_token')
      if (access_token) return true
      return false
    }
  }
}
</script>
