<script lang="ts">
import { API } from '@/script/api'

export default {
  props: ['modules'],
  async beforeMount() {
    const bot = (await API.bot.get(this.$route.params.id).catch(() => {}))?.data ?? null
    if (!bot) return this.$router.push('/dashboard')
    this.bot = bot
  },
  data() {
    return {
      bot: {
        name: this.$route.params.id,
        image: ''
      }
    }
  }
}
</script>
<template>
  <div class="secondary-sidebar flex-col gap-2 items-center p-4 flex w-80 bg-primary rounded-xl">
    <div class="avatar">
      <img class="rounded-full w-28 h-28 border-dark border-[4px]" :src="bot.image" />
    </div>
    <p
      class="w-full text-center font-black h-max"
      :style="`font-size: ${Math.max(10, 30 - bot.name.length / 2)}px`"
    >
      {{ bot.name }}
    </p>
    <hr class="w-full size-1.5 bg-dark rounded-full border-0" />
    <div class="parameters w-full">
      <ul class="w-full text-white font-extrabold">
        <li
          class="w-full cursor-pointer hover:opacity-100 hover:translate-x-1 duration-300 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'informations' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot.name}`)"
        >
          INFORMATIONS
        </li>
        <li
          class="w-full cursor-pointer hover:opacity-100 hover:translate-x-1 duration-300 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'modules' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot.name}/modules`)"
        >
          MODULES
        </li>
        <li
          class="w-full cursor-pointer hover:opacity-100 duration-300 hover:translate-x-1 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'export' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot.name}/export`)"
        >
          EXPORT
        </li>
      </ul>
    </div>
    <p class="flex l-0 w-full font-extrabold" style="margin-bottom: -10px">
      MODULES CONFIGURATIONS
    </p>
    <hr class="w-full size-1.5 bg-dark rounded-full border-0" />
    <div class="modules-config w-full">
      <ul v-for="module of modules" class="w-full text-white font-extrabold">
        <transition name="slide-fade" appear>
          <li
            class="w-full cursor-pointer hover:opacity-100 duration-300 hover:translate-x-1 flex justify-center my-4 py-2 bg-dark rounded-lg"
            @click="$router.push(`/dashboard/${bot.name}/modules-config/${module.module_id}`)"
            :class="$route.meta?.module_id == module.module_id ? 'opacity-100' : 'opacity-80'"
          >
            {{ module.name }}
          </li>
        </transition>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translatey(20px);
  opacity: 0;
}
</style>
