<script setup lang="ts">
import Sidbar from '@/components/Sidbar/Sidbar.vue'
import SecondarySidebar from '@/components/SecondarySidebar/SecondarySidebar.vue'
</script>

<template>
  <div class="flex center flex-grow">
    <keep-alive>
      <component :is="Sidbar" class="flex-2"></component>
    </keep-alive>
    <div
      :key="$route.params.id"
      class="px-8 py-6 max-h-[calc(100vh-100px)] flex-col sm:flex-row overflow-y-scroll flex gap-6 flex-1"
    >
      <SecondarySidebar :modules="actives_module" v-show="$route.params.id" />
      <router-view
        @moduleUpdate="updateModules"
        :key="$route.params.module_id"
        class="rounded-xl p-5 bg-dark-grey w-full"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { API } from '@/script/api'

export default {
  async beforeCreate() {
    this.actives_module = (await API.modules.getAllOfBot(this.$route.params.id)).data ?? []
  },
  data() {
    return {
      actives_module: [],
      fetch: false
    }
  },
  methods: {
    async updateModules() {
      this.actives_module = (await API.modules.getAllOfBot(this.$route.params.id)).data ?? []
    }
  },
  watch: {
    async $route() {
      this.actives_module = (await API.modules.getAllOfBot(this.$route.params.id)).data ?? []
    }
  }
}
</script>
