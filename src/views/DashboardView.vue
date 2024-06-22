<script setup lang="ts">
import Sidbar from '@/components/Sidbar/Sidbar.vue'
</script>

<template>
  <div class="flex center flex-grow">
    <Sidbar :bots="bots" />
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  async beforeMount() {
    this.bots = (await API.bot.get()).data ?? []
    console.log(this.bots)
  },
  data() {
    return {
      bots: null
    }
  }
}
</script>
