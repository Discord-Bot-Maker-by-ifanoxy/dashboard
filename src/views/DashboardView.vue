<script setup lang="ts">
import Sidbar from '@/components/Sidbar/Sidbar.vue'
</script>

<template>
  <div class="flex center flex-grow">
    <Sidbar :sidebar_opened="sidebar_opened" :bots="bots" />
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  props: ['sidebar_opened'],
  async beforeMount() {
    this.bots = (await API.bot.get()).data ?? []
    if (localStorage.getItem("sidebar-opened"))
      localStorage.setItem("sidebar-opened", true)
  },
  data() {
    return {
      bots: null
    }
  },
}
</script>
