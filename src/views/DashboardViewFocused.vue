<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Sidbar from '@/components/Sidbar/Sidbar.vue'
import SecondarySidebar from '@/components/SecondarySidebar/SecondarySidebar.vue'
</script>

<template>
  <div class="flex center flex-grow">
    <Sidbar :bots="bots" class="flex-2" />
    <div class="mx-8 my-6 flex gap-6 flex-1">
      <SecondarySidebar v-show="$route.params.id" />
      <router-view class="rounded-xl p-5 bg-dark-grey w-full" />
    </div>
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  async beforeCreate() {
    this.bots = (await API.bot.get()).data ?? []
  },
  data() {
    return {
      bots: []
    }
  }
}
</script>
