<script lang="ts">
import BotRaw from '@/components/Sidbar/BotRaw.vue'
import Opener from '@/components/Sidbar/Opener.vue'
import BotIcon from '@/components/Sidbar/BotIcon.vue'

export default {
  components: { BotIcon, Opener, BotRaw },
  data() {
    return {
      bots: [
        {
          name: 'MEE6',
          image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg'
        },
        {
          name: 'IFANOXY BOT TESTER',
          image_url: 'https://pbs.twimg.com/profile_images/1596115537481940992/Ea4pTA2G_400x400.jpg'
        }
      ],
      opened: true
    }
  },
  methods: {
    changeOpened: function () {
      this.opened = !this.opened
    }
  }
}
</script>

<template>
  <div class="sidebar p-5 bg-dark-grey duration-300" :class="opened ? 'w-96' : 'w-28'">
    <div v-if="opened">
      <div class="open flex flex-col gap-6">
        <div v-for="bot of bots">
          <BotRaw :name="bot.name" :image_url="bot.image_url" />
        </div>
        <div
          class="add-bot flex h-16 gap-6 p-4 w-full border-4 border-dark rounded-xl flex items-center hover:border-primary hover:cursor-pointer text-white duration-300"
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15 27L15 3" stroke="white" stroke-width="5" stroke-linecap="round" />
            <path d="M3 15H27" stroke="white" stroke-width="5" stroke-linecap="round" />
          </svg>
          <p class="pl-1">CREATE A BOT</p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="open flex flex-col gap-6">
        <div v-for="bot of bots">
          <div class="flex justify-center items-center">
            <BotIcon :image_url="bot.image_url" />
          </div>
        </div>
        <div class="flex justify-center items-center">
          <div
            class="add-bot flex justify-center gap-6 p-4 h-16 w-16 border-4 border-dark rounded-full flex items-center hover:border-primary hover:cursor-pointer text-white duration-300"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M15 27L15 3" stroke="white" stroke-width="5" stroke-linecap="round" />
              <path d="M3 15H27" stroke="white" stroke-width="5" stroke-linecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <Opener :opened="opened" @onClick="changeOpened" />
  </div>
</template>

<style scoped>
.add-bot svg {
  transition-duration: 0.4s;
}
.add-bot:hover {
  svg {
    transform: rotate(180deg);
    path {
      stroke: var(--primary);
    }
  }
}
</style>
