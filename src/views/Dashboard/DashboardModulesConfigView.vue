<template>
  <div class="text-white flex flex-col gap-6">
    <div class="w-full font-black text-3xl text-center">
      <span>{{ module?.name }}</span>
    </div>
    <div class="flex scroll-bar grow flex-col gap-6 overflow-y-auto">
      <RouterView :bot="bot" :module="module" />
    </div>
  </div>
</template>

<style>
.fading-enter-active {
  transition: opacity 0.5s ease;
}

.fading-leave-active {
  transition: opacity ease;
}

.fading-enter-from,
.fading-leave-to {
  opacity: 0;
}

.scroll-bar {
  padding-right: 10px;
  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10rem;
    background-color: var(--dark);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 10rem;
  }
}
</style>

<script lang="ts">
import { API } from '@/script/api'

export default {
  async created() {
    this.module =
      (await API.modules.get(this.$route.meta.module_id, this.$route.params.id))?.data || []
    this.commandsData =
      (await API.modules.slash_commands.get(this.$route.params.id, this.$route.meta.module_id))
        ?.data || []
    this.commandsName = [...new Set(this.commandsData.map((x) => x.command_name))]
    this.bot = await this.getBot()
  },
  data() {
    return {
      module: null,
      bot: null,
      ready: false
    }
  },
  methods: {
    async getBot() {
      return (await API.bot.get(this.$route.params.id))?.data ?? null
    }
  }
}
</script>
