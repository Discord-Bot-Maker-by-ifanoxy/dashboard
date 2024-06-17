<script lang="ts">
export default {
  data() {
    return {
      bot_data: {
        name: 'IFANOXY BOT TESTER',
        bot_id: 987654321,
        image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg'
      },
      modules: [
        {
          name: 'GIVEAWAY',
          id: 1
        },
        {
          name: 'CUSTOM COMMANDS',
          id: 2
        },
        {
          name: 'CUSTOM EVENTS',
          id: 3
        }
      ]
    }
  }
}
</script>
<template>
  <div class="secondary-sidebar flex-col gap-2 items-center p-4 flex w-80 bg-primary rounded-xl">
    <div class="avatar">
      <img class="rounded-full h-28 border-dark border-2" :src="bot_data.image_url" />
    </div>
    <p
      class="w-full text-center font-black h-max"
      :style="`font-size: ${Math.max(10, 30 - bot_data.name.length / 2)}px`"
    >
      {{ bot_data.name }}
    </p>
    <hr class="w-full size-1.5 bg-dark rounded-full border-0" />
    <div class="parameters w-full">
      <ul class="w-full text-white font-extrabold">
        <li
          class="w-full cursor-pointer hover:opacity-100 hover:translate-x-1 duration-300 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'informations' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot_data.bot_id}`)"
        >
          INFORMATIONS
        </li>
        <li
          class="w-full cursor-pointer hover:opacity-100 hover:translate-x-1 duration-300 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'modules' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot_data.bot_id}/modules`)"
        >
          MODULES
        </li>
        <li
          class="w-full cursor-pointer hover:opacity-100 duration-300 hover:translate-x-1 flex justify-center my-4 py-2 bg-dark rounded-lg"
          :class="$route.name == 'settings' ? 'opacity-100' : 'opacity-80'"
          @click="$router.push(`/dashboard/${bot_data.bot_id}/settings`)"
        >
          SETTINGS
        </li>
      </ul>
    </div>
    <p class="flex l-0 w-full font-extrabold" style="margin-bottom: -10px">
      MODULES CONFIGURATIONS
    </p>
    <hr class="w-full size-1.5 bg-dark rounded-full border-0" />
    <div class="modules-config w-full">
      <ul class="w-full text-white font-extrabold">
        <li
          v-for="module of modules"
          class="w-full cursor-pointer hover:opacity-100 duration-300 hover:translate-x-1 flex justify-center my-4 py-2 bg-dark rounded-lg"
          @click="$router.push(`/dashboard/${bot_data.bot_id}/modules-config/${module.id}`)"
          :class="
            $route.name == 'modules-config' && $route.params?.module_id == module.id
              ? 'opacity-100'
              : 'opacity-80'
          "
        >
          {{ module.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.secondary-sidebar {
}
</style>
